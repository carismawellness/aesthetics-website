import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import ServicesMarquee from "@/components/home/ServicesMarquee";
import WhyUs from "@/components/home/WhyUs";
import BookConsultation from "@/components/home/BookConsultation";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Carisma Aesthetics | Medical Aesthetic Clinic Malta",
  description: "Medical aesthetics in Malta led by medically qualified practitioners. Botox from €59, lip fillers from €219. Natural results, consultation-first approach. Book today.",
  alternates: {
    canonical: "https://www.carismaaesthetics.com/",
  },
  openGraph: {
    title: "Carisma Aesthetics | Medical Aesthetic Clinic Malta",
    description: "Medical aesthetics in Malta led by medically qualified practitioners. Botox from €59, lip fillers from €219. Natural results, consultation-first.",
    url: "https://www.carismaaesthetics.com/",
    type: "website",
    images: [{ url: "/og-aesthetics.jpg", width: 1200, height: 630, alt: "Carisma Aesthetics Malta" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carisma Aesthetics | Medical Aesthetic Clinic Malta",
    description: "Medical aesthetics in Malta led by medically qualified practitioners. Botox from €59, lip fillers from €219. Natural results, consultation-first.",
    images: ["/og-aesthetics.jpg"],
  },
};

// Reviews, doctors, and the award blurb render in the global Footer
// (live shows that stack at the end of every page, including home).
export default function HomePage() {
  return (
    <main>
      <Hero />
      <Reveal><ServicesMarquee /></Reveal>
      <Reveal><WhyUs /></Reveal>
      <Reveal><BookConsultation /></Reveal>
    </main>
  );
}
