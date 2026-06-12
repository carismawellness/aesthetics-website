import type { Treatment } from "../treatment-types";

// Verbatim recreation of https://www.carismaaesthetics.com/polynucleotides-salmon-dna
// Note: the live page genuinely reuses "botox" wording in the experience steps,
// prep/aftercare intro and difference section — kept verbatim on purpose.
const t: Treatment = {
  slug: "polynucleotides-salmon-dna",
  category: "Face",
  hero: {
    title: "polynucleotides (salmon dna)",
    subtitle: "ARE YOU LOOKING TO RESTORE FIRMER, SMOOTHER, MORE RADIANT SKIN?",
    body: "Polynucleotides (Salmon DNA) boost hydration, repair damaged skin, and stimulate collagen — giving you smoother texture, improved elasticity, and a naturally refreshed glow.",
    prices: [{ label: "1ml", price: "from €249/ml" }],
    cta: "BOOK YOUR SESSION NOW",
    image: "/assets/treatments/polynucleotides-salmon-dna-hero.webp",
    brandLogos: ["/assets/treatments/polynucleotides-salmon-dna-ameela.png"],
    imageRatio: "450 / 358",
    heroForm: true,
  },
  info: [
    { metric: "Procedure Time", detail: "2-3 hours" },
    { metric: "Downtime", detail: "2 weeks, with doctor monitoring" },
    { metric: "Results Last For", detail: "6-12 months" },
    { metric: "Results Visible In", detail: "immediate" },
    { metric: "Anaesthetic", detail: "Local anesthetic" },
  ],
  beforeAfterTitle: "salmon dna results lift results",
  beforeAfter: [
    { before: "/assets/treatments/polynucleotides-salmon-dna-ba1-before.png", after: "/assets/treatments/polynucleotides-salmon-dna-ba1-after.png" },
    { before: "/assets/treatments/polynucleotides-salmon-dna-ba2-before.png", after: "/assets/treatments/polynucleotides-salmon-dna-ba2-after.png" },
  ],
  precision: {
    title: "precision areas of refinement",
    intro: "This regenerative treatment stimulates cellular renewal at the deepest level. Below are the primary zones of application.",
    areas: [
      { zone: "Face", icon: "/assets/treatments/polynucleotides-salmon-dna-icon-face.png", name: "Full Face", desc: "Activates fibroblast renewal across the face for improved texture, tone, and radiance over time." },
      { zone: "Eyes", icon: "/assets/treatments/polynucleotides-salmon-dna-icon-eyes.png", name: "Under-Eye Area", desc: "Targets the delicate periorbital skin where dark circles, crepiness, and thinning are most visible." },
      { zone: "Neck", icon: "/assets/treatments/polynucleotides-salmon-dna-icon-neck.png", name: "Neck", desc: "Stimulates collagen regeneration in the neck where skin quality declines earlier than expected." },
      { zone: "Hands", icon: "/assets/treatments/polynucleotides-salmon-dna-icon-hands.png", name: "Hands", desc: "Renews the thin, exposed skin on the hands for a more hydrated, even-toned appearance." },
    ],
    additionalTitle: "Your practitioner will assess which zones will benefit most during your initial consultation.",
    additional: "Decolletage, forehead, inner arms, lip area, acne scarring zones, scalp",
  },
  suitability: {
    title: "is this suitable for you?",
    intro: "Polynucleotides work at a cellular level to regenerate and rejuvenate skin from within. This is a treatment for those who value long-term skin health over instant visual change. Results build gradually with each session.",
    suitableFor: [
      "You are interested in advanced skin rejuvenation at a cellular level",
      "You want to improve skin quality in areas like face, neck, hands, or under-eyes",
      "You are committed to a course of 2 to 3 sessions for the best outcome",
      "You appreciate science-led treatments that support your skin's natural repair",
      "You are looking for progressive improvement that lasts",
    ],
    notIdeal: [
      "You want immediate, visible results from your first session",
      "You are looking for volume or structural enhancement",
      "You are pregnant, breastfeeding, or have active infection in the area",
      "You prefer treatments with no follow-up sessions required",
      "You are on blood-thinning medication without prior medical discussion",
    ],
  },
  experience: {
    title: "your treatment experience",
    steps: [
      { title: "personalised consultation", desc: "We assess your facial anatomy, skin condition, medical history, and botox goals with one of our doctors.", image: "/assets/treatments/botox-step1.png" },
      { title: "Structured Plan", desc: "Your doctor designs a medically guided botox plan tailored to your facial structure and desired outcome.", image: "/assets/treatments/botox-step2.png" },
      { title: "Targeted Treatments", desc: "Your doctor administers botox using fine, precise injections, quick, comfortable, and no downtime.", image: "/assets/treatments/botox-step3.png" },
      { title: "Ongoing Review & Adjustment", desc: "Your doctor monitors your response and refines the plan to ensure natural botox results over time.", image: "/assets/treatments/botox-step4.png" },
    ],
  },
  prepAftercare: {
    kicker: "Preparation & Aftercare",
    title: "your session, step by step",
    intro: "A smooth botox experience begins with a few simple steps. Here is what to know before, during, and after your session at our Malta clinic.",
    cards: [
      {
        icon: "/assets/treatments/polynucleotides-salmon-dna-icon-prep-before.png",
        label: "Before",
        lead: "Simple preparation supports the best response.",
        points: [
          "Discuss skin goals and treatment history",
          "Disclose medications and active skin conditions",
          "Avoid blood thinners and alcohol for 24 hours",
          "Arrive with clean, makeup-free skin",
        ],
      },
      {
        icon: "/assets/treatments/polynucleotides-salmon-dna-icon-prep-during.png",
        label: "During",
        lead: "Precise delivery targets deep skin renewal.",
        points: [
          "Injection sites are carefully mapped",
          "Fine needles deliver the polynucleotide solution",
          "Mild pinching may occur; numbing can be applied",
          "Session takes 20–30 minutes",
        ],
      },
      {
        icon: "/assets/treatments/polynucleotides-salmon-dna-icon-prep-after.png",
        label: "After",
        lead: "Gentle care supports the bio-stimulation process",
        points: [
          "Minor redness resolves within 24–48 hours",
          "Avoid makeup and active skincare for 12 hours",
          "No intense exercise or heat for 24 hours",
          "Skin quality improves progressively over 3–4 weeks",
        ],
      },
    ],
  },
  trusted: {
    title: "malta's trusted clinic for salmon dna",
    subtitle: "DOCTOR-LED salmon dna IN MALTA",
    asSeenOn: ["/assets/press/lovin-malta.jpeg", "/assets/press/malta-daily.png", "/assets/press/bay.jpeg", "/assets/press/times-of-malta.png", "/assets/press/malta-today.jpg"],
    images: [
      "/assets/treatments/polynucleotides-salmon-dna-trusted-1.png",
      "/assets/treatments/polynucleotides-salmon-dna-trusted-2.png",
      "/assets/treatments/polynucleotides-salmon-dna-trusted-3.png",
      "/assets/treatments/polynucleotides-salmon-dna-trusted-4.png",
    ],
    points: [
      { title: "medically qualified practitioners", desc: "Every salmon dna treatment is performed by a qualified doctor." },
      { title: "Advanced Facial Anatomy Expertise", desc: "Precision salmon dna techniques tailored to your unique facial anatomy." },
      { title: "Personalised Treatment Plans", desc: "Your salmon dna plan is designed to enhance, never overcorrect." },
      { title: "Clinically Approved Products", desc: "Clinically Approved Products — CE-marked, clinically approved salmon dna and evidence-based protocols." },
      { title: "Thousands of Treatments Performed", desc: "Experience and results you can trust, right here in Malta." },
    ],
  },
  difference: {
    kicker: "the carisma difference",
    title: "malta’s #1 leading wellness chain",
    commitmentTitle: "our commitment",
    commitment: [
      "Natural, refined salmon dna results, never overdone, never frozen",
      "Doctor-led treatments with advanced facial anatomy expertise",
      "Safe, ethical care using clinically approved products",
      "A personalised journey from consultation to aftercare",
    ],
    whyTitle: "WHY MALTA CHOOSES Carisma for botox",
    why: [
      "Created by the team behind Malta’s leading spa and medical aesthetics centres",
      "Doctor-led salmon dna treatments with a focus on safety and long-term results",
      "A personalised journey from consultation to aftercare",
      "Seamless experience with ongoing support and guidance",
    ],
    mapQuery: "Carisma Aesthetics, Malta",
  },
  bookingForm: { title: "BOOK YOUR salmon dna APPOINTMENT TODAY" },
  recommended: {
    title: "recommended with salmon dna",
    items: [
      { label: "hydrafacial", href: "/hydrafacial", image: "/assets/treatments/polynucleotides-salmon-dna-rec-hydrafacial.avif" },
      { label: "botox", href: "/wrinkle-relaxing-malta", image: "/assets/treatments/polynucleotides-salmon-dna-rec-botox.avif" },
      { label: "Microneedling", href: "/microneedling-malta", image: "/assets/treatments/polynucleotides-salmon-dna-rec-microneedling.png" },
      { label: "PRp", href: "/prp-malta", image: "/assets/treatments/polynucleotides-salmon-dna-rec-prp.avif" },
    ],
  },
  faqTitle: "faqs about polynucleotides in malta",
  faq: [
    { q: "What exactly are polynucleotides (Salmon DNA)?", a: "Polynucleotides are purified DNA molecules that stimulate skin repair, hydration, and collagen production. They work by helping your skin regenerate naturally — without altering your facial features." },
    { q: "Is the treatment safe?", a: "Yes. Polynucleotides are clinically proven, biocompatible, and widely used in regenerative aesthetics. They are injected in small amounts and are suitable even for delicate areas such as the under-eyes." },
    { q: "Which areas can be treated?", a: "Common treatment areas include under-eyes, face, neck, décolletage, and hands. They are especially effective where the skin is thin, dull, or showing early signs of aging." },
    { q: "How soon will I see results?", a: "You may notice improved hydration quickly, but the most visible changes — smoother texture, brighter skin, and improved elasticity — develop gradually over 2–6 weeks." },
    { q: "How many sessions do I need?", a: "A course of 2–4 sessions is typically recommended for best results, spaced 2–3 weeks apart. Maintenance every 6–12 months helps prolong the rejuvenating effects." },
    { q: "Does the treatment hurt?", a: "Most clients find the treatment very tolerable. A topical numbing cream can be applied to ensure comfort, especially for sensitive areas like the under-eyes." },
    { q: "Is there downtime?", a: "Downtime is minimal. You may experience slight redness or puffiness for a few hours, and mild swelling in treated areas for 1–2 days." },
    { q: "Can I combine polynucleotides with other treatments?", a: "Absolutely. They pair beautifully with Hydrafacial, Microneedling, PRP, and Botox for enhanced skin quality and long-lasting rejuvenation." },
    { q: "Who is a good candidate?", a: "Polynucleotides are ideal for anyone seeking smoother, brighter, healthier-looking skin — especially if you’ve noticed dullness, dehydration, crepey texture, or early aging." },
    { q: "How long do the results last?", a: "Most clients enjoy results for 6–12 months, depending on skin condition, lifestyle, and the number of sessions completed." },
  ],
};

export default t;
