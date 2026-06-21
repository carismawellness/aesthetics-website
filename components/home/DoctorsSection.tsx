import Image from "next/image";
import { DOCTORS } from "@/lib/site";
import Reveal from "@/components/Reveal";

export default function DoctorsSection() {
  return (
    <section aria-labelledby="doctors-heading" style={{ padding: "80px 0" }}>
      {/* Visually hidden section title for screen readers — maintains h2 hierarchy */}
      <h2 id="doctors-heading" className="sr-only">Our Medical Doctors</h2>
      <div className="container" style={{ maxWidth: "1040px" }}>
        {DOCTORS.map((d, i) => {
          const flip = i % 2 === 1;
          return (
            <Reveal
              key={d.name}
              className="grid gap-10 md:grid-cols-2 items-center"
              style={{ marginBottom: i === DOCTORS.length - 1 ? 0 : "72px" }}
            >
              {/* Image with teal offset corner accents (matches hero video) */}
              <div className={flip ? "md:order-2" : "md:order-1"}>
                <div className="relative" style={{ maxWidth: "420px", padding: "12px", marginInline: flip ? "auto" : undefined }}>
                  <span aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, width: "60%", height: "55%", background: "#a7c7c7", borderRadius: "12px", zIndex: 0 }} />
                  <span aria-hidden="true" style={{ position: "absolute", bottom: 0, right: 0, width: "60%", height: "55%", background: "#a7c7c7", borderRadius: "12px", zIndex: 0 }} />
                  <Image
                    src={d.image}
                    alt={`Dr. ${d.name} — Carisma Aesthetics Malta`}
                    width={394}
                    height={493}
                    className="relative w-full h-auto"
                    style={{ aspectRatio: "394 / 493", objectFit: "cover", borderRadius: "10px", zIndex: 1, display: "block" }}
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
              </div>

              {/* Text — h3 is correct here: subordinate to the sr-only h2 "Our Medical Doctors" */}
              <div className={flip ? "md:order-1" : "md:order-2"}>
                {/* P1: var(--teal) = #96b2b2 FAILS contrast on white (2.2:1). Using var(--teal-text) = #406060 (passes AA) */}
                <h3 className="font-display" style={{ fontSize: "clamp(22px,2.8vw,32px)", color: "var(--teal-text)", fontWeight: 400, letterSpacing: "0.08em", lineHeight: 1.25 }}>
                  {d.name}
                </h3>
                <div aria-hidden="true" style={{ margin: "12px 0 14px", opacity: 0.85 }}>
                  <Image
                    src="/assets/wave-gold.png"
                    alt=""
                    role="presentation"
                    width={120}
                    height={18}
                    style={{ height: "18px", width: "auto" }}
                  />
                </div>
                <p style={{ fontSize: "14px", color: "#5b5249", lineHeight: 1.85, textAlign: "justify" }}>{d.bio.map((p, j) => (<span key={j} style={{ display: "block", marginTop: j ? "14px" : 0 }}>{p}</span>))}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
