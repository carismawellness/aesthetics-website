import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "mesotherapy-malta",
  category: "Face",
  hero: {
    title: "mesotherapy & skin boosters",
    subtitle: "Are you looking to refresh & revitalize your skin?",
    body: "Looking for a non-invasive way to rejuvenate your skin? Our Mesotherapy treatments in Malta can help! Our team uses a personalized blend of skin boosters (hyaluronic acid), vitamins, minerals, and amino acids to restore your skin's natural radiance and vitality.",
    prices: [
      { label: "1 session", price: "from €199" },
      { label: "2 sessions", price: "from €349 (€175/session)" },
      { label: "3 sessions", price: "from €499 (€167/session)" },
    ],
    cta: "free consultation",
  },
  info: [
    { metric: "Procedure time", detail: "30/60 minutes" },
    { metric: "Downtime", detail: "Dependent of concern" },
  ],
};

export default t;
