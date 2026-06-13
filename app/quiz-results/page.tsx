import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { faceTreatments } from '@/lib/face-treatments';

export const metadata: Metadata = {
  title: 'Your Skin Recommendations | Carisma Aesthetics',
  description: 'Personalised treatment recommendations curated for your skin concerns.',
};

/* ── Concern → treatment slug mapping ───────────────────────────────── */
const CONCERN_TO_SLUGS: Record<string, string[]> = {
  'Wrinkles':          ['wrinkle-relaxing', 'collagen-stimulator', 'thread-lift'],
  'Thin lips':         ['lip-fillers'],
  'Facial volumising': ['dermal-fillers', 'collagen-stimulator'],
  'Uneven skin tone':  ['chemical-peels', 'microneedling', 'mesotherapy'],
  'Acne':              ['chemical-peels', 'microneedling'],
  'Double chin':       ['mesotherapy', 'microneedling'],
  'Dark circles':      ['dermal-fillers', 'mesotherapy'],
  'Dry skin':          ['mesotherapy', 'microneedling'],
  'Oily skin':         ['chemical-peels', 'microneedling'],
};

/* Q4 explicit interest → slug */
const INTEREST_TO_SLUG: Record<string, string> = {
  'Botox':                    'wrinkle-relaxing',
  'Lip Fillers':              'lip-fillers',
  'Dermal Fillers':           'dermal-fillers',
  'Fat Disolving':            'mesotherapy',
  'Mesotherapy':              'mesotherapy',
  'PRP':                      'microneedling',
  'Thread Lift':              'thread-lift',
  'Chemical Peels':           'chemical-peels',
  'Microneedling':            'microneedling',
  'Collagen-Stimulator':      'collagen-stimulator',
  'MFU-Ultight':              'thread-lift',
  'Advanced Hydrating Facial':'mesotherapy',
};

const INJECTABLE_SLUGS = new Set(['lip-fillers', 'dermal-fillers', 'wrinkle-relaxing']);

const headingFont = 'Trajan Pro, serif';
const wideFont    = 'Novecento Wide Book, sans-serif';
const bodyFont    = 'Roboto, sans-serif';
const taupe       = '#9B8D83';
const taupeLight  = '#B8AEA9';
const green       = '#8EB093';
const cream       = '#F5F0EA';

/* ── Treatment card images ───────────────────────────────────────────── */
const SLUG_TO_IMAGE: Record<string, string> = {
  'wrinkle-relaxing':   '/assets/treatments/wrinkle-relaxing-malta-hero.jpg',
  'lip-fillers':        '/assets/treatments/lip-fillers-malta-hero.png',
  'dermal-fillers':     '/assets/treatments/dermal-fillers-malta-hero.png',
  'microneedling':      '/assets/treatments/microneedling-malta-hero.png',
  'chemical-peels':     '/assets/treatments/chemical-peels-malta-hero.png',
  'collagen-stimulator':'/assets/treatments/collagen-stimulator-malta-hero.png',
  'thread-lift':        '/assets/treatments/thread-lift-malta-hero.avif',
  'mesotherapy':        '/assets/treatments/mesotherapy-malta-hero.png',
};

/* ── Concern short descriptions shown on each card ───────────────────── */
const CONCERN_LABELS: Record<string, string> = {
  'Wrinkles':          'Wrinkles & fine lines',
  'Thin lips':         'Thin lips',
  'Facial volumising': 'Loss of volume',
  'Uneven skin tone':  'Uneven skin tone',
  'Acne':              'Acne & breakouts',
  'Double chin':       'Double chin',
  'Dark circles':      'Dark circles',
  'Dry skin':          'Dry skin',
  'Oily skin':         'Oily skin',
};

/* ── Recommendation logic ─────────────────────────────────────────────── */
function getRecommendations(
  concerns: string[],
  injectables: string,
  treatmentInterest: string,
): { slug: string; concerns: string[] }[] {
  const slugScores: Map<string, { score: number; concerns: Set<string> }> = new Map();

  for (const concern of concerns) {
    const slugs = CONCERN_TO_SLUGS[concern] ?? [];
    slugs.forEach((slug, idx) => {
      if (!slugScores.has(slug)) slugScores.set(slug, { score: 0, concerns: new Set() });
      const entry = slugScores.get(slug)!;
      entry.score += slugs.length - idx; // rank: first slug scores higher
      entry.concerns.add(concern);
    });
  }

  // Boost explicitly requested treatment interest
  if (treatmentInterest && INTEREST_TO_SLUG[treatmentInterest]) {
    const slug = INTEREST_TO_SLUG[treatmentInterest];
    if (!slugScores.has(slug)) slugScores.set(slug, { score: 0, concerns: new Set() });
    slugScores.get(slug)!.score += 10;
  }

  // Filter injectables if user said No
  const noInjectables = injectables === 'No';

  return Array.from(slugScores.entries())
    .filter(([slug]) => !(noInjectables && INJECTABLE_SLUGS.has(slug)))
    .sort((a, b) => b[1].score - a[1].score)
    .slice(0, 4)
    .map(([slug, data]) => ({ slug, concerns: Array.from(data.concerns) }));
}

