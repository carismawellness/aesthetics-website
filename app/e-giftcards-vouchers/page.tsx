import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gifts & E-Vouchers | Carisma Aesthetics Malta",
};

export default function GiftsPage() {
  return (
    <section style={{ backgroundColor: "var(--cream)", padding: "80px 0" }}>
      <div className="container text-center">
        <h1 className="font-display" style={{ fontSize: "clamp(28px,5vw,44px)", color: "var(--ink)", letterSpacing: "0.08em" }}>E-Giftcards &amp; Vouchers</h1>
        <p className="font-serif mx-auto" style={{ fontSize: "19px", color: "var(--ink-soft)", textTransform: "none", fontStyle: "italic", marginTop: "16px", maxWidth: "640px" }}>
          The gift of confidence — treatments at Carisma Aesthetics.
        </p>
        <p className="mx-auto" style={{ fontSize: "14px", color: "var(--muted)", marginTop: "18px", maxWidth: "640px", fontStyle: "italic" }}>
          {/* QA flag */}Gift card options and pricing pending extraction from the live site.
        </p>
        <Link href="/consultation" className="btn btn-teal" style={{ marginTop: "32px" }}>buy a gift card</Link>
      </div>
    </section>
  );
}
