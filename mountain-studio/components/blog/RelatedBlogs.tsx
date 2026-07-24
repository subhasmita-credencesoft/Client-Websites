import Link from "next/link";
import { blogs } from "@/lib/blog";

interface RelatedBlogsProps {
  slugs: string[];
}

export function RelatedBlogs({ slugs }: RelatedBlogsProps) {
  const related = slugs
    .map((slug) => blogs.find((b) => b.slug === slug))
    .filter(Boolean);

  if (related.length === 0) return null;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {related.map((post) => (
        <Link
          key={post!.slug}
          href={`/blog/${post!.slug}`}
          className="group rounded-[20px] border border-gold/10 bg-dark-2 p-5 transition hover:border-gold/25"
        >
          <p className="text-[10px] uppercase tracking-[0.25em] text-gold-light">
            {post!.category}
          </p>
          <h3 className="mt-2 font-display text-xl text-ivory transition group-hover:text-gold">
            {post!.title}
          </h3>
          <p className="mt-2 text-xs leading-6 text-ivory/50 line-clamp-2">
            {post!.excerpt}
          </p>
          <span className="mt-3 inline-block text-[11px] uppercase tracking-[0.2em] text-gold">
            Read →
          </span>
        </Link>
      ))}
    </div>
  );
}
