// Conversion-focused content for the dedicated /snatch-your-jawline funnel
// (components/packages/SnatchJawlinePage.tsx). Reuses images, testimonials and
// FAQ from the shared package entry so copy stays DRY; adds the CRO-specific
// hero/value-stack/urgency/SEO fields the restructured page needs.

import { PACKAGES } from "@/lib/packages";

const base = PACKAGES["snatch-your-jawline"];
const J = "/assets/packages/jawline";

// Real CTA targets (mirrors lib/packages.ts).
export const FRESHA_BOOK = base.bookHref; // Fresha "book directly" secondary path
export const PRODUCT_HREF = base.faqHref;

export type IncludedItem = { label: string; value: string };
export type Benefit = { icon: string; title: string; desc: string };
export type ExpectCol = { label: string; img: string; points: string[] };
export type Stat = { metric: string; value: string };
export type Faq = { q: string; a: string };
export type Testimonial = { img: string; quote: string; name: string };
export type RecCard = { label: string; img: string; href: string };

// Parse "Fat-Dissolving Injection (€150 value)" -> { label, value } for a clean value stack.
function splitIncluded(raw: string): IncludedItem {
  const m = raw.match(/^(.*?)\s*\((€[\d.,]+)[^)]*\)\s*$/);
  if (m) return { label: m[1].trim(), value: m[2] };
  return { label: raw.trim(), value: "" };
}

export const JAWLINE = {
  slug: "snatch-your-jawline",
  treatmentName: "Snatch Your Jawline",

  // ---- SEO ----
  seo: {
    metaTitle: "Snatch Your Jawline — Non-Surgical Jawline Sculpting €149 | Carisma Aesthetics Malta",
    metaDescription:
      "Melt under-chin fat and redefine your jawline without surgery or downtime. Visible from the first session. Limited-time package €149 (value €400) at Malta's #1 voted med-aesthetics clinic.",
    ogImage: `${J}/hero-video-poster.jpg`,
    canonical: "https://www.carismaaesthetics.com/snatch-your-jawline",
    rating: { value: "4.9", count: "200" },
  },

  // ---- HERO ----
  hero: {
    eyebrow: "NON-SURGICAL JAWLINE CONTOURING · ST JULIAN'S, MALTA",
    title: "Snatch Your Jawline",
    subhead:
      "Melt the stubborn under-chin fat, lift the sagging, and bring back a sharp, defined profile — no surgery, no downtime, visible from your very first session.",
    poster: `${J}/hero-video-poster.jpg`,
    video: `${J}/hero-video.mp4`,
    posterRatio: base.hero.posterRatio ?? "317 / 394",
    priceWas: "€400",
    priceNow: "€149",
    save: "€251",
    includedTitle: "What's included in your package",
    included: base.hero.included.map(splitIncluded),
    totalValue: "€400",
    urgency:
      "Offer is limited to availability — once this month's places are filled, the regular €400 price applies.",
    cta: "Claim my €149 spot",
    bookDirect: "Prefer to book directly? Reserve on Fresha",
    trustBadges: ["Malta's leading wellness chain", "30+ years of expertise", "Medically qualified"],
  },

  // ---- PROBLEM / AGITATION ----
  emotional: {
    heading: "SO YOUR JAWLINE TURNS HEADS — NATURALLY.",
    paras: base.emotional!.paras,
    image: `${J}/so-jawline.png`,
  },

  // ---- WHY IT WORKS (benefits) ----
  benefits: {
    heading: "WHY IT WORKS",
    subtitle: "A medical-grade combination that melts fat and tightens skin in one visit.",
    items: base.trusted!.benefits as Benefit[],
  },

  // ---- PROOF: before/after + stats (brand tabs intentionally removed) ----
  redefined: {
    heading: "YOUR JAWLINE — REDEFINED.",
    subtitle: "See how the treatment lifts, tightens and sculpts for lasting definition.",
    bullets: base.redefined!.bullets,
    image: `${J}/redefined.png`,
    stats: base.redefined!.stats as Stat[],
  },

  // ---- TESTIMONIALS ----
  testimonialsHeading: "REAL CLIENTS. REAL RESULTS.",
  testimonials: base.testimonials as Testimonial[],

  // ---- IDENTITY ----
  createdFor: {
    heading: "CREATED FOR WOMEN WHO REFUSE TO COMPROMISE ON THEIR CONFIDENCE.",
    reasons: base.createdFor!.reasons,
    image: `${J}/created-women.jpg`,
  },

  // ---- WHAT TO EXPECT ----
  expect: {
    heading: "What to expect — before, during & after",
    cols: base.expect!.cols as ExpectCol[],
  },

  // ---- OFFER RECAP ----
  offer: {
    heading: "SECURE YOUR EXCLUSIVE JAWLINE SCULPTING OFFER",
    paras: base.offer!.paras,
    image: `${J}/offer-laser.jpg`,
    imageRatio: base.offer!.imageRatio ?? "489 / 549",
  },

  // ---- FAQ ----
  faq: base.faq.filter((f): f is Faq => Boolean(f.a)),

  // ---- WHY CARISMA ----
  whyCarisma: [
    "Team of highly trained and medically qualified practitioners",
    "Central and discreet St Julian's location",
    "Flexible scheduling and booking",
    "Personalised treatment plans",
    "Advanced treatments with cutting-edge technology",
  ],

  // ---- RECOMMENDED ----
  recommended: {
    heading: "recommended with fat dissolving",
    cards: base.recommended.cards as RecCard[],
  },

  // ---- PRESS ----
  press: [
    { src: `${J}/press-lovin.jpg`, alt: "Lovin Malta" },
    { src: `${J}/press-maltadaily.jpg`, alt: "Malta Daily" },
    { src: `${J}/press-bay.jpg`, alt: "89.7 Bay" },
    { src: `${J}/press-times.png`, alt: "Times of Malta" },
    { src: `${J}/press-mttoday.png`, alt: "Malta Today" },
  ],
};

export type JawlineContent = typeof JAWLINE;
