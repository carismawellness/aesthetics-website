import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/treatment/SectionHeader";

/*
  DoctorCard — a "doctor-led care" section for the Carisma Aesthetics treatment
  template. Server component (no client state). Harvested from the ExpertCare
  ("Led by expertise") doctor block in components/MedicalWeightLossPage.tsx —
  same 2-col layout (arch-radius headshot left, name/title/credentials/bio/
  pull-quote/CTA right) — but restyled to the shared aesthetics light palette
  (design tokens) and fronted by <SectionHeader>.

  Light card only: white surface, --radius-card, soft teal shadow. The headshot
  carries an organic arch radius. Heading is Trajan/--gold, the role label is
  Novecento/--teal-text, ticks/CTA use --teal-deep, body is --ink-soft. The
  whole card gently lifts on hover, gated behind prefers-reduced-motion.
*/

type Props = {
  kicker?: string;
  heading?: string;
  name: string;
  title: string;
  credentials?: string[];
  image: string;
  quote?: string;
  bio?: string[];
};

function Tick() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--teal-deep)"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{ flexShrink: 0, marginTop: 2 }}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function DoctorCard({
  kicker = "Meet your doctor",
  heading = "Doctor-led care",
  name,
  title,
  credentials,
  image,
  quote,
  bio,
}: Props) {
  return (
    <section style={{ padding: "clamp(44px,8vw,80px) 0" }}>
      <div className="container">
        <SectionHeader kicker={kicker} title={heading} />

        <Reveal>
          {/* Scoped: collapse the 2-col card to a single column below 860px,
              and only lift on hover where motion is welcome. */}
          <style>{`
            .doctor-card {
              display: grid;
              grid-template-columns: minmax(0, 400px) minmax(0, 1fr);
              gap: clamp(28px, 4vw, 56px);
              align-items: center;
              max-width: 1040px;
              margin: clamp(36px, 5vh, 56px) auto 0;
              background: var(--white);
              border: 1px solid var(--line);
              border-radius: var(--radius-card);
              padding: clamp(24px, 3.4vw, 44px);
              box-shadow: 0 18px 50px rgba(var(--teal-deep-rgb), 0.12);
              transition: transform 0.4s ease, box-shadow 0.4s ease;
            }
            @media (max-width: 860px) {
              .doctor-card { grid-template-columns: 1fr; text-align: center; }
              .doctor-card__media { max-width: 320px; margin-inline: auto; }
              .doctor-card__creds { display: inline-flex; text-align: left; }
              .doctor-card__quote { text-align: left; }
            }
            @media (prefers-reduced-motion: no-preference) {
              .doctor-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 26px 60px rgba(var(--teal-deep-rgb), 0.18);
              }
            }
          `}</style>

          <div className="doctor-card">
            {/* LEFT — headshot in an organic arch radius */}
            <div
              className="doctor-card__media"
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "4 / 5",
                borderRadius: "200px 200px 24px 24px",
                overflow: "hidden",
                background: "var(--teal-100)",
                boxShadow: "0 14px 36px rgba(var(--teal-deep-rgb), 0.16)",
              }}
            >
              <Image
                src={image}
                alt={`${name} — ${title} at Carisma Aesthetics, Malta`}
                fill
                sizes="(max-width: 860px) 320px, 400px"
                style={{ objectFit: "cover" }}
              />
            </div>

            {/* RIGHT — name, title, credentials, bio, pull-quote, CTA */}
            <div>
              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(22px, 3vw, 30px)",
                  color: "var(--gold)",
                  letterSpacing: "0.04em",
                  fontWeight: 400,
                  lineHeight: 1.3,
                  margin: 0,
                }}
              >
                {/* E-E-A-T: Elevate credentials to heading hierarchy */}
                {name}
                {credentials && credentials.length > 0 && (
                  <>
                    <br />
                    <span
                      className="font-display"
                      style={{
                        fontSize: 12.5,
                        color: "var(--teal-text)",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        display: "block",
                        marginTop: 10,
                      }}
                    >
                      {title} Specializing in {credentials[0]}
                    </span>
                  </>
                )}
                {!credentials && (
                  <>
                    <br />
                    <span
                      className="font-display"
                      style={{
                        fontSize: 12.5,
                        color: "var(--teal-text)",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        display: "block",
                        marginTop: 10,
                      }}
                    >
                      {title}
                    </span>
                  </>
                )}
              </h2>

              {credentials && credentials.length > 0 && (
                <ul
                  className="doctor-card__creds"
                  style={{
                    listStyle: "none",
                    margin: "20px 0 0",
                    padding: 0,
                    display: "grid",
                    gap: 10,
                  }}
                >
                  {credentials.map((c) => (
                    <li
                      key={c}
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "flex-start",
                        fontSize: 14.5,
                        lineHeight: 1.5,
                        color: "var(--ink-soft)",
                      }}
                    >
                      <Tick />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              )}

              {bio?.map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: 15.5,
                    lineHeight: 1.7,
                    color: "var(--ink-soft)",
                    margin: i === 0 ? "20px 0 0" : "14px 0 0",
                    textWrap: "pretty",
                  }}
                >
                  {para}
                </p>
              ))}

              {quote && (
                <blockquote
                  className="font-serif doctor-card__quote"
                  style={{
                    fontStyle: "italic",
                    fontSize: "clamp(17px, 2.2vw, 22px)",
                    color: "var(--gold)",
                    lineHeight: 1.5,
                    margin: "24px 0 0",
                    paddingLeft: 18,
                    borderLeft: "2px solid var(--teal-deep)",
                    textWrap: "pretty",
                  }}
                >
                  {quote}
                </blockquote>
              )}

              <div style={{ marginTop: 28 }}>
                <Link
                  href="/consultation"
                  className="btn btn-teal"
                  style={{ borderRadius: 999, padding: "15px 30px" }}
                >
                  Book Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
