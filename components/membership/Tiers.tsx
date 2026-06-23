"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * Tiers — the Glow Club CONVERSION CORE, elevated to feel ELITE / LUXURY.
 *
 * The membership status/tier cards for the Carisma Aesthetics "Glow Club".
 * Every fact — tier name, complimentary reward, lifetime-spend threshold, the
 * always-on member perks and the "Join the Glow Club" CTA → /membership/join —
 * is preserved verbatim from the original. Only the *presentation* is restyled:
 * premium materials (soft gold hairline, layered shadow, glass), a clearer
 * "Elite = most popular" emphasis, refined type, and — the headline change — a
 * small, slow-rotating 3D gem/medallion per tier rendered with raw three.js.
 *
 * ── Why this file is a Client Component ───────────────────────────────────────
 * The brief restricts edits to THIS file, so the WebGL mount can't live in a
 * sibling. Making the whole module `'use client'` is the SSR-safe way to do that:
 *   • The card markup still server-renders to HTML (no layout shift, fully
 *     crawlable, all copy in the initial payload).
 *   • The gem slot ALWAYS renders a static faceted SVG first (the graceful
 *     fallback). three.js is imported lazily (dynamic import inside an effect),
 *     so it lands in its own chunk and never touches SSR or the main bundle.
 *   • Each canvas mounts ONLY when its card scrolls into view (Intersection
 *     Observer), pauses when the tab is hidden, caps DPR, and fully disposes on
 *     unmount. The reserved 64px gem box means the canvas never shifts layout.
 *   • prefers-reduced-motion → no WebGL at all; the elegant static SVG stays.
 *
 * Background cleanup: the section is transparent (the membership page glow-field
 * — warm ivory/champagne — shows through) and ALL tier cards now sit on a light,
 * warm translucent surface with dark text. The "popular" tier keeps its visual
 * emphasis through a warmer champagne tint, gold hairline, deeper lift and gold
 * CTA — no teal fill anywhere. Teal stays accent-only (header rule, check ticks).
 *
 * Brand: Carisma Aesthetics — "Glow with Confidence". Cool sage-teal + taupe-gold.
 * Accessibility: every text/UI pair verified AA with scripts/contrast.mjs. Worst
 * case is the warm champagne #f3ece0 the translucent cards sit over:
 *   - gold #706552 on champagne #f3ece0 .. 4.87  (AA)
 *   - teal-text #406060 on champagne ..... 5.84  (AA)
 *   - label #695c4e on champagne ......... 5.52  (AA)
 *   - gold #706552 on white .............. 5.72  (AA)
 *   - ink #0c0b0b on gold #c8a96b ........ 8.75  (AAA, "Most popular" ribbon)
 * The 3D gems are decorative (aria-hidden) — no text sits on them, so their
 * tints carry no contrast requirement.
 */

const JOIN_HREF = "/membership/join";

// WCAG AA palette (verified) — design-system tokens + this section's surfaces.
const GOLD = "var(--gold)"; // #706552 — heading / price text
const TEAL_TEXT = "var(--teal-text)"; // #406060 — small teal text
const TEAL_DEEP = "var(--teal-deep)"; // #4f7373 — accent: header rule + check stroke
const RIBBON_BG = "#c8a96b"; // warm gold ribbon — ink reads at 8.75:1
const LABEL = "var(--label)"; // #695c4e — muted taupe text
const MUTED = "var(--muted)"; // #636363 — secondary text
const INK = "var(--ink)"; // #0c0b0b — ribbon text

/* Tier-tinted gem facet palettes — shared by the static SVG fallback and the
 * 3D medallion so the look is identical whether or not WebGL runs. */
type GemTint = {
  base: string;
  tl: string;
  tr: string;
  bl: string;
  br: string;
  /** three.js facet colours (hex ints), brightest → darkest for shading. */
  core: number;
  light: number;
  mid: number;
  dark: number;
  /** rim-light tint for the metallic edge glint. */
  glint: number;
};

