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
          /* P6: H2 inside article body — correct heading hierarchy after H1 */
          <h2
            className="font-display mt-12 mb-4"
            style={{
              fontSize: "17px",
              /* P1: var(--ink-soft) on white — assumed sufficient contrast */
              color: "var(--ink-soft)",
              letterSpacing: "0.12em",
              lineHeight: 1.375,
            }}
          >
            {block.text}
          </h2>
        );
      }
      return (
        /* P6: H3 — subordinate to H2, no level-skipping */
        <h3
          className="font-display mt-8 mb-3"
          style={{
            fontSize: "14px",
            color: "var(--teal-text)",
            letterSpacing: "0.12em",
            lineHeight: 1.375,
          }}
        >
          {block.text}
        </h3>
      );

    case "paragraph":
      return (
        /* P6: leading-relaxed (1.625) via lineHeight 1.85 inline; max-w-prose on container */
        <p
          className="mb-5"
          style={{ color: "var(--ink-soft)", lineHeight: 1.85, fontSize: "15.5px" }}
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );

    case "image":
      return (
        <figure className="my-8">
          <div
            className="relative w-full overflow-hidden"
            style={{ borderRadius: "var(--radius)", aspectRatio: "16/9" }}
          >
            <Image
              src={block.src}
              /* P1: meaningful alt — passed through from content data */
              alt={block.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              loading="lazy"
            />
          </div>
          {block.caption && (
            <figcaption
              className="text-center mt-3"
              style={{
                fontSize: "12.5px",
                color: "var(--muted)",
                letterSpacing: "0.06em",
              }}
            >
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "list":
      return (
        /* P1: use <ul> as semantic list — already correct */
        <ul className="mb-6 space-y-2" style={{ paddingLeft: "0" }}>
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3"
              style={{ fontSize: "15.5px", color: "var(--ink-soft)", lineHeight: 1.7 }}
            >
              <span
                aria-hidden="true"
                className="shrink-0 rounded-full"
                style={{
                  width: "6px",
                  height: "6px",
                  background: "var(--teal-deep)",
                  marginTop: "9px",
                  flexShrink: 0,
                }}
              />
              {item}
            </li>
          ))}
        </ul>
      );

    case "cta":
      return (
        /* P2: min 44px tap target; P10: CTA is primary action */
        <div className="my-10 text-center">
          <Link
            href={block.href}
            className="btn btn-teal inline-flex items-center justify-center min-h-[44px] transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              fontSize: "12px",
              padding: "16px 36px",
              outlineColor: "var(--teal-deep)",
            }}
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
    /* P6 / BLOG-SPECIFIC: <article> for each related card */
    <article>
      <Link
        href={`/blog/${post.slug}`}
        className="group card review-card block overflow-hidden transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{
          borderRadius: "var(--radius-card)",
          outlineColor: "var(--teal-deep)",
        }}
        /* P1: descriptive aria-label for link */
        aria-label={`Read related article: ${post.title}`}
      >
        {/* Cover */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "3/2" }}>
          <Image
            src={post.coverImage}
            /* P1: meaningful alt describing related article */
            alt={`Cover image for: ${post.title}`}
            fill
            className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 400px"
            loading="lazy"
          />
          {/* Category chip */}
          <span
            aria-hidden="true"
            className="absolute font-display"
            style={{
              top: "12px",
              left: "14px",
              background: "var(--teal-deep)",
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
          {/* P6: H3 — related cards are within a section already labelled H2 */}
          <h3
            className="font-serif mb-2 leading-snug"
            style={{ fontSize: "14px", color: "var(--teal-text)", letterSpacing: "0.02em" }}
          >
            {post.title}
          </h3>
          <p
            className="line-clamp-2"
            style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}
          >
            {post.excerpt}
          </p>
          <p
            aria-hidden="true"
            className="font-display mt-3"
            style={{ fontSize: "10px", color: "var(--teal-text)", letterSpacing: "0.14em" }}
          >
            Read more &rarr;
          </p>
        </div>
      </Link>
    </article>
  );
}

// ─── Share button ──────────────────────────────────────────────────────────────
// BLOG-SPECIFIC: social share buttons with proper aria-labels

