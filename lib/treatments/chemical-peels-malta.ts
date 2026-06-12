import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "chemical-peels-malta",
  category: "Face",
  hero: {
    title: "chemical peels",
    subtitle: "Are you seeking a brighter, smoother, and more youthful complexion?",
    body: "Get a safe and effective Chemical Peel treatment in Malta! Our experienced team uses medical-grade solutions. Inflammatory (TCA and Retinoic) peels deeply and takes 1-10 days to heal, typically done in cold season. Non-inflammatory (Mandelic and Salicylic acid) is gentler and can be done in any season. Book now for even, radiant skin!",
    prices: [
      { label: "1 session", price: "from €135" },
      { label: "3 sessions", price: "from €399 (€133/session)" },
      { label: "5 sessions", price: "from €649 (€217/session)" },
    ],
    cta: "free consultation",
  },
  info: [
    { metric: "Procedure time", detail: "20-30 minutes" },
    { metric: "Downtime", detail: "None to 2 weeks" },
    { metric: "Results last for", detail: "6-12 months" },
    { metric: "Results visible in", detail: "1-2 weeks" },
    { metric: "Anaesthetic", detail: "None" },
  ],
};

export default t;
