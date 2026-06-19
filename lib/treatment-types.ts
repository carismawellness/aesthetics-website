// Shared treatment-content types. Each lib/treatments/<slug>.ts data module
// exports one Treatment consumed by the registry in lib/treatments.ts.

export type PriceItem = { label: string; price: string };
export type InfoItem = { metric: string; detail: string };
export type AreaItem = { name: string; desc: string; zone?: string; icon?: string };
export type Step = { title: string; desc: string; image?: string };
export type BeforeAfter = { before: string; after: string; label?: string };

export type Treatment = {
  slug: string;
  category: "Face" | "Body" | "Package";
  hero: {
    title: string;
    subtitle?: string;
    body?: string;
    /** teal-dot benefit bullets shown under the hero copy (e.g. laser hair removal) */
    benefits?: string[];
    /** small disclaimer line beneath the hero CTA */
    note?: string;
    /** location strapline shown under the hero body */
    location?: string;
    prices?: PriceItem[];
    cta?: string;
    image?: string;
    imageRatio?: string;
    bgImage?: string;
    /** CSS background value for hero card shown without any white overlay (e.g. a light-colored image) */
    heroBgColor?: string;
    /** brand tabs under the hero image; entries starting with "/" render as logo images */
    productTabs?: string[];
    /** brand logo row rendered between the hero image and the treatment-info card */
    brandLogos?: string[];
    heroForm?: boolean;
  };
  info?: InfoItem[];
  /** "what is all the hype?" educational block with optional diagram + suitability chart */
  education?: {
    title: string;
    subtitle?: string;
    paragraphs: string[];
    image?: string;
    imageCaption?: string;
    chart?: string;
    chartCaption?: string;
  };
  /** guarantee band + before/after composite slideshow */
  guarantee?: {
    title: string;
    paragraphs: string[];
    cta?: string;
    beforeAfter?: string[];
    beforeAfterTitle?: string;
  };
  /** standalone pricing grid rendered after the process timeline */
  pricingGrid?: { title: string; intro?: string; items: { name: string; price: string; desc: string }[] };
  /** membership tier cards (Bronze / Silver / Gold) */
  membership?: {
    title: string;
    intro?: string;
    tiers: { image: string; name: string; sessions: string; price: string }[];
  };
  beforeAfterTitle?: string;
  beforeAfter?: BeforeAfter[];
  precision?: { title: string; intro?: string; areas?: AreaItem[]; additional?: string; additionalTitle?: string; additionalIntro?: string };
  suitability?: { title: string; intro?: string; suitableFor?: string[]; notIdeal?: string[] };
  experience?: { title: string; steps: Step[]; cta?: string };
  prepAftercare?: { kicker?: string; title: string; intro?: string; cards: { icon?: string; label: string; lead: string; points: string[] }[] };
  patientVideos?: { title: string; intro?: string; videos: string[] };
  trusted?: { title: string; subtitle?: string; asSeenOn?: string[]; images: string[]; points: { title: string; desc: string }[] };
  difference?: { kicker?: string; title: string; commitmentTitle: string; commitment: string[]; whyTitle: string; why: string[]; mapQuery: string };
  bookingForm?: { title: string };
  recommended?: { title: string; items: { label: string; href: string; image: string }[] };
  /** small kicker above the FAQ heading (e.g. "hair loss treatment FAQs") */
  faqKicker?: string;
  /** treatment-specific FAQ heading (falls back to "Frequently Asked Questions") */
  faqTitle?: string;
  faq?: { q: string; a: string }[];
  /** true when full content has not yet been extracted from the live page */
  pending?: boolean;
};
