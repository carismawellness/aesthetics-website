import Reveal from "@/components/Reveal";

/*
  Static recreation of the live Google reviews widget (Elfsight embed on
  carismaaesthetics.com). Content is verbatim from the live widget:
  4.7 overall, "303 reviews on Google", real reviewer names/dates/texts.
*/

const REVIEWS = [
  {
    name: "Reuben Cutajar",
    when: "2 days ago",
    avatar: "/assets/treatments/home-review-1.png",
    text: "Excellent experience at Carisma Aesthetics. Letizia was highly professional, attentive, and ensured I felt comfortable throughout my laser treatment. The clinic offers a welcoming and relaxing environment, and the quality of service was outstanding. Highly recommended.",
    readMore: true,
  },
  {
    name: "L Ciantar",
    when: "2 days ago",
    avatar: "/assets/treatments/home-review-2.png",
    text: "Left a 5-star rating. Excellent!",
    readMore: false,
  },
  {
    name: "Alison Zammit",
    when: "5 days ago",
    avatar: "/assets/treatments/home-review-3.png",
    text: "Dr. Francesca is simply amazing. Botox services made by a professional doctor no pain and no bruises.",
    readMore: true,
  },
  {
    name: "nelly alejandra escobar vera",
    when: "9 days ago",
    avatar: "/assets/treatments/home-review-4.png",
    text: "Left a 5-star rating. Excellent!",
    readMore: false,
  },
  {
    name: "Crossey Micallef",
    when: "12 days ago",
    avatar: "/assets/treatments/home-review-5.png",
    text: "The treatment was done with great care and the lips results are amazing. Highly recommended!",
    readMore: false,
  },
  {
    name: "Ronnalie Parungao",
    when: "16 days ago",
    avatar: "/assets/treatments/home-review-6.png",
    text: "To Doctor Sarah, I wanted to take a moment to express my gratitude for your guidance during my recent consultation. Your opinion truly made an impact on my decision-making process regarding cosmetic procedures. I was initially considering injectable fillers, but your insight about the safety concerns related to the glandular tissue in the breast really opened my eyes. I appreciate your honesty in suggesting alternative options, such as plastic surgery or liposuction, which have made me feel much more secure about the procedures I am considering. Thank you for your expertise and for caring about my well-being. I feel much more informed and confident moving forward. Best regards, Ronnie",
    readMore: true,
  },
];

function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z" />
    </svg>
  );
}

function Star({ fill = "full", size = 16 }: { fill?: "full" | "half"; size?: number }) {
  const path = "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";
  if (fill === "half") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <defs>
          <linearGradient id="halfStar">
            <stop offset="50%" stopColor="#f5b50a" />
            <stop offset="50%" stopColor="#e2e2e2" />
          </linearGradient>
        </defs>
        <path fill="url(#halfStar)" d={path} />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#f5b50a">
      <path d={path} />
    </svg>
  );
}

function Stars({ size = 16 }: { size?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label="4.7 out of 5 stars">
      {[0, 1, 2, 3].map((i) => (
        <Star key={i} size={size} />
      ))}
      <Star fill="half" size={size} />
    </span>
  );
}

export default function Reviews() {
  return (
    <section style={{ backgroundColor: "#ffffff", padding: "80px 0" }}>
      <div className="container">
        <Reveal>
          <h2
            className="font-display text-center"
            style={{ fontSize: "clamp(24px,3vw,35px)", color: "var(--teal)", fontWeight: 400, letterSpacing: "0.06em" }}
          >
            real people, real reviews
          </h2>
          <div className="mx-auto" style={{ width: "min(500px, 80%)", height: "1px", background: "var(--teal)", marginTop: "18px", marginBottom: "44px" }} />
        </Reveal>

        {/* Widget header — overall rating */}
        <Reveal className="flex flex-col sm:flex-row items-center justify-center gap-x-10 gap-y-4" style={{ marginBottom: "36px" }}>
          <div className="flex items-center gap-3">
            <span style={{ fontSize: "40px", fontWeight: 700, color: "#222", lineHeight: 1 }}>4.7</span>
            <span className="flex flex-col items-start">
              <Stars size={17} />
              <span className="flex items-center gap-1" style={{ fontSize: "13px", color: "#666", marginTop: "3px" }}>
                303 reviews on <GoogleG size={14} /> <span style={{ fontWeight: 600, color: "#444" }}>Google</span>
              </span>
            </span>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Carisma+Aesthetics+Malta"
            target="_blank"
            rel="noopener noreferrer"
            className="font-display btn btn-teal"
            style={{
              fontSize: "11px",
              fontWeight: 600,
              padding: "12px 22px",
              borderRadius: "999px",
              letterSpacing: "0.1em",
            }}
          >
            Review us on Google
          </a>
        </Reveal>

        {/* Review cards — live shows 3 cards in one row */}
        <div className="grid gap-5 md:grid-cols-3 mx-auto" style={{ maxWidth: "1080px" }}>
          {REVIEWS.slice(0, 3).map((r, i) => (
            <Reveal
              key={r.name}
              delay={(i % 3) * 90}
              className="card review-card flex flex-col"
              style={{ padding: "22px" }}
            >
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.avatar}
                  alt={r.name}
                  width={40}
                  height={40}
                  style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                />
                <span className="flex-1 min-w-0">
                  <span className="block truncate" style={{ fontSize: "14px", color: "#222", fontWeight: 600 }}>{r.name}</span>
                  <span className="block" style={{ fontSize: "12px", color: "#707070" }}>{r.when}</span>
                </span>
                <GoogleG size={18} />
              </div>
              <div style={{ marginTop: "10px" }}>
                <span className="inline-flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} size={14} />
                  ))}
                </span>
              </div>
              <p
                style={{
                  marginTop: "8px",
                  fontSize: "13.5px",
                  color: "#333",
                  lineHeight: 1.6,
                  display: "-webkit-box",
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {r.text}
              </p>
              {r.readMore && (
                <span style={{ marginTop: "6px", fontSize: "13px", color: "#707070" }}>Read more</span>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
