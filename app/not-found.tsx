import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center" style={{ padding: "100px 24px 120px" }}>
      <p className="font-display" style={{ fontSize: "11px", color: "#4a7d7d", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "20px" }}>
        Page not found
      </p>
      <h1 className="font-serif" style={{ fontSize: "clamp(60px,10vw,120px)", color: "var(--gold)", opacity: 1, lineHeight: 1, marginBottom: "8px" }}>
        404
      </h1>
      <h2 className="font-serif" style={{ fontSize: "clamp(22px,3vw,34px)", color: "var(--gold)", letterSpacing: "0.04em", marginBottom: "20px" }}>
        This page doesn&apos;t exist
      </h2>
      <p style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.7, maxWidth: "480px", marginBottom: "40px" }}>
        The page you&apos;re looking for may have moved or been removed. Head back to our homepage to explore our treatments.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/" className="btn btn-teal">
          Back to homepage
        </Link>
        <Link href="/consultation" style={{ display: "inline-flex", alignItems: "center", padding: "14px 28px", borderRadius: "8px", border: "1.5px solid #4a7d7d", color: "#4a7d7d", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
          Book a consultation
        </Link>
      </div>
    </div>
  );
}
