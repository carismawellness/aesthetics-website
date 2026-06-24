import type { Treatment } from "../treatment-types";

// Recreates https://www.carismaaesthetics.com/4-in-1-hydrafacial-glow — copy
// adapted from the live page and upgraded to the perfected treatment-page
// template (reference: wrinkle-relaxing-malta). Renders via TreatmentPage:
// hero → before/after → problem → guarantee → precision → suitability →
// experience → trusted → planSummary → difference → recommended → faq.
const t: Treatment = {
  slug: "4-in-1-hydrafacial-glow",
  category: "Package",
  hero: {
    title: "4-in-1 hydrafacial glow",
    subtitle: "Clogged pores, dull skin, and products that just don't work? If your glow's gone quiet, you're not alone. This is for Maltese skin that's ready for real results.",
    body: "With our 4-in-1 Hydrafacial Glow treatment, your skin gets exactly what it needs: deep cleansing, gentle resurfacing, and lasting hydration — all designed for Maltese skin and real-world results. After just one session, you'll see (and feel) the difference: smoother texture, balanced tone, and that luminous glow you thought you'd lost. No filters, no downtime — just confidence that shines through.",
    prices: [
      { label: "Medical-Grade Hydrafacial", price: "€100" },
      { label: "LED Light Therapy", price: "€50" },
      { label: "Dermaplaining", price: "€50" },
      { label: "Carisma Spa Day", price: "€50" },
      { label: "In-Person Consultation", price: "€60" },
      { label: "€25 Aesthetics Credit", price: "€25" },
      { label: "Total Value: €335 – Today", price: "€99 Only" },
    ],
    cta: "CLAIM MY SPOT NOW",
    note: "Due to high demand, packages are offered based on availability and may not always be guaranteed. Please inquire for current options.",
  },
  info: [
    { metric: "Procedure Time", detail: "60-75 Minutes" },
    { metric: "Downtime", detail: "None" },
    { metric: "Results Last For", detail: "3-4 Weeks" },
    { metric: "Results Visible In", detail: "Same Day" },
    { metric: "Treatments In One", detail: "4-in-1" },
  ],
  beforeAfterTitle: "THE SECRET TO VISIBLY MORE BEAUTIFUL SKIN – OUR CUSTOMERS SHOW YOU HOW.",
  beforeAfter: [
    { before: "/assets/treatments/hydrafacial-ba1-before.png", after: "/assets/treatments/hydrafacial-ba1-after.png", name: "Martina V.", review: "My breakouts and clogged pores calmed right down — my skin finally looks clear and even." },
    { before: "/assets/treatments/hydrafacial-ba2-before.png", after: "/assets/treatments/hydrafacial-ba2-after.png", name: "Priya S.", review: "My complexion was tired and grey, and after one glow my whole face looks brighter and more awake." },
    { before: "/assets/treatments/hydrafacial-ba3-before.png", after: "/assets/treatments/hydrafacial-ba3-after.png", name: "Chloe B.", review: "My skin used to feel dry and dull, and now it's plump, dewy, and glowing without any makeup." },
    { before: "/assets/treatments/hydrafacial-ba4-before.png", after: "/assets/treatments/hydrafacial-ba4-after.png", name: "Sofia A.", review: "The rough texture and congestion on my cheeks is so much smoother — my skin feels brand new." },
  ],
  problem: {
    kicker: "The real reason people book",
    title: "You miss the skin that used to glow back at you",
    body: [
      "Our 4-in-1 Hydrafacial Glow deep-cleanses, resurfaces, and rehydrates in one session — so you walk out with the fresh, luminous skin you thought you had lost, not just another facial.",
    ],
  },
  guarantee: {
    kicker: "The Natural Confidence Guarantee",
    title: "Natural Confidence Guarantee",
    paragraphs: [
      "Every glow starts with a skin assessment by our med-aestheticians and a gentle, results-first approach that respects your skin's balance, backed by a free follow-up adjustment until you are 100% happy with skin that still looks like you.",
    ],
    cta: "Book Your Free Consultation",
    points: [
      { value: "Doctor-led", label: "Clinic-grade care", sub: "Medical team, not a salon" },
      { value: "Natural-first", label: "Gentle on your skin", sub: "We refresh, never strip" },
      { value: "100%", label: "Satisfaction", sub: "Free follow-up until you glow" },
    ],
  },
  precision: {
    title: "SO YOUR SKIN GLOWS AGAIN — EFFORTLESSLY.",
    intro: "Do you ever look in the mirror and wonder where your glow went? Your skin feels dull, your pores seem clogged, and every product you try promises more than it delivers. You're not alone — healthy, radiant skin shouldn't feel out of reach. With our 4-in-1 Hydrafacial Glow treatment, your skin gets exactly what it needs: deep cleansing, gentle resurfacing, and lasting hydration — all designed for Maltese skin and real-world results. After just one session, you'll see (and feel) the difference: smoother texture, balanced tone, and that luminous glow you thought you'd lost. No filters, no downtime — just confidence that shines through.",
  },
  suitability: {
    title: "Is the 4-in-1 Hydrafacial Glow right for you?",
    intro: "Every complexion is different. The 4-in-1 Hydrafacial Glow combines a medical-grade hydrafacial, dermaplaning, LED light therapy, and deep hydration into one tailored session — so we can target dullness, congestion, and dehydration in a single visit. A quick skin assessment helps us personalise it to you.",
    suitableFor: [
      "Because you want skin that looks luminous, smooth, and deeply refreshed — even without makeup.",
      "Because you deserve a medical-grade facial that delivers visible results, not just promises.",
      "Because you prefer gentle, non-invasive treatments that respect your skin's balance and beauty.",
      "Because you value self-care and know that radiant skin reflects radiant confidence.",
      "Because you choose results backed by science — and trusted by Malta's leading aesthetics clinic.",
    ],
    notIdeal: [
      "You have an active breakout, rash, or open blemish in the treatment area — we'll happily welcome you back once it settles",
      "You had a chemical peel, laser, or microneedling in the last two weeks — let's give your skin time to recover first",
      "You have an active cold sore right now — we'll reschedule for when it has cleared",
      "You want a permanent fix in one visit — the glow is real and immediate, but lasting results come with a simple routine",
      "You'd rather skip the quick skin assessment — it's how we keep your treatment gentle and right for you",
    ],
    personas: [
      { title: "The event-ready glow", desc: "You have a wedding, shoot, or big night coming up and you want fresh, photo-ready skin with zero downtime." },
      { title: "The dull, tired complexion", desc: "Your skin looks grey and congested no matter what you try, and you want it deep-cleansed and brought back to life." },
      { title: "The self-care regular", desc: "You love looking after your skin and want one medical-grade session that does the work of four treatments." },
    ],
  },
  experience: {
    title: "What to expect during your Hydrafacial Glow",
    steps: [
      {
        title: "BEFORE",
        desc: "Prepare your skin by avoiding harsh exfoliants for a few days. Drink plenty of water for optimal hydration. Use a mild cleanser to remove makeup and impurities before your facial.",
        image: "/assets/treatments/hydrafacial-step1.png",
      },
      {
        title: "AT SESSION",
        desc: "Your med-aesthetician deep-cleanses and resurfaces with dermaplaning, then infuses personalised hydrating serums and LED light therapy deep into the skin — finished with a soothing facial massage to boost circulation and absorption.",
        image: "/assets/treatments/hydrafacial-step2.png",
      },
      {
        title: "AFTER",
        desc: "Refrain from harsh skincare products immediately after treatment. Apply sunscreen daily to protect rejuvenated skin. Keep skin hydrated by drinking water regularly to prolong treatment effects.",
        image: "/assets/treatments/hydrafacial-step3.jpg",
      },
    ],
  },
  trusted: {
    title: "Malta's trusted clinic for radiant, healthy skin",
    asSeenOn: [
      "/assets/press/lovin-malta.jpeg",
      "/assets/press/malta-daily.png",
      "/assets/press/bay.jpeg",
      "/assets/press/times-of-malta.png",
      "/assets/press/malta-today.jpg",
    ],
    images: [
      "/assets/treatments/hydrafacial-trusted-1.png",
      "/assets/treatments/hydrafacial-trusted-2.png",
      "/assets/treatments/hydrafacial-trusted-3.png",
      "/assets/treatments/hydrafacial-trusted-4.png",
    ],
    points: [
      { title: "INSTANT GLOW", desc: "Experience a visibly brighter, smoother complexion right after your first session — no downtime required." },
      { title: "DEEP DETOX & HYDRATION", desc: "Our medical-grade Hydrafacial deeply cleanses pores while infusing skin with nourishing serums for long-lasting hydration." },
      { title: "ADVANCED SKIN RENEWAL", desc: "Dermaplaning and LED light therapy rejuvenate dull, tired skin — restoring elasticity and luminosity from within." },
      { title: "SAFE & MEDICAL-GRADE CARE", desc: "Performed by certified aesthetic specialists using clinically proven equipment and protocols for real, visible results." },
    ],
  },
  planSummary: {
    kicker: "Your glow plan",
    title: "Malta's 4-in-1 Hydrafacial Glow Plan",
    benefits: [
      { icon: "sparkle", title: "Four Treatments In One", desc: "Medical-grade hydrafacial, dermaplaning, LED light therapy, and deep hydration in a single, tailored session." },
      { icon: "shield", title: "Medical-Grade & Gentle", desc: "Performed by certified aesthetic specialists using clinically proven protocols — never a one-size-fits-all salon facial." },
      { icon: "clock", title: "Instant Glow, Zero Downtime", desc: "Walk out with visibly brighter, smoother, deeply hydrated skin you can see the same day." },
    ],
    included: [
      { label: "Medical-Grade Hydrafacial", value: "€100" },
      { label: "LED Light Therapy", value: "€50" },
      { label: "Dermaplaining", value: "€50" },
      { label: "Carisma Spa Day", value: "€50" },
      { label: "In-Person Consultation", value: "€60" },
      { label: "€25 Aesthetics Credit", value: "€25" },
    ],
    totalValue: "€335",
    price: "From €99",
    priceLabel: "for the full 4-in-1 package",
    cta: { text: "Claim My Spot Now", href: "/consultation" },
    reviews: "200+ verified reviews",
  },
  difference: {
    kicker: "the carisma difference",
    title: "35+ years helping Malta glow with confidence",
    commitmentTitle: "OUR COMMITMENT",
    commitment: [
      "Instant Radiance – Brighter, smoother skin after your first Hydrafacial session.",
      "Deep Cleanse & Hydration – Purify pores while nourishing with antioxidant serums.",
      "No Downtime, No Discomfort – Just a refreshing, relaxing treatment.",
      "Medical-Grade Expertise – Performed by certified professionals using the latest technology.",
    ],
    whyTitle: "WHY MALTA LOVES OUR HYDRAFACIAL GLOW",
    why: [
      "Trusted by hundreds of local clients for visible, lasting results.",
      "Custom-tailored treatments for every skin type and tone.",
      "Clinically proven products used in every session.",
      "A legacy of care, safety, and radiant transformations.",
    ],
    mapQuery: "Carisma Aesthetics, Malta",
  },
  recommended: {
    title: "Recommended with the Hydrafacial Glow",
    items: [
      { label: "Microneedling", href: "/microneedling-malta", image: "/assets/treatments/hydrafacial-rec-microneedling.jpg" },
      { label: "Chemical peels", href: "/chemical-peels-malta", image: "/assets/treatments/hydrafacial-rec-chemical-peels.png" },
      { label: "Dermal fillers", href: "/dermal-fillers-malta", image: "/assets/treatments/hydrafacial-rec-dermafillers.avif" },
      { label: "Botox", href: "/wrinkle-relaxing-malta", image: "/assets/treatments/hydrafacial-rec-botox.jpg" },
      { label: "MFU Ultight", href: "/skin-tightening", image: "/assets/treatments/hydrafacial-rec-mfu.png" },
    ],
  },
  faqTitle: "FAQs about the 4-in-1 Hydrafacial Glow in Malta",
  faq: [
    { q: "What is included in the 4-in-1 Hydrafacial Glow?", a: "The 4-in-1 Hydrafacial Glow combines four treatments in one session: a medical-grade hydrafacial for deep cleansing and extraction, dermaplaning for gentle resurfacing, LED light therapy to rejuvenate and calm the skin, and deep hydration to restore radiance. It also includes an in-person consultation, a Carisma Spa Day, and a €25 aesthetics credit." },
    { q: "Who can benefit from the Hydrafacial Glow?", a: "Anyone looking to combat dryness, dullness, clogged pores, or tired-looking skin can benefit. The treatment is suitable for most skin types and tones, and is especially popular before weddings, events, and shoots when you want fresh, glowing, photo-ready skin." },
    { q: "How does the Hydrafacial Glow work?", a: "The treatment deep-cleanses and extracts impurities, gently resurfaces the skin with dermaplaning, then infuses hydrating serums and LED light therapy to nourish and renew. Together these steps improve skin texture, tone, hydration, and overall radiance in a single visit." },
    { q: "What results can I expect?", a: "You can expect hydrated, plump, and glowing skin with smoother texture and a more even tone. Many clients notice a visible difference the same day, with no downtime — just brighter, healthier-looking skin." },
    { q: "Is there any downtime?", a: "No. The Hydrafacial Glow is gentle and non-invasive, so you can return to your day immediately. Some clients notice mild, temporary redness that settles within a few hours after treatment." },
    { q: "Is the Hydrafacial Glow suitable for sensitive skin?", a: "Yes, the treatment can be tailored to suit sensitive skin types. Our skincare experts customise each step during your assessment to address your concerns while keeping the session gentle and comfortable." },
    { q: "How often should I have the Hydrafacial Glow?", a: "For most skin types, a session every 3 to 4 weeks keeps your skin looking its best. Your med-aesthetician will recommend the ideal frequency based on your skin and your goals." },
    { q: "Can the Hydrafacial Glow help acne-prone skin?", a: "Yes. The deep cleansing and extraction steps help clear congestion and calm breakouts, while the hydrating and LED steps support healing — leaving acne-prone skin clearer and more balanced." },
    { q: "How long does the treatment take?", a: "The full 4-in-1 session typically takes around 60 to 75 minutes, depending on your skin and the steps included. It is a relaxing experience designed to leave you glowing." },
    { q: "How long do the results last?", a: "Results can last for several weeks, depending on your skin type and home care routine. Regular sessions and a simple skincare routine help prolong and build on the glow over time." },
    { q: "Can I combine the Hydrafacial Glow with other treatments?", a: "Yes, it pairs beautifully with treatments such as microneedling, chemical peels, dermal fillers, or Botox for enhanced results. Our skincare experts can recommend the best combination based on your individual needs during your consultation." },
  ],
};

export default t;
