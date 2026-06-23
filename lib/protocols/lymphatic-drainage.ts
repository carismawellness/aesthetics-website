import type { ProtocolData } from "@/lib/protocols";

const A = "/assets/treatments";
const PRESS = ["/assets/press/malta-daily.png", "/assets/press/bay.jpeg", "/assets/press/lovin-malta.jpeg", "/assets/press/times-of-malta.png", "/assets/press/malta-today.jpg"];

const PACKAGE = [
  { label: "4x Lymphatic drainage massage", price: "€440" },
  { label: "4x access to spa & fitness facilities", price: "€140" },
  { label: "Tanita Body Composition Analysis", price: "€60" },
  { label: "€25 Carisma Aesthetics credit", price: "€25" },
  { label: "Complimentary Parking Validation", price: "" },
];

export const lymphaticDrainage: ProtocolData = {
  slug: "lympathic-drainage",
  hero: {
    kicker: "Expert LED BODY DETOX & CIRCULATION SUPPORT",
    title: "lymphatic drainage therapy",
    tagline: "",
    intro: "Our Lymphatic Drainage Therapy is a gentle, expert-guided treatment designed to stimulate your lymphatic system, helping your body eliminate toxins, reduce fluid retention, and restore natural balance.",
    items: PACKAGE,
    totalValue: "TOTAL VALUE: €665",
    today: "TODAY: €299 ONLY",
    individualNote: "€100 for individual sessions",
    cta: "Claim Your Spot Now",
    finePrint: [
      "* Eligibility and treatment recommendations depend on your health history and individual needs. A clear plan will always be discussed during your consultation before starting. Lymphatic drainage is a supportive wellness therapy and may not be suitable for certain medical conditions. Treatment is provided following professional assessment by our medical team.",
    ],
    video: `${A}/vid-lympathic-drainage.mp4`,
  },
  secret: {
    heading: "The secret to a more defined, confident look",
    sub: "when hunger, not willpower, is holding you back",
    image: `${A}/lympathic-drainage-secret.png`,
    paragraphs: [
      "You eat well, try to stay active, and take care of yourself — yet your body still feels bloated, tight, or sluggish. Swelling comes and goes, your skin feels puffy, and recovery feels slower than it should. You know something feels “off,” but it’s hard to explain — and harder to fix on your own.",
      "If you’re reading this and thinking, “This sounds like me,” the issue may not be lifestyle or effort. Often, it’s your lymphatic system struggling to drain efficiently. When lymph flow is slow, fluids and toxins can build up in the body.",
      "Lymphatic Drainage Therapy gently stimulates your lymphatic system, supporting natural detoxification, improved circulation, and reduced fluid retention — helping your body feel lighter, more balanced, and refreshed again.",
    ],
    bullets: [
      "You wake up feeling swollen or heavy",
      "Bloating or fluid retention comes back repeatedly",
      "Your body feels tight, congested, or slow to recover",
      "You’re tired of solutions that don’t address the root cause",
    ],
    cta: "Claim Your Spot Now",
  },
  trusted: {
    heading: "Malta’s trusted clinic for",
    headingSub: "Medical lymphatic drainage therapy",
    pressLogos: PRESS,
    features: [
      { icon: `${A}/lympathic-drainage-feat1.png`, label: "MEDICALLY GUIDED APPROACH", desc: "Your lymphatic drainage treatment is overseen by medical professionals, with careful assessment of your health history to ensure the therapy is safe, appropriate, and effective for your body." },
      { icon: `${A}/lympathic-drainage-feat2.png`, label: "LYMPHATIC FLOW & DETOX SUPPORT", desc: "Gentle, targeted techniques are used to stimulate lymph flow, helping reduce fluid retention, support natural detoxification, and relieve feelings of heaviness and congestion." },
      { icon: `${A}/lympathic-drainage-feat3.png`, label: "Expert-DESIGNED TREATMENT PLAN", desc: "Your in-person consultation helps determine suitability, treatment frequency, and realistic outcomes — ensuring lymphatic drainage is delivered as part of a structured, personalised wellness plan." },
      { icon: `${A}/lympathic-drainage-feat4.png`, label: "SAFE AND CLINICALLY CERTIFIED", desc: "All treatments are performed under clinical standards, using medically approved techniques, with professional supervision to prioritise comfort, safety, and results at every stage." },
    ],
  },
  eligibility: {
    kicker: "Benefits of lymphatic drainage",
    heading: "What is all the hype with debloating",
    image: `${A}/lympathic-drainage-benefits.png`,
    areasIntro: "SUPPORTS DETOXIFICATION, CIRCULATION & FLUID BALANCE",
    areas: [
      "Helps reduce fluid retention, swelling, and bloating",
      "Supports lymphatic flow and natural toxin elimination",
      "Designed to promote a lighter, more balanced feeling in the body",
      "Always provided as part of a medically guided wellness approach",
    ],
  },
  modality: {
    kicker: "",
    heading: "",
    name: "Lymphatic drainage therapy",
    tag: "",
    tagSub: "",
    baImage: `${A}/lympathic-drainage-consultation.jpg`,
    intro: "The lymphatic system plays a vital role in fluid balance, detoxification, and immune support. When lymph flow becomes sluggish, fluid and waste can accumulate in the body — leading to bloating, swelling, heaviness, and slow recovery. Lymphatic Drainage Therapy uses gentle, targeted techniques to stimulate lymph flow, helping the body naturally eliminate excess fluids and toxins while supporting circulation and overall wellbeing. At our clinic, lymphatic drainage is used as a therapeutic support, not a cosmetic shortcut:",
    bullets: [
      "You begin with a professional consultation to assess your health history, symptoms, and suitability for treatment.",
      "Your practitioner explains how lymphatic drainage works, what results to expect, and how often sessions may be recommended.",
      "Treatment is delivered using controlled, medically guided techniques — never aggressively or without assessment.",
      "We monitor your response and adjust frequency or approach as needed, ensuring comfort, safety, and effectiveness.",
      "If lymphatic drainage is not appropriate for you, we are clear and transparent — and guide you toward alternative therapies that better support your health and goals.",
    ],
  },
  difference1: {
    kicker: "the carisma difference",
    heading: "We are not another diet clinic.",
    intro: "We’re a doctor led transformation program that blends medical insight, sustainable nutrition, and modern body tech into one high touch system, so you don’t just lose weight, you step into your strongest form.",
    bullets: [
      "Doctor led: full medical check and body scan",
      "One integrated program: medical, diet, movement and treatments together",
      "Real gym included: Technogym facility, semi-private classes and PT",
      "High touch support: weekly check ins, progress reports and WhatsApp follow up",
      "Evidence based devices: Emsculpt NEO, coolsculpting and RF skin tightening",
      "Selective entry and measurable weight loss results guaranteed",
    ],
  },
  starterPack: {
    heading: "4 core pillars of our methodology",
    cols: [
      { title: "ELIGIBILITY & ASSESSMENT", desc: "Every lymphatic drainage journey begins with a professional consultation to assess suitability, health history, and individual concerns before treatment is recommended." },
      { title: "LYMPHATIC FLOW & DETOX SUPPORT", desc: "Gentle, targeted lymphatic techniques are used to stimulate lymph flow, helping reduce fluid retention, support detoxification, and improve circulation in a controlled, therapeutic way." },
      { title: "SAFE, SUPPORTIVE APPROACH", desc: "This is not an aggressive or cosmetic-only treatment. Lymphatic drainage is delivered as part of a structured wellness approach, prioritising comfort, safety, and sustainable results." },
    ],
    items: PACKAGE,
    totalValue: "Total Value: €665. Today:",
    today: "€199 Only",
    finePrint: [
      "* Eligibility and treatment recommendations depend on your health history and individual needs. A clear plan will always be discussed during your consultation before starting. Lymphatic drainage is a supportive wellness therapy and may not be suitable for certain medical conditions. Treatment is provided following professional assessment by our medical team.",
    ],
    cta: "CLAIM MY SPOT NOW",
  },
  difference2: {
    kicker: "the carisma difference",
    heading: "Malta’s #1 leading wellness chain",
    commitmentTitle: "our commitment",
    commitment: [
      "Visible inch loss and shape change, not vague promises",
      "Plans that work with your age, hormones and metabolism",
      "No crash diets, no banned foods, no endless hours of cardio",
      "Medical grade technology and treatments delivered by trained professionals",
    ],
    whyTitle: "WHY MALTA CHOOSES Carisma",
    why: [
      "Created by the team behind Malta’s leading spa and medical aesthetics centres",
      "Doctor led medical slimming, not a beauty salon “diet program”",
      "All in one approach: assessment, nutrition, movement and treatments",
      "High touch support with weekly check ins and WhatsApp coaching",
    ],
    cta: "Claim your spot now",
    parking: "Complimentary on-site parking",
  },
  faq: [
    { q: "1. What is lymphatic drainage therapy?", a: "Lymphatic drainage therapy is a gentle, non-invasive treatment designed to stimulate the lymphatic system. It helps support the natural movement of lymph fluid in the body, aiding detoxification, reducing fluid retention, and improving circulation and overall wellbeing." },
    { q: "2. What concerns can lymphatic drainage help with?", a: "Lymphatic drainage is commonly used to support bloating, swelling, fluid retention, feelings of heaviness, sluggish circulation, and post-procedure recovery. It may also help promote relaxation and a lighter, more balanced feeling in the body." },
    { q: "3. Is lymphatic drainage a massage?", a: "No. While the treatment uses light, manual techniques, medical lymphatic drainage is not a traditional massage. The pressure and movements are specifically designed to stimulate lymph flow rather than muscles, and it is delivered with clinical intent rather than relaxation alone." },
    { q: "4. How many sessions will I need?", a: "The number of sessions varies depending on your individual needs, goals, and how your body responds. Some people notice benefits after one session, while others may be advised to follow a short course of treatments for optimal support. This will be discussed during your consultation." },
    { q: "5. Is lymphatic drainage safe?", a: "When performed by trained professionals following medical guidelines, lymphatic drainage is considered a safe and gentle therapy. A consultation is always required to ensure the treatment is appropriate for your health history and current condition." },
    { q: "6. Does the treatment hurt?", a: "No. Lymphatic drainage uses very light, rhythmic movements and should not be painful. Most clients describe the treatment as calming and comfortable, and some find it deeply relaxing." },
    { q: "7. Is lymphatic drainage suitable for everyone?", a: "Lymphatic drainage may not be suitable for everyone. Certain medical conditions, pregnancy, or active infections may require medical clearance or alternative treatments. Suitability is always confirmed during your consultation." },
    { q: "8. What should I do after my session?", a: "After treatment, you may be advised to stay well hydrated and allow your body time to respond. Some people notice increased urination or a lighter feeling shortly after the session. Your practitioner may also recommend follow-up sessions or simple lifestyle tips to support results." },
  ],
  research: {
    heading: "CLINICAL RESEARCH: BASIS OF OUR METODOLOGY",
    sub: "Evidence based approach",
    cards: [
      {
        image: `${A}/lympathic-drainage-research1.png`,
        title: "manual lymphatic drainage (mld) for swelling & fluid retention",
        whatItDoes: "Manual Lymphatic Drainage uses light, rhythmic techniques to encourage lymph flow and help the body move excess fluid. It’s commonly used to reduce swelling, heaviness, and that “puffy” feeling—especially in legs, abdomen, and face.",
        keyResults: [
          "Clinical literature supports MLD as a helpful approach for managing swelling and improving comfort in people prone to fluid build-up, particularly when performed as part of a structured plan.",
          "Patient-reported outcomes often include reduced limb heaviness, improved mobility, and improved day-to-day comfort when lymphatic techniques are used consistently.",
          "Gentle technique", "Targets fluid build-up", "Best in structured plan",
        ],
        evidence: "Moderate-high evidence",
      },
      {
        image: `${A}/lympathic-drainage-research2.png`,
        title: "lymphatic drainage for post-procedure puffiness & recovery support",
        whatItDoes: "After certain aesthetic or body procedures, lymphatic-focused techniques may support recovery by helping the body clear temporary fluid build-up, easing tightness, and improving comfort as tissues settle.",
        keyResults: [
          "Post-procedure protocols frequently include lymphatic-style massage as supportive care to help manage swelling and improve the recovery experience",
          "Many clients report reduced puffiness and a more comfortable recovery when sessions are timed appropriately and delivered by trained practitioners.",
          "Recovery support", "Comfort-focused", "Timing matters",
        ],
        evidence: "Moderate evidence",
      },
      {
        image: `${A}/lympathic-drainage-research3.png`,
        title: "de-bloating & “lightness” effect via improved fluid movement",
        whatItDoes: "Lymphatic drainage can help reduce the sensation of bloating and puffiness by supporting fluid movement—especially for people affected by travel, inactivity, hormonal cycles, or high-salt intake.",
        keyResults: [
          "In practice, many clients experience a visible “de-puffed” look and a lighter feeling shortly after a session, particularly in areas prone to water retention.",
          "When combined with hydration, movement, and consistent sessions, results tend to be more noticeable and longer-lasting.",
          "De-bloating support", "Travel & lifestyle friendly", "Works best consistently",
        ],
        evidence: "Moderate evidence",
      },
      {
        image: `${A}/lympathic-drainage-research4.png`,
        title: "safety profile of professional lymphatic drainage (when screened properly)",
        whatItDoes: "Lymphatic drainage is typically gentle and well-tolerated. With proper screening (e.g., infection, clot risk, heart/kidney conditions), it’s commonly used as a supportive wellness and recovery approach.",
        keyResults: [
          "The technique is light-pressure and non-invasive, making it suitable for many people seeking swelling reduction and comfort—provided contraindications are ruled out.",
          "Most people report it feels relaxing, with common “after effects” being increased urination, lightness, and reduced tightness—especially when well hydrated.",
          "Gentle & non-invasive", "Requires basic screening", "Comfort-first approach",
        ],
        evidence: "Moderate evidence",
      },
    ],
    cta: "CLAIM your SPOT NOW",
  },
};
