import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts, wixImageUrl, type WixPost } from '@/lib/wix-blog';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Aesthetics Blog | Carisma Aesthetics Malta',
  description: 'Expert insights on skin treatments, fillers, anti-ageing, laser hair removal, and more from Malta\'s leading med-aesthetics clinic.',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function PostCard({ post }: { post: WixPost }) {
  const imgId = post.media?.wixMedia?.image?.id;
  const imgUrl = imgId ? wixImageUrl(imgId, 600, 400) : null;

  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col overflow-hidden rounded-lg border border-[var(--line)] bg-white hover:shadow-md transition-shadow">
      {imgUrl && (
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3/2' }}>
          <Image
            src={imgUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-col flex-grow p-5">
        <p className="text-xs text-[var(--muted)] mb-2 uppercase tracking-wider" style={{ fontFamily: 'Novecento Wide, sans-serif' }}>
          {formatDate(post.firstPublishedDate)} · {post.minutesToRead} min read
        </p>
        <h2 className="text-base font-semibold mb-2 text-[var(--ink)] leading-snug group-hover:text-[var(--teal)] transition-colors" style={{ fontFamily: 'Novecento Wide, sans-serif' }}>
          {post.title}
        </h2>
        <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-3 flex-grow" style={{ fontFamily: 'Roboto Local, sans-serif' }}>
          {post.excerpt}
        </p>
        <span className="mt-4 text-xs font-semibold text-[var(--teal)] uppercase tracking-wider" style={{ fontFamily: 'Novecento Wide, sans-serif' }}>
          Read more →
        </span>
      </div>
    </Link>
  );
}

export default async function BlogPage() {
  const posts = await getAllPosts();
  const sorted = [...posts].sort(
    (a, b) => new Date(b.firstPublishedDate).getTime() - new Date(a.firstPublishedDate).getTime()
  );

  return (
    <div className="min-h-screen bg-[var(--cream)]">
      {/* Hero */}
      <section className="bg-white border-b border-[var(--line)] py-16 px-4">
        <div className="max-w-[var(--maxw)] mx-auto text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-[var(--teal)] mb-3" style={{ fontFamily: 'Novecento Wide, sans-serif' }}>
            Expert Insights
          </p>
          <h1 className="text-4xl md:text-5xl text-[var(--ink)] mb-4" style={{ fontFamily: 'Trajan Pro, serif', fontWeight: 400 }}>
            The Aesthetics Edit
          </h1>
          <p className="text-[var(--muted)] max-w-xl mx-auto text-sm leading-relaxed" style={{ fontFamily: 'Roboto Local, sans-serif' }}>
            Honest guides on skin, injectables, and advanced treatments — written by the medical team at Carisma Aesthetics Malta.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-[var(--maxw)] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
