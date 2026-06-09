# Carisma Aesthetics — Recreation Report

Recreation of **https://www.carismaaesthetics.com/** (a Wix site). Stack: Next.js 16 + Tailwind v4 + TypeScript. Production build passes (`34/34` static pages).

## 1. Pages recreated

### Fully built with verified live content
| Page | Route | Notes |
|------|-------|-------|
| Homepage | `/` | All sections: hero + personalised form, services marquee, why-us, reviews, doctors, awards |
| Botox / Wrinkle-Relax | `/wrinkle-relaxing-malta` | Full template: hero, pricing, info bar, precision areas, suitability, experience |
| Lip Fillers | `/lip-fillers-malta` | Full |
| Dermal Fillers | `/dermal-fillers-malta` | Full |
| Microneedling + Mesotherapy | `/microneedling-malta` | Full |
| Profhilo | `/profhilo` | Hero, pricing, info, precision (suitability/experience not on live excerpt) |
| Mesotherapy & Skin Boosters | `/mesotherapy-malta` | Hero, pricing, partial info |
| HydraFacial | `/hydrafacial` | Hero, pricing, results title |
| Laser Hair Removal | `/laser-hair-removal-malta` | Hero, pricing-by-area, process steps |
| Fat Freezing (Fat Eraser) | `/fat-freezing` | Hero, package pricing, targeted areas |
| Consultation / booking | `/consultation` | Personalised form + contact block |
| Privacy Policy | `/privacy-policy` | Full verbatim text |
| Terms & Condition | `/terms-conditions` | 7 sections verbatim (+ flag for remaining) |
| Membership | `/membership` | Branded landing (tiers pending) |
| Gifts / E-Vouchers | `/e-giftcards-vouchers` | Branded landing (options pending) |

### All remaining treatment / body / package pages — now populated with live content
Content extracted verbatim from the live site and added to `lib/treatments.ts`. **All 26 treatment pages now render real content (zero placeholders).**

`/fat-dissolving-malta`, `/thread-lift-malta`, `/chemical-peels-malta`, `/hair-regrowth`,
`/collagen-stimulator-malta`, `/polynucleotides-salmon-dna`, `/prp-malta`,
`/pico-laser-tattoo-removal`, `/medical-weight-loss`, `/muscle-stimulation-1`,
`/skin-tightening-1`, `/anti-cellulite`, `/lympathic-drainage`,
`/snatch-your-jawline`, `/4-in-1-hydrafacial-glow`, `/exosome-glowlift`, `/ultimate-facelift`

> A few pages (chemical peels, mesotherapy, polynucleotides) only expose hero + info on the live site; deeper sections genuinely don't exist there, so they're intentionally omitted.

## Consultation form — wired to a working backend
- `POST /api/consultation` validates input (name, phone/email, consent), then:
  1. **Sends email via Resend** when `RESEND_API_KEY` is set (`CONSULTATION_TO`, `CONSULTATION_FROM` optional env), or
  2. **Captures locally** to `consultation-submissions.jsonl` (gitignored) so it works end-to-end in dev.
- Shared `components/ConsultationForm.tsx` (hero + `/consultation`) with loading / success / inline-error states.
- To enable real email in production: set `RESEND_API_KEY` and `CONSULTATION_TO=info@carismaaesthetics.com`.

## Color QC pass (live vs local, pixel-sampled)
A dedicated color-QC loop sampled real pixels from headless-Chrome screenshots of the live site vs the local build (tool: `_research/qc/qc_colors.py`). The live brand is **cool** (muted teal + cool taupe + light backgrounds), not warm. Fixes applied and re-verified:
- **CTAs → teal** (`#96b2b2`): header "Free Consultation" + all treatment-page "Book" buttons (form Submit stays gold, matching live).
- **Section backgrounds → cool mist** (`--cream` retargeted `#fef6ed` → `#eef3f3`); was warm cream everywhere.
- **Announcement bar** → light teal (`#e8eeee`) with muted/gold text + gold stars (was a solid gold bar).
- **Treatment info bar** → light white floating card with teal labels (was solid black).
- **Gold token cooled** `#b0a68f` → `#a99e8d` to match the live taupe (`#948574`/`#b7a79b`); `--gold-deep #b79e61` kept for stars.
- **Teal accent system activated** (`--teal-100/200`), previously defined but unused.
Re-check confirmed via pixel sampling: header CTA `#bfd0d1`, book button `#bdcfce` (teal ✓), page bg `#eef3f3` (cool ✓), info card white ✓.

