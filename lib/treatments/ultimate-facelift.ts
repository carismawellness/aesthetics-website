import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "ultimate-facelift",
  category: "Package",
  hero: {
    title: "ultimate facelift",
    subtitle: "Reverse visible aging — no knife, no downtime.",
    body: "If your skin's lost its lift, your cheeks feel flatter than before, or your jawline's lost its shape, this is your sign to rewind time — naturally. Our Ultimate Facelift Package is designed to lift, tighten, and sculpt — without surgery, fillers, or long recovery days.",
    prices: [
      { label: "Total Value", price: "€430" },
      { label: "Today", price: "€239 Only" },
    ],
    cta: "CLAIM MY SPOT NOW",
  },
  info: [
    { metric: "Treatment Duration", detail: "60-Minute Treatment" },
    { metric: "Results", detail: "Results are immediate and can last up to 3-5 years" },
    { metric: "Recovery", detail: "Avoid rubbing or massaging the injection areas for at least 24 hours" },
  ],
  beforeAfterTitle: "what our clients have to say about their results",
  precision: {
    title: "YOUR FACELIFT — REDEFINED.",
    intro: "See how our Ultimate Facelift Package gently lifts, tightens, and sculpts for visibly younger, naturally radiant skin.",
    areas: [
      { name: "Visible Lift & Contour", desc: "Enjoy a firmer, more lifted appearance after your first session." },
      { name: "Refreshed, Smooth Skin", desc: "Restores elasticity and reduces fine lines for a youthful glow." },
      { name: "No Surgery, No Downtime", desc: "A gentle, effective treatment performed with precision care." },
      { name: "Luxury Meets Science", desc: "Advanced thread technology delivered by certified aesthetic specialists." },
    ],
  },
  suitability: {
    title: "Who is a suitable candidate for thread lifting?",
    intro: "Thread lifting is generally suitable for individuals with mild to moderate skin sagging who want a more lifted and youthful appearance without undergoing surgery. It's important to have realistic expectations and be in generally good health. A consultation with a medical practitioner can determine if you're a suitable candidate based on your skin condition and desired outcomes.",
  },
  experience: {
    title: "what to expect during your thread lift treatment?",
    steps: [
      { title: "BEFORE", desc: "Share your concerns and objectives with our expert practitioners and answer any questions. Discuss any medical conditions, allergies, and medications with your provider. Avoid alcohol, blood thinners, and aspirin for 24 hours prior to the procedure." },
      { title: "AT SESSION", desc: "Our expert practitioner will insert thin threads into the targeted areas using a fine needle. Follow the practitioner's instructions for facial expressions and movements during the procedure. Communicate any discomfort or concerns to the practitioner during the procedure." },
      { title: "AFTER", desc: "Avoid rubbing or massaging the injection areas for at least 24 hours. Refrain from exercise, alcohol, and saunas for at least 24 hours. Results are immediate and can last up to 3-5 years." },
    ],
  },
};

export default t;
