import Reveal from "@/components/Reveal";

function Stars() {
  return (
    <div className="flex gap-1" style={{ color: "#f5b50a" }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
      ))}
    </div>
  );
}

// NOTE: The live site embeds a live Google Reviews widget here. The cards below
// are styled placeholders pending the real review feed (see QA notes / final report).
const PLACEHOLDER_REVIEWS = [
  "Verified Google review — placeholder pending live review feed.",
  "Verified Google review — placeholder pending live review feed.",
  "Verified Google review — placeholder pending live review feed.",
];

export default function Reviews() {
  return (
    <section style={{ backgroundColor: "var(--white)", padding: "80px 0" }}>
      <div className="container">
        <h2 className="font-display text-center" style={{ fontSize: "clamp(24px,3vw,34px)", color: "var(--teal)", fontWeight: 400, marginBottom: "10px" }}>
          real people, real reviews
        </h2>
        <p className="text-center flex items-center justify-center gap-2" style={{ color: "var(--muted)", fontSize: "14px", marginBottom: "44px" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="#f5b50a"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
          Highest rated clinic in Malta
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {PLACEHOLDER_REVIEWS.map((r, i) => (
            <Reveal key={i} delay={i * 90} className="bg-white rounded-lg" style={{ padding: "26px", border: "1px solid var(--line)" }}>
              <Stars />
              <p style={{ marginTop: "14px", fontSize: "14px", color: "var(--ink-soft)", lineHeight: 1.7 }}>{r}</p>
              <div className="flex items-center gap-2" style={{ marginTop: "18px", fontSize: "12px", color: "var(--muted)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z"/></svg>
                Google
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
