import Reveal from "@/components/Reveal";
import GiftHeroCards from "@/components/gifts/GiftHeroCards";

/**
 * GiftCardsSummary — home-page e-gift-voucher section for Carisma Aesthetics.
 *
 * Reimagined as a premium, "alive" moment: the real occasion gift-card
 * renderings are fanned in 3D space (three.js) with a GSAP entrance, a gentle
 * idle float, and subtle pointer parallax. The 3D scene replaces the old
 * numbered 3-step cards and the occasion-pill marquee — it carries the visual
 * storytelling ("a card for every occasion") on its own.
 *
 * The WebGL scene lives in <GiftCardScene/>; the client wrapper
 * <GiftCardSceneMount/> dynamically imports it with `{ ssr: false }` (that
 * option is only legal inside a Client Component in Next 16). This file stays a
 * server component — a WebGL canvas must never be server-rendered.
 *
 * Palette: Aesthetics teal only (--teal-deep #4f7373, --teal-text #406060,
 * --teal #96b2b2, --teal-100 #deebeb). Body copy is neutral grey, normal
 * weight. No green, no cream/beige fills, no brown button fills.
 */

const GIFTS_HREF = "/e-giftcards-vouchers";

export default function GiftCardsSummary() {
  return (
    <section
      aria-labelledby="gift-summary-heading"
      style={{
        background: "transparent",
        padding: "clamp(72px, 9vw, 120px) 0",
        scrollMarginTop: "var(--nav-clear)",
        overflow: "hidden",
      }}
    >
      <div className="container">
        {/* ── Heading block ── */}
        <Reveal>
          <div className="text-center mx-auto" style={{ maxWidth: "680px" }}>
            <span
              className="font-display"
              style={{
                display: "inline-block",
                fontSize: "12px",
                color: "var(--teal-text)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: "14px",
              }}
            >
              E-Gift Vouchers
            </span>
            <h2
              id="gift-summary-heading"
              className="font-serif"
              style={{
                fontSize: "clamp(26px, 4vw, 40px)",
                color: "var(--teal-deep)",
                letterSpacing: "0.03em",
                fontWeight: 400,
                lineHeight: 1.2,
              }}
            >
              Give the Gift of Glowing Skin in Malta
            </h2>
            <div
              aria-hidden="true"
              className="mx-auto"
              style={{
                width: "96px",
                height: "1px",
                background: "var(--teal)",
                opacity: 0.7,
                margin: "20px auto 0",
              }}
            />
            <p
              style={{
                marginTop: "22px",
                fontSize: "16px",
                color: "var(--muted)",
                lineHeight: 1.75,
              }}
            >
              The effortless way to give a glow they will remember. A Carisma
              Aesthetics e-voucher is delivered instantly, valid for a full 12
              months, and redeemable on any treatment at any of our clinics in
              Malta — a beautiful card for every occasion.
            </p>
          </div>
        </Reveal>

        {/* ── Fanned occasion gift cards — the same visual used in the gift-cards
              page hero (components/gifts/GiftHeroCards). Server-rendered, fits the
              section, branding fully visible. Square relative stage so the fan
              never overflows. ── */}
        <Reveal delay={80}>
          <div
            className="mx-auto"
            style={{
              position: "relative",
              maxWidth: "600px",
              width: "100%",
              aspectRatio: "1 / 1",
              marginTop: "clamp(20px, 4vw, 40px)",
            }}
          >
            <GiftHeroCards />
          </div>
        </Reveal>

        {/* ── CTA — shine comes from .btn-teal (.btn::after) ── */}
        <Reveal delay={140}>
          <div
            className="text-center"
            style={{ marginTop: "clamp(24px, 4vw, 40px)" }}
          >
            <a
              href={GIFTS_HREF}
              className="btn btn-teal font-display"
              style={{ letterSpacing: "0.1em" }}
            >
              Shop Gift Cards
            </a>
            <p
              style={{
                marginTop: "16px",
                fontSize: "12.5px",
                color: "var(--label)",
                letterSpacing: "0.04em",
                lineHeight: 1.7,
              }}
            >
              Delivered instantly by email · Valid 12 months · Redeemable at
              every Carisma Aesthetics clinic in Malta
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
