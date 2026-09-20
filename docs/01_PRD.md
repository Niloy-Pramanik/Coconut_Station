# Coconut Station — Product Requirements Document (PRD)

| | |
|---|---|
| Version | 1.0 — build-ready |
| Date | 2026-09-20 |
| Inputs | `content/brand-master-plan.md`, `content/website-content-v1.md`, `assets/` (design mock, posters, scenes) |
| Companions | `02_AGENT_DEVELOPMENT_PLAN.md`, `03_DESIGN_SYSTEM.md`, `../MASTER_PROMPT.md` |
| Rule | Requirement IDs (`FR-…`, `NFR-…`) are referenced by the development plan. Do not renumber. |

Where the source documents are silent or contradict each other, §13 gives a **default assumption**. The agent proceeds on the default, logs it in `DECISIONS.md`, and keeps the value in one config file so the owner can change it without code changes.

---

## 1. Summary

Coconut Station is a premium coconut beverage and dessert brand with its Tangail flagship outlet (Bottola Bazar More, Bibekanondo School Market, Tangail). Brand promise: **Fresh. Natural. Just for You.**

The website has three jobs:

1. **Sell** — a fast, mobile-first ordering flow (delivery or outlet pickup) for the full menu.
2. **Build trust** — hygiene, freshness and premium cues (smart cutting, sealed straw, chilled, natural).
3. **Scale** — a franchise-ready, multi-outlet data model so Dhaka and Bogura are configuration, not a rebuild.

## 2. Goals, non-goals, metrics

### Goals
- G1. A first-time visitor understands what Coconut Station sells and where to get it within 5 seconds of landing (hero + trust strip).
- G2. A returning customer can reorder in ≤ 4 taps on mobile (menu → add → checkout → place order).
- G3. The owner can run daily operations without a developer: see orders, update status, mark items sold out, change prices.
- G4. The site looks and feels like the supplied design mock: airy cream canvas, deep leaf green, real product photography.
- G5. Deployable to a public domain with one command path (Vercel or Docker) and a written runbook.

### Non-goals (MVP)
Customer accounts/loyalty, native apps, live courier map, stock counts per SKU, product reviews, gift cards, subscriptions, franchise portal. (Parked in §4 "Later".)

### Success metrics (proposed baselines — revisit after 30 days of real traffic)
| Metric | Target |
|---|---|
| Lighthouse mobile (Home, Menu) — Performance / A11y / SEO / Best Practices | ≥ 90 / ≥ 95 / ≥ 95 / ≥ 95 |
| LCP on Slow-4G mid-range Android | ≤ 2.5 s |
| Checkout completion (`purchase` ÷ `begin_checkout`) | ≥ 50 % |
| Order-to-owner alert latency | ≤ 10 s |
| Bulk / event inquiries | tracked from day 1; target set after first month |
| Owner task success without developer (mark sold out, update status) | 100 % in usability check |

## 3. Audience and scenarios

Scenario-first, mapped to the ten lifestyle campaigns in the master plan.

| Persona | Scenario | What the site must do |
|---|---|---|
| **Morning walker** (Tangail) | Finishes a walk at 6:30, wants a chilled coconut on the way back | Show "Open now", hours, address, directions in ≤ 2 taps |
| **Friday family** | Weekend outing, 4–6 people, mixed tastes (kids want ice cream) | Family-friendly moment picker, multi-item cart, pickup slot |
| **Health-conscious parents** | Looking for lower-sugar options | Clear "No Extra Sugar" tag, allergen info, calm tone |
| **Office break** | Colleague orders 8 drinks for the team | Fast quantity edits, delivery, digital payment |
| **Student** | Budget snack between classes | Small sizes (100/200 ml), visible prices, no account needed |
| **Event planner** (wedding, birthday, corporate) | Needs 100+ servings on a date | Bulk & Events wizard with estimate, callback within a day |
| **Owner / counter staff** | Orders arrive while serving customers | Loud, glanceable admin; one-tap status changes; sold-out toggle |

