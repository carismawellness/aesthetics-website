import type { ProtocolData } from "@/lib/protocols";

const A = "/assets/treatments";
const PRESS = ["/assets/press/malta-daily.png", "/assets/press/bay.jpeg", "/assets/press/lovin-malta.jpeg", "/assets/press/times-of-malta.png", "/assets/press/malta-today.jpg"];

const PACKAGE = [
  { label: "4x Anti Cellulite sessions with the VelaShape", price: "€400" },
  { label: "4x access to spa & fitness facilities", price: "€140" },
  { label: "Tanita Body Composition Analysis", price: "€60" },
  { label: "€25 Carisma Aesthetics credit", price: "€25" },
  { label: "Complimentary Parking Validation", price: "" },
];

export const antiCellulite: ProtocolData = {
  slug: "anti-cellulite",
  hero: {
    kicker: "ADVANCED CELLULITE SMOOTHING",
    title: "cellulift & contour protocol",
    tagline: "",
    intro: "Our cellulite protocol combines three VelaShape vacuum roller sessions with one lymphatic drainage massage to elminate cellulite, uneven texture, and boost circulation:",
    items: PACKAGE,
    totalValue: "TOTAL VALUE: €625",
    today: "TODAY: €199 ONLY",
    individualNote: "€100 for individual sessions",
    cta: "claim your spot now",
    finePrint: [
      "* Includes four sessions to be followed over the course of 2-4 weeks",
      "** Additional sessions of Velashape III may be booked at €100 per session",
      "*** Due to high demand, packages are offered based on availability and may not always be guaranteed. Please inquire for current options.",
    ],
    video: `${A}/vid-anti-cellulite.mp4`,
  },
  secret: {
    heading: "The secret to a more defined, confident look",
    sub: "smooth stubborn cellulite and uneven texture with precision",
    image: `${A}/ac-secret.png`,
    paragraphs: [
      "You eat well, stay active, and take care of yourself, yet cellulite on your thighs, bum or hips still shows through. No matter how fit you feel, the uneven, dimpled texture can make certain outfits uncomfortable and affect your confidence. The scale may move, but the look of your skin doesn’t.",
      "If this sounds familiar, it’s not a lack of effort. Cellulite is largely caused by circulation, fluid retention, and connective tissue structure, not weight alone. CelluLift combines targeted VelaShape vacuum roller treatments with lymphatic drainage massage to help smooth texture, improve circulation, and leave skin looking more even and contoured.",
    ],
    bullets: [
      "You exercise regularly, but the bumpy texture never fully smooths out",
      "Cellulite is most noticeable in shorts, dresses or swimwear",
      "Your skin feels uneven or less firm in specific areas",
      "You’re tired of being told cellulite will “just go away” on its own",
    ],
    cta: "Claim My Spot Now",
  },
  trusted: {
    heading: "Malta’s trusted clinic for",
    headingSub: "Non surgical fat reduction",
    pressLogos: PRESS,
    features: [
      { icon: `${A}/ac-feat1.png`, label: "TARGETED CELLULITE CONTOURING", desc: "Focus on areas most affected by cellulite, thighs, bum and hips, using targeted VelaShape vacuum roller treatments to improve texture and contour." },
      { icon: `${A}/ac-feat2.png`, label: "MULTI-ACTION SMOOTHING APPROACH", desc: "CelluLift combines VelaShape vacuum roller sessions with lymphatic drainage massage to improve circulation, reduce fluid retention, and smooth the appearance of cellulite." },
      { icon: `${A}/ac-feat3.png`, label: "Expert DESIGNED PLAN", desc: "Your in-person consultation determines the right areas to treat, how sessions are scheduled, and what realistic tightening results you can expect." },
      { icon: `${A}/ac-feat4.png`, label: "SAFE AND CLINICALLY CERTIFIED", desc: "All treatments are performed by trained medical professionals using EU-approved, clinically tested technology with no surgery and no downtime." },
    ],
  },
  eligibility: {
    kicker: "eligibility criteria",
    heading: "Selective by intention successful by design",
    image: `${A}/ac-eligibility.png`,
    areasIntro: "Treat visible fat bulges in 3 areas of the body",
    areas: ["arms", "BUTTOCKS AND UNDER-BUTT CREASE", "THIGHS (FRONT, BACK, INNER AND OUTER)"],
  },
  modality: {
    kicker: "our technology",
    heading: "Internationally renowned, FDA-approved modalities",
    name: "VelaShape III (CelluLift protocol)",
    tag: "Cellulite smoothing  & skin tightening",
    tagSub: "Smooths the appearance of cellulite, improves skin texture and refines contour in one comfortable treatment.",
    baImage: `${A}/ac-ba.png`,
    sideImage: `${A}/ac-side.png`,
    intro: "CelluLift uses VelaShape III vacuum roller technology to target the structural causes of visible cellulite. Each session combines radiofrequency, infrared heat, vacuum suction and mechanical rollers to soften fibrous tissue, boost circulation and support lymphatic flow. This multi-action approach helps smooth uneven texture and improve the overall look and feel of the skin. Over the weeks following treatment, skin can appear more even, firmer and refined, particularly in areas prone to cellulite such as the thighs, hips and bum.",
    bullets: [
      "Clinically proven approach: VelaShape technology has been shown in studies to improve the appearance of cellulite and uneven skin texture.",
      "Visible smoothing: Vacuum and mechanical massage encourage blood flow and lymphatic drainage for a lighter, smoother feel.",
      "Circulation support: Results typically start to show from 4–12 weeks after the final session as muscle adapts and fat reduces.",
      "Non invasive: No needles, no surgery and no downtime for most people.",
      "Comfortable sessions: Feels like a warm, deep mechanical massage, with each treatment lasting around 30 minutes.",
    ],
  },
  difference1: {
    kicker: "the carisma difference",
    heading: "We are not another diet clinic.",
    intro: "We’re a doctor led transformation program that blends medical insight, sustainable nutrition, and modern body tech into one high touch system, so you don’t just lose weight, you step into your strongest form.",
    bullets: [
      "Doctor led: full medical check and body scan",
      "One integrated program: medical, diet, movement and treatments together",
      "Real gym included: Technogym facility, semi-private classes and PT",
      "High touch support: weekly check ins, progress reports and WhatsApp follow up",
      "Evidence based devices: Emsculpt NEO, coolsculpting and RF skin tightening",
      "Selective entry and measurable weight loss results guaranteed",
    ],
  },
  starterPack: {
    heading: "Malta’s most advanced cellulite smoothing & contouring protocol",
    cols: [
      { title: "Targeted CELLULITE CONTOURING", desc: "Adjustable Intensity for Comfort & Results" },
      { title: "VISIBLE, NOTICEABLE SMOOTHING", desc: "Improvements you can see and feel. Skin appears smoother, more even, and more refined in clothes and movement, not just immediately after treatment, but progressively over sessions." },
      { title: "High-Value starter Access", desc: "A complete cellulite smoothing protocol at a reduced introductory price, ideal for trying CelluLift without long-term commitment." },
    ],
    items: PACKAGE,
    totalValue: "Total Value: €625.",
    today: "Today: €199 Only",
    finePrint: [
      "* Includes four sessions to be followed over the course of 2 weeks",
      "** Additional sessions of Velashape III may be booked at €100 per session",
      "*** Due to high demand, packages are offered based on availability and may not always be guaranteed. Please inquire for current options.",
    ],
    cta: "claim your spot now",
  },
  difference2: {
    kicker: "the carisma difference",
    heading: "Malta’s #1 leading wellness chain",
    commitmentTitle: "our commitment",
    commitment: [
      "Visible inch loss and shape change, not vague promises",
      "Plans that work with your age, hormones and metabolism",
      "No crash diets, no banned foods, no endless hours of cardio",
      "Medical grade technology and treatments delivered by trained professionals",
    ],
    whyTitle: "WHY MALTA CHOOSES Carisma",
    why: [
      "Created by the team behind Malta’s leading spa and medical aesthetics centres",
      "Doctor led medical slimming, not a beauty salon “diet program”",
      "All in one approach: assessment, nutrition, movement and treatments",
      "High touch support with weekly check ins and WhatsApp coaching",
    ],
    cta: "Claim your spot now",
    parking: "Complimentary on-site parking",
  },
  faq: [
    { q: "1. What is included in the CelluLift protocol?", a: "The protocol includes three VelaShape vacuum roller sessions combined with one lymphatic drainage massage, designed to smooth cellulite, improve circulation, and refine skin texture." },
    { q: "2. Who is this treatment best suited for?", a: "CelluLift is ideal for people who are close to their goal weight but have visible cellulite on areas such as the thighs, bum, or hips that hasn’t improved with diet or exercise." },
    { q: "3. Does CelluLift help with weight loss?", a: "No. CelluLift is not a weight-loss treatment. It focuses on cellulite smoothing, skin texture improvement, and contour refinement, not reducing overall body weight." },
    { q: "4. How does CelluLift improve the appearance of cellulite?", a: "It works by improving circulation, mobilising stiff tissue, supporting lymphatic flow, and softening the fibrous structures that create the dimpled look of cellulite." },
    { q: "5. Does the treatment hurt?", a: "The treatment feels like a deep mechanical massage. Some areas may feel intense, especially where cellulite is denser, but sessions are generally well tolerated and adjusted for comfort." },
    { q: "6. Is there any downtime after treatment?", a: "No downtime is required. You can return to normal activities immediately after each session." },
    { q: "7. When will I start seeing results?", a: "Many clients notice smoother skin and improved texture after a few sessions. Results develop progressively over the course of the protocol and may continue improving afterwards." },
    { q: "8. Are the results permanent?", a: "Cellulite can return over time due to genetics, hormones, and lifestyle factors. Results can be long-lasting with maintenance sessions and healthy habits, but no treatment permanently eliminates cellulite." },
    { q: "9. Is CelluLift safe?", a: "Yes. CelluLift uses non-invasive, clinically proven technologies with a strong safety record when performed by trained professionals. A consultation is completed before treatment." },
    { q: "10. Can CelluLift be combined with other treatments?", a: "Yes. CelluLift is often combined with skin tightening or body contouring treatments to enhance overall results. Your practitioner will advise what combinations are suitable." },
  ],
  research: {
    heading: "CLINICAL RESEARCH: BASIS OF OUR METODOLOGY",
    sub: "Evidence based approach",
    cards: [
      {
        image: `${A}/ac-research1.png`,
        title: "mechanical massage & vacuum therapy for cellulite",
        whatItDoes: "Mechanical massage combined with vacuum suction mobilises fibrous septae, improves blood flow, and reduces tissue stiffness associated with the dimpled appearance of cellulite.",
        keyResults: [
          "A clinical study published in Lasers in Surgery and Medicine found that vacuum-assisted massage significantly improved skin smoothness and reduced the appearance of cellulite after a short treatment course, with visible texture improvements reported by both clinicians and patients. Lasers in Surgery and Medicine",
          "A review of mechanical massage therapies concluded that repeated sessions improved tissue pliability and surface smoothness, particularly in the thighs and buttocks. PMC+1",
          "Texture smoothing Tissue mobilisation Progressive results",
        ],
        evidence: "Moderate evidence",
      },
      {
        image: `${A}/ac-research2.png`,
        title: "velashape technology for cellulite appearance",
        whatItDoes: "VelaShape combines radiofrequency, infrared heat, vacuum suction, and mechanical rollers to heat tissue, stimulate circulation, and improve skin texture associated with cellulite.",
        keyResults: [
          "Clinical trials reported in the Journal of Cosmetic and Laser Therapy showed measurable reductions in cellulite severity scores and improvements in skin smoothness after a course of VelaShape treatments.Journal of Cosmetic and Laser Therapy",
          "Patients demonstrated visible improvement in cellulite appearance without changes in overall body weight, confirming a contouring and texture effect rather than fat loss.PMC+1",
          "Multi-modal treatment Cellulite smoothing Best for mild–moderate cellulite",
        ],
        evidence: "Moderate evidence",
      },
      {
        image: `${A}/ac-research3.png`,
        title: "lymphatic drainage massage & circulation support",
        whatItDoes: "These technologies reshape specific areas that do not change much with diet or gym, such as lower belly, flanks or double chin, while overall weight often stays similar.",
        keyResults: [
          "In abdominal cryolipolysis follow up, fat thickness fell by almost half and circumferences dropped by about 1 cm while body weight, total fat mass and lean mass stayed stable, confirming a local contour effect rather than general slimming. PMC+1",
          "Clinical notes on submental fat reduction with deoxycholic acid highlight that this type of fat often persists even in people who are not overweight and can be resistant to standard weight reduction measures, which is exactly the scenario this package targets. Health Research Authority",
          "Best for people already working on lifestyle Used to smooth specific problem spots that remain after diet and exercise Not a substitute for full weight loss programs",
        ],
        evidence: "Moderate evidence",
      },
      {
        image: `${A}/ac-research4.png`,
        title: "safety and tolerability of non-invasive cellulite treatments",
        whatItDoes: "What it does: Vacuum massage, RF, and lymphatic techniques are widely used non-invasive approaches for cellulite smoothing with a strong safety profile when delivered correctly.",
        keyResults: [
          "Large clinical reviews report that side effects are generally mild and temporary, such as redness or tenderness, with no serious adverse events reported when protocols are followed.DA-cleared device data / PMC",
          "Long-term studies confirm that these treatments do not damage deeper tissues and are suitable for repeated use.JAMA Dermatology",
          "Clinically proven Non-surgical Well tolerated",
        ],
        evidence: "Moderate evidence",
      },
    ],
    cta: "CLAIM MY SPOT NOW",
  },
};
