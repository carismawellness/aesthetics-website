"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES, type ServiceItem } from "@/components/preview/treatments/data";

/**
 * DIRECTION 2 — "EDITORIAL HORIZONTAL SCROLL"
 *
 * The most restrained, typography-led direction. On a capable desktop pointer it
 * pins the section and converts vertical scroll into horizontal motion through an
 * oversized editorial track of the 12 treatments (classic GSAP horizontal scroll).
 * Each panel reveals its photo via a clip-path inset wipe, a giant Trajan numeral
 * drifts behind it, and the label staggers up as the panel reaches centre.
 *
 * MANDATORY fallback (reduced-motion OR coarse-pointer OR width<768 OR Save-Data):
 * NO pin / NO horizontal hijack — a polished CSS scroll-snap swipe of the same
 * editorial cards. The pinning ScrollTrigger is never created on that path.
 */

const EASE = "cubic-bezier(.16,1,.3,1)";

const TOTAL = SERVICES.length;

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

export default function Direction2EditorialScroll() {
  // null = not yet decided (avoid first-paint flash / SSR mismatch).
  const [enhanced, setEnhanced] = useState<boolean | null>(null);
  // Active panel index — drives the fixed corner readout.
  const [active, setActive] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  // Panels + their inner moving parts, collected by ref callbacks.
  const panelRefs = useRef<Array<HTMLElement | null>>([]);
  const photoRefs = useRef<Array<HTMLDivElement | null>>([]);
  const numeralRefs = useRef<Array<HTMLDivElement | null>>([]);
  const labelRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Decide enhanced vs. fallback exactly once, on mount (client only).
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const small = window.innerWidth < 768;
    const saveData = Boolean(
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
        ?.saveData,
    );

    setEnhanced(!(reduce || coarse || small || saveData));
  }, []);

  // Enhanced desktop path: pin + horizontal tween + per-panel motion.
  useEffect(() => {
    if (enhanced !== true) return;
    if (typeof window === "undefined") return;

    const pin = pinRef.current;
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!pin || !track || !section) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const getDistance = (): number =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      // Core horizontal scroll: pin the section, tween the track's x by the
      // overflow distance. invalidateOnRefresh recomputes on resize so it
      // never desyncs.
      const horizontal = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
            const idx = Math.min(
              TOTAL - 1,
              Math.round(self.progress * (TOTAL - 1)),
            );
            setActive((prev) => (prev === idx ? prev : idx));
          },
        },
      });

      // Per-panel choreography, driven by horizontal scroll position so motion
      // peaks as each panel crosses viewport centre.
      const panels = panelRefs.current.filter(Boolean) as HTMLElement[];

      panels.forEach((panel, i) => {
        const photo = photoRefs.current[i];
        const numeral = numeralRefs.current[i];
        const label = labelRefs.current[i];

        // Clip-path inset wipe reveal as the panel reaches centre.
        if (photo) {
          gsap.fromTo(
            photo,
            { clipPath: "inset(0% 0% 100% 0%)", scale: 1.12 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              scale: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontal,
                start: "left 85%",
                end: "center 55%",
                scrub: true,
              },
            },
          );

          // Parallax: photo translates slightly slower than its panel.
          const inner = photo.querySelector<HTMLElement>("[data-parallax-img]");
          if (inner) {
            gsap.fromTo(
              inner,
              { xPercent: -8 },
              {
                xPercent: 8,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: horizontal,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              },
            );
          }
        }

        // Giant numeral drifts at a different rate as it crosses centre.
        if (numeral) {
          gsap.fromTo(
            numeral,
            { xPercent: 18, yPercent: 4, opacity: 0.04 },
            {
              xPercent: -18,
              yPercent: -4,
              opacity: 0.09,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontal,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        }

        // Kinetic caption: the label's words stagger up as the panel enters centre.
        if (label) {
          const words = label.querySelectorAll<HTMLElement>("[data-word] > span");
          if (words.length) {
            gsap.fromTo(
              words,
              { yPercent: 120 },
              {
                yPercent: 0,
                ease: "power3.out",
                stagger: 0.06,
                duration: 0.9,
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: horizontal,
                  start: "left 70%",
                  end: "left 30%",
                  scrub: 0.5,
                },
              },
            );
          }
        }
      });

      // Keep everything aligned after fonts/images shift layout.
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);

      // Store for cleanup via the context revert (listener handled below).
      ctx.add(() => window.removeEventListener("load", onLoad));

      // Explicit refresh after this section mounts/lays out — the switcher
      // mounts us long after window 'load' has fired, so that listener alone
      // would never run. A deferred second refresh catches late image/font reflow.
      ScrollTrigger.refresh();
    }, section);

    // Re-measure once the new pinned layout has painted (and again shortly after,
    // in case lazy hero images change panel box sizes).
    const raf = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      ctx.revert(); // kills this section's tweens + ScrollTriggers + pin-spacer
    };
  }, [enhanced]);

  const eyebrow = "Doctor-Led Treatments";
  const title = "Our Medical Aesthetic Treatments";
  const subcopy =
    "A complete menu of advanced, medically supervised treatments, each tailored to refresh, restore and let you glow with confidence.";

  return (
    <section
      ref={sectionRef}
      id="d2-section"
      aria-labelledby="d2-heading"
      className="d2-root"
    >
      <style>{css}</style>

      {/* Editorial intro — always rendered, identical on both paths. */}
      <div className="d2-intro">
        <p className="font-serif d2-eyebrow">{eyebrow}</p>
        <h2 id="d2-heading" className="font-serif d2-title">
          {title}
        </h2>
        <p className="d2-subcopy">{subcopy}</p>
        {enhanced === true ? (
          <p className="font-display d2-hint" aria-hidden="true">
            Scroll to explore <span className="d2-hint-arrow">→</span>
          </p>
        ) : null}
      </div>

      {/* enhanced === null → render nothing motion-specific yet (avoids flash).
          We still render the fallback markup so SSR/no-JS shows real content. */}
      {enhanced === true ? (
        <div ref={pinRef} className="d2-pin">
          <div ref={trackRef} className="d2-track">
            {SERVICES.map((s: ServiceItem, i: number) => (
              <Panel
                key={s.href}
                index={i}
                label={s.label}
                href={s.href}
                photo={s.photo}
                blurb={s.blurb}
                enhanced
                setPanelRef={(el) => {
                  panelRefs.current[i] = el;
                }}
                setPhotoRef={(el) => {
                  photoRefs.current[i] = el;
                }}
                setNumeralRef={(el) => {
                  numeralRefs.current[i] = el;
                }}
                setLabelRef={(el) => {
                  labelRefs.current[i] = el;
                }}
              />
            ))}
          </div>

          {/* Fixed corner readout — "NN / 12" + current treatment name. */}
          <div className="d2-readout" aria-hidden="true">
            <span className="font-display d2-readout-count">
              {pad2(active + 1)} <span className="d2-readout-slash">/</span>{" "}
              {pad2(TOTAL)}
            </span>
            <span className="font-serif d2-readout-name">
              {SERVICES[active].label}
            </span>
          </div>

          {/* Thin teal progress line (bottom) reflecting horizontal progress. */}
          <div className="d2-progress" aria-hidden="true">
            <span ref={progressRef} className="d2-progress-fill" />
          </div>
        </div>
      ) : (
        // Fallback (and the not-yet-decided null state): polished CSS scroll-snap
        // swipe of the same editorial cards. No pin, no hijack, no rAF.
        <div className="d2-fallback" role="list" aria-label={title}>
          {SERVICES.map((s: ServiceItem, i: number) => (
            <Panel
              key={s.href}
              index={i}
              label={s.label}
              href={s.href}
              photo={s.photo}
              blurb={s.blurb}
              enhanced={false}
            />
          ))}
        </div>
      )}
    </section>
  );
}

