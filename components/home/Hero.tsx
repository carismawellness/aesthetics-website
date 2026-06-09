import ConsultationForm from "@/components/ConsultationForm";

export default function Hero() {
  return (
    <section style={{ padding: "36px 0 40px" }}>
      <div className="container">
        {/* Hero panel — rounded, soft teal gradient (matches live) */}
        <div
          style={{
            borderRadius: "26px",
            background:
              "linear-gradient(165deg, #cfdcdc 0%, #dde7e7 30%, #eef3f3 65%, #f6f9f9 100%)",
            padding: "clamp(28px,4vw,56px)",
          }}
        >
          <div className="grid gap-10 lg:grid-cols-2 items-center">
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

            {/* Video (right) with teal offset corner accents */}
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
          </div>
        </div>

        <div className="text-center" style={{ marginTop: "34px" }}>
          <p className="font-display" style={{ fontSize: "12px", color: "var(--muted)", letterSpacing: "0.18em" }}>scroll down to learn more</p>
          <svg className="mx-auto mt-3 animate-bounce" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
