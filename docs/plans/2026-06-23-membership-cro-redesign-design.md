# Membership (Glow Club) — World-Class CRO Redesign

**Date:** 2026-06-23
**Status:** Approved (pilot page; patterns roll out to other pages later)
**Scope:** Rebuild `/membership` into a high-converting, award-quality page modeling the
Carisma Slimming home (`10-Tech/slimming-website/app/page.tsx`) CRO patterns, in the
Carisma Aesthetics brand.

## Decisions (approved)
- **Conversion:** Build a real **Glow Club join flow** at `/membership/join`
  (lead-capture form → reuses existing `/api/consultation` pipeline, tagged "Glow Club")
  → thank-you state. Replaces the broken `/sign-up` 404. **All membership CTAs → `/membership/join`.**
- **Approach:** Rebuild section-by-section into a CRO-ordered structure.
- **Reference fidelity:** Adopt Slimming home CRO structure/patterns; keep Aesthetics
  palette, fonts, voice ("Glow with Confidence", Sarah).
- **Pricing/tiers:** Keep existing offer + prices as-is (restructure presentation only).

## Section architecture (approved order)
1. Hero + floating social proof (4.9★, 200+, 30+ yrs, award) — primary CTA "Join the Glow Club"
2. Why Join — 4 value pillars (save monthly · 10% off all · 15% skincare · priority + free yearly consult)
3. How It Works — 3-step timeline (Join → Save into Glow balance → Spend at member prices)
4. Membership tiers / pricing (status cards, "most popular" highlighted) — conversion core
5. The Glow Guarantee (first-month-credited reframed as risk reversal)
6. Member benefits (detailed, with imagery)
7. Best-selling treatments at member prices
8. Real member reviews (social proof)
9. FAQ (single-source data → visible component + `FAQPage` JSON-LD)
10. Final "Join the Glow Club" CTA

## Guardrails
- Aesthetics palette/fonts/voice; pill buttons + hover/focus/card system (already built);
  **WCAG 2.2 AA contrast preserved**.
- Exactly one `<h1>`; metadata + canonical; one `FAQPage` JSON-LD (page-scoped, from shared data).
- Next.js 16 / React 19 / Tailwind v4. `npm run build` must pass before commit (auto-deploys to prod).

## Build plan (multi-agent, conflict-safe)
- **Phase 1 — Sections (parallel):** each section is its own self-contained component file
  under `components/membership/` (default export, content baked in, extracted faithfully
  from the current `MembershipPage.tsx`). Plus the **Join flow** (route + form + API wiring).
- **Phase 2 — Assembly:** rewrite `components/MembershipPage.tsx` to compose the sections
  in the approved order; repoint hero/CTAs to `/membership/join`; update `app/membership/page.tsx`
  metadata + FAQ JSON-LD.
- **Phase 3 — QC + build:** dead-link check (no `/sign-up`), join-form posts to `/api/consultation`,
  CRO checklist (proof above fold, anchored pricing, risk reversal, single clear CTA), WCAG AA,
  one h1/SEO/JSON-LD, brand consistency, `npm run build` green.
