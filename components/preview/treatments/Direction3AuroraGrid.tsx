"use client";

/**
 * Direction 3 — "Aurora Spotlight Grid"
 *
 * Predominantly white, calm, spa-like luxury grid of all 12 treatments.
 * Desktop: a soft teal aurora glow follows the cursor across the whole grid
 * (driven by CSS custom properties updated on a rAF-throttled mousemove).
 * Cards are gently dimmed/desaturated by default and become vivid + lift where
 * the aurora passes over them — each card computes its distance to the pointer
 * in a single shared rAF loop and maps that to brightness/scale/border-glow.
 * On hover each card does a 3D tilt with a moving specular sheen. A fine
 * film-grain overlay adds premium texture. Cards stagger in on first entry.
 *
 * MANDATORY fallback (reduced-motion OR coarse-pointer OR width<768 OR Save-Data):
 * a clean static grid with a simple hover lift — NO aurora, NO tilt, NO rAF loop.
 *
 * Lightweight direction: pure CSS + pointer math. No three.js.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { HOME_SERVICES } from "@/lib/site";

const EYEBROW = "Doctor-Led Treatments";
const TITLE = "Our Medical Aesthetic Treatments";
const SUBCOPY =
  "A complete menu of advanced, medically supervised treatments, each tailored to refresh, restore and let you glow with confidence.";

// Per-card runtime state held in refs (no React re-render in the hot loop).
type CardRuntime = {
  el: HTMLAnchorElement | null;
  // smoothed proximity factor 0..1 (1 = pointer directly over card centre)
  prox: number;
};

export default function Direction3AuroraGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const auroraRef = useRef<HTMLDivElement>(null);

  // Whether we run the rich (desktop) experience. Decided after mount so SSR
  // markup is the static grid (safe, polished) and never starts a loop.
  const [rich, setRich] = useState<boolean>(false);

  // Shared pointer + per-card runtime, all in refs so the rAF loop is allocation-free.
  const pointer = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });
  const targetPointer = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cards = useRef<CardRuntime[]>([]);
  const rafId = useRef<number>(0);
  const inView = useRef<boolean>(false);
  const running = useRef<boolean>(false);

  const services = useMemo(() => HOME_SERVICES, []);

  // Ensure the runtime array exists for every card.
  if (cards.current.length !== services.length) {
    cards.current = services.map((): CardRuntime => ({ el: null, prox: 0 }));
  }

  // ---- Capability gate (decides rich vs static). Runs once on client. ----
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqCoarse = window.matchMedia("(pointer: coarse)");

    const evaluate = (): boolean => {
      const reduce = mqReduce.matches;
      const coarse = mqCoarse.matches;
      const small = window.innerWidth < 768;
      const conn = (
        navigator as Navigator & { connection?: { saveData?: boolean } }
      ).connection;
      const saveData = Boolean(conn?.saveData);
      return !(reduce || coarse || small || saveData);
    };

    setRich(evaluate());

    const onChange = (): void => setRich(evaluate());
    mqReduce.addEventListener("change", onChange);
    mqCoarse.addEventListener("change", onChange);
    window.addEventListener("resize", onChange);
    return () => {
      mqReduce.removeEventListener("change", onChange);
      mqCoarse.removeEventListener("change", onChange);
      window.removeEventListener("resize", onChange);
    };
  }, []);

  // ---- Stagger cards in on first viewport entry (both rich + static paths). ----
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const items = Array.from(grid.querySelectorAll<HTMLElement>(".d3-card"));

    if (reduce) {
      items.forEach((el) => el.classList.add("d3-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const idx = Number(el.dataset.idx ?? "0");
            el.style.transitionDelay = `${Math.min(idx, 11) * 55}ms`;
            el.classList.add("d3-in");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // ---- Rich desktop experience: aurora + proximity + tilt + rAF loop. ----
  useEffect(() => {
    if (!rich) return;
    const grid = gridRef.current;
    const aurora = auroraRef.current;
    const section = sectionRef.current;
    if (!grid || !aurora || !section) return;

    const ensureRunning = (): void => {
      if (!inView.current) return;
      if (running.current) return;
      running.current = true;
      rafId.current = requestAnimationFrame(tick);
    };

    // Pointer tracking. We only read the latest target in the rAF loop, so the
    // handler itself stays trivially cheap (effectively rAF-throttled).
    const onPointerMove = (e: PointerEvent): void => {
      const rect = grid.getBoundingClientRect();
      targetPointer.current.x = e.clientX - rect.left;
      targetPointer.current.y = e.clientY - rect.top;
      pointer.current.active = true;
      ensureRunning();
    };
    const onPointerLeave = (): void => {
      pointer.current.active = false;
      ensureRunning();
    };

    function tick(): void {
      if (!grid || !aurora) return;
      const grect = grid.getBoundingClientRect();
      const w = grect.width || 1;
      const h = grect.height || 1;

      // Ease the shared pointer toward the target for a buttery glide.
      const p = pointer.current;
      const t = targetPointer.current;
      p.x += (t.x - p.x) * 0.14;
      p.y += (t.y - p.y) * 0.14;

      // Drive the aurora layer position via CSS custom properties.
      aurora.style.setProperty("--d3-mx", `${p.x}px`);
      aurora.style.setProperty("--d3-my", `${p.y}px`);
      aurora.style.opacity = p.active ? "1" : "0";

      // Falloff radius scales with grid size so it feels consistent.
      const radius = Math.max(w, h) * 0.34;

      let stillMoving =
        Math.abs(t.x - p.x) > 0.4 || Math.abs(t.y - p.y) > 0.4;

      const list = cards.current;
      for (let i = 0; i < list.length; i++) {
        const c = list[i];
        const el = c.el;
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const cx = r.left - grect.left + r.width / 2;
        const cy = r.top - grect.top + r.height / 2;
        const dx = cx - p.x;
        const dy = cy - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Target proximity: 1 at centre, 0 beyond radius. Smoothstep for softness.
        let target = 0;
        if (p.active) {
          const n = Math.max(0, 1 - dist / radius);
          target = n * n * (3 - 2 * n); // smoothstep
        }
        c.prox += (target - c.prox) * 0.16;
        if (Math.abs(target - c.prox) > 0.01) stillMoving = true;

        el.style.setProperty("--p", c.prox.toFixed(3));
      }

      if (stillMoving || p.active) {
        rafId.current = requestAnimationFrame(tick);
      } else {
        // Settle: final frame written, stop until next interaction.
        running.current = false;
        rafId.current = 0;
      }
    }

    // Per-card tilt + specular sheen (cheap, transforms only).
    const cardCleanups: Array<() => void> = [];
    cards.current.forEach((c) => {
      const el = c.el;
      if (!el) return;
      const onMove = (e: PointerEvent): void => {
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width; // 0..1
        const ny = (e.clientY - r.top) / r.height; // 0..1
        const rotY = (nx - 0.5) * 9; // deg
        const rotX = (0.5 - ny) * 9; // deg
        el.style.setProperty("--rx", `${rotX.toFixed(2)}deg`);
        el.style.setProperty("--ry", `${rotY.toFixed(2)}deg`);
        el.style.setProperty("--sx", `${(nx * 100).toFixed(1)}%`);
        el.style.setProperty("--sy", `${(ny * 100).toFixed(1)}%`);
      };
      const onEnter = (): void => {
        el.style.setProperty("--tilt", "1");
      };
      const onLeave = (): void => {
        el.style.setProperty("--tilt", "0");
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerleave", onLeave);
      cardCleanups.push(() => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerleave", onLeave);
      });
    });

    // Gate the loop to viewport visibility.
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        inView.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          ensureRunning();
        } else {
          if (rafId.current) cancelAnimationFrame(rafId.current);
          rafId.current = 0;
          running.current = false;
          aurora.style.opacity = "0";
        }
      },
      { threshold: 0 }
    );
    io.observe(section);

    grid.addEventListener("pointermove", onPointerMove);
    grid.addEventListener("pointerleave", onPointerLeave);

    return () => {
      grid.removeEventListener("pointermove", onPointerMove);
      grid.removeEventListener("pointerleave", onPointerLeave);
      cardCleanups.forEach((fn) => fn());
      io.disconnect();
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = 0;
      running.current = false;
      inView.current = false;
    };
  }, [rich]);

  return (
    <section
      ref={sectionRef}
      id="d3-section"
      className="d3-section"
      aria-labelledby="d3-heading"
    >
      <style>{D3_CSS}</style>

      {/* Film grain overlay (very low opacity, tiny inline SVG noise). */}
      <div className="d3-grain" aria-hidden="true" />

      <div className="d3-inner">
        <header className="d3-head">
          <p className="d3-eyebrow font-serif">{EYEBROW}</p>
          <h2 id="d3-heading" className="d3-title font-serif">
            {TITLE}
          </h2>
          <p className="d3-sub">{SUBCOPY}</p>
        </header>

        <div className="d3-grid-wrap">
          {/* Aurora glow layer — tracks pointer, only present on rich path. */}
          {rich ? (
            <div ref={auroraRef} className="d3-aurora" aria-hidden="true" />
          ) : null}

          <div
            ref={gridRef}
            className={`d3-grid${rich ? " d3-grid--rich" : ""}`}
          >
            {services.map((s, i) => (
              <a
                key={s.href}
                href={s.href}
                className="d3-card"
                data-idx={i}
                ref={(el) => {
                  const rt = cards.current[i];
                  if (rt) rt.el = el;
                }}
              >
                <span className="d3-card-media">
                  <Image
                    src={s.photo}
                    alt={s.label}
                    fill
                    sizes="(max-width: 559px) 100vw, (max-width: 1023px) 50vw, 25vw"
                    className="d3-card-img"
                    loading={i < 4 ? "eager" : "lazy"}
                  />
                  <span className="d3-card-scrim" aria-hidden="true" />
                  {/* Specular sheen — only meaningful on rich path. */}
                  <span className="d3-card-sheen" aria-hidden="true" />
                </span>

                <span className="d3-card-body">
                  <span className="d3-card-label font-serif">{s.label}</span>
                  <span className="d3-card-blurb">{s.blurb}</span>
                  <span className="d3-card-cta font-display">
                    Explore
                    <span className="d3-card-arrow" aria-hidden="true">
                      →
                    </span>
                  </span>
                </span>

                <span className="d3-card-ring" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Scoped CSS (d3- prefix). Inline so it ships with the component and  */
/* never collides with the other four directions on the preview page. */
/* ------------------------------------------------------------------ */

const GRAIN_DATA_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const D3_CSS = `
.d3-section {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background:
    radial-gradient(120% 80% at 50% -10%, var(--teal-100, #f7fafa) 0%, #ffffff 55%);
  color: var(--ink-soft, #3a3a3a);
  padding: clamp(4rem, 8vw, 7.5rem) clamp(1.1rem, 4vw, 3rem);
}

/* Film grain — sits above the white ground, below content. */
.d3-grain {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background-image: ${GRAIN_DATA_URI};
  background-size: 160px 160px;
  opacity: 0.035;
  mix-blend-mode: multiply;
}

.d3-inner {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
}

/* ---- Header ---- */
.d3-head {
  text-align: center;
  max-width: 56ch;
  margin: 0 auto clamp(2.4rem, 4vw, 3.6rem);
}
.d3-eyebrow {
  margin: 0 0 1rem;
  font-size: clamp(0.66rem, 1vw, 0.78rem);
  letter-spacing: 0.34em;
  text-transform: uppercase;
  color: var(--teal-deep, #245052);
  font-weight: 400;
}
.d3-eyebrow::before,
.d3-eyebrow::after {
  content: "";
  display: inline-block;
  width: clamp(18px, 4vw, 40px);
  height: 1px;
  vertical-align: middle;
  margin: 0 0.9em 0.18em;
  background: var(--brand-teal, #96b2b2);
  opacity: 0.7;
}
.d3-title {
  margin: 0 0 1.1rem;
  font-weight: 400;
  letter-spacing: 0.01em;
  line-height: 1.08;
  color: var(--teal-deep, #245052);
  font-size: clamp(1.85rem, 4.4vw, 3.15rem);
}
.d3-sub {
  margin: 0 auto;
  max-width: 52ch;
  font-size: clamp(0.95rem, 1.5vw, 1.07rem);
  line-height: 1.7;
  color: var(--ink-soft, #3a3a3a);
  font-weight: 300;
}

/* ---- Grid scaffold ---- */
.d3-grid-wrap {
  position: relative;
}
.d3-grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(0.9rem, 1.6vw, 1.4rem);
}
@media (min-width: 560px) {
  .d3-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .d3-grid { grid-template-columns: repeat(4, 1fr); }
}

/* ---- Aurora glow layer (rich path only) ---- */
.d3-aurora {
  position: absolute;
  inset: -10%;
  z-index: 3;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s ease;
  mix-blend-mode: screen;
  --d3-mx: 50%;
  --d3-my: 30%;
  background:
    radial-gradient(
      340px 340px at var(--d3-mx) var(--d3-my),
      rgba(150, 178, 178, 0.55) 0%,
      rgba(36, 80, 82, 0.30) 38%,
      rgba(36, 80, 82, 0.0) 70%
    );
  filter: blur(34px);
  will-change: background;
}

/* ---- Card ---- */
.d3-card {
  --p: 0;            /* proximity 0..1 (rich loop) */
  --tilt: 0;         /* 1 while hovered */
  --rx: 0deg;
  --ry: 0deg;
  --sx: 50%;
  --sy: 50%;
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-card, 16px);
  background: var(--white, #ffffff);
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--line, #8a8a8a) 22%, transparent);
  box-shadow:
    0 1px 2px rgba(36, 80, 82, 0.04),
    0 12px 30px -22px rgba(36, 80, 82, 0.30);
  transform-style: preserve-3d;
  /* enter animation start state */
  opacity: 0;
  transform: translate3d(0, 22px, 0) scale(0.985);
  transition:
    opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.5s ease;
}
.d3-card.d3-in {
  opacity: 1;
  transform: translate3d(0, 0, 0) scale(1);
}

/* Media */
.d3-card-media {
  position: relative;
  display: block;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--teal-100, #f7fafa);
}
.d3-card-img {
  object-fit: cover;
  transition:
    transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
    filter 0.5s ease;
}
.d3-card-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(36, 80, 82, 0.34) 0%,
    rgba(36, 80, 82, 0.06) 36%,
    rgba(36, 80, 82, 0) 60%
  );
  opacity: 0.85;
  transition: opacity 0.5s ease;
}
.d3-card-sheen {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  background: radial-gradient(
    260px 200px at var(--sx) var(--sy),
    rgba(255, 255, 255, 0.45) 0%,
    rgba(255, 255, 255, 0) 60%
  );
  mix-blend-mode: soft-light;
  transition: opacity 0.4s ease;
}

/* Body */
.d3-card-body {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 1.05rem 1.1rem 1.2rem;
}
.d3-card-label {
  font-size: clamp(1.02rem, 1.5vw, 1.18rem);
  font-weight: 400;
  letter-spacing: 0.01em;
  color: var(--teal-deep, #245052);
  line-height: 1.2;
}
.d3-card-blurb {
  font-size: 0.86rem;
  line-height: 1.55;
  font-weight: 300;
  color: var(--ink-soft, #3a3a3a);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.d3-card-cta {
  margin-top: 0.35rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--teal-deep, #245052);
}
.d3-card-arrow {
  display: inline-block;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Glow ring drawn on top, intensity follows proximity. */
.d3-card-ring {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  border: 1px solid transparent;
  transition: box-shadow 0.4s ease, border-color 0.4s ease;
}

/* ---- Default (also fallback) hover lift ---- */
@media (hover: hover) {
  .d3-card:hover {
    border-color: color-mix(in srgb, var(--brand-teal, #96b2b2) 60%, transparent);
    box-shadow:
      0 1px 2px rgba(36, 80, 82, 0.06),
      0 26px 50px -26px rgba(36, 80, 82, 0.42);
  }
  .d3-card:hover .d3-card-img { transform: scale(1.05); }
  .d3-card:hover .d3-card-arrow { transform: translateX(4px); }
}

/* ---- Rich path: proximity-driven vividness + 3D tilt ---- */
.d3-grid--rich .d3-card {
  /* dimmed + desaturated by default; vivid as proximity (--p) rises */
  filter: saturate(calc(0.62 + 0.55 * var(--p)))
          brightness(calc(0.93 + 0.12 * var(--p)));
}
/* keep enter animation authoritative until card is "in" */
.d3-grid--rich .d3-card:not(.d3-in) {
  transform: translate3d(0, 22px, 0) scale(0.985);
}
.d3-grid--rich .d3-card.d3-in {
  transform:
    perspective(900px)
    rotateX(calc(var(--rx) * var(--tilt)))
    rotateY(calc(var(--ry) * var(--tilt)))
    translate3d(0, calc(-6px * var(--p)), 0)
    scale(calc(1 + 0.022 * var(--p)));
  transition:
    filter 0.45s ease,
    box-shadow 0.45s ease,
    border-color 0.45s ease,
    transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
/* proximity border glow ring */
.d3-grid--rich .d3-card .d3-card-ring {
  border-color: color-mix(
    in srgb,
    var(--brand-teal, #96b2b2) calc(70% * var(--p)),
    transparent
  );
  box-shadow:
    0 0 calc(26px * var(--p)) calc(1px * var(--p))
      color-mix(in srgb, var(--brand-teal, #96b2b2) 45%, transparent),
    inset 0 0 calc(18px * var(--p)) -6px
      color-mix(in srgb, var(--brand-teal, #96b2b2) 60%, transparent);
}
/* dim scrim eases off as proximity rises */
.d3-grid--rich .d3-card .d3-card-scrim {
  opacity: calc(0.85 - 0.35 * var(--p));
}

/* The rich-path transform overrides the plain :hover lift, so re-express the
   media zoom + arrow nudge + sheen for hover under rich (transform-safe). */
@media (hover: hover) {
  .d3-grid--rich .d3-card:hover .d3-card-sheen { opacity: 1; }
  .d3-grid--rich .d3-card:hover .d3-card-img { transform: scale(1.06); }
  .d3-grid--rich .d3-card:hover .d3-card-arrow { transform: translateX(4px); }
  .d3-grid--rich .d3-card:hover {
    border-color: color-mix(in srgb, var(--brand-teal, #96b2b2) 70%, transparent);
  }
}

/* ---- Reduced motion: kill all motion everywhere ---- */
@media (prefers-reduced-motion: reduce) {
  .d3-card,
  .d3-card.d3-in,
  .d3-grid--rich .d3-card,
  .d3-grid--rich .d3-card.d3-in {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
    filter: none !important;
  }
  .d3-card-img,
  .d3-card-arrow,
  .d3-aurora {
    transition: none !important;
  }
}
`;
