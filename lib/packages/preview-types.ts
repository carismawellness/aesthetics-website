// Shared contract for the V2 package-template preview (4-in-1 Hydrafacial first).
// Both the CRO content file and the new section components import these types so
// they align without coordination. Additive/isolated — does not touch live code.

export type PreviewStep = { n: number; title: string; desc: string };

export type PreviewContent = {
  /** Offer-led hero copy (rendered via the shared PageHero). */
  hero: {
    eyebrow: string;
    h1: string; // must contain primary keyword + "Malta"
    sub: string;
    urgency: string; // scarcity/limited-time microcopy
    ctaLabel: string;
  };
  /** "What's included" + price anchor card. */
  offer: {
    priceNow: string; // e.g. "€99"
    priceWas?: string; // anchor/strikethrough, e.g. "€180"
    saveLabel?: string; // e.g. "Save €81"
    includedTitle: string;
    included: string[];
    guaranteeChip: string; // e.g. "Doctor-led • Medical-grade"
  };
  /** "How it works" numbered step timeline. */
  howItWorks: { heading: string; steps: PreviewStep[] };
  /** Risk-reversal + medical credibility. */
  guarantee: {
    eyebrow: string;
    heading: string;
    body: string;
    points: string[];
    medicalLine: string;
    ctaLabel: string;
  };
  /** Final closing CTA band. */
  closing: { heading: string; sub: string; ctaLabel: string };
};

// ---- Component prop contracts (consumed by components/packages/preview/*) ----
export type StickyCtaProps = {
  freshaHref: string;
  priceLabel: string; // e.g. "Glow Package · €99"
  ctaLabel: string; // e.g. "Claim my spot"
};

export type HowItWorksProps = { heading: string; steps: PreviewStep[] };

export type ResultsGuaranteeProps = {
  eyebrow: string;
  heading: string;
  body: string;
  points: string[];
  medicalLine: string;
  freshaHref: string;
  ctaLabel: string;
};
