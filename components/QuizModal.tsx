'use client';

import { useEffect, useRef, useState } from 'react';
import AestheticsQuiz from './quiz/AestheticsQuiz';

/* Dispatch this event to open the quiz popup from anywhere:
     window.dispatchEvent(new Event(QUIZ_MODAL_EVENT)) */
export const QUIZ_MODAL_EVENT = 'openQuizModal';

/**
 * Site-wide quiz popup. Mounted once in app/layout.tsx.
 *
 * Opens via:
 *  - dispatching QUIZ_MODAL_EVENT, OR
 *  - a click on any href="/quiz" element (intercepted in capture phase).
 *
 * Mirrors ConsultationModal: dialog semantics, ESC + backdrop close,
 * focus-trap, body-scroll lock, focus restored to trigger on close.
 */
export default function QuizModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const open = (trigger?: HTMLElement | null) => {
    restoreFocusRef.current = trigger ?? (document.activeElement as HTMLElement | null);
    setIsOpen(true);
    setHasOpened(true);
  };

  const close = () => {
    setIsOpen(false);
    restoreFocusRef.current?.focus?.();
  };

  /* Custom event open */
  useEffect(() => {
    const onEvent = () => open();
    window.addEventListener(QUIZ_MODAL_EVENT, onEvent);
    return () => window.removeEventListener(QUIZ_MODAL_EVENT, onEvent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Intercept href="/quiz" clicks */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement)?.closest?.('a') as HTMLAnchorElement | null;
      if (!a) return;
      try {
        const url = new URL(a.href, window.location.href);
        if (url.pathname === '/quiz') {
          e.preventDefault();
          e.stopPropagation();
          open(a as HTMLElement);
        }
      } catch { /* ignore */ }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ESC */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Body-scroll lock */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* Focus into dialog on open */
  useEffect(() => {
    if (isOpen) {
      const id = window.requestAnimationFrame(() => closeBtnRef.current?.focus());
      return () => window.cancelAnimationFrame(id);
    }
  }, [isOpen]);

  /* Tab trap */
  const onTrapKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !panelRef.current) return;
    const focusables = panelRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;
    const first = focusables[0];
    const last  = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first)  { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  if (!isOpen && !hasOpened) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Find your personalised aesthetic treatment, quiz"
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ display: isOpen ? 'flex' : 'none' }}
      onKeyDown={onTrapKeyDown}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
        onClick={close}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative z-10 w-full"
        style={{ maxWidth: '600px', borderRadius: '22px', boxShadow: '0 32px 80px rgba(0,0,0,0.26)', background: '#fff', overflow: 'hidden' }}
      >
        {/* Brand eyebrow + close */}
        <div
          className="flex items-center justify-between"
          style={{ padding: '16px 22px 0' }}
        >
          <p
            style={{
              color: '#4F7373',
              fontFamily: '"Novecento Wide", sans-serif',
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            Carisma Aesthetics · Your Plan
          </p>
          <button
            ref={closeBtnRef}
            onClick={close}
            aria-label="Close quiz"
            style={{
              background: '#DEEBEB',
              border: 'none',
              color: '#4F7373',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '999px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {hasOpened && <AestheticsQuiz onClose={close} />}
      </div>
    </div>
  );
}
