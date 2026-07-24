import Link from "next/link";
import { blogs } from "@/lib/blog";

export function BlogSidebar() {
  const categories = Array.from(new Set(blogs.map((b) => b.category)));

  return (
    <aside className="space-y-8">
      <div className="rounded-[20px] border border-gold/15 bg-dark-2 p-6">
        <h3 className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-ivory/80">
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/blog?category=${encodeURIComponent(cat)}`}
              className="block py-1.5 text-sm text-ivory/55 transition hover:text-gold"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-[20px] border border-gold/15 bg-dark-2 p-6">
        <h3 className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-ivory/80">
          Recent Posts
        </h3>
        <div className="space-y-4">
          {blogs.slice(0, 4).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold-light">
                {post.category}
              </p>
              <p className="mt-1 text-sm text-ivory/65 transition group-hover:text-gold">
                {post.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
