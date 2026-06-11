// Package sales-funnel pages — data extracted verbatim from the live Wix pages:
//   /snatch-your-jawline  /4-in-1-hydrafacial-glow  /exosome-glowlift  /ultimate-facelift
// All four share one funnel template (components/packages/PackageFunnel.tsx); each
// section renders only when its data is present, so the minimal Exosome page and the
// full Jawline/Hydrafacial/Facelift pages all come from the same component.

export type Benefit = { icon: string; title: string; desc: string };
export type ExpectCol = { label: string; img: string; points: string[] };
export type Faq = { q: string; a?: string };
export type RecCard = { label: string; img: string; href: string };
export type Testimonial = { img: string; quote: string; name: string };

export type PackageData = {
  slug: string;
  hero: {
    title: string;
    lead?: string;
    subtitle: string;
    subtitleBold?: string[];
    bodyParas?: string[];
    includedTitle: string;
    included: string[];
    total: string;
    note?: string;
    footnotes?: string[];
    disclaimer?: string;
    cta: string;
    poster: string;
    video?: string;
    posterRatio?: string;
  };
  testimonialsHeading: string;
  testimonialsHeadingTwoLine?: boolean;
  testimonials: Testimonial[];
  emotional?: { heading: string; paras: string[]; image: string };
  trusted?: { heading: string; headingTwoLine?: boolean; subtitle: string; benefits: Benefit[] };
  createdFor?: { heading: string; reasons: string[]; image: string };
  yearsDivider?: string;
  commitment?: { items: string[]; whyTitle: string; why: string[]; cta?: string };
  offer?: { heading: string; paras: string[]; image: string; imageRatio?: string };
  getBack?: { heading: string; subtitle: string; bullets: string[]; image: string };
  redefined?: {
    heading: string;
    subtitle: string;
    bullets: string[];
    image: string;
    tabs?: string[];
    stats?: { metric: string; value: string }[];
  };
  expect?: { heading: string; cols: ExpectCol[] };
  faq: Faq[];
  recommended: { heading: string; cards: RecCard[] };
};

const J = "/assets/packages/jawline";
const H = "/assets/packages/hydrafacial";
const E = "/assets/packages/exosome";
const F = "/assets/packages/facelift";

