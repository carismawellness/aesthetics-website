# Carisma Aesthetics SEO Master Implementation Prompt

Use this prompt to upgrade the Carisma Aesthetics website for maximum local SEO, conversion quality, and medical trust while preserving the premium brand experience.

This prompt enriches the original on-page checklist with findings from a live crawl of `https://aesthetics-pied.vercel.app/` on 2026-06-24, repo structure from `carismawellness/aesthetics-website`, and current Malta competitor/SERP observations.

## Role

You are a senior technical SEO strategist, medical aesthetics content strategist, Next.js engineer, and local SEO/CRO specialist.

Your job is to improve every indexable Carisma Aesthetics page so it can rank for high-intent Malta treatment searches, earn trust for medical aesthetics topics, and convert qualified visitors into consultation bookings.

Do not produce generic SEO copy. Every page must feel specific to Carisma Aesthetics, Malta, the doctor-led clinic model, the treatment, and the visitor's search intent.

## Site Context

- Brand: Carisma Aesthetics
- Market: Malta, with location relevance around St Julian's, Birkirkara, and nearby local search behavior.
- Core positioning: doctor-led medical aesthetics, natural-looking results, consultation-first care, premium clinic experience, #1 voted med-aesthetics clinic in Malta, part of a wellness group with 30+ years of experience.
- Primary business goal: free consultation bookings, WhatsApp/call leads, and treatment booking intent.
- Production domain: `https://www.carismaaesthetics.com`
- Vercel preview: `https://aesthetics-pied.vercel.app`
- Repo: `carismawellness/aesthetics-website`
- Stack: Next.js App Router, TypeScript, content-as-code in `lib/`, routes in `app/`.

## Mandatory Repository Rules

Read these before editing:

- `CLAUDE.md`
- `docs/TREATMENT_PAGE_TEMPLATE.md`
- `docs/BRAND_VOICE.md`
- `docs/PAGE_REDESIGN_PLAYBOOK.md`
- Relevant page data files in `lib/treatments/`, `lib/face-treatments.ts`, `lib/blogs/`, `lib/protocols/`, and route files under `app/`.

Respect these existing conventions:

- Use `generateMetadata` or `metadata` for title, description, OG, Twitter, and canonical.
- Use exactly one visible H1 per page.
- JSON-LD must match visible page content.
- FAQ content must be visible in HTML if `FAQPage` schema is emitted.
- Place page-scoped FAQ schema on the page, not shared layouts.
- Keep data single-source where possible so visible FAQs and schema cannot drift.
- Internal links use Next `<Link>`.
- Run `npm run build` before claiming implementation complete.

## Crawl Findings To Address

The live sitemap exposed 52 URLs. Several issues must be built into the implementation plan.

### Critical Technical Issues

1. Sitemap/canonical mismatch:
   - The Vercel preview sitemap returns production URLs under `https://www.carismaaesthetics.com`.
   - That is acceptable only if preview is noindexed. Confirm preview/staging has `noindex, follow` and production is indexable.
   - Production canonicals must self-reference the production domain.

2. Sitemap contains at least one broken URL:
   - `/wrinkles-fine-lines-packages` appears in sitemap but returns 404 on the preview.
   - Either restore the page, remove it from the sitemap, or redirect it to the correct canonical page.

3. Redirect/canonical conflicts:
   - `/thread-lift-malta` returns a redirect in preview.
   - `next.config.ts` says `/glp-ozempic` redirects to `/medical-weight-loss`.
   - The original checklist says do not change `/glp-ozempic`, so decide route strategy before implementation:
     - Option A: keep `/medical-weight-loss` canonical and make `/glp-ozempic` a 301 alias.
     - Option B: restore `/glp-ozempic` as canonical if that keyword is strategically more valuable.
   - Do not allow duplicate GLP/Ozempic pages to be indexable.

4. Duplicate treatment route patterns:
   - There are canonical treatment pages such as `/dermal-fillers-malta`.
   - There are also nested pages such as `/face-treatments/dermal-fillers`.
   - Decide whether nested pages are supporting category/detail pages or should canonicalize to the primary slug.
   - Avoid keyword cannibalization between `/wrinkle-relaxing-malta`, `/botox-malta`, and `/face-treatments/wrinkle-relaxing`.

5. Image alt text gaps:
   - Many treatment pages have 7-8 missing alt attributes.
   - Body/protocol pages have larger gaps, often 21-26 missing alts.
   - Add descriptive, non-stuffed alt text and confirm decorative images are handled intentionally.

