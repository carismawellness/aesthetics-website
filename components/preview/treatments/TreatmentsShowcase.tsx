"use client";

/*
  Internal preview switcher for the "Our Medical Aesthetic Treatments" section.
  Shows ONE of five Awwwards-tier directions at a time (full-bleed) so each can be
  evaluated in isolation. Only the selected direction is mounted — the others stay
  unmounted, so we never run 3 WebGL contexts + a scroll-pin section at once. Each
  direction is code-split (next/dynamic, ssr:false) so only the chosen bundle loads.

  This page inherits the global <Header/> and <Footer/> from the root layout — do
  NOT render them here (that would double the header).
*/

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { DIRECTIONS, type DirectionId } from "@/components/preview/treatments/data";

function Loader() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "grid",
        placeItems: "center",
        color: "var(--brand-taupe)",
      }}
    >
      <span
        className="font-display"
        style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}
      >
        Loading…
      </span>
    </div>
  );
}

// next/dynamic requires inline object-literal options (statically analyzed by the
// compiler) — they can't be hoisted to a shared constant.
const COMPONENTS = [
  dynamic(() => import("@/components/preview/treatments/Direction1LiquidGlass"), {
    ssr: false,
    loading: () => <Loader />,
  }),
  dynamic(() => import("@/components/preview/treatments/Direction2EditorialScroll"), {
    ssr: false,
    loading: () => <Loader />,
  }),
  dynamic(() => import("@/components/preview/treatments/Direction3AuroraGrid"), {
    ssr: false,
    loading: () => <Loader />,
  }),
  dynamic(() => import("@/components/preview/treatments/Direction4DraggableCanvas"), {
    ssr: false,
    loading: () => <Loader />,
  }),
  dynamic(() => import("@/components/preview/treatments/Direction5CinematicCoverflow"), {
    ssr: false,
    loading: () => <Loader />,
  }),
];

export default function TreatmentsShowcase() {
  const [active, setActive] = useState(0);

  // Deep-link support: open #editorial-scroll etc. directly.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "") as DirectionId;
    const idx = DIRECTIONS.findIndex((d) => d.id === hash);
    if (idx >= 0) setActive(idx);
  }, []);

  const select = (i: number) => {
    setActive(i);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${DIRECTIONS[i].id}`);
      // Reset scroll so each direction starts from a clean top (Direction 2 pins
      // on scroll and needs the room; the WebGL ones recalc their viewport).
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const Active = COMPONENTS[active];
  const meta = DIRECTIONS[active];

  return (
    <>
      <style>{`
        .tsw-pill {
          font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--teal-deep); text-decoration: none; background: transparent;
          border: 1px solid var(--brand-teal); border-radius: var(--radius-pill);
          padding: 7px 13px; white-space: nowrap; cursor: pointer; line-height: 1;
          transition: background .25s ease, color .25s ease, border-color .25s ease;
        }
        .tsw-pill:hover { border-color: var(--teal-deep); }
        .tsw-pill[data-active="true"] {
          background: var(--teal-deep); color: #fff; border-color: var(--teal-deep);
        }
        @media (max-width: 640px) {
          .tsw-bar { gap: 6px !important; }
          .tsw-pill { padding: 6px 10px; font-size: 10px; }
        }
      `}</style>

      {/* Sticky direction switcher (sits under the global header). */}
      <nav
        aria-label="Choose a design direction"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "saturate(1.25) blur(12px)",
          WebkitBackdropFilter: "saturate(1.25) blur(12px)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div
          className="container tsw-bar"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
            padding: "10px 0",
          }}
        >
          <span
            className="font-display"
            style={{
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--brand-taupe)",
              fontWeight: 600,
              marginRight: 2,
            }}
          >
            Pick a direction
          </span>
          {DIRECTIONS.map((d, i) => (
            <button
              key={d.id}
              type="button"
              className="tsw-pill font-display"
              data-active={i === active}
              aria-pressed={i === active}
              onClick={() => select(i)}
            >
              {d.n} · {d.name}
            </button>
          ))}
        </div>
      </nav>

      {/* Active-direction label band */}
      <div className="container" style={{ padding: "clamp(28px,4vw,48px) 0 0" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 14,
            flexWrap: "wrap",
            borderTop: "1px solid var(--line)",
            paddingTop: 20,
          }}
        >
          <span
            className="font-serif"
            style={{ fontSize: 30, color: "var(--brand-teal)", fontWeight: 400, lineHeight: 1 }}
          >
            {meta.n}
          </span>
          <span
            className="font-serif"
            style={{ fontSize: 20, color: "var(--teal-deep)", letterSpacing: "0.03em" }}
          >
            {meta.name}
          </span>
          <span
            className="font-display"
            style={{
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--brand-taupe)",
              border: "1px solid var(--line)",
              borderRadius: "var(--radius-pill)",
              padding: "4px 10px",
            }}
          >
            {meta.tech}
          </span>
          <span style={{ color: "var(--ink-soft)", fontSize: 13, flexBasis: "100%", maxWidth: 760, lineHeight: 1.6 }}>
            {meta.tagline}
          </span>
        </div>
      </div>

      {/* The selected direction — keyed so switching fully remounts (clean WebGL/
          ScrollTrigger teardown of the previous one). */}
      <div key={meta.id} style={{ minHeight: "70vh" }}>
        <Active />
      </div>
    </>
  );
}
