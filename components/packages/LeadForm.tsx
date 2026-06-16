"use client";

import { useState, useId } from "react";

/*
  Compact on-page lead-capture form for the Snatch Your Jawline funnel.
  Primary CTA — keeps the visitor on the page (vs. bouncing to Fresha).
  Posts to the existing validated /api/consultation backend, which forwards to
  GHL (GHL_WEBHOOK_URL) → Resend → local capture, so a lead is never lost.
  On success it fires a GTM `generate_lead` event for ad-conversion tracking.
*/

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

const TREATMENT = "Snatch Your Jawline";
const OFFER_VALUE = 149;

export default function LeadForm({
  variant = "hero",
  bookHref,
  bookLabel = "Prefer to book directly? Reserve on Fresha",
  ctaLabel = "Claim my €149 spot",
}: {
  variant?: "hero" | "closing";
  bookHref: string;
  bookLabel?: string;
  ctaLabel?: string;
}) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const uid = useId();
  const nameId = `${uid}-name`;
  const phoneId = `${uid}-phone`;
  const emailId = `${uid}-email`;
  const consentId = `${uid}-consent`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "loading") return;
    setError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      firstName: String(fd.get("firstName") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      treatment: TREATMENT,
      consent: fd.get("consent") === "on",
    };

    if (!payload.firstName) return setError("Please enter your name.");
    if (!payload.phone) return setError("Please enter a phone number so we can confirm your spot.");
    if (!payload.consent) return setError("Please accept the consent notice to continue.");

    setState("loading");
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || "Something went wrong. Please try again or book on Fresha.");
      }
      window.dataLayer?.push({
        event: "generate_lead",
        treatment: TREATMENT,
        value: OFFER_VALUE,
        currency: "EUR",
      });
      setState("done");
    } catch (err) {
      setState("idle");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  const onCard = variant === "closing";
  const cardStyle: React.CSSProperties = {
    background: "var(--white)",
    border: "1px solid var(--line)",
    borderRadius: "16px",
    padding: "clamp(22px,3vw,30px)",
    boxShadow: "0 18px 44px rgba(0,0,0,0.08)",
  };

  if (state === "done") {
    return (
      <div style={cardStyle} role="status" aria-live="polite">
        <div className="flex items-center justify-center" style={{ width: "52px", height: "52px", borderRadius: "50%", background: "var(--teal-100)", margin: "0 auto 16px" }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--teal-deep)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M20 6 9 17l-5-5" /></svg>
        </div>
        <h3 className="font-serif text-center" style={{ fontSize: "20px", color: "var(--teal-deep)", letterSpacing: "0.04em" }}>You&apos;re on the list!</h3>
        <p className="text-center" style={{ fontSize: "14px", color: "var(--label)", lineHeight: 1.7, marginTop: "10px" }}>
          Thank you — our team will call or message you shortly to confirm your <strong>€149 Snatch Your Jawline</strong> spot and find a time that suits you.
        </p>
        <a href={bookHref} target="_blank" rel="noopener noreferrer" className="btn btn-teal" style={{ width: "100%", marginTop: "18px" }}>
          Or book your time now on Fresha
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate style={onCard ? cardStyle : undefined} aria-describedby={error ? `${uid}-err` : undefined}>
      {onCard && (
        <p className="font-display text-center" style={{ fontSize: "13px", color: "var(--teal-deep)", letterSpacing: "0.1em", marginBottom: "6px" }}>
          Claim your spot — €149
        </p>
      )}
      <div className="grid gap-3" style={{ gridTemplateColumns: "1fr" }}>
        <div>
          <label htmlFor={nameId} className="font-display" style={{ fontSize: "10.5px", color: "var(--label)", letterSpacing: "0.1em", display: "block", marginBottom: "5px" }}>
            First name
          </label>
          <input id={nameId} name="firstName" type="text" autoComplete="given-name" required placeholder="Your name" className="form-field" />
        </div>
        <div>
          <label htmlFor={phoneId} className="font-display" style={{ fontSize: "10.5px", color: "var(--label)", letterSpacing: "0.1em", display: "block", marginBottom: "5px" }}>
            Phone
          </label>
          <input id={phoneId} name="phone" type="tel" autoComplete="tel" inputMode="tel" required placeholder="e.g. 99 123 456" className="form-field" />
        </div>
        <div>
          <label htmlFor={emailId} className="font-display" style={{ fontSize: "10.5px", color: "var(--label)", letterSpacing: "0.1em", display: "block", marginBottom: "5px" }}>
            Email <span style={{ textTransform: "none", letterSpacing: 0, opacity: 0.7 }}>(optional)</span>
          </label>
          <input id={emailId} name="email" type="email" autoComplete="email" placeholder="you@email.com" className="form-field" />
        </div>
      </div>

      <label htmlFor={consentId} className="flex items-start gap-2" style={{ marginTop: "12px", cursor: "pointer" }}>
        <input id={consentId} name="consent" type="checkbox" required style={{ marginTop: "3px", accentColor: "var(--teal)", width: "15px", height: "15px", flexShrink: 0 }} />
        <span style={{ fontSize: "11.5px", color: "var(--muted)", lineHeight: 1.5 }}>
          I agree to be contacted about my booking and consent to Carisma Aesthetics storing my details.
        </span>
      </label>

      {error && (
        <p id={`${uid}-err`} role="alert" style={{ fontSize: "12.5px", color: "#c0392b", marginTop: "10px" }}>{error}</p>
      )}

      <button type="submit" disabled={state === "loading"} className="btn btn-teal" style={{ width: "100%", marginTop: "14px", padding: "15px 24px", opacity: state === "loading" ? 0.7 : 1 }}>
        {state === "loading" ? "Securing your spot…" : ctaLabel}
      </button>

      <div className="flex items-center justify-center gap-2" style={{ marginTop: "12px" }}>
        <span style={{ color: "var(--gold-deep)", fontSize: "13px", letterSpacing: "1px" }} aria-hidden>★★★★★</span>
        <span style={{ fontSize: "12px", color: "var(--label)" }}>4.9/5 from 200+ reviews</span>
      </div>

      <a href={bookHref} target="_blank" rel="noopener noreferrer" className="block text-center" style={{ fontSize: "12.5px", color: "var(--teal-deep)", marginTop: "12px", textDecoration: "underline" }}>
        {bookLabel} →
      </a>
    </form>
  );
}
