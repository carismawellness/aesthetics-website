import Hero from "@/components/pico/Hero";
import Reviews from "@/components/pico/Reviews";
import DoYouHave from "@/components/pico/DoYouHave";
import TrustedFeatures from "@/components/pico/TrustedFeatures";
import Because from "@/components/pico/Because";
import Commitment from "@/components/pico/Commitment";
import Secure from "@/components/pico/Secure";
import FadeInk from "@/components/pico/FadeInk";
import Redefined from "@/components/pico/Redefined";
import Pricing from "@/components/pico/Pricing";
import WhatToExpect from "@/components/pico/WhatToExpect";
import Faq from "@/components/pico/Faq";
import WhyCarisma from "@/components/pico/WhyCarisma";
export default function PicoLaserPage() {
  return (
    <div style={{ backgroundImage: "url('/assets/hero-bg.png')", backgroundSize: "cover", backgroundAttachment: "fixed", backgroundPosition: "top center" }}>
      <Hero />
      <Reviews />
      <DoYouHave />
      <TrustedFeatures />
      <Because />
      <Commitment />
      <Secure />
      <FadeInk />
      <Redefined />
      <Pricing />
      <WhatToExpect />
      <Faq />
      <WhyCarisma />
    </div>
  );
}
