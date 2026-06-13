const QUIZ_URL = "https://smart-questionnaire-eight.vercel.app";

export default function ConsultationForm({
  height = 720,
}: {
  height?: number;
  stacked?: boolean;
  showMessage?: boolean;
  submitLabel?: string;
}) {
  return (
    <div style={{ width: "100%" }}>
      <iframe
        src={QUIZ_URL}
        title="Personalised Skin Quiz"
        loading="lazy"
        style={{ width: "100%", height: `${height}px`, border: "none", display: "block" }}
      />
    </div>
  );
}
