import Link from "next/link";
import SectionHeader from "@/components/treatment/SectionHeader";
import Reveal from "@/components/Reveal";

/*
  PricingCards — a scannable, transparent pricing grid for the Carisma Aesthetics
  treatment template. Server component (no client state).

  Harvested from the price-tile pattern in PigmentationPage / PicoLaserPage (the
  floating-icon-badge price tiles), restyled from the dark taupe gradient tiles
  to the shared aesthetics LIGHT palette (design tokens): white cards on a
  teal-tinted ground, a small floating teal icon badge, a Trajan/var(--gold)
  treatment name, a prominent var(--teal-deep) price, optional muted desc, a
  subtle hover lift, and a per-card "Book" text link. Fronted by <SectionHeader>;
  optional note + primary CTA below the grid.

  Layout: responsive auto-fit grid — 1 col on mobile, 2 on tablet, up to 3 on
  desktop. Hover lift + per-card link underline are disabled under
  prefers-reduced-motion. 44px+ tap targets on the "Book" link and CTA.
*/

type PriceItem = {
  name: string;
  price: string;
  desc?: string;
};

type Props = {
  kicker?: string;
  title?: string;
  sub?: string;
  items: PriceItem[];
  note?: string;
};

// Small decorative price-tag glyph that rides the floating teal badge. Purely
// ornamental (aria-hidden); white stroke reads on the --teal-deep fill.
function PriceBadgeIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--white)"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20.59 13.41 13.42 20.6a2 2 0 0 1-2.83 0L3 13V3h10l7.59 7.59a2 2 0 0 1 0 2.82Z" />
      <circle cx="7.5" cy="7.5" r="1.2" fill="var(--white)" stroke="none" />
    </svg>
  );
}

function PriceTile({ item }: { item: PriceItem }) {
  return (
    <Link
      href="/consultation"
      className="pricing-tile"
      aria-label={`${item.name} — ${item.price}. Book a consultation`}
    >
      {/* Floating teal icon badge — overlaps the top edge of the card. */}
      <span aria-hidden className="pricing-tile__badge">
        <PriceBadgeIcon />
      </span>

      <span
        className="font-serif pricing-tile__name"
        style={{
          fontSize: 17,
          color: "var(--gold)",
          letterSpacing: "0.06em",
          fontWeight: 400,
          lineHeight: 1.3,
          textWrap: "balance",
        }}
      >
        {item.name}
      </span>

      {/* Hairline flourish between name and price (echoes the harvested tile). */}
      <span aria-hidden className="pricing-tile__rule">
        <span className="pricing-tile__rule-line" />
        <span className="pricing-tile__rule-dot" />
        <span className="pricing-tile__rule-line" />
      </span>

      <span
        className="font-serif pricing-tile__price"
        style={{
          fontSize: "clamp(30px, 3.4vw, 38px)",
          color: "var(--teal-deep)",
          letterSpacing: "0.01em",
          lineHeight: 1.05,
          fontWeight: 400,
        }}
      >
        {item.price}
      </span>

      {item.desc && (
        <span
          className="pricing-tile__desc"
          style={{
            fontSize: 13.5,
            lineHeight: 1.6,
            color: "var(--ink-soft)",
            textWrap: "pretty",
          }}
        >
          {item.desc}
        </span>
      )}

      {/* Per-card text link (visual affordance — the whole tile is the <Link>). */}
      <span className="font-display pricing-tile__book" aria-hidden>
        Book
        <span style={{ marginLeft: 6 }}>›</span>
      </span>
    </Link>
  );
}

export default function PricingCards({
  kicker = "Transparent pricing",
  title = "Pricing",
  sub,
  items,
  note,
}: Props) {
  return (
    <section style={{ padding: "clamp(72px,9vh,112px) 0", background: "linear-gradient(180deg, #ffffff 0%, var(--teal-100) 50%, #ffffff 100%)" }}>
      <div className="container">
        <SectionHeader kicker={kicker} title={title} sub={sub} />

        <Reveal>
          <style>{`
            .pricing-cards-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: clamp(22px, 2.6vw, 34px);
              max-width: 1040px;
              margin: clamp(44px, 5.5vw, 64px) auto 0;
              align-items: stretch;
            }
            @media (min-width: 640px) {
              .pricing-cards-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            }
            @media (min-width: 960px) {
              .pricing-cards-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            }

            .pricing-tile {
              position: relative;
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              gap: 12px;
              height: 100%;
              background: var(--white);
              border: 1px solid var(--line);
              border-radius: var(--radius-card);
              padding: 42px 24px 26px;
              box-shadow: 0 14px 34px rgba(var(--teal-deep-rgb), 0.10);
              text-decoration: none;
              transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
            }
            .pricing-tile:hover,
            .pricing-tile:focus-visible {
              transform: translateY(-4px);
              box-shadow: 0 22px 46px rgba(var(--teal-deep-rgb), 0.18);
              border-color: var(--teal-deep);
            }
            /* Replace the removed default outline with a visible focus ring. */
            .pricing-tile:focus-visible {
              outline: 2px solid var(--focus-ring);
              outline-offset: 3px;
            }

            .pricing-tile__badge {
              position: absolute;
              top: -24px;
              left: 50%;
              transform: translateX(-50%);
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 48px;
              height: 48px;
              border-radius: 14px;
              background: var(--teal-deep);
              box-shadow: 0 8px 20px rgba(var(--teal-deep-rgb), 0.34);
            }

            .pricing-tile__rule {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 6px;
              width: 64px;
              margin: 2px auto;
            }
            .pricing-tile__rule-line {
              flex: 1;
              height: 1px;
              background: var(--teal);
            }
            .pricing-tile__rule-dot {
              width: 4px;
              height: 4px;
              background: var(--teal-deep);
              transform: rotate(45deg);
              flex-shrink: 0;
            }

            .pricing-tile__book {
              margin-top: auto;
              padding-top: 8px;
              min-height: 44px;
              display: inline-flex;
              align-items: center;
              font-size: 12px;
              letter-spacing: 0.16em;
              text-transform: uppercase;
              color: var(--teal-text);
              font-weight: 600;
              border-bottom: 1px solid transparent;
              transition: border-color 0.25s ease;
            }
            .pricing-tile:hover .pricing-tile__book,
            .pricing-tile:focus-visible .pricing-tile__book {
              border-bottom-color: var(--teal-text);
            }

            @media (prefers-reduced-motion: reduce) {
              .pricing-tile,
              .pricing-tile:hover,
              .pricing-tile:focus-visible {
                transition: none;
                transform: none;
              }
            }
          `}</style>

          <div className="pricing-cards-grid">
            {items.map((item, i) => (
              <PriceTile key={`${item.name}-${i}`} item={item} />
            ))}
          </div>

          {(note || items.length > 0) && (
            <div
              className="flex flex-col items-center"
              style={{ marginTop: "clamp(28px, 3.5vw, 44px)", gap: 24 }}
            >
              {note && (
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.7,
                    color: "var(--muted)",
                    textAlign: "center",
                    maxWidth: 620,
                    margin: 0,
                    textWrap: "pretty",
                  }}
                >
                  {note}
                </p>
              )}
              <Link href="/consultation" className="btn btn-teal" style={{ borderRadius: 999, padding: "15px 30px" }}>
                Book Free Consultation
                <span aria-hidden style={{ marginLeft: 8 }}>›</span>
              </Link>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
