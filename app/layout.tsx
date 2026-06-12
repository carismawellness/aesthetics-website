import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { Pinyon_Script } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const pinyonScript = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pinyon",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Carisma Aesthetics | #1 Voted Med-Aesthetics Clinic in Malta",
  description:
    "Carisma Aesthetics is the #1 voted med-aesthetics clinic in Malta. Medically qualified doctors, advanced treatments and personalised plans for face and body.",
  keywords:
    "aesthetics Malta, botox Malta, dermal fillers Malta, lip fillers Malta, hydrafacial Malta, laser hair removal Malta, med-aesthetics clinic Malta",
  icons: { icon: "/assets/logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`h-full antialiased ${pinyonScript.variable}`}>
      <head>
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
        <Script src="https://www.googletagmanager.com/gtag/js?id=GT-KTRJV39" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GT-KTRJV39');
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

        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />

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
