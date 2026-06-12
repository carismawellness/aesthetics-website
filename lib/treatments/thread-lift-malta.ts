import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "thread-lift-malta",
  category: "Face",
  hero: {
    title: "thread lift",
    subtitle: "Ready to defy gravity and achieve a more youthful, lifted appearance without surgery?",
    body: "Looking for a non-surgical facelift option in Malta? Our Thread Lift treatments can help lift and tighten your skin, giving you a more youthful and refreshed appearance. Our experienced team uses the latest techniques and top-quality threads to ensure natural-looking, long-lasting results.",
    prices: [
      { label: "BPO threads", price: "from €239" },
      { label: "Semi-permanent (not PDO thread)", price: "from €2100" },
    ],
    cta: "BOOK YOUR THREAD LIFT SESSION NOW",
  },
  info: [
    { metric: "Procedure Time", detail: "2-3 hours" },
    { metric: "Downtime", detail: "2 weeks, with doctor monitoring" },
    { metric: "Results Last For", detail: "4-5 years" },
    { metric: "Results Visible In", detail: "2 weeks" },
    { metric: "Anaesthetic", detail: "Local anesthetic" },
  ],
  beforeAfterTitle: "thread lift results",
  precision: {
    title: "precision areas of refinement",
    intro: "Medical-grade threads are placed beneath the skin to lift and reposition tissue. Below are the primary zones of treatment.",
    areas: [
      { name: "Midface Lift", desc: "Repositions sagging cheek tissue upward to restore a naturally lifted, youthful midface contour." },
      { name: "Jowl Reduction", desc: "Lifts and tightens the jowl area to redefine the transition from face to jawline." },
      { name: "Jawline Contour", desc: "Creates a sharper, more defined jaw profile through precise thread placement along the mandible." },
      { name: "Neck Lift", desc: "Addresses neck laxity and banding for a smoother, more refined neck-to-jaw transition." },
    ],
    additional: "Brow lift, nasolabial area, marionette zone, chin projection, temple region",
  },
  suitability: {
    title: "is this suitable for you?",
    intro: "A thread lift provides non-surgical lifting for the face and neck, offering both an immediate visible result and long-term collagen stimulation. It is a medical procedure that requires a doctor's assessment to determine if it is the right approach for you.",
    suitableFor: [
      "You have mild to moderate sagging and want a non-surgical lifting option",
      "You want both an immediate lift and progressive collagen improvement",
      "You are looking for results that last 12 to 24 months",
    ],
    notIdeal: [
      "You have very advanced sagging that may require a surgical approach",
      "You are not prepared for 1 to 2 weeks of recovery with some swelling",
      "You are pregnant, breastfeeding, or managing autoimmune conditions",
      "You expect the same degree of lift as a surgical facelift",
      "You have very thin skin, which may need a different treatment pathway",
    ],
  },
  experience: {
    title: "YOUR TREATMENT EXPERIENCE",
    steps: [
      { title: "Personalised Consultation", desc: "We assess your facial anatomy, skin condition, medical history, and botox goals with one of our doctors." },
      { title: "Structured Plan", desc: "Your doctor designs a medically guided botox plan tailored to your facial structure and desired outcome." },
      { title: "Targeted Treatments", desc: "Your doctor administers botox using fine, precise injections, quick, comfortable, and no downtime." },
      { title: "Ongoing Review & Adjustment", desc: "Your doctor monitors your response and refines the plan to ensure natural botox results over time." },
    ],
  },
};

export default t;
