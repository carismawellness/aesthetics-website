import { A, Cta } from "./_shared";

// "Do you have a tattoo you no longer want to carry?" section.
// Text left + fade-progression photo right, on the shared marble background.
export default function DoYouHave() {
  return (
    <section style={{ paddingTop: "60px", paddingBottom: "60px" }}>
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* LEFT — text block */}
          <div>
            <p
              className="font-display"
              style={{ fontSize: "18px", color: "var(--gold-deep)", letterSpacing: "0.02em" }}
            >
              so your skin feels like yours again- confidently.
            </p>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(22px,3vw,30px)",
                color: "var(--gold-deep)",
                letterSpacing: "0.06em",
                fontWeight: 400,
                lineHeight: 1.3,
                marginTop: "8px",
              }}
            >
              Do you have a tattoo you no longer want to carry?
            </h2>

            <p style={{ fontSize: "14.5px", color: "var(--label)", lineHeight: 1.8, marginTop: "20px" }}>
              Whether it no longer reflects who you are, has faded over time, or you want to lighten it for a cover-up,
              unwanted ink can feel frustrating. You&rsquo;re not alone &mdash; and safe, gradual tattoo fading is
              possible with the right technology and care.
            </p>
            <p style={{ fontSize: "14.5px", color: "var(--label)", lineHeight: 1.8, marginTop: "14px" }}>
              With our advanced Pico Laser Tattoo Removal treatment, ultra-short laser pulses target unwanted tattoo
              pigment beneath the skin, helping break the ink into tiny particles so your body can naturally clear them
              over time.
            </p>
            <p style={{ fontSize: "14.5px", color: "var(--label)", lineHeight: 1.8, marginTop: "14px" }}>
              Every tattoo is different. Your treatment plan is personalised based on your tattoo size, colour, depth,
              age, skin type, and removal goals to support safer fading and better-looking results.
            </p>
            <p style={{ fontSize: "14.5px", color: "var(--label)", lineHeight: 1.8, marginTop: "14px" }}>
              Your skin has a new story to tell. Let&rsquo;s help you begin it with confidence.
            </p>

            <div style={{ marginTop: "28px" }}>
              <Cta label="Grab This Limited Offer 50% Off" />
            </div>
          </div>

          {/* RIGHT — fade-progression photo */}
          <div>
            <img
              src={`${A}/pico-hero2.png`}
              alt="Tattoo fading over multiple Pico laser sessions"
              className="rounded-xl"
              style={{
                width: "100%",
                objectFit: "cover",
                boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
