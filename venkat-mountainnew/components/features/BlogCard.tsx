import Link from "next/link";
import type { BlogPost } from "../../types/blog";
import { formatDate } from "../../lib/format";

type BlogCardProps = {
  post: BlogPost;
};

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm">
      <div
        className="h-44 bg-sand"
        style={{
          backgroundImage: `url(${post.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-ink/50">{formatDate(post.date)}</p>
        <h3 className="mt-2 font-serif text-xl">{post.title}</h3>
        <p className="mt-2 text-sm text-ink/70">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} className="mt-4 inline-flex text-sm font-semibold text-accent">
          Read story
        </Link>
      </div>
    </article>
  );
}
