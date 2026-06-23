/* Gifts hero — deconstructed fanned gift cards.
 *
 * Replaces the single boxed photo in the hero arch (passed to PageHero via the
 * `mediaSlot` prop). Three REAL occasion gift cards scatter/overlap at angles and
 * gently drift, echoing the floating proof badges + the Spa site's fanned cards.
 *
 * Perf/a11y: server component, no JS. Drift uses the shared .float-a/.float-b CSS
 * (already reduced-motion-guarded in globals.css). Card ROTATION lives on an outer
 * wrapper and the float animation on an inner div, so the angle survives the
 * keyframes (which animate `transform`). Cards are decorative → aria-hidden.
 */
const WIX = "https://static.wixstatic.com/media";
const card = (id: string, name: string) =>
  `${WIX}/${id}~mv2.png/v1/crop/x_0,y_42,w_1032,h_822/fill/w_500,h_400,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/${name}.png`;

type FanCard = {
  src: string;
  pos: React.CSSProperties;
  rot: number;
  z: number;
  float: "float-a" | "float-b";
  delay: string;
};

const CARDS: FanCard[] = [
  // back-left
  {
    src: card("f940f0_6789153569c34bf7a79fe359573ab1ee", "BIRTHDAY%20MOCKUP"),
    pos: { top: "5%", left: "-4%", width: "60%" },
    rot: -8,
    z: 1,
    float: "float-a",
    delay: "0s",
  },
  // right
  {
    src: card("f940f0_a0e8f587ae9b4b58b648dfb12532fa1c", "ANNIVERSARY%20MOCKUP"),
    pos: { top: "12%", right: "-5%", width: "55%" },
    rot: 11,
    z: 2,
    float: "float-a",
    delay: "-1.4s",
  },
  // front center-low (hero card)
  {
    src: card("f940f0_4d8a80555224470797bd8bb30fed27db", "JUST%20FOR%20YOU%20MOCKUP"),
    pos: { top: "42%", left: "14%", width: "72%" },
    rot: 4,
    z: 2,
    float: "float-b",
    delay: "-2.8s",
  },
];

export default function GiftHeroCards() {
  return (
    <div style={{ position: "absolute", inset: 0 }} aria-hidden="true">
      {/* Soft brand glow for depth (no hard arch box). */}
      <div
        style={{
          position: "absolute",
          inset: "8% -8%",
          background:
            "radial-gradient(58% 52% at 54% 46%, rgba(150,178,178,0.32) 0%, rgba(150,178,178,0) 70%)",
          filter: "blur(6px)",
          zIndex: 0,
        }}
      />
      {CARDS.map((c, i) => (
        <div
          key={i}
          style={{ position: "absolute", ...c.pos, zIndex: c.z, transform: `rotate(${c.rot}deg)` }}
        >
          <div
            className={c.float}
            style={{
              animationDelay: c.delay,
              borderRadius: 14,
              overflow: "hidden",
              background: "#fff",
              boxShadow:
                "0 22px 50px rgba(28,30,30,0.20), 0 4px 14px rgba(28,30,30,0.10)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.src}
              alt=""
              style={{ display: "block", width: "100%", height: "auto" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
