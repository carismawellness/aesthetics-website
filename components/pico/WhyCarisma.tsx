// "Why Carisma Aesthetics?" section — gold double-frame card.
// Purely typographic: no image assets are used here. The live site delivers the
// eyebrow headline as a rendered PNG text image and the bullets as a checkmark.png
// sprite; both are reproduced here as real styled text + gold round bullets
// (the PNG / checkmark.png are excluded UI sprites, no asset import needed).

const BULLETS = [
  "Team of highly trained and Medically qualified practitioners",
  "Central and discrete location",
  "Flexible scheduling and booking",
  "Personalised treatment plans",
  "Advanced treatments with cutting edge technology",
];

export default function WhyCarisma() {
  return (
    <section style={{ padding: "50px 0 96px" }}>
      <div className="container">
        {/* Eyebrow headline (live: rendered PNG, here: real styled text) */}
        <p
          className="font-display text-center"
          style={{
            fontSize: "clamp(20px,2.4vw,28px)",
            color: "var(--gold)",
            letterSpacing: "0.06em",
            lineHeight: 1.5,
            fontWeight: 400,
            textTransform: "uppercase",
          }}
        >
          <span style={{ fontWeight: 700 }}>#1 award winning</span> chain in Malta with
          <br />
          <span style={{ fontWeight: 700 }}>30+ years</span> in wellness
        </p>

        {/* Gold double-frame card */}
        <div
          style={{
            position: "relative",
            maxWidth: "640px",
            margin: "52px auto 0",
          }}
        >
          {/* Offset back frame (down-and-right) */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              border: "1px solid var(--gold-deep)",
              transform: "translate(16px, 16px)",
              zIndex: 0,
            }}
          />
          {/* White inner card with gold border */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              background: "#fff",
              border: "1px solid var(--gold-deep)",
              padding: "44px 56px 52px",
              overflow: "hidden",
            }}
          >
            {/* Decorative faint gold wave behind the lower list rows */}
            <svg
              aria-hidden
              viewBox="0 0 640 140"
              preserveAspectRatio="none"
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: "24px",
                width: "100%",
                height: "140px",
                opacity: 0.22,
                pointerEvents: "none",
                zIndex: 0,
              }}
            >
              <path
                d="M0 96 C 110 30, 230 30, 340 78 C 440 120, 540 120, 640 60"
                fill="none"
                stroke="var(--gold-deep)"
                strokeWidth="1"
              />
              <path
                d="M0 110 C 110 48, 230 48, 340 92 C 440 130, 540 130, 640 78"
                fill="none"
                stroke="var(--gold-deep)"
                strokeWidth="1"
              />
            </svg>

            <div style={{ position: "relative", zIndex: 1 }}>
              <h2
                className="font-display text-center"
                style={{
                  fontSize: "clamp(20px,2.4vw,26px)",
                  color: "var(--gold)",
                  letterSpacing: "0.1em",
                  fontWeight: 400,
                  textTransform: "uppercase",
                }}
              >
                why carisma aesthetics ?
              </h2>

              {/* Thin gold divider rule */}
              <div
                aria-hidden
                style={{
                  width: "120px",
                  height: "1px",
                  background: "var(--gold-deep)",
                  margin: "16px auto 32px",
                }}
              />

              {/* Bulleted list */}
              <ul style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {BULLETS.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      style={{
                        color: "var(--gold-deep)",
                        fontSize: "9px",
                        lineHeight: 1.9,
                        flexShrink: 0,
                      }}
                    >
                      ●
                    </span>
                    <span
                      className="font-display"
                      style={{
                        fontSize: "14px",
                        color: "var(--gold)",
                        letterSpacing: "0.06em",
                        fontWeight: 400,
                        textTransform: "uppercase",
                        lineHeight: 1.4,
                      }}
                    >
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom-center downward gold caret anchored to the outer frame */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: "50%",
              bottom: "-9px",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "9px solid transparent",
              borderRight: "9px solid transparent",
              borderTop: "9px solid var(--gold-deep)",
              zIndex: 2,
            }}
          />
        </div>
      </div>
    </section>
  );
}
