import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "lip-fillers-malta",
  category: "Face",
  hero: {
    title: "lip fillers malta",
    subtitle: "Are you looking to achieve fuller, more luscious lips?",
    body: "Get plump and luscious lips with our expert lip fillers in Malta. Say goodbye to thin lips and hello to the perfect pout.",
    prices: [{ label: "1ml", price: "from €219/ml" }],
    cta: "BOOK YOUR SESSION NOW",
  },
  info: [
    { metric: "Procedure Time", detail: "20-30 minutes" },
    { metric: "Downtime", detail: "Minimal" },
    { metric: "Results Last For", detail: "6-12 months" },
    { metric: "Results Visible In", detail: "Immediate" },
    { metric: "Anaesthetic", detail: "Local anesthetic" },
  ],
  beforeAfterTitle: "lip filler results",
  precision: {
    title: "precision areas of refinement",
    intro: "Enhancement is guided by your unique lip anatomy and desired outcome. Below are the four key dimensions we refine.",
    areas: [
      { name: "Lip Body", desc: "Adds subtle or fuller volume to the upper and lower lips, tailored to your natural proportions." },
      { name: "Contour", desc: "Defines the vermilion border for a crisp, elegant outline that frames the lips naturally." },
      { name: "Cupid's Bow", desc: "Refines the cupid's bow for a more defined, balanced shape that complements your features." },
      { name: "Symmetry", desc: "Addresses natural asymmetry between upper and lower lips for a harmonious, proportionate result." },
    ],
    additional: "Philtrum columns, oral commissures, perioral lines, lip flip, smoker's lines, marionette area",
  },
  suitability: {
    title: "is this suitable for you?",
    intro: "Lip enhancement is not one-size-fits-all. The right approach depends on your natural lip shape, facial proportions, and the result you are hoping for. We always start conservatively and build from there.",
    suitableFor: [
      "You want subtle enhancement that complements your natural features",
      "You would like improved symmetry, definition, or hydration",
      "You appreciate a conservative, gradual approach to enhancement",
      "You understand that some swelling is normal and final results settle in 2 to 4 weeks",
      "You are looking for a treatment that can be adjusted or reversed if needed",
    ],
    notIdeal: [
      "You are looking for a dramatically different lip shape",
      "You expect permanent results from a single session",
      "You are pregnant, breastfeeding, or have active cold sores in the lip area",
      "You have a low tolerance for temporary swelling or tenderness",
      "You would prefer a non-injectable alternative such as a lip flip",
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
