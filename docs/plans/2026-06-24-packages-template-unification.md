# Packages Template Unification — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Unify all 9 package pages (4 face + 5 body) under the canonical treatment template by building a new `PackagePage.tsx` component that reuses all treatment section components and adds 3 package-specific sections, then retiring the two legacy templates.

**Architecture:** All 9 packages already have substantive `lib/treatments/<slug>.ts` Treatment data files; the route just intercepts them early with `PackageFunnel`/`BodyPackagePage`. This plan adds 3 new optional type fields (`offer`, `dualPack`, `closing`) to `Treatment`, builds a new `PackagePage` component, swaps the route, enriches each data file with the net-new content, and retires the old systems.

**Tech Stack:** Next.js 16.2.7 App Router, React 19, TypeScript 5, Tailwind CSS v4. No test suite — verification is `npm run build` (TypeScript + compile pass).

**Design doc:** `docs/plans/2026-06-24-packages-template-unification-design.md`

---

## PHASE 0 — Foundation

Phase 0 must complete and build green before Phase 1 agents run. All tasks in Phase 0 are sequential.

---

### Task 1: Add package-specific fields to `treatment-types.ts`

**Files:**
- Modify: `lib/treatment-types.ts`

**Step 1: Open the file and locate the end of the `Treatment` type (around line 111, before the closing `}`)**

**Step 2: Add these new types and fields**

Immediately before the closing `};` of the `Treatment` type, insert:

```ts
  /** Price-anchor card shown immediately after the hero (package pages only).
   *  Mined from V2 preview + bodypkg hero pricing. */
  offer?: {
    priceNow: string;       // e.g. "€199"
    priceWas?: string;      // anchor/strikethrough, e.g. "€550"
    saveLabel?: string;     // e.g. "Save €351 today"
    includedTitle?: string; // "Everything in your package"
    included: string[];     // line items
    urgency?: string;       // scarcity microcopy shown below the price
    guaranteeChip?: string; // e.g. "Doctor-led · No surgery · No downtime"
    cta: { text: string; href: string; external?: boolean };
  };
  /** Second-tier pricing upsell (body packages only — starter vs. full pack). */
  dualPack?: {
    heading: string[];      // multi-line heading, each entry = one line
    mini: { title: string; body: string }[];  // 2-3 bullet mini-benefits
    includes: string[];
    totalValue: string;     // e.g. "€280"
    todayPrice: string;     // e.g. "€149 ONLY"
    fineprint: string[];
  };
  /** Final CTA band shown below the FAQ, above the footer (package pages only). */
  closing?: {
    heading: string;
    sub: string;
    ctaLabel: string;
    ctaHref?: string;   // defaults to hero.bookHref
  };
```

**Step 3: Verify TypeScript — run:**

```bash
cd "10-Tech/aesthetics-website" && npx tsc --noEmit 2>&1 | head -20
```

Expected: no new errors (existing errors from other files are OK; there should be zero errors in `lib/treatment-types.ts` itself).

**Step 4: Commit**

```bash
git add lib/treatment-types.ts
git commit -m "feat(types): add offer, dualPack, closing fields to Treatment for package pages"
```

---

### Task 2: Build `OfferStack.tsx`

**Files:**
- Create: `components/packages/OfferStack.tsx`

**Step 1: Create the file**

