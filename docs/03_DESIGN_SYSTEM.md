# Coconut Station — Design System & Design Instructions

| | |
|---|---|
| Version | 1.0 — build-ready |
| Date | 2026-09-20 |
| Companions | `01_PRD.md`, `02_AGENT_DEVELOPMENT_PLAN.md`, `../MASTER_PROMPT.md` |
| Visual source of truth | `design-reference/design-mock-home.webp` (the approved home mock) + this document |
| Section numbers | Referenced by the PRD and development plan (§3–4 tokens, §5.2 hotspots, §6 components, §6.9 icons, §8 motion, §9 shot list, §10 glossary). **Do not renumber.** |

**Precedence when sources disagree:** this document → the mock → the posters → your own judgement. Where you deviate from the mock, log it in the phase gate report ("Deviations from design").

---

## 1. Design intent

**One sentence:** an airy, sunlit coconut stand — cream canvas, deep leaf green, real product photography — that feels premium because it is calm, confident and precise, not because it is loaded with effects.

### 1.1 Principles
1. **Product is the hero.** Real photography carries the page. Never replace a product image with an illustration, gradient or emoji.
2. **Air, then green.** Most of every screen is cream canvas. Deep green appears only where it earns attention: primary actions, headings, the footer and the bulk-orders band.
3. **Two voices in type.** Heavy, upright, uppercase Fira Sans for statements. A hand-lettered script (Marck Script) for one warm line at a time. Never more than one script line per viewport.
4. **Fresh, not clinical.** Rounded pills, soft shadows, leaf motifs, gentle motion. No hard black, no sharp corners, no neon.
5. **Trust cues are visible but quiet.** The seven trust items (natural, fresh daily, hygienic, premium, smart cutting, digital payment, home delivery) are always one glance away, always in the same icon style.
6. **Fast to buy.** Every screen has one obvious next step. Add-to-cart is reachable within one tap from any product surface.
7. **Bilingual from the start.** Layouts must survive Bangla (taller line-height, no uppercase, longer strings). Test every component in `/bn`.

### 1.2 Signature devices (use consistently — they are what make the site recognisable)
| Device | Definition | Where |
|---|---|---|
| **Script eyebrow + caps title** | Marck Script 28–36 px in `leaf-700`, then an uppercase Fira Sans 800 title in `leaf-800` | Every section heading on marketing pages |
| **Leaf sprig** | Two-leaf glyph (from the tagline row in the mock) | Section dividers, list bullets, tagline flanks (`— » text « —`) |
| **Pill everything** | Buttons, chips, badges, nav pill, inputs use `--radius-pill` or `--radius-md` | Global |
| **Product on soft ground** | Product photos sit on a cream tile with a soft elliptical contact shadow beneath | Cards, size picker, PDP gallery |
| **Sunlit wash** | A very light warm radial glow behind hero and section transitions | Hero, outlet spotlight |
| **Outlined-circle icons** | 48 px circle, 1.5 px `leaf-700` ring, 24 px line icon | Trust strip, feature lists |

### 1.3 What the mock tells us (measured from `design-mock-home.webp`)
- Canvas is near-white cream with a hazy fade; the hero photograph bleeds off the right edge and dissolves into the canvas on the left.
- Header: logo left, five text links centred, cart/lang/pill right. Active link = green text + short underline. Right pill = solid green, white text, map-pin icon.
- Hero copy column ≈ 42 % of width. H1 is two words in uppercase heavy green, followed by a large brown script line with a leaf sprig, one supporting sentence, a tagline row flanked by arrows, then two pill buttons (solid + outline).
- The scene is a shop front behind, then three cups, a large coconut on a wood board and a water bottle in front, plumeria/leaves/ice cubes as props.
- The trust strip is a translucent cream band across the full width, seven evenly spaced icon+label pairs separated by hairlines, overlapping the bottom of the hero.

---

## 2. Brand assets and how to use them

| Asset | File (`public/assets/…`) | Rules |
|---|---|---|
| Logo (full) | `brand/logo-full.png` | Header (light). Min height 32 px, clear space = height of the "C". Never recolour, stretch, add effects or place on busy imagery |
| Logo (cream) | `brand/logo-full-cream.png` | Footer and any `leaf-800/900` surface |
| Logo mark | `brand/logo-icon.png`, `logo-icon-cream.png` | Favicon/PWA source, loaders, empty states, compact header on very small screens |
| Tagline lockup | `brand/logo-lockup-tagline.png` | Open Graph card, print, 404 page |
| Scenes, products, posters | `scenes/`, `products/`, `posters/` | Listed with alt text and quality in `asset-manifest.json`. Alt text always comes from the manifest |

**Status:** the logo files are transparent PNGs extracted from raster art (`quality: interim-raster`). Ask the owner for the vector logo (SVG) and swap it in without layout changes — all logo slots are sized by height, not width.

---

## 3. Colour

### 3.1 Token block (goes into `src/styles/globals.css`)
`tests/unit/tokens.test.ts` parses this block. Names must match exactly.

