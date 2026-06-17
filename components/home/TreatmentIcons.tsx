// Line-drawn SVG icon components for the home services grid.
// Two-tone style: F (beige) for face/skin elements, T (teal) for instruments.

type Props = { size?: number; className?: string };

const F = "#c4b5a5";
const T = "#96b2b2";
const S = 1.3;

// Shared front-facing face used by most icons
function Face({ children }: { children?: React.ReactNode }) {
  return (
    <>
      {/* Face outline */}
      <path d="M50 18 C36 18 30 30 30 44 C30 59 37 70 50 72 C63 70 70 59 70 44 C70 30 64 18 50 18Z" stroke={F} strokeWidth={S} fill="none" />
      {/* Eyebrows */}
      <path d="M39 38 C41 36 44 36 46 37" stroke={F} strokeWidth={S} fill="none" strokeLinecap="round" />
      <path d="M54 37 C56 36 59 36 61 38" stroke={F} strokeWidth={S} fill="none" strokeLinecap="round" />
      {/* Eyes */}
      <ellipse cx="43" cy="42" rx="4" ry="2.5" stroke={F} strokeWidth={S} />
      <ellipse cx="57" cy="42" rx="4" ry="2.5" stroke={F} strokeWidth={S} />
      {/* Nose */}
      <path d="M49 47 L48 53 M51 47 L52 53 M47 53 Q50 56 53 53" stroke={F} strokeWidth={S} fill="none" strokeLinecap="round" />
      {/* Lips */}
      <path d="M44 60 Q47 58 50 59 Q53 58 56 60 Q53 63 50 64 Q47 63 44 60Z" stroke={F} strokeWidth={S} fill="none" />
      {/* Neck */}
      <line x1="45" y1="72" x2="44" y2="82" stroke={F} strokeWidth={S} strokeLinecap="round" />
      <line x1="55" y1="72" x2="56" y2="82" stroke={F} strokeWidth={S} strokeLinecap="round" />
      {children}
    </>
  );
}

// Small syringe helper: tip at (x,y), angle in degrees
function Syringe({ x, y, angle = 0 }: { x: number; y: number; angle?: number }) {
  return (
    <g transform={`rotate(${angle} ${x} ${y})`} stroke={T} strokeWidth={S} strokeLinecap="round" fill="none">
      <rect x={x - 1.5} y={y - 16} width="3" height="16" rx="1" stroke={T} fill="none" />
      <path d={`M${x - 5} ${y - 16} h10`} />
      <path d={`M${x - 5} ${y - 12} h10`} />
      <rect x={x - 7} y={y - 22} width="14" height="7" rx="1" />
      <line x1={x} y1={y} x2={x} y2={y + 6} strokeWidth="1" />
    </g>
  );
}

export function BotoxIcon({ size = 80, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <Face />
      {/* Syringe angled at forehead */}
      <g transform="rotate(-40 72 22)" stroke={T} strokeWidth={S} strokeLinecap="round" fill="none">
        <rect x="68" y="10" width="8" height="20" rx="1.5" />
        <line x1="72" y1="10" x2="72" y2="4" />
        <line x1="68" y1="16" x2="76" y2="16" />
        <line x1="68" y1="20" x2="76" y2="20" />
      </g>
    </svg>
  );
}

export function LipFillersIcon({ size = 80, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Large lips centred */}
      <path d="M25 48 Q32 42 40 44 Q48 40 50 43 Q52 40 60 44 Q68 42 75 48 Q68 56 60 58 Q52 62 50 60 Q48 62 40 58 Q32 56 25 48Z" stroke={F} strokeWidth={S} fill="none" />
      <path d="M25 48 Q38 52 50 50 Q62 52 75 48" stroke={F} strokeWidth={S} fill="none" />
      {/* Cupid's bow detail */}
      <path d="M42 44 Q46 41 50 43 Q54 41 58 44" stroke={F} strokeWidth={S} fill="none" strokeLinecap="round" />
      {/* Syringe approaching from right */}
      <g transform="rotate(-20 82 30)" stroke={T} strokeWidth={S} strokeLinecap="round" fill="none">
        <rect x="72" y="18" width="7" height="22" rx="1.5" />
        <line x1="75.5" y1="18" x2="75.5" y2="10" />
        <line x1="72" y1="26" x2="79" y2="26" />
        <line x1="72" y1="30" x2="79" y2="30" />
      </g>
    </svg>
  );
}

