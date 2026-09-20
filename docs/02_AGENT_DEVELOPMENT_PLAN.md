# Coconut Station — Agent Development Plan

> **For the implementing agent(s):** read `01_PRD.md` and `03_DESIGN_SYSTEM.md` first. Execute phase by phase. Every task ends with a verification command and a commit. Track progress by ticking the checkboxes in this file.

**Goal:** Ship a premium, fully interactive, bilingual (EN/BN) e-commerce website for Coconut Station that matches the supplied design mock and deploys to a public domain.

**Architecture:** One Next.js (App Router) app. Marketing pages are static; commerce pages are static shells with client-side cart; orders, inquiries and admin use route handlers backed by Postgres. Business values live in typed config, the catalog lives in typed code with DB overrides for availability/price, and payments/notifications sit behind interfaces so gateways plug in later.

**Tech stack (use latest stable majors; verify APIs against current docs, do not rely on memory):**
Next.js + React (App Router) · TypeScript strict · Tailwind CSS v4 (`@theme` tokens) · shadcn/ui (Radix) restyled to the design system · Motion (`motion/react`) · Zustand (cart) · react-hook-form + Zod · next-intl · Drizzle ORM + `postgres` driver · `bcryptjs` + `jose` (admin) · Resend · MDX (`next-mdx-remote/rsc`, `gray-matter`) · Sonner (toasts) · lucide-react + custom SVG icons · Vitest · Playwright + `@axe-core/playwright` · pnpm · Node ≥ 22.

---

## 0. Global constraints (apply to every task)

- **Nothing hard-coded:** domain, phone, WhatsApp, hours, delivery zones, prices, wallet numbers, opening date live in `src/content/site.config.ts` / `catalog.ts` / env.
- **No user-facing string literals in components** — use `next-intl` messages (`en` complete, `bn` complete, `bnReview` list generated).
- **Money** is integer BDT. Never floats.
- **Server is the source of truth** for price, fee, availability. Client totals are display-only.
- **Public order view contains no PII.**
- **Performance budgets** from PRD NFR-PERF-01 are CI-enforced (Lighthouse CI, `size-limit`).
- **Accessibility:** WCAG 2.2 AA; axe clean; reduced-motion respected everywhere.
- **Images:** only through `next/image`; every image has meaningful `alt` (from `assets/asset-manifest.json`); assets named `*-PLACEHOLDER*` must fail `assets:check` when `STRICT_LAUNCH=1`.
- **Colours/type/spacing** only via design tokens (`03_DESIGN_SYSTEM.md` §3–4). No raw hex in components.
- **Commits:** Conventional Commits, one per task, message shown in each task.
- **Ambiguity rule:** use the default in PRD §13, record it in `DECISIONS.md` (date, question, default taken, file to change), continue. Ask the owner only for true blockers (there should be none).

## 1. Working agreements

1. **Plan → test → implement → verify → commit.** Pure logic (pricing, phone, order state machine, cart, opening state, slots) is written test-first.
2. **Definition of done (task):** code + tests + verify command passes + no `console.error` in E2E + committed.
3. **Gate reports:** at the end of each phase write `reports/phase-N.md` (checklist results, command output summary, screenshots at 1440×900 and 390×844 in `reports/screenshots/phase-N/`, Lighthouse summary, open issues). Gates **G2** and **G6** are *human review stops*: halt and present the report. Other gates: continue automatically if green; if red after two fix attempts, halt with a diagnosis.
4. **Visual self-critique:** from Phase 1 on, screenshot with Playwright and compare to `assets/reference/design-mock-home.webp` (Home) and the design doc wireframes. Fix deviations before moving on.
5. **Scripts (define in T0.1):**

| Script | Purpose |
|---|---|
| `pnpm dev` / `build` / `start` | Standard Next.js |
| `pnpm lint` / `typecheck` / `test` | ESLint (+jsx-a11y), `tsc --noEmit`, Vitest |
| `pnpm test:e2e` | Playwright (Chromium, WebKit, mobile) |
| `pnpm db:generate` / `db:migrate` / `db:seed` | Drizzle |
| `pnpm assets:check` | Manifest ↔ files, sizes, placeholder warnings |
| `pnpm launch:check` | Fails when `STRICT_LAUNCH=1` and any `TODO_`, `-PLACEHOLDER`, demo price remains |
| `pnpm shots` | Screenshot key routes at both viewports |
| `pnpm smoke <url>` | Post-deploy smoke test |
| `pnpm admin:hash` | Prompts for a password, prints the bcrypt hash for `ADMIN_PASSWORD_HASH` |

## 2. Architecture at a glance

```
Browser ── static pages (catalog from code) ── cart (localStorage, Zustand)
   │
   └─ POST /api/orders ──► validate(Zod) ► computePricing(server) ► tx: orders+items+events
                                   │                                   │
                                   │                          after(): Notifier[]  (email, telegram)
                                   └─► PaymentProvider.init() ► instructions | redirect | none
Admin (/admin, cookie session) ─► orders board · availability/price overrides · inquiries
DB: Postgres (Neon/Supabase/any) via DATABASE_URL     Cache tag: "catalog" (revalidated by admin)
```

## 3. Repository layout (create exactly)

