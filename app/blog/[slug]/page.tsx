import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlog, ALL_BLOG_SLUGS } from "@/lib/blogs";
import BlogTemplate from "@/components/BlogTemplate";

// ─── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return ALL_BLOG_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

// ─── generateMetadata ──────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlog(slug);

  if (!blog) {
    return {
      title: "Post Not Found | Carisma Aesthetics",
    };
  }

  return {
    title: blog.metaTitle,
    description: blog.metaDescription,
    alternates: {
      canonical: `https://www.carismaaesthetics.com/blog/${blog.slug}`,
    },
    openGraph: {
      title: blog.metaTitle,
      description: blog.metaDescription,
      url: `https://www.carismaaesthetics.com/blog/${blog.slug}`,
      type: "article",
      publishedTime: blog.publishDate,
      images: [
        {
          url: blog.coverImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.metaTitle,
      description: blog.metaDescription,
      images: [blog.coverImage],
    },
  };
}

// ─── Page component ────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = getBlog(slug);

  if (!blog) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: blog.metaTitle ?? blog.title,
            description: blog.metaDescription ?? blog.excerpt ?? "",
            url: `https://www.carismaaesthetics.com/blog/${blog.slug}`,
            datePublished: blog.publishDate ?? "",
            dateModified: blog.publishDate ?? "",
            image: blog.coverImage
              ? [{ "@type": "ImageObject", url: blog.coverImage }]
              : [{ "@type": "ImageObject", url: "https://www.carismaaesthetics.com/og-aesthetics.jpg", width: 1200, height: 630 }],
            author: {
              "@type": "Organization",
              name: "Carisma Aesthetics",
              url: "https://www.carismaaesthetics.com",
            },
            publisher: {
              "@type": "Organization",
              name: "Carisma Aesthetics",
              url: "https://www.carismaaesthetics.com",
              logo: {
                "@type": "ImageObject",
                url: "https://www.carismaaesthetics.com/assets/logos/carisma-wordmark.svg",
              },
            },
          }).replace(/</g, "\\u003c"),
        }}
      />
      <BlogTemplate post={blog} />
    </>
  );
}
