"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HOME_SERVICES } from "@/lib/site";

/*
  ServicesMarqueeOverlay — treatments carousel modelled on the Webild med-spa
  "Treatments We Offer" pattern, rebuilt in Carisma's brand:
    • tall 4:5 image cards (radius 22) with a cool teal scrim and the treatment
      name + one-line descriptor laid over the bottom; the whole card is a link
    • a peeking, full-bleed row whose first card aligns to the container edge
    • a bottom control row: a rounded progress bar (left) + ‹/› arrows (right)
    • eyebrow pill + two-tone serif heading

  Same transform-driven engine as ServicesMarqueeElevated so the wheel-trap is
  gone: the viewport is overflow:hidden and the row is moved by a JS transform,
  so a vertical wheel always scrolls the page; only a horizontal-dominant wheel /
  drag / arrow moves the row (touch-action: pan-y gives the same on touch).
  SSR/first paint render the lightweight fallback; the rAF lerp (for momentum)
  runs only on capable devices and only while the section is on-screen.
*/

const CARD_W = 340;
const GAP = 24;
const STEP = CARD_W + GAP;

const SERVICES = HOME_SERVICES;
const SET_W = SERVICES.length * STEP;

export default function ServicesMarqueeOverlay() {
  const [rich, setRich] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const currentX = useRef(0);
  const targetX = useRef(0);
  const rafRef = useRef<number | null>(null);
  const richRef = useRef(false);

  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartTarget = useRef(0);
  const lastDragX = useRef(0);
  const velocity = useRef(0);
  const lastT = useRef(0);
  const moved = useRef(false);

  // Card pitch is measured from the DOM so the infinite-loop wrap is seamless
  // regardless of the responsive card width (desktop 340px, mobile 78vw).
  const stepRef = useRef(STEP);
  const setWRef = useRef(SET_W);
  const startLoopRef = useRef<() => void>(() => {});

  const clampFallback = (x: number) => {
    const minX = -(SERVICES.length - 1) * stepRef.current;
    return Math.max(minX, Math.min(0, x));
  };

  // ---- capability gate ----
  // The looping engine now runs on touch/small screens too (so the carousel
  // wraps last → first like desktop); only reduced-motion / data-saver opt out.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const saveData = conn?.saveData === true;
    const enable = !(reduce || saveData);
    richRef.current = enable;
    setRich(enable);
  }, []);

  // ---- measure real card pitch (handles 78vw mobile cards + resize) ----
  useEffect(() => {
    const measure = () => {
      const first = trackRef.current?.children?.[0] as HTMLElement | undefined;
      const w = first?.getBoundingClientRect().width;
      if (w && w > 0) {
        stepRef.current = w + GAP;
        setWRef.current = stepRef.current * SERVICES.length;
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [rich]);

  // ---- one-shot reveal ----
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setRevealed(true)),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const applyTransform = useCallback((x: number) => {
    const track = trackRef.current;
    if (track) track.style.transform = `translate3d(${x}px,0,0)`;
    const prog = progressRef.current;
    if (prog) {
      const setW = setWRef.current;
      const minX = -(SERVICES.length - 1) * stepRef.current;
      const p = richRef.current
        ? (((-x % setW) + setW) % setW) / setW
        : -x / (-minX || 1);
      prog.style.transform = `scaleX(${Math.max(0.08, Math.min(1, p))})`;
    }
  }, []);

  // ---- rich rAF loop (eased momentum + seamless wrap) ----
  // Self-suspends once motion settles, so on mobile the section does NOT
  // repaint every frame while idle — it only animates during interaction.
  useEffect(() => {
    if (!rich) {
      currentX.current = 0;
      targetX.current = 0;
      applyTransform(0);
      startLoopRef.current = () => {};
      return;
    }
    const loop = () => {
      const setW = setWRef.current;
      currentX.current += (targetX.current - currentX.current) * 0.12;
      if (currentX.current <= -setW) { currentX.current += setW; targetX.current += setW; }
      else if (currentX.current > 0) { currentX.current -= setW; targetX.current -= setW; }
      applyTransform(currentX.current);
      if (!dragging.current && Math.abs(targetX.current - currentX.current) < 0.5) {
        rafRef.current = null; // settled → suspend until next interaction
        return;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    const kick = () => { if (rafRef.current == null) rafRef.current = requestAnimationFrame(loop); };
    const stop = () => { if (rafRef.current != null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; } };
    startLoopRef.current = kick;
    currentX.current = 0;
    targetX.current = 0;
    applyTransform(0);
    const el = viewportRef.current;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (!e.isIntersecting) stop(); }),
      { threshold: 0 }
    );
    if (el) io.observe(el);
    return () => { io.disconnect(); stop(); startLoopRef.current = () => {}; };
  }, [rich, applyTransform]);

  // ---- wheel router: vertical → page, horizontal → row ----
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      if (absX > absY && absX > 0) {
        e.preventDefault();
        if (richRef.current) {
          targetX.current -= e.deltaX;
          startLoopRef.current();
        } else {
          targetX.current = clampFallback(targetX.current - e.deltaX);
          currentX.current = targetX.current;
          if (trackRef.current) trackRef.current.style.transition = "transform .45s cubic-bezier(.16,1,.3,1)";
          applyTransform(currentX.current);
        }
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rich]);

  const nudge = (dir: 1 | -1) => {
    if (richRef.current) {
      targetX.current -= dir * stepRef.current;
      startLoopRef.current();
    } else {
      targetX.current = clampFallback(targetX.current - dir * stepRef.current);
      currentX.current = targetX.current;
      if (trackRef.current) trackRef.current.style.transition = "transform .5s cubic-bezier(.16,1,.3,1)";
      applyTransform(currentX.current);
    }
  };

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
    if (richRef.current) startLoopRef.current();
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
    if (richRef.current) { targetX.current = next; currentX.current = next; startLoopRef.current(); }
    else { targetX.current = clampFallback(next); currentX.current = targetX.current; applyTransform(currentX.current); }
  };
  const endDrag = () => {
    if (!dragging.current) return;
    dragging.current = false;
    if (richRef.current) {
      targetX.current += velocity.current * 180;
      startLoopRef.current();
    } else {
      const snapped = Math.round(targetX.current / stepRef.current) * stepRef.current;
      targetX.current = clampFallback(snapped);
      currentX.current = targetX.current;
      if (trackRef.current) trackRef.current.style.transition = "transform .5s cubic-bezier(.16,1,.3,1)";
      applyTransform(currentX.current);
    }
  };
  const onClickCapture = (e: React.MouseEvent) => {
    if (moved.current) { e.preventDefault(); e.stopPropagation(); moved.current = false; }
  };

  const cards = rich ? [...SERVICES, ...SERVICES] : SERVICES;

  return (
    <section
      aria-labelledby="svc-ov-heading"
      className={`svc-ov${revealed ? " is-revealed" : ""}`}
      style={{ padding: "clamp(56px,7vw,100px) 0", position: "relative" }}
    >
      <style>{`
        .svc-ov-rv { opacity: 0; transform: translateY(16px);
          transition: opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1); }
        .svc-ov.is-revealed .svc-ov-rv { opacity: 1; transform: none; }

        .svc-ov-card {
          opacity: 0; transform: translateY(24px);
          transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1),
                      box-shadow .5s ease;
          transition-delay: var(--d, 0ms);
          position: relative; display: block; width: 100%; aspect-ratio: 4 / 5;
          border-radius: 22px; overflow: hidden; text-decoration: none;
          box-shadow: 0 10px 30px -12px rgba(28,44,44,0.28), 0 2px 6px rgba(28,44,44,0.10);
        }
        .svc-ov.is-revealed .svc-ov-card { opacity: 1; transform: translateY(0); }

        .svc-ov-img { position: absolute; inset: 0; transition: transform .7s cubic-bezier(.16,1,.3,1); will-change: transform; }
        @media (prefers-reduced-motion: no-preference) {
          .svc-ov-card:hover { box-shadow: 0 26px 56px -16px rgba(28,44,44,0.40), 0 4px 10px rgba(28,44,44,0.14); }
          .svc-ov-card:hover .svc-ov-img { transform: scale(1.06); }
          .svc-ov-card:hover .svc-ov-go { opacity: 1; transform: translateY(0) scale(1); }
          .svc-ov-card:hover .svc-ov-title { transform: translateY(-2px); }
        }
        .svc-ov-scrim {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(180deg,
            rgba(18,36,36,0) 34%, rgba(17,33,33,0.40) 66%,
            rgba(14,28,28,0.74) 90%, rgba(12,24,24,0.82) 100%);
        }
        .svc-ov-body { position: absolute; left: 0; right: 0; bottom: 0; padding: 22px 22px 24px; }
        .svc-ov-title { transition: transform .5s cubic-bezier(.16,1,.3,1); }
        .svc-ov-blurb {
          color: rgba(255,255,255,0.86); font-size: 13px; line-height: 1.5; margin: 7px 0 0;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .svc-ov-go {
          position: absolute; top: 16px; right: 16px; width: 40px; height: 40px; border-radius: 999px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.92); color: var(--teal-deep); font-size: 18px;
          opacity: 0; transform: translateY(-4px) scale(0.9); transition: opacity .4s ease, transform .4s cubic-bezier(.16,1,.3,1);
          box-shadow: 0 6px 18px rgba(12,24,24,0.28);
        }

        .svc-ov-arrowbtn {
          width: 46px; height: 46px; border-radius: 999px; display: flex; align-items: center; justify-content: center;
          background: #fff; color: var(--teal-deep); font-size: 22px; line-height: 1; cursor: pointer;
          border: 1px solid rgba(150,178,178,0.55); box-shadow: 0 6px 18px rgba(28,44,44,0.16);
          transition: transform .3s ease, box-shadow .3s ease, background .3s ease, color .3s ease;
        }
        .svc-ov-arrowbtn:hover { background: var(--teal-deep); color: #fff; border-color: var(--teal-deep); transform: scale(1.05); }

        @media (prefers-reduced-motion: reduce) {
          .svc-ov-rv, .svc-ov-card, .svc-ov-img, .svc-ov-go, .svc-ov-title { transition: none !important; }
          .svc-ov-rv, .svc-ov-card { opacity: 1 !important; transform: none !important; }
        }
        @media (max-width: 640px) {
          .svc-ov-cell { width: 78vw !important; }
        }
      `}</style>

      {/* Header — matched to the Carisma Slimming proportions: small tracked eyebrow,
          64px hairline, large uppercase Trajan heading, calm 16px subcopy. */}
      <div className="container" style={{ textAlign: "center" }}>
        <p className="svc-ov-rv font-display"
           style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.25em",
                    textTransform: "uppercase", color: "var(--teal-deep)", margin: 0 }}>
          Doctor-Led Treatments
        </p>
        <div aria-hidden="true" className="svc-ov-rv"
             style={{ width: 64, height: 1, background: "var(--teal-deep)",
                      margin: "16px auto 20px", transitionDelay: "40ms" }} />
        <h2 id="svc-ov-heading" className="svc-ov-rv font-serif"
            style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 400, color: "var(--teal-deep)",
                     letterSpacing: "0.03em", lineHeight: 1.25, textTransform: "uppercase",
                     margin: 0, transitionDelay: "60ms" }}>
          Our Medical Aesthetic Treatments in Malta
        </h2>
        <p className="svc-ov-rv mx-auto"
           style={{ maxWidth: 620, marginTop: 18, color: "var(--ink-soft)", fontSize: 16,
                    lineHeight: 1.6, transitionDelay: "120ms" }}>
          A complete menu of advanced, medically supervised treatments — each tailored
          to refresh, restore and let you glow with confidence.
        </p>
      </div>

      {/* Peeking full-bleed track */}
      <div
        ref={viewportRef}
        className="svc-ov-viewport"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        style={{ overflow: "hidden", touchAction: "pan-y", cursor: rich ? "grab" : "default",
                 marginTop: "clamp(34px,4.5vw,52px)", paddingBottom: 6 }}
      >
        <div
          ref={trackRef}
          className="svc-ov-track"
          style={{ display: "flex", gap: `${GAP}px`, willChange: "transform",
                   paddingLeft: "max(20px, calc((100vw - var(--maxw, 1200px)) / 2 + 20px))",
                   paddingRight: 20 }}
        >
          {cards.map((s, i) => {
            const isClone = i >= SERVICES.length;
            return (
              <div key={`${s.href}-${i}`} className="svc-ov-cell"
                   style={{ width: CARD_W, flexShrink: 0 }} aria-hidden={isClone ? true : undefined}>
                <Link href={s.href} className="svc-ov-card group"
                      tabIndex={isClone ? -1 : undefined} aria-label={`Explore ${s.label}`}
                      style={{ ["--d" as string]: `${Math.min(i, 5) * 80}ms` } as React.CSSProperties}
                      draggable={false}>
                  <div className="svc-ov-img">
                    <Image src={s.photo} alt={`${s.label} treatment at Carisma Aesthetics Malta`}
                           fill sizes="(max-width:640px) 78vw, 340px"
                           style={{ objectFit: "cover", objectPosition: "center" }}
                           loading="lazy" draggable={false} />
                  </div>
                  <div className="svc-ov-scrim" aria-hidden="true" />
                  <span className="svc-ov-go" aria-hidden="true">&rarr;</span>
                  <div className="svc-ov-body">
                    <h3 className="svc-ov-title font-serif"
                        style={{ color: "#fff", fontSize: 21, fontWeight: 400, letterSpacing: "0.04em",
                                 lineHeight: 1.2, margin: 0, textShadow: "0 1px 14px rgba(12,24,24,0.5)" }}>
                      {s.label}
                    </h3>
                    <p className="svc-ov-blurb">{s.blurb}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Control row: progress (left) + arrows (right) */}
      <div className="container" style={{ marginTop: "clamp(26px,3vw,38px)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <div aria-hidden="true"
               style={{ position: "relative", height: 6, borderRadius: 999, flex: 1, maxWidth: 360,
                        background: "rgba(150,178,178,0.28)", overflow: "hidden" }}>
            <div ref={progressRef}
                 style={{ position: "absolute", inset: 0, transformOrigin: "left center",
                          transform: "scaleX(0.12)", borderRadius: 999,
                          background: "linear-gradient(90deg, var(--brand-teal), var(--teal-deep))" }} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => nudge(-1)} aria-label="Previous treatments" className="svc-ov-arrowbtn">‹</button>
            <button onClick={() => nudge(1)} aria-label="Next treatments" className="svc-ov-arrowbtn">›</button>
          </div>
        </div>
      </div>
    </section>
  );
}