```
coconut-station/
├─ DECISIONS.md  DEPLOYMENT.md  OPERATIONS.md  README.md
├─ docs/                     # copies of 01, 02, 03 + MASTER_PROMPT.md
├─ content/                  # source docs (brand-master-plan.md, website-content-v1.md)
├─ design-reference/         # assets/reference/* (NOT served)
├─ public/assets/            # brand/ scenes/ products/ posters/  (+ asset-manifest.json)
├─ src/
│  ├─ app/
│  │  ├─ [locale]/(site)/    # layout, page (Home), menu, menu/[slug], cart, checkout, order/[code],
│  │  │                      # about, why-coconut, outlets, events, gallery, blog, blog/[slug],
│  │  │                      # contact, legal/{privacy,terms,delivery}, not-found
│  │  ├─ [locale]/_design/   # dev-only style guide (404 in production)
│  │  ├─ admin/              # login, (protected) orders, orders/[id], availability, inquiries, subscribers
│  │  ├─ api/                # orders, orders/[code], inquiries, subscribers, contact,
│  │  │                      # payments/[provider]/callback, admin/*, health
│  │  ├─ sitemap.ts  robots.ts  manifest.ts  opengraph-image.tsx
│  ├─ components/            # ui/ layout/ home/ menu/ cart/ checkout/ admin/ icons/
│  ├─ features/
│  │  ├─ catalog/            # types, resolve, queries
│  │  ├─ cart/               # store, selectors, sync
│  │  ├─ pricing/            # computePricing (pure, shared)
│  │  ├─ orders/             # schema(Zod), create, state-machine, public-view
│  │  ├─ payments/           # provider interface, cod, manual-wallet, mock, sslcommerz
│  │  ├─ notifications/      # notifier interface, email, telegram, whatsapp-link
│  │  ├─ inquiries/  moments/  hours/  slots/  analytics/
│  ├─ lib/                   # env.ts, db/{client,schema}.ts, money.ts, phone.ts, ids.ts, rate-limit.ts, seo.ts, auth.ts
│  ├─ content/               # site.config.ts, catalog.ts, moments.ts, faq.ts, blog/*.mdx
│  ├─ i18n/  messages/{en,bn}.json  styles/globals.css
├─ drizzle/                  # generated migrations
├─ scripts/                  # check-assets.mjs check-placeholders.mjs generate-icons.mjs seed.ts migrate.ts shots.mjs smoke.mjs
├─ tests/{unit,integration,e2e}/
├─ Dockerfile  docker-compose.yml  Caddyfile  vercel.json  .env.example  next.config.ts
└─ .github/workflows/ci.yml
```

## 4. Contracts (freeze after Task 3.1; changes need a `DECISIONS.md` entry)

