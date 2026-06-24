# Carisma Aesthetics SEO Upgrade - Multi-Agent Implementation Prompt

Use this prompt to execute the Carisma Aesthetics SEO upgrade with multiple agents working in parallel.

The goal is to upgrade the full Carisma Aesthetics website for local Malta SEO, medical trust, technical cleanliness, and consultation conversion without creating route conflicts, schema drift, keyword cannibalization, or inconsistent page quality.

## Master Objective

Implement a full on-page SEO, technical SEO, schema, internal linking, content depth, and CRO upgrade across the Carisma Aesthetics website.

Primary business outcome:

- Rank stronger for high-intent Malta treatment keywords.
- Increase qualified free consultation, WhatsApp, phone, and Fresha booking actions.
- Preserve a premium, doctor-led, medically careful brand experience.

Primary site:

- Production: `https://www.carismaaesthetics.com`
- Preview: `https://aesthetics-pied.vercel.app`
- Repo: `carismawellness/aesthetics-website`
- Local repo path: `10-Tech/aesthetics-website`

Reference docs each agent must read before editing:

- `CLAUDE.md`
- `docs/TREATMENT_PAGE_TEMPLATE.md`
- `docs/BRAND_VOICE.md`
- `docs/PAGE_REDESIGN_PLAYBOOK.md`
- `docs/aesthetics-seo-master-implementation-prompt.md`

## Operating Model

Use one orchestrator agent and multiple focused implementation agents.

The orchestrator owns:

- Workstream assignment.
- Canonical URL and keyword strategy.
- File ownership boundaries.
- Merge/conflict review.
- Final build, crawl, schema, and QA verification.
- Final implementation report.

Implementation agents own one independent domain each. They must not edit files outside their assigned scope unless the orchestrator explicitly approves it.

Use isolated git worktrees or branches for each agent where possible. If worktrees are not available, agents must work in non-overlapping files and report exact files changed before integration.

## Global Non-Negotiables

All agents must obey:

- Exactly one visible H1 per page.
- Each indexable page gets one primary keyword target.
- No duplicate title tags or meta descriptions on core pages.
- No indexable duplicate pages competing for the same keyword.
- JSON-LD must match visible content.
- `FAQPage` schema only when full FAQs are visible in HTML.
- Use medically careful, consultation-led language.
- Do not make fake ratings, fake reviews, fake awards, fake before/after claims, or unsupported medical claims.
- Do not guarantee medical outcomes.
- Use descriptive internal anchors, never "click here" or vague "learn more".
- Preserve important existing URLs unless a redirect/canonical decision is explicitly made.
- Run verification for changed scope before handing back.

## Global Technical Issues To Resolve

The live crawl found these issues. Assign them explicitly.

1. Sitemap includes `/wrinkles-fine-lines-packages`, which returns 404 on preview.
2. Preview sitemap uses production URLs. Confirm preview is noindexed and production is indexable.
3. `/thread-lift-malta` redirects while sitemap/route strategy needs clarity.
4. `/glp-ozempic` currently redirects to `/medical-weight-loss`, while the original checklist said not to change `/glp-ozempic`. Decide canonical strategy.
5. Nested `/face-treatments/<slug>` pages may cannibalize primary `/treatment-malta` pages.
6. Many treatment pages have 7-8 missing image alts.
7. Body/protocol pages often have 21-26 missing image alts.
8. Many primary treatment pages have visible FAQs but no `FAQPage` schema.
9. Some body/package pages repeat generic headings and need treatment-specific SEO headings.
10. Some copy has overclaim risk and needs medical/legal caution.

## Agent Workstreams

### Agent 0 - Orchestrator / SEO Architect

Scope:

- No broad implementation unless required to unblock others.
- Owns canonical strategy, keyword map, final QA, integration, and report.

Tasks:

1. Read all reference docs.
2. Confirm current sitemap, robots, redirects, canonicals, route inventory, and duplicate URL patterns.
3. Decide and document canonical strategy for:
   - `/wrinkle-relaxing-malta`, `/botox-malta`, `/anti-wrinkle-injections-malta`, `/face-treatments/wrinkle-relaxing`
   - `/medical-weight-loss`, `/glp-ozempic`, `/ozempic-malta`, `/mounjaro-malta`, `/glp1-malta`
   - `/thread-lift-malta` and `/face-treatments/thread-lift`
   - `/skin-tightening-1` vs `/skin-tightening`
   - `/muscle-stimulation-1` vs `/muscle-stimulation`
   - `/lympathic-drainage` spelling strategy