export const PACKAGES: Record<string, PackageData> = {
  // ===================== SNATCH YOUR JAWLINE =====================
  "snatch-your-jawline": {
    slug: "snatch-your-jawline",
    hero: {
      title: "snatch your jawline",
      subtitle:
        "For those in Malta ready to snatch their jawline — this non-surgical, low-downtime treatment melts chin fat, reverses sagging, and restores lasting definition at every age.",
      subtitleBold: ["snatch their jawline", "melts chin fat, reverses sagging, and restores lasting definition"],
      includedTitle: "What's Included in the Snatch Your Jawline Package:",
      included: [
        "Fat-Dissolving Injection (€150 value)",
        "LED Radiance Therapy (€50 value)",
        "Skin Tightening Laser (€100 value)",
        "€40 Carisma Aesthetics Credit (€40 value)",
        "In-Person Consultation (€60 value)",
      ],
      total: "Total Value: €400 – Today: €149 Only.",
      disclaimer:
        "Due to high demand, packages are offered based on availability and may not always be guaranteed. Please inquire for current options.",
      cta: "CLAIM MY SPOT NOW",
      poster: `${J}/hero-video-poster.jpg`,
      video: `${J}/hero-video.mp4`,
      posterRatio: "317 / 394",
    },
    testimonialsHeading: "THE SECRET TO VISIBLY MORE BEAUTIFUL SKIN –|OUR CUSTOMERS SHOW YOU HOW.",
    testimonialsHeadingTwoLine: true,
    testimonials: [
      { img: `${J}/testi-1.png`, quote: "Finally found my jawline again! I've always had a rounder face, no matter how much I worked out. This treatment honestly changed that. I feel more confident in photos, and the best part is it still looks super natural.", name: "Rachelle A." },
      { img: `${J}/testi-2.png`, quote: "Visible results without surgery! I always thought I needed something drastic to deal with my double chin, but this treatment proved me wrong. It was quick, comfortable, and the contour is so much better already. Even my husband noticed!", name: "Nadia G." },
      { img: `${J}/testi-3.png`, quote: "Exactly what I needed. I'd been avoiding photos because of the loose skin under my jaw. The treatment didn't just reduce the fullness — it actually redefined the shape. So happy I did this", name: "Carmen B." },
      { img: `${J}/testi-4.png`, quote: "I was always self-conscious about my double chin, especially in photos. Decided to try the fat dissolving treatment and honestly — I wish I did it sooner. The whole process was smooth, barely any downtime, and after a few weeks, I noticed a clear difference. Jawline looks more defined and the area under my chin is much tighter. Highly recommend it to any guy thinking about it.", name: "Daniel A." },
    ],
    emotional: {
      heading: "SO YOUR JAWLINE TURNS HEADS —",
      paras: [
        "Do you ever catch your reflection and wish your jawline looked sharper again?",
        "You look in the mirror and notice a softer chin line, a little sagging, or stubborn fat that wasn't there before.",
        "With our Snatch Your Jawline treatment, you can bring back that definition and confidence — no surgery, no downtime.",
        "After just one session, you'll see the difference… and even better, you'll feel it. Because a sculpted, defined jawline doesn't just change your profile — it changes how you carry yourself every day.",
        "Your face is your first impression. Let's make it unforgettable.",
      ],
      image: `${J}/so-jawline.png`,
    },
    trusted: {
      heading: "MALTA'S TOP CLINIC FOR NON-SURGICAL|JAWLINE CONTOURING",
      headingTwoLine: true,
      subtitle: "Times of Malta, Lovin Malta, Elle, Cosmopolitan",
      benefits: [
        { icon: `${J}/icon-instant.png`, title: "Instant Definition", desc: "Notice a visibly sharper, tighter jawline right after your first session." },
        { icon: `${J}/icon-fatdissolve.png`, title: "Fat-Dissolving Power", desc: "Advanced injections gently melt stubborn chin fat for a refined contour." },
        { icon: `${J}/icon-skintighten.png`, title: "Skin Tightening Effect", desc: "Our laser & LED combo lifts and firms the skin — no surgery, no scars." },
        { icon: `${J}/icon-safe.png`, title: "Safe & Certified", desc: "Conducted by certified experts with medical-grade, clinically proven technology." },
      ],
    },
    createdFor: {
      heading: "CREATED FOR WOMEN WHO REFUSE TO COMPROMISE|ON THEIR CONFIDENCE.",
      reasons: [
        "Because you want a visibly sculpted, defined jawline that enhances your natural beauty.",
        "Because you deserve the refined look that only a premium, non-surgical treatment can deliver.",
        "Because you prefer gentle, effective solutions that respect your skin and your time.",
        "Because you accept nothing less than treatments performed at the highest aesthetic standards.",
      ],
      image: `${J}/created-women.jpg`,
    },
    yearsDivider: "35+ YEARS DELIVERING RESULTS",
    commitment: {
      items: [
        "Visible Contour Boost – Sculpted, youthful jawline after the first session",
        "Smooth & Tight Skin – Reduces sagging and restores firmness",
        "No Surgery, No Downtime – Gentle, safe, and effective",
        "Luxury Meets Science – Advanced technology performed by certified professionals",
      ],
      whyTitle: "WHY MALTA CHOOSES CRISMA",
      why: [
        "Over 30 years of experience",
        "Medical-grade technology trusted by medical doctors",
        "Customized treatments for every skin type",
        "A legacy of results and client satisfaction",
      ],
      cta: "CLAIM YOUR SPOT NOW",
    },
    offer: {
      heading: "SECURE YOUR EXCLUSIVE|JAWLINE SCULPTING OFFER NOW",
      paras: [
        "Our special launch offer is available only for a limited time — after that, the regular price applies.",
        "Experience the transformative power of our Snatch Your Jawline treatment now just €149 (regularly €400).",
        "In just 45 minutes, you'll see and feel a visibly more defined, sculpted jawline that restores confidence and balance to your face.",
      ],
      image: `${J}/offer-laser.jpg`,
      imageRatio: "489 / 549",
    },
    getBack: {
      heading: "GET YOUR JAWLINE BACK. SHARPER. DEFINED. YOU.",
      subtitle: "A fast, gentle treatment that melts chin fat and tightens skin — no surgery, no downtime.",
      bullets: [
        "Only €149 instead of €400 — exclusive limited-time offer",
        "45-Minute Treatment — visible results in one session",
        "Gentle & Safe — non-surgical, medical-grade precision",
        "Malta's Luxury Aesthetics Clinic — personal care in a premium environment",
      ],
      image: `${J}/get-jawline.jpg`,
    },
    redefined: {
      heading: "YOUR JAWLINE — REDEFINED.",
      subtitle: "See how our Snatch Your Jawline treatment lifts, tightens, and sculpts for lasting definition.",
      bullets: [
        "Visible Contour Boost – Sculpted, youthful jawline after the first session",
        "Smooth & Tight Skin – Reduces sagging and restores firmness",
        "No Surgery, No Downtime – Gentle, safe, and effective",
        "Luxury Meets Science – Advanced technology performed by certified professionals",
      ],
      image: `${J}/redefined.png`,
      tabs: ["AQUALYX", "LEMON BOTTLE"],
      stats: [
        { metric: "Procedure time", value: "20-30 minutes" },
        { metric: "Downtime", value: "7-14 days of swelling" },
        { metric: "Results last for", value: "Permanent" },
        { metric: "Results visible in", value: "2 weeks or more" },
        { metric: "Anaesthetic", value: "None" },
      ],
    },
    expect: {
      heading: "what to expect during your Fat dissolving treatment?",
      cols: [
        { label: "before", img: `${J}/wte-before.png`, points: [
          "Share your concerns and objectives with our expert practitioners and answer any questions.",
          "Discuss any medical conditions, allergies, and medications with your provider.",
          "Avoid alcohol, blood thinners, and aspirin for 24 hours prior to the procedure.",
        ] },
        { label: "at session", img: `${J}/wte-session.png`, points: [
          "Our expert practitioner will mark the injection areas and use a fine needle to inject the solution into the targeted areas.",
          "Communicate any discomfort or concerns to the practitioner during the procedure.",
          "Relax and remain still during the procedure to ensure accuracy and safety.",
        ] },
        { label: "after", img: `${J}/wte-after.jpg`, points: [
          "Avoid rubbing or massaging the injection areas for at least 24 hours.",
          "Refrain from exercise, alcohol, and saunas for at least 24 hours.",
          "Results may take 2-4 weeks to appear",
        ] },
      ],
    },
    faq: [
      { q: "What can I expect during a Fat Dissolving treatment?", a: "During a Fat dissolving treatment, a qualified practitioner will administer a series of small injections under in the treated area, such as under chin, stomach and thighs. The number of injections and the amount of product used will depend on your specific needs and desired results. The procedure typically takes about 20-30 minutes to complete, and most patients require multiple treatment sessions spaced several weeks apart for optimal results." },
      { q: "Is Fat Dissolving painful?", a: "Some discomfort may be experienced during the injections, but it's generally well-tolerated. To minimize pain, your practitioner may apply a topical numbing cream or use a local anesthetic before the injections. Some patients may also experience a mild burning sensation during the treatment, which usually subsides shortly after the procedure." },
      { q: "What is the recovery time for Fat Dissolving treatments?", a: "After a Fat Dissolving treatment, you may experience some swelling, bruising, or redness in the treated area. These side effects are typically mild and subside within a few days to a week. Most people can return to their normal activities immediately after treatment, but it's essential to follow your practitioner's post-treatment care instructions to ensure proper healing and optimal results." },
      { q: "How long does it take to see the results of Fat Dissolving?", a: "Results from Fat Dissolving treatments typically become noticeable within two to four weeks after your initial treatment session. It's important to remember that multiple sessions may be needed to achieve your desired results, and the number of sessions will depend on the amount of fat being treated and your individual response to the treatment." },
      { q: "How long do the results of Fat Dissolving?", a: "The great thing about our Fat Dissolving is that the results are long-lasting. Once the fat cells under the treated areas are destroyed, they cannot store or accumulate fat again. As long as you maintain a stable weight, your treatments results should be permanent." },
      { q: "Are there any side effects or risks associated with Fat Dissolving?", a: "As with any cosmetic treatment, there can be side effects and risks associated with Fat Dissolving. Common side effects include swelling, bruising, redness, and discomfort at the injection site. In rare cases, more serious complications may occur, such as nerve injury that can cause an uneven smile or facial muscle weakness (when applied on under chin fat). It's essential to consult with a qualified practitioner to minimise risks and ensure proper treatment." },
      { q: "Who is a suitable candidate for Fat Dissolving treatment?", a: "Fat dissolving is ideal for individuals with minimal to moderate localizes fat who want to improve the appearance without surgery. It is not suitable for those with severe localized fat or individuals with loose, sagging skin in the treatment area. A thorough consultation with a qualified practitioner is necessary to determine if it's the right treatment for you." },
      { q: "What parts of the body you can treat with Fat Dissolving?", a: "Some of the areas we can treat with fat dissolving are: Double chin, Back fat, Arm fat (bingo wing area), stomach fat and six-pack definition, Flanks and waist, Inner and outer thighs, under the buttocks, fat above knees and other areas that have minimal to moderate localized fat." },
    ],
    recommended: {
      heading: "recommended with fat dissolving",
      cards: [
        { label: "dermal FILLERS", img: `${J}/rec-dermal.png`, href: "/dermal-fillers-malta" },
        { label: "thread lift", img: `${J}/rec-thread.png`, href: "/thread-lift-malta" },
        { label: "collagen stimulator", img: `${J}/rec-collagen.png`, href: "/collagen-stimulator-malta" },
      ],
    },
  },

  // ===================== 4-IN-1 HYDRAFACIAL GLOW =====================
  "4-in-1-hydrafacial-glow": {
    slug: "4-in-1-hydrafacial-glow",
    hero: {
      title: "4-in-1 hydrafacial glow",
      subtitle: "Clogged pores, dull skin, and products that just don't work? If your glow's gone quiet, you're not alone. This is for Maltese skin that's ready for real results.",
      includedTitle: "What's Included in the 4-in-1 Hydrafacial Glow Package:",
      included: [
        "Medical-Grade Hydrafacial (€100)",
        "LED Light Therapy (€50)",
        "Dermaplaining (€50)",
        "Carisma Spa Day (€50)",
        "In-Person Consultation (€60)",
        "€25 Aesthetics Credit (€25)",
      ],
      total: "Total Value: €335 – Today: €99 Only.",
      disclaimer: "Due to high demand, packages are offered based on availability and may not always be guaranteed. Please inquire for current options.",
      cta: "CLAIM MY SPOT NOW",
      poster: `${H}/hero-poster.jpg`,
      video: `${H}/hero-video.mp4`,
      posterRatio: "317 / 394",
    },
    testimonialsHeading: "THE SECRET TO VISIBLY MORE BEAUTIFUL SKIN –|OUR CUSTOMERS SHOW YOU HOW.",
    testimonialsHeadingTwoLine: true,
    testimonials: [
      { img: `${H}/testi-1.png`, quote: "I also had a HydraFacial with Natasha, and I honestly enjoyed every moment. Natasha created such a relaxing environment and made the experience even more enjoyable with her friendly and professional approach. My skin felt amazing afterwards!", name: "Morina G." },
      { img: `${H}/testi-2.png`, quote: "Not gonna lie, I didn't expect much from a facial. But the way they deep cleaned my skin... I was shook. I've struggled with clogged pores and tiny bumps on my cheeks that no scrub or cleanser could fix. The HydraFacial literally vacuumed everything out. No pain, no redness — just super clean, smooth skin. Never thought I'd be this excited about skincare", name: "Daniela A." },
      { img: `${H}/testi-3.png`, quote: "I was feeling dull, dehydrated, and like my skin just lost its spark. Between work and sun exposure, it got worse over summer. Tried this facial on a friend's recommendation and wow — my skin looked fresher instantly. The booster they used gave me a glow I hadn't seen in ages. And the staff were so gentle and kind. It felt like a reset, not just a treatment.", name: "Claire V." },
      { img: `${H}/testi-4.png`, quote: "I've spent way too much money on good products, but my skin wasn't absorbing anything. Turns out — I needed to clear the surface first. The HydraFacial and dermaplaning combo made a huge difference. Now everything I apply actually sinks in and feels effective. So glad I found this place in St Julian's — already telling all my friends.", name: "Rachel B." },
    ],
    emotional: {
      heading: "SO YOUR SKIN GLOWS AGAIN — EFFORTLESSLY.",
      paras: [
        "Do you ever look in the mirror and wonder where your glow went?",
        "Your skin feels dull, your pores seem clogged, and every product you try promises more than it delivers. You're not alone — healthy, radiant skin shouldn't feel out of reach.",
        "With our 4-in-1 Hydrafacial Glow treatment, your skin gets exactly what it needs: deep cleansing, gentle resurfacing, and lasting hydration — all designed for Maltese skin and real-world results.",
        "After just one session, you'll see (and feel) the difference: smoother texture, balanced tone, and that luminous glow you thought you'd lost. No filters, no downtime — just confidence that shines through.",
        "Your glow is your story. Let's help you tell it beautifully.",
      ],
      image: `${H}/glow.png`,
    },
    trusted: {
      heading: "MALTA'S TRUSTED CLINIC FOR RADIANT, HEALTHY SKIN",
      subtitle: "As seen in Times of Malta, Lovin Malta, Elle, Cosmopolitan",
      benefits: [
        { icon: `${H}/icon-1.png`, title: "Instant Glow", desc: "Experience a visibly brighter, smoother complexion right after your first session — no downtime required." },
        { icon: `${H}/icon-2.png`, title: "Deep Detox & Hydration", desc: "Our medical-grade Hydrafacial deeply cleanses pores while infusing skin with nourishing serums for long-lasting hydration." },
        { icon: `${H}/icon-3.png`, title: "Advanced Skin Renewal", desc: "Salmon DNA booster and LED therapy rejuvenate dull, tired skin — restoring elasticity and luminosity from within." },
        { icon: `${H}/icon-4.png`, title: "Safe & Medical-Grade Care", desc: "Performed by certified aesthetic specialists using clinically proven equipment and protocols for real, visible results." },
      ],
    },
    createdFor: {
      heading: "CREATED FOR WOMEN WHO WANT THEIR SKIN TO GLOW|— NATURALLY AND CONFIDENTLY.",
      reasons: [
        "Because you want skin that looks luminous, smooth, and deeply refreshed — even without makeup.",
        "Because you deserve a medical-grade facial that delivers visible results, not just promises.",
        "Because you prefer gentle, non-invasive treatments that respect your skin's balance and beauty.",
        "Because you value self-care and know that radiant skin reflects radiant confidence.",
        "Because you choose results backed by science — and trusted by Malta's leading aesthetics clinic.",
      ],
      image: `${H}/created.jpg`,
    },
    yearsDivider: "35+ YEARS HELPING MALTA GLOW WITH CONFIDENCE",
    commitment: {
      items: [
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
      cta: "Get My First Session for €99",
    },
    offer: {
      heading: "SECURE YOUR EXCLUSIVE HYDRAFACIAL GLOW OFFER TODAY",
      paras: [
        "Our special launch offer is available for a limited time only — once slots are filled, the regular price applies.",
        "Experience the ultimate 4-step facial that cleanses, exfoliates, and rejuvenates your skin from within.",
        "Now just €99 (regularly €335).",
        "In just one relaxing session, you'll see and feel the difference — smoother texture, tighter pores, and a radiant glow that restores your confidence and freshness.",
      ],
      image: `${H}/offer.jpg`,
      imageRatio: "489 / 552",
    },
    getBack: {
      heading: "GET YOUR GLOW BACK. BRIGHTER. FRESHER. YOU.",
      subtitle: "A fast, gentle treatment that deeply cleanses, hydrates, and renews tired skin — no needles, no downtime.",
      bullets: [
        "Only €99 instead of €335 — exclusive limited-time offer",
        "One Session Results — noticeable glow and smoothness instantly",
        "Medical-Grade Care — non-invasive, dermatologist-approved",
        "Malta's Luxury Aesthetics Clinic — trusted experts in skin rejuvenation",
      ],
      image: `${H}/getback.jpg`,
    },
    redefined: {
      heading: "YOUR GLOW — REDEFINED.",
      subtitle: "See how our 4-in-1 Hydrafacial Glow treatment cleanses, hydrates, and brightens for skin that looks smoother, fresher, and truly radiant.",
      bullets: [
        "Visible Radiance Boost – Enjoy smoother, brighter skin right after your first session.",
        "Deep Hydration – Replenishes moisture and balances your skin barrier for lasting softness.",
        "No Pain, No Downtime – Gentle, non-invasive, and safe for all skin types.",
        "Luxury Meets Science – Advanced technology performed by certified skin specialists.",
      ],
      image: `${H}/redefined.png`,
    },
    expect: {
      heading: "what to expect during your hydrafacial treatment?",
      cols: [
        { label: "before", img: `${H}/wte-before.png`, points: [
          "Before your treatment, prepare your skin by avoiding any harsh exfoliants or treatments for a few days.",
          "Drink plenty of water leading up to your treatment for optimal skin hydration.",
          "Use a mild cleanser to remove makeup and impurities before your facial.",
        ] },
        { label: "at session", img: `${H}/wte-session.png`, points: [
          "The med-aesthetician will start with a gentle yet thorough cleansing to remove impurities and prepare your skin for hydration.",
          "Experience a personalized blend of hydrating serums and masks, expertly applied to infuse moisture deep into your skin's layers.",
          "Indulge in a soothing facial massage that enhances circulation and maximizes product absorption, leaving you feeling pampered and rejuvenated.",
        ] },
        { label: "after", img: `${H}/wte-after.png`, points: [
          "Refrain from using harsh skincare products immediately after your facial to allow your skin to continue benefiting from the treatment.",
          "Apply sunscreen daily to protect your newly rejuvenated skin and preserve its health and radiance.",
          "Keep your skin hydrated by drinking water regularly to prolong the effects of your treatment.",
        ] },
      ],
    },
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
    recommended: {
      heading: "recommended with hydrafacial",
      cards: [
        { label: "dermal FILLERS", img: `${H}/rec-1.png`, href: "/dermal-fillers-malta" },
        { label: "MICRONEEDLING", img: `${H}/rec-2.png`, href: "/microneedling-malta" },
        { label: "CHEMICAL PEELS", img: `${H}/rec-3.png`, href: "/chemical-peels-malta" },
      ],
    },
  },

  // ===================== EXOSOME GLOW LIFT =====================
  "exosome-glowlift": {
    slug: "exosome-glowlift",
    hero: {
      title: "EXOSOME GLOW LIFT",
      subtitle: "When facials stop working and your glow fades, Exosomes offer the next step — real regeneration for smoother, firmer, brighter skin.",
      includedTitle: "What's Included in the Exosome Glow Lift Package:",
      included: [
        "Microneedling with Exosomes (€200)",
        "LED Light Therapy (€50)",
        "Glass Skin Face Mask (€30)",
        "In-person Skin Consultation (€60)",
        "€25 Aesthetics Credit (€25)",
      ],
      total: "Total Value: €365 – Today: €175 Only.",
      note: "Limited to just 15 clients.",
      cta: "CLAIM MY SPOT NOW",
      poster: `${E}/hero-poster.jpg`,
      video: `${E}/hero-video.mp4`,
      posterRatio: "317 / 394",
    },
    testimonialsHeading: "what our clients have to say about their results",
    testimonials: [
      { img: `${E}/testi-1.png`, quote: "My skin looked tired and textured for months. Leticia explained everything so calmly and made the whole treatment feel easy. After the Exosome Glow Lift, my skin finally feels smooth again and my glow is back.", name: "Nicole C." },
      { img: `${E}/testi-2.png`, quote: "I started noticing my skin wasn't as firm or bright, especially around the cheeks. Dr. Fran was amazing, she really listened and customised the treatment for me. One session and I already look tighter and fresher.", name: "Claire M." },
      { img: `${E}/testi-3.png`, quote: "My skin was feeling thinner and dull lately. Dr. Gio treated me with such care and explained exactly what exosomes do. My skin looks more rested and feels stronger already.", name: "Marica G." },
      { img: `${E}/testi-4.png`, quote: "Didn't expect much honestly, but Dr. Gio made the whole process feel very professional and comfortable. My skin looks healthier and smoother even colleagues noticed.", name: "Daniel B." },
    ],
    expect: {
      heading: "what to expect during your MICRONEEDLING treatment?",
      cols: [
        { label: "before", img: `${E}/wte-before.png`, points: [
          "Avoid using any topical skin products containing retinol, aha or any other acid at least 24 hours prior to the procedure.",
          "Discuss any medical conditions, allergies, and medications with your provider.",
          "Share your concerns and objectives with our expert practitioners and answer any questions.",
        ] },
        { label: "at session", img: `${E}/wte-session.png`, points: [
          "Our expert practitioner will use a handheld device with tiny needles, microneedling the skin.",
          "This stimulates the body's natural healing process and promotes collagen production.",
          "Communicate any discomfort or concerns to the practitioner during the procedure.",
        ] },
        { label: "after", img: `${E}/wte-after.png`, points: [
          "Avoid using any topical skin products containing retinol, aha or any other acid at least 24 hours after the procedure.",
          "Refrain from exercise, alcohol, and saunas for at least 24 hours.",
          "Results are gradual and may require several sessions for optimal results.",
        ] },
      ],
    },
    faq: [
      { q: "What is microneedling, and how does it work?", a: "Microneedling, also known as collagen induction therapy, uses fine sterile needles to create controlled micro-channels in the skin. These micro-injuries trigger your body's natural healing response, stimulating the production of new collagen and elastin. At Carisma in Malta, we combine every microneedling session with personalised mesotherapy cocktails, vitamins, hyaluronic acid, and growth factors delivered directly into the skin through the micro-channels for enhanced results. The treatment improves skin texture, reduces scarring, minimises pores, and restores a healthy, natural glow." },
      { q: "How much does microneedling cost in Malta?", a: "Microneedling at Carisma starts from €149 for a single session, which includes a personalised mesotherapy cocktail selected by your doctor. A course of 3 sessions is €359 (€120 per session), and 5 sessions is €599 (€119 per session). Exosomes can be added to any session for an additional €50. Book a free consultation at our St. Julian's clinic for a personalised recommendation based on your skin concerns and goals." },
      { q: "Is microneedling painful?", a: "Most patients describe microneedling as a mild tingling or light prickling sensation. Before treatment, we apply anaesthetic cream to numb the skin, which significantly reduces any discomfort. Pain levels are typically rated 3-4 out of 10. At Carisma, our doctors adjust the needle depth throughout the treatment based on the area being treated and your comfort level. It is one of the reasons patients rate us as one of the best clinics for microneedling in Malta, comfort and care are always a priority." },
      { q: "How many microneedling sessions do I need?", a: "Most patients achieve optimal results with a course of 3-5 sessions, spaced 4-6 weeks apart. The number of sessions depends on your specific concern, mild skin texture improvement may require 3 sessions, while deeper acne scars or significant skin rejuvenation goals may benefit from 5 or more. Your doctor will recommend the ideal number during your free consultation. Results are cumulative, meaning each session builds on the last." },
      { q: "What is the difference between microneedling and mesotherapy?", a: "Microneedling creates micro-channels in the skin to stimulate collagen production through the body's natural healing response. Mesotherapy involves injecting a customised blend of vitamins, hyaluronic acid, amino acids, and growth factors into the skin for targeted nourishment. At Carisma, we combine both treatments in every session, the microneedling creates the channels and stimulates collagen, while the mesotherapy cocktail delivers deep nourishment simultaneously. This combination is more effective than either treatment alone because the active ingredients penetrate far deeper through the micro-channels." },
      { q: "What is the recovery time for microneedling?", a: "Expect mild redness for 24-48 hours after treatment, similar to a light sunburn. Most patients return to their normal routine within 2-3 days. You should avoid makeup for at least 12 hours, strenuous exercise and alcohol for 24 hours, and active skincare ingredients like retinol and acids for 24-48 hours. Your doctor at Carisma will provide detailed aftercare instructions specific to your treatment. The downtime is minimal compared to more invasive skin resurfacing procedures." },
      { q: "Can microneedling help with acne scars?", a: "Yes. Microneedling is one of the most effective non-surgical treatments for acne scarring. The collagen stimulation triggered by microneedling gradually fills and smooths indented scars from within. When combined with mesotherapy cocktails containing growth factors and vitamins, the results are enhanced further. Most patients with acne scars see significant improvement over a course of 3-5 sessions. At our Malta clinic, our doctors assess the depth and type of scarring during your consultation and design a treatment plan specific to your needs." },
      { q: "What are exosomes and should I add them to my microneedling treatment?", a: "Exosomes are tiny cellular messengers derived from stem cells that play a key role in cell communication and tissue repair. When applied during microneedling, exosomes accelerate your skin's healing response, boost collagen production, and enhance overall skin regeneration at the cellular level. The exosomes add-on costs €50 per session and is recommended for patients seeking premium results, particularly for ageing skin, deeper scarring, or those who want to maximise the benefits of each treatment session. Your doctor will advise whether exosomes are right for your skin goals." },
      { q: "Who is not suitable for microneedling?", a: "Microneedling is not recommended for patients with active acne or skin infections in the treatment area, pregnant or breastfeeding women, those currently taking blood-thinning medications, or patients with active skin conditions such as eczema or psoriasis on the treatment area. If you have had a chemical peel or laser treatment recently, you should wait before booking microneedling. During your free consultation at our Malta clinic, your doctor will review your full medical history to ensure microneedling is safe and appropriate for you." },
      { q: "How long do microneedling results last?", a: "Microneedling results are cumulative and long-lasting because the treatment stimulates your body's own collagen production. After a full course of 3-5 sessions, patients typically enjoy improved skin texture, reduced scarring, and a healthier complexion for several months. However, collagen production naturally declines with age, so maintenance sessions every 3-6 months are recommended to sustain and build upon your results. Your doctor will recommend an ongoing maintenance plan tailored to your skin during your follow-up appointments." },
    ],
    recommended: {
      heading: "recommended with MICRONEEDLING",
      cards: [
        { label: "PRP", img: `${E}/rec-1.png`, href: "/prp-malta" },
        { label: "CHEMICAL PEELS", img: `${E}/rec-2.png`, href: "/chemical-peels-malta" },
      ],
    },
  },

  // ===================== ULTIMATE FACELIFT =====================
  "ultimate-facelift": {
    slug: "ultimate-facelift",
    hero: {
      title: "ultimate facelift",
      lead: "Reverse visible aging — no knife, no downtime.",
      subtitle: "If your skin's lost its lift, your cheeks feel flatter than before, or your jawline's lost its shape, this is your sign to rewind time — naturally.",
      bodyParas: ["Our Ultimate Facelift Package is designed to lift, tighten, and sculpt — without surgery, fillers, or long recovery days."],
      includedTitle: "What's Included in the Ultimate Facelift Package:",
      included: [
        "2x Threads (€300)",
        "Hyaluronic acid serum (€20)",
        "In-person Consultation (€60)",
        "€25 Aesthetics Credit for you",
        "€25 Aesthetics Credit for your friend",
      ],
      total: "Total Value: €430 – Today: €239 Only.",
      footnotes: [
        "*any additional threads used will be charged at €120 each;",
        "** Suitability for this procedure is strictly subject to Dr approval",
      ],
      disclaimer: "Due to high demand, packages are offered based on availability and may not always be guaranteed. Please inquire for current options.",
      cta: "CLAIM MY SPOT NOW",
      poster: `${F}/hero-poster.jpg`,
      video: `${F}/hero-video.mp4`,
      posterRatio: "317 / 476",
    },
    testimonialsHeading: "THE SECRET TO VISIBLY MORE BEAUTIFUL SKIN –|OUR CUSTOMERS SHOW YOU HOW.",
    testimonialsHeadingTwoLine: true,
    testimonials: [
      { img: `${F}/testi-1.png`, quote: "I always worried a brow lift would give me that “surprised” look. But Dr. Giovanni explained everything and reassured me it would be tailored to my face. The result? A soft lift, nothing exaggerated. I still look like me, just more fresh and awake. Love it.", name: "Marika c." },
      { img: `${F}/testi-2.png`, quote: "I worked so hard to lose the weight but no one tells you what happens to your face after. My body looked great, but my cheeks started to sag, and I looked tired all the time, even when I wasn't. Dr. Giovanni did a non-surgical thread lift, and honestly, the difference was instant. My face looked lifted, my jawline was sharper, and the best part, It still looks like me.", name: "Shanel D." },
      { img: `${F}/testi-3.png`, quote: "The sagging around my lower face really bothered me, especially in photos. I didn't want surgery or downtime. Dr. Giovanni suggested a thread lift and explained it so clearly. It was quick, almost painless, and the lift is visible — but not obvious. I feel refreshed, not fake.", name: "Loranne s." },
      { img: `${F}/testi-4.jpg`, quote: "After 40, I felt like everything started to drop cheeks, jawline, everything. I didn't want filler or anything dramatic, just something to bring my face up again. Dr. Giovanni recommended the thread lift and I'm so glad I trusted him. It's subtle, but the lift is real. I feel like myself again.", name: "Antonia v." },
    ],
    emotional: {
      heading: "SO YOUR REFLECTION GLOWS BACK — JUST LIKE YOU.",
      paras: [
        "Do you ever look in the mirror and wish your face looked as lifted and fresh as it used to?",
        "Over time, our skin naturally loses its firmness — cheeks soften, contours fade, and lines begin to tell stories we're not ready to share.",
        "With our Ultimate Facelift Package, you can lift, tighten, and sculpt your features — naturally, without surgery, fillers, or downtime.",
        "After just one session, you'll notice the difference — and even more, you'll feel it. Because when your face feels refreshed and defined, your confidence shines through everything you do.",
        "Your face tells your story. Let's make it radiant.",
      ],
      image: `${F}/reflection.png`,
    },
    trusted: {
      heading: "MALTA'S TRUSTED CLINIC FOR NON-SURGICAL|FACELIFT TREATMENTS",
      headingTwoLine: true,
      subtitle: "As featured in Times of Malta, Lovin Malta, Elle, and Cosmopolitan",
      benefits: [
        { icon: `${F}/icon-1.png`, title: "Instant Lift", desc: "Experience a visibly tighter, more lifted look right after your first session — no surgery, no scars." },
        { icon: `${F}/icon-2.png`, title: "Deep Hydration Boost", desc: "Our Hyaluronic infusion restores plumpness and glow, leaving your skin smooth and radiant." },
        { icon: `${F}/icon-3.png`, title: "Advanced Thread Technology", desc: "Medical-grade threads gently lift sagging skin while stimulating natural collagen for long-term results." },
        { icon: `${F}/icon-4.png`, title: "Safe & Clinically Certified", desc: "Performed by certified medical professionals using EU-approved, clinically proven products." },
      ],
    },
    yearsDivider: "35+ YEARS OF EXPERTISE. PROVEN, TIMELESS RESULTS.",
    commitment: {
      items: [
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
    },
    offer: {
      heading: "SECURE YOUR EXCLUSIVE FACELIFT REJUVENATION OFFER NOW",
      paras: [
        "Our special launch offer is available for a short time only — once spots are filled, regular pricing applies.",
        "Rediscover your confidence with our Ultimate Facelift Package, a non-surgical treatment designed to lift, tighten, and smooth — giving your skin that refreshed, youthful glow.",
        "Normally valued at €430, it's yours today for just €239.",
        "In under an hour, you'll notice a visible lift and renewed firmness — no knives, no fillers, no downtime — just beautifully natural results.",
      ],
      image: `${F}/offer.png`,
      imageRatio: "489 / 548",
    },
    getBack: {
      heading: "GET YOUR LIFT BACK. FIRMER. SMOOTHER. YOU.",
      subtitle: "A gentle, medical-grade treatment designed to lift, tighten, and sculpt — restoring youthful definition without surgery or downtime.",
      bullets: [
        "Only €239 instead of €430 — limited-time offer",
        "60-Minute Treatment — visible lift and firmness after your first session",
        "Clinically Proven & Safe — non-surgical, precision thread-lift technology",
        "Malta's Trusted Aesthetics Clinic — professional care in a luxury environment",
      ],
      image: `${F}/getback.jpg`,
    },
    redefined: {
      heading: "YOUR FACELIFT — REDEFINED.",
      subtitle: "See how our Ultimate Facelift Package gently lifts, tightens, and sculpts for visibly younger, naturally radiant skin.",
      bullets: [
        "Visible Lift & Contour – Enjoy a firmer, more lifted appearance after your first session.",
        "Refreshed, Smooth Skin – Restores elasticity and reduces fine lines for a youthful glow.",
        "No Surgery, No Downtime – A gentle, effective treatment performed with precision care.",
        "Luxury Meets Science – Advanced thread technology delivered by certified aesthetic specialists.",
      ],
      image: `${F}/redefined.png`,
    },
    expect: {
      heading: "what to expect during your thread lift treatment?",
      cols: [
        { label: "before", img: `${F}/wte-before.png`, points: [
          "Share your concerns and objectives with our expert practitioners and answer any questions.",
          "Discuss any medical conditions, allergies, and medications with your provider.",
          "Avoid alcohol, blood thinners, and aspirin for 24 hours prior to the procedure.",
        ] },
        { label: "at session", img: `${F}/wte-session.png`, points: [
          "Our expert practitioner will insert thin threads into the targeted areas using a fine needle.",
          "Follow the practitioner's instructions for facial expressions and movements during the procedure.",
          "Communicate any discomfort or concerns to the practitioner during the procedure.",
        ] },
        { label: "after", img: `${F}/wte-after.png`, points: [
          "Avoid rubbing or massaging the injection areas for at least 24 hours.",
          "Refrain from exercise, alcohol, and saunas for at least 24 hours.",
          "Results are immediate and can last up to 3-5 years.",
        ] },
      ],
    },
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
    recommended: {
      heading: "recommended with thread lifts",
      cards: [
        { label: "dermal FILLERS", img: `${F}/rec-1.png`, href: "/dermal-fillers-malta" },
        { label: "botox", img: `${F}/rec-2.png`, href: "/wrinkle-relaxing-malta" },
        { label: "collagen stimulator", img: `${F}/rec-3.png`, href: "/collagen-stimulator-malta" },
      ],
    },
  },
};

export const PACKAGE_SLUGS = Object.keys(PACKAGES);
