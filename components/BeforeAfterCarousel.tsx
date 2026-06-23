"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";

type Pair = { before: string; after: string; label?: string };

// Responsive cards-per-view — mirrors the slimming ResultsCarousel peek logic
// (mobile 1 · tablet 2 · desktop 3), but as a windowed *page* count rather than
// a free-scroll peek, so arrows page through fixed groups and disable at the ends.
const BREAKPOINTS = [
  { min: 1024, perView: 3 }, // desktop: 3 pairs
  { min: 640, perView: 2 }, //  tablet: 2 pairs
  { min: 0, perView: 1 }, //   mobile: 1 pair
] as const;

function perViewForWidth(w: number): number {
  for (const b of BREAKPOINTS) if (w >= b.min) return b.perView;
  return 1;
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {dir === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
    </svg>
  );
}

// One card = a single before|after pair shown side-by-side, with corner labels
// and an optional caption beneath. Several of these sit in a row at once.
function PairCard({
  pair,
  title,
  index,
  total,
  priority,
}: {
  pair: Pair;
  title?: string;
  index: number;
  total: number;
  priority: boolean;
}) {
  const treatmentLabel = pair.label ?? title ?? "treatment";
  const getAlt = (lbl: "BEFORE" | "AFTER") =>
    `${treatmentLabel} — ${lbl.charAt(0) + lbl.slice(1).toLowerCase()} photo (result ${index + 1} of ${total})`;

  return (
    <figure
      style={{ margin: 0 }}
      // Group the before+after as one labelled item for assistive tech.
      role="group"
      aria-label={`${treatmentLabel} — before and after (result ${index + 1} of ${total})`}
    >
      <div className="grid grid-cols-2 gap-3">
        {(["BEFORE", "AFTER"] as const).map((lbl) => {
          const src = lbl === "BEFORE" ? pair.before : pair.after;
          return (
            <div
              key={lbl}
              className="relative overflow-hidden"
              style={{
                borderRadius: "var(--radius-card)",
                // Fixed aspect ratio prevents CLS as pages change.
                aspectRatio: "4 / 5",
                background: "var(--cream)",
                boxShadow: "0 10px 28px rgba(28,30,30,0.12)",
              }}
            >
              {src ? (
                <Image
                  src={src}
                  alt={getAlt(lbl)}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 23vw, 190px"
                  priority={priority && lbl === "BEFORE"}
                  quality={80}
                />
              ) : (
                <div
                  className="flex items-center justify-center text-center"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "var(--cream)",
                    color: "var(--muted)",
                    fontSize: "12px",
                    padding: "16px",
                  }}
                >
                  {`${pair.label ?? ""} ${lbl}`.trim()} photo — drop file in
                </div>
              )}
              <span
                className="font-display"
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  background: "rgba(255,255,255,0.9)",
                  color: "var(--ink)",
                  fontSize: "9px",
                  letterSpacing: "0.12em",
                  padding: "4px 9px",
                  borderRadius: "var(--radius-pill)",
                }}
                aria-hidden="true"
              >
                {lbl}
              </span>
            </div>
          );
        })}
      </div>
      {pair.label && (
        <figcaption
          style={{
            marginTop: "14px",
            fontSize: "12.5px",
            color: "var(--label)",
            letterSpacing: "0.04em",
            textAlign: "center",
          }}
        >
          {pair.label}
        </figcaption>
      )}
    </figure>
  );
}

