import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap" />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
