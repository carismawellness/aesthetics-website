import { A, Cta, Dot } from "./_shared";

const BECAUSE = [
  "Because your tattoo no longer reflects who you are today.",
  "Because you want a careful, professional approach — not harsh or rushed treatment.",
  "Because Pico laser technology helps target pigment with focused precision.",
  "Because every tattoo is different, and your treatment plan should be too.",
  "Because you deserve honest guidance, realistic expectations, and expert aftercare from start to finish.",
];

export default function Because() {
  return (
    <section style={{ background: "#ffffff", padding: "60px 0" }}>
      <div className="mx-auto" style={{ maxWidth: "1040px", padding: "0 24px" }}>
        <h2
          className="font-serif text-center"
          style={{
            fontSize: "clamp(22px,3vw,30px)",
            color: "var(--teal)",
            letterSpacing: "0.06em",
            lineHeight: 1.3,
            fontWeight: 400,
            marginBottom: "40px",
          }}
        >
          safe, confident tattoo removal starts here.
        </h2>

        <div className="grid lg:grid-cols-2 items-center gap-12">
          {/* LEFT: bullet list + CTA */}
          <div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {BECAUSE.map((item) => (
                <li
                  key={item}
                  className="flex items-start"
                  style={{ gap: "12px", marginBottom: "14px" }}
                >
                  <Dot />
                  <span
                    style={{
                      color: "var(--label)",
                      fontSize: "15px",
                      lineHeight: 1.6,
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: "24px" }}>
              <Cta label="ClaimTatto Removal Over 50% Off" />
            </div>
          </div>

          {/* RIGHT: square content photo */}
          <div>
            <img
              src={`${A}/pico-because-man-arm-tattoo.png`}
              alt="Young man in a sleeveless tank top with a tattoo on his upper arm, considering tattoo removal"
              style={{
                width: "100%",
                aspectRatio: "1 / 1",
                objectFit: "cover",
                borderRadius: "12px",
                boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
                display: "block",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
