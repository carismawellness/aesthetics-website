# Snatch Your Jawline — Conversion Overhaul (Design)

**Date:** 2026-06-16
**Route:** `/snatch-your-jawline`
**Goal:** Maximise €149 bookings from cold paid traffic (Meta/Google) — women 25+, Malta — via CRO, copywriting, visual polish, and perf/SEO/a11y, with freedom to restructure.

## Decisions (from brief)
- **Goals:** CRO + visual polish + copywriting + performance/SEO/a11y (all four).
- **Scope:** Restructure freely, *for this page only*.
- **CTA:** Both / A/B-ready — on-page lead form is primary, Fresha is a clearly-offered secondary path.
- **Clinical detail:** Keep the results stat table; drop the AQUALYX / Lemon Bottle brand tabs (no value to a cold lead).
- **Lead routing:** v1 → existing `/api/consultation` backend (already supports a `GHL_WEBHOOK_URL` env for GHL, plus Resend, plus local fallback). Wiring GHL-Aesthetics is a later env change, no code work.

## Architecture
The slug currently shares `components/packages/PackageFunnel.tsx` with 3 other live pages
(Hydrafacial, Exosome, Facelift). To restructure freely with **zero regression risk** to those:

- **New dedicated component** `components/packages/SnatchJawlinePage.tsx` (server component) — renders the
  restructured funnel + JSON-LD. Most sections are static (better perf/SEO); only the genuinely
  interactive bits are small client components.
- **New content module** `lib/jawline-funnel.ts` — CRO copy + value stack + urgency + SEO data.
  Reuses images / testimonials / FAQ from `lib/packages.ts` so content stays DRY (no duplication/drift).
- **New client components:** `LeadForm.tsx` (custom form → `/api/consultation`, fires a GTM
  `generate_lead` event), `StickyCta.tsx` (mobile sticky claim bar → scrolls to `#claim`).
- FAQ uses native `<details>` (zero JS, accessible, already styled in `globals.css`).
- **Route:** `app/[slug]/page.tsx` routes `snatch-your-jawline` to the new component (before the shared
  `PACKAGES` branch). `PackageFunnel` and the 3 sibling pages are untouched.

## Section order (cold-traffic funnel)
1. Hero — benefit headline, video, value-stack offer (~~€400~~ €149, Save €251), inline **lead form**
   (primary CTA) + "Prefer to book directly? → Fresha", ★4.9 + trust badges.
2. Press bar (moved up — instant credibility).
3. Problem / agitation ("So your jawline turns heads").
4. How it works / why it works (4 benefit cards) + what's included value stack.
5. Proof: before/after + simplified results stat table (no brand tabs).
6. Testimonials (4 real cards).
7. "Created for women who refuse to compromise" — identity.
8. What to expect (before / session / after).
9. Offer recap + honest urgency + CTA.
10. FAQ (objection handling) + FAQPage JSON-LD.
11. Award / Why Carisma → final lead-form section (`#claim`) + Fresha alternative.
12. Recommended + Real Reviews (footer DoctorsSection).
13. Sticky mobile CTA bar throughout.

## Performance / SEO / a11y
- **Perf:** hero `<video preload="metadata">` + poster (LCP); all imgs get explicit aspect-ratio +
  `loading="lazy"` + `decoding="async"` (kills CLS); fonts already preloaded.
- **SEO:** enrich `generateMetadata` (OpenGraph/Twitter, canonical) for the slug; inject JSON-LD
  (`Service` + `Offer` €149 + `FAQPage` + `AggregateRating` 4.9 / 200+).
- **a11y:** real `<label>`s + visible focus on the form; single `<h1>`; correct h2/h3 hierarchy;
  `prefers-reduced-motion` already honored by `Reveal`/`.reveal`; contrast check on taupe-on-light.

## Files
- New: `lib/jawline-funnel.ts`, `components/packages/SnatchJawlinePage.tsx`,
  `components/packages/LeadForm.tsx`, `components/packages/StickyCta.tsx`
- Edit: `app/[slug]/page.tsx` (route + metadata)
- Untouched: `PackageFunnel.tsx` and the 3 sibling package pages

## Verification
`npm run build` (must pass) + `npm run lint`; manual review on dev server; no deploy without sign-off.
