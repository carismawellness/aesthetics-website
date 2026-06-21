import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { HOME_SERVICES } from "@/lib/site";

const BRACKET = "1px solid #e0dbd5";

export default function ServicesMarquee() {
  return (
    <section aria-labelledby="services-heading" style={{ padding: "105px 0", backgroundColor: "var(--white)" }}>
      <div className="container">
        <Reveal>
          <h2
            id="services-heading"
            className="font-display text-center"
            style={{ fontSize: "clamp(22px,3vw,35px)", color: "var(--gold)", fontWeight: 400, letterSpacing: "0.1em" }}
          >
            Medical Aesthetics Procedures
          </h2>
          <div className="mx-auto" style={{ width: "205px", height: "1.5px", background: "#96b2b2", marginTop: "16px", marginBottom: "48px" }} />
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" style={{ columnGap: "15px", rowGap: "32px" }}>
          {HOME_SERVICES.map((s, i) => (
            <Reveal key={s.href} delay={(i % 4) * 70} className="flex justify-center">
              {/* min-h-[44px] ensures WCAG 44px touch target; link wraps entire card */}
              <Link
                href={s.href}
                className="group flex justify-center min-h-[44px]"
                aria-label={`Learn more about ${s.label}`}
              >
                {/* Bracket frame contains both the image and the label in the white space */}
                <div className="relative" style={{ width: "160px" }}>
                  <Image
                    src={s.image}
                    alt={`${s.label} treatment at Carisma Aesthetics Malta`}
                    width={160}
                    height={200}
                    style={{ width: "100%", height: "auto", objectFit: "contain" }}
                    className="motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-105"
                    loading={i < 4 ? "eager" : "lazy"}
                  />
                  <p
                    className="font-display absolute"
                    aria-hidden="true"
                    style={{ bottom: "14%", left: "50%", transform: "translateX(-50%)", textAlign: "center", fontSize: "clamp(9px,0.8vw,11px)", color: "var(--label)", letterSpacing: "0.12em", fontWeight: 400, textTransform: "uppercase", lineHeight: 1.3, whiteSpace: "nowrap" }}
                  >
                    {s.label}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="flex justify-center" style={{ paddingTop: "48px" }}>
          <div aria-hidden="true" style={{ width: "1px", height: "80px", background: "var(--line)" }} />
        </div>
      </div>
    </section>
  );
}
