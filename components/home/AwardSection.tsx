import Reveal from "@/components/Reveal";

export default function AwardSection() {
  return (
    <section style={{ padding: "60px 0", backgroundColor: "var(--white)" }}>
      <Reveal className="container">
        <div
          className="mx-auto flex flex-col sm:flex-row items-center gap-8"
          style={{ maxWidth: "860px" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/awards-logo.png"
            alt="Malta Healthcare Awards"
            style={{ width: "110px", height: "auto", flexShrink: 0 }}
          />
          <div className="text-center sm:text-left">
            <h2
              className="font-display"
              style={{ fontSize: "20px", fontWeight: 700, color: "#96b2b2", letterSpacing: "0.06em", lineHeight: 1.35 }}
            >
              #1 Voted Med-Aesthetics Clinic in Malta
            </h2>
            <p style={{ marginTop: "14px", fontSize: "15px", lineHeight: 1.8, color: "#9b8d83" }}>
              At Carisma Aesthetics, we bring over 30 years of expertise in wellness and aesthetics. Guided by medical excellence and a passion for confidence, our treatments are designed to help you look and feel your best.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