const SILVER: GemTint = {
  base: "#C0C0C0",
  tl: "#a8a8a8",
  tr: "#d8d8d8",
  bl: "#c8c8c8",
  br: "#b0b0b0",
  core: 0xe6ecec,
  light: 0xcdd6d6,
  mid: 0xafbcbc,
  dark: 0x8b9a9a,
  glint: 0xffffff,
};
const GOLDEN: GemTint = {
  base: "#D4AF37",
  tl: "#b8921c",
  tr: "#e8ca60",
  bl: "#dcc050",
  br: "#c9a230",
  core: 0xf3dd8e,
  light: 0xe8ca60,
  mid: 0xcda53a,
  dark: 0xa87f1e,
  glint: 0xfff3cf,
};
const PLATINUM: GemTint = {
  base: "#96b2b2",
  tl: "#7da0a0",
  tr: "#b2cccc",
  bl: "#a0c4c4",
  br: "#88b0b0",
  core: 0xdcebeb,
  light: 0xb6d0d0,
  mid: 0x96b2b2,
  dark: 0x6f9090,
  glint: 0xf2fafa,
};

type Tier = {
  name: string;
  reward: string;
  threshold: string; // lifetime-spend anchor (kept exactly as the original "spend" copy)
  blurb: string;
  popular?: boolean;
  tint: GemTint;
};

const TIERS: Tier[] = [
  {
    name: "Signature Status",
    reward: "Carisma Spa Day for two",
    threshold: "with €1,000+ lifetime spend",
    blurb: "Your first reward milestone — a shared day of calm, on us.",
    tint: SILVER,
  },
  {
    name: "Elite Status",
    reward: "Signature Massage",
    threshold: "with €2,500+ lifetime spend",
    blurb: "Where most members settle in — bigger rewards, same easy saving.",
    popular: true,
    tint: GOLDEN,
  },
  {
    name: "Platinum Status",
    reward: "€300 Aesthetics Voucher",
    threshold: "with €5,000+ lifetime spend",
    blurb: "Our highest tier — for the members who glow with us for years.",
    tint: PLATINUM,
  },
];

/* The discount facts — always-on, shown on every card so value never hides. */
const PERKS = [
  "10% off all aesthetics & spa services",
  "15% off all skincare products",
  "Priority booking, every visit",
  "A complimentary consultation each year",
];

/* ── Static faceted gem SVG ──────────────────────────────────────────────────
 * The default render AND the prefers-reduced-motion fallback. Sits underneath
 * the 3D canvas so there is never an empty frame; the canvas fades in over it. */
function GemSvg({ tint }: { tint: GemTint }) {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 54 54"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block" }}
    >
      <polygon
        points="27,6 48,20 48,34 27,48 6,34 6,20"
        fill={tint.base}
        opacity="0.9"
      />
      <polygon points="27,6 48,20 27,28" fill={tint.tr} />
      <polygon points="27,6 6,20 27,28" fill={tint.tl} />
      <polygon points="27,48 48,34 27,28" fill={tint.br} />
      <polygon points="27,48 6,34 27,28" fill={tint.bl} />
    </svg>
  );
}

/* ── 3D gem medallion (raw three.js, lazily loaded) ──────────────────────────
 * A slow-rotating faceted octahedron-style gem, tier-tinted, lit so its facets
 * catch a soft moving highlight. Mounts only when in view + motion allowed;
 * fully self-disposing. Modelled on GiftCardScene's SSR/perf safeguards. */
