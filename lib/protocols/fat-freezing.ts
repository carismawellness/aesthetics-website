import type { ProtocolData } from "@/lib/protocols";

const A = "/assets/treatments";
const PRESS = ["/assets/press/malta-daily.png", "/assets/press/bay.jpeg", "/assets/press/lovin-malta.jpeg", "/assets/press/times-of-malta.png", "/assets/press/malta-today.jpg"];

const PACKAGE = [
  { label: "3x Fat Freezing sessions with CoolSculpting", price: "€360" },
  { label: "4x access to spa & fitness facilities", price: "€140" },
  { label: "Tanita Body Composition Analysis", price: "€60" },
  { label: "€25 Carisma Aesthetics credit", price: "€25" },
  { label: "Complimentary Parking Validation", price: "" },
];

export const fatFreezing: ProtocolData = {
  slug: "fat-freezing",
  hero: {
    kicker: "COOLSCULPTING IN MALTA",
    title: "fat eraser protocol",
    tagline: "BURN STUBBORN FAT, NO SURGERY.",
    intro: "For those who have tried dieting, eating healthier and moving more, but the love handles, stubborn belly fat and double chin still will not budge.",
    items: PACKAGE,
    totalValue: "TOTAL VALUE: €550",
    today: "TODAY: €199 ONLY",
    individualNote: "€100 for individual sessions",
    cta: "Claim your spot now",
    finePrint: [
      "* Includes 3 appointments of fat freezing sessions, scheduled based on your clinical plan; additional areas or appointments charged at extra.",
      "** Sessions may be spaced over multiple weeks depending on area and suitability",
      "** Due to high demand, packages are offered based on availability and may not always be guaranteed. Please inquire for current options.",
    ],
    video: `${A}/vid-fat-freezing.mp4`,
  },
  secret: {
    heading: "The secret to a more defined, confident look",
    sub: "shrink love handles & target stubborn fat pockets with precision",
    image: `${A}/ff-secret.png`,
    paragraphs: [
      "You are eating better and moving more, yet the same bulge shows up in every outfit. Your jeans still cut into your hips, your bra digs into your back, or every selfie seems to highlight your double chin. The scale might move a little, but your shape does not.",
      "If you read this and think “This is me”, your willpower is not the problem. Localised fat is. You need a targeted contouring plan that freezes and dissolves those fat cells directly so your body finally reflects the effort you are already making.",
    ],
    bullets: [
      "You lose a few kilos, yet your love handles and lower belly look the same in photos.",
      "You feel you must hide behind loose tops, high waists or shapewear to feel comfortable.",
      "Friends tell you to “just lose more weight” even though one or two pockets of fat are the real issue.",
      "You are tired of plans that treat you like a number on the scale instead of someone who wants specific areas fixed.",
    ],
    cta: "Claim your spot now",
  },
  trusted: {
    heading: "Malta’s trusted clinic for",
    headingSub: "Non surgical fat reduction",
    pressLogos: PRESS,
    features: [
      { icon: `${A}/ff-feat1.png`, label: "TARGETED CONTOURING", desc: "Focus on your biggest trouble spot first so love handles, lower belly or double chin start to look smoother in clothes and photos." },
      { icon: `${A}/ff-feat2.png`, label: "DUAL ACTION FAT REDUCTION", desc: "Combine Malta’s first CoolSculpting technology with targeted fat dissolving injections for a more complete result than using either alone." },
      { icon: `${A}/ff-feat3.png`, label: "EXPERT DESIGNED PLAN", desc: "Your in person consultation maps out which area to treat, how to combine both methods and what to expect from your results." },
      { icon: `${A}/ff-feat4.png`, label: "SAFE AND CLINICALLY CERTIFIED", desc: "Treatments are performed by medical professionals using EU approved, clinically proven body contouring technology with minimal downtime." },
    ],
  },
  eligibility: {
    kicker: "eligibility criteria",
    heading: "Selective by intention successful by design",
    image: `${A}/ff-eligibility.png`,
    areasIntro: "Treat visible fat bulges in 7 areas of the body",
    areas: ["STOMACH - BELLY FAT", "Love handles", "upper arms", "thighs", "banana roll", "back fat, bra fat", "DOUBLE CHIN / THE JAWLINE"],
  },
  modality: {
    kicker: "package treatments",
    heading: "Malta’s only multidisciplinary approach to weightloss",
    name: "CoolSculpting",
    tag: "targeted-fat reduction",
    tagSub: "Proven efficacy",
    baImage: `${A}/ff-ba.png`,
    sideImage: `${A}/ff-lemon.png`,
    intro: "CoolSculpting is an FDA cleared cryolipolysis technology that uses controlled cooling to target only the fat cells under the skin without surgery or needles. The treated fat cells crystallise, die off, and are gradually cleared by your body over the following weeks. Freezes away up to 20% to 25% of treated fat permanently via a process called cryolipolysis and naturally eliminates it from the body.",
    bullets: [
      "Backed by clinical research with over 17 million treatments performed worldwide.",
      "Results start to appear from 1–3 months, with full contour change often seen by 3–6 months as the body clears the damaged fat cells.",
      "The fat cells that are removed do not return, so results in that area are long lasting if your weight is stable.",
      "Non surgical and non invasive treatment with little to no downtime in most people.",
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
    heading: "Malta’s only dual technology starter pack for stubborn fat",
    cols: [
      { title: "Targeted contouring", desc: "CoolSculpting plus Lemon Bottle injections in one visit for your number one trouble spot." },
      { title: "Visible, trackable change", desc: "Local fat reduction where you actually see it in clothes and photos, not just on the scale." },
      { title: "High-Value starter Access", desc: "€550 worth of treatments and clinic credit for €199, with the option to upgrade later." },
    ],
    items: PACKAGE,
    totalValue: "Total Value: €550",
    today: "today: €199 Only",
    finePrint: [
      "* Includes 3 fat freezing sessions, scheduled based on your clinical plan; additional areas charged at extra",
      "** Sessions may be spaced over multiple weeks depending on area and suitability",
      "** Due to high demand, packages are offered based on availability and may not always be guaranteed. Please inquire for current options.",
    ],
    cta: "CLAIM your SPOT NOW",
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
    { q: "1. What is included in the Stubborn Fat Eraser Starter Pack?", a: "One in person consultation with our doctor, one CoolSculpting fat freezing session, one fat dissolving treatment for a stubborn pocket of fat, and €25 Carisma Aesthetics credit for future treatments." },
    { q: "2. Am I a good candidate for this package?", a: "It is ideal if you are close to your goal weight but have localised fat on areas like the lower belly, love handles or double chin. Suitability is always confirmed in your medical consultation." },
    { q: "3. How does CoolSculpting fat freezing actually work?", a: "CoolSculpting uses controlled cooling to target and kill fat cells under the skin. Over the following weeks your body naturally clears these cells, which can reduce the thickness of the fat layer in the treated area." },
    { q: "4. What is the difference between fat freezing and fat dissolving injections?", a: "Fat freezing uses cold to destroy fat cells from outside the body, while fat dissolving injections use a solution that breaks down fat cells from within a small, targeted pocket. In this pack you get both, planned together for one key area." },
    { q: "5. How many areas can I treat with this starter pack?", a: "This offer is built to focus on one main problem area so you can see a clear change. During the consultation the doctor will advise how best to use the CoolSculpting and injections for that area." },
    { q: "6. Does the treatment hurt and is there downtime?", a: "CoolSculpting usually feels very cold and tight at first, then the area goes numb. Fat dissolving injections can sting and feel warm for a short time. Most people go back to normal activities the same day." },
    { q: "7. When will I see results?", a: "As the body removes treated fat cells. Your clinic will schedule follow up photos so you can compare." },
    { q: "8. Are the results permanent?", a: "The fat cells that are destroyed and removed do not come back. However remaining fat cells can still grow if you gain weight, so a healthy lifestyle will help you maintain your results." },
    { q: "9. Are there any risks or side effects?", a: "As with all medical procedures there are possible risks, such as temporary swelling, bruising, numbness, tenderness or small lumps in the treated area. Your doctor will discuss all potential side effects and safety information before you decide." },
    { q: "10. How does the €25 Carisma Aesthetics credit work?", a: "Your €25 credit is applied to a future treatment at Carisma Aesthetics, such as body contouring or injectables, within a set time frame that will be clearly written on your booking and confirmation." },
  ],
  research: {
    heading: "CLINICAL RESEARCH: BASIS OF OUR METHODOLOGY",
    sub: "Evidence based approach",
    cards: [
      {
        image: `${A}/ff-research1.png`,
        title: "cryolipolysis (coolsculpting fat freezing)",
        whatItDoes: "Applies controlled cooling to selectively injure fat cells under the skin. The damaged cells are cleared over weeks, which reduces the local fat layer without surgery.",
        keyResults: ["Single cycle to debulk one key pocket", "Results usually develop from 8–12 weeks", "Best for stubborn bulges rather than overall slimming"],
        evidence: "Moderate–high evidence",
      },
      {
        image: `${A}/ff-research2.png`,
        title: "localised body contouring, not general weight loss",
        whatItDoes: "These technologies reshape specific areas that do not change much with diet or gym, such as lower belly, flanks or double chin, while overall weight often stays similar.",
        keyResults: ["Best for people already working on lifestyle", "Used to smooth specific problem spots that remain after diet and exercise", "Not a substitute for full weight loss programs"],
        evidence: "Targeted effect",
      },
      {
        image: `${A}/ff-research3.png`,
        title: "why we combine fat freezing and fat dissolving in one plan",
        whatItDoes: "Cryolipolysis gently debulks and smooths a wider pad of fat, while injection lipolysis lets the doctor fine tune edges and smaller bulges inside the same zone. Together they allow more tailored shaping than either tool alone.",
        keyResults: ["Starter Pack uses 1 CoolSculpting cycle plus 1 fat dissolving session on a single key area", "Final protocol set after in person medical consultation and photos", "Additional cycles or sessions available later based on response"],
        evidence: "Synergy",
      },
    ],
    cta: "CLAIM MY SPOT NOW",
  },
};
