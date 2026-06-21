import Link from "next/link";
import Reveal from "@/components/Reveal";
import { HOME_SERVICES } from "@/lib/site";

const BRACKET = "1px solid #e0dbd5";

export default function ServicesMarquee() {
  return (
    <section style={{ padding: "105px 0", backgroundColor: "var(--white)" }}>
      <div className="container">
        <Reveal>
          <h2 className="font-display text-center" style={{ fontSize: "clamp(22px,3vw,35px)", color: "var(--gold)", fontWeight: 400, letterSpacing: "0.1em" }}>
            medical aesthetics procedures
          </h2>
          <div className="mx-auto" style={{ width: "205px", height: "1.5px", background: "#96b2b2", marginTop: "16px", marginBottom: "48px" }} />
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" style={{ columnGap: "15px", rowGap: "32px" }}>
          {HOME_SERVICES.map((s, i) => (
            <Reveal key={s.href} delay={(i % 4) * 70} className="flex justify-center">
              <Link href={s.href} className="group flex justify-center">
                {/* Bracket frame contains both the image and the label in the white space */}
                {/* The PNG already has the bracket frame — just overlay the label inside */}
                <div className="relative" style={{ width: "160px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.image}
                    alt={s.label}
                    style={{ width: "100%", display: "block", objectFit: "contain" }}
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                  <p className="font-display absolute" style={{ bottom: "14%", left: "50%", transform: "translateX(-50%)", textAlign: "center", fontSize: "clamp(9px,0.8vw,11px)", color: "var(--label)", letterSpacing: "0.12em", fontWeight: 400, textTransform: "uppercase", lineHeight: 1.3, whiteSpace: "nowrap" }}>
                    {s.label}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="flex justify-center" style={{ paddingTop: "48px" }}>
          <div style={{ width: "1px", height: "80px", background: "var(--line)" }} />
        </div>
      </div>
    </section>
  );
}