## 4. Scope

| Priority | Included |
|---|---|
| **Must (MVP launch)** | All pages in §5; catalog; cart; checkout (COD + manual wallet); order tracking; owner alerts; admin lite; Events & Bulk wizard; EN + BN; SEO; analytics; deploy + runbook |
| **Should (MVP if time, else v1.1)** | Promo codes; SSLCommerz sandbox integration; Blog with ≥ 3 published posts; Bangla review by native speaker |
| **Could (Later)** | Reviews, subscriptions ("daily morning coconut"), loyalty, live courier tracking, franchise inquiry portal, SMS notifications, POS sync |

### Additions beyond the master plan (owner may veto any)
| Addition | Why |
|---|---|
| Shoppable hero hotspots | Turns the hero into the fastest path to add-to-cart |
| Moment picker (10 campaigns → product bundles) | Makes the lifestyle campaigns interactive and drives basket size |
| Manual bKash/Nagad/Rocket payment + COD | Works on day 1 with no merchant approval; gateway plugs in later |
| WhatsApp order fallback | Zero-infrastructure backup channel customers already use |
| "Sold out today" + price overrides in admin | Fresh product, daily availability |
| Bangla locale (`/bn`) | Tangail audience; posters already carry Bangla taglines |
| "Notify me" for Dhaka/Bogura | Captures demand for the expansion plan |
| Allergen chips | Ice cream carries peanuts; puddings/shakes contain milk |

## 5. Sitemap and navigation

```
/                     Home
/menu                 Our Menu  →  /menu/[slug]  (product detail)
/about                About Us (Philosophy, Vision, Mission, Values, Brand Promise; anchor #story = Our Story)
/why-coconut          Why Coconut / Healthy Lifestyle (moment picker)
/outlets              Outlets (Tangail live; Dhaka, Bogura coming soon)
/events               Events & Bulk Orders
/gallery              Gallery
/blog  /blog/[slug]   Blog
/contact              Contact
/cart  /checkout  /order/[code]     Commerce
/legal/privacy  /legal/terms  /legal/delivery
/admin/*              Owner only (noindex, auth)
/bn/…                 Bangla mirror of every public route (English has no prefix)
```

**Primary nav (matches mock):** Home · Our Menu · About Us · Why Coconut · Outlets · Order Now, plus cart icon, language switch, and the green **Find an Outlet** pill.
**Footer nav:** Events & Bulk Orders · Gallery · Blog · Contact · Legal.
"Order Now" routes to `/menu`. "Our Story" is a section of `/about` (the source content has no founder narrative — do not invent one).

## 6. Functional requirements

Acceptance criteria (AC) are testable statements. "Mock" = `assets/reference/design-mock-home.webp`.

### 6.1 Global shell
- **FR-GLB-01 Header.** Logo left; nav centre; cart icon with count badge, language switch, **Find an Outlet** pill right. Sticky, compacts from 88 px to 64 px after 24 px scroll. AC: at ≥ 1280 px it matches the mock; below 1024 px the nav becomes a full-height sheet; all targets ≥ 44 px.
- **FR-GLB-02 Announcement bar.** Shows one of: *Opening 16 August* (before opening date), *Now open — Bottola Bazar More, Tangail* (open hours), *Closed — opens at {time}* (after hours). Computed in `Asia/Dhaka` from `siteConfig`. AC: unit-tested for before/after opening date and across hours boundaries.
- **FR-GLB-03 Footer.** Cream mono logo on deep-green surface, nav columns, outlet address + hours, social links, payment methods text (only those enabled), legal, "Coming soon: Dhaka · Bogura".
- **FR-GLB-04 Mobile bottom bar.** On Home, Menu, PDP: "{n} items · ৳{total} · View cart" appears once cart is non-empty. AC: never overlaps the WhatsApp button (button offsets above it).
- **FR-GLB-05 Global states.** Branded 404, error boundary, route-level loading skeletons; cart works offline (localStorage), checkout shows a clear offline message.
- **FR-GLB-06 Quick contact.** WhatsApp and call actions available from header (desktop) and floating button (mobile).

