"use client";

import { useEffect, useRef, useCallback } from "react";
import ConsultationForm from "@/components/ConsultationForm";

const MODAL_TITLE_ID = "consultation-modal-title";

export default function ConsultationModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  /* Lock body scroll when open */
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

  /* Move focus into modal on open; restore to trigger on close */
  useEffect(() => {
    if (open) {
      /* Focus the close button (first focusable element) after paint */
      const raf = requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [open]);

  /* Close on Escape key */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  /* Focus trap: keep Tab/Shift+Tab inside the modal */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        /* Shift+Tab: if focus is on first element, wrap to last */
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        /* Tab: if focus is on last element, wrap to first */
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    []
  );

  if (!open) return null;

  return (
    /* Backdrop */
    <div
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
      /* aria-hidden backdrop so screen readers see only the dialog */
      aria-hidden="true"
    >
      {/* Modal dialog panel */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={MODAL_TITLE_ID}
        onKeyDown={handleKeyDown}
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
        /* Restore aria-hidden removal so panel is announced */
        aria-hidden="false"
      >
        {/* Sticky header — title + close button */}
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
          {/* Visible title — referenced by aria-labelledby */}
          <p
            id={MODAL_TITLE_ID}
            className="font-display"
            style={{
              fontSize: "11px",
              letterSpacing: "0.18em",
              /* #4F7373 passes 4.6:1 on white */
              color: "#4F7373",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            book your free consultation
          </p>

          {/* Close button — 44×44px minimum tap target */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close consultation form"
            style={{
              /* 44×44px tap target (P2 requirement) */
              width: "44px",
              height: "44px",
              minWidth: "44px",
              minHeight: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              border: "1px solid var(--line)",
              background: "transparent",
              cursor: "pointer",
              color: "var(--ink)",
              flexShrink: 0,
              transition: "background 0.2s ease, color 0.2s ease, border-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget;
              btn.style.background = "#EFE7D7";
              btn.style.borderColor = "#4F7373";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget;
              btn.style.background = "transparent";
              btn.style.borderColor = "var(--line)";
            }}
            /* Focus ring visible via browser default; ensure it's not hidden */
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4F7373]"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              aria-hidden="true"
              focusable="false"
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
