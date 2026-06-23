import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import WhyGiftStrip from "@/components/gifts/WhyGiftStrip";
import GiftSocialProof from "@/components/gifts/GiftSocialProof";
import GiftHowItWorks from "@/components/gifts/GiftHowItWorks";
import GiftFaq from "@/components/gifts/GiftFaq";
import GiftFinalCta from "@/components/gifts/GiftFinalCta";
import GiftHeroCards from "@/components/gifts/GiftHeroCards";
import { giftFaqs } from "@/components/gifts/giftFaqData";

export const metadata: Metadata = {
  title: "E-Gift Vouchers | Carisma Aesthetics - #1 Award Winning Chain in Malta",
  description: "Give the gift of glowing skin. Carisma Aesthetics gift vouchers for any treatment — delivered digitally. Perfect for any occasion.",
  alternates: {
    canonical: "https://www.carismaaesthetics.com/e-giftcards-vouchers",
  },
  openGraph: {
    title: "E-Gift Vouchers | Carisma Aesthetics - #1 Award Winning Chain in Malta",
    description: "Give the gift of glowing skin. Carisma Aesthetics gift vouchers for any treatment — delivered digitally. Perfect for any occasion.",
    url: "https://www.carismaaesthetics.com/e-giftcards-vouchers",
    siteName: "Carisma Aesthetics",
    type: "website",
    images: [
      {
        url: "/og-aesthetics.jpg",
        width: 1200,
        height: 630,
        alt: "Carisma Aesthetics e-gift voucher",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "E-Gift Vouchers | Carisma Aesthetics - #1 Award Winning Chain in Malta",
    description: "Give the gift of glowing skin. Carisma Aesthetics gift vouchers for any treatment — delivered digitally. Perfect for any occasion.",
    images: ["/og-aesthetics.jpg"],
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: giftFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function GiftsPage() {
  return (
    <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
        />
        {/* ===== HERO ===== */}
        <PageHero
          badge="#1 Voted Med-Aesthetics Clinic in Malta"
          headline={[
            { text: "Give the gift" },
            { text: "of Aesthetics", em: true },
          ]}
          sub="In 3 easy steps, you can invite your loved ones on a journey of relaxation and wellness in Malta that they will never forget."
          bullets={[
            { label: "01", text: "Pick the Occasion" },
            { label: "02", text: "Select Your Gift" },
            { label: "03", text: "Customise Your Message" },
          ]}
          primaryCta={{ text: "Shop Gift Cards", href: "#pick-occasion" }}
          secondaryCta={{ text: "How It Works", href: "#how-it-works" }}
          media={{
            type: "image",
            src: HERO_IMG,
            fit: "contain",
            bg: "#f6efe6",
            alt: "Carisma Aesthetics gift voucher",
          }}
          mediaSlot={<GiftHeroCards />}
          proof={{
            rating: "4.9",
            reviews: "200+",
            statValue: "30+",
            statLabel: "years in wellness",
            awardText: "#1 Voted Clinic\nMalta Healthcare Awards",
          }}
        />

        {/* ===== WHY A CARISMA GIFT — value pillars (replaces the old one-line note) ===== */}
        <WhyGiftStrip />

        {/* ===== PICK YOUR OCCASION ===== */}
        <section
          id="pick-occasion"
          aria-labelledby="occasions-heading"
          style={{ padding: "30px 0 90px", scrollMarginTop: "var(--nav-clear)" }}
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
                color: "var(--label)",
                lineHeight: 1.7,
              }}
            >
              E-gift vouchers are non-refundable and cannot be exchanged for cash.
              Valid for 12 months from purchase date at all Carisma Aesthetics locations in Malta.
            </p>
          </div>
        </section>

        {/* ===== SOCIAL PROOF — real 4.9★ / 200+ reviews ===== */}
        <GiftSocialProof />

        {/* ===== HOW IT WORKS — 3 steps + redemption (hero secondary CTA anchor) ===== */}
        <div id="how-it-works" style={{ scrollMarginTop: "var(--nav-clear)" }}>
          <GiftHowItWorks />
        </div>

        {/* ===== FAQ — gift-card objections (FAQPage JSON-LD emitted above) ===== */}
        <GiftFaq />

        {/* ===== FINAL CTA — re-offer → #pick-occasion ===== */}
        <GiftFinalCta />
    </main>
  );
}
