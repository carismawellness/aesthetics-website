// last updated: 2026-06-23
import type { Treatment } from "../treatment-types";

const A = "/assets/treatments";

const t: Treatment = {
  slug: "pico-laser-pigmentation-treatment",
  category: "Body",
  hero: {
    title: "Pico Laser Pigmentation Removal in Malta — Even Skin",
    subtitle: "Sun spots, age spots, melasma, or uneven tone holding you back?",
    body: "Advanced Pico laser technology to visibly reduce unwanted pigmentation and restore a clearer, brighter, more even-looking complexion. Ultra-short laser pulses target excess pigment beneath the skin, helping break it into tiny particles so your body can naturally clear it over time. Every skin concern is different, so your treatment plan is personalised based on your pigmentation type, depth, skin tone, and goals, performed by medically qualified specialists at our St Julian's clinic in Malta.",
    prices: [
      { label: "Small – 1–3 isolated spots or a single freckle cluster", price: "€79" },
      { label: "Medium – multiple spots or one defined zone", price: "€99" },
      { label: "Large – full face zone, hands, décolleté, or neck", price: "€149" },
      { label: "Melasma – hormonal / diffuse pigmentation, full-face PIH", price: "from €199" },
    ],
    cta: "Book Your Pigmentation Treatment Appointment",
    image: `${A}/pig-hero-main.png`,
    imageRatio: "4 / 5",
    heroForm: true,
  },
  info: [
    { metric: "Procedure Time", detail: "20-30 Minutes" },
    { metric: "Downtime", detail: "Minimal" },
    { metric: "Sessions", detail: "Multiple, gradual" },
    { metric: "Results Visible In", detail: "Weeks, builds gradually" },
    { metric: "Anaesthetic", detail: "None" },
  ],
  beforeAfterTitle: "PICO LASER PIGMENTATION RESULTS",
  beforeAfter: [
    {
      before: `${A}/pig-rev1.png`,
      after: `${A}/pig-rev1.png`,
      name: "Marisa C.",
      review: "I had stubborn pigmentation across my cheek that makeup never fully covered. The darker spots became noticeably lighter and the area looks smoother, clearer, and more even.",
    },
    {
      before: `${A}/pig-rev2.png`,
      after: `${A}/pig-rev2.png`,
      name: "Daniela V.",
      review: "Sunspots on the back of my hand made it look older than I felt. After my sessions the darker spots faded and the skin looks clearer, smoother, and more even.",
    },
    {
      before: `${A}/pig-rev3.png`,
      after: `${A}/pig-rev3.png`,
      name: "Nicole F.",
      review: "Darker patches across my upper back made me self-conscious in open-back clothing. The area now looks noticeably clearer, smoother, and more even in tone.",
    },
    {
      before: `${A}/pig-rev4.png`,
      after: `${A}/pig-rev4.png`,
      name: "Lara B.",
      review: "I had uneven pigmentation and small dark spots across my forearm. After my Pico sessions the skin looks brighter, clearer, and far more even than before.",
    },
  ],
  problem: {
    kicker: "The real reason people book",
    title: "It is not about the spots — it is about feeling like yourself again",
    body: [
      "Doctor-led Pico laser gently targets the excess pigment beneath your skin while caring for the surface — so your tone looks clearer and more even, and you feel confident showing your skin without heavy makeup.",
    ],
  },
  guarantee: {
    kicker: "The Natural Confidence Guarantee",
    title: "Natural Confidence Guarantee",
    paragraphs: [
      "Every plan starts with a doctor-led skin and pigmentation assessment and a natural-first, gradual approach that is never rushed or overpromised — with honest guidance on how many sessions you may need and clear aftercare from start to finish.",
    ],
    cta: "Book Your Free Consultation",
    points: [
      { value: "Doctor-led", label: "Assessment first", sub: "Never a salesperson" },
      { value: "Gradual & safe", label: "Natural-first", sub: "We fade, never force" },
      { value: "Honest", label: "Realistic expectations", sub: "Clear on sessions & aftercare" },
    ],
  },
  precision: {
    title: "PRECISE PIGMENT TARGETING",
    intro:
      "Pico laser delivers ultra-short pulses to break down excess pigment with focused precision. Here is how our Malta clinic approaches each pigmentation concern.",
    areas: [
      { name: "Precise Pigment Targeting", desc: "Targets excess pigment beneath the skin using ultra-short Pico pulses." },
      { name: "Gentler Skin Renewal", desc: "Designed to break down pigment without relying on intense heat." },
      { name: "Personalised Skin Plan", desc: "Tailored to your pigmentation type, skin tone, depth, and goals." },
      { name: "Expert Aftercare", desc: "Professional guidance before and after treatment for safer results." },
    ],
    additionalTitle: "Pigmentation concerns we commonly treat",
    additionalIntro: "Suitability is always confirmed during your consultation based on your skin type, pigmentation depth, and treatment area.",
    additional: "Sun spots, age spots, freckles, post-acne marks (PIH), uneven skin tone, and selected types of melasma on the face, hands, neck, décolleté, back, and arms",
  },
  suitability: {
    title: "Is this suitable for you?",
    intro:
      "Every skin concern is different. Pico laser is most effective when the plan is matched to your pigmentation type, depth, and skin tone. A free consultation with our specialists helps us understand what will work safely for you.",
    suitableFor: [
      "You have sun spots, age spots, or freckles you would like to fade",
      "You have post-acne marks or uneven skin tone that bother you",
      "You want a careful, gradual, professional approach — not harsh or rushed treatment",
      "You are open to a personalised plan based on your skin tone and pigmentation depth",
      "You are comfortable with a treatment that builds results over multiple sessions",
    ],
    notIdeal: [
      "You want everything gone in a single visit — pigmentation fades gradually over several sessions",
      "You have recently been in strong sun or used self-tan — we will happily welcome you back once your skin has settled",
      "You are pregnant or breastfeeding — we will plan your treatment for afterwards",
      "Your melasma is hormonally driven — we can still help, but we will be honest that it can recur and needs ongoing sun care",
      "You would rather skip the skin assessment — it is how we keep your treatment safe and your results even",
    ],
    personas: [
      { title: "The sun-spot face", desc: "Years of Malta sunshine have left spots and uneven tone on your face, hands, or décolleté that makeup no longer hides." },
      { title: "The post-acne complexion", desc: "Your breakouts have settled, but the dark marks and uneven tone they left behind are still there." },
      { title: "The melasma seeker", desc: "Hormonal or diffuse pigmentation has appeared across your cheeks or forehead, and you want a careful, expert-led approach." },
    ],
  },
  experience: {
    title: "Your treatment experience",
    steps: [
      { title: "Consultation & Skin Assessment", desc: "Your specialist assesses your pigmentation type, depth, skin tone, and treatment area, then designs a personalised plan and explains how many sessions you may need.", image: `${A}/pico-whatToExpect-before.png` },
      { title: "Targeted Pico Treatment", desc: "Ultra-short Pico laser pulses target excess pigment, breaking it into tiny particles. You may feel a quick snapping or warming sensation, with cooling and comfort measures throughout.", image: `${A}/pico-whatToExpect-at-session.png` },
      { title: "Aftercare & Ongoing Review", desc: "We guide you through clear aftercare and sun protection, then review your skin between sessions as the pigment gradually clears and your tone evens out.", image: `${A}/pico-whatToExpect-after.png` },
    ],
  },
  trusted: {
    title: "Malta's trusted clinic for pigmentation",
    subtitle: "Advanced Pico Laser Pigmentation Care in Malta",
    asSeenOn: [
      "/assets/press/lovin-malta.jpeg",
      "/assets/press/malta-daily.png",
      "/assets/press/bay.jpeg",
      "/assets/press/times-of-malta.png",
      "/assets/press/malta-today.jpg",
    ],
    images: [`${A}/trusted-clinic-collage.png`],
    points: [
      { title: "Medically Qualified Specialists", desc: "Every Pico laser treatment is performed by trained aesthetic professionals." },
      { title: "Advanced Pico Laser Technology", desc: "Ultra-short pulses target excess pigment with focused precision and gentler skin renewal." },
      { title: "Personalised Skin Plans", desc: "Tailored to your pigmentation type, skin tone, depth, and treatment area." },
      { title: "Honest Expectations & Aftercare", desc: "Clear guidance on sessions and sun protection to support safer, more even results." },
      { title: "Trusted Across Malta", desc: "Calm, medically guided care from consultation to aftercare." },
    ],
  },
  planSummary: {
    kicker: "Your pigmentation plan",
    title: "Malta's Doctor-Led Pico Laser Pigmentation Plan",
    benefits: [
      { icon: "target", title: "Precise Pigment Targeting", desc: "Ultra-short Pico pulses break down excess pigment beneath the skin so your body can clear it gradually." },
      { icon: "sparkle", title: "Clearer, More Even Tone", desc: "We fade sun spots, age spots, and post-acne marks for brighter, more balanced-looking skin — never forced." },
      { icon: "shield", title: "Safe, Personalised Care", desc: "A doctor-led assessment first, with honest guidance on sessions and clear aftercare throughout." },
    ],
    included: [
      { label: "Personal skin & pigmentation assessment before treatment" },
      { label: "Advanced Pico laser technology for precise pigment targeting" },
      { label: "Personalised treatment plan for your skin type & concern" },
      { label: "Targeted Pico laser session", value: "from €79" },
      { label: "Aftercare guidance to support safe healing & results" },
    ],
    price: "From €79",
    priceLabel: "per session",
    cta: { text: "Book Your Pigmentation Treatment Appointment", href: "/consultation" },
    reviews: "500+ verified reviews",
  },
  recommended: {
    title: "Recommended with Pico Laser Pigmentation",
    items: [
      { label: "Chemical peels", href: "/chemical-peels-malta", image: `${A}/chemical-peels-malta-hero.png` },
      { label: "Mesotherapy", href: "/mesotherapy-malta", image: `${A}/mesotherapy-malta-hero.png` },
      { label: "Microneedling", href: "/microneedling-malta", image: `${A}/microneedling-malta-hero.png` },
      { label: "Hydrafacial", href: "/hydrafacial", image: `${A}/hydrafacial-hero.jpg` },
    ],
  },
  faqTitle: "FAQs about Pico Laser Pigmentation in Malta",
  faq: [
    { q: "What is Pico Laser pigmentation treatment?", a: "Pico Laser treatment uses ultra-short laser pulses to target unwanted pigment beneath the skin. The pigment is broken into smaller particles, which the body can gradually clear over time, helping the skin look clearer, brighter, and more even." },
    { q: "What pigmentation concerns can it treat?", a: "It may help improve the appearance of sun spots, freckles, age spots, post-inflammatory pigmentation (PIH), uneven skin tone, and selected types of melasma. Suitability is confirmed during consultation based on your skin type, pigmentation depth, and treatment area." },
    { q: "How many sessions will I need?", a: "The number of sessions depends on your pigmentation type, depth, skin tone, and how your skin responds to treatment. Most concerns require multiple sessions, with gradual improvement after each visit. A consultation is the best way to estimate your personalised treatment plan." },
    { q: "Is Pico Laser treatment painful?", a: "You may feel a quick snapping or warming sensation on the skin during treatment. Cooling and comfort measures may be used throughout the session to keep you comfortable." },
    { q: "Is there any downtime after treatment?", a: "There is usually minimal downtime. The treated area may appear red, warm, or slightly swollen for a short time. Most clients can return to normal activities shortly after, following their aftercare guidance." },
    { q: "When will I see results?", a: "Results are gradual. You may begin to notice improvement over the weeks following each session as the body naturally clears the broken-down pigment. The number of sessions needed varies depending on the type and depth of pigmentation." },
    { q: "Is Pico Laser suitable for every skin type?", a: "Pico laser can be used on a range of skin tones, but suitability varies depending on the pigmentation type and individual skin characteristics. Your specialist will assess your skin carefully during consultation before recommending treatment." },
    { q: "What should I avoid before my appointment?", a: "Before your treatment, avoid direct sun exposure, tanning, or self-tanning products on the treatment area for at least a few days. Avoid harsh exfoliants, acids, retinoids, or active skincare before your session. Share your full medical history and any medications with your specialist." },
    { q: "What aftercare is required?", a: "Keep the treated area clean and moisturised as advised. Avoid picking, scratching, or rubbing the treated skin. Protect it from sun exposure with SPF and follow all aftercare instructions given by your practitioner to support safe healing." },
    { q: "Can pigmentation return after treatment?", a: "In some cases, pigmentation can recur — particularly with melasma or pigmentation triggered by ongoing sun exposure. Protecting your skin from the sun and following your aftercare plan can help maintain results. Your specialist will discuss realistic long-term expectations during consultation." },
    { q: "How much does Pico Laser pigmentation treatment cost in Malta?", a: "Pigmentation treatment at Carisma starts from €79 for a small area such as 1–3 isolated spots or a single freckle cluster. Medium areas with multiple spots or one defined zone start from €99, and larger areas such as a full face zone, hands, décolleté, or neck start from €149. Melasma and diffuse or full-face PIH start from €199. Book a free consultation at our St Julian's clinic for a personalised quote." },
  ],
};

export default t;
