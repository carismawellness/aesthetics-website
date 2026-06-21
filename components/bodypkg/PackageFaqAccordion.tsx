'use client';

import { useState } from 'react';
import { type Faq } from '@/lib/bodypkg/types';

// WCAG 2.2 AA-corrected (darkened within brand hues) — see BodyPackagePage palette notes
const GREEN = '#365568';
const TAUPE = '#5e5349';
const TAUPE_LT = '#5e5349';
const WIDE = 'Novecento Wide Book, Novecento Wide, sans-serif';
const BODY = 'Roboto, sans-serif';

export default function PackageFaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div style={{ marginTop: 36 }}>
      {faqs.map((f, i) => {
        const open = openFaq === i;
        return (
          <div key={f.q} style={{ borderBottom: '1px solid #e6e1da' }}>
            <button
              onClick={() => setOpenFaq(open ? null : i)}
              style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '20px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, textAlign: 'left' }}
            >
              <span style={{ color: open ? GREEN : GREEN, fontFamily: WIDE, fontSize: 14, letterSpacing: '0.5px', textTransform: 'uppercase', lineHeight: 1.4 }}>{f.q}</span>
              <span style={{ color: TAUPE_LT, fontSize: 18, flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>&#8964;</span>
            </button>
            {open && (
              <p style={{ color: TAUPE, fontFamily: BODY, fontSize: 15, lineHeight: 1.7, margin: 0, padding: '0 4px 22px', maxWidth: 760 }}>
                {f.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
