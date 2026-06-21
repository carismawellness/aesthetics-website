'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';
import { type Testimonial } from '@/lib/bodypkg/testimonials';

// WCAG 2.2 AA-corrected (darkened within brand hues) — see BodyPackagePage palette notes
const GREEN = '#365568';      // carousel arrow controls — 3:1+ UI contrast on white
const QUOTE_TEXT = '#5e5349'; // quote / name / "Read more" — 4.5:1+ on gradient cards
const BODY = 'Roboto, sans-serif';

function TestimonialCard({ t }: { t: Testimonial }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ background: '#fff', borderRadius: 16, padding: '20px 10px', margin: '0 10px', boxSizing: 'border-box' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={t.image} alt={`${t.name} before and after`} loading="lazy" style={{ width: '100%', borderRadius: 16, display: 'block' }} />
      <div style={{ background: 'linear-gradient(178deg, #f0f5f5 42%, #bdd1d1 100%)', borderRadius: 16, padding: '15px', paddingTop: 70, marginTop: -91 }}>
        <p
          style={{
            color: QUOTE_TEXT, fontFamily: BODY, fontSize: 14, lineHeight: 1.5, margin: '0 0 5px',
            ...(expanded ? {} : { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }),
          }}
        >
          {t.quote}
        </p>
        <button type="button" onClick={() => setExpanded((v) => !v)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: 14, textDecoration: 'underline', color: QUOTE_TEXT, fontFamily: BODY }}>
          {expanded ? 'Read less' : 'Read more'}
        </button>
        <h3 style={{ fontSize: 16, fontWeight: 500, color: QUOTE_TEXT, margin: '24px 0 5px', fontFamily: BODY }}>{t.name}</h3>
      </div>
    </div>
  );
}

export default function TestimonialsSection({ items }: { items: Testimonial[] }) {
  const [start, setStart] = useState(0);
  const n = items.length;
  const per = Math.min(3, n);
  const visible = Array.from({ length: per }, (_, i) => items[(start + i) % n]);
  const arrow: CSSProperties = { position: 'absolute', top: '38%', transform: 'translateY(-50%)', width: 36, height: 36, borderRadius: '50%', border: 'none', cursor: 'pointer', background: 'rgba(0,0,0,0)', color: GREEN, fontSize: 24, lineHeight: 1, zIndex: 2 };
  return (
    <div style={{ position: 'relative', padding: '0 36px', marginTop: 36 }}>
      <button type="button" aria-label="Previous" onClick={() => setStart((start - 1 + n) % n)} style={{ ...arrow, left: 0 }}>&#8249;</button>
      <div className="fr-testi" style={{ display: 'flex' }}>
        {visible.map((t, i) => (
          <div key={`${start}-${i}`} style={{ flex: '1 1 0', minWidth: 0 }}>
            <TestimonialCard t={t} />
          </div>
        ))}
      </div>
      <button type="button" aria-label="Next" onClick={() => setStart((start + 1) % n)} style={{ ...arrow, right: 0 }}>&#8250;</button>
    </div>
  );
}
