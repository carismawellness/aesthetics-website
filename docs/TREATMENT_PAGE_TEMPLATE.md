# Carisma Aesthetics — Treatment Page Template Guide

The **definitive spec** for a world-class, high-converting treatment landing page,
distilled from the perfected **Botox / wrinkle-relaxing** page
(`/wrinkle-relaxing-malta`, data: `lib/treatments/wrinkle-relaxing-malta.ts`).

Every Face / Body / Packages page must follow this template. Most pages render
through the shared, data-driven **`components/TreatmentPage.tsx`** — so applying
the template to a page is almost entirely **authoring its data module**
(`lib/treatments/<slug>.ts`). The sections already exist as shared components;
they render automatically when the matching data field is present.

> Golden rule: **adapt the copy and visuals to the specific treatment** — never
> leave Botox wording on another page. Same structure, bespoke content.

---

## Section order (top → bottom) and the data field that drives each

| # | Section | Component | Data field | Notes |
|---|---------|-----------|------------|-------|
| 1 | **Hero (above-the-fold)** | `PageHero` (via TreatmentPage) | `hero`, `info` | 60/40, vertically centred |
| 2 | **Before / After** | `BeforeAfterCarousel` | `beforeAfter`, `beforeAfterTitle` | multi-card carousel + arrows |
| 3 | **Emotional reframe** | `treatment/ProblemReframe` | `problem` | compact empathetic beat |
| 4 | Education (optional) | inline | `education` | keep if it exists |
| 5 | **Guarantee** | `treatment/GuaranteeBand` | `guarantee` | "Natural Confidence Guarantee" |
| 6 | Precision areas | inline | `precision` | anatomical zones |
| 7 | **Suitability** | `treatment/SuitabilityCards` | `suitability` (+ `personas`) | human "Designed for" personas |
| 8 | **Treatment experience** | inline | `experience` | **exactly 3 steps** |
| 9 | **Top-Clinic authority band** | `treatment/TopClinic` | `trusted` | press logos + 4 cards |
| 10 | **Plan summary / offer-stack** | `treatment/PlanSummary` | `planSummary` | benefits + inclusions + price |
| 11 | Patient videos | inline | `patientVideos` | "Real Patients, Real Confidence" |
| 12 | Carisma Difference | inline | `difference` | "Malta's #1 Leading Wellness Chain" |
| 13 | Prep & Aftercare | inline | `prepAftercare` | "Your session, step by step" |
| 14 | Pricing grid (optional) | inline | `pricingGrid` | |
| 15 | **Recommended With** | `treatment/RecommendedCards` | `recommended` | single-row carousel + arrows |
| 16 | **FAQ** | `treatment/TreatmentFaq` | `faq`, `faqTitle` | Slimming-style search + accordion |
| — | Sticky booking bar | `StickyBookingBar` (site-wide) | — | auto on every dropdown page |

Order is fixed by `TreatmentPage.tsx`; you only supply data.

---

## Brand + design system (non-negotiable)

