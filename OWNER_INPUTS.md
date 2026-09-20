# Owner inputs checklist

Nothing here blocks the agents from building. Until an item is supplied the site shows a safe default, and `STRICT_LAUNCH=1` **fails the production build** while any `TODO_` value, `-PLACEHOLDER` image or demo price remains.

## A. Business values (put in `src/content/site.config.ts` unless noted)
| ☐ | Item | Where | Default until supplied |
|---|---|---|---|
| ☐ | **Prices** for every SKU | Admin → Availability & prices (or `catalog.ts`) | "Ask at outlet"; checkout disabled |
| ☐ | Opening hours per weekday (`Asia/Dhaka`) | `outlets[0].hours` | 09:00–22:00 placeholder |
| ☐ | Delivery zones, fees, minimum order, ETA; free-delivery threshold | `delivery` | One placeholder zone |
| ☐ | Phone number and WhatsApp number (`8801XXXXXXXXX`) | `contact`, `NEXT_PUBLIC_WHATSAPP_NUMBER` | Hidden |
| ☐ | bKash / Nagad / Rocket **merchant** numbers | `payments.wallets` | Wallet method hidden |
| ☐ | Google Maps pin coordinates + directions link | `outlets[0].geo` | Map hidden |
| ☐ | Facebook / Instagram / TikTok / YouTube links | `social` | Hidden |
| ☐ | Owner alert email address | `ORDER_ALERT_EMAIL_TO` | Email alerts off |
| ☐ | Confirm VAT-inclusive pricing (accountant) | `DECISIONS.md` | Treated as inclusive |
| ☐ | Confirm allergen list per product | `catalog.ts` | Coconut/milk/peanuts as in PRD §9.3 |
| ☐ | Glass-bottle coconut water: size, price, photo | `catalog.ts` | Product hidden |
| ☐ | Coconut meat: size, price, photo | `catalog.ts` | Product hidden |
| ☐ | Coconut water 300 ml vs 400 ml (D-002) | `catalog.ts` | 300 ml |

## B. Legal and content
| ☐ | Item | Notes |
|---|---|---|
| ☐ | Privacy Policy, Terms, Delivery & Refund text | Templates carry an "owner/legal review required" banner |
| ☐ | Native Bangla review of `reports/bn-review.csv` | Machine-drafted until reviewed |
| ☐ | Approve or edit the 3 draft blog posts | Hidden in production until `status: published` |
| ☐ | Optional: founder/origin story | The site invents none |
| ☐ | Real photos and vector logo | See `docs/03_DESIGN_SYSTEM.md` §9 (P1 items first) |

## C. Accounts and credentials (agents prepare everything; a human creates the accounts and enters secrets)
| ☐ | Service | Needed for | Env vars |
|---|---|---|---|
| ☐ | **Domain** at your registrar | Public site | `NEXT_PUBLIC_SITE_URL` |
| ☐ | **Vercel** account (or a VPS with Docker) | Hosting | — |
| ☐ | **Postgres** (Neon suggested; Mumbai/Singapore region, pooled URL) | Orders, admin | `DATABASE_URL` |
| ☐ | **Admin password** → run `pnpm admin:hash` | `/admin` login | `ADMIN_PASSWORD_HASH`, `ADMIN_SESSION_SECRET` (random 32+ bytes) |
| ☐ | **Telegram bot** (via @BotFather) + chat id | Instant order alerts | `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` |
| ☐ | **Resend** account + verified sender | Email alerts | `RESEND_API_KEY`, `ORDER_ALERT_EMAIL_FROM/TO` |
| ☐ | GA4 property / Meta Pixel (optional) | Analytics | `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_META_PIXEL_ID` |
| ☐ | SSLCommerz merchant account (later) | Online card/wallet payments | `SSLCOMMERZ_*` |

**Never paste secrets into chat or commit them.** They go in the hosting provider's environment settings; `.env.example` lists names only.