/* ── Page ─────────────────────────────────────────────────────────────── */
export default function QuizResultsPage({
  searchParams,
}: {
  searchParams: { concerns?: string; injectables?: string; treatment?: string; name?: string };
}) {
  const rawConcerns    = searchParams.concerns   ?? '';
  const injectables    = searchParams.injectables ?? 'Yes';
  const treatmentInterest = searchParams.treatment ?? '';
  const firstName      = searchParams.name ?? '';

  const selectedConcerns = rawConcerns
    ? rawConcerns.split(',').map((c) => decodeURIComponent(c.trim()))
    : [];

  const recommendations = getRecommendations(selectedConcerns, injectables, treatmentInterest);

  // Fallback: if nothing matched (e.g. quiz skipped), show top 3 treatments
  const fallback = recommendations.length === 0;
  const items = fallback
    ? faceTreatments.slice(0, 3).map((t) => ({ slug: t.slug, concerns: [] }))
    : recommendations;

  return (
    <main style={{ backgroundColor: '#FFFFFF', minHeight: '80vh' }}>

      {/* ── Hero heading ── */}
      <section style={{ backgroundColor: cream, padding: '60px 24px 48px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          {firstName && (
            <p style={{ fontFamily: wideFont, fontSize: '13px', letterSpacing: '2px', color: taupeLight, textTransform: 'uppercase', marginBottom: '12px' }}>
              {firstName}, here are your results
            </p>
          )}
          <h1 style={{ fontFamily: headingFont, fontWeight: 400, fontSize: '32px', lineHeight: '1.3', color: taupe, textTransform: 'uppercase', marginBottom: '16px' }}>
            Recommendations<br />Curated For You
          </h1>
          <div style={{ width: '80px', height: '1px', backgroundColor: '#D4C8C1', margin: '0 auto 20px' }} />
          {selectedConcerns.length > 0 && (
            <p style={{ fontFamily: bodyFont, fontSize: '15px', color: taupeLight, lineHeight: 1.6 }}>
              Based on your concerns — <span style={{ color: taupe, fontWeight: 500 }}>{selectedConcerns.join(', ')}</span> — our specialists have selected the treatments most likely to deliver the result you are looking for.
            </p>
          )}
        </div>
      </section>

      {/* ── Recommendation cards ── */}
      <section style={{ maxWidth: '860px', margin: '0 auto', padding: '48px 24px 80px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {items.map(({ slug, concerns: matchedConcerns }) => {
            const treatment = faceTreatments.find((t) => t.slug === slug);
            if (!treatment) return null;
            const img = SLUG_TO_IMAGE[slug] ?? treatment.cardImage;

            return (
              <div
                key={slug}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '240px 1fr',
                  border: '1px solid #EDE8E3',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                }}
              >
                {/* Image */}
                <div style={{ position: 'relative', height: '260px' }}>
                  <Image
                    src={img}
                    alt={treatment.name}
                    fill
                    sizes="240px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                {/* Content */}
                <div style={{ padding: '28px 28px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h2 style={{ fontFamily: headingFont, fontWeight: 400, fontSize: '22px', color: taupe, textTransform: 'uppercase', marginBottom: '10px' }}>
                      {treatment.name}
                    </h2>
                    <p style={{ fontFamily: bodyFont, fontSize: '14px', color: taupeLight, lineHeight: 1.6, marginBottom: '20px' }}>
                      {treatment.tagline}
                    </p>

                    {matchedConcerns.length > 0 && (
                      <div style={{ marginBottom: '20px' }}>
                        <p style={{ fontFamily: wideFont, fontSize: '11px', letterSpacing: '1.5px', color: taupe, textTransform: 'uppercase', marginBottom: '10px' }}>
                          Skin concerns addressed
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {matchedConcerns.map((c) => (
                            <span
                              key={c}
                              style={{
                                fontFamily: bodyFont,
                                fontSize: '12px',
                                color: green,
                                backgroundColor: '#EEF3EF',
                                border: '1px solid #C8DDC9',
                                borderRadius: '20px',
                                padding: '4px 12px',
                              }}
                            >
                              {CONCERN_LABELS[c] ?? c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                      {treatment.infoStats.slice(0, 3).map((s) => (
                        <div key={s.label} style={{ textAlign: 'center' }}>
                          <p style={{ fontFamily: wideFont, fontSize: '13px', color: taupe, fontWeight: 600 }}>{s.value}</p>
                          <p style={{ fontFamily: bodyFont, fontSize: '11px', color: taupeLight }}>{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/${slug}`}
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      marginTop: '20px',
                      padding: '13px',
                      backgroundColor: cream,
                      fontFamily: wideFont,
                      fontSize: '12px',
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      color: taupe,
                      border: '1px solid #D4C8C1',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      transition: 'background-color 0.2s',
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
        <div style={{ textAlign: 'center', marginTop: '52px' }}>
          <p style={{ fontFamily: bodyFont, fontSize: '15px', color: taupeLight, marginBottom: '20px' }}>
            Not sure which treatment is right for you? Speak with one of our specialists.
          </p>
          <Link
            href="/consultation"
            style={{
              display: 'inline-block',
              padding: '15px 40px',
              backgroundColor: green,
              color: '#FFFFFF',
              fontFamily: wideFont,
              fontSize: '13px',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              borderRadius: '6px',
              textDecoration: 'none',
            }}
          >
            Book a Free Consultation
          </Link>
        </div>
      </section>

    </main>
  );
}
