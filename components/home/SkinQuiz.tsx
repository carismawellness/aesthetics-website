"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CONCERNS = [
  "Wrinkles",
  "Thin lips",
  "Facial volumising",
  "Uneven skin tone",
  "Acne",
  "Double chin",
  "Dark circles",
  "Dry skin",
  "Oily skin",
];

const TREATMENTS = [
  "Botox",
  "Lip Fillers",
  "Dermal Fillers",
  "Mesotherapy",
  "PRP",
  "Thread Lift",
  "Chemical Peels",
  "Microneedling",
  "Collagen-Stimulator",
  "Advanced Hydrating Facial",
  "None / Not sure",
];

type Step = "name" | "concerns" | "injectables" | "treatment";
const STEPS: Step[] = ["name", "concerns", "injectables", "treatment"];

const STEP_LABELS = ["Your name", "Concerns", "Injectables", "Treatment"];

export default function SkinQuiz() {
  const router = useRouter();
  const [step, setStep] = useState<number>(0);
  const [name, setName] = useState("");
  const [concerns, setConcerns] = useState<string[]>([]);
  const [injectables, setInjectables] = useState<"Yes" | "No" | "">("");
  const [treatment, setTreatment] = useState("");

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  function toggleConcern(c: string) {
    setConcerns((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  }

  function canAdvance() {
    if (current === "name") return true; // optional
    if (current === "concerns") return concerns.length > 0;
    if (current === "injectables") return injectables !== "";
    return true; // treatment optional
  }

  function submit() {
    const params = new URLSearchParams();
    if (name.trim()) params.set("name", name.trim());
    if (concerns.length) params.set("concerns", concerns.map(encodeURIComponent).join(","));
    if (injectables) params.set("injectables", injectables);
    if (treatment && treatment !== "None / Not sure") params.set("treatment", treatment);
    router.push(`/quiz-results?${params.toString()}`);
  }

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.70)",
        borderRadius: "14px",
        padding: "28px 24px 32px",
        backdropFilter: "blur(6px)",
      }}
    >
      {/* Progress bar */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "24px" }}>
        {STEPS.map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: "3px",
              borderRadius: "2px",
              background: i <= step ? "#96b2b2" : "#ddd",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>

      {/* Step label */}
      <p
        className="font-display"
        style={{
          fontSize: "11px",
          letterSpacing: "0.14em",
          color: "#96b2b2",
          textTransform: "uppercase",
          marginBottom: "8px",
        }}
      >
        Step {step + 1} of {STEPS.length} — {STEP_LABELS[step]}
      </p>

      {/* ── Step: Name ── */}
      {current === "name" && (
        <div>
          <h2
            className="font-serif"
            style={{ fontSize: "20px", color: "#7a8e90", marginBottom: "18px", fontWeight: 400 }}
          >
            What&apos;s your first name?
          </h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            style={{
              width: "100%",
              padding: "13px 16px",
              border: "1px solid #d0dcdc",
              borderRadius: "8px",
              fontSize: "15px",
              color: "#333",
              outline: "none",
              boxSizing: "border-box",
            }}
            onKeyDown={(e) => e.key === "Enter" && setStep(1)}
          />
          <p style={{ fontSize: "12px", color: "#aaa", marginTop: "8px" }}>
            Optional — skip if you prefer
          </p>
        </div>
      )}

      {/* ── Step: Concerns ── */}
      {current === "concerns" && (
        <div>
          <h2
            className="font-serif"
            style={{ fontSize: "20px", color: "#7a8e90", marginBottom: "18px", fontWeight: 400 }}
          >
            What are your main skin concerns?
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {CONCERNS.map((c) => {
              const active = concerns.includes(c);
              return (
                <button
                  key={c}
                  onClick={() => toggleConcern(c)}
                  style={{
                    padding: "9px 16px",
                    borderRadius: "20px",
                    border: `1.5px solid ${active ? "#96b2b2" : "#ccc"}`,
                    background: active ? "#96b2b2" : "#fff",
                    color: active ? "#fff" : "#555",
                    fontSize: "13px",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.2s",
                  }}
                >
                  {c}
                </button>
              );
            })}
          </div>
          {concerns.length === 0 && (
            <p style={{ fontSize: "12px", color: "#aaa", marginTop: "10px" }}>
              Select at least one concern to continue
            </p>
          )}
        </div>
      )}

      {/* ── Step: Injectables ── */}
      {current === "injectables" && (
        <div>
          <h2
            className="font-serif"
            style={{ fontSize: "20px", color: "#7a8e90", marginBottom: "8px", fontWeight: 400 }}
          >
            Are you open to injectable treatments?
          </h2>
          <p style={{ fontSize: "13px", color: "#999", marginBottom: "20px" }}>
            e.g. Botox, lip fillers, dermal fillers
          </p>
          <div style={{ display: "flex", gap: "14px" }}>
            {(["Yes", "No"] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setInjectables(opt)}
                style={{
                  flex: 1,
                  padding: "16px",
                  borderRadius: "10px",
                  border: `1.5px solid ${injectables === opt ? "#96b2b2" : "#ccc"}`,
                  background: injectables === opt ? "#96b2b2" : "#fff",
                  color: injectables === opt ? "#fff" : "#555",
                  fontSize: "15px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Step: Treatment interest ── */}
      {current === "treatment" && (
        <div>
          <h2
            className="font-serif"
            style={{ fontSize: "20px", color: "#7a8e90", marginBottom: "18px", fontWeight: 400 }}
          >
            Any specific treatment in mind?
          </h2>
          <select
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
            style={{
              width: "100%",
              padding: "13px 16px",
              border: "1px solid #d0dcdc",
              borderRadius: "8px",
              fontSize: "15px",
              color: treatment ? "#333" : "#aaa",
              background: "#fff",
              outline: "none",
              cursor: "pointer",
              boxSizing: "border-box",
            }}
          >
            <option value="">Select an option (optional)</option>
            {TREATMENTS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
        {step > 0 && (
          <button
            onClick={() => setStep((s) => s - 1)}
            style={{
              padding: "13px 22px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              background: "transparent",
              color: "#777",
              fontSize: "13px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "Novecento Wide Book, sans-serif",
            }}
          >
            Back
          </button>
        )}
        <button
          onClick={isLast ? submit : () => setStep((s) => s + 1)}
          disabled={!canAdvance()}
          style={{
            flex: 1,
            padding: "14px 22px",
            borderRadius: "6px",
            border: "none",
            background: canAdvance() ? "#96b2b2" : "#ccc",
            color: "#fff",
            fontSize: "13px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: canAdvance() ? "pointer" : "not-allowed",
            fontFamily: "Novecento Wide Book, sans-serif",
            transition: "background 0.2s",
          }}
        >
          {isLast ? "See My Recommendations →" : "Continue →"}
        </button>
      </div>
    </div>
  );
}