type PanelProps = {
  index: number;
  label: string;
  href: string;
  photo: string;
  blurb: string;
  enhanced: boolean;
  setPanelRef?: (el: HTMLElement | null) => void;
  setPhotoRef?: (el: HTMLDivElement | null) => void;
  setNumeralRef?: (el: HTMLDivElement | null) => void;
  setLabelRef?: (el: HTMLDivElement | null) => void;
};

function Panel({
  index,
  label,
  href,
  photo,
  blurb,
  enhanced,
  setPanelRef,
  setPhotoRef,
  setNumeralRef,
  setLabelRef,
}: PanelProps) {
  const numeral = String(index + 1).padStart(2, "0");
  // Alternate the vertical baseline of panels for editorial rhythm.
  const high = index % 2 === 0;
  const words = label.split(" ");

  return (
    <article
      ref={setPanelRef}
      role={enhanced ? undefined : "listitem"}
      className={`d2-panel${high ? " d2-panel--high" : " d2-panel--low"}${
        enhanced ? "" : " d2-panel--fallback"
      }`}
    >
      {/* Faint oversized Trajan numeral backdrop. */}
      <div
        ref={setNumeralRef}
        className="font-serif d2-numeral"
        aria-hidden="true"
      >
        {numeral}
      </div>

      <div className="d2-card">
        <div ref={setPhotoRef} className="d2-photo">
          <div className="d2-photo-inner" data-parallax-img>
            <Image
              src={photo}
              alt={label}
              fill
              sizes="(max-width: 767px) 84vw, 40vw"
              className="d2-img"
              loading={index < 2 ? "eager" : "lazy"}
            />
          </div>
          <span className="d2-photo-ring" aria-hidden="true" />
        </div>

        <div className="d2-meta">
          <span className="font-display d2-index" aria-hidden="true">
            {numeral} <span className="d2-index-sep">/</span> 12
          </span>

          <div ref={setLabelRef} className="d2-label-wrap">
            <h3 className="font-serif d2-label">
              {words.map((w, wi) => (
                <span className="d2-word" data-word key={`${w}-${wi}`}>
                  <span>{w}</span>
                  {wi < words.length - 1 ? " " : null}
                </span>
              ))}
            </h3>
          </div>

          <p className="d2-blurb">{blurb}</p>

          <Link className="font-display d2-explore" href={href}>
            Explore
            <span className="d2-explore-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

const css = `
.d2-root {
  position: relative;
  background:
    radial-gradient(120% 80% at 50% -10%, var(--teal-100, #f7fafa) 0%, var(--white, #fff) 55%);
  color: var(--ink-soft, #3a3a3a);
  overflow: clip;
  isolation: isolate;
}

/* ---------- Intro ---------- */
.d2-intro {
  max-width: 64rem;
  margin: 0 auto;
  padding: clamp(4rem, 9vw, 8rem) 1.5rem clamp(2rem, 5vw, 4rem);
  text-align: center;
}
.d2-eyebrow {
  margin: 0 0 1.1rem;
  font-weight: 400;
  font-size: clamp(0.72rem, 1vw, 0.82rem);
  letter-spacing: 0.34em;
  text-transform: uppercase;
  color: var(--brand-teal, #96b2b2);
}
.d2-title {
  margin: 0 auto;
  max-width: 18ch;
  font-weight: 400;
  font-size: clamp(2rem, 5.2vw, 4rem);
  line-height: 1.04;
  letter-spacing: 0.005em;
  color: var(--teal-deep, #245052);
}
.d2-subcopy {
  margin: 1.4rem auto 0;
  max-width: 52ch;
  font-size: clamp(0.98rem, 1.4vw, 1.12rem);
  line-height: 1.65;
  color: var(--ink-soft, #3a3a3a);
}
.d2-hint {
  margin: 2.6rem 0 0;
  font-size: 0.7rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--label, #245052);
  opacity: 0.7;
}
.d2-hint-arrow {
  display: inline-block;
  margin-left: 0.4em;
  animation: d2-nudge 1.8s ${EASE} infinite;
}
@keyframes d2-nudge {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(6px); }
}

/* ---------- Pinned horizontal track (enhanced) ---------- */
.d2-pin {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.d2-track {
  display: flex;
  align-items: center;
  gap: clamp(2rem, 5vw, 6rem);
  padding: 0 clamp(4vw, 12vw, 16vw);
  will-change: transform;
}

/* ---------- Panel ---------- */
.d2-panel {
  position: relative;
  flex: 0 0 auto;
  width: min(42vw, 34rem);
  display: flex;
  align-items: center;
}
.d2-panel--high { align-self: flex-start; margin-top: 12vh; }
.d2-panel--low { align-self: flex-end; margin-bottom: 12vh; }

.d2-numeral {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  font-weight: 400;
  font-size: clamp(16rem, 30vw, 30rem);
  line-height: 0.8;
  letter-spacing: -0.02em;
  color: var(--teal-deep, #245052);
  opacity: 0.05;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
}

.d2-card {
  position: relative;
  z-index: 1;
  width: 100%;
}

/* ---------- Photo + clip-path reveal ---------- */
.d2-photo {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: var(--radius-card, 16px);
  overflow: hidden;
  background: var(--teal-100, #f7fafa);
  box-shadow: 0 24px 60px -28px rgba(36, 80, 82, 0.35);
}
.d2-photo-inner {
  position: absolute;
  inset: -6% -10%;
  width: 120%;
  height: 112%;
  will-change: transform;
}
.d2-img {
  object-fit: cover;
}
.d2-photo-ring {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: inset 0 0 0 1px var(--brand-teal, #96b2b2);
  opacity: 0.5;
  pointer-events: none;
}

/* ---------- Meta block ---------- */
.d2-meta {
  margin-top: 1.6rem;
  padding-left: 0.15rem;
}
.d2-index {
  display: inline-block;
  margin-bottom: 0.7rem;
  font-size: 0.66rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--brand-taupe, #9b8d83);
}
.d2-index-sep { opacity: 0.5; }

.d2-label-wrap { overflow: hidden; }
.d2-label {
  margin: 0;
  font-weight: 400;
  font-size: clamp(1.7rem, 3vw, 2.7rem);
  line-height: 1.05;
  letter-spacing: 0.01em;
  color: var(--teal-deep, #245052);
}
.d2-word {
  display: inline-block;
  overflow: hidden;
}
.d2-word > span {
  display: inline-block;
  will-change: transform;
}

.d2-blurb {
  margin: 0.9rem 0 0;
  max-width: 36ch;
  font-size: clamp(0.92rem, 1.2vw, 1rem);
  line-height: 1.6;
  color: var(--ink-soft, #3a3a3a);
}

.d2-explore {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 1.5rem;
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--link-text, var(--teal-deep, #245052));
  text-decoration: none;
  border-bottom: 1px solid color-mix(in srgb, var(--brand-teal, #96b2b2) 70%, transparent);
  padding-bottom: 0.3rem;
  transition: gap 0.4s ${EASE}, border-color 0.4s ${EASE}, color 0.4s ${EASE};
}
.d2-explore-arrow {
  transition: transform 0.4s ${EASE};
}
.d2-explore:hover {
  gap: 0.95rem;
  color: var(--teal-deep, #245052);
  border-color: var(--teal-deep, #245052);
}
.d2-explore:hover .d2-explore-arrow {
  transform: translateX(4px);
}
.d2-explore:focus-visible {
  outline: 2px solid var(--teal-deep, #245052);
  outline-offset: 4px;
  border-radius: 2px;
}

/* ---------- Fixed corner readout (enhanced) ---------- */
.d2-readout {
  position: absolute;
  left: clamp(4vw, 12vw, 16vw);
  bottom: clamp(3.2rem, 8vh, 5.6rem);
  z-index: 4;
  display: flex;
  align-items: baseline;
  gap: 1rem;
  pointer-events: none;
}
.d2-readout-count {
  font-size: clamp(0.66rem, 0.9vw, 0.76rem);
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--brand-taupe, #9b8d83);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.d2-readout-slash { color: var(--brand-teal, #96b2b2); margin: 0 0.05em; }
.d2-readout-name {
  font-size: clamp(1rem, 1.6vw, 1.35rem);
  line-height: 1;
  letter-spacing: 0.015em;
  color: var(--teal-deep, #245052);
}

/* ---------- Progress line ---------- */
.d2-progress {
  position: absolute;
  left: clamp(4vw, 12vw, 16vw);
  right: clamp(4vw, 12vw, 16vw);
  bottom: clamp(2.2rem, 5vh, 4rem);
  height: 1px;
  background: color-mix(in srgb, var(--line, #8a8a8a) 35%, transparent);
  z-index: 3;
}
.d2-progress-fill {
  display: block;
  height: 100%;
  width: 100%;
  transform: scaleX(0);
  transform-origin: left center;
  background: linear-gradient(
    90deg,
    var(--brand-teal, #96b2b2),
    var(--teal-deep, #245052)
  );
}

/* ---------- Fallback: CSS scroll-snap swipe ---------- */
.d2-fallback {
  display: flex;
  gap: clamp(1.25rem, 4vw, 2.5rem);
  padding: 1rem clamp(1.25rem, 6vw, 4rem) clamp(3rem, 7vw, 5rem);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.d2-fallback::-webkit-scrollbar { display: none; }

.d2-panel--fallback {
  width: min(84vw, 26rem);
  align-self: auto;
  margin: 0;
  scroll-snap-align: center;
  padding-top: 3rem;
}
.d2-panel--fallback .d2-numeral {
  font-size: clamp(9rem, 38vw, 15rem);
  opacity: 0.06;
}
.d2-panel--fallback .d2-photo-inner {
  inset: 0;
  width: 100%;
  height: 100%;
}
.d2-panel--fallback .d2-word > span,
.d2-panel--fallback .d2-photo {
  transform: none;
}

/* Tablet: two-up rhythm for fallback panels reads cleaner than huge cards. */
@media (min-width: 600px) and (pointer: coarse) {
  .d2-panel--fallback { width: min(60vw, 24rem); }
}

/* ---------- Reduced motion: kill every transition/animation everywhere ---------- */
@media (prefers-reduced-motion: reduce) {
  .d2-hint-arrow { animation: none; }
  .d2-explore,
  .d2-explore-arrow { transition: none; }
  .d2-explore:hover { gap: 0.6rem; }
  .d2-explore:hover .d2-explore-arrow { transform: none; }
}
`;
