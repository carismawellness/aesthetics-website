import type { Metadata } from "next";
import "./globals.css";
import "./effects.css";
import Script from "next/script";
import { Pinyon_Script } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WidowGuard from "@/components/WidowGuard";
import MediaLegibilityGuard from "@/components/MediaLegibilityGuard";
import PageLoader from "@/components/PageLoader";
import ConsultationModal from "@/components/ConsultationModal";
import StickyBookingBar from "@/components/StickyBookingBar";

const pinyonScript = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pinyon",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.carismaaesthetics.com"),
  title: {
    template: "%s | Carisma Aesthetics",
    default: "Carisma Aesthetics | Medical Aesthetic Clinic Malta",
  },
  description:
    "Medical aesthetics in Malta led by medically qualified practitioners. Botox from €59, lip fillers from €219. Natural results, consultation-first.",
  keywords:
    "aesthetics Malta, botox Malta, dermal fillers Malta, lip fillers Malta, hydrafacial Malta, laser hair removal Malta, med-aesthetics clinic Malta",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
    shortcut: "/favicon.png",
  },
  openGraph: {
    title: "Carisma Aesthetics | Medical Aesthetic Clinic Malta",
    description:
      "Medical aesthetics in Malta led by medically qualified practitioners. Botox from €59, lip fillers from €219. Natural results, consultation-first.",
    url: "https://www.carismaaesthetics.com",
    siteName: "Carisma Aesthetics",
    type: "website",
    locale: "en_MT",
    images: [
      {
        url: "/og-aesthetics.png",
        width: 1277,
        height: 1330,
        alt: "Carisma Aesthetics — Glow with Confidence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carisma Aesthetics | Medical Aesthetic Clinic Malta",
    description:
      "Medical aesthetics in Malta led by medically qualified practitioners. Botox from €59, lip fillers from €219. Natural results, consultation-first.",
    images: ["/og-aesthetics.png"],
  },
};

const siteSchema = {
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "HealthAndBeautyBusiness"],
  "name": "Carisma Aesthetics",
  "alternateName": "#1 Award Winning Medical Aesthetic Clinic Malta",
  "description": "Medical aesthetics in Malta led by medically qualified practitioners. Botox, dermal fillers, laser hair removal, and more.",
  "url": "https://www.carismaaesthetics.com",
  "telephone": "+35627802062",
  "email": "info@carismaaesthetics.com",
  "priceRange": "€€€",
  "currenciesAccepted": "EUR",
  "paymentAccepted": "Cash, Credit Card",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Triq il-Kbira",
    "addressLocality": "Birkirkara",
    "addressRegion": "MT",
    "postalCode": "BKR 1104",
    "addressCountry": "MT",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 35.8942,
    "longitude": 14.4636,
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    "opens": "09:00",
    "closes": "19:00",
  },
  "sameAs": [
    "https://www.instagram.com/carisma.aesthetics",
    "https://www.facebook.com/CarismaAesthetics",
  ],
  "medicalSpecialty": "Medical Aesthetics",
  "availableService": [
    {"@type": "MedicalTherapy", "name": "Botox Anti-Wrinkle Injections"},
    {"@type": "MedicalTherapy", "name": "Dermal Fillers"},
    {"@type": "MedicalTherapy", "name": "Lip Fillers"},
    {"@type": "MedicalTherapy", "name": "Laser Hair Removal"},
    {"@type": "MedicalTherapy", "name": "HydraFacial"},
    {"@type": "MedicalTherapy", "name": "Microneedling"},
    {"@type": "MedicalTherapy", "name": "Chemical Peels"},
    {"@type": "MedicalTherapy", "name": "GLP-1 Medical Weight Loss"},
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`h-full antialiased ${pinyonScript.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema).replace(/</g, '\\u003c') }}
        />

        {/* Preload critical self-hosted fonts */}
        <link rel="preload" as="font" href="/assets/fonts/novecento-wide-book.woff2" type="font/woff2" crossOrigin="" />
        <link rel="preload" as="font" href="/assets/fonts/trajan-pro.woff2" type="font/woff2" crossOrigin="" />

        {/* Google Tag Manager */}
        <Script id="gtm-head" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-T3ZJC949');
        `}</Script>

        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-MKGQE17SN7" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-MKGQE17SN7');
        `}</Script>
      </head>
      <body className="min-h-full flex flex-col">
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T3ZJC949"
            height="0" width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* First-load loader (native scroll — no scroll-jacking) */}
        <PageLoader />

        {/* Single site-wide skip link — visually hidden until keyboard-focused,
            jumps to the page's <main>. Inline styles guarantee the off-screen
            hidden state regardless of utility-class availability. */}
        <a href="#main" className="skip-link">Skip to main content</a>

        <Header />
        {/* Skip-link target + flex wrapper. A plain div (not <main>) so pages
            that render their own <main> landmark don't produce a nested one. */}
        <div id="main" tabIndex={-1} className="flex-grow" style={{ outline: "none" }}>{children}</div>
        <Footer />
        {/* Eliminates typographic widows (lone last word) site-wide. */}
        <WidowGuard />
        {/* Guarantees text stays legible over any video/photo media. */}
        <MediaLegibilityGuard />
        {/* Site-wide consultation popup. Mounted once; intercepts every
            "/consultation" + fresha book-now CTA and opens the GHL form modal. */}
        <ConsultationModal />
        {/* Site-wide sticky Liquid Gloss booking bar — shows on every Face/Body/Packages dropdown page. */}
        <StickyBookingBar />

        {/* GHL form embed */}
        <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
        {/* Zoho SalesIQ live chat */}
        <Script
          src="https://salesiq.zohopublic.eu/widget?wc=siqe6e51d1708cab04770be4f5ea650f0521bf4a11c156999fedb6a0ec11f0d0d48"
          strategy="lazyOnload"
          id="zsiqscript"
        />
      </body>
    </html>
  );
}
