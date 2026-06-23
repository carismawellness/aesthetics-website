'use client';

import { useState } from 'react';

/**
 * TreatmentFaq — searchable FAQ accordion ported 1:1 (proportions/spacing/sizing)
 * from the Carisma Slimming treatment-page FAQ (components/PackagePage.tsx §10):
 *   • a same-row header — large Trajan serif title on the left, a hairline-ruled
 *     "Search questions…" field on the right (256px, bottom-border only);
 *   • full-width accordion rows with generous 26px vertical padding, a numbered
 *     uppercase question in the wide display face, and a chevron that rotates 180°
 *     on expand;
 *   • when open, the answer paragraph followed by a social share row
 *     (Facebook / X / LinkedIn / copy-link).
 * Recolored to Aesthetics tokens (green → teal): the title carries --gold,
 * accents/chevron/search-icon/share-icons --teal-deep / --teal-text, body
 * --ink-soft, hairlines --line, ground white.
 *
 * Emit the matching FAQPage JSON-LD once on the page itself (not here) to avoid a
 * duplicate FAQPage block.
 */

// Fonts mirror the Slimming component's roles:
// SERIF = Trajan (section title) · WIDE = Novecento Wide (question label) · BODY = Roboto.
const SERIF = '"Trajan Pro", Georgia, serif';
const WIDE = '"Novecento Wide", sans-serif';
const BODY = 'Roboto Local, Roboto, sans-serif';

/* Social share row shown under an expanded FAQ answer — ported from the Slimming
   ShareIcons (Facebook / X / LinkedIn / copy-link), recolored to --teal-deep.
   The Slimming version shares its page's `liveUrl`; here we have no URL prop, so
   we resolve the current page URL at interaction time from the browser (SSR-safe). */
function currentUrl() {
  return typeof window !== 'undefined' ? window.location.href : '';
}
function ShareIcons() {
  const ic: React.CSSProperties = { color: 'var(--teal-deep)', display: 'inline-flex', alignItems: 'center' };
  const share = (href: (enc: string) => string) => () => {
    const w = window.open(href(encodeURIComponent(currentUrl())), '_blank', 'noopener,noreferrer');
    if (w) w.opener = null;
  };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 18 }}>
      <button
        type="button"
        aria-label="Share on Facebook (opens in new tab)"
        onClick={share((e) => `https://www.facebook.com/sharer/sharer.php?u=${e}`)}
        style={{ ...ic, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.6c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.3v2.3H7.4v3.2h2.8V21h3.3z" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Share on X / Twitter (opens in new tab)"
        onClick={share((e) => `https://twitter.com/intent/tweet?url=${e}`)}
        style={{ ...ic, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1.6 2H8l4.4 5.9L18.9 2zm-1.1 18.1h1.7L7.1 3.8H5.3l12.5 16.3z" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Share on LinkedIn (opens in new tab)"
        onClick={share((e) => `https://www.linkedin.com/sharing/share-offsite/?url=${e}`)}
        style={{ ...ic, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm6.5 0h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4V9z" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Copy page link to clipboard"
        onClick={() => {
          void navigator.clipboard?.writeText(currentUrl());
        }}
        style={{ ...ic, background: 'none', border: 'none', cursor: 'pointer', padding: '8px', minHeight: 44, minWidth: 44 }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </button>
    </span>
  );
}

export default function TreatmentFaq({
  kicker,
  title = 'Frequently asked questions',
  items,
}: {
  kicker?: string;
  title?: string;
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const visible = items
    .map((f, i) => ({ f, i }))
    .filter(({ f }) => (f.q + ' ' + f.a).toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <section aria-labelledby="faq-heading" style={{ paddingTop: 84, paddingBottom: 84, backgroundColor: '#ffffff' }}>
      <div style={{ maxWidth: 960, marginLeft: 'auto', marginRight: 'auto', paddingLeft: 24, paddingRight: 24 }}>
        {/* Header row: large Trajan title on the left, hairline search on the right (same row). */}
        <div
          className="fr-faqrow"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}
        >
          <div style={{ minWidth: 0 }}>
            {kicker && (
              <p
                className="font-display"
                style={{
                  fontSize: 12,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--teal-text)',
                  fontWeight: 600,
                  margin: '0 0 12px',
                }}
              >
                {kicker}
              </p>
            )}
            <h2
              id="faq-heading"
              style={{
                color: 'var(--gold)',
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: 28,
                lineHeight: 1.4,
                letterSpacing: 'normal',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              {title}
            </h2>
          </div>

          <label htmlFor="faq-search" className="sr-only">
            Search frequently asked questions
          </label>
          <span
            className="fr-faqsearch-wrap"
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              width: 256,
              borderBottom: '1px solid var(--teal-deep)',
            }}
          >
            <input
              id="faq-search"
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(null);
              }}
              placeholder="Search questions…"
              aria-label="Search frequently asked questions"
              className="fr-faqsearch"
              style={{
                width: '100%',
                border: 'none',
                background: 'none',
                color: 'var(--ink-soft)',
                fontFamily: BODY,
                fontSize: 16,
                padding: '8px 30px 8px 2px',
              }}
            />
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="var(--teal-deep)"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden
              style={{ position: 'absolute', right: 4 }}
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>
          </span>
        </div>

        {/* Live region so screen readers announce filtered results. */}
        <div style={{ marginTop: 36 }} role="region" aria-live="polite" aria-label="FAQ answers">
          {visible.map(({ f, i }) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const btnId = `faq-btn-${i}`;
            return (
              <div key={f.q} style={{ borderBottom: '1px solid var(--line)', marginBottom: 24 }}>
                <button
                  id={btnId}
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '26px 4px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 16,
                    textAlign: 'left',
                    minHeight: 44,
                  }}
                >
                  <h3
                    style={{
                      color: 'var(--gold)',
                      fontFamily: WIDE,
                      fontSize: 15,
                      fontWeight: 400,
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      lineHeight: 1.4,
                      margin: 0,
                    }}
                  >
                    {i + 1}. {f.q}
                  </h3>
                  <span
                    aria-hidden
                    style={{
                      color: 'var(--teal-deep)',
                      fontSize: 18,
                      flexShrink: 0,
                      transform: isOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform .2s',
                    }}
                    className="motion-reduce:transition-none"
                  >
                    &#8964;
                  </span>
                </button>
                {isOpen && (
                  <div id={panelId} role="region" aria-labelledby={btnId} style={{ padding: '0 4px 22px' }}>
                    <p
                      style={{
                        color: 'var(--ink-soft)',
                        fontFamily: BODY,
                        fontSize: 16,
                        lineHeight: 1.7,
                        margin: '0 0 16px',
                        maxWidth: 760,
                      }}
                    >
                      {f.a}
                    </p>
                    <ShareIcons />
                  </div>
                )}
              </div>
            );
          })}
          {visible.length === 0 && (
            <p
              className="text-center py-8"
              style={{ color: 'var(--ink-soft)', fontFamily: BODY, fontSize: 16 }}
            >
              No questions match your search.
            </p>
          )}
        </div>
      </div>

      <style>{`
        .fr-faqsearch::placeholder { color: var(--teal-text); opacity: 1; }
        .fr-faqsearch:focus-visible { outline: 3px solid var(--teal-deep); outline-offset: 2px; }
        @media (max-width: 639px) {
          .fr-faqrow { flex-direction: column; align-items: stretch; }
          .fr-faqsearch-wrap { width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
