# Homepage Hero Rebuild + Site-wide One-Viewport Above-the-Fold

Date: 2026-06-21
Status: Approved

## Goal

1. Rebuild the homepage hero to match the approved reference design (badges,
   mixed-typography headline, paragraph, 2×2 checklist, dual CTAs, microcopy),
   with an **arch-shaped media container** on the right holding the existing
   `clinic-video.mp4`, and **two floating social-proof cards** that gently bob.
2. Make **every page's above-the-fold fit within one viewport** (no scroll) at
   the **1440×900 baseline (~780px usable height)** at 100% zoom.
3. A **QC subagent** verifies every route is no-scroll, tasteful, and intact.

## Constraints / decisions

- Target viewport: **1440×900** (~780px usable; fits larger screens too).
- Fixed glass nav overlays the top (~102px: 28px announce + ~74px pill). Each
  hero must reserve that space.
- Hero media: existing `public/assets/clinic-video.mp4` (poster `clinic-room.jpg`).
- Headline reduced ~30% vs the reference: display lines `clamp(34px,3.6vw,50px)`.
- Secondary CTA "View Treatments" uses `.btn-outline`; primary uses `.btn-teal`
  (carries the existing brand gradient + glow).
- Respect `prefers-reduced-motion`: float/bob animations disabled.
- Do NOT revert the recent globals.css 2026 palette / a11y-contrast work.

## Part 1 — Homepage Hero (`components/home/Hero.tsx`, full rewrite)

Two-column grid, vertically centered inside `min-height: 100svh`, top padding to
clear the fixed nav.

Left column: badge row → headline (GLOW WITH / CONFIDENCE / serif "Naturally,
and on your terms") → paragraph → 2×2 tick checklist → CTA row → ⓘ microcopy.

Right column: arch container (top corners heavily rounded, sage→beige gradient +
faint diagonal hatch, `overflow:hidden`) holding the autoplay/muted/loop video;
two absolutely-positioned white cards overlapping the arch, each with its own
`float` keyframe (different duration/delay), motion-reduced safe.

Copy (brand voice — Sarah, "Glow with Confidence"):
- Paragraph: "Doctor-led medical aesthetics in Malta, built around one belief:
  restoration, not change. Subtle, precise, never overdone, and always guided by
  a proper medical consultation first."
- Checklist: Medically qualified doctors · Natural-looking results · Personalised
  treatment plans · Advanced, cutting-edge technology
- Microcopy: "Every journey starts with a complimentary, no-obligation doctor
  consultation."

## Part 2 — One-viewport above-the-fold (all pages)

Approach: **viewport-locked heroes**. Each hero `min-height` tuned to the
viewport, content vertically centered, type/spacing compacted with `clamp()` and
`svh` units so nothing overflows at 1440×900. Trim copy/spacing before shrinking
type into illegibility; flag any page where the trade-off is significant.

Edit points (≈11 → all routes):
- Homepage hero (Part 1)
- `components/TreatmentPage.tsx` hero → ~26 treatment pages in one edit
- Bespoke heroes: `/consultation`, `/membership`, `/e-giftcards-vouchers`,
  `/face-treatments` (index), `/blog` (index), `MedicalWeightLossPage`,
  `PicoLaserPage`/`pico/Hero`, `HairRegrowthPage`, package/body pages as present.

Rejected alternatives: (B) `vh`-scaled type — fragile/awkward; (C) global
transform-scale wrapper — blurs text.

## Part 3 — QC subagent

After build, dispatch a QC subagent that, for every route, loads it at 1440×900
in a real browser and checks: (a) above-fold fully visible, no scroll; (b) no
overlap / cramping / clipped text; (c) CTAs present with glow; (d) tasteful.
Returns per-page PASS/FAIL + screenshots. Fix every FAIL, re-run until clean.

## Verification

- `npm run build` passes (compile + TS).
- Playwright at 1440×900 per route: `document.documentElement.scrollHeight <=
  innerHeight` for the hero region (no above-fold scroll), screenshots reviewed.