6. Treatment FAQ schema gap:
   - Many primary treatment pages have visible FAQ sections but only emit `BreadcrumbList` and `Service`, not `FAQPage`.
   - Add `FAQPage` only where the visible question and answer content is present.

7. Repeated template headings:
   - Many body/package pages repeat generic headings like "the secret to a more defined, confident look", "we are not another diet clinic", and "Malta's trusted clinic for non-surgical fat reduction".
   - Rewrite headings to be treatment-specific so each page targets one clear topic.

8. Overclaim risk:
   - Some copy uses strong claims like "guaranteed", "permanently eliminate", or specific density/weight outcomes.
   - Medical/aesthetic claims must be careful, sourced where needed, and framed around suitability, typical ranges, and consultation.

## Page Inventory And SEO Scope

### Core Commercial Pages

Prioritize these first because they map to high-intent treatment keywords:

- `/wrinkle-relaxing-malta`
- `/dermal-fillers-malta`
- `/lip-fillers-malta`
- `/laser-hair-removal-malta`
- `/medical-weight-loss`
- `/microneedling-malta`
- `/hydrafacial`
- `/prp-malta`
- `/hair-regrowth`
- `/pico-laser-tattoo-removal`
- `/pico-laser-pigmentation-treatment`
- `/chemical-peels-malta`
- `/fat-dissolving-malta`
- `/collagen-stimulator-malta`
- `/polynucleotides-salmon-dna`
- `/profhilo`
- `/mesotherapy-malta`

### Body And Contouring Pages

These need stronger unique search intent separation:

- `/fat-freezing`
- `/muscle-stimulation-1` or canonical `/muscle-stimulation`
- `/skin-tightening-1` or canonical `/skin-tightening`
- `/anti-cellulite`
- `/lympathic-drainage` - also fix spelling strategy if appropriate without losing redirects.

### Package Pages

These should rank for package/offer and combination-treatment intent, not cannibalize core treatment pages:

- `/snatch-your-jawline`
- `/4-in-1-hydrafacial-glow`
- `/exosome-glowlift`
- `/ultimate-facelift`

### Category, Trust, And Conversion Pages

These support internal linking and local/entity SEO:

- `/`
- `/face-treatments`
- `/consultation`
- `/membership`
- `/e-giftcards-vouchers`
- `/blog`
- `/privacy-policy`
- `/terms-conditions`

Create or improve if missing:

- `/contact`
- `/about`
- `/meet-the-doctors`
- `/reviews`
- `/aesthetic-clinic-st-julians`
- `/medical-aesthetic-clinic-malta`
- `/skin-clinic-malta`
- `/safety-and-aftercare`
- `/prices` or treatment-pricing hub, if commercially appropriate.

## Keyword Map

Assign exactly one primary keyword per page and avoid cannibalization.

| Page | Primary keyword | Secondary keywords | Intent |
|---|---|---|---|
| `/wrinkle-relaxing-malta` | Botox Malta | anti-wrinkle injections Malta, wrinkle relaxing Malta, forehead lines Malta, frown lines Malta, crow's feet treatment Malta | Commercial local treatment |
| `/dermal-fillers-malta` | dermal fillers Malta | cheek fillers Malta, jawline fillers Malta, tear trough filler Malta, facial fillers Malta | Commercial local treatment |
| `/lip-fillers-malta` | lip fillers Malta | natural lip filler Malta, Russian lips Malta, lip enhancement Malta | Commercial local treatment |
| `/laser-hair-removal-malta` | laser hair removal Malta | Soprano Ice Platinum Malta, painless laser hair removal Malta, laser hair removal prices Malta | Commercial local treatment |
| `/medical-weight-loss` | medical weight loss Malta | Ozempic Malta, Mounjaro Malta, GLP-1 Malta, doctor-led weight loss Malta | Commercial medical consultation |
| `/microneedling-malta` | microneedling Malta | collagen induction therapy Malta, acne scar treatment Malta, skin texture treatment Malta | Commercial local treatment |
| `/hydrafacial` | HydraFacial Malta | facial treatment Malta, deep cleanse facial Malta, event facial Malta | Commercial local treatment |
| `/prp-malta` | PRP treatment Malta | PRP facial Malta, PRP hair Malta, vampire facial Malta | Commercial local treatment; consider splitting facial and hair |
| `/hair-regrowth` | hair loss treatment Malta | PRP hair treatment Malta, hair regrowth Malta, exosomes hair Malta | Commercial medical/aesthetic |
| `/chemical-peels-malta` | chemical peel Malta | skin peel Malta, pigmentation peel Malta, acne peel Malta | Commercial local treatment |
| `/pico-laser-tattoo-removal` | tattoo removal Malta | Pico laser tattoo removal Malta, laser tattoo removal Malta | Commercial local treatment |
| `/pico-laser-pigmentation-treatment` | pigmentation treatment Malta | Pico laser pigmentation Malta, sun spot removal Malta, melasma treatment Malta | Commercial local treatment |
| `/fat-dissolving-malta` | fat dissolving Malta | Aqualyx Malta, double chin fat dissolving Malta, chin fat injections Malta | Commercial local treatment |
| `/fat-freezing` | fat freezing Malta | CoolSculpting Malta, non-surgical fat reduction Malta | Commercial local treatment |
| `/muscle-stimulation` | EMSCULPT NEO Malta | muscle stimulation Malta, body sculpting Malta | Commercial local treatment |
| `/skin-tightening` | skin tightening Malta | VelaShape Malta, RF skin tightening Malta, loose skin treatment Malta | Commercial local treatment |
| `/anti-cellulite` | cellulite treatment Malta | VelaShape cellulite Malta, cellulite smoothing Malta | Commercial local treatment |
| `/lympathic-drainage` | lymphatic drainage Malta | fluid retention treatment Malta, lymphatic massage Malta | Commercial wellness/aesthetic |

