"use client";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { Treatment } from "@/lib/treatment-types";

type Props = { offer: NonNullable<Treatment["offer"]> };

export default function OfferStack({ offer }: Props) {
  return (
    <section
      aria-labelledby="offer-heading"
      style={{ padding: "clamp(40px,5vh,64px) 0", background: "linear-gradient(180deg,#ffffff,#f4f8f8)" }}
    >
      <div className="container">
        <Reveal>
          <div
            className="mx-auto"
            style={{
              maxWidth: 680,
              borderRadius: "var(--radius-card)",
              background: "linear-gradient(160deg,#eef4f5 0%,#ffffff 60%,#e6eef0 100%)",
              border: "1px solid var(--line)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.07)",
              padding: "clamp(28px,4vw,48px)",
            }}
          >
            {/* Price anchor */}
            <div className="flex flex-wrap items-baseline gap-3" style={{ marginBottom: 20 }}>
              <span
                className="font-serif"
                id="offer-heading"
                style={{ fontSize: "clamp(36px,5vw,52px)", color: "var(--gold)", letterSpacing: "0.02em" }}
              >
                {offer.priceNow}
              </span>
              {offer.priceWas && (
                <span
                  style={{
                    fontSize: "clamp(18px,2.5vw,24px)",
                    color: "var(--muted)",
                    textDecoration: "line-through",
                    fontFamily: "Roboto, sans-serif",
                  }}
                >
                  {offer.priceWas}
                </span>
              )}
              {offer.saveLabel && (
                <span
                  className="font-display"
                  style={{
                    fontSize: "11px",
                    background: "var(--teal-deep)",
                    color: "#fff",
                    borderRadius: "100px",
                    padding: "4px 12px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {offer.saveLabel}
                </span>
              )}
            </div>

            {/* What's included */}
            {offer.includedTitle && (
              <p
                className="font-display"
                style={{
                  fontSize: "11px",
                  color: "var(--teal-text)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                {offer.includedTitle}
              </p>
            )}
            <ul style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {offer.included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span aria-hidden="true" style={{ color: "var(--teal-text)", fontSize: 12, lineHeight: 1.7 }}>●</span>
                  <span style={{ fontSize: 14, color: "var(--label)", lineHeight: 1.6 }}>{item}</span>
                </li>
              ))}
            </ul>

            {/* Guarantee chip */}
            {offer.guaranteeChip && (
              <p
                style={{
                  fontSize: 12,
                  color: "var(--teal-text)",
                  fontFamily: "Roboto, sans-serif",
                  marginBottom: 20,
                  borderTop: "1px solid var(--line)",
                  paddingTop: 16,
                }}
              >
                {offer.guaranteeChip}
              </p>
            )}

            {/* Urgency */}
            {offer.urgency && (
              <p style={{ fontSize: 12.5, color: "var(--muted)", fontStyle: "italic", marginBottom: 20 }}>
                {offer.urgency}
              </p>
            )}

            {/* CTA */}
            {offer.cta.external ? (
              <a
                href={offer.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-teal"
                style={{ display: "inline-flex", alignItems: "center", minHeight: 44, width: "100%", justifyContent: "center" }}
              >
                {offer.cta.text}
              </a>
            ) : (
              <Link
                href={offer.cta.href}
                className="btn btn-teal"
                style={{ display: "inline-flex", alignItems: "center", minHeight: 44, width: "100%", justifyContent: "center" }}
              >
                {offer.cta.text}
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
