# Coconut Station 🥥

Welcome to the official web application for **Coconut Station**! This repository powers our e-commerce platform and marketing presence, showcasing our pure, natural coconut products—from fresh smart-cut coconuts to our signature shakes and desserts.

🌐 **Live Website:** [https://www.coconutstation.com/](https://www.coconutstation.com/)

---

## 🚀 About the Project
Built with modern web technologies, this platform delivers a seamless, responsive, and high-performance experience. It allows customers to browse our catalog, check allergen information, and explore our growing list of outlets.

### Tech Stack
- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

## 🛠 Getting Started (Local Development)
1. Clone the repository and navigate into the directory.
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run the development server:
   ```bash
   pnpm dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## What's inside
```
MASTER_PROMPT.md            the working prompt (orchestrator + multi-agent instructions)
AGENTS.md  CLAUDE.md        persistent context that agent tools load automatically
DECISIONS.md                assumptions log, pre-seeded (D-001…D-020)
OWNER_INPUTS.md             what you still need to supply (prices, hours, numbers, accounts)
docs/
  01_PRD.md                 product requirements (FR/NFR IDs, catalog, commerce rules, launch checklist)
  02_AGENT_DEVELOPMENT_PLAN.md   architecture, contracts, DB schema, phases T0.1–T6.7, parallel tracks
  03_DESIGN_SYSTEM.md       colour/type tokens, wireframes, hero hotspots, components, motion, shot list, Bangla glossary
  agents/                   prompts for Orchestrator, Track A (Experience), B (Commerce), C (Ops), Reviewer
.claude/agents/             the same agents as Claude Code sub-agent definitions (thin wrappers)
content/                    brand master plan + website content (Markdown) and the original .docx files
assets/                     prepared images: brand/, scenes/, products/, posters/, reference/, source-originals/
                            + asset-manifest.json (alt text EN/BN, quality level, provenance)
bootstrap/                  place-assets.sh (moves assets into public/ + design-reference/), verify-pack.mjs
```

## What was prepared for you
- **Specs completed:** the design system (`03`) was the missing document; it fixes tokens sampled from your mock, wireframes, hero-hotspot coordinates measured on the actual crops, motion specs and a Bangla glossary.
- **Assets processed:** 12 product images cropped from your four posters (overlapping text removed where needed), 3 low-res placeholders for shake / basil shake / coffee (taken from the home mock), hero scene crops with the headline text removed, transparent logo files (full, cream, mark, tagline), and a manifest. Originals are kept in `assets/source-originals/`.

## Read this before launch
- **Imagery is interim.** Product photos are crops of marketing posters and the outlet/hero images are AI renders. Three SKUs (coffee, both shakes) use ~180 px placeholders and **will fail the production build** (`STRICT_LAUNCH=1`) until real photos are added (or those products are set to hidden). Shot list: `docs/03_DESIGN_SYSTEM.md` §9. The logo is a raster extraction; supply the SVG.
- **No prices, hours, delivery zones or payment numbers exist in your source files.** The site shows safe defaults ("Ask at outlet", checkout disabled) until you fill `OWNER_INPUTS.md`.
- **Source conflicts** were resolved with documented defaults (300 ml water, "Classic" pudding name, the vision wording, the passed 16 Aug opening date) — see `DECISIONS.md`; change any of them in one place.
- **Bangla is machine-drafted** and flagged for native review; the two Bangla poster lines are used verbatim.
- **Legal pages are templates** and must be reviewed by you or a lawyer. Health/wellness copy is deliberately conservative.
- The agents **cannot** register your domain, edit DNS or create accounts. `OWNER_INPUTS.md` lists the accounts (Vercel or VPS, Postgres, Telegram bot, optional Resend/GA4) and `DEPLOYMENT.md` will give click-by-click steps.

## Quick sanity check (optional)
```bash
node bootstrap/verify-pack.mjs
```
