"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { HOME_SERVICES } from "@/lib/site";

/*
  ServicesMarqueeElevated — a subtle, richer elevation of the existing
  "Our Medical Aesthetic Treatments" carousel. SAME structure (a full-bleed
  horizontal row of treatment cards browsed with ‹/› arrows), but reframed as a
  curated "Treatment Gallery": layered material depth, an editorial catalogue
  feel (faint serif index numerals, refined Explore link), a cohesive teal image
  grade that "warms into focus", and calm, guided motion.

  WHY IT'S TRANSFORM-DRIVEN (not overflow:auto):
  The old carousel used `overflow-x: auto` with an INFINITE loop, so the track
  never hit a horizontal scroll boundary. Chrome maps a vertical wheel over a
  horizontal-only scroller into horizontal scrolling — and since the loop never
  ends, the wheel was trapped forever and the PAGE could never scroll past it.
  Here the viewport is `overflow: hidden` and the row is moved with a JS
  transform, so the browser has nothing to hijack: a vertical wheel always
  scrolls the page; only a horizontal-dominant wheel / drag / arrow moves the
  row. `touch-action: pan-y` gives the same contract on touch (vertical = page,
  horizontal = drag).

  PERFORMANCE: SSR + first paint render the lightweight fallback path (no rAF).
  The rich path (rAF lerp, focus-falloff, pointer-parallax, infinite loop) is
  enabled only after mount on capable devices (fine pointer, motion allowed, not
  small, not Save-Data), the rAF loop runs only while the section is on-screen
  (IntersectionObserver) and is fully torn down on unmount.
*/

const CARD_W = 340;
const GAP = 28;
const STEP = CARD_W + GAP;
const PAD = 40; // leading gap so the first card isn't flush to the viewport edge

// Faint film grain (inline so there's no extra request). ~3.5% opacity overlay.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

const SERVICES = HOME_SERVICES;
const SET_W = SERVICES.length * STEP;