- **Tokens only** (`app/globals.css`): `--gold` (#706552 headings), `--gold-deep`
  (stars), `--teal-deep` (#4f7373 CTA/accents, white text AA), `--teal-text`
  (#406060 small text/links), `--teal` (#96b2b2 decorative), `--teal-100`
  (#deebeb mist), `--ink-soft`/`--muted`/`--label` (body), `--line` (hairlines),
  `--radius-card`. **Never** hardcode green/brown/ivory.
- **Fonts:** Trajan Pro (`.font-serif`, ALWAYS uppercase titling caps) for
  headings; Novecento Wide (`.font-display`, uppercase tracked) for eyebrows /
  labels; Roboto for body.
- **Grounds stay soft.** Section backgrounds should be white or a *whisper-soft*
  tint (`linear-gradient(180deg,#ffffff,#f4f8f8)`). A solid `--teal-100` band or
  a hard white→teal stop reads **stark** — avoid it.
- **Voice:** warm, confident, doctor-led, natural-first. Human, never fear-based.
  Audience: women 25+ in Malta (but match the copy to who's actually in the
  photos / who the treatment is for).

---

## Section specs

### 1. Hero — above-the-fold (60/40, vertically centred)
`hero: { title, subtitle, body, prices[], cta, bookHref?, image, heroForm? }`, `info[]`
- **Left (60%):** badge → Trajan H1 (the page's single `<h1>`, primary keyword +
  "Malta") → one-line `subtitle` hook → full `body` paragraph (the real value
  prop) → price bullets → two CTAs → "4.9 · 200+ verified reviews" → a **compact
  horizontal TREATMENT INFO strip** (the 5 `info` metrics) under the reviews.
- **Right (40%):** arch photo + 3 **spaced** floating proof cards (Doctor-led
  top-left, #1 Voted Clinic top-right, 30+ Years bottom-left). Photo full-height.
- **CTAs:** primary = `hero.cta` (e.g. "Book Your <Treatment> Appointment") →
  **Fresha** (opens new tab, `external`, bypasses popup) via `hero.bookHref`
  (defaults to the Aesthetics all-services Fresha page). Secondary = "Free
  Consultation" → `/consultation` (site popup). Do **not** change this wiring.

### 2. Before / After
`beforeAfterTitle`, `beforeAfter: [{ before, after, name, review }]`
- Multi-card windowed carousel (3/2/1 per view) with circular ‹ › arrows — no
  long scroll. Each card shows the before|after pair **plus a patient name + a
  one-sentence review**.
- **CRITICAL consistency:** the name's gender **and** the review's treatment area
  MUST match the actual photo. (A male photo cannot have a female name; a face
  photo cannot have an underarm review.) **Inspect each image** before writing.
- Reviews are representative placeholders until real ones are supplied — keep
  them specific and natural.

### 3. Emotional reframe (compact)
`problem: { kicker, title, body: [one short line] }`
- A small, elegant empathetic beat — NOT a towering section. Reframe the *real*
  buyer emotion, not the symptom. (Botox: "You look more tired, tense, or
  stressed than you feel" — not "do you have wrinkles?").
- One short body line only. No 3-card grid. Soft white→`#f4f8f8` ground,
  reduced padding (`clamp(40px,5vh,64px)`).

### 5. Guarantee — "Natural Confidence Guarantee"
`guarantee: { title: "Natural Confidence Guarantee", paragraphs: [one summary], cta, points: [3 figures] }`
- Compact + clean: title → one-line summary of how it works → **3 proof-figure
  cards** in a row → small CTA pill. Soft ground, small padding.
- The promise: doctor-led facial assessment first (never a sales pitch),
  natural-first / never overdone, free follow-up adjustment until 100% satisfied
  with a result that still looks like you. `points` carry the proof figures
  (e.g. Doctor-led / Natural-first / 100% satisfaction).

### 7. Suitability — human personas
`suitability: { title, intro, personas: [{title, desc} ×3], notIdeal: [humanized bullets] }`
- LEFT column = **3 named personas** ("Designed for", title + one line each) —
  far stronger than listing anatomical zones. RIGHT = warm, non-aggressive "may
  not be ideal if" bullets (acknowledge, don't alarm; redirect, don't reject).
- Subtle airy 2-column design, single hairline divider, no heavy fills.

### 8. Treatment experience — **exactly 3 steps**
`experience: { title, steps: [{title, desc, image} ×3] }`
- Consolidate any longer journey into **3** clean steps (e.g. Consultation &
  Plan → Treatment → Ongoing Review). Never 4+.

### 9. Top-Clinic authority band
`trusted: { title, asSeenOn: [logo paths], points: [{title, desc} — first 4 used] }`
- Centred Trajan heading ("Malta's Top Clinic for <Treatment>") → press-names
  line → grayscale press logos → **4 benefit cards** (last one highlighted).

### 10. Plan summary / offer-stack
`planSummary: { kicker, title, benefits: [{icon,title,desc} ×3], included: [{label, value?}], price, priceLabel, cta: {text, href}, reviews }`
- Two-column card: LEFT 3 icon benefit blocks; RIGHT inclusions list + a soft
  price box ("From €X per …") + full-width CTA + Google reviews line. Use an
  **honest** price (no fabricated "TOTAL VALUE → TODAY" discount unless a real
  offer exists). CTA href is overridden to the page's Fresha `bookHref`.

### 15. Recommended With
`recommended: { title, items: [{label, href, image}] }`
- Single-row carousel of Slimming-style evidence cards (asymmetric photo, floating
  "Recommended" pill, "Explore ›") with ‹ › arrows. **Subtle** card gradient.

### 16. FAQ
`faqTitle`, `faqKicker?`, `faq: [{q, a}]`
- Slimming proportions exactly: large Trajan heading + "Search questions…" field
  on the same row, generous accordion rows with chevron, share-icon row in the
  open answer. Recoloured to teal/gold.

---

## HARD build constraints (these have broken the build before — obey them)

1. **No literal apostrophes in JSX *text*.** Render strings from props/data (data
   files are fine) or use `&rsquo;`. A raw `'` in JSX text fails
   `react/no-unescaped-entities`.
2. **No event handlers (`onClick`/`onMouse*`) in a non-`'use client'` component.**
   Server components can't pass handlers → prerender fails with "Event handlers
   cannot be passed to Client Component props". Either add `"use client"` or use
   CSS `:hover`.
3. **No `setState` synchronously in a `useEffect`** (`react-hooks/set-state-in-effect`).
   Clamp/derive at render instead.
4. **Internal links** use `<Link>` (not `<a href="/...">`).
5. `tsc` passing is NOT enough — only the **build/prerender** catches #2. Always
   verify the real build.

> Note: those three ESLint rules are currently downgraded to *warnings* in
> `eslint.config.mjs` to unblock a separate in-progress redesign — but write code
> as if they were errors; they will be re-promoted.

---

## The delivery loop (every page agent follows this)

1. Work in an **isolated git worktree off `origin/main`** (a sibling session is
   actively committing; never edit the shared working tree).
2. Edit **only that page's `lib/treatments/<slug>.ts`** (data). Do not touch
   shared components — the template already renders the sections.
3. Match before/after names/reviews to the **actual photos** (gender + area).
4. Verify: `npx tsc --noEmit` (0 errors) + `npx eslint <changed files>`
   (0 errors) + scan for handler-in-server landmines.
5. Commit just the data file; `git fetch` + `rebase origin/main` (the remote
   moves often); push `HEAD:main`.
6. Confirm the **Vercel build is green** for the pushed SHA before claiming done
   (`gh api repos/carismawellness/aesthetics-website/commits/<sha>/status`).

## Page inventory

- **Data-driven (render via `TreatmentPage` — populate data only):** dermal-fillers-malta,
  lip-fillers-malta, profhilo, microneedling-malta, chemical-peels-malta,
  mesotherapy-malta, prp-malta, thread-lift-malta, collagen-stimulator-malta,
  polynucleotides-salmon-dna, exosome-glowlift, ultimate-facelift,
  snatch-your-jawline, hydrafacial, 4-in-1-hydrafacial-glow, anti-cellulite,
  fat-dissolving-malta, fat-freezing, skin-tightening-1, muscle-stimulation-1,
  lympathic-drainage. (Reference: **wrinkle-relaxing-malta**.)
- **Bespoke components (Phase 2 — fold sections in):** laser-hair-removal-malta,
  pico-laser-tattoo-removal, pico-laser-pigmentation-treatment, medical-weight-loss,
  hair-regrowth, body-packages (`BodyPackagePage`), protocols (`ProtocolPage`).
- **Packages dropdown:** `PackageFunnel` (separate system).
