"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

type Pair = { before: string; after: string; label?: string };

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {dir === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
    </svg>
  );
}

export default function BeforeAfterCarousel({ pairs, title }: { pairs: Pair[]; title?: string }) {
  const [idx, setIdx] = useState(0);
  const n = pairs.length;
  const ba = pairs[idx];
  const go = (d: number) => setIdx((i) => (i + d + n) % n);

  const arrowBase: React.CSSProperties = {
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
  };

  return (
    <div className="container text-center">
      {title && <h2 className="font-display" style={{ fontSize: "clamp(20px,3vw,30px)", color: "var(--label)", marginBottom: "36px" }}>{title}</h2>}

      {/* Outer wrapper — overflow:hidden clips arrows on mobile; md:overflow-visible restores desktop outset */}
      <div className="relative mx-auto overflow-hidden md:overflow-visible" style={{ maxWidth: "760px" }}>
        <Reveal>
          <div className="grid grid-cols-2 gap-4">
            {([["BEFORE", ba.before], ["AFTER", ba.after]] as const).map(([lbl, src]) => (
              <div key={lbl} className="relative overflow-hidden rounded-xl" style={{ border: "none", background: "transparent" }}>
                {src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={src} alt={`${title ?? ""} ${lbl}`} className="w-full" style={{ display: "block", height: "auto" }} />
                ) : (
                  <div className="flex items-center justify-center text-center" style={{ aspectRatio: "4 / 5", background: "var(--cream)", color: "var(--muted)", fontSize: "12px", padding: "16px" }}>
                    {`${ba.label ?? ""} ${lbl}`.trim()} photo — drop file in
                  </div>
                )}
                <span className="font-display" style={{ position: "absolute", top: "12px", left: "12px", background: "rgba(255,255,255,0.9)", color: "var(--ink)", fontSize: "10px", letterSpacing: "0.12em", padding: "5px 10px", borderRadius: "3px" }}>{lbl}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {n > 1 && (
          <>
            {/* On mobile (overflow:hidden clips -21px), use left:6px/right:6px inside. On md+ restore -21px outset via Tailwind classes */}
            <button type="button" aria-label="Previous" onClick={() => go(-1)} className="md:-left-[21px]" style={{ ...arrowBase, left: "6px" }}><Chevron dir="left" /></button>
            <button type="button" aria-label="Next" onClick={() => go(1)} className="md:-right-[21px]" style={{ ...arrowBase, right: "6px" }}><Chevron dir="right" /></button>
          </>
        )}
      </div>

      {ba.label && <p style={{ marginTop: "16px", fontSize: "13px", color: "var(--label)", letterSpacing: "0.04em" }}>{ba.label}</p>}

      {n > 1 && (
        <div className="flex justify-center gap-2" style={{ marginTop: "20px" }}>
          {pairs.map((_, d) => (
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
