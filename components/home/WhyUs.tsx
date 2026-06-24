import Image from "next/image";
import { WHY_POINTS } from "@/lib/site";
import Reveal from "@/components/Reveal";

export default function WhyUs() {
  return (
    <section
      aria-labelledby="why-heading"
      style={{
        /* Slimming-style ground: white → very light teal → soft mist (no warm beige) */
        background: "linear-gradient(180deg, var(--white) 0%, var(--teal-100) 55%, var(--cream-2) 100%)",
        padding: "126px 0",
      }}
    >
      {/* Card hover: Slimming "Meet Your Doctor" lift — translateY up + scale +
          softer/larger shadow + darkened teal border. Reduced-motion guarded. */}
      <style>{`
        .why-card { transition: box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease; }
        .why-card:hover {
          border-color: var(--teal-deep);
          box-shadow: 0 4px 10px rgba(12,11,11,0.10), 0 22px 48px -12px rgba(28,30,30,0.22);
        }
        @media (prefers-reduced-motion: no-preference) {
          .why-card:hover { transform: translateY(-6px) scale(1.02); }
        }
      `}</style>
      <div className="container">
        {/* Kicker — two lines, emphasis on "#1 Award Winning" and "30+ Years" */}
        <Reveal>
          <h2
            id="why-heading"
            className="font-display text-center mx-auto"
            style={{ fontSize: "clamp(19px,2.6vw,30px)", letterSpacing: "0.08em", lineHeight: 1.55, maxWidth: "780px", marginBottom: "56px", color: "var(--gold)", fontWeight: 400 }}
          >
            <span style={{ fontWeight: 700 }}>#1 Award Winning</span> Chain in Malta with
            <br />
            <span style={{ fontWeight: 700 }}>30+ Years</span> in Wellness
          </h2>
        </Reveal>

        {/* Card with offset double-frame + bottom notch + faint wave */}
        <Reveal delay={120} className="relative mx-auto" style={{ maxWidth: "640px" }}>
          {/* offset frame peeking bottom-right */}
          <span aria-hidden="true" style={{ position: "absolute", inset: 0, transform: "translate(16px, 16px)", border: "1px solid var(--gold)", borderRadius: "var(--radius-card)", zIndex: 0 }} />

          <div
            className="why-card relative bg-white"
            style={{
              border: "1px solid var(--gold)",
              borderRadius: "var(--radius-card)",
              padding: "clamp(36px,5vw,56px)",
              zIndex: 1,
              overflow: "hidden",
              boxShadow: "0 1px 2px rgba(12,11,11,0.04), 0 6px 18px rgba(12,11,11,0.06)",
            }}
          >
            {/* faint wave graphic at the bottom of the card — decorative */}
            <div aria-hidden="true" style={{ position: "absolute", left: 0, bottom: "18px", width: "100%", opacity: 0.5, zIndex: 0, pointerEvents: "none" }}>
              <Image
                src="/assets/wave-gold.png"
                alt=""
                role="presentation"
                width={640}
                height={60}
                style={{ width: "100%", height: "auto" }}
              />
            </div>

            <div className="relative" style={{ zIndex: 1 }}>
              {/* h3 is correct: this card heading is subordinate to the section h2 above */}
              <h3 className="font-display text-center" style={{ fontSize: "clamp(20px,3vw,30px)", color: "var(--teal-deep)", letterSpacing: "0.1em", fontWeight: 400 }}>
                Why Carisma Aesthetics?
              </h3>
              <div aria-hidden="true" className="mx-auto" style={{ width: "120px", height: "1px", background: "var(--gold)", margin: "18px auto 34px" }} />
              <ul className="space-y-5">
                {WHY_POINTS.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span aria-hidden="true" style={{ color: "var(--gold)", fontSize: "14px", lineHeight: 1.6 }}>●</span>
                    <span className="font-display" style={{ fontSize: "14px", fontWeight: 400, color: "var(--gold)", letterSpacing: "0.06em", lineHeight: 1.5 }}>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* downward triangle notch at bottom-center */}
          <span
            aria-hidden="true"
            style={{ position: "absolute", left: "50%", bottom: "-9px", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "9px solid transparent", borderRight: "9px solid transparent", borderTop: "9px solid var(--gold)", zIndex: 2 }}
          />
        </Reveal>
        {/* NOTE: Hidden SEO paragraph removed — it was 8px beige-on-beige text (WCAG fail + manipulative SEO). */}
      </div>
    </section>
  );
}
