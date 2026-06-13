import { DOCTORS } from "@/lib/site";
import Reveal from "@/components/Reveal";

export default function DoctorsSection() {
  return (
    <section style={{ padding: "80px 0" }}>
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
                  <span aria-hidden style={{ position: "absolute", top: 0, left: 0, width: "60%", height: "55%", background: "#a7c7c7", borderRadius: "12px", zIndex: 0 }} />
                  <span aria-hidden style={{ position: "absolute", bottom: 0, right: 0, width: "60%", height: "55%", background: "#a7c7c7", borderRadius: "12px", zIndex: 0 }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={d.image} alt={d.name} className="relative w-full h-auto" style={{ aspectRatio: "394 / 493", objectFit: "cover", borderRadius: "10px", zIndex: 1, display: "block" }} />
                </div>
              </div>

              {/* Text */}
              <div className={flip ? "md:order-1" : "md:order-2"}>
                <h2 className="font-display" style={{ fontSize: "clamp(22px,2.8vw,32px)", color: "var(--teal)", fontWeight: 400, letterSpacing: "0.08em", lineHeight: 1.25 }}>
                  {d.name}
                </h2>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/wave-gold.png" alt="" aria-hidden style={{ height: "18px", width: "auto", margin: "12px 0 14px", opacity: 0.85 }} />
                <p style={{ fontSize: "14px", color: "#5b5249", lineHeight: 1.85, textAlign: "justify" }}>{d.bio.map((p, j) => (<span key={j} style={{ display: "block", marginTop: j ? "14px" : 0 }}>{p}</span>))}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
