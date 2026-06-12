"use client";

import { useState } from "react";
import { FACE_LINKS, BODY_LINKS } from "@/lib/site";

/**
 * Native, full-width lead form — a 1:1 replica of the Carisma GHL "WEB FORM"
 * fields, styled in the brand so we control width and text colour. Submissions
 * POST to /api/consultation, which forwards them into GoHighLevel via the
 * inbound webhook (set GHL_WEBHOOK_URL), with email/local-capture fallbacks.
 */
const TREATMENTS = [...FACE_LINKS, ...BODY_LINKS];

const LABEL = "#5b5249";
const FIELD: React.CSSProperties = {
  width: "100%",
  padding: "13px 14px",
  border: "1px solid var(--line)",
  borderRadius: "8px",
  background: "#f6f5f3",
  fontSize: "15px",
  color: "#2b2b2b",
  outline: "none",
};
const labelStyle: React.CSSProperties = { display: "block", fontSize: "14px", color: LABEL, marginBottom: "6px" };

type Status = "idle" | "loading" | "success" | "error";

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <label htmlFor={htmlFor} style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

export default function ConsultationForm({
  submitLabel = "Submit",
}: {
  showMessage?: boolean;
  submitLabel?: string;
  stacked?: boolean;
  height?: number;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      firstName: fd.get("firstName"),
      lastName: fd.get("lastName"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      treatment: fd.get("treatment"),
      consent: fd.get("consent") === "on",
    };
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error || "Something went wrong. Please call us instead.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError("Network error. Please try again or call us.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg text-center" style={{ padding: "44px 28px", background: "#f6f5f3", border: "1px solid var(--line)" }}>
        <div className="mx-auto flex items-center justify-center rounded-full" style={{ width: "54px", height: "54px", background: "var(--gold)" }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>
        </div>
        <h3 className="font-display" style={{ fontSize: "16px", color: "var(--ink)", marginTop: "18px", letterSpacing: "0.08em" }}>Thank you</h3>
        <p style={{ fontSize: "14px", color: "var(--muted)", marginTop: "8px" }}>Your request has been received. One of our team will be in touch shortly to arrange your free consultation.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} style={{ width: "100%" }} noValidate>
      <Field label="First Name" htmlFor="cf-first">
        <input id="cf-first" name="firstName" type="text" placeholder="Enter your first name" style={FIELD} />
      </Field>
      <Field label="Last Name" htmlFor="cf-last">
        <input id="cf-last" name="lastName" type="text" placeholder="Enter your last name" style={FIELD} />
      </Field>
      <Field label="Email *" htmlFor="cf-email">
        <span style={{ position: "relative", display: "block" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={LABEL} strokeWidth="1.6" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg>
          <input id="cf-email" name="email" type="email" required placeholder="your@email.com" style={{ ...FIELD, paddingLeft: "40px" }} />
        </span>
      </Field>
      <Field label="Phone *" htmlFor="cf-phone">
        <span style={{ display: "flex", alignItems: "stretch", border: "1px solid var(--line)", borderRadius: "8px", background: "#f6f5f3", overflow: "hidden" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "6px", padding: "0 12px", borderRight: "1px solid var(--line)", fontSize: "14px", color: LABEL }}>
            <span aria-hidden style={{ fontSize: "16px" }}>🇲🇹</span>+356
          </span>
          <input id="cf-phone" name="phone" type="tel" required placeholder="9999 9999" style={{ ...FIELD, border: "none", background: "transparent", borderRadius: 0 }} />
        </span>
      </Field>
      <Field label="Interested Services" htmlFor="cf-treatment">
        <select id="cf-treatment" name="treatment" defaultValue="" style={{ ...FIELD, appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='none' stroke='%235b5249' stroke-width='1.5' d='M1 1l5 5 5-5'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}>
          <option value="" disabled>Select an option</option>
          {TREATMENTS.map((t) => (<option key={t.href} value={t.label}>{t.label}</option>))}
        </select>
      </Field>
      <label className="flex items-start gap-3" style={{ fontSize: "13px", color: "#7c756b", lineHeight: 1.6, margin: "4px 0 20px" }}>
        <input type="checkbox" name="consent" required style={{ marginTop: "3px" }} />
        <span>By checking this box, I commit to attending my scheduled free consultation, acknowledging that a no-show may disqualify me from future sessions.</span>
      </label>
      {status === "error" && <p role="alert" style={{ fontSize: "13px", color: "#b42318", marginBottom: "12px" }}>{error}</p>}
      <button type="submit" disabled={status === "loading"} className="font-display" style={{ width: "100%", background: "var(--gold)", color: "#fff", padding: "15px", borderRadius: "8px", fontSize: "14px", letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer", opacity: status === "loading" ? 0.7 : 1 }}>
        {status === "loading" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
