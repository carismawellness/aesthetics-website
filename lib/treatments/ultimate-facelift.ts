import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "ultimate-facelift",
  category: "Package",
  hero: {
    title: "Ultimate Facelift Malta",
    subtitle: "Reverse visible aging — no knife, no downtime.",
    body: "If your skin has lost its lift, your cheeks feel flatter than before, or your jawline has lost its shape, this is your sign to rewind time — naturally. Our Ultimate Facelift Package lifts, tightens, and sculpts using medical-grade threads and bio-stimulation — without surgery, without long recovery days — performed by qualified doctors who specialise in facial anatomy.",
    prices: [
      { label: "2x Threads", price: "€300" },
      { label: "Hyaluronic acid serum", price: "€20" },
      { label: "In-person Consultation", price: "€60" },
      { label: "€25 Aesthetics Credit for you", price: "" },
      { label: "€25 Aesthetics Credit for your friend", price: "" },
      { label: "Total Value", price: "€430" },
      { label: "Today", price: "€239 Only" },
    ],
    cta: "CLAIM MY SPOT NOW",
    note: "*any additional threads used will be charged at €120 each; ** Suitability for this procedure is strictly subject to Dr approval",
    image: "/assets/treatments/thread-lift-malta-hero.avif",
    bgImage: "/assets/treatments/thread-lift-malta-hero-bg.png",
  },
  info: [
    { metric: "Procedure Time", detail: "60 Minutes" },
    { metric: "Downtime", detail: "Minimal" },
    { metric: "Results Last For", detail: "Up to 3-5 Years" },
    { metric: "Results Visible In", detail: "Immediate" },
    { metric: "Anaesthetic", detail: "Local / Topical" },
  ],
  beforeAfterTitle: "ULTIMATE FACELIFT RESULTS",
  beforeAfter: [
    { before: "/assets/treatments/ultimate-facelift-ba1-1.jpg", after: "/assets/treatments/ultimate-facelift-ba6-1.jpg", label: "Jowl and neck laxity", name: "Marion P.", review: "The loose skin running down my neck has pulled in and my jawline reads as one clean line again. Quietly pleased." },
    { before: "/assets/treatments/ultimate-facelift-ba1-2.jpg", after: "/assets/treatments/ultimate-facelift-ba6-2.jpg", label: "Nasolabial fold", name: "Claire D.", review: "The deep crease from my nose past my mouth has eased and the corners no longer drag down. It reads softer in photos." },
    { before: "/assets/treatments/ultimate-facelift-ba2-1.jpg", after: "/assets/treatments/ultimate-facelift-ba7-1.jpg", label: "Submental tightening", name: "Sophie L.", review: "Looking up used to show every loose fold under my chin. That area sits firm now and the skin stays smooth." },
    { before: "/assets/treatments/ultimate-facelift-ba2-2.jpg", after: "/assets/treatments/ultimate-facelift-ba7-2.jpg", label: "Jawline definition", name: "Anne R.", review: "The little pockets that had formed either side of my chin have lifted and my jaw has a cleaner edge. Subtle but I notice it daily." },
    { before: "/assets/treatments/ultimate-facelift-ba3-1.jpg", after: "/assets/treatments/ultimate-facelift-ba8-1.jpg", label: "Lower face lift", name: "Tara M.", review: "The weight that sat around my mouth and lower cheeks has lifted a little. I look less tired in the mirror first thing." },
    { before: "/assets/treatments/ultimate-facelift-ba3-2.jpg", after: "/assets/treatments/ultimate-facelift-ba8-2.jpg", label: "Jowl in profile", name: "Helen W.", review: "From the side my jaw used to soften and droop. The line follows the bone again and the skin underneath feels tighter." },
    { before: "/assets/treatments/ultimate-facelift-ba4-1.jpg", after: "/assets/treatments/ultimate-facelift-ba9-2.jpg", label: "Jaw and neck contour", name: "Lara V.", review: "My side profile is the change I notice most. The fullness below my jaw has gone in and the line down to my neck looks longer." },
    { before: "/assets/treatments/ultimate-facelift-ba4-2.jpg", after: "/assets/treatments/ultimate-facelift-ba10-1.jpg", label: "Midface and jaw", name: "Nadia E.", review: "My cheeks sit higher and the soft area along my jaw has firmed. It still looks like my own face, just less heavy." },
    { before: "/assets/treatments/ultimate-facelift-ba5-1.jpg", after: "/assets/treatments/ultimate-facelift-ba9-1.jpg", label: "Submental fullness", name: "Becky S.", review: "The fullness under my chin has reduced and there is a proper angle where my jaw meets my neck now. Side photos look better." },
    { before: "/assets/treatments/ultimate-facelift-ba5-2.jpg", after: "/assets/treatments/ultimate-facelift-ba10-2.jpg", label: "Overall facial laxity", name: "Diane K.", review: "My whole face looks lifted and the folds beside my mouth have settled. People say I look rested rather than asking what I had done." },
  ],
  precision: {
    title: "YOUR FACELIFT — REDEFINED.",
    intro: "See how our Ultimate Facelift Package gently lifts, tightens, and sculpts for visibly younger, naturally radiant skin.",
    areas: [
      { name: "Visible Lift & Contour", desc: "Enjoy a firmer, more lifted appearance after your first session." },
      { name: "Refreshed, Smooth Skin", desc: "Restores elasticity and reduces fine lines for a youthful glow." },
      { name: "No Surgery, No Downtime", desc: "A gentle, effective treatment performed with precision care." },
      { name: "Luxury Meets Science", desc: "Advanced thread technology delivered by certified aesthetic specialists." },
    ],
  },
  problem: {
    kicker: "The real reason people book",
    title: "Your face looks older and more tired than you feel",
    body: [
      "Doctor-led thread lifting gently lifts the cheeks and redefines the jawline while stimulating your own collagen — so you look rested and refreshed, never pulled or done.",
    ],
  },
  guarantee: {
    kicker: "The Natural Confidence Guarantee",
    title: "Natural Confidence Guarantee",
    paragraphs: [
      "Every facelift plan starts with a doctor-led facial assessment and a natural-first approach that is never overdone, backed by a free follow-up review until you are 100% satisfied with a result that still looks like you.",
    ],
    cta: "Book Your Free Consultation",
    points: [
      { value: "Doctor-led", label: "Assessment first", sub: "Never a salesperson" },
      { value: "Natural-first", label: "Lifted, never pulled", sub: "We sculpt, never overdo" },
      { value: "100%", label: "Satisfaction", sub: "Free follow-up until you are happy" },
    ],
  },
  suitability: {
    title: "Is this suitable for you?",
    intro: "The Ultimate Facelift is most effective when tailored to your unique facial structure — lifting the areas that have softened while keeping you looking like you. A consultation with one of our doctors helps us understand what will work best for your skin and goals.",
    personas: [
      { title: "The midface that has softened", desc: "Your cheeks feel flatter and have started to descend, and your face has lost the definition it once had." },
      { title: "The blurred jawline", desc: "Your jawline and neck contour are no longer as sharp as they were, and it shows most in photos." },
      { title: "The natural-result patient", desc: "You want a real lift and tightening — but never a pulled, surgical or overdone look." },
    ],
    notIdeal: [
      "You are hoping to restore lost volume on its own — that is what dermal fillers are for; we will happily combine the two if it suits you",
      "You have advanced, heavy skin laxity that may be better suited to a surgical facelift — your doctor will tell you honestly at consultation",
      "You are pregnant or breastfeeding — we will warmly welcome you back afterwards",
      "You need the full result the same day — the lift is immediate, but your collagen keeps improving the skin over the following weeks",
      "You would rather skip the doctor consultation — it is how we keep your result safe, suitable, and natural",
    ],
  },
  experience: {
    title: "Your treatment experience",
    steps: [
      {
        title: "Consultation & Plan",
        desc: "Your doctor assesses your facial structure, skin laxity, and goals, then designs a medically guided lifting plan tailored to the areas that have softened.",
        image: "/assets/treatments/thread-lift-malta-icon-before.png",
      },
      {
        title: "Lifting Treatment",
        desc: "Using a fine cannula, your doctor places medical-grade threads to lift and reposition the tissue, finishing with a hyaluronic infusion for instant glow and hydration.",
        image: "/assets/treatments/thread-lift-malta-icon-during.png",
      },
      {
        title: "Ongoing Review",
        desc: "Results are immediate and continue to improve as your collagen rebuilds. Your doctor reviews your lift and refines it to keep your result looking natural over time.",
        image: "/assets/treatments/thread-lift-malta-icon-after.png",
      },
    ],
  },
  trusted: {
    title: "Malta's trusted clinic for non-surgical facelift treatments",
    subtitle: "As featured in Times of Malta, Lovin Malta, Elle, and Cosmopolitan",
    asSeenOn: [
      "/assets/press/lovin-malta.jpeg",
      "/assets/press/malta-daily.png",
      "/assets/press/bay.jpeg",
      "/assets/press/times-of-malta.png",
      "/assets/press/malta-today.jpg",
    ],
    images: [
      "/assets/treatments/thread-lift-malta-trusted1.png",
      "/assets/treatments/thread-lift-malta-trusted2.png",
      "/assets/treatments/thread-lift-malta-trusted3.png",
      "/assets/treatments/thread-lift-malta-trusted4.png",
    ],
    points: [
      { title: "INSTANT LIFT", desc: "Experience a visibly tighter, more lifted look right after your first session — no surgery, no scars." },
      { title: "DEEP HYDRATION BOOST", desc: "Our hyaluronic infusion restores plumpness and glow, leaving your skin smooth and radiant." },
      { title: "ADVANCED THREAD TECHNOLOGY", desc: "Medical-grade threads gently lift sagging skin while stimulating natural collagen for long-term results." },
      { title: "SAFE & CLINICALLY CERTIFIED", desc: "Performed by certified medical professionals using EU-approved, clinically proven products." },
    ],
  },
  difference: {
    kicker: "The Carisma Difference",
    title: "35+ years of expertise. Proven, timeless results.",
    commitmentTitle: "OUR COMMITMENT",
    commitment: [
      "Visible Lift & Contour — A naturally lifted, youthful appearance from your very first session.",
      "Smooth, Firm Skin — Restores elasticity and reduces sagging with advanced rejuvenation technology.",
      "No Surgery, No Downtime — Gentle, effective, and non-invasive — perfect for busy schedules.",
      "Science Meets Aesthetics — Performed by certified professionals using leading EU-approved techniques.",
    ],
    whyTitle: "WHY MALTA CHOOSES CARISMA AESTHETICS",
    why: [
      "Decades of experience and a trusted clinical reputation.",
      "Medical-grade technology used by top European aesthetic providers.",
      "Personalized treatments tailored to your unique skin needs.",
      "A long-standing legacy of real results and satisfied clients.",
    ],
    mapQuery: "InterContinental Malta, St Julian's, Malta",
  },
  bookingForm: { title: "SECURE YOUR EXCLUSIVE FACELIFT REJUVENATION OFFER NOW" },
  planSummary: {
    kicker: "Your facelift plan",
    title: "Malta's Doctor-Led Ultimate Facelift Package",
    benefits: [
      { icon: "shield", title: "Doctor-Led Precision", desc: "Every lift is performed by a medically qualified doctor with advanced facial-anatomy expertise — never a salon." },
      { icon: "sparkle", title: "Lifted, Natural Results", desc: "We lift the cheeks and redefine the jawline while keeping you looking like you — refreshed, never pulled." },
      { icon: "clock", title: "Immediate, Lasting Lift", desc: "See the lift the same day, then watch your skin keep improving as your own collagen rebuilds for up to 3-5 years." },
    ],
    included: [
      { label: "In-person doctor-led consultation" },
      { label: "Personalised, medically guided lifting plan" },
      { label: "2x medical-grade lifting threads", value: "€300 value" },
      { label: "Hyaluronic acid glow & hydration serum", value: "€20 value" },
      { label: "€25 Aesthetics credit for you + €25 for a friend" },
      { label: "Aftercare guidance & follow-up review" },
    ],
    price: "From €239",
    priceLabel: "per package",
    cta: { text: "Claim My Facelift Package", href: "/consultation" },
    reviews: "200+ verified reviews",
  },
  recommended: {
    title: "Recommended with ultimate facelift",
    items: [
      { label: "Botox", href: "/wrinkle-relaxing-malta", image: "/assets/treatments/thread-lift-malta-rec-botox.avif" },
      { label: "Collagen stimulator", href: "/collagen-stimulator-malta", image: "/assets/treatments/thread-lift-malta-rec-collagen-stimulator.avif" },
      { label: "Dermal fillers", href: "/dermal-fillers-malta", image: "/assets/treatments/thread-lift-malta-rec-dermal-fillers.avif" },
      { label: "Platelet-rich plasma", href: "/prp-malta", image: "/assets/treatments/thread-lift-malta-rec-prp.avif" },
    ],
  },
  offer: {
    priceNow: "€239",
    priceWas: "€430",
    saveLabel: "Save €191 today",
    includedTitle: "Everything in your Ultimate Facelift Package",
    included: [
      "2x medical-grade lifting threads (€300 value)",
      "Hyaluronic acid glow & hydration serum (€20 value)",
      "In-person doctor-led consultation (€60 value)",
      "€25 Aesthetics Credit for you",
      "€25 Aesthetics Credit for your friend",
    ],
    guaranteeChip: "Doctor-led · Non-surgical · Natural-looking results",
    urgency: "Limited appointment availability — book your consultation today",
    cta: {
      text: "Book My Ultimate Facelift Consultation",
      href: "https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2800348&share=true&pId=2708191",
      external: true,
    },
  },
  closing: {
    heading: "Ready for Your Ultimate Facelift?",
    sub: "Full facial rejuvenation — non-surgical, doctor-led, personalised to you. Book your free consultation at Carisma Aesthetics, Malta.",
    ctaLabel: "Book My Facelift Consultation",
    ctaHref: "https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2800348&share=true&pId=2708191",
  },
  faqTitle: "FAQs about the Ultimate Facelift in Malta",
  faq: [
    {
      q: "What is the Ultimate Facelift package?",
      a: "The Ultimate Facelift is a non-surgical lifting package that combines medical-grade threads with a hyaluronic acid skin infusion to lift, tighten, and sculpt the face — without surgery, general anaesthetic, or long recovery. The threads are placed beneath the skin using a fine cannula to reposition softened tissue, while your body's natural healing response stimulates collagen for sustained firmness. Every treatment is performed by a qualified doctor at our Malta clinic.",
    },
    {
      q: "How is a thread lift different from a surgical facelift?",
      a: "A surgical facelift removes and tightens skin under general anaesthetic with weeks of recovery. A thread lift achieves a natural lift and contour without incisions, scarring, or significant downtime, and stimulates your own collagen over time. It is ideal for mild to moderate sagging. For very advanced skin laxity, your doctor will honestly advise whether surgery would suit you better at your consultation.",
    },
    {
      q: "What can I expect during the treatment?",
      a: "After a topical or local anaesthetic numbs the area, your doctor places the threads beneath the skin using a fine cannula and finishes with a hyaluronic infusion for glow and hydration. The session takes around 60 minutes and most patients describe only mild pressure. You will see an immediate lift before you leave.",
    },
    {
      q: "Is a thread lift painful?",
      a: "Most patients report only mild discomfort. A topical or local anaesthetic is applied first to keep you comfortable throughout. Some slight tenderness, swelling, or bruising in the treated areas is normal and generally settles within a few days.",
    },
    {
      q: "How long does it take to see results, and how long do they last?",
      a: "The lifting effect is visible immediately, and it continues to improve over the following weeks as your collagen rebuilds around the threads. Results can last up to 3-5 years depending on your skin quality, age, and lifestyle, and can be refreshed with a top-up treatment over time.",
    },
    {
      q: "What is the recovery time?",
      a: "Downtime is minimal compared with surgery. You may have some swelling, mild bruising, or tenderness for a few days, and most people return to their normal routine quickly. We recommend avoiding strenuous exercise, saunas, and facial massage for a couple of weeks, and your doctor will give you tailored aftercare guidance.",
    },
    {
      q: "Are there any side effects or risks?",
      a: "As with any medical procedure, there are some potential risks, including mild bruising, swelling, tenderness, or, rarely, thread movement. Choosing a qualified and experienced doctor — as you do at Carisma — significantly reduces these risks. Your suitability is assessed and the procedure is strictly subject to doctor approval.",
    },
    {
      q: "Who is a suitable candidate for the Ultimate Facelift?",
      a: "It is generally suited to healthy adults with mild to moderate sagging who want a more lifted, defined appearance without surgery — softened cheeks, a less-defined jawline, or skin that has lost firmness. Realistic expectations are important. A consultation with one of our doctors will confirm whether you are a suitable candidate based on your skin and goals.",
    },
    {
      q: "How much does the Ultimate Facelift cost in Malta?",
      a: "The Ultimate Facelift Package is available from €239, which includes two medical-grade lifting threads, a hyaluronic acid glow serum, your in-person doctor-led consultation, and €25 in Aesthetics credit for you plus €25 for a friend. Any additional threads used are charged at €120 each. Book a consultation at our St. Julian's clinic for a personalised plan and quote.",
    },
  ],
};

export default t;
