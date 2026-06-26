import type { Metadata } from "next";
import { CONTACT } from "@/lib/site";
import Hero from "@/components/home/Hero";
import ServicesMarqueeElevated from "@/components/home/ServicesMarqueeElevated";
import WhyMaltaAesthetics from "@/components/home/WhyMaltaAesthetics";
import ResultsCommitment from "@/components/home/ResultsCommitment";
import ConsultationProcess from "@/components/home/ConsultationProcess";
import MembershipSummary from "@/components/home/MembershipSummary";
import GiftCardsSummary from "@/components/home/GiftCardsSummary";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Carisma Aesthetics | Medical Aesthetic Clinic Malta",
  description: "Medical aesthetics in Malta led by medically qualified practitioners. Botox from €59, lip fillers from €219. Natural results, consultation-first. Book today.",
  alternates: {
    canonical: "https://www.carismaaesthetics.com/",
  },
  openGraph: {
    title: "Carisma Aesthetics | Medical Aesthetic Clinic Malta",
    description: "Medical aesthetics in Malta led by medically qualified practitioners. Botox from €59, lip fillers from €219. Natural results, consultation-first.",
    url: "https://www.carismaaesthetics.com/",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Carisma Aesthetics Malta" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carisma Aesthetics | Medical Aesthetic Clinic Malta",
    description: "Medical aesthetics in Malta led by medically qualified practitioners. Botox from €59, lip fillers from €219. Natural results, consultation-first.",
    images: ["/opengraph-image"],
  },
};

// Reviews, doctors, and the award blurb render in the global Footer
// (live shows that stack at the end of every page, including home).
export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalBusiness"],
    name: "Carisma Aesthetics",
    description: "Medical aesthetic clinic in Malta offering Botox, lip fillers, and advanced aesthetic treatments by medically qualified practitioners.",
    image: "https://www.carismaaesthetics.com/opengraph-image",
    url: "https://www.carismaaesthetics.com/",
    areaServed: "Malta",
    telephone: CONTACT.tel,
    priceRange: "€59 - €500+",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: 100,
      bestRating: "5",
      worstRating: "1",
    },
    offers: [
      {
        "@type": "Offer",
        name: "Botox",
        price: "59",
        priceCurrency: "EUR",
        description: "Professional Botox treatments for natural results",
        areaServed: "Malta",
      },
      {
        "@type": "Offer",
        name: "Lip Fillers",
        price: "219",
        priceCurrency: "EUR",
        description: "Lip enhancement and reshaping with premium fillers",
        areaServed: "Malta",
      },
    ],
    sameAs: [
      "https://www.instagram.com/carismaaesthetics/",
      "https://www.facebook.com/carismaaesthetics/",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main>
        <Hero />
        {/* One continuous, intentional canvas for the whole mid-page scroll. The ground
            is predominantly WHITE (only the faintest teal hint), and the "blue" reads as
            a few soft teal accent glows sprinkled tastefully down the page — never a
            heavy wash. Sections below are transparent and sit on this one ground (no hard
            seams); deliberate panels are the only intentional accents on top. */}
        <div
          style={{
            position: "relative",
            background:
              "linear-gradient(180deg, #ffffff 0%, #fbfdfd 50%, #ffffff 100%)",
          }}
        >
          {/* Sprinkled soft-teal accent glows — decorative, behind the content */}
          <div
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}
          >
            <div style={{ position: "absolute", top: "4%", left: "-8%", width: 460, height: 460, borderRadius: "50%", background: "radial-gradient(circle, rgba(150,178,178,0.16) 0%, rgba(150,178,178,0) 70%)", filter: "blur(40px)" }} />
            <div style={{ position: "absolute", top: "34%", right: "-10%", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,115,115,0.10) 0%, rgba(79,115,115,0) 70%)", filter: "blur(50px)" }} />
            <div style={{ position: "absolute", top: "66%", left: "-6%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(150,178,178,0.13) 0%, rgba(150,178,178,0) 70%)", filter: "blur(44px)" }} />
            <div style={{ position: "absolute", top: "88%", right: "-4%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(150,178,178,0.10) 0%, rgba(150,178,178,0) 70%)", filter: "blur(40px)" }} />
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <ServicesMarqueeElevated />
            <Reveal><WhyMaltaAesthetics /></Reveal>
            <Reveal><ResultsCommitment /></Reveal>
            <Reveal><ConsultationProcess /></Reveal>
            <Reveal><MembershipSummary /></Reveal>
            <Reveal><GiftCardsSummary /></Reveal>
          </div>
        </div>
      </main>
    </>
  );
}
