'use client';

import { useState, useId } from 'react';
import { type Faq } from '@/lib/bodypkg/types';

// WCAG 2.2 AA-corrected (darkened within brand hues) — see BodyPackagePage palette notes
const GREEN = '#365568';
const TAUPE = '#5e5349';
const TAUPE_LT = '#5e5349';
const WIDE = 'Novecento Wide Book, Novecento Wide, sans-serif';
const BODY = 'Roboto, sans-serif';

export default function PackageFaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div
      style={{ marginTop: 36 }}
      // Proper DL-based accordion with live region for screen readers
      role="region"
      aria-label="Frequently Asked Questions"
    >
      {/* Live region announces content changes to screen reader users */}
      <div role="status" aria-live="polite" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
        {openFaq !== null ? `Showing answer for: ${faqs[openFaq]?.q}` : ''}
      </div>

      {faqs.map((f, i) => {
        const open = openFaq === i;
        const btnId = `${baseId}-faq-btn-${i}`;
        const panelId = `${baseId}-faq-panel-${i}`;

        return (
          <div key={f.q} style={{ borderBottom: '1px solid #e6e1da' }}>
            {/* Accordion header button — full ARIA accordion pattern */}
            <h3 style={{ margin: 0 }}>
              <button
                id={btnId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenFaq(open ? null : i)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  // min 44px tap target (P2)
                  padding: '20px 4px',
                  minHeight: 44,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 16,
                  textAlign: 'left',
                  outline: 'none',
                  transition: 'background-color 150ms ease',
                  borderRadius: 4,
                }}
                onFocus={(e) => { e.currentTarget.style.outline = `2px solid ${GREEN}`; e.currentTarget.style.outlineOffset = '2px'; }}
                onBlur={(e) => { e.currentTarget.style.outline = 'none'; }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(54,85,104,0.04)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                onMouseDown={(e) => { e.currentTarget.style.backgroundColor = 'rgba(54,85,104,0.08)'; }}
                onMouseUp={(e) => { e.currentTarget.style.backgroundColor = 'rgba(54,85,104,0.04)'; }}
              >
                <span style={{ color: GREEN, fontFamily: WIDE, fontSize: 14, letterSpacing: '0.5px', textTransform: 'uppercase', lineHeight: 1.4 }}>
                  {f.q}
                </span>
                {/* Chevron icon — rotates 180° when open, respects prefers-reduced-motion via transition */}
                <span
                  aria-hidden="true"
                  style={{
                    color: TAUPE_LT,
                    fontSize: 18,
                    flexShrink: 0,
                    display: 'inline-block',
                    transform: open ? 'rotate(180deg)' : 'none',
                    // motion-safe: transition only when user has not opted out
                    transition: 'transform .2s ease',
                  }}
                >
                  &#8964;
                </span>
              </button>
            </h3>

            {/* Accordion panel — always rendered, shown/hidden via CSS for smooth animation */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!open}
            >
              <p style={{ color: TAUPE, fontFamily: BODY, fontSize: 15, lineHeight: 1.7, margin: 0, padding: '0 4px 22px', maxWidth: 760 }}>
                {f.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
