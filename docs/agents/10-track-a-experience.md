# Agent prompt — Track A · Experience

You build everything the visitor **sees and feels** before they buy: the design system, the shell, the marketing pages and the motion. Your benchmark is `design-reference/design-mock-home.webp` and `docs/03_DESIGN_SYSTEM.md`.

## Read
`AGENTS.md`, PRD §§5, 6.1, 6.2, 6.11, 9, 10 (NFR-PERF, NFR-A11Y, NFR-I18N); **design system in full**; plan §§0, 1, 4, 6 (your tasks), 7.

## You own (write access)
`src/components/{ui,layout,home,icons}`, `src/app/[locale]/(site)/{page,about,why-coconut,outlets,gallery,blog,contact,legal}`, `src/app/[locale]/_design`, `src/styles`, UI keys in `messages/*.json`, `src/content/{faq,moments}.ts`, blog MDX.
You **read but do not edit**: `src/features/*`, `src/lib/*`, API routes, admin.

## Tasks
T0.3 tokens+fonts · T0.4 i18n plumbing · T1.1 UI primitives · T1.2 icons · T1.3 shell · T1.4 SEO utilities · T2.1 hero + trust strip + hotspots · T2.2 home sections · T2.3 About · T2.4 Why Coconut + moment picker · T2.5 Outlets · T2.6 Gallery · T2.7 Blog · T2.8 Contact + legal · T5.2 Bangla UI strings + review sheet (with Track B for catalog/blog) · T6.1 front-end performance · T6.2 accessibility.

## Working rules
- **Tokens only.** Copy the `@theme` block from design §3.1 verbatim; no raw hex in components.
- **Build the hero to design §5.1–5.2** (aspect-locked scene wrapper, left mask, hotspot percentages, popover behaviour) and the load sequence in §8.2. Never animate the LCP image's opacity.
- **Data-driven:** products, outlets, FAQ, moments come from typed content files. Where Track B's catalog isn't merged yet, code against the contract types in plan §4 and use a local fixture behind the same interface.
- **Cross-track seams:** `ExpansionNotify`, contact form and the moment picker's **Add all** call APIs/stores owned by Track B. Build the UI against the contract, feature-detect until B's endpoint exists, and note it in a hand-off ticket.
- **Bilingual from the first component.** Every string via `next-intl`; check `/bn` visually for each page (line-height, overflow, digits, no uppercase).
- **Claims policy.** Only claims present in `content/*.md`; Why-Coconut and blog copy are general wellness information with the disclaimer. No medical claims, no invented numbers, no founder story.
- **Images** via `next/image` with alt from `asset-manifest.json`; posters only as banners; product photos on the multiply-blend tile (design §6.8). Label interim AI-rendered outlet images "Illustrative" per D-017.
- **Visual self-critique** on every page: screenshot 1440×900 and 390×844, compare with the mock/wireframes, list deviations in the gate report.

## Done means
Verify command passes · axe: zero serious/critical · no console errors · CLS < 0.05 · screenshots attached · commit made · checkbox ticked · hand-off ticket written if another track depends on it.
