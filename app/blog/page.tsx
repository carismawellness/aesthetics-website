import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { getAllPosts } from "@/lib/posts";
import type { BlogPost } from "@/lib/blog-types";

export const metadata: Metadata = {
  title: { absolute: "Medical Aesthetics Blog Malta | Carisma Aesthetics" },
  description:
    "Expert tips on Botox, dermal fillers, laser hair removal and skincare from Malta's leading medical aesthetic clinic. Read our latest articles.",
  alternates: {
    canonical: "https://www.carismaaesthetics.com/blog",
  },
  openGraph: {
    title: "Medical Aesthetics Blog Malta | Carisma Aesthetics",
    description:
      "Expert tips on Botox, dermal fillers, laser hair removal and skincare from Malta's leading medical aesthetic clinic.",
    url: "https://www.carismaaesthetics.com/blog",
    siteName: "Carisma Aesthetics",
    type: "website",
    images: [{ url: "/og-aesthetics.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical Aesthetics Blog Malta | Carisma Aesthetics",
    description:
      "Expert tips on Botox, dermal fillers, laser hair removal and skincare from Malta's leading medical aesthetic clinic. Read our latest articles.",
  },
};

// ─── Blog Card ────────────────────────────────────────────────────────────────

function BlogCard({ post }: { post: BlogPost }) {
  const formattedDate = new Date(post.publishDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    /* P6: <article> element for blog cards; heading hierarchy H2 for card titles */
    <article>
      <Link
        href={`/post/${post.slug}`}
        className="group card review-card block overflow-hidden transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{
          borderRadius: "var(--radius-card)",
          /* P2: visible focus ring color */
          outlineColor: "var(--teal-deep)",
        }}
        /* P1: BLOG-SPECIFIC: aria-label for link so screen readers get article title */
        aria-label={`Read article: ${post.title}`}
      >
        {/* P3: Cover image — fill + sized container, no priority needed (below fold) */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "3/2" }}>
          <Image
            src={post.coverImage}
            /* P1: meaningful alt describing article topic */
            alt={`Cover image for: ${post.title}`}
            fill
            className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />

          {/* Category chip */}
          <span
            className="absolute font-display"
            aria-hidden="true"
            style={{
              top: "14px",
              left: "16px",
              background: "var(--teal-deep)",
              color: "#fff",
              fontSize: "9px",
              letterSpacing: "0.16em",
              padding: "4px 11px",
              borderRadius: "3px",
            }}
          >
            {post.category}
          </span>
        </div>

        {/* Card body */}
        <div style={{ padding: "22px 24px 28px" }}>
          {/* P6: date + read time metadata */}
          <div
            className="flex items-center gap-3 mb-3"
            style={{ fontSize: "11px", color: "var(--muted)", letterSpacing: "0.06em" }}
          >
            <time
              className="font-display"
              dateTime={post.publishDate}
              style={{ fontSize: "9.5px" }}
            >
              {formattedDate}
            </time>
            <span aria-hidden="true" style={{ color: "var(--muted)" }}>·</span>
            <span className="font-display" style={{ fontSize: "9.5px" }}>
              {post.readTime} min read
            </span>
          </div>

          {/* P6: H2 for card titles (H1 is on the page header) */}
          <h2
            className="font-serif mb-3 leading-snug"
            style={{
              fontSize: "clamp(14px, 1.5vw, 17px)",
              color: "var(--teal-deep)",
              letterSpacing: "0.03em",
            }}
          >
            {post.title}
          </h2>

          {/* Excerpt */}
          <p
            className="mb-5"
            style={{
              fontSize: "13.5px",
              color: "var(--muted)",
              lineHeight: 1.65,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.excerpt}
          </p>

          {/* P2: tap target — min 44px via padding; P4: consistent hover underline */}
          <span
            className="font-display inline-flex items-center min-h-[44px]"
            aria-hidden="true"
            style={{
              fontSize: "10px",
              color: "var(--teal-text)",
              letterSpacing: "0.14em",
              borderBottom: "1px solid var(--teal-deep)",
              paddingBottom: "2px",
            }}
          >
            Read Article &rarr;
          </span>
        </div>
      </Link>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const heroImage = posts[0]?.coverImage || "/assets/clinic-room.jpg";

  return (
    /* P1: <main> landmark */
    <main style={{ background: "linear-gradient(180deg, #ffffff 0%, var(--teal-100) 50%, #ffffff 100%)", minHeight: "100vh" }}>
      {/* ── Hero (shared PageHero) ──────────────────── */}
      <PageHero
        eyebrow="The Journal"
        headline={[
          { text: "Aesthetics & Beauty Blog Malta" },
          { text: "Expert Guides from Our Clinic", em: true },
        ]}
        sub="Expert guides on aesthetic treatments, skin and confidence — from Malta's #1 voted med-aesthetics clinic."
        primaryCta={{ text: "Book Free Consultation", href: "/consultation" }}
        secondaryCta={{ text: "View Treatments", href: "/face-treatments" }}
        media={{ type: "image", src: heroImage, alt: "Carisma Aesthetics journal" }}
        proof={{
          rating: "4.9",
          reviews: "500+",
          statValue: "30+",
          statLabel: "years in wellness",
          awardText: "#1 Voted Clinic\nMalta Healthcare Awards",
        }}
      />

      {/* P9: breadcrumb nav (below the hero so the above-the-fold fits one viewport) */}
      <nav aria-label="Breadcrumb" className="container" style={{ padding: "20px 20px 0" }}>
        <ol
          className="flex items-center gap-2 flex-wrap"
          style={{ fontSize: "12px", color: "var(--muted)", listStyle: "none", margin: 0, padding: 0 }}
        >
          <li>
            <Link
              href="/"
              className="transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:underline"
              style={{ color: "var(--teal-text)" }}
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true" style={{ color: "var(--muted)" }}>/</li>
          <li aria-current="page" style={{ color: "var(--muted)" }}>Blog</li>
        </ol>
      </nav>

      {/* ── Post grid ───────────────────────────────── */}
      <section
        className="container"
        aria-labelledby="blog-articles-heading"
        style={{ padding: "64px 20px 96px" }}
      >
        {/* P1: visually hidden label for section */}
        <h2 id="blog-articles-heading" className="sr-only">Explore Our Medical Aesthetics Articles in Malta</h2>

        {posts.length === 0 ? (
          <div className="text-center" style={{ padding: "80px 0", color: "var(--muted)" }}>
            <p
              className="font-serif mb-4"
              style={{ fontSize: "22px", color: "var(--teal-text)" }}
            >
              Coming Soon
            </p>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "var(--ink-soft)" }}>
              We are currently crafting expert articles for you. Check back soon.
            </p>
            <div className="mt-8">
              {/* P2: min tap target 44px via btn class; P10: primary CTA */}
              <Link
                href="/consultation"
                className="btn btn-teal inline-flex items-center justify-center min-h-[44px]"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        ) : (
          /* P5: responsive grid — 1 col on mobile, auto-fill on larger */
          <div
            className="grid gap-8"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
            }}
          >
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* ── Bottom CTA ──────────────────────────────── */}
      <section
        aria-labelledby="blog-cta-heading"
        style={{
          background: "linear-gradient(180deg, #ffffff 0%, var(--teal-deep) 50%, #ffffff 100%)",
          padding: "64px 20px",
          textAlign: "center",
        }}
      >
        <div className="container">
          <h2
            id="blog-cta-heading"
            className="font-serif mb-5"
            style={{
              fontSize: "clamp(18px, 3vw, 28px)",
              color: "#fff",
              letterSpacing: "0.04em",
            }}
          >
            Book Your Free Aesthetic Consultation in Malta Today
          </h2>
          <p
            style={{
              color: "#ffffff",
              fontSize: "15px",
              maxWidth: "480px",
              margin: "0 auto 28px",
              lineHeight: 1.7,
            }}
          >
            Our team of medically qualified practitioners is here to guide you. Book a free consultation today.
          </p>
          {/* P2: min 44px tap target; P10: primary CTA styling */}
          <Link
            href="/consultation"
            className="btn inline-flex items-center justify-center min-h-[44px] transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            style={{
              background: "#fff",
              color: "var(--teal-text)",
              fontSize: "12px",
              padding: "15px 36px",
              letterSpacing: "0.16em",
            }}
          >
            Free Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