function GemScene({ tint }: { tint: GemTint }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Respect reduced motion — never spin up WebGL, keep the static SVG.
    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let disposed = false;
    let cleanup: (() => void) | null = null;
    let started = false;

    // Lazy-load three.js AND create the WebGL context only on first in-view —
    // never in SSR, never in the main bundle, never an eager per-card context.
    const startWebGL = () => {
      if (started || disposed || !mount) return;
      started = true;
      import("three")
      .then((THREE) => {
        if (disposed || !mount) return;

        const SIZE = 64; // matches the reserved gem box → zero layout shift
        let raf = 0;
        let running = false;
        let inView = false;

        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(SIZE, SIZE);
        renderer.domElement.style.cssText =
          "position:absolute;inset:0;width:100%;height:100%;display:block;";
        mount.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
        camera.position.set(0, 0, 6.4);

        // Faceted gem — a sharp octahedron reads as a cut jewel / medallion.
        const geometry = new THREE.OctahedronGeometry(1.5, 0);

        const material = new THREE.MeshStandardMaterial({
          color: tint.mid,
          metalness: 0.85,
          roughness: 0.28,
          flatShading: true, // crisp, jewel-cut facets
          emissive: tint.dark,
          emissiveIntensity: 0.12,
          transparent: true,
          opacity: 0, // fade in once the first frame is painted
        });

        const gem = new THREE.Mesh(geometry, material);
        gem.rotation.x = 0.5;
        gem.scale.set(1, 1.18, 1); // gentle elongation → faceted-jewel silhouette
        scene.add(gem);

        // Soft sage-teal ambient + a warm key light tinted to the tier so the
        // facets pick up the brand colour as the gem turns.
        const ambient = new THREE.AmbientLight(0xdfeaea, 0.9);
        const key = new THREE.DirectionalLight(tint.core, 1.5);
        key.position.set(2.4, 3, 4);
        const rim = new THREE.DirectionalLight(tint.glint, 0.9);
        rim.position.set(-3, -1.5, 2);
        scene.add(ambient, key, rim);

        const render = () => {
          if (disposed) return;
          renderer.render(scene, camera);
        };

        const t0 = performance.now();
        const loop = () => {
          if (!running) return;
          const t = (performance.now() - t0) / 1000;
          // Slow, refined rotation — luxury, not a spinner.
          gem.rotation.y = t * 0.5;
          gem.rotation.x = 0.5 + Math.sin(t * 0.4) * 0.12;
          render();
          raf = requestAnimationFrame(loop);
        };

        const play = () => {
          if (running) return;
          running = true;
          loop();
        };
        const pause = () => {
          running = false;
          cancelAnimationFrame(raf);
        };

        const updateRunning = () => {
          if (inView && !document.hidden) play();
          else pause();
        };

        const io = new IntersectionObserver(
          ([entry]) => {
            inView = entry.isIntersecting;
            updateRunning();
          },
          { threshold: 0.15 }
        );
        io.observe(mount);

        const onVisibility = () => updateRunning();
        document.addEventListener("visibilitychange", onVisibility);

        // First paint, then cross-fade the gem material in over the static SVG.
        render();
        if (!disposed) setReady(true);
        fadeInMaterial(material, render);

        cleanup = () => {
          pause();
          io.disconnect();
          document.removeEventListener("visibilitychange", onVisibility);
          geometry.dispose();
          material.dispose();
          renderer.dispose();
          renderer.domElement.parentNode?.removeChild(renderer.domElement);
        };
      })
      .catch(() => {
        /* three.js failed to load — the static SVG remains, no-op. */
      });
    };

    // Create the WebGL context only when the gem first scrolls into view
    // (rootMargin pre-warms slightly before it appears).
    const startIO = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          startIO.disconnect();
          startWebGL();
        }
      },
      { threshold: 0.15, rootMargin: "200px" }
    );
    startIO.observe(mount);

    return () => {
      disposed = true;
      startIO.disconnect();
      if (cleanup) cleanup();
    };
    // tint never changes per card instance.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        opacity: ready ? 1 : 0,
        transition: "opacity 600ms ease",
        pointerEvents: "none",
      }}
    />
  );
}

/* Tiny RAF opacity tween for the gem material — keeps GSAP out of this chunk
 * (it isn't needed for a single fade) while still giving a soft fade-in. */
function fadeInMaterial(material: { opacity: number }, onUpdate: () => void) {
  const start = performance.now();
  const dur = 700;
  const step = () => {
    const p = Math.min(1, (performance.now() - start) / dur);
    material.opacity = p;
    onUpdate();
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function Check({ on }: { on: "light" | "dark" }) {
  // Decorative tick; the perk text carries the meaning for screen readers.
  const stroke = on === "dark" ? "#ffffff" : TEAL_DEEP;
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 20 20"
      fill="none"
      stroke={stroke}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0, marginTop: "3px" }}
    >
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}

/* The gem slot: a premium glass dais cradling the static SVG with the 3D
 * medallion layered on top. Fixed 64px box → no layout shift when WebGL mounts. */