```tsx
"use client";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { Treatment } from "@/lib/treatment-types";

type Props = { offer: NonNullable<Treatment["offer"]> };

export default function OfferStack({ offer }: Props) {
  return (
    <section
      aria-labelledby="offer-heading"
      style={{ padding: "clamp(40px,5vh,64px) 0", background: "linear-gradient(180deg,#ffffff,#f4f8f8)" }}
    >
      <div className="container">
        <Reveal>
          <div
            className="mx-auto"
            style={{
              maxWidth: 680,
              borderRadius: "var(--radius-card)",
              background: "linear-gradient(160deg,#eef4f5 0%,#ffffff 60%,#e6eef0 100%)",
              border: "1px solid var(--line)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.07)",
              padding: "clamp(28px,4vw,48px)",
            }}
          >
            {/* Price anchor */}
            <div className="flex flex-wrap items-baseline gap-3" style={{ marginBottom: 20 }}>
              <span
                className="font-serif"
                id="offer-heading"
                style={{ fontSize: "clamp(36px,5vw,52px)", color: "var(--gold)", letterSpacing: "0.02em" }}
              >
                {offer.priceNow}
              </span>
              {offer.priceWas && (
                <span
                  style={{
                    fontSize: "clamp(18px,2.5vw,24px)",
                    color: "var(--muted)",
                    textDecoration: "line-through",
                    fontFamily: "Roboto, sans-serif",
                  }}
                >
                  {offer.priceWas}
                </span>
              )}
              {offer.saveLabel && (
                <span
                  className="font-display"
                  style={{
                    fontSize: "11px",
                    background: "var(--teal-deep)",
                    color: "#fff",
                    borderRadius: "100px",
                    padding: "4px 12px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {offer.saveLabel}
                </span>
              )}
            </div>

            {/* What's included */}
            {offer.includedTitle && (
              <p
                className="font-display"
                style={{
                  fontSize: "11px",
                  color: "var(--teal-text)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                {offer.includedTitle}
              </p>
            )}
            <ul style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {offer.included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span aria-hidden="true" style={{ color: "var(--teal-text)", fontSize: 12, lineHeight: 1.7 }}>●</span>
                  <span style={{ fontSize: 14, color: "var(--label)", lineHeight: 1.6 }}>{item}</span>
                </li>
              ))}
            </ul>

            {/* Guarantee chip */}
            {offer.guaranteeChip && (
              <p
                style={{
                  fontSize: 12,
                  color: "var(--teal-text)",
                  fontFamily: "Roboto, sans-serif",
                  marginBottom: 20,
                  borderTop: "1px solid var(--line)",
                  paddingTop: 16,
                }}
              >
                {offer.guaranteeChip}
              </p>
            )}

            {/* Urgency */}
            {offer.urgency && (
              <p style={{ fontSize: 12.5, color: "var(--muted)", fontStyle: "italic", marginBottom: 20 }}>
                {offer.urgency}
              </p>
            )}

            {/* CTA */}
            {offer.cta.external ? (
              <a
                href={offer.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-teal"
                style={{ display: "inline-flex", alignItems: "center", minHeight: 44, width: "100%", justifyContent: "center" }}
              >
                {offer.cta.text}
              </a>
            ) : (
              <Link
                href={offer.cta.href}
                className="btn btn-teal"
                style={{ display: "inline-flex", alignItems: "center", minHeight: 44, width: "100%", justifyContent: "center" }}
              >
                {offer.cta.text}
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

**Step 2: Verify TypeScript**

```bash
cd "10-Tech/aesthetics-website" && npx tsc --noEmit 2>&1 | grep "OfferStack"
```

Expected: no lines (no errors in that file).

**Step 3: Commit**

```bash
git add components/packages/OfferStack.tsx
git commit -m "feat(packages): add OfferStack price-anchor section component"
```

---

### Task 3: Build `DualPack.tsx`

**Files:**
- Create: `components/packages/DualPack.tsx`

**Step 1: Create the file**

```tsx
import Reveal from "@/components/Reveal";
import type { Treatment } from "@/lib/treatment-types";

type Props = { dualPack: NonNullable<Treatment["dualPack"]> };

