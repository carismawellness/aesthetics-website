import Link from "next/link";
import HeroBackdrop from "@/components/motion/HeroBackdrop";

/* Five small filled stars (decorative) in brand gold. */
function Stars({ size = 12 }: { size?: number }) {
  return (
    <span aria-hidden className="inline-flex" style={{ gap: "2px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="var(--gold-deep)">
          <path d="M12 2l2.9 6.26L21.8 9.27l-5 4.87 1.18 6.88L12 17.77l-6 3.25 1.2-6.88-5-4.87 6.9-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function Check() {
  return (
    <span
      aria-hidden
      className="inline-flex items-center justify-center shrink-0"
      style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#dfecec", color: "var(--teal-text)", marginTop: "1px" }}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

const CHECKS = [
  "Medically qualified doctors",
  "Natural-looking results",
  "Personalised treatment plans",
  "Advanced, cutting-edge technology",
];

export default function Hero() {
  return (
    <section className="hero-fit" style={{ background: "var(--white)", position: "relative", overflow: "hidden" }}>
      <HeroBackdrop />
      <div className="container w-full" style={{ position: "relative", zIndex: 1 }}>
        <div className="grid items-center gap-10 lg:grid-cols-[60fr_40fr]">
          {/* ── Left: copy ── */}
          <div>
            {/* Badge pills */}
            <div className="flex flex-wrap items-center" style={{ gap: "10px", marginBottom: "22px" }}>
              <span
                className="inline-flex items-center font-display"
                style={{ gap: "8px", background: "var(--white)", borderRadius: "999px", padding: "8px 16px", fontSize: "10px", letterSpacing: "0.12em", color: "var(--gold)", boxShadow: "0 4px 16px rgba(28,30,30,0.08)", border: "1px solid var(--line)" }}
              >
                <Stars size={11} /> Highest Rated in Malta
              </span>
              <span
                className="inline-flex items-center font-display"
                style={{ background: "var(--white)", borderRadius: "999px", padding: "8px 16px", fontSize: "10px", letterSpacing: "0.12em", color: "var(--gold)", boxShadow: "0 4px 16px rgba(28,30,30,0.08)", border: "1px solid var(--line)" }}
              >
                Malta Healthcare Awards
              </span>
            </div>

            {/* Headline — dialed back ~30% vs reference */}
            <h1 style={{ margin: 0, lineHeight: 1.04 }}>
              <span className="font-display block" style={{ fontSize: "clamp(34px,3.6vw,50px)", color: "var(--ink)", letterSpacing: "0.04em" }}>
                Glow With
              </span>
              <span className="font-display block" style={{ fontSize: "clamp(34px,3.6vw,50px)", color: "var(--gold)", letterSpacing: "0.04em" }}>
                Confidence
              </span>
              <span className="font-serif block" style={{ fontSize: "clamp(20px,2vw,28px)", color: "var(--teal-text)", textTransform: "none", letterSpacing: "0.01em", marginTop: "8px", fontWeight: 500 }}>
                Naturally, and on your terms
              </span>
            </h1>

            {/* Paragraph */}
            <p style={{ maxWidth: "440px", marginTop: "18px", color: "var(--ink-soft)", fontSize: "15px", lineHeight: 1.65 }}>
              Doctor-led medical aesthetics in Malta, built around one belief:
              restoration, not change. Subtle, precise, never overdone, and always
              guided by a proper medical consultation first.
            </p>

            {/* Checklist 2×2 */}
            <ul className="grid sm:grid-cols-2" style={{ gap: "10px 22px", marginTop: "20px", listStyle: "none", padding: 0 }}>
              {CHECKS.map((c) => (
                <li key={c} className="flex items-start" style={{ gap: "9px", fontSize: "14px", color: "var(--ink-soft)" }}>
                  <Check /> <span>{c}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap items-center" style={{ gap: "14px", marginTop: "26px" }}>
              <Link href="/consultation" className="btn btn-teal" style={{ borderRadius: "999px", padding: "15px 30px" }}>
                Book Free Consultation
                <span aria-hidden style={{ marginLeft: "2px" }}>→</span>
              </Link>
              <Link href="/face-treatments" className="btn btn-outline" style={{ borderRadius: "999px", padding: "15px 30px" }}>
                View Treatments
              </Link>
            </div>

            {/* Microcopy */}
            <p className="flex items-center" style={{ gap: "8px", marginTop: "18px", color: "var(--muted)", fontSize: "12.5px" }}>
              <svg aria-hidden width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--teal-text)" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
              </svg>
              Every journey starts with a complimentary, no-obligation doctor consultation.
            </p>
          </div>

          {/* ── Right: arch media + floating proof ── */}
          <div className="relative mx-auto w-full" style={{ maxWidth: "460px" }}>
            {/* Arch container holds the clinic video */}
            <div
              style={{
                position: "relative",
                aspectRatio: "4 / 5",
                maxHeight: "calc(100svh - 220px)",
                borderRadius: "220px 220px 18px 18px",
                overflow: "hidden",
                background:
                  "linear-gradient(160deg, var(--teal-100) 0%, var(--gray-100) 55%, var(--beige) 100%)",
                boxShadow: "0 24px 60px rgba(28,30,30,0.16)",
              }}
            >
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                src="/assets/clinic-video.mp4"
                poster="/assets/clinic-room.jpg"
                autoPlay
                muted
                loop
                playsInline
                aria-label="Carisma Aesthetics clinic in Malta"
              />
            </div>

            {/* Floating card — years in wellness (top-right) */}
            <div
              className="float-a text-center"
              style={{
                position: "absolute",
                top: "8%",
                right: "-14px",
                background: "var(--white)",
                borderRadius: "16px",
                padding: "14px 20px",
                boxShadow: "0 16px 40px rgba(28,30,30,0.16)",
                zIndex: 2,
              }}
            >
              <div className="font-display" style={{ fontSize: "26px", fontWeight: 700, color: "var(--gold)", lineHeight: 1 }}>30+</div>
              <div className="flex justify-center" style={{ margin: "6px 0 4px" }}><Stars size={11} /></div>
              <div className="font-display" style={{ fontSize: "9px", letterSpacing: "0.14em", color: "var(--muted)" }}>Years in Wellness</div>
            </div>

            {/* Floating card — #1 voted clinic (bottom-left) */}
            <div
              className="float-b flex items-center"
              style={{
                position: "absolute",
                bottom: "10%",
                left: "-18px",
                gap: "11px",
                background: "var(--white)",
                borderRadius: "16px",
                padding: "12px 16px",
                boxShadow: "0 16px 40px rgba(28,30,30,0.16)",
                zIndex: 2,
                maxWidth: "230px",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/logos/carisma-round.png" alt="" aria-hidden style={{ width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0 }} />
              <div>
                <div className="font-display" style={{ fontSize: "12px", letterSpacing: "0.08em", color: "var(--ink)", fontWeight: 700 }}>#1 Voted Clinic</div>
                <div style={{ fontSize: "11px", color: "var(--muted)" }}>Malta Healthcare Awards</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