4. Assign exact file boundaries to each agent.
5. Review all agent outputs for conflicts.
6. Run final:
   - `npm run build`
   - sitemap check
   - canonical check
   - H1 check
   - schema check
   - broken link spot check
   - mobile CTA spot check if browser tooling is available

Return:

- Canonical strategy table.
- List of merged workstreams.
- Final QA results.
- Remaining manual/legal review items.

### Agent 1 - Technical SEO, Routes, Sitemap, Robots, Schema Infrastructure

Primary files likely owned:

- `app/sitemap.ts`
- `app/robots.ts`
- `next.config.ts`
- `app/[slug]/page.tsx`
- `app/layout.tsx`
- `lib/seo/schema.ts`
- `lib/seo/JsonLd.tsx`
- Any route-level metadata files approved by orchestrator.

Tasks:

1. Fix sitemap so it includes only canonical, indexable 200 URLs.
2. Remove, restore, or redirect `/wrinkles-fine-lines-packages`.
3. Verify preview/staging noindex strategy and production indexability.
4. Ensure canonical tags match the orchestrator's URL strategy.
5. Ensure redirects are 301/308 only where canonical aliases are intentional.
6. Add reusable schema helpers if needed:
   - BreadcrumbList
   - Service
   - FAQPage
   - MedicalProcedure where appropriate
   - Physician/Person
   - MedicalBusiness/LocalBusiness
7. Ensure no duplicate `FAQPage` schema leaks from layouts.
8. Add OG/Twitter defaults if missing.

Constraints:

- Do not rewrite treatment page copy.
- Do not change visual components unless required for schema/metadata correctness.

Return:

- Technical issues fixed.
- Redirects changed.
- Sitemap/canonical behavior after fix.
- Schema helper changes.
- Commands run.

### Agent 2 - Core Injectables And Facial Aesthetics Pages

Primary files likely owned:

- `lib/treatments/wrinkle-relaxing-malta.ts`
- `lib/treatments/dermal-fillers-malta.ts`
- `lib/treatments/lip-fillers-malta.ts`
- `lib/treatments/collagen-stimulator-malta.ts`
- `lib/treatments/profhilo.ts`
- `lib/treatments/mesotherapy-malta.ts`
- `lib/treatments/polynucleotides-salmon-dna.ts`
- Related metadata entries in `app/[slug]/page.tsx` if page metadata is centralized there.

Primary keywords:

- Botox Malta
- dermal fillers Malta
- lip fillers Malta
- collagen stimulator Malta
- Profhilo Malta
- mesotherapy Malta
- polynucleotides Malta

Tasks:

1. Improve title, meta description, H1, first 100 words, section headings, FAQs, pricing copy, internal links, and alt text.
2. Rewrite repeated/generic headings into treatment-specific headings.
3. Add doctor-led safety and suitability sections.
4. Add or improve FAQ answers to 60-120 words where practical.
5. Add visible internal links to:
   - `/consultation`
   - `/face-treatments`
   - relevant related treatments
   - relevant blog posts
6. Add FAQPage schema through the approved shared system if visible FAQs exist.
7. Avoid cannibalization between wrinkle relaxing/Botox and dermal/lip fillers.

Treatment-specific requirements:

- Botox page must explain wrinkle relaxing language, forehead/frown/crow's feet, natural result philosophy, frozen-look avoidance, onset, longevity, and first-time consultation.
- Filler pages must explain anatomy-led approach, area differences, longevity, swelling/bruising, and safety.
- Skin booster/regenerative pages must clearly differentiate Profhilo, mesotherapy, polynucleotides, collagen stimulators, and PRP.

Constraints:

- Do not edit body contouring pages.
- Do not alter global schema infrastructure unless orchestrator approves.

Return:

- Pages changed.
- New title/meta/H1 per page.
- FAQ/schema status per page.
- Internal links added.
- Medical/legal review notes.

