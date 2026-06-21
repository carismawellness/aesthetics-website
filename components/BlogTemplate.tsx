import Link from "next/link";
import Image from "next/image";
import type { BlogPost, BlogBlock } from "@/lib/blog-types";
import { getRelatedBlogs, getAllBlogs } from "@/lib/blogs";

// ─── Block renderer ────────────────────────────────────────────────────────────

function RenderBlock({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "heading":
      if (block.level === 2) {
        return (
          <h2
            className="font-display mt-12 mb-4"
            style={{ fontSize: "17px", color: "var(--ink-soft)", letterSpacing: "0.12em" }}
          >
            {block.text}
          </h2>
        );
      }
      return (
        <h3
          className="font-display mt-8 mb-3"
          style={{ fontSize: "14px", color: "var(--teal)", letterSpacing: "0.12em" }}
        >
          {block.text}
        </h3>
      );

    case "paragraph":
      return (
        <p
          className="mb-5"
          style={{ color: "var(--ink-soft)", lineHeight: 1.85, fontSize: "15.5px" }}
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );

    case "image":
      return (
        <figure className="my-8">
          <div className="relative w-full overflow-hidden" style={{ borderRadius: "var(--radius)", aspectRatio: "16/9" }}>
            <Image
              src={block.src}
              alt={block.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {block.caption && (
            <figcaption
              className="text-center mt-3"
              style={{ fontSize: "12.5px", color: "var(--muted)", letterSpacing: "0.06em" }}
            >
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "list":
      return (
        <ul className="mb-6 space-y-2" style={{ paddingLeft: "0" }}>
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3"
              style={{ fontSize: "15.5px", color: "var(--ink-soft)", lineHeight: 1.7 }}
            >
              <span
                className="shrink-0 mt-1 rounded-full"
                style={{ width: "6px", height: "6px", background: "var(--teal)", marginTop: "9px" }}
              />
              {item}
            </li>
          ))}
        </ul>
      );

    case "cta":
      return (
        <div className="my-10 text-center">
          <Link
            href={block.href}
            className="btn btn-teal"
            style={{ fontSize: "12px", padding: "16px 36px" }}
          >
            {block.label}
          </Link>
        </div>
      );

    default:
      return null;
  }
}

// ─── Related post card ─────────────────────────────────────────────────────────

function RelatedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group card review-card block overflow-hidden"
      style={{
        borderRadius: "var(--radius-card)",
      }}
    >
      {/* Cover */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/2" }}>
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        {/* Category chip */}
        <span
          className="absolute font-display"
          style={{
            top: "12px",
            left: "14px",
            background: "var(--teal)",
            color: "#fff",
            fontSize: "9px",
            letterSpacing: "0.14em",
            padding: "4px 10px",
            borderRadius: "3px",
          }}
        >
          {post.category}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: "18px 20px 22px" }}>
        <p
          className="font-serif mb-2 leading-snug"
          style={{ fontSize: "14px", color: "var(--teal)", letterSpacing: "0.02em" }}
        >
          {post.title}
        </p>
        <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }} className="line-clamp-2">
          {post.excerpt}
        </p>
        <p
          className="font-display mt-3"
          style={{ fontSize: "10px", color: "var(--teal)", letterSpacing: "0.14em" }}
        >
          Read more &rarr;
        </p>
      </div>
    </Link>
  );
}

// ─── Main BlogTemplate ─────────────────────────────────────────────────────────

