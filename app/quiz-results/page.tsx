import type { Metadata } from 'next';
import QuizResultsClient, { type TreatmentRec } from '@/components/quiz/QuizResultsClient';

export const metadata: Metadata = {
  title: 'Your Personalised Results | Carisma Aesthetics',
  robots: { index: false, follow: true },
};

/* ── Treatment catalogue ──────────────────────────────────────────────── */
const TREATMENTS = [
  {
    id: 'wrinkle-relaxing',
    name: 'Anti-Wrinkle Injections',
    tagline: "Doctor-administered muscle-relaxing injections that soften expression lines — forehead, crow's feet, frown lines — for a naturally refreshed look.",
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
    tagline: "Controlled micro-injuries trigger the skin's natural collagen response — improving texture, minimising pores, and fading acne scars over a course of treatments.",
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
    tagline: "Medical-grade acid peels exfoliate the skin's surface to reduce pigmentation, even skin tone and refine texture — customised to your skin type.",
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
] as const;

/* ── Concern → treatment scoring ─────────────────────────────────────── */
const CONCERN_MAP: Record<string, string[]> = {
  'Wrinkles & fine lines':      ['wrinkle-relaxing', 'dermal-fillers', 'collagen-stimulator'],
  'Volume loss':                ['dermal-fillers', 'collagen-stimulator'],
  'Skin texture & pores':       ['microneedling', 'chemical-peels'],
  'Pigmentation & dark spots':  ['chemical-peels', 'microneedling'],
  'Acne & scarring':            ['microneedling', 'chemical-peels'],
  'Sagging & jowls':            ['thread-lift', 'collagen-stimulator', 'wrinkle-relaxing'],
};

const AREA_MAP: Record<string, string[]> = {
  'Forehead':           ['wrinkle-relaxing'],
  "Eyes & crow's feet": ['wrinkle-relaxing', 'dermal-fillers'],
  'Lips & mouth':       ['lip-fillers', 'wrinkle-relaxing'],
  'Cheeks & midface':   ['dermal-fillers', 'collagen-stimulator'],
  'Jawline & chin':     ['thread-lift', 'dermal-fillers'],
  'Neck & décolleté':   ['thread-lift', 'collagen-stimulator'],
};

/* ── Scoring & normalisation ─────────────────────────────────────────── */
function getRecommendations(
  concerns: string[],
  areas: string[],
  injectable: string,
): TreatmentRec[] {
  const scores = new Map<string, { score: number; concerns: Set<string>; areas: Set<string> }>();

  const add = (id: string, pts: number, concern?: string, area?: string) => {
    if (!scores.has(id)) scores.set(id, { score: 0, concerns: new Set(), areas: new Set() });
    const e = scores.get(id)!;
    e.score += pts;
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

  const ranked = Array.from(scores.entries())
    .filter(([, e]) => e.score > 0)
    .sort((a, b) => b[1].score - a[1].score)
    .slice(0, 4);

  const maxScore = ranked[0]?.[1]?.score ?? 1;

  const result: TreatmentRec[] = [];
  for (const [id, e] of ranked) {
    const treatment = TREATMENTS.find((t) => t.id === id);
    if (!treatment) continue;
    const matchPct = Math.round(65 + (e.score / maxScore) * 35);
    result.push({
      id: treatment.id,
      name: treatment.name,
      tagline: treatment.tagline,
      image: treatment.image,
      stats: [...treatment.stats],
      href: treatment.href,
      matchedConcerns: Array.from(e.concerns),
      matchedAreas: Array.from(e.areas),
      matchPct,
    });
  }
  return result;
}

/* ── Page ─────────────────────────────────────────────────────────────── */
export default async function AestheticsQuizResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ concerns?: string; areas?: string; injectable?: string; name?: string }>;
}) {
  const sp = await searchParams;

  const concerns  = sp.concerns  ? sp.concerns.split(',').map((c) => decodeURIComponent(c.trim()))  : [];
  const areas     = sp.areas     ? sp.areas.split(',').map((a) => decodeURIComponent(a.trim()))     : [];
  const injectable = sp.injectable ? decodeURIComponent(sp.injectable) : '';
  const firstName  = sp.name ? decodeURIComponent(sp.name) : '';

  let recs = getRecommendations(concerns, areas, injectable);

  /* Fallback: first 3 treatments with 80% match if nothing scored */
  if (recs.length === 0) {
    recs = TREATMENTS.slice(0, 3).map((t) => ({
      id: t.id,
      name: t.name,
      tagline: t.tagline,
      image: t.image,
      stats: [...t.stats],
      href: t.href,
      matchedConcerns: [] as string[],
      matchedAreas: [] as string[],
      matchPct: 80,
    }));
  }

  return (
    <QuizResultsClient
      firstName={firstName}
      concerns={concerns}
      areas={areas}
      recs={recs}
    />
  );
}