export default function BeforeAfterCarousel({ pairs, title }: { pairs: Pair[]; title?: string }) {
  const n = pairs.length;

  // Responsive cards-per-view, recomputed on resize (SSR-safe default = 3).
  const [perView, setPerView] = useState(3);
  useEffect(() => {
    const update = () => setPerView(perViewForWidth(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const effPerView = Math.min(perView, Math.max(n, 1));
  const pageCount = Math.max(1, Math.ceil(n / effPerView));

  // page = which window of cards is visible. Clamp if perView grows on resize.
  const [page, setPage] = useState(0);
  useEffect(() => {
    setPage((p) => Math.min(p, pageCount - 1));
  }, [pageCount]);

  const hasArrows = pageCount > 1;
  const atStart = page === 0;
  const atEnd = page >= pageCount - 1;

  // Windowed (non-circular): prev/next disable at the ends, mirroring the
  // constraint's "prev/next disabled at ends" requirement.
  const go = useCallback(
    (d: number) => setPage((p) => Math.min(Math.max(p + d, 0), pageCount - 1)),
    [pageCount],
  );

  // Prefetch the next page's images so paging feels instant.
  useEffect(() => {
    if (!hasArrows) return;
    const start = (page + 1) * effPerView;
    pairs.slice(start, start + effPerView).forEach((p) => {
      [p?.before, p?.after].forEach((src) => {
        if (src) {
          const img = new window.Image();
          img.src = src;
        }
      });
    });
  }, [page, effPerView, pairs, hasArrows]);

  // Keyboard left/right arrow navigation (only when there's more than one page).
  useEffect(() => {
    if (!hasArrows) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go, hasArrows]);

  // Track transform: each page is one full track-width to the left.
  const trackStyle: React.CSSProperties = useMemo(
    () => ({
      display: "flex",
      transform: `translateX(-${page * 100}%)`,
      transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      willChange: "transform",
    }),
    [page],
  );

  const arrowBtn = (dir: "left" | "right", disabled: boolean) => {
    const onClick = () => go(dir === "left" ? -1 : 1);
    const labelPos = dir === "left" ? Math.max(page, 1) : Math.min(page + 2, pageCount);
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={`${dir === "left" ? "Previous" : "Next"} before and after photos (page ${labelPos} of ${pageCount})`}
        className="ba-arrow"
        style={{
          width: "44px", // 44x44 minimum tap target
          height: "44px",
          borderRadius: "50%",
          background: "var(--white)",
          border: "1px solid var(--line)",
          boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
          color: "var(--teal-deep)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: disabled ? "default" : "pointer",
          opacity: disabled ? 0.4 : 1,
          transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, opacity 0.2s ease",
        }}
      >
        <Chevron dir={dir} />
      </button>
    );
  };

  return (
    <div
      className="container text-center"
      role="region"
      aria-roledescription="carousel"
      aria-label="Before and after photos"
    >
      {/* Hover lift on arrows; never disables the indicator; reduced-motion safe. */}
      <style>{`
        .ba-arrow:not(:disabled):hover {
          transform: scale(1.06);
          box-shadow: 0 10px 26px rgba(0,0,0,0.18);
          border-color: var(--label);
        }
        .ba-arrow:not(:disabled):active { transform: scale(0.98); }
        @media (prefers-reduced-motion: reduce) {
          .ba-track { transition: none !important; }
          .ba-arrow, .ba-arrow:hover, .ba-arrow:active { transition: none; transform: none; }
        }
      `}</style>

      {title && (
        <h2
          className="font-display"
          style={{ fontSize: "clamp(20px,3vw,30px)", color: "var(--label)", marginBottom: "36px" }}
        >
          {title}
        </h2>
      )}

      <div className="mx-auto" style={{ maxWidth: "1100px" }}>
        <div
          className="flex items-center"
          style={{ gap: "16px" }}
        >
          {/* Left arrow beside the row (hidden entirely when only one page). */}
          {hasArrows && <div style={{ flex: "0 0 auto" }}>{arrowBtn("left", atStart)}</div>}

          {/* The window: only `effPerView` cards are visible; the rest are clipped. */}
          <div className="relative overflow-hidden" style={{ flex: "1 1 auto" }}>
            <Reveal>
              <div
                className="ba-track"
                style={trackStyle}
                aria-live="polite"
                role="status"
                aria-atomic="true"
              >
                {Array.from({ length: pageCount }).map((_, pg) => (
                  // Each "page" is one full-width slide holding up to effPerView cards.
                  <div
                    key={pg}
                    style={{
                      flex: "0 0 100%",
                      display: "grid",
                      gridTemplateColumns: `repeat(${effPerView}, minmax(0, 1fr))`,
                      gap: "20px",
                      paddingInline: "2px",
                    }}
                  >
                    {pairs.slice(pg * effPerView, pg * effPerView + effPerView).map((p, i) => {
                      const absoluteIndex = pg * effPerView + i;
                      return (
                        <PairCard
                          key={absoluteIndex}
                          pair={p}
                          title={title}
                          index={absoluteIndex}
                          total={n}
                          priority={pg === 0}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right arrow beside the row. */}
          {hasArrows && <div style={{ flex: "0 0 auto" }}>{arrowBtn("right", atEnd)}</div>}
        </div>

        {/* Page indicators (one dot per window), centered below. */}
        {hasArrows && (
          <div
            className="flex justify-center gap-2"
            style={{ marginTop: "24px" }}
            role="tablist"
            aria-label="Before and after photo navigation"
          >
            {Array.from({ length: pageCount }).map((_, pg) => (
              <button
                key={pg}
                type="button"
                role="tab"
                aria-label={`Page ${pg + 1} of ${pageCount}`}
                aria-selected={pg === page}
                onClick={() => setPage(pg)}
                style={{
                  // Padding reaches a 44px clickable area around the 9px dot.
                  padding: "18px 6px",
                  margin: "-18px 0",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    display: "block",
                    width: "9px",
                    height: "9px",
                    borderRadius: "50%",
                    background: pg === page ? "var(--teal-deep)" : "var(--line)",
                    transition: "background 0.2s ease",
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
