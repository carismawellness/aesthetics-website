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

/*
  Pico laser tattoo removal page — a section-faithful recreation of the live
  carismaaesthetics.com/pico-laser-tattoo-removal page. Each section lives in its
  own component under components/pico/ (built section-by-section against the live
  page). Live order: hero, reviews, do-you-have-a-tattoo, trusted+features,
  because, commitment, secure, fade-ink, redefined, pricing, what-to-expect,
  faq, why-carisma. The global Header/Footer wrap this via the layout.
*/
export default function PicoLaserPage() {
  return (
    <>
      <Hero />

      {/* flat soft blue-grey behind the rest of the page (matches live) */}
      <div style={{ background: "#eaeff3" }}>
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
    </>
  );
}
