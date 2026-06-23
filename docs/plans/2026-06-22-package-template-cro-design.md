# Package Pages — World-Class CRO Template (V2)

**Date:** 2026-06-22 · **Status:** Approved — build as preview, perfect 4-in-1 Hydrafacial first, then roll out.

## Goal
One templatized, award-winning, high-CRO layout for all 4 packages-dropdown pages
(`/snatch-your-jawline`, `/4-in-1-hydrafacial-glow`, `/exosome-glowlift`, `/ultimate-facelift`),
adapted per treatment. Modeled on the Carisma Slimming homepage spine
(`10-Tech/slimming-website`: Hero → proof → mechanism → guarantee).

## Approach (approved)
- Build the new template behind a **NEW, noindexed preview route** so the live pages
  are untouched until sign-off. Perfect **4-in-1 Hydrafacial** first.
- All new code in **isolated new files** (no edits to the live `PackageFunnel`/`packages.ts`)
  to avoid collisions while another session edits shared components + auto-deploys.
- On approval → propagate template + per-treatment data to all 4 (agents in parallel) → QC agent.

## Canonical CRO spine (`[NEW]` = not in current template)
1. **Sticky mobile CTA bar** `[NEW]` — persistent "Claim your glow · €99 →" after hero.
2. **Hero** — offer-led H1, price anchor, urgency, trust line, video/poster, gloss CTA, one-viewport.
3. **Offer / What's included** — itemized contents + price/savings anchor + 4.9★ Google. Raised glass card.
4. **How it works — StepTimeline** `[NEW, from Slimming]` — Consult → Treatment → Aftercare → Results.
5. **Before / After proof** — reuse existing per-page before/after assets.
6. **Benefits / "Get X back"** — outcome-framed, icon list.
7. **Testimonials** — real quotes + photos.
8. **Results + Medical Guarantee** `[NEW, from Slimming]` — risk-reversal + medical credibility.
9. **Why Carisma / Commitment** — authority.
10. **FAQ** — objection handling (+ FAQPage schema).
11. **Final CTA band** — strong close, urgency, price, book — Liquid Gloss.
12. **Recommended add-ons** — cross-sell. (Footer already renders doctors + "#1 Voted".)

## Layers polish
Liquid Gloss on CTAs/offer cards · faint motif watermark + one ambient blob on gradient
bands · raised cards. Tasteful, reduced-motion safe, mobile-light (per effects.css guardrails).

## Files (all new / isolated)
- `app/packages-preview/[slug]/page.tsx` — preview route, `robots: { index:false, follow:true }`.
- `components/packages/preview/PackageTemplatePreview.tsx` — the V2 template.
- `components/packages/preview/{StickyCta,HowItWorks,ResultsGuarantee}.tsx` — new sections.
- `lib/packages/preview-content.ts` — supplemental CRO content (steps, guarantee) for hydrafacial.

## Rollout (post-approval)
Swap the real `[slug]` route to render V2 for package slugs; fill the other 3 pages' data;
parallel agents per page; QC agent verifies build + section parity + links + schema across all 4.