```css
@import "tailwindcss";

@theme {
  /* ── Canvas & surfaces ─────────────────────────────── */
  --color-canvas: #F8F7EE;        /* page background */
  --color-surface: #FFFFFF;       /* cards, inputs, sheets */
  --color-sand: #EFEBD9;          /* quiet panels, sold-out fill */
  --color-tile-from: #FFFFFF;     /* product tile gradient start */
  --color-tile-to: #F1EFE4;       /* product tile gradient end */

  /* ── Lines ────────────────────────────────────────── */
  --color-line-soft: #E8E4D3;     /* decorative dividers */
  --color-line: #D9D2BB;          /* card borders */
  --color-line-strong: #857D60;   /* input borders (≥3:1 on canvas & white) */

  /* ── Text ─────────────────────────────────────────── */
  --color-ink: #1A140C;           /* body text */
  --color-ink-soft: #4A4335;      /* secondary text */
  --color-ink-muted: #655E49;     /* captions, placeholders (≥4.5:1) */
  --color-espresso: #2E1E0B;      /* logo brown, script line */
  --color-wood: #7A451A;          /* wood/coffee accent, "Classic" badge */

  /* ── Leaf greens (brand) ─────────────────────────── */
  --color-leaf-50: #F1F5E7;
  --color-leaf-100: #E4EDD3;
  --color-leaf-200: #CDD9B2;
  --color-leaf-300: #B5D256;      /* lime tint — only on dark green surfaces */
  --color-leaf-500: #7AA20B;      /* lime accent — decorative only, never text on light */
  --color-leaf-600: #4A7C1F;
  --color-leaf-700: #366318;      /* PRIMARY: buttons, links, icons */
  --color-leaf-800: #2B5610;      /* headings, hover, active nav */
  --color-leaf-900: #1F3D12;      /* footer, bulk band, focus ring */

  /* ── Feedback ─────────────────────────────────────── */
  --color-danger: #B3261E;
  --color-danger-bg: #FBE9E7;
  --color-warning: #7A4A00;
  --color-warning-bg: #FDF1D8;
  --color-info: #0F5A6B;
  --color-info-bg: #DCF0F3;
  --color-focus: #1F3D12;

  /* ── Type ─────────────────────────────────────────── */
  --font-sans: var(--font-fira), ui-sans-serif, system-ui, "Segoe UI", Roboto, sans-serif;
  --font-script: var(--font-marck), "Brush Script MT", cursive;
  --font-bn: var(--font-hind), "Noto Sans Bengali", "Kalpurush", sans-serif;

  --text-xs: 0.8125rem;   --text-xs--line-height: 1.5;
  --text-sm: 0.9375rem;   --text-sm--line-height: 1.5;
  --text-base: 1.0625rem; --text-base--line-height: 1.65;
  --text-lg: 1.1875rem;   --text-lg--line-height: 1.6;
  --text-xl: 1.375rem;    --text-xl--line-height: 1.4;
  --text-2xl: 1.75rem;    --text-2xl--line-height: 1.25;
  --text-3xl: clamp(1.75rem, 1.3rem + 1.6vw, 2.5rem);   --text-3xl--line-height: 1.15;
  --text-4xl: clamp(2.125rem, 1.4rem + 2.6vw, 3.5rem);  --text-4xl--line-height: 1.08;
  --text-hero: clamp(2.75rem, 1.5rem + 4.8vw, 5.5rem);  --text-hero--line-height: 0.98;
  --text-script: clamp(2.5rem, 1.4rem + 4.4vw, 5rem);   --text-script--line-height: 1.05;

  /* ── Shape ────────────────────────────────────────── */
  --radius-sm: 0.5rem;
  --radius-md: 0.875rem;
  --radius-lg: 1.25rem;
  --radius-xl: 1.75rem;
  --radius-pill: 999px;

  /* ── Elevation ────────────────────────────────────── */
  --shadow-soft: 0 1px 2px rgb(46 30 11 / .06), 0 8px 24px -8px rgb(46 30 11 / .12);
  --shadow-lift: 0 2px 4px rgb(46 30 11 / .06), 0 18px 40px -12px rgb(46 30 11 / .22);
  --shadow-header: 0 1px 0 rgb(46 30 11 / .06), 0 10px 30px -18px rgb(46 30 11 / .35);
  --shadow-pop: 0 4px 8px rgb(46 30 11 / .08), 0 24px 48px -16px rgb(46 30 11 / .30);

  /* ── Layout ───────────────────────────────────────── */
  --breakpoint-sm: 40rem;
  --breakpoint-md: 48rem;
  --breakpoint-lg: 64rem;
  --breakpoint-xl: 80rem;
  --breakpoint-2xl: 96rem;
  --container-page: 80rem;

  /* ── Motion ───────────────────────────────────────── */
  --ease-out-soft: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out-soft: cubic-bezier(0.65, 0, 0.35, 1);
}

:root {
  --duration-fast: 140ms;
  --duration-base: 220ms;
  --duration-slow: 420ms;
  --duration-hero: 900ms;
  --header-h: 88px;               /* compact: 64px */
  --header-h-compact: 64px;
  --tap: 44px;
  --z-header: 40; --z-bottom-bar: 45; --z-floating: 50; --z-sheet: 60; --z-dialog: 70; --z-toast: 80;
}

/* Bangla: Hind Siliguri, generous line height, no uppercase */
:lang(bn) body { font-family: var(--font-bn); line-height: 1.8; }
:lang(bn) .uppercase { text-transform: none; }
```

**Rules**
- **No raw hex in components.** Only tokens (`bg-canvas`, `text-leaf-800`, `border-line`). Exceptions: SVG brand art and email templates.
- `leaf-500` and `leaf-300` are **decorative or on-dark only**. Never use them as text on cream.
- Never use pure black or pure white text on cream sections. Text is `ink`; white appears only inside solid green buttons and cards.
- Only one saturated colour family (green) plus warm neutrals. Product photography supplies every other colour.

### 3.2 Contrast (computed, WCAG 2.2)
| Foreground → background | Ratio | Use |
|---|---|---|
| `ink` → `canvas` | 17.0 | Body |
| `ink-soft` → `canvas` | 9.1 | Secondary |
| `ink-muted` → `canvas` | 6.0 | Captions |
| `leaf-800` → `canvas` | 8.0 | Headings |
| `leaf-700` → `canvas` | 6.6 | Links, icons |
| `leaf-600` → `canvas` | 4.7 | Large text/icons only |
| white → `leaf-700` | 7.1 | Primary button |
| `canvas` → `leaf-900` | 11.3 | Footer text |
| `leaf-300` → `leaf-900` | 7.1 | Accents on dark |
| `leaf-500` → `canvas` | **2.8 ✗** | Decorative only |
| `line-strong` → `canvas` | 3.8 | Input borders (1.4.11) |
| `danger` → `canvas` | 6.1 | Errors |
| `wood` → `canvas` | 7.3 | Wood accent text |

### 3.3 Status badge pairs (all ≥ 5.5:1)
| Meaning | Text → background |
|---|---|
| Order received / allergen chip | `warning` → `warning-bg` |
| Confirmed | `leaf-800` → `leaf-100` |
| Preparing | `#6B3A10` → `#F3E4D3` |
| Ready / Out for delivery | `info` → `info-bg` |
| Completed | `ink-soft` → `sand` |
| Cancelled / Error | `danger` → `danger-bg` |
| Sold out today | `ink-soft` → `line-soft` |

### 3.4 Focus
Double ring on every interactive element: `box-shadow: 0 0 0 2px var(--color-canvas), 0 0 0 5px var(--color-focus)` via `:focus-visible`. Works on cream, white and solid green (cream inner ring gives 6.6:1 against `leaf-700`). Never `outline: none` without this replacement.

---

## 4. Typography, spacing, layout

### 4.1 Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| UI + headings (EN) | **Fira Sans** | 400 500 600 700 800 | Headings 800 uppercase (hero) / 700 (section) |
| Script accent (EN) | **Marck Script** | 400 | One line at a time, never for body or buttons |
| Bangla | **Hind Siliguri** (`bengali` subset) | 400 500 600 700 | Replaces both Fira and Marck in `/bn` |

Load with `next/font/google` (self-hosted at build). Name the generated variables `--font-fira`, `--font-marck`, `--font-hind`; the `@theme` block above exposes them as `--font-sans / --font-script / --font-bn`. (The development plan calls the next/font variables `--font-sans` etc.; using internal names avoids a self-referencing variable. Same result.) If the build machine is offline use `next/font/local` with the same names.

