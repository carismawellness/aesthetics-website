import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "skin-tightening-1",
  category: "Body",
  hero: {
    title: "VELASHAPE III IN MALTA",
    subtitle: "4 in 1 skin tightening protocol",
    body: "Our 4 in 1 course with the VelaShape III uses radiofrequency, infrared heat, vacuum and mechanical massage together to stimulate collagen to tighten and smoothen your skin.",
    prices: [
      { label: "4x Skin tightening sessions with the VelaShape", price: "€400" },
      { label: "4x access to spa & fitness facilities", price: "€140" },
      { label: "Tanita Body Composition Analysis", price: "€60" },
      { label: "€25 Carisma Aesthetics credit", price: "€25" },
    ],
    cta: "claim your spot now",
  },
  precision: {
    title: "Treat visible fat bulges in 7 areas of the body",
    areas: [
      { name: "TUMMY / ABDOMEN", desc: "" },
      { name: "NECK", desc: "" },
      { name: "ARMS", desc: "" },
      { name: "BUTTOCKS AND UNDER-BUTT CREASE", desc: "" },
      { name: "THIGHS (FRONT, BACK, INNER AND OUTER)", desc: "" },
    ],
  },
  experience: {
    title: "malta's most effective 4-in-1 skin tightening starter protocol",
    steps: [
      { title: "Targeted SKIN TIGHTENING", desc: "Four focused VelaShape III sessions designed to treat one or more priority areas such as the tummy, hips, thighs or bum." },
      { title: "Visible, NOTICEABLE IMPROVEMENT", desc: "Skin feels firmer and smoother over the course of treatments, with improvements you can see in clothes and feel to the touch." },
      { title: "COLLAGEN-STIMULATING TECHNOLOGY", desc: "Radiofrequency and infrared energy work together with vacuum and mechanical massage to support collagen production." },
    ],
  },
};

export default t;