### 6.2 Home
- **FR-HOME-01 Hero.** Per mock: H1 **FRESH. NATURAL.** + script line *Just for You.* + supporting copy ("Bringing nature's finest coconut experience to your everyday life.") + tagline row ("Healthy Lifestyle Starts with Simple Choices.") + CTAs **Explore Menu** (→ `/menu`) and **Find an Outlet** (→ `/outlets`). Scene image right (`hero-scene-desktop.webp` / `-mobile.webp`), left fade to cream. One orchestrated load sequence (see design doc §8). AC: LCP element is the hero image with `priority`; CLS < 0.05.
- **FR-HOME-02 Trust strip.** Seven items with icons: 100% Natural · Fresh Daily · Hygienic & Safe · Premium Quality · Smart Cutting · Digital Payment · Home Delivery. Desktop: single bar overlapping hero bottom; mobile: horizontal scroll-snap. Each item has a tooltip/popover with one-line proof text.
- **FR-HOME-03 Shoppable hotspots.** Tappable dots on hero products (coconut, water bottle, coffee, puddings, outlet). Tap opens a compact popover: name, "from ৳X", **Add** button, link to PDP. Coordinates per breakpoint are in design doc §5.2. AC: keyboard reachable, popover dismisses on Esc/outside click.
- **FR-HOME-04 Pick your size.** Interactive comparator for Live Coconut (Premium/Regular/Lite, ml ranges) and Coconut Water sizes. Selecting a size swaps image, ml range, price; **Add to cart** inline.
- **FR-HOME-05 Signature menu.** Carousel of the 8 product families with quick add.
- **FR-HOME-06 Why coconut.** 3–4 fact cards. Claims policy in §9.3 applies.
- **FR-HOME-07 Moment picker teaser.** Three moments with a link to `/why-coconut`.
- **FR-HOME-08 Outlet spotlight.** Exterior + interior imagery, address, hours, live *Open now* badge, **Get directions**.
- **FR-HOME-09 Bulk & events band.** Deep-green band, CTA → `/events`.
- **FR-HOME-10 Blog teasers.** Latest 3 published posts; section hidden when none.
- **FR-HOME-11 FAQ.** 6–8 questions (delivery area, hygiene, sealed straw, payment methods, bulk lead time, allergens, opening hours, cancellation).
- **FR-HOME-12 Expansion notify.** Email/phone capture for Dhaka or Bogura → `subscribers`.

### 6.3 Menu and product detail
- **FR-MENU-01 Listing.** Category chips (All · Coconut & Water · Desserts · Shakes & Coffee), sticky under header; search; sort (Recommended, Price ↑/↓); dietary/allergen filters (No extra sugar, Contains peanuts, Contains milk). AC: filters are URL-driven (`?cat=&q=&sort=`), shareable, back-button safe.
- **FR-MENU-02 Product card.** Image, name, size pills (if variants), price for selected size, tags, **Add** button → quantity stepper in place. Sold-out items show "Sold out today" and disable Add. AC: changing size updates image, price and ml text without layout shift.
- **FR-MENU-03 Feature banners.** Poster images (`assets/posters/`) appear as full-width banners between category groups, never inside grids.
- **FR-PDP-01 Product page** `/menu/[slug]`: gallery, variant selector, quantity, add to cart, description, what's inside, allergen chips, "Pairs well with" (2 items), share. Sticky add-to-cart bar on mobile. AC: `Product` + `Offer` JSON-LD in BDT; OG image per product.
- **FR-PDP-02 Quick view** from cards opens a bottom sheet (mobile) / dialog (desktop) with the same content.

### 6.4 Cart
- **FR-CART-01 Cart drawer/sheet** opens on add (desktop) or shows toast + bottom bar (mobile). Edit quantity, remove (5-second undo), order note, subtotal, delivery estimate.
- **FR-CART-02 Persistence.** Stored in localStorage, synced across tabs; each line stores only `{sku, qty}`; prices are re-read from the catalog on every render.
- **FR-CART-03 Free-delivery progress bar** when a threshold is configured.
- **FR-CART-04 Fly-to-cart** micro-interaction (design doc §8), disabled under reduced motion.
- **FR-CART-05 Promo code** field (Should). Feature-flagged; server-validated.

