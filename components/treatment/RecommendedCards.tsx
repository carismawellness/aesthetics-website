import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/components/treatment/SectionHeader";
import Reveal from "@/components/Reveal";

/**
 * RecommendedCards — an elegant "Recommended With [treatment]" cross-sell grid
 * for the Carisma Aesthetics treatment template.
 *
 * The card design is a faithful re-skin of the Carisma SLIMMING
 * "Evidence-Based Clinical Approach" card (components/EvidenceCards.tsx in the
 * slimming repo): a photo with the signature asymmetric `20px 80px` radius and a
 * 2px brand-coloured border, a floating eyebrow pill that overhangs the image's
 * top-left corner, and a body panel that overlaps up onto the image. Here that
 * shell is recoloured to the aesthetics teal tokens and repurposed to surface a
 * recommended TREATMENT — image, name (Trajan / --gold), an optional blurb
 * (--ink-soft) and an "Explore ›" affordance (--teal-text) — with the whole card
 * an accessible <Link> to the treatment page.
 *
 * Aesthetics tokens only: gold heading, teal-deep / teal-text accents, teal
 * borders, --line hairlines. Hover lift gated behind prefers-reduced-motion.
 */

type RecommendedItem = {
  label: string;
  href: string;
  image: string;
  desc?: string;
};

type Props = {
  kicker?: string;
  title?: string;
  sub?: string;
  items: RecommendedItem[];
};

function RecommendedCard({ item }: { item: RecommendedItem }) {
  return (
    <Link
      href={item.href}
      className="rec-card"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        paddingTop: 16,
        textDecoration: "none",
      }}
    >
      {/* Photo + floating eyebrow pill — the signature slimming Evidence shape:
          asymmetric 20px 80px radius, 2px brand border, badge overhanging the
          top-left corner. Recoloured here to --teal-deep / --teal-100. */}
      <div style={{ position: "relative", width: "92%", margin: "0 auto", zIndex: 2 }}>
        <div
          className="rec-card__photo"
          style={{
            position: "relative",
            height: 186,
            border: "2px solid var(--teal)",
            borderRadius: "20px 80px",
            overflow: "hidden",
            background: "var(--teal-100)",
            transition: "border-color 0.25s ease",
          }}
        >
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(max-width: 720px) 92vw, (max-width: 1080px) 46vw, 30vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <span
          className="font-display"
          style={{
            position: "absolute",
            top: -14,
            left: 18,
            background: "var(--teal-deep)",
            color: "var(--white)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            padding: "7px 16px",
            borderRadius: "var(--radius-pill)",
            whiteSpace: "nowrap",
          }}
        >
          Recommended
        </span>
      </div>

      {/* Body panel — overlaps up onto the photo (negative margin), exactly as
          the slimming card pulls its body over the image. Hairline border +
          soft teal shadow in aesthetics tokens. */}
      <div
        className="rec-card__body"
        style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          marginTop: -70,
          padding: "88px 28px 28px",
          background: "linear-gradient(180deg, var(--white) 0%, var(--teal-100) 100%)",
          border: "1px solid var(--line)",
          borderRadius: "var(--radius-card)",
          boxShadow: "0 10px 28px rgba(var(--teal-deep-rgb), 0.10)",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
        }}
      >
        {/* Treatment name — Trajan / gold, uppercase */}
        <h3
          className="font-serif"
          style={{
            fontSize: "clamp(17px, 1.9vw, 20px)",
            color: "var(--gold)",
            letterSpacing: "0.03em",
            textTransform: "uppercase",
            fontWeight: 400,
            lineHeight: 1.3,
            margin: 0,
            textWrap: "balance",
          }}
        >
          {item.label}
        </h3>

        {/* Hairline rule under the title — mirrors the slimming card divider */}
        <div
          aria-hidden
          style={{ width: 64, height: 1, background: "var(--line)", margin: "16px auto 0" }}
        />

        {/* Optional blurb */}
        {item.desc && (
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.7,
              color: "var(--ink-soft)",
              margin: "16px 0 0",
              textWrap: "pretty",
            }}
          >
            {item.desc}
          </p>
        )}

        {/* Explore affordance — pinned to the bottom so footers align across the
            grid. Teal text + chevron; underline slides in on hover/focus. */}
        <span
          className="rec-card__explore font-display"
          style={{
            alignSelf: "center",
            marginTop: "auto",
            paddingTop: 18,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            color: "var(--teal-text)",
            fontSize: 12.5,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <span className="rec-card__explore-text">Explore</span>
          <span aria-hidden style={{ fontSize: 14, lineHeight: 1 }}>
            ›
          </span>
        </span>
      </div>
    </Link>
  );
}

export default function RecommendedCards({
  kicker,
  title = "Recommended With",
  sub,
  items,
}: Props) {
  if (!items?.length) return null;

  return (
    <section style={{ padding: "clamp(72px,9vh,112px) 0", background: "var(--white)" }}>
      <div className="container">
        <SectionHeader kicker={kicker} title={title} sub={sub} />

        {/* Responsive 1 / 2 / 3-up grid; hover lift + border emphasis + underline
            all gated behind prefers-reduced-motion. */}
        <style>{`
          .rec-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: clamp(20px, 2.4vw, 32px);
            max-width: 1120px;
            margin: clamp(40px, 5vw, 56px) auto 0;
            align-items: stretch;
          }
          @media (min-width: 640px) {
            .rec-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }
          @media (min-width: 1000px) {
            .rec-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          }
          .rec-card__explore-text {
            background-image: linear-gradient(var(--teal-text), var(--teal-text));
            background-repeat: no-repeat;
            background-position: 0 100%;
            background-size: 0% 1px;
            transition: background-size 0.25s ease;
            padding-bottom: 2px;
          }
          @media (prefers-reduced-motion: no-preference) {
            .rec-card:hover .rec-card__body,
            .rec-card:focus-visible .rec-card__body {
              transform: translateY(-4px);
              box-shadow: 0 22px 46px rgba(var(--teal-deep-rgb), 0.18);
              border-color: rgba(var(--teal-deep-rgb), 0.35);
            }
            .rec-card:hover .rec-card__photo,
            .rec-card:focus-visible .rec-card__photo {
              border-color: var(--teal-deep);
            }
            .rec-card:hover .rec-card__explore-text,
            .rec-card:focus-visible .rec-card__explore-text {
              background-size: 100% 1px;
            }
          }
        `}</style>

        <div className="rec-grid">
          {items.map((item, i) => (
            <Reveal key={`${item.href}-${i}`} delay={Math.min(i, 3) * 80}>
              <RecommendedCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
