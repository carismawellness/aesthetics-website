"use client";

import { useEffect } from "react";
import ConsultationForm from "@/components/ConsultationForm";

export default function ConsultationModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book your free consultation"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(12, 11, 11, 0.65)",
        padding: "16px",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "relative",
          background: "var(--white)",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "580px",
          maxHeight: "92vh",
          overflowY: "auto",
          boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky header with title + close button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 22px 14px",
            borderBottom: "1px solid var(--line)",
            position: "sticky",
            top: 0,
            background: "var(--white)",
            zIndex: 1,
            borderRadius: "16px 16px 0 0",
          }}
        >
          <p
            className="font-display"
            style={{
              fontSize: "11px",
              letterSpacing: "0.18em",
              color: "var(--teal-deep)",
              margin: 0,
            }}
          >
            book your free consultation
          </p>
          <button
            onClick={onClose}
            aria-label="Close consultation form"
            style={{
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              border: "1px solid var(--line)",
              background: "transparent",
              cursor: "pointer",
              color: "var(--ink)",
              flexShrink: 0,
              transition: "background 0.2s ease, color 0.2s ease",
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* GHL consultation form */}
        <div style={{ padding: "4px 0 0" }}>
          <ConsultationForm instanceId="modal" />
        </div>
      </div>
    </div>
  );
}
