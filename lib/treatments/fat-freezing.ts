import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "fat-freezing",
  category: "Body",
  hero: {
    title: "BURN STUBBORN FAT, NO SURGERY.",
    subtitle: "fat eraser protocol",
    body: "For those who have tried dieting, eating healthier and moving more, but the love handles, stubborn belly fat and double chin still will not budge.",
    prices: [
      { label: "3x Fat Freezing sessions with CoolSculpting", price: "(€360)" },
      { label: "4x access to spa & fitness facilities", price: "(€140)" },
      { label: "Tanita Body Composition Analysis", price: "(€60)" },
      { label: "€25 Carisma Aesthetics credit", price: "(€25)" },
      { label: "TOTAL VALUE: €550 — TODAY: €199 ONLY", price: "€199" },
    ],
    cta: "Claim your spot now",
  },
  precision: {
    title: "TARGETED CONTOURING",
    intro: "Treat visible fat bulges in 7 areas of the body.",
    areas: [
      { name: "Stomach / Belly Fat", desc: "" },
      { name: "Love handles", desc: "" },
      { name: "Upper arms", desc: "" },
      { name: "Thighs", desc: "" },
      { name: "Banana roll", desc: "" },
      { name: "Back fat / bra fat", desc: "" },
      { name: "Double chin / jawline", desc: "" },
    ],
    additional: "Focus on your biggest trouble spot first so love handles, lower belly or double chin start to look smoother in clothes and photos.",
  },
};

export default t;
