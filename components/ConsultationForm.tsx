"use client";

const FORM_ID  = "SMsdYoPTYToWezZxvGUn";
const FORM_SRC = `https://api.leadconnectorhq.com/widget/form/${FORM_ID}`;

export default function ConsultationForm({
  height = 751,
  instanceId = "default",
  stacked: _stacked,
  showMessage: _showMessage,
  submitLabel: _submitLabel,
}: {
  height?: number;
  instanceId?: string;
  stacked?: boolean;
  showMessage?: boolean;
  submitLabel?: string;
}) {
  const iframeId = `inline-${FORM_ID}-${instanceId}`;
  return (
    /*
     * Wrapping region gives screen-reader users a named landmark
     * for the embedded booking form. The iframe itself cannot expose
     * individual field labels (third-party GHL form), so we rely on
     * the iframe's own `title` and the outer landmark.
     */
    <section
      aria-label="Book a Free Consultation form"
      style={{ width: "100%" }}
    >
      <iframe
        src={FORM_SRC}
        id={iframeId}
        title="Book Your Free Consultation"
        /* Announce the purpose to assistive technology */
        aria-label="Book Your Free Consultation — powered by GHL"
        style={{
          width: "100%",
          height: `${height}px`,
          border: "none",
          display: "block",
          /* Prevent CLS: reserve the exact height so the page doesn't jump */
          minHeight: `${height}px`,
        }}
        /* Lazy-load: iframe is below the fold on the modal/page */
        loading="lazy"
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="WEB FORM"
        data-height={height}
        data-layout-iframe-id={iframeId}
        data-form-id={FORM_ID}
      />
    </section>
  );
}