export default function BlogTemplate({ post }: { post: BlogPost }) {
  const relatedByCategory = getRelatedBlogs(post.slug, post.category, 3);

  // If fewer than 3 related in category, pad from other posts
  const allPosts = getAllBlogs();
  const related =
    relatedByCategory.length >= 3
      ? relatedByCategory
      : [
          ...relatedByCategory,
          ...allPosts
            .filter(
              (p) =>
                p.slug !== post.slug &&
                !relatedByCategory.some((r) => r.slug === p.slug)
            )
            .slice(0, 3 - relatedByCategory.length),
        ];

  const formattedDate = new Date(post.publishDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div style={{ background: "var(--teal-100)", minHeight: "100vh" }}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden" style={{ maxHeight: "520px" }}>
        <div className="relative w-full" style={{ aspectRatio: "21/9" }}>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)" }}
          />
        </div>

        {/* Hero text */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-end container"
          style={{ paddingBottom: "48px", textAlign: "center" }}
        >
          {/* Category chip */}
          <span
            className="font-display mb-4 inline-block"
            style={{
              background: "var(--teal)",
              color: "#fff",
              fontSize: "10px",
              letterSpacing: "0.18em",
              padding: "5px 14px",
              borderRadius: "3px",
            }}
          >
            {post.category}
          </span>

          {/* Title */}
          <h1
            className="font-serif"
            style={{
              color: "#fff",
              fontSize: "clamp(22px, 4vw, 42px)",
              lineHeight: 1.25,
              maxWidth: "780px",
              textShadow: "0 2px 12px rgba(0,0,0,0.35)",
              letterSpacing: "0.03em",
            }}
          >
            {post.title}
          </h1>
        </div>
      </div>

      {/* ── Date / read-time strip ────────────────────────────── */}
      <div
        className="w-full"
        style={{
          background: "#fff",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div
          className="container flex flex-wrap items-center gap-4"
          style={{ padding: "14px 20px", fontSize: "12px", color: "var(--muted)", letterSpacing: "0.06em" }}
        >
          <span className="font-display" style={{ fontSize: "10px" }}>{formattedDate}</span>
          <span style={{ color: "var(--line)" }}>|</span>
          <span className="font-display" style={{ fontSize: "10px" }}>{post.readTime} min read</span>
          <span style={{ color: "var(--line)" }}>|</span>
          <span className="font-display" style={{ fontSize: "10px", color: "var(--teal)" }}>{post.category}</span>
        </div>
      </div>

      {/* ── Article body ──────────────────────────────────────── */}
      <div className="container" style={{ padding: "56px 20px 80px" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: "var(--radius-card)",
            padding: "clamp(28px, 5vw, 56px)",
            maxWidth: "800px",
            margin: "0 auto",
            boxShadow: "0 2px 24px rgba(0,0,0,0.05)",
          }}
        >
          {/* Excerpt / lead */}
          <p
            className="font-serif mb-10"
            style={{
              fontSize: "17px",
              color: "var(--teal)",
              lineHeight: 1.8,
              borderLeft: "3px solid var(--teal)",
              paddingLeft: "20px",
              letterSpacing: "0.02em",
            }}
          >
            {post.excerpt}
          </p>

          {/* Content blocks */}
          <div>
            {post.content.map((block, i) => (
              <RenderBlock key={i} block={block} />
            ))}
          </div>

          {/* Internal links section */}
          {post.internalLinks.length > 0 && (
            <div
              className="mt-12 pt-8"
              style={{ borderTop: "1px solid var(--line)" }}
            >
              <p
                className="font-display mb-4"
                style={{ fontSize: "10px", color: "var(--label)", letterSpacing: "0.18em" }}
              >
                Related Treatments
              </p>
              <div className="flex flex-wrap gap-2">
                {post.internalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="btn btn-outline font-display"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.12em",
                      padding: "6px 16px",
                      borderRadius: "var(--radius-pill)",
                    }}
                  >
                    {link.anchorText}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── You Might Also Like ───────────────────────────────── */}
      {related.length > 0 && (
        <section style={{ background: "#fff", padding: "72px 0" }}>
          <div className="container">
            <div className="text-center mb-12">
              <p
                className="font-display mb-3"
                style={{ fontSize: "10px", color: "var(--label)", letterSpacing: "0.22em" }}
              >
                Continue Reading
              </p>
              <h2
                className="font-serif"
                style={{ fontSize: "clamp(20px, 3vw, 30px)", color: "var(--teal)", letterSpacing: "0.04em" }}
              >
                You Might Also Like
              </h2>
            </div>

            <div
              className="grid gap-6"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                maxWidth: "960px",
                margin: "0 auto",
              }}
            >
              {related.map((p) => (
                <RelatedCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Full-width CTA banner ─────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, var(--teal) 0%, var(--teal-deep, #7a9e9e) 100%)",
          padding: "72px 20px",
          textAlign: "center",
        }}
      >
        <div className="container">
          <p
            className="font-display mb-3"
            style={{ fontSize: "10px", color: "#fff", letterSpacing: "0.22em" }}
          >
            Carisma Aesthetics — Malta
          </p>
          <h2
            className="font-serif mb-5"
            style={{
              fontSize: "clamp(20px, 3.5vw, 34px)",
              color: "#fff",
              letterSpacing: "0.04em",
              lineHeight: 1.3,
            }}
          >
            Ready to Begin Your Journey?
          </h2>
          <p
            style={{
              color: "#fff",
              fontSize: "15px",
              maxWidth: "520px",
              margin: "0 auto 32px",
              lineHeight: 1.7,
            }}
          >
            Book a free consultation with our medically qualified team and get a personalised plan tailored to your goals.
          </p>
          <Link
            href="/consultation"
            className="btn"
            style={{
              background: "#fff",
              color: "var(--teal)",
              fontSize: "12px",
              padding: "16px 40px",
              letterSpacing: "0.16em",
              display: "inline-flex",
            }}
          >
            Book Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
