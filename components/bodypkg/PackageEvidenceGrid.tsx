'use client';

import { useState, useId } from 'react';
import Image from 'next/image';
import { type EvidenceCard } from '@/lib/bodypkg/types';

// WCAG 2.2 AA-corrected (darkened within brand hues) — see BodyPackagePage palette notes
const GREEN = '#365568';
const TAUPE = '#5e5349';
const TAUPE_DK = '#365568';
const TAUPE_LT = '#5e5349';
const WIDE = 'Novecento Wide Book, Novecento Wide, sans-serif';
const BODY = 'Roboto, sans-serif';
const SERIF = 'Trajan Pro, "Trajan Pro Regular", Georgia, serif';

export default function PackageEvidenceGrid({ evidence }: { evidence: EvidenceCard[] }) {
  const [openEv, setOpenEv] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginTop: 40 }}
      className="fr-evgrid"
    >
      {evidence.map((e, i) => {
        const open = openEv === i;
        const centerLast = i === evidence.length - 1 && evidence.length % 2 === 1;
        const panelId = `${baseId}-ev-panel-${i}`;
        const btnId = `${baseId}-ev-btn-${i}`;

        return (
          <div
            key={e.title}
            style={{
              position: 'relative',
              paddingTop: 16,
              gridColumn: centerLast ? '1 / -1' : 'auto',
              maxWidth: centerLast ? 560 : undefined,
              justifySelf: centerLast ? 'center' : 'stretch',
              width: centerLast ? '100%' : undefined,
            }}
          >
            <div style={{ position: 'relative', width: '92%', margin: '0 auto', zIndex: 2 }}>
              <div style={{ border: `2px solid ${GREEN}`, borderRadius: '20px 80px', overflow: 'hidden', backgroundColor: GREEN, position: 'relative' }}>
                {/* Use next/image for performance (P3) */}
                <Image
                  src={e.img}
                  alt={e.title}
                  width={400}
                  height={186}
                  loading="lazy"
                  style={{ width: '100%', height: 186, objectFit: 'cover', display: 'block' }}
                  sizes="(max-width: 640px) 90vw, 400px"
                />
              </div>
              <span style={{ position: 'absolute', top: -14, left: 18, backgroundColor: '#fff', color: GREEN, fontFamily: WIDE, fontWeight: 600, fontSize: 12, letterSpacing: '0.5px', textTransform: 'uppercase', padding: '7px 18px', borderRadius: 30, border: `2px solid ${GREEN}`, whiteSpace: 'nowrap' }}>{e.tag}</span>
            </div>

            <div style={{ background: 'linear-gradient(180deg, #f0f5f5 0%, #bdd1d1 100%)', borderRadius: 16, marginTop: -70, padding: '92px 30px 30px', position: 'relative', zIndex: 1 }}>
              <h3 style={{ color: GREEN, fontFamily: SERIF, fontWeight: 400, fontSize: 20, lineHeight: 1.3, textAlign: 'center', margin: 0 }}>{e.title}</h3>
              <div style={{ width: 90, height: 1, backgroundColor: '#cfc8bf', margin: '16px auto 20px' }} aria-hidden="true" />

              <p
                style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 12, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 8px' }}
                id={`${baseId}-does-label-${i}`}
              >
                What it does
              </p>
              <p
                style={{
                  color: TAUPE,
                  fontFamily: BODY,
                  fontSize: 14,
                  lineHeight: 1.6,
                  margin: '0 0 6px',
                  ...(open ? {} : { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }),
                }}
              >
                {e.does}
              </p>

              {/* Expanded content region — role="region" does not support aria-expanded; the button carries that state */}
              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                hidden={!open}
              >
                {open && (
                  <>
                    <p style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 12, letterSpacing: '1px', textTransform: 'uppercase', margin: '14px 0 8px' }}>Key results</p>
                    <ul
                      style={{ listStyle: 'none', padding: 0, margin: '0 0 14px', display: 'flex', flexDirection: 'column', gap: 10 }}
                      aria-label={`Key results for ${e.title}`}
                    >
                      {e.results.map((r) => (
                        <li key={r} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                          <span style={{ color: TAUPE_LT }} aria-hidden="true">&bull;</span>
                          <span style={{ color: TAUPE, fontFamily: BODY, fontSize: 13.5, lineHeight: 1.7 }}>{r}</span>
                        </li>
                      ))}
                    </ul>
                    {e.foot && <p style={{ color: TAUPE_LT, fontFamily: BODY, fontSize: 12.5, lineHeight: 1.6, margin: 0 }}>{e.foot}</p>}
                  </>
                )}
              </div>

              {/* Read more / Read less — min 44px tap target (P2) */}
              <button
                id={btnId}
                type="button"
                onClick={() => setOpenEv(open ? null : i)}
                aria-controls={panelId}
                aria-expanded={open}
                className="link-underline"
                style={{
                  marginTop: open ? 14 : 8,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: TAUPE,
                  fontFamily: BODY,
                  fontSize: 15,
                  fontStyle: 'italic',
                  padding: '8px 0',      // vertical padding to hit 44px tap height
                  minHeight: 44,
                  display: 'inline-flex',
                  alignItems: 'center',
                  transition: 'opacity 200ms ease',
                  outline: 'none',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                onFocus={(e) => { e.currentTarget.style.outline = `2px solid ${GREEN}`; e.currentTarget.style.outlineOffset = '2px'; }}
                onBlur={(e) => { e.currentTarget.style.outline = 'none'; }}
              >
                {open ? 'Read less' : 'Read more'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
