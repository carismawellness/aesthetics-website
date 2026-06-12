import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "collagen-stimulator-malta",
  category: "Face",
  hero: {
    title: "collagen stimulator (bio-revitalization)",
    subtitle: "Is your skin lacking collagen?",
    body: "Discover the power of Collagen Stimulator (Sculptra & Radiesse) treatment in Malta for natural skin rejuvenation. Boost collagen production, reduce wrinkles, and achieve youthful, radiant skin. Non-surgical facelift alternative",
    prices: [{ label: "Sculptra & Radiesse", price: "From €399/vial" }],
    cta: "BOOK YOUR COLLAGEN STIMULATOR SESSION NOW",
  },
  info: [
    { metric: "Procedure time", detail: "45/60 min" },
    { metric: "Downtime", detail: "Minimal" },
    { metric: "Results last for", detail: "12 months" },
    { metric: "Results visible in", detail: "1-3 months" },
    { metric: "Anaesthetic", detail: "Local anesthetic" },
  ],
  beforeAfterTitle: "collagen stimulator results",
  precision: {
    title: "precision areas of refinement",
    intro: "Collagen stimulators rebuild your skin's structural foundation gradually. Below are the zones where this approach is most effective.",
    areas: [
      { name: "Cheek Volume", desc: "Targets dark spots, sun damage, and uneven skin tone with controlled chemical exfoliation." },
      { name: "Temple Hollows", desc: "Fills the temple area where volume loss creates a hollowed, aged appearance over time." },
      { name: "Jawline Scaffold", desc: "Strengthens the lower face contour through progressive collagen deposition along the jaw." },
      { name: "Skin Firmness", desc: "Improves overall skin density and firmness for a more lifted, toned facial canvas" },
    ],
    additional: "Pre-jowl area, nasolabial folds, marionette region, chin, midface lateral, brow area",
  },
  suitability: {
    title: "is this suitable for you?",
    intro: "Collagen stimulators encourage your body to rebuild its own collagen over time. This is not an instant-result treatment. It is designed for those who prefer a gradual, natural-looking restoration that unfolds over weeks and months.",
    suitableFor: [
      "You want long-lasting rejuvenation that develops naturally over 1 to 3 months",
      "You are experiencing volume loss in areas like cheeks, temples, or mid-face",
      "You value results that come from your own collagen rather than a synthetic filler",
      "You are open to a multi-session treatment plan for optimal rebuilding",
      "You appreciate a treatment that continues improving long after your appointment",
    ],
    notIdeal: [
      "You need visible results for an upcoming event in the next few weeks",
      "You prefer a treatment that delivers immediate, same-day results",
      "You are pregnant, breastfeeding, or managing certain autoimmune conditions",
      "You are looking for quick contouring rather than progressive restoration",
      "You have very thin skin that may need an alternative approach",
    ],
  },
  experience: {
    title: "your treatment experience",
    steps: [
      { title: "personalised consultation", desc: "We assess your facial anatomy, skin condition, medical history, and botox goals with one of our doctors." },
      { title: "Structured Plan", desc: "Your doctor designs a medically guided botox plan tailored to your facial structure and desired outcome." },
      { title: "Targeted Treatments", desc: "Your doctor administers botox using fine, precise injections, quick, comfortable, and no downtime." },
      { title: "Ongoing Review & Adjustment", desc: "Your doctor monitors your response and refines the plan to ensure natural botox results over time." },
    ],
  },
};

export default t;
