import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "muscle-stimulation-1",
  category: "Body",
  hero: {
    title: "EMSculpt NEO MALTA",
    subtitle: "3-in-1 body sculpt protocol",
    body: "Our 3-1 course with EMSculpt NEO with HIFEM + RF gives you the effect of 20,000 sit ups per session, burns local fat and tightens the skin resulting in 30% Fat reduction, 25% Muscle growth & 29% Muscle strength",
    prices: [
      { label: "4x Muscle Stimulation sessions with EMSculpt NEO", price: "€400" },
      { label: "4x access to spa & fitness facilities", price: "€140" },
      { label: "Tanita Body Composition Analysis", price: "€60" },
      { label: "Carisma Aesthetics credit", price: "€25" },
      { label: "TOTAL VALUE: €625 — TODAY", price: "€199 for 4 sessions" },
    ],
    cta: "Claim your spot now",
  },
  precision: {
    title: "TARGETED BODY SCULPTING",
    intro: "Focus on the areas that matter most tummy, hips, bum or thighs using targeted EMSculpt Neo technology to improve muscle definition and firmness where exercise often falls short.",
    areas: [
      { name: "ABDOMEN / CORE", desc: "" },
      { name: "GLUTES / BUTTOCKS", desc: "" },
      { name: "THIGHS (FRONT AND BACK)", desc: "" },
      { name: "CALVES", desc: "" },
      { name: "UPPER ARMS (BICEPS AND TRICEPS)", desc: "" },
    ],
  },
  experience: {
    title: "the carisma difference",
    steps: [
      { title: "Doctor led", desc: "full medical check and body scan" },
      { title: "One integrated program", desc: "medical, diet, movement and treatments together" },
      { title: "Real gym included", desc: "Technogym facility, semi-private classes and PT" },
      { title: "High touch support", desc: "weekly check ins, progress reports and WhatsApp follow up" },
      { title: "Evidence based devices", desc: "Emsculpt NEO, coolsculpting and RF skin tightening" },
      { title: "Selective entry and measurable weight loss results guaranteed", desc: "" },
    ],
  },
};

export default t;
