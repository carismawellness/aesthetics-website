"use client";

import { useEffect, useRef, useState } from "react";
import JoinForm from "@/components/membership/JoinForm";

/* Dispatch this event to open the Glow Club join popup from anywhere:
     window.dispatchEvent(new Event(GLOW_MODAL_EVENT)) */
export const GLOW_MODAL_EVENT = "openGlowClubModal";

const MODAL_TITLE_ID = "glowclub-modal-title";

/*
  Site-wide Glow Club join popup.

  Mounted ONCE in app/layout.tsx. Mirrors ConsultationModal:
   (a) renders a focus-trapped, accessible dialog embedding the Glow Club
       lead-capture <JoinForm/> (backdrop blur, centred card, header, close
       button, Esc, focus trap, body-scroll lock), and
   (b) installs a document-level capture click listener that intercepts EVERY
       "Join the Glow Club" CTA site-wide — any href="/membership/join" link/
       button — and opens this popup instead of navigating to the page.

  The /membership/join route still exists as a no-JS / direct-link fallback.
  Can also be opened imperatively via GLOW_MODAL_EVENT.
  JoinForm sends the lead to info@carismaaesthetics.com (CONTACT.email).
*/
export default function GlowClubModal() {
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

  /* Imperative open via custom event. */
  useEffect(() => {
    const onEvent = () => open();
    window.addEventListener(GLOW_MODAL_EVENT, onEvent);
    return () => window.removeEventListener(GLOW_MODAL_EVENT, onEvent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Intercept every "Join the Glow Club" CTA site-wide — open the popup
     instead of navigating to /membership/join. Capture phase so it runs before
     Next.js client navigation. target="_blank" / data-direct-booking opt out. */
  useEffect(() => {
    const onJoinClick = (e: MouseEvent) => {
      const anchor = (e.target as Element | null)?.closest?.("a");
      if (!anchor) return;
      if (
        (anchor as HTMLAnchorElement).target === "_blank" ||
        anchor.hasAttribute("data-direct-booking")
      )
        return;
      const href = anchor.getAttribute("href") || "";
      const isJoinLink =
        href === "/membership/join" ||
        href.startsWith("/membership/join?") ||
        href.startsWith("/membership/join#");
      if (isJoinLink) {
        e.preventDefault();
        e.stopPropagation();
        open(anchor as HTMLElement);
      }
    };
    document.addEventListener("click", onJoinClick, true);
    return () => document.removeEventListener("click", onJoinClick, true);
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

  /* Focus management: into the dialog on open, back to the trigger on close. */
  useEffect(() => {
    if (isOpen) {
      const id = window.requestAnimationFrame(() => {
        closeBtnRef.current?.focus();
      });
      return () => window.cancelAnimationFrame(id);
    }
    restoreFocusRef.current?.focus?.();
  }, [isOpen]);

  /* Focus trap. */
  const onTrapKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusables = panelRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
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

  /* Keep mounted after first open so the form preserves entered data on reopen. */
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

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative z-10 w-full flex flex-col overflow-hidden"
        style={{
          maxWidth: "560px",
          borderRadius: "16px",
          boxShadow: "0 32px 80px rgba(0,0,0,0.28)",
          background: "var(--white)",
          maxHeight: "calc(100dvh - 32px)",
        }}
      >
        {/* Header bar — teal gradient (matches ConsultationModal) */}
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
            Join the Glow Club
          </p>
          <button
            ref={closeBtnRef}
            onClick={() => setIsOpen(false)}
            aria-label="Close Glow Club form"
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

        {/* Scrollable body — the Glow Club lead-capture form */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            padding: "26px clamp(18px,4vw,32px) 30px",
          }}
        >
          {hasOpened && <JoinForm />}
        </div>
      </div>
    </div>
  );
}
