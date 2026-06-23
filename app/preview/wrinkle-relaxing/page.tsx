import type { Metadata } from "next";
import TreatmentTemplate from "@/components/treatment/TreatmentTemplate";
import preview from "@/lib/treatments/_preview-wrinkle";

// Internal preview of the new world-class treatment template — NOT indexed,
// not linked anywhere. Used to approve/perfect the template before rollout.
export const metadata: Metadata = {
  title: "Preview — Wrinkle-Relaxing Template",
  robots: { index: false, follow: false },
};

export default function WrinkleTemplatePreview() {
  return <TreatmentTemplate t={preview} />;
}
