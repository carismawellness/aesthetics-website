import Hero from "@/components/home/Hero";
import ServicesMarquee from "@/components/home/ServicesMarquee";
import WhyUs from "@/components/home/WhyUs";
import BookConsultation from "@/components/home/BookConsultation";

// Reviews, doctors, and the award blurb render in the global Footer
// (live shows that stack at the end of every page, including home).
export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesMarquee />
      <WhyUs />
      <BookConsultation />
    </>
  );
}
