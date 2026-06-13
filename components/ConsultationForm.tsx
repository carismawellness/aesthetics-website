"use client";

const FORM_ID  = "SMsdYoPTYToWezZxvGUn";
const FORM_SRC = `https://api.leadconnectorhq.com/widget/form/${FORM_ID}`;

export default function ConsultationForm({
  height = 1093,
  stacked: _stacked,
  showMessage: _showMessage,
  submitLabel: _submitLabel,
}: {
  height?: number;
  stacked?: boolean;
  showMessage?: boolean;
  submitLabel?: string;
}) {
  return (
    <div style={{ width: "100%" }}>
      <iframe
        src={FORM_SRC}
        id={`inline-${FORM_ID}`}
        title="Book Your Free Consultation"
        loading="lazy"
        style={{ width: "100%", height: `${height}px`, border: "none", display: "block" }}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="WEB FORM"
        data-height={height}
        data-layout-iframe-id={`inline-${FORM_ID}`}
        data-form-id={FORM_ID}
      />
    </div>
  );
}
