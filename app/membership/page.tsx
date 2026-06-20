import type { Metadata } from "next";
import MembershipPage from "@/components/MembershipPage";

export const metadata: Metadata = {
  title: "Glow Club Membership | Carisma Aesthetics",
  description:
    "Get your Glow Club Membership in Malta and enjoy exclusive discounts on Carisma's aesthetics treatments. For more information, call us on +356 27802062. ",
  openGraph: {
    title: "Glow Club Membership | Carisma Aesthetics",
    description:
      "Get your Glow Club Membership in Malta and enjoy exclusive discounts on Carisma's aesthetics treatments. For more information, call us on +356 27802062. ",
    url: "https://www.carismaaesthetics.com/membership",
    siteName: "Carisma Aesthetics",
    type: "website",
    images: [
      {
        url: "https://static.wixstatic.com/media/87fc13_83b25afbb7524ac7b5ca6898f373efb7~mv2.jpg/v1/fill/w_1886,h_1254,al_c/87fc13_83b25afbb7524ac7b5ca6898f373efb7~mv2.jpg",
        width: 1886,
        height: 1254,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Glow Club Membership | Carisma Aesthetics",
    description:
      "Get your Glow Club Membership in Malta and enjoy exclusive discounts on Carisma's aesthetics treatments. For more information, call us on +356 27802062. ",
    images: [
      "https://static.wixstatic.com/media/87fc13_83b25afbb7524ac7b5ca6898f373efb7~mv2.jpg/v1/fill/w_1886,h_1254,al_c/87fc13_83b25afbb7524ac7b5ca6898f373efb7~mv2.jpg",
    ],
  },
};

export default function Page() {
  return <MembershipPage />;
}