```ts
// src/features/catalog/types.ts
export type Locale = 'en' | 'bn';
export type Localized = { en: string; bn: string };
export type Allergen = 'coconut' | 'milk' | 'peanuts';
export type DietTag = 'no-extra-sugar' | 'sealed-straw' | 'smart-cut' | 'chilled' | 'natural';
export type CategoryId = 'coconut-water' | 'desserts' | 'shakes-coffee';

export interface Variant {
  sku: string;                 // unique kebab-case, e.g. 'live-coconut-premium'
  label: Localized;            // 'Premium' | '200 ml'
  detail?: Localized;          // '500–700 ml'
  priceBDT: number | null;     // null => not orderable
  image: string;               // '/assets/products/coconut-premium.webp'
  imageAlt: Localized;
}
export interface Product {
  slug: string; category: CategoryId;
  name: Localized; summary: Localized; description: Localized;
  variants: [Variant, ...Variant[]];
  tags: DietTag[]; allergens: Allergen[];
  status: 'active' | 'hidden' | 'coming_soon';
  sort: number; pairsWith?: string[];
}
export interface CatalogOverride { sku: string; soldOut: boolean; priceBDT: number | null }
export interface ResolvedVariant extends Variant {
  soldOut: boolean; effectivePriceBDT: number | null; orderable: boolean;
}
```
```ts
// src/features/pricing/compute.ts  (pure; used by client AND server)
export interface PricingInput {
  lines: { sku: string; qty: number }[];
  fulfilment: 'delivery' | 'pickup';
  zoneId?: string; promoCode?: string;
}
export type PricingIssueCode =
  | 'UNKNOWN_SKU' | 'SOLD_OUT' | 'NO_PRICE' | 'QTY_INVALID'
  | 'ZONE_REQUIRED' | 'ZONE_UNKNOWN' | 'BELOW_MIN_ORDER' | 'PROMO_INVALID';
export interface PricingResult {
  lines: { sku: string; qty: number; unitBDT: number; lineBDT: number }[];
  subtotalBDT: number; deliveryFeeBDT: number; discountBDT: number; totalBDT: number;
  issues: { code: PricingIssueCode; sku?: string; detail?: string }[];
}
export function computePricing(i: PricingInput, ctx: { catalog: ResolvedCatalog; site: SiteConfig }): PricingResult;
```
```ts
// src/features/orders/schema.ts
export const toAsciiDigits = (s: string) => s.replace(/[০-৯]/g, d => String('০১২৩৪৫৬৭৮৯'.indexOf(d)));
export const normalizeBdPhone = (s: string) => toAsciiDigits(s).replace(/[\s-]/g, '').replace(/^\+?88/, '');
export const isBdMobile = (s: string) => /^01[3-9]\d{8}$/.test(normalizeBdPhone(s));

export const OrderInputSchema = z.object({
  idempotencyKey: z.string().uuid(),
  locale: z.enum(['en', 'bn']),
  lines: z.array(z.object({ sku: z.string().min(1).max(64), qty: z.number().int().min(1).max(20) })).min(1).max(30),
  customer: z.object({
    name: z.string().trim().min(2).max(80),
    phone: z.string().refine(isBdMobile).transform(normalizeBdPhone),
    email: z.string().email().max(120).optional().or(z.literal('')),
  }),
  fulfilment: z.discriminatedUnion('type', [
    z.object({ type: z.literal('delivery'), zoneId: z.string(), addressLine: z.string().trim().min(5).max(200), landmark: z.string().max(120).optional() }),
    z.object({ type: z.literal('pickup'), outletId: z.string() }),
  ]),
  slot: z.union([z.literal('asap'), z.string().datetime()]),
  note: z.string().max(300).optional(),
  payment: z.discriminatedUnion('method', [
    z.object({ method: z.literal('cod') }),
    z.object({ method: z.enum(['bkash_manual', 'nagad_manual', 'rocket_manual']),
               trxId: z.string().trim().min(6).max(24), senderLast4: z.string().regex(/^\d{4}$/) }),
  ]),
  promoCode: z.string().max(32).optional(),
  hp: z.string().max(0).optional(),                       // honeypot
  attribution: z.object({ utmSource: z.string().max(80).optional(), utmMedium: z.string().max(80).optional(), utmCampaign: z.string().max(80).optional() }).optional(),
});
```
```ts
// src/features/payments/provider.ts
export type PaymentMethodId = 'cod' | 'bkash_manual' | 'nagad_manual' | 'rocket_manual' | 'gateway';
export type PaymentInitResult =
  | { kind: 'none' }
  | { kind: 'instructions'; wallet: 'bkash' | 'nagad' | 'rocket'; number: string; amountBDT: number; reference: string }
  | { kind: 'redirect'; url: string };
export interface PaymentProvider {
  readonly id: 'cod' | 'manual_wallet' | 'mock_gateway' | 'sslcommerz';
  supports(m: PaymentMethodId): boolean;
  init(o: { publicId: string; totalBDT: number; customerPhone: string }): Promise<PaymentInitResult>;
  handleCallback?(req: Request): Promise<{ publicId: string; status: 'paid' | 'failed'; ref: string }>;
}
```
```ts
// src/features/notifications/notifier.ts
export type NotificationEvent =
  | { type: 'order.created'; order: OrderSummary }
  | { type: 'order.status_changed'; order: OrderSummary; from: OrderStatus; to: OrderStatus }
  | { type: 'inquiry.created'; inquiry: InquirySummary };
export interface Notifier { readonly id: 'email' | 'telegram'; send(e: NotificationEvent): Promise<void> }
// fan-out: Promise.allSettled, each failure written to notification_log, never throws to caller
```
```ts
// src/content/site.config.ts (shape)
export interface SiteConfig {
  brand: { name: 'Coconut Station'; tagline: Localized };
  opening: { date: string };                               // ISO date, Asia/Dhaka
  tz: 'Asia/Dhaka';
  outlets: Outlet[];
  delivery: { zones: DeliveryZone[]; freeThresholdBDT: number | null; leadMinutes: number; bulkLeadHours: number };
  payments: { wallets: Partial<Record<'bkash' | 'nagad' | 'rocket', string>> };
  contact: { phone: string; whatsapp: string; email: string };
  social: Partial<Record<'facebook' | 'instagram' | 'tiktok' | 'youtube', string>>;
  features: { promo: boolean; sslcommerz: boolean; bn: boolean; blog: boolean };
}
export interface Outlet { id: string; status: 'open' | 'coming_soon'; city: Localized; name: Localized; address: Localized;
  geo?: { lat: number; lng: number }; phone?: string; hours?: WeeklyHours; images: string[] }
export interface DeliveryZone { id: string; name: Localized; feeBDT: number; minOrderBDT: number; etaMinutes: number }
```

## 5. Database (Drizzle, `src/lib/db/schema.ts`)

