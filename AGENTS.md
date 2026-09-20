# AGENTS.md — Coconut Station

Context for any coding agent working in this repository. Keep it short; the detail is in `docs/`.

## What this is
A premium, fully interactive, **bilingual (EN + BN) e-commerce website** for **Coconut Station**, a coconut beverage and dessert brand (flagship: Bottola Bazar More, Bibekanondo School Market, Tangail, Bangladesh). Guest checkout with delivery/pickup, COD + manual bKash/Nagad/Rocket payments, owner admin, events & bulk inquiries. Franchise-ready (Dhaka and Bogura are config entries). Must deploy to a public domain.

## Read order
1. `docs/01_PRD.md` — requirements (`FR-*`, `NFR-*`)
2. `docs/03_DESIGN_SYSTEM.md` — tokens, wireframes, hotspots, motion, Bangla glossary
3. `docs/02_AGENT_DEVELOPMENT_PLAN.md` — architecture, contracts, schema, phases/tasks
4. `content/*.md` — brand copy (only source for public claims)
5. `MASTER_PROMPT.md` — how the agents are run · `docs/agents/*.md` — per-agent prompts
6. `DECISIONS.md` (log assumptions here) · `OWNER_INPUTS.md` (what the owner must still supply)

Precedence: PRD → design system → dev plan → brand content → judgement.

## Stack (verify current APIs in the docs — do not rely on memory)
Next.js App Router · React · TypeScript strict · Tailwind CSS v4 (`@theme`) · shadcn/ui (Radix) · Motion · Zustand · react-hook-form + Zod · next-intl · Drizzle + Postgres · bcryptjs + jose · Resend + Telegram · MDX · Vitest · Playwright + axe · pnpm · Node ≥ 22.

## Commands (defined in task T0.1)
```
pnpm dev | build | start          pnpm lint | typecheck | test | test:e2e
pnpm db:generate | db:migrate | db:seed
pnpm assets:check | launch:check | shots | smoke <url> | admin:hash
node bootstrap/verify-pack.mjs    # sanity-check docs + asset manifest
```

## Where things live
```
docs/  content/  DECISIONS.md  OWNER_INPUTS.md  reports/          project knowledge
public/assets/{brand,scenes,products,posters}  + asset-manifest.json   served images (alt text lives in the manifest)
design-reference/                  design mock + source originals — NOT served
src/{app,components,features,lib,content,i18n,styles}  messages/{en,bn}.json
```
Business values (hours, zones, numbers, opening date, outlets) → `src/content/site.config.ts`. Catalog → `src/content/catalog.ts`. Never in components.

## Non-negotiables
- Nothing hard-coded; unknown values are `TODO_…` placeholders (the launch guard reports them).
- Never invent prices, contact details, reviews, founder stories, nutrition numbers or health claims.
- Server recomputes price/fee/availability; money is integer BDT; public order view has no PII.
- No secrets in the repo or client bundle.
- Design tokens only (no raw hex); all strings via `next-intl`; images via `next/image` with manifest alt text.
- WCAG 2.2 AA, keyboard-complete, `prefers-reduced-motion` respected.
- Test first for pure logic. One Conventional Commit per task. Do not edit `content/`, `docs/01–03`, `design-reference/`.

## File ownership (multi-agent)
Track A Experience · Track B Commerce · Track C Ops · Reviewer (read-only). See `docs/agents/` and plan §7. No track edits another track's directories.
