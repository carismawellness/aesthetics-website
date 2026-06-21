"use client";

import { useState } from "react";
import ConsultationModal from "@/components/ConsultationModal";

/*
  Two-button booking pattern used across all pages:
  - When freshaHref is provided: primary (filled gradient) links to Fresha,
    secondary (outlined) opens the consultation form modal.
  - When no freshaHref: single filled button opens the consultation form modal.

  theme="teal" (default) — for the main aesthetics pages.
  theme="gold"           — for the laser hair removal page (gold design system).
*/
export default function BookingButtons({
  freshaHref,
  primaryLabel = "Book Appointment",
  consultLabel = "Book Free Consultation",
  align = "center",
  theme = "teal",
}: {
  freshaHref?: string;
  primaryLabel?: string;
  consultLabel?: string;
  align?: "center" | "left";
  theme?: "teal" | "gold";
}) {
  const [open, setOpen] = useState(false);

  const primaryClass = theme === "gold" ? "btn btn-gold" : "btn btn-teal";
  const outlineClass = theme === "gold" ? "btn btn-outline-gold" : "btn btn-outline-teal";
  const commonStyle = { fontSize: "12px", letterSpacing: "0.14em" } as const;

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          alignItems: "center",
          justifyContent: align === "center" ? "center" : "flex-start",
        }}
      >
        {freshaHref ? (
          <>
            <a
              href={freshaHref}
              target="_blank"
              rel="noopener noreferrer"
              className={primaryClass}
              style={commonStyle}
            >
              {primaryLabel}
            </a>
            <button
              onClick={() => setOpen(true)}
              className={outlineClass}
              style={commonStyle}
            >
              {consultLabel}
            </button>
          </>
        ) : (
          <button
            onClick={() => setOpen(true)}
            className={primaryClass}
            style={commonStyle}
          >
            {consultLabel}
          </button>
        )}
      </div>

      <ConsultationModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
