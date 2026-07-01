// Face Treatments section — ORIGINAL content (not copied from the live site or lib/treatments.ts).
// Additive + namespaced: powers /face-treatments (listing) and /face-treatments/[slug] (detail).
// Each treatment is a self-contained, editable record; the detail template renders a section
// only when its data is present, so treatments can carry as much or as little as needed.

export type InfoStat = { label: string; value: string };
export type Area = { label: string; blurb: string };
export type Step = { n: number; label: string; text: string };
export type BeforeAfter = { before: string; after: string; label?: string };
export type Faq = { q: string; a: string };

export type FaceTreatment = {
  slug: string;
  name: string;
  category: "Face";
  tagline: string;        // 1-line listing-card descriptor
  eyebrow: string;        // hero trust line
  heroSubhead: string;    // hero paragraph
  heroImage: string;
  cardImage: string;
  infoStats: InfoStat[];
  beforeAfter?: BeforeAfter[];
  areas: Area[];
  suitability: { ideal: string[]; notIdeal: string[] };
  steps?: Step[];
  prep?: { before: string; during: string; after: string };
  benefits?: string[];
  commitments?: string[];
  trustLogos?: string[];
  faqs: Faq[];
  recommended: string[];
};

const T = "/assets/treatments";

// ---- Shared, reusable scaffolding (original copy) ----
const STEPS: Step[] = [
  { n: 1, label: "Consultation", text: "We start by listening. A practitioner reviews your medical history, studies your facial proportions and agrees a realistic, honest plan with you, no pressure to proceed." },
  { n: 2, label: "The treatment", text: "Your session is carried out in a calm, clinical setting using premium products and a technique mapped precisely to your anatomy and the result you want." },
  { n: 3, label: "Aftercare", text: "You leave with clear, written guidance and direct access to the team. Most clients return to normal life the same day with only simple precautions to follow." },
  { n: 4, label: "Review", text: "We see you again to assess how your skin has responded, refine if needed and plan the cadence that keeps your result looking effortless over time." },
];

const PREP = {
  before: "Arrive with clean skin and avoid blood-thinning supplements, alcohol and intensive actives for 24–48 hours so your skin is calm and predictable.",
  during: "Relax, sessions are short and comfortable. We use numbing where helpful and check in with you throughout so you stay informed and at ease.",
  after: "Keep the area clean, skip heat, heavy exercise and makeup for the advised window, and hydrate. Any redness typically settles quickly.",
};

const BENEFITS = [
  "Carried out by medically qualified, experienced practitioners",
  "A plan mapped to your individual facial anatomy, never a fixed protocol",
  "Premium, clinically proven products and devices only",
  "Refined, natural-looking results that still look like you",
  "Considered aftercare with ongoing review and support",
];

const COMMITMENTS = [
  "A measured, doctor-led approach rather than a one-size formula",
  "Straight answers about what will, and won't, make a difference",
  "Subtle enhancement that protects your natural expression",
  "Care that continues well beyond the appointment itself",
];

const PRESS = "/assets/packages/jawline";
const TRUST = [`${PRESS}/press-times.png`, `${PRESS}/press-lovin.jpg`, `${PRESS}/press-maltadaily.jpg`, `${PRESS}/press-bay.jpg`, `${PRESS}/press-mttoday.png`];

const SHARED = { steps: STEPS, prep: PREP, benefits: BENEFITS, commitments: COMMITMENTS, trustLogos: TRUST };

