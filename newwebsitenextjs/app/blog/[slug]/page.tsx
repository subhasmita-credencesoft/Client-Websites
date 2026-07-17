import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { createPageMetadata } from "@/lib/metadata";
import { getBlogPost, blogPosts } from "@/lib/data/pages/blog-pages";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return createPageMetadata({
    title: post.title,
    path: `/blog/${post.slug}`,
    description: post.excerpt,
    image: post.heroImage,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.heroImage,
    datePublished: post.publishDate,
    author: {
      "@type": "Organization",
      name: "The Mountain Resort in Karjat, By Redwings",
      url: "https://themountainresorts.com",
    },
    publisher: {
      "@type": "Organization",
      name: "The Mountain Resort in Karjat, By Redwings",
      url: "https://themountainresorts.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://themountainresorts.com/blog/${post.slug}/`,
    },
  };

  return (
    <main className="relative overflow-hidden bg-[#11100e] text-white">
      <div className="noise-overlay" />
      <SiteHeader />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <section className="relative min-h-[32rem] overflow-hidden pt-28 sm:pt-32 md:min-h-[42rem] md:pt-40" data-section-id="blog-post-hero">
        <div className="absolute inset-0" data-bg-parallax data-bg-depth="10" data-zoom-scroll>
          <Image src={post.heroImage} alt={post.title} fill className="object-cover" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,164,110,0.12),transparent_38%),linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.56)_56%,rgba(0,0,0,0.92)_100%)]" />
        <div className="site-container relative z-10 flex min-h-[32rem] items-end pb-10 pt-16 md:min-h-[42rem] md:pb-16 md:pt-24">
          <div className="max-w-5xl" data-panel-content>
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/75 backdrop-blur-sm">
                <li><Link href="/" className="transition-colors hover:text-[#c9a46e]">Home</Link></li>
                <li aria-hidden="true" className="text-[#c9a46e]">/</li>
                <li><Link href="/blog" className="transition-colors hover:text-[#c9a46e]">Blog</Link></li>
                <li aria-hidden="true" className="text-[#c9a46e]">/</li>
                <li className="text-[#c9a46e]">{post.category}</li>
              </ol>
            </nav>
            <p className="text-xs font-semibold tracking-[0.2em] text-[#c9a46e]" data-panel-line>{post.category} &mdash; {post.publishDate}</p>
            <h1 data-section-title data-panel-line className="mt-4 max-w-5xl">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-20">
        <p className="text-xl leading-relaxed text-white/85 md:text-2xl" data-reveal>{post.excerpt}</p>

        <div className="mt-12 space-y-12">
          {post.content.map((block, index) => (
            <section key={index} data-reveal>
              {block.heading ? (
                <h2 className="text-2xl leading-snug text-[#c9a46e] md:text-3xl">{block.heading}</h2>
              ) : null}
              <p className="mt-5 text-lg leading-relaxed text-white/85 md:text-xl">{block.body}</p>
            </section>
          ))}
        </div>

        {post.relatedLinks.length > 0 ? (
          <div className="mt-16 rounded-[2rem] border border-white/10 bg-[#182920] p-8 md:p-10">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#c9a46e]">Related</p>
            <div className="mt-6 flex flex-wrap gap-4">
              {post.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white/88 transition-colors hover:border-[#c9a46e]/40 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </article>

      <section className="mx-auto max-w-6xl px-4 pb-20 pt-4 text-center md:px-8" data-reveal>
        <div className="rounded-[2.4rem] border border-white/10 bg-[#182920] px-8 py-12 md:px-16 md:py-14">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#c9a46e]" data-reveal-child>Ready to Plan?</p>
          <h3 className="mx-auto mt-5 max-w-4xl text-3xl md:text-4xl" data-section-title data-reveal-child>
            Explore packages, rooms, and venue details for your destination celebration
          </h3>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4" data-reveal-child>
            <Link href="/offers" className="inline-flex items-center justify-center border border-[#c8a871] bg-[#c8a871] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-black">
              View Packages
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-white/15 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white/88 transition-colors hover:border-[#c9a46e]/40 hover:text-white">
              Contact The Team
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