### Agent 3 - Skin, Laser, PRP, Hair, And Device Treatment Pages

Primary files likely owned:

- `lib/treatments/laser-hair-removal-malta.ts`
- `components/LaserHairRemovalPage.tsx` if this page is bespoke.
- `lib/treatments/microneedling-malta.ts`
- `lib/treatments/hydrafacial.ts`
- `lib/treatments/prp-malta.ts`
- `lib/treatments/hair-regrowth.ts`
- `components/HairRegrowthPage.tsx` if bespoke.
- `lib/treatments/pico-laser-tattoo-removal.ts`
- `lib/treatments/pico-laser-pigmentation-treatment.ts`
- `components/PicoLaserPage.tsx`
- `components/PigmentationPage.tsx`
- `lib/treatments/chemical-peels-malta.ts`

Primary keywords:

- laser hair removal Malta
- microneedling Malta
- HydraFacial Malta
- PRP treatment Malta
- hair loss treatment Malta
- tattoo removal Malta
- pigmentation treatment Malta
- chemical peel Malta

Tasks:

1. Upgrade metadata, H1, intro, headings, FAQ, internal links, alt text, and schema.
2. For laser: add technology explanation, treatment areas, session count, intervals, sun exposure guidance, patch test, and laser vs waxing comparison.
3. For Hydrafacial: add HydraFacial vs traditional facial, event timing, steps, add-ons, and maintenance plan.
4. For microneedling: add acne marks, pores, texture, collagen induction, redness/downtime, session course, aftercare.
5. For PRP: clarify whether the page is PRP facial, PRP hair, or both. Recommend split if needed.
6. For hair regrowth: soften overclaims, add suitability, evidence framing, consultation, tracking, expected timeline ranges.
7. For Pico pages: add technology explanation, ink/pigment suitability, sessions, aftercare, downtime, sun safety.
8. Add FAQPage schema only for visible FAQs.

Constraints:

- Do not edit injectables pages owned by Agent 2.
- Avoid unsupported medical outcome claims.

Return:

- Pages changed.
- New title/meta/H1 per page.
- FAQ/schema status per page.
- Internal links added.
- Claims softened or flagged.

### Agent 4 - Body Contouring, Protocols, And Package Pages

Primary files likely owned:

- `lib/treatments/fat-dissolving-malta.ts`
- `lib/treatments/fat-freezing.ts`
- `lib/treatments/muscle-stimulation.ts`
- `lib/treatments/skin-tightening.ts`
- `lib/treatments/anti-cellulite.ts`
- `lib/treatments/lymphatic-drainage.ts`
- `lib/protocols/*.ts`
- `components/ProtocolPage.tsx` only if needed and approved.
- `lib/treatments/snatch-your-jawline.ts`
- `lib/treatments/4-in-1-hydrafacial-glow.ts`
- `lib/treatments/exosome-glowlift.ts`
- `lib/treatments/ultimate-facelift.ts`

Primary keywords:

- fat dissolving Malta
- fat freezing Malta
- CoolSculpting Malta
- EMSCULPT NEO Malta
- skin tightening Malta
- cellulite treatment Malta
- lymphatic drainage Malta
- jawline contouring Malta
- non-surgical facelift Malta

Tasks:

1. Rewrite generic repeated headings into page-specific headings.
2. Distinguish each treatment:
   - fat freezing vs fat dissolving
   - EMSCULPT vs fat reduction
   - skin tightening vs cellulite smoothing
   - lymphatic drainage vs slimming/detox support
   - package pages vs canonical treatment pages
3. Add candidate fit, contraindications, number of sessions, treatment sensation, body areas, downtime, maintenance, and pricing.
4. Fix image alt text gaps.
5. Add FAQPage schema where visible FAQs exist.
6. Add internal links to relevant commercial pages, packages, consultation, and blog/support pages.
7. Flag route spelling and canonical issues for orchestrator instead of unilaterally changing URLs.

Constraints:

- Do not overwrite current local changes in `components/ProtocolPage.tsx` unless orchestrator confirms ownership.
- Avoid "permanent", "guaranteed", or weight-loss claims unless properly qualified.

Return:

- Pages changed.
- Repeated headings removed.
- New title/meta/H1 per page.
- Alt text fixes.
- Claims flagged for review.

