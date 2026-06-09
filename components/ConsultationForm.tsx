"use client";

import { useState } from "react";
import { FACE_LINKS, BODY_LINKS } from "@/lib/site";

const TREATMENTS = [...FACE_LINKS, ...BODY_LINKS];

const fieldLabelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  color: "#9b8d83",
  marginBottom: "4px",
};

type Status = "idle" | "loading" | "success" | "error";

export default function ConsultationForm({
  showMessage = false,
  submitLabel = "Submit",
}: {
  showMessage?: boolean;
  submitLabel?: string;
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
      message: fd.get("message"),
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
      <div className="rounded-lg text-center" style={{ padding: "40px 28px", backgroundColor: "var(--cream)", border: "1px solid var(--line)" }}>
        <div className="mx-auto flex items-center justify-center rounded-full" style={{ width: "52px", height: "52px", backgroundColor: "var(--gold)" }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
        </div>
        <h3 className="font-display" style={{ fontSize: "16px", color: "var(--ink)", marginTop: "18px", letterSpacing: "0.08em" }}>Thank you</h3>
        <p style={{ fontSize: "14px", color: "var(--muted)", marginTop: "8px" }}>
          Your request has been received. One of our team will be in touch shortly to arrange your free consultation.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-firstName" style={fieldLabelStyle}>First Name</label>
          <input id="cf-firstName" className="form-field" name="firstName" type="text" placeholder="Enter your first name" required />
        </div>
        <div>
          <label htmlFor="cf-lastName" style={fieldLabelStyle}>Last Name</label>
          <input id="cf-lastName" className="form-field" name="lastName" type="text" placeholder="Enter your last name" />
        </div>
      </div>
      <div>
        <label htmlFor="cf-email" style={fieldLabelStyle}>Email *</label>
        <input id="cf-email" className="form-field" name="email" type="email" placeholder="Enter your email" required />
      </div>
      <div>
        <label htmlFor="cf-phone" style={fieldLabelStyle}>Phone *</label>
        <input id="cf-phone" className="form-field" name="phone" type="tel" placeholder="Enter your phone" required />
      </div>
      <div>
        <label htmlFor="cf-treatment" style={fieldLabelStyle}>Interested Services</label>
        <select id="cf-treatment" className="form-field" name="treatment" defaultValue="">
          <option value="" disabled>Select an option</option>
          {TREATMENTS.map((t) => (
            <option key={t.href} value={t.label}>{t.label}</option>
          ))}
        </select>
      </div>
      {showMessage && (
        <textarea className="form-field" name="message" rows={4} placeholder="Tell us a little about your goals (optional)" />
      )}
      <label className="flex items-start gap-3" style={{ fontSize: "12.5px", color: "var(--muted)", lineHeight: 1.6 }}>
        <input type="checkbox" name="consent" required style={{ marginTop: "3px" }} />
        <span>By clicking this button, I consent to authorising the clinic/spa to contact me with regards to the free consultation, acknowledging that the information shared may directly flow from these services.</span>
      </label>
      {status === "error" && (
        <p role="alert" style={{ fontSize: "13px", color: "#b42318" }}>{error}</p>
      )}
      <button type="submit" className="btn btn-gold w-full" disabled={status === "loading"} style={{ opacity: status === "loading" ? 0.7 : 1 }}>
        {status === "loading" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
