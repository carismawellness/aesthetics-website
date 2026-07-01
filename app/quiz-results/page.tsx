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
    tagline: "Botulinum toxin is precisely placed into overactive facial muscles, forehead, frown lines and crow's feet, to relax dynamic expression lines and restore a naturally refreshed, well-rested appearance without freezing movement.",
    image: '/assets/treatments/wrinkle-relaxing-malta-hero.jpg',
    stats: [
      { label: 'Treatment time', value: '15–30 min' },
      { label: 'Results visible', value: '3–14 days' },
      { label: 'Lasts', value: '3–6 months' },
    ],
    href: '/face-treatments/wrinkle-relaxing',
  },
  {
    id: 'dermal-fillers',
    name: 'Dermal Fillers',
    tagline: 'Hyaluronic acid, a molecule native to your own skin, is placed by our doctor to instantly restore lost volume, lift the mid-face, soften deep folds and redefine contours with results that are immediate and naturally harmonious.',
    image: '/assets/treatments/dermal-fillers-malta-hero.png',
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
    tagline: "Controlled micro-channels in the dermis trigger your skin's own collagen and elastin repair response, progressively remodelling texture, closing enlarged pores and fading atrophic acne scars across a course of treatments.",
    image: '/assets/treatments/microneedling-malta-hero.png',
    stats: [
      { label: 'Downtime', value: '24–72 hrs' },
      { label: 'Course', value: '3–6 sessions' },
      { label: 'Best for', value: 'Texture & scars' },
    ],
    href: '/face-treatments/microneedling',
  },
  {
    id: 'chemical-peels',
    name: 'Chemical Peels',
    tagline: "A precisely selected acid, glycolic, salicylic, Jessner's or TCA, exfoliates damaged skin layers to correct pigmentation, clear active acne, even skin tone and reveal visibly clearer, brighter skin beneath.",
    image: '/assets/treatments/chemical-peels-malta-hero.png',
    stats: [
      { label: 'Downtime', value: 'Minimal–7 days' },
      { label: 'Glow', value: 'Immediate' },
      { label: 'Best for', value: 'Pigmentation' },
    ],
    href: '/face-treatments/chemical-peels',
  },
  {
    id: 'collagen-stimulator',
    name: 'Collagen Stimulator',
    tagline: 'Injectable biostimulators, Sculptra (PLLA) or Radiesse (CaHA), activate your own fibroblasts to produce fresh collagen and restore facial volume gradually, with results that develop over weeks and last up to two years.',
    image: '/assets/treatments/collagen-stimulator-malta-hero.png',
    stats: [
      { label: 'Results appear', value: '4–12 weeks' },
      { label: 'Lasts', value: '18–24 months' },
      { label: 'Downtime', value: 'Minimal' },
    ],
    href: '/face-treatments/collagen-stimulator',
  },
  {
    id: 'thread-lift',
    name: 'Thread Lift',
    tagline: 'Biodegradable PDO or PCL sutures are placed subcutaneously to mechanically reposition sagging tissue on the face and neck, while simultaneously provoking a collagen scaffold response for lasting structural improvement.',
    image: '/assets/treatments/thread-lift-malta-hero.avif',
    stats: [
      { label: 'Treatment time', value: '45–90 min' },
      { label: 'Lift visible', value: 'Immediate' },
      { label: 'Lasts', value: '12–24 months' },
    ],
    href: '/face-treatments/thread-lift',
  },
  {
    id: 'lip-fillers',
    name: 'Lip Enhancement',
    tagline: 'Micro-technique hyaluronic acid placement adds natural volume, defines the vermillion border, corrects asymmetry and restores projection, always calibrated to your facial proportions and never overdone.',
    image: '/assets/treatments/lip-fillers-malta-hero.png',
    stats: [
      { label: 'Treatment time', value: '20–30 min' },
      { label: 'Results', value: 'Immediate' },
      { label: 'Lasts', value: '6–12 months' },
    ],
    href: '/face-treatments/lip-fillers',
  },
] as const;

/* ── Concern → treatment clinical weights ─────────────────────────────
   5 = first-line gold standard  |  4 = strong second-line
   3 = good moderate-evidence    |  2 = mild/secondary
   1 = incidental/adjunct only   |  omit = not indicated
   ──────────────────────────────────────────────────────────────────── */
const CONCERN_WEIGHTS: Record<string, Record<string, number>> = {
  'Wrinkles & fine lines': {
    'wrinkle-relaxing':    5, // gold standard for dynamic expression wrinkles
    'dermal-fillers':      4, // static wrinkles, deep folds, perioral lines
    'collagen-stimulator': 3, // biostimulation restores skin quality and fine lines
    'microneedling':       2, // modest benefit via neocollagenesis
    'chemical-peels':      2, // superficial fine-line improvement via exfoliation
    'thread-lift':         1, // indirect skin tightening
  },
  'Volume loss': {
    'dermal-fillers':      5, // immediate HA volumisation — first-line
    'collagen-stimulator': 5, // Sculptra/Radiesse: gradual, 18-24 month volumisation
    'thread-lift':         2, // tissue repositioning creates apparent volume
  },
  'Skin texture & pores': {
    'microneedling':       5, // strongest evidence for dermal remodelling
    'chemical-peels':      4, // exfoliation reduces pore appearance and surface texture
    'collagen-stimulator': 2, // deep dermal architecture improvement over time
  },
  'Pigmentation & dark spots': {
    'chemical-peels':  5, // primary: TCA, Jessner's, glycolic for pigmentation
    'microneedling':   3, // enhances brightening serum penetration; effective for PIH
  },
  'Acne & scarring': {
    'microneedling':   5, // gold standard for atrophic/rolling/boxcar acne scars
    'chemical-peels':  4, // salicylic for active acne; Jessner's for PIH marks
    'dermal-fillers':  1, // narrow: isolated deep ice-pick scars (subcision adjunct)
  },
  'Sagging & jowls': {
    'thread-lift':         5, // primary: mechanical repositioning of sagging tissue
    'collagen-stimulator': 4, // subdermal scaffold restoration, long-lasting
    'dermal-fillers':      3, // midface volumisation creates apparent jowl improvement
    'wrinkle-relaxing':    2, // Nefertiti lift (platysma), depressor anguli oris
    'microneedling':       1, // incidental surface tightening only
  },
};

