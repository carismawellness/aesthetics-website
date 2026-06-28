import Image from "next/image";
import Reveal from "@/components/Reveal";
import BookingButtons from "@/components/BookingButtons";
import SectionHeading from "@/components/SectionHeading";

const FRESHA_CONSULT =
  "https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2800348&oiid=sv%3A25754425&share=true&pId=2708191";

export default function BookConsultation() {
  return (
    <section aria-labelledby="book-heading" style={{ backgroundColor: "var(--white)", padding: "72px 0 100px" }}>
      <div className="container">
        {/* Heading block (contained, not full-width) — Slimming-style cool teal
            gradient ground (white → light teal), NO warm beige. */}
        <Reveal className="mx-auto" style={{ maxWidth: "960px" }}>
          <div
            className="relative"
            style={{
              background: "linear-gradient(135deg, var(--white) 0%, var(--teal-100) 60%, var(--cream-2) 100%)",
              borderRadius: "var(--radius-card)",
              border: "1px solid rgba(79,115,115,0.14)",
              padding: "48px clamp(28px,5vw,56px) 56px",
              overflow: "hidden",
            }}
          >
            {/* Wave graphic — decorative, no alt needed */}
            <div aria-hidden="true" style={{ position: "absolute", left: 0, bottom: 0, width: "100%", pointerEvents: "none" }}>
              <Image
                src="/assets/treatments/home-book-wave.png"
                alt=""
                role="presentation"
                width={960}
                height={120}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <SectionHeading
              className="relative"
              style={{ zIndex: 1 }}
              id="book-heading"
              title="Book Your Consultation"
              subtitle="Book instantly online or fill in a short form and we'll be in touch"
            />
          </div>
        </Reveal>

        {/* Two-button CTA */}
        <Reveal
          delay={120}
          className="relative mx-auto"
          style={{ maxWidth: "960px", marginTop: "40px", zIndex: 1 }}
        >
          <BookingButtons
            freshaHref={FRESHA_CONSULT}
            primaryLabel="Book Appointment"
            consultLabel="Book Free Consultation"
          />
        </Reveal>
      </div>
    </section>
  );
}
