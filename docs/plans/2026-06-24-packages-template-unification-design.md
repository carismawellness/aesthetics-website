# Packages Template Unification — Design

**Date:** 2026-06-24  
**Status:** Approved  
**Scope:** All 9 package pages (4 face + 5 body)

---

## Problem

The site has three separate, inconsistent package rendering systems:

- **Face packages (4):** `PackageFunnel.tsx` + monolithic `lib/packages.ts`
- **Body packages (5):** `BodyPackagePage.tsx` + per-file `lib/bodypkg/*.ts`
- **V2 preview (1):** `PackageTemplatePreview.tsx` + `lib/packages/preview-content.ts` (noindexed, only hydrafacial)

These diverge from the canonical treatment template, carry legacy Wix/slimming-brand styling, and make the site impossible to maintain consistently.

The `docs/TREATMENT_PAGE_TEMPLATE.md` already declares that every face/body/packages page must follow the treatment template. This design makes that a reality.

---

## Packages in scope

**Face:**
1. `snatch-your-jawline`
2. `4-in-1-hydrafacial-glow`
3. `exosome-glowlift`
4. `ultimate-facelift`

**Body:**
5. `fat-freezing`
6. `muscle-stimulation-1`
7. `skin-tightening-1`
8. `anti-cellulite`
9. `lympathic-drainage` (sic — keep slug as-is to avoid redirect)

---

## Architecture

### New component: `components/PackagePage.tsx`

A server component that renders all 9 packages. Reuses every existing treatment section component in the same fixed order as `TreatmentPage.tsx`, plus three new package-only section components. `TreatmentPage.tsx` is not modified.

### New type: `lib/packages/package-types.ts`

```ts
export type PackageData = Treatment & {
  offer?: OfferStack;    // price-anchor card (was→now + included list)
  dualPack?: DualPack;  // second-tier upsell pricing
  closing?: ClosingCta; // final CTA band
}
```

Extends the proven `Treatment` type (already has `category: "Package"`, `evidence`, `reviews`, `planSummary`, `difference`, `recommended`, `faq`, etc.).

### New data modules: `lib/packages/<slug>.ts` (×9)

One file per package. All existing content migrated from `lib/packages.ts` / `lib/bodypkg/*.ts` with zero net content loss. Copy is bespoke per page.

### Route update: `app/[slug]/page.tsx`

The two old branches collapse into one:

```ts
// Before:
if (pkg) return <PackageFunnel data={pkg} />
if (bodyPkg) return <BodyPackagePage content={bodyPkg} />

// After:
if (pkg) return <PackagePage data={pkg} />
```

### V2 preview retirement

`app/packages-preview/` route, `components/packages/preview/`, and `lib/packages/preview-content.ts` / `preview-types.ts` are deleted after their CRO ideas are mined into the unified template (offer-stack card, closing CTA band, urgency chip patterns).

### Files to retire (after migration)

- `components/packages/PackageFunnel.tsx`
- `components/BodyPackagePage.tsx`
- `lib/packages.ts`
- `lib/bodypkg/` (entire folder)
- `app/packages-preview/` (entire route)
- `components/packages/preview/` (entire folder)
- `lib/packages/preview-content.ts`, `lib/packages/preview-types.ts`

---

## Section spine (fixed order, top → bottom)

Treatment sections reused as-is (same components, same order as `TreatmentPage.tsx`):

