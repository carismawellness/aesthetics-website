import React from "react";

type BlobPos = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";

const POS: Record<BlobPos, React.CSSProperties> = {
  "top-left": { top: "-8%", left: "-6%" },
  "top-right": { top: "-10%", right: "-6%" },
  "bottom-left": { bottom: "-10%", left: "-4%" },
  "bottom-right": { bottom: "-8%", right: "-6%" },
  center: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
};

/**
 * Ambient background layer for a section that ALREADY has a gradient.
 * Adds one localized, blurred, slowly-pulsing brand blob + an optional faint
 * dot field. Render as the first child of a `position: relative` section
 * (or pass `host` to wrap). Keeps the section's own gradient intact.
 */
export default function AmbientField({
  blob = "top-right",
  tone = "teal",
  soft = false,
  dots = true,
  className = "",
}: {
  blob?: BlobPos | false;
  tone?: "teal" | "gold";
  soft?: boolean;
  dots?: boolean;
  className?: string;
}) {
  const blobCls = [
    "ambient-blob",
    tone === "gold" ? "ambient-blob--gold" : "",
    soft ? "ambient-blob--soft" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={`ambient-layer ${className}`} aria-hidden="true">
      {dots && <div className="ambient-dots" />}
      {blob && <div className={blobCls} style={POS[blob]} />}
    </div>
  );
}
