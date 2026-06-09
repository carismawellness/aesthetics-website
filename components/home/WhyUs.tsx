import { WHY_POINTS } from "@/lib/site";
import Reveal from "@/components/Reveal";

export default function WhyUs() {
  return (
    <section style={{ backgroundColor: "var(--beige)", padding: "80px 0" }}>
      <div className="container">
        <Reveal>
          <p className="font-display text-center mx-auto" style={{ fontSize: "13px", color: "#b0a68f", letterSpacing: "0.16em", marginBottom: "40px", maxWidth: "640px", lineHeight: 1.7 }}>
            #1 award winning chain in Malta with<br />30+ years in wellness
          </p>
        </Reveal>

        {/* Centered bordered card with the why points */}
        <Reveal delay={120} className="mx-auto" style={{ maxWidth: "720px" }}>
          <div className="bg-white" style={{ border: "1px solid var(--gold)", padding: "48px clamp(24px,5vw,56px)" }}>
            <h2 className="font-display text-center" style={{ fontSize: "clamp(20px,3vw,28px)", color: "#b0a68f", letterSpacing: "0.08em" }}>
              why carisma aesthetics ?
            </h2>
            <div className="mx-auto" style={{ width: "90px", height: "2px", background: "var(--teal)", margin: "16px auto 32px" }} />
            <ul className="space-y-4">
              {WHY_POINTS.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span style={{ color: "var(--gold)", fontSize: "18px", lineHeight: 1.4 }}>•</span>
                  <span className="font-display" style={{ fontSize: "15px", color: "#b0a68f", letterSpacing: "0.08em", lineHeight: 1.5 }}>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