### 4.2 Type scale usage
| Style | Token | Weight | Case | Colour | Used for |
|---|---|---|---|---|---|
| Hero | `text-hero` | 800 | UPPER, tracking +0.01em | `leaf-800` | "FRESH. NATURAL." |
| Script line | `text-script` | 400 (Marck) | Sentence | `espresso` | "Just for You." |
| Section title | `text-4xl` | 800 | UPPER | `leaf-800` | Section headings |
| Script eyebrow | 28–36 px | 400 (Marck) | Sentence | `leaf-700` | Above section titles |
| Page title | `text-3xl` | 700 | Sentence | `leaf-800` | Inner pages |
| Card title | `text-xl` | 600 | Sentence | `ink` | Product names |
| Body | `text-base` | 400 | — | `ink` | Paragraphs |
| Body large | `text-lg` | 400 | — | `ink-soft` | Hero supporting copy |
| Label / button | `text-sm`–`base` | 600 | — | — | Buttons, pills |
| Caption | `text-xs` | 500 | — | `ink-muted` | Meta |
| Price | `text-lg` | 700 | — | `leaf-800` | ৳ amounts, tabular numerals (`font-variant-numeric: tabular-nums`) |

Max line length 68 ch for paragraphs. Bangla body ≥ 17 px, line-height ≥ 1.75, no uppercase, no letter-spacing.

### 4.3 Spacing and grid
- Base unit 4 px (Tailwind default). Section vertical padding: **96 px** (≥ 1280), **72 px** (768–1279), **56 px** (< 768).
- Container: `max-width: var(--container-page)` (1280), gutters **24 px** (< 768), **32 px** (768–1279), **48 px** (≥ 1280).
- 12-column grid, 24 px gap desktop; 4-column, 16 px gap mobile.
- Touch targets ≥ 44 × 44 px; spacing between adjacent targets ≥ 8 px.

### 4.4 Radius and elevation usage
| Element | Radius | Shadow |
|---|---|---|
| Buttons, chips, badges, nav pill | pill | none (primary hover: `shadow-soft`) |
| Inputs | `radius-md` | none |
| Cards | `radius-lg` | `shadow-soft`, hover `shadow-lift` |
| Poster banners, big media | `radius-xl` | `shadow-soft` |
| Popovers, dialogs | `radius-lg` | `shadow-pop` |
| Sheets (mobile bottom) | `radius-xl` top corners | `shadow-pop` |

---

## 5. Layout and wireframes

### 5.1 Home

**Desktop (≥ 1280) — section order (matches PRD FR-HOME-01…12)**
```
┌ Announcement bar (32px, leaf-900, cream text) ─────────────────────────────────────┐
├ Header 88px  [logo]      Home  Our Menu  About Us  Why Coconut  Outlets  Order Now  [🛒2] [EN|বাং] (Find an Outlet) ┤
│ HERO (min-height clamp(620px, 86svh, 820px))                                          │
│  ┌ copy column (max 600px) ┐                     ┌ scene (right, bleeds to edge) ────┐│
│  │ (● Now open · Tangail)  │                     │  shop front ·  ·  ·               ││
│  │ FRESH. NATURAL.         │  ◄ left mask fade ► │  cups   coconut   bottle          ││
│  │ Just for You. 🌿        │                     │        ● hotspots ●               ││
│  │ Bringing nature's finest…                     └───────────────────────────────────┘│
│  │ ─» Healthy Lifestyle Starts with Simple Choices. «─                                  │
│  │ (Explore Menu ⊙›) (📍 Find an Outlet)                                                │
│ ┌ TRUST STRIP overlaps hero bottom by 44px ─────────────────────────────────────────┐ │
│ │ ◯100% Natural │ ◯Fresh Daily │ ◯Hygienic & Safe │ ◯Premium │ ◯Smart Cutting │ ◯Digital Payment │ ◯Home Delivery │
├ PICK YOUR SIZE  (script eyebrow · title · segmented Live Coconut | Coconut Water · big product · size pills · ml · price · Add)
├ SIGNATURE MENU  (8 families, horizontal carousel, 4 visible, quick add)
├ WHY COCONUT     (3–4 fact cards, leaf-50 panel)
├ MOMENT TEASER   (3 moment cards → /why-coconut)
├ OUTLET SPOTLIGHT (exterior + interior, address, hours, Open-now badge, Get directions)
├ BULK & EVENTS BAND (leaf-900, cream text, lime accent, CTA)
├ BLOG TEASERS    (3 cards; hidden when none)
├ FAQ             (accordion, 6–8)
├ EXPANSION NOTIFY (Dhaka | Bogura, input + pill)
└ FOOTER          (leaf-900, cream logo, columns, address+hours, socials, legal, "Coming soon: Dhaka · Bogura")
```

**Mobile (390 × 844)**
```
┌ Announcement (28px) ┐
├ Header 64px  [logo-mark+word]        [🛒] [☰] ┤
│ (● Now open · Tangail)                          │
│ FRESH.                                          │   H1 wraps to two lines
│ NATURAL.                                        │
│ Just for You. 🌿                                │
│ Bringing nature's finest coconut…               │
│ [ Explore Menu ⊙› ]  full width, 52px           │
│ [ 📍 Find an Outlet ] full width, 52px          │
│ ┌ scene 4:3, full-bleed, hotspots ● ┐           │
│ └───────────────────────────────────┘           │
│ ◯Natural ◯Fresh ◯Hygienic … (scroll-snap, 132px cards, edge fade) │
├ sections stack; carousels become swipe rails with peek of next card │
└ Bottom bar (when cart non-empty): "3 items · ৳— · View cart"  (56px, safe-area padded)
```

**Hero construction rules**
1. Scene wrapper is a positioned box with the **image's intrinsic aspect ratio** (`aspect-ratio: 971 / 735` desktop, `971 / 728` mobile). Hotspot percentages in §5.2 are relative to this box, so it must never crop the image (`object-fit: fill` on a correctly sized box).
2. Desktop: wrapper `position:absolute; right:0; bottom:0; width: clamp(640px, 62vw, 1080px)`. Apply a left mask so the photo dissolves into the canvas: `mask-image: linear-gradient(to right, transparent 0, #000 24%)`. Add a soft radial `sunlit wash` behind (`radial-gradient(60% 60% at 70% 40%, #FFFFFF 0%, transparent 70%)`).
3. Header sits over the hero on desktop (transparent at scroll 0, becomes `canvas/90` with blur + `shadow-header` after 24 px scroll). On mobile the header is solid.
4. Serve with `getImageProps()` art direction (§ dev plan T2.1): `hero-scene-mobile.webp` under 768 px, `hero-scene-desktop.webp` otherwise. `priority` + `fetchPriority="high"`, `sizes="(min-width:1280px) 62vw, 100vw"`.
5. **Never animate the opacity of the hero image** (it would delay LCP). Only text, hotspots and the trust strip animate in (§8.2).
6. The image is a 971 px wide interim render. Layout must not depend on its exact pixels: when a 2400 px replacement arrives, only the file changes (keep the aspect ratio or update the two `aspect-ratio` values and §5.2).

