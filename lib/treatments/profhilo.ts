import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "profhilo",
  category: "Face",
  hero: {
    title: "profhilo",
    subtitle: "Are you looking to refresh & revitalize your skin?",
    body: "Looking for a non-invasive way to rejuvenate your skin? Profhilo treatments in Malta can help! Carisma Aesthetics offers this revolutionary hyaluronic acid treatment to boost hydration, firmness, and radiance. Book your appointment today and experience youthful, glowing skin!",
    prices: [
      { label: "1 session", price: "from €279" },
      { label: "2 sessions", price: "from €449 (€224/session)" },
      { label: "3 sessions", price: "from €649 (€216/session)" },
    ],
    cta: "BOOK YOUR SESSION NOW",
  },
  info: [
    { metric: "Procedure Time", detail: "30-60 minutes" },
    { metric: "Downtime", detail: "Dependent of concern" },
    { metric: "Results Last For", detail: "Maintenance may be required" },
    { metric: "Results Visible In", detail: "Dependent of concern" },
    { metric: "Anaesthetic", detail: "Anesthetic cream" },
  ],
  beforeAfterTitle: "profhilo results",
  precision: {
    title: "precision areas of refinement",
    intro: "Profhilo is a skin quality treatment, not a filler. It hydrates and firms from within without adding volume or changing your facial structure.",
    areas: [
      { name: "Face", desc: "Restores deep hydration and firmness across the face using five precise bio-injection points." },
      { name: "Neck", desc: "Addresses crepey texture and laxity in the neck, an area that often reveals early ageing." },
      { name: "Chest", desc: "Improves skin quality across the chest where sun exposure and thinning skin are most visible." },
      { name: "Hands", desc: "Replenishes hydration and volume in the hands, restoring a smoother, more youthful appearance." },
    ],
    additional: "Inner arms, above the knee, under-eye area, jawline laxity, forehead skin quality",
  },
};

export default t;