```ts
export const orderStatus   = pgEnum('order_status',   ['received','confirmed','preparing','ready','out_for_delivery','completed','cancelled']);
export const fulfilmentT   = pgEnum('fulfilment_type', ['delivery','pickup']);
export const paymentMethod = pgEnum('payment_method', ['cod','bkash_manual','nagad_manual','rocket_manual','gateway']);
export const paymentStatus = pgEnum('payment_status', ['unpaid','pending_verification','paid','failed','refunded']);

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  publicId: text('public_id').notNull().unique(),                 // 'CS-7K2M9Q4T'
  idempotencyKey: uuid('idempotency_key').notNull().unique(),
  status: orderStatus('status').notNull().default('received'),
  fulfilment: fulfilmentT('fulfilment').notNull(),
  outletId: text('outlet_id').notNull(),
  zoneId: text('zone_id'),
  customerName: text('customer_name').notNull(),
  customerPhone: text('customer_phone').notNull(),
  customerEmail: text('customer_email'),
  addressLine: text('address_line'), landmark: text('landmark'), note: text('note'),
  slotAt: timestamp('slot_at', { withTimezone: true }),           // null = ASAP
  subtotalBDT: integer('subtotal_bdt').notNull(),
  deliveryFeeBDT: integer('delivery_fee_bdt').notNull().default(0),
  discountBDT: integer('discount_bdt').notNull().default(0),
  totalBDT: integer('total_bdt').notNull(),
  paymentMethod: paymentMethod('payment_method').notNull(),
  paymentStatus: paymentStatus('payment_status').notNull().default('unpaid'),
  paymentRef: text('payment_ref'), paymentSenderLast4: text('payment_sender_last4'),
  promoCode: text('promo_code'), locale: text('locale').notNull().default('en'),
  utm: jsonb('utm'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, t => [index('orders_status_created').on(t.status, t.createdAt), index('orders_phone').on(t.customerPhone)]);

export const orderItems  = pgTable('order_items',  { id: uuid().primaryKey().defaultRandom(), orderId: uuid().notNull().references(() => orders.id, { onDelete: 'cascade' }),
  sku: text().notNull(), nameSnapshot: text().notNull(), unitBDT: integer().notNull(), qty: integer().notNull(), lineBDT: integer().notNull() });
export const orderEvents = pgTable('order_events', { id: uuid().primaryKey().defaultRandom(), orderId: uuid().notNull().references(() => orders.id, { onDelete: 'cascade' }),
  kind: text().notNull() /* status|payment|note */, fromValue: text(), toValue: text(), note: text(), actor: text().notNull() /* system|customer|admin */, createdAt: timestamp({ withTimezone: true }).notNull().defaultNow() });
export const catalogOverrides = pgTable('catalog_overrides', { sku: text().primaryKey(), soldOut: boolean().notNull().default(false), priceBDT: integer(), updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow() });
export const inquiries   = pgTable('inquiries',   { id: uuid().primaryKey().defaultRandom(), type: text().notNull() /* bulk|wedding|birthday|corporate|general */,
  name: text().notNull(), phone: text().notNull(), email: text(), eventDate: date(), guests: integer(), area: text(), items: jsonb(), message: text(),
  status: text().notNull().default('new'), createdAt: timestamp({ withTimezone: true }).notNull().defaultNow() });
export const subscribers = pgTable('subscribers', { id: uuid().primaryKey().defaultRandom(), contact: text().notNull(), city: text().notNull() /* dhaka|bogura|other */,
  consent: boolean().notNull().default(true), createdAt: timestamp({ withTimezone: true }).notNull().defaultNow() });
export const notificationLog = pgTable('notification_log', { id: uuid().primaryKey().defaultRandom(), channel: text().notNull(), eventType: text().notNull(), ok: boolean().notNull(), error: text(), createdAt: timestamp({ withTimezone: true }).notNull().defaultNow() });
export const rateLimits = pgTable('rate_limits', { key: text().primaryKey(), windowStart: timestamp({ withTimezone: true }).notNull(), count: integer().notNull() });
```
(Adjust column-builder syntax to the installed Drizzle version; keep names and types.)

**Order codes:** `CS-` + 8 chars from `23456789ABCDEFGHJKMNPQRSTUVWXYZ` (no 0/O/1/I/L), generated with `crypto.randomInt`; retry on unique violation.

**State machine** (`src/features/orders/state-machine.ts`):
```ts
export const NEXT: Record<'delivery'|'pickup', Record<OrderStatus, OrderStatus[]>> = {
  delivery: { received:['confirmed','cancelled'], confirmed:['preparing','cancelled'], preparing:['out_for_delivery','cancelled'],
              ready:[], out_for_delivery:['completed','cancelled'], completed:[], cancelled:[] },
  pickup:   { received:['confirmed','cancelled'], confirmed:['preparing','cancelled'], preparing:['ready','cancelled'],
              ready:['completed','cancelled'], out_for_delivery:[], completed:[], cancelled:[] },
};
```

---

## 6. Phases and tasks

Legend — **Files** · **Steps** · **Verify** · **Commit**. FR/NFR IDs refer to the PRD.

### Phase 0 — Foundation → Gate G0

**T0.1 Scaffold** (`[ ]`)
- Steps: create Next.js app (App Router, TS strict, ESLint, `src/` dir, pnpm); add Tailwind v4, Prettier, `eslint-plugin-jsx-a11y`, Vitest, Playwright, lint-staged/husky; `.nvmrc` = 22; `.editorconfig`; define every script in §1. Copy `docs/`, `content/`, `assets/` (→ `public/assets/`, reference → `design-reference/`).
- Verify: `pnpm lint && pnpm typecheck && pnpm test && pnpm build` → all pass.
- Commit: `chore: scaffold next app with tooling and source assets`

**T0.2 Env + site config** (`[ ]`)
- Files: `src/lib/env.ts` (Zod-parsed, server/client split), `.env.example` (every var in PRD §11 with comments), `src/content/site.config.ts` (values from PRD §13 defaults, each unresolved value prefixed `TODO_`), `scripts/check-placeholders.mjs`.
- Test-first: `tests/unit/env.test.ts` (missing required var throws with a readable message).
- Verify: `pnpm test`; `STRICT_LAUNCH=1 pnpm launch:check` exits non-zero and lists every `TODO_`.
- Commit: `feat(config): typed env, site config and launch guard`

**T0.3 Tokens + fonts** (`[ ]`)
- Files: `src/styles/globals.css` (`@theme` with all tokens from design doc §3–4), `src/app/[locale]/layout.tsx` (`next/font/google`: Fira Sans 400/500/600/700/800, Marck Script 400, Hind Siliguri 400/500/600/700 with `bengali` subset; CSS vars `--font-sans`, `--font-script`, `--font-bn`; if the build environment is offline switch to `next/font/local`). Base styles: focus ring, selection colour, `prefers-reduced-motion`.
- Verify: `pnpm build`; token names exactly match design doc §3 (script `tests/unit/tokens.test.ts` parses `globals.css`).
- Commit: `feat(design): tokens, fonts, base styles`

