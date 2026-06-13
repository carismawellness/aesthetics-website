'use client';

import { useState } from 'react';
import { type EvidenceCard } from '@/lib/bodypkg/types';

const GREEN = '#6391AB';
const TAUPE = '#9B8D83';
const TAUPE_DK = '#6391AB';
const TAUPE_LT = '#AFA39D';
const WIDE = 'Novecento Wide Book, Novecento Wide, sans-serif';
const BODY = 'Roboto, sans-serif';
const SERIF = 'Trajan Pro, "Trajan Pro Regular", Georgia, serif';

export default function PackageEvidenceGrid({ evidence }: { evidence: EvidenceCard[] }) {
  const [openEv, setOpenEv] = useState<number | null>(null);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginTop: 40 }} className="fr-evgrid">
      {evidence.map((e, i) => {
        const open = openEv === i;
        const centerLast = i === evidence.length - 1 && evidence.length % 2 === 1;
        return (
          <div key={e.title} style={{ position: 'relative', paddingTop: 16, gridColumn: centerLast ? '1 / -1' : 'auto', maxWidth: centerLast ? 560 : undefined, justifySelf: centerLast ? 'center' : 'stretch', width: centerLast ? '100%' : undefined }}>
            <div style={{ position: 'relative', width: '92%', margin: '0 auto', zIndex: 2 }}>
              <div style={{ border: `2px solid ${GREEN}`, borderRadius: '20px 80px', overflow: 'hidden', backgroundColor: GREEN }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={e.img} alt="" loading="lazy" style={{ width: '100%', height: 186, objectFit: 'cover', display: 'block' }} />
              </div>
              <span style={{ position: 'absolute', top: -14, left: 18, backgroundColor: '#fff', color: GREEN, fontFamily: WIDE, fontWeight: 600, fontSize: 12, letterSpacing: '0.5px', textTransform: 'uppercase', padding: '7px 18px', borderRadius: 30, border: `2px solid ${GREEN}`, whiteSpace: 'nowrap' }}>{e.tag}</span>
            </div>
            <div style={{ background: 'linear-gradient(180deg, #f0f5f5 0%, #bdd1d1 100%)', borderRadius: 16, marginTop: -70, padding: '92px 30px 30px', position: 'relative', zIndex: 1 }}>
              <h3 style={{ color: GREEN, fontFamily: SERIF, fontWeight: 400, fontSize: 20, lineHeight: 1.3, textTransform: 'uppercase', textAlign: 'center', margin: 0 }}>{e.title}</h3>
              <div style={{ width: 90, height: 1, backgroundColor: '#cfc8bf', margin: '16px auto 20px' }} />
              <p style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 12, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 8px' }}>What it does</p>
              <p style={{ color: TAUPE, fontFamily: BODY, fontSize: 14, lineHeight: 1.6, margin: '0 0 6px', ...(open ? {} : { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }) }}>{e.does}</p>
              {open && (
                <>
                  <p style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 12, letterSpacing: '1px', textTransform: 'uppercase', margin: '14px 0 8px' }}>Key results</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {e.results.map((r) => (
                      <li key={r} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <span style={{ color: TAUPE_LT }}>&bull;</span>
                        <span style={{ color: TAUPE, fontFamily: BODY, fontSize: 13.5, lineHeight: 1.7 }}>{r}</span>
                      </li>
                    ))}
                  </ul>
                  {e.foot && <p style={{ color: TAUPE_LT, fontFamily: BODY, fontSize: 12.5, lineHeight: 1.6, margin: 0 }}>{e.foot}</p>}
                </>
              )}
              <button onClick={() => setOpenEv(open ? null : i)} style={{ marginTop: open ? 14 : 8, background: 'none', border: 'none', cursor: 'pointer', color: TAUPE, fontFamily: BODY, fontSize: 15, fontStyle: 'italic', textDecoration: 'underline', padding: 0, display: 'block' }}>{open ? 'Read less' : 'Read more'}</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
