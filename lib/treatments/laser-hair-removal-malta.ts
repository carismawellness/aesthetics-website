// last updated: 2026-06-23 — converted from bespoke components/LaserHairRemovalPage.tsx
// to the shared data-driven TreatmentPage. Content harvested from the premium
// bespoke page (hero, prices, treatment-info, areas, USPs, guarantee, FAQs) and
// extended with the full template sections (problem reframe, suitability personas,
// 3-step experience, Top-Clinic authority band, plan summary, recommended cross-sell).
import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "laser-hair-removal-malta",
  category: "Body",
  hero: {
    title: "Laser Hair Removal Malta | Virtually Painless",
    subtitle: "Tired of shaving, waxing, and the endless regrowth?",
    body: "Permanently smooth, hair-free skin with the world-renowned Alma Soprano — the first triple-wavelength laser in Malta. Virtually painless thanks to patented ICE Plus™ cooling, medically supervised by qualified practitioners, and effective on every skin tone and hair type. No more razor burn, stubble, or ingrowns — just touchable, lasting smoothness.",
    benefits: [
      "Virtually painless sessions with patented ICE Plus™ cooling",
      "Permanent hair reduction — no more shaving, waxing, or ingrowns",
      "Triple-wavelength SHR® — safe and effective on every skin tone, even tanned",
      "Medically supervised, with no downtime",
    ],
    location: "intercontinental hotel | st. julian's",
    prices: [
      { label: "Face (eyebrows, chin, upper lip)", price: "from €25" },
      { label: "Arms / Underarms", price: "from €35" },
      { label: "Bikini / Brazilian", price: "from €39" },
      { label: "Full Legs", price: "from €109" },
    ],
    cta: "Book Your Laser Hair Removal Appointment",
    bookHref: "https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2800348&oiid=sv%3A25799966&share=true&pId=2708191",
    image: "/assets/treatments/laser-hero-photo2.png",
    note: "Minors may undergo this procedure only with a parent or legal guardian present during the session.",
    heroForm: true,
  },
  info: [
    { metric: "Procedure Time", detail: "15-30 Minutes" },
    { metric: "Downtime", detail: "None" },
    { metric: "Treatment Course", detail: "6-8 Sessions" },
    { metric: "Results Visible In", detail: "2-3 Sessions" },
    { metric: "Technology", detail: "Triple-Wavelength SHR®" },
  ],
  education: {
    title: "Laser hair removal in Malta",
    subtitle: "what is all the hype?",
    paragraphs: [
      "Laser hair removal is a popular alternative to waxing and shaving. This is largely due to the fact that laser hair removal provides permanent results and is less expensive than maintaining a waxing and shaving routine for a lifetime.",
      "Additionally, there is no recovery time needed after a treatment — so no more doing the waxing-waddle or battling razor burn.",
      "Our treatments are safe, and all of our procedures are performed by Authorized Alma Practitioners. We use CE and FDA-cleared lasers that are tailored to your specific skin type and hair colour.",
    ],
    image: "/assets/treatments/laser-comparison.png",
    imageCaption: "Alma Soprano's triple-wavelength technology targets every depth of follicle — for the first time in Malta.",
    chart: "/assets/treatments/laser-suitability-chart.png",
    chartCaption: "Safe and effective across all skin tones and hair colours.",
  },
  problem: {
    kicker: "The real reason people book",
    title: "You are tired of the endless cycle of shaving, waxing, and regrowth",
    body: [
      "Laser hair removal gently ends the daily routine — the stubble, the razor burn, the ingrowns — and gives you back skin that simply stays smooth, so you never have to think about it again.",
    ],
  },
  guarantee: {
    kicker: "The Natural Confidence Guarantee",
    title: "Natural Confidence Guarantee",
    paragraphs: [
      "Every course begins with a free skin and hair assessment plus a patch test — never a sales pitch — and we stand by our technology with a simple promise: see visible hair reduction in 3 sessions, or your next session is free.",
    ],
    cta: "Book Your Free Consultation",
    points: [
      { value: "Patch-test", label: "Assessment first", sub: "Free skin & hair test, never a hard sell" },
      { value: "Virtually painless", label: "ICE Plus™ cooling", sub: "Comfortable, with zero downtime" },
      { value: "3 sessions", label: "Visible results — or it is free", sub: "We guarantee reduction you can see" },
    ],
  },
  precision: {
    title: "Areas we treat",
    intro:
      "Laser hair removal can be tailored to almost any area of the face and body. Below are the most commonly treated zones at our Malta clinic — each plan is shaped around your hair growth and skin tone at your consultation.",
    areas: [
      { zone: "Face", icon: "/assets/treatments/laser-ic-face.png", name: "Face", desc: "Achieve a flawless, hair-free complexion. We target unwanted facial hair, from eyebrows to chin and upper lip, for smooth, long-lasting results." },
      { zone: "Arms", icon: "/assets/treatments/laser-ic-arms.png", name: "Arms & Underarms", desc: "Say goodbye to daily shaving and irritation, with smooth skin from shoulder to fingertip and stubble-free underarms." },
      { zone: "Bikini", icon: "/assets/treatments/laser-ic-bikini.png", name: "Bikini & Brazilian", desc: "Beach-ready confidence all year round — from a standard bikini line to a full Brazilian, with optimal comfort." },
      { zone: "Legs", icon: "/assets/treatments/laser-ic-legs.png", name: "Legs", desc: "Effortlessly smooth legs, full or half. Long-lasting results that eliminate the need for frequent shaving and waxing." },
      { zone: "Body", icon: "/assets/treatments/laser-ic-body.png", name: "Body", desc: "A smooth, hair-free torso — back, chest, and shoulders — for a sleek, polished look that lasts." },
      { zone: "Men's", icon: "/assets/treatments/laser-ic-men.png", name: "Men's", desc: "Tailored grooming for men, targeting common areas such as the back, shoulders, chest, and abs for a refined finish." },
    ],
    additionalTitle: "Custom & combination areas",
    additionalIntro: "Most areas can be combined into a personalised package following your consultation and patch test.",
    additional: "Upper lip, chin, sideburns, neck, hands, feet, stomach line, shoulders, full body",
  },
  suitability: {
    title: "Is this right for you?",
    intro:
      "We only take on clients where we know we can deliver exceptional, lasting results. After a thorough consultation and patch test, we will be honest about whether laser hair removal fits your skin and hair type — so you never waste time or money. This commitment to integrity is why our client satisfaction rate is among the highest in Malta.",
    personas: [
      { title: "The over-it-with-shaving woman", desc: "You are done with daily shaving, razor burn, and stubble — you want skin that simply stays smooth without the maintenance." },
      { title: "The recurring-ingrowns client", desc: "Waxing and shaving leave you with painful ingrowns and irritation, and you want a gentler, long-term solution." },
      { title: "The all-skin-tones candidate", desc: "You have darker or easily-tanned skin and want a laser that is genuinely safe and effective for you — our Nd:YAG wavelength is built for it." },
    ],
    suitableFor: [
      "All skin tones (Fitzpatrick I–VI, including tanned skin)",
      "All hair types from fine to coarse and light to dark (except very light blonde or white)",
      "Both women and men, across face and body areas",
      "Anyone wanting a virtually painless, long-term alternative to waxing and shaving",
    ],
    notIdeal: [
      "Your hair is very light blonde, grey, red, or white — there is little melanin for the laser to target, so we will be honest about expectations",
      "You are pregnant or breastfeeding — we will happily welcome you back afterwards",
      "You have an active skin infection, open wound, or recent sunburn in the area — we will simply wait until your skin has settled",
      "You are taking photosensitising medication (such as Accutane or certain antibiotics) — we will plan around it safely",
      "You have a hormonal condition such as PCOS — results are excellent, but you may need a few extra maintenance sessions",
    ],
  },
  experience: {
    title: "Your treatment experience",
    steps: [
      { title: "Free Consultation & Patch Test", desc: "We start with a one-on-one consultation to understand your skin type, hair type, and goals, then a free patch test on the Alma Soprano so you can feel the comfort for yourself and confirm compatibility. Takes 15–20 minutes, with no obligation to continue.", image: "/assets/treatments/laser-step1.png" },
      { title: "Custom Plan & Painless Sessions", desc: "Based on your hair growth and skin tone, we design a tailored plan — typically 6–8 sessions a few weeks apart. Each session uses triple-wavelength SHR® with ICE Plus™ cooling down to –4°C, taking as little as 15–30 minutes with no downtime.", image: "/assets/treatments/laser-step3.png" },
      { title: "Ongoing Review & Lasting Results", desc: "We monitor your progress throughout the course and fine-tune settings for optimal results. Most clients see visible reduction after just 2–3 sessions, and we aim not just for smooth skin today, but results that genuinely last.", image: "/assets/treatments/laser-step4.png" },
    ],
  },
  pricingGrid: {
    title: "Laser hair removal pricing",
    items: [
      { name: "Arms", price: "from 35 EUR", desc: "Say goodbye to daily shaving and irritation. Our laser hair removal solutions ensure smooth skin from shoulder to fingertip, helping you maintain a well-groomed appearance with minimal effort." },
      { name: "Bikini", price: "from 39 EUR", desc: "Prepare for beach season all year round with our expert bikini laser treatments. We offer a variety of options, from a standard bikini line to a full Brazilian, ensuring optimal comfort and confidence." },
      { name: "Legs", price: "from 109 EUR", desc: "Enjoy effortlessly smooth legs with our professional laser hair removal services. Whether you prefer full or half-leg treatments, we provide long-lasting results, eliminating the need for frequent shaving." },
      { name: "Face", price: "from 25 EUR", desc: "Achieve a flawless, hair-free complexion with our professional laser hair removal services. We target unwanted facial hair, from eyebrows to the chin, ensuring smooth and long-lasting results." },
      { name: "Body", price: "FROM 49 EUR", desc: "Experience the confidence of a smooth, hair-free torso. Our advanced laser treatments effectively remove unwanted hair from various areas of the body, providing a sleek and polished look." },
      { name: "Men's", price: "from 25 EUR", desc: "Enhance your grooming routine with our customized laser hair removal solutions for men. We target common areas such as the back, shoulders, chest, and abs, ensuring a refined and polished appearance." },
    ],
  },
  membership: {
    title: "Laser hair removal memberships",
    intro: "Choose from three tailored membership tiers — Bronze, Silver, or Gold — based on your treatment duration and coverage needs. Each option offers six sessions at exclusive pricing, making it easier than ever to commit to smooth, hair-free skin on your terms.",
    tiers: [
      { image: "/assets/treatments/laser-member-bronze.png", name: "bronze membership", sessions: "6 Sessions | 15 min each", price: "139 EUR" },
      { image: "/assets/treatments/laser-member-silver.png", name: "silver membership", sessions: "6 Sessions | 30 min each", price: "245 EUR" },
      { image: "/assets/treatments/laser-member-gold.png", name: "gold membership", sessions: "6 Sessions | 60 min each", price: "399 EUR" },
    ],
  },
  trusted: {
    title: "Malta's Top Clinic for Laser Hair Removal",
    subtitle: "Malta's first and only Alma Soprano",
    asSeenOn: ["/assets/press/lovin-malta.jpeg", "/assets/press/malta-daily.png", "/assets/press/bay.jpeg", "/assets/press/times-of-malta.png", "/assets/press/malta-today.jpg"],
    images: ["/assets/treatments/laser-hero-photo2.png"],
    points: [
      { title: "Medically Qualified Practitioners", desc: "Every session is performed by a highly trained, medically qualified practitioner — never an unsupervised technician." },
      { title: "Malta's First Alma Soprano", desc: "The internationally acclaimed gold standard in laser hair removal, with triple-wavelength delivery for every skin tone and hair type." },
      { title: "Personalised Treatment Plans", desc: "Your plan is built around your hair growth and skin tone after a free consultation and patch test." },
      { title: "Thousands of Treatments Performed", desc: "30+ years as Malta's leading wellness chain, with results and a comfort record you can trust." },
    ],
  },
  difference: {
    kicker: "The Carisma Difference",
    title: "Malta's #1 leading wellness chain",
    commitmentTitle: "Our Commitment",
    commitment: [
      "Virtually painless, comfortable sessions with patented ICE Plus™ cooling",
      "Medically supervised treatments on Malta's first and only Alma Soprano laser",
      "Honest, results-first advice — we only proceed when we can deliver",
      "A personalised journey from free consultation and patch test to lasting results",
    ],
    whyTitle: "Why Malta Chooses Carisma for Laser Hair Removal",
    why: [
      "Created by the team behind Malta's leading spa and medical aesthetics centres",
      "Triple-wavelength SHR® technology that is safe and effective for every skin tone",
      "A central, discreet location at the InterContinental, St. Julian's",
      "Flexible scheduling with ongoing support throughout your course",
    ],
    mapQuery: "InterContinental Malta, St Julian's, Malta",
  },
  bookingForm: { title: "Book Your Laser Hair Removal Appointment Today" },
  planSummary: {
    kicker: "Your laser hair removal plan",
    title: "Malta's Alma Soprano Laser Plan",
    benefits: [
      { icon: "shield", title: "Medically Supervised Care", desc: "Every session is performed by a medically qualified practitioner on Malta's first and only Alma Soprano — never a salon, never unsupervised." },
      { icon: "sparkle", title: "Virtually Painless Comfort", desc: "Patented ICE Plus™ cooling chills the skin to as low as –4°C, so each session is comfortable, with no downtime and no numbing cream." },
      { icon: "target", title: "Lasting, Visible Results", desc: "Triple-wavelength SHR® targets the follicle at every depth — most clients see reduction after just 2–3 sessions, with up to 80–90% permanent reduction over a full course." },
    ],
    included: [
      { label: "Free consultation & patch test" },
      { label: "Personalised treatment plan" },
      { label: "Triple-wavelength SHR® laser session", value: "from €25" },
      { label: "ICE Plus™ cooling — virtually painless, no downtime" },
      { label: "Results guarantee: reduction in 3 sessions or your next is free" },
    ],
    price: "From €25",
    priceLabel: "per area",
    cta: { text: "Book Your Laser Hair Removal Appointment", href: "/consultation" },
    reviews: "200+ verified reviews",
  },
  recommended: {
    title: "Recommended with Laser Hair Removal",
    items: [
      { label: "HydraFacial", href: "/hydrafacial", image: "/assets/treatments/hydrafacial-hero.jpg" },
      { label: "Chemical peels", href: "/chemical-peels-malta", image: "/assets/treatments/chemical-peels-malta-hero.png" },
      { label: "Microneedling", href: "/microneedling-malta", image: "/assets/treatments/microneedling-malta-hero.png" },
      { label: "Skin tightening", href: "/skin-tightening", image: "/assets/treatments/st-feat1.png" },
    ],
  },
  faqTitle: "FAQs about Laser Hair Removal in Malta",
  faq: [
    {
      q: "How does laser hair removal work?",
      a: "SHR® (Super Hair Removal) uses a triple-wavelength laser system (755nm Alexandrite, 810nm Diode, 1064nm Nd:YAG) that targets the melanin in the hair follicle. Controlled pulses of light gradually heat the follicle and inhibit regrowth without damaging the surrounding skin — making it effective across a wide range of skin tones and hair types.",
    },
    {
      q: "Is laser hair removal painful?",
      a: "With the Alma Soprano's patented ICE Plus™ cooling, the skin surface is chilled to as low as –4°C throughout each session, making treatment virtually painless. Unlike older lasers that shock the skin with intense pulses, SHR® heats the follicle gradually, so most clients describe the sensation as a mild warmth — far more comfortable than waxing, with no numbing cream required.",
    },
    {
      q: "How many sessions will I need?",
      a: "Most clients achieve their desired results in 6–8 sessions, spaced roughly 4–8 weeks apart, depending on the treatment area and your hair growth cycle. Because the laser only affects follicles in their active growth phase, several sessions are needed. Finer or lighter hair may require a few extra. A personalised plan is created at your free consultation so you know exactly what to expect.",
    },
    {
      q: "Is laser hair removal permanent?",
      a: "Laser hair removal offers permanent reduction of up to 80–90% over a full course of treatments. Some follicles may eventually reactivate due to hormonal changes, so occasional top-up sessions every 1–2 years are recommended to maintain results long-term.",
    },
    {
      q: "Is laser hair removal safe for darker or tanned skin?",
      a: "Yes. The Alma Soprano's 1064nm Nd:YAG wavelength is specifically designed for darker skin tones and recently tanned skin, making it one of the safest options available for all Fitzpatrick skin types — especially important in a sunny climate like Malta. At your consultation we assess your current skin tone and calibrate the device settings accordingly.",
    },
    {
      q: "How do I prepare for a laser hair removal treatment?",
      a: "Avoid waxing, plucking, and depilatory creams for at least 6 weeks before your session — the laser needs the follicle intact. Shave the area 24 hours beforehand, and avoid sun exposure and self-tanning for at least 2–4 weeks before your appointment. On the day, remove any makeup, deodorant, creams, or perfume from the treatment area.",
    },
    {
      q: "What should I do after a laser hair removal session?",
      a: "Avoid sun exposure, sunbeds, and self-tanning products for at least 2 weeks after treatment. Skip perfumed products, exfoliants, and heat treatments such as saunas and hot baths for 48 hours, and apply a gentle, fragrance-free moisturiser as needed. Any mild redness or warmth typically subsides within a day, and your practitioner will give you tailored aftercare guidance.",
    },
    {
      q: "Who can't get laser hair removal?",
      a: "Laser hair removal may not be suitable if you are pregnant or breastfeeding, have an active skin infection or open wound in the area, are taking photosensitive medication, or have very light blonde, red, grey, or white hair with too little melanin for the laser to target. Your suitability is always confirmed at a consultation and patch test before any course begins.",
    },
    {
      q: "Which areas can be treated?",
      a: "Laser hair removal can be performed on almost any area of the face and body, including the upper lip, chin, face, underarms, arms, bikini line, Brazilian, legs, chest, back, and shoulders, for both women and men. The only area avoided is directly over the eyelids. At your consultation we confirm which areas are best suited to your skin and hair type.",
    },
    {
      q: "Why laser hair removal at Carisma?",
      a: "Carisma is Malta's leading wellness chain, with 30+ years of experience and the country's first and only Alma Soprano — a medical-grade triple-wavelength SHR® laser that is faster, safer, and more comfortable than older technologies. Every treatment is performed by medically qualified practitioners, and we back it with a simple promise: see visible hair reduction in 3 sessions, or your next session is free.",
    },
  ],
  beforeAfterTitle: "LASER HAIR REMOVAL RESULTS",
  beforeAfter: [
    { before: "/assets/treatments/laser-hair-removal-malta-ba1-1.jpg", after: "/assets/treatments/laser-hair-removal-malta-ba6-1.jpg", label: "Lower leg hair", name: "Daniel C.", review: "My calf was always thick with dark hair. The skin stays clear now and I have stopped reaching for the razor." },
    { before: "/assets/treatments/laser-hair-removal-malta-ba5-1.jpg", after: "/assets/treatments/laser-hair-removal-malta-ba10-1.jpg", label: "Thigh hair", name: "Maya L.", review: "My thigh had scattered dark hairs that I kept shaving. The regrowth is very light now and the skin feels even." },
    { before: "/assets/treatments/laser-hair-removal-malta-ba5-2.jpg", after: "/assets/treatments/laser-hair-removal-malta-ba10-2.jpg", label: "Leg hair reduction", name: "Julia S.", review: "I used to shave my legs every other day. The hair comes back slowly now and the skin stays soft between visits." },
    { before: "/assets/treatments/laser-hair-removal-malta-ba3-1.jpg", after: "/assets/treatments/laser-hair-removal-malta-ba8-1.jpg", label: "Back hair removal", name: "Marco B.", review: "My back was covered in thick hair and I dreaded the beach. It is clear now and far easier to keep tidy." },
    { before: "/assets/treatments/laser-hair-removal-malta-ba2-1.jpg", after: "/assets/treatments/laser-hair-removal-malta-ba7-1.jpg", label: "Facial cheek hair", name: "Nadia P.", review: "The fine hair along my cheek showed up in daylight. It is much lighter now and the skin looks clearer." },
    { before: "/assets/treatments/laser-hair-removal-malta-ba2-2.jpg", after: "/assets/treatments/laser-hair-removal-malta-ba7-2.jpg", label: "Jawline hair", name: "Sophie R.", review: "I had pale hairs running along my jaw near my ear. After the sessions the area feels smooth and stays that way for weeks." },
    { before: "/assets/treatments/laser-hair-removal-malta-ba3-2.jpg", after: "/assets/treatments/laser-hair-removal-malta-ba6-2.jpg", label: "Neck hair reduction", name: "Lara M.", review: "Light hairs ran down the side of my neck and bothered me. They are barely there now and the skin feels soft." },
    { before: "/assets/treatments/laser-hair-removal-malta-ba4-2.jpg", after: "/assets/treatments/laser-hair-removal-malta-ba9-2.jpg", label: "Nape hairline", name: "Chiara V.", review: "Stray hairs at the back of my neck always showed when I wore my hair up. The hairline looks neat now." },
    { before: "/assets/treatments/laser-hair-removal-malta-ba1-2.jpg", after: "/assets/treatments/laser-hair-removal-malta-ba8-2.jpg", label: "Underarm hair", name: "Elena T.", review: "My underarm had dark hairs that grew back quickly. It stays smooth now and I rarely need to shave." },
    { before: "/assets/treatments/laser-hair-removal-malta-ba4-1.jpg", after: "/assets/treatments/laser-hair-removal-malta-ba9-1.jpg", label: "Underarm hair", name: "Rita F.", review: "My underarm hair was thick and curly. The growth is much sparser now and the few hairs left are very fine." },
  ],
};

export default t;
