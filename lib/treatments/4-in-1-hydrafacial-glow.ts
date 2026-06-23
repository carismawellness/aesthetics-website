import type { Treatment } from "../treatment-types";

// Recreates https://www.carismaaesthetics.com/4-in-1-hydrafacial-glow — verbatim
// from the live page. Package page: hero (price list, no image) → before/after →
// precision → suitability → experience → trusted → difference → faq.
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
  beforeAfterTitle: "THE SECRET TO VISIBLY MORE BEAUTIFUL SKIN – OUR CUSTOMERS SHOW YOU HOW.",
  beforeAfter: [
    { before: "/assets/treatments/hydrafacial-ba1-before.png", after: "/assets/treatments/hydrafacial-ba1-after.png" },
  ],
  precision: {
    title: "SO YOUR SKIN GLOWS AGAIN — EFFORTLESSLY.",
    intro: "Do you ever look in the mirror and wonder where your glow went? Your skin feels dull, your pores seem clogged, and every product you try promises more than it delivers. You're not alone — healthy, radiant skin shouldn't feel out of reach. With our 4-in-1 Hydrafacial Glow treatment, your skin gets exactly what it needs: deep cleansing, gentle resurfacing, and lasting hydration — all designed for Maltese skin and real-world results. After just one session, you'll see (and feel) the difference: smoother texture, balanced tone, and that luminous glow you thought you'd lost. No filters, no downtime — just confidence that shines through.",
  },
  suitability: {
    title: "Created for women who want their skin to glow — naturally and confidently.",
    suitableFor: [
      "Because you want skin that looks luminous, smooth, and deeply refreshed — even without makeup.",
      "Because you deserve a medical-grade facial that delivers visible results, not just promises.",
      "Because you prefer gentle, non-invasive treatments that respect your skin's balance and beauty.",
      "Because you value self-care and know that radiant skin reflects radiant confidence.",
      "Because you choose results backed by science — and trusted by Malta's leading aesthetics clinic.",
    ],
  },
  experience: {
    title: "What to expect during your Hydrafacial treatment?",
    steps: [
      {
        title: "BEFORE",
        desc: "Prepare your skin by avoiding harsh exfoliants for a few days. Drink plenty of water for optimal hydration. Use a mild cleanser to remove makeup and impurities before your facial.",
        image: "/assets/treatments/hydrafacial-step1.png",
      },
      {
        title: "AT SESSION",
        desc: "The med-aesthetician will start with gentle yet thorough cleansing. Experience personalized hydrating serums and masks infused deep into skin layers. Indulge in soothing facial massage enhancing circulation and product absorption.",
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
      { title: "ADVANCED SKIN RENEWAL", desc: "Salmon DNA booster and LED therapy rejuvenate dull, tired skin — restoring elasticity and luminosity from within." },
      { title: "SAFE & MEDICAL-GRADE CARE", desc: "Performed by certified aesthetic specialists using clinically proven equipment and protocols for real, visible results." },
    ],
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
  faqTitle: "FAQs about Hydrafacial in Malta",
  faq: [
    { q: "Who can benefit from Hydrafacial?", a: "Anyone looking to combat dryness, dullness, or dehydration in their skin can benefit from Hydrafacial. The treatments are suitable for various skin types and concerns." },
    { q: "How does Hydrafacial work?", a: "Hydrafacial work by delivering potent hydration deep into the skin using specialized techniques like dermal infusion, hyaluronic acid infusion, and custom serums. These treatments help improve skin texture, elasticity, and overall radiance." },
    { q: "What results can I expect from Hydrafacial?", a: "After undergoing Hydrafacial, you can expect hydrated, plump, and glowing skin. The treatments can help reduce fine lines, improve skin tone, and enhance overall skin health." },
    { q: "Are Hydrafacial suitable for sensitive skin?", a: "Yes, Hydrafacial can be tailored to suit sensitive skin types. Our skincare experts will customize the treatment to address specific concerns while ensuring gentle and effective hydration." },
    { q: "How often should I get Hydrafacial?", a: "The frequency of Hydrafacial depends on individual skin needs. Generally, a series of treatments spaced a few weeks apart is recommended for optimal results, followed by maintenance sessions as needed." },
    { q: "What makes Hydrafacial different from regular facials?", a: "Hydrafacial use cutting-edge technologies and specialized products formulated to deliver deep hydration and nourishment to the skin. These treatments go beyond basic facials to address specific skin concerns and provide lasting hydration and rejuvenation." },
    { q: "Can Advanced Hydrafacial help with acne-prone skin?", a: "Yes, Hydrafacial can be customized to address acne-prone skin. Our treatments include deep cleansing and anti-acne solutions that help reduce breakouts while providing essential hydration." },
    { q: "What should I expect during an Hydrafacial session?", a: "During a Hydrafacial session, you can expect a thorough skin assessment, followed by cleansing, exfoliation, and the application of customized serums and hydration treatments. The session may also include relaxing massages and advanced technology to enhance product absorption." },
    { q: "Are there any side effects from Hydrafacial?", a: "Hydrafacial are generally safe with minimal side effects. Some clients might experience temporary redness or slight sensitivity, which typically resolves within a few hours after treatment." },
    { q: "How long do the results of an Hydrafacial last?", a: "The results of an Hydrafacial can last for several weeks, depending on your skin type and home care routine. Regular treatments and proper skincare maintenance can prolong the benefits." },
    { q: "Can I combine Hydrafacial with other treatments?", a: "Yes, Hydrafacial can be combined with other treatments such as anti-aging therapies, chemical peels, or microdermabrasion for enhanced results. Our skincare experts can recommend the best combination based on your individual needs." },
  ],
};

export default t;