export default function DualPack({ dualPack }: Props) {
  return (
    <section
      aria-labelledby="dual-heading"
      style={{ padding: "clamp(60px,7vh,88px) 0", background: "#ffffff" }}
    >
      <div className="container">
        <Reveal>
          <div className="mx-auto" style={{ maxWidth: 760 }}>
            {/* Heading */}
            <h2
              id="dual-heading"
              className="font-serif text-center"
              style={{
                fontSize: "clamp(24px,3.4vw,36px)",
                color: "var(--gold)",
                letterSpacing: "0.04em",
                lineHeight: 1.25,
                marginBottom: 36,
              }}
            >
              {dualPack.heading.map((line, i) => (
                <span key={i} style={{ display: "block" }}>{line}</span>
              ))}
            </h2>

            {/* Mini bullets */}
            {dualPack.mini.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2" style={{ marginBottom: 32 }}>
                {dualPack.mini.map((m) => (
                  <div
                    key={m.title}
                    style={{
                      borderRadius: "var(--radius-card)",
                      border: "1px solid var(--line)",
                      background: "linear-gradient(160deg,#eef4f5,#ffffff)",
                      padding: "20px 22px",
                    }}
                  >
                    <p
                      className="font-display"
                      style={{ fontSize: 11, color: "var(--teal-text)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 6 }}
                    >
                      {m.title}
                    </p>
                    <p style={{ fontSize: 13.5, color: "var(--label)", lineHeight: 1.6 }}>{m.body}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Includes list */}
            <ul style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
              {dualPack.includes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span aria-hidden="true" style={{ color: "var(--teal-text)", fontSize: 12, lineHeight: 1.7 }}>●</span>
                  <span style={{ fontSize: 14, color: "var(--label)", lineHeight: 1.6 }}>{item}</span>
                </li>
              ))}
            </ul>

            {/* Pricing */}
            <div className="flex flex-wrap items-baseline gap-3" style={{ marginBottom: 10 }}>
              <span
                className="font-serif"
                style={{ fontSize: "clamp(28px,4vw,40px)", color: "var(--gold)", letterSpacing: "0.02em" }}
              >
                {dualPack.todayPrice}
              </span>
              <span style={{ fontSize: 16, color: "var(--muted)", textDecoration: "line-through" }}>
                {dualPack.totalValue}
              </span>
            </div>

            {/* Fineprint */}
            {dualPack.fineprint.map((line) => (
              <p key={line} style={{ fontSize: 11.5, color: "var(--muted)", lineHeight: 1.55, marginBottom: 4 }}>
                {line}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

**Step 2: Verify TypeScript**

```bash
cd "10-Tech/aesthetics-website" && npx tsc --noEmit 2>&1 | grep "DualPack"
```

Expected: no lines.

**Step 3: Commit**

```bash
git add components/packages/DualPack.tsx
git commit -m "feat(packages): add DualPack second-tier pricing section component"
```

---

### Task 4: Build `ClosingCta.tsx`

**Files:**
- Create: `components/packages/ClosingCta.tsx`

**Step 1: Create the file**

```tsx
import Link from "next/link";
import type { Treatment } from "@/lib/treatment-types";

const AESTHETICS_FRESHA_BOOK =
  "https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2800348&share=true&pId=2708191";

type Props = {
  closing: NonNullable<Treatment["closing"]>;
  bookHref?: string;
};

export default function ClosingCta({ closing, bookHref }: Props) {
  const href = closing.ctaHref ?? bookHref ?? AESTHETICS_FRESHA_BOOK;
  const isExternal = href.startsWith("http");

  return (
    <section
      aria-labelledby="closing-heading"
      style={{
        padding: "clamp(56px,7vh,88px) 0",
        background: "linear-gradient(160deg,#eef4f5 0%,#ffffff 50%,#e6eef0 100%)",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div className="container text-center">
        <h2
          id="closing-heading"
          className="font-serif mx-auto"
          style={{
            fontSize: "clamp(26px,3.8vw,42px)",
            color: "var(--gold)",
            letterSpacing: "0.04em",
            lineHeight: 1.25,
            maxWidth: 680,
          }}
        >
          {closing.heading}
        </h2>
        <p
          className="mx-auto"
          style={{ fontSize: 15.5, color: "var(--label)", lineHeight: 1.65, marginTop: 18, maxWidth: 560 }}
        >
          {closing.sub}
        </p>
        <div style={{ marginTop: 36 }}>
          {isExternal ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-teal"
              style={{ display: "inline-flex", alignItems: "center", minHeight: 44 }}
            >
              {closing.ctaLabel}
            </a>
          ) : (
            <Link
              href={href}
              className="btn btn-teal"
              style={{ display: "inline-flex", alignItems: "center", minHeight: 44 }}
            >
              {closing.ctaLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Verify TypeScript**

```bash
cd "10-Tech/aesthetics-website" && npx tsc --noEmit 2>&1 | grep "ClosingCta"
```

Expected: no lines.

**Step 3: Commit**

```bash
git add components/packages/ClosingCta.tsx
git commit -m "feat(packages): add ClosingCta final conversion band component"
```

---

### Task 5: Build `PackagePage.tsx`

**Files:**
- Create: `components/PackagePage.tsx`

**Important:** `PackagePage.tsx` is structurally identical to `TreatmentPage.tsx` with three additions:
1. Imports `OfferStack`, `DualPack`, `ClosingCta`
2. Renders `<OfferStack>` immediately after the hero section (before `<BeforeAfterCarousel>`)
3. Renders `<DualPack>` after `<PlanSummary>` (before patient videos)
4. Renders `<ClosingCta>` after `<TreatmentFaq>` (the very last section)

**Step 1: Copy TreatmentPage.tsx as the base**

```bash
cp "10-Tech/aesthetics-website/components/TreatmentPage.tsx" "10-Tech/aesthetics-website/components/PackagePage.tsx"
```

**Step 2: Apply these 4 targeted edits to `components/PackagePage.tsx`**

**Edit A — Add new imports** (insert after the last existing import, before the `// Fallback` constant):

```tsx
import OfferStack from "@/components/packages/OfferStack";
import DualPack from "@/components/packages/DualPack";
import ClosingCta from "@/components/packages/ClosingCta";
```

**Edit B — Insert OfferStack after hero section**

Find the closing tag of the hero section block — it ends with:
```tsx
      {/* ── Before / After carousel ── */}
```

Insert immediately before that comment:
```tsx
      {/* ── Offer / price-anchor (package pages only) ── */}
      {t.offer && <OfferStack offer={t.offer} />}

```

**Edit C — Insert DualPack after PlanSummary**

Find the PlanSummary section block, which ends with `)}` followed by a comment. After the closing `)}` of the PlanSummary conditional, insert:

```tsx
      {/* ── Dual / starter pack (body packages only) ── */}
      {t.dualPack && <DualPack dualPack={t.dualPack} />}

```

**Edit D — Insert ClosingCta after TreatmentFaq (end of the component, before the closing `</>`)**

Find the `<TreatmentFaq` render block, which is the last section in `TreatmentPage.tsx`. After its closing `)}`, and before the final `</>`, insert:

```tsx
      {/* ── Closing CTA band (package pages only) ── */}
      {t.closing && <ClosingCta closing={t.closing} bookHref={t.hero.bookHref} />}

```

**Step 3: Verify TypeScript**

```bash
cd "10-Tech/aesthetics-website" && npx tsc --noEmit 2>&1 | head -30
```

Expected: zero errors.

**Step 4: Commit**

```bash
git add components/PackagePage.tsx
git commit -m "feat(packages): add PackagePage.tsx — treatment template + 3 package sections"
```

---

### Task 6: Update route to use `PackagePage`

**Files:**
- Modify: `app/[slug]/page.tsx`

**Step 1: Add the import at the top of the file**

After the existing imports, add:

```tsx
import PackagePage from "@/components/PackagePage";
```

**Step 2: Replace the two old package branches**

Find this block (around line 227-229):

```tsx
  const pkg = PACKAGES[slug];
  if (pkg) return <>{schemas}<PackageFunnel data={pkg} /></>;
  if (bodyPackages[slug]) return <>{schemas}<BodyPackagePage content={bodyPackages[slug]} /></>;
  const t = getTreatment(slug);
  if (!t) notFound();
  return <>{schemas}<TreatmentPage t={t} /></>;
```

Replace with:

```tsx
  const t = getTreatment(slug);
  if (!t) notFound();
  if (t.category === "Package") return <>{schemas}<PackagePage t={t} /></>;
  return <>{schemas}<TreatmentPage t={t} /></>;
```

**Step 3: Remove now-unused imports**

Remove these 4 import lines from the top of the file:

```tsx
import BodyPackagePage from "@/components/BodyPackagePage";
import { bodyPackages } from "@/lib/bodypkg";
import PackageFunnel from "@/components/packages/PackageFunnel";
import { PACKAGES } from "@/lib/packages";
```

**Step 4: Run build to confirm green**

```bash
cd "10-Tech/aesthetics-website" && npm run build 2>&1 | tail -30
```

Expected: `✓ Compiled successfully` or `Route (app)` table with all package slugs listed. Zero TypeScript errors.

**Step 5: Commit**

```bash
git add app/[slug]/page.tsx
git commit -m "feat(packages): route package slugs to PackagePage, retire PackageFunnel + BodyPackagePage"
```

---

## PHASE 1 — Enrich package data files (9 agents, parallel)

**Context for each agent:** The existing `lib/treatments/<slug>.ts` file already has hero, beforeAfter, problem, suitability, experience, faq, recommended, planSummary, and difference sections populated. Your job is to add the three new package-only sections (`offer`, `dualPack`, `closing`) and any other sections that are in the old data source but missing from the treatment file. Read the source files listed for your package and enrich the treatment file.

**Each agent should:**
1. Read the existing treatment file at `lib/treatments/<slug>.ts`
2. Read the old data source listed below for their package
3. Add the `offer`, `dualPack` (if applicable), and `closing` fields to the treatment object
4. Add `evidence` field if it exists in the old source but not the treatment file
5. Add `recommended` if missing
6. Ensure all image paths from the old source are preserved (don't drop Wix or /assets paths)
7. Run `npx tsc --noEmit` to confirm no errors
8. Commit

**Important:** Do NOT rewrite existing sections. Only ADD the new fields. If a section already exists in the treatment file, leave it as-is.

---

### Task 7 (Agent): `snatch-your-jawline`

**Existing treatment file:** `lib/treatments/snatch-your-jawline.ts`  
**Old data source:** `lib/packages.ts` → `PACKAGES["snatch-your-jawline"]` (look for `hero.included`, `hero.total`, `commitment`, `offer`, `faq`, `recommended`)

**What to add:**

```ts
  offer: {
    priceNow: "from €149",     // extract from hero.prices in existing file
    priceWas: undefined,
    includedTitle: "What's included",
    included: [                 // migrate from PACKAGES["snatch-your-jawline"].hero.included
      // these are the line items from the old PACKAGES data
    ],
    guaranteeChip: "Doctor-led · Non-surgical · Minimal downtime",
    cta: { text: "Book Your Jawline Consultation", href: "https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2800348&share=true&pId=2708191", external: true },
  },
  closing: {
    heading: "Ready to Snatch Your Jawline?",
    sub: "A sharper, more defined jawline — non-surgical, doctor-led, minimal downtime. Book your free consultation at Carisma Aesthetics, Malta.",
    ctaLabel: "Book My Jawline Consultation",
    ctaHref: "https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2800348&share=true&pId=2708191",
  },
```

**Note:** No `dualPack` for face packages.

**Verify + commit:**

```bash
cd "10-Tech/aesthetics-website" && npx tsc --noEmit 2>&1 | head -5
git add lib/treatments/snatch-your-jawline.ts
git commit -m "feat(package-data): enrich snatch-your-jawline with offer + closing sections"
```

---

### Task 8 (Agent): `4-in-1-hydrafacial-glow`

**Existing treatment file:** `lib/treatments/4-in-1-hydrafacial-glow.ts`  
**Old data sources:**
- `lib/packages.ts` → `PACKAGES["4-in-1-hydrafacial-glow"]` (hero.included, hero.total, commitment, etc.)
- `lib/packages/preview-content.ts` → `hydrafacialPreview` (offer section, urgency, closing CTA, howItWorks CRO copy)

**What to add:** `offer` (mine the preview's offer.priceNow=€99, priceWas=€335, saveLabel, included, urgency, guaranteeChip) + `closing` (mine preview.closing). The included list should come from the V2 preview's `offer.included` which is the most recent/complete.

**Note:** No `dualPack` for face packages.

**Verify + commit:**

```bash
cd "10-Tech/aesthetics-website" && npx tsc --noEmit 2>&1 | head -5
git add lib/treatments/4-in-1-hydrafacial-glow.ts
git commit -m "feat(package-data): enrich 4-in-1-hydrafacial-glow with offer + closing (mined from V2 preview)"
```

---

### Task 9 (Agent): `exosome-glowlift`

**Existing treatment file:** `lib/treatments/exosome-glowlift.ts`  
**Old data source:** `lib/packages.ts` → `PACKAGES["exosome-glowlift"]` (hero.included, hero.total, commitment, faq, recommended)

**What to add:** `offer` + `closing`.

**Verify + commit:**

```bash
cd "10-Tech/aesthetics-website" && npx tsc --noEmit 2>&1 | head -5
git add lib/treatments/exosome-glowlift.ts
git commit -m "feat(package-data): enrich exosome-glowlift with offer + closing sections"
```

---

### Task 10 (Agent): `ultimate-facelift`

**Existing treatment file:** `lib/treatments/ultimate-facelift.ts`  
**Old data source:** `lib/packages.ts` → `PACKAGES["ultimate-facelift"]` (hero.included, hero.total, commitment, offer block, faq, recommended)

**What to add:** `offer` (extract pricing and included from old PACKAGES data) + `closing`.

**Verify + commit:**

```bash
cd "10-Tech/aesthetics-website" && npx tsc --noEmit 2>&1 | head -5
git add lib/treatments/ultimate-facelift.ts
git commit -m "feat(package-data): enrich ultimate-facelift with offer + closing sections"
```

---

### Task 11 (Agent): `fat-freezing`

**Existing treatment file:** `lib/treatments/fat-freezing.ts`  
**Old data source:** `lib/bodypkg/fat-freezing.ts` (heroTodayPrice=€199, heroTotalValue=€550, heroIncludes, heroFineprint, dualHeading, dualMini, dualIncludes, dualTotalValue, dualTodayPrice, dualFineprint, evidence)

**What to add:**
- `offer` (from heroTodayPrice, heroTotalValue → priceWas, heroIncludes, heroFineprint as urgency)
- `dualPack` (from dualHeading, dualMini, dualIncludes, dualTotalValue, dualTodayPrice, dualFineprint)
- `closing`
- Check if `evidence` field is already in the treatment file; if not, add it by transcribing from `lib/bodypkg/fat-freezing.ts` evidence array into the Treatment `evidence` format:
  ```ts
  evidence?: { kicker?: string; title?: string; sub?: string; items: { tag?: string; title: string; whatItDoes: string; keyResults: string; image?: string; source?: string }[] }
  ```

**Verify + commit:**

```bash
cd "10-Tech/aesthetics-website" && npx tsc --noEmit 2>&1 | head -5
git add lib/treatments/fat-freezing.ts
git commit -m "feat(package-data): enrich fat-freezing with offer + dualPack + closing + evidence"
```

---

### Task 12 (Agent): `muscle-stimulation-1`

**Existing treatment file:** `lib/treatments/muscle-stimulation.ts`  
**Note:** The slug is `muscle-stimulation-1` in the route but the file is `muscle-stimulation.ts`.  
**Old data source:** `lib/bodypkg/muscle-stimulation.ts` (same fields as fat-freezing above)

**What to add:** `offer` + `dualPack` + `closing` + `evidence` if missing. Also check that `recommended` is present; if missing, add it with 3 related treatment cards.

**Verify + commit:**

```bash
cd "10-Tech/aesthetics-website" && npx tsc --noEmit 2>&1 | head -5
git add lib/treatments/muscle-stimulation.ts
git commit -m "feat(package-data): enrich muscle-stimulation with offer + dualPack + closing + evidence"
```

---

### Task 13 (Agent): `skin-tightening-1`

**Existing treatment file:** `lib/treatments/skin-tightening.ts`  
**Note:** The slug is `skin-tightening-1` in the route but the file is `skin-tightening.ts`.  
**Old data source:** `lib/bodypkg/skin-tightening.ts`

**What to add:** `offer` + `dualPack` + `closing` + `evidence` if missing. Also add `recommended` if missing.

**Verify + commit:**

```bash
cd "10-Tech/aesthetics-website" && npx tsc --noEmit 2>&1 | head -5
git add lib/treatments/skin-tightening.ts
git commit -m "feat(package-data): enrich skin-tightening with offer + dualPack + closing + evidence"
```

---

### Task 14 (Agent): `anti-cellulite`

**Existing treatment file:** `lib/treatments/anti-cellulite.ts`  
**Old data source:** `lib/bodypkg/anti-cellulite.ts`

**What to add:** `offer` + `dualPack` + `closing` + `evidence` if missing.

**Verify + commit:**

```bash
cd "10-Tech/aesthetics-website" && npx tsc --noEmit 2>&1 | head -5
git add lib/treatments/anti-cellulite.ts
git commit -m "feat(package-data): enrich anti-cellulite with offer + dualPack + closing + evidence"
```

---

### Task 15 (Agent): `lympathic-drainage`

**Existing treatment file:** `lib/treatments/lymphatic-drainage.ts`  
**Note:** The slug in the route is `lympathic-drainage` (typo, preserved intentionally to avoid broken links); the file is `lymphatic-drainage.ts`. Check `lib/treatments.ts` to confirm the mapping.  
**Old data source:** `lib/bodypkg/lymphatic-drainage.ts`

**What to add:** `offer` + `dualPack` (if it exists in the bodypkg source; lymphatic drainage may have a different upsell structure) + `closing` + `evidence` if missing.

**Verify + commit:**

```bash
cd "10-Tech/aesthetics-website" && npx tsc --noEmit 2>&1 | head -5
git add lib/treatments/lymphatic-drainage.ts
git commit -m "feat(package-data): enrich lymphatic-drainage with offer + closing + evidence"
```

---

## PHASE 2 — QC (parallel per-page, then integration)

After all Phase 1 agents commit, run these QC tasks in parallel (one per page), then the integration agent.

---

### Task 16 (QC Agent, parallel ×9): Per-page verification

For **each** of the 9 package slugs, verify:

**Checklist per page:**

1. `lib/treatments/<slug>.ts` has all three new fields populated: `offer`, `closing`, and `dualPack` (for body packages)
2. `offer.included` has at minimum 3 line items; `offer.priceNow` is set
3. `closing.heading` and `closing.ctaLabel` are set
4. No copy from another page leaked (e.g., no mention of "Botox", "jawline" on a fat-freezing page, etc.)
5. Brand tokens only — grep for hardcoded hex colors:
   ```bash
   grep -n "#[0-9a-fA-F]\{3,6\}" lib/treatments/<slug>.ts | grep -v "//.*#"
   ```
   Expected: zero non-comment hex values
6. `category: "Package"` is set in the file
7. `faq` array has at least 4 entries
8. `recommended` has at least 3 items (or is omitted entirely — not an empty array)

**Report:** List any failures. If all pass, no action needed.

---

### Task 17 (QC Integration Agent): Full build + site smoke test

**Step 1: Run the full build**

```bash
cd "10-Tech/aesthetics-website" && npm run build 2>&1 | tail -40
```

Expected: `✓ Compiled successfully`. All 9 package slugs appear in the route table with status `○` (static).

**Step 2: Check static HTML for one body and one face package**

```bash
cd "10-Tech/aesthetics-website" && node -e "
const fs = require('fs');
const html = fs.readFileSync('.next/server/app/fat-freezing.html', 'utf8');
console.log('h1 count:', (html.match(/<h1/g)||[]).length);
console.log('offer-heading:', html.includes('offer-heading'));
console.log('closing-heading:', html.includes('closing-heading'));
"
```

Expected: `h1 count: 1`, `offer-heading: true`, `closing-heading: true`.

Repeat for `snatch-your-jawline.html`.

**Step 3: Confirm old template components are no longer imported by the route**

```bash
grep -n "PackageFunnel\|BodyPackagePage\|bodyPackages\|PACKAGES" "10-Tech/aesthetics-website/app/[slug]/page.tsx"
```

Expected: no lines (they were removed in Task 6).

**Step 4: Report pass/fail for each check.**

---

## PHASE 3 — Cleanup (after QC green)

Run sequentially after Task 17 confirms a green build.

---

### Task 18: Delete retired files

**Step 1: Delete the old template components**

```bash
rm "10-Tech/aesthetics-website/components/packages/PackageFunnel.tsx"
rm "10-Tech/aesthetics-website/components/BodyPackagePage.tsx"
```

**Step 2: Delete the old data sources**

```bash
rm "10-Tech/aesthetics-website/lib/packages.ts"
rm -rf "10-Tech/aesthetics-website/lib/bodypkg"
```

**Step 3: Delete the V2 preview**

```bash
rm -rf "10-Tech/aesthetics-website/app/packages-preview"
rm -rf "10-Tech/aesthetics-website/components/packages/preview"
rm "10-Tech/aesthetics-website/lib/packages/preview-content.ts"
rm "10-Tech/aesthetics-website/lib/packages/preview-types.ts"
```

Check if `lib/packages/` is now empty:

```bash
ls "10-Tech/aesthetics-website/lib/packages/" 2>/dev/null && echo "NOT empty" || echo "empty or gone"
```

If empty, remove the folder too:

```bash
rmdir "10-Tech/aesthetics-website/lib/packages/" 2>/dev/null || true
```

**Step 4: Also remove the preview route from `app/sitemap.ts` if it's listed there**

```bash
grep -n "packages-preview" "10-Tech/aesthetics-website/app/sitemap.ts" 2>/dev/null
```

Remove any matching lines if found.

**Step 5: Final build**

```bash
cd "10-Tech/aesthetics-website" && npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully` with no errors.

**Step 6: Commit**

```bash
cd "10-Tech/aesthetics-website" && git add -A
git commit -m "chore(packages): retire PackageFunnel, BodyPackagePage, bodypkg/, packages-preview — all 9 packages now use PackagePage"
```

---

## Summary of files changed

| Action | File |
|--------|------|
| Modify | `lib/treatment-types.ts` |
| Create | `components/packages/OfferStack.tsx` |
| Create | `components/packages/DualPack.tsx` |
| Create | `components/packages/ClosingCta.tsx` |
| Create | `components/PackagePage.tsx` |
| Modify | `app/[slug]/page.tsx` |
| Enrich | `lib/treatments/snatch-your-jawline.ts` |
| Enrich | `lib/treatments/4-in-1-hydrafacial-glow.ts` |
| Enrich | `lib/treatments/exosome-glowlift.ts` |
| Enrich | `lib/treatments/ultimate-facelift.ts` |
| Enrich | `lib/treatments/fat-freezing.ts` |
| Enrich | `lib/treatments/muscle-stimulation.ts` |
| Enrich | `lib/treatments/skin-tightening.ts` |
| Enrich | `lib/treatments/anti-cellulite.ts` |
| Enrich | `lib/treatments/lymphatic-drainage.ts` |
| Delete | `components/packages/PackageFunnel.tsx` |
| Delete | `components/BodyPackagePage.tsx` |
| Delete | `lib/packages.ts` |
| Delete | `lib/bodypkg/` (entire folder) |
| Delete | `app/packages-preview/` (entire route) |
| Delete | `components/packages/preview/` (entire folder) |
| Delete | `lib/packages/preview-content.ts` |
| Delete | `lib/packages/preview-types.ts` |
