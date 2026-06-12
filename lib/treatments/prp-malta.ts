import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "prp-malta",
  category: "Face",
  hero: {
    title: "prp malta platelet rich plasma",
    subtitle: "Looking for a natural way to rejuvenate your skin and promote healing?",
    body: "Discover the power of Platelet-Rich Plasma (PRP) treatments in Malta! Our skilled team uses your own blood's healing properties to stimulate collagen production and rejuvenate your skin. Experience a more youthful and radiant complexion with our safe and effective PRP treatments.",
    prices: [
      { label: "PRP for hair loss", price: "from €149" },
      { label: "PRP regular facial", price: "from €175" },
      { label: "PRP vampire facial", price: "from €199" },
    ],
    cta: "BOOK YOUR PRP MALTA PRP SESSION NOW",
  },
  info: [
    { metric: "Procedure time", detail: "35-45 minutes" },
    { metric: "Downtime", detail: "None to couple of days" },
    { metric: "Results last for", detail: "6-12 months" },
    { metric: "Results visible in", detail: "1-4 weeks" },
    { metric: "Anaesthetic", detail: "Anesthetic cream" },
  ],
  beforeAfterTitle: "PRP Results",
  precision: {
    title: "precision areas of refinement",
    intro: "Your body's own growth factors are concentrated and applied where renewal is needed most. Below are the primary treatment zones.",
    areas: [
      { name: "Facial Rejuvenation", desc: "Stimulates collagen and tissue repair across the face for a naturally refreshed, radiant complexion." },
      { name: "Under-Eye Renewal", desc: "Targets dark circles, fine lines, and thin skin beneath the eyes with concentrated growth factors." },
      { name: "Hair Restoration", desc: "Delivers growth factors directly to thinning areas of the scalp to reactivate dormant follicles." },
      { name: "Vampire Facial", desc: "Combines PRP with microneedling for enhanced penetration and accelerated skin renewal." },
    ],
    additional: "Neck, decolletage, hands, acne scars, stretch marks, surgical scars",
  },
  suitability: {
    title: "is this suitable for you?",
    intro: "This treatment uses your own blood to stimulate natural rejuvenation and collagen renewal. Because it works with your biology, there is no risk of allergic reaction. Results are gradual and best achieved through a course of three sessions.",
    suitableFor: [
      "You prefer a natural approach using your body's own growth factors",
      "You want to improve skin quality, texture, or early-stage hair thinning",
      "You are comfortable with a blood draw as part of the treatment process",
      "You are committed to a three-session course for optimal results",
      "You appreciate a treatment with no risk of allergic reaction",
    ],
    notIdeal: [
      "You are looking for instant, same-day results",
      "You have a blood disorder, platelet dysfunction, or are on anticoagulant therapy",
      "You are pregnant, breastfeeding, or have an active infection in the area",
      "You are experiencing advanced hair loss with no remaining active follicles",
      "You are looking for volume or structural changes to your face",
    ],
  },
  experience: {
    title: "your treatment experience",
    steps: [
      { title: "personalised consultation", desc: "We assess your skin or scalp condition, medical history, and PRP treatment goals with one of our doctors." },
      { title: "Structured Plan", desc: "Your doctor designs a personalised treatment protocol tailored to your specific concerns whether facial rejuvenation, hair restoration, or a vampire facial." },
      { title: "Targeted Treatments", desc: "Your doctor draws a blood sample, processes it in a centrifuge, and delivers the concentrated PRP via precise injection: comfortable and approximately 35-45 minutes." },
      { title: "Ongoing Review & Adjustment", desc: "Your doctor monitors your skin or hair response and adjusts the treatment protocol to maximise results across your course of sessions." },
    ],
  },
};

export default t;
