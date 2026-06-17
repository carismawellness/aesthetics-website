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
      {/* Syringe / ruler device — horizontal across forehead, needle pointing left */}
      <g transform="rotate(-10, 73, 34)">
        {/* Barrel rectangle */}
        <rect x="62" y="31" width="22" height="6" rx="1.5" stroke={T} strokeWidth={S} fill="none" />
        {/* Plunger flange at right end */}
        <line x1="84" y1="29" x2="84" y2="37" stroke={T} strokeWidth={S} strokeLinecap="round" />
        {/* Plunger rod extending right */}
        <line x1="84" y1="34" x2="89" y2="34" stroke={T} strokeWidth={S} strokeLinecap="round" />
        {/* Tick marks on barrel (ruler) */}
        <line x1="68" y1="31" x2="68" y2="29.5" stroke={T} strokeWidth="1" strokeLinecap="round" />
        <line x1="73" y1="31" x2="73" y2="29.5" stroke={T} strokeWidth="1" strokeLinecap="round" />
        <line x1="78" y1="31" x2="78" y2="29.5" stroke={T} strokeWidth="1" strokeLinecap="round" />
        {/* Needle hub — tapered transition from barrel to needle */}
        <path d="M62 31.5 L57 33 L62 34.5" stroke={T} strokeWidth={S} fill="none" strokeLinejoin="round" />
        {/* Needle shaft pointing left toward forehead */}
        <line x1="57" y1="33" x2="49" y2="33" stroke={T} strokeWidth="1" strokeLinecap="round" />
        {/* Needle tip */}
        <line x1="49" y1="33" x2="47" y2="33" stroke={T} strokeWidth="0.8" strokeLinecap="round" />
      </g>
      {/* Injection point dot on forehead */}
      <circle cx="50" cy="37" r="1.2" fill={T} />
    </svg>
  );
}

export function LipFillersIcon({ size = 90, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Upper lip - M-shape (cupid's bow) */}
      <path
        d="M25 52 C28 48 33 44 38 44 C42 44 45 47 50 44 C55 47 58 44 62 44 C67 44 72 48 75 52"
        stroke={F}
        strokeWidth={S}
        fill="none"
        strokeLinecap="round"
      />
      {/* Upper lip filled top curve - completes the upper lip shape */}
      <path
        d="M25 52 C27 50 30 48 34 47 C37 46 41 47 44 49 C46 50.5 48 52 50 52 C52 52 54 50.5 56 49 C59 47 63 46 66 47 C70 48 73 50 75 52"
        stroke={F}
        strokeWidth={S}
        fill="none"
        strokeLinecap="round"
      />
      {/* Center dividing line between lips */}
      <path
        d="M25 52 Q50 55 75 52"
        stroke={F}
        strokeWidth={S}
        fill="none"
        strokeLinecap="round"
      />
      {/* Lower lip - fuller U-curve */}
      <path
        d="M25 52 C24 56 24 60 26 63 C30 67 38 68 50 68 C62 68 70 67 74 63 C76 60 76 56 75 52"
        stroke={F}
        strokeWidth={S}
        fill="none"
        strokeLinecap="round"
      />
      {/* Lower lip inner fullness highlight */}
      <path
        d="M32 57 Q50 65 68 57"
        stroke={F}
        strokeWidth={S * 0.7}
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Syringe - angled ~-35 degrees from upper right toward lips */}
      <g transform="rotate(-35, 72, 28)">
        {/* Barrel body */}
        <rect x="58" y="24" width="22" height="8" rx="1" stroke={T} strokeWidth={S} fill="none" />
        {/* Barrel measurement lines */}
        <line x1="64" y1="24" x2="64" y2="32" stroke={T} strokeWidth={S * 0.7} />
        <line x1="69" y1="24" x2="69" y2="32" stroke={T} strokeWidth={S * 0.7} />
        <line x1="74" y1="24" x2="74" y2="32" stroke={T} strokeWidth={S * 0.7} />
        {/* Plunger end flange */}
        <line x1="80" y1="22" x2="80" y2="34" stroke={T} strokeWidth={S} strokeLinecap="round" />
        <line x1="80" y1="28" x2="84" y2="28" stroke={T} strokeWidth={S} strokeLinecap="round" />
        {/* Plunger rod */}
        <line x1="80" y1="28" x2="87" y2="28" stroke={T} strokeWidth={S * 0.8} strokeLinecap="round" />
        {/* Needle hub */}
        <rect x="54" y="25.5" width="4" height="5" rx="0.5" stroke={T} strokeWidth={S} fill="none" />
        {/* Needle */}
        <line x1="46" y1="28" x2="54" y2="28" stroke={T} strokeWidth={S * 0.7} strokeLinecap="round" />
        {/* Needle tip */}
        <path d="M44 28 L46 27.2 L46 28.8 Z" fill={T} />
      </g>
      {/* Shallow oval bowl/dish below lips */}
      <ellipse
        cx="50"
        cy="76"
        rx="20"
        ry="4"
        stroke={T}
        strokeWidth={S}
        fill="none"
      />
    </svg>
  );
}

