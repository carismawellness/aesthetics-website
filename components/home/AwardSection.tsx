import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function AwardSection() {
  return (
    <section aria-labelledby="award-heading" style={{ padding: "60px 0", backgroundColor: "var(--white)" }}>
      <Reveal className="container">
        <div
          className="mx-auto flex flex-col sm:flex-row items-center justify-center"
          style={{ maxWidth: "860px", gap: "clamp(32px,6vw,90px)" }}
        >
          <Image
            src="/assets/awards-logo.png"
            alt="Malta Healthcare Awards logo"
            width={205}
            height={205}
            style={{ width: "205px", height: "auto", flexShrink: 0 }}
          />
          <div className="text-center sm:text-left" style={{ maxWidth: "380px" }}>
            <h2
              id="award-heading"
              style={{ fontFamily: "'Roboto Local', sans-serif", fontSize: "19px", fontWeight: 700, color: "var(--teal-deep)", letterSpacing: "0.01em", lineHeight: 1.35, textTransform: "none" }}
            >
              #1 Voted Med-Aesthetics Clinic in Malta
            </h2>
            {/* P1: var(--gold) = #706552 — passes 4.5:1 on white */}
            <p style={{ marginTop: "12px", fontSize: "14px", lineHeight: 1.85, color: "var(--gold)" }}>
              At Carisma Aesthetics, we bring over 30 years of expertise in wellness and aesthetics. Guided by medical excellence and a passion for confidence, our treatments are designed to help you look and feel your best.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
