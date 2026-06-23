'use client';

import { useState } from 'react';

/**
 * TreatmentFaq — searchable FAQ accordion ported 1:1 from the Carisma Slimming
 * design language (components/FAQAccordion.tsx): centered Trajan-uppercase H2 with
 * an inline search field, hairline-ruled accordion rows, numbered question labels,
 * and a chevron indicator that rotates 180° on expand. Recolored to Aesthetics
 * tokens (green → teal): headings carry --gold, accents/icons/rules --teal-deep /
 * --teal-text, body --ink-soft, hairlines --line, ground white.
 *
 * Emit the matching FAQPage JSON-LD once on the page itself (not here) to avoid a
 * duplicate FAQPage block.
 */

// Fonts mirror the Slimming component's roles:
// headingFont = Trajan (titling caps, always uppercase) · bodyFont = Roboto.
const headingFont = 'Trajan Pro, Georgia, serif';
const bodyFont = 'Roboto Local, Roboto, sans-serif';

export default function TreatmentFaq({
  kicker,
  title = 'Frequently Asked Questions',
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
    .filter(({ f }) => f.q.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mb-10">
          {kicker && (
            <p
              className="text-center font-display"
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
            className="text-center"
            style={{
              color: 'var(--gold)',
              fontFamily: headingFont,
              fontWeight: 400,
              fontSize: '22px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            {title}
          </h2>
          <div
            className="mt-6 md:mt-0 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 mx-auto"
            style={{ maxWidth: '300px' }}
          >
            <div
              className="flex items-center gap-2"
              style={{ borderBottom: '1px solid var(--teal-deep)', paddingBottom: '6px' }}
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Looking for something?"
                aria-label="Search frequently asked questions"
                className="w-full bg-transparent"
                style={{ color: 'var(--ink-soft)', fontFamily: bodyFont, fontSize: '15px' }}
              />
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--teal-deep)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
                aria-hidden
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          {visible.map(({ f, i }) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            return (
              <div key={f.q} style={{ borderBottom: '1px solid var(--line)' }}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left"
                  style={{ padding: '22px 4px', cursor: 'pointer', background: 'transparent' }}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <h3
                    style={{
                      color: 'var(--gold)',
                      fontFamily: bodyFont,
                      fontSize: '15px',
                      fontWeight: 400,
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      lineHeight: 1.4,
                      margin: 0,
                    }}
                  >
                    {i + 1}. {f.q}
                  </h3>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--teal-deep)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 ease-in-out motion-reduce:transition-none"
                    style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'none' }}
                    aria-hidden
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {isOpen && (
                  <div id={panelId} style={{ padding: '0 4px 24px' }}>
                    <p style={{ color: 'var(--ink-soft)', fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.7 }}>
                      {f.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
          {visible.length === 0 && (
            <p
              className="text-center py-8"
              style={{ color: 'var(--ink-soft)', fontFamily: bodyFont, fontSize: '15px' }}
            >
              No questions match your search.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
