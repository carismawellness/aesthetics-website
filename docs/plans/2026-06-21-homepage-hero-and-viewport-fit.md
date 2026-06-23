# Homepage Hero Rebuild + One-Viewport Above-the-Fold — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the homepage hero to the approved reference design (arch-shaped
video container + bobbing social-proof cards), then make every page's
above-the-fold fit one viewport (no scroll) at 1440×900, verified by a QC subagent.

**Architecture:** Bespoke `Hero.tsx` rewrite + a shared `.hero-fit` CSS pattern
(min-height tuned to `100svh`, content centered, nav space reserved) applied to
the homepage and every other page hero, including the shared `TreatmentPage`
template. Verification is `npm run build` + Playwright at 1440×900.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind v4, CSS in `globals.css`.

**Verification gate (every task):** `npm run build` passes AND the touched
route(s), loaded at 1440×900, show the hero fully within the viewport with no
above-the-fold scroll and no clipping/overlap.

---

### Task 0: Add shared hero CSS helpers

**Files:** Modify `app/globals.css`

Add (after the buttons block):
- `--nav-clear: 104px;` token in `:root` (fixed nav + announce allowance).
- `.hero-fit { min-height: 100svh; display: flex; align-items: center;
  padding-top: var(--nav-clear); padding-bottom: clamp(16px,3vh,40px); }`
- `@keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }`
  and `floatB` (offset, e.g. -9px) for the social-proof cards.
- `.float-a{animation:floatA 5.5s ease-in-out infinite}`
  `.float-b{animation:floatB 6.5s ease-in-out infinite .6s}`
- `@media (prefers-reduced-motion: reduce){ .float-a,.float-b{animation:none} }`

Verify: `npm run build`.
Commit: `feat(hero): shared hero-fit + float keyframes`.

### Task 1: Rebuild homepage Hero

**Files:** Rewrite `components/home/Hero.tsx`

Structure per design doc. Key specs:
- `<section className="hero-fit">` → `.container` → grid `lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center`.
- Left: badge pills; headline (`GLOW WITH`/`CONFIDENCE` display `clamp(34px,3.6vw,50px)`,
  serif subline `clamp(20px,2vw,28px)` teal); paragraph `max-width:440px`;
  2×2 checklist with teal check SVGs; CTA row (`btn btn-teal` → `/consultation`,
  `btn btn-outline` → `/face-treatments`); ⓘ microcopy.
- Right: arch `div` `borderRadius: 220px 220px 18px 18px; overflow:hidden;
  aspect-ratio ~4/5; max-height ~ calc(100svh - 200px)` with sage→beige gradient
  + diagonal hatch (`repeating-linear-gradient`), holding `<video autoplay muted
  loop playsInline poster>`; two absolutely-positioned cards `.float-a`/`.float-b`.
- All text uses existing tokens (`--ink`, `--gold`, `--teal-text`, `--muted`).

Verify: build + load `/` at 1440×900 → no scroll, video plays, cards bob.
Commit: `feat(home): rebuild hero to reference design (arch video + floating proof)`.

### Task 2: Shared TreatmentPage hero fit

**Files:** Modify `components/TreatmentPage.tsx` (hero section only)

Wrap/convert the hero block to `.hero-fit` (or equivalent inline min-height),
center content, compact heading/intro/price spacing so it fits at 1440×900.
This covers ~26 treatment routes. Preserve all copy, props, schema.

Verify: build + spot-check 3 routes (`/lip-fillers-malta`, `/profhilo`,
`/hydrafacial`) at 1440×900.
Commit: `feat(treatments): one-viewport hero in shared template`.

### Task 3: Bespoke page heroes (one commit per logical group)

For each, apply the one-viewport fit (reserve nav, center, compact):
- `app/consultation/page.tsx`
- `components/MembershipPage.tsx`
- `app/e-giftcards-vouchers/page.tsx`
- `app/face-treatments/page.tsx` (index)
- `app/blog/page.tsx` (index)
- Dark-texture pages: `components/MedicalWeightLossPage.tsx`,
  `components/pico/Hero.tsx`, `components/HairRegrowthPage.tsx`
- Package/body pages present (`components/packages/*`, `components/BodyPackagePage.tsx`)

Verify each at 1440×900. Commit per group.

### Task 4: QC subagent pass

Dispatch a QC subagent (Agent tool, Playwright) over every route at 1440×900:
checks no above-fold scroll, no overlap/clipping, CTAs+glow present, tasteful.
Returns per-route PASS/FAIL + screenshots.

### Task 5: Remediate + re-QC

Fix every FAIL; re-run QC subagent until all PASS. Final `npm run build`.
Commit fixes. (Push to deploy is a separate, user-confirmed step.)
