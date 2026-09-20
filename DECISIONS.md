# DECISIONS

Log of assumptions and deviations. **Append-only.** Each entry: id · date · question · default taken · file(s) to change if the owner decides otherwise.
Agents: when you hit an ambiguity, take the default from PRD §13, add a row here, and continue. Do not stop to ask unless the plan says it is a true blocker.

## From PRD §13 (seeded)

| id | date | question | default taken | change in |
|---|---|---|---|---|
| D-001 | 2026-09-20 | Has the outlet opened (16 Aug 2026)? | Yes. Hero eyebrow says *Now open*; state derives from `opening.date` | `src/content/site.config.ts` |
| D-002 | 2026-09-20 | Coconut water sizes: 300 ml or 400 ml? | 100 / 200 / **300** ml (newest poster + Content v1). Interior menu board says 400 ml | `src/content/catalog.ts` |
| D-003 | 2026-09-20 | Prices? | `null` ⇒ "Ask at outlet"; checkout disabled until set. Demo `999` prices only with `SEED_DEMO_PRICES=1` in dev/staging | admin → Availability & prices, or `catalog.ts` |
| D-004 | 2026-09-20 | Delivery area and fee? | One placeholder zone "Tangail town", values `TODO_` | `site.config.ts → delivery.zones` |
| D-005 | 2026-09-20 | Opening hours? | 09:00–22:00 daily, `TODO_` | `site.config.ts → outlets[].hours` |
| D-006 | 2026-09-20 | Payment numbers? | Placeholders; manual-wallet method hidden until real numbers exist | `site.config.ts → payments.wallets` |
| D-007 | 2026-09-20 | Vision statement? | "South Asia's most trusted premium coconut lifestyle brand" (Content v1) | `messages/*.json` |
| D-008 | 2026-09-20 | "Sweets One" vs "Classic"? | Display **Classic Pudding**, badge "Sweet" | `catalog.ts` |
| D-009 | 2026-09-20 | Bangla copy quality? | Agent-drafted; all strings `bnReview: true` in `reports/bn-review.csv` | `messages/bn.json` |
| D-010 | 2026-09-20 | Domain? | Read from `NEXT_PUBLIC_SITE_URL`; nothing hard-coded | env |
| D-011 | 2026-09-20 | Blog posts? | Three conservative drafts, `status: draft`, hidden in production until approved | `src/content/blog/*.mdx` |
| D-012 | 2026-09-20 | Social links, map pin? | Placeholders, hidden when empty | `site.config.ts` |

## From the design hand-off (seeded)

| id | date | question | default taken | change in |
|---|---|---|---|---|
| D-013 | 2026-09-20 | Font CSS variable names | next/font variables are `--font-fira / --font-marck / --font-hind`; `@theme` exposes `--font-sans / --font-script / --font-bn` (avoids a self-referencing variable) | `src/app/[locale]/layout.tsx`, `globals.css` |
| D-014 | 2026-09-20 | Hero art | `hero-scene-*.webp` are crops of the approved mock with the headline text removed; 971 px wide. Hotspot % in design doc §5.2 belong to these crops | `03_DESIGN_SYSTEM.md §5.2`, `HeroHotspots.tsx` |
| D-015 | 2026-09-20 | Product imagery | 12 product images are crops of the four marketing posters (some clean-up by inpainting); 3 SKUs (`shake`, `shake-basil`, `coffee`) are low-res placeholders from the mock. All are interim (see manifest `quality`) | `public/assets/products/`, `asset-manifest.json` |
| D-016 | 2026-09-20 | Logo | Transparent PNGs extracted from raster art; owner to supply SVG | `public/assets/brand/` |
| D-017 | 2026-09-20 | AI-rendered outlet images | Shown with an "Illustrative" caption until real photos exist; controlled by `imagery.showIllustrativeLabel` (**add this key to `SiteConfig` in T0.2**) | `site.config.ts` |
| D-018 | 2026-09-20 | Product tile treatment | `mix-blend-mode: multiply` on a cream gradient tile with a contact shadow so white/poster backgrounds disappear (design §6.8) | `components/menu/ProductTile.tsx` |
| D-019 | 2026-09-20 | G2 human stop vs parallel tracks | At G2, Track A pauses and the report is presented; Tracks B and C continue on non-visual tasks. Nothing ships to production before G6 | orchestrator |
| D-020 | 2026-09-20 | "Order Now" nav item | Routes to `/menu` (PRD §5) | `messages`, nav config |
| D-021 | 2026-09-20 | Asset quality levels | `asset-manifest.json` uses `final`, `poster-crop`, `interim-raster`, `placeholder-low-res`. `assets:check` warns on the last three; `STRICT_LAUNCH=1` fails on any referenced `-PLACEHOLDER` file (hide the product or replace the photo) | `scripts/check-assets.mjs` |
| D-022 | 2026-09-20 | Bangla alt text in the manifest | Machine-drafted; included in `reports/bn-review.csv` | `asset-manifest.json` |
