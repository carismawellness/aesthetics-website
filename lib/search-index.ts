// Lightweight static search index for the Carisma Aesthetics marketing site.
// Small, curated, and shipped to the client — no backend needed. `keywords`
// carry synonyms / brand terms (e.g. botox -> wrinkle relaxing) so real visitor
// queries resolve to the right page. Entries are derived from the live nav data
// in `lib/site.ts` (FACE_LINKS / BODY_LINKS / PACKAGE_LINKS) plus the evergreen
// top-level routes. Keep in sync when pages change.

export type SearchEntry = {
  title: string;
  url: string;
  description: string;
  keywords: string[];
};

export const SEARCH_INDEX: SearchEntry[] = [
  // ── Conversion / top-level ──────────────────────────────────────────────
  {
    title: 'Free Consultation',
    url: '/consultation',
    description: 'Book your free, doctor-led aesthetics consultation in Malta.',
    keywords: [
      'consultation', 'book', 'booking', 'appointment', 'free consultation',
      'contact', 'phone', 'email', 'location', 'opening hours', 'address',
      'enquiry', 'enquire', 'talk to a doctor',
    ],
  },
  {
    title: 'Face Treatments',
    url: '/face-treatments',
    description: 'Explore every medical face treatment at Carisma Aesthetics Malta.',
    keywords: [
      'face treatments', 'face', 'facial', 'skin', 'anti ageing', 'anti aging',
      'wrinkles', 'fine lines', 'all treatments', 'treatments', 'services',
    ],
  },
  {
    title: 'Membership',
    url: '/membership',
    description: 'Aesthetics membership — exclusive pricing and perks.',
    keywords: [
      'membership', 'member', 'subscription', 'plan', 'monthly', 'loyalty',
      'prices', 'price', 'pricing', 'cost', 'how much',
    ],
  },
  {
    title: 'E-Giftcards & Vouchers',
    url: '/e-giftcards-vouchers',
    description: 'Aesthetics gift cards and vouchers — the perfect glow-up gift.',
    keywords: [
      'gift', 'gifts', 'gift card', 'giftcard', 'gift cards', 'voucher',
      'vouchers', 'e-gift', 'egift', 'present', 'gift voucher',
    ],
  },
  {
    title: 'Blog',
    url: '/blog',
    description: 'Skincare and aesthetics advice from the Carisma team.',
    keywords: ['blog', 'articles', 'news', 'advice', 'guides', 'tips', 'skincare blog'],
  },

  // ── Face treatments (FACE_LINKS) ────────────────────────────────────────
  {
    title: 'Botox',
    url: '/wrinkle-relaxing-malta',
    description: 'Anti-wrinkle injections to soften expression lines.',
    keywords: ['wrinkle', 'wrinkles', 'anti wrinkle', 'wrinkle relaxing', 'botox', 'anti-ageing injections', 'fine lines', 'frown lines', 'forehead', 'crows feet'],
  },
  {
    title: 'Fat Dissolving (Face)',
    url: '/fat-dissolving-malta',
    description: 'Fat dissolving injections for the chin and jawline.',
    keywords: ['fat dissolving', 'fat dissolve', 'aqualyx', 'deoxycholic', 'double chin', 'jawline fat', 'chin fat', 'injections'],
  },
  {
    title: 'Thread Lift',
    url: '/thread-lift-malta',
    description: 'PDO thread lift for a non-surgical lift and contour.',
    keywords: ['thread lift', 'threads', 'pdo', 'non surgical facelift', 'lift', 'contour', 'jowls'],
  },
  {
    title: 'Chemical Peels',
    url: '/chemical-peels-malta',
    description: 'Medical chemical peels for brighter, smoother skin.',
    keywords: ['chemical peel', 'chemical peels', 'peel', 'peels', 'exfoliation', 'pigmentation', 'acne', 'brightening'],
  },
  {
    title: 'Mesotherapy',
    url: '/mesotherapy-malta',
    description: 'Mesotherapy micro-injections to nourish and revitalise skin.',
    keywords: ['mesotherapy', 'meso', 'skin booster', 'hydration', 'glow', 'vitamins'],
  },
  {
    title: 'Dermal Fillers',
    url: '/dermal-fillers-malta',
    description: 'Dermal fillers to restore volume and contour.',
    keywords: ['dermal fillers', 'dermal filler', 'filler', 'fillers', 'cheek filler', 'volume', 'hyaluronic acid', 'ha'],
  },
  {
    title: 'Hair Regrowth',
    url: '/hair-regrowth',
    description: 'Medical hair regrowth treatments for thinning hair.',
    keywords: ['hair regrowth', 'hair loss', 'hair', 'thinning hair', 'baldness', 'regrowth', 'prp hair'],
  },
  {
    title: 'Collagen Stimulator',
    url: '/collagen-stimulator-malta',
    description: 'Collagen-stimulating treatments for firmer skin over time.',
    keywords: ['collagen stimulator', 'collagen', 'collagen boost', 'biostimulator', 'sculptra', 'firming', 'skin firming'],
  },
  {
    title: 'Microneedling',
    url: '/microneedling-malta',
    description: 'Microneedling to refine texture, pores and scars.',
    keywords: ['microneedling', 'micro needling', 'skin needling', 'collagen induction', 'pores', 'scars', 'texture', 'dermapen'],
  },
  {
    title: 'Polynucleotides (Salmon DNA)',
    url: '/polynucleotides-salmon-dna',
    description: 'Polynucleotide skin regeneration (salmon DNA).',
    keywords: ['polynucleotides', 'polynucleotide', 'salmon dna', 'skin regeneration', 'under eye', 'repair'],
  },
  {
    title: 'Profhilo',
    url: '/profhilo',
    description: 'Profhilo bio-remodelling for hydrated, bouncy skin.',
    keywords: ['profhilo', 'bio remodelling', 'bioremodelling', 'skin hydration', 'glow', 'injectable moisturiser'],
  },
  {
    title: 'Lip Fillers',
    url: '/lip-fillers-malta',
    description: 'Natural-looking lip fillers and lip enhancement.',
    keywords: ['lip fillers', 'lip filler', 'lips', 'lip enhancement', 'lip flip', 'plump lips', 'filler'],
  },
  {
    title: 'Hydrafacial',
    url: '/hydrafacial',
    description: 'Hydrafacial deep-cleanse and hydration facial.',
    keywords: ['hydrafacial', 'hydra facial', 'facial', 'deep cleanse', 'hydration', 'glow facial'],
  },
  {
    title: 'PRP — Platelet Rich Plasma',
    url: '/prp-malta',
    description: 'PRP (platelet-rich plasma) for skin and hair rejuvenation.',
    keywords: ['prp', 'platelet rich plasma', 'vampire facial', 'rejuvenation', 'regenerative', 'blood'],
  },

  // ── Body treatments (BODY_LINKS) ────────────────────────────────────────
  {
    title: 'Laser Hair Removal',
    url: '/laser-hair-removal-malta',
    description: 'Medical-grade laser hair removal in Malta.',
    keywords: ['laser hair removal', 'hair removal', 'laser', 'permanent hair removal', 'unwanted hair', 'shaving', 'waxing'],
  },
  {
    title: 'Pico Laser Tattoo Removal',
    url: '/pico-laser-tattoo-removal',
    description: 'Pico laser tattoo removal for clearer skin.',
    keywords: ['tattoo removal', 'pico laser', 'pico', 'remove tattoo', 'laser tattoo', 'ink removal'],
  },
  {
    title: 'Pico Laser Pigmentation',
    url: '/pico-laser-pigmentation-treatment',
    description: 'Pico laser treatment for pigmentation and dark spots.',
    keywords: ['pigmentation', 'pico laser pigmentation', 'dark spots', 'sun spots', 'melasma', 'hyperpigmentation', 'pico'],
  },
  {
    title: 'Medical Weight-Loss',
    url: '/medical-weight-loss',
    description: 'Doctor-supervised medical weight loss in Malta.',
    keywords: ['medical weight loss', 'weight loss', 'lose weight', 'glp-1', 'glp1', 'ozempic', 'wegovy', 'mounjaro', 'semaglutide', 'slimming', 'injections'],
  },
  {
    title: 'Fat Freezing',
    url: '/fat-freezing',
    description: 'Cryolipolysis fat freezing to target stubborn fat.',
    keywords: ['fat freezing', 'freeze fat', 'cryolipolysis', 'cryo', 'coolsculpting', 'fat reduction', 'stubborn fat'],
  },
  {
    title: 'Muscle Stimulation',
    url: '/muscle-stimulation',
    description: 'EMS muscle stimulation to tone and build muscle.',
    keywords: ['muscle stimulation', 'ems', 'emsculpt', 'muscle toning', 'tone', 'abs', 'build muscle'],
  },
  {
    title: 'Skin Tightening',
    url: '/skin-tightening',
    description: 'Radiofrequency skin tightening for firmer skin.',
    keywords: ['skin tightening', 'tighten skin', 'radiofrequency', 'rf', 'firming', 'sagging skin', 'loose skin'],
  },
  {
    title: 'Anti-Cellulite',
    url: '/anti-cellulite',
    description: 'Anti-cellulite treatments to smooth dimpled skin.',
    keywords: ['anti cellulite', 'anti-cellulite', 'cellulite', 'orange peel', 'smoothing', 'dimples', 'thighs'],
  },
  {
    title: 'Lymphatic Drainage',
    url: '/lymphatic-drainage',
    description: 'Lymphatic drainage to reduce fluid retention and bloating.',
    keywords: ['lymphatic drainage', 'lymphatic', 'drainage', 'detox', 'fluid retention', 'bloating', 'water retention', 'massage'],
  },

  // ── Packages (PACKAGE_LINKS) ────────────────────────────────────────────
  {
    title: 'Snatch Your Jawline',
    url: '/snatch-your-jawline',
    description: 'Jawline-sculpting package for a defined contour.',
    keywords: ['snatch your jawline', 'jawline', 'jaw', 'contour', 'package', 'sculpt', 'definition'],
  },
  {
    title: '4 in 1 Hydrafacial Glow',
    url: '/4-in-1-hydrafacial-glow',
    description: '4-in-1 Hydrafacial glow package for radiant skin.',
    keywords: ['4 in 1 hydrafacial', 'hydrafacial glow', 'glow package', 'facial package', 'package', 'glow'],
  },
  {
    title: 'Exosome Glow Lift Package',
    url: '/exosome-glowlift',
    description: 'Exosome glow-lift package for advanced rejuvenation.',
    keywords: ['exosome', 'glow lift', 'glowlift', 'exosomes', 'rejuvenation', 'package'],
  },
  {
    title: 'Ultimate Facelift',
    url: '/ultimate-facelift',
    description: 'Non-surgical ultimate facelift package.',
    keywords: ['ultimate facelift', 'facelift', 'non surgical facelift', 'lift', 'package', 'anti ageing'],
  },
  {
    title: 'Wrinkles & Fine Lines Packages',
    url: '/wrinkles-fine-lines-packages',
    description: 'Combination packages targeting wrinkles and fine lines.',
    keywords: ['wrinkles packages', 'fine lines', 'anti wrinkle package', 'wrinkles', 'package', 'botox package'],
  },
];

/**
 * Rank index entries against a query. Case-insensitive, token-based.
 * Scoring favours title hits, then exact keyword hits, then substring hits.
 */
export function searchSite(query: string, limit = 6): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const tokens = q.split(/\s+/).filter(Boolean);

  const scored = SEARCH_INDEX.map((entry) => {
    const title = entry.title.toLowerCase();
    const kw = entry.keywords;
    const hay = `${title} ${entry.description.toLowerCase()} ${kw.join(' ')}`;
    let score = 0;

    // Whole-query boosts
    if (title === q) score += 100;
    if (title.includes(q)) score += 40;
    if (kw.some((k) => k === q)) score += 60;
    if (kw.some((k) => k.includes(q))) score += 20;

    // Per-token scoring (so "freeze fat" matches "fat freezing")
    for (const t of tokens) {
      if (title.includes(t)) score += 12;
      if (kw.some((k) => k === t)) score += 14;
      else if (kw.some((k) => k.includes(t))) score += 6;
      else if (hay.includes(t)) score += 3;
    }
    return { entry, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.entry);
}
