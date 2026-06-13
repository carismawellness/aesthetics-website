import ConsultationForm from "@/components/ConsultationForm";

export default function Hero() {
  return (
    /* Outer section — plain white, gives the side margins visible on live */
    <section style={{ backgroundColor: "#fff", padding: "28px clamp(16px,3vw,40px)" }}>
      {/* Contained panel with gradient background and rounded corners — matches live */}
      <div
        style={{
          background: "url('/assets/bg-gradient.png') center/cover no-repeat",
          borderRadius: "20px",
          padding: "clamp(28px,4vw,56px) clamp(28px,5vw,64px)",
          overflow: "hidden",
          boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        }}
      >
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          {/* Form (left) */}
          <div>
            <h1
              className="font-serif"
              style={{
                fontSize: "clamp(24px,2.6vw,30px)",
                color: "#d7d1c3",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                fontWeight: 700,
                marginBottom: "22px",
              }}
            >
              personalised form
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
              <span className="font-display" style={{ fontSize: "15px", fontWeight: 700, color: "var(--gold)", letterSpacing: "0.1em", lineHeight: 1.4 }}>#1 Voted Med-Aesthetics Clinic in Malta</span>
            </div>

            {/* Scroll down cue */}
            <div className="inline-flex flex-col items-center" style={{ marginTop: "30px" }}>
              <p className="font-display text-center" style={{ fontSize: "15px", fontWeight: 700, color: "#9b8d83", letterSpacing: "0.14em", lineHeight: 1.5 }}>
                scroll down<br />to learn more
              </p>
              <div className="flex justify-center" style={{ width: "32px", height: "50px", border: "1.5px solid #9b8d83", borderRadius: "16px", marginTop: "16px", paddingTop: "9px" }}>
                <svg className="animate-bounce" width="12" height="14" viewBox="0 0 24 24" fill="none" stroke="#9b8d83" strokeWidth="2"><path d="M12 4v12M6 12l6 6 6-6" /></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
