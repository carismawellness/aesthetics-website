import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "E-Gift Vouchers | Carisma Aesthetics - #1 Award Winning Chain in Malta",
  description:
    "Carisma Aesthetics' e-gift vouchers are the perfect present for any occasion. Our premier med aesthetic clinic in Malta offers a range of cosmetic treatments, from Botox and dermal fillers to body contouring and more. Contact us today to purchase your e-gift voucher and give the gift of confidence",
  alternates: {
    canonical: "https://www.carismaaesthetics.com/e-giftcards-vouchers",
  },
  openGraph: {
    title: "E-Gift Vouchers | Carisma Aesthetics - #1 Award Winning Chain in Malta",
    description:
      "Carisma Aesthetics' e-gift vouchers are the perfect present for any occasion. Our premier med aesthetic clinic in Malta offers a range of cosmetic treatments, from Botox and dermal fillers to body contouring and more. Contact us today to purchase your e-gift voucher and give the gift of confidence",
    url: "https://www.carismaaesthetics.com/e-giftcards-vouchers",
    siteName: "Carisma Aesthetics",
    type: "website",
    images: [
      {
        url: "https://static.wixstatic.com/media/f940f0_4d8a80555224470797bd8bb30fed27db~mv2.png/v1/fill/w_1032,h_906,al_c/f940f0_4d8a80555224470797bd8bb30fed27db~mv2.png",
        width: 1032,
        height: 906,
        alt: "Carisma Aesthetics e-gift voucher",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "E-Gift Vouchers | Carisma Aesthetics - #1 Award Winning Chain in Malta",
    description:
      "Carisma Aesthetics' e-gift vouchers are the perfect present for any occasion. Our premier med aesthetic clinic in Malta offers a range of cosmetic treatments, from Botox and dermal fillers to body contouring and more. Contact us today to purchase your e-gift voucher and give the gift of confidence",
    images: [
      "https://static.wixstatic.com/media/f940f0_4d8a80555224470797bd8bb30fed27db~mv2.png/v1/fill/w_1032,h_906,al_c/f940f0_4d8a80555224470797bd8bb30fed27db~mv2.png",
    ],
  },
};

const GOLD = "var(--gold)";
const WIX = "https://static.wixstatic.com/media";

const HERO_IMG =
  `${WIX}/f940f0_4d8a80555224470797bd8bb30fed27db~mv2.png/v1/fill/w_513,h_451,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/f940f0_4d8a80555224470797bd8bb30fed27db~mv2.png`;

const OCCASIONS = [
  {
    label: "Birthday",
    img: `${WIX}/f940f0_6789153569c34bf7a79fe359573ab1ee~mv2.png/v1/crop/x_0,y_42,w_1032,h_822/fill/w_266,h_212,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/BIRTHDAY%20MOCKUP.png`,
    slug: "birthday-gift-card",
  },
  {
    label: "Just For You",
    img: `${WIX}/f940f0_4d8a80555224470797bd8bb30fed27db~mv2.png/v1/crop/x_0,y_42,w_1032,h_822/fill/w_266,h_212,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/JUST%20FOR%20YOU%20MOCKUP.png`,
    slug: "just-for-you-gift-card",
  },
  {
    label: "Thank You",
    img: `${WIX}/f940f0_c67dbfbcc29542c0988949cb4d1735a8~mv2.png/v1/crop/x_0,y_42,w_1032,h_822/fill/w_266,h_212,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/THANK%20YOU%20MOCKUP.png`,
    slug: "thank-you-gift-card",
  },
  {
    label: "Congratulations",
    img: `${WIX}/f940f0_549f167b43be4ec3bada379f4f773887~mv2.png/v1/crop/x_0,y_42,w_1032,h_822/fill/w_266,h_212,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/CONGRATS%20MOCKUP.png`,
    slug: "congratulations-gift-card",
  },
  {
    label: "Mother's Day",
    img: `${WIX}/f940f0_2552ef22faf24eacb8d008ba0e8113b0~mv2.png/v1/crop/x_0,y_42,w_1032,h_822/fill/w_266,h_212,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/MOTHERS%20DAY%20MOCKUP.png`,
    slug: "mother-s-day-gift-card",
  },
  {
    label: "Father's Day",
    img: `${WIX}/f940f0_cbabc7494f2449da92eeb7ad2085e700~mv2.png/v1/crop/x_0,y_42,w_1032,h_822/fill/w_266,h_212,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/FATHERS%20DAY%20MOCKUP.png`,
    slug: "father-s-day-gift-card",
  },
  {
    label: "Wedding Gift",
    img: `${WIX}/f940f0_6873f520edf34f42818595ca218b6d77~mv2.png/v1/crop/x_0,y_59,w_996,h_793/fill/w_266,h_212,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/WEDDING%20MOCKUP.png`,
    slug: "wedding-gift-card",
  },
  {
    label: "Anniversary",
    img: `${WIX}/f940f0_a0e8f587ae9b4b58b648dfb12532fa1c~mv2.png/v1/crop/x_0,y_42,w_1032,h_822/fill/w_266,h_212,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/ANNIVERSARY%20MOCKUP.png`,
    slug: "anniversary-gift-card",
  },
  {
    label: "Honeymoon",
    img: `${WIX}/f940f0_1d2287920f964541acfa5642cab727c9~mv2.png/v1/crop/x_0,y_42,w_1032,h_822/fill/w_266,h_212,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/HONEYMOON%20MOCKUP.png`,
    slug: "honeymoon-gift-card",
  },
  {
    label: "Valentine's Day",
    img: `${WIX}/f940f0_c45cbf000501434e8092bc963203ceb7~mv2.png/v1/crop/x_0,y_42,w_1032,h_822/fill/w_266,h_212,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/VALENTINES%20MOCKUP.png`,
    slug: "valentine-s-day-gift-card",
  },
  {
    label: "Easter",
    img: `${WIX}/f940f0_d8aa6bd6f72940b39ee67ab5495be940~mv2.png/v1/crop/x_0,y_42,w_1032,h_822/fill/w_266,h_212,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/EASTER%20MOCKUP.png`,
    slug: "easter-gift-card",
  },
  {
    label: "Christmas",
    img: `${WIX}/f940f0_8562944691c046368f8b18db77e996bb~mv2.png/v1/crop/x_0,y_42,w_1032,h_822/fill/w_266,h_212,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/CHRISTMAS%20MOCKUP.png`,
    slug: "christmas-gift-card",
  },
];

const PRODUCT = "https://www.carismaaesthetics.com/product-page";

const STEPS = [
  { number: "01", label: "Pick the Occasion" },
  { number: "02", label: "Select Your Gift" },
  { number: "03", label: "Customise Your Message" },
];

export default function GiftsPage() {
  return (
    <>
      {/* Skip to main content — first focusable element (P1 Accessibility) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[#4F7373] focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      <main id="main-content">
        {/* ===== HERO ===== */}
        <section
          aria-labelledby="hero-heading"
          style={{ position: "relative", padding: "0 0 70px" }}
        >
          {/* cream band behind the top of the hero */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "62%",
              background: "var(--cream)",
            }}
            aria-hidden="true"
          />

          <div className="container" style={{ position: "relative" }}>
            <div
              className="grid items-center gap-10 lg:grid-cols-2"
              style={{ paddingTop: "70px" }}
            >
              {/* left: white card with copy */}
              <Reveal>
                <div
                  style={{
                    background: "#fff",
                    padding: "44px 40px 48px",
                    boxShadow: "0 18px 44px rgba(0,0,0,0.07)",
                    borderRadius: "var(--radius-card)",
                  }}
                >
                  <h1
                    id="hero-heading"
                    className="font-display"
                    style={{
                      fontSize: "clamp(26px,3.6vw,40px)",
                      color: GOLD,
                      letterSpacing: "0.08em",
                      fontWeight: 400,
                      lineHeight: 1.3,
                      textTransform: "uppercase",
                    }}
                  >
                    Give the Gift of Aesthetics
                  </h1>

                  {/* Decorative divider */}
                  <div
                    style={{
                      height: "1px",
                      background: GOLD,
                      opacity: 0.5,
                      margin: "20px 0 22px",
                    }}
                    aria-hidden="true"
                  />

                  <p
                    style={{
                      fontSize: "15px",
                      color: "var(--label)",
                      lineHeight: 1.8,
                      marginBottom: "20px",
                    }}
                  >
                    In 3 easy steps, you can invite your loved ones on a journey
                    of relaxation and wellness that they will never forget.
                  </p>

                  {/* Steps list — structured for screen readers */}
                  <ol
                    aria-label="How to purchase a gift voucher"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    {STEPS.map((step) => (
                      <li
                        key={step.number}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            flexShrink: 0,
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            background: "var(--teal)",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "11px",
                            fontWeight: 600,
                            letterSpacing: "0.04em",
                          }}
                        >
                          {step.number}
                        </span>
                        <span
                          style={{
                            fontSize: "14px",
                            color: "var(--label)",
                            lineHeight: 1.6,
                          }}
                        >
                          {step.label}
                        </span>
                      </li>
                    ))}
                  </ol>

                  {/* Primary CTA (P10 — prominent, 48px+ height) */}
                  <a
                    href="#pick-occasion"
                    className="inline-flex items-center justify-center transition-all duration-200 ease-in-out hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    style={{
                      marginTop: "28px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: "48px",
                      padding: "0 28px",
                      background: GOLD,
                      color: "#fff",
                      borderRadius: "var(--radius-card)",
                      fontSize: "13px",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                    aria-label="Browse gift card occasions"
                  >
                    Browse Gift Cards
                  </a>
                </div>
              </Reveal>

              {/* right: framed gift-card image */}
              <Reveal delay={120}>
                <div
                  style={{
                    background: "#f6efe6",
                    padding: "10px",
                    boxShadow: "0 22px 50px rgba(0,0,0,0.12)",
                    borderRadius: "var(--radius-card)",
                  }}
                >
                  {/* P3: next/image with explicit dimensions + priority for hero */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "513 / 451",
                      borderRadius: "calc(var(--radius-card) - 4px)",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={HERO_IMG}
                      alt="Carisma Aesthetics e-gift voucher — the perfect present for any occasion"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ===== HOW IT WORKS — delivery info (P gift cards specific) ===== */}
        <section
          aria-labelledby="how-it-works-heading"
          style={{ padding: "0 0 60px" }}
        >
          <div className="container">
            <div
              style={{
                background: "var(--cream)",
                borderRadius: "var(--radius-card)",
                padding: "32px 24px",
                maxWidth: "760px",
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              <h2
                id="how-it-works-heading"
                className="font-display"
                style={{
                  fontSize: "clamp(14px,2vw,17px)",
                  color: "#4F7373",
                  letterSpacing: "0.12em",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                Delivered by Email · Valid for 12 Months
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--label)",
                  lineHeight: 1.8,
                  maxWidth: "560px",
                  margin: "0 auto",
                }}
              >
                Your e-gift voucher is delivered instantly by email to the
                recipient. It can be redeemed at any Carisma Aesthetics clinic
                in Malta and is valid for 12 months from the date of purchase.
              </p>
            </div>
          </div>
        </section>

        {/* ===== PICK YOUR OCCASION ===== */}
        <section
          id="pick-occasion"
          aria-labelledby="occasions-heading"
          style={{ padding: "30px 0 90px" }}
        >
          <div className="container">
            <h2
              id="occasions-heading"
              className="font-display text-center"
              style={{
                fontSize: "clamp(22px,3vw,32px)",
                color: GOLD,
                letterSpacing: "0.1em",
                fontWeight: 400,
              }}
            >
              {/* P6 Typo fix: "occassion" → "occasion" */}
              Pick Your Occasion
            </h2>

            {/* Decorative underline */}
            <div
              className="mx-auto"
              style={{
                width: "90px",
                height: "1px",
                background: "var(--teal)",
                opacity: 0.5,
                margin: "16px auto 0",
              }}
              aria-hidden="true"
            />

            {/* P5: responsive grid, mobile-first */}
            <ul
              role="list"
              aria-label="Choose a gift card occasion"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mx-auto"
              style={{ maxWidth: "1120px", marginTop: "48px", padding: 0 }}
            >
              {OCCASIONS.map((o, i) => (
                <li key={o.slug}>
                  <Reveal delay={(i % 4) * 70}>
                    {/* P2: min 44×44 tap target; hover/focus/active states */}
                    <a
                      href={`${PRODUCT}/${o.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${o.label} gift card (opens in new tab)`}
                      className="block overflow-hidden group card review-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F7373] focus-visible:ring-offset-2 transition-all duration-200 ease-in-out hover:shadow-lg active:scale-[0.98]"
                      style={{
                        borderRadius: "var(--radius-card)",
                        cursor: "pointer",
                        /* P2: ensure full card is tap target; cards are large enough */
                        minHeight: "44px",
                      }}
                    >
                      {/* P3: next/image replacing <img>, with explicit dimensions */}
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          aspectRatio: "266 / 212",
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          src={o.img}
                          alt={`Carisma Aesthetics ${o.label} gift card`}
                          fill
                          loading="lazy"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="transition-transform duration-500 group-hover:scale-105 motion-safe:transition-transform"
                          style={{ objectFit: "cover" }}
                        />
                      </div>

                      {/* Card label */}
                      <div
                        style={{
                          padding: "14px 16px",
                          textAlign: "center",
                          minHeight: "44px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          className="font-display"
                          style={{
                            fontSize: "12px",
                            /* P1: GOLD on white — check if var(--gold) passes; label uses
                               accessible #4F7373 fallback for decorative text only.
                               Gold is used here as brand colour on card labels (large,
                               display context); card background is white (#fff). */
                            color: GOLD,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                          }}
                        >
                          {o.label}
                        </span>
                      </div>
                    </a>
                  </Reveal>
                </li>
              ))}
            </ul>

            {/* Terms/validity note — visible but secondary (P gift cards specific) */}
            <p
              style={{
                marginTop: "40px",
                textAlign: "center",
                fontSize: "12px",
                color: "#9B8D83",
                lineHeight: 1.7,
              }}
            >
              E-gift vouchers are non-refundable and cannot be exchanged for cash.
              Valid for 12 months from purchase date at all Carisma Aesthetics locations in Malta.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