// ---- The treatments ----
export const faceTreatments: FaceTreatment[] = [
  {
    slug: "dermal-fillers",
    name: "Dermal Fillers",
    category: "Face",
    tagline: "Restore lost volume and redefine contour with soft, natural results.",
    eyebrow: "Premium injectable artistry",
    heroSubhead: "A refined way to replace the volume that time quietly removes, lifting the cheeks, smoothing folds and rebalancing proportion so your face looks rested, not reworked.",
    heroImage: `${T}/dermal-fillers-malta-hero.png`,
    cardImage: "/assets/treatments/dermal-fillers-malta-hero.png",
    infoStats: [
      { label: "Procedure time", value: "30–45 minutes" },
      { label: "Downtime", value: "Minimal" },
      { label: "Results last", value: "9–18 months" },
      { label: "Visible in", value: "Immediately" },
      { label: "Anaesthetic", value: "Topical numbing" },
    ],
    beforeAfter: [{ before: `${T}/dermal-fillers-malta-ba1-before.png`, after: `${T}/dermal-fillers-malta-ba1-after.png` }],
    areas: [
      { label: "Cheeks", blurb: "Rebuild mid-face support for a lifted, youthful curve." },
      { label: "Jawline", blurb: "Sharpen definition and restore a clean lower-face line." },
      { label: "Nasolabial folds", blurb: "Soften the lines that run from nose to mouth." },
      { label: "Tear troughs", blurb: "Reduce shadowing and tired-looking hollows under the eyes." },
    ],
    suitability: {
      ideal: ["You notice flattening or sagging in the cheeks or mid-face", "You want to soften folds without surgery", "You prefer gradual, controllable enhancement", "You are in good general health"],
      notIdeal: ["You are pregnant or breastfeeding", "You have an active skin infection in the area", "You are seeking dramatic, surgical-scale change"],
    },
    faqs: [
      { q: "Will dermal fillers look obvious?", a: "Not when placed conservatively. We build volume gradually and review proportion as we go, so the result reads as a well-rested version of you rather than an altered face." },
      { q: "Is the treatment painful?", a: "Most people describe mild pressure. We apply topical numbing and use products containing anaesthetic, so the experience is comfortable for the vast majority of clients." },
      { q: "How long until I see the final result?", a: "You will see an immediate change, with the final, settled result visible after any minor swelling resolves over the following one to two weeks." },
    ],
    recommended: ["lip-fillers", "collagen-stimulator", "wrinkle-relaxing"],
    ...SHARED,
  },
  {
    slug: "microneedling",
    name: "Microneedling",
    category: "Face",
    tagline: "Stimulate your own collagen to refine texture, pores and scarring.",
    eyebrow: "Collagen induction therapy",
    heroSubhead: "A controlled, regenerative treatment that prompts your skin to rebuild itself, smoothing texture, softening scarring and restoring a healthy, even glow from within.",
    heroImage: `${T}/microneedling-malta-hero.png`,
    cardImage: "/assets/treatments/microneedling-malta-hero.png",
    infoStats: [
      { label: "Procedure time", value: "45–60 minutes" },
      { label: "Downtime", value: "24–48 hours" },
      { label: "Results last", value: "Builds over months" },
      { label: "Visible in", value: "2–4 weeks" },
      { label: "Anaesthetic", value: "Topical numbing" },
    ],
    beforeAfter: [{ before: `${T}/microneedling-malta-ba1-before.png`, after: `${T}/microneedling-malta-ba1-after.png` }],
    areas: [
      { label: "Acne scarring", blurb: "Gradually fill and smooth indented marks." },
      { label: "Enlarged pores", blurb: "Refine surface texture for a smoother finish." },
      { label: "Fine lines", blurb: "Encourage firmer, more resilient skin." },
      { label: "Dull tone", blurb: "Reawaken radiance and a healthier complexion." },
    ],
    suitability: {
      ideal: ["You want to improve texture, scarring or pores", "You prefer a natural, build-over-time result", "You are comfortable with short, mild downtime", "You want to boost how well your skincare works"],
      notIdeal: ["You have active acne or a skin infection", "You are prone to keloid scarring", "You need an instant, single-session result"],
    },
    faqs: [
      { q: "How many sessions will I need?", a: "Most people see the best results from a short course of three to four sessions spaced a few weeks apart, with occasional maintenance afterwards." },
      { q: "What does recovery look like?", a: "Expect a light, sunburn-like flush for a day or two. It settles quickly, and we provide simple aftercare to support smooth healing." },
      { q: "Can it be combined with other treatments?", a: "Yes. It pairs well with bio-stimulating and hydration treatments, we will suggest the right sequence during your consultation." },
    ],
    recommended: ["chemical-peels", "collagen-stimulator", "mesotherapy"],
    ...SHARED,
  },
  {
    slug: "chemical-peels",
    name: "Chemical Peels",
    category: "Face",
    tagline: "Resurface the skin to even tone, brighten and refine.",
    eyebrow: "Medical-grade resurfacing",
    heroSubhead: "A tailored exfoliating treatment that lifts away dull, damaged surface cells to reveal fresher, clearer, more even skin underneath, calibrated to your skin and your goals.",
    heroImage: `${T}/chemical-peels-malta-hero.png`,
    cardImage: "/assets/treatments/chemical-peels-malta-hero.png",
    infoStats: [
      { label: "Procedure time", value: "30 minutes" },
      { label: "Downtime", value: "2–7 days" },
      { label: "Results last", value: "Weeks to months" },
      { label: "Visible in", value: "1–2 weeks" },
      { label: "Anaesthetic", value: "None" },
    ],
    beforeAfter: [{ before: `${T}/chemical-peels-malta-ba1-before.jpeg`, after: `${T}/chemical-peels-malta-ba1-after.jpeg` }],
    areas: [
      { label: "Pigmentation", blurb: "Fade sun spots and uneven patches." },
      { label: "Dullness", blurb: "Restore clarity and a luminous finish." },
      { label: "Congestion", blurb: "Clear and refine breakout-prone skin." },
      { label: "Fine texture", blurb: "Soften the look of fine lines and roughness." },
    ],
    suitability: {
      ideal: ["You have uneven tone, pigmentation or dullness", "You want a clearer, brighter complexion", "You can avoid sun exposure during recovery", "You are looking for a reset before an event"],
      notIdeal: ["You have very sensitive or compromised skin", "You are using certain prescription actives", "You cannot commit to diligent sun protection"],
    },
    faqs: [
      { q: "Will my skin peel a lot?", a: "It depends on the strength chosen. Lighter peels cause mild flaking; deeper peels more noticeable shedding. We match the depth to your skin and your downtime tolerance." },
      { q: "Is sun protection really necessary?", a: "Absolutely. Freshly resurfaced skin is more vulnerable, so daily SPF is essential to protect your result and prevent new pigmentation." },
      { q: "How often can I have a peel?", a: "Lighter peels can be repeated every few weeks as a course; stronger peels are spaced further apart. We will map a sensible schedule for you." },
    ],
    recommended: ["microneedling", "mesotherapy", "dermal-fillers"],
    ...SHARED,
  },
  {
    slug: "lip-fillers",
    name: "Lip Fillers",
    category: "Face",
    tagline: "Define, hydrate and balance with a result that looks like you.",
    eyebrow: "Subtle lip enhancement",
    heroSubhead: "Considered enhancement that respects your natural shape, adding definition, hydration and balance without ever tipping into overdone.",
    heroImage: `${T}/lip-fillers-malta-hero.png`,
    cardImage: "/assets/treatments/lip-fillers-malta-hero.png",
    infoStats: [
      { label: "Procedure time", value: "30 minutes" },
      { label: "Downtime", value: "1–3 days" },
      { label: "Results last", value: "6–12 months" },
      { label: "Visible in", value: "Immediately" },
      { label: "Anaesthetic", value: "Topical numbing" },
    ],
    beforeAfter: [{ before: `${T}/lip-fillers-malta-ba1-before.jpg`, after: `${T}/lip-fillers-malta-ba1-after.jpg` }],
    areas: [
      { label: "Definition", blurb: "Refine the border for a crisper lip line." },
      { label: "Volume", blurb: "Add subtle fullness in proportion to your face." },
      { label: "Symmetry", blurb: "Gently balance uneven upper and lower lips." },
      { label: "Hydration", blurb: "Improve smoothness and a healthy sheen." },
    ],
    suitability: {
      ideal: ["You want subtle, natural definition", "Your lips have thinned over time", "You would like to balance asymmetry", "You prefer a build-slowly approach"],
      notIdeal: ["You are pregnant or breastfeeding", "You have an active cold sore", "You are seeking an extreme, oversized look"],
    },
    faqs: [
      { q: "Can the result look natural?", a: "Yes, natural balance is the whole point. We add conservatively and keep proportion to your face front of mind, so the result enhances rather than announces itself." },
      { q: "Does it hurt?", a: "We use numbing and gentle technique. Most clients find it very manageable, with brief tenderness afterwards." },
      { q: "What if I do not like it?", a: "Hyaluronic-acid lip filler is adjustable and, if ever needed, dissolvable, which is exactly why it is a reassuring, low-commitment choice." },
    ],
    recommended: ["dermal-fillers", "wrinkle-relaxing", "collagen-stimulator"],
    ...SHARED,
  },
  {
    slug: "collagen-stimulator",
    name: "Collagen Stimulator",
    category: "Face",
    tagline: "A gradual, structural lift that rebuilds firmness from within.",
    eyebrow: "Bio-stimulating regeneration",
    heroSubhead: "Rather than simply filling, this treatment prompts your skin to produce its own new collagen, restoring firmness and structure slowly, for a result that looks entirely your own.",
    heroImage: `${T}/collagen-stimulator-malta-hero.png`,
    cardImage: "/assets/treatments/collagen-stimulator-malta-hero.png",
    infoStats: [
      { label: "Procedure time", value: "45 minutes" },
      { label: "Downtime", value: "Minimal" },
      { label: "Results last", value: "18–24 months" },
      { label: "Visible in", value: "6–8 weeks" },
      { label: "Anaesthetic", value: "Topical numbing" },
    ],
    beforeAfter: [{ before: `${T}/collagen-stimulator-malta-ba1-before.jpg`, after: `${T}/collagen-stimulator-malta-ba1-after.jpg` }],
    areas: [
      { label: "Mid-face", blurb: "Rebuild gentle, supportive structure." },
      { label: "Skin laxity", blurb: "Improve firmness and bounce over time." },
      { label: "Crepiness", blurb: "Strengthen thin, lined skin." },
      { label: "Overall tone", blurb: "Restore a healthier, denser quality." },
    ],
    suitability: {
      ideal: ["You want a natural, gradual improvement", "You are starting to notice laxity or thinning", "You prefer regeneration over instant filling", "You are happy to wait weeks for the full effect"],
      notIdeal: ["You need an immediate, event-ready change", "You have an active skin infection", "You are pregnant or breastfeeding"],
    },
    faqs: [
      { q: "How is this different from filler?", a: "Filler replaces volume directly and instantly. A collagen stimulator works underneath to encourage your own new collagen, so the lift builds gradually and tends to last longer." },
      { q: "When will I see results?", a: "Because it relies on your body's own response, improvement appears over six to eight weeks and continues to develop across the course." },
      { q: "How many sessions are needed?", a: "Typically a short course spaced several weeks apart, tailored to your skin during consultation." },
    ],
    recommended: ["dermal-fillers", "microneedling", "thread-lift"],
    ...SHARED,
  },
  {
    slug: "wrinkle-relaxing",
    name: "Wrinkle Relaxing",
    category: "Face",
    tagline: "Soften dynamic lines while keeping natural expression.",
    eyebrow: "Anti-wrinkle injectables",
    heroSubhead: "A precise, well-judged treatment that eases the lines created by movement, frown, forehead and crow's feet, while leaving your expression relaxed and entirely your own.",
    heroImage: `${T}/wrinkle-relaxing-malta-hero.jpg`,
    cardImage: "/assets/treatments/wrinkle-relaxing-malta-hero.jpg",
    infoStats: [
      { label: "Procedure time", value: "15–20 minutes" },
      { label: "Downtime", value: "None" },
      { label: "Results last", value: "3–4 months" },
      { label: "Visible in", value: "3–7 days" },
      { label: "Anaesthetic", value: "None" },
    ],
    beforeAfter: [{ before: `${T}/wrinkle-relaxing-malta-ba1-before.png`, after: `${T}/wrinkle-relaxing-malta-ba1-after.png` }],
    areas: [
      { label: "Frown lines", blurb: "Smooth the vertical lines between the brows." },
      { label: "Forehead", blurb: "Soften horizontal lines while keeping movement." },
      { label: "Crow's feet", blurb: "Ease the creases at the outer eyes." },
      { label: "Brow lift", blurb: "Gently open and freshen the upper face." },
    ],
    suitability: {
      ideal: ["You want to soften expression lines", "You prefer a quick, no-downtime treatment", "You would like a subtle, natural result", "You are in good general health"],
      notIdeal: ["You are pregnant or breastfeeding", "You have certain neuromuscular conditions", "You want zero movement, frozen look"],
    },
    faqs: [
      { q: "Will my face look frozen?", a: "Not with our approach. We dose conservatively to soften lines while preserving natural movement, so you still look expressive, just more rested." },
      { q: "How soon does it work?", a: "Most people notice softening within three to seven days, with the full effect by around two weeks." },
      { q: "How long does it last?", a: "Typically three to four months. Regular, well-spaced treatment can make lines less pronounced over time." },
    ],
    recommended: ["dermal-fillers", "lip-fillers", "microneedling"],
    ...SHARED,
  },
  {
    slug: "mesotherapy",
    name: "Mesotherapy",
    category: "Face",
    tagline: "Micro-infusions of vitamins and hydration for visible glow.",
    eyebrow: "Skin nutrition & glow",
    heroSubhead: "A nourishing treatment that delivers a bespoke blend of vitamins, antioxidants and hyaluronic acid directly into the skin, reviving radiance, hydration and tone.",
    heroImage: `${T}/mesotherapy-malta-hero.png`,
    cardImage: "/assets/treatments/mesotherapy-malta-hero.png",
    infoStats: [
      { label: "Procedure time", value: "30–45 minutes" },
      { label: "Downtime", value: "Minimal" },
      { label: "Results last", value: "Cumulative" },
      { label: "Visible in", value: "2–3 weeks" },
      { label: "Anaesthetic", value: "Optional numbing" },
    ],
    areas: [
      { label: "Dehydration", blurb: "Replenish moisture for plumper skin." },
      { label: "Dullness", blurb: "Reawaken a luminous, healthy glow." },
      { label: "Fine lines", blurb: "Support softer, more supple skin." },
      { label: "Tired skin", blurb: "Revive stressed, lacklustre complexions." },
    ],
    suitability: {
      ideal: ["Your skin looks tired, dry or dull", "You want a natural radiance boost", "You prefer gradual, cumulative results", "You want to prep skin before an event"],
      notIdeal: ["You have an active skin infection", "You are pregnant or breastfeeding", "You expect a single-session transformation"],
    },
    faqs: [
      { q: "What is in the infusion?", a: "A tailored cocktail, typically hyaluronic acid, vitamins and antioxidants, selected for your skin's specific needs at the time of treatment." },
      { q: "Is there downtime?", a: "Minimal. You may see tiny temporary marks or mild redness that settle within a day, after which your glow develops over the following weeks." },
      { q: "How many sessions are best?", a: "A short initial course gives the most noticeable lift, followed by occasional top-ups to maintain radiance." },
    ],
    recommended: ["microneedling", "chemical-peels", "collagen-stimulator"],
    ...SHARED,
  },
  {
    slug: "thread-lift",
    name: "Thread Lift",
    category: "Face",
    tagline: "A non-surgical lift that redefines contour and firmness.",
    eyebrow: "Non-surgical lifting",
    heroSubhead: "Dissolvable threads gently reposition and support softening tissue, restoring a lifted, defined contour, and stimulating fresh collagen as they work, without surgery or lengthy recovery.",
    heroImage: `${T}/thread-lift-malta-hero.avif`,
    cardImage: "/assets/treatments/thread-lift-malta-hero.avif",
    infoStats: [
      { label: "Procedure time", value: "45–60 minutes" },
      { label: "Downtime", value: "3–7 days" },
      { label: "Results last", value: "12–18 months" },
      { label: "Visible in", value: "Immediately" },
      { label: "Anaesthetic", value: "Local anaesthetic" },
    ],
    areas: [
      { label: "Jawline", blurb: "Redefine a softening lower-face line." },
      { label: "Cheeks", blurb: "Reposition and lift mid-face support." },
      { label: "Brows", blurb: "Subtly raise and open the upper face." },
      { label: "Neck", blurb: "Improve definition along the neck and jaw." },
    ],
    suitability: {
      ideal: ["You notice mild to moderate sagging", "You want lift without surgery or general anaesthetic", "You prefer a result that also builds collagen", "You can allow a few days of recovery"],
      notIdeal: ["You have very advanced skin laxity", "You have an active infection in the area", "You are pregnant or breastfeeding"],
    },
    faqs: [
      { q: "Is a thread lift surgery?", a: "No. It is a minimally invasive treatment performed under local anaesthetic, with no incisions and a far shorter recovery than surgical lifting." },
      { q: "Are the threads permanent?", a: "The threads themselves dissolve over months, but they leave behind newly stimulated collagen that helps maintain the lifted contour." },
      { q: "What is recovery like?", a: "Expect some tightness, swelling or bruising for a few days. Most people return to normal activities within a week, following simple aftercare." },
    ],
    recommended: ["collagen-stimulator", "dermal-fillers", "wrinkle-relaxing"],
    ...SHARED,
  },
];

export function getFaceTreatment(slug: string): FaceTreatment | undefined {
  return faceTreatments.find((t) => t.slug === slug);
}

export function faceTreatmentSlugs(): string[] {
  return faceTreatments.map((t) => t.slug);
}

// Listing-page section copy (original).
export const FACE_LISTING = {
  eyebrow: "Face Treatments",
  title: "Considered facial aesthetics, led by medical expertise",
  subhead:
    "A curated range of advanced face treatments, from injectable artistry to skin regeneration, each delivered with a careful, doctor-led approach and a single goal: results that look refined, balanced and unmistakably you.",
  gridHeading: "Advanced Face Treatments: Fillers, Botox & Skin Regeneration in Malta",
};
