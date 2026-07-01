import type { Metadata } from "next";
import ServicesMarqueeOverlay from "@/components/home/ServicesMarqueeOverlay";
import ServicesMarqueeElevated from "@/components/home/ServicesMarqueeElevated";

export const metadata: Metadata = {
  title: "Treatments Carousel, Overlay Model (Preview)",
  description: "Internal preview: image-forward overlay carousel (Webild med-spa model) vs the current live one.",
  robots: { index: false, follow: false },
};

function Label({ k, title, note }: { k: string; title: string; note: string }) {
  return (
    <div className="container" style={{ paddingTop: "clamp(32px,5vw,56px)" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap",
                    borderTop: "1px solid var(--line)", paddingTop: 18 }}>
        <span className="font-display" style={{ fontSize: 10, letterSpacing: "0.16em",
              textTransform: "uppercase", color: "#fff", background: "var(--teal-deep)",
              borderRadius: 999, padding: "5px 11px", fontWeight: 600 }}>{k}</span>
        <span className="font-serif" style={{ fontSize: 19, color: "var(--teal-deep)", letterSpacing: "0.03em" }}>{title}</span>
        <span style={{ color: "var(--ink-soft)", fontSize: 13, flexBasis: "100%", maxWidth: 740 }}>{note}</span>
      </div>
    </div>
  );
}

export default function TreatmentsModelPreview() {
  return (
    <main>
      <header className="container" style={{ padding: "clamp(40px,6vw,76px) 0 4px", textAlign: "center" }}>
        <p className="font-display" style={{ fontSize: 11, letterSpacing: "0.22em",
           textTransform: "uppercase", color: "var(--brand-taupe)", fontWeight: 600, marginBottom: 12 }}>
          Internal Preview
        </p>
        <h1 className="font-serif" style={{ color: "var(--teal-deep)", fontSize: "clamp(24px,3.4vw,40px)",
            fontWeight: 400, letterSpacing: "0.04em", lineHeight: 1.15 }}>
          Treatments Carousel, Overlay Model
        </h1>
        <p style={{ color: "var(--ink-soft)", maxWidth: 660, margin: "16px auto 0", fontSize: 15, lineHeight: 1.65 }}>
          The Webild med-spa pattern rebuilt in Carisma&apos;s brand: tall image cards with the name + descriptor
          over a cool scrim, a peeking row, and a progress-bar + arrows control row. Drag it, use the arrows,
          or a horizontal trackpad swipe, a vertical wheel still scrolls the page. Compare with the version
          currently live below.
        </p>
      </header>

      <div style={{ position: "relative",
                    background: "linear-gradient(180deg, #ffffff 0%, #fbfdfd 50%, #ffffff 100%)" }}>
        <Label k="New · overlay" title="Modelled on the reference"
               note="Image-forward overlay cards (4:5), name + one-line descriptor on a teal scrim, bottom progress bar + arrows." />
        <ServicesMarqueeOverlay />

        <Label k="Current · live" title="On the homepage now"
               note="The elevated 'gallery' cards (image + white body + Explore) shipped earlier today." />
        <ServicesMarqueeElevated />
      </div>

      <footer className="container" style={{ padding: "clamp(48px,6vw,96px) 0", textAlign: "center" }}>
        <p style={{ color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.6 }}>
          Say the word and I&apos;ll swap the overlay version into the live homepage.
        </p>
      </footer>
    </main>
  );
}