### 5.2 Hero hotspots (FR-HOME-03)
Coordinates are percentages of the scene wrapper (`left`, `top` = centre of the dot).

| Hotspot | Target | Desktop `left / top` | Mobile `left / top` | Popover content |
|---|---|---|---|---|
| `coconut` | product `live-coconut` | 63.6 % / 67.3 % | 63.6 % / 67.0 % | Name, "from ৳X" (cheapest orderable variant) or "Ask at outlet", **Add** (adds cheapest orderable variant), "View" → PDP |
| `water` | product `coconut-water` | 84.2 % / 64.2 % | 84.2 % / 63.9 % | same |
| `coffee` | product `coconut-coffee` | 25.6 % / 77.6 % | 25.6 % / 77.3 % | same |
| `pudding` | product `coconut-pudding` | 9.9 % / 79.6 % | 9.9 % / 79.4 % | same (first variant: No Extra Sugar) |
| `outlet` | route `/outlets` | 54.8 % / 6.5 % | 54.8 % / 5.6 % | "Coconut Station — Tangail", live Open-now badge, **Get directions**, "Visit outlet page" |

Behaviour
- Dot: 14 px filled `canvas` with a 3 px `leaf-700` ring and `shadow-soft`; hit area 44 px. Idle pulse ring (scale 1→2.2, opacity .5→0, 2.4 s, three cycles after load, then paused; runs again on hover/focus of the hero).
- Popover: Radix Popover, 260 px wide, `radius-lg`, `shadow-pop`, 64 px thumbnail from the product image, name (`text-lg` 600), price, **Add** (button md), text link "View". Opens on click/tap and on keyboard `Enter`/`Space`; closes on `Esc` and outside click. Collision-aware (flip/shift, 12 px viewport padding). Only one open at a time.
- Accessible name per dot: "{Product name} — quick add" (from messages). Dots are in DOM order left→right for tab order.
- If the product is sold out or unpriced, **Add** is replaced with "Sold out today" / "Ask at outlet" (disabled), and the dot ring turns `line-strong`.
- Hidden below 360 px width (too cramped); the trust strip and Explore Menu remain.

### 5.3 Menu (`/menu`)
```
Header
Page title block: script eyebrow "Fresh from the shell" · OUR MENU · one-line intro
Sticky bar (under header): [All] [Coconut & Water] [Desserts] [Shakes & Coffee] · search 🔍 · Sort ▾ · Filters ▾ (No extra sugar · Contains peanuts · Contains milk)
Grid 4 col (≥1280) / 3 (≥1024) / 2 (≥640) / 2 tight (mobile, 16px gap)
 … product cards …
 ┌ poster banner (full container width, never cropped) between category groups ┐
 … next group …
```
- Poster banners are **not inside the grid**. Display each at its native 3:2 with `radius-xl`, max width 1120 px centred, with a caption row below ("Live Young Coconut — three sizes", CTA "Shop coconuts"). Never crop; they contain baked-in text.
- Empty state: leaf-mark illustration (logo-icon at 40 % opacity), "No items match", **Clear filters** button.

### 5.4 Product card & PDP
**Card** (`radius-lg`, `surface`, `border-line`, padding 12/16)
```
┌──────────────────────┐
│ [tag chips ◂ top-left]│   No extra sugar · Sealed straw (max 2 visible + "+n")
│   product tile        │   aspect 1:1, tile gradient, multiply blend, contact shadow
│                       │
│ Live Young Coconut    │   card title
│ Premium · Regular · Lite   size pills (44px hit, 32px visual)
│ 500–700 ml            │   caption, updates with size
│ ৳— / Ask at outlet    │   price
│ [ Add ⊕ ]             │   pill button → becomes [ – 1 + ] stepper in place
└──────────────────────┘
```
Reserve the tile, name (2 lines), pills row and price line heights so switching size never shifts layout (CLS budget).

**PDP** (`/menu/[slug]`)
- Desktop 2-column: gallery (left, 7/12) + buy box (right, 5/12, sticky under header). Mobile: gallery (swipe, dots) → title/price → variant pills → qty → description → sticky bottom add-to-cart bar (56 px, price + Add).
- Order in buy box: title, tag chips, price, variant selector, quantity stepper, **Add to cart**, "Ask us about allergens" line, allergen chips, what's inside, delivery/pickup note, share.
- "Pairs well with" = 2 cards below. JSON-LD per PRD.

### 5.5 Cart, Checkout, Confirmation, Tracking
- **Cart sheet:** right drawer 440 px (desktop) / bottom sheet 88 svh (mobile). Line item: 64 px tile, name + variant, stepper, line price, remove (5 s undo toast). Footer sticky: subtotal, delivery estimate, free-delivery progress bar (`leaf-700` fill on `leaf-100` track), **Checkout** button (52 px).
- **Checkout:** single-page accordion. Desktop: form column (7/12) + sticky order summary (5/12). Mobile: summary collapses to a top bar "Order summary ▾ ৳—". Steps show a numbered leaf-circle (1–4) that becomes ✓ when complete. Only one step open; completed steps show a one-line summary with **Edit**.
- **Payment method cards:** radio cards (`radius-md`, 2 px `leaf-700` border when selected, cream tint). Wallet instructions panel appears **after** selection: big number with copy button, exact amount, reference = order code, then TrxID + sender-last-4 inputs.
- **Confirmation:** large check in a leaf circle, order code in a monospace-like tabular style (`CS-7K2M9Q4T`) with copy button, payment instructions if pending, WhatsApp share, Track button.
- **Tracking timeline:** vertical (mobile) / horizontal (≥ 1024) steps; done = solid `leaf-700` node + line, current = pulsing ring, upcoming = `line` outline. Cancelled shows a `danger` node with reason. Never show personal data.

