import PageHero from "@/components/PageHero";

/* Home hero — composed from the shared PageHero (arch media + floating proof),
   the single above-the-fold pattern used across every Carisma Aesthetics page. */
export default function Hero() {
  return (
    <PageHero
      motif
      badge="#1 Voted Med-Aesthetics Clinic"
      headline={[{ text: "Glow With" }, { text: "Confidence", em: true }]}
      sub="Doctor-led medical aesthetics in Malta, built around one belief: restoration, not change. Subtle, precise, never overdone, and always guided by a proper medical consultation first."
      bullets={[
        { text: "Medically qualified doctors" },
        { text: "Natural-looking results" },
        { text: "Personalised treatment plans" },
        { text: "Advanced, cutting-edge technology" },
      ]}
      primaryCta={{ text: "Book Free Consultation", href: "/consultation" }}
      secondaryCta={{ text: "View Treatments", href: "/face-treatments" }}
      media={{ type: "video", src: "/assets/clinic-video.mp4", poster: "/assets/clinic-room.jpg", alt: "Carisma Aesthetics clinic in Malta" }}
      proof={{ rating: "4.9", reviews: "200+", statValue: "30+", statLabel: "years in wellness", awardText: "#1 Voted Clinic\nMalta Healthcare Awards" }}
      compactHeadline
    />
  );
}
