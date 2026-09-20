# Agent prompt — Track B · Commerce

You build the parts that **take and honour orders**: catalog, pricing, cart, checkout, orders, payments, notifications, database and the public APIs. Correctness and trust matter more than polish here.

## Read
`AGENTS.md`, PRD §§6.3–6.7, 6.9, 7, 8, 10 (NFR-SEC, NFR-PRIV, NFR-REL), 11, 12; design §§5.3–5.5, 6.3–6.5, 8.3; plan §§0, 1, 4, 5, 6 (your tasks), 8.

## You own (write access)
`src/features/*`, `src/lib/{db,money,phone,ids,rate-limit}`, `src/content/{catalog,site.config}` (business values; coordinate with C), `src/app/api/*` (non-admin), `src/components/{menu,cart,checkout}`, `src/app/[locale]/(site)/{menu,cart,checkout,order}`, `drizzle/`.

## Tasks
T3.1 catalog **(first — freezes the contracts)** · T3.2 menu · T3.3 PDP · T3.4 pricing engine · T3.5 cart · T3.6 database + shared APIs · T3.7 checkout UI · T3.8 order API · T3.9 confirmation + tracking · T3.10 notifications · T3.11 payments · T5.1 events & bulk wizard · T5.2 (catalog/blog Bangla fields) · T5.3 analytics + consent · T5.4 promo codes (flagged) · T6.1 back-end performance.

## Working rules
- **Test-first** for `computePricing`, phone normalisation (Bengali digits), slot generation, cart store, catalog resolve, state machine. Integration tests against real Postgres for order creation, idempotency, rate limits, override precedence.
- **Server is truth.** `POST /api/orders` recomputes price, fee, availability; a tampered payload must not change totals (write that test). Idempotency key returns the same order. Honeypot + rate limits (5/min/IP, 10/hour/phone).
- **Money = integer BDT.** `null` price ⇒ not orderable ("Ask at outlet"). Demo prices only via `SEED_DEMO_PRICES=1` outside production.
- **Public order view has no PII.** Order codes: `CS-` + 8 chars from the unambiguous alphabet, `crypto.randomInt`.
- **Notifications are best-effort**: `Promise.allSettled`, log failures to `notification_log`, never fail the order.
- **Payments behind the interface**: COD and manual wallet at launch (hidden if numbers missing), mock gateway throws in production, SSLCommerz adapter behind a flag with server-to-server validation — read the provider's *current* docs.
- **Contracts:** implement plan §4 exactly. After T3.1 they are frozen; any change goes through the orchestrator with a `DECISIONS.md` row.
- **Interaction quality:** URL-driven menu filters (back-button safe), size pills that swap image/price/ml with **no layout shift**, quick view, fly-to-cart (design §8.3) with reduced-motion fallback, 5-second undo on remove, offline-safe cart, clear inline checkout errors that never discard input.
- Use the design tokens and primitives from Track A; if a primitive you need isn't ready, stub locally and open a hand-off ticket — do not fork the styles.

## Done means
Unit + integration tests green · Playwright `checkout-cod` and `checkout-manual-wallet` green (Chromium + mobile) · no console errors · security checklist items for your endpoints (validation, rate limit, no secret/PII leakage in errors) · commit made · checkbox ticked.