### 5.6 Content pages
| Page | Layout notes |
|---|---|
| **About** | Alternating text/media bands. Order: Brand Philosophy (large pull-quote, script accent) → Who we are → Vision & Mission (two `leaf-50` cards) → Values (7 outlined-circle icon cards) → Brand Promise (leaf-900 band) → Services (5 chips/cards) → Expansion timeline (Tangail ● → Dhaka ○ → Bogura ○). **No founder story.** |
| **Why Coconut** | Hero strip, then **Moment picker**: ten pill-shaped moment chips (Morning Walk, Friday Family, Parents, Office Break, Students, Gym, Wedding, Birthday, Night Sleep, Healthy Living) in a wrapping row (mobile: horizontal scroll). Selecting one animates a recommendation panel below: title, one-line blurb, 2–3 product tiles each with a one-line reason, **Add all** + "Explore menu". Then educational cards with the disclaimer "General information, not medical advice." |
| **Outlets** | Tangail card large (exterior + interior images, hours table, Open-now badge, map with click-to-load, actions). Dhaka and Bogura as "Coming soon" cards with dashed `line-strong` borders and a notify form. |
| **Events & Bulk** | Wizard with 4 steps and a progress bar, right-hand live estimate card (sticky on desktop). Confirmation with WhatsApp handoff. |
| **Gallery** | CSS-columns masonry (2 / 3 / 4 columns), category chips, lightbox (dark `leaf-900/95` backdrop, counter, prev/next, close, swipe). |
| **Blog** | Index: featured post large + grid. Post: 720 px column, cover `radius-xl`, reading time, disclaimer box, related posts. |
| **Contact** | Two columns: form + info card (phone, WhatsApp, address, hours, map link). |
| **Legal** | Narrow column, sticky table of contents (≥ 1024), review banner (`warning-bg`). |
| **404 / error** | Logo mark (large), friendly line, buttons: Home, Menu. |

### 5.7 Admin (`/admin`)
Functional over decorative, same tokens. Density up, contrast up.
- **Orders board:** columns Received · Confirmed · Preparing · Ready/Out for delivery · Completed (today). Card: code, elapsed timer (turns `warning` after 10 min in *Received*), items summary, total, fulfilment icon, payment badge. One primary action button per card ("Confirm", "Start preparing", "Mark ready", "Out for delivery", "Complete") sized 48 px. Mobile: single column with status tabs.
- New order: card slides in with a 2-second `leaf-100` highlight; optional chime; browser tab title shows `(n) Orders`.
- **Availability:** list with switch "Sold out today" (48 px) and a price field; changes apply instantly with toast.
- **Print ticket:** 58 mm-friendly single column, black on white, 18 px minimum, large order code.
- Everything works with gloves/wet hands: targets ≥ 48 px, no hover-only controls.

---

## 6. Components

Build on shadcn/Radix; restyle to these specs. Every component ships with all states on `/_design` (dev-only style guide).

### 6.1 Button
| Variant | Style |
|---|---|
| **primary** | `bg leaf-700`, text white, pill, weight 600. Hover `leaf-800`. Active `leaf-900`, scale .98. Optional trailing circular chevron (24 px, white 20 % fill) as in the mock's "Explore Menu ⊙›" |
| **secondary** | Transparent, 1.5 px `leaf-700` border, text `leaf-800`, leading map-pin/icon. Hover `leaf-50` fill |
| **ghost** | Text `leaf-800`, hover `leaf-50` |
| **link** | Text `leaf-700`, underline 2 px offset 4, hover `leaf-800` |
| **on-dark** | `bg canvas`, text `leaf-900` (for green bands); secondary-on-dark: canvas outline |
| **danger** | `bg danger`, white |
Sizes: **md** 44 px height / 20 px x-padding / `text-sm`; **lg** 52 px / 28 px / `text-base`. Disabled: `sand` fill, `ink-muted` text, no shadow, `cursor-not-allowed`. Loading: spinner replaces the label, width locked. Icon-only buttons are 44 × 44 with an `aria-label`.

### 6.2 Chip / Pill / Badge
- **Category chip** (filter): 40 px, pill, `border-line`, selected = `bg leaf-700` white text. Hit area 44 px.
- **Size pill**: 32 px visual / 44 px hit, pill, `border-line-strong`; selected = `leaf-700` fill, white text; disabled (sold out) = strikethrough, `sand`.
- **Tag chip** (No extra sugar, Sealed straw…): 26 px, `leaf-100` bg, `leaf-800` text, leaf-sprig icon.
- **Allergen chip:** `warning-bg` / `warning`, leading `⚠`-free icon (use a small dot), text "Contains peanuts".
- **Status badge:** per §3.3, 28 px, `text-xs` 600.
- **Open-now badge:** dot (`leaf-500`, pulsing) + "Open now"; closed = grey dot + "Closed · opens 09:00".

### 6.3 Inputs
Height 52 px, `radius-md`, `surface`, 1.5 px `line-strong` border, label above (`text-sm` 600), helper/error below (`text-xs`). Focus = §3.4 ring + `leaf-700` border. Error: `danger` border + icon + message; `aria-invalid`, `aria-describedby`. Phone input: leading "+88" static chip, accepts Bengali digits. Textarea min 96 px. Select uses Radix Select styled like input. Checkbox/radio 24 px with 2 px `leaf-700` mark. **QtyStepper:** pill, three 44 px cells `–  n  +`, `n` is tabular; min 1, max 20.

### 6.4 Sheet / Dialog / Popover / Tooltip / Toast
- Sheet: right drawer (cart, filters on desktop) or bottom sheet with 40 × 4 px grabber; backdrop `leaf-900/40`; focus trapped; `Esc` closes; scroll locked.
- Dialog: centred, max 560 px, `radius-lg`; Quick view up to 880 px.
- Popover: §5.2 style. Tooltip: `leaf-900` bg, cream text, `text-xs`, 8 px radius, 300 ms delay, also shows on keyboard focus; **never the only place** essential information appears.
- Toast (Sonner): bottom-centre (mobile) / bottom-right (desktop), `surface`, `shadow-pop`, leading icon, optional **Undo**. Sits above the mobile bottom bar (`bottom: 72px`). Polite live region.

### 6.5 Accordion (FAQ, checkout)
Header 64 px min, `text-lg` 600, chevron rotates 180° in 220 ms; panel animates height (Motion) with `ease-out-soft`; dividers `line`. FAQ opens one at a time; checkout steps as described in §5.5.

### 6.6 Progress, Skeleton, Timeline
- ProgressBar: 8 px pill, `leaf-100` track, `leaf-700` fill, `role="progressbar"` with value text ("৳120 more for free delivery").
- Skeleton: `sand` blocks, 1.4 s shimmer (`translateX` gradient), disabled under reduced motion (static).
- Timeline: §5.5.

