"use client";

import { useId } from "react";

/**
 * Lead-capture form for the whole site. We embed the Carisma GoHighLevel
 * (LeadConnector) form so every enquiry flows into the GHL pipeline.
 * The loader script (link.msgsndr.com/js/form_embed.js) is included once
 * in app/layout.tsx and auto-resizes the iframe to its content.
 *
 * Props are kept for backwards-compatibility with existing call sites
 * (they no longer affect the embedded form); `height` sets the initial
 * iframe height before the embed script resizes it.
 */
const FORM_SRC = "https://api.leadconnectorhq.com/widget/form/rupktKo0JCd9lz56xvpP";
const FORM_ID = "rupktKo0JCd9lz56xvpP";

export default function ConsultationForm({
  height = 719,
}: {
  showMessage?: boolean;
  submitLabel?: string;
  stacked?: boolean;
  height?: number;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const iframeId = `inline-${FORM_ID}-${uid}`;
  return (
    <iframe
      src={FORM_SRC}
      title="WEB FORM"
      id={iframeId}
      style={{ width: "100%", height: `${height}px`, border: "none", borderRadius: "8px" }}
      data-layout="{'id':'INLINE'}"
      data-trigger-type="alwaysShow"
      data-trigger-value=""
      data-activation-type="alwaysActivated"
      data-activation-value=""
      data-deactivation-type="neverDeactivate"
      data-deactivation-value=""
      data-form-name="WEB FORM - Copy"
      data-height="719"
      data-layout-iframe-id={iframeId}
      data-form-id={FORM_ID}
    />
  );
}
