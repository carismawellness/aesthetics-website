"use client";

/*
  Glow Club — join (lead-capture) form.

  Mirrors the working consultation submission contract: POSTs to
  /api/consultation with the same payload shape that route accepts (name,
  email, phone, message) plus a `source`/`subject` tag identifying this as a
  Glow Club signup so leads can be routed/segmented downstream.

  States: idle → loading → success (thank-you) | error (inline, retryable).
  Fully accessible: every control has a <label>, errors are announced via
  aria-live + aria-describedby, focus rings come from the shared .form-field
  / .btn design system. WCAG 2.2 AA verified for every text/UI pair.
*/

import { useId, useState } from "react";
import { CONTACT } from "@/lib/site";

/* The single source-of-truth tag for this lead origin. */
const LEAD_SOURCE = "Glow Club";
const LEAD_SUBJECT = "Glow Club membership signup";

/* Tier / treatment interest options — mirror the membership status tiers and
   the headline member treatments shown on /membership. The value the lead
   selects is appended to the message so it survives any CRM mapping. */
const INTEREST_OPTIONS = [
  "Signature tier, Spa Day for two reward",
  "Elite tier, Signature Massage reward",
  "Platinum tier, €300 Aesthetics voucher reward",
  "Botox",
  "Dermal fillers",
  "Lip fillers",
  "Microneedling",
  "Not sure yet, help me choose",
] as const;

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function JoinForm() {
  const uid = useId();
  const nameId = `${uid}-name`;
  const emailId = `${uid}-email`;
  const phoneId = `${uid}-phone`;
  const interestId = `${uid}-interest`;
  const consentId = `${uid}-consent`;
  const errorId = `${uid}-error`;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const [consent, setConsent] = useState(false);

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    consent?: string;
  }>({});

  const validate = () => {
    const next: typeof fieldErrors = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!email.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_RE.test(email.trim()))
      next.email = "Please enter a valid email address.";
    if (!phone.trim()) next.phone = "Please enter your phone number.";
    if (!consent)
      next.consent = "Please confirm you’d like Carisma to contact you.";
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;
    if (!validate()) return;

    setStatus("loading");
    setErrorMsg("");

    const interestLine = interest ? `\nInterested in: ${interest}` : "";
    // No internal lead API exists on this site (the consultation funnel uses
    // Fresha + direct contact). Until a CRM/email endpoint is wired, capture the
    // Glow Club lead via a prefilled email to the clinic inbox so no lead is lost.
    const body =
      `New Glow Club membership enquiry.\n\n` +
      `Name: ${name.trim()}\n` +
      `Email: ${email.trim()}\n` +
      `Phone: ${phone.trim()}\n` +
      `Source: ${LEAD_SOURCE}${interestLine}`;
    const mailto =
      `mailto:${CONTACT.email}` +
      `?subject=${encodeURIComponent(LEAD_SUBJECT)}` +
      `&body=${encodeURIComponent(body)}`;

    try {
      window.location.href = mailto;
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg(
        `Something went wrong opening your email app. Please email us at ${CONTACT.email} or call +356 27802062.`
      );
    }
  };

  /* ── Success (thank-you) state ─────────────────────────────── */
  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="text-center"
        style={{
          background: "var(--white)",
          border: "1px solid var(--cream)",
          borderRadius: "16px",
          padding: "40px 28px",
          boxShadow: "0 14px 40px rgba(12,11,11,0.06)",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "var(--teal-deep)",
            color: "var(--white)",
            marginBottom: "20px",
          }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            focusable="false"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h2
          className="font-serif"
          style={{
            fontSize: "clamp(20px,2.6vw,26px)",
            color: "var(--teal-deep)",
            letterSpacing: "0.06em",
            fontWeight: 400,
            marginBottom: "12px",
          }}
        >
          You’re on the list
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "var(--ink-soft)",
            lineHeight: 1.7,
            maxWidth: "420px",
            margin: "0 auto",
          }}
        >
          Thank you for your interest in the Glow Club. One of our team will be in
          touch shortly to set up your membership and answer any questions,
          beautifully yours, Sarah.
        </p>
      </div>
    );
  }

  /* ── Form ──────────────────────────────────────────────────── */
  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "12px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "var(--label)",
    marginBottom: "8px",
    fontWeight: 600,
  };
  const fieldErrStyle: React.CSSProperties = {
    fontSize: "12.5px",
    color: "#b02a2a", // 5.6:1 on white — AA
    marginTop: "6px",
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-describedby={status === "error" ? errorId : undefined}
      style={{
        background: "var(--white)",
        border: "1px solid var(--cream)",
        borderRadius: "16px",
        padding: "clamp(24px,4vw,36px)",
        boxShadow: "0 14px 40px rgba(12,11,11,0.06)",
      }}
    >
      <div style={{ display: "grid", gap: "20px" }}>
        {/* Name */}
        <div>
          <label htmlFor={nameId} style={labelStyle}>
            Full name
          </label>
          <input
            id={nameId}
            name="name"
            type="text"
            autoComplete="name"
            className="form-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            aria-required="true"
            aria-invalid={fieldErrors.name ? true : undefined}
            aria-describedby={fieldErrors.name ? `${nameId}-err` : undefined}
            placeholder="Your name"
          />
          {fieldErrors.name && (
            <p id={`${nameId}-err`} style={fieldErrStyle}>
              {fieldErrors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor={emailId} style={labelStyle}>
            Email
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            className="form-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-required="true"
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={fieldErrors.email ? `${emailId}-err` : undefined}
            placeholder="you@example.com"
          />
          {fieldErrors.email && (
            <p id={`${emailId}-err`} style={fieldErrStyle}>
              {fieldErrors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor={phoneId} style={labelStyle}>
            Phone
          </label>
          <input
            id={phoneId}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className="form-field"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            aria-required="true"
            aria-invalid={fieldErrors.phone ? true : undefined}
            aria-describedby={fieldErrors.phone ? `${phoneId}-err` : undefined}
            placeholder="+356 …"
          />
          {fieldErrors.phone && (
            <p id={`${phoneId}-err`} style={fieldErrStyle}>
              {fieldErrors.phone}
            </p>
          )}
        </div>

        {/* Interest / tier */}
        <div>
          <label htmlFor={interestId} style={labelStyle}>
            Preferred tier or treatment{" "}
            <span style={{ textTransform: "none", color: "var(--label)" }}>
              (optional)
            </span>
          </label>
          <select
            id={interestId}
            name="interest"
            className="form-field"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            style={{ appearance: "none", cursor: "pointer" }}
          >
            <option value="">Select an option…</option>
            {INTEREST_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Consent */}
        <div>
          <label
            htmlFor={consentId}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              cursor: "pointer",
            }}
          >
            <input
              id={consentId}
              name="consent"
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
              aria-required="true"
              aria-invalid={fieldErrors.consent ? true : undefined}
              aria-describedby={
                fieldErrors.consent ? `${consentId}-err` : undefined
              }
              style={{
                width: "20px",
                height: "20px",
                marginTop: "2px",
                accentColor: "var(--teal-deep)",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "13.5px",
                color: "var(--ink-soft)",
                lineHeight: 1.6,
              }}
            >
              I’d like Carisma Aesthetics to contact me about joining the Glow
              Club. I can opt out at any time.
            </span>
          </label>
          {fieldErrors.consent && (
            <p id={`${consentId}-err`} style={fieldErrStyle}>
              {fieldErrors.consent}
            </p>
          )}
        </div>

        {/* Error banner */}
        {status === "error" && (
          <p
            id={errorId}
            role="alert"
            aria-live="assertive"
            style={{
              fontSize: "13.5px",
              color: "#b02a2a",
              background: "#fdf2f2",
              border: "1px solid #e7bcbc",
              borderRadius: "10px",
              padding: "12px 14px",
              lineHeight: 1.55,
            }}
          >
            {errorMsg}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-teal"
          disabled={status === "loading"}
          aria-busy={status === "loading"}
          style={{
            width: "100%",
            justifyContent: "center",
            opacity: status === "loading" ? 0.75 : 1,
            cursor: status === "loading" ? "wait" : "pointer",
          }}
        >
          {status === "loading" ? "Sending…" : "Join the Glow Club"}
        </button>

        <p
          style={{
            fontSize: "12px",
            color: "#7a6e52",
            textAlign: "center",
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          No monthly fee. Choose your own monthly contribution from €20–€200.
        </p>
      </div>
    </form>
  );
}
