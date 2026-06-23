import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { HOME_SERVICES } from "@/lib/site";

/*
  Medical Aesthetics Procedures — premium treatment-card grid.

  Redesigned (Jun 2026) from the old flat line-art icon grid into elegant
  treatment cards that mirror the Slimming home "treatments" language
  (components/ModalitiesCarousel): real treatment photography, rounded white
  card on a teal-mist ground, soft shadow, the shared doctors-card hover lift
  (.svc-card → translateY + scale + deeper shadow), an image zoom on hover, and
  an "Explore" pill that fills teal with the button-shine line on hover.

  Palette is brand teal only (#4f7373 / #406060 / #96b2b2 / #deebeb), brown copy
  (#706552 / #695c4e), fonts Trajan (name) + Roboto (blurb) + Novecento (CTA).
  All 12 procedures + their treatment-page links are preserved from HOME_SERVICES.
*/
export default function ServicesMarquee() {
  return (
    <section
      aria-labelledby="services-heading"
      style={{
        padding: "clamp(72px,9vw,112px) 0",
        background:
          "linear-gradient(180deg, var(--white) 0%, #f4f8f8 38%, var(--white) 100%)",
      }}
    >
      {/* Scoped interaction styles — hover lift + image zoom + CTA fill/shine.
          color/bg are !important on hover so they beat the inline pill colour
          (otherwise teal text on a teal fill would be invisible). */}
      <style>{`
        .svc-card {
          transition: transform .4s cubic-bezier(.16,1,.3,1),
                      box-shadow .4s ease, border-color .3s ease;
        }
        .svc-img { transition: transform .55s cubic-bezier(.16,1,.3,1); }
        @media (prefers-reduced-motion: no-preference) {
          .svc-card:hover {
            transform: translateY(-6px) scale(1.02);
            border-color: var(--teal-deep);
            box-shadow: 0 4px 10px rgba(12,11,11,0.10),
                        0 26px 60px -12px rgba(28,30,30,0.22);
          }
          .svc-card:hover .svc-img { transform: scale(1.07); }
        }
        .svc-card:hover .svc-explore { background: var(--teal-deep) !important; color: #fff !important; }
        .svc-card:hover .svc-explore span { color: #fff !important; }
        /* CTA shine: a hairline grows from centre on hover (mirrors .btn::after). */
        .svc-explore::after {
          content: ""; position: absolute; left: 50%; bottom: 8px;
          width: 0; height: 2px; background: currentColor;
          transform: translateX(-50%); transition: width .3s ease; pointer-events: none;
        }
        .svc-card:hover .svc-explore::after { width: 46%; }
        @media (prefers-reduced-motion: reduce) {
          .svc-card, .svc-img, .svc-explore::after { transition: none !important; }
        }
      `}</style>

      <div className="container">
        <Reveal>
          <p
            className="font-display text-center"
            style={{
              fontSize: "12px",
              color: "var(--teal-text)",
              letterSpacing: "0.22em",
              fontWeight: 600,
              marginBottom: "14px",
            }}
          >
            Doctor-Led Treatments
          </p>
          <h2
            id="services-heading"
            className="font-serif text-center"
            style={{
              fontSize: "clamp(26px,3.4vw,40px)",
              color: "var(--gold)",
              fontWeight: 400,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              lineHeight: 1.15,
            }}
          >
            Medical Aesthetics Procedures
          </h2>
          <p
            className="text-center mx-auto"
            style={{
              maxWidth: "560px",
              marginTop: "16px",
              color: "var(--label)",
              fontSize: "15px",
              lineHeight: 1.65,
            }}
          >
            A complete menu of advanced, medically supervised treatments — each
            tailored to refresh, restore and let you glow with confidence.
          </p>
          <div
            aria-hidden="true"
            className="mx-auto"
            style={{
              width: "120px",
              height: "1.5px",
              background:
                "linear-gradient(90deg, transparent, var(--brand-teal), transparent)",
              marginTop: "26px",
              marginBottom: "clamp(40px,5vw,56px)",
            }}
          />
        </Reveal>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          style={{ gap: "clamp(18px,2vw,26px)" }}
        >
          {HOME_SERVICES.map((s, i) => (
            <Reveal key={s.href} delay={(i % 4) * 80}>
              <Link
                href={s.href}
                className="svc-card group block"
                aria-label={`Learn more about ${s.label}`}
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  background: "var(--white)",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--radius-card)",
                  overflow: "hidden",
                  boxShadow:
                    "0 1px 2px rgba(12,11,11,0.04), 0 10px 28px rgba(12,11,11,0.07)",
                  textDecoration: "none",
                }}
              >
                {/* Photo */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4 / 3",
                    overflow: "hidden",
                    background: "var(--teal-100)",
                  }}
                >
                  <Image
                    src={s.photo}
                    alt={`${s.label} treatment at Carisma Aesthetics Malta`}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, (max-width:1280px) 33vw, 25vw"
                    className="svc-img"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    loading={i < 4 ? "eager" : "lazy"}
                  />
                  {/* gentle bottom scrim so any future label/legibility holds */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(79,115,115,0) 55%, rgba(64,96,96,0.18) 100%)",
                    }}
                  />
                </div>

                {/* Body */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    padding: "22px 22px 24px",
                  }}
                >
                  <h3
                    className="font-serif"
                    style={{
                      color: "var(--gold)",
                      fontSize: "17px",
                      fontWeight: 400,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      lineHeight: 1.25,
                      margin: "0 0 10px",
                    }}
                  >
                    {s.label}
                  </h3>
                  <p
                    style={{
                      color: "var(--ink-soft)",
                      fontSize: "13.5px",
                      lineHeight: 1.6,
                      margin: "0 0 20px",
                      flex: 1,
                    }}
                  >
                    {s.blurb}
                  </p>
                  <span
                    className="svc-explore font-display"
                    style={{
                      position: "relative",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      alignSelf: "flex-start",
                      minHeight: "44px",
                      padding: "12px 22px",
                      border: "1.5px solid var(--teal-deep)",
                      color: "var(--teal-deep)",
                      fontSize: "11px",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      borderRadius: "var(--radius-pill)",
                      transition: "background 0.3s ease, color 0.3s ease",
                    }}
                  >
                    Explore <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="flex justify-center" style={{ paddingTop: "clamp(48px,6vw,64px)" }}>
          <div aria-hidden="true" style={{ width: "1px", height: "80px", background: "var(--line)" }} />
        </div>
      </div>
    </section>
  );
}
