import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "lympathic-drainage",
  category: "Body",
  hero: {
    title: "lymphatic drainage therapy",
    subtitle: "Expert LED BODY DETOX & CIRCULATION SUPPORT",
    body: "Our Lymphatic Drainage Therapy is a gentle, expert-guided treatment designed to stimulate your lymphatic system, helping your body eliminate toxins, reduce fluid retention, and restore natural balance.",
    prices: [
      { label: "4x Lymphatic drainage massage", price: "€440" },
      { label: "4x access to spa & fitness facilities", price: "€140" },
      { label: "Tanita Body Composition Analysis", price: "€60" },
      { label: "€25 Carisma Aesthetics credit", price: "€25" },
      { label: "TOTAL VALUE: €665 — TODAY", price: "€299 ONLY" },
    ],
    cta: "Claim Your Spot Now",
  },
  experience: {
    title: "lymphatic drainage therapy",
    steps: [
      { title: "", desc: "You begin with a professional consultation to assess your health history, symptoms, and suitability for treatment." },
      { title: "", desc: "Your practitioner explains how lymphatic drainage works, what results to expect, and how often sessions may be recommended." },
      { title: "", desc: "Treatment is delivered using controlled, medically guided techniques — never aggressively or without assessment." },
      { title: "", desc: "We monitor your response and adjust frequency or approach as needed, ensuring comfort, safety, and effectiveness." },
    ],
  },
};

export default t;
