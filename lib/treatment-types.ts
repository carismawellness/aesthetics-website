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
    /** direct Fresha booking URL for the primary hero/sticky CTA (opens in a new
     *  tab, bypassing the consultation popup). Falls back to the Aesthetics
     *  all-services Fresha page when unset. */
    bookHref?: string;
    image?: string;
    imageRatio?: string;
    bgImage?: string;
    /** CSS background value for hero card shown without any white overlay (e.g. a light-colored image) */
    heroBgColor?: string;
    /** mp4 path shown in the hero right column instead of a still image */
    heroVideo?: string;
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
  /** guarantee / risk-reversal band (rendered by treatment/GuaranteeBand) */
  guarantee?: {
    kicker?: string;
    title: string;
    paragraphs: string[];
    cta?: string;
    /** optional 3 proof pillars */
    points?: { value?: string; label: string; sub?: string }[];
    beforeAfter?: string[];
    beforeAfterTitle?: string;
  };
  /** trust/stats bar shown directly under the hero */
  stats?: { value: string; label: string }[];
  /** "what it does / won't do" expectation-setting grid */
  clarity?: { kicker?: string; title?: string; sub?: string; does: string[]; doesnt: string[] };
  /** client testimonial / review cards */
  reviews?: { kicker?: string; title?: string; sub?: string; items: { name: string; quote: string; rating?: number; image?: string; location?: string }[] };
  /** doctor-led profile */
  doctor?: { kicker?: string; heading?: string; name: string; title: string; credentials?: string[]; image: string; quote?: string; bio?: string[] };
  /** clinical-evidence cards */
  evidence?: { kicker?: string; title?: string; sub?: string; items: { tag?: string; title: string; whatItDoes: string; keyResults: string; image?: string; source?: string }[] };
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
  /** empathetic problem-reframe section (rendered by treatment/ProblemReframe) */
  problem?: { kicker?: string; title: string; body?: string[]; points?: { title: string; desc: string }[] };
  suitability?: { title: string; intro?: string; suitableFor?: string[]; notIdeal?: string[]; personas?: { title: string; desc: string }[] };
  experience?: { title: string; steps: Step[]; cta?: string };
  prepAftercare?: { kicker?: string; title: string; intro?: string; cards: { icon?: string; label: string; lead: string; points: string[] }[] };
  patientVideos?: { title: string; intro?: string; videos: string[] };
  trusted?: { title: string; subtitle?: string; asSeenOn?: string[]; images: string[]; points: { title: string; desc: string }[] };
  difference?: { kicker?: string; title: string; commitmentTitle: string; commitment: string[]; whyTitle: string; why: string[]; mapQuery: string };
  bookingForm?: { title: string };
  /** offer-stack / plan-summary section (rendered by treatment/PlanSummary) */
  planSummary?: {
    kicker?: string;
    title: string;
    benefits: { icon?: "target" | "chart" | "value" | "shield" | "clock" | "sparkle"; title: string; desc: string }[];
    included: { label: string; value?: string }[];
    totalValue?: string;
    price?: string;
    priceLabel?: string;
    cta: { text: string; href: string; external?: boolean };
    reviews?: string;
  };
  recommended?: { title: string; items: { label: string; href: string; image: string }[] };
  /** small kicker above the FAQ heading (e.g. "hair loss treatment FAQs") */
  faqKicker?: string;
  /** treatment-specific FAQ heading (falls back to "Frequently Asked Questions") */
  faqTitle?: string;
  faq?: { q: string; a: string }[];
  /** true when full content has not yet been extracted from the live page */
  pending?: boolean;
};
