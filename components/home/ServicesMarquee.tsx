import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
  BotoxIcon, LipFillersIcon, DermalFillersIcon, CollagenBoostIcon,
  MicroneedlingIcon, MesotherapyIcon, PRPIcon, ThreadLiftIcon,
  ChemicalPeelIcon, FatDissolvingIcon, HydrafacialIcon, LaserHairRemovalIcon,
} from "@/components/home/TreatmentIcons";

const B = "1px solid #ddd8d2";

const SERVICES = [
  { label: "BOTOX",              href: "/wrinkle-relaxing-malta",    Icon: BotoxIcon },
  { label: "LIP FILLERS",        href: "/lip-fillers-malta",         Icon: LipFillersIcon },
  { label: "DERMAL FILLERS",     href: "/dermal-fillers-malta",      Icon: DermalFillersIcon },
  { label: "COLLAGEN BOOST",     href: "/collagen-stimulator-malta", Icon: CollagenBoostIcon },
  { label: "MICRONEEDLING",      href: "/microneedling-malta",       Icon: MicroneedlingIcon },
  { label: "MESOTHERAPY",        href: "/mesotherapy-malta",         Icon: MesotherapyIcon },
  { label: "PRP",                href: "/prp-malta",                 Icon: PRPIcon },
  { label: "THREAD LIFT",        href: "/thread-lift-malta",         Icon: ThreadLiftIcon },
  { label: "CHEMICAL PEEL",      href: "/chemical-peels-malta",      Icon: ChemicalPeelIcon },
  { label: "FAT DISSOLVING",     href: "/fat-dissolving-malta",      Icon: FatDissolvingIcon },
  { label: "HYDRAFACIAL",        href: "/hydrafacial",               Icon: HydrafacialIcon },
  { label: "LASER HAIR REMOVAL", href: "/laser-hair-removal-malta",  Icon: LaserHairRemovalIcon },
];

export default function ServicesMarquee() {
  return (
    <section style={{ padding: "70px 0", background: "#fff" }}>
      <div className="container">
        <Reveal>
          <h2 className="font-display text-center" style={{ fontSize: "clamp(22px,3vw,35px)", color: "var(--gold)", fontWeight: 400, letterSpacing: "0.1em" }}>
            medical aesthetics procedures
          </h2>
          <div className="mx-auto" style={{ width: "205px", height: "1.5px", background: "#96b2b2", marginTop: "16px", marginBottom: "48px" }} />
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" style={{ gap: "28px" }}>
          {SERVICES.map(({ label, href, Icon }, i) => (
            <Reveal key={href} delay={(i % 4) * 70}>
              <Link href={href} className="group block">
                {/* Bracket frame — contains icon + label together */}
                <div className="relative flex flex-col items-center" style={{ paddingTop: "28px", paddingBottom: "22px", gap: "16px" }}>
                  {/* Corner brackets */}
                  <span className="absolute" style={{ left: 0, top: 0, width: "30%", height: "25%", borderLeft: B, borderTop: B }} />
                  <span className="absolute" style={{ right: 0, top: 0, width: "30%", height: "25%", borderRight: B, borderTop: B }} />
                  <span className="absolute" style={{ left: 0, bottom: 0, width: "30%", height: "25%", borderLeft: B, borderBottom: B }} />
                  <span className="absolute" style={{ right: 0, bottom: 0, width: "30%", height: "25%", borderRight: B, borderBottom: B }} />
                  {/* Icon */}
                  <Icon size={110} className="transition-transform duration-300 group-hover:scale-105" />
                  {/* Label inside the bracket, below the icon */}
                  <p className="font-display" style={{ fontSize: "clamp(10px,1vw,13px)", color: "#9b8d83", letterSpacing: "0.14em", fontWeight: 400, textAlign: "center", lineHeight: 1.4 }}>
                    {label}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="flex justify-center" style={{ paddingTop: "48px" }}>
          <div style={{ width: "1px", height: "80px", background: "var(--line)" }} />
        </div>
      </div>
    </section>
  );
}