/* ── Area → treatment clinical weights ───────────────────────────────
   NOTE: dermal-fillers intentionally EXCLUDED from 'Forehead' —
   supratrochlear/supraorbital vessels create a vascular danger zone
   where filler injection carries real risk of visual compromise.
   ──────────────────────────────────────────────────────────────────── */
const AREA_WEIGHTS: Record<string, Record<string, number>> = {
  'Forehead': {
    'wrinkle-relaxing': 5, // horizontal lines, glabellar complex — gold standard
    'chemical-peels':   3, // sun damage and superficial texture
    'microneedling':    2, // texture refinement
  },
  "Eyes & crow's feet": {
    'wrinkle-relaxing': 5, // crow's feet are the textbook botulinum indication
    'dermal-fillers':   3, // tear trough hollowing (high-skill, secondary)
  },
  'Lips & mouth': {
    'lip-fillers':      5, // primary augmentation, border definition, symmetry
    'wrinkle-relaxing': 4, // lip flip, perioral rhytids
    'dermal-fillers':   4, // nasolabial folds, marionette lines
  },
  'Cheeks & midface': {
    'dermal-fillers':      5, // malar augmentation, immediate mid-face volume
    'collagen-stimulator': 5, // Sculptra excels in midface — gradual, natural
    'thread-lift':         4, // mid-face repositioning (SMAS layer)
  },
  'Jawline & chin': {
    'dermal-fillers':   5, // chin projection, mandibular angle, jaw sharpening
    'thread-lift':      5, // jowl lifting, lower-face definition
    'wrinkle-relaxing': 4, // masseter reduction (jaw slimming), mentalis dimpling
  },
  'Neck & decollete': {
    'thread-lift':         5, // Nefertiti lift — primary non-surgical neck treatment
    'wrinkle-relaxing':    4, // platysmal bands, horizontal necklace lines
    'collagen-stimulator': 4, // skin quality and laxity improvement in decollete
    'chemical-peels':      2, // sun damage and pigmentation on decollete
  },
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

  // Priority multipliers: earlier concerns carry more clinical weight
  const PRIORITY = [1.5, 1.25]; // index 0 -> 1.5x, index 1 -> 1.25x, rest -> 1.0x

  concerns.forEach((concern, idx) => {
    const weights = CONCERN_WEIGHTS[concern] ?? {};
    const multiplier = PRIORITY[idx] ?? 1.0;
    for (const [id, weight] of Object.entries(weights)) {
      add(id, weight * multiplier, concern);
    }
  });

  // Normalise area key for neck/decollete to handle the special character
  areas.forEach((area) => {
    const key = area === 'Neck & décolleté' ? 'Neck & decollete' : area;
    const weights = AREA_WEIGHTS[key] ?? {};
    for (const [id, weight] of Object.entries(weights)) {
      add(id, weight, undefined, area);
    }
  });

  // Injectable preference handling
  const INJECTABLE_IDS = ['wrinkle-relaxing', 'dermal-fillers', 'lip-fillers', 'collagen-stimulator', 'thread-lift'];
  if (injectable === 'Prefer non-injectable') {
    // All 5 involve needles or sutures — hard exclude
    for (const id of INJECTABLE_IDS) {
      const e = scores.get(id);
      if (e) e.score = -99;
    }
  } else if (injectable === 'Not sure yet') {
    // Gently de-emphasise injectables for undecided patients
    for (const id of INJECTABLE_IDS) {
      const e = scores.get(id);
      if (e) e.score *= 0.9;
    }
  }

  const ranked = Array.from(scores.entries())
    .filter(([, e]) => e.score > 0)
    .sort((a, b) => b[1].score - a[1].score)
    .slice(0, 4);

  const maxScore = ranked[0]?.[1]?.score ?? 1;
  const hasEnoughSignal = concerns.length >= 2;

  const result: TreatmentRec[] = [];
  for (const [id, e] of ranked) {
    const treatment = TREATMENTS.find((t) => t.id === id);
    if (!treatment) continue;

    // Scale 72-100%; guarantee >=97% for top pick when signal is strong
    let matchPct = Math.round(72 + (e.score / maxScore) * 28);
    if (result.length === 0 && hasEnoughSignal && matchPct < 97) matchPct = 97;

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

  const concerns   = sp.concerns  ? sp.concerns.split(',').map((c) => decodeURIComponent(c.trim()))  : [];
  const areas      = sp.areas     ? sp.areas.split(',').map((a) => decodeURIComponent(a.trim()))     : [];
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
