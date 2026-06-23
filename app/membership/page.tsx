import type { Metadata } from "next";
import MembershipPage from "@/components/MembershipPage";

export const metadata: Metadata = {
  title: 'Glow Club Membership | Carisma Aesthetics Malta',
  description: 'Get your Glow Club Membership at Carisma Aesthetics Malta. Exclusive discounts on aesthetic treatments, priority booking, and members-only perks.',
  alternates: { canonical: 'https://www.carismaaesthetics.com/membership' },
  openGraph: {
    title: 'Glow Club Membership | Carisma Aesthetics Malta',
    description: 'Exclusive discounts on aesthetic treatments and priority booking with the Glow Club.',
    url: 'https://www.carismaaesthetics.com/membership',
    images: [{ url: '/og-aesthetics.jpg', width: 1200, height: 630, alt: 'Glow Club Membership Malta' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og-aesthetics.jpg'] },
};

export default function Page() {
  return <MembershipPage />;
}
