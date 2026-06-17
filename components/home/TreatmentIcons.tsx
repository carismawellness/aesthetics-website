type Props = { size?: number; className?: string };

const F = "#c4b5a5";  // face / beige
const T = "#96b2b2";  // tool / teal
const S = 1.4;

function face() {
  return (
    <>
      {/* Hair strands */}
      <path d="M36 42 C35 33 38 25 45 22" stroke={F} strokeWidth={S} fill="none" strokeLinecap="round" />
      <path d="M50 38 C50 29 50 24 51 20" stroke={F} strokeWidth={S} fill="none" strokeLinecap="round" />
      <path d="M57 40 C59 31 56 24 50 21" stroke={F} strokeWidth={S} fill="none" strokeLinecap="round" />
      {/* Face oval */}
      <path d="M34 53 C34 38 38 29 50 28 C62 29 66 38 66 53 C66 65 61 74 50 75 C39 74 34 65 34 53Z" stroke={F} strokeWidth={S} fill="none" />
      {/* Eyebrows */}
      <path d="M39 44 C41 42 43.5 41.5 46 42.5" stroke={F} strokeWidth={S} fill="none" strokeLinecap="round" />
      <path d="M54 42.5 C56.5 41.5 59 42 61 44" stroke={F} strokeWidth={S} fill="none" strokeLinecap="round" />
      {/* Eyes */}
      <path d="M39 48 C40.5 45.5 44 45.5 45.5 48 C44 50.5 40.5 50.5 39 48Z" stroke={F} strokeWidth={S} fill="none" />
      <path d="M54.5 48 C56 45.5 59.5 45.5 61 48 C59.5 50.5 56 50.5 54.5 48Z" stroke={F} strokeWidth={S} fill="none" />
      {/* Nose */}
      <path d="M48 52 L47 58 M52 52 L53 58 M46.5 58 Q50 61 53.5 58" stroke={F} strokeWidth={S} fill="none" strokeLinecap="round" />
      {/* Lips */}
      <path d="M43 63 Q46.5 61 50 62 Q53.5 61 57 63" stroke={F} strokeWidth={S} fill="none" strokeLinecap="round" />
      <path d="M43 63 Q50 67.5 57 63" stroke={F} strokeWidth={S} fill="none" strokeLinecap="round" />
      {/* Neck */}
      <line x1="45" y1="75" x2="44" y2="84" stroke={F} strokeWidth={S} strokeLinecap="round" />
      <line x1="55" y1="75" x2="56" y2="84" stroke={F} strokeWidth={S} strokeLinecap="round" />
    </>
  );
}

