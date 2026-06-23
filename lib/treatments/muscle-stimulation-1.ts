import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "muscle-stimulation-1",
  category: "Body",
  hero: {
    title: "Muscle Stimulation Malta — Build Muscle and Burn Fat",
    subtitle: "3-in-1 body sculpt protocol",
    body: "Stronger, tighter, more defined in 4 focused sessions.\n\nOur 3-1 course with EMSculpt NEO with HIFEM + RF gives you the effect of 20,000 sit ups per session, burns local fat and tightens the skin resulting in 30% Fat reduction, 25% Muscle growth & 29% Muscle strength",
    prices: [
      { label: "4x Muscle Stimulation sessions with EMSculpt NEO", price: "(€400)" },
      { label: "4x access to spa & fitness facilities", price: "(€140)" },
      { label: "Tanita Body Composition Analysis", price: "(€60)" },
      { label: "€25 Carisma Aesthetics credit", price: "(€25)" },
      { label: "Complimentary Parking Validation", price: "" },
      { label: "TOTAL VALUE: €625. TODAY:", price: "€199 for 4 sessions" },
    ],
    note: "* Includes four sessions to be followed over the course of 2 - 4 weeks\n*** Due to high demand, packages are offered based on availability and may not always be guaranteed. Please inquire for current options.",
    cta: "Claim your spot now",
    image: "/assets/treatments/ms-side.png",
  },

  // "The secret to a more defined, confident look" section
  education: {
    title: "What Is EMSculpt NEO Muscle Stimulation?",
    subtitle: "SCULPT, TIGHTEN AND DEFINE STUBBORN AREAS WITH PRECISION",
    paragraphs: [
      "You're eating well, staying active, and making an effort — yet certain areas still feel soft or undefined. Your tummy doesn't feel as firm as it should, your hips or bum lack shape, and your clothes don't reflect the work you're putting in. The scale may move slightly, but your body definition doesn't.",
      "If this sounds familiar, effort isn't the issue. Some areas need direct muscle activation and targeted fat reduction. EMSculpt Neo uses high-intensity electromagnetic energy combined with radiofrequency to stimulate powerful muscle contractions, reduce local fat, and tighten the skin — helping your body finally look stronger, firmer, and more defined.",
    ],
    image: "/assets/treatments/ms-secret.png",
  },

  suitability: {
    title: "Who Is a Good Candidate for Body Sculpting in Malta?",
    intro: "EMSculpt NEO works best for people who are close to their goal weight but want improved muscle definition, firmness, and targeted contouring.",
    suitableFor: [
      "Close to goal weight but lacking muscle definition",
      "Wanting to tone the abdomen, glutes, thighs, or arms",
      "Seeking non-surgical body contouring with no downtime",
      "Combining treatments with an active lifestyle",
      "Looking for clinically proven fat reduction and muscle growth",
    ],
    notIdeal: [
      "Pregnant or breastfeeding",
      "Metal implants or a pacemaker in or near the treatment area",
      "Seeking significant weight loss (not a weight-loss treatment)",
      "Certain medical conditions — full screening completed at consultation",
    ],
  },

  trusted: {
    title: "Medically Qualified Practitioners — Safe Body Sculpting in Malta",
    images: [
      "/assets/treatments/ms-feat1.png",
      "/assets/treatments/ms-feat2.png",
      "/assets/treatments/ms-feat3.png",
      "/assets/treatments/ms-feat4.png",
    ],
    points: [
      {
        title: "TARGETED BODY SCULPTING",
        desc: "Focus on the areas that matter most tummy, hips, bum or thighs using targeted EMSculpt Neo technology to improve muscle definition and firmness where exercise often falls short.",
      },
      {
        title: "DUAL-ACTION RESULTS",
        desc: "EMSculpt Neo combines high-intensity electromagnetic muscle stimulation with radiofrequency to build muscle, reduce local fat, and tighten the skin in a single treatment protocol.",
      },
      {
        title: "EXPERT DESIGNED PLAN",
        desc: "Your in-person consultation maps out which areas to treat, how sessions are scheduled, and what realistic sculpting and toning results you can expect.",
      },
      {
        title: "SAFE AND CLINICALLY CERTIFIED",
        desc: "Treatments are performed by trained medical professionals using EU-approved, clinically proven body sculpting technology with no surgery and no downtime.",
      },
    ],
  },

  precision: {
    title: "Body Sculpting Treatment Areas — Target Where It Matters Most",
    intro: "Focus on the areas that matter most tummy, hips, bum or thighs using targeted EMSculpt Neo technology to improve muscle definition and firmness where exercise often falls short.",
    areas: [
      { name: "ABDOMEN / CORE", desc: "" },
      { name: "GLUTES / BUTTOCKS", desc: "" },
      { name: "THIGHS (FRONT AND BACK)", desc: "" },
      { name: "CALVES", desc: "" },
      { name: "UPPER ARMS (BICEPS AND TRICEPS)", desc: "" },
    ],
  },

  experience: {
    title: "How Does EMSculpt NEO Work? Your Session Explained",
    steps: [
      { title: "Step 1 — Your Consultation", desc: "Full medical check and body composition scan to map your treatment plan." },
      { title: "Step 2 — Applicator Placement", desc: "The EMSculpt NEO applicator is positioned on the target area — tummy, glutes, thighs, or arms." },
      { title: "Step 3 — HIFEM + RF Delivery", desc: "High-intensity electromagnetic energy triggers powerful muscle contractions while radiofrequency warms and reduces fat." },
      { title: "Step 4 — Session Complete", desc: "Each session lasts around 30 minutes with no downtime — return to normal activities immediately." },
      { title: "Step 5 — Progress Review", desc: "Weekly check-ins track your muscle definition and contour changes across the full protocol." },
      { title: "Step 6 — Your Final Results", desc: "Visible improvements develop over 4 sessions and continue for several weeks after your last treatment." },
    ],
  },

  prepAftercare: {
    title: "Aftercare Advice After Muscle Stimulation Treatment",
    intro: "EMSculpt NEO requires no downtime, but following these simple guidelines will help you get the most from your results.",
    cards: [
      {
        label: "After Your Session",
        lead: "No special recovery needed",
        points: [
          "Resume normal activities immediately",
          "Stay well hydrated throughout the day",
          "Light muscle soreness is normal — similar to post-workout fatigue",
          "Avoid strenuous exercise on the treated area for 24 hours",
        ],
      },
      {
        label: "Between Sessions",
        lead: "Support your results",
        points: [
          "Maintain a balanced diet to support fat reduction",
          "Stay active — EMSculpt NEO enhances, not replaces, exercise",
          "Attend all 4 sessions within the recommended 2–4 week window",
          "Report any unusual discomfort to your practitioner",
        ],
      },
      {
        label: "Long-Term Maintenance",
        lead: "Sustain your definition",
        points: [
          "Results continue to develop for several weeks after your last session",
          "Regular activity and a healthy lifestyle preserve muscle improvements",
          "Maintenance sessions may be recommended every 3–6 months",
          "Follow-up body scans track your progress over time",
        ],
      },
    ],
  },

  difference: {
    kicker: "the carisma difference",
    title: "Your EMSculpt NEO Results — What to Expect in Malta",
    commitmentTitle: "our commitment",
    commitment: [
      "Visible inch loss and shape change, not vague promises",
      "Plans that work with your age, hormones and metabolism",
      "No crash diets, no banned foods, no endless hours of cardio",
      "Medical grade technology and treatments delivered by trained professionals",
    ],
    whyTitle: "WHY MALTA CHOOSES Carisma",
    why: [
      "Created by the team behind Malta's leading spa and medical aesthetics centres",
      "Doctor led medical slimming, not a beauty salon diet program",
      "All in one approach: assessment, nutrition, movement and treatments",
      "High touch support with weekly check ins and WhatsApp coaching",
    ],
    mapQuery: "Carisma Aesthetics Malta",
  },

  pricingGrid: {
    title: "Muscle Stimulation Pricing in Malta — From €199",
    intro: "Our 3-in-1 Body Sculpt Protocol bundles everything you need for visible results into one transparent package price.",
    items: [
      {
        name: "3-in-1 Body Sculpt Protocol",
        price: "€199",
        desc: "4x EMSculpt NEO sessions, 4x spa & fitness access, Tanita body scan, €25 clinic credit, complimentary parking.",
      },
      {
        name: "Individual EMSculpt NEO Session",
        price: "From €99",
        desc: "Single session targeting one area — abdomen, glutes, thighs, or arms. Book a consultation to confirm suitability.",
      },
    ],
  },

  faqTitle: "Frequently Asked Questions About Muscle Stimulation in Malta",
  faq: [
    {
      q: "1. What is included in the EMS Neo Ultimate 3-in-1 Body Sculpt Protocol?",
      a: "The protocol includes four EMS Neo sessions combining high-intensity electromagnetic muscle stimulation with radiofrequency. Treatments are planned after an in-person consultation to target specific areas such as the tummy, hips, bum, or thighs.",
    },
    {
      q: "2. Am I a good candidate for EMS Neo?",
      a: "EMS Neo is best suited for people who are close to their goal weight but want improved muscle definition, firmness, and contouring. It is not intended for significant weight loss and works best when combined with a healthy lifestyle.",
    },
    {
      q: "3. How does EMS Neo actually work?",
      a: "EMS Neo uses HIFEM technology to trigger powerful muscle contractions that cannot be achieved through voluntary exercise. At the same time, radiofrequency energy helps support fat reduction and skin tightening in the treated area.",
    },
    {
      q: "4. Does EMS Neo replace the gym?",
      a: "EMS Neo is not a replacement for exercise, but it can significantly enhance results. Many people use it to target areas that are hard to tone or to accelerate muscle definition when gym workouts alone are not delivering visible changes.",
    },
    {
      q: "5. How many areas can be treated?",
      a: "Each session typically focuses on one main area. During your consultation, the practitioner will advise which areas can be treated and how sessions should be scheduled to achieve balanced results.",
    },
    {
      q: "6. Does the treatment hurt?",
      a: "The sensation feels like very strong muscle contractions combined with warmth. It is intense but generally well tolerated, and intensity can be adjusted to your comfort level. No anaesthesia or needles are required.",
    },
    {
      q: "7. Is there any downtime after EMS Neo?",
      a: "There is no downtime. You can return to normal activities immediately after your session. Some people experience temporary muscle soreness similar to post-workout fatigue.",
    },
    {
      q: "8. When will I start seeing results?",
      a: "Many clients feel increased muscle firmness after the first session. Visible improvements in definition and contour typically develop over the course of the full protocol and continue to improve for several weeks after completion.",
    },
    {
      q: "9. Are the results permanent?",
      a: "Muscle improvements can be long-lasting when supported by regular activity and a healthy lifestyle. Fat reduction in treated areas may be long-term, but results vary and maintenance sessions may be recommended.",
    },
    {
      q: "10. Are there any risks or contraindications?",
      a: "EMS Neo is safe when performed by trained professionals. It is not suitable for individuals with pacemakers, metal implants in the treatment area, certain medical conditions, or during pregnancy. A full medical screening is completed before treatment.",
    },
  ],
};

export default t;
