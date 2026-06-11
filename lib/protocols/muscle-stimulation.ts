import type { ProtocolData } from "@/lib/protocols";

const A = "/assets/treatments";
const PRESS = ["/assets/press/malta-daily.png", "/assets/press/bay.jpeg", "/assets/press/lovin-malta.jpeg", "/assets/press/times-of-malta.png", "/assets/press/malta-today.jpg"];

const PACKAGE = [
  { label: "4x Muscle Stimulation sessions with EMSculpt NEO", price: "€400" },
  { label: "4x access to spa & fitness facilities", price: "€140" },
  { label: "Tanita Body Composition Analysis", price: "€60" },
  { label: "€25 Carisma Aesthetics credit", price: "€25" },
  { label: "Complimentary Parking Validation", price: "" },
];

export const muscleStimulation: ProtocolData = {
  slug: "muscle-stimulation-1",
  hero: {
    kicker: "EMSculpt NEO MALTA",
    title: "3-in-1 body sculpt protocol",
    tagline: "Stronger, tighter, more defined in 4 focused sessions.",
    intro: "Our 3-1 course with EMSculpt NEO with HIFEM + RF gives you the effect of 20,000 sit ups per session, burns local fat and tightens the skin resulting in 30% Fat reduction, 25% Muscle growth & 29% Muscle strength",
    items: PACKAGE,
    totalValue: "TOTAL VALUE: €625",
    today: "TODAY: €199 for 4 sessions",
    individualNote: "€100 for individual sessions",
    cta: "Claim your spot now",
    finePrint: [
      "* Includes four sessions to be followed over the course of 2 - 4 weeks",
      "*** Due to high demand, packages are offered based on availability and may not always be guaranteed. Please inquire for current options.",
    ],
    video: `${A}/vid-muscle-stimulation-1.mp4`,
  },
  secret: {
    heading: "THE SECRET TO A MORE DEFINED, CONFIDENT LOOK",
    sub: "SCULPT, TIGHTEN AND DEFINE STUBBORN AREAS WITH PRECISION",
    image: `${A}/ms-secret.png`,
    paragraphs: [
      "You’re eating well, staying active, and making an effort — yet certain areas still feel soft or undefined. Your tummy doesn’t feel as firm as it should, your hips or bum lack shape, and your clothes don’t reflect the work you’re putting in. The scale may move slightly, but your body definition doesn’t.",
      "If this sounds familiar, effort isn’t the issue. Some areas need direct muscle activation and targeted fat reduction. EMSculpt Neo uses high-intensity electromagnetic energy combined with radiofrequency to stimulate powerful muscle contractions, reduce local fat, and tighten the skin — helping your body finally look stronger, firmer, and more defined.",
    ],
    bullets: [
      "You exercise regularly, but some areas still won’t tone up",
      "Your stomach feels soft rather than firm and sculpted",
      "You want visible muscle definition without spending hours at the gym",
      "You’re tired of doing “more reps” without seeing real shape change",
    ],
    cta: "Claim your spot now",
  },
  trusted: {
    heading: "MALTA’S TRUSTED CLINIC FOR",
    headingSub: "NON SURGICAL FAT REDUCTION",
    pressLogos: PRESS,
    features: [
      { icon: `${A}/ms-feat1.png`, label: "TARGETED BODY SCULPTING", desc: "Focus on the areas that matter most tummy, hips, bum or thighs using targeted EMSculpt Neo technology to improve muscle definition and firmness where exercise often falls short." },
      { icon: `${A}/ms-feat2.png`, label: "DUAL-ACTION RESULTS", desc: "EMSculpt Neo combines high-intensity electromagnetic muscle stimulation with radiofrequency to build muscle, reduce local fat, and tighten the skin in a single treatment protocol." },
      { icon: `${A}/ms-feat3.png`, label: "expert DESIGNED PLAN", desc: "Your in-person consultation maps out which areas to treat, how sessions are scheduled, and what realistic sculpting and toning results you can expect." },
      { icon: `${A}/ms-feat4.png`, label: "SAFE AND CLINICALLY CERTIFIED", desc: "Treatments are performed by trained medical professionals using EU-approved, clinically proven body sculpting technology with no surgery and no downtime." },
    ],
  },
  eligibility: {
    kicker: "eligibility criteria",
    heading: "selective by intention successful by design",
    image: `${A}/ms-eligibility.png`,
    areasIntro: "Treat visible fat bulges in 7 areas of the body",
    areas: ["ABDOMEN / CORE", "GLUTES / BUTTOCKS", "THIGHS (FRONT AND BACK)", "CALVES", "UPPER ARMS (BICEPS AND TRICEPS)"],
  },
  modality: {
    kicker: "our technology",
    heading: "internationally renowned, fda-approved modalities",
    name: "emsculpt neo",
    tag: "Muscle strengthening, tone & metabolic support",
    tagSub: "Proven efficacy",
    baImage: `${A}/ms-ba.png`,
    sideImage: `${A}/ms-side.png`,
    intro: "Builds muscle, burns fat and tightens skin in one 30 minute treatment.",
    bullets: [
      "EMSculpt NEO combines high-intensity focused electromagnetic (HIFEM) pulses with radiofrequency heating. The RF gently warms the tissue and fat, while HIFEM drives thousands of powerful muscle contractions that you could never achieve in a normal workout. Over the next weeks your body responds by building muscle fibres, using local fat as fuel and firming the area.",
      "Clinical studies show up to about 30 percent fat reduction, 25 percent muscle growth and around 29 percent increase in muscle strength in the treated area after a standard course.",
      "Each session delivers up to 20,000 supra-maximal contractions for the chosen muscle group.",
      "Results typically start to show from 4–12 weeks after the final session as muscle adapts and fat reduces. No needles, no surgery and little to no downtime for most people. You lie back while the device does the work, with each treatment lasting about 30 minutes.",
    ],
  },
  difference1: {
    kicker: "the carisma difference",
    heading: "we are not another diet clinic.",
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
    heading: "malta’s only dual technology starter pack for stubborn fat",
    cols: [
      { title: "Targeted BODY SCULPTING", desc: "EMSculpt Neo sessions are focused on your main problem areas — such as the tummy, hips, bum or thighs — delivering powerful muscle contractions to areas that are hard to tone naturally." },
      { title: "Visible, TRACKABLE DEFINITION", desc: "Muscle engagement you can feel and results you can see. Improved firmness and definition show in clothes and posture, not just on the scale." },
      { title: "High-Value starter Access", desc: "A full EMSculpt Neo sculpting protocol at a reduced introductory price, with the option to continue or upgrade after completing your sessions." },
    ],
    items: PACKAGE,
    totalValue: "Total Value: €625",
    today: "Today: €199 Only.",
    finePrint: [
      "* Includes four sessions to be followed over the course of 2 weeks",
      "** Additional sessions of EMSculpt NEO may be booked at €100 per session",
      "*** Due to high demand, packages are offered based on availability and may not always be guaranteed. Please inquire for current options.",
    ],
    cta: "CLAIM YOUR SPOT NOW",
  },
  difference2: {
    kicker: "the carisma difference",
    heading: "malta’s #1 leading wellness chain",
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
    { q: "1. What is included in the EMS Neo Ultimate 3-in-1 Body Sculpt Protocol?", a: "The protocol includes four EMS Neo sessions combining high-intensity electromagnetic muscle stimulation with radiofrequency. Treatments are planned after an in-person consultation to target specific areas such as the tummy, hips, bum, or thighs." },
    { q: "2. Am I a good candidate for EMS Neo?", a: "EMS Neo is best suited for people who are close to their goal weight but want improved muscle definition, firmness, and contouring. It is not intended for significant weight loss and works best when combined with a healthy lifestyle." },
    { q: "3. How does EMS Neo actually work?", a: "EMS Neo uses HIFEM technology to trigger powerful muscle contractions that cannot be achieved through voluntary exercise. At the same time, radiofrequency energy helps support fat reduction and skin tightening in the treated area." },
    { q: "4. Does EMS Neo replace the gym?", a: "EMS Neo is not a replacement for exercise, but it can significantly enhance results. Many people use it to target areas that are hard to tone or to accelerate muscle definition when gym workouts alone are not delivering visible changes." },
    { q: "5. How many areas can be treated?", a: "Each session typically focuses on one main area. During your consultation, the practitioner will advise which areas can be treated and how sessions should be scheduled to achieve balanced results." },
    { q: "6. Does the treatment hurt?", a: "The sensation feels like very strong muscle contractions combined with warmth. It is intense but generally well tolerated, and intensity can be adjusted to your comfort level. No anaesthesia or needles are required." },
    { q: "7. Is there any downtime after EMS Neo?", a: "There is no downtime. You can return to normal activities immediately after your session. Some people experience temporary muscle soreness similar to post-workout fatigue." },
    { q: "8. When will I start seeing results?", a: "Many clients feel increased muscle firmness after the first session. Visible improvements in definition and contour typically develop over the course of the full protocol and continue to improve for several weeks after completion." },
    { q: "9. Are the results permanent?", a: "Muscle improvements can be long-lasting when supported by regular activity and a healthy lifestyle. Fat reduction in treated areas may be long-term, but results vary and maintenance sessions may be recommended." },
    { q: "10. Are there any risks or contraindications?", a: "EMS Neo is safe when performed by trained professionals. It is not suitable for individuals with pacemakers, metal implants in the treatment area, certain medical conditions, or during pregnancy. A full medical screening is completed before treatment." },
  ],
  research: {
    heading: "CLINICAL RESEARCH: BASIS OF OUR METhODOLOGY",
    sub: "EVIDENCE BASED APPROACH",
    cards: [
      {
        image: `${A}/ms-research1.png`,
        title: "clinically proven body contouring results",
        whatItDoes: "Uses a combination of high-intensity focused electromagnetic (HIFEM) energy and radiofrequency (RF) heating to simultaneously stimulate powerful muscle contractions and heat fat cells. This dual action helps build muscle, reduce fat thickness, and improve skin firmness in targeted areas without surgery or downtime.",
        keyResults: ["Builds muscle while reducing stubborn fat in one treatment plan", "Visible changes typically develop over 4–12 weeks", "Ideal for contouring, toning, and tightening — not weight loss"],
        evidence: "SCIENCE-BACKED PROTOCOL",
      },
      {
        image: `${A}/ms-research2.png`,
        title: "muscle building & fat reduction technology (hifem + rf)",
        whatItDoes: "Uses high-intensity focused electromagnetic (HIFEM) energy to trigger thousands of powerful supramaximal muscle contractions, while synchronized radiofrequency (RF) heating raises fat cell temperature. This combination supports muscle growth and strength while helping reduce fat thickness and improve skin firmness in treated areas.",
        keyResults: ["Simultaneously builds muscle and reduces fat", "Measured using medical imaging technologies", "Results continue improving for weeks after sessions"],
        evidence: "STRONG EVIDENCE",
      },
      {
        image: `${A}/ms-research3.png`,
        title: "radiofrequency skin tightening & firmness",
        whatItDoes: "Delivers controlled radiofrequency (RF) energy to gently heat the deeper layers of the skin. This thermal stimulation supports collagen remodeling and tissue tightening, helping improve skin firmness and texture in areas affected by mild laxity.",
        keyResults: ["Supports collagen remodeling for firmer skin", "Gradual tightening over several weeks", "Non-surgical approach to mild skin laxity"],
        evidence: "MODERATE–STRONG EVIDENCE",
      },
      {
        image: `${A}/ms-research4.png`,
        title: "fat cell reduction via thermal stress",
        whatItDoes: "Applies controlled heat to fat tissue, raising the temperature of fat cells to levels that can stress their structure. Over time, the body naturally processes and clears some of these affected fat cells, contributing to gradual reduction in localized fat thickness.",
        keyResults: ["Gradual reduction of localized fat pockets", "Works through the body’s natural metabolic processes", "Minimal downtime for most patients"],
        evidence: "EMERGING EVIDENCE",
      },
    ],
    cta: "CLAIM MY SPOT NOW",
  },
};
