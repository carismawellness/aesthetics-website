import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "ultimate-facelift",
  category: "Package",
  hero: {
    title: "Ultimate Facelift Package Malta — Lift, Tighten & Sculpt",
    subtitle: "Reverse visible aging — no knife, no downtime.",
    body: "If your skin's lost its lift, your cheeks feel flatter than before, or your jawline's lost its shape, this is your sign to rewind time — naturally. Our Ultimate Facelift Package is designed to lift, tighten, and sculpt — without surgery, fillers, or long recovery days.",
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
    { metric: "Treatment Duration", detail: "60-Minute Treatment" },
    { metric: "Results", detail: "Results are immediate and can last up to 3-5 years" },
    { metric: "Recovery", detail: "Avoid rubbing or massaging the injection areas for at least 24 hours" },
  ],
  beforeAfterTitle: "Real Ultimate Facelift Results from Our Malta Patients",
  beforeAfter: [
    {
      before: "/assets/treatments/thread-lift-malta-ba1-before.png",
      after: "/assets/treatments/thread-lift-malta-ba1-after.png",
    },
  ],
  precision: {
    title: "What Is the Ultimate Facelift Package?",
    intro: "See how our Ultimate Facelift Package gently lifts, tightens, and sculpts for visibly younger, naturally radiant skin.",
    areas: [
      { name: "Visible Lift & Contour", desc: "Enjoy a firmer, more lifted appearance after your first session." },
      { name: "Refreshed, Smooth Skin", desc: "Restores elasticity and reduces fine lines for a youthful glow." },
      { name: "No Surgery, No Downtime", desc: "A gentle, effective treatment performed with precision care." },
      { name: "Luxury Meets Science", desc: "Advanced thread technology delivered by certified aesthetic specialists." },
    ],
  },
  suitability: {
    title: "Who Is a Good Candidate for the Ultimate Facelift?",
    intro: "Thread lifting is generally suitable for individuals with mild to moderate skin sagging who want a more lifted and youthful appearance without undergoing surgery. It's important to have realistic expectations and be in generally good health. A consultation with a medical practitioner can determine if you're a suitable candidate based on your skin condition and desired outcomes.",
  },
  experience: {
    title: "How Does the Ultimate Facelift Package Work?",
    steps: [
      {
        title: "Step 1 — Before Your Treatment",
        desc: "Share your concerns and objectives with our expert practitioners and answer any questions. Discuss any medical conditions, allergies, and medications with your provider. Avoid alcohol, blood thinners, and aspirin for 24 hours prior to the procedure.",
        image: "/assets/treatments/thread-lift-malta-icon-before.png",
      },
      {
        title: "Step 2 — At Your Session",
        desc: "Our expert practitioner will insert thin threads into the targeted areas using a fine needle. Follow the practitioner's instructions for facial expressions and movements during the procedure. Communicate any discomfort or concerns to the practitioner during the procedure.",
        image: "/assets/treatments/thread-lift-malta-icon-during.png",
      },
      {
        title: "Step 3 — After Your Treatment",
        desc: "Avoid rubbing or massaging the injection areas for at least 24 hours. Refrain from exercise, alcohol, and saunas for at least 24 hours. Results are immediate and can last up to 3-5 years.",
        image: "/assets/treatments/thread-lift-malta-icon-after.png",
      },
    ],
  },
  trusted: {
    title: "Medically Qualified Practitioners — Safe Facelift in Malta",
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
      { title: "DEEP HYDRATION BOOST", desc: "Our Hyaluronic infusion restores plumpness and glow, leaving your skin smooth and radiant." },
      { title: "ADVANCED THREAD TECHNOLOGY", desc: "Medical-grade threads gently lift sagging skin while stimulating natural collagen for long-term results." },
      { title: "SAFE & CLINICALLY CERTIFIED", desc: "Performed by certified medical professionals using EU-approved, clinically proven products." },
    ],
  },
  difference: {
    kicker: "The Carisma Difference",
    title: "Book Your Ultimate Facelift Package in Malta Today",
    commitmentTitle: "OUR COMMITMENT",
    commitment: [
      "Visible Lift & Contour — A naturally lifted, youthful appearance from your very first session.",
      "Smooth, Firm Skin — Restores elasticity and reduces sagging with advanced rejuvenation technology.",
      "No Surgery, No Downtime — Gentle, effective, and non-invasive — perfect for busy schedules.",
      "Science Meets Aesthetics — Performed by certified professionals using leading EU-approved techniques.",
    ],
    whyTitle: "WHY MALTA CHOOSES CARISMA AESTHETICS",
    why: [
      "Decades of experience and trusted clinical reputation.",
      "Medical-grade technology used by top European aesthetic providers.",
      "Personalized treatments tailored to your unique skin needs.",
      "A long-standing legacy of real results and satisfied clients.",
    ],
    mapQuery: "Carisma Aesthetics, Malta",
  },
  bookingForm: { title: "SECURE YOUR EXCLUSIVE FACELIFT REJUVENATION OFFER NOW" },
  recommended: {
    title: "Recommended Treatments to Complement Your Facelift",
    items: [
      { label: "Botox", href: "/wrinkle-relaxing-malta", image: "/assets/treatments/thread-lift-malta-rec-botox.avif" },
      { label: "Collagen stimulator", href: "/collagen-stimulator-malta", image: "/assets/treatments/thread-lift-malta-rec-collagen-stimulator.avif" },
      { label: "Dermal fillers", href: "/dermal-fillers-malta", image: "/assets/treatments/thread-lift-malta-rec-dermal-fillers.avif" },
      { label: "Platelet-rich plasma", href: "/prp-malta", image: "/assets/treatments/thread-lift-malta-rec-prp.avif" },
    ],
  },
  faqTitle: "Frequently Asked Questions About the Ultimate Facelift in Malta",
  faq: [
    {
      q: "What is thread lifting, and how does it work?",
      a: "Thread lifting is a non-surgical cosmetic procedure that involves using permanent threads to lift and tighten sagging skin on the face and body. These threads are inserted underneath the skin using a fine needle, and they provide long-lasting support to the tissues, creating a lifted appearance. Over time, the body's natural healing response encourages collagen production around the threads, contributing to sustained firmness.",
    },
    {
      q: "What can I expect during a thread lifting treatment?",
      a: "During a thread lifting treatment, a local anesthetic is applied to numb the treatment area. The doctor then strategically inserts the permanent threads beneath the skin using a fine needle. This process involves minimal discomfort. The procedure typically takes about 2-3 hours, depending on the treatment areas.",
    },
    {
      q: "Is thread lifting painful?",
      a: "Most patients report only mild discomfort during thread lifting procedures. The local anesthesia applied prior to the treatment helps minimize pain. Some individuals might experience slight bruising, swelling, or tenderness in the treated areas, but these effects generally subside within a few days.",
    },
    {
      q: "What is the recovery time for thread lifting?",
      a: "The recovery time for thread lifting is relatively short compared to surgical procedures. You may experience some swelling, bruising, and minor discomfort for a few days. Most individuals can resume their regular activities within a week. However, it's advised to avoid strenuous exercise and facial massages for a couple of weeks to ensure proper healing.",
    },
    {
      q: "How long does it take to see the results of thread lifting?",
      a: "Results from thread lifting are often noticeable immediately after the treatment, with the lifting effect becoming more pronounced as the threads settle and collagen production increases. Full results are typically seen within a few weeks to a few months after the treatment.",
    },
    {
      q: "How long do the results of thread lifting last?",
      a: "Permanent threads provide a long-lasting foundation for skin lifting and tightening. However, the effects of thread lifting can be influenced by factors such as individual aging, skin quality, and lifestyle choices. While the threads themselves do not dissolve, the aging process continues, and additional treatments might be desired over time.",
    },
    {
      q: "Are there any side effects or risks associated with thread lifting?",
      a: "Like any medical procedure, thread lifting carries some potential risks. These can include mild bruising, swelling, infection at the insertion points, and rare instances of thread migration. Choosing a qualified and experienced medical professional to perform the procedure can help mitigate these risks.",
    },
    {
      q: "Who is a suitable candidate for thread lifting?",
      a: "Thread lifting is generally suitable for individuals with mild to moderate skin sagging who want a more lifted and youthful appearance without undergoing surgery. It's important to have realistic expectations and be in generally good health. A consultation with a medical practitioner can determine if you're a suitable candidate based on your skin condition and desired outcomes.",
    },
  ],
};

export default t;
