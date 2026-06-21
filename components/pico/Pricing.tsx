import Reveal from "@/components/Reveal";
import { A, Serif } from "./_shared";

const PRICES = [
  { size: "xs", price: "€ 79", icon: "pico-pricing-icon-xs-leaf.png" },
  { size: "small", price: "€ 99", icon: "pico-pricing-icon-small-lotus.png" },
  { size: "medium", price: "€ 149", icon: "pico-pricing-icon-medium-waterdrop.png" },
  { size: "large", price: "€ 199", icon: "pico-pricing-icon-large-sparkle.png" },
  { size: "xl", price: "€ 249", from: true, icon: "pico-pricing-icon-xl-crown.png" },
];

export default function Pricing() {
  return (
    <section style={{ padding: "60px 0" }}>
      <div className="container text-center">
        <Serif>pico laser tattoo removal pricing</Serif>
        <p className="mx-auto" style={{ maxWidth: "760px", fontSize: "14px", color: "var(--label)", lineHeight: 1.7, marginTop: "16px" }}>
          Choose the package that best fits your needs and goals. Every option is crafted to deliver exceptional results and a premium experience.
        </p>
        <div className="flex flex-wrap justify-center mx-auto" style={{ gap: "22px", marginTop: "40px", maxWidth: "710px" }}>
          {PRICES.map((p, i) => (
            <Reveal
              key={p.size}
              delay={(i % 5) * 60}
              className="text-center relative"
              style={{ width: "200px", background: "linear-gradient(160deg,#7d7358 0%, #6f6749 100%)", borderRadius: "14px", padding: "44px 18px 26px", marginTop: "26px", boxShadow: "0 12px 30px rgba(0,0,0,0.10)" }}
            >
              <span
                className="inline-flex items-center justify-center"
                style={{ position: "absolute", top: "-26px", left: "50%", transform: "translateX(-50%)", width: "56px", height: "56px", borderRadius: "12px", backgroundColor: "#8e836b" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${A}/${p.icon}`} alt="" style={{ width: "30px", height: "30px" }} />
              </span>
              <div className="font-serif" style={{ fontSize: "20px", color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase" }}>{p.size}</div>
              {/* thin white divider with small center diamond ornament */}
              <div className="flex items-center justify-center" style={{ width: "60px", margin: "12px auto", gap: "5px" }}>
                <span style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.6)" }} />
                <span aria-hidden style={{ width: "4px", height: "4px", background: "rgba(255,255,255,0.85)", transform: "rotate(45deg)", flexShrink: 0 }} />
                <span style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.6)" }} />
              </div>
              <div className="font-serif" style={{ fontSize: "24px", color: "#fff", letterSpacing: "0.02em", lineHeight: 1.1 }}>
                {p.from && (
                  <span style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", marginRight: "6px", verticalAlign: "middle" }}>from</span>
                )}
                {p.price}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
