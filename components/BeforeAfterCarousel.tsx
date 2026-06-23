"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";

type Pair = { before: string; after: string; label?: string };

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

export default function BeforeAfterCarousel({ pairs, title }: { pairs: Pair[]; title?: string }) {
  const [idx, setIdx] = useState(0);
  const n = pairs.length;
  const ba = pairs[idx];

  // P2 — keyboard navigation for carousel
  const go = useCallback((d: number) => setIdx((i) => (i + d + n) % n), [n]);

  // Prefetch adjacent slides into the browser cache before the user clicks
  useEffect(() => {
    if (n < 2) return;
    const adjacent = [pairs[(idx + 1) % n], pairs[(idx - 1 + n) % n]];
    adjacent.forEach((p) => {
      [p?.before, p?.after].forEach((src) => {
        if (src) {
          const img = new window.Image();
          img.src = src;
        }
      });
    });
  }, [idx, pairs, n]);

  // P9 — keyboard left/right arrow navigation
  useEffect(() => {
    if (n < 2) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go, n]);

  const arrowBase: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    // P2 — minimum 44×44px tap target
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "var(--white)",
    border: "1px solid var(--line)",
    boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
    color: "var(--teal)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    cursor: "pointer",
    // P2 — consistent transition on all hover states
    transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
  };

  const onArrowEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = "translateY(-50%) scale(1.04)";
    e.currentTarget.style.boxShadow = "0 10px 26px rgba(0,0,0,0.18)";
    e.currentTarget.style.borderColor = "var(--label)";
  };
  const onArrowLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = "translateY(-50%)";
    e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.12)";
    e.currentTarget.style.borderColor = "var(--line)";
  };

  // P1 (treatment-page-specific) — meaningful alt for medical/aesthetics before/after images
  const getAlt = (lbl: "BEFORE" | "AFTER") => {
    const treatmentLabel = ba.label ?? title ?? "treatment";
    return `${treatmentLabel} — ${lbl.charAt(0) + lbl.slice(1).toLowerCase()} photo${idx > 0 ? ` (result ${idx + 1} of ${n})` : ""}`;
  };

  return (
    // P1 (treatment-page-specific) — carousel landmark with role and label
    <div
      className="container text-center"
      role="region"
      aria-label="Before and after photos"
      aria-roledescription="carousel"
    >
      {title && (
        <h2
          id="carousel-heading"
          className="font-display"
          style={{ fontSize: "clamp(20px,3vw,30px)", color: "var(--label)", marginBottom: "36px" }}
        >
          {title}
        </h2>
      )}

      {/* P5 — prevent horizontal overflow at narrow widths */}
      <div className="relative mx-auto overflow-hidden md:overflow-visible" style={{ maxWidth: "760px" }}>
        <Reveal>
          {/* P3 — image containers have fixed aspect-ratio to prevent CLS */}
          <div className="grid grid-cols-2 gap-4" aria-live="polite" role="status" aria-atomic="true">
            {(["BEFORE", "AFTER"] as const).map((lbl) => {
              const src = lbl === "BEFORE" ? ba.before : ba.after;
              return (
                <div
                  key={lbl}
                  className="relative overflow-hidden"
                  style={{
                    borderRadius: "var(--radius-card)",
                    border: "none",
                    background: "transparent",
                    // P3 — fixed aspect ratio to prevent CLS
                    aspectRatio: "4 / 5",
                  }}
                >
                  {src ? (
                    <Image
                      src={src}
                      // P1 (treatment-page-specific) — descriptive alt text for medical aesthetics content
                      alt={getAlt(lbl)}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 640px) 45vw, 370px"
                      // P3 — priority on first slide, lazy for rest
                      priority={idx === 0 && lbl === "BEFORE"}
                      quality={80}
                    />
                  ) : (
                    <div
                      className="flex items-center justify-center text-center"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "var(--cream)",
                        color: "#5f5f5f",
                        fontSize: "12px",
                        padding: "16px",
                      }}
                    >
                      {`${ba.label ?? ""} ${lbl}`.trim()} photo — drop file in
                    </div>
                  )}
                  <span
                    className="font-display"
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      background: "rgba(255,255,255,0.9)",
                      color: "var(--ink)",
                      fontSize: "10px",
                      letterSpacing: "0.12em",
                      padding: "5px 10px",
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
        </Reveal>

        {/* P1 (treatment-page-specific) — descriptive aria-labels on nav buttons */}
        {n > 1 && (
          <>
            <button
              type="button"
              aria-label={`Previous before and after photo (${idx === 0 ? n : idx} of ${n})`}
              onClick={() => go(-1)}
              onMouseEnter={onArrowEnter}
              onMouseLeave={onArrowLeave}
              className="md:-left-[22px]"
              style={{ ...arrowBase, left: "6px" }}
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              aria-label={`Next before and after photo (${(idx + 2 > n ? 1 : idx + 2)} of ${n})`}
              onClick={() => go(1)}
              onMouseEnter={onArrowEnter}
              onMouseLeave={onArrowLeave}
              className="md:-right-[22px]"
              style={{ ...arrowBase, right: "6px" }}
            >
              <Chevron dir="right" />
            </button>
          </>
        )}
      </div>

      {ba.label && (
        <p style={{ marginTop: "16px", fontSize: "13px", color: "var(--label)", letterSpacing: "0.04em" }}>
          {ba.label}
        </p>
      )}

      {/* P1 (treatment-page-specific) — slide indicators with aria-label="Photo n of total" */}
      {n > 1 && (
        <div
          className="flex justify-center gap-2"
          style={{ marginTop: "20px" }}
          role="tablist"
          aria-label="Before and after photo navigation"
        >
          {pairs.map((_, d) => (
            <button
              key={d}
              type="button"
              role="tab"
              // P1 (treatment-page-specific) — descriptive slide indicator labels
              aria-label={`Photo ${d + 1} of ${n}`}
              aria-selected={d === idx}
              onClick={() => setIdx(d)}
              style={{
                // P2 — minimum tap target: use padding to reach 44px clickable area
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
                  background: d === idx ? "var(--teal)" : "var(--line)",
                  // P2 — transition on interactive element
                  transition: "background 0.2s ease",
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
