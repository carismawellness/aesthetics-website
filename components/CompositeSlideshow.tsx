"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {dir === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
    </svg>
  );
}

/** Single-image slideshow for pre-composed before/after frames (matches the live Wix gallery). */
export default function CompositeSlideshow({ images, title }: { images: string[]; title?: string }) {
  const [idx, setIdx] = useState(0);
  const n = images.length;
  const go = (d: number) => setIdx((i) => (i + d + n) % n);

  const arrowStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "42px",
    height: "42px",
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
    transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
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

  return (
    <div className="text-center">
      {title && (
        <h3 className="font-display" style={{ fontSize: "clamp(15px,2vw,18px)", color: "var(--label)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "24px" }}>{title}</h3>
      )}
      <Reveal className="relative mx-auto" style={{ maxWidth: "620px" }}>
        <div className="overflow-hidden" style={{ borderRadius: "var(--radius-card)", border: "1px solid var(--line)", boxShadow: "0 16px 38px rgba(0,0,0,0.10)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images[idx]} alt={`${title ?? "Before and after"} ${idx + 1}`} className="w-full" style={{ display: "block", height: "auto" }} />
        </div>
        {n > 1 && (
          <>
            <button type="button" aria-label="Previous" onClick={() => go(-1)} onMouseEnter={onArrowEnter} onMouseLeave={onArrowLeave} style={{ ...arrowStyle, left: "-21px" }}><Chevron dir="left" /></button>
            <button type="button" aria-label="Next" onClick={() => go(1)} onMouseEnter={onArrowEnter} onMouseLeave={onArrowLeave} style={{ ...arrowStyle, right: "-21px" }}><Chevron dir="right" /></button>
          </>
        )}
      </Reveal>
      {n > 1 && (
        <div className="flex justify-center gap-2" style={{ marginTop: "20px" }}>
          {images.map((_, d) => (
            <button
              key={d}
              type="button"
              aria-label={`Go to result ${d + 1}`}
              onClick={() => setIdx(d)}
              style={{ width: "9px", height: "9px", borderRadius: "50%", padding: 0, border: "none", cursor: "pointer", background: d === idx ? "var(--teal)" : "var(--line)", transition: "background 0.2s" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
