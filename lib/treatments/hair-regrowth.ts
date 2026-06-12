import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "hair-regrowth",
  category: "Face",
  hero: {
    title: "Hair Loss Treatment in Malta",
    subtitle: "non-surgical hair loss clinic guaranteed results in 90 Days",
    body: "Malta's only doctor-led, exosome-powered hair loss treatment clinic that reverses thinning hair without surgery. The program combines PRP and exosome therapy delivered in-clinic by our medical team with a doctor-issued prescription for minoxidil, finasteride, and ketoconazole — dispensed by our licensed pharmacy partner, Melita Health & Beauty. One clinically measured, fully managed, guaranteed program.",
    prices: [
      { label: "HAIR REGROWTH 30", price: "€399" },
      { label: "HAIR REGROWTH 90", price: "Monthly: €897" },
      { label: "HAIR REGROWTH 180", price: "Monthly: €1494" },
    ],
    cta: "Book Your Free Consultation",
  },
  beforeAfterTitle: "Before and afters",
  precision: {
    title: "The Science Behind the Results",
    intro: "For years, advanced hair loss treatments like exosome therapy and medically supervised minoxidil and finasteride protocols were limited to elite clinics abroad. For the first time in Malta, Carisma's doctor-led hair loss clinic offers the same standard of care: PRP and exosome therapy performed in-clinic by our medical team, paired with a doctor-issued prescription for minoxidil, finasteride, and ketoconazole — dispensed by our licensed pharmacy partner, Melita Health & Beauty. One complete, results-guaranteed treatment system.",
    areas: [
      { name: "Finasteride (Oral Therapy)", desc: "blocks DHT, the hormone responsible for follicle miniaturization." },
      { name: "Minoxidil (Topical Therapy)", desc: "boosts blood flow and oxygen delivery to stimulate new growth." },
      { name: "Ketoconazole Shampoo", desc: "maintains scalp balance, reduces inflammation, and supports follicle health." },
    ],
  },
  suitability: {
    title: "eligibility criteria",
    intro: "Noticing your hair thinning, shedding, or receding more each year? Experienced hair loss after a stressful episode, pregnancy, hormonal changes, or illness? Tried minoxidil, supplements, serums, and every at-home treatment only to end up right where you started? You're not alone. Hair loss affects over 50% of men and 40% of women at some point in their lives. The Hair Reset Protocol at our Malta clinic is for those ready to move beyond fads, a doctor-led, science-based hair loss treatment built for real, measurable regrowth, not quick fixes.",
    suitableFor: [
      "Noticing thinning or a receding hairline and want to stop hair loss early",
      "Tried minoxidil, finasteride, supplements, or at-home treatments that failed to work",
      "Don't want a hair transplant because of cost, scarring, or downtime",
      "Tired of \"miracle\" fixes and unproven hair loss products",
      "Want guaranteed, measurable hair regrowth results without surgery",
      "Ready for a doctor-led treatment at a specialist hair loss clinic in Malta",
    ],
    notIdeal: [
      "Advanced baldness where follicles are no longer biologically active",
      "Severe scalp conditions or inflammation that prevent regeneration",
      "Hormonal or medical issues (thyroid, anemia, medications) that must be stabilised first",
      "Expecting instant or one-session results",
      "Unwilling to follow a consistent 90-day medical plan",
      "Focused solely on price instead of clinical outcomes",
      "Seeking cosmetic cover-ups rather than true regeneration",
    ],
  },
};

export default t;