**T0.4 i18n plumbing** (`[ ]`)
- Files: `src/i18n/{routing,request,navigation}.ts`, `src/middleware.ts` (locale detection off; `localePrefix: 'as-needed'`), `messages/{en,bn}.json` (seed keys), `LanguageSwitch` stub. `<html lang>` set per locale; Bangla body uses `font-bn`.
- Verify: `/` renders EN, `/bn` renders BN, switching preserves path + query (Playwright `i18n.spec.ts`).
- Commit: `feat(i18n): en/bn routing and messages`

**T0.5 Asset pipeline** (`[ ]`)
- Files: `scripts/check-assets.mjs` (reads `public/assets/asset-manifest.json`; fails on missing file; warns on `quality` = `placeholder-low-res` or `interim-raster`; fails on those when `STRICT_LAUNCH=1` for `-PLACEHOLDER` files), `scripts/generate-icons.mjs` (sharp: `logo-icon.png` → `favicon.ico`, `icon-192/512.png`, `apple-touch-icon.png`, maskable icon on cream `#F8F7EE`), `src/app/manifest.ts`.
- Verify: `pnpm assets:check` prints the 3 placeholder warnings and exits 0.
- Commit: `chore(assets): manifest checks and icon generation`

**T0.6 CI** (`[ ]`)
- Files: `.github/workflows/ci.yml` — jobs: `check` (install with cache, lint, typecheck, unit), `build`, `e2e` (Postgres service container, `pnpm db:migrate`, Playwright with cached browsers), `lighthouse` (LHCI on Home/Menu, budgets from NFR-PERF-01), `audit` (`pnpm audit --prod`).
- Verify: push branch → all jobs green.
- Commit: `ci: add check, build, e2e, lighthouse workflows`

**G0 report:** repo builds, CI green, `/` and `/bn` render, tokens tested.

### Phase 1 — Design system and shell → Gate G1

**T1.1 UI primitives** (`[ ]`) — `src/components/ui/`: Button (primary/secondary/ghost/link; sizes 44/52), Chip, Badge, Input, Textarea, Select, Checkbox, Radio, QtyStepper, Tabs, Accordion, Sheet (drawer/bottom sheet), Dialog, Popover, Tooltip, Toast (Sonner), Skeleton, ProgressBar, Timeline. Built on shadcn/Radix; specs in design doc §6.
- Verify: `/_design` shows every component in all states; axe on `/_design` = 0 serious.
- Commit: `feat(ui): design-system primitives and style guide route`

**T1.2 Icons** (`[ ]`) — `src/components/icons/`: 7 trust icons + coconut, leaf, smart-cut, sealed-straw, scooter, wallet marks (text only for bKash/Nagad/Rocket — no trademarked logos). 1.75 px stroke, `currentColor`, inside optional 48 px outlined circle (design §6.9).
- Commit: `feat(icons): brand icon set`

**T1.3 Shell** (`[ ]`) — Header (FR-GLB-01, compact-on-scroll, mobile sheet), AnnouncementBar (FR-GLB-02) + `src/features/hours/state.ts` (`getOpeningState(now, site)` → `'pre_opening'|'open'|'closed'` + next-open time; test-first, cover midnight/Friday), Footer (FR-GLB-03), MobileBottomBar (FR-GLB-04), QuickContact (FR-GLB-06), SkipLink, `not-found.tsx`, `error.tsx`.
- Verify: unit tests for `getOpeningState`; Playwright header screenshot at 1440×900 vs mock (side-by-side saved in report).
- Commit: `feat(shell): header, footer, announcement, bottom bar`

**T1.4 SEO utilities** (`[ ]`) — `src/lib/seo.ts` (`buildMetadata`, canonical, hreflang), JSON-LD components (`FoodEstablishment`, `Product`, `Article`, `FAQPage`, `BreadcrumbList`), `opengraph-image.tsx` (cream card, logo, scene crop).
- Commit: `feat(seo): metadata helpers and JSON-LD`

**G1 report:** style guide route, shell screenshots (desktop + mobile), axe clean.

### Phase 2 — Marketing pages → Gate G2 (**human review**)

**T2.1 Hero + trust strip** (`[ ]`) — `src/components/home/{Hero,TrustStrip,HeroHotspots}.tsx`. FR-HOME-01/02/03. Art-direct with `getImageProps()` in `<picture>` (mobile/desktop sources; only one downloads; `priority`, `fetchPriority="high"`). Left gradient mask, load sequence, hotspot coordinates from design doc §5.2. Hotspot popovers read from catalog (`from ৳X` or "Ask at outlet").
- Verify: Lighthouse LCP element = hero image; CLS < 0.05; screenshot diff notes vs mock.
- Commit: `feat(home): hero, trust strip, shoppable hotspots`

**T2.2 Home sections** (`[ ]`) — `PickYourSize`, `SignatureMenu`, `WhyCoconut`, `MomentTeaser`, `OutletSpotlight`, `BulkBand`, `BlogTeasers`, `Faq`, `ExpansionNotify` (FR-HOME-04…12) using `src/content/{faq,moments}.ts`. `ExpansionNotify` posts to `POST /api/subscribers` (stub returns 501 until T3.6; wire in T3.6).
- Commit: `feat(home): remaining sections`

