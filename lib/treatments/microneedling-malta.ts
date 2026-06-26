import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "microneedling-malta",
  category: "Face",
  hero: {
    title: "Microneedling Malta | Collagen Induction",
    subtitle: "Doctor-Led Microneedling with Mesotherapy — Restore Your Skin from Within",
    body: "Is uneven skin texture, scarring, or dull skin holding you back? Rediscover smoother, brighter, more confident skin with our expert microneedling and mesotherapy treatments in Malta. Every treatment is performed by qualified doctors who combine collagen induction therapy with personalised mesotherapy cocktails, delivering natural, lasting results that restore your skin from within.",
    prices: [
      { label: "1 session", price: "from €149 (+€50 for Exosomes)" },
      { label: "3 sessions", price: "from €359 (€120/session)" },
      { label: "5 sessions", price: "from €599 (€119/session)" },
    ],
    cta: "BOOK YOUR MICRONEEDLING+MESOTHERAPY NOW",
    bookHref: "https://www.fresha.com/a/carisma-aesthetics-st-julians-st-julians-stj-3310-malta-uip7g6p8/booking?menu=true&share=true&offerItems=sv%3A25753494&pId=2708191&dppub=true&cartId=e37ff293-83da-4329-a26e-b2877e3aae0d",
    image: "/assets/treatments/microneedling-malta-hero.png",
    brandLogos: ["/assets/treatments/microneedling-malta-logo-bcn.png", "/assets/treatments/microneedling-malta-logo-fillmed.png"],
    imageRatio: "450 / 358",
    heroForm: true,
  },
  info: [
    { metric: "Procedure Time", detail: "1 hour" },
    { metric: "Downtime", detail: "2-3 days" },
    { metric: "Results Last For", detail: "Maintenance courses may be required" },
    { metric: "Results Visible In", detail: "Individual depending on the skin condition" },
    { metric: "Anaesthetic", detail: "anaesthetic cream" },
  ],
  beforeAfterTitle: "microneedling results",
  beforeAfter: [
    { before: "/assets/treatments/microneedling-malta-ba1-before.png", after: "/assets/treatments/microneedling-malta-ba1-after.png", name: "Daniel V.", review: "Years of pitted acne scars on my cheeks finally look smoother — my skin feels like mine again." },
    { before: "/assets/treatments/microneedling-malta-ba2-before.png", after: "/assets/treatments/microneedling-malta-ba2-after.png", name: "Mariella S.", review: "The acne marks on my cheeks faded and my skin looks so much more even — I barely wear foundation now." },
    { before: "/assets/treatments/microneedling-malta-ba3-before.png", after: "/assets/treatments/microneedling-malta-ba3-after.png", name: "Chloe A.", review: "My texture and little blemishes evened out and my whole face just glows now." },
    { before: "/assets/treatments/microneedling-malta-ba4-before.png", after: "/assets/treatments/microneedling-malta-ba4-after.png", name: "Carmen B.", review: "The fine lines around my eyes softened beautifully — I look rested without looking done." },
    { before: "/assets/treatments/microneedling-malta-ba5-before.png", after: "/assets/treatments/microneedling-malta-ba5-after.png", name: "Josephine R.", review: "My pores and sun spots are so much less noticeable — my skin looks years fresher." },
  ],
  precision: {
    title: "precision areas of refinement",
    intro: "Controlled micro-injuries trigger your skin's natural renewal response. Below are the primary concerns and zones we target.",
    areas: [
      { zone: "Texture", icon: "/assets/treatments/microneedling-malta-icon-texture.png", name: "Skin Texture", desc: "Refines overall skin texture by stimulating collagen production across the full treatment zone." },
      { zone: "Scars", icon: "/assets/treatments/microneedling-malta-icon-scars.png", name: "Acne Scarring", desc: "Breaks down scar tissue and promotes new collagen to gradually smooth rolling and pitted scars." },
      { zone: "Pores", icon: "/assets/treatments/microneedling-malta-icon-pores.png", name: "Enlarged Pores", desc: "Tightens the pore structure through repeated collagen stimulation for a visibly refined surface." },
      { zone: "Lines", icon: "/assets/treatments/microneedling-malta-icon-lines.png", name: "Fine Lines", desc: "Softens early fine lines by encouraging the skin to rebuild its collagen matrix from within." },
    ],
    additionalTitle: "Your practitioner selects needle depth and mesotherapy infusion based on your individual skin assessment.",
    additional: "Pigmentation, stretch marks, neck, decolletage, hands, surgical scars",
  },
  suitability: {
    title: "Is this suitable for you?",
    intro: "Every skin tells a different story. Microneedling with mesotherapy is most effective when tailored to your specific skin concerns, whether that is scarring, texture, fine lines, or overall radiance. A free consultation with one of our doctors helps us assess your skin and design a treatment plan that works for you.",
    suitableFor: [
      "You want to improve acne scarring, enlarged pores, fine lines, or uneven texture",
      "You are open to 3 to 6 sessions for cumulative, lasting improvement",
      "You can manage 24 to 48 hours of mild redness similar to light sunburn",
      "You are interested in combining microneedling with exosomes or PRP for enhanced results",
      "You want a treatment that improves skin quality without injectables",
    ],
    notIdeal: [
      "You have an active breakout or skin infection right now — we will happily treat you once your skin has calmed",
      "You have used isotretinoin (Accutane) in the last six months — a short wait keeps your skin safe, and we will be here",
      "You are pregnant or breastfeeding — we will welcome you back warmly afterwards",
      "You have a history of keloid scarring we have not assessed yet — let us take a careful look together first",
      "You would rather not follow simple daily SPF during recovery — sun protection is what protects your results",
    ],
    personas: [
      { title: "The acne-scar healer", desc: "Old breakouts left pitted scars or marks, and you want smoother, more even skin without surgery or heavy resurfacing." },
      { title: "The dull, tired complexion", desc: "Your skin looks flat and lacklustre, and you want that fresh, lit-from-within glow back." },
      { title: "The early-ageing preventer", desc: "Fine lines, larger pores, or uneven texture are creeping in, and you want to rebuild collagen before they deepen." },
    ],
  },
  problem: {
    kicker: "The real reason people book",
    title: "Your skin feels older and more tired than you are",
    body: [
      "Doctor-led microneedling with mesotherapy gently rebuilds collagen from within — softening scars, refining texture, and bringing back the natural, healthy glow that still looks like you.",
    ],
  },
  guarantee: {
    kicker: "The Natural Confidence Guarantee",
    title: "Natural Confidence Guarantee",
    paragraphs: [
      "Every plan starts with a doctor-led skin assessment and a natural-first approach focused on gradual, healthy renewal — backed by a free follow-up review until you are 100% satisfied with skin that still looks like you.",
    ],
    cta: "Book Your Free Consultation",
    points: [
      { value: "Doctor-led", label: "Assessment first", sub: "Never a salesperson" },
      { value: "Natural-first", label: "Gradual renewal", sub: "We restore, never overtreat" },
      { value: "100%", label: "Satisfaction", sub: "Free follow-up until you are happy" },
    ],
  },
  experience: {
    title: "Your treatment experience",
    steps: [
      { title: "Consultation & Plan", desc: "One of our doctors assesses your skin condition, concerns, and medical history, then selects the mesotherapy cocktail and protocol tailored to your skin.", image: "/assets/treatments/microneedling-malta-step1.png" },
      { title: "Targeted Treatment", desc: "Your doctor performs microneedling with your personalised mesotherapy cocktail — precise, comfortable, and with minimal downtime.", image: "/assets/treatments/microneedling-malta-step3.png" },
      { title: "Ongoing Review & Adjustment", desc: "Your doctor reviews your skin's response and refines the plan across your course to ensure optimal, lasting results over time.", image: "/assets/treatments/microneedling-malta-step4.png" },
    ],
  },
  prepAftercare: {
    kicker: "Preparation & Aftercare",
    title: "your session, step by step",
    intro: "A smooth microneedling experience begins with a few simple steps. Here is what to know before, during, and after your session at our Malta clinic.",
    cards: [
      {
        icon: "/assets/treatments/microneedling-malta-icon-prep-before.png",
        label: "Before",
        lead: "Proper preparation helps your skin respond well.",
        points: [
          "Discontinue retinoids and actives 3–5 days before",
          "Avoid sun exposure and tanning for 1 week",
          "Disclose medications and active skin conditions",
          "Arrive with clean, product-free skin",
        ],
      },
      {
        icon: "/assets/treatments/microneedling-malta-icon-prep-during.png",
        label: "During",
        lead: "Precise micro-channels stimulate collagen and renewal.",
        points: [
          "Topical numbing is applied for 20–30 minutes",
          "A medical-grade device creates micro-channels",
          "Serums are delivered into skin during treatment",
          "Session takes 45–60 minutes",
        ],
      },
      {
        icon: "/assets/treatments/microneedling-malta-icon-prep-after.png",
        label: "After",
        lead: "Your skin enters a natural healing phase.",
        points: [
          "Redness similar to mild sunburn for 24–48 hours",
          "Avoid makeup and active products for 24 hours",
          "Apply SPF daily; avoid direct sun exposure",
          "Visible improvement develops over 2–4 weeks",
        ],
      },
    ],
  },
  patientVideos: {
    title: "Real patients, real confidence",
    intro: "Every skin is unique. Every story is personal. Discover how our microneedling patients describe their journey to smoother, healthier skin at Carisma Aesthetics in Malta.",
    videos: [
      "/assets/treatments/microneedling-malta-video1.mp4",
      "/assets/treatments/microneedling-malta-video2.mp4",
      "/assets/treatments/microneedling-malta-video3.mp4",
    ],
  },
  trusted: {
    title: "Malta's trusted clinic for microneedling",
    subtitle: "DOCTOR-LED microneedling IN MALTA",
    asSeenOn: ["/assets/press/lovin-malta.jpeg", "/assets/press/malta-daily.png", "/assets/press/bay.jpeg", "/assets/press/times-of-malta.png", "/assets/press/malta-today.jpg"],
    images: ["/assets/treatments/microneedling-malta-trusted.png"],
    points: [
      { title: "medically qualified practitioners", desc: "Every microneedling treatment is performed by a qualified doctor." },
      { title: "Advanced Facial Anatomy Expertise", desc: "Precision microneedling with personalised mesotherapy tailored to your unique skin concerns." },
      { title: "Personalised Treatment Plans", desc: "Your microneedling plan is designed for gradual, natural improvement" },
      { title: "Clinically Approved Products", desc: "CE-marked devices and medical-grade mesotherapy cocktails using evidence-based protocols." },
      { title: "Thousands of Treatments Performed", desc: "Experience and results you can trust, right here in Malta." },
    ],
  },
  difference: {
    kicker: "the carisma difference",
    title: "Malta’s #1 leading wellness chain",
    commitmentTitle: "our commitment",
    commitment: [
      "Natural, refined microneedling results — gradual improvement that respects your skin",
      "Doctor-led treatments with personalised mesotherapy cocktails",
      "Safe, ethical care using clinically approved devices and products",
      "A personalised journey from consultation to aftercare",
    ],
    whyTitle: "WHY MALTA CHOOSES CARISMA FOR MICRONEEDLING",
    why: [
      "Created by the team behind Malta’s leading spa and medical aesthetics centres",
      "Doctor-led microneedling with mesotherapy, focused on safety and long-term skin renewal",
      "A personalised journey from consultation to aftercare",
      "Seamless experience with ongoing support and guidance",
    ],
    mapQuery: "InterContinental Malta, St Julian's, Malta",
  },
  bookingForm: { title: "BOOK YOUR microneedling APPOINTMENT TODAY" },
  planSummary: {
    kicker: "Your microneedling plan",
    title: "Malta's Doctor-Led Microneedling Plan",
    benefits: [
      { icon: "shield", title: "Doctor-Led Precision", desc: "Every session is performed by a medically qualified doctor — never a salon, with needle depth tailored to your skin." },
      { icon: "sparkle", title: "Mesotherapy Included", desc: "A personalised vitamin and growth-factor cocktail is infused into the micro-channels for deeper nourishment and glow." },
      { icon: "chart", title: "Cumulative, Lasting Results", desc: "A structured course rebuilds collagen over time, softening scars and refining texture for results that keep improving." },
    ],
    included: [
      { label: "Free doctor-led skin consultation" },
      { label: "Personalised mesotherapy cocktail selection" },
      { label: "Medical-grade microneedling session", value: "from €149" },
      { label: "Optional exosome boost", value: "+€50" },
      { label: "Aftercare guidance & ongoing review" },
    ],
    price: "From €119",
    priceLabel: "per session in a course of 5",
    cta: { text: "Book Your Microneedling Appointment", href: "/consultation" },
    reviews: "200+ verified reviews",
  },
  recommended: {
    title: "Recommended with microneedling",
    items: [
      { label: "Chemical peels", href: "/chemical-peels-malta", image: "/assets/treatments/microneedling-malta-rec-chemical-peels.png" },
      { label: "PRP", href: "/prp-malta", image: "/assets/treatments/microneedling-malta-rec-prp.png" },
    ],
  },
  faqTitle: "FAQs about microneedling in Malta",
  faq: [
    {
      q: "What is microneedling, and how does it work?",
      a: "Microneedling, also known as collagen induction therapy, uses fine sterile needles to create controlled micro-channels in the skin. These micro-injuries trigger your body's natural healing response, stimulating the production of new collagen and elastin. At Carisma in Malta, we combine every microneedling session with personalised mesotherapy cocktails, vitamins, hyaluronic acid, and growth factors delivered directly into the skin through the micro-channels for enhanced results. The treatment improves skin texture, reduces scarring, minimises pores, and restores a healthy, natural glow.",
    },
    {
      q: "How much does microneedling cost in Malta?",
      a: "Microneedling at Carisma starts from €149 for a single session, which includes a personalised mesotherapy cocktail selected by your doctor. A course of 3 sessions is €359 (€120 per session), and 5 sessions is €599 (€119 per session). Exosomes can be added to any session for an additional €50. Book a free consultation at our St. Julian's clinic for a personalised recommendation based on your skin concerns and goals.",
    },
    {
      q: "Is microneedling painful?",
      a: "Most patients describe microneedling as a mild tingling or light prickling sensation. Before treatment, we apply anaesthetic cream to numb the skin, which significantly reduces any discomfort. Pain levels are typically rated 3-4 out of 10. At Carisma, our doctors adjust the needle depth throughout the treatment based on the area being treated and your comfort level. It is one of the reasons patients rate us as one of the best clinics for microneedling in Malta, comfort and care are always a priority.",
    },
    {
      q: "How many microneedling sessions do I need?",
      a: "Most patients achieve optimal results with a course of 3-5 sessions, spaced 4-6 weeks apart. The number of sessions depends on your specific concern, mild skin texture improvement may require 3 sessions, while deeper acne scars or significant skin rejuvenation goals may benefit from 5 or more. Your doctor will recommend the ideal number during your free consultation. Results are cumulative, meaning each session builds on the last.",
    },
    {
      q: "What is the difference between microneedling and mesotherapy?",
      a: "Microneedling creates micro-channels in the skin to stimulate collagen production through the body's natural healing response. Mesotherapy involves injecting a customised blend of vitamins, hyaluronic acid, amino acids, and growth factors into the skin for targeted nourishment. At Carisma, we combine both treatments in every session, the microneedling creates the channels and stimulates collagen, while the mesotherapy cocktail delivers deep nourishment simultaneously. This combination is more effective than either treatment alone because the active ingredients penetrate far deeper through the micro-channels.",
    },
    {
      q: "What is the recovery time for microneedling?",
      a: "Expect mild redness for 24-48 hours after treatment, similar to a light sunburn. Most patients return to their normal routine within 2-3 days. You should avoid makeup for at least 12 hours, strenuous exercise and alcohol for 24 hours, and active skincare ingredients like retinol and acids for 24-48 hours. Your doctor at Carisma will provide detailed aftercare instructions specific to your treatment. The downtime is minimal compared to more invasive skin resurfacing procedures.",
    },
    {
      q: "Can microneedling help with acne scars?",
      a: "Yes. Microneedling is one of the most effective non-surgical treatments for acne scarring. The collagen stimulation triggered by microneedling gradually fills and smooths indented scars from within. When combined with mesotherapy cocktails containing growth factors and vitamins, the results are enhanced further. Most patients with acne scars see significant improvement over a course of 3-5 sessions. At our Malta clinic, our doctors assess the depth and type of scarring during your consultation and design a treatment plan specific to your needs.",
    },
    {
      q: "What are exosomes and should I add them to my microneedling treatment?",
      a: "Exosomes are tiny cellular messengers derived from stem cells that play a key role in cell communication and tissue repair. When applied during microneedling, exosomes accelerate your skin's healing response, boost collagen production, and enhance overall skin regeneration at the cellular level. The exosomes add-on costs €50 per session and is recommended for patients seeking premium results, particularly for ageing skin, deeper scarring, or those who want to maximise the benefits of each treatment session. Your doctor will advise whether exosomes are right for your skin goals.",
    },
    {
      q: "Who is not suitable for microneedling?",
      a: "Microneedling is not recommended for patients with active acne or skin infections in the treatment area, pregnant or breastfeeding women, those currently taking blood-thinning medications, or patients with active skin conditions such as eczema or psoriasis on the treatment area. If you have had a chemical peel or laser treatment recently, you should wait before booking microneedling. During your free consultation at our Malta clinic, your doctor will review your full medical history to ensure microneedling is safe and appropriate for you.",
    },
    {
      q: "How long do microneedling results last?",
      a: "Microneedling results are cumulative and long-lasting because the treatment stimulates your body's own collagen production. After a full course of 3-5 sessions, patients typically enjoy improved skin texture, reduced scarring, and a healthier complexion for several months. However, collagen production naturally declines with age, so maintenance sessions every 3-6 months are recommended to sustain and build upon your results. Your doctor will recommend an ongoing maintenance plan tailored to your skin during your follow-up appointments.",
    },
  ],
};

export default t;
