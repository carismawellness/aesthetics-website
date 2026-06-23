# Layers Design System — Liquid Gloss, Motif & Ambient Backgrounds

**Date:** 2026-06-21 · **Brand:** Carisma Aesthetics · **Status:** Approved (proving-ground phase)

## Goal
Make the site feel more 3D, premium and "alive" via three composable visual *layers*,
applied **sparingly and tastefully** — never stacking all effects in one section.

1. **Liquid Gloss** — the translucent frosted-glass surface already used in the navbar,
   systematised and extended (footer first, then sparingly site-wide).
2. **Motif** — the flowing-line stroke pattern (`public/assets/motif.svg`, brand sage-teal)
   used as a faint ambient watermark + occasional structural accents.
3. **Ambient backgrounds** — keep existing colored gradients, but add one localized,
   heavily-blurred, slowly-pulsing brand blob + a faint dot pattern; raise feature cards
   off the page; add a very subtle global box-grid pattern.

## Architecture — a shared FX layer (single source of truth)
Subagents only *place* primitives; they never reinvent them.

- **`app/effects.css`** — all Layers CSS tokens, utilities, keyframes. Imported once.
- **`components/fx/`**
  - `GlossSurface.tsx` — Liquid Gloss recipe. Variants: `pill | card | panel`, `subtle | solid`.
  - `AmbientField.tsx` — drops a localized pulsing blob + dot overlay behind a section (keeps the section's existing gradient).
  - `Motif.tsx` — `watermark` (2–6% opacity ambient) or `accent` (divider / corner flourish / behind-heading).

### Liquid Gloss recipe (extracted from `components/Header.tsx`, kept exact)
- fill `rgba(255,255,255,.66–.78)` · `backdrop-filter: blur(20–22px) saturate(180%)`
- hairline `1px solid rgba(255,255,255,.65)` border · radius pill/`20px`
- shadow `0 8–16px 30–40px rgba(28,30,30,.12–.16)` **+ signature gloss highlight `inset 0 1px 0 rgba(255,255,255,.85)`**
- `backdrop-filter` ONLY on truly floating elements (nav, footer bar, select raised cards) — never large sections.

## The taste budget (enforced guardrails)
- **Tiering:** rich bands (hero, footer, CTA/membership, package funnel) = glass + blob + motif accent.
  Content sections = at most a faint watermark or dots — often nothing. **Never all effects in one section.**
- **One pulsing blob per section, max.** Animate opacity/transform only (GPU-cheap).
- **Patterns ≤4% contrast**, static, fixed-size.
- **`prefers-reduced-motion: reduce` disables all pulsing.** Mobile = reduced blur radius/count, low-intensity pulse.
- **Contrast is sacred:** the repo just passed a WCAG AA pass. Every glass surface keeps text ≥ AA. No regressions.
- **No new horizontal overflow** (mostly-mobile Malta audience).

## Proving ground (review before fan-out)
Build primitives, then apply to: **redesigned footer · homepage · one treatment page (`/thread-lift-malta`) · one package funnel.**
Reviewed on the **live site** (auto-deploy on commit; build-gated). On approval → fan out.

## Subagents (post-approval fan-out)
- **Motif agent** — place watermark/accents per tiering.
- **Liquid Gloss agent** — apply gloss surfaces to cards/bars/CTAs per tiering.
- **Backgrounds agent** — ambient fields (blob + dots) + raised cards + box-grid per tiering.
- Shared contract = the tiering map; coordinated so no section is double-treated.

## Deploy reality (important)
A **Stop hook** (`.claude/auto-deploy.sh`) pushes committed work to `main` → Vercel production.
Push-only (never auto-commits). So: `npm run build` must pass before every commit; commits go live.