export function DermalFillersIcon({ size = 80, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <Face />
      {/* Syringe at cheek, angled */}
      <g transform="rotate(30 80 55)" stroke={T} strokeWidth={S} strokeLinecap="round" fill="none">
        <rect x="74" y="42" width="8" height="22" rx="1.5" />
        <line x1="78" y1="42" x2="78" y2="34" />
        <line x1="74" y1="50" x2="82" y2="50" />
        <line x1="74" y1="54" x2="82" y2="54" />
      </g>
    </svg>
  );
}

export function CollagenBoostIcon({ size = 80, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <Face />
      {/* Energy device beside face */}
      <g stroke={T} strokeWidth={S} strokeLinecap="round" fill="none">
        <rect x="72" y="30" width="10" height="26" rx="2" />
        <line x1="77" y1="30" x2="77" y2="24" />
        <line x1="74" y1="37" x2="82" y2="37" />
        {/* Energy rays */}
        <line x1="72" y1="40" x2="67" y2="40" />
        <line x1="72" y1="44" x2="66" y2="46" />
        <line x1="72" y1="36" x2="66" y2="34" />
      </g>
    </svg>
  );
}

export function MicroneedlingIcon({ size = 80, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <Face />
      {/* Microneedling pen */}
      <g transform="rotate(-45 75 25)" stroke={T} strokeWidth={S} strokeLinecap="round" fill="none">
        <rect x="70" y="10" width="10" height="24" rx="3" />
        <line x1="72" y1="34" x2="71" y2="40" />
        <line x1="75" y1="34" x2="75" y2="41" />
        <line x1="78" y1="34" x2="79" y2="40" />
        <line x1="70" y1="18" x2="80" y2="18" />
      </g>
    </svg>
  );
}

export function MesotherapyIcon({ size = 80, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <Face />
      {/* Small injection dots on face */}
      <circle cx="43" cy="50" r="1.5" fill={T} />
      <circle cx="50" cy="47" r="1.5" fill={T} />
      <circle cx="57" cy="50" r="1.5" fill={T} />
      <circle cx="46" cy="56" r="1.5" fill={T} />
      <circle cx="54" cy="56" r="1.5" fill={T} />
      {/* Syringe from side */}
      <g transform="rotate(-50 80 20)" stroke={T} strokeWidth={S} strokeLinecap="round" fill="none">
        <rect x="74" y="8" width="8" height="20" rx="1.5" />
        <line x1="78" y1="8" x2="78" y2="2" />
        <line x1="74" y1="15" x2="82" y2="15" />
      </g>
    </svg>
  );
}

export function PRPIcon({ size = 80, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Hair follicle bulb */}
      <ellipse cx="50" cy="65" rx="12" ry="16" stroke={F} strokeWidth={S} />
      <path d="M50 49 C50 35 38 28 38 18" stroke={F} strokeWidth={S} fill="none" strokeLinecap="round" />
      <path d="M50 52 C50 38 56 32 58 22" stroke={F} strokeWidth={S} fill="none" strokeLinecap="round" />
      <ellipse cx="50" cy="68" rx="5" ry="6" stroke={F} strokeWidth={S} />
      {/* Syringe approaching follicle */}
      <g transform="rotate(30 20 60)" stroke={T} strokeWidth={S} strokeLinecap="round" fill="none">
        <rect x="14" y="50" width="8" height="20" rx="1.5" />
        <line x1="18" y1="50" x2="18" y2="43" />
        <line x1="14" y1="57" x2="22" y2="57" />
        <line x1="14" y1="61" x2="22" y2="61" />
      </g>
    </svg>
  );
}

