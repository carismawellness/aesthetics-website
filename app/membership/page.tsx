import type { Metadata } from "next";
import MembershipPage from "@/components/MembershipPage";

export const metadata: Metadata = {
  title: "The Glow Club Membership | Carisma Aesthetics Malta",
  description:
    "Join The Glow Club — Carisma Aesthetics' membership: save monthly into your Glow balance and enjoy 10% off services, 15% off products, priority booking and exclusive rewards.",
};

export default function Page() {
  return <MembershipPage />;
}
