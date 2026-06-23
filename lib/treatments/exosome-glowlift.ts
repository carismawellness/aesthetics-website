import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "exosome-glowlift",
  category: "Package",
  hero: {
    title: "Exosome glow lift",
    body: "When facials stop working and your glow fades, Exosomes offer the next step — real regeneration for smoother, firmer, brighter skin.",
    benefits: [
      "Microneedling with Exosomes (€200)",
      "LED Light Therapy (€50)",
      "Glass Skin Face Mask (€30)",
      "In-person Skin Consultation (€60)",
      "€25 Aesthetics Credit (€25)",
    ],
    prices: [{ label: "Total Value: €365 – Today", price: "€175 Only" }],
    note: "Limited to just 15 clients.",
    cta: "CLAIM MY SPOT NOW",
  },
  beforeAfterTitle: "what our clients have to say about their results",
  beforeAfter: [
    { before: "/assets/treatments/microneedling-malta-ba1-before.png", after: "/assets/treatments/microneedling-malta-ba1-after.png" },
    { before: "/assets/treatments/microneedling-malta-ba2-before.jpg", after: "/assets/treatments/microneedling-malta-ba2-after.jpg" },
  ],
  experience: {
    title: "What to expect during your microneedling treatment?",
    steps: [
      {
        title: "BEFORE",
        desc: "Avoid using any topical skin products containing retinol, aha or any other acid at least 24 hours prior to the procedure. Discuss any medical conditions, allergies, and medications with your provider. Share your concerns and objectives with our expert practitioners and answer any questions.",
        image: "/assets/treatments/microneedling-malta-step1.png",
      },
      {
        title: "AT SESSION",
        desc: "Our expert practitioner will use a handheld device with tiny needles, microneedling the skin. This stimulates the body's natural healing process and promotes collagen production. Communicate any discomfort or concerns to the practitioner during the procedure.",
        image: "/assets/treatments/microneedling-malta-step2.png",
      },
      {
        title: "AFTER",
        desc: "Avoid using any topical skin products containing retinol, aha or any other acid at least 24 hours after the procedure. Refrain from exercise, alcohol, and saunas for at least 24 hours. Results are gradual and may require several sessions for optimal results.",
        image: "/assets/treatments/microneedling-malta-step3.png",
      },
    ],
  },
  trusted: {
    title: "#1 award winning chain in Malta with 30+ years in wellness",
    subtitle: "why carisma aesthetics ?",
    images: ["/assets/treatments/microneedling-malta-trusted.png"],
    points: [
      { title: "Team of highly trained and Medically qualified practitioners", desc: "Every treatment is performed by a qualified doctor or trained medical professional." },
      { title: "Central and discrete location", desc: "Conveniently located in St. Julian's with easy access and private, comfortable surroundings." },
      { title: "Flexible scheduling and booking", desc: "Book at a time that suits you — we offer appointments that fit around your lifestyle." },
      { title: "Personalised treatment plans", desc: "Your treatment is tailored to your individual skin goals, concerns, and medical history." },
      { title: "Advanced treatments with cutting edge technology", desc: "We use clinically approved, medical-grade devices and products for safe, effective results." },
    ],
  },
  faqTitle: "Frequently asked questions",
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