## Page-Level Requirements

For every commercial treatment page:

1. Title tag:
   - 50-60 characters where possible.
   - Primary keyword or compliant close variant near the front.
   - Include Malta.
   - Add trust or outcome angle without keyword stuffing.

2. Meta description:
   - 140-160 characters where possible.
   - Include Malta, benefit, doctor-led/trust signal, and soft CTA.
   - Do not overpromise.

3. H1:
   - Exactly one.
   - Include primary topic and Malta where natural.
   - Avoid generic or campaign-style H1s.

4. First 100 words:
   - Include treatment concept, Malta, Carisma Aesthetics, doctor-led/trust signal, consultation intent.

5. Above the fold:
   - H1 visible immediately.
   - Short benefit-led subheadline.
   - Malta/St Julian's/local relevance.
   - Trust proof visible.
   - Price/from-price if public.
   - Primary CTA and WhatsApp/call path.
   - Real clinic/treatment image, not decorative-only visual.

6. Content depth:
   - Aim for 1,100-1,800 useful words for core commercial pages.
   - Body/package pages can be shorter only if they are campaign pages supported by canonical treatment pages.
   - Include what it is, who it helps, who it is not for, consultation, procedure, results timeline, sessions, downtime, risks, aftercare, pricing, FAQs, related treatments, and doctor-led proof.

7. Local SEO:
   - Add Malta naturally in title/H1/intro.
   - Add clinic location signals and internal link to contact/location page.
   - Footer must show full NAP, opening hours, phone, WhatsApp, and social profiles.

8. Internal linking:
   - Use descriptive anchor text.
   - Link to homepage, consultation, contact/location, related treatments, relevant blogs, and doctor/trust pages.
   - Do not use "click here", "learn more", or vague anchors.

9. Schema:
   - BreadcrumbList on all indexable pages.
   - Service on all commercial pages.
   - FAQPage where visible FAQs exist.
   - MedicalProcedure where appropriate and accurate.
   - Person/Physician for doctors where visible.
   - LocalBusiness/MedicalBusiness on homepage and location/contact pages.
   - Article/BlogPosting on blog posts.

10. Images:
   - Use descriptive filenames where feasible.
   - Add alt text to meaningful images.
   - Use empty alt for decorative images only.
   - Use width/height or Next/Image sizes to avoid CLS.
   - Lazy load below-fold imagery and prioritize/preload the LCP hero image.

11. Compliance:
   - Avoid guarantees of medical results.
   - Avoid unsafe "cheap", "instant", "permanent" or "no risk" language.
   - For GLP-1/Ozempic/Mounjaro, use doctor-led, eligibility, prescription-only, monitoring, side-effect, exit-strategy language.
   - For injectables, mention suitability, consultation, qualified practitioners, risks, and aftercare.

## Treatment-Specific Content Upgrades

### Wrinkle Relaxing / Botox

Add or improve:

