import Link from "next/link";
import Reveal from "@/components/Reveal";
import { HOME_SERVICES } from "@/lib/site";

const B = "1px solid #ddd8d2";

export default function ServicesMarquee() {
  return (
    <section style={{ padding: "70px 0", background: "#fff" }}>
      <div className="container">
        <Reveal>
          <h2 className="font-display text-center" style={{ fontSize: "clamp(22px,3vw,35px)", color: "var(--gold)", fontWeight: 400, letterSpacing: "0.1em" }}>
            medical aesthetics procedures
          </h2>
          <div className="mx-auto" style={{ width: "205px", height: "1.5px", background: "#96b2b2", marginTop: "16px", marginBottom: "48px" }} />
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" style={{ gap: "28px" }}>
          {HOME_SERVICES.map((s, i) => (
            <Reveal key={s.href} delay={(i % 4) * 70}>
              <Link href={s.href} className="group block">
                <div className="relative flex flex-col items-center" style={{ paddingTop: "24px", paddingBottom: "20px", gap: "14px" }}>
                  {/* Corner brackets */}
                  <span className="absolute" style={{ left: 0, top: 0, width: "30%", height: "25%", borderLeft: B, borderTop: B }} />
                  <span className="absolute" style={{ right: 0, top: 0, width: "30%", height: "25%", borderRight: B, borderTop: B }} />
                  <span className="absolute" style={{ left: 0, bottom: 0, width: "30%", height: "25%", borderLeft: B, borderBottom: B }} />
                  <span className="absolute" style={{ right: 0, bottom: 0, width: "30%", height: "25%", borderRight: B, borderBottom: B }} />
                  {/* PNG image — resized to fit inside bracket */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.image}
                    alt={s.label}
                    style={{ width: "110px", height: "110px", objectFit: "contain" }}
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Label inside the bracket, below the icon */}
                  <p className="font-display" style={{ fontSize: "clamp(10px,1vw,13px)", color: "#9b8d83", letterSpacing: "0.14em", fontWeight: 400, textAlign: "center", lineHeight: 1.4, textTransform: "uppercase" }}>
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
