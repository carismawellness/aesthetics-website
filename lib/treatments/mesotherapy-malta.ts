import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "mesotherapy-malta",
  category: "Face",
  hero: {
    title: "mesotherapy & skin boosters",
    subtitle: "Are you seeking a brighter, smoother, and more youthful complexion?",
    body: "Looking for a non-invasive way to rejuvenate your skin? Our Mesotherapy treatments in Malta can help! Our team uses a personalized blend of skin boosters (hyaluronic acid), vitamins, minerals, and amino acids to restore your skin's natural radiance and vitality.",
    prices: [
      { label: "1 session", price: "from €199" },
      { label: "2 sessions", price: "from €349 (€175/session)" },
      { label: "3 sessions", price: "from €499 (€167/session)" },
    ],
    cta: "BOOK YOUR MESOTHERAPY SESSION NOW",
    image: "/assets/treatments/mesotherapy-malta-hero.png",
    imageRatio: "468 / 373",
    productTabs: ["/assets/treatments/mesotherapy-malta-logo-bcn.png", "/assets/treatments/mesotherapy-malta-logo-teoxane.png", "/assets/treatments/mesotherapy-malta-logo-fillmed.png", "/assets/treatments/mesotherapy-malta-logo-croma.png"],
    heroForm: true,
  },
  info: [
    { metric: "Procedure Time", detail: "30-60 minutes" },
    { metric: "Downtime", detail: "Dependent of concern" },
    { metric: "Results Last For", detail: "Maintenance may be required" },
    { metric: "Results Visible In", detail: "Dependent of concern" },
    { metric: "Anaesthetic", detail: "Anesthetic cream" },
  ],
  beforeAfterTitle: "mesotherapy results",
  beforeAfter: [
    { before: "/assets/treatments/mesotherapy-malta-ba1-before.jpg", after: "/assets/treatments/mesotherapy-malta-ba1-after.jpg", label: "Hair Regrowth" },
    { before: "/assets/treatments/mesotherapy-malta-ba2-before.jpg", after: "/assets/treatments/mesotherapy-malta-ba2-after.jpg", label: "Hair Regrowth" },
    { before: "/assets/treatments/mesotherapy-malta-ba3-before.jpg", after: "/assets/treatments/mesotherapy-malta-ba3-after.jpg", label: "Skin Rejuvenation" },
    { before: "/assets/treatments/mesotherapy-malta-ba4-before.jpg", after: "/assets/treatments/mesotherapy-malta-ba4-after.jpg", label: "Skin Rejuvenation" },
    { before: "/assets/treatments/mesotherapy-malta-ba5-before.jpg", after: "/assets/treatments/mesotherapy-malta-ba5-after.jpg", label: "Skin Rejuvenation" },
  ],
  precision: {
    title: "precision areas of refinement",
    intro: "Active ingredients are delivered directly into the skin where they are needed most. Below are the primary treatment zones.",
    areas: [
      { zone: "Face", icon: "/assets/treatments/mesotherapy-malta-icon-face.png", name: "Full Face Glow", desc: "Nourishes the skin with vitamins and hyaluronic acid for visible hydration and luminosity" },
      { zone: "Pigment", icon: "/assets/treatments/mesotherapy-malta-icon-pigment.png", name: "Pigmentation", desc: "Targets uneven tone and dark patches with brightening actives delivered into the mesoderm." },
      { zone: "Eyes", icon: "/assets/treatments/mesotherapy-malta-icon-eyes.png", name: "Under-Eye Area", desc: "Addresses dark circles and fine crepiness with targeted microinjections of revitalising nutrients" },
      { zone: "Neck", icon: "/assets/treatments/mesotherapy-malta-icon-neck.png", name: "Neck and Chest", desc: "Revitalises the neck and decolletage where sun damage and dehydration are most pronounced." },
    ],
    additionalTitle: "Your cocktail of active ingredients is customised based on your skin assessment.",
    additional: "Scalp, hands, inner arms, acne-prone zones, dull skin patches, lip area",
  },
  suitability: {
    title: "is this suitable for you?",
    intro: "Mesotherapy delivers vitamins, minerals, and hyaluronic acid directly into the skin for targeted nourishment. Results are cumulative, meaning each session builds on the last. A course-based approach delivers the most visible improvement.",
    suitableFor: [
      "Your skin looks dull, tired, or dehydrated and you want a visible boost",
      "You want a customised cocktail tailored to your specific skin concerns",
      "You are open to a course of 3 to 6 sessions for progressive improvement",
      "You are interested in targeted treatment for pigmentation or skin tone",
      "You want a treatment that can be combined with other skin therapies",
    ],
    notIdeal: [
      "You are looking for structural changes like lifting or volume",
      "You expect a single session to deliver your final result",
      "You are pregnant, breastfeeding, or have active skin infection in the area",
      "You are on blood-thinning medication without medical clearance",
      "You have a known allergy to any common mesotherapy ingredients",
    ],
  },
  experience: {
    title: "your treatment experience", cta: "BOOK YOUR FREE CONSULTATION",
    steps: [
      { title: "personalised consultation", desc: "We assess your facial anatomy, skin condition, medical history, and mesotherapy goals with one of our doctors.", image: "/assets/treatments/botox-step1.png" },
      { title: "Structured Plan", desc: "Your doctor designs a medically guided mesotherapy plan tailored to your facial structure and desired outcome.", image: "/assets/treatments/botox-step2.png" },
      { title: "Targeted Treatments", desc: "Your doctor administers mesotherapy with fine, precise injections, quick, comfortable, and no downtime.", image: "/assets/treatments/botox-step3.png" },
      { title: "Ongoing Review & Adjustment", desc: "Your doctor monitors your response and refines the plan to ensure natural mesotherapy results over time.", image: "/assets/treatments/botox-step4.png" },
    ],
  },
  prepAftercare: {
    kicker: "PREPARATION & AFTERCARE",
    title: "your session, step by step",
    intro: "Microinjections deliver active nutrients directly where your skin needs them most.",
    cards: [
      {
        icon: "/assets/treatments/mesotherapy-malta-icon-prep-before.png",
        label: "BEFORE",
        lead: "A few easy steps prepare your skin for treatment.",
        points: [
          "Discuss skin concerns and current routine",
          "Disclose medications and active conditions",
          "Avoid retinoids and exfoliants for 48 hours",
          "Arrive with clean, product-free skin",
        ],
      },
      {
        icon: "/assets/treatments/mesotherapy-malta-icon-prep-during.png",
        label: "DURING",
        lead: "A customised cocktail targets your specific concerns.",
        points: [
          "Active ingredients are selected for your needs",
          "Fine needles target the mesoderm layer",
          "Mild tingling is normal throughout",
          "Session takes 30–45 minutes",
        ],
      },
      {
        icon: "/assets/treatments/mesotherapy-malta-icon-prep-after.png",
        label: "AFTER",
        lead: "Allow the active ingredients time to work.",
        points: [
          "Avoid makeup and active products for 12 hours",
          "Pin-point marks and redness fade within 24 hours",
          "No direct sun exposure for 48 hours",
          "Results build progressively with each session",
        ],
      },
    ],
  },
  patientVideos: {
    title: "real patients, real confidence",
    intro: "Every face is unique. Every story is personal. Discover how our mesotherapy patients describe their journey to refined, natural results at Carisma Aesthetics in Malta.",
    videos: [
      "/assets/treatments/vid-mesotherapy-malta-1.mp4",
      "/assets/treatments/vid-mesotherapy-malta-2.mp4",
      "/assets/treatments/vid-mesotherapy-malta-3.mp4",
    ],
  },
  trusted: {
    title: "malta's trusted clinic for mesotherapy",
    subtitle: "DOCTOR-LED mesotherapy IN MALTA",
    asSeenOn: ["/assets/press/lovin-malta.jpeg", "/assets/press/malta-daily.png", "/assets/press/bay.jpeg", "/assets/press/times-of-malta.png", "/assets/press/malta-today.jpg"],
    images: ["/assets/treatments/trusted-clinic-collage.png"],
    points: [
      { title: "medically qualified practitioners", desc: "Every mesotherapy treatment is performed by a qualified doctor." },
      { title: "Advanced Facial Anatomy Expertise", desc: "Precision mesotherapy peel techniques tailored to your unique facial anatomy." },
      { title: "Personalised Treatment Plans", desc: "Precision chemical peel techniques tailored to your unique facial anatomy." },
      { title: "Clinically Approved Products", desc: "Clinically Approved Products — CE-marked, clinically approved mesotherapy and evidence-based protocols." },
      { title: "Thousands of Treatments Performed", desc: "Experience and results you can trust, right here in Malta." },
    ],
  },
  difference: {
    kicker: "the carisma difference",
    title: "malta’s #1 leading wellness chain",
    commitmentTitle: "our commitment",
    commitment: [
      "Natural, refined mesotherapy results, never overdone",
      "Doctor-led treatments with advanced facial anatomy expertise",
      "Safe, ethical care using clinically approved products",
      "A personalised journey from consultation to aftercare",
    ],
    whyTitle: "Why Malta Chooses Carisma for Mesotherapy",
    why: [
      "Created by the team behind Malta’s leading spa and medical aesthetics centres",
      "Doctor-led mesotherapy treatments with a focus on safety and long-term results",
      "A personalised journey from consultation to aftercare",
      "Seamless experience with ongoing support and guidance",
    ],
    mapQuery: "Carisma Aesthetics, Malta",
  },
  bookingForm: { title: "BOOK YOUR mesotherapy APPOINTMENT TODAY" },
  recommended: {
    title: "recommended with mesotherapy",
    items: [
      { label: "COLLAGEN STIMULATOR", href: "/collagen-stimulator-malta", image: "/assets/treatments/mesotherapy-malta-rec-collagen.avif" },
      { label: "prp", href: "/prp-malta", image: "/assets/treatments/mesotherapy-malta-rec-prp.avif" },
      { label: "microneedling", href: "/microneedling-malta", image: "/assets/treatments/mesotherapy-malta-rec-microneedling.avif" },
      { label: "chemical peels", href: "/chemical-peels-malta", image: "/assets/treatments/mesotherapy-malta-rec-chemical-peels.avif" },
    ],
  },
  faqTitle: "Frequently asked questions",
  faq: [
    {
      q: "What is mesotherapy, and how does it work?",
      a: "Mesotherapy is a non-surgical cosmetic treatment that involves injecting a combination of vitamins, minerals, amino acids, skin booster (hyaluronic acid), and plant extracts into the skin to rejuvenate and tighten it, as well as to remove excess fat. The treatment aims to improve circulation, deep hydratation, stimulate collagen production, and boost skin elasticity, resulting in a more youthful and refreshed appearance.",
    },
    {
      q: "What can I expect during a mesotherapy treatment?",
      a: "During a mesotherapy session, a qualified practitioner will administer a series of small injections containing the tailored solution into the middle layer (mesoderm) of your skin. The procedure is relatively quick, usually taking about 30-60 minutes to complete. Depending on the treatment area and desired results, you may require multiple sessions spaced several weeks apart.",
    },
    {
      q: "Is mesotherapy painful?",
      a: "While some people may experience mild discomfort during mesotherapy injections, the pain is generally well-tolerated. To minimize discomfort, your practitioner may apply a numbing cream or use a local anesthetic before the treatment. The use of very fine needles also helps reduce pain during the procedure.",
    },
    {
      q: "What is the recovery time for mesotherapy?",
      a: "Recovery time after mesotherapy is typically minimal. You may experience some redness, swelling, or bruising at the injection sites, but these side effects usually subside within a few days. Most people can return to their normal activities immediately after the treatment, although it's essential to follow your practitioner's post-treatment care instructions to ensure proper healing and optimal results.",
    },
    {
      q: "How long does it take to see the results of mesotherapy?",
      a: "Results from mesotherapy can vary depending on the individual and the treatment area. Some people may see noticeable improvements after just one session, while others may require multiple treatments to achieve their desired results. Generally, the full effects of mesotherapy become apparent within a few weeks to a few months after the treatment.",
    },
    {
      q: "Are there any side effects or risks associated with mesotherapy?",
      a: "As with any cosmetic procedure, there can be side effects and risks associated with mesotherapy. Common side effects include temporary redness, swelling, and bruising at the injection sites. In rare cases, more serious complications such as infection, allergic reactions, or uneven results may occur. It's essential to consult with a qualified practitioner to minimize risks and ensure proper treatment.",
    },
    {
      q: "Who is a good candidate for mesotherapy?",
      a: "Mesotherapy is suitable for most adults who are in good health and want to address cosmetic concerns such as skin rejuvenation, cellulite reduction, or localized fat reduction. However, individuals with certain medical conditions or pregnant or breastfeeding women should avoid mesotherapy. A thorough consultation with a qualified practitioner is necessary to determine if mesotherapy is the right treatment for you.",
    },
    {
      q: "What is Skinbooster?",
      a: "Skinbooster is a specific type of mesotherapy that focuses on skin hydration and quality, it uses injections to deliver a blend of vitamins and hyaluronic acid deep into the skin. It aims to improve skin quality and hydration. By promoting collagen production, this procedure can help reduce fine lines and, wrinkles, resulting in a more radiant and youthful look.",
    },
  ],
};

export default t;
