import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "thread-lift-malta",
  category: "Face",
  hero: {
    title: "THREAD LIFT",
    subtitle: "Ready to defy gravity and achieve a more youthful, lifted appearance without surgery?",
    body: "Looking for a non-surgical facelift option in Malta? Our Thread Lift treatments can help lift and tighten your skin, giving you a more youthful and refreshed appearance. Our experienced team uses the latest techniques and top-quality threads to ensure natural-looking, long-lasting results.",
    prices: [
      { label: "BPO threads", price: "from €239" },
      { label: "Semi-permanent", price: "from €2100 (not PDO thread)" },
    ],
    cta: "BOOK YOUR SESSION NOW",
    image: "/assets/treatments/thread-lift-malta-hero.avif",
    productTabs: ["/assets/treatments/thread-lift-malta-logo-springthread.png"],
    heroForm: true,
  },
  info: [
    { metric: "Procedure Time", detail: "2-3 hours" },
    { metric: "Downtime", detail: "2 weeks, with doctor monitoring" },
    { metric: "Results Last For", detail: "8-12 months" },
    { metric: "Results Visible In", detail: "2- weeks" },
    { metric: "Anaesthetic", detail: "Local anesthetic" },
  ],
  beforeAfterTitle: "THREAD LIFT RESULTS",
  beforeAfter: [
    { before: "/assets/treatments/thread-lift-malta-ba1-before.png", after: "/assets/treatments/thread-lift-malta-ba1-after.png" },
    { before: "/assets/treatments/thread-lift-malta-ba2-before.png", after: "/assets/treatments/thread-lift-malta-ba2-after.png" },
    { before: "/assets/treatments/thread-lift-malta-ba3-before.png", after: "/assets/treatments/thread-lift-malta-ba3-after.png" },
    { before: "/assets/treatments/thread-lift-malta-ba4-before.png", after: "/assets/treatments/thread-lift-malta-ba4-after.png" },
  ],
  precision: {
    title: "PRECISION AREAS OF REFINEMENT",
    intro: "Medical-grade threads are placed beneath the skin to lift and reposition tissue. Below are the primary zones of treatment.",
    areas: [
      { zone: "Midface", icon: "/assets/treatments/icon-forehead.png", name: "Midface Lift", desc: "Repositions sagging cheek tissue upward to restore a naturally lifted, youthful midface contour." },
      { zone: "Jowls", icon: "/assets/treatments/icon-brow.png", name: "Jowl Reduction", desc: "Lifts and tightens the jowl area to redefine the transition from face to jawline." },
      { zone: "Jawline", icon: "/assets/treatments/icon-eyes.png", name: "Jawline Contour", desc: "Creates a sharper, more defined jaw profile through precise thread placement along the mandible." },
      { zone: "Neck", icon: "/assets/treatments/icon-neck.png", name: "Neck Lift", desc: "Addresses neck laxity and banding for a smoother, more refined neck-to-jaw transition." },
    ],
    additionalTitle: "Thread placement strategy is assessed by the doctor based on your tissue laxity and facial anatomy.",
    additional: "Brow lift, nasolabial area, marionette zone, chin projection, temple region",
  },
  suitability: {
    title: "IS THIS SUITABLE FOR YOU?",
    intro: "A thread lift provides non-surgical lifting for the face and neck, offering both an immediate visible result and long-term collagen stimulation. It is a medical procedure that requires a doctor's assessment to determine if it is the right approach for you.",
    suitableFor: [
      "You have mild to moderate sagging and want a non-surgical lifting option",
      "You want both an immediate lift and progressive collagen improvement",
      "You are looking for results that last 12 to 24 months",
      "You are comfortable with a doctor-assessed treatment plan",
      "You can follow aftercare guidance, including avoiding strenuous activity during healing",
    ],
    notIdeal: [
      "You have very advanced sagging that may require a surgical approach",
      "You are not prepared for 1 to 2 weeks of recovery with some swelling",
      "You are pregnant, breastfeeding, or managing autoimmune conditions",
      "You expect the same degree of lift as a surgical facelift",
      "You have very thin skin, which may need a different treatment pathway",
    ],
  },
  experience: {
    title: "YOUR TREATMENT EXPERIENCE",
    steps: [
      { title: "Personalised Consultation", desc: "We assess your facial anatomy, skin condition, medical history, and botox goals with one of our doctors.", image: "/assets/treatments/botox-step1.png" },
      { title: "Structured Plan", desc: "Your doctor designs a medically guided botox plan tailored to your facial structure and desired outcome.", image: "/assets/treatments/botox-step2.png" },
      { title: "Targeted Treatments", desc: "Your doctor administers botox using fine, precise injections, quick, comfortable, and no downtime.", image: "/assets/treatments/botox-step3.png" },
      { title: "Ongoing Review & Adjustment", desc: "Your doctor monitors your response and refines the plan to ensure natural botox results over time.", image: "/assets/treatments/botox-step4.png" },
    ],
  },
  prepAftercare: {
    kicker: "Preparation & Aftercare",
    title: "Your Session, Step by Step",
    intro: "This is an advanced, minimally invasive procedure. Thorough preparation and careful aftercare are essential.",
    cards: [
      {
        icon: "/assets/treatments/thread-lift-malta-icon-before.png",
        label: "Before",
        lead: "Proper preparation supports a smooth procedure and recovery.",
        points: [
          "Attend a consultation for suitability assessment",
          "Disclose all medications, supplements, and history",
          "Avoid blood thinners and alcohol for 1 week",
          "Arrange rest for the day of treatment",
        ],
      },
      {
        icon: "/assets/treatments/thread-lift-malta-icon-during.png",
        label: "During",
        lead: "A minimally invasive procedure under local anaesthetic.",
        points: [
          "The treatment area is numbed with local anaesthetic",
          "Medical-grade threads are placed beneath the skin",
          "You may feel mild pressure during insertion",
          "Procedure takes 60–90 minutes",
        ],
      },
      {
        icon: "/assets/treatments/thread-lift-malta-icon-after.png",
        label: "After",
        lead: "Careful aftercare supports healing and lasting results.",
        points: [
          "Sleep on your back for 1–2 weeks",
          "Avoid strenuous activity for 2 weeks",
          "Mild swelling and tenderness for 7–14 days",
          "Lift improves as collagen develops over months",
        ],
      },
    ],
  },
  trusted: {
    title: "Malta's Trusted Clinic for Thread Lift",
    subtitle: "Doctor-Led Thread Lift in Malta",
    asSeenOn: ["/assets/press/lovin-malta.jpeg", "/assets/press/malta-daily.png", "/assets/press/bay.jpeg", "/assets/press/times-of-malta.png", "/assets/press/malta-today.jpg"],
    images: ["/assets/treatments/trusted-clinic-collage.png"],
    points: [
      { title: "Medically Qualified Practitioners", desc: "Every thread lift treatment is performed by a qualified doctor." },
      { title: "Advanced Facial Anatomy Expertise", desc: "Precision thread lift techniques tailored to your unique facial anatomy." },
      { title: "Personalised Treatment Plans", desc: "Your thread lift plan is designed to enhance, never overcorrect." },
      { title: "Clinically Approved Products", desc: "Clinically Approved Products — CE-marked, clinically approved botox and evidence-based protocols." },
      { title: "Thousands of Treatments Performed", desc: "Experience and results you can trust, right here in Malta." },
    ],
  },
  difference: {
    kicker: "The Carisma Difference",
    title: "Malta's #1 Leading Wellness Chain",
    commitmentTitle: "Our Commitment",
    commitment: [
      "Natural, refined thread lift results, never overdone, never frozen",
      "Doctor-led treatments with advanced facial anatomy expertise",
      "Safe, ethical care using clinically approved products",
      "A personalised journey from consultation to aftercare",
    ],
    whyTitle: "Why Malta Chooses Carisma for Thread Lift",
    why: [
      "Created by the team behind Malta's leading spa and medical aesthetics centres",
      "Doctor-led thread lift treatments with a focus on safety and long-term results",
      "A personalised journey from consultation to aftercare",
      "Seamless experience with ongoing support and guidance",
    ],
    mapQuery: "Carisma Aesthetics, Malta",
  },
  bookingForm: { title: "Book Your Thread Lift Appointment Today" },
  recommended: {
    title: "Recommended with Thread Lift",
    items: [
      { label: "Botox", href: "/wrinkle-relaxing-malta", image: "/assets/treatments/thread-lift-malta-rec-botox.avif" },
      { label: "Collagen Stimulator", href: "/collagen-stimulator-malta", image: "/assets/treatments/thread-lift-malta-rec-collagen-stimulator.avif" },
      { label: "Dermal Fillers", href: "/dermal-fillers-malta", image: "/assets/treatments/thread-lift-malta-rec-dermal-fillers.avif" },
      { label: "Platelet-rich plasma", href: "/prp-malta", image: "/assets/treatments/thread-lift-malta-rec-prp.avif" },
    ],
  },
  faqTitle: "Frequently asked questions",
  faq: [
    { q: "What is thread lifting, and how does it work?", a: "Thread lifting is a non-surgical cosmetic procedure that involves using permanent threads to lift and tighten sagging skin on the face and body. These threads are inserted underneath the skin using a fine needle, and they provide long-lasting support to the tissues, creating a lifted appearance. Over time, the body's natural healing response encourages collagen production around the threads, contributing to sustained firmness." },
    { q: "What can I expect during a thread lifting treatment?", a: "During a thread lifting treatment, a local anesthetic is applied to numb the treatment area. The doctor then strategically inserts the permanent threads beneath the skin using a fine needle. This process involves minimal discomfort. The procedure typically takes about 2-3 hours, depending on the treatment areas." },
    { q: "Is thread lifting painful?", a: "Most patients report only mild discomfort during thread lifting procedures. The local anesthesia applied prior to the treatment helps minimize pain. Some individuals might experience slight bruising, swelling, or tenderness in the treated areas, but these effects generally subside within a few days." },
    { q: "What is the recovery time for thread lifting?", a: "The recovery time for thread lifting is relatively short compared to surgical procedures. You may experience some swelling, bruising, and minor discomfort for a few days. Most individuals can resume their regular activities within a week. However, it's advised to avoid strenuous exercise and facial massages for a couple of weeks to ensure proper healing." },
    { q: "How long does it take to see the results of thread lifting?", a: "Results from thread lifting are often noticeable immediately after the treatment, with the lifting effect becoming more pronounced as the threads settle and collagen production increases. Full results are typically seen within a few weeks to a few months after the treatment." },
    { q: "How long do the results of thread lifting last?", a: "Permanent threads provide a long-lasting foundation for skin lifting and tightening. However, the effects of thread lifting can be influenced by factors such as individual aging, skin quality, and lifestyle choices. While the threads themselves do not dissolve, the aging process continues, and additional treatments might be desired over time." },
    { q: "Are there any side effects or risks associated with thread lifting?", a: "Like any medical procedure, thread lifting carries some potential risks. These can include mild bruising, swelling, infection at the insertion points, and rare instances of thread migration. Choosing a qualified and experienced medical professional to perform the procedure can help mitigate these risks." },
    { q: "Who is a suitable candidate for thread lifting?", a: "Thread lifting is generally suitable for individuals with mild to moderate skin sagging who want a more lifted and youthful appearance without undergoing surgery. It's important to have realistic expectations and be in generally good health. A consultation with a medical practitioner can determine if you're a suitable candidate based on your skin condition and desired outcomes." },
  ],
};

export default t;
