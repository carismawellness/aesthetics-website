import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
  BotoxIcon,
  LipFillersIcon,
  DermalFillersIcon,
  CollagenBoostIcon,
  MicroneedlingIcon,
  MesotherapyIcon,
  PRPIcon,
  ThreadLiftIcon,
  ChemicalPeelIcon,
  FatDissolvingIcon,
  HydrafacialIcon,
  LaserHairRemovalIcon,
} from "@/components/home/TreatmentIcons";

type ServiceItem = {
  label: string;
  href: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
};

const SERVICES: ServiceItem[] = [
  { label: "botox", href: "/wrinkle-relaxing-malta", Icon: BotoxIcon },
  { label: "lip fillers", href: "/lip-fillers-malta", Icon: LipFillersIcon },
  { label: "dermal fillers", href: "/dermal-fillers-malta", Icon: DermalFillersIcon },
  { label: "collagen boost", href: "/collagen-stimulator-malta", Icon: CollagenBoostIcon },
  { label: "microneedling", href: "/microneedling-malta", Icon: MicroneedlingIcon },
  { label: "mesotherapy", href: "/mesotherapy-malta", Icon: MesotherapyIcon },
  { label: "PRP", href: "/prp-malta", Icon: PRPIcon },
  { label: "thread lift", href: "/thread-lift-malta", Icon: ThreadLiftIcon },
  { label: "chemical peel", href: "/chemical-peels-malta", Icon: ChemicalPeelIcon },
  { label: "fat dissolving", href: "/fat-dissolving-malta", Icon: FatDissolvingIcon },
  { label: "hydrafacial", href: "/hydrafacial", Icon: HydrafacialIcon },
  { label: "laser hair removal", href: "/laser-hair-removal-malta", Icon: LaserHairRemovalIcon },
];

const BRACKET = "1px solid #e0dbd5";

export default function ServicesMarquee() {
  return (
    <section style={{ padding: "70px 0", backgroundColor: "var(--white)" }}>
      <div className="container">
        <Reveal>
          <h2 className="font-display text-center" style={{ fontSize: "clamp(22px,3vw,35px)", color: "var(--gold)", fontWeight: 400, letterSpacing: "0.1em" }}>
            medical aesthetics procedures
          </h2>
          <div className="mx-auto" style={{ width: "205px", height: "1.5px", background: "#96b2b2", marginTop: "16px", marginBottom: "48px" }} />
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" style={{ columnGap: "24px", rowGap: "48px" }}>
          {SERVICES.map(({ label, href, Icon }, i) => (
            <Reveal key={href} delay={(i % 4) * 70} className="flex justify-center">
              <Link href={href} className="group flex flex-col items-center text-center">
                {/* Corner-bracket frame — flex-centred so icon sits flush inside */}
                <div className="relative flex items-center justify-center" style={{ width: "130px", height: "130px", flexShrink: 0 }}>
                  <span className="absolute" style={{ left: 0, top: 0, width: "32%", height: "32%", borderLeft: BRACKET, borderTop: BRACKET }} />
                  <span className="absolute" style={{ right: 0, top: 0, width: "32%", height: "32%", borderRight: BRACKET, borderTop: BRACKET }} />
                  <span className="absolute" style={{ left: 0, bottom: 0, width: "32%", height: "32%", borderLeft: BRACKET, borderBottom: BRACKET }} />
                  <span className="absolute" style={{ right: 0, bottom: 0, width: "32%", height: "32%", borderRight: BRACKET, borderBottom: BRACKET }} />
                  <Icon size={96} className="transition-transform duration-300 group-hover:scale-105" />
                </div>
                {/* Label is outside and below the bracket frame */}
                <h2 className="font-display" style={{ marginTop: "14px", fontSize: "clamp(11px,1vw,13px)", color: "#9b8d83", letterSpacing: "0.14em", fontWeight: 400, textTransform: "uppercase" }}>
                  {label}
                </h2>
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
