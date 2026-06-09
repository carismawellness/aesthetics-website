# Carisma Aesthetics — Custom-Coded Site

A pixel-faithful custom recreation of the live Wix site **https://www.carismaaesthetics.com/**, built with Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript.

## Run locally

```bash
cd carisma-aesthetics
npm run dev        # dev server (default http://localhost:3000)
# or pick a port:  npm run dev -- -p 3100
```

Production:

```bash
npm run build && npm run start
```

> Fonts are loaded via `next/font/google` (Playfair Display, Montserrat, Roboto) and are fetched at build time, so the first `dev`/`build` needs internet access.

## Structure

```
app/
  layout.tsx              # fonts, metadata, Header + Footer shell
  globals.css             # design system (brand palette, type, buttons, marquee)
  page.tsx                # homepage (composes the home/ sections)
  [slug]/page.tsx         # one dynamic route → renders every Face/Body/Package page
  consultation/           # booking page (primary CTA target)
  membership/  e-giftcards-vouchers/
  privacy-policy/  terms-conditions/
components/
  Header.tsx  Footer.tsx
  TreatmentPage.tsx       # reusable, data-driven treatment template
  home/                   # Hero, ServicesMarquee, WhyUs, Reviews, DoctorsSection, AwardSection
lib/
  site.ts                 # nav, contacts, services, doctors (extracted copy)
  treatments.ts           # per-treatment content registry + getTreatment() fallback
public/assets/            # logo, hero, doctors, awards, banners, service icons (downloaded originals)
```

## Design system (extracted from live site)

| Token | Value | Use |
|-------|-------|-----|
| `--gold` | `#b0a68f` | primary champagne / brand |
| `--gold-deep` | `#b79e61` | accents, labels |
| `--ink` | `#0c0b0b` | headings, dark sections |
| `--cream` | `#fef6ed` | warm section backgrounds |

Fonts: **Novecento Wide** (display) → substituted with **Montserrat** uppercase+tracked; **Playfair Display** (serif accents, exact); **Roboto** (body, exact).

See `REPORT.md` for the full status of every page and asset.