### 6.7 Header, Announcement bar, Footer, Bottom bar
- **Announcement bar:** 32 px (28 mobile), `leaf-900`, cream `text-xs` 500, centred, dismissible per session only when state is `pre_opening`.
- **Header:** 88 px → 64 px after 24 px scroll (height and logo scale 200 ms). Logo left (height 56 → 40). Nav: `text-base` 500 `ink`, gap 40 px; active = `leaf-800` + 2 px underline (24 px wide, `leaf-700`, centred, radius 2). Right cluster: cart icon button with count badge (`leaf-700`, white, 20 px, tabular), language switch (segmented "EN | বাং", 44 px), **Find an Outlet** primary pill with map-pin. < 1024 px: logo + cart + menu button; menu opens full-height sheet with large links (`text-2xl`), CTA pinned at the bottom.
- **Footer:** `leaf-900`, cream logo (height 48), 4 columns (Explore, Company, Outlet & hours, Follow), payment methods text list, legal row, "Coming soon: Dhaka · Bogura". Links `cream/80`, hover `cream` + underline. Contrast ≥ 8.5:1.
- **Mobile bottom bar:** `surface`, top border `line`, 56 px + safe-area, left "n items · ৳total", right primary button "View cart". Slides up 220 ms when the first item is added.
- **QuickContact:** WhatsApp floating action (56 px circle, WhatsApp-green **only** for this control — it is a third-party brand colour and the single exception to §3 rules), bottom-right, 16 px above the bottom bar.

### 6.8 Product tile (image treatment)
```css
.tile { background: radial-gradient(80% 70% at 50% 40%, var(--color-tile-from), var(--color-tile-to)); border-radius: var(--radius-lg); position: relative; overflow: hidden; }
.tile img { mix-blend-mode: multiply; object-fit: contain; }   /* white poster backgrounds vanish into the tile */
.tile::after { content:""; position:absolute; left:20%; right:20%; bottom:8%; height:10%; background: radial-gradient(ellipse at center, rgb(46 30 11 / .18), transparent 70%); }  /* contact shadow */
```
Rules: tile aspect 1:1 (cards) or 4:5 (PDP hero). Image padding 8 %. Images are tight crops of any aspect ratio; `object-contain` keeps them intact. Real studio photos (white or transparent background) drop in with no change. Hover (desktop): image scale 1.04, 320 ms.

