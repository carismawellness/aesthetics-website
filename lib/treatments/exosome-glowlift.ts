import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "exosome-glowlift",
  category: "Package",
  hero: {
    title: "EXOSOME GLOW LIFT",
    body: "When facials stop working and your glow fades, Exosomes offer the next step — real regeneration for smoother, firmer, brighter skin.",
    prices: [{ label: "Total Value: €365 – Today", price: "€175 Only" }],
    cta: "CLAIM MY SPOT NOW",
  },
  beforeAfterTitle: "what our clients have to say about their results",
  experience: {
    title: "what to expect during your treatment?",
    steps: [
      { title: "BEFORE", desc: "Avoid using any topical skin products containing retinol, aha or any other acid at least 24 hours prior to the procedure. Discuss any medical conditions, allergies, and medications with your provider. Share your concerns and objectives with our expert practitioners and answer any questions." },
      { title: "AT SESSION", desc: "Our expert practitioner will use a handheld device with tiny needles, microneedling the skin. This stimulates the body's natural healing process and promotes collagen production. Communicate any discomfort or concerns to the practitioner during the procedure." },
      { title: "AFTER", desc: "Avoid using any topical skin products containing retinol, aha or any other acid at least 24 hours after the procedure. Refrain from exercise, alcohol, and saunas for at least 24 hours. Results are gradual and may require several sessions for optimal results." },
    ],
  },
};

export default t;