function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const url = `https://www.carismaaesthetics.com/blog/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-3 flex-wrap" role="group" aria-label="Share this article">
      <span
        className="font-display"
        style={{ fontSize: "10px", color: "var(--label)", letterSpacing: "0.18em" }}
      >
        Share
      </span>
      {/* P2: min 44px tap targets for all share links */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook (opens in new tab)"
        className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full transition-all duration-200 ease-in-out hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{
          background: "var(--teal-100)",
          color: "var(--teal-deep)",
          outlineColor: "var(--teal-deep)",
        }}
      >
        {/* Simple text fallback — replace with SVG icon if available */}
        <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.04em" }}>f</span>
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X / Twitter (opens in new tab)"
        className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full transition-all duration-200 ease-in-out hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{
          background: "var(--teal-100)",
          color: "var(--teal-deep)",
          outlineColor: "var(--teal-deep)",
        }}
      >
        <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.04em" }}>X</span>
      </a>
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp (opens in new tab)"
        className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full transition-all duration-200 ease-in-out hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{
          background: "var(--teal-100)",
          color: "var(--teal-deep)",
          outlineColor: "var(--teal-deep)",
        }}
      >
        <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.04em" }}>W</span>
      </a>
    </div>
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
    /* P1: <main> landmark for content */
    <main style={{ background: "var(--teal-100)", minHeight: "100vh" }}>
      {/* ── Breadcrumb nav ────────────────────────────────────── */}
      {/* P9: Breadcrumb with aria-label="Breadcrumb" and aria-current on last item */}
      <nav
        aria-label="Breadcrumb"
        className="container"
        style={{ padding: "16px 20px 0" }}
      >
        <ol
          className="flex items-center gap-2 flex-wrap"
          style={{
            fontSize: "12px",
            color: "var(--muted)",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
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
          <li aria-hidden="true" style={{ color: "var(--line)" }}>/</li>
          <li>
            <Link
              href="/blog"
              className="transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:underline"
              style={{ color: "var(--teal-text)" }}
            >
              Blog
            </Link>
          </li>
          <li aria-hidden="true" style={{ color: "var(--line)" }}>/</li>
          {/* P9: aria-current="page" on last breadcrumb item */}
          <li
            aria-current="page"
            style={{
              color: "var(--muted)",
              maxWidth: "200px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {post.title}
          </li>
        </ol>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────── */}
      {/* P3: hero image with priority — above the fold */}
      <div className="relative w-full overflow-hidden" style={{ maxHeight: "520px" }}>
        <div className="relative w-full" style={{ aspectRatio: "21/9" }}>
          <Image
            src={post.coverImage}
            /* P1: descriptive alt for hero image */
            alt={`Hero image for article: ${post.title}`}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Gradient overlay — decorative */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)",
            }}
          />
        </div>

        {/* Hero text */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-end container"
          style={{ paddingBottom: "48px", textAlign: "center" }}
        >
          {/* Category chip — decorative (real category in meta strip below) */}
          <span
            aria-hidden="true"
            className="font-display mb-4 inline-block"
            style={{
              background: "var(--teal-deep)",
              color: "#fff",
              fontSize: "10px",
              letterSpacing: "0.18em",
              padding: "5px 14px",
              borderRadius: "3px",
            }}
          >
            {post.category}
          </span>

          {/* P6: single H1 per page — article title */}
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

      {/* ── Date / read-time / category strip ────────────────── */}
      <div
        className="w-full"
        style={{
          background: "#fff",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div
          className="container flex flex-wrap items-center gap-4"
          style={{
            padding: "14px 20px",
            fontSize: "12px",
            color: "var(--muted)",
            letterSpacing: "0.06em",
          }}
        >
          <time
            className="font-display"
            dateTime={post.publishDate}
            style={{ fontSize: "10px" }}
          >
            {formattedDate}
          </time>
          <span aria-hidden="true" style={{ color: "var(--line)" }}>|</span>
          <span className="font-display" style={{ fontSize: "10px" }}>
            {post.readTime} min read
          </span>
          <span aria-hidden="true" style={{ color: "var(--line)" }}>|</span>
          {/* P1: BLOG-SPECIFIC: category link with aria-label */}
          <Link
            href={`/blog?category=${encodeURIComponent(post.category)}`}
            className="font-display transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:underline"
            style={{ fontSize: "10px", color: "var(--teal-text)" }}
            aria-label={`View all articles in ${post.category}`}
          >
            {post.category}
          </Link>
        </div>
      </div>

      {/* ── Article body ──────────────────────────────────────── */}
      {/* P6 / BLOG-SPECIFIC: <article> with <header> and <footer>, rel="author" */}
      <div className="container" style={{ padding: "56px 20px 80px" }}>
        <article
          style={{
            background: "#fff",
            borderRadius: "var(--radius-card)",
            padding: "clamp(28px, 5vw, 56px)",
            /* P6 / BLOG-SPECIFIC: max-w-prose for article body readability */
            maxWidth: "800px",
            margin: "0 auto",
            boxShadow: "0 2px 24px rgba(0,0,0,0.05)",
          }}
        >
          {/* Article header — author / share */}
          <header className="mb-8 pb-8" style={{ borderBottom: "1px solid var(--line)" }}>
            {/* P6 / BLOG-SPECIFIC: author info with rel="author" */}
            <address
              className="not-italic flex items-center justify-between flex-wrap gap-4"
              style={{ fontSize: "12px" }}
            >
              <span
                rel="author"
                className="font-display"
                style={{ color: "var(--muted)", letterSpacing: "0.06em", fontSize: "10px" }}
              >
                By{" "}
                <span style={{ color: "var(--teal-text)", fontWeight: 600 }}>
                  Carisma Aesthetics Medical Team
                </span>
              </span>
              <ShareButtons title={post.title} slug={post.slug} />
            </address>
          </header>

          {/* Excerpt / lead paragraph */}
          <p
            className="font-serif mb-10"
            style={{
              fontSize: "17px",
              color: "var(--teal-text)",
              lineHeight: 1.8,
              borderLeft: "3px solid var(--teal-deep)",
              paddingLeft: "20px",
              letterSpacing: "0.02em",
            }}
          >
            {post.excerpt}
          </p>

          {/* Content blocks */}
          {/* P6: prose max-width on content container */}
          <div style={{ maxWidth: "65ch" }}>
            {post.content.map((block, i) => (
              <RenderBlock key={i} block={block} />
            ))}
          </div>

          {/* Internal links section */}
          {post.internalLinks.length > 0 && (
            <div className="mt-12 pt-8" style={{ borderTop: "1px solid var(--line)" }}>
              <p
                className="font-display mb-4"
                style={{ fontSize: "10px", color: "var(--label)", letterSpacing: "0.18em" }}
              >
                Related Treatments
              </p>
              <nav aria-label="Related treatments">
                <div className="flex flex-wrap gap-2">
                  {post.internalLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="btn btn-outline font-display inline-flex items-center justify-center min-h-[44px] transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.12em",
                        padding: "6px 16px",
                        borderRadius: "var(--radius-pill)",
                        outlineColor: "var(--teal-deep)",
                      }}
                      /* P9: descriptive aria-label for treatment links */
                      aria-label={`Learn about ${link.anchorText}`}
                    >
                      {link.anchorText}
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
          )}

          {/* Article footer */}
          <footer className="mt-12 pt-6" style={{ borderTop: "1px solid var(--line)" }}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <p style={{ fontSize: "12px", color: "var(--muted)" }}>
                Published{" "}
                <time dateTime={post.publishDate}>{formattedDate}</time>
                {" · "}
                {post.readTime} min read
              </p>
              <ShareButtons title={post.title} slug={post.slug} />
            </div>
          </footer>
        </article>
      </div>

      {/* ── You Might Also Like ───────────────────────────────── */}
      {related.length > 0 && (
        <section
          aria-labelledby="related-posts-heading"
          style={{ background: "#fff", padding: "72px 0" }}
        >
          <div className="container">
            <div className="text-center mb-12">
              <p
                aria-hidden="true"
                className="font-display mb-3"
                style={{ fontSize: "10px", color: "var(--label)", letterSpacing: "0.22em" }}
              >
                Continue Reading
              </p>
              {/* P6: H2 for "You Might Also Like" section */}
              <h2
                id="related-posts-heading"
                className="font-serif"
                style={{
                  fontSize: "clamp(20px, 3vw, 30px)",
                  color: "var(--teal-text)",
                  letterSpacing: "0.04em",
                }}
              >
                You Might Also Like
              </h2>
            </div>

            {/* P5: responsive grid — 1 col mobile, auto-fit on wider screens */}
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
        aria-labelledby="blog-post-cta-heading"
        style={{
          background: "linear-gradient(135deg, var(--teal-deep) 0%, #466b6b 100%)",
          padding: "72px 20px",
          textAlign: "center",
        }}
      >
        <div className="container">
          <p
            aria-hidden="true"
            className="font-display mb-3"
            style={{ fontSize: "10px", color: "#fff", letterSpacing: "0.22em" }}
          >
            Carisma Aesthetics — Malta
          </p>
          <h2
            id="blog-post-cta-heading"
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
          {/* P2: min 44px tap target; P10: primary CTA */}
          <Link
            href="/consultation"
            className="btn inline-flex items-center justify-center min-h-[44px] transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            style={{
              background: "#fff",
              color: "var(--teal-deep)",
              fontSize: "12px",
              padding: "16px 40px",
              letterSpacing: "0.16em",
            }}
          >
            Book Free Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
