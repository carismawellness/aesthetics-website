import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "anti-cellulite",
  category: "Body",
  hero: {
    title: "ADVANCED CELLULITE SMOOTHING",
    subtitle: "cellulift & contour protocol",
    body: "Our cellulite protocol combines three VelaShape vacuum roller sessions with one lymphatic drainage massage to elminate cellulite, uneven texture, and boost circulation:",
    prices: [
      { label: "4x Anti Cellulite sessions with the VelaShape", price: "€400" },
      { label: "4x access to spa & fitness facilities", price: "€140" },
      { label: "Tanita Body Composition Analysis", price: "€60" },
      { label: "€25 Carisma Aesthetics credit", price: "€25" },
      { label: "TOTAL VALUE: €625 — TODAY: €199 ONLY", price: "€199" },
    ],
    cta: "claim your spot now",
  },
  precision: {
    title: "Treat visible fat bulges in 3 areas of the body",
    areas: [
      { name: "arms", desc: "" },
      { name: "BUTTOCKS AND UNDER-BUTT CREASE", desc: "" },
      { name: "THIGHS (FRONT, BACK, INNER AND OUTER)", desc: "" },
    ],
  },
  experience: {
    title: "VELASHAPE III (CELLULIFT PROTOCOL)",
    steps: [
      { title: "Clinically proven approach", desc: "VelaShape technology has been shown in studies to improve the appearance of cellulite and uneven skin texture." },
      { title: "Visible smoothing", desc: "Vacuum and mechanical massage encourage blood flow and lymphatic drainage for a lighter, smoother feel." },
      { title: "Circulation support", desc: "Results typically start to show from 4–12 weeks after the final session as muscle adapts and fat reduces." },
      { title: "Non invasive", desc: "No needles, no surgery and no downtime for most people." },
      { title: "Comfortable sessions", desc: "Feels like a warm, deep mechanical massage, with each treatment lasting around 30 minutes." },
    ],
  },
};

export default t;