export default function ServicesMarqueeElevated() {
  // Decide rich vs fallback AFTER mount so SSR markup is the safe fallback
  // (identical initial render on server + client → no hydration mismatch).
  const [rich, setRich] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  // Transform state
  const currentX = useRef(0);
  const targetX = useRef(0);
  const rafRef = useRef<number | null>(null);
  const onScreen = useRef(false);
  const richRef = useRef(false);

  // Drag state
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartTarget = useRef(0);
  const lastDragX = useRef(0);
  const velocity = useRef(0);
  const lastT = useRef(0);
  const moved = useRef(false);

  const setCellRef = useCallback((el: HTMLDivElement | null, i: number) => {
    cellsRef.current[i] = el;
  }, []);

  // ---- capability gate ----
  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const saveData = conn?.saveData === true;
    const enable = !(coarse || reduce || small || saveData);
    richRef.current = enable;
    setRich(enable);
  }, []);

  // ---- one-shot reveal ----
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setRevealed(true);
      },
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Clamp helper for the FINITE fallback track.
  const minX = -(SERVICES.length - 1) * STEP;
  const clampFallback = (x: number) => Math.max(minX, Math.min(0, x));

  const applyTransform = useCallback(
    (x: number) => {
      const track = trackRef.current;
      if (track) track.style.transform = `translate3d(${x}px,0,0)`;
      // Progress line: position within the set.
      const prog = progressRef.current;
      if (prog) {
        const span = richRef.current ? SET_W : -minX || 1;
        const p = richRef.current
          ? ((-x % SET_W) + SET_W) % SET_W / SET_W
          : (-x) / (span || 1);
        prog.style.transform = `scaleX(${Math.max(0.06, Math.min(1, p))})`;
      }
      // Focus-falloff (rich only): center cards larger & vivid, edges cooler.
      if (richRef.current) {
        const vw = window.innerWidth;
        const vc = vw / 2;
        const cells = cellsRef.current;
        for (let i = 0; i < cells.length; i++) {
          const cell = cells[i];
          if (!cell) continue;
          const center = PAD + x + i * STEP + CARD_W / 2;
          const dist = Math.abs(center - vc);
          const norm = Math.min(1, dist / (vw * 0.55));
          const scale = 1 - norm * 0.06;
          const op = 1 - norm * 0.26;
          cell.style.transform = `scale(${scale.toFixed(4)})`;
          cell.style.opacity = op.toFixed(3);
          cell.style.setProperty("--edge", norm.toFixed(3));
        }
      }
    },
    [minX]
  );

  // ---- rich rAF loop ----
  useEffect(() => {
    if (!rich) {
      // Fallback: place at start, no loop.
      currentX.current = 0;
      targetX.current = 0;
      applyTransform(0);
      return;
    }

    const loop = () => {
      // ease toward target
      currentX.current += (targetX.current - currentX.current) * 0.12;
      // seamless infinite wrap (content rendered twice)
      if (currentX.current <= -SET_W) {
        currentX.current += SET_W;
        targetX.current += SET_W;
      } else if (currentX.current > 0) {
        currentX.current -= SET_W;
        targetX.current -= SET_W;
      }
      applyTransform(currentX.current);
      rafRef.current = requestAnimationFrame(loop);
    };

    const start = () => {
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    // start centered-ish so the focus effect reads immediately
    currentX.current = -SET_W * 0.0;
    targetX.current = currentX.current;

    const el = viewportRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          onScreen.current = e.isIntersecting;
          if (e.isIntersecting) start();
          else stop();
        }
      },
      { threshold: 0 }
    );
    if (el) io.observe(el);

    return () => {
      io.disconnect();
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rich]);

  // ---- wheel router (non-passive): vertical → page, horizontal → row ----
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      // Only intentional horizontal gestures move the row. Vertical-dominant
      // wheels are left entirely to the page (the viewport is overflow:hidden,
      // so the browser has nothing to scroll horizontally → no trap).
      if (absX > absY && absX > 0) {
        e.preventDefault();
        if (richRef.current) {
          targetX.current -= e.deltaX;
        } else {
          targetX.current = clampFallback(targetX.current - e.deltaX);
          currentX.current = targetX.current;
          if (trackRef.current)
            trackRef.current.style.transition =
              "transform .45s cubic-bezier(.16,1,.3,1)";
          applyTransform(currentX.current);
        }
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rich]);

  // ---- arrows ----
  const nudge = (dir: 1 | -1) => {
    if (richRef.current) {
      targetX.current -= dir * STEP;
    } else {
      targetX.current = clampFallback(targetX.current - dir * STEP);
      currentX.current = targetX.current;
      if (trackRef.current)
        trackRef.current.style.transition =
          "transform .5s cubic-bezier(.16,1,.3,1)";
      applyTransform(currentX.current);
    }
  };

  // ---- pointer drag (mouse + touch via pointer events) ----
  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    moved.current = false;
    dragStartX.current = e.clientX;
    lastDragX.current = e.clientX;
    dragStartTarget.current = targetX.current;
    velocity.current = 0;
    lastT.current = e.timeStamp;
    if (trackRef.current) trackRef.current.style.transition = "none";
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 4) moved.current = true;
    const dt = Math.max(1, e.timeStamp - lastT.current);
    velocity.current = (e.clientX - lastDragX.current) / dt;
    lastDragX.current = e.clientX;
    lastT.current = e.timeStamp;
    const next = dragStartTarget.current + dx;
    if (richRef.current) {
      targetX.current = next;
      currentX.current = next; // 1:1 while dragging, lerp resumes on release
    } else {
      targetX.current = clampFallback(next);
      currentX.current = targetX.current;
      applyTransform(currentX.current);
    }
  };
  const endDrag = () => {
    if (!dragging.current) return;
    dragging.current = false;
    if (richRef.current) {
      // inertia: fling proportional to release velocity
      targetX.current += velocity.current * 180;
    } else {
      // snap to nearest card
      const snapped = Math.round(targetX.current / STEP) * STEP;
      targetX.current = clampFallback(snapped);
      currentX.current = targetX.current;
      if (trackRef.current)
        trackRef.current.style.transition =
          "transform .5s cubic-bezier(.16,1,.3,1)";
      applyTransform(currentX.current);
    }
  };

  // Suppress the click that ends a real drag (so a drag doesn't navigate).
  const onClickCapture = (e: React.MouseEvent) => {
    if (moved.current) {
      e.preventDefault();
      e.stopPropagation();
      moved.current = false;
    }
  };

  // Rich mode renders the set twice for the seamless loop; fallback once.
  const cards = rich ? [...SERVICES, ...SERVICES] : SERVICES;

  return (
    <section
      aria-labelledby="svc-elev-heading"
      className={`svc-elev${revealed ? " is-revealed" : ""}`}
      style={{ padding: "clamp(52px,6.5vw,96px) 0", position: "relative" }}
    >
      <style>{`
        .svc-elev { position: relative; }
        .svc-elev::before {
          content: ""; position: absolute; inset: 0; pointer-events: none;
          background-image: ${GRAIN}; background-size: 160px 160px;
          opacity: 0.035; mix-blend-mode: multiply; z-index: 0;
        }
        .svc-elev > * { position: relative; z-index: 1; }

        /* Eyebrow with flanking hairlines */
        .svc-elev-eyebrow {
          display: flex; align-items: center; justify-content: center; gap: 14px;
          margin-bottom: 16px;
        }
        .svc-elev-eyebrow::before, .svc-elev-eyebrow::after {
          content: ""; height: 1px; width: clamp(24px, 6vw, 56px);
          background: linear-gradient(90deg, transparent, var(--brand-teal));
        }
        .svc-elev-eyebrow::after { transform: scaleX(-1); }

        /* Reveal: eyebrow / heading / hairline / cards rise in sequence */
        .svc-elev-rv { opacity: 0; transform: translateY(16px);
          transition: opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1); }
        .svc-elev.is-revealed .svc-elev-rv { opacity: 1; transform: none; }

        .svc-elev-card {
          opacity: 0; transform: translateY(22px);
          transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1),
                      box-shadow .45s ease, border-color .45s ease;
          transition-delay: var(--d, 0ms);
        }
        .svc-elev.is-revealed .svc-elev-card { opacity: 1; transform: translateY(0); }

        /* Material depth + hover */
        .svc-elev-card {
          background: var(--white);
          border: 1px solid rgba(150,178,178,0.42);
          border-radius: 20px;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.75),
            0 1px 2px rgba(20,40,40,0.05),
            0 14px 32px -10px rgba(28,44,44,0.16),
            0 34px 60px -28px rgba(28,44,44,0.22);
        }
        @media (prefers-reduced-motion: no-preference) {
          .svc-elev-card:hover {
            border-color: var(--brand-teal);
            box-shadow:
              inset 0 1px 0 rgba(255,255,255,0.85),
              0 2px 4px rgba(20,40,40,0.06),
              0 22px 44px -10px rgba(28,44,44,0.22),
              0 50px 90px -30px rgba(28,44,44,0.30);
          }
        }
        .svc-elev-card:hover .svc-elev-img { transform: scale(1.06); }
        .svc-elev-card:hover .svc-elev-grade { opacity: 0.04; }
        .svc-elev-card:hover .svc-elev-photo { filter: saturate(1) contrast(1.02); }
        .svc-elev-card:hover .svc-elev-explore-line { width: 100%; }
        .svc-elev-card:hover .svc-elev-arrow { transform: translateX(4px); }

        /* Teal glow behind a focused card (rich falloff drives --edge) */
        .svc-elev-cell::after {
          content: ""; position: absolute; inset: 8% 6%; z-index: -1;
          border-radius: 30px; pointer-events: none;
          background: radial-gradient(60% 60% at 50% 45%, rgba(150,178,178,0.30), rgba(150,178,178,0) 70%);
          opacity: calc(1 - var(--edge, 1)); filter: blur(18px);
          transition: opacity .3s ease;
        }

        .svc-elev-img {
          transition: transform .6s cubic-bezier(.16,1,.3,1);
          will-change: transform;
        }
        .svc-elev-photo {
          filter: saturate(0.9) contrast(1.0);
          transition: filter .6s ease;
        }
        .svc-elev-grade {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(180deg, rgba(36,80,82,0.16) 0%, rgba(36,80,82,0.10) 55%, rgba(36,80,82,0.20) 100%);
          mix-blend-mode: multiply; opacity: calc(0.14 + var(--edge, 0) * 0.10);
          transition: opacity .5s ease;
        }
        .svc-elev-scrim {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.10), transparent 60%),
            linear-gradient(180deg, rgba(64,96,96,0) 56%, rgba(40,60,60,0.26) 100%);
        }

        .svc-elev-arrowbtn {
          transition: transform .3s ease, box-shadow .3s ease, background .3s ease;
        }
        .svc-elev-arrowbtn:hover { transform: scale(1.06); box-shadow: 0 8px 26px rgba(28,44,44,0.26); }
        .svc-elev-arrow { display: inline-block; transition: transform .35s cubic-bezier(.16,1,.3,1); }
        .svc-elev-explore-line {
          position: absolute; left: 0; bottom: -3px; height: 1.5px; width: 26px;
          background: var(--teal-deep); transition: width .4s cubic-bezier(.16,1,.3,1);
        }

        @media (prefers-reduced-motion: reduce) {
          .svc-elev-rv, .svc-elev-card, .svc-elev-img, .svc-elev-photo,
          .svc-elev-grade, .svc-elev-explore-line, .svc-elev-arrow { transition: none !important; }
          .svc-elev-rv, .svc-elev-card { opacity: 1 !important; transform: none !important; }
        }

        @media (max-width: 640px) {
          .svc-elev-cell { width: 80vw !important; }
        }
      `}</style>

      <div className="container">
        <p className="svc-elev-eyebrow svc-elev-rv font-display"
           style={{ fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase",
                    color: "var(--brand-taupe)", fontWeight: 600 }}>
          Doctor-Led Treatments
        </p>
        <h2 id="svc-elev-heading" className="svc-elev-rv font-serif text-center"
            style={{ fontSize: "clamp(28px,3.8vw,46px)", color: "var(--teal-deep)",
                     fontWeight: 400, letterSpacing: "0.045em", lineHeight: 1.12,
                     transitionDelay: "60ms" }}>
          Our Medical Aesthetic Treatments
        </h2>
        <p className="svc-elev-rv text-center mx-auto"
           style={{ maxWidth: 580, marginTop: 18, color: "var(--ink-soft)",
                    fontSize: 15.5, lineHeight: 1.7, transitionDelay: "120ms" }}>
          A complete menu of advanced, medically supervised treatments, each
          tailored to refresh, restore and let you glow with confidence.
        </p>
        <div aria-hidden="true" className="svc-elev-rv mx-auto"
             style={{ width: 128, height: "1.5px", marginTop: 28,
                      marginBottom: "clamp(40px,5vw,60px)", transitionDelay: "180ms",
                      background: "linear-gradient(90deg, transparent, var(--brand-teal), transparent)" }} />
      </div>

      {/* Full-bleed stage */}
      <div className="relative">
        <button onClick={() => nudge(-1)} aria-label="Previous treatments"
          className="svc-elev-arrowbtn hidden md:flex items-center justify-center absolute z-20"
          style={{ left: 18, top: "calc(50% - 28px)", width: 56, height: 56,
                   background: "#fff", color: "var(--teal-deep)", fontSize: 26, lineHeight: 1,
                   border: "1px solid rgba(150,178,178,0.5)", borderRadius: 999, cursor: "pointer",
                   boxShadow: "0 6px 20px rgba(28,44,44,0.18)" }}>
          ‹
        </button>

        <div
          ref={viewportRef}
          className="svc-elev-viewport"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          onClickCapture={onClickCapture}
          style={{ overflow: "hidden", touchAction: "pan-y",
                   cursor: rich ? "grab" : "default", padding: "14px 0 24px" }}
        >
          <div ref={trackRef} className="svc-elev-track"
               style={{ display: "flex", gap: `${GAP}px`, paddingLeft: PAD, paddingRight: PAD,
                        willChange: "transform" }}>
            {cards.map((s, i) => {
              const isClone = i >= SERVICES.length;
              const num = (i % SERVICES.length) + 1;
              return (
                <div
                  key={`${s.href}-${i}`}
                  ref={(el) => setCellRef(el, i)}
                  className="svc-elev-cell"
                  aria-hidden={isClone ? true : undefined}
                  style={{ position: "relative", width: CARD_W, flexShrink: 0,
                           willChange: "transform, opacity" }}
                >
                  <Link
                    href={s.href}
                    className="svc-elev-card group"
                    tabIndex={isClone ? -1 : undefined}
                    aria-label={`Explore ${s.label}`}
                    style={{ display: "flex", flexDirection: "column", overflow: "hidden",
                             textDecoration: "none", height: "100%",
                             // stagger the reveal across the visible cards
                             "--d": `${Math.min(i, 5) * 80}ms` } as CSSProperties}
                  >
                    <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 3",
                                  overflow: "hidden", background: "var(--teal-100)" }}>
                      <div className="svc-elev-img" style={{ position: "absolute", inset: 0 }}>
                        <Image src={s.photo} alt={`${s.label} treatment at Carisma Aesthetics Malta`}
                               fill sizes="(max-width:640px) 80vw, 340px"
                               className="svc-elev-photo"
                               style={{ objectFit: "cover", objectPosition: "center" }}
                               loading="lazy" draggable={false} />
                      </div>
                      <div className="svc-elev-grade" aria-hidden="true" />
                      <div className="svc-elev-scrim" aria-hidden="true" />
                      <span className="font-serif" aria-hidden="true"
                            style={{ position: "absolute", top: 12, left: 16, fontSize: 26,
                                     lineHeight: 1, color: "rgba(255,255,255,0.92)",
                                     textShadow: "0 1px 10px rgba(28,44,44,0.45)", letterSpacing: "0.02em" }}>
                        {String(num).padStart(2, "0")}
                      </span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", flex: 1,
                                  padding: "24px 24px 26px" }}>
                      <h3 className="font-serif"
                          style={{ color: "var(--teal-deep)", fontSize: 19, fontWeight: 400,
                                   letterSpacing: "0.045em", lineHeight: 1.22, margin: "0 0 11px" }}>
                        {s.label}
                      </h3>
                      <p style={{ color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.62,
                                  margin: "0 0 22px", flex: 1 }}>
                        {s.blurb}
                      </p>
                      <span className="svc-elev-explore font-display"
                            style={{ position: "relative", display: "inline-flex", alignItems: "center",
                                     gap: 9, alignSelf: "flex-start", color: "var(--teal-deep)",
                                     fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
                                     fontWeight: 600, paddingBottom: 3 }}>
                        Explore
                        <span className="svc-elev-arrow" aria-hidden="true">&rarr;</span>
                        <span className="svc-elev-explore-line" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <button onClick={() => nudge(1)} aria-label="Next treatments"
          className="svc-elev-arrowbtn hidden md:flex items-center justify-center absolute z-20"
          style={{ right: 18, top: "calc(50% - 28px)", width: 56, height: 56,
                   background: "#fff", color: "var(--teal-deep)", fontSize: 26, lineHeight: 1,
                   border: "1px solid rgba(150,178,178,0.5)", borderRadius: 999, cursor: "pointer",
                   boxShadow: "0 6px 20px rgba(28,44,44,0.18)" }}>
          ›
        </button>

        {/* Progress line */}
        <div className="container" style={{ marginTop: 26 }}>
          <div aria-hidden="true"
               style={{ position: "relative", height: 2, borderRadius: 999, maxWidth: 220,
                        margin: "0 auto", background: "rgba(150,178,178,0.28)", overflow: "hidden" }}>
            <div ref={progressRef}
                 style={{ position: "absolute", inset: 0, transformOrigin: "left center",
                          transform: "scaleX(0.1)", background: "var(--teal-deep)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
