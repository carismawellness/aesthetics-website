import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Gifts & E-Vouchers | Carisma Aesthetics Malta",
  description:
    "Give the gift of aesthetics. In 3 easy steps, invite your loved ones on a journey of relaxation and wellness they will never forget — pick the occasion, select a gift card and customize your message.",
};

const GOLD = "var(--gold)";
const G = "/assets/gift";

const OCCASIONS = [
  { label: "birthday", img: "birthday.png", slug: "birthday-gift-card" },
  { label: "just for you", img: "just-for-you.png", slug: "just-for-you-gift-card" },
  { label: "thank you", img: "thank-you.png", slug: "thank-you-gift-card" },
  { label: "Congratulations", img: "congratulations.png", slug: "congratulations-gift-card" },
  { label: "mother's day", img: "mothers-day.png", slug: "mother-s-day-gift-card" },
  { label: "father's day", img: "fathers-day.png", slug: "father-s-day-gift-card" },
  { label: "wedding gift", img: "wedding.png", slug: "wedding-gift-card" },
  { label: "Anniversary", img: "anniversary.png", slug: "anniversary-gift-card" },
  { label: "honeymoon", img: "honeymoon.png", slug: "honeymoon-gift-card" },
  { label: "valentine's day", img: "valentines.png", slug: "valentine-s-day-gift-card" },
  { label: "easter", img: "easter.png", slug: "easter-gift-card" },
  { label: "christmas", img: "christmas.png", slug: "christmas-gift-card" },
];

const PRODUCT = "https://www.carismaaesthetics.com/product-page";

export default function GiftsPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section style={{ position: "relative", padding: "0 0 70px" }}>
        {/* light mist band behind the top of the hero */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "62%", background: "var(--cream)" }} aria-hidden />
        <div className="container" style={{ position: "relative" }}>
          <div className="grid items-center gap-10 lg:grid-cols-2" style={{ paddingTop: "70px" }}>
            {/* left: white card with copy */}
            <Reveal>
              <div style={{ background: "#fff", padding: "44px 40px 48px", boxShadow: "0 18px 44px rgba(0,0,0,0.07)" }}>
                <h1 className="font-display" style={{ fontSize: "clamp(26px,3.6vw,40px)", color: GOLD, letterSpacing: "0.08em", fontWeight: 400, lineHeight: 1.3, textTransform: "uppercase" }}>
                  give the gift of<br />aesthetics
                </h1>
                <div style={{ height: "1px", background: GOLD, opacity: 0.5, margin: "20px 0 22px" }} />
                <p style={{ fontSize: "14.5px", color: "var(--label)", lineHeight: 1.8 }}>
                  In 3 easy steps, you can invite your loved ones on a journey of relaxation and wellness that they will never forget.
                </p>
                <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
                  {[
                    "Step 1 Pick the Occasion",
                    "Step 2 Select Gift",
                    "Step 3 Customize your Message",
                  ].map((s) => (
                    <p key={s} style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.7 }}>{s}</p>
                  ))}
                </div>
              </div>
            </Reveal>
            {/* right: framed gift-card image */}
            <Reveal delay={120}>
              <div style={{ background: "#f6efe6", padding: "10px", boxShadow: "0 22px 50px rgba(0,0,0,0.12)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${G}/hero.png`} alt="Carisma Aesthetics gift card" className="w-full" style={{ display: "block", aspectRatio: "513 / 451", objectFit: "cover" }} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== PICK YOUR OCCASION ===== */}
      <section style={{ padding: "30px 0 90px" }}>
        <div className="container">
          <h2 className="font-display text-center" style={{ fontSize: "clamp(22px,3vw,32px)", color: GOLD, letterSpacing: "0.1em", fontWeight: 400 }}>pick your occassion</h2>
          <div className="mx-auto" style={{ width: "90px", height: "1px", background: "var(--teal)", opacity: 0.5, margin: "16px auto 0" }} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mx-auto" style={{ maxWidth: "1120px", marginTop: "48px" }}>
            {OCCASIONS.map((o, i) => (
              <Reveal key={o.slug} delay={(i % 4) * 70}>
                <a
                  href={`${PRODUCT}/${o.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden group"
                  style={{ background: "#fff", boxShadow: "0 12px 30px rgba(0,0,0,0.07)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${G}/${o.img}`}
                    alt={`${o.label} gift card`}
                    className="w-full transition-transform duration-500 group-hover:scale-105"
                    style={{ display: "block", aspectRatio: "266 / 212", objectFit: "cover" }}
                  />
                  <div style={{ padding: "14px 16px", textAlign: "center" }}>
                    <span className="font-display" style={{ fontSize: "12px", color: GOLD, letterSpacing: "0.12em", textTransform: "uppercase" }}>{o.label}</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
