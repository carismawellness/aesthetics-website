import Reveal from "@/components/Reveal";

// Closing CTA band for the gifts page. Emotive headline + one supporting line
// + a single primary teal CTA pointing back to the on-page occasion grid
// (#pick-occasion). Server component — no client JS needed.
export default function GiftFinalCta() {
  return (
    <section aria-labelledby="gift-final-cta-heading" style={{ padding: "0 0 90px" }}>
      <div className="container">
        <Reveal>
          <div
            style={{
              background: "var(--teal-deep)",
              borderRadius: "var(--radius-card)",
              padding: "clamp(40px,6vw,72px) clamp(24px,5vw,64px)",
              textAlign: "center",
              maxWidth: "920px",
              margin: "0 auto",
            }}
          >
            {/* Eyebrow */}
            <p
              className="font-display"
              style={{
                fontSize: "clamp(11px,1.6vw,13px)",
                color: "#ffffff",
                opacity: 0.85,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: "16px",
              }}
            >
              The Gift of Glow
            </p>

            {/* Emotive headline — white on --teal-deep (#4f7373 = 4.7:1, passes AA) */}
            <h2
              id="gift-final-cta-heading"
              className="font-serif"
              style={{
                fontSize: "clamp(28px,4.5vw,44px)",
                lineHeight: 1.15,
                color: "#ffffff",
                margin: 0,
              }}
            >
              Give a gift she&rsquo;ll never forget
            </h2>

            {/* Supporting line */}
            <p
              style={{
                fontSize: "clamp(15px,1.9vw,18px)",
                lineHeight: 1.7,
                color: "#ffffff",
                opacity: 0.92,
                maxWidth: "560px",
                margin: "18px auto 0",
              }}
            >
              One thoughtful voucher, endless ways to glow. She chooses the
              treatment she&rsquo;ll love — you give the confidence that comes with it.
            </p>

            {/* Primary CTA → on-page occasion grid */}
            <div style={{ marginTop: "32px" }}>
              <a
                href="#pick-occasion"
                className="btn btn-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#4f7373]"
              >
                Shop Gift Cards
              </a>
            </div>

            {/* Reassurance microcopy under the button */}
            <p
              className="font-display"
              style={{
                marginTop: "20px",
                fontSize: "11px",
                color: "#ffffff",
                opacity: 0.8,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Delivered instantly by email · Valid 12 months
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
