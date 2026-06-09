import Link from "next/link";
import { HOME_SERVICES } from "@/lib/site";
import Reveal from "@/components/Reveal";

export default function ServicesMarquee() {
  return (
    <section style={{ padding: "70px 0" }}>
      <div className="container">
        <Reveal>
          <h2 className="font-display text-center" style={{ fontSize: "clamp(20px,3vw,30px)", color: "var(--gold)", fontWeight: 400, letterSpacing: "0.14em" }}>
            medical aesthetics procedures
          </h2>
          <div className="mx-auto" style={{ width: "110px", height: "2px", background: "var(--teal)", marginTop: "16px", marginBottom: "48px" }} />
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" style={{ columnGap: "20px", rowGap: "44px" }}>
          {HOME_SERVICES.map((s, i) => (
            <Reveal key={s.href} delay={(i % 4) * 70} className="flex">
              <Link href={s.href} className="group flex flex-col items-center text-center w-full">
                {/* Offset corner-bracket frame (matches live) */}
                <div className="relative w-full" style={{ aspectRatio: "1 / 1", padding: "22px", maxWidth: "200px" }}>
                  <span className="absolute" style={{ left: 0, top: 0, width: "52%", height: "52%", borderLeft: "1px solid var(--line)", borderTop: "1px solid var(--line)" }} />
                  <span className="absolute" style={{ right: 0, bottom: 0, width: "52%", height: "52%", borderRight: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.image} alt={s.label} className="relative w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" />
                </div>
                <span className="font-display" style={{ marginTop: "14px", fontSize: "12.5px", color: "var(--muted)", letterSpacing: "0.12em" }}>
                  {s.label}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
