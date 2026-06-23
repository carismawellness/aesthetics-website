# Carisma Aesthetics — Motion & Design System

Luxury motion layer for the website. **Performance and CRO come first**: every
effect is transform/opacity only, causes no layout shift, and fully respects
`prefers-reduced-motion`. The one WebGL moment is lazy and desktop-only.

## Brand colours (from `app/globals.css`)

| Token | Hex | Use |
|---|---|---|
| `--teal` | `#96b2b2` | signature sage-teal (decorative / large) |
| `--teal-deep` | `#4f7373` | accessible teal text / CTA fill |
| `--teal-100` / mist | `#deebeb` | light section backgrounds |
| `--beige` | `#efe7d7` | warm band |
| `--gold` | `#706552` | heading / price text |

Motion bokeh + glows use **only** these hues (sage-teal, mist, beige).

## Components (`components/motion/`)

- **`SmoothScroll`** — Lenis provider mounted once in `app/layout.tsx` around
  `{children}`. Synced to GSAP ScrollTrigger via a single ticker. **Disabled under
  reduced-motion** (native scroll kept).
- **Scroll reveals** — use the existing lightweight **`components/Reveal`** (CSS +
  IntersectionObserver, used ~23× site-wide). Props: `delay`, `className`, `style`.
  Prefer this over GSAP for fade-rise — it's lighter and already standardised.
  **Never wrap the LCP hero headline** — keep above-the-fold instant.
- **`HeroBackdrop`** — always paints a CSS bokeh gradient (`.hero-bokeh-fallback`),
  then lazy-mounts `HeroScene` on top only when: desktop + fine pointer + reduced-motion
  off + hero in view + browser idle.
- **`HeroScene`** — the single three.js scene (soft drifting brand bokeh). Loaded via
  `React.lazy` from `HeroBackdrop` **so three.js stays in its own lazy chunk, never the
  main bundle**. Caps DPR ≤1.5, pauses when the tab is hidden, disposes on unmount.
- **`Magnetic`** — subtle cursor-pull for a key CTA. Off on touch + reduced-motion.

## CSS utilities (`app/globals.css`)

- `[data-reveal]` / `[data-reveal-group] > *` — reveal pre-hide (JS-gated + reduced-motion safe).
- `.hero-bokeh-fallback` — static brand bokeh gradient.
- `.lift` — subtle hover elevation for cards/surfaces (transform-only).

## Performance budget (hard rules)

1. **three.js only via lazy chunk** — never import it into a shared/server bundle.
   Verify: `three`/`HeroScene` appears as its own chunk in `next build` output.
2. Animate **transform/opacity only**. No animating layout properties. **Zero CLS.**
3. **Mobile = no WebGL.** Touch / small screens get the static gradient only.
4. **`prefers-reduced-motion: reduce` disables all motion** (reveals show final state;
   Lenis off; magnetic/lift off).
5. Run `npm run build` green before every commit (commits auto-deploy to production).

## Usage examples

```tsx
import Reveal from '@/components/Reveal';            // existing CSS/IO reveal
import HeroBackdrop from '@/components/motion/HeroBackdrop';
import Magnetic from '@/components/motion/Magnetic';

// Below-the-fold section (stagger via incremental delay props)
<Reveal>…</Reveal>
<Reveal delay={120}>…</Reveal>

// Hero (WebGL behind content)
<section className="relative">
  <HeroBackdrop />
  <div className="relative">{/* headline, CTA — not wrapped in Reveal */}</div>
</section>

// Key CTA
<Magnetic><a className="cta-glow …">Book consultation</a></Magnetic>
```