### Agent 5 - Category, Trust, Location, Doctors, Reviews, Contact, Footer

Primary files likely owned:

- `app/page.tsx`
- `app/face-treatments/page.tsx`
- `app/consultation/page.tsx`
- `components/Footer.tsx`
- `components/Header.tsx` only if navigation/internal linking needs improvement.
- `components/home/*`
- New route files if approved:
  - `app/contact/page.tsx`
  - `app/about/page.tsx`
  - `app/meet-the-doctors/page.tsx`
  - `app/reviews/page.tsx`
  - `app/aesthetic-clinic-st-julians/page.tsx`
  - `app/medical-aesthetic-clinic-malta/page.tsx`
  - `app/skin-clinic-malta/page.tsx`
  - `app/safety-and-aftercare/page.tsx`

Tasks:

1. Improve site-wide local SEO signals:
   - Business name
   - Address
   - Phone
   - WhatsApp
   - Opening hours
   - Location details
   - Google map/contact path
2. Strengthen E-E-A-T:
   - Doctor names, credentials, profiles.
   - Awards.
   - Reviews.
   - Safety/aftercare.
   - Years of experience.
3. Add or improve location/trust pages approved by orchestrator.
4. Ensure treatment pages have internal paths to contact/location/trust pages.
5. Improve footer treatment links without keyword spam.
6. Add LocalBusiness/MedicalBusiness/Physician schema where visible content supports it.

Constraints:

- Do not fabricate credentials, review counts, awards, or addresses.
- If exact address/opening hours are unavailable in repo, add placeholders only if orchestrator approves, otherwise flag manual content needed.

Return:

- Pages created/updated.
- Local SEO signals added.
- Schema added.
- Manual content needed.

### Agent 6 - Blog Cluster And Internal Linking

Primary files likely owned:

- `lib/blogs/*.ts`
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `lib/search-index.ts` if needed.

Tasks:

1. Strengthen existing blog posts with internal links to commercial pages:
   - `/blog/anti-wrinkle-injections-guide` -> `/wrinkle-relaxing-malta`
   - `/blog/complete-guide-dermal-fillers-malta` -> `/dermal-fillers-malta`, `/lip-fillers-malta`
   - `/blog/what-to-expect-laser-hair-removal` -> `/laser-hair-removal-malta`
   - `/blog/hydrafacial-vs-traditional-facials` -> `/hydrafacial`
   - `/blog/hair-regrowth-treatments-science` -> `/hair-regrowth`, `/prp-malta`
   - `/blog/medical-weight-loss-malta-guide` -> `/medical-weight-loss`
   - `/blog/how-does-pico-laser-tattoo-removal-work` -> `/pico-laser-tattoo-removal`
   - `/blog/medically-qualified-aesthetics-clinic-malta` -> doctor/trust/location pages and core treatments.
2. Improve article schema if needed.
3. Add missing BlogPosting fields where possible:
   - headline
   - description
   - author
   - datePublished
   - dateModified
   - image
   - publisher
4. Recommend new cluster posts but do not create dozens of thin posts unless approved.
5. Add contextual internal links using descriptive anchors.

Constraints:

- Do not cannibalize commercial treatment pages.
- Blog posts should support commercial pages, not replace them.

Return:

- Blog posts changed.
- Internal links added.
- Schema changes.
- Recommended new posts with target keywords.

### Agent 7 - Analytics, Conversion Tracking, CTA QA

Primary files likely owned:

- CTA components:
  - `components/BookingButtons.tsx`
  - `components/StickyBookingBar.tsx`
  - `components/treatment/StickyTreatmentCTA.tsx`
  - treatment CTA components
- Analytics utilities if present or newly created with orchestrator approval.

Tasks:

1. Audit current CTA behavior:
   - Book Free Consultation
   - WhatsApp
   - Phone
   - Fresha booking
   - Pricing view
   - FAQ open
2. Add or standardize tracking events:
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
3. Event payloads should include:
   - page path
   - treatment slug
   - page type
   - CTA label
   - section
   - destination URL
4. Confirm sticky mobile CTA exists and is usable.
5. Confirm CTAs do not use medically aggressive copy.

Constraints:

