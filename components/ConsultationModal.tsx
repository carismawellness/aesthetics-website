"use client";

import { useEffect, useRef, useState } from "react";

/* Dispatch this event to open the consultation popup from anywhere:
     window.dispatchEvent(new Event(CONSULT_MODAL_EVENT)) */
export const CONSULT_MODAL_EVENT = "openConsultationModal";

/* The Carisma Aesthetics GHL (LeadConnector) consultation form. */
const FORM_ID = "SMsdYoPTYToWezZxvGUn";
const FORM_SRC = `https://api.leadconnectorhq.com/widget/form/${FORM_ID}`;

const MODAL_TITLE_ID = "consultation-modal-title";

/*
  Site-wide consultation popup.

  Mounted ONCE in app/layout.tsx. It:
   (a) renders a focus-trapped, accessible dialog embedding the GHL form in an
       iframe (backdrop blur, centred card, header, close button, Esc, focus
       trap, body-scroll lock), and
   (b) installs a document-level capture click listener that intercepts EVERY
       booking CTA site-wide — any href="/consultation" link/button and any
       fresha.com/book-now link — and opens this popup instead of navigating.

  It can also be opened imperatively by dispatching CONSULT_MODAL_EVENT (used by
  BookingButtons and any explicit trigger that isn't a plain <a href>).

  Reskinned teal (no green, no cream/beige) to match the Aesthetics palette.
*/
export default function ConsultationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  /* The element focus returns to when the dialog closes (the trigger). */
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const open = (trigger?: HTMLElement | null) => {
    restoreFocusRef.current =
      trigger ?? (document.activeElement as HTMLElement | null);
    setIsOpen(true);
    setHasOpened(true);
  };

  /* Imperative open via custom event. */
  useEffect(() => {
    const onEvent = () => open();
    window.addEventListener(CONSULT_MODAL_EVENT, onEvent);
    return () => window.removeEventListener(CONSULT_MODAL_EVENT, onEvent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Intercept every consultation / booking CTA site-wide — open the popup
     instead of navigating. Catches fresha.com/book-now links AND any
     href="/consultation" (Next.js Link or plain <a>). Capture phase so it runs
     before Next.js client navigation. */
  useEffect(() => {
    const onBookingClick = (e: MouseEvent) => {
      /* Respect new-tab / modifier intents only for non-booking nav; we always
         intercept booking links regardless so the popup is the single path. */
      const anchor = (e.target as Element | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      const isBookingLink =
        href.includes("fresha.com/book-now") ||
        href === "/consultation" ||
        href.startsWith("/consultation?") ||
        href.startsWith("/consultation#");
      if (isBookingLink) {
        e.preventDefault();
        e.stopPropagation();
        open(anchor as HTMLElement);
      }
    };
    document.addEventListener("click", onBookingClick, true);
    return () => document.removeEventListener("click", onBookingClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Lock body scroll while open. */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* Close on Escape. */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  /* Focus management (WCAG 2.4.3): move focus into the dialog on open,
     restore to the trigger on close. */
  useEffect(() => {
    if (isOpen) {
      const id = window.requestAnimationFrame(() => {
        closeBtnRef.current?.focus();
      });
      return () => window.cancelAnimationFrame(id);
    }
    restoreFocusRef.current?.focus?.();
  }, [isOpen]);

  /* Focus trap: keep Tab / Shift+Tab inside the dialog. */
  const onTrapKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusables = panelRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  /* Keep the iframe mounted (hasOpened) so it doesn't cold-reload on reopen. */
  if (!isOpen && !hasOpened) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={MODAL_TITLE_ID}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4"
      style={{ display: isOpen ? "flex" : "none" }}
      onKeyDown={onTrapKeyDown}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(12, 11, 11, 0.65)",
          backdropFilter: "blur(4px)",
        }}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Panel — flex column, fits viewport with no outer-page scroll */}
      <div
        ref={panelRef}
        className="relative z-10 w-full flex flex-col overflow-hidden"
        style={{
          maxWidth: "560px",
          borderRadius: "16px",
          boxShadow: "0 32px 80px rgba(0,0,0,0.28)",
          background: "var(--white)",
          height: "calc(100dvh - 32px)",
          maxHeight: "780px",
        }}
      >
        {/* Header bar — teal gradient */}
        <div
          className="flex items-center justify-between shrink-0"
          style={{
            padding: "16px 22px",
            background: "linear-gradient(135deg,#4f7373,#3f6363)",
          }}
        >
          <p
            id={MODAL_TITLE_ID}
            className="font-display"
            style={{
              color: "var(--white)",
              fontSize: "12px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Book Your Free Consultation
          </p>
          <button
            ref={closeBtnRef}
            onClick={() => setIsOpen(false)}
            aria-label="Close consultation form"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
            style={{
              width: "40px",
              height: "40px",
              minWidth: "40px",
              minHeight: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              border: "none",
              background: "none",
              color: "var(--white)",
              cursor: "pointer",
              opacity: 0.9,
              flexShrink: 0,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* GHL consultation form — stretches to fill remaining height */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
          {hasOpened && (
            <iframe
              src={FORM_SRC}
              id={`modal-consult-${FORM_ID}`}
              title="Book Your Free Consultation"
              aria-label="Book Your Free Consultation — powered by GHL"
              style={{
                flex: 1,
                width: "100%",
                border: "none",
                display: "block",
                minHeight: 0,
              }}
              data-layout="{'id':'INLINE'}"
              data-form-id={FORM_ID}
            />
          )}
        </div>
      </div>
    </div>
  );
}