**T2.3 About** (`[ ]`) — FR-STORY-01. Content only from `content/website-content-v1.md`; no invented backstory.
- Commit: `feat(about): brand pages`

**T2.4 Why Coconut + Moment picker** (`[ ]`) — FR-WHY-01; `src/features/moments/` (`Moment` type: `id`, `title`, `blurb`, `skus[]`, `reason`, `cta?`), animated recommendation panel, **Add all** hooks into cart in Phase 3 (feature-detect until then).
- Commit: `feat(why): moment picker`

**T2.5 Outlets** (`[ ]`) — FR-OUT-01/02; data-driven from `site.config.outlets`; Open-now badge; click-to-load map embed (no third-party request before click).
- Commit: `feat(outlets): outlet cards and notify`

**T2.6 Gallery** (`[ ]`) — FR-GAL-01; lightbox (Radix Dialog) with arrow keys, swipe, focus trap; images from manifest.
- Commit: `feat(gallery): masonry and lightbox`

**T2.7 Blog** (`[ ]`) — FR-BLOG-01; MDX pipeline, frontmatter Zod schema (`title, slug, date, category, excerpt, cover, status`), 3 drafts (*Hydration basics*, *A morning-walk ritual*, *Choosing your coconut size*) written under the claims policy with the medical disclaimer; `status: draft` excluded from production build and sitemap.
- Commit: `feat(blog): mdx blog with drafts`

**T2.8 Contact + legal** (`[ ]`) — FR-CON-01 (form posts in T3.6), FR-LEG-01 templates with a visible review banner.
- Commit: `feat(pages): contact and legal`

**G2 report (HUMAN REVIEW STOP):** screenshots of every public route at 1440×900 and 390×844; Home side-by-side with mock; Lighthouse (Home, Menu stub); list of deviations from the mock with reasons. Wait for owner approval.

### Phase 3 — Commerce core → Gate G3

**T3.1 Catalog** (`[ ]`) — `src/content/catalog.ts` (all SKUs per PRD §7, EN + BN names/descriptions, `priceBDT: null`, `SEED_DEMO_PRICES` handled in seed only), `src/features/catalog/{types,resolve,queries}.ts`; `getCatalog()` merges `catalog_overrides` (tag `catalog`), hidden/`coming_soon` filtered.
- Test-first: `resolve.test.ts` (override precedence, null price ⇒ `orderable=false`, sold-out).
- Commit: `feat(catalog): typed catalog and resolver`

**T3.2 Menu page** (`[ ]`) — FR-MENU-01/02/03, quick view (FR-PDP-02). URL-driven filters via `nuqs` or `useSearchParams`. Size pills swap image/price/ml with layout reserved (no CLS).
- Verify: Playwright `menu.spec.ts` (filter, search, size swap, back button).
- Commit: `feat(menu): listing, filters, quick view`

**T3.3 Product page** (`[ ]`) — FR-PDP-01, JSON-LD, per-product OG.
- Commit: `feat(pdp): product detail page`

**T3.4 Pricing engine** (`[ ]`) — `src/features/pricing/compute.ts` (contract §4). Test-first cases: unknown SKU, sold out, null price, qty bounds, min order per zone, free-delivery threshold, pickup has no fee, rounding (integers only), promo invalid.
- Commit: `feat(pricing): shared pricing engine`

**T3.5 Cart** (`[ ]`) — Zustand store with `persist` (versioned key `cs-cart-v1`), cross-tab `storage` sync, selectors using `computePricing`; CartSheet, `/cart` page (mobile full view), FR-CART-01…04; fly-to-cart (Motion `layoutId` or clone animation), undo toast; wire Moment **Add all**.
- Test-first: store reducer tests; Playwright `cart.spec.ts`.
- Commit: `feat(cart): persistent cart, drawer, fly-to-cart`

**T3.6 Database + shared APIs** (`[ ]`) — `src/lib/db/{client,schema}.ts` (`postgres` with `prepare: false` for pooled URLs), `pnpm db:generate && db:migrate`, `scripts/migrate.ts` (runtime migrator, no drizzle-kit needed in prod), `scripts/seed.ts`, `src/lib/rate-limit.ts` (Postgres window counter), routes: `api/health` (`?deep=1` checks DB), `api/subscribers`, `api/contact`, `api/inquiries`.
- Verify: integration tests against Postgres (CI service): rate limit trips on the 6th request/min; health deep OK.
- Commit: `feat(db): schema, migrations, health, subscriber and contact APIs`

**T3.7 Checkout UI** (`[ ]`) — FR-CHK-01…04, 07, 08. `src/features/slots/generate.ts` (30-min slots, earliest = now + lead, within hours; test-first), zone selector, payment method cards (only enabled methods), manual-wallet instruction panel (shows after selection, not before).
- Commit: `feat(checkout): accordion checkout UI`

**T3.8 Order API** (`[ ]`) — `POST /api/orders`: parse `OrderInputSchema` → honeypot → rate limit (5/min/IP + 10/hour/phone) → load catalog → `computePricing` (reject on any issue) → validate slot & hours → transaction (`orders`, `order_items` with name/price snapshots, `order_events` "created") → idempotency (`ON CONFLICT (idempotency_key)` returns existing) → `PaymentProvider.init` → respond `{ code, payment }` → `after()` notify.
- Tests (integration): tampered price ignored; sold-out rejected; duplicate key returns same code; bad phone 422 with field errors; closed hours rejected with actionable code.
- Commit: `feat(orders): create-order endpoint with server-side pricing`

