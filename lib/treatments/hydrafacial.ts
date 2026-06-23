import type { Treatment } from "../treatment-types";

// Recreates https://www.carismaaesthetics.com/hydrafacial — copy is verbatim
// from the live page. Live section order: hero → results → precision →
// suitability → experience → prep/aftercare → packages → boosters →
// technologies → booking form → patient videos → trusted → difference →
// recommended → faq. (Boosters + technologies wheel need new shared sections —
// see orchestrator notes.)
const t: Treatment = {
  slug: "hydrafacial",
  category: "Face",
  hero: {
    title: "Hydrafacial in Malta",
    subtitle: "The Deep-Cleansing Facial That Hydrates, Brightens and Restores Your Skin",
    body: "Dull skin, clogged pores, or a complexion that has lost its glow? Our HydraFacial in Malta cleanses, extracts, and hydrates in a single session, personalised to your skin type and concerns. Walk out with visibly clearer, more radiant skin from your very first visit, plumper, more radiant skin from your very first session.",
    prices: [
      { label: "Hydrafacial Fresh (30 mins)", price: "- €99" },
      { label: "Hydrafacial Glow (50 mins)", price: "€139" },
      { label: "Hydrafacial Signature (80 mins)", price: "€199" },
    ],
    cta: "BOOK HYDRAFACIAL NOW",
    image: "/assets/treatments/hydrafacial-hero.jpg",
  },
  beforeAfterTitle: "hydrafacial results",
  beforeAfter: [
    { before: "/assets/treatments/hydrafacial-ba1-before.png", after: "/assets/treatments/hydrafacial-ba1-after.png", label: "Acne & Skin Clarity" },
    { before: "/assets/treatments/hydrafacial-ba2-before.png", after: "/assets/treatments/hydrafacial-ba2-after.png", label: "Radiance & Glow" },
    { before: "/assets/treatments/hydrafacial-ba3-before.png", after: "/assets/treatments/hydrafacial-ba3-after.png", label: "Deep Hydration" },
    { before: "/assets/treatments/hydrafacial-ba4-before.png", after: "/assets/treatments/hydrafacial-ba4-after.png", label: "Skin Texture" },
    { before: "/assets/treatments/hydrafacial-ba5-before.png", after: "/assets/treatments/hydrafacial-ba5-after.png", label: "Pigmentation" },
  ],
  precision: {
    title: "precision areas of refinement",
    intro:
      "Each HydraFacial targets your skin's specific concerns using personalised serums and advanced vortex technology. Below are the primary concerns we treat.",
    areas: [
      { zone: "pores", icon: "/assets/treatments/hydrafacial-icon-pores.png", name: "Deep Pore Cleansing", desc: "Painless vortex suction extracts blackheads, sebum, and impurities from congested pores without harsh squeezing." },
      { zone: "texture", icon: "/assets/treatments/hydrafacial-icon-texture.png", name: "Skin Texture & Tone", desc: "AHA and BHA exfoliation removes dead skin cells and surface dullness for a smoother, brighter complexion." },
      { zone: "eyes", icon: "/assets/treatments/hydrafacial-icon-hydration.png", name: "Deep Skin Hydration", desc: "Hyaluronic acid and nourishing serums replenish moisture at the cellular level for a plump, dewy complexion." },
      { zone: "lines", icon: "/assets/treatments/hydrafacial-icon-lines.png", name: "Anti-Ageing & Fine Lines", desc: "Anti-ageing peptides and antioxidants smooth fine lines and restore elasticity for a youthful, rested appearance." },
    ],
    additionalTitle: "ADDITIONAL hydrafacial skin treatmets",
    additionalIntro: "These concerns can also be treated with Hydrafacial following a personalised consultation with one of our doctors.",
    additional: "Pigmentation, sun damage, dullness, acne scarring, uneven skin tone,",
  },
  suitability: {
    title: "Is hydrafacial suitable for you?",
    intro:
      "HydraFacial is one of the most versatile facial treatments available, suitable for virtually all skin types, tones, and ages. Whether you are preparing for a special event, maintaining healthy skin, or targeting a specific concern, a personalised HydraFacial at our Malta clinic can help. A consultation with our team ensures we select the right protocol for you.",
    suitableFor: [
      "You want to address dull, dehydrated, or tired-looking skin.",
      "You have clogged pores, blackheads, or oily skin that needs a deep cleanse",
      "You want a facial treatment with immediate, visible results and zero downtime",
      "You are preparing for a special event and want your skin to glow",
      "You want to combine HydraFacial with other treatments such as microneedling or Botox",
    ],
    notIdeal: [
      "You have an active skin infection, rash, or open wound in the treatment area",
      "You are currently experiencing a severe acne flare-up with pustules",
      "You have had a chemical peel, laser treatment, or microneedling within the last 2 weeks",
      "You have an active cold sore outbreak",
      "You have a known allergy to any of the treatment serums (discussed during consultation)",
    ],
  },
  experience: {
    title: "Your treatment experience",
    steps: [
      { title: "personalised consultation", desc: "We assess your skin type, concerns, and goals to select the ideal HydraFacial protocol and booster serums for your session.", image: "/assets/treatments/hydrafacial-step1.png" },
      { title: "Structured Plan", desc: "Your aesthetician selects the treatment package, serum cocktail, and targeted boosters tailored to your skin type and concerns.", image: "/assets/treatments/hydrafacial-step2.png" },
      { title: "Targeted Treatments", desc: "Your aesthetician performs your personalised HydraFacial — cleansing, extracting, and infusing nourishing serums in a single comfortable session.", image: "/assets/treatments/hydrafacial-step3.jpg" },
      { title: "Ongoing Review & Adjustment", desc: "We review your skin's response and recommend the ideal maintenance frequency and booster adjustments to maximise your results over time.", image: "/assets/treatments/hydrafacial-step4.png" },
    ],
    cta: "BOOK YOUR FREE CONSULTATION",
  },
  prepAftercare: {
    kicker: "PREPARATION & AFTERCARE",
    title: "your session, step by step",
    intro: "A smooth HydraFacial experience begins with a few simple steps. Here is what to know before, during, and after your session at our Malta clinic.",
    cards: [
      {
        icon: "/assets/treatments/hydrafacial-icon-prep-before.png",
        label: "BEFORE",
        lead: "Arrive informed and ready for a comfortable session.",
        points: [
          "Avoid harsh exfoliants and chemical peels for 3-5 days",
          "Stay well hydrated in the days leading up to your session",
          "Arrive with clean, product-free skin or we will cleanse for you",
          "Disclose any active skin conditions or recent treatments",
        ],
      },
      {
        icon: "/assets/treatments/hydrafacial-icon-prep-during.png",
        label: "DURING",
        lead: "Treatment is quick, precise, and guided by your comfort.",
        points: [
          "Gentle vortex suction cleanses and extracts impurities",
          "Personalised serums are infused into the skin",
          "Boosters applied based on your package",
          "Session takes 30–80 minutes",
        ],
      },
      {
        icon: "/assets/treatments/hydrafacial-icon-prep-after.png",
        label: "AFTER",
        lead: "A few precautions help your results settle beautifully.",
        points: [
          "Results are visible immediately after treatment",
          "Avoid heavy makeup for at least 6 hours",
          "Apply SPF 30+ and avoid actives for 24 hours",
          "Maintain results with monthly sessions",
        ],
      },
    ],
  },
  // Live shows this section straight after prep & aftercare, with rich package
  // cards (image, includes list, complimentary list, "Best for", gift link,
  // Book now). The shared pricingGrid renders name/price/desc only — content is
  // condensed into desc; richer cards + reorder reported to the orchestrator.
  pricingGrid: {
    title: "Hydrafacial packages Malta",
    intro:
      "Three HydraFacial experiences designed for every skin goal and schedule. Every package includes personalised serum selection, complimentary spa access, and free parking at our InterContinental Hotel clinic in St. Julian's. From a 30-minute express deep cleanse to our full 80-minute signature facial. Choose the HydraFacial that fits your skin and your day.",
    items: [
      {
        name: "Fresh package",
        price: "30 min · from €99",
        desc: "Treatment includes: Idropeeling, Bubble Pen, Scrubber. Complimentary: 3h Spa Day Use, 3h Free Parking at InterContinental. Best for: A quick deep cleansing facial to refresh and hydrate. Ideal when you are short on time.",
      },
      {
        name: "Glow package",
        price: "50 min · from €139",
        desc: "Treatment includes: Idropeeling, Scrubber, Bubble Pen, Oxygen Spray Gun, High Frequency. Complimentary: Unlimited Spa Day Use, 3h Free Parking at InterContinental. Best for: Our most popular HydraFacial. Combines deep pore cleansing with brightening and anti-ageing for a complete skin overhaul.",
      },
      {
        name: "Signature package",
        price: "80 min · from €199",
        desc: "Treatment includes: Idropeeling, Scrubber, Bubble Pen, Oxygen Spray Gun, Micro Currents, Nano Needling, Crio Handle, High Frequency. Complimentary: Unlimited Spa Day Use, 3h Free Parking at InterContinental. Best for: The ultimate facial treatment in Malta. All 8 technologies for deep cleansing, contouring, anti-ageing, and total skin rejuvenation.",
      },
    ],
  },
  bookingForm: { title: "BOOK YOUR hydrafacial APPOINTMENT TODAY" },
  patientVideos: {
    title: "Real patients, real confidence",
    intro: "Watch our clients' Hydrafacial journeys and see the stunning results that have boosted their confidence.",
    videos: [
      "/assets/treatments/hydrafacial-video1.mp4",
      "/assets/treatments/hydrafacial-video2.mp4",
      "/assets/treatments/hydrafacial-video3.mp4",
    ],
  },
  trusted: {
    title: "Malta's trusted clinic for hydrafacial",
    subtitle: "DOCTOR-LED hydrafacial IN MALTA",
    asSeenOn: ["/assets/press/lovin-malta.jpeg", "/assets/press/malta-daily.png", "/assets/press/bay.jpeg", "/assets/press/times-of-malta.png", "/assets/press/malta-today.jpg"],
    images: ["/assets/treatments/trusted-clinic-collage.png"],
    points: [
      { title: "medically qualified practitioners", desc: "Every hydrafacial treatment is performed by a qualified doctor." },
      { title: "Advanced Facial Anatomy Expertise", desc: "with targeted serums and boosters selected for your skin type and concerns" },
      { title: "Personalised Treatment Plans", desc: "We use medical-grade serums, peptides, and antioxidants with advanced multi-step technology" },
      { title: "Complimentary Spa Experience", desc: "Every HydraFacial includes complimentary spa access and free parking at our clinic" },
      { title: "Thousands of Treatments Performed", desc: " Experience and results you can trust, right here in Malta." },
    ],
  },
  difference: {
    kicker: "the carisma difference",
    title: "Malta’s #1 leading wellness chain",
    commitmentTitle: "our commitment",
    commitment: [
      "Natural, radiant results — your skin at its healthiest, not an artificial finish",
      "Doctor-led treatments with advanced facial anatomy expertise",
      "Safe, ethical care using medical-grade serums and advanced technology",
      "A personalised journey from consultation to aftercare",
    ],
    whyTitle: "WHY MALTA CHOOSES Carisma for hydrafacial",
    why: [
      "Created by the team behind Malta’s leading spa and medical aesthetics centres",
      "Personalised HydraFacial protocols with 8 targeted skin boosters to choose from",
      "A relaxing experience at our InterContinental Hotel clinic with complimentary spa access",
      "Seamless experience with ongoing support and guidance",
    ],
    mapQuery: "Carisma Aesthetics, Malta",
  },
  recommended: {
    title: "Recommended with hydrafacial",
    items: [
      { label: "Microneedling", href: "/microneedling-malta", image: "/assets/treatments/hydrafacial-rec-microneedling.jpg" },
      { label: "Dermafillers", href: "/dermal-fillers-malta", image: "/assets/treatments/hydrafacial-rec-dermafillers.avif" },
      { label: "Botox", href: "/wrinkle-relaxing-malta", image: "/assets/treatments/hydrafacial-rec-botox.jpg" },
      { label: "Chemical peels", href: "/chemical-peels-malta", image: "/assets/treatments/hydrafacial-rec-chemical-peels.png" },
      { label: "MFU Ultight", href: "/skin-tightening-1", image: "/assets/treatments/hydrafacial-rec-mfu.png" },
    ],
  },
  faqTitle: "FAQs about hydrafacial in Malta",
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
