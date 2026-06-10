import Hero from "@/components/home/Hero";
import ServicesMarquee from "@/components/home/ServicesMarquee";
import WhyUs from "@/components/home/WhyUs";
import BookConsultation from "@/components/home/BookConsultation";
import Reviews from "@/components/home/Reviews";
import AwardSection from "@/components/home/AwardSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesMarquee />
      <WhyUs />
      <BookConsultation />
      <Reviews />
      <AwardSection />
    </>
  );
}
