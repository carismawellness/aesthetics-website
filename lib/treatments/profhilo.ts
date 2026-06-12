import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "profhilo",
  category: "Face",
  hero: {
    title: "profhilo",
    subtitle: "Are you looking to refresh & revitalize your skin?",
    body: "Looking for a non-invasive way to rejuvenate your skin? Profhilo treatments in Malta can help! Carisma Aesthetics offers this revolutionary hyaluronic acid treatment to boost hydration, firmness, and radiance. Book your appointment today and experience youthful, glowing skin!",
    location: "Book your consultation to learn more now!",
    prices: [
      { label: "1 session", price: "from €279" },
      { label: "2 sessions", price: "from €449 (€224/session)" },
      { label: "3 sessions", price: "from €649 (€216/session)" },
    ],
    cta: "BOOK YOUR SESSION NOW",
    image: "/assets/treatments/profhilo-hero.avif",
    brandLogos: ["/assets/treatments/profhilo-logo.png"],
    imageRatio: "450 / 358",
    bgImage: "/assets/treatments/profhilo-hero-bg.png",
    heroForm: true,
  },
  info: [
    { metric: "Procedure Time", detail: "30-60 minutes" },
    { metric: "Downtime", detail: "Dependent of concern" },
    { metric: "Results Last For", detail: "Maintenance may be required" },
    { metric: "Results Visible In", detail: "Dependent of concern" },
    { metric: "Anaesthetic", detail: "Anesthetic cream" },
  ],
  beforeAfterTitle: "profhilo results",
  beforeAfter: [
    { before: "/assets/treatments/profhilo-ba1-before.png", after: "/assets/treatments/profhilo-ba1-after.png" },
    { before: "/assets/treatments/profhilo-ba2-before.jpg", after: "/assets/treatments/profhilo-ba2-after.jpg" },
  ],
  precision: {
    title: "precision areas of refinement",
    intro: "Each botox treatment is carefully applied to specific anatomical areas by our doctors. Below are the most commonly treated zones at our Malta clinic.",
    areas: [
      { zone: "Face", icon: "/assets/treatments/profhilo-icon-face.png", name: "Full Face", desc: "Restores deep hydration and firmness across the face using five precise bio-injection points." },
      { zone: "Neck", icon: "/assets/treatments/profhilo-icon-neck.png", name: "Neck", desc: "Addresses crepey texture and laxity in the neck, an area that often reveals early ageing." },
      { zone: "Chest", icon: "/assets/treatments/profhilo-icon-chest.png", name: "Decolletage", desc: "Improves skin quality across the chest where sun exposure and thinning skin are most visible." },
      { zone: "Hands", icon: "/assets/treatments/profhilo-icon-hands.png", name: "Hands", desc: "Replenishes hydration and volume in the hands, restoring a smoother, more youthful appearance." },
    ],
    additionalTitle: "Your treatment plan is personalised based on skin quality assessment across multiple zones.",
    additional: "Inner arms, above the knee, under-eye area, jawline laxity, forehead skin quality",
  },
  suitability: {
    title: "is this suitable for you?",
    intro: "Profhilo is a skin quality treatment, not a filler. It hydrates and firms from within without adding volume or changing your facial structure. If your skin feels tired or has lost its bounce, this may be what it needs.",
    suitableFor: [
      "Your skin feels dehydrated, dull, or has lost its firmness",
      "You want a subtle refresh that still looks like you",
      "You are happy to complete the recommended two-session protocol, four weeks apart",
      "You prefer a treatment that works with your skin's own biology",
      "You are looking for a subtle, gradual improvement that builds over time",
    ],
    notIdeal: [
      "You are looking for volume, contouring, or structural changes to your face",
      "You expect dramatic results from a single session",
      "You are pregnant, breastfeeding, or have active infection in the treatment area",
      "You want immediate, visible lifting or tightening",
      "You are not yet ready for an in-person consultation to assess suitability",
    ],
  },
  experience: {
    title: "your treatment experience", cta: "BOOK YOUR FREE CONSULTATION",
    steps: [
      { title: "personalised consultation", desc: "We assess your facial anatomy, skin condition, medical history, and botox goals with one of our doctors.", image: "/assets/treatments/profhilo-step1.png" },
      { title: "Structured Plan", desc: "Your doctor designs a medically guided botox plan tailored to your facial structure and desired outcome.", image: "/assets/treatments/profhilo-step2.png" },
      { title: "Targeted Treatments", desc: "Your doctor administers botox using fine, precise injections, quick, comfortable, and no downtime.", image: "/assets/treatments/profhilo-step3.png" },
      { title: "Ongoing Review & Adjustment", desc: "Your doctor monitors your response and refines the plan to ensure natural botox results over time.", image: "/assets/treatments/profhilo-step4.png" },
    ],
  },
  prepAftercare: {
    kicker: "Preparation & Aftercare",
    title: "your session, step by step",
    intro: "This gentle bio-remodelling treatment requires minimal preparation. Here is what to expect at each stage.",
    cards: [
      {
        icon: "/assets/treatments/profhilo-icon-prep-before.png",
        label: "Before",
        lead: "Minimal preparation is needed for this treatment.",
        points: [
          "Discuss your skin concerns and goals",
          "Disclose medications and active skin conditions",
          "Avoid blood thinners and alcohol for 24 hours",
          "Arrive with clean, product-free skin",
        ],
      },
      {
        icon: "/assets/treatments/profhilo-icon-prep-during.png",
        label: "During",
        lead: "A precise protocol delivered in under 30 minutes.",
        points: [
          "Five injection points placed on each side",
          "Standardised bio-aesthetic point technique",
          "Mild discomfort is brief and well-tolerated",
          "Session takes 20–30 minutes",
        ],
      },
      {
        icon: "/assets/treatments/profhilo-icon-prep-after.png",
        label: "After",
        lead: "Let the hyaluronic acid integrate naturally.",
        points: [
          "Small bumps at injection sites resolve within hours",
          "Avoid makeup for 6–8 hours post-treatment",
          "No intense heat or exercise for 24 hours",
          "Optimal results after two sessions, four weeks apart",
        ],
      },
    ],
  },
  trusted: {
    title: "malta's trusted clinic for profhilio",
    subtitle: "Doctor-Led profhilo in Malta",
    asSeenOn: ["/assets/press/lovin-malta.jpeg", "/assets/press/malta-daily.png", "/assets/press/bay.jpeg", "/assets/press/times-of-malta.png", "/assets/press/malta-today.jpg"],
    images: [
      "/assets/treatments/profhilo-trusted1.png",
      "/assets/treatments/profhilo-trusted2.png",
      "/assets/treatments/profhilo-trusted3.png",
      "/assets/treatments/profhilo-trusted4.png",
    ],
    points: [
      { title: "medically qualified practitioners", desc: "Every profhilo treatment is performed by a qualified doctor." },
      { title: "Advanced Facial Anatomy Expertise", desc: "Precision profhilo techniques tailored to your unique facial anatomy." },
      { title: "Personalised Treatment Plans", desc: "Your profhilo plan is designed to enhance, never overcorrect." },
      { title: "Clinically Approved Products", desc: "Clinically Approved Products — CE-marked, clinically approved profhilo and evidence-based protocols." },
      { title: "Thousands of Treatments Performed", desc: "Experience and results you can trust, right here in Malta." },
    ],
  },
  difference: {
    kicker: "the carisma difference",
    title: "malta’s #1 leading wellness chain",
    commitmentTitle: "our commitment",
    commitment: [
      "Natural, refined profhilo results, never overdone, never frozen",
      "Doctor-led treatments with advanced facial anatomy expertise",
      "Safe, ethical care using clinically approved products",
      "A personalised journey from consultation to aftercare",
    ],
    whyTitle: "WHY MALTA CHOOSES Carisma for profhilio",
    why: [
      "Created by the team behind Malta’s leading spa and medical aesthetics centres",
      "Doctor-led profhilo treatments with a focus on safety and long-term results",
      "A personalised journey from consultation to aftercare",
      "Seamless experience with ongoing support and guidance",
    ],
    mapQuery: "Carisma Aesthetics, Malta",
  },
  bookingForm: { title: "BOOK YOUR profhilo APPOINTMENT TODAY" },
  recommended: {
    title: "recommended with mesotherapy",
    items: [
      { label: "collagen stimulator", href: "/collagen-stimulator-malta", image: "/assets/treatments/profhilo-rec-collagen-stimulator.png" },
      { label: "platelet rich plasma", href: "/prp-malta", image: "/assets/treatments/profhilo-rec-prp.png" },
      { label: "Microneedling", href: "/microneedling-malta", image: "/assets/treatments/profhilo-rec-microneedling.png" },
      { label: "chemical peels", href: "/chemical-peels-malta", image: "/assets/treatments/profhilo-rec-chemical-peels.png" },
    ],
  },
  // NOTE: the live page's FAQ widget shows the "PICO Pigmentation" tab content by
  // default — these are the question/answer pairs actually visible on the live
  // /profhilo page, reproduced verbatim.
  faqTitle: "faqs about profhilo in malta",
  faq: [
    { q: "What is Pico Laser pigmentation treatment?", a: "Pico Laser treatment uses ultra-short laser pulses to target unwanted pigment beneath the skin. The pigment is broken into smaller particles, which the body can gradually clear over time." },
    { q: "What pigmentation concerns can it treat?", a: "It may help improve the appearance of sun spots, freckles, age spots, post-inflammatory pigmentation, uneven skin tone, and selected types of melasma. Suitability is confirmed during consultation." },
    { q: "How many sessions will I need?", a: "The number of sessions depends on the pigmentation type, depth, treatment area, skin tone, and individual response. Some concerns may improve after a few sessions, while others require a longer plan." },
    { q: "Is Pico Laser treatment painful?", a: "Most clients describe the sensation as quick snapping or mild warmth against the skin. Cooling and comfort measures may be used to make the treatment more comfortable." },
    { q: "Is there any downtime after treatment?", a: "Downtime is usually minimal, although temporary redness, warmth, sensitivity, mild swelling, or darkening of the treated pigment may occur. Your specialist will explain what to expect." },
    { q: "When will I see results?", a: "Visible improvement usually develops gradually as the treated pigment begins to fade. Results vary depending on the concern, skin type, treatment plan, and aftercare." },
    { q: "Is Pico Laser suitable for every skin type?", a: "Pico Laser can be suitable for a range of skin tones, but treatment settings must be carefully personalised. A professional skin assessment is essential before beginning treatment." },
    { q: "What should I avoid before my appointment?", a: "Avoid tanning, self-tanning products, and excessive sun exposure before treatment. You may also be advised to pause certain active skincare products for a short period." },
    { q: "What aftercare is required?", a: "Keep the treated area clean, protected, and moisturised as advised. Avoid picking or rubbing the skin, and use broad-spectrum sun protection to reduce the risk of further pigmentation." },
    { q: "Can pigmentation return after treatment?", a: "Pigmentation may return or new areas may develop due to sun exposure, hormones, inflammation, or other triggers. Consistent sun protection and appropriate skincare can help maintain your results." },
  ],
};

export default t;
