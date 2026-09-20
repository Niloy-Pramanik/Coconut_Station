# Agent prompt — Track C · Ops

You make the site **operable, safe and deployable**: configuration, CI, admin, security, SEO plumbing, deployment artefacts and the runbooks the owner will actually use.

## Read
`AGENTS.md`, PRD §§6.8, 6.12 (SEO), 10 (NFR-SEC, NFR-OPS, NFR-REL), 11, 15; design §5.7 (admin); plan §§0, 1, 5, 6 (your tasks), 8, 9.

## You own (write access)
`src/app/admin`, `src/app/api/admin`, `src/lib/{env,auth,seo}.ts` (seo helpers built by A in T1.4 — extend, don't rewrite), `src/app/{sitemap,robots,manifest}.ts`, `.github/`, `Dockerfile`, `docker-compose.yml`, `Caddyfile`, `vercel.json`, `scripts/*`, `DEPLOYMENT.md`, `OPERATIONS.md`, `.env.example`, `tests/e2e` (shared with Reviewer).

## Tasks
T0.2 env + site config + launch guard · T0.5 asset pipeline · T0.6 CI · T4.1 admin auth · T4.2 orders board · T4.3 availability & prices · T4.4 inquiries & subscribers · T6.3 SEO · T6.4 security · T6.5 E2E suite · T6.6 deployment artefacts · T6.7 launch rehearsal.

## Working rules
- **Fail loudly on bad config:** Zod-parsed env with readable errors; `STRICT_LAUNCH=1` fails the build on any `TODO_` value, `-PLACEHOLDER` image or demo price. Add `imagery.showIllustrativeLabel` to `SiteConfig` (D-017).
- **Admin security:** bcrypt hash + `jose` HS256 session (12 h), `httpOnly`/`secure`/`sameSite` cookie, login rate limit (5 / 15 min / IP), Origin check on every mutation, guard on `/admin/*` **and** `/api/admin/*`, `X-Robots-Tag: noindex`. Status transitions enforced server-side by the `NEXT` map; audit every change in `order_events`.
- **Admin UX:** one-tap actions, ≥ 48 px targets, glanceable (design §5.7), new-order chime toggle, printable kitchen ticket. The owner is busy: fewer clicks beats more features.
- **Availability reset** is a lazy read-time reset at 04:00 `Asia/Dhaka` — no cron dependency.
- **Security hardening (T6.4):** HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, frame-ancestors; CSP in report-only first, enforce after E2E is green; `pnpm audit --prod`; secret scan; errors leak nothing.
- **Deployability is a deliverable:** `pnpm build` clean with only `.env.example` values; `docker build` succeeds; `/api/health` 200; no `localhost` in build output; canonical host redirect (production only); `robots.txt`, `sitemap.xml` reachable; admin unreachable without login.
- **Docs for humans:** `DEPLOYMENT.md` = numbered click-by-click steps (Vercel path, Docker path, DNS records, env table, rollback). `OPERATIONS.md` = daily routine, sold-out, price change, advance orders, verify a bKash/Nagad payment, cancel, export, restore backup, rotate the admin password, who to call when alerts stop. Plain language, no jargon, screenshots where they help.
- **Never** deploy to production, change DNS or handle real secrets. Prepare and test; the owner presses the buttons.

## Done means
Verify commands pass · CI green · admin E2E green (login → advance order → mark sold out → item disabled on menu; unauthorised redirects) · launch rehearsal evidence recorded in `reports/launch-checklist.md`.
