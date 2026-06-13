import { WHY_POINTS } from "@/lib/site";
import Reveal from "@/components/Reveal";

export default function WhyUs() {
  return (
    <section style={{ backgroundColor: "var(--beige)", padding: "84px 0" }}>
      <div className="container">
        {/* Kicker — two lines, emphasis on "#1 Award Winning" and "30+ Years" */}
        <Reveal>
          <h2
            className="font-display text-center mx-auto"
            style={{ fontSize: "clamp(19px,2.6vw,30px)", letterSpacing: "0.08em", lineHeight: 1.55, maxWidth: "780px", marginBottom: "56px", color: "var(--gold)", fontWeight: 400 }}
          >
            <span style={{ fontWeight: 700 }}>#1 award winning</span> chain in Malta with
            <br />
            <span style={{ fontWeight: 700 }}>30+ years</span> in wellness
          </h2>
        </Reveal>

        {/* Card with offset double-frame + bottom notch + faint wave */}
        <Reveal delay={120} className="relative mx-auto" style={{ maxWidth: "640px" }}>
          {/* offset frame peeking bottom-right */}
          <span aria-hidden style={{ position: "absolute", inset: 0, transform: "translate(16px, 16px)", border: "1px solid var(--gold)", zIndex: 0 }} />

          <div className="relative bg-white" style={{ border: "1px solid var(--gold)", padding: "clamp(36px,5vw,56px)", zIndex: 1, overflow: "hidden" }}>
            {/* faint wave graphic at the bottom of the card */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/wave-gold.png" alt="" aria-hidden style={{ position: "absolute", left: 0, bottom: "18px", width: "100%", height: "auto", opacity: 0.5, zIndex: 0, pointerEvents: "none" }} />

            <div className="relative" style={{ zIndex: 1 }}>
              <h3 className="font-display text-center" style={{ fontSize: "clamp(20px,3vw,30px)", color: "var(--gold)", letterSpacing: "0.1em", fontWeight: 400 }}>
                why carisma aesthetics ?
              </h3>
              <div className="mx-auto" style={{ width: "120px", height: "1px", background: "var(--gold)", margin: "18px auto 34px" }} />
              <ul className="space-y-5">
                {WHY_POINTS.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span style={{ color: "var(--gold)", fontSize: "14px", lineHeight: 1.6 }}>●</span>
                    <span className="font-display" style={{ fontSize: "14px", fontWeight: 400, color: "var(--gold)", letterSpacing: "0.06em", lineHeight: 1.5 }}>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* downward triangle notch at bottom-center */}
          <span
            aria-hidden
            style={{ position: "absolute", left: "50%", bottom: "-9px", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "9px solid transparent", borderRight: "9px solid transparent", borderTop: "9px solid var(--gold)", zIndex: 2 }}
          />
        </Reveal>

        {/* Live site carries this near-invisible SEO paragraph (8px, beige-on-beige) below the card */}
        <p style={{ marginTop: "120px", fontSize: "8px", color: "#f6efe3", lineHeight: 1.5 }}>
          Relieve excessive sweating with Botox. Dermal fillers, chemical peels, and botulinum toxin type injections enhance appearance. Slight headaches post-treatment subside quickly. Botox targets nerve impulses for natural-looking results. Treat various areas for overall facial harmony. Trust a professional for the best results. Say goodbye to sweating and embrace a revitalized appearance with Botox.
        </p>
      </div>
    </section>
  );
}
