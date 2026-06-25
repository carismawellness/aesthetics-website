import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "mesotherapy-malta",
  category: "Face",
  hero: {
    title: "Mesotherapy Malta | Skin Boosters",
    subtitle: "Are you seeking a brighter, smoother, and more youthful complexion?",
    body: "Looking for a non-invasive way to rejuvenate your skin? Our Mesotherapy treatments in Malta can help! Our team uses a personalized blend of skin boosters (hyaluronic acid), vitamins, minerals, and amino acids to restore your skin's natural radiance and vitality.",
    prices: [
      { label: "1 session", price: "from €199" },
      { label: "2 sessions", price: "from €349 (€175/session)" },
      { label: "3 sessions", price: "from €499 (€167/session)" },
    ],
    cta: "BOOK YOUR MESOTHERAPY SESSION NOW",
    bookHref: "https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2800348&oiid=sv%3A25753601&share=true&pId=2708191",
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
    { before: "/assets/treatments/mesotherapy-malta-ba1-before.jpg", after: "/assets/treatments/mesotherapy-malta-ba1-after.jpg", label: "Scalp & Hair", name: "Marisa F.", review: "My part was getting so thin and wide — after a course my scalp looks fuller and far less visible." },
    { before: "/assets/treatments/mesotherapy-malta-ba2-before.jpg", after: "/assets/treatments/mesotherapy-malta-ba2-after.jpg", label: "Scalp & Hair", name: "Daniel R.", review: "The thinning at my crown was my biggest worry — the regrowth across the top genuinely surprised me." },
    { before: "/assets/treatments/mesotherapy-malta-ba3-before.jpg", after: "/assets/treatments/mesotherapy-malta-ba3-after.jpg", label: "Skin Rejuvenation", name: "Carmen V.", review: "The crepey lines around my cheek and mouth softened and my skin finally looks hydrated again." },
    { before: "/assets/treatments/mesotherapy-malta-ba4-before.jpg", after: "/assets/treatments/mesotherapy-malta-ba4-after.jpg", label: "Radiance & Tone", name: "Elise B.", review: "The redness and dullness across my cheeks evened out — I have a natural glow without makeup now." },
    { before: "/assets/treatments/mesotherapy-malta-ba5-before.jpg", after: "/assets/treatments/mesotherapy-malta-ba5-after.jpg", label: "Texture & Scarring", name: "Luke A.", review: "The old acne scarring on my cheek looks smoother and my skin texture is so much more even." },
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
  problem: {
    kicker: "The real reason people book",
    title: "Your skin looks tired and dull, even when you feel fine",
    body: [
      "Doctor-led mesotherapy feeds your skin hyaluronic acid, vitamins, and nutrients exactly where it has lost them — so you look hydrated, rested, and naturally radiant again.",
    ],
  },
  guarantee: {
    kicker: "The Natural Confidence Guarantee",
    title: "Natural Confidence Guarantee",
    paragraphs: [
      "Every plan starts with a doctor-led skin assessment and a natural-first approach that is never overdone, backed by a free follow-up review to keep your course on track until you are 100% satisfied with a result that still looks like you.",
    ],
    cta: "Book Your Free Consultation",
    points: [
      { value: "Doctor-led", label: "Assessment first", sub: "Never a salesperson" },
      { value: "Natural-first", label: "Custom cocktail", sub: "Tailored to your skin" },
      { value: "100%", label: "Satisfaction", sub: "Free follow-up review" },
    ],
  },
  suitability: {
    title: "Is this suitable for you?",
    intro: "Mesotherapy delivers vitamins, minerals, and hyaluronic acid directly into the skin for targeted nourishment. Results are cumulative, meaning each session builds on the last. A course-based approach delivers the most visible improvement.",
    personas: [
      { title: "The dull, dehydrated complexion", desc: "Your skin looks tired, flat, and thirsty — you want that lit-from-within glow back without changing your features." },
      { title: "The early-ageing skin", desc: "Fine lines, crepiness, and a loss of bounce are creeping in, and you want to feed and firm the skin before it progresses." },
      { title: "The targeted-concern patient", desc: "Uneven tone, dark under-eyes, or thinning scalp bother you, and you want a cocktail built around that exact concern." },
    ],
    suitableFor: [
      "Your skin looks dull, tired, or dehydrated and you want a visible boost",
      "You want a customised cocktail tailored to your specific skin concerns",
      "You are open to a course of 3 to 6 sessions for progressive improvement",
      "You are interested in targeted treatment for pigmentation or skin tone",
      "You want a treatment that can be combined with other skin therapies",
    ],
    notIdeal: [
      "You are hoping to restore lost volume or lift — that is what dermal fillers and collagen stimulators are for",
      "You need to see the full result after one session — mesotherapy builds gently over a course",
      "You are pregnant or breastfeeding — we will happily welcome you back afterwards",
      "You are on blood-thinning medication — we will simply ask for medical clearance first",
      "You have a known allergy to common mesotherapy ingredients — your consultation rules this out safely",
    ],
  },
  experience: {
    title: "Your treatment experience", cta: "BOOK YOUR FREE CONSULTATION",
    steps: [
      { title: "Consultation & Plan", desc: "One of our doctors assesses your skin condition, concerns, and medical history, then designs a personalised cocktail and session course built around your goals.", image: "/assets/treatments/botox-step1.png" },
      { title: "Targeted Treatment", desc: "Your doctor delivers the active ingredients into the mesoderm with fine, precise microinjections — quick, comfortable, and with minimal downtime.", image: "/assets/treatments/botox-step3.png" },
      { title: "Ongoing Review", desc: "Your doctor monitors how your skin responds across the course and refines the cocktail to keep your results natural and progressive.", image: "/assets/treatments/botox-step4.png" },
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
    title: "Real patients, real confidence",
    intro: "Every face is unique. Every story is personal. Discover how our mesotherapy patients describe their journey to refined, natural results at Carisma Aesthetics in Malta.",
    videos: [
      "/assets/treatments/vid-mesotherapy-malta-1.mp4",
      "/assets/treatments/vid-mesotherapy-malta-2.mp4",
      "/assets/treatments/vid-mesotherapy-malta-3.mp4",
    ],
  },
  trusted: {
    title: "Malta's trusted clinic for mesotherapy",
    subtitle: "DOCTOR-LED mesotherapy IN MALTA",
    asSeenOn: ["/assets/press/lovin-malta.jpeg", "/assets/press/malta-daily.png", "/assets/press/bay.jpeg", "/assets/press/times-of-malta.png", "/assets/press/malta-today.jpg"],
    images: ["/assets/treatments/trusted-clinic-collage.png"],
    points: [
      { title: "Medically Qualified Practitioners", desc: "Every mesotherapy treatment is performed by a qualified doctor." },
      { title: "Advanced Skin & Anatomy Expertise", desc: "Precise injection depth and technique tailored to your unique skin and concern." },
      { title: "Personalised Cocktails", desc: "Your blend of hyaluronic acid, vitamins, and actives is designed around your skin assessment." },
      { title: "Clinically Approved Products", desc: "CE-marked, clinically approved mesotherapy solutions and evidence-based protocols." },
      { title: "Thousands of Treatments Performed", desc: "Experience and results you can trust, right here in Malta." },
    ],
  },
  difference: {
    kicker: "the carisma difference",
    title: "Malta's #1 leading wellness chain",
    commitmentTitle: "our commitment",
    commitment: [
      "Natural, refined mesotherapy results, never overdone",
      "Doctor-led treatments with advanced facial anatomy expertise",
      "Safe, ethical care using clinically approved products",
      "A personalised journey from consultation to aftercare",
    ],
    whyTitle: "Why Malta Chooses Carisma for Mesotherapy",
    why: [
      "Created by the team behind Malta's leading spa and medical aesthetics centres",
      "Doctor-led mesotherapy treatments with a focus on safety and long-term results",
      "A personalised journey from consultation to aftercare",
      "Seamless experience with ongoing support and guidance",
    ],
    mapQuery: "Carisma Aesthetics, Malta",
  },
  bookingForm: { title: "BOOK YOUR mesotherapy APPOINTMENT TODAY" },
  planSummary: {
    kicker: "Your mesotherapy plan",
    title: "Malta's Doctor-Led Mesotherapy Plan",
    benefits: [
      { icon: "shield", title: "Doctor-Led Precision", desc: "Every treatment is performed by a medically qualified doctor — never a salon, never a beautician-only service." },
      { icon: "sparkle", title: "Custom Skin Cocktail", desc: "Your blend of hyaluronic acid, vitamins, and actives is built around your skin assessment — for real hydration and glow." },
      { icon: "clock", title: "Course-Based Results", desc: "We plan a progressive course so each session builds on the last, with ongoing review to keep results natural." },
    ],
    included: [
      { label: "Free doctor-led skin consultation" },
      { label: "Personalised, medically guided cocktail & course plan" },
      { label: "Expert CE-marked mesotherapy session", value: "from €199" },
      { label: "Better per-session value across a course", value: "from €167/session" },
      { label: "Aftercare guidance & ongoing review" },
    ],
    price: "From €199",
    priceLabel: "per session",
    cta: { text: "Book Your Mesotherapy Appointment", href: "/consultation" },
    reviews: "200+ verified reviews",
  },
  recommended: {
    title: "Recommended with mesotherapy",
    items: [
      { label: "Collagen stimulator", href: "/collagen-stimulator-malta", image: "/assets/treatments/mesotherapy-malta-rec-collagen.avif" },
      { label: "PRP", href: "/prp-malta", image: "/assets/treatments/mesotherapy-malta-rec-prp.avif" },
      { label: "Microneedling", href: "/microneedling-malta", image: "/assets/treatments/mesotherapy-malta-rec-microneedling.avif" },
      { label: "Chemical peels", href: "/chemical-peels-malta", image: "/assets/treatments/mesotherapy-malta-rec-chemical-peels.avif" },
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
