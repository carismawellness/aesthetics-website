import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "E-Gift Vouchers | Carisma Aesthetics - #1 Award Winning Chain in Malta",
  description:
    "Carisma Aesthetics' e-gift vouchers are the perfect present for any occasion. Our premier med aesthetic clinic in Malta offers a range of cosmetic treatments, from Botox and dermal fillers to body contouring and more. Contact us today to purchase your e-gift voucher and give the gift of confidence",
};

const GOLD = "var(--gold)";
const WIX = "https://static.wixstatic.com/media";

const HERO_IMG =
  `${WIX}/f940f0_4d8a80555224470797bd8bb30fed27db~mv2.png/v1/fill/w_513,h_451,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/f940f0_4d8a80555224470797bd8bb30fed27db~mv2.png`;

const OCCASIONS = [
  {
    label: "birthday",
    img: `${WIX}/f940f0_6789153569c34bf7a79fe359573ab1ee~mv2.png/v1/crop/x_0,y_42,w_1032,h_822/fill/w_266,h_212,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/BIRTHDAY%20MOCKUP.png`,
    slug: "birthday-gift-card",
  },
  {
    label: "just for you",
    img: `${WIX}/f940f0_4d8a80555224470797bd8bb30fed27db~mv2.png/v1/crop/x_0,y_42,w_1032,h_822/fill/w_266,h_212,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/JUST%20FOR%20YOU%20MOCKUP.png`,
    slug: "just-for-you-gift-card",
  },
  {
    label: "thank you",
    img: `${WIX}/f940f0_c67dbfbcc29542c0988949cb4d1735a8~mv2.png/v1/crop/x_0,y_42,w_1032,h_822/fill/w_266,h_212,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/THANK%20YOU%20MOCKUP.png`,
    slug: "thank-you-gift-card",
  },
  {
    label: "Congratulations",
    img: `${WIX}/f940f0_549f167b43be4ec3bada379f4f773887~mv2.png/v1/crop/x_0,y_42,w_1032,h_822/fill/w_266,h_212,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/CONGRATS%20MOCKUP.png`,
    slug: "congratulations-gift-card",
  },
  {
    label: "mother's day",
    img: `${WIX}/f940f0_2552ef22faf24eacb8d008ba0e8113b0~mv2.png/v1/crop/x_0,y_42,w_1032,h_822/fill/w_266,h_212,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/MOTHERS%20DAY%20MOCKUP.png`,
    slug: "mother-s-day-gift-card",
  },
  {
    label: "father's day",
    img: `${WIX}/f940f0_cbabc7494f2449da92eeb7ad2085e700~mv2.png/v1/crop/x_0,y_42,w_1032,h_822/fill/w_266,h_212,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/FATHERS%20DAY%20MOCKUP.png`,
    slug: "father-s-day-gift-card",
  },
  {
    label: "wedding gift",
    img: `${WIX}/f940f0_6873f520edf34f42818595ca218b6d77~mv2.png/v1/crop/x_0,y_59,w_996,h_793/fill/w_266,h_212,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/WEDDING%20MOCKUP.png`,
    slug: "wedding-gift-card",
  },
  {
    label: "Anniversary",
    img: `${WIX}/f940f0_a0e8f587ae9b4b58b648dfb12532fa1c~mv2.png/v1/crop/x_0,y_42,w_1032,h_822/fill/w_266,h_212,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/ANNIVERSARY%20MOCKUP.png`,
    slug: "anniversary-gift-card",
  },
  {
    label: "honeymoon",
    img: `${WIX}/f940f0_1d2287920f964541acfa5642cab727c9~mv2.png/v1/crop/x_0,y_42,w_1032,h_822/fill/w_266,h_212,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/HONEYMOON%20MOCKUP.png`,
    slug: "honeymoon-gift-card",
  },
  {
    label: "valentine's day",
    img: `${WIX}/f940f0_c45cbf000501434e8092bc963203ceb7~mv2.png/v1/crop/x_0,y_42,w_1032,h_822/fill/w_266,h_212,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/VALENTINES%20MOCKUP.png`,
    slug: "valentine-s-day-gift-card",
  },
  {
    label: "easter",
    img: `${WIX}/f940f0_d8aa6bd6f72940b39ee67ab5495be940~mv2.png/v1/crop/x_0,y_42,w_1032,h_822/fill/w_266,h_212,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/EASTER%20MOCKUP.png`,
    slug: "easter-gift-card",
  },
  {
    label: "christmas",
    img: `${WIX}/f940f0_8562944691c046368f8b18db77e996bb~mv2.png/v1/crop/x_0,y_42,w_1032,h_822/fill/w_266,h_212,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/CHRISTMAS%20MOCKUP.png`,
    slug: "christmas-gift-card",
  },
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
                <img src={HERO_IMG} alt="Carisma Aesthetics gift card" className="w-full" style={{ display: "block", aspectRatio: "513 / 451", objectFit: "cover" }} />
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
                    src={o.img}
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