- Botox vs anti-wrinkle injections vs wrinkle relaxing terminology.
- Forehead lines, frown lines, crow's feet, brow lift, masseter, gummy smile, hyperhidrosis if offered.
- How Carisma avoids a frozen look.
- First-time patient pathway.
- Typical onset and longevity.
- Why two-week review/follow-up matters if offered.
- Pricing by area if approved.
- Internal links to dermal fillers, skin boosters, Hydrafacial, consultation.

### Medical Weight Loss / GLP-1

Add or improve:

- Clear canonical strategy for `/medical-weight-loss`, `/glp-ozempic`, `/ozempic-malta`, `/mounjaro-malta`, `/glp1-malta`.
- Eligibility and exclusions.
- What happens in the medical consultation.
- GLP-1s as part of a wider supervised programme.
- Nutrition, monitoring, body composition tracking, side effects, maintenance, exit strategy.
- Avoid "quick fix" framing.
- Internal links to Carisma Slimming only where strategically useful and non-cannibalizing.

### Laser Hair Removal

Add or improve:

- Technology explanation: Alma Soprano Ice Platinum if accurate.
- Why wavelength/cooling matters.
- Areas, session count, intervals, shaving prep, sun exposure guidance, patch test, skin/hair suitability.
- Laser vs waxing comparison table.
- Price/package table.
- Internal links to Hydrafacial, pigmentation, body treatments, consultation.

### Dermal Fillers And Lip Fillers

Add or improve:

- Separate intent between general dermal fillers and lip fillers.
- Anatomy-led approach, natural proportion, product types if approved.
- Areas: cheeks, jawline, chin, nasolabial folds, tear trough, lips.
- Expected longevity by area.
- Bruising/swelling/downtime.
- Safety, vascular risk, dissolving hyaluronic acid filler where applicable.
- Internal links between fillers, wrinkle relaxing, collagen stimulators, skin boosters.

### Microneedling, PRP, Hydrafacial, Skin Boosters

Add or improve:

- Microneedling for acne marks, pores, texture, collagen induction, downtime, session course.
- PRP should clarify whether it targets facial rejuvenation, hair, or both. If both, consider splitting or strongly segmenting content.
- Hydrafacial vs traditional facial, event timing, steps, add-ons, maintenance schedule.
- Mesotherapy/Profhilo/polynucleotides/collagen stimulator should avoid cannibalization with each other by defining distinct use cases.

### Body Contouring And Protocol Pages

Add or improve:

- Rewrite duplicated headings to match the actual treatment.
- Distinguish fat freezing, fat dissolving, EMSCULPT, skin tightening, cellulite, and lymphatic drainage.
- Add candidate fit, contraindications, number of sessions, sensation, downtime, body areas, expected timeline, and maintenance.
- Fix route naming for `skin-tightening-1`, `muscle-stimulation-1`, and `lympathic-drainage` if changing URLs is approved. Otherwise add redirects and canonical clarity.

## Content Cluster Strategy

Create or improve support content for each commercial page.

### Existing Blog Posts To Strengthen

- `/blog/anti-wrinkle-injections-guide` should internally link to `/wrinkle-relaxing-malta`.
- `/blog/complete-guide-dermal-fillers-malta` should internally link to `/dermal-fillers-malta` and `/lip-fillers-malta`.
- `/blog/what-to-expect-laser-hair-removal` should internally link to `/laser-hair-removal-malta`.
- `/blog/hydrafacial-vs-traditional-facials` should internally link to `/hydrafacial`.
- `/blog/hair-regrowth-treatments-science` should internally link to `/hair-regrowth` and `/prp-malta`.
- `/blog/medical-weight-loss-malta-guide` should internally link to `/medical-weight-loss`.
- `/blog/how-does-pico-laser-tattoo-removal-work` should internally link to `/pico-laser-tattoo-removal`.
- `/blog/medically-qualified-aesthetics-clinic-malta` should link to trust pages, doctor pages, and top treatments.

### New Blog Cluster Ideas

Prioritize:

- Botox in Malta: Price, Areas, Results Timeline, and Safety
- Botox vs Dermal Fillers: Which Treatment Fits Your Concern?
- How to Avoid a Frozen Look with Anti-Wrinkle Injections
- Laser Hair Removal vs Waxing in Malta
- How Many Laser Hair Removal Sessions Do You Need?
- Laser Hair Removal in Summer: What Malta Patients Should Know
- Microneedling for Acne Scars: What to Expect
- PRP Facial vs PRP Hair Treatment: What's the Difference?
- Profhilo vs Skin Boosters vs Polynucleotides
- Ozempic and Mounjaro in Malta: What a Doctor-Led Consultation Covers
- GLP-1 Weight Loss and "Ozempic Face": How Aesthetics Can Support Facial Balance
- Fat Freezing vs Fat Dissolving: Which Is Right for Stubborn Fat?

