import type { Metadata } from "next";
import ServicesMarqueeElevated from "@/components/home/ServicesMarqueeElevated";
import ServicesMarquee from "@/components/home/ServicesMarquee";

// Internal preview — never indexed. Googlebot may still crawl to see the noindex,
// so do NOT also Disallow this in robots.ts.
export const metadata: Metadata = {
  title: "Treatments Section — Elevated (Preview)",
  description: "Internal preview: the subtly elevated treatments carousel vs the current live one.",
  robots: { index: false, follow: false },
};

function Label({ k, title, note }: { k: string; title: string; note: string }) {
  return (
    <div className="container" style={{ paddingTop: "clamp(32px,5vw,56px)" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap",
                    borderTop: "1px solid var(--line)", paddingTop: 18 }}>
        <span className="font-display" style={{ fontSize: 10, letterSpacing: "0.16em",
              textTransform: "uppercase", color: "#fff", background: "var(--teal-deep)",
              borderRadius: 999, padding: "5px 11px", fontWeight: 600 }}>
          {k}
        </span>
        <span className="font-serif" style={{ fontSize: 19, color: "var(--teal-deep)",
              letterSpacing: "0.03em" }}>{title}</span>
        <span style={{ color: "var(--ink-soft)", fontSize: 13, flexBasis: "100%", maxWidth: 720 }}>
          {note}
        </span>
      </div>
    </div>
  );
}

export default function TreatmentsElevatedPreview() {
  return (
    <main>
      <header className="container" style={{ padding: "clamp(40px,6vw,76px) 0 4px", textAlign: "center" }}>
        <p className="font-display" style={{ fontSize: 11, letterSpacing: "0.22em",
           textTransform: "uppercase", color: "var(--brand-taupe)", fontWeight: 600, marginBottom: 12 }}>
          Internal Preview
        </p>
        <h1 className="font-serif" style={{ color: "var(--teal-deep)", fontSize: "clamp(24px,3.4vw,40px)",
            fontWeight: 400, letterSpacing: "0.04em", lineHeight: 1.15 }}>
          Treatments Carousel — Elevated
        </h1>
        <p style={{ color: "var(--ink-soft)", maxWidth: 640, margin: "16px auto 0", fontSize: 15, lineHeight: 1.65 }}>
          Same structure as the live carousel, elevated into a calm &ldquo;Treatment Gallery&rdquo;: richer
          material depth, an editorial catalogue feel, a cohesive teal image grade, and guided motion —
          and the wheel-trap scroll bug is fixed (vertical wheel now scrolls the page; drag or the arrows
          move the row). Scroll down to compare against the current live version.
        </p>
      </header>

      {/* Same predominantly-white ground as the live homepage so shadows/glow read true. */}
      <div style={{ position: "relative",
                    background: "linear-gradient(180deg, #ffffff 0%, #fbfdfd 50%, #ffffff 100%)" }}>
        <Label k="Elevated" title="The richer version"
               note="Drive it with the arrows, drag it, or use a horizontal trackpad swipe. A vertical wheel always scrolls the page — no trapping." />
        <ServicesMarqueeElevated />

        <Label k="Current · live" title="What's on the site today"
               note="The existing carousel, for direct comparison. (This one still has the old infinite-loop wheel trap.)" />
        <ServicesMarquee />
      </div>

      <footer className="container" style={{ padding: "clamp(48px,6vw,96px) 0", textAlign: "center" }}>
        <p style={{ color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.6 }}>
          Happy with the elevated version? Say the word and I&apos;ll swap it into the live homepage.
        </p>
      </footer>
    </main>
  );
}