export function ThreadLiftIcon({ size = 80, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <Face />
      {/* Thread lift needle with barbs */}
      <g stroke={T} strokeWidth={S} strokeLinecap="round" fill="none">
        <line x1="72" y1="30" x2="55" y2="58" />
        <line x1="55" y1="58" x2="53" y2="63" />
        {/* Barbs on thread */}
        <line x1="68" y1="36" x2="72" y2="33" />
        <line x1="64" y1="42" x2="68" y2="39" />
        <line x1="60" y1="48" x2="64" y2="45" />
        {/* Needle handle */}
        <rect x="70" y="22" width="8" height="14" rx="2" />
      </g>
    </svg>
  );
}

export function ChemicalPeelIcon({ size = 80, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <Face />
      {/* Solution bottle */}
      <g stroke={T} strokeWidth={S} strokeLinecap="round" fill="none">
        <rect x="70" y="44" width="12" height="22" rx="2" />
        <path d="M72 44 L72 38 Q76 34 80 38 L80 44" />
        <line x1="76" y1="34" x2="76" y2="28" />
        {/* Drops */}
        <path d="M68 56 Q65 58 65 61 Q65 64 68 64 Q71 64 71 61 Q71 58 68 56Z" />
        <path d="M64 44 Q61 46 61 49 Q61 52 64 52 Q67 52 67 49 Q67 46 64 44Z" />
      </g>
    </svg>
  );
}

export function FatDissolvingIcon({ size = 80, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <Face />
      {/* Jaw/chin area highlight */}
      <path d="M44 72 Q50 78 56 72" stroke={F} strokeWidth={S} fill="none" strokeLinecap="round" />
      {/* Syringe pointing at chin */}
      <g transform="rotate(70 20 80)" stroke={T} strokeWidth={S} strokeLinecap="round" fill="none">
        <rect x="14" y="68" width="8" height="20" rx="1.5" />
        <line x1="18" y1="68" x2="18" y2="61" />
        <line x1="14" y1="75" x2="22" y2="75" />
        <line x1="14" y1="79" x2="22" y2="79" />
      </g>
      {/* Dissolving arrows */}
      <g stroke={T} strokeWidth={S} strokeLinecap="round" fill="none">
        <line x1="38" y1="80" x2="38" y2="88" />
        <line x1="36" y1="86" x2="38" y2="88" />
        <line x1="40" y1="86" x2="38" y2="88" />
        <line x1="62" y1="80" x2="62" y2="88" />
        <line x1="60" y1="86" x2="62" y2="88" />
        <line x1="64" y1="86" x2="62" y2="88" />
      </g>
    </svg>
  );
}

export function HydrafacialIcon({ size = 80, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <Face />
      {/* Hydrafacial wand */}
      <g stroke={T} strokeWidth={S} strokeLinecap="round" fill="none">
        <line x1="72" y1="28" x2="80" y2="20" />
        <rect x="76" y="12" width="10" height="14" rx="3" />
        {/* Circular tip */}
        <circle cx="68" cy="32" r="6" />
        <circle cx="68" cy="32" r="3" />
        {/* Suction lines */}
        <line x1="62" y1="30" x2="58" y2="28" />
        <line x1="62" y1="34" x2="57" y2="36" />
        <line x1="64" y1="26" x2="62" y2="21" />
      </g>
    </svg>
  );
}

export function LaserHairRemovalIcon({ size = 80, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <Face />
      {/* Laser device */}
      <g stroke={T} strokeWidth={S} strokeLinecap="round" fill="none">
        <rect x="68" y="36" width="18" height="12" rx="2" />
        <rect x="72" y="28" width="10" height="10" rx="1" />
        <line x1="77" y1="28" x2="77" y2="22" />
        {/* Laser beam */}
        <line x1="68" y1="42" x2="58" y2="42" />
        {/* Beam rays */}
        <line x1="62" y1="38" x2="58" y2="34" />
        <line x1="62" y1="46" x2="58" y2="50" />
        {/* Small stars/flash */}
        <line x1="54" y1="42" x2="50" y2="42" />
        <line x1="52" y1="38" x2="52" y2="46" />
      </g>
    </svg>
  );
}
