import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { createPageMetadata } from "@/lib/metadata";
import { blogPosts } from "@/lib/data/pages/blog-pages";

export const metadata: Metadata = createPageMetadata({
  title: "Blog",
  path: "/blog",
  description:
    "Read wedding planning tips, travel guides, and destination insights from The Mountain Resort in Karjat — expert advice for couples, families, and travellers.",
});

export default function BlogIndexPage() {
  return (
    <main className="relative overflow-hidden bg-[#11100e] text-white">
      <div className="noise-overlay" />
      <SiteHeader />

      <section className="relative min-h-[28rem] overflow-hidden pt-28 sm:pt-32 md:min-h-[36rem] md:pt-40" data-section-id="blog-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,164,110,0.12),transparent_38%),linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.56)_56%,rgba(0,0,0,0.92)_100%)]" />
        <div className="site-container relative z-10 flex min-h-[28rem] items-start pb-8 pt-16 md:min-h-[36rem] md:pb-12 md:pt-24">
          <div className="max-w-5xl" data-panel-content>
            <p className="site-eyebrow" data-panel-line>Insights & Guides</p>
            <h1 data-section-title data-panel-line className="max-w-5xl">
              The Mountain Blog
            </h1>
            <p className="site-copy-lg mt-5 max-w-4xl text-white/90" data-panel-line>
              Wedding planning tips, travel guides, venue insights, and destination inspiration from The Mountain Resort in Karjat.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[80rem] px-4 md:px-8">
        <Breadcrumbs items={[{ label: "Blog" }]} />
      </div>

      <section className="mx-auto max-w-[80rem] px-4 py-16 md:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} data-card className="group rounded-[1.8rem] border border-white/10 bg-[#182920] shadow-[0_22px_70px_rgba(0,0,0,0.22)] transition-colors duration-500 hover:border-[#c9a46e]/35">
              <div className="relative h-[16rem] overflow-hidden rounded-t-[1.8rem]">
                <Image src={post.heroImage} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-7">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold tracking-[0.15em] text-[#c9a46e]">{post.category}</span>
                  <span className="text-xs text-white/40">{post.publishDate}</span>
                </div>
                <h2 className="mt-4 text-2xl leading-snug md:text-3xl">{post.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-white/80 md:text-lg">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