### 6.5 Checkout
- **FR-CHK-01 Single-page accordion:** Contact → Fulfilment → Payment → Review. Guest only.
- **FR-CHK-02 Contact.** Name; phone validated as Bangladesh mobile (`^(?:\+?88)?01[3-9]\d{8}$`, normalised to `01XXXXXXXXX`); optional email.
- **FR-CHK-03 Fulfilment.** *Delivery* (area from configured zones, address line, landmark, notes) or *Pickup* (outlet). Time: **ASAP** or a slot (30-min steps, earliest = now + prep lead time, within opening hours).
- **FR-CHK-04 Payment.** Methods enabled by config: Cash on delivery/pickup; bKash / Nagad / Rocket (manual — instructions + TrxID + sender last 4 digits); Online gateway (later).
- **FR-CHK-05 Server-side truth.** Client totals are display-only. The server recomputes every price, fee and total from catalog + overrides and rejects unavailable items. AC: a tampered client payload cannot change price (integration test).
- **FR-CHK-06 Idempotency.** Each attempt carries a UUID `idempotencyKey`; double-submit returns the same order.
- **FR-CHK-07 Errors.** Inline, specific, next to the field; summary announced to screen readers; never lose entered data.
- **FR-CHK-08 Closed / out-of-zone states** are explained with a way forward (schedule for later, choose pickup, call us).

### 6.6 Orders and tracking
- **FR-ORD-01 Order code** like `CS-7K2M9Q4T` (8 chars, unambiguous base-32, unguessable).
- **FR-ORD-02 Confirmation page** `/order/[code]`: summary, payment instructions if pending, WhatsApp share, "Track" link, outlet contact.
- **FR-ORD-03 Tracking timeline** with statuses per fulfilment type (§8.4). Auto-refresh every 20 s while non-terminal. Public view exposes **no personal data** (no phone, address, name).
- **FR-ORD-04 Order audit trail** (`order_events`) for every status/payment change with actor and time.

### 6.7 Payments
- **FR-PAY-01 Provider interface** (contract in the plan): COD, manual wallet, mock gateway (non-production only), SSLCommerz adapter (feature flag, sandbox first).
- **FR-PAY-02 Manual wallet flow.** Show merchant number and exact amount, order code as reference; customer submits TrxID + sender last 4; order shows `pending_verification` until admin marks paid.
- **FR-PAY-03 Webhooks/IPN** (gateway phase): signature/validation-API check, idempotent, never trusts redirect params alone.

### 6.8 Admin lite (`/admin`, noindex)
- **FR-ADM-01 Auth.** Single owner credential (bcrypt hash in env), signed httpOnly session cookie, login rate limit, logout.
- **FR-ADM-02 Orders board.** Columns by status, newest first, elapsed timer, filter by fulfilment/payment. Detail view with customer contact (tap-to-call/WhatsApp), items, notes, payment reference. One-tap status advance (allowed transitions only), mark payment verified, cancel with reason.
- **FR-ADM-03 New-order alert** in the open admin tab (optional chime, toggle) — polls every 15 s.
- **FR-ADM-04 Availability & pricing.** Per-SKU "Sold out today" toggle (auto-resets at 04:00 `Asia/Dhaka`), price override, effective immediately (cache revalidation).
- **FR-ADM-05 Inquiries & subscribers** lists with status and CSV export.
- **FR-ADM-06 Print ticket** view for the kitchen (narrow, high-contrast).

### 6.9 Events & Bulk Orders
- **FR-EVT-01 Wizard:** event type (Wedding, Birthday, Corporate, Other) → date + guests + venue area → items & quantities → contact. Live estimate (only when prices are confirmed); otherwise "We'll send a quote".
- **FR-EVT-02** Stores an `inquiries` row, alerts the owner, shows confirmation with WhatsApp handoff. Minimum lead time configurable.