| # | Section | Component | Notes |
|---|---------|-----------|-------|
| 1 | Hero | `PageHero` | Offer-led copy; `hero.bookHref` → Fresha |
| — | OfferStack | `packages/OfferStack` (**new**) | Immediately below hero: price anchor (was/now/save), "What's included" list, urgency chip |
| 2 | Before / After | `BeforeAfterCarousel` | |
| 3 | Problem reframe | `ProblemReframe` | |
| 4 | Education | inline | optional |
| 5 | Guarantee | `GuaranteeBand` | "Natural Confidence Guarantee" |
| 6 | Precision areas | inline | optional |
| 7 | Suitability personas | `SuitabilityCards` | |
| 8 | 3-step experience | inline | |
| 9 | Top-clinic authority | `TopClinic` | |
| 10 | Plan summary | `PlanSummary` | |
| — | DualPack | `packages/DualPack` (**new**) | Optional: second-tier pricing upsell |
| 11 | Patient videos | inline | optional |
| 12 | Carisma Difference + map | inline | |
| 13 | Evidence cards | `treatment/EvidenceGrid` (via inline) | Preserved from body packages |
| 14 | Prep & aftercare | inline | optional |
| 15 | Recommended | `RecommendedCards` | |
| 16 | FAQ | `TreatmentFaq` | |
| — | ClosingCta | `packages/ClosingCta` (**new**) | Final high-converting CTA band above footer |

---

## Net-new package section contracts

### `OfferStack`
```ts
type OfferStack = {
  priceNow: string;       // "€99"
  priceWas?: string;      // "€335" (anchor/strikethrough)
  saveLabel?: string;     // "Save €236 today"
  includedTitle?: string; // "Everything in your Glow Package"
  included: string[];     // line items
  urgency?: string;       // scarcity microcopy
  guaranteeChip?: string; // "Doctor-led · Medical-grade · No downtime"
  cta: { text: string; href: string; external?: boolean };
}
```

### `DualPack`
```ts
type DualPack = {
  heading: string[];      // multi-line heading
  mini: { icon: string; title: string; body: string }[];
  includes: string[];
  totalValue: string;
  todayPrice: string;
  fineprint: string[];
}
```

### `ClosingCta`
```ts
type ClosingCta = {
  heading: string;
  sub: string;
  ctaLabel: string;
  ctaHref?: string;       // defaults to hero.bookHref
}
```

---

## Execution phases

### Phase 0 — Foundation (solo, sequential)
1. Create `lib/packages/package-types.ts`
2. Create `components/packages/OfferStack.tsx`, `DualPack.tsx`, `ClosingCta.tsx`
3. Create `components/PackagePage.tsx`
4. Write pilot data `lib/packages/4-in-1-hydrafacial-glow.ts` (has V2 preview as reference)
5. Wire route: update `app/[slug]/page.tsx`, `generateStaticParams`, SEO record
6. Run `npm run build` — must be green before fan-out

### Phase 1 — Fan-out (9 agents, one per package, parallel)
Each agent:
- Reads its current data source (old `lib/packages.ts` entry OR `lib/bodypkg/<slug>.ts`)
- Writes `lib/packages/<slug>.ts` conforming to `PackageData`
- Preserves all existing content (copy, images, FAQs, evidence) without loss
- Adapts wording to be treatment-specific (never Botox/slimming-brand copy)
- Only touches its own single new data file

### Phase 2 — QC (parallel per-page, then integration)
Per-page QC agents verify:
- All mandatory sections present and populated
- Net-new sections (offer, dualPack, closing) present where applicable
- Brand tokens only (no hardcoded colours)
- Exactly one `<h1>` in rendered output
- SEO metadata set
- No cross-page copy leaks

Integration QC agent: confirms all 9 pass, then runs `npm run build` to green.

### Phase 3 — Cleanup (solo, after QC green)
Delete retired files. Run final build.

---

## Brand constraints (non-negotiable)

- Tokens only: `--gold`, `--teal-deep`, `--teal-100`, `--ink-soft`, etc. from `app/globals.css`. Never hardcode green/brown/ivory.
- Fonts: Trajan Pro (`.font-serif`, always uppercase) for headings; Novecento Wide (`.font-display`) for eyebrows; Roboto for body.
- Section backgrounds: white or soft `linear-gradient(180deg,#ffffff,#f4f8f8)`. No hard teal stops.
- Hero LCP: static `next/image` with `priority`. Video is progressive enhancement only.
- Persona: Sarah — warm, confident, empowering. Women 25+ in Malta.
