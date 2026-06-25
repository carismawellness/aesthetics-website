"use client";

import { useEffect, useRef, useState } from "react";

/* Dispatch this event to open the quiz popup from anywhere:
     window.dispatchEvent(new Event(QUIZ_MODAL_EVENT)) */
export const QUIZ_MODAL_EVENT = "openQuizModal";

const QUIZ_SRC = "https://smart-questionnaire-eight.vercel.app";

const MODAL_TITLE_ID = "quiz-modal-title";

/*
  Site-wide quiz popup.

  Mounted ONCE in app/layout.tsx. It:
   (a) renders a focus-trapped, accessible dialog embedding the quiz in an
       iframe (backdrop blur, centred card, header, close button, Esc, focus
       trap, body-scroll lock), and
   (b) installs a document-level capture click listener that intercepts EVERY
       href="/quiz" link/button and opens this popup instead of navigating.

  Can also be opened imperatively by dispatching QUIZ_MODAL_EVENT.
*/
export default function QuizModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const open = (trigger?: HTMLElement | null) => {
    restoreFocusRef.current =
      trigger ?? (document.activeElement as HTMLElement | null);
    setIsOpen(true);
    setHasOpened(true);
  };

  const close = () => {
    setIsOpen(false);
    restoreFocusRef.current?.focus();
  };

  /* Imperative open via custom event. */
  useEffect(() => {
    const onEvent = () => open();
    window.addEventListener(QUIZ_MODAL_EVENT, onEvent);
    return () => window.removeEventListener(QUIZ_MODAL_EVENT, onEvent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Intercept every href="/quiz" click site-wide. */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;
      try {
        const url = new URL(anchor.href, window.location.href);
        if (url.pathname === "/quiz") {
          e.preventDefault();
          open(anchor as HTMLElement);
        }
      } catch {
        /* invalid href — ignore */
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Esc to close. */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  /* Body-scroll lock. */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* Focus trap. */
  useEffect(() => {
    if (!isOpen) return;
    closeBtnRef.current?.focus();
    const panel = panelRef.current;
    if (!panel) return;
    const focusable = panel.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    panel.addEventListener("keydown", trap);
    return () => panel.removeEventListener("keydown", trap);
  }, [isOpen]);

  if (!isOpen && !hasOpened) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={MODAL_TITLE_ID}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: isOpen ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        backgroundColor: "rgba(0,0,0,0.45)",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div
        ref={panelRef}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "780px",
          height: "min(90vh, 720px)",
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
          overflow: "hidden",
          backgroundColor: "#fff",
          boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: "1px solid #e8ecec",
            flexShrink: 0,
          }}
        >
          <span
            id={MODAL_TITLE_ID}
            className="font-display"
            style={{ fontSize: "13px", letterSpacing: "0.14em", color: "#4F7373", textTransform: "uppercase" }}
          >
            Find Your Treatment
          </span>
          <button
            ref={closeBtnRef}
            onClick={close}
            aria-label="Close quiz"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "1px solid #d5e0e0",
              background: "transparent",
              cursor: "pointer",
              color: "#4F7373",
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Quiz iframe */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
          {hasOpened && (
            <iframe
              src={QUIZ_SRC}
              title="Find Your Aesthetic Treatment"
              aria-label="Personalised treatment quiz"
              style={{
                flex: 1,
                width: "100%",
                border: "none",
                display: "block",
                minHeight: 0,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