### 6.10 Outlets
- **FR-OUT-01** Tangail card: address, hours table, live Open-now badge, phone/WhatsApp, directions link, map (static image with click-to-load embed), exterior/interior images.
- **FR-OUT-02** Dhaka and Bogura "Coming soon" cards with notify-me form. Data-driven from `outlets` config so a new outlet is a config entry.

### 6.11 Content pages
- **FR-STORY-01 About:** Brand Philosophy, Who We Are, Vision, Mission, Values (7), Brand Promise, Services, Expansion timeline.
- **FR-WHY-01 Why Coconut / Healthy Lifestyle:** moment picker (10 moments → 2–3 recommended items each with one-line reason, **Add all**), then educational cards. AC: recommendations are data in `moments.ts`; no medical claims.
- **FR-GAL-01 Gallery:** masonry, categories (Outlet · Menu · Moments), lightbox with keyboard + swipe.
- **FR-BLOG-01 Blog:** MDX in repo, categories (Healthy Lifestyle, Hydration, Nutrition, Fitness, Coconut Benefits, Wellness), reading time, related posts, `Article` JSON-LD. `status: draft` posts never build for production.
- **FR-CON-01 Contact:** form → `inquiries` (type `general`), phone, WhatsApp, address, map.
- **FR-LEG-01 Legal:** Privacy, Terms, Delivery & Refund policy templates flagged **"Owner/legal review required"**.

### 6.12 Cross-cutting
- **FR-I18N-01** Locales `en` (default, no prefix) and `bn`. Language switch preserves route and query. Fonts switch per locale. Missing `bn` key falls back to `en` and logs in dev.
- **FR-SEO-01** Per-page metadata, canonical, `hreflang`, sitemap, robots, OG images, JSON-LD: `FoodEstablishment`, `Product`/`Offer`, `Article`, `FAQPage`, `BreadcrumbList`.
- **FR-ANA-01** Event wrapper for GA4 and Meta Pixel (IDs from env; disabled when empty): `view_item_list`, `select_item`, `add_to_cart`, `remove_from_cart`, `begin_checkout`, `add_payment_info`, `purchase`, `generate_lead` (bulk/contact), `select_moment`. Simple consent notice; no tracking before acceptance where consent is required by configured region.

## 7. Catalog

Source of truth: `src/content/catalog.ts` (typed). Prices are `null` until the owner supplies them.

| Product (slug) | Variants → SKU | Category | Image | Tags / allergens | Notes |
|---|---|---|---|---|---|
| Live Young Coconut (`live-coconut`) | Premium 500–700 ml → `live-coconut-premium`; Regular 400–550 ml → `live-coconut-regular`; Lite 300–400 ml → `live-coconut-lite` | Coconut & Water | `coconut-premium/regular/lite.webp` | smart-cut, sealed-straw, chilled | Sizes from poster |
| Coconut Water (`coconut-water`) | 100 ml → `coconut-water-100`; 200 ml → `-200`; 300 ml → `-300` | Coconut & Water | `water-100/200/300ml.webp` | 100% natural, no preservatives | **400 ml conflict — §13 Q2** |
| Glass Bottle Coconut Water (`coconut-water-glass`) | TBD | Coconut & Water | — (gap) | — | In Content v1 only; **hidden until image + size + price exist** |
| Coconut Pudding (`coconut-pudding`) | No Extra Sugar → `pudding-no-sugar`; Classic → `pudding-classic`; Double Layer → `pudding-double-layer` | Desserts | `pudding-*.webp` | no-extra-sugar (first), contains-milk | Double layer = daber pani + milk |
| Coconut Meat (`coconut-meat`) | Cup → `coconut-meat` | Coconut & Water | — (gap) | — | In Master Plan only; hidden until image exists |
| Thai Style Coconut Ice Cream (`thai-ice-cream`) | Vanilla, Chocolate, Strawberry → `thai-ice-cream-{flavor}` | Desserts | `icecream-*.webp` | **contains-peanuts**, contains-milk | Served in coconut shell; toppings: peanuts, coconut sash (nata), coconut meat, flakes |
| Coconut Milk Shake (`coconut-milk-shake`) | Regular → `coconut-milk-shake` | Shakes & Coffee | `shake-PLACEHOLDER.webp` (**low-res**) | contains-milk | Replace image before launch |
| Coconut Milk Shake with Basil Seed (`coconut-milk-shake-basil`) | Regular → `coconut-milk-shake-basil` | Shakes & Coffee | `shake-basil-PLACEHOLDER.webp` (**low-res**) | contains-milk | Replace image before launch |
| Coconut Coffee (`coconut-coffee`) | Regular → `coconut-coffee` | Shakes & Coffee | `coffee-PLACEHOLDER.webp` (**low-res**) | — | Replace image before launch |

