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
              background: "linear-gradient(160deg, #ffffff 0%, #f3f7f6 55%, var(--cream) 100%)",
              border: "1px solid var(--line)",
              boxShadow: "0 20px 50px rgba(28,30,30,0.07)",
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
                color: "var(--teal-text)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: "16px",
              }}
            >
              The Gift of Glow
            </p>

            {/* Emotive headline — brand gold on the light premium ground */}
            <h2
              id="gift-final-cta-heading"
              className="font-serif"
              style={{
                fontSize: "clamp(28px,4.5vw,44px)",
                lineHeight: 1.15,
                color: "var(--gold)",
                margin: 0,
              }}
            >
              Gift a Carisma Aesthetics Treatment in Malta Today
            </h2>

            {/* Supporting line */}
            <p
              style={{
                fontSize: "clamp(15px,1.9vw,18px)",
                lineHeight: 1.7,
                color: "var(--muted)",
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
                className="btn btn-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--teal-deep)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
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
                color: "var(--label)",
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