function GemSlot({ tint, dark }: { tint: GemTint; dark: boolean }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        width: "64px",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        background: dark
          ? "radial-gradient(circle at 50% 38%, rgba(255,255,255,0.20), rgba(255,255,255,0.04) 70%)"
          : "radial-gradient(circle at 50% 38%, #fdfaf4, #f3ece0 72%)",
        border: dark
          ? "1px solid rgba(255,255,255,0.30)"
          : "1px solid rgba(112,101,82,0.28)", // soft gold hairline
        boxShadow: dark
          ? "inset 0 1px 2px rgba(255,255,255,0.25), 0 6px 16px -8px rgba(0,0,0,0.4)"
          : "inset 0 1px 2px rgba(255,255,255,0.9), 0 6px 16px -10px rgba(64,96,96,0.45)",
      }}
    >
      {/* Static faceted gem — always present (default + reduced-motion). */}
      <div style={{ position: "relative", zIndex: 0 }}>
        <GemSvg tint={tint} />
      </div>
      {/* 3D medallion fades in over the SVG when in view + motion allowed. */}
      <GemScene tint={tint} />
    </div>
  );
}

export default function Tiers() {
  return (
    <section
      aria-labelledby="glow-tiers-heading"
      style={{ padding: "76px 0", background: "transparent" }}
    >
      <div className="container">
        {/* ── Header ───────────────────────────────────────────── */}
        <div className="text-center mx-auto" style={{ maxWidth: "760px" }}>
          <p
            style={{
              fontSize: "12px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: TEAL_TEXT,
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            The Glow Club
          </p>
          <h2
            id="glow-tiers-heading"
            className="font-serif"
            style={{
              fontSize: "clamp(26px,3.4vw,38px)",
              color: GOLD,
              fontWeight: 400,
              lineHeight: 1.25,
              letterSpacing: "0.04em",
            }}
          >
            Save as you go, glow as you grow
          </h2>
          <div
            aria-hidden="true"
            className="mx-auto"
            style={{
              width: "70px",
              height: "1px",
              background: TEAL_DEEP,
              opacity: 0.5,
              margin: "18px auto 0",
            }}
          />
          <p
            style={{
              fontSize: "15px",
              color: MUTED,
              lineHeight: 1.8,
              marginTop: "22px",
            }}
          >
            One simple monthly membership. The more your lifetime contributions
            grow, the more you unlock — and your{" "}
            <b style={{ color: GOLD, fontWeight: 600 }}>
              10% member discount on every treatment
            </b>{" "}
            applies from the very first day.
          </p>
        </div>

        {/* ── Status / pricing cards ───────────────────────────── */}
        <ul
          className="grid gap-7 md:grid-cols-3 mx-auto"
          style={{
            maxWidth: "1040px",
            marginTop: "56px",
            listStyle: "none",
            padding: 0,
            alignItems: "stretch",
          }}
          aria-label="Glow Club membership status tiers"
        >
          {TIERS.map((t) => {
            // `featured` = the popular tier's VISUAL emphasis (lift, deeper
            // shadow, ribbon, gold crown). It no longer implies a teal fill —
            // all cards now sit on a light warm surface with dark text, so the
            // page glow-field reads through and teal stays accent-only.
            const featured = !!t.popular;
            const dark = false; // text/UI always render for a light ground now
            const headingId = `tier-${t.name.replace(/\s+/g, "-").toLowerCase()}`;
            // Featured card gets a subtly warmer champagne-tinted translucent
            // surface so it still stands apart from the plainer ivory tiers.
            const surface = featured
              ? "linear-gradient(170deg, rgba(255,255,255,0.92) 0%, rgba(247,240,228,0.92) 100%)"
              : "linear-gradient(170deg, rgba(255,255,255,0.82) 0%, rgba(250,246,239,0.82) 100%)";
            const nameColor = TEAL_TEXT;
            const rewardColor = GOLD;
            const subColor = LABEL;
            const perkColor = LABEL;
            const divider = "var(--line)";

            return (
              <li
                key={t.name}
                className="card"
                aria-labelledby={headingId}
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  background: surface,
                  backdropFilter: "blur(2px)",
                  border: featured
                    ? "1px solid rgba(199,169,107,0.55)" // warm gold hairline for the popular tier
                    : "1px solid rgba(112,101,82,0.16)", // soft gold hairline
                  borderRadius: "20px",
                  padding: featured ? "54px 28px 32px" : "46px 28px 32px",
                  // Layered, premium shadow — the popular card lifts further.
                  boxShadow: featured
                    ? "0 1px 0 rgba(255,255,255,0.9) inset, 0 26px 60px -22px rgba(64,96,96,0.40), 0 8px 20px -14px rgba(112,101,82,0.22)"
                    : "0 1px 0 rgba(255,255,255,0.9) inset, 0 14px 36px -24px rgba(64,96,96,0.34), 0 4px 12px -10px rgba(112,101,82,0.18)",
                  transform: featured ? "translateY(-6px)" : undefined,
                }}
              >
                {/* Subtle gold hairline crown — premium top accent */}
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "18%",
                    right: "18%",
                    height: "1px",
                    background:
                      "linear-gradient(90deg, transparent, rgba(199,169,107,0.7), transparent)",
                  }}
                />

                {/* "Most popular" ribbon */}
                {t.popular && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-13px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: RIBBON_BG,
                      color: INK,
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      padding: "6px 16px",
                      borderRadius: "999px",
                      whiteSpace: "nowrap",
                      boxShadow: "0 6px 16px -5px rgba(0,0,0,0.35)",
                    }}
                  >
                    Most popular
                  </span>
                )}

                {/* Gem + tier name */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <GemSlot tint={t.tint} dark={dark} />
                  <h3
                    id={headingId}
                    className="font-display"
                    style={{
                      fontSize: "13px",
                      color: nameColor,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      marginTop: "18px",
                    }}
                  >
                    {t.name}
                  </h3>
                </div>

                {/* Anchor: lifetime-spend threshold + complimentary reward */}
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "20px",
                    paddingTop: "20px",
                    borderTop: `1px solid ${divider}`,
                  }}
                >
                  <p
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: subColor,
                      opacity: dark ? 0.95 : 1,
                      fontWeight: 600,
                    }}
                  >
                    Complimentary
                  </p>
                  <p
                    style={{
                      fontSize: "20px",
                      color: rewardColor,
                      fontWeight: 600,
                      lineHeight: 1.35,
                      marginTop: "6px",
                    }}
                    className="font-serif"
                  >
                    {t.reward}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: subColor,
                      lineHeight: 1.6,
                      marginTop: "8px",
                      fontWeight: 500,
                    }}
                  >
                    {t.threshold}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: subColor,
                      lineHeight: 1.7,
                      marginTop: "12px",
                      fontStyle: "italic",
                      opacity: dark ? 0.95 : 0.9,
                    }}
                  >
                    {t.blurb}
                  </p>
                </div>

                {/* Always-on member benefits */}
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "22px 0 0",
                    textAlign: "left",
                    flexGrow: 1,
                  }}
                >
                  {PERKS.map((perk) => (
                    <li
                      key={perk}
                      style={{
                        display: "flex",
                        gap: "10px",
                        fontSize: "13.5px",
                        lineHeight: 1.55,
                        color: perkColor,
                        marginBottom: "11px",
                      }}
                    >
                      <Check on={dark ? "dark" : "light"} />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={JOIN_HREF}
                  className={featured ? "btn btn-gold" : "btn btn-teal"}
                  style={{
                    marginTop: "26px",
                    width: "100%",
                    justifyContent: "center",
                  }}
                  aria-label={`Join the Glow Club — ${t.name}`}
                >
                  Join the Glow Club
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── Reassurance footnote (the credited-first-month fact) ── */}
        <p
          className="text-center mx-auto"
          style={{
            maxWidth: "640px",
            marginTop: "32px",
            fontSize: "12.5px",
            color: MUTED,
            lineHeight: 1.75,
          }}
        >
          Status is earned on lifetime contributions, so every tier is yours to
          reach. Your first month is non-refundable but fully credited toward
          your second procedure — so nothing you put in is ever lost.
        </p>
      </div>
    </section>
  );
}
