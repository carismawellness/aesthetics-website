import type { Treatment } from "../treatment-types";

const t: Treatment = {
  slug: "thread-lift-malta",
  category: "Face",
  hero: {
    title: "Thread Lift Malta | Non-Surgical Lifting",
    subtitle: "Ready to defy gravity and achieve a more youthful, lifted appearance without surgery?",
    body: "Looking for a non-surgical facelift option in Malta? Our Thread Lift treatments can help lift and tighten your skin, giving you a more youthful and refreshed appearance. Our experienced team uses the latest techniques and top-quality threads to ensure natural-looking, long-lasting results.",
    prices: [
      { label: "BPO threads", price: "from €239" },
      { label: "Semi-permanent", price: "from €2100 (not PDO thread)" },
    ],
    cta: "BOOK YOUR THREAD LIFT SESSION NOW",
    bookHref: "https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2800348&oiid=sv%3A25753677&share=true&pId=2708191",
    image: "/assets/treatments/thread-lift-malta-hero.avif",
    productTabs: ["/assets/treatments/thread-lift-malta-logo-springthread.png"],
    heroForm: true,
  },
  info: [
    { metric: "Procedure Time", detail: "2-3 hours" },
    { metric: "Downtime", detail: "2 weeks, with doctor monitoring" },
    { metric: "Results Last For", detail: "8-12 months" },
    { metric: "Results Visible In", detail: "2 weeks" },
    { metric: "Anaesthetic", detail: "Local anesthetic" },
  ],
  beforeAfterTitle: "THREAD LIFT RESULTS",
  beforeAfter: [
    { before: "/assets/treatments/thread-lift-malta-ba1-before.png", after: "/assets/treatments/thread-lift-malta-ba1-after.png", name: "Daniela R.", review: "My cheeks had started to droop and pull my whole face down — now my midface sits higher and I just look fresher." },
    { before: "/assets/treatments/thread-lift-malta-ba2-before.png", after: "/assets/treatments/thread-lift-malta-ba2-after.png", name: "Carmen V.", review: "The sagging under my jaw and neck was what aged me most — the lift is subtle but my jawline finally looks defined again." },
    { before: "/assets/treatments/thread-lift-malta-ba3-before.png", after: "/assets/treatments/thread-lift-malta-ba3-after.png", name: "Isabel M.", review: "My whole face looks lifted and more contoured, yet it still moves and smiles exactly like me." },
    { before: "/assets/treatments/thread-lift-malta-ba4-before.png", after: "/assets/treatments/thread-lift-malta-ba4-after.png", name: "Nicole F.", review: "A gentle lift through my brow opened up my eyes — I look rested rather than heavy and tired." },
  ],
  precision: {
    title: "PRECISION AREAS OF REFINEMENT",
    intro: "Medical-grade threads are placed beneath the skin to lift and reposition tissue. Below are the primary zones of treatment.",
    areas: [
      { zone: "Midface", icon: "/assets/treatments/dermal-fillers-malta-icon-cheeks.png", name: "Midface Lift", desc: "Repositions sagging cheek tissue upward to restore a naturally lifted, youthful midface contour." },
      { zone: "Jowls", icon: "/assets/treatments/dermal-fillers-malta-icon-chin.png", name: "Jowl Reduction", desc: "Lifts and tightens the jowl area to redefine the transition from face to jawline." },
      { zone: "Jawline", icon: "/assets/treatments/dermal-fillers-malta-icon-jawline.png", name: "Jawline Contour", desc: "Creates a sharper, more defined jaw profile through precise thread placement along the mandible." },
      { zone: "Neck", icon: "/assets/treatments/icon-neck.png", name: "Neck Lift", desc: "Addresses neck laxity and banding for a smoother, more refined neck-to-jaw transition." },
    ],
    additionalTitle: "Thread placement strategy is assessed by the doctor based on your tissue laxity and facial anatomy.",
    additional: "Brow lift, nasolabial area, marionette zone, chin projection, temple region",
  },
  suitability: {
    title: "Is this suitable for you?",
    intro: "A thread lift provides non-surgical lifting for the face and neck, offering both an immediate visible result and long-term collagen stimulation. It is a medical procedure that requires a doctor's assessment to determine if it is the right approach for you.",
    suitableFor: [
      "You have mild to moderate sagging and want a non-surgical lifting option",
      "You want both an immediate lift and progressive collagen improvement",
      "You are looking for results that last 12 to 24 months",
      "You are comfortable with a doctor-assessed treatment plan",
      "You can follow aftercare guidance, including avoiding strenuous activity during healing",
    ],
    notIdeal: [
      "You have very advanced sagging — a surgical facelift may suit you better, and we will tell you honestly",
      "You need zero downtime this week — there is mild swelling for 1 to 2 weeks as it settles",
      "You are pregnant or breastfeeding — we will happily welcome you back afterwards",
      "You are expecting a full surgical-facelift result — threads lift and refresh, they do not replace surgery",
      "You have very thin or delicate skin — a skin booster or collagen-led plan may be the gentler path for you",
    ],
    personas: [
      { title: "The early-sagging face", desc: "Your cheeks and jowls have begun to soften and drift downward, and creams just are not holding the line anymore." },
      { title: "The not-ready-for-surgery patient", desc: "You want a real, visible lift but a surgical facelift feels like too much — you want a step in between." },
      { title: "The natural-result seeker", desc: "You want to look lifted and rested, not pulled or operated on — a subtle change that still looks like you." },
    ],
  },
  problem: {
    kicker: "The real reason people book",
    title: "Your face has started to slide, and you are not ready for surgery",
    body: [
      "Doctor-led thread lifting gently lifts and repositions the tissue that has softened with time — so your face looks firmer and rested, without the cut, the cost, or the downtime of a facelift.",
    ],
  },
  guarantee: {
    kicker: "The Natural Confidence Guarantee",
    title: "Natural Confidence Guarantee",
    paragraphs: [
      "Every thread lift starts with a doctor-led facial assessment and a natural-first approach that lifts without overcorrecting, backed by a free follow-up review to fine-tune your result until you are 100% satisfied with a face that still looks like you.",
    ],
    cta: "Book Your Free Consultation",
    points: [
      { value: "Doctor-led", label: "Assessment first", sub: "Never a salesperson" },
      { value: "Natural-first", label: "Lifted, never pulled", sub: "We refine, never overcorrect" },
      { value: "100%", label: "Satisfaction", sub: "Free follow-up until you are happy" },
    ],
  },
  experience: {
    title: "Your treatment experience",
    steps: [
      { title: "Consultation & Plan", desc: "One of our doctors assesses your facial anatomy, skin laxity, and goals, then designs a medically guided thread lift plan tailored to your structure.", image: "/assets/treatments/thread-lift-step1.png" },
      { title: "The Thread Lift", desc: "Your doctor places medical-grade threads beneath the skin through a fine cannula under local anaesthetic, lifting and repositioning the tissue.", image: "/assets/treatments/thread-lift-step3.png" },
      { title: "Ongoing Review & Adjustment", desc: "Your doctor monitors your response and refines the plan, so your lift keeps improving as collagen builds over the following months.", image: "/assets/treatments/thread-lift-step4.png" },
    ],
  },
  prepAftercare: {
    kicker: "Preparation & Aftercare",
    title: "Your session, step by step",
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
    title: "Malta's trusted clinic for thread lift",
    subtitle: "Doctor-Led Thread Lift in Malta",
    asSeenOn: ["/assets/press/lovin-malta.jpeg", "/assets/press/malta-daily.png", "/assets/press/bay.jpeg", "/assets/press/times-of-malta.png", "/assets/press/malta-today.jpg"],
    images: ["/assets/treatments/trusted-clinic-collage.png"],
    points: [
      { title: "Medically Qualified Practitioners", desc: "Every thread lift treatment is performed by a qualified doctor." },
      { title: "Advanced Facial Anatomy Expertise", desc: "Precision thread lift techniques tailored to your unique facial anatomy." },
      { title: "Personalised Treatment Plans", desc: "Your thread lift plan is designed to enhance, never overcorrect." },
      { title: "Clinically Approved Products", desc: "Clinically Approved Products — CE-marked, clinically approved thread lift products and evidence-based protocols." },
      { title: "Thousands of Treatments Performed", desc: "Experience and results you can trust, right here in Malta." },
    ],
  },
  difference: {
    kicker: "The Carisma Difference",
    title: "Malta's #1 leading wellness chain",
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
    mapQuery: "InterContinental Malta, St Julian's, Malta",
  },
  bookingForm: { title: "Book Your Thread Lift Appointment Today" },
  planSummary: {
    kicker: "Your thread lift plan",
    title: "Malta's Doctor-Led Thread Lift Plan",
    benefits: [
      { icon: "shield", title: "Doctor-Led Precision", desc: "Every thread lift is performed by a medically qualified doctor with advanced facial-anatomy expertise — never a salon, never nurse-only." },
      { icon: "sparkle", title: "Natural, Lifted Results", desc: "We lift and reposition the areas that have softened while keeping your expression — refreshed and firmer, never pulled." },
      { icon: "clock", title: "Collagen That Keeps Building", desc: "Your lift improves over the following months as the threads stimulate your own collagen — with a follow-up review included." },
    ],
    included: [
      { label: "Free doctor-led consultation & suitability assessment" },
      { label: "Personalised, medically guided thread lift plan" },
      { label: "Expert CE-marked thread lift treatment", value: "from €239" },
      { label: "Complimentary follow-up review" },
      { label: "Aftercare guidance & ongoing support" },
    ],
    price: "From €239",
    priceLabel: "per treatment",
    cta: { text: "Book Your Thread Lift Appointment", href: "/consultation" },
    reviews: "200+ verified reviews",
  },
  recommended: {
    title: "Recommended with thread lift",
    items: [
      { label: "Botox", href: "/wrinkle-relaxing-malta", image: "/assets/treatments/thread-lift-malta-rec-botox.avif" },
      { label: "Collagen stimulator", href: "/collagen-stimulator-malta", image: "/assets/treatments/thread-lift-malta-rec-collagen-stimulator.avif" },
      { label: "Dermal fillers", href: "/dermal-fillers-malta", image: "/assets/treatments/thread-lift-malta-rec-dermal-fillers.avif" },
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
