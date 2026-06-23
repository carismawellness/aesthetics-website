import Image from "next/image";
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
    <section
      aria-labelledby="because-heading"
      style={{ background: "#ffffff", padding: "60px 0" }}
    >
      <div className="mx-auto" style={{ maxWidth: "1040px", padding: "0 24px" }}>
        <h2
          id="because-heading"
          className="font-serif text-center"
          style={{
            fontSize: "clamp(22px,3vw,30px)",
            color: "#406060",
            letterSpacing: "0.06em",
            lineHeight: 1.3,
            fontWeight: 400,
            marginBottom: "40px",
          }}
        >
          Who Is a Good Candidate for Pico Laser Treatment?
        </h2>

        <div className="grid lg:grid-cols-2 items-center gap-12">
          {/* LEFT: bullet list + CTA */}
          <div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }} role="list">
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
              <Cta label="Claim Tattoo Removal — Over 50% Off" />
            </div>

            {/* Star rating row — accessible */}
            <div
              className="flex items-center"
              style={{ marginTop: "14px", gap: "6px" }}
              role="img"
              aria-label="Rated 4.9 out of 5 stars from over 500 customer reviews"
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <svg
                  key={i}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="#9c8344"
                  aria-hidden="true"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
              <span
                style={{ fontSize: "12px", color: "var(--label)", marginLeft: "4px" }}
                aria-hidden="true"
              >
                4.9/5 from over 500 customer reviews
              </span>
            </div>
          </div>

          {/* RIGHT: square content photo */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "1 / 1",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <Image
              src={`${A}/pico-because-man-arm-tattoo.png`}
              alt="Person with a tattoo on their upper arm considering professional pico laser removal"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              style={{
                objectFit: "cover",
                borderRadius: "12px",
                boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
