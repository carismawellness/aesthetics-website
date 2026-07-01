import Link from "next/link";
import type { Treatment } from "@/lib/treatment-types";

const AESTHETICS_FRESHA_BOOK =
  "https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2800348&share=true&pId=2708191";

type Props = {
  closing: NonNullable<Treatment["closing"]>;
  bookHref?: string;
};

export default function ClosingCta({ closing, bookHref }: Props) {
  const href = closing.ctaHref ?? bookHref ?? AESTHETICS_FRESHA_BOOK;
  const isExternal = href.startsWith("http");

  return (
    <section
      aria-labelledby="closing-heading"
      style={{
        padding: "clamp(40px,7vh,88px) 0",
        background: "linear-gradient(160deg,#eef4f5 0%,#ffffff 50%,#e6eef0 100%)",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div className="container text-center">
        <h2
          id="closing-heading"
          className="font-serif mx-auto"
          style={{
            fontSize: "clamp(26px,3.8vw,42px)",
            color: "var(--gold)",
            letterSpacing: "0.04em",
            lineHeight: 1.25,
            maxWidth: 680,
          }}
        >
          {closing.heading}
        </h2>
        <p
          className="mx-auto"
          style={{ fontSize: 15.5, color: "var(--label)", lineHeight: 1.65, marginTop: 18, maxWidth: 560 }}
        >
          {closing.sub}
        </p>
        <div style={{ marginTop: 36 }}>
          {isExternal ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-teal"
              style={{ display: "inline-flex", alignItems: "center", minHeight: 44 }}
            >
              {closing.ctaLabel}
            </a>
          ) : (
            <Link
              href={href}
              className="btn btn-teal"
              style={{ display: "inline-flex", alignItems: "center", minHeight: 44 }}
            >
              {closing.ctaLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