## Placement / layout QC pass (multi-agent, vs live)
Captured full-page screenshots of live vs local, sliced them into matched sections, and ran parallel placement-QC subagents per region; fixes applied and re-verified by a second round of subagents (all PASS). Changes:
- **Homepage hero video:** downloaded the live clinic background video (`public/assets/clinic-video.mp4`, 1080p; poster `clinic-room.jpg`) and placed it in the hero right column (autoplay/muted/loop) — replacing the static model image. "Personalised Form" demoted to a small eyebrow label.
- **Services:** open offset **corner-bracket** icon frames (was solid bordered cards); lightened heading + teal divider; muted labels.
- **Why Carisma:** now a **warm beige band** (`--beige #f6efe3`); removed the big clinic image; bullets in a centered bordered white card with heading + divider; removed the stray Botox filler paragraph.
- **Book Your Consultation:** added the dedicated beige section (left heading + gold wave + working form) that the live site has and the build was missing.
- **Doctors:** rebuilt from 3 side-by-side cards into **3 alternating full-width zig-zag rows** (image/text sides matching live).
- **Award band removed:** the standalone dark "#1 Voted" section (not on live) was deleted; the "#1 / 30+ years" message lives in the beige why-band. This also closed the excess-whitespace gap.
- **Reviews** kept on white; star glyph switched to an inline SVG.
- Palette is now correctly **mixed**: cool hero + white services/reviews + warm beige why/book + dark footer, matching live.

## Visual QA performed (desktop / tablet / mobile)
Screenshotted local pages with headless Chrome and compared against the live site. Tuned to match:
- Hero is now **form-left / image-right** with the live "Personalised Form" + consent + Submit.
- "Medical aesthetics procedures" is a **4-column grid** (was a marquee), matching the live order.
- Verified treatment-page template (hero, info bar, precision, suitability, experience) at 1440 / 768 / 390 px.

## 2. Assets copied
Downloaded from `static.wixstatic.com` at original resolution into `public/assets/` and renamed:
- **Brand:** `logo.png` (CARISMA AESTHETICS gold rose wordmark), `hero-home.png` ("Glow with Confidence"), `clinic-room.jpg`, `wave-gold.png`, `wave-gray.png`, `bg-gradient.png`
- **Doctors:** `doctor-giovanni.png`, `doctor-francesca.png`, `doctor-zaid.png`
- **Awards:** `awards-badge.png`, `awards-logo.png`
- **Cross-promo banners:** `banner-spa.png` (→ carismaspa.com), `banner-slimming.png` (→ carismaslimming.com)
- **Service icons:** 12 line-art `service-*.png` cards

## 3. Assets missing / replaced with placeholders
- **Before/after gallery images** — Wix loads these in JS carousels not present in static HTML. Template shows captioned placeholder tiles.
- **Google reviews** — the live "real people, real reviews" block is a live Google widget; shown as styled placeholder cards (clearly labelled), not fabricated testimonials.
- **Clinic map** — placeholder tile on `/consultation`.
- **Treatment-page hero/section photos** for the not-yet-extracted pages.

## 4. Known limitations
- **Fonts:** Novecento Wide and DIN Next are commercial Wix fonts. Substituted with Montserrat (display) and Roboto (body); Playfair Display matches exactly. Visually very close, not byte-identical.
- **Service-icon → label mapping** was confirmed correct against the live grid order during visual QA.
- **Forms** now submit to `/api/consultation` (email via Resend when configured, else local capture). Set `RESEND_API_KEY` for production email.
- A promotional **"Spin to Win" email-capture popup** on the live homepage was intentionally not recreated (marketing widget, not core content).

## 5. Recommended next steps before hosting
1. Replace before/after and Google-review placeholders with real media/feed.
2. Set `RESEND_API_KEY` + `CONSULTATION_TO` env vars to turn on live email delivery (or point the form at Wix Bookings / a CRM).
3. Add real favicon + OpenGraph images; confirm metadata per page.
4. Optional: recreate the "Spin to Win" promo popup if desired.
5. Deploy (Verso server or Vercel — `npm run build` output is standard Next.js).

## How to run
See `README.md`. Quick start: `npm run dev -- -p 3100`.
