import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "fat-dissolving-malta",
  category: "Face",
  hero: {
    title: "fat dissolving",
    subtitle: "Are you tired of dealing with stubborn localised fat?",
    body: "Embrace a new you with our reliable and impactful localized fat reduction solutions in Malta! Our knowledgeable team is focused on helping you realise a more contoured and youthful version of yourself, without the drawbacks of surgical alternatives.",
    prices: [
      { label: "1 session", price: "from €149" },
      { label: "2 sessions (€125/session)", price: "from €249" },
      { label: "3 sessions (€117/session)", price: "from €349" },
    ],
    cta: "book your fat dissolving session now",
    image: "/assets/treatments/fat-dissolving-hero.jpg",
    productTabs: ["AQUALYX", "LEMON BOTTLE"],
    heroForm: true,
  },
  info: [
    { metric: "Procedure Time", detail: "20-30 minutes" },
    { metric: "Downtime", detail: "7-14 days of swelling" },
    { metric: "Results Last For", detail: "Permanent" },
    { metric: "Results Visible In", detail: "2 weeks or more" },
    { metric: "Anaesthetic", detail: "None" },
  ],
  beforeAfterTitle: "fat dissolving results",
  beforeAfter: [
    { before: "/assets/treatments/fat-dissolving-before.jpg", after: "/assets/treatments/fat-dissolving-after.jpg", label: "Under Chin Fat Reduction" },
  ],
  precision: {
    title: "precision areas of refinement",
    intro: "This treatment targets localised fat deposits that resist diet and exercise. Below are the areas most commonly treated.",
    areas: [
      { name: "Double Chin", desc: "Reduces submental fullness beneath the chin to reveal a cleaner, more defined profile." },
      { name: "Jowl Area", desc: "Refines the jawline by reducing soft tissue that blurs the jaw-to-neck transition." },
      { name: "Buccal Region", desc: "Slims the lower cheek area for a more contoured, sculpted facial silhouette." },
      { name: "Stubborn Pockets", desc: "Targets small, resistant fat deposits on the body that do not respond to lifestyle alone." },
    ],
    additional: "Upper arms, inner thighs, flanks, bra fat, knee area, abdomen",
  },
  suitability: {
    title: "is this suitable for you?",
    intro: "Fat dissolving targets small, stubborn pockets of fat that resist diet and exercise. It is a contouring treatment, not a weight loss solution. Realistic expectations and a consultation ensure this is the right fit for your goals.",
    suitableFor: [
      "You have a localised area of stubborn fat, such as under the chin or jawline",
      "You are close to your ideal weight but want targeted refinement",
      "You understand that results develop gradually over 6 to 8 weeks",
      "You are willing to commit to 2 to 3 sessions for optimal contouring",
      "You are comfortable with temporary swelling and tenderness during recovery",
    ],
    notIdeal: [
      "You are looking for significant overall weight loss",
      "You have loose or sagging skin in the treatment area",
      "You expect visible change after a single session without a follow-up course",
      "You are pregnant, breastfeeding, or have active infection near the area",
      "You have a very low tolerance for post-treatment downtime of 1 to 2 weeks",
    ],
  },
  experience: {
    title: "your treatment experience",
    steps: [
      { title: "personalised consultation", desc: "We assess your facial anatomy, skin condition, medical history, and botox goals with one of our doctors.", image: "/assets/treatments/botox-step1.png" },
      { title: "Structured Plan", desc: "Your doctor designs a medically guided botox plan tailored to your facial structure and desired outcome.", image: "/assets/treatments/botox-step2.png" },
      { title: "Targeted Treatments", desc: "Your doctor administers botox using fine, precise injections, quick, comfortable, and no downtime.", image: "/assets/treatments/botox-step3.png" },
      { title: "Ongoing Review & Adjustment", desc: "Your doctor monitors your response and refines the plan to ensure natural botox results over time.", image: "/assets/treatments/botox-step4.png" },
    ],
  },
};

export default t;
