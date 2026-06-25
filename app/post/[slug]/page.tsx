import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { POST_REGISTRY, getPost, getRelatedPosts } from "@/lib/posts";
import BlogTemplate from "@/components/BlogTemplate";

const ORIGIN = "https://www.carismaaesthetics.com";

// Ported Wix blog posts keep their original /post/<slug> URLs for SEO continuity.
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(POST_REGISTRY).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post Not Found | Carisma Aesthetics" };

  const url = `${ORIGIN}/post/${post.slug}`;
  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url,
      type: "article",
      publishedTime: post.publishDate,
      images: post.coverImage ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function PortedPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${ORIGIN}/post/${post.slug}`;
  const related = getRelatedPosts(post.slug, post.category, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.metaTitle ?? post.title,
            description: post.metaDescription ?? post.excerpt ?? "",
            url,
            datePublished: post.publishDate ?? "",
            dateModified: post.publishDate ?? "",
            image: post.coverImage
              ? [{ "@type": "ImageObject", url: post.coverImage }]
              : [{ "@type": "ImageObject", url: `${ORIGIN}/og-aesthetics.jpg`, width: 1200, height: 630 }],
            author: { "@type": "Organization", name: "Carisma Aesthetics", url: ORIGIN },
            publisher: {
              "@type": "Organization",
              name: "Carisma Aesthetics",
              url: ORIGIN,
              logo: { "@type": "ImageObject", url: `${ORIGIN}/assets/logos/carisma-wordmark.svg` },
            },
          }).replace(/</g, "\\u003c"),
        }}
      />
      <BlogTemplate post={post} basePath="/post" baseLabel="Articles" related={related} />
    </>
  );
}
