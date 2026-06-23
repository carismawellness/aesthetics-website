import type { PreviewContent } from "@/lib/packages/preview-types";

// CRO content for the V2 preview of the 4-in-1 HydraFacial Glow package.
// Grounded in the real package (PACKAGES["4-in-1-hydrafacial-glow"]): €335 value,
// €99 today; medical-grade, doctor-led, St Julian's; 4.9★ / 200+ reviews.
export const hydrafacialPreview: PreviewContent = {
  hero: {
    eyebrow: "The 4-in-1 Glow Package",
    h1: "4-in-1 HydraFacial in Malta",
    sub: "Deep-cleanse, resurface and hydrate in one doctor-led session — for visibly smoother, brighter skin, with zero downtime.",
    urgency: "Limited €99 launch slots released each month — by availability only.",
    ctaLabel: "Claim my €99 glow",
  },
  offer: {
    priceNow: "€99",
    priceWas: "€335",
    saveLabel: "Save €236 today",
    includedTitle: "Everything in your Glow Package",
    included: [
      "Medical-grade HydraFacial",
      "LED light therapy",
      "Dermaplaning",
      "Carisma Spa day",
      "In-person skin consultation",
      "€25 aesthetics credit",
    ],
    guaranteeChip: "Doctor-led · Medical-grade · No downtime",
  },
  howItWorks: {
    heading: "Your glow, in four simple steps",
    steps: [
      { n: 1, title: "Free skin consult", desc: "A qualified practitioner reviews your skin and goals, then tailors the session to you." },
      { n: 2, title: "Your 4-in-1 HydraFacial", desc: "Cleanse, exfoliate, extract and hydrate — plus LED and dermaplaning for an instant glow." },
      { n: 3, title: "Aftercare & glow plan", desc: "Leave with a simple, personalised routine to protect and extend your results." },
      { n: 4, title: "See the difference", desc: "Smoother texture and a luminous glow from session one — most clients rebook to maintain it." },
    ],
  },
  guarantee: {
    eyebrow: "The Carisma promise",
    heading: "Real results, in expert hands",
    body: "Every HydraFacial is performed by qualified practitioners in our central St Julian's clinic using clinically proven, medical-grade technology. We don't do guesswork — we tailor each session to your skin and stay with you for the results.",
    points: [
      "Doctor-led clinic, medically qualified practitioners",
      "Medical-grade equipment and clinically proven protocols",
      "4.9★ from 200+ verified reviews",
      "Gentle, non-invasive and no downtime",
    ],
    medicalLine: "A medically qualified team — #1 voted med-aesthetics clinic in Malta.",
    ctaLabel: "Book my consultation",
  },
  closing: {
    heading: "Ready to get your glow back?",
    sub: "Secure your 4-in-1 HydraFacial Glow Package for €99 while launch slots last.",
    ctaLabel: "Claim my €99 glow",
  },
};
