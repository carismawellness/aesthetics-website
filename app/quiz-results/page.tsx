import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Your Personalised Results | Carisma Aesthetics',
  robots: { index: false, follow: true },
};

/* ── Brand tokens ─────────────────────────────────────────────────────── */
const SERIF = '"Trajan Pro", Georgia, serif';
const WIDE  = '"Novecento Wide", sans-serif';
const BODY  = 'Roboto, sans-serif';
const TEAL        = '#4F7373';
const TEAL_DEEP   = '#245052';
const TEAL_LIGHT  = '#DEEBEB';
const TAUPE       = '#6f6057';
const TAUPE_DEEP  = '#3d3530';

/* ── Aesthetics treatment catalogue ──────────────────────────────────── */
const TREATMENTS = [
  {
    id: 'wrinkle-relaxing',
    name: 'Anti-Wrinkle Injections',
    tagline: 'Doctor-administered muscle-relaxing injections that soften expression lines — forehead, crow\'s feet, frown lines — for a naturally refreshed look.',
    image: '/assets/service-botox.png',
    stats: [
      { label: 'Treatment time', value: '15–30 min' },
      { label: 'Results visible', value: '3–5 days' },
      { label: 'Lasts', value: '3–5 months' },
    ],
    href: '/face-treatments/wrinkle-relaxing',
  },
  {
    id: 'dermal-fillers',
    name: 'Dermal Fillers',
    tagline: 'Hyaluronic acid fillers restore lost volume, redefine contours and soften deep lines — with results that look beautifully natural.',
    image: '/assets/service-dermal-fillers.png',
    stats: [
      { label: 'Treatment time', value: '30–45 min' },
      { label: 'Results', value: 'Immediate' },
      { label: 'Lasts', value: '9–18 months' },
    ],
    href: '/face-treatments/dermal-fillers',
  },
  {
    id: 'microneedling',
    name: 'Microneedling',
    tagline: 'Controlled micro-injuries trigger the skin\'s natural collagen response — improving texture, minimising pores, and fading acne scars over a course of treatments.',
    image: '/assets/service-microneedling.jpg',
    stats: [
      { label: 'Downtime', value: '24–48 hrs' },
      { label: 'Course', value: '3–6 sessions' },
      { label: 'Best for', value: 'Texture & scars' },
    ],
    href: '/face-treatments/microneedling',
  },
  {
    id: 'chemical-peels',
    name: 'Chemical Peels',
    tagline: 'Medical-grade acid peels exfoliate the skin\'s surface to reduce pigmentation, even skin tone and refine texture — customised to your skin type.',
    image: '/assets/service-chemical-peel.png',
    stats: [
      { label: 'Downtime', value: 'Minimal–3 days' },
      { label: 'Glow', value: 'Immediate' },
      { label: 'Best for', value: 'Pigmentation' },
    ],
    href: '/face-treatments/chemical-peels',
  },
  {
    id: 'collagen-stimulator',
    name: 'Collagen Stimulator',
    tagline: 'Biostimulators like Sculptra or Radiesse trigger deep collagen production for gradual, long-lasting improvements in skin quality and volume.',
    image: '/assets/clinic-treatment-room.jpg',
    stats: [
      { label: 'Results appear', value: '4–6 weeks' },
      { label: 'Lasts', value: '18–24 months' },
      { label: 'Downtime', value: 'Minimal' },
    ],
    href: '/face-treatments/collagen-stimulator',
  },
  {
    id: 'thread-lift',
    name: 'Thread Lift',
    tagline: 'Dissolvable sutures gently lift sagging skin on the face and neck — providing an immediate lifting effect with ongoing collagen stimulation.',
    image: '/assets/service-thread-lift.png',
    stats: [
      { label: 'Treatment time', value: '45–90 min' },
      { label: 'Lift visible', value: 'Immediate' },
      { label: 'Lasts', value: '12–18 months' },
    ],
    href: '/face-treatments/thread-lift',
  },
  {
    id: 'lip-fillers',
    name: 'Lip Enhancement',
    tagline: 'Precise filler placement that adds natural-looking volume, defines the lip border and corrects asymmetry — never overdone.',
    image: '/assets/service-lip-fillers.png',
    stats: [
      { label: 'Treatment time', value: '20–30 min' },
      { label: 'Results', value: 'Immediate' },
      { label: 'Lasts', value: '6–12 months' },
    ],
    href: '/face-treatments/lip-fillers',
  },
];

/* ── Concern → treatment IDs ─────────────────────────────────────────── */
const CONCERN_MAP: Record<string, string[]> = {
  'Wrinkles & fine lines':    ['wrinkle-relaxing', 'dermal-fillers', 'collagen-stimulator'],
  'Volume loss':              ['dermal-fillers', 'collagen-stimulator'],
  'Skin texture & pores':     ['microneedling', 'chemical-peels'],
  'Pigmentation & dark spots':['chemical-peels', 'microneedling'],
  'Acne & scarring':          ['microneedling', 'chemical-peels'],
  'Sagging & jowls':          ['thread-lift', 'collagen-stimulator', 'wrinkle-relaxing'],
};

