"use client";

import { CONSULT_MODAL_EVENT } from "@/components/ConsultationModal";

/*
  Two-button booking pattern used across all pages:
  - When freshaHref is provided: primary (filled gradient) links to Fresha,
    secondary (outlined) opens the consultation form popup.
  - When no freshaHref: single filled button opens the consultation form popup.

  Both buttons now open the single site-wide consultation popup
  (mounted once in app/layout.tsx). The consult button dispatches
  CONSULT_MODAL_EVENT directly; the Fresha <a> is caught by the popup's
  document-level booking-link interceptor.

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
  const primaryClass = theme === "gold" ? "btn btn-gold" : "btn btn-teal";
  const outlineClass = theme === "gold" ? "btn btn-outline-gold" : "btn btn-outline-teal";
  const commonStyle = { fontSize: "12px", letterSpacing: "0.14em" } as const;

  const openPopup = () => {
    window.dispatchEvent(new Event(CONSULT_MODAL_EVENT));
  };

  return (
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
          {/* Primary Fresha link — intercepted globally and opens the popup. */}
          <a
            href={freshaHref}
            target="_blank"
            rel="noopener noreferrer"
            className={primaryClass}
            style={commonStyle}
          >
            {primaryLabel}
          </a>
          <button onClick={openPopup} className={outlineClass} style={commonStyle}>
            {consultLabel}
          </button>
        </>
      ) : (
        <button onClick={openPopup} className={primaryClass} style={commonStyle}>
          {consultLabel}
        </button>
      )}
    </div>
  );
}
