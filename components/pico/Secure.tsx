import { A, Serif, Cta } from "./_shared";
import Reveal from "@/components/Reveal";

const PARAGRAPHS = [
  "Our professional tattoo removal consultation is available for a limited time — once appointments are filled, the next available slots may be later.",
  "Whether you want to fade an old tattoo, prepare for a cover-up, or remove unwanted ink over time, our Pico Laser treatment is designed to target tattoo pigment with focused precision.",
  "During your consultation, we assess your tattoo size, ink colour, depth, skin type, and goals before creating a personalised treatment plan.",
  "No rushed promises — just safe guidance, realistic expectations, and expert care from start to finish.",
];

export default function Secure() {
  return (
    <section style={{ padding: "30px 0 60px" }}>
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* LEFT: heading, copy, CTA */}
          <div>
            <Serif style={{ textAlign: "left" }}>
              SECURE YOUR PICO LASER TATTOO REMOVAL CONSULTATION TODAY
            </Serif>
            {PARAGRAPHS.map((p, i) => (
              <p
                key={i}
                style={{
                  fontSize: "14px",
                  color: "var(--label)",
                  lineHeight: 1.8,
                  marginTop: i ? "12px" : "18px",
                }}
              >
                {p}
              </p>
            ))}
            <div style={{ marginTop: "26px" }}>
              <Cta label="book your tattoo removal now" />
            </div>
          </div>

          {/* RIGHT: consultation photo */}
          <Reveal delay={120}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${A}/pico-secure-consultation.jpg`}
              alt="Pico laser tattoo removal consultation"
              className="w-full rounded-xl"
              style={{
                display: "block",
                objectFit: "cover",
                aspectRatio: "429 / 443",
                boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
              }}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
