import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "medical-weight-loss",
  category: "Body",
  hero: {
    title: "Medical Weight Loss Malta — Doctor-Led GLP-1 Programme",
    subtitle: "Considering Ozempic or Mounjaro for weight loss?",
    body: "At Carisma Aesthetics, GLP-1 medications are never prescribed in isolation. Our doctor-led programme combines a full medical assessment, structured prescription support, nutrition guidance, and weekly monitoring to help you lose weight safely and sustain your results.",
    cta: "book your medical consultation",
    heroBgColor: "url('/assets/treatments/medical-weight-loss-bg.png') center/cover no-repeat",
  },
  suitability: {
    title: "Ozempic & Mounjaro Eligibility — Who Qualifies?",
    intro: "Ozempic and Mounjaro can be powerful, but only when prescribed as part of a structured, doctor-supervised programme. Eligibility is determined through a proper medical assessment, including blood tests, food intolerance screening, safety checks, and clear protocols so your plan is appropriate, monitored, and adjusted responsibly.",
    suitableFor: ["BMI ≥27", "Insulin resistance", "Emotional eating or Long dieting history", "Menopause-related weight gain"],
    notIdeal: ["Eating disorders", "Very lean patients", "Those unwilling to attend check-ins", "Currently pregnant or trying to conceive"],
  },
  experience: {
    title: "How Our GLP-1 Programme Works — Step by Step",
    steps: [
      { title: "Your Ozempic & Mounjaro consultation", desc: "Every programme starts with a full in-clinic consultation. This is where we determine if Ozempic or Mounjaro is clinically appropriate for you. Because we stand behind your results, we are selective about who we prescribe to." },
    ],
  },
};

export default t;
