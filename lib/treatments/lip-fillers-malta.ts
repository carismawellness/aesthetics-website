import type { Treatment } from "../treatment-types";

// Live-page recreation of carismaaesthetics.com/lip-fillers-malta.
// Copy is verbatim from the live dump (including the botox-flavoured
// experience-step copy, which is what the live page actually shows).
// Step images + patient videos are byte-identical to the botox assets
// already in the repo, so those files are reused.
const t: Treatment = {
  slug: "lip-fillers-malta",
  category: "Face",
  hero: {
    title: "lip fillers malta",
    subtitle: "Are you looking to achieve fuller, more luscious lips?",
    body: "Get plump and luscious lips with our expert lip fillers in Malta. Say goodbye to thin lips and hello to the perfect pout.",
    prices: [{ label: "1ml", price: "from €219/ml" }],
    cta: "BOOK YOUR SESSION NOW",
    image: "/assets/treatments/lip-fillers-malta-hero.png",
    brandLogos: ["/assets/treatments/lip-fillers-malta-logo-teoxane.png", "/assets/treatments/lip-fillers-malta-logo-juvederm.png", "/assets/treatments/lip-fillers-malta-logo-croma.png"],
    imageRatio: "2494 / 1988",
    heroForm: true,
  },
  info: [
    { metric: "Procedure Time", detail: "20-30 minutes" },
    { metric: "Downtime", detail: "Minimal" },
    { metric: "Results Last For", detail: "6-12 months" },
    { metric: "Results Visible In", detail: "Immediate" },
    { metric: "Anaesthetic", detail: "Local anesthetic" },
  ],
  beforeAfterTitle: "lip fillers results",
  beforeAfter: [
    { before: "/assets/treatments/lip-fillers-malta-ba1-before.png", after: "/assets/treatments/lip-fillers-malta-ba1-after.png", label: "Natural Enhancement" },
    { before: "/assets/treatments/lip-fillers-malta-ba2-before.png", after: "/assets/treatments/lip-fillers-malta-ba2-after.png", label: "Volume & Definition" },
    { before: "/assets/treatments/lip-fillers-malta-ba3-before.png", after: "/assets/treatments/lip-fillers-malta-ba3-after.png", label: "Fuller Lips" },
    { before: "/assets/treatments/lip-fillers-malta-ba4-before.png", after: "/assets/treatments/lip-fillers-malta-ba4-after.png", label: "Lip Augmentation" },
    { before: "/assets/treatments/lip-fillers-malta-ba5-before.png", after: "/assets/treatments/lip-fillers-malta-ba5-after.png", label: "Male Treatment" },
  ],
  precision: {
    title: "precision areas of refinement",
    intro: "Enhancement is guided by your unique lip anatomy and desired outcome. Below are the four key dimensions we refine.",
    areas: [
      { zone: "Volume", icon: "/assets/treatments/lip-fillers-malta-icon-volume.png", name: "Lip Body", desc: "Adds subtle or fuller volume to the upper and lower lips, tailored to your natural proportions." },
      { zone: "Contour", icon: "/assets/treatments/lip-fillers-malta-icon-contour.png", name: "Contour", desc: "Defines the vermilion border for a crisp, elegant outline that frames the lips naturally." },
      { zone: "Shape", icon: "/assets/treatments/lip-fillers-malta-icon-shape.png", name: "Cupid's Bow", desc: "Refines the cupid's bow for a more defined, balanced shape that complements your features." },
      { zone: "Balance", icon: "/assets/treatments/lip-fillers-malta-icon-balance.png", name: "Symmetry", desc: "Addresses natural asymmetry between upper and lower lips for a harmonious, proportionate result." },
    ],
    additionalTitle: "Your practitioner may recommend additional refinements based on your facial balance assessment",
    additional: "Philtrum columns, oral commissures, perioral lines, lip flip, smoker's lines, marionette area",
  },
  suitability: {
    title: "is this suitable for you?",
    intro: "Lip enhancement is not one-size-fits-all. The right approach depends on your natural lip shape, facial proportions, and the result you are hoping for. We always start conservatively and build from there.",
    suitableFor: [
      "You want subtle enhancement that complements your natural features",
      "You would like improved symmetry, definition, or hydration",
      "You appreciate a conservative, gradual approach to enhancement",
      "You understand that some swelling is normal and final results settle in 2 to 4 weeks",
      "You are looking for a treatment that can be adjusted or reversed if needed",
    ],
    notIdeal: [
      "You are looking for a dramatically different lip shape",
      "You expect permanent results from a single session",
      "You are pregnant, breastfeeding, or have active cold sores in the lip area",
      "You have a low tolerance for temporary swelling or tenderness",
      "You would prefer a non-injectable alternative such as a lip flip",
    ],
  },
  experience: {
    title: "your treatment experience", cta: "BOOK YOUR FREE CONSULTATION",
    steps: [
      { title: "personalised consultation", desc: "We assess your facial anatomy, skin condition, medical history, and botox goals with one of our doctors.", image: "/assets/treatments/botox-step1.png" },
      { title: "Structured Plan", desc: "Your doctor designs a medically guided botox plan tailored to your facial structure and desired outcome.", image: "/assets/treatments/botox-step2.png" },
      { title: "Targeted Treatments", desc: "Your doctor administers botox using fine, precise injections, quick, comfortable, and no downtime.", image: "/assets/treatments/botox-step3.png" },
      { title: "Ongoing Review & Adjustment", desc: "Your doctor monitors your response and refines the plan to ensure natural botox results over time.", image: "/assets/treatments/botox-step4.png" },
    ],
  },
  prepAftercare: {
    kicker: "Preparation & Aftercare",
    title: "your session, step by step",
    intro: "Beautiful lip results begin with thoughtful preparation. Here is how to get the most from your session.",
    cards: [
      {
        icon: "/assets/treatments/lip-fillers-malta-icon-before.png",
        label: "Before",
        lead: "A few simple steps ensure a smooth treatment.",
        points: [
          "Share your aesthetic goals during consultation",
          "Disclose medications, allergies, and supplements",
          "Avoid blood thinners and alcohol for 24 hours",
          "Arrive with clean, makeup-free lips",
        ],
      },
      {
        icon: "/assets/treatments/lip-fillers-malta-icon-during.png",
        label: "During",
        lead: "Comfort and precision guide every step.",
        points: [
          "Topical numbing is applied before treatment",
          "Filler is placed with careful, measured technique",
          "Communicate your preferences throughout",
          "Session takes approximately 30–45 minutes",
        ],
      },
      {
        icon: "/assets/treatments/lip-fillers-malta-icon-after.png",
        label: "After",
        lead: "Gentle aftercare supports the best possible result.",
        points: [
          "Mild swelling and tenderness for 2–3 days",
          "No heat, alcohol, or exercise for 24 hours",
          "Avoid pressing or massaging for 48 hours",
          "Final result settles within 2 weeks",
        ],
      },
    ],
  },
  patientVideos: {
    title: "real patients, real confidence",
    intro: "Every face is unique. Every story is personal. Discover how our lip fillers patients describe their journey to refined, natural results at Carisma Aesthetics in Malta.",
    videos: ["/assets/treatments/botox-video1.mp4", "/assets/treatments/botox-video2.mp4", "/assets/treatments/botox-video3.mp4"],
  },
  trusted: {
    title: "malta's trusted clinic for lip fillers",
    subtitle: "DOCTOR-LED lip fillers IN MALTA",
    asSeenOn: ["/assets/press/lovin-malta.jpeg", "/assets/press/malta-daily.png", "/assets/press/bay.jpeg", "/assets/press/times-of-malta.png", "/assets/press/malta-today.jpg"],
    images: ["/assets/treatments/trusted-clinic-collage.png"],
    points: [
      { title: "medically qualified practitioners", desc: "Every lip fillers treatment is performed by a qualified doctor." },
      { title: "Advanced Facial Anatomy Expertise", desc: "Precision lip fillers techniques tailored to your unique facial anatomy." },
      { title: "Personalised Treatment Plans", desc: "Your lip fillers plan is designed to enhance, never overcorrect." },
      { title: "Clinically Approved Products", desc: "Clinically Approved Products — CE-marked, clinically approved lip fillers and evidence-based protocols." },
      { title: "Thousands of Treatments Performed", desc: "Experience and results you can trust, right here in Malta." },
    ],
  },
  difference: {
    kicker: "the carisma difference",
    title: "malta's #1 leading wellness chain",
    commitmentTitle: "our commitment",
    commitment: [
      "Natural, refined lip fillers results,  never overdone, never frozen",
      "Doctor-led treatments with advanced facial anatomy expertise",
      "Safe, ethical care using clinically approved products",
      "A personalised journey from consultation to aftercare",
    ],
    whyTitle: "WHY MALTA CHOOSES Carisma for lip fillers",
    why: [
      "Created by the team behind Malta's leading spa and medical aesthetics centres",
      "Doctor-led lip fillers treatments with a focus on safety and long-term results",
      "A personalised journey from consultation to aftercare",
      "Seamless experience with ongoing support and guidance",
    ],
    mapQuery: "Carisma Aesthetics, Malta",
  },
  bookingForm: { title: "BOOK YOUR lip fillers APPOINTMENT TODAY" },
  recommended: {
    title: "recommended with lip fillers",
    items: [
      { label: "Dermal fillers", href: "/dermal-fillers-malta", image: "/assets/treatments/lip-fillers-malta-rec-dermal-fillers.png" },
      { label: "Microneedling", href: "/microneedling-malta", image: "/assets/treatments/lip-fillers-malta-rec-microneedling.png" },
      { label: "botox", href: "/wrinkle-relaxing-malta", image: "/assets/treatments/lip-fillers-malta-rec-botox.png" },
      { label: "collagen stimulator", href: "/collagen-stimulator-malta", image: "/assets/treatments/lip-fillers-malta-rec-collagen.png" },
    ],
  },
  faqTitle: "faqs about lip-fillers in malta",
  faq: [
    { q: "What are lip fillers, and how do they work?", a: "Lip fillers are a cosmetic treatment that involves injecting a dermal filler, typically made of hyaluronic acid, into the lips to add volume and enhance their shape. Hyaluronic acid is a naturally occurring substance in the body that helps to hydrate and plump the skin, and it can be used to add volume to the lips, smooth fine lines and wrinkles around the mouth, and improve lip symmetry." },
    { q: "What are the benefits of lip fillers?", a: "Lip fillers can improve the appearance of the lips in many ways, including adding volume, enhancing their shape, smoothing fine lines and wrinkles around the mouth, and improving lip symmetry." },
    { q: "What can I expect during a lip filler treatment?", a: "During a lip filler treatment, a qualified practitioner will inject the dermal filler into the lips using a small needle or cannula. The treatment typically takes 30 minutes to an hour to complete, depending on the desired results and the amount of filler used. You may experience some mild discomfort or swelling during and after the treatment, which typically subsides within a few days." },
    { q: "Is a lip filler treatment painful?", a: "While some discomfort or pain may be experienced during a lip filler treatment, most patients find the procedure tolerable. A local anesthetic may be applied to the lips to numb the area and minimize any pain or discomfort." },
    { q: "What is the recovery time for a lip filler treatment?", a: "Recovery time after a lip filler treatment is generally minimal. You may experience some mild swelling, bruising, or tenderness at the injection sites, but these side effects usually subside within a few hours." },
    { q: "How long do the results of a lip filler treatment last?", a: "The longevity of lip filler results can vary depending on the individual and the type of filler used. Generally, the results can last from 6-12 months, as the filler gradually breaks down and is absorbed by the body. To maintain the results, additional treatments may be recommended." },
    { q: "Are there any side effects or risks associated with a lip filler treatment?", a: "As with any cosmetic procedure, there can be side effects and risks associated with a lip filler treatment. Common side effects include temporary redness, swelling, or bruising at the injection sites. In rare cases, more serious complications such as infection, allergic reaction, or tissue damage may occur. It's essential to consult with a qualified practitioner to minimize risks and ensure proper treatment." },
    { q: "Who is a suitable candidate for a lip filler treatment?", a: "Lip fillers are suitable for most individuals who want to enhance the appearance of their lips. It's not recommended for those with certain medical conditions or allergies. A thorough consultation with a qualified practitioner is necessary to determine if lip fillers are the right treatment for you. It's also important to have realistic expectations and to understand that the results of the treatment may vary depending on the individual's anatomy and the type of filler used." },
  ],
};

export default t;
