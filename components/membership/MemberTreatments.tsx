import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

/* ──────────────────────────────────────────────────────────────────
   MemberTreatments — CRO section for the Glow Club membership rebuild.

   Brand: Carisma Aesthetics ("Glow with Confidence"). Persona Sarah —
   warm, confident, empowering. Cool sage-teal + taupe-gold palette.

   Purpose: show best-selling treatments at MEMBER prices so the 10%
   Glow Club saving feels tangible at the point of decision. Clickable
   .card tiles lift + zoom on hover. Single primary CTA everywhere:
   "Join the Glow Club" → /membership/join.

   All facts faithful to the current MembershipPage.tsx:
   • 10% off all aesthetics & spa services (member discount)
   • 15% off skin care products
   • The four best-selling treatments, labels, hrefs and images.

   WCAG 2.2 AA — every text/UI pair verified with scripts/contrast.mjs:
   • #706552 (gold) on #fff ........... 5.72:1  ✓
   • #406060 (teal-text) on #fff ...... 6.86:1  ✓
   • #406060 on #f7fafa (cream) ....... 5.62:1  ✓
   • #695c4e (label) on #fff .......... 6.48:1  ✓
   • #fff on #4f7373 (teal-deep) ...... 5.21:1  ✓
   • #3f6363 (focus/border UI) on #fff  6.61:1  ✓
   ────────────────────────────────────────────────────────────────── */

const A = "/assets/treatments";
const GOLD = "var(--gold)"; // #706552
const TEAL_TEXT = "var(--teal-text)"; // #406060
const TEAL_DEEP = "var(--teal-deep)"; // #4f7373
const CREAM = "var(--cream)"; // warm ivory #f7fafa (neutral token, remapped off teal)
const FOCUS = "#3f6363"; // teal-deep variant for UI strokes/focus
const JOIN_HREF = "/membership/join";

/* Best-selling treatments — extracted faithfully from MembershipPage.tsx.
   `member` is the verified 10% Glow Club service discount, shown as a
   tangible per-treatment saving rather than a "use it or lose it" perk. */
const TREATMENTS: {
  img: string;
  label: string;
  href: string;
  member: string;
}[] = [
  { img: "mem-botox.png", label: "Botox", href: "/botox-malta", member: "10% off" },
  {
    img: "mem-microneedling.png",
    label: "Microneedling",
    href: "/microneedling-malta",
    member: "10% off",
  },
  {
    img: "mem-dermal.png",
    label: "Dermal Fillers",
    href: "/dermal-fillers-malta",
    member: "10% off",
  },
  {
    img: "mem-lip.png",
    label: "Lip Fillers",
    href: "/lip-fillers-malta",
    member: "10% off",
  },
];

export default function MemberTreatments() {
  return (
    <section
      aria-labelledby="member-treatments-heading"
      style={{ padding: "72px 0" }}
    >
      <div className="container text-center">
        {/* eyebrow + heading + rule + subhead */}
        <Reveal>
          <SectionHeading
            eyebrow="Members glow for less"
            title="Your favourite treatments, at member prices"
            subtitle="Every Glow Club member enjoys 10% off all aesthetic services and 15% off skincare — so the treatments you already love simply cost less, every single visit."
            id="member-treatments-heading"
          />
        </Reveal>

        {/* tile hover + focus styling (lifts + zooms; respects reduced motion) */}
        <style>{`
          .mem-tx-tile { transition: box-shadow 0.25s ease, border-color 0.25s ease; }
          @media (prefers-reduced-motion: no-preference) {
            .mem-tx-tile { transition: box-shadow 0.25s ease, border-color 0.25s ease, transform 0.25s ease; }
            .mem-tx-tile:hover,
            .mem-tx-tile:focus-visible { transform: translateY(-4px) scale(1.02); }
          }
          .mem-tx-tile:hover,
          .mem-tx-tile:focus-visible {
            box-shadow: 0 8px 24px rgba(0,0,0,0.12);
            border-color: ${FOCUS};
            outline: none;
          }
          .mem-tx-tile:focus-visible {
            outline: 2px solid ${FOCUS};
            outline-offset: 2px;
          }
        `}</style>

        {/* treatment tiles */}
        <ul
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 mx-auto"
          style={{
            maxWidth: "1040px",
            marginTop: "44px",
            listStyle: "none",
            padding: 0,
          }}
          aria-label="Best-selling aesthetics treatments available with the Glow Club member discount"
        >
          {TREATMENTS.map((t, i) => (
            <Reveal key={t.label} delay={i * 70}>
              <li>
                <Link
                  href={t.href}
                  className="block overflow-hidden card mem-tx-tile"
                  aria-label={`${t.label} — ${t.member} for Glow Club members. Learn more about this treatment.`}
                  style={{
                    borderRadius: "16px",
                    border: "1px solid #e0e0e0",
                    background: "#fff",
                    display: "block",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      aspectRatio: "5 / 6",
                      width: "100%",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={`${A}/${t.img}`}
                      alt={`${t.label} treatment at Carisma Aesthetics Malta`}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      style={{ objectFit: "cover" }}
                    />
                    {/* member-saving badge — tangible value at a glance */}
                    <span
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: TEAL_DEEP,
                        color: "#fff",
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        padding: "5px 10px",
                        borderRadius: "999px",
                      }}
                    >
                      Members {t.member}
                    </span>
                  </div>
                  <p
                    className="font-display"
                    style={{
                      fontSize: "12px",
                      color: GOLD,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      padding: "14px 10px",
                      background: "#fff",
                      minHeight: "44px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {t.label}
                  </p>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>

        {/* reassurance + primary CTA */}
        <Reveal delay={120}>
          <div
            style={{
              maxWidth: "640px",
              margin: "44px auto 0",
              background: CREAM,
              borderRadius: "18px",
              padding: "28px 24px",
            }}
          >
            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.65,
                color: TEAL_TEXT,
                margin: "0 0 18px",
              }}
            >
              Save a little each month, then spend it on the treatment you
              choose — your balance never expires, and your member discount
              applies the moment you book.
            </p>
            <Link
              href={JOIN_HREF}
              className="btn btn-teal"
              aria-label="Join the Glow Club to unlock member prices on every treatment"
            >
              Join the Glow Club
            </Link>
            <p
              style={{
                fontSize: "12px",
                color: "var(--label)",
                margin: "14px 0 0",
              }}
            >
              First month is credited toward your second procedure. Cancel
              anytime after your first month.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
