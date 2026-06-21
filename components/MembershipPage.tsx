import Link from "next/link";
import Reveal from "@/components/Reveal";
import FaqAccordion, { type Faq } from "@/components/FaqAccordion";

const A = "/assets/treatments";
// WCAG AA: darkened from #6391ab (3.4:1) to teal-deep #3f6363 (6.61:1 on white) for text + UI strokes
const BLUE = "#3f6363";
// WCAG AA: text gold darkened from --gold-deep #9c8344 (3.66:1) to --gold #706552 (5.72:1 on white)
const GOLD = "var(--gold)";
// SAGE retained for decorative gem SVG fills only; text-on-SAGE surfaces use SAGE_SOLID below
const SAGE = "#96b2b2";
// WCAG AA: solid teal for surfaces carrying white text (white on #527979 = 4.81:1)
const SAGE_SOLID = "#527979";

/* ─── helpers ─────────────────────────────────────────────────── */

function Serif({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <h2 className="font-serif text-center" style={{ fontSize: "clamp(22px,3vw,32px)", color: GOLD, letterSpacing: "0.08em", fontWeight: 400, lineHeight: 1.3, ...style }}>
      {children}
    </h2>
  );
}

function Rule() {
  return <div className="mx-auto" style={{ width: "70px", height: "1px", background: BLUE, opacity: 0.5, margin: "14px auto 0" }} />;
}