- Do not add third-party scripts without approval.
- If GA4/Meta IDs are unavailable, implement clean event hooks or dataLayer pushes and flag ID setup as manual.

Return:

- Events added/standardized.
- CTA issues fixed.
- Manual analytics setup needed.

### Agent 8 - Final QA / Independent Reviewer

Scope:

- Review after all implementation work is merged.
- Do not make broad changes unless orchestrator asks.

Tasks:

1. Crawl all sitemap URLs.
2. Verify:
   - Status 200 for sitemap URLs.
   - Canonical correctness.
   - One H1 per page.
   - Title/meta presence and uniqueness.
   - FAQ schema matches visible FAQ content.
   - Breadcrumb schema present.
   - Service schema present on commercial pages.
   - No broken internal links in sampled pages.
   - No missing alt text on meaningful images.
   - No preview URLs in production canonical metadata.
   - No production pages accidentally noindexed.
3. Run:
   - `npm run build`
   - targeted lint/type checks where useful
4. Produce a concise defect list for orchestrator.

Return:

- Pass/fail summary.
- Defects with file/page references.
- Any residual risk.

## Parallel Execution Plan

Run these concurrently after Agent 0 defines canonical strategy:

- Agent 1: Technical SEO foundation.
- Agent 2: Injectables/facial aesthetics.
- Agent 3: Skin/laser/PRP/hair/device pages.
- Agent 4: Body/protocol/package pages.
- Agent 5: Category/trust/location/footer pages.
- Agent 6: Blog/internal linking.
- Agent 7: Analytics/CTA tracking.

Then run sequentially:

1. Orchestrator integrates outputs and resolves conflicts.
2. Agent 8 performs independent QA.
3. Orchestrator fixes QA blockers.
4. Final build and deployment report.

## File Ownership Rules

Agents should avoid editing the same files in parallel.

Shared-risk files requiring orchestrator coordination:

- `app/[slug]/page.tsx`
- `app/sitemap.ts`
- `app/robots.ts`
- `next.config.ts`
- `components/TreatmentPage.tsx`
- `components/ProtocolPage.tsx`
- `components/Footer.tsx`
- `lib/treatments.ts`
- `lib/seo/schema.ts`

If an agent needs a shared-risk file:

1. Stop and report the needed change.
2. Orchestrator decides whether to assign that file or make the change centrally.
3. Agent resumes only after ownership is clear.

## Per-Agent Output Template

Each implementation agent must return:

```markdown
## Agent [number] Summary

### Scope
- Pages/files assigned:
- Pages/files actually changed:

### SEO Changes
| Page | Primary Keyword | Title | Meta Description | H1 | Canonical |
|---|---|---|---|---|---|

### Content Changes
- Sections added/improved:
- FAQs added/improved:
- Internal links added:
- Image alt text fixes:

### Schema Changes
- BreadcrumbList:
- Service:
- FAQPage:
- MedicalProcedure:
- Person/Physician:
- Other:

### Verification
- Commands run:
- Result:

### Risks / Manual Review
- Medical/legal claims needing review:
- Missing real assets/data:
- Open questions:
```

## Orchestrator Final Output Template

```markdown
# Carisma Aesthetics SEO Implementation Report

## Pages Updated
| Page | Keyword | Title | Meta | H1 | Schema | Status |
|---|---|---|---|---|---|---|

## Technical SEO
- Sitemap changes:
- Robots/noindex changes:
- Redirects:
- Canonical strategy:
- Broken links fixed:

## Schema
- Homepage:
- Treatment pages:
- Blog posts:
- Location/trust pages:

## Internal Linking
- Key commercial page links:
- Blog support links:
- Footer/navigation links:

## Analytics / CRO
- Events added:
- CTA changes:
- Mobile sticky CTA:

## Verification
- Build:
- Crawl:
- H1/title/meta checks:
- Schema checks:

## Manual Review Needed
- Medical/legal:
- Real reviews/testimonials:
- Doctor credentials:
- Address/opening hours:
- Pricing confirmation:
```

## Final Instruction For All Agents

Optimize for qualified organic traffic and consultation conversion, but protect medical credibility first. Every page should answer the searcher's real question, show why Carisma is a safer and more trustworthy choice in Malta, make the next step obvious, and leave a clean technical footprint for Google.
