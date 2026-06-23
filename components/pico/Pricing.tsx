import Reveal from "@/components/Reveal";
import { A, Serif } from "./_shared";
import Image from "next/image";

const PRICES = [
  { size: "XS", label: "Extra Small", price: "€ 79", icon: "pico-pricing-icon-xs-leaf.png" },
  { size: "Small", label: "Small", price: "€ 99", icon: "pico-pricing-icon-small-lotus.png" },
  { size: "Medium", label: "Medium", price: "€ 149", icon: "pico-pricing-icon-medium-waterdrop.png" },
  { size: "Large", label: "Large", price: "€ 199", icon: "pico-pricing-icon-large-sparkle.png" },
  { size: "XL", label: "Extra Large", price: "€ 249", from: true, icon: "pico-pricing-icon-xl-crown.png" },
];

export default function Pricing() {
  return (
    <section aria-labelledby="pricing-heading" style={{ padding: "60px 0" }}>
      <div className="container text-center">
        <Serif>Pico laser tattoo removal pricing</Serif>
        <p
          id="pricing-heading"
          className="sr-only"
        >
          Pico laser tattoo removal pricing by tattoo size
        </p>
        <p
          className="mx-auto"
          style={{
            maxWidth: "760px",
            fontSize: "14px",
            color: "var(--label)",
            lineHeight: 1.7,
            marginTop: "16px",
          }}
        >
          Choose the package that best fits your needs and goals. Every option is
          crafted to deliver exceptional results and a premium experience.
        </p>
        <div
          className="flex flex-wrap justify-center mx-auto"
          style={{ gap: "22px", marginTop: "40px", maxWidth: "710px" }}
          role="list"
          aria-label="Pricing tiers"
        >
          {PRICES.map((p, i) => (
            <div key={p.size} role="listitem" style={{ width: "200px", marginTop: "26px" }}>
            <Reveal
              delay={(i % 5) * 60}
              className="pico-price-card text-center relative"
              style={{
                width: "100%",
                background: "linear-gradient(160deg,#7d7358 0%, #6f6749 100%)",
                borderRadius: "16px",
                padding: "44px 18px 26px",
              }}
            >
              {/* Icon badge */}
              <span
                className="inline-flex items-center justify-center"
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "-26px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "56px",
                  height: "56px",
                  borderRadius: "12px",
                  backgroundColor: "#8e836b",
                }}
              >
                <Image
                  src={`${A}/${p.icon}`}
                  alt=""
                  width={30}
                  height={30}
                  aria-hidden="true"
                />
              </span>
              <div
                className="font-serif"
                style={{
                  fontSize: "20px",
                  color: "#fff",
                  letterSpacing: "0.08em",
                }}
              >
                <span className="sr-only">{p.label} tattoo — </span>
                {p.size}
              </div>
              {/* thin white divider with small center diamond ornament */}
              <div
                className="flex items-center justify-center"
                aria-hidden="true"
                style={{ width: "60px", margin: "12px auto", gap: "5px" }}
              >
                <span style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.6)" }} />
                <span
                  style={{
                    width: "4px",
                    height: "4px",
                    background: "rgba(255,255,255,0.85)",
                    transform: "rotate(45deg)",
                    flexShrink: 0,
                  }}
                />
                <span style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.6)" }} />
              </div>
              <div
                className="font-serif"
                style={{ fontSize: "24px", color: "#fff", letterSpacing: "0.02em", lineHeight: 1.1 }}
              >
                {p.from && (
                  <span
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.12em",
                      marginRight: "6px",
                      verticalAlign: "middle",
                    }}
                  >
                    from{" "}
                  </span>
                )}
                <span aria-label={`Price: ${p.price}`}>{p.price}</span>
              </div>
            </Reveal>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing tiles: card hover (deeper shadow + darker edge). No transform —
          the Reveal wrapper owns the float-in transform, so we avoid conflict. */}
      <style>{`
        .pico-price-card {
          border: 1px solid transparent;
          box-shadow: 0 12px 30px rgba(0,0,0,0.10);
          transition: box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .pico-price-card:hover {
          box-shadow: 0 18px 46px rgba(0,0,0,0.20);
          border-color: rgba(0,0,0,0.28);
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
      `}</style>
    </section>
  );
}
