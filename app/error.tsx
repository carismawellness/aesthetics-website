"use client";

import Link from "next/link";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center" style={{ padding: "100px 24px 120px" }}>
      <p className="font-display" style={{ fontSize: "11px", color: "var(--teal)", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "20px" }}>
        Something went wrong
      </p>
      <h1 className="font-serif" style={{ fontSize: "clamp(22px,3vw,34px)", color: "var(--gold)", letterSpacing: "0.04em", marginBottom: "20px" }}>
        We hit an unexpected error
      </h1>
      <p style={{ fontSize: "15px", color: "var(--label)", lineHeight: 1.7, maxWidth: "480px", marginBottom: "40px" }}>
        Our team has been notified. You can try again or head back to the homepage.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={reset}
          className="btn btn-teal"
        >
          Try again
        </button>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", padding: "14px 28px", borderRadius: "8px", border: "1.5px solid var(--teal)", color: "var(--teal)", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}>
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
