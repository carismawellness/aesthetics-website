import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "microneedling-malta",
  category: "Face",
  hero: {
    title: "microneedling + mesotherapy malta",
    subtitle: "LOOKING to achieve a smoother, more youthful complexion?",
    body: "Discover the power of Microneedling (combined with Mesotherapy) treatments in Malta! Our minimally invasive, collagen-inducing treatments can help reduce the appearance of fine lines, acne, acne scars, and other skin imperfections, leaving you with a smoother, more radiant complexion. Trust our experienced team to help you achieve your skincare goals.",
    prices: [
      { label: "1 session", price: "from €149 (+€50 for Exosomes)" },
      { label: "3 sessions", price: "from €359 (€120/session)" },
      { label: "5 sessions", price: "from €599 (€119/session)" },
    ],
    cta: "BOOK YOUR MICRONEEDLING+MESOTHERAPY NOW",
  },
  info: [
    { metric: "Procedure time", detail: "1 Hour" },
    { metric: "Downtime", detail: "2-3 days" },
    { metric: "Results last for", detail: "Maintenance courses maybe required" },
    { metric: "Results visible in", detail: "Individual, depending on the skin condition" },
    { metric: "Anaesthetic", detail: "Anesthetic cream" },
  ],
  beforeAfterTitle: "microneedling results",
  precision: {
    title: "precision areas of refinement",
    intro: "Controlled micro-injuries trigger your skin's natural renewal response. Below are the primary concerns and zones we target.",
    areas: [
      { name: "Skin Texture", desc: "Refines overall skin texture by stimulating collagen production across the full treatment zone." },
      { name: "Acne Scarring", desc: "Breaks down scar tissue and promotes new collagen to gradually smooth rolling and pitted scars." },
      { name: "Enlarged Pores", desc: "Tightens the pore structure through repeated collagen stimulation for a visibly refined surface." },
      { name: "Fine Lines", desc: "Softens early fine lines by encouraging the skin to rebuild its collagen matrix from within." },
    ],
    additional: "Pigmentation, stretch marks, neck, decolletage, hands, surgical scars",
  },
  suitability: {
    title: "is this suitable for you?",
    intro: "Every skin tells a different story. Microneedling with mesotherapy is most effective when tailored to your specific skin concerns, whether that is scarring, texture, fine lines, or overall radiance. A free consultation with one of our doctors helps us assess your skin and design a treatment plan that works for you.",
    suitableFor: [
      "You want to improve acne scarring, enlarged pores, fine lines, or uneven texture",
      "You are open to 3 to 6 sessions for cumulative, lasting improvement",
      "You can manage 24 to 48 hours of mild redness similar to light sunburn",
      "You are interested in combining microneedling with exosomes or PRP for enhanced results",
      "You want a treatment that improves skin quality without injectables",
    ],
    notIdeal: [
      "You currently have an active acne breakout or skin infection",
      "You have used isotretinoin (Accutane) within the last six months",
      "You are pregnant, breastfeeding, or have active cold sores in the area",
      "You have a history of keloid scarring that has not been assessed",
      "You cannot commit to sun protection during the recovery period",
    ],
  },
  experience: {
    title: "your treatment experience",
    steps: [
      { title: "personalised consultation", desc: "We assess your skin condition, concerns, and medical history with one of our doctors to design your personalised microneedling plan." },
      { title: "Structured Plan", desc: "Your doctor selects the mesotherapy cocktail and treatment protocol tailored to your skin type, concerns, and goals." },
      { title: "Targeted Treatments", desc: "Your doctor performs microneedling with your personalised mesotherapy cocktail: precise, comfortable, and no downtime." },
      { title: "Ongoing Review & Adjustment", desc: "Your doctor reviews your skin's response and refines the plan to ensure optimal microneedling results over time." },
    ],
  },
};

export default t;
