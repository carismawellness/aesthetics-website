import Link from "next/link";
import Reveal from "@/components/Reveal";
import FaqAccordion, { type Faq } from "@/components/FaqAccordion";

const A = "/assets/treatments";
const BLUE = "#6391ab";
const GOLD = "var(--gold-deep)";
const CARD = "linear-gradient(150deg, #f0f5f5 0%, #bdd1d1 100%)";

function Serif({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <h2 className="font-serif text-center" style={{ fontSize: "clamp(22px,3vw,32px)", color: GOLD, letterSpacing: "0.08em", fontWeight: 400, lineHeight: 1.3, ...style }}>{children}</h2>;
}
function Rule() {
  return <div className="mx-auto" style={{ width: "70px", height: "1px", background: BLUE, opacity: 0.5, margin: "14px auto 0" }} />;
}
function Cta({ label, href = "/consultation" }: { label: string; href?: string }) {
  return <Link href={href} style={{ display: "inline-block", background: BLUE, color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "13px", letterSpacing: "0.14em", textTransform: "uppercase", padding: "15px 38px", borderRadius: "8px" }}>{label}</Link>;
}

const STEPS = [
  { n: "1", word: "contribute", sub: "Select your monthly contribution amount", desc: "Choose an amount you would like to deposit each month into your Glow balance.", eg: "E.g.: If you choose to subscribe at €40, and you will automatically be investing this amount each month",
    icon: (<><path d="M3 13c1.6-1.4 3.3-1.4 5 0 1.7 1.4 3.4 1.4 5 0" /><path d="M3 17c1.6-1.4 3.3-1.4 5 0 1.7 1.4 3.4 1.4 5 0" /><path d="M14.5 14.5 20 12a1.6 1.6 0 0 0-1-3l-5 1.4" /><circle cx="13" cy="5" r="3" /><path d="M13 3.6v2.8M11.9 4.4c0-.5.5-.8 1.1-.8s1.1.3 1.1.8-.5.7-1.1.7-1.1.3-1.1.8.5.8 1.1.8 1.1-.3 1.1-.8" /></>) },
  { n: "2", word: "save", sub: "Grow your balance", desc: "Let your balance grow with your monthly contributions as you save up to spend on any of our services and products", eg: "E.g.: Your Glow balance will grow over time, accumulating for example €240 in 6 months if you deposit €40 each month",
    icon: (<><path d="M19.5 11.2c0-3.1-3.1-5.2-7-5.2-1.2 0-2.3.2-3.3.6L6.8 5.3 6.4 8C5.2 9 4.5 10 4.5 11.2c0 1.5.9 2.8 2.3 3.7V17a1 1 0 0 0 1 1h1.1a1 1 0 0 0 1-1v-.2c.5.1 1 .2 1.6.2s1.1-.1 1.6-.2V17a1 1 0 0 0 1 1h1.1a1 1 0 0 0 1-1v-2.1c1.4-.9 2.2-2.2 2.2-3.7z" /><path d="M9 9.5h3" /><circle cx="16.5" cy="11" r="0.5" fill="currentColor" /><path d="M19.6 11.5c.7 0 1.1-.6 1.1-1.4s-.6-1.1-1.1-1.1" /></>) },
  { n: "3", word: "spend", sub: "enjoy exclusive 20% off", desc: "Enjoy your member exclusive 10% discount on all services and 15% on all products as you spend your Glow credit.", eg: "E.g.: Purchase your mid-yearly botox session at a 10% discount without having to pay the full amount at once",
    icon: (<><path d="M5 20c0-4 2.5-7 7-7s7 3 7 7" /><circle cx="12" cy="8" r="4.5" /><path d="M10 8h4M12 6.5c1.6 0 1.6 1.5 3.2 1.5" /><path d="m16.5 3.5 4 4M18 2l4 4-2 2-4-4z" /></>) },
];

const SAGE = "#96b2b2";
const STATUS = [
  {
    name: "signature STATUS", reward: "Carisma Spa Day for two", spend: "with €1000+ spend",
    icon: (<svg width="50" height="50" viewBox="0 0 48 48" aria-hidden><path d="M23 7a17 17 0 0 0 0 34z" fill={SAGE} /><path d="M25 7a17 17 0 0 1 0 34z" fill="#b79e61" /></svg>),
  },
  {
    name: "elite STATUS", reward: "Signature Massage", spend: "with €2500+ spend",
    icon: (<svg width="54" height="50" viewBox="0 0 56 48" aria-hidden><path d="M18 6 26 24 18 42 10 24z" fill={SAGE} /><path d="M38 6 46 24 38 42 30 24z" fill={SAGE} opacity="0.78" /></svg>),
  },
  {
    name: "platinum STATUS", reward: "€300 Aesthetics voucher", spend: "with €5000+ spend",
    icon: (<svg width="56" height="50" viewBox="0 0 56 48" aria-hidden><path d="M11 18 18 9 38 9 45 18 28 41z" fill={SAGE} /><path d="M11 18H45M18 9 28 41M38 9 28 41M18 9 22 18M38 9 34 18" stroke="#fff" strokeWidth="0.9" fill="none" opacity="0.55" /></svg>),
  },
];

const SAVINGS = [
  { spend: "with EUR 1000", save: "save Eur 100" },
  { spend: "with EUR 2500", save: "save Eur 250" },
  { spend: "with EUR 5000", save: "save Eur 500" },
];

const BENEFITS = [
  { big: "10%* OFF", label: "aesthetics & Spa services", note: "*individual treatments are discounted by 8-12%" },
  { big: "15% OFF", label: "skin care products" },
  { big: "#1 priority", label: "booking & scheduling" },
  { big: "1x year", label: "complimentary consultation" },
  { big: "exclusive", label: "events & open days" },
  { big: "1x spa day", label: "for every member you refer" },
];

const TREATMENTS = [
  { img: "mem-botox.png", label: "botox" },
  { img: "mem-microneedling.png", label: "microneedling" },
  { img: "mem-dermal.png", label: "dermal fillers" },
  { img: "mem-lip.png", label: "lip fillers" },
];

const FAQS: Faq[] = [
  { q: "What is The GLOW CLUB Membership?", a: "The Glow Club is an exclusive membership program designed to reward our most dedicated and local customers by offering discounts on their favorite services and products, while also providing the flexibility to explore exciting new offerings." },
  { q: "May I use The GLOW CLUB discount to purchase packages or other discounted services?", a: "Unfortunately, the Glow Club discount cannot be used for packages, already discounted services, or promotional offers. However, you are welcome to use the discount for purchasing gift cards and products." },
  { q: "How is this different from a traditional membership program?", a: "Unlike traditional spa memberships that often follow a \"use it or lose it\" model, where unused subscriptions or predefined procedures can lead to missed opportunities, our program operates more like a flexible savings account. You can save funds each month, giving you the freedom to choose your preferred aesthetic procedure. When you're ready for your appointment, you'll not only benefit from a discount on the service but also have the option to select the products you desire. This approach provides greater convenience and customization to meet your individual preferences and needs." },
  { q: "How long am I committed to the program?", a: "You are committed to the program for a minimum of 1 months. After this initial period, you have the flexibility to cancel your membership at any time. However, the first month is no-refundable, but you can use the amount as credit on your second procedure with us once you join the membership." },
  { q: "If I cancel, can I get a refund?", a: "Absolutely. Although the first month is non-refundable, if you have more monthly payments, they will be refunded.\nYou can use the first month's payment as a credit for your second procedure with us after you join the Glow Club." },
  { q: "May I use funds in my GLOW CLUB account to pay for friends or family members services?", a: "No, the funds in your Glow Club account are exclusively intended for your own use and cannot be applied to pay for services for friends or family members." },
  { q: "What services can I use my GLOW CLUB membership for?", a: "With your Glow Club membership, you can enjoy a 10% discount on all aesthetic services and a generous 15% discount when purchasing any retail products. It's our way of enhancing your overall experience." },
  { q: "How do I sign up for this membership?", a: "Signing up for our membership is a straightforward process. All you need to do is select the monthly deposit amount that suits you best and provide your personal details to create your membership account. To get started, please follow the sign-up steps outlined on our website (click here). We look forward to welcoming you aboard!" },
  { q: "When will my credit card be charged?", a: "Your credit card will be charged on the same day of the month as your initial purchase for the membership. This ensures a consistent billing cycle for your convenience." },
  { q: "What happens if a card is declined?", a: "In the event of a declined card, we will prompt you to update your card information. If the issue persists and the card continues to fail, your Glow Club balance will not be replenished until a valid card is provided. This ensures uninterrupted access to your membership benefits." },
  { q: "Is there a monthly fee?", a: "No, there is no monthly fee associated with our membership. You will only be charged the specific amount that you choose during the sign-up process." },
  { q: "What happens to my monthly deposit?", a: "Your monthly deposit is credited to your Glow Club account, where it can be used to purchase services or products with the special benefits and discounts offered by the club." },
  { q: "How do the monthly payments work?", a: "Each month, the chosen amount will be automatically charged to your card to cover your membership fee." },
  { q: "Can I use multiple discounts?", a: "Unfortunately, multiple discounts cannot be applied to services that are already discounted or part of promotional offers." },
  { q: "Do I need deposit the same amount every month?", a: "No, you have the flexibility to adjust the deposit amount as you wish each month, giving you the freedom to tailor your membership to your needs." },
  { q: "How much time do I need to wait after deposit to purchase the service or product?", a: "There is no waiting period; you can start to use the discount for members immediately, although you can just use the deposit as credit for the procedures in your second procedure with us.\nNotice that the first month payment is non-refundable." },
  { q: "What's the minimum and maximum amount that I can deposit?", a: "The minimum monthly deposit allowed is 20 euros, while the maximum is set at 200 euros per month. This range provides you with the freedom to choose an amount that suits your preferences and budget." },
  { q: "How do I cancel my membership?", a: "You have two convenient options to cancel your membership. You can either send an email to info@carismaaesthetics.com or access the cancellation feature on the membership portal. We aim to make the cancellation process as simple as possible for your convenience." },
];


export default function MembershipPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section style={{ background: "url('/assets/hero-bg.png') center / cover no-repeat", padding: "56px 0 64px" }}>
        <div className="container text-center" style={{ maxWidth: "640px" }}>
          <div className="overflow-hidden mx-auto rounded-xl" style={{ maxWidth: "440px", boxShadow: "0 18px 44px rgba(0,0,0,0.14)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${A}/mem-hero.jpg`} alt="The Glow Club membership" className="w-full" style={{ display: "block", aspectRatio: "3 / 2", objectFit: "cover" }} />
          </div>
          <p className="font-serif" style={{ fontSize: "clamp(22px,3vw,30px)", color: GOLD, letterSpacing: "0.22em", textTransform: "uppercase", marginTop: "28px" }}>welcome to</p>
          <p className="font-display" style={{ fontSize: "clamp(20px,2.6vw,26px)", color: BLUE, letterSpacing: "0.34em", textTransform: "uppercase", marginTop: "6px" }}>the glow club</p>
          <div style={{ marginTop: "30px" }}>
            <Cta label="begin your journey now ›" />
          </div>
          <div className="flex flex-col items-center" style={{ marginTop: "34px" }}>
            <span className="font-display" style={{ fontSize: "11px", color: BLUE, letterSpacing: "0.16em" }}>scroll down<br />to learn more</span>
            <svg className="animate-bounce" width="14" height="16" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" style={{ marginTop: "10px" }}><path d="M12 4v12M6 12l6 6 6-6" /></svg>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section style={{ padding: "70px 0" }}>
        <div className="container">
          <Serif>how it works</Serif><Rule />
          <div className="grid gap-10 md:grid-cols-3" style={{ marginTop: "56px" }}>
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={(i % 3) * 80}>
                {/* icon floating above the band, on the right */}
                <div style={{ position: "relative", height: "72px" }}>
                  <svg width="76" height="72" viewBox="0 0 24 24" fill="none" stroke="#c2cccc" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", right: "8%", bottom: 0 }}>{s.icon}</svg>
                </div>
                {/* pale band with the number box overlapping + step word */}
                <div className="flex items-center" style={{ position: "relative", background: "#e3ecec", height: "62px" }}>
                  <span className="font-serif flex items-center justify-center" style={{ width: "70px", height: "88px", marginTop: "-13px", flexShrink: 0, background: "#96b2b2", color: "#fff", fontSize: "44px", lineHeight: 1 }}>{s.n}</span>
                  <span className="font-serif" style={{ fontSize: "28px", color: "#a7b6b6", letterSpacing: "0.1em", textTransform: "uppercase", marginLeft: "18px" }}>{s.word}</span>
                </div>
                {/* subtitle + divider + copy */}
                <h3 className="font-display" style={{ fontSize: "15px", color: GOLD, letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1.5, margin: "26px 0 0" }}>{s.sub}</h3>
                <div style={{ height: "1px", background: BLUE, opacity: 0.4, margin: "16px 0 18px" }} />
                <p style={{ fontSize: "14.5px", color: "var(--label)", lineHeight: 1.8, textAlign: "justify" }}>{s.desc}</p>
                <p style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.8, marginTop: "16px", textAlign: "justify" }}><u style={{ textUnderlineOffset: "2px" }}>E.g.:</u>{s.eg.replace(/^E\.g\.:/, "")}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FLEXIBLE MEMBERSHIP ===== */}
      <section style={{ padding: "20px 0 60px" }}>
        <div className="container">
          <div className="mx-auto flex items-start gap-6" style={{ maxWidth: "880px" }}>
            <svg className="shrink-0" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.2" strokeLinejoin="round" style={{ marginTop: "2px" }}><path d="M6 3h12l3 5-9 13L3 8z" /><path d="M3 8h18M9 3l-1 5 4 13 4-13-1-5" /></svg>
            <div>
              <h3 className="font-serif" style={{ fontSize: "20px", color: GOLD, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>flexible membership</h3>
              <p style={{ fontSize: "14.5px", color: "var(--label)", lineHeight: 1.8 }}>We want you to feel confident and satisfied with our membership. While the <b style={{ color: BLUE, fontWeight: 600 }}>first month is non-refundable, we offer the flexibility to apply this amount as a credit</b> towards your second procedure once you join our membership. We want to make sure you get the most out of your investment with us</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BUILD YOUR STATUS ===== */}
      <section style={{ padding: "60px 0" }}>
        <div className="container text-center">
          <Serif>build your status and unlock<br />additional rewards</Serif><Rule />
          <p className="mx-auto" style={{ maxWidth: "760px", fontSize: "14px", color: "var(--label)", lineHeight: 1.8, marginTop: "20px" }}>Unlock additional rewards as you continue to contribute towards your Glow balance. Enjoy exclusive benefits as your lifetime contributions grow.</p>
          <div className="grid gap-10 md:grid-cols-3 mx-auto" style={{ maxWidth: "980px", marginTop: "48px" }}>
            {STATUS.map((s, i) => (
              <Reveal key={s.name} delay={(i % 3) * 80} className="text-center flex flex-col items-center">
                <div style={{ height: "56px", display: "flex", alignItems: "flex-end" }}>{s.icon}</div>
                <h3 className="font-display" style={{ fontSize: "16px", color: "#8fa0a0", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "22px" }}>{s.name}</h3>
                <div style={{ width: "210px", maxWidth: "80%", height: "1px", background: "var(--line)", margin: "14px 0 18px" }} />
                <p style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.7 }}>Complimentary</p>
                <p style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.7 }}>{s.reward}</p>
                <p style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.7 }}>{s.spend}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXCLUSIVE 10% MEMBER DISCOUNT ===== */}
      <section style={{ padding: "60px 0 36px" }}>
        <div className="container text-center">
          <Serif>exclusive 10% member discount</Serif><Rule />
        </div>
      </section>
      {/* full-width pale band with white cards */}
      <div style={{ background: "#f6f5f3", padding: "44px 0" }}>
        <div className="container">
          <div className="grid gap-7 md:grid-cols-3 mx-auto" style={{ maxWidth: "1000px" }}>
            {SAVINGS.map((s, i) => {
              const [, amount] = s.spend.split(/(EUR.*)$/);
              const [, saveAmt] = s.save.split(/(Eur.*)$/);
              return (
                <Reveal key={s.spend} delay={(i % 3) * 70} className="text-center" style={{ background: "#fff", borderRadius: "2px", padding: "34px 24px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
                  <p className="font-display" style={{ fontSize: "14px", letterSpacing: "0.16em", textTransform: "uppercase", lineHeight: 1.7, color: "#c0bbb2" }}>
                    with <span style={{ color: "#8a8278" }}>{amount}</span><br /><span style={{ fontSize: "13px", letterSpacing: "0.18em", color: "#b6b1a8" }}>spend on services</span>
                  </p>
                  <svg className="mx-auto" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.4" style={{ margin: "18px auto" }}><path d="M6 9l6 6 6-6" /></svg>
                  <p className="font-display" style={{ fontSize: "15px", letterSpacing: "0.1em", textTransform: "uppercase", lineHeight: 1.6, color: "#b6b1a8" }}>
                    save <span style={{ color: "#8a8278" }}>{saveAmt}</span><br /><span style={{ color: "#b6b1a8" }}>annually</span>
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
      <section style={{ padding: "26px 0 50px" }}>
        <p className="font-display text-center" style={{ fontSize: "11px", color: "var(--muted)", letterSpacing: "0.14em", textTransform: "uppercase" }}>*prices may vary over time</p>
      </section>

      {/* ===== BENEFITS ===== */}
      <section style={{ padding: "60px 0" }}>
        <div className="container">
          <Serif>benefits</Serif><Rule />
          <div className="grid gap-12 lg:grid-cols-2 items-center mx-auto" style={{ maxWidth: "1040px", marginTop: "44px" }}>
            <Reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${A}/mem-benefits.png`} alt="Carisma Aesthetics member" className="w-full rounded-xl" style={{ display: "block", objectFit: "cover", aspectRatio: "4 / 3", boxShadow: "0 16px 40px rgba(0,0,0,0.12)" }} />
            </Reveal>
            <div>
              {BENEFITS.map((b) => (
                <div key={b.big} className="flex items-baseline gap-4" style={{ padding: "16px 0", borderBottom: "1px solid var(--line)" }}>
                  <span className="font-display" style={{ fontSize: "18px", color: GOLD, letterSpacing: "0.08em", textTransform: "uppercase", minWidth: "120px" }}>{b.big}</span>
                  <span style={{ width: "1px", height: "20px", background: BLUE, opacity: 0.5 }} />
                  <span>
                    <span className="font-display" style={{ fontSize: "12px", color: BLUE, letterSpacing: "0.08em", textTransform: "uppercase" }}>{b.label}</span>
                    {b.note && <span style={{ display: "block", fontSize: "11px", color: "var(--muted)", marginTop: "3px", fontStyle: "italic" }}>{b.note}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== BEST SELLING TREATMENTS ===== */}
      <section style={{ padding: "60px 0" }}>
        <div className="container text-center">
          <Serif>best selling treatments</Serif><Rule />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mx-auto" style={{ maxWidth: "1040px", marginTop: "44px" }}>
            {TREATMENTS.map((t, i) => (
              <Reveal key={t.label} delay={(i % 4) * 70} className="overflow-hidden" style={{ borderRadius: "14px", boxShadow: "0 12px 30px rgba(0,0,0,0.08)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${A}/${t.img}`} alt={t.label} className="w-full" style={{ display: "block", aspectRatio: "6 / 7", objectFit: "cover" }} />
                <div style={{ background: CARD, padding: "16px 18px" }}>
                  <span className="font-display" style={{ fontSize: "13px", color: GOLD, letterSpacing: "0.1em", textTransform: "uppercase" }}>{t.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section style={{ padding: "60px 0" }}>
        <div className="container">
          <h2 className="font-serif text-center" style={{ fontSize: "clamp(22px,3vw,32px)", color: GOLD, letterSpacing: "0.08em", fontWeight: 400 }}>Frequently asked questions</h2>
          <p className="font-display text-center" style={{ fontSize: "13px", color: BLUE, letterSpacing: "0.12em", textTransform: "uppercase", margin: "10px 0 40px" }}>Membership</p>
          <FaqAccordion items={FAQS} uppercase={false} />
        </div>
      </section>

      {/* ===== JOIN THE CLUB ===== */}
      <section style={{ padding: "50px 0 96px" }}>
        <div className="container text-center" style={{ maxWidth: "760px" }}>
          {/* ornamented title */}
          <div className="flex items-center justify-center" style={{ gap: "20px" }}>
            <span className="flex items-center" style={{ flex: 1, maxWidth: "150px" }}>
              <span style={{ width: "7px", height: "7px", background: "#9fb5b5", transform: "rotate(45deg)", flexShrink: 0 }} />
              <span style={{ flex: 1, height: "1px", background: "#9fb5b5" }} />
            </span>
            <h2 className="font-serif" style={{ fontSize: "clamp(24px,4vw,40px)", color: "#9fb5b5", letterSpacing: "0.32em", fontWeight: 400, whiteSpace: "nowrap" }}>JOIN THE CLUB</h2>
            <span className="flex items-center" style={{ flex: 1, maxWidth: "150px" }}>
              <span style={{ flex: 1, height: "1px", background: "#9fb5b5" }} />
              <span style={{ width: "7px", height: "7px", background: "#9fb5b5", transform: "rotate(45deg)", flexShrink: 0 }} />
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9fb5b5" strokeWidth="2" style={{ marginLeft: "-2px" }}><path d="M5 12h13M13 6l6 6-6 6" /></svg>
            </span>
          </div>
          {/* gold script subtitle */}
          <p style={{ fontFamily: "var(--font-pinyon), cursive", fontSize: "clamp(34px,5vw,46px)", color: "var(--gold)", marginTop: "14px", lineHeight: 1.1 }}>Glow with Confidence</p>
          {/* SIGN UP NOW on a centered line */}
          <Link href="/consultation" className="flex items-center" style={{ marginTop: "44px", gap: "22px" }}>
            <span style={{ flex: 1, height: "1px", background: "#cfcabf" }} />
            <span className="font-display" style={{ fontSize: "14px", color: "#9fb5b5", letterSpacing: "0.22em", textTransform: "uppercase", whiteSpace: "nowrap" }}>sign up now</span>
            <span style={{ flex: 1, height: "1px", background: "#cfcabf" }} />
          </Link>
        </div>
      </section>
    </>
  );
}
