import React from "react";

/**
 * Brand motif (flowing-line stroke field) rendered via CSS mask, so it can be
 * painted any brand colour at any opacity.
 *  - `watermark`: faint, repeating ambient texture behind a section (2–6% opacity).
 *  - `accent`: a single non-repeating stroke flourish (divider / corner / behind heading).
 */
export default function Motif({
  mode = "watermark",
  color = "var(--teal)",
  opacity,
  className = "",
  style,
}: {
  mode?: "watermark" | "accent";
  color?: string;
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const cls = ["motif", mode === "watermark" ? "motif--watermark" : "motif--accent", className]
    .filter(Boolean)
    .join(" ");
  return (
    <div
      aria-hidden="true"
      className={cls}
      style={{ backgroundColor: color, ...(opacity != null ? { opacity } : null), ...style }}
    />
  );
}