export function DermalFillersIcon({ size = 90, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {face()}
      {/* Syringe — approaching from right, horizontal with slight downward tilt */}
      <g transform="rotate(8, 64, 56)">
        {/* Needle — thin tapered line from tip to barrel */}
        <line
          x1="64" y1="56"
          x2="72" y2="56"
          stroke={T}
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        {/* Needle hub / collar — small trapezoid connecting needle to barrel */}
        <path
          d="M72 54.5 L72 57.5 L74 58 L74 54 Z"
          stroke={T}
          strokeWidth={S}
          fill="none"
          strokeLinejoin="round"
        />
        {/* Barrel — main rectangular body */}
        <rect
          x="74" y="53"
          width="15" height="6"
          stroke={T}
          strokeWidth={S}
          fill="none"
          rx="0.5"
        />
        {/* Graduation marks inside barrel — 3 ticks */}
        <line x1="77.5" y1="53" x2="77.5" y2="59" stroke={T} strokeWidth="0.7" />
        <line x1="81"   y1="53" x2="81"   y2="59" stroke={T} strokeWidth="0.7" />
        <line x1="84.5" y1="53" x2="84.5" y2="59" stroke={T} strokeWidth="0.7" />
        {/* Plunger rod */}
        <line
          x1="89" y1="56"
          x2="93" y2="56"
          stroke={T}
          strokeWidth={S}
          strokeLinecap="round"
        />
        {/* Plunger head — flanged disc */}
        <rect
          x="91" y="51.5"
          width="4" height="7"
          stroke={T}
          strokeWidth={S}
          fill="none"
          rx="0.5"
        />
        {/* Plunger thumb grip — top and bottom flange wings */}
        <line x1="91" y1="51.5" x2="89" y2="51.5" stroke={T} strokeWidth={S} strokeLinecap="round" />
        <line x1="91" y1="58.5" x2="89" y2="58.5" stroke={T} strokeWidth={S} strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function CollagenBoostIcon({ size = 90, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {face()}
      {/* Cannula/probe — thin horizontal tube extending from right temple outward */}
      {/* Tube body */}
      <line x1="64" y1="39" x2="88" y2="38" stroke={T} strokeWidth="1.1" strokeLinecap="round" />
      {/* Tube lower wall to give slight thickness */}
      <line x1="64" y1="40.2" x2="84" y2="39.2" stroke={T} strokeWidth="0.5" strokeLinecap="round" opacity="0.6" />
      {/* Needle tip — very fine tapered point at left (entry) end near temple */}
      <path d="M64 39 L61.5 38.5" stroke={T} strokeWidth="0.8" strokeLinecap="round" />
      {/* Handle/pen at far right end */}
      {/* Pen barrel */}
      <rect x="84" y="36.5" width="6" height="4" rx="1.2" stroke={T} strokeWidth="1" fill="none" />
      {/* Pen grip band */}
      <line x1="86" y1="36.5" x2="86" y2="40.5" stroke={T} strokeWidth="0.7" strokeLinecap="round" opacity="0.7" />
      {/* Pen end cap */}
      <line x1="90" y1="37" x2="90" y2="40" stroke={T} strokeWidth="1.2" strokeLinecap="round" />
      {/* Small dot where cannula meets temple — entry point */}
      <circle cx="63" cy="39.5" r="0.9" fill={T} opacity="0.8" />
    </svg>
  );
}

export function MicroneedlingIcon({ size = 90, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {face()}
      {/* Microneedling pen — upper-left, ~42deg angle, tip toward lower-right */}
      <g transform="rotate(-42, 22, 26)">
        {/* Pen body */}
        <rect x="10" y="21" width="24" height="10" rx="3" ry="3" stroke={T} strokeWidth={S} fill="none" />
        {/* Grip detail lines on body */}
        <line x1="19" y1="21" x2="19" y2="31" stroke={T} strokeWidth="0.8" strokeLinecap="round" />
        <line x1="22" y1="21" x2="22" y2="31" stroke={T} strokeWidth="0.8" strokeLinecap="round" />
        <line x1="25" y1="21" x2="25" y2="31" stroke={T} strokeWidth="0.8" strokeLinecap="round" />
        {/* Narrow tip/cartridge end toward lower-right */}
        <rect x="34" y="23" width="6" height="6" rx="1" ry="1" stroke={T} strokeWidth={S} fill="none" />
        {/* Needle tip — fine point extending from cartridge */}
        <line x1="40" y1="26" x2="44" y2="26" stroke={T} strokeWidth="1" strokeLinecap="round" />
        {/* Button/top on body */}
        <rect x="12" y="19" width="6" height="2" rx="1" stroke={T} strokeWidth="0.9" fill="none" />
      </g>
    </svg>
  );
}

export function MesotherapyIcon({ size = 90, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {face()}
      {/* Injection points — small solid circles on face */}
      {/* Forehead */}
      <circle cx="50" cy="36" r="1.8" fill={T} />
      {/* Left cheek */}
      <circle cx="40" cy="52" r="1.8" fill={T} />
      {/* Right cheek */}
      <circle cx="60" cy="52" r="1.8" fill={T} />
      {/* Left mouth area */}
      <circle cx="44" cy="62" r="1.8" fill={T} />
      {/* Right mouth area */}
      <circle cx="56" cy="62" r="1.8" fill={T} />
      {/* Needle */}
      <line x1="69" y1="31" x2="63" y2="37" stroke={T} strokeWidth="1.0" strokeLinecap="round" />
      {/* Barrel (rectangle rotated 45deg, drawn as a parallelogram path) */}
      <path
        d="M67.8 27.8 L80.2 15.8 L83.8 19.2 L71.4 31.4 Z"
        stroke={T}
        strokeWidth={S}
        fill="none"
        strokeLinejoin="round"
      />
      {/* Barrel graduation marks */}
      <line x1="72" y1="26" x2="74.8" y2="23.2" stroke={T} strokeWidth="0.9" strokeLinecap="round" opacity="0.7" />
      <line x1="74.5" y1="23.5" x2="77.3" y2="20.7" stroke={T} strokeWidth="0.9" strokeLinecap="round" opacity="0.7" />
      {/* Plunger rod extending upper-right beyond barrel */}
      <line x1="82" y1="17" x2="87" y2="12" stroke={T} strokeWidth={S} strokeLinecap="round" />
      {/* Plunger thumb pad */}
      <line x1="85.4" y1="10.1" x2="88.6" y2="13.9" stroke={T} strokeWidth="2.0" strokeLinecap="round" />
      {/* Needle hub / connector between needle and barrel */}
      <path
        d="M67.8 27.8 L71.4 31.4 L69 33.5 L65.5 30 Z"
        stroke={T}
        strokeWidth={S}
        fill="none"
        strokeLinejoin="round"
      />
      {/* Finger grip flanges on barrel sides */}
      <line x1="70.5" y1="31.5" x2="68.5" y2="34.0" stroke={T} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="83.0" y1="19.5" x2="85.5" y2="17.5" stroke={T} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function PRPIcon({ size = 90, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Hair strands arching upward from follicle */}
      <path
        d="M50 56 C46 40, 38 25, 40 12"
        stroke={F}
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M54 55 C54 38, 56 22, 55 10"
        stroke={F}
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M58 56 C62 40, 70 26, 68 14"
        stroke={F}
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Hair follicle — outer teardrop/oval */}
      <ellipse
        cx="55"
        cy="68"
        rx="10"
        ry="14"
        stroke={F}
        strokeWidth="2"
        fill="none"
      />
      {/* Hair follicle — inner oval */}
      <ellipse
        cx="55"
        cy="68"
        rx="5"
        ry="7"
        stroke={F}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Syringe barrel body */}
      <rect
        x="4"
        y="62"
        width="22"
        height="6"
        rx="1.5"
        fill={T}
      />
      {/* Syringe plunger end cap */}
      <rect
        x="2"
        y="60"
        width="3"
        height="10"
        rx="1"
        fill={T}
      />
      {/* Syringe plunger rod */}
      <rect
        x="4.5"
        y="64.5"
        width="18"
        height="1"
        fill={T}
      />
      {/* Syringe tip taper */}
      <path
        d="M26 62.5 L28 65 L26 67.5"
        stroke={T}
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Needle */}
      <line
        x1="28"
        y1="65"
        x2="45"
        y2="65"
        stroke={T}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ThreadLiftIcon({ size = 90, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {face()}
      {/* Needle handle rectangle at top-right */}
      <rect
        x="72"
        y="22"
        width="7"
        height="4"
        rx="1"
        fill={T}
        stroke={T}
        strokeWidth="0.8"
      />
      {/* Needle shaft tip — small pointed triangle below handle */}
      <polygon
        points="74.5,26 77.5,26 76,29"
        fill={T}
      />
      {/* Main thread line — descends from needle tip toward jawline */}
      <line
        x1="76"
        y1="29"
        x2="68"
        y2="72"
        stroke={T}
        strokeWidth={S}
        strokeLinecap="round"
      />
      {/* Barb 1 */}
      <line
        x1="75"
        y1="34"
        x2="70"
        y2="31"
        stroke={T}
        strokeWidth={S}
        strokeLinecap="round"
      />
      {/* Barb 2 */}
      <line
        x1="73.8"
        y1="41"
        x2="68.8"
        y2="38"
        stroke={T}
        strokeWidth={S}
        strokeLinecap="round"
      />
      {/* Barb 3 */}
      <line
        x1="72.5"
        y1="48"
        x2="67.5"
        y2="45"
        stroke={T}
        strokeWidth={S}
        strokeLinecap="round"
      />
      {/* Barb 4 */}
      <line
        x1="71.2"
        y1="55"
        x2="66.2"
        y2="52"
        stroke={T}
        strokeWidth={S}
        strokeLinecap="round"
      />
      {/* Barb 5 */}
      <line
        x1="70"
        y1="62"
        x2="65"
        y2="59"
        stroke={T}
        strokeWidth={S}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ChemicalPeelIcon({ size = 90, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {face()}
      {/* Bottle body */}
      <rect
        x="70"
        y="50"
        width="12"
        height="22"
        rx="2"
        ry="2"
        stroke={T}
        strokeWidth={S}
        fill="none"
      />
      {/* Bottle shoulder — tapered top trapezoid */}
      <path d="M71.5 50 L71 46 L81 46 L80.5 50Z" stroke={T} strokeWidth={S} fill="none" strokeLinejoin="round" />
      {/* Bottle cap */}
      <rect
        x="72"
        y="42"
        width="8"
        height="4"
        rx="1"
        ry="1"
        stroke={T}
        strokeWidth={S}
        fill="none"
      />
      {/* Dropper / pipette tip at bottom of bottle */}
      <path d="M74 72 L74.5 76 L76 78 L77.5 76 L78 72" stroke={T} strokeWidth={S} fill="none" strokeLinejoin="round" />
      {/* Label lines on bottle body */}
      <line x1="71" y1="57" x2="81" y2="57" stroke={T} strokeWidth="0.8" strokeLinecap="round" />
      <line x1="71" y1="60" x2="81" y2="60" stroke={T} strokeWidth="0.8" strokeLinecap="round" />
      {/* Drop 1 — closer to bottle */}
      <path
        d="M76 80 C75.2 81.5 74.5 83 75.5 84.2 C76.5 85.4 78 84.5 77.5 83 C77 81.5 76.8 80.5 76 80Z"
        stroke={T}
        strokeWidth={S}
        fill="none"
        strokeLinejoin="round"
      />
      {/* Drop 2 — falling further, slightly left toward face */}
      <path
        d="M73 87 C72.2 88.5 71.5 90 72.5 91.2 C73.5 92.4 75 91.5 74.5 90 C74 88.5 73.8 87.5 73 87Z"
        stroke={T}
        strokeWidth={S}
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FatDissolvingIcon({ size = 90, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {face()}
      {/* Double-chin curve below jaw */}
      <path d="M44 75 C44 80 46 83 50 83.5 C54 83 56 80 56 75" stroke={F} strokeWidth={S} fill="none" strokeLinecap="round" />
      {/* Syringe approaching from lower-left at upward angle toward chin */}
      {/* Barrel */}
      <rect
        x="11"
        y="82"
        width="18"
        height="5"
        rx="1"
        stroke={T}
        strokeWidth={S}
        fill="none"
        transform="rotate(-38 20 84.5)"
      />
      {/* Plunger rod */}
      <line
        x1="11"
        y1="84.5"
        x2="7"
        y2="84.5"
        stroke={T}
        strokeWidth={S}
        strokeLinecap="round"
        transform="rotate(-38 11 84.5)"
      />
      {/* Plunger flange */}
      <line
        x1="7"
        y1="82.5"
        x2="7"
        y2="86.5"
        stroke={T}
        strokeWidth={S}
        strokeLinecap="round"
        transform="rotate(-38 11 84.5)"
      />
      {/* Needle tip */}
      <line
        x1="29"
        y1="84.5"
        x2="34"
        y2="84.5"
        stroke={T}
        strokeWidth={S}
        strokeLinecap="round"
        transform="rotate(-38 29 84.5)"
      />
      {/* Downward arrows below jawline — fat dissolving downward */}
      {/* Left arrow */}
      <line x1="43" y1="86" x2="43" y2="93" stroke={T} strokeWidth={S} strokeLinecap="round" />
      <polyline points="40,90 43,94 46,90" stroke={T} strokeWidth={S} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Right arrow */}
      <line x1="57" y1="86" x2="57" y2="93" stroke={T} strokeWidth={S} strokeLinecap="round" />
      <polyline points="54,90 57,94 60,90" stroke={T} strokeWidth={S} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HydrafacialIcon({ size = 90, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {face()}
      {/* Device main body */}
      <rect x="68" y="30" width="20" height="20" rx="2" stroke={T} strokeWidth={S} fill="none" />
      {/* Device smaller top unit */}
      <rect x="71" y="20" width="14" height="11" rx="2" stroke={T} strokeWidth={S} fill="none" />
      {/* Dials / detail lines on main body */}
      <line x1="71" y1="36" x2="85" y2="36" stroke={T} strokeWidth={S} strokeLinecap="round" />
      <circle cx="73.5" cy="33" r="1.2" stroke={T} strokeWidth="0.9" fill="none" />
      <circle cx="78" cy="33" r="1.2" stroke={T} strokeWidth="0.9" fill="none" />
      <line x1="82" y1="31.5" x2="82" y2="34.5" stroke={T} strokeWidth="0.9" strokeLinecap="round" />
      <line x1="84" y1="31.5" x2="84" y2="34.5" stroke={T} strokeWidth="0.9" strokeLinecap="round" />
      {/* Top unit detail lines */}
      <line x1="73" y1="25" x2="83" y2="25" stroke={T} strokeWidth="0.9" strokeLinecap="round" />
      <line x1="73" y1="27.5" x2="83" y2="27.5" stroke={T} strokeWidth="0.9" strokeLinecap="round" />
      {/* Flexible tube/hose from device bottom-left corner to handpiece tip */}
      <path
        d="M68 42 C64 42 63 46 62 50"
        stroke={T}
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      {/* Handpiece circular tip — 2 concentric circles touching cheek */}
      <circle cx="62" cy="52" r="4" stroke={T} strokeWidth={S} fill="none" />
      <circle cx="62" cy="52" r="2" stroke={T} strokeWidth={S} fill="none" />
    </svg>
  );
}

export function LaserHairRemovalIcon({ size = 90, className }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {face()}
      {/* Device barrel (main body) */}
      <rect
        x="68"
        y="38"
        width="20"
        height="20"
        rx="4"
        ry="4"
        stroke={T}
        strokeWidth={S}
        fill="none"
      />
      {/* Handle (perpendicular grip below barrel) */}
      <rect
        x="72"
        y="58"
        width="8"
        height="14"
        rx="2"
        ry="2"
        stroke={T}
        strokeWidth={S}
        fill="none"
      />
      {/* Tip / head (small rectangle at left end of barrel, facing face) */}
      <rect
        x="64"
        y="41"
        width="6"
        height="14"
        rx="1.5"
        ry="1.5"
        stroke={T}
        strokeWidth={S}
        fill="none"
      />
      {/* Horizontal laser beam from tip toward face */}
      <line
        x1="56"
        y1="48"
        x2="63"
        y2="48"
        stroke={T}
        strokeWidth={S}
        strokeLinecap="round"
        strokeDasharray="1.5 1.5"
      />
      {/* Flash / star mark where beam hits face */}
      <circle cx="61" cy="48" r="1.2" fill={T} />
      <line x1="61" y1="44.5" x2="61" y2="46.2" stroke={T} strokeWidth="1.1" strokeLinecap="round" />
      <line x1="61" y1="49.8" x2="61" y2="51.5" stroke={T} strokeWidth="1.1" strokeLinecap="round" />
      <line x1="57.5" y1="48" x2="59.2" y2="48" stroke={T} strokeWidth="1.1" strokeLinecap="round" />
      <line x1="62.8" y1="48" x2="64.5" y2="48" stroke={T} strokeWidth="1.1" strokeLinecap="round" />
      <line x1="58.9" y1="45.9" x2="60.0" y2="47.0" stroke={T} strokeWidth="0.9" strokeLinecap="round" />
      <line x1="62.0" y1="49.0" x2="63.1" y2="50.1" stroke={T} strokeWidth="0.9" strokeLinecap="round" />
      <line x1="62.0" y1="47.0" x2="63.1" y2="45.9" stroke={T} strokeWidth="0.9" strokeLinecap="round" />
      <line x1="58.9" y1="50.1" x2="60.0" y2="49.0" stroke={T} strokeWidth="0.9" strokeLinecap="round" />
      {/* Ventilation slots on barrel */}
      <line x1="73" y1="44" x2="85" y2="44" stroke={T} strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
      <line x1="73" y1="47" x2="85" y2="47" stroke={T} strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
      <line x1="73" y1="50" x2="85" y2="50" stroke={T} strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}