Every `Product`/`Variant` carries: `nameEn`, `nameBn`, `descriptionEn/Bn`, `priceBDT | null`, `imageAlt`, `tags[]`, `allergens[]`, `status: 'active' | 'hidden' | 'coming_soon'`, `sort`. Hidden items never appear in listings, sitemap or search.

## 8. Commerce rules

### 8.1 Fulfilment
- **Delivery** within configured zones, each with `fee`, `minOrder`, `etaMinutes`. Fresh/chilled product means a small radius; zones start as placeholders (`TODO_ZONE`).
- **Pickup** at the outlet with a time slot. No dine-in ordering.
- **Hours & lead time** in `siteConfig.hours` (`Asia/Dhaka`). Default lead time 30 min; bulk 48 h.

### 8.2 Pricing
- Integer taka (no decimals). Display `৳1,250` (`en`) / `৳১,২৫০` (`bn`) via `Intl.NumberFormat`.
- Displayed prices are treated as VAT-inclusive (owner/accountant to confirm).
- `total = subtotal + deliveryFee − discount`. Delivery fee waived at `freeDeliveryThreshold` if set.
- Price precedence: admin override → catalog price. `null` price ⇒ item not orderable and shown as "Ask at outlet".

### 8.3 Payments
COD, manual wallet at launch. Gateway later. Refund policy text in `/legal/delivery` (owner-supplied).

### 8.4 Order state machine
```
Delivery: received → confirmed → preparing → out_for_delivery → completed
Pickup:   received → confirmed → preparing → ready → completed
Any non-terminal → cancelled (reason required)
Payment:  unpaid → pending_verification → paid | failed → refunded
```
Owner confirms manually by default (`AUTO_CONFIRM=false`). Terminal: `completed`, `cancelled`.

### 8.5 Availability
Daily "Sold out today" flags reset at 04:00 `Asia/Dhaka`. No numeric stock in MVP.

## 9. Content requirements

### 9.1 Sources of truth
Brand copy from `content/website-content-v1.md` wins over the master plan for public copy; the master plan wins for structure and campaigns. Bangla lines on the posters are reused verbatim:
- Pudding: "প্রকৃতির স্বাদ, বিশুদ্ধতার প্রতিশ্রুতি"
- Ice cream: "নারিকেলের প্রাকৃতিক স্বাদে, থাই স্টাইলে হেলদি আইসক্রিম"

