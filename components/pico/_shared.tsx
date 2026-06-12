import Link from "next/link";

// Shared building blocks for the Pico laser tattoo removal page sections.
// Each section component (components/pico/<Section>.tsx) imports from here so the
// page stays visually consistent. Mirrors the live carismaaesthetics.com design tokens.

export const A = "/assets/treatments";

// Live design tokens sampled from carismaaesthetics.com/pico-laser-tattoo-removal
export const TEAL_HEAD = "#98afb2"; // muted grey-teal — all section headings & kickers
export const SAGE = "#96b2b2";      // muted sage — all CTA buttons

export function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="font-display text-center" style={{ fontSize: "18px", color: TEAL_HEAD, letterSpacing: "0.02em" }}>{children}</p>;
}

export function Serif({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <h2 className="font-serif text-center" style={{ fontSize: "clamp(22px,3vw,30px)", color: TEAL_HEAD, letterSpacing: "0.06em", fontWeight: 400, lineHeight: 1.3, ...style }}>{children}</h2>;
}

// Full-width muted sage button matching the live page CTAs.
export function Cta({ label }: { label: string }) {
  return (
    <Link
      href="/consultation"
      className="font-display flex items-center justify-center"
      style={{ width: "100%", maxWidth: "470px", background: SAGE, color: "#fff", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", padding: "15px 24px", borderRadius: "4px" }}
    >
      {label} <span aria-hidden style={{ marginLeft: "8px" }}>›</span>
    </Link>
  );
}

export function Dot() {
  return <span style={{ color: "var(--teal)", fontSize: "11px", lineHeight: 1.8, flexShrink: 0 }}>●</span>;
}

export function GoogleRating() {
  return (
    <div className="flex items-center gap-2" style={{ marginTop: "20px" }}>
      <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" /><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z" /></svg>
      <span style={{ fontWeight: 600, fontSize: "13px", color: "var(--label)" }}>4.9</span>
      <span className="flex" style={{ color: "var(--teal)" }}>{[0, 1, 2, 3, 4].map((i) => (<svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>))}</span>
      <span className="font-display" style={{ fontSize: "11px", color: "var(--teal)", letterSpacing: "0.08em" }}>TOP-RATED CLINIC IN MALTA</span>
    </div>
  );
}