export function BotoxIcon({ size = 90, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {face()}
      {/* Horizontal syringe across forehead */}
      <rect x="22" y="34" width="36" height="6" rx="1.5" stroke={T} strokeWidth={S} />
      <line x1="58" y1="35" x2="64" y2="33" stroke={T} strokeWidth={S} strokeLinecap="round" />
      <line x1="58" y1="40" x2="64" y2="38" stroke={T} strokeWidth={S} strokeLinecap="round" />
      {/* Scale marks */}
      <line x1="30" y1="34" x2="30" y2="32" stroke={T} strokeWidth="1" strokeLinecap="round" />
      <line x1="36" y1="34" x2="36" y2="32" stroke={T} strokeWidth="1" strokeLinecap="round" />
      <line x1="42" y1="34" x2="42" y2="32" stroke={T} strokeWidth="1" strokeLinecap="round" />
      <line x1="48" y1="34" x2="48" y2="32" stroke={T} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function LipFillersIcon({ size = 90, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Syringe angled from top */}
      <g transform="rotate(-35 55 28)">
        <rect x="49" y="10" width="10" height="30" rx="2" stroke={T} strokeWidth={S} fill="none" />
        <rect x="46" y="8" width="16" height="6" rx="1" stroke={T} strokeWidth={S} fill="none" />
        <line x1="54" y1="40" x2="54" y2="47" stroke={T} strokeWidth={S} strokeLinecap="round" />
        <line x1="49" y1="22" x2="59" y2="22" stroke={T} strokeWidth={S} />
        <line x1="49" y1="28" x2="59" y2="28" stroke={T} strokeWidth={S} />
      </g>
      {/* Lips - centred and large */}
      <path d="M22 58 Q30 50 40 52 Q48 47 50 50 Q52 47 60 52 Q70 50 78 58 Q70 68 60 71 Q52 75 50 73 Q48 75 40 71 Q30 68 22 58Z" stroke={F} strokeWidth={S} fill="none" />
      <path d="M22 58 Q36 64 50 62 Q64 64 78 58" stroke={F} strokeWidth={S} fill="none" />
      <path d="M37 52 Q43 48 50 50 Q57 48 63 52" stroke={F} strokeWidth={S} fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function DermalFillersIcon({ size = 90, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {face()}
      {/* Syringe at cheek from right */}
      <g transform="rotate(-20 80 58)">
        <rect x="68" y="44" width="10" height="28" rx="2" stroke={T} strokeWidth={S} fill="none" />
        <rect x="65" y="42" width="16" height="5" rx="1" stroke={T} strokeWidth={S} fill="none" />
        <line x1="73" y1="72" x2="73" y2="79" stroke={T} strokeWidth={S} strokeLinecap="round" />
        <line x1="68" y1="55" x2="78" y2="55" stroke={T} strokeWidth={S} />
        <line x1="68" y1="62" x2="78" y2="62" stroke={T} strokeWidth={S} />
      </g>
    </svg>
  );
}

export function CollagenBoostIcon({ size = 90, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {face()}
      {/* Collagen device — thin pen with energy lines */}
      <line x1="68" y1="30" x2="78" y2="18" stroke={T} strokeWidth={S} strokeLinecap="round" />
      <rect x="73" y="10" width="9" height="18" rx="3" stroke={T} strokeWidth={S} fill="none" />
      <line x1="77.5" y1="10" x2="77.5" y2="6" stroke={T} strokeWidth={S} strokeLinecap="round" />
      {/* Energy rays from tip */}
      <line x1="68" y1="30" x2="63" y2="33" stroke={T} strokeWidth="1" strokeLinecap="round" />
      <line x1="67" y1="27" x2="62" y2="24" stroke={T} strokeWidth="1" strokeLinecap="round" />
      <line x1="70" y1="33" x2="65" y2="38" stroke={T} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function MicroneedlingIcon({ size = 90, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {face()}
      {/* Microneedling pen from upper-left */}
      <g transform="rotate(40 22 22)">
        <rect x="14" y="8" width="12" height="26" rx="4" stroke={T} strokeWidth={S} fill="none" />
        <line x1="16" y1="20" x2="26" y2="20" stroke={T} strokeWidth="1" />
        {/* Needle tips */}
        <line x1="16" y1="34" x2="15" y2="40" stroke={T} strokeWidth="1" strokeLinecap="round" />
        <line x1="20" y1="34" x2="20" y2="41" stroke={T} strokeWidth="1" strokeLinecap="round" />
        <line x1="24" y1="34" x2="25" y2="40" stroke={T} strokeWidth="1" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function MesotherapyIcon({ size = 90, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {face()}
      {/* Injection dots on face */}
      <circle cx="43" cy="52" r="1.8" fill={T} />
      <circle cx="50" cy="49" r="1.8" fill={T} />
      <circle cx="57" cy="52" r="1.8" fill={T} />
      <circle cx="46" cy="59" r="1.8" fill={T} />
      <circle cx="54" cy="59" r="1.8" fill={T} />
      {/* Syringe from right */}
      <g transform="rotate(-45 82 32)">
        <rect x="74" y="18" width="10" height="26" rx="2" stroke={T} strokeWidth={S} fill="none" />
        <rect x="71" y="16" width="16" height="5" rx="1" stroke={T} strokeWidth={S} fill="none" />
        <line x1="79" y1="44" x2="79" y2="50" stroke={T} strokeWidth={S} strokeLinecap="round" />
        <line x1="74" y1="28" x2="84" y2="28" stroke={T} strokeWidth={S} />
        <line x1="74" y1="34" x2="84" y2="34" stroke={T} strokeWidth={S} />
      </g>
    </svg>
  );
}

export function PRPIcon({ size = 90, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Hair strands */}
      <path d="M42 40 C40 28 44 18 50 14" stroke={F} strokeWidth={S} fill="none" strokeLinecap="round" />
      <path d="M50 38 C50 26 50 18 50 12" stroke={F} strokeWidth={S} fill="none" strokeLinecap="round" />
      <path d="M58 40 C60 28 56 18 50 14" stroke={F} strokeWidth={S} fill="none" strokeLinecap="round" />
      {/* Follicle bulb */}
      <ellipse cx="50" cy="62" rx="14" ry="18" stroke={F} strokeWidth={S} />
      <ellipse cx="50" cy="65" rx="6" ry="8" stroke={F} strokeWidth={S} />
      {/* Syringe approaching */}
      <g transform="rotate(30 22 70)">
        <rect x="14" y="58" width="10" height="24" rx="2" stroke={T} strokeWidth={S} fill="none" />
        <rect x="11" y="56" width="16" height="5" rx="1" stroke={T} strokeWidth={S} fill="none" />
        <line x1="19" y1="82" x2="19" y2="88" stroke={T} strokeWidth={S} strokeLinecap="round" />
        <line x1="14" y1="68" x2="24" y2="68" stroke={T} strokeWidth={S} />
        <line x1="14" y1="74" x2="24" y2="74" stroke={T} strokeWidth={S} />
      </g>
    </svg>
  );
}

export function ThreadLiftIcon({ size = 90, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {face()}
      {/* Thread lift needle */}
      <line x1="76" y1="26" x2="58" y2="62" stroke={T} strokeWidth={S} strokeLinecap="round" />
      {/* Barbs on thread */}
      <path d="M73 32 L78 28" stroke={T} strokeWidth="1" strokeLinecap="round" />
      <path d="M70 38 L75 35" stroke={T} strokeWidth="1" strokeLinecap="round" />
      <path d="M67 44 L72 41" stroke={T} strokeWidth="1" strokeLinecap="round" />
      <path d="M64 50 L69 47" stroke={T} strokeWidth="1" strokeLinecap="round" />
      <path d="M61 56 L66 53" stroke={T} strokeWidth="1" strokeLinecap="round" />
      {/* Handle */}
      <rect x="72" y="16" width="10" height="14" rx="3" stroke={T} strokeWidth={S} fill="none" />
      <line x1="77" y1="16" x2="77" y2="12" stroke={T} strokeWidth={S} strokeLinecap="round" />
    </svg>
  );
}

export function ChemicalPeelIcon({ size = 90, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {face()}
      {/* Bottle */}
      <rect x="68" y="46" width="13" height="22" rx="2.5" stroke={T} strokeWidth={S} fill="none" />
      <path d="M70 46 L70 38 Q74.5 33 79 38 L79 46" stroke={T} strokeWidth={S} fill="none" strokeLinecap="round" />
      <line x1="74.5" y1="33" x2="74.5" y2="27" stroke={T} strokeWidth={S} strokeLinecap="round" />
      {/* Drops falling */}
      <path d="M66 58 C64 59.5 63 62 63 63.5 C63 66 64.5 67.5 66 67.5 C67.5 67.5 69 66 69 63.5 C69 62 68 59.5 66 58Z" stroke={T} strokeWidth="1" fill="none" />
      <path d="M61 46 C59 47.5 58 50 58 51.5 C58 54 59.5 55.5 61 55.5 C62.5 55.5 64 54 64 51.5 C64 50 63 47.5 61 46Z" stroke={T} strokeWidth="1" fill="none" />
    </svg>
  );
}

export function FatDissolvingIcon({ size = 90, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {face()}
      {/* Chin / jaw area */}
      <path d="M43 75 Q50 80 57 75" stroke={F} strokeWidth={S} fill="none" strokeLinecap="round" />
      {/* Syringe at chin */}
      <g transform="rotate(60 18 82)">
        <rect x="10" y="70" width="10" height="24" rx="2" stroke={T} strokeWidth={S} fill="none" />
        <rect x="7" y="68" width="16" height="5" rx="1" stroke={T} strokeWidth={S} fill="none" />
        <line x1="15" y1="94" x2="15" y2="100" stroke={T} strokeWidth={S} strokeLinecap="round" />
        <line x1="10" y1="80" x2="20" y2="80" stroke={T} strokeWidth={S} />
        <line x1="10" y1="86" x2="20" y2="86" stroke={T} strokeWidth={S} />
      </g>
      {/* Dissolve arrows */}
      <g stroke={T} strokeWidth={S} strokeLinecap="round" fill="none">
        <line x1="42" y1="83" x2="42" y2="92" />
        <polyline points="39,89 42,92 45,89" />
        <line x1="58" y1="83" x2="58" y2="92" />
        <polyline points="55,89 58,92 61,89" />
      </g>
    </svg>
  );
}

export function HydrafacialIcon({ size = 90, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {face()}
      {/* Hydrafacial machine / wand */}
      <rect x="66" y="32" width="20" height="28" rx="3" stroke={T} strokeWidth={S} fill="none" />
      <rect x="69" y="22" width="14" height="12" rx="2" stroke={T} strokeWidth={S} fill="none" />
      <line x1="76" y1="22" x2="76" y2="16" stroke={T} strokeWidth={S} strokeLinecap="round" />
      {/* Connector tube */}
      <path d="M66 44 Q60 44 57 48" stroke={T} strokeWidth={S} fill="none" strokeLinecap="round" />
      {/* Tip circle */}
      <circle cx="54" cy="51" r="5" stroke={T} strokeWidth={S} />
      <circle cx="54" cy="51" r="2" stroke={T} strokeWidth="1" />
      <line x1="72" y1="38" x2="80" y2="38" stroke={T} strokeWidth="1" />
      <line x1="72" y1="44" x2="80" y2="44" stroke={T} strokeWidth="1" />
    </svg>
  );
}

export function LaserHairRemovalIcon({ size = 90, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {face()}
      {/* Laser device — hair-dryer shape */}
      <rect x="66" y="40" width="22" height="16" rx="3" stroke={T} strokeWidth={S} fill="none" />
      <path d="M76 56 L80 68 L72 68 Z" stroke={T} strokeWidth={S} fill="none" strokeLinejoin="round" />
      <rect x="70" y="30" width="12" height="12" rx="2" stroke={T} strokeWidth={S} fill="none" />
      <line x1="76" y1="30" x2="76" y2="24" stroke={T} strokeWidth={S} strokeLinecap="round" />
      {/* Laser beam */}
      <line x1="66" y1="48" x2="56" y2="48" stroke={T} strokeWidth={S} strokeLinecap="round" />
      {/* Flash/star at beam tip */}
      <line x1="52" y1="48" x2="48" y2="48" stroke={T} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="50" y1="44" x2="50" y2="52" stroke={T} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="47" y1="45" x2="53" y2="51" stroke={T} strokeWidth="1" strokeLinecap="round" />
      <line x1="53" y1="45" x2="47" y2="51" stroke={T} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