### 9.2 Source conflicts (defaults in §13)
| # | Conflict | Where |
|---|---|---|
| C1 | Coconut water sizes: 100/200/**400** ml vs 100/200/**300** ml | Master Plan + interior menu board vs Content v1 + water poster |
| C2 | Vision: "Bangladesh's most trusted…" vs "South Asia's most trusted premium…" | Master Plan vs Content v1 |
| C3 | Classic pudding named "Sweets One" on the poster, "Classic Pudding" in Content v1 | Poster vs Content v1 |
| C4 | Opening date "16 August" already passed on the current date | Master Plan |
| C5 | Coconut-size ml ranges overlap (Premium 500–700, Regular 400–550, Lite 300–400) | Poster — display as given; do not "fix" |

### 9.3 Claims and safety policy
- Use only claims present in the source material (100% natural, no preservatives, hygienic, chilled, sealed straw, smart cut, made daily). Do **not** invent nutrition numbers, calories, or health outcomes (no "boosts immunity", "improves sleep", "detox").
- Blog and Why-Coconut content must be general wellness information, cite reputable sources where factual, and carry: *"General information, not medical advice."*
- **Allergens:** ice cream (peanuts, milk), puddings/shakes (milk), all products (coconut). Owner confirms the final list; the UI shows chips and a "Ask us about allergens" line.

### 9.4 Content still needed from the owner
Prices; delivery zones and fees; opening hours; phone/WhatsApp; merchant wallet numbers; Facebook/Instagram links; legal texts; Glass-bottle and Coconut-meat details; founder/origin story (optional); Google Maps pin coordinates; real photographs for coffee, shakes, coconut meat, glass bottle, and the lifestyle scenes (shot list in design doc §9).

## 10. Non-functional requirements

| ID | Requirement |
|---|---|
| NFR-PERF-01 | Home initial JS ≤ 170 kB gzip; hero image ≤ 130 kB (mobile); LCP ≤ 2.5 s Slow-4G; CLS ≤ 0.05; INP ≤ 200 ms |
| NFR-PERF-02 | All images via `next/image` (AVIF/WebP), explicit `sizes`, blur placeholders; fonts self-hosted with `display: swap` and size-adjust |
| NFR-A11Y-01 | WCAG 2.2 AA: contrast per design doc §3, visible focus, 44 px targets, keyboard-complete flows, `prefers-reduced-motion`, labelled forms, live regions for cart/checkout errors, correct `lang` |
| NFR-SEC-01 | Server-side validation (Zod) on every mutation; rate limits on orders, inquiries, login; secure headers + CSP; httpOnly/secure/sameSite cookies; Origin check on admin mutations; no secrets in client bundle; dependency audit in CI |
| NFR-PRIV-01 | Minimise PII; public order view holds none; admin-only PII; retention note in privacy policy; no PII in analytics |
| NFR-REL-01 | Order creation succeeds even if email/Telegram fail (notifications are best-effort with logged failures); `/api/health` for uptime checks |
| NFR-BROWSER-01 | Android Chrome & Samsung Internet (last 3), iOS Safari ≥ 16, desktop Chrome/Edge/Firefox/Safari (last 2) |
| NFR-NET-01 | Usable on 3G: no blocking third-party scripts; analytics loaded after interaction/idle |
| NFR-OPS-01 | One-command local start; `.env.example` complete; CI green gate; `DEPLOYMENT.md` and `OPERATIONS.md` delivered |
| NFR-I18N-01 | No hard-coded UI strings; Bangla line-height 1.75+, minimum 17 px body |

## 11. Integrations and configuration

| Concern | Choice | Env / config |
|---|---|---|
| Database | Postgres (Neon recommended; any Postgres works) | `DATABASE_URL` |
| Owner email alerts | Resend | `RESEND_API_KEY`, `ORDER_ALERT_EMAIL_TO/FROM` |
| Owner push alerts | Telegram bot (free, instant) | `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` |
| WhatsApp | click-to-chat link (`wa.me`) | `NEXT_PUBLIC_WHATSAPP_NUMBER` (`8801XXXXXXXXX`) |
| Analytics | GA4, Meta Pixel | `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_META_PIXEL_ID` |
| Payments | COD, manual wallet, mock (non-prod), SSLCommerz (flagged) | `PAYMENTS_ENABLED_METHODS`, `SSLCOMMERZ_*` |
| Admin auth | bcrypt hash + signed cookie | `ADMIN_PASSWORD_HASH`, `ADMIN_SESSION_SECRET` |
| Canonical URL | one host | `NEXT_PUBLIC_SITE_URL` |
| Launch guard | fail build on unresolved placeholders | `STRICT_LAUNCH=1` in production |

Business values (hours, zones, numbers, addresses, outlet list, opening date) live in `src/content/site.config.ts`, never in components.

## 12. Data model (summary)

`orders`, `order_items`, `order_events`, `catalog_overrides` (availability + price override), `inquiries`, `subscribers`, `notification_log`, `rate_limits`. Full column list and Drizzle definitions are in the development plan §5.

## 13. Open questions and default assumptions

The agent proceeds on the default; the owner corrects later via config.

| # | Question | Default assumption |
|---|---|---|
| Q1 | Has the outlet opened (16 Aug 2026)? | Yes. Hero eyebrow says *Now open*; state derives from `opening.date` so it self-corrects |
| Q2 | Water sizes: 300 ml or 400 ml? | **100/200/300 ml** (newest poster + Content v1). One array in `catalog.ts` |
| Q3 | Prices? | `null` ⇒ "Ask at outlet", checkout disabled until set. Dev/staging seeds clearly-fake `999` prices behind `SEED_DEMO_PRICES=1`, never in production |
| Q4 | Delivery area and fee? | One placeholder zone "Tangail town", fee/min-order from config, flagged `TODO_` |
| Q5 | Opening hours? | 09:00–22:00 daily placeholder, flagged `TODO_` |
| Q6 | Payment numbers? | Placeholders; wallet method hidden until numbers exist |
| Q7 | Vision statement? | Content v1: "South Asia's most trusted premium coconut lifestyle brand" |
| Q8 | "Sweets One" vs "Classic"? | Display **Classic Pudding**; badge text "Sweet" |
| Q9 | Bangla copy quality? | Agent drafts; every string marked `bnReview: true` in a review sheet; owner/native review before launch |
| Q10 | Domain? | Read from `NEXT_PUBLIC_SITE_URL`; nothing hard-coded |
| Q11 | Blog posts? | Three conservative drafts, `status: draft`, hidden in production until approved |
| Q12 | Social links, maps pin? | Placeholders, hidden when empty |

## 14. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Product photos are 1536×1024 poster crops; three SKUs are low-res placeholders | Cards look soft on 2× screens | `check-assets` warns on `-PLACEHOLDER`; shot list in design doc; layout tolerant of new images at any ratio |
| No prices at build time | Cannot launch commerce | Launch guard (`STRICT_LAUNCH`) + admin price editor |
| Payment gateway needs merchant approval | Delay to online payments | Manual wallet + COD at launch; adapter ready |
| Bot/spam orders | Owner alert fatigue, cost | Rate limits, honeypot field, phone validation, idempotency, admin cancel |
| Fresh/chilled quality on delivery | Brand damage | Small delivery zones, ETA display, owner-controlled zones |
| Medical/health claims | Legal/reputation | Claims policy §9.3 |
| Bangla machine-drafted | Awkward copy | Review sheet + native review gate |
| Serverless DB cold starts | Slow first order | Pooled connection string, Singapore/Mumbai region, menu pages don't need DB |
| Hero art is AI-generated composite | Logo text glitches | Logo is a separate asset; never rely on baked-in text |

## 15. Launch acceptance (Definition of Done for MVP)

All must be true, with evidence attached to the gate report:

1. Every **Must** FR passes its AC; E2E suite green on Chromium, WebKit and a 390×844 mobile profile.
2. `pnpm lint && pnpm typecheck && pnpm test && pnpm build` pass with `.env.example` values.
3. Lighthouse budgets in §2 met on Home and Menu (mobile).
4. axe: zero serious/critical issues on all public routes.
5. A COD order and a manual-wallet order can be placed, seen in admin, advanced to `completed`, and tracked publicly.
6. `STRICT_LAUNCH=1 pnpm build` passes (no `TODO_` values, no `-PLACEHOLDER` images referenced, no demo prices).
7. Deployed to the public domain over HTTPS; `scripts/smoke.mjs https://<domain>` passes; canonical host redirect works.
8. Owner runbook (`OPERATIONS.md`) walked through once with the owner.