### 6.9 Icons
- Style: **line icons, 1.75 px stroke, round caps and joins, `currentColor`**, drawn on a 24 px grid. Optional container: **48 px circle, 1.5 px `leaf-700` ring, transparent fill** (as in the mock's trust strip).
- Custom set (SVG components, `src/components/icons/`): `Natural` (leaf), `FreshDaily` (coconut with leaf), `Hygienic` (shield with plus), `Premium` (rosette/star), `SmartCut` (coconut with slash), `DigitalPayment` (phone with ৳), `HomeDelivery` (scooter), plus `Coconut`, `Leaf`, `SealedStraw`, `Wallet`, `Sprig` (two-leaf divider). bKash/Nagad/Rocket appear **as text only** — no trademarked logos.
- Generic UI icons (cart, menu, search, x, plus, minus, chevrons, map-pin, phone, clock, check, alert, copy, share) come from `lucide-react` at `strokeWidth={1.75}`.
- Decorative icons have `aria-hidden`; meaningful ones have a text label.

### 6.10 Trust strip
Seven items, evenly distributed, each = outlined-circle icon + two-line label (`text-sm` 500, `leaf-800`; e.g. "100%\nNatural"). Container: `bg canvas/92`, `backdrop-blur(8px)`, `radius-xl`, `shadow-soft`, padding 20 × 32, hairline dividers (`line-soft`). Desktop overlaps the hero bottom by 44 px. Mobile: horizontal scroll-snap, 132 px items, edge fade masks. Each item opens a tooltip/popover with its one-line proof text (§ PRD FR-HOME-02). Proof texts must come from source claims only (§ PRD 9.3).

### 6.11 Toasts, empty and error states
Warm, short, actionable copy. Empty cart: logo-mark, "Your cart is empty", **Browse the menu**. Errors: say what happened and what to do; never blame the customer.

---

## 7. Imagery and art direction

1. **Quality tiers** (see `asset-manifest.json`): `final` › `poster-crop` › `interim-raster` › `placeholder-low-res`. The build warns for the last three, fails for `-PLACEHOLDER` files when `STRICT_LAUNCH=1`.
2. **Never use posters as product tiles** (they contain baked-in text). Posters are banners only (§5.3).
3. **Alt text** comes from the manifest (EN + BN). Product alt describes the product, not the marketing ("Regular size live young coconut with a sealed green straw, on ice").
4. **Ratios:** hero scene 971:735 (desktop) / 971:728 (mobile); outlet images 3:2; cards 1:1; PDP 4:5; blog cover 16:9; OG 1200 × 630.
5. **`sizes`:** always set explicit `sizes` (card: `(min-width:1280px) 22vw, (min-width:768px) 30vw, 46vw`).
6. **Placeholders while loading:** blurred data-URL (`placeholder="blur"`) or `sand` block; no spinners on images.
7. **AI-rendered art disclosure:** the exterior/interior/hero images are concept renders. Do not present them as photographs of the real outlet on the Outlets page: label the interim images "Illustrative" in `figcaption` until replaced with real photography (owner can switch it off with `imagery.showIllustrativeLabel` in `site.config.ts` — add this key to the `SiteConfig` shape in task T0.2 and log it in `DECISIONS.md`).
8. **Photo style for anything new:** natural daylight, soft shadows, cream/white surfaces, wood board props, green leaves, ice, condensation; product centred with ~10 % margin; slight top-down (15–20°) angle for drinks, eye-level for coconut.

---

## 8. Motion

### 8.1 Principles
Subtle, physical, quick. Motion explains cause and effect (added to cart, opened, done) and adds a moment of delight on load; it never blocks. Use `motion/react`. Animate `transform` and `opacity` only. Respect `prefers-reduced-motion: reduce` **everywhere** (no movement; opacity/colour changes ≤ 100 ms only).

| Token | Value | Use |
|---|---|---|
| `--duration-fast` | 140 ms | Hover, press, chips |
| `--duration-base` | 220 ms | Popovers, accordions, toasts |
| `--duration-slow` | 420 ms | Sheets, page sections in |
| `--duration-hero` | 900 ms | Hero load sequence |
| `--ease-out-soft` | `cubic-bezier(.22,1,.36,1)` | Entrances |
| `--ease-in-out-soft` | `cubic-bezier(.65,0,.35,1)` | Position changes |

### 8.2 Hero load sequence (FR-HOME-01) — one orchestrated moment
Timeline from first paint (`t = 0`); total ≈ 1.4 s.
| t (ms) | Element | Motion |
|---|---|---|
| 0 | **Scene image** | Visible immediately (no opacity animation). Slow settle: `scale 1.04 → 1`, 900 ms `ease-out-soft`, transform-origin right center |
| 0 | Header | Static |
| 80 | Eyebrow pill | Fade + rise 8 px, 320 ms |
| 160 | "FRESH." | Rise 24 px from a clipped mask, 520 ms |
| 240 | "NATURAL." | Same, 80 ms after the first |
| 420 | "Just for You." | Reveal left → right via `clip-path: inset(0 100% 0 0) → inset(0)`, 700 ms; the sprig pops in (scale .6 → 1, rotate −12° → 0) at the end |
| 640 | Supporting copy, tagline row | Fade + rise 12 px, 400 ms, 80 ms stagger |
| 780 | CTAs | Rise 12 px, 80 ms stagger |
| 900 | Trust strip | Slide up 24 px + fade, children stagger 40 ms |
| 1200 | Hotspots | Dots scale in (0 → 1, spring), then start the pulse (§5.2) |
Reduced motion: everything renders in its final state immediately.

### 8.3 Fly-to-cart (FR-CART-04)
1. On **Add**, clone the product image into a 56 px circular thumbnail at the source button/tile position (`position: fixed`, `z-toast`).
2. Animate along a quadratic curve to the header cart icon (mobile: the bottom bar's count) in **650 ms**, `ease-in-out-soft`, scale 1 → 0.3, opacity 1 → 0.85. Implement with Motion `animate` on x/y using a mid-control offset (−80 px vertical).
3. On landing: cart icon "pop" (scale 1 → 1.18 → 1, 240 ms), badge number ticks (slide-up 12 px), thumbnail removed.
4. If the cart sheet is enabled on desktop, open it 200 ms after landing.
5. Under reduced motion: skip 1–3; badge changes instantly with a 100 ms colour flash; screen-reader live region announces "{name} added to cart".
6. Failure safety: if the target icon isn't in the viewport, skip the flight and show the toast.

### 8.4 Micro-interactions
| Interaction | Motion |
|---|---|
| Button press | scale .98, 140 ms |
| Card hover (pointer:fine) | translateY −4 px, `shadow-soft → shadow-lift`, 220 ms; image scale 1.04, 320 ms |
| Size pill change | Product image cross-fade 180 ms; ml text and price slide 6 px; layout fixed |
| Chip select | Background fill sweeps left → right 180 ms |
| Accordion | Height + chevron 220 ms |
| Sheet | Slide + backdrop fade 420 ms |
| Qty change | Number ticks up/down 120 ms |
| Moment picker | Panel content cross-fades + rises 12 px, 320 ms; product tiles stagger 60 ms |
| Scroll reveal | Sections below the fold fade + rise 16 px once (`whileInView`, `once: true`, margin −10 %), 420 ms. Never on above-the-fold content |
| Route change | None beyond Next default (no page-transition overlays) |
| Undo toast | Progress line shrinks over 5 s |

### 8.5 Performance rules for motion
No layout-affecting animation; `will-change` only while animating; one `IntersectionObserver` reused for reveals; lazy-load the Motion features bundle (`LazyMotion` with `domAnimation`); confetti or particle effects are **not** allowed.

---

## 9. Photography and asset shot list

Everything currently in `assets/` is interim. Priority order for the owner (P1 blocks launch quality, P2 improves conversion, P3 nice to have). Deliver on a white or light-grey seamless background where noted so the multiply-blend tile works.

| # | Shot | Spec | Priority | Replaces / used in |
|---|---|---|---|---|
| S01 | **Coconut Milk Shake** — single cup, sealed, branded | 2400 px on white, 3/4 angle, condensation | **P1** | `shake-PLACEHOLDER.webp` |
| S02 | **Coconut Milk Shake with Basil Seed** | same | **P1** | `shake-basil-PLACEHOLDER.webp` |
| S03 | **Coconut Coffee** | same | **P1** | `coffee-PLACEHOLDER.webp` |
| S04 | Live Young Coconut ×3 sizes, one per file | 2400 px on white, straw in, tag visible | P1 | `coconut-*.webp` |
| S05 | Coconut Water bottles 100/200/300 ml, one per file (+ one group shot) | 2400 px on white | P1 | `water-*.webp` |
| S06 | Coconut Pudding ×3, one per file (+ group) | 2400 px, cup + spoon | P1 | `pudding-*.webp` |
| S07 | Thai Style Coconut Ice Cream ×3 flavours, one per file | 2400 px | P1 | `icecream-*.webp` |
| S08 | **Glass Bottle Coconut Water** (+ confirm size/price) | 2400 px on white | P2 | Unhides the product |
| S09 | **Coconut Meat** cup | 2400 px on white | P2 | Unhides the product |
| S10 | Real **Tangail outlet** exterior (day + evening) and interior | 3000 px wide, 3:2 | P1 | `outlet-*.webp` |
| S11 | Hero art-direction: outlet + products, clean plate with **no baked-in text or logo** | 2400 × 1816 (desktop), 1600 × 1200 (mobile) | P2 | `hero-scene-*.webp` |
| S12 | Vector logo (SVG) + cream + one-colour versions | SVG | **P1** | `brand/logo-*.png` |
| S13–S22 | **Ten moment scenes** (Morning Walk, Friday Family, Parents, Office Break, Students, Gym, Wedding, Birthday, Night Sleep, Healthy Living) | 1600 × 1200, real people (with releases), coconut product visible | P2 | Moment picker, Why Coconut, blog covers |
| S23 | Home delivery (rider with sealed bag), corporate order (office), wedding service, digital payment at counter | 1600 × 1200 | P2 | Events page, Services |
| S24 | Team/craft: smart-cutting close-up, straw sealing, chilled display | 1600 × 1067 | P3 | About, Gallery |
| S25 | Open Graph card art (uses `brand-banner.webp` until replaced) | 1200 × 630 | P3 | OG |

Naming: `kebab-case.webp`, add an entry to `asset-manifest.json` with EN + BN alt and `quality: "final"`. Provide 2× the largest display size; the pipeline generates AVIF/WebP variants.

---

## 10. Bangla and bilingual rules

### 10.1 Typography and layout
- `lang="bn"` on `<html>`; Hind Siliguri; body ≥ 17 px, line-height ≥ 1.75; no uppercase transformation, no negative letter-spacing, no faux italics.
- Section titles in Bangla: weight 700, same colour, `text-3xl`/`text-4xl`; the script eyebrow becomes weight 500 `leaf-700` with the sprig glyph (Marck Script has no Bengali).
- Layout headroom: allow 30 % longer strings in buttons, chips, nav and tabs (no fixed widths; use `min-width` + padding). Header nav collapses to the sheet at 1180 px in `/bn` if needed.
- Numerals in Bangla mode use Bengali digits via `Intl.NumberFormat('bn-BD')`; the currency prefix is `৳`. Phone, order codes (`CS-7K2M9Q4T`) and SKUs always stay in Latin characters. Phone inputs accept Bengali digits and normalise.
- Dates/times via `Intl.DateTimeFormat` with `timeZone: 'Asia/Dhaka'`.

### 10.2 Glossary (drafts — every entry is `bnReview: true` until a native speaker signs off)
| English | Bangla |
|---|---|
| Fresh. Natural. Just for You. | তাজা। প্রাকৃতিক। শুধু আপনার জন্য। |
| Healthy Lifestyle Starts with Simple Choices. | সুস্থ জীবনযাত্রা শুরু হয় সহজ সিদ্ধান্তে। |
| Explore Menu | মেনু দেখুন |
| Find an Outlet | আউটলেট খুঁজুন |
| Order Now | এখনই অর্ডার করুন |
| Home / Our Menu / About Us / Why Coconut / Outlets | হোম / আমাদের মেনু / আমাদের সম্পর্কে / কেন নারিকেল / আউটলেট |
| Events & Bulk Orders / Gallery / Blog / Contact | ইভেন্ট ও বাল্ক অর্ডার / গ্যালারি / ব্লগ / যোগাযোগ |
| 100% Natural | ১০০% প্রাকৃতিক |
| Fresh Daily | প্রতিদিন তাজা |
| Hygienic & Safe | স্বাস্থ্যসম্মত ও নিরাপদ |
| Premium Quality | প্রিমিয়াম মান |
| Smart Cutting | স্মার্ট কাটিং |
| Digital Payment | ডিজিটাল পেমেন্ট |
| Home Delivery | হোম ডেলিভারি |
| Sealed Straw | সিল করা স্ট্র |
| Chilled for Freshness | সতেজতার জন্য ঠান্ডা |
| Live Young Coconut / Live Coconut | কচি ডাব |
| Coconut Water | ডাবের পানি |
| Premium / Regular / Lite | প্রিমিয়াম / রেগুলার / লাইট |
| Coconut Pudding | নারিকেল পুডিং |
| No Extra Sugar / Classic / Double Layer | নো এক্সট্রা সুগার / ক্লাসিক / ডাবল লেয়ার |
| Thai Style Coconut Ice Cream | থাই স্টাইল নারিকেল আইসক্রিম |
| Vanilla / Chocolate / Strawberry | ভ্যানিলা / চকলেট / স্ট্রবেরি |
| Coconut Milk Shake (with Basil Seed) | কোকোনাট মিল্ক শেক (তোকমা সহ) |
| Coconut Coffee | কোকোনাট কফি |
| Coconut Meat | নারিকেলের শাঁস |
| Add / Add to cart | যোগ করুন / কার্টে যোগ করুন |
| Cart / Checkout | কার্ট / চেকআউট |
| Delivery / Pickup | ডেলিভারি / পিকআপ |
| Cash on delivery | ক্যাশ অন ডেলিভারি |
| Sold out today | আজকের জন্য শেষ |
| Ask at outlet | আউটলেটে জিজ্ঞাসা করুন |
| Contains peanuts / Contains milk | চিনাবাদাম আছে / দুধ আছে |
| Now open / Closed / Coming soon | এখন খোলা / বন্ধ / শিগগিরই আসছে |
| Order received / Confirmed / Preparing / Ready / Out for delivery / Completed / Cancelled | অর্ডার গ্রহণ করা হয়েছে / নিশ্চিত / প্রস্তুত হচ্ছে / প্রস্তুত / ডেলিভারির পথে / সম্পন্ন / বাতিল |
| Track order | অর্ডার ট্র্যাক করুন |
| General information, not medical advice. | এটি সাধারণ তথ্য, চিকিৎসা পরামর্শ নয়। |

**Verbatim poster lines (reuse exactly, do not edit):**
- Pudding: প্রকৃতির স্বাদ, বিশুদ্ধতার প্রতিশ্রুতি
- Ice cream: নারিকেলের প্রাকৃতিক স্বাদে, থাই স্টাইলে হেলদি আইসক্রিম

### 10.3 Language switch
Segmented control "EN | বাং" (44 px). Preserves path + query. Sets a cookie only on explicit choice; no automatic redirect by browser language. `hreflang` alternates in metadata.

---

## 11. Accessibility specifics (in addition to PRD NFR-A11Y-01)

- Landmarks: skip link first, `header`, `nav[aria-label]`, `main#content`, `footer`. One `h1` per page.
- The hero H1 is real text (never part of an image). Trust items are a list (`ul`) with each proof text reachable by keyboard.
- Hotspots: buttons with `aria-haspopup="dialog"`, popovers as `role="dialog"` with focus moved inside and returned on close.
- Carousels: pause on hover/focus, arrow buttons with labels, no auto-advance.
- Size pills/segmented controls: `role="radiogroup"` with arrow-key navigation; the selected price change is announced (`aria-live="polite"`).
- Cart/checkout errors: summary at the top with `role="alert"`, each message linked to its field.
- Colour is never the only signal (sold-out uses text + strikethrough; status uses text + icon).
- Forms: visible labels, correct `autocomplete` (`name`, `tel`, `email`, `street-address`), `inputmode="tel"` for phone.
- Touch: 44 px minimum, 8 px spacing; no hover-only content.
- Zoom to 200 % and text-spacing overrides must not break layouts.

---

## 12. Do / Don't, quality gates

### 12.1 Do / Don't
| Do | Don't |
|---|---|
| Let the photo breathe; keep ≥ 60 % of each screen as canvas | Fill space with boxes, badges and gradients |
| Use green for actions and headings only | Use green as a background for whole content sections (only footer and bulk band) |
| Keep one script line per viewport | Set body text or buttons in script |
| Show real prices or "Ask at outlet" | Show fake/demo prices in production or "৳0" |
| Keep the logo on cream (or cream logo on dark green) | Place the logo over photos without a clean area |
| Make add-to-cart the most obvious control on every product surface | Hide add behind hover |
| Make claims only from the source content | Add medical claims or invented nutrition data |
| Test `/bn` at every step | Hard-code text widths |

### 12.2 "Looks like the mock" checklist (run at 1440 × 900 and 390 × 844 in every gate)
- [ ] Hero: two-word uppercase heavy green H1, brown script line with sprig, one supporting sentence, tagline row with arrows, solid + outline pill CTAs — in that order and roughly the same proportions as the mock
- [ ] Scene bleeds off the right edge and dissolves into cream on the left, no visible seam
- [ ] Header: logo left, five links, cart/lang, solid green **Find an Outlet** pill; active link green with underline
- [ ] Trust strip: seven outlined-circle items on a translucent cream band overlapping the hero
- [ ] Only green + warm neutrals in the UI chrome; product photos provide all other colour
- [ ] Corners: pills and generous radii everywhere, no sharp boxes
- [ ] No console errors, no layout shift when images or fonts load
- [ ] Same checks in Bangla: no clipped glyphs, no overflow, line-height ≥ 1.75

### 12.3 Token compliance
`pnpm lint` includes a rule (ESLint `no-restricted-syntax` or a small script) that fails on hex colours (`#[0-9A-Fa-f]{3,8}`) and Tailwind arbitrary colour values (`bg-[#…]`) inside `src/components` and `src/app`.
