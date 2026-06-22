# Page Redesign Playbook — Carisma Aesthetics

How to bring **any** aesthetics page up to the shared design language
([`DESIGN_LANGUAGE.md`](DESIGN_LANGUAGE.md)). Goal: every page opens with the same
`PageHero` above-the-fold and ends with the same footer, so the whole site is one brand.

## Step 1 — Replace the hero with `<PageHero>`

Import and render the shared hero. Map existing page content onto its props:

```tsx
import PageHero from "@/components/PageHero";

<PageHero
  badge="#1 Voted Med-Aesthetics Clinic"     // optional glass pill
  headline={[{ text: "Lip Fillers" }, { text: "in Malta", em: true }]}  // Trajan caps; em = teal
  sub="One short, benefit-led sentence."
  bullets={[{ text: "Medically qualified doctors" }, { text: "Natural-looking results" }]}
  primaryCta={{ text: "Book Free Consultation", href: "/consultation" }}
  secondaryCta={{ text: "View Treatments", href: "/face-treatments" }}
  media={{ type: "video", src: "/assets/…mp4", poster: "/assets/…jpg", alt: "…" }}
  proof={{ rating: "4.9", reviews: "200+", statValue: "30+", statLabel: "years in wellness" }}
/>
```

Rules:
- **One `<h1>` per page** lives inside PageHero `headline` — keep the primary keyword + "Malta".
- Media: prefer the page's existing portrait **video** (→ click-to-play `VideoPlayer`); else a portrait image. `fit:"contain"` + a light `bg` for product mockups.
- `compactHeadline` for long H1s. `motif` is **home only** (one WebGL moment site-wide).
- Move **secondary detail that used to sit in the old hero** (price lists, treatment-info cards, product tabs, trust strips) into the **first section below** the hero — the above-the-fold stays headline → sub → bullets → CTA → media → proof.

## Step 2 — Sections below the fold

- Wrap each section in a `<section>` with padding `clamp(72px,9vh,126px)` top/bottom, centre-aligned, container ≤1200px.
- Reveal-on-scroll via `components/Reveal` (never the hero headline).
- Reuse existing data modules (`lib/treatments.ts`, `lib/face-treatments.ts`, `lib/packages.ts`, FAQ modules). Keep FAQ/Service/Breadcrumb **JSON-LD matching visible copy**.
- Cards rounded + `.lift`; CTAs are `.btn .btn-teal` pills.

## Step 3 — Footer

The footer is global (`app/layout.tsx`) — no per-page work needed. If a landing page is
intentionally self-contained, suppress it the same way slimming gates
`/medical-weight-loss-lp` (a `GlobalBottom`-style wrapper), otherwise leave the shared footer.

## Step 4 — Verify

1. `npm run build` green (compile + TS).
2. At **1440×900** the hero fits with **no above-the-fold scroll**; arch + floating proof render; video shows the play button (no autoplay) and keeps its shape on play.
3. No hanging lines; text over media legible; AA contrast (no bright `--teal` as text/fill).
4. Commit → auto-deploys to production.

## Page inventory (rollout tracker)

| Page / template | Hero source | Status |
|---|---|---|
| Home (`components/home/Hero.tsx`) | `PageHero` (motif) | ✅ migrated |
| Treatment template (`TreatmentPage.tsx`, ~26 routes) | bespoke 2-col | ⏳ migrate |
| Face listing (`/face-treatments`) | bespoke | ⏳ |
| Consultation, Membership, Gifts | bespoke | ⏳ |
| Medical Weight Loss, Hair Regrowth, Pico, Laser, Body packages | bespoke landing | ⏳ (dense — preserve key offer above fold) |
| Blog index / post | bespoke | ⏳ |

Update this table as pages migrate.
