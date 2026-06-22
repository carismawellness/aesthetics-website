# Carisma Aesthetics — Design Language

The aesthetics site shares the **Carisma group design language** first codified on the
slimming site, adapted to the aesthetics **sage-teal + taupe-gold** palette. One
above-the-fold pattern, one footer pattern, one motion layer — applied to **every**
page so the site feels like a single, premium, doctor-led brand.

> Sister docs: [`DESIGN_GUIDELINES.md`](DESIGN_GUIDELINES.md) (colour/type tokens),
> [`design-system.md`](design-system.md) (motion/fx layer),
> [`PAGE_REDESIGN_PLAYBOOK.md`](PAGE_REDESIGN_PLAYBOOK.md) (how to bring a page up to spec).

## 1. Palette (locked, WCAG AA)

Identity hues are **decorative only** (large fills, backgrounds, motion). Small text /
icons / button fills use the darkened accessible variants.

| Token | Hex | Role |
|---|---|---|
| `--teal` | `#96b2b2` | signature sage-teal — decorative / large fills |
| `--teal-100` | `#deebeb` | lightest mist — section backgrounds, hero wash |
| `--beige` | `#efe7d7` | warm band |
| `--teal-deep` | `#4f7373` | **CTA fill** + icons (white text passes AA) |
| `--teal-text` | `#406060` | teal as small text / link / em headline |
| `--gold` | `#706552` | heading / eyebrow / price **text** |
| `--gold-deep` | `#9c8344` | stars / gold graphic accents (≥3:1) |
| `--ink` `--ink-soft` | `#0c0b0b` `#2b2b2b` | body / dark text |

**Never** use bright `--teal` as small text or a button fill on a light ground.

## 2. Typography

- **Trajan Pro** (`"Trajan Pro", serif`) — elegant hero/section headlines. **Always
  uppercase** (titling caps face). This is the hero H1 face, mirroring slimming.
- **Novecento Wide** (`.font-display`) — eyebrows, kickers, nav, badges, button text.
  Uppercase, letter-tracked (`0.1–0.22em`).
- **Roboto** — body copy.
- `.font-script` (Ani Lazy Day) — decorative only, large.

## 3. The above-the-fold — `components/PageHero.tsx`

**Every page's hero is `<PageHero>`.** No bespoke heroes. Structure:

- Two columns at ≥900px (`60fr / 40fr`): **copy left, arch media right**. Single column on mobile.
- `.hero-fit` → `min-height:100svh`, reserves the fixed nav (`--nav-clear`), centres content → **fits one viewport, no above-the-fold scroll**.
- **Left:** glass badge pill → optional eyebrow → Trajan uppercase H1 (`em` lines render teal) → Roboto sub → teal-check bullets → CTA row (`.btn .btn-teal` pill primary + `.hero-outline` secondary) → star review proof.
- **Right:** **arch** media container (`border-radius: 220px 220px 18px 18px`) holding the media; two **frosted floating proof cards** (`.hero-glass .float-a/.float-b`) — a stat card (e.g. `30+ years in wellness`) and an award/`#1 voted` card.
- **Video media uses `<VideoPlayer>`** — no autoplay (poster + play button), plays at full volume, sound toggle, and the **arch shape is retained on play** (radius applied to the video element).
- Background: soft radial mist wash (`--teal-100 → cream → white`). Home passes `motif` to add the lazy WebGL bokeh backdrop (`HeroBackdrop`).

Props: `badge, eyebrow, headline[], sub, bullets[], primaryCta, secondaryCta, media, proof, motif, compactHeadline, background`.

## 4. Sections below the fold

- Generous vertical rhythm: section padding `clamp(72px, 9vh, 126px)` top/bottom.
- Content **centre-aligned**; max container `1180–1200px`.
- Reveal on scroll with `components/Reveal` (CSS + IO, reduced-motion safe). **Never**
  wrap the LCP hero headline.
- Cards/surfaces: rounded (`--radius-card` 16px), soft shadow, subtle `.lift` hover.
- **No hanging lines** — `text-wrap: balance` (headings) / `pretty` (body) + the global
  `WidowGuard`. Text over media stays legible via `MediaLegibilityGuard`.

## 5. Footer

One global footer (rendered in `app/layout.tsx`) on the **same hero mist gradient**, with
the motion `AmbientField` + `Motif` layers. Sections, top→bottom: doctors showcase →
reviews → cross-brand block (Spa / Slimming) → nav columns + contact + socials → legal
strip. Mirrors the slimming footer structure. See `PAGE_REDESIGN_PLAYBOOK.md`.

## 6. Motion & performance (hard rules)

Transform/opacity only · zero CLS · `prefers-reduced-motion` disables all motion ·
WebGL (`HeroScene`) is desktop-only + lazy chunk · `npm run build` green before commit
(commits auto-deploy to production). Full detail in `design-system.md`.