Every support article must link back to one primary commercial page and 1-3 related pages.

## Competitive And SERP Observations

Use competitors as benchmarks, not copy sources.

Observed Malta SERP competitors and comparison points:

- CHIC Med-Aesthetic Clinics ranks with long-standing Botox and laser pages, doctor-led language, technology claims, and price-list access.
- Baddie Aesthetics surfaces broad treatment categories with Botox/fillers duration cues.
- MAKE, Health and Co., AestheLab, St Mary's, WhatClinic, Fresha, and other local listing pages appear around injectables, fillers, and laser searches.
- For medical weight loss, Carisma Slimming, Carisma Aesthetics, Times of Malta coverage, and online prescription services compete for GLP/Ozempic intent.

Beat competitors by adding:

- Better treatment-specific depth.
- Clearer doctor credentials.
- More precise pricing and what is included.
- Better local trust and review integration.
- FAQ schema and richer visible FAQs.
- Strong internal content clusters.
- Safer medical language than aggressive online-prescription competitors.

## Technical SEO Checklist

Before completion, verify:

- `app/sitemap.ts` includes only canonical, indexable 200 URLs.
- Removed or redirected `/wrinkles-fine-lines-packages` if it remains broken.
- `robots.ts` allows production pages and noindexes staging/previews correctly.
- Canonicals point to production canonical URLs.
- No duplicate titles or duplicate meta descriptions across primary pages.
- No indexable duplicate route cannibalization.
- All pages have OG and Twitter tags.
- All commercial pages have BreadcrumbList and Service schema.
- FAQPage schema exists only when FAQs are visible.
- All meaningful images have alt text.
- No hidden SEO text.
- No keyword stuffing.
- No multiple H1s.
- No horizontal mobile scroll.
- Mobile sticky CTA works.
- Phone and WhatsApp links work.
- Fresha/consultation links work.
- Build passes.

## Analytics And Measurement Requirements

Add or verify tracking for:

- `treatment_page_view`
- `book_consultation_click`
- `whatsapp_click`
- `phone_click`
- `pricing_view`
- `faq_open`
- `doctor_profile_click`
- `location_click`
- `form_submit`
- `membership_click`
- `related_treatment_click`

Events should include:

- page path
- treatment slug
- CTA label
- page type
- destination URL
- position/section where possible

## Deliverables

After implementation, provide:

1. Pages updated.
2. For each page: primary keyword, SEO title, meta description, H1, canonical.
3. Schema types added.
4. Internal links added.
5. FAQ count and whether FAQPage schema was added.
6. Image alt text fixes.
7. Redirects or sitemap changes.
8. Technical issues found and fixed.
9. Remaining items needing medical/legal/manual review.
10. Verification commands run and results.

## Suggested Execution Order

1. Fix technical foundations:
   - sitemap 404s
   - preview noindex
   - canonical/redirect strategy
   - duplicate route/cannibalization strategy

2. Upgrade the highest-value commercial pages:
   - `/wrinkle-relaxing-malta`
   - `/medical-weight-loss`
   - `/laser-hair-removal-malta`
   - `/dermal-fillers-malta`
   - `/lip-fillers-malta`
   - `/hydrafacial`
   - `/microneedling-malta`
   - `/prp-malta`
   - `/hair-regrowth`

3. Upgrade body and protocol pages:
   - `/fat-freezing`
   - `/fat-dissolving-malta`
   - `/muscle-stimulation`
   - `/skin-tightening`
   - `/anti-cellulite`
   - `/lympathic-drainage`

4. Strengthen support pages:
   - `/face-treatments`
   - `/consultation`
   - `/membership`
   - `/blog`
   - trust/location/review/doctor pages.

5. Strengthen blog clusters and internal links.

6. Run full SEO QA and build verification.

## Final Instruction

Optimize for rankings and qualified leads, but do not sacrifice medical credibility. The winning page should answer the searcher's real question, show why Carisma is safer and more trustworthy than alternatives, make the next step obvious, and leave a clean technical footprint for Google.
