import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "prp-malta",
  category: "Face",
  hero: {
    title: "prp treatment in malta",
    subtitle: "Doctor-Led PRP Treatment — Rejuvenate Naturally with Your Own Healing Power",
    body: "Is dull skin, thinning hair, or visible scarring holding you back? Rediscover radiant, youthful skin and thicker, healthier hair with our expert PRP treatment in Malta. Every session is performed by qualified doctors who harness the regenerative power of your own plasma rich platelets to stimulate collagen, accelerate healing, and deliver natural, lasting results from within.",
    prices: [
      { label: "PRP for hair loss -", price: "from €149" },
      { label: "PRP facial rejuvenation -", price: "from €175" },
      { label: "PRP vampire facial-", price: "from €199" },
    ],
    cta: "BOOK YOUR SESSION NOW",
    image: "/assets/treatments/prp-malta-hero.png",
    imageRatio: "468 / 373",
    heroForm: true,
  },
  info: [
    { metric: "PROCEDURE TIME", detail: "35-45 MINUTES" },
    { metric: "DOWNTIME", detail: "NONE TO COPULE OF DAYS" },
    { metric: "RESULTS LAST FOR", detail: "6-12 MONTHS" },
    { metric: "RESULTS VISIBLE IN", detail: "1-4 WEEKS" },
    { metric: "ANAESTHETIC", detail: "ANAESTHETIC CREAM" },
  ],
  beforeAfterTitle: "prp results",
  beforeAfter: [
    { before: "/assets/treatments/prp-malta-ba1-before.png", after: "/assets/treatments/prp-malta-ba1-after.png" },
    { before: "/assets/treatments/prp-malta-ba2-before.png", after: "/assets/treatments/prp-malta-ba2-after.png" },
  ],
  precision: {
    title: "precision areas of refinement",
    intro: "Your body's own growth factors are concentrated and applied where renewal is needed most. Below are the primary treatment zones.",
    areas: [
      { zone: "Face", icon: "/assets/treatments/prp-malta-icon-face.png", name: "Facial Rejuvenation", desc: "Stimulates collagen and tissue repair across the face for a naturally refreshed, radiant complexion." },
      { zone: "Eyes", icon: "/assets/treatments/prp-malta-icon-eyes.png", name: "Under-Eye Renewal", desc: "Targets dark circles, fine lines, and thin skin beneath the eyes with concentrated growth factors." },
      { zone: "Scalp", icon: "/assets/treatments/prp-malta-icon-scalp.png", name: "Hair Restoration", desc: "Delivers growth factors directly to thinning areas of the scalp to reactivate dormant follicles." },
      { zone: "Skin", icon: "/assets/treatments/prp-malta-icon-skin.png", name: "Vampire Facial", desc: "Combines PRP with microneedling for enhanced penetration and accelerated skin renewal." },
    ],
    additionalTitle: "Your practitioner will recommend the most effective application method based on your goals",
    additional: "Neck, decolletage, hands, acne scars, stretch marks, surgical scars",
  },
  suitability: {
    title: "is this suitable for you?",
    intro: "This treatment uses your own blood to stimulate natural rejuvenation and collagen renewal. Because it works with your biology, there is no risk of allergic reaction. Results are gradual and best achieved through a course of three sessions.",
    suitableFor: [
      "You prefer a natural approach using your body's own growth factors",
      "You want to improve skin quality, texture, or early-stage hair thinning",
      "You are comfortable with a blood draw as part of the treatment process",
      "You are committed to a three-session course for optimal results",
      "You appreciate a treatment with no risk of allergic reaction",
    ],
    notIdeal: [
      "You are looking for instant, same-day results",
      "You have a blood disorder, platelet dysfunction, or are on anticoagulant therapy",
      "You are pregnant, breastfeeding, or have an active infection in the area",
      "You are experiencing advanced hair loss with no remaining active follicles",
      "You are looking for volume or structural changes to your face",
    ],
  },
  experience: {
    title: "your treatment experience",
    steps: [
      { title: "personalised consultation", desc: "We assess your skin or scalp condition, medical history, and PRP treatment goals with one of our doctors.", image: "/assets/treatments/prp-malta-step1.png" },
      { title: "Structured Plan", desc: "Your doctor designs a personalised treatment protocol tailored to your specific concerns whether facial rejuvenation, hair restoration, or a vampire facial.", image: "/assets/treatments/prp-malta-step2.png" },
      { title: "Targeted Treatments", desc: "Your doctor draws a blood sample, processes it in a centrifuge, and delivers the concentrated PRP via precise injection: comfortable and approximately 35-45 minutes.", image: "/assets/treatments/prp-malta-step3.jpg" },
      { title: "Ongoing Review & Adjustment", desc: "Your doctor monitors your skin or hair response and adjusts the treatment protocol to maximise results across your course of sessions.", image: "/assets/treatments/prp-malta-step4.png" },
    ],
  },
  prepAftercare: {
    kicker: "Preparation & Aftercare",
    title: "your session, step by step",
    intro: "Your own blood provides the growth factors for natural regeneration. Here is how to support the process",
    cards: [
      {
        icon: "/assets/treatments/prp-malta-icon-prep-before.png",
        label: "Before",
        lead: "Preparation supports optimal platelet quality.",
        points: [
          "Stay well hydrated in the 24 hours before",
          "Avoid anti-inflammatories and blood thinners for 48 hours",
          "Disclose all medications and health conditions",
          "Arrive with clean skin if treating the face",
        ],
      },
      {
        icon: "/assets/treatments/prp-malta-icon-prep-during.png",
        label: "During",
        lead: "Your own platelets are processed and precisely delivered.",
        points: [
          "A small blood sample is drawn and processed",
          "Platelet-rich plasma is extracted via centrifuge",
          "PRP is injected into the treatment area",
          "Session takes 45–60 minutes in total",
        ],
      },
      {
        icon: "/assets/treatments/prp-malta-icon-prep-after.png",
        label: "After",
        lead: "Gentle care supports your body's healing response.",
        points: [
          "Mild redness and swelling for 24–48 hours",
          "Avoid touching treated areas for 6 hours",
          "No exercise, alcohol, or heat for 24 hours",
          "Visible improvement from 3–4 weeks onward",
        ],
      },
    ],
  },
  patientVideos: {
    title: "real patients, real confidence",
    intro: "Every journey is unique. Every story is personal. Discover how our patients describe their experience of natural skin rejuvenation and hair restoration at Carisma Aesthetics in Malta.",
    videos: ["/assets/treatments/vid-prp-malta.mp4"],
  },
  trusted: {
    title: "malta's trusted clinic for prp treatment",
    subtitle: "Doctor-Led PRP Treatment in Malta",
    asSeenOn: ["/assets/press/lovin-malta.jpeg", "/assets/press/malta-daily.png", "/assets/press/bay.jpeg", "/assets/press/times-of-malta.png", "/assets/press/malta-today.jpg"],
    images: [
      "/assets/treatments/prp-malta-trusted1.png",
      "/assets/treatments/prp-malta-trusted2.png",
      "/assets/treatments/prp-malta-trusted3.png",
      "/assets/treatments/prp-malta-trusted4.png",
    ],
    points: [
      { title: "Medically Qualified Practitioners", desc: "Every treatment is performed by a qualified doctor." },
      { title: "Advanced Facial Anatomy Expertise", desc: "Precision PRP injection techniques tailored to your unique skin or scalp concerns." },
      { title: "Personalised Treatment Plans", desc: "Your treatment protocol is personalised to your goals, whether facial rejuvenation, hair restoration, or a vampire facial." },
      { title: "Clinically Approved Products", desc: "Clinically Approved Products, Medical-grade centrifuge equipment and evidence-based protocols using your own plasma rich platelets." },
      { title: "Thousands of Treatments Performed", desc: "Experience and results you can trust, right here in Malta." },
    ],
  },
  difference: {
    kicker: "The Carisma Difference",
    title: "malta’s #1 leading wellness chain",
    commitmentTitle: "our commitment",
    commitment: [
      "Natural, gradual results — restoration, not transformation",
      "Doctor-led treatments with advanced regenerative medicine expertise",
      "Safe, ethical care using your own plasma rich platelets",
      "A personalised journey from consultation to aftercare",
    ],
    whyTitle: "WHY MALTA CHOOSES CARISMA FOR PRP TREATMENT",
    why: [
      "Created by the team behind Malta’s leading spa and medical aesthetics centres",
      "Doctor-led treatment with a focus on safety and natural, lasting results",
      "A personalised journey from consultation to aftercare",
      "Seamless experience with ongoing support and guidance",
    ],
    mapQuery: "Carisma Aesthetics, Malta",
  },
  bookingForm: { title: "BOOK YOUR PRP APPOINTMENT TODAY" },
  recommended: {
    title: "recommended with prp treatment",
    items: [
      { label: "Microneedling", href: "/microneedling-malta", image: "/assets/treatments/rec-microneedling.jpg" },
      { label: "mesotherapy", href: "/mesotherapy-malta", image: "/assets/treatments/rec-mesotherapy.jpg" },
    ],
  },
  faqTitle: "faqs about prp treatment in malta",
  faq: [
    {
      q: "What is PRP, and how does it work?",
      a: "PRP stands for platelet rich plasma. It is a regenerative treatment that uses your own blood to promote healing, collagen production, and tissue renewal. A small amount of blood is drawn from your arm and placed in a centrifuge, which separates the plasma rich platelets from the other blood components. The resulting plasma is rich in growth factors and proteins that stimulate cellular repair and collagen synthesis when injected or applied to the treatment area. At Carisma in Malta, we use PRP treatment for facial rejuvenation, hair restoration, acne scar reduction, and overall skin rejuvenation, always performed by qualified doctors.",
    },
    {
      q: "Is PRP treatment painful?",
      a: "Most patients describe the treatment as very tolerable. For PRP facial treatment and vampire facial sessions, anaesthetic cream is applied before the session to numb the skin and minimise discomfort. The blood draw feels similar to a routine blood test, a brief pinch. PRP injections are performed using fine needles, and most patients rate the sensation as mild and manageable. At Carisma, our doctors adjust their technique throughout the session based on the area being treated and your comfort level.",
    },
    {
      q: "How many PRP sessions do I need?",
      a: "Most patients achieve optimal results with a course of 3 to 4 PRP sessions, spaced 4 to 6 weeks apart. The number of sessions depends on your specific concern, PRP hair treatment typically requires 3 to 4 sessions for visible improvement, while PRP facial treatment and acne scar treatment may benefit from 3 to 6 sessions depending on severity. Your doctor will recommend the ideal number during your free consultation. PRP treatment results are cumulative, meaning each session builds on the last, with maintenance sessions every 6 to 12 months recommended to sustain results",
    },
    {
      q: "What is the difference between PRP and microneedling?",
      a: "PRP and microneedling are complementary treatments that work through different mechanisms. Microneedling creates controlled micro-channels in the skin to stimulate collagen production through the body’s natural healing response. PRP therapy uses your own plasma rich platelets — rich in growth factors, to accelerate healing, boost collagen synthesis, and promote cellular regeneration. When combined into a vampire facial, the microneedling creates channels that allow the PRP to penetrate deeper into the skin, amplifying the regenerative effect. At Carisma, our doctors frequently recommend PRP microneedling for patients seeking maximum skin rejuvenation results.",
    },
    {
      q: "What is a vampire facial?",
      a: "A vampire facial is a PRP facial treatment combined with microneedling. During the treatment, your doctor draws a small amount of blood, processes it to extract the plasma rich platelets, and then applies them to the face during a microneedling session. The micro-channels created by the microneedling device allow the PRP to penetrate deep into the skin, stimulating collagen production and cellular renewal at a deeper level than PRP injection alone. The vampire facial at our aesthetic clinic in Malta is one of our most popular PRP treatments, ideal for patients seeking comprehensive facial rejuvenation, acne scar improvement, and a natural, radiant glow.",
    },
    {
      q: "Can PRP help with hair loss?",
      a: "Yes. PRP hair treatment is a clinically proven approach that stimulates dormant hair follicles and promotes new hair growth. The growth factors in plasma rich platelets nourish the follicles, improve blood supply to the scalp, strengthen existing hair, and encourage the growth of thicker, healthier strands. PRP hair treatment in Malta at Carisma is suitable for both men and women experiencing early to moderate hair thinning, whether caused by genetics, hormones, stress, or ageing. Most patients notice reduced shedding after the first session, with visible new growth typically appearing after 2 to 3 sessions. It is one of the most effective non-surgical options for hair restoration and regrowth.",
    },
    {
      q: "What is the recovery time for PRP treatment?",
      a: "Recovery after PRP treatment is generally minimal. You may experience mild redness, swelling, or tenderness at the injection sites, but these side effects typically subside within 24 to 48 hours. Most patients return to normal activities the same day or the following day. For PRP facial treatment and vampire facial sessions, avoid makeup for at least 12 hours and strenuous exercise for 24 hours. For PRP hair treatment, avoid washing your hair for at least 12 hours. Your doctor at Carisma will provide detailed aftercare instructions specific to your treatment.",
    },
    {
      q: "Who is not suitable for PRP treatment?",
      a: "The treatment is not recommended for patients with active skin infections or inflamed acne in the treatment area, pregnant or breastfeeding women, those currently on blood-thinning medications or anticoagulant therapy, patients with blood disorders or platelet dysfunction, those with active autoimmune conditions, or patients undergoing chemotherapy or immunosuppressive treatment. During your free consultation at our aesthetic clinic in Malta, your doctor will review your full medical history to ensure PRP therapy is safe and appropriate for you.",
    },
    {
      q: "How long do PRP results last?",
      a: "Treatment results are cumulative and long-lasting because the therapy stimulates your body’s own collagen production and cellular regeneration. After a full course of 3 to 4 sessions, patients typically enjoy improved skin texture, reduced scarring, thicker hair, and a healthier complexion for 6 to 12 months. However, natural ageing and environmental factors continue over time, so maintenance PRP sessions every 6 to 12 months are recommended to sustain and build upon your results. Your doctor will recommend a personalised maintenance plan during your follow-up appointments.",
    },
    {
      q: "Can PRP be combined with other treatments?",
      a: "Yes. The treatment is highly versatile and can be combined with several other treatments for enhanced results. The most popular combination is PRP with microneedling — the vampire facial — which amplifies collagen stimulation and allows the plasma rich platelets to penetrate deeper into the skin. It can also complement dermal filler treatments, laser therapy, and other skin rejuvenation procedures. Your doctor at our aesthetic clinic in Malta will recommend the best combination approach during your consultation based on your individual concerns and goals.",
    },
  ],
};

export default t;