/* ── Area → treatment IDs ───────────────────────────────────────────── */
const AREA_MAP: Record<string, string[]> = {
  'Forehead':           ['wrinkle-relaxing'],
  "Eyes & crow's feet": ['wrinkle-relaxing', 'dermal-fillers'],
  'Lips & mouth':       ['lip-fillers', 'wrinkle-relaxing'],
  'Cheeks & midface':   ['dermal-fillers', 'collagen-stimulator'],
  'Jawline & chin':     ['thread-lift', 'dermal-fillers'],
  'Neck & décolleté':   ['thread-lift', 'collagen-stimulator'],
};

/* ── Recommendation logic ─────────────────────────────────────────────── */
function getRecommendations(
  concerns: string[],
  areas: string[],
  injectable: string,
): { id: string; matchedConcerns: string[]; matchedAreas: string[] }[] {
  const scores = new Map<string, { score: number; concerns: Set<string>; areas: Set<string> }>();

  const add = (id: string, score: number, concern?: string, area?: string) => {
    if (!scores.has(id)) scores.set(id, { score: 0, concerns: new Set(), areas: new Set() });
    const e = scores.get(id)!;
    e.score += score;
    if (concern) e.concerns.add(concern);
    if (area) e.areas.add(area);
  };

  concerns.forEach((concern, idx) => {
    (CONCERN_MAP[concern] ?? []).forEach((id, rank) => {
      add(id, (concerns.length - idx) * 3 + (2 - rank), concern);
    });
  });

  areas.forEach((area) => {
    (AREA_MAP[area] ?? []).forEach((id, rank) => {
      add(id, 2 - rank, undefined, area);
    });
  });

  if (injectable === 'Prefer non-injectable') {
    for (const id of ['wrinkle-relaxing', 'dermal-fillers', 'lip-fillers', 'collagen-stimulator', 'thread-lift']) {
      const e = scores.get(id);
      if (e) e.score = -99;
    }
  }

  return Array.from(scores.entries())
    .filter(([, e]) => e.score > 0)
    .sort((a, b) => b[1].score - a[1].score)
    .slice(0, 4)
    .map(([id, e]) => ({ id, matchedConcerns: Array.from(e.concerns), matchedAreas: Array.from(e.areas) }));
}