**T3.9 Confirmation + tracking** (`[ ]`) — FR-ORD-02/03; `GET /api/orders/[code]` returns public view (no PII); polling hook (20 s, pauses when tab hidden); WhatsApp share (`https://wa.me/<number>?text=<encoded summary>`).
- Commit: `feat(orders): confirmation and tracking`

**T3.10 Notifications** (`[ ]`) — Email (Resend), Telegram (bot `sendMessage`), fan-out with `Promise.allSettled` + `notification_log`; order message includes code, items, total, fulfilment, address, phone (admin channels only).
- Tests: mocked `fetch`; one channel failing does not fail the order.
- Commit: `feat(notify): email and telegram alerts`

**T3.11 Payments** (`[ ]`) — providers per §4: COD, manual wallet (numbers from config; hidden if missing), mock gateway (throws in production), SSLCommerz adapter behind `features.sslcommerz` (sandbox init + server-to-server validation on callback; consult the provider's current docs).
- Commit: `feat(payments): provider interface with cod, manual wallet, mock, sslcommerz`

**G3 report:** Playwright `checkout-cod.spec.ts` and `checkout-manual-wallet.spec.ts` green on Chromium + mobile; order visible in DB; alert delivered to a test Telegram chat or logged mock.

### Phase 4 — Admin lite → Gate G4

**T4.1 Auth** (`[ ]`) — `src/lib/auth.ts` (bcryptjs compare, `jose` HS256 session, 12 h expiry), `/admin/login`, `middleware` guard on `/admin/*` and `/api/admin/*`, login rate limit (5/15 min/IP), Origin check on mutations, `X-Robots-Tag: noindex`.
- Commit: `feat(admin): authentication`

**T4.2 Orders board** (`[ ]`) — FR-ADM-02/03/06; status advance uses `NEXT` map (server-enforced), payment verify, cancel-with-reason, audit events, polling (15 s), optional chime toggle, print ticket route.
- Commit: `feat(admin): orders board`

**T4.3 Availability & prices** (`[ ]`) — FR-ADM-04; upsert `catalog_overrides`; `revalidateTag('catalog')`; daily reset job = lazy reset on read (`updatedAt` before today 04:00 `Asia/Dhaka` ⇒ `soldOut=false`), no cron dependency.
- Commit: `feat(admin): availability and pricing`

**T4.4 Inquiries & subscribers** (`[ ]`) — FR-ADM-05, CSV export streaming.
- Commit: `feat(admin): inquiries and subscribers`

**G4 report:** Playwright `admin.spec.ts` (login → advance order → mark sold out → item disabled on menu); unauthorised access redirects.

### Phase 5 — Events, Bangla, analytics → Gate G5

**T5.1 Events & Bulk wizard** (`[ ]`) — FR-EVT-01/02; estimate only when all chosen SKUs are priced; notifier `inquiry.created`.
- Commit: `feat(events): bulk and event wizard`

**T5.2 Bangla pass** (`[ ]`) — complete `messages/bn.json`, catalog `bn` fields, blog drafts titles/excerpts; produce `reports/bn-review.csv` (key, en, bn, status). Use poster Bangla lines verbatim; glossary in design doc §10. QA: line-height, no clipped glyphs, digits in prices rendered per locale, phone input accepts Bengali digits.
- Commit: `feat(i18n): bangla content and review sheet`

**T5.3 Analytics + consent** (`[ ]`) — `src/features/analytics/track.ts` (typed event map), GA4 + Meta Pixel loaders (idle/after-interaction), consent notice, events per FR-ANA-01.
- Test: unit — no network calls when IDs unset; e2e — `purchase` fires once.
- Commit: `feat(analytics): typed events with consent`

**T5.4 Promo codes (Should)** (`[ ]`) — `features.promo`; server-validated table/config; `PROMO_INVALID` handling.
- Commit: `feat(promo): promo code support behind flag`

**G5 report:** BN screenshots, `bn-review.csv`, analytics event log.

### Phase 6 — Hardening and launch → Gate G6 (**human review**)

**T6.1 Performance** (`[ ]`) — bundle analysis, dynamic-import below-the-fold, `size-limit` budget, image `sizes` audit, font preload check, LHCI thresholds enforced.
**T6.2 Accessibility** (`[ ]`) — axe on every public route (EN + BN), manual keyboard walkthrough script in `reports/a11y.md`, focus order for cart sheet/checkout/lightbox.
**T6.3 SEO** (`[ ]`) — `sitemap.ts` (locales × routes, products, published posts), `robots.ts` (disallow `/admin`, `/api`, `/order`), canonical + hreflang, JSON-LD validation, OG images, 301 non-canonical host → `NEXT_PUBLIC_SITE_URL` (production only).
**T6.4 Security** (`[ ]`) — headers (HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, frame-ancestors), CSP report-only → enforce after E2E, cookie flags audit, secret scan, `pnpm audit --prod`, error responses leak nothing.
**T6.5 E2E suite** (`[ ]`) — `home`, `menu`, `cart`, `checkout-cod`, `checkout-manual-wallet`, `tracking`, `admin`, `events`, `i18n`, `a11y` on Chromium, WebKit, and 390×844 mobile.
**T6.6 Deployment artefacts** (`[ ]`) — see §9: `vercel.json`, `Dockerfile`, `docker-compose.yml`, `Caddyfile`, `DEPLOYMENT.md`, `OPERATIONS.md`, `scripts/smoke.mjs`.
**T6.7 Launch rehearsal** (`[ ]`) — run `STRICT_LAUNCH=1 pnpm build`, deploy to a Vercel preview / staging container with production-like env, run smoke + E2E against the URL, fill `reports/launch-checklist.md` (PRD §15).
- Commit per task: `perf: …`, `a11y: …`, `feat(seo): …`, `chore(security): …`, `test(e2e): …`, `chore(deploy): …`, `docs: launch checklist`

**G6 report (HUMAN REVIEW STOP):** PRD §15 checklist with evidence; remaining owner inputs (prices, hours, numbers, real photos); go/no-go recommendation.

---

## 7. Parallel execution (multi-agent)

Contracts in §4 are the seams. After T0.x, tracks can run concurrently in separate git worktrees/branches.

| Track | Owns (write access) | Depends on |
|---|---|---|
| **A — Experience** | `src/components/{ui,layout,home,icons}`, `src/app/[locale]/(site)/{page,about,why-coconut,outlets,gallery,blog,contact,legal}`, `styles`, `messages` (UI keys) | Tokens (T0.3) |
| **B — Commerce** | `src/features/*`, `src/lib/db`, `src/app/api/*` (non-admin), `src/components/{menu,cart,checkout}`, `src/app/[locale]/(site)/{menu,cart,checkout,order}` | Contracts §4 |
| **C — Ops** | `src/app/admin`, `src/app/api/admin`, `.github`, `Dockerfile*`, `scripts`, `DEPLOYMENT.md`, `OPERATIONS.md` | Schema (T3.6) |
| **Reviewer** | read-only; runs gates, screenshots, a11y, Lighthouse | all |

Rules: no track edits another track's directories; shared files (`messages/*.json`, `site.config.ts`, `catalog.ts`) change via small PRs merged fast; rebase before starting each task.

## 8. Testing strategy

| Layer | Tool | Must cover |
|---|---|---|
| Unit | Vitest | `computePricing`, phone normalisation (incl. Bengali digits), slots, `getOpeningState`, state machine, cart store, catalog resolve, money format (en/bn) |
| Integration | Vitest + Postgres | order creation, idempotency, rate limit, admin transitions, override precedence |
| E2E | Playwright | flows listed in T6.5; each asserts no console errors |
| A11y | axe | every public route, both locales |
| Perf | Lighthouse CI, `size-limit` | budgets from PRD NFR-PERF-01 |
| Visual | `pnpm shots` | reviewer compares to mock and wireframes |

## 9. Deployment and operations

**Path A — Vercel (primary)**
1. Push to GitHub → import project in Vercel; framework auto-detected.
2. Create Postgres (Neon recommended) in the region nearest Bangladesh (Mumbai or Singapore); use the **pooled** connection string as `DATABASE_URL`.
3. Set env vars from `.env.example` (Production and Preview); set `NEXT_PUBLIC_SITE_URL=https://<domain>`, `STRICT_LAUNCH=1` (Production only).
4. `vercel.json`: `{ "regions": ["bom1"] }` (or `sin1`); build command `pnpm launch:check && pnpm build`.
5. Run migrations once: `DATABASE_URL=… pnpm db:migrate` (also in the deploy workflow on `main`).
6. Add the domain in Vercel → follow the DNS records it shows (apex + `www`); HTTPS is automatic.
7. `pnpm smoke https://<domain>`.

**Path B — Docker on a VPS (fallback)**
- `next.config.ts`: `output: 'standalone'`. Multi-stage `Dockerfile` (deps → build → runner), non-root user, `HEALTHCHECK` → `/api/health`, runs `node scripts/migrate.js && node server.js` (compile `scripts/migrate.ts` at build).
- `docker-compose.yml`: `app`, `db` (Postgres, named volume, nightly `pg_dump` sidecar or documented cron), `caddy`.
- `Caddyfile`:
  ```
  {$DOMAIN} {
    encode zstd gzip
    reverse_proxy app:3000
  }
  ```
- Point the domain's A/AAAA record to the server; Caddy issues TLS automatically.

**Deployability gates (all must pass in T6.7):** clean `pnpm build` with only `.env.example`-style values; `docker build` succeeds; `/api/health` = 200; no `localhost` strings in the build output; canonical redirect works; `robots.txt` and `sitemap.xml` reachable; admin unreachable without login.

**Rollback:** Vercel instant rollback to previous deployment; Docker keeps previous image tag. Migrations are additive-only in MVP (no destructive changes without a two-step plan).

**`OPERATIONS.md` must contain:** daily open/close routine, how to mark sold out, change a price, confirm/advance orders, verify a bKash/Nagad payment, cancel an order, export orders/inquiries, restore from backup, rotate the admin password (`pnpm admin:hash`), who to call when alerts stop.

## 10. Gate report template (`reports/phase-N.md`)

```
# Phase N gate — <date>
Result: PASS | FAIL (reason)
Checklist: <task → ✔/✘>
Commands: lint ✔ typecheck ✔ test ✔ build ✔ e2e ✔ (n/n)
Lighthouse (mobile): Perf x · A11y x · SEO x · BP x · LCP x s · CLS x
Screenshots: reports/screenshots/phase-N/…
Deviations from design (with reason):
Decisions logged (DECISIONS.md ids):
Open issues / owner inputs needed:
```
