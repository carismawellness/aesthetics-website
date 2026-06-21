import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { Pinyon_Script } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WidowGuard from "@/components/WidowGuard";
import SmoothScroll from "@/components/motion/SmoothScroll";

const pinyonScript = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pinyon",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.carismaaesthetics.com"),
  title: "Carisma Aesthetics | Medical Aesthetic Clinic Malta",
  description:
    "Medical aesthetics in Malta led by medically qualified practitioners. Botox from €59, lip fillers from €219. Natural results, consultation-first approach. Book today.",
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
      "Medical aesthetics in Malta led by medically qualified practitioners. Botox from €59, lip fillers from €219. Natural results, consultation-first approach. Book today.",
    url: "https://www.carismaaesthetics.com",
    siteName: "Carisma Aesthetics",
    type: "website",
    images: [
      {
        url: "https://static.wixstatic.com/media/87fc13_9b11f1377c0d475ba944da47df67fb9d%7Emv2.png/v1/fit/w_2500,h_1330,al_c/87fc13_9b11f1377c0d475ba944da47df67fb9d%7Emv2.png",
        width: 2500,
        height: 1330,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carisma Aesthetics | Medical Aesthetic Clinic Malta",
    description:
      "Medical aesthetics in Malta led by medically qualified practitioners. Botox from €59, lip fillers from €219. Natural results, consultation-first approach. Book today.",
    images: [
      "https://static.wixstatic.com/media/87fc13_9b11f1377c0d475ba944da47df67fb9d%7Emv2.png/v1/fit/w_2500,h_1330,al_c/87fc13_9b11f1377c0d475ba944da47df67fb9d%7Emv2.png",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`h-full antialiased ${pinyonScript.variable}`}>
      <head>
        {/* Set `js` before paint so scroll-reveal pre-hiding only applies when JS is
            on (no-JS users always see content; no reveal flash). */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
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

        <Header />
        <main className="flex-grow">
          <SmoothScroll>{children}</SmoothScroll>
        </main>
        <Footer />
        {/* Eliminates typographic widows (lone last word) site-wide. */}
        <WidowGuard />

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