/* ── Page ─────────────────────────────────────────────────────────────── */
export default async function AestheticsQuizResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ concerns?: string; areas?: string; injectable?: string; name?: string }>;
}) {
  const sp = await searchParams;
  const selectedConcerns = sp.concerns
    ? sp.concerns.split(',').map((c) => decodeURIComponent(c.trim()))
    : [];
  const selectedAreas = sp.areas
    ? sp.areas.split(',').map((a) => decodeURIComponent(a.trim()))
    : [];
  const injectable = sp.injectable ? decodeURIComponent(sp.injectable) : '';
  const firstName  = sp.name ? decodeURIComponent(sp.name) : '';

  const recs = getRecommendations(selectedConcerns, selectedAreas, injectable);
  const items = recs.length > 0
    ? recs
    : TREATMENTS.slice(0, 3).map((t) => ({ id: t.id, matchedConcerns: [], matchedAreas: [] }));

  return (
    <main style={{ minHeight: '80vh', background: '#fff' }}>

      {/* ── Hero ── */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: 'clamp(96px, 14vh, 132px) 24px 64px',
          background: 'radial-gradient(120% 90% at 85% 8%, #e8f4f4 0%, #f5f8f8 45%, #ffffff 100%)',
        }}
      >
        {/* decorative teal glow */}
        <span
          aria-hidden
          style={{
            position: 'absolute', top: '-14%', right: '-6%',
            width: 420, height: 420, borderRadius: '50%',
            background: 'rgba(150,178,178,0.22)', filter: 'blur(90px)',
            zIndex: 0, pointerEvents: 'none',
          }}
        />
        {/* subtle dot motif */}
        <span
          aria-hidden
          style={{
            position: 'absolute', bottom: '10%', left: '5%',
            width: 280, height: 280, borderRadius: '50%',
            background: 'rgba(150,178,178,0.12)', filter: 'blur(60px)',
            zIndex: 0, pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: WIDE, fontSize: '12px', letterSpacing: '3px', color: TEAL, textTransform: 'uppercase', marginBottom: '14px' }}>
            {firstName ? `${firstName}, here are your results` : 'Your personalised results'}
          </p>
          <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 'clamp(26px, 3vw, 35px)', lineHeight: 1.2, color: TAUPE_DEEP, textTransform: 'uppercase', margin: '0 0 18px' }}>
            Your Personalised Aesthetic Plan
          </h1>
          <div style={{ width: '64px', height: '1px', backgroundColor: TEAL, margin: '0 auto 20px' }} />
          {(selectedConcerns.length > 0 || selectedAreas.length > 0) && (
            <p style={{ fontFamily: BODY, fontSize: '16px', color: TAUPE, lineHeight: 1.6, maxWidth: 620, margin: '0 auto' }}>
              Based on your concerns
              {selectedConcerns.length > 0 && <> — <span style={{ color: TEAL_DEEP, fontWeight: 500 }}>{selectedConcerns.join(', ')}</span></>}
              {selectedAreas.length > 0 && <> — and focus areas: <span style={{ color: TEAL_DEEP, fontWeight: 500 }}>{selectedAreas.join(', ')}</span></>}
              {' '}— our doctors have selected the treatments most suited to your goals.
            </p>
          )}
        </div>
      </section>

      {/* ── Recommendation cards ── */}
      <section
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #f0f7f7 46%, #ffffff 100%)',
          padding: '64px 0 88px',
        }}
      >
        <div style={{ maxWidth: '880px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{ fontFamily: WIDE, fontSize: '12px', letterSpacing: '3px', color: TEAL, textTransform: 'uppercase', margin: '0 0 16px' }}>
              Recommended for you
            </p>
            <div style={{ width: '64px', height: '1px', backgroundColor: TEAL, margin: '0 auto 18px' }} />
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 'clamp(24px, 3.4vw, 34px)', lineHeight: 1.25, color: TAUPE_DEEP, textTransform: 'uppercase', margin: 0 }}>
              Medical Aesthetic Treatments in Malta
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {items.map(({ id, matchedConcerns, matchedAreas }) => {
              const t = TREATMENTS.find((x) => x.id === id);
              if (!t) return null;
              return (
                <div
                  key={id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '220px 1fr',
                    overflow: 'hidden',
                    borderRadius: '20px',
                    border: '1px solid rgba(79,115,115,0.12)',
                    background: '#fff',
                    boxShadow: '0 4px 24px rgba(79,115,115,0.08)',
                  }}
                >
                  <div style={{ position: 'relative', minHeight: '240px', overflow: 'hidden' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.image}
                      alt={t.name}
                      loading="lazy"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <div style={{ padding: '28px 28px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: '19px', lineHeight: 1.3, color: TAUPE_DEEP, textTransform: 'uppercase', margin: '0 0 10px' }}>
                        {t.name}
                      </h3>
                      <p style={{ fontFamily: BODY, fontSize: '15px', color: TAUPE, lineHeight: 1.6, margin: '0 0 16px' }}>
                        {t.tagline}
                      </p>

                      {(matchedConcerns.length > 0 || matchedAreas.length > 0) && (
                        <div style={{ marginBottom: '18px' }}>
                          <p style={{ fontFamily: WIDE, fontSize: '11px', letterSpacing: '2px', color: TEAL, textTransform: 'uppercase', margin: '0 0 8px' }}>
                            Matched to your goals
                          </p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {[...matchedConcerns, ...matchedAreas].map((label) => (
                              <span key={label} style={{ fontFamily: BODY, fontSize: '12px', color: TEAL, backgroundColor: TEAL_LIGHT, border: `1px solid ${TEAL_LIGHT}`, borderRadius: '999px', padding: '4px 12px' }}>
                                {label}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div style={{ display: 'flex', gap: '22px', flexWrap: 'wrap' }}>
                        {t.stats.map((s) => (
                          <div key={s.label} style={{ textAlign: 'center' }}>
                            <p style={{ fontFamily: SERIF, fontWeight: 400, fontSize: '16px', color: TEAL_DEEP, margin: 0, lineHeight: 1.2 }}>{s.value}</p>
                            <p style={{ fontFamily: WIDE, fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: TAUPE, margin: '4px 0 0' }}>{s.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={t.href}
                      style={{
                        display: 'block', width: '100%', marginTop: '20px', padding: '13px',
                        fontFamily: WIDE, fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase',
                        textDecoration: 'none', textAlign: 'center', color: TEAL,
                        border: `1.5px solid ${TEAL}`, borderRadius: 999,
                        transition: 'background .18s, color .18s',
                      }}
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: '56px' }}>
            <p style={{ fontFamily: BODY, fontSize: '16px', color: TAUPE, lineHeight: 1.6, maxWidth: 540, margin: '0 auto 22px' }}>
              Ready to start? Book a free, no-obligation consultation with one of our doctors.
            </p>
            <Link
              href="/consultation"
              className="cta-glow-teal"
              style={{ display: 'inline-block', padding: '15px 40px', color: '#FFFFFF', fontFamily: WIDE, fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 999 }}
            >
              Book Your Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
