import ConsultationForm from "@/components/ConsultationForm";

export default function Hero() {
  return (
    <section style={{ padding: "36px 0 40px" }}>
      <div className="container">
        {/* Hero panel — rounded, soft teal gradient (matches live) */}
        <div
          style={{
            borderRadius: "26px",
            background: "url('/assets/bg-gradient.png') center/cover no-repeat",
            padding: "clamp(28px,4vw,56px)",
          }}
        >
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            {/* Form (left) */}
            <div>
              <h1
                className="font-serif"
                style={{
                  fontSize: "clamp(26px,3.4vw,40px)",
                  color: "#9b8d83",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  fontWeight: 500,
                  marginBottom: "22px",
                }}
              >
                Personalised Form
              </h1>
              <ConsultationForm />
            </div>

            {/* Right column: video + awards badge + scroll cue */}
            <div>
              <div className="relative" style={{ padding: "14px" }}>
              {/* top-left teal accent */}
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "62%",
                  height: "58%",
                  background: "#a7c7c7",
                  borderRadius: "12px",
                  zIndex: 0,
                }}
              />
              {/* bottom-right teal accent */}
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: "62%",
                  height: "58%",
                  background: "#a7c7c7",
                  borderRadius: "12px",
                  zIndex: 0,
                }}
              />
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                className="relative w-full"
                style={{
                  borderRadius: "10px",
                  aspectRatio: "3 / 4",
                  objectFit: "cover",
                  zIndex: 1,
                  display: "block",
                }}
                src="/assets/clinic-video.mp4"
                poster="/assets/clinic-room.jpg"
                autoPlay
                muted
                loop
                playsInline
                aria-label="Carisma Aesthetics clinic in Malta"
              />
              </div>

              {/* Awards badge + #1 voted (under the video) */}
              <div className="flex items-center gap-4" style={{ marginTop: "26px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/awards-logo.png" alt="Malta Healthcare, Wellness, Beauty & Best Spa Awards" style={{ height: "72px", width: "auto" }} />
                <span className="font-display" style={{ fontSize: "16px", color: "var(--gold)", letterSpacing: "0.1em", lineHeight: 1.4 }}>#1 Voted Med-Aesthetics Clinic in Malta</span>
              </div>

              {/* Scroll down (under the video) — centered */}
              <div style={{ marginTop: "30px", textAlign: "center" }}>
                <p className="font-display" style={{ fontSize: "14px", color: "var(--gold)", letterSpacing: "0.14em", lineHeight: 1.5 }}>Scroll down to learn more</p>
                <div className="flex justify-center" style={{ width: "32px", height: "50px", border: "1.5px solid var(--gold)", borderRadius: "16px", margin: "16px auto 0", paddingTop: "9px" }}>
                  <svg className="animate-bounce" width="12" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><path d="M12 4v12M6 12l6 6 6-6" /></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
