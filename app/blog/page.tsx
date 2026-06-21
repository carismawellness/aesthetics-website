import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllBlogs } from "@/lib/blogs";
import type { BlogPost } from "@/lib/blog-types";

export const metadata: Metadata = {
  title: "Carisma Aesthetics | Aesthetics Blog | #1 Award Winning Chain in Malta",
  description:
    "Botox, fillers or body contouring tips, Carisma Aesthetics' blog cover it all—Malta's trusted clinic for expert guidance in medical aesthetics.",
  openGraph: {
    title: "Carisma Aesthetics | Aesthetics Blog | #1 Award Winning Chain in Malta",
    description:
      "Botox, fillers or body contouring tips, Carisma Aesthetics' blog cover it all—Malta's trusted clinic for expert guidance in medical aesthetics.",
    url: "https://www.carismaaesthetics.com/blog",
    siteName: "Carisma Aesthetics",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carisma Aesthetics | Aesthetics Blog | #1 Award Winning Chain in Malta",
    description:
      "Botox, fillers or body contouring tips, Carisma Aesthetics' blog cover it all—Malta's trusted clinic for expert guidance in medical aesthetics.",
  },
};

function BlogCard({ post }: { post: BlogPost }) {
  const formattedDate = new Date(post.publishDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group card review-card block overflow-hidden"
      style={{
        borderRadius: "var(--radius-card)",
      }}
    >
      {/* Cover image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/2" }}>
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Category chip */}
        <span
          className="absolute font-display"
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
        {/* Date + read time */}
        <div
          className="flex items-center gap-3 mb-3"
          style={{ fontSize: "11px", color: "var(--muted)", letterSpacing: "0.06em" }}
        >
          <span className="font-display" style={{ fontSize: "9.5px" }}>{formattedDate}</span>
          <span style={{ color: "var(--line)" }}>·</span>
          <span className="font-display" style={{ fontSize: "9.5px" }}>{post.readTime} min read</span>
        </div>

        {/* Title */}
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

        {/* Read more */}
        <span
          className="font-display"
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
  );
}

export default function BlogIndexPage() {
  const posts = getAllBlogs();

  return (
    <div style={{ background: "var(--teal-100)", minHeight: "100vh" }}>
      {/* ── Page header ─────────────────────────────── */}
      <section
        style={{
          background: "#fff",
          borderBottom: "1px solid var(--line)",
          padding: "72px 20px 64px",
          textAlign: "center",
        }}
      >
        <div className="container">
          <p
            className="font-display mb-4"
            style={{ fontSize: "10px", color: "var(--label)", letterSpacing: "0.22em" }}
          >
            Carisma Aesthetics
          </p>
          <h1
            className="font-serif"
            style={{
              fontSize: "clamp(26px, 5vw, 48px)",
              color: "var(--teal-deep)",
              letterSpacing: "0.06em",
              lineHeight: 1.2,
              marginBottom: "20px",
            }}
          >
            Our Blog
          </h1>
          <p
            style={{
              color: "var(--muted)",
              fontSize: "15px",
              maxWidth: "540px",
              margin: "0 auto",
              lineHeight: 1.75,
            }}
          >
            Expert insights on medical aesthetics, skincare, and beauty — written by our medically qualified team in Malta.
          </p>
        </div>
      </section>

      {/* ── Post grid ───────────────────────────────── */}
      <section className="container" style={{ padding: "64px 20px 96px" }}>
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
              <Link href="/consultation" className="btn btn-teal">
                Book a Consultation
              </Link>
            </div>
          </div>
        ) : (
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
        style={{
          background: "linear-gradient(135deg, var(--teal-deep) 0%, #466b6b 100%)",
          padding: "64px 20px",
          textAlign: "center",
        }}
      >
        <div className="container">
          <h2
            className="font-serif mb-5"
            style={{
              fontSize: "clamp(18px, 3vw, 28px)",
              color: "#fff",
              letterSpacing: "0.04em",
            }}
          >
            Have a Question? Let Us Help.
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
          <Link
            href="/consultation"
            className="btn"
            style={{
              background: "#fff",
              color: "var(--teal-text)",
              fontSize: "12px",
              padding: "15px 36px",
              letterSpacing: "0.16em",
              display: "inline-flex",
            }}
          >
            Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