function Cta({ label, href = "/sign-up" }: { label: string; href?: string }) {
  return (
    <div className="flex items-center justify-center">
      <Link
        href={href}
        style={{ display: "inline-flex", alignItems: "center", border: `1.5px solid ${BLUE}`, color: BLUE, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", padding: "16px 36px", borderRadius: "4px 0 0 4px", borderRight: "none", background: "transparent", whiteSpace: "nowrap" }}
      >
        {label}
      </Link>
      <Link
        href={href}
        aria-label="Begin your journey"
        style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "50px", height: "50px", background: BLUE, borderRadius: "50%", flexShrink: 0, marginLeft: "12px" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
      </Link>
    </div>
  );
}

function Stars() {
  // WCAG 1.4.11 + 1.4.1: star fill darkened from #F4C542 (1.63:1) to gold-deep #9c8344 (3.66:1 on white)
  // role="img" + aria-label gives a non-color/non-graphic-only cue for the rating value
  return (
    <div className="flex" role="img" aria-label="Rated 5 out of 5 stars" style={{ gap: "3px", justifyContent: "center", margin: "12px 0" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#9c8344" aria-hidden>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
        </svg>
      ))}
    </div>
  );
}

/* ─── data ────────────────────────────────────────────────────── */

const STEPS = [
  {
    n: "1", word: "contribute",
    sub: "Select your monthly contribution amount",
    desc: "Choose an amount you would like to deposit each month into your Glow balance.",
    eg: "If you choose to subscribe at €40, you will automatically be investing this amount each month.",
    icon: "mem-icon-contribute.png",
  },
  {
    n: "2", word: "save",
    sub: "Grow your balance",
    desc: "Let your balance grow with your monthly contributions as you save up to spend on any of our services and products.",
    eg: "Your Glow balance will grow over time, accumulating €240 in 6 months if you deposit €40 each month.",
    icon: "mem-icon-save.png",
  },
  {
    n: "3", word: "spend",
    sub: "enjoy exclusive member discounts",
    desc: "Enjoy your member exclusive 10% discount on all services and 15% on all products as you spend your Glow credit.",
    eg: "Purchase your mid-yearly botox session at a 10% discount without having to pay the full amount at once.",
    icon: "mem-icon-spend.png",
  },
];

const STATUS = [
  {
    name: "signature STATUS",
    reward: "Carisma Spa Day for two",
    spend: "with €1,000+ lifetime spend",
    gemFill: "#C0C0C0",
    gem: (
      <svg width="54" height="54" viewBox="0 0 54 54" aria-hidden>
        <polygon points="27,6 48,20 48,34 27,48 6,34 6,20" fill="#C0C0C0" opacity="0.9" />
        <polygon points="27,6 48,20 27,28" fill="#d8d8d8" />
        <polygon points="27,6 6,20 27,28" fill="#a8a8a8" />
        <polygon points="27,48 48,34 27,28" fill="#b0b0b0" />
        <polygon points="27,48 6,34 27,28" fill="#c8c8c8" />
      </svg>
    ),
  },
  {
    name: "elite STATUS",
    reward: "Signature Massage",
    spend: "with €2,500+ lifetime spend",
    gemFill: "#D4AF37",
    gem: (
      <svg width="54" height="54" viewBox="0 0 54 54" aria-hidden>
        <polygon points="27,6 48,20 48,34 27,48 6,34 6,20" fill="#D4AF37" opacity="0.9" />
        <polygon points="27,6 48,20 27,28" fill="#e8ca60" />
        <polygon points="27,6 6,20 27,28" fill="#b8921c" />
        <polygon points="27,48 48,34 27,28" fill="#c9a230" />
        <polygon points="27,48 6,34 27,28" fill="#dcc050" />
      </svg>
    ),
  },
  {
    name: "platinum STATUS",
    reward: "€300 Aesthetics Voucher",
    spend: "with €5,000+ lifetime spend",
    gemFill: SAGE,
    gem: (
      <svg width="54" height="54" viewBox="0 0 54 54" aria-hidden>
        <polygon points="27,6 48,20 48,34 27,48 6,34 6,20" fill={SAGE} opacity="0.9" />
        <polygon points="27,6 48,20 27,28" fill="#b2cccc" />
        <polygon points="27,6 6,20 27,28" fill="#7da0a0" />
        <polygon points="27,48 48,34 27,28" fill="#88b0b0" />
        <polygon points="27,48 6,34 27,28" fill="#a0c4c4" />
      </svg>
    ),
  },
];

const SAVINGS = [
  { spend: "€1,000", save: "€100" },
  { spend: "€2,500", save: "€250" },
  { spend: "€5,000", save: "€500" },
];

const BENEFITS = [
  { big: "10%* OFF", label: "aesthetics & Spa services", note: "*individual treatments are discounted by 8–12%" },
  { big: "15% OFF", label: "skin care products" },
  { big: "#1 PRIORITY", label: "booking & scheduling" },
  { big: "1× YEAR", label: "complimentary consultation" },
  { big: "EXCLUSIVE", label: "events & open days" },
  { big: "1× SPA DAY", label: "for every member you refer" },
];

const TREATMENTS = [
  { img: "mem-botox.png", label: "botox", href: "/botox-malta" },
  { img: "mem-microneedling.png", label: "microneedling", href: "/microneedling-malta" },
  { img: "mem-dermal.png", label: "dermal fillers", href: "/dermal-fillers-malta" },
  { img: "mem-lip.png", label: "lip fillers", href: "/lip-fillers-malta" },
];

const TESTIMONIALS = [
  {
    initials: "SM",
    name: "Sofia M.",
    tier: "Elite Member",
    quote: "The Glow Club completely changed how I approach self-care. The savings add up month after month and the priority booking alone is worth every cent.",
  },
  {
    initials: "RT",
    name: "Rachel T.",
    tier: "Platinum Member",
    quote: "I love that my balance rolls over and never expires. I saved up for my filler appointment and paid less than I ever had before. Absolutely recommend.",
  },
  {
    initials: "LB",
    name: "Laura B.",
    tier: "Signature Member",
    quote: "The referral spa day was an incredible bonus. I recommended two friends and felt like royalty during my complimentary day. Such a thoughtful touch.",
  },
];

const FAQS: Faq[] = [
  { q: "What is The GLOW CLUB Membership?", a: "The Glow Club is an exclusive membership program designed to reward our most dedicated and local customers by offering discounts on their favorite services and products, while also providing the flexibility to explore exciting new offerings." },
  { q: "May I use The GLOW CLUB discount to purchase packages or other discounted services?", a: "Unfortunately, the Glow Club discount cannot be used for packages, already discounted services, or promotional offers. However, you are welcome to use the discount for purchasing gift cards and products." },
  { q: "How is this different from a traditional membership program?", a: "Unlike traditional spa memberships that often follow a \"use it or lose it\" model, our program operates more like a flexible savings account. You can save funds each month, giving you the freedom to choose your preferred aesthetic procedure. When you're ready for your appointment, you'll not only benefit from a discount on the service but also have the option to select the products you desire." },
  { q: "How long am I committed to the program?", a: "You are committed to the program for a minimum of 1 month. After this initial period, you have the flexibility to cancel your membership at any time. However, the first month is non-refundable, but you can use the amount as credit on your second procedure with us once you join the membership." },
  { q: "If I cancel, can I get a refund?", a: "Absolutely. Although the first month is non-refundable, if you have more monthly payments, they will be refunded. You can use the first month's payment as a credit for your second procedure with us after you join the Glow Club." },
  { q: "May I use funds in my GLOW CLUB account to pay for friends or family members services?", a: "No, the funds in your Glow Club account are exclusively intended for your own use and cannot be applied to pay for services for friends or family members." },
  { q: "What services can I use my GLOW CLUB membership for?", a: "With your Glow Club membership, you can enjoy a 10% discount on all aesthetic services and a generous 15% discount when purchasing any retail products." },
  { q: "How do I sign up for this membership?", a: "Signing up is straightforward. All you need to do is select the monthly deposit amount that suits you best and provide your personal details to create your membership account. We look forward to welcoming you aboard!" },
  { q: "When will my credit card be charged?", a: "Your credit card will be charged on the same day of the month as your initial purchase for the membership. This ensures a consistent billing cycle for your convenience." },
  { q: "What happens if a card is declined?", a: "In the event of a declined card, we will prompt you to update your card information. If the issue persists, your Glow Club balance will not be replenished until a valid card is provided." },
  { q: "Is there a monthly fee?", a: "No, there is no monthly fee associated with our membership. You will only be charged the specific amount that you choose during the sign-up process." },
  { q: "What happens to my monthly deposit?", a: "Your monthly deposit is credited to your Glow Club account, where it can be used to purchase services or products with the special benefits and discounts offered by the club." },
  { q: "How do the monthly payments work?", a: "Each month, the chosen amount will be automatically charged to your card to cover your membership contribution." },
  { q: "Can I use multiple discounts?", a: "Unfortunately, multiple discounts cannot be applied to services that are already discounted or part of promotional offers." },
  { q: "Do I need to deposit the same amount every month?", a: "No, you have the flexibility to adjust the deposit amount as you wish each month, giving you the freedom to tailor your membership to your needs." },
  { q: "How much time do I need to wait after deposit to purchase the service or product?", a: "There is no waiting period; you can start using the discount for members immediately. Note that the first month payment is non-refundable." },
  { q: "What's the minimum and maximum amount that I can deposit?", a: "The minimum monthly deposit allowed is €20, while the maximum is €200 per month. This range provides you with the freedom to choose an amount that suits your budget." },
  { q: "How do I cancel my membership?", a: "You have two convenient options to cancel your membership. You can either send an email to info@carismaaesthetics.com or access the cancellation feature on the membership portal." },
];

/* ─── page ────────────────────────────────────────────────────── */

export default function MembershipPage() {
  return (
    <>
      {/* ════ HERO ════ */}
      <section style={{ background: "url('/assets/hero-bg.png') center / cover no-repeat", minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "var(--nav-clear) 0 clamp(20px,3vh,40px)" }}>
        <div className="container text-center" style={{ maxWidth: "640px" }}>
          <div className="mx-auto" style={{ maxWidth: "460px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${A}/mem-hero.jpg`} alt="The Glow Club membership" className="w-full" style={{ display: "block", maxHeight: "clamp(240px,38vh,340px)", aspectRatio: "3 / 2", objectFit: "cover", borderRadius: "10px" }} />
          </div>

          <div className="flex items-center justify-center" style={{ gap: "14px", marginTop: "22px" }}>
            <span className="flex items-center" style={{ flex: 1, maxWidth: "120px" }}>
              <span style={{ width: "7px", height: "7px", background: "#b8a89a", transform: "rotate(45deg)", flexShrink: 0 }} />
              <span style={{ flex: 1, height: "1px", background: "#b8a89a" }} />
            </span>
            <p className="font-serif" style={{ fontSize: "clamp(18px,2.4vw,24px)", color: GOLD, letterSpacing: "0.22em", textTransform: "uppercase", whiteSpace: "nowrap", margin: 0 }}>welcome to</p>
            <span className="flex items-center" style={{ flex: 1, maxWidth: "120px" }}>
              <span style={{ flex: 1, height: "1px", background: "#b8a89a" }} />
              <span style={{ width: "7px", height: "7px", background: "#b8a89a", transform: "rotate(45deg)", flexShrink: 0 }} />
            </span>
          </div>

          <div style={{ background: "rgba(150,178,178,0.13)", padding: "10px 20px", margin: "8px auto 0", maxWidth: "440px", borderRadius: "2px" }}>
            <p className="font-display" style={{ fontSize: "clamp(16px,2.4vw,22px)", color: BLUE, letterSpacing: "0.38em", textTransform: "uppercase", margin: 0 }}>the glow club</p>
          </div>

          <div style={{ marginTop: "22px" }}>
            <Cta label="begin your journey now" />
          </div>
        </div>
      </section>

      {/* ════ HOW IT WORKS — no Reveal, always visible ════ */}
      <section style={{ padding: "70px 0" }}>
        <div className="container">
          <Serif>how it works</Serif>
          <Rule />
          <div className="grid gap-10 md:grid-cols-3" style={{ marginTop: "56px" }}>
            {STEPS.map((s) => (
              <div key={s.n}>
                {/* icon row above band */}
                <div style={{ position: "relative", height: "72px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${A}/${s.icon}`}
                    alt={s.word}
                    width={76}
                    height={72}
                    style={{ position: "absolute", right: "8%", bottom: 0, objectFit: "contain" }}
                  />
                </div>
                {/* number + step word band */}
                <div className="flex items-center" style={{ position: "relative", background: "#e3ecec", height: "62px" }}>
                  <span
                    className="font-serif flex items-center justify-center"
                    style={{ width: "70px", height: "88px", marginTop: "-13px", flexShrink: 0, background: SAGE_SOLID, color: "#fff", fontSize: "44px", lineHeight: 1 }}
                  >
                    {s.n}
                  </span>
                  <span className="font-serif" style={{ fontSize: "28px", color: "#3f6363", letterSpacing: "0.1em", textTransform: "uppercase", marginLeft: "18px" }}>{s.word}</span>
                </div>
                {/* subheading + divider + body + example */}
                <h3 className="font-display" style={{ fontSize: "15px", color: GOLD, letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1.5, margin: "26px 0 0" }}>{s.sub}</h3>
                <div style={{ height: "1px", background: BLUE, opacity: 0.4, margin: "16px 0 18px" }} />
                <p style={{ fontSize: "14.5px", color: "var(--label)", lineHeight: 1.8, textAlign: "justify" }}>{s.desc}</p>
                <p style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.8, marginTop: "16px", textAlign: "justify" }}>
                  <u style={{ textUnderlineOffset: "2px" }}>E.g.:</u> {s.eg}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ FLEXIBLE MEMBERSHIP ════ */}
      <section style={{ padding: "20px 0 60px" }}>
        <div className="container">
          <div className="mx-auto flex items-start gap-6" style={{ maxWidth: "880px" }}>
            <svg className="shrink-0" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.2" strokeLinejoin="round" style={{ marginTop: "2px" }}>
              <path d="M6 3h12l3 5-9 13L3 8z" />
              <path d="M3 8h18M9 3l-1 5 4 13 4-13-1-5" />
            </svg>
            <div>
              <h3 className="font-serif" style={{ fontSize: "20px", color: GOLD, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>flexible membership</h3>
              <p style={{ fontSize: "14.5px", color: "var(--label)", lineHeight: 1.8 }}>
                We want you to feel confident and satisfied with our membership. While the{" "}
                <b style={{ color: BLUE, fontWeight: 600 }}>first month is non-refundable, we offer the flexibility to apply this amount as a credit</b>{" "}
                towards your second procedure once you join our membership. We want to make sure you get the most out of your investment with us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════ BUILD YOUR STATUS — no Reveal, always visible ════ */}
      <section style={{ padding: "60px 0" }}>
        <div className="container text-center">
          <Serif>build your status and unlock<br />additional rewards</Serif>
          <Rule />
          <p className="mx-auto" style={{ maxWidth: "700px", fontSize: "14px", color: "var(--label)", lineHeight: 1.8, marginTop: "20px" }}>
            Unlock additional rewards as you continue to contribute towards your Glow balance. Enjoy exclusive benefits as your lifetime contributions grow.
          </p>
          <div className="grid gap-8 md:grid-cols-3 mx-auto" style={{ maxWidth: "980px", marginTop: "48px" }}>
            {STATUS.map((s) => (
              <div
                key={s.name}
                className="text-center flex flex-col items-center"
                style={{ background: "#fff", border: "1px solid #e4eded", borderRadius: "8px", padding: "40px 24px 32px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
              >
                <div style={{ height: "60px", display: "flex", alignItems: "center", justifyContent: "center" }}>{s.gem}</div>
                <h3 className="font-display" style={{ fontSize: "13px", color: "#527979", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: "22px" }}>{s.name}</h3>
                <div style={{ width: "180px", maxWidth: "80%", height: "1px", background: "var(--line)", margin: "16px 0 20px" }} />
                <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6, fontStyle: "italic" }}>Complimentary</p>
                <p style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.7, marginTop: "4px", fontWeight: 500 }}>{s.reward}</p>
                <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.7, marginTop: "6px", letterSpacing: "0.05em" }}>{s.spend}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ EXCLUSIVE 10% MEMBER DISCOUNT ════ */}
      <section style={{ padding: "60px 0 0" }}>
        <div className="container text-center">
          <Serif>exclusive 10% member discount</Serif>
          <Rule />
        </div>
      </section>
      {/* full-width pale band */}
      <div style={{ background: "#f4f4f2", padding: "48px 0", marginTop: "44px" }}>
        <div className="container">
          <div className="grid gap-7 md:grid-cols-3 mx-auto" style={{ maxWidth: "960px" }}>
            {SAVINGS.map((s, i) => (
              <Reveal key={s.spend} delay={i * 70} className="text-center" style={{ background: "#ffffff", borderRadius: "8px", padding: "36px 24px", boxShadow: "0 4px 20px rgba(0,0,0,0.07)", border: "1px solid #ece9e4" }}>
                <p className="font-display" style={{ fontSize: "13px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>spend</p>
                <p className="font-serif" style={{ fontSize: "clamp(26px,3vw,34px)", color: "var(--label)", letterSpacing: "0.04em", margin: "6px 0 4px" }}>{s.spend}</p>
                <p className="font-display" style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>on services</p>
                <svg className="mx-auto" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.4" style={{ margin: "18px auto" }}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
                <p className="font-display" style={{ fontSize: "13px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>save</p>
                <p className="font-serif" style={{ fontSize: "clamp(26px,3vw,34px)", color: GOLD, letterSpacing: "0.04em", margin: "6px 0 4px" }}>{s.save}</p>
                <p className="font-display" style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>annually</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <div style={{ padding: "18px 0 50px" }}>
        <p className="font-display text-center" style={{ fontSize: "11px", color: "var(--muted)", letterSpacing: "0.14em", textTransform: "uppercase" }}>*prices may vary over time</p>
      </div>

      {/* ════ BENEFITS ════ */}
      <section style={{ padding: "60px 0" }}>
        <div className="container">
          <Serif>benefits</Serif>
          <Rule />
          <div className="grid gap-12 lg:grid-cols-2 items-center mx-auto" style={{ maxWidth: "1040px", marginTop: "44px" }}>
            {/* image — always visible, no Reveal */}
            <div style={{ position: "relative", width: "100%", aspectRatio: "3 / 4", overflow: "hidden", borderRadius: "12px", boxShadow: "0 16px 40px rgba(0,0,0,0.12)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${A}/mem-benefits.png`}
                alt="Carisma Aesthetics Glow Club member"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            {/* benefit rows */}
            <div>
              {BENEFITS.map((b) => (
                <div key={b.big} className="flex items-center gap-4" style={{ padding: "20px 0", borderBottom: "1px solid var(--line)" }}>
                  <span className="font-display" style={{ fontSize: "clamp(18px,2vw,26px)", color: GOLD, letterSpacing: "0.08em", textTransform: "uppercase", minWidth: "130px", flexShrink: 0 }}>{b.big}</span>
                  <span style={{ width: "1px", height: "22px", background: BLUE, opacity: 0.5, flexShrink: 0 }} />
                  <span>
                    <span className="font-display" style={{ fontSize: "12px", color: BLUE, letterSpacing: "0.1em", textTransform: "uppercase" }}>{b.label}</span>
                    {b.note && <span style={{ display: "block", fontSize: "11px", color: "var(--muted)", marginTop: "3px", fontStyle: "italic" }}>{b.note}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════ BEST SELLING TREATMENTS ════ */}
      <section style={{ padding: "60px 0" }}>
        <div className="container text-center">
          <Serif>best selling treatments</Serif>
          <Rule />
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 mx-auto" style={{ maxWidth: "1040px", marginTop: "44px" }}>
            {TREATMENTS.map((t, i) => (
              <Reveal key={t.label} delay={i * 70}>
                <Link
                  href={t.href}
                  className="block overflow-hidden"
                  style={{ borderRadius: "10px", boxShadow: "0 4px 20px rgba(0,0,0,0.10)", border: "1px solid #e0e0e0", background: "#fff", transition: "transform 0.25s, box-shadow 0.25s", display: "block" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${A}/${t.img}`} alt={t.label} className="w-full" style={{ display: "block", aspectRatio: "5 / 6", objectFit: "cover" }} />
                  <p className="font-display" style={{ fontSize: "12px", color: GOLD, letterSpacing: "0.14em", textTransform: "uppercase", padding: "14px 10px", background: "#fff" }}>{t.label}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════ FAQ ════ */}
      <section style={{ padding: "60px 0" }}>
        <div className="container">
          <h2 className="font-serif text-center" style={{ fontSize: "clamp(22px,3vw,32px)", color: GOLD, letterSpacing: "0.08em", fontWeight: 400 }}>Frequently asked questions</h2>
          <p className="font-display text-center" style={{ fontSize: "13px", color: BLUE, letterSpacing: "0.12em", textTransform: "uppercase", margin: "10px 0 40px" }}>Membership</p>
          <FaqAccordion items={FAQS} uppercase={false} />
        </div>
      </section>

      {/* ════ REAL PEOPLE REAL REVIEWS (new section) ════ */}
      <section style={{ background: "#f4f4f2", padding: "70px 0" }}>
        <div className="container">
          <Serif>real people real reviews</Serif>
          <Rule />
          <div className="grid gap-8 md:grid-cols-3 mx-auto" style={{ maxWidth: "1040px", marginTop: "48px" }}>
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <div style={{ background: "#fff", borderRadius: "12px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.07)", border: "1px solid #ece9e4", display: "flex", flexDirection: "column", gap: "0" }}>
                  {/* avatar */}
                  <div style={{ width: "56px", height: "56px", borderRadius: "8px", background: SAGE_SOLID, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "4px" }}>
                    <span className="font-display" style={{ fontSize: "16px", color: "#fff", letterSpacing: "0.08em", fontWeight: 700 }}>{t.initials}</span>
                  </div>
                  {/* stars */}
                  <Stars />
                  {/* quote */}
                  <p style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.8, fontStyle: "italic", marginBottom: "20px", flex: 1 }}>&ldquo;{t.quote}&rdquo;</p>
                  {/* name + tier */}
                  <div>
                    <p className="font-display" style={{ fontSize: "13px", color: "var(--ink)", fontWeight: 700, letterSpacing: "0.04em" }}>{t.name}</p>
                    <p className="font-display" style={{ fontSize: "10px", color: BLUE, letterSpacing: "0.16em", textTransform: "uppercase", marginTop: "3px" }}>{t.tier}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════ JOIN THE CLUB ════ */}
      <section style={{ padding: "70px 0 96px" }}>
        <div className="container text-center" style={{ maxWidth: "760px" }}>
          {/* ornament heading */}
          <div className="flex items-center justify-center" style={{ gap: "20px" }}>
            <span className="flex items-center" style={{ flex: 1, maxWidth: "150px" }}>
              <span style={{ width: "7px", height: "7px", background: "#9fb5b5", transform: "rotate(45deg)", flexShrink: 0 }} />
              <span style={{ flex: 1, height: "1px", background: "#9fb5b5" }} />
            </span>
            <h2 className="font-serif" style={{ fontSize: "clamp(24px,4vw,38px)", color: "#527979", letterSpacing: "0.3em", fontWeight: 400, whiteSpace: "nowrap" }}>JOIN THE CLUB</h2>
            <span className="flex items-center" style={{ flex: 1, maxWidth: "150px" }}>
              <span style={{ flex: 1, height: "1px", background: "#9fb5b5" }} />
              <span style={{ width: "7px", height: "7px", background: "#9fb5b5", transform: "rotate(45deg)", flexShrink: 0 }} />
            </span>
          </div>
          {/* script tagline */}
          <p style={{ fontFamily: "var(--font-pinyon), cursive", fontSize: "clamp(34px,5vw,46px)", color: "var(--gold)", marginTop: "14px", lineHeight: 1.1 }}>Glow with Confidence</p>
          {/* sign up link */}
          <Link href="/sign-up" className="flex items-center" style={{ marginTop: "44px", gap: "22px" }}>
            <span style={{ flex: 1, height: "1px", background: "#cfcabf" }} />
            <span className="font-display" style={{ fontSize: "14px", color: "#527979", letterSpacing: "0.22em", textTransform: "uppercase", whiteSpace: "nowrap" }}>sign up now</span>
            <span style={{ flex: 1, height: "1px", background: "#cfcabf" }} />
          </Link>
        </div>
      </section>
    </>
  );
}
