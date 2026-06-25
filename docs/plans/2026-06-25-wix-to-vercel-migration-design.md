# carismaaesthetics.com — Wix → Vercel Migration (Safe Cutover)

**Date:** 2026-06-25
**Owner:** Mert (CEO) · executed by Claude Code
**Goal:** Move `carismaaesthetics.com` from Wix to the new Next.js site on Vercel
without losing Google organic rankings or Google Ads landing-page Quality Score.

## Current state (verified 2026-06-25)

- `carismaaesthetics.com` (apex + `www`) still serves **Wix** (`server: Pepyaka`,
  `x-wix-request-id`). Apex 301s to `www`.
- New site is live and healthy on **Vercel** at `aesthetics-pied.vercel.app`
  (`server: Vercel`, prerendered).
- Redirect strategy already exists in `next.config.ts`:
  - `adRewrites` — URL-preserving rewrites (protect ad URLs / Quality Score / UTM).
  - `legacyRedirects` — 308 permanent redirects (retired pages, slug consolidation).
  - Catch-alls: `/post/:slug*` → `/blog`, `/product-page/:slug*` → `/`.

## Coverage audit (87 Wix `pages-sitemap` URLs vs new site)

Three live Wix URLs are unhandled and 404 on Vercel today:

| Wix URL | Fix |
|---|---|
| `/lympathic-drainage` (Wix typo) | 301 → `/lymphatic-drainage` |
| `/muscle-stimulation-1` | 301 → `/muscle-stimulation` |
| `/skin-tightening-1` | 301 → `/skin-tightening` |

Note: the `adRewrites` entries `/muscle-stimulation` and `/skin-tightening` are
dead no-ops — Next matches the real `[slug]` route first (both return 200), so the
rewrites never fire. Remove them to keep the config honest.

## Approach

**Staged cutover with low-TTL window + live rollback path.** Lead time ~1 day; the
irreversible DNS step becomes reversible in minutes. Rejected: flip-now-then-test
(slow rollback, thinner verification).

## Phases

- **Phase 0 — Close gaps (code):** add the 3 x 301s to `legacyRedirects`, delete the
  2 dead rewrites. `npm run build`, commit → Vercel auto-deploys.
- **Phase 1 — Coverage proof (read-only):** hit every URL in all 3 Wix sitemaps
  (pages, blog posts, store products) against `aesthetics-pied.vercel.app`; record
  status. **Gate: zero 404s.** Confirm new `sitemap.ts`/`robots.ts` and that
  canonicals point to `carismaaesthetics.com`.
- **Phase 2 — DNS prep:** confirm domain added in Vercel project; read current Wix
  DNS; lower TTL on A/CNAME. No cutover.
- **Phase 3 — Cutover:** repoint apex A + `www` CNAME to Vercel; SSL auto-issues.
  Executed in Wix via Playwright on Mert's final go.
- **Phase 4 — Post-cutover:** verify live domain serves Vercel + valid SSL; re-run
  redirect proof on `carismaaesthetics.com`; resubmit sitemap in Search Console;
  keep Wix live ~2 weeks as rollback.

## SEO flags (non-blocking)

1. Pages 301'd to `/` (`/about`, `/pricelist`, `/shop`, `/careers`, `/home-care`)
   are treated as soft-404 by Google. `/about` and `/pricelist` may hold equity —
   consider pointing at `/membership` or `/face-treatments`. **Default: leave as-is.**
2. Blog: verify Wix blog-post slugs in Phase 1; if new `/blog/*` slugs differ,
   change `/aesthetics-blog/:slug*` → `/blog` (index) instead of `:slug*`.

## Rollback

Revert the Wix DNS records to their pre-cutover values (captured in Phase 2). Low
TTL makes this propagate in minutes. Wix stays subscribed during the window.
