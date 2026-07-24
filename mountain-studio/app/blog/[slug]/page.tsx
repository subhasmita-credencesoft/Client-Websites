import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { BlogBreadcrumb } from "@/components/blog/BlogBreadcrumb";
import { BlogTOC } from "@/components/blog/BlogTOC";
import { BlogFAQSection } from "@/components/blog/BlogFAQ";
import { BlogCTA } from "@/components/blog/BlogCTA";
import { RelatedBlogs } from "@/components/blog/RelatedBlogs";
import { getBlogBySlug, getBlogSlugs } from "@/lib/blog";
import {
  breadcrumbSchema,
  jsonLd,
  SITE_URL,
  faqSchema,
} from "@/lib/structured-data";

interface BlogPostPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getBlogBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: [post.focusKeyword, ...post.secondaryKeywords],
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      images: [
        {
          url: post.featuredImage,
          width: post.featuredImageWidth,
          height: post.featuredImageHeight,
          alt: post.featuredImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.featuredImage],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogBySlug(params.slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}/blog/${post.slug}#article`,
    url: `${SITE_URL}/blog/${post.slug}`,
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Blog", url: `${SITE_URL}/blog` },
              { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(articleSchema) }}
      />
      {post.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd(faqSchema(post.faqs)),
          }}
        />
      )}

      <article className="pt-28 pb-20">
        {/* Hero */}
        <div className="container-shell">
          <BlogBreadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title, href: `/blog/${post.slug}` },
            ]}
          />

          <div className="mb-8">
            <span className="rounded-full border border-gold/25 bg-dark-2 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-gold-light">
              {post.category}
            </span>
          </div>

          <h1 className="display-title max-w-4xl text-4xl sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-5 text-[12px] uppercase tracking-[0.2em] text-ivory/50">
            <span className="flex items-center gap-1.5">
              <User size={14} />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readingTime}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="container-shell mt-10">
          <div className="relative aspect-[21/9] overflow-hidden rounded-[28px]">
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/30 to-transparent" />
          </div>
        </div>

        {/* Content Area */}
        <div className="container-shell mt-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
            {/* Main Content */}
            <div>
              {/* TOC */}
              <div className="mb-10">
                <BlogTOC toc={post.toc} />
              </div>

              {/* Article Content */}
              <div
                className="prose-custom max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Inline internal links */}
              <div className="mt-12 rounded-[20px] border border-gold/12 bg-dark-2 p-6">
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-ivory/70">
                  Quick Links
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.internalLinks.map((link) => (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      className="rounded-full border border-gold/15 px-4 py-2 text-xs text-ivory/55 transition hover:border-gold/40 hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Last Updated */}
              <div className="mt-8 text-xs text-ivory/40">
                Last updated:{" "}
                {new Date(post.updatedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>

              {/* Author Box */}
              <div className="mt-10 flex items-center gap-4 rounded-[20px] border border-gold/12 bg-dark-2 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-ivory/80">
                    {post.author}
                  </p>
                  <p className="text-xs text-ivory/50">{post.authorRole}</p>
                </div>
              </div>

              {/* FAQ Section */}
              {post.faqs.length > 0 && (
                <div className="mt-14">
                  <h2 className="font-display text-3xl text-ivory sm:text-4xl">
                    Frequently Asked Questions
                  </h2>
                  <div className="mt-8">
                    <BlogFAQSection faqs={post.faqs} />
                  </div>
                </div>
              )}

              {/* Related Posts */}
              <div className="mt-14">
                <h2 className="font-display text-3xl text-ivory sm:text-4xl">
                  Related Articles
                </h2>
                <div className="mt-8">
                  <RelatedBlogs slugs={post.relatedSlugs} />
                </div>
              </div>

              {/* Back to Blog */}
              <div className="mt-12">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-ivory/50 transition hover:text-gold"
                >
                  <ArrowLeft size={14} />
                  Back to All Articles
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-8">
                <div className="rounded-[20px] border border-gold/15 bg-dark-2 p-6">
                  <p className="text-sm font-medium uppercase tracking-[0.22em] text-ivory/70">
                    Stay at Redwings Studio
                  </p>
                  <p className="mt-3 text-sm leading-7 text-ivory/55">
                    Comfortable studio apartments in Arpora, North Goa from
                    ₹1,950/night. Pool access, free Wi-Fi, and easy reach to
                    Baga, Calangute, and Anjuna beaches.
                  </p>
                  <div className="mt-5 space-y-3">
                    <Link
                      href="/booking"
                      className="block rounded-full bg-gold py-2.5 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-dark transition hover:bg-gold-light"
                    >
                      Check Availability
                    </Link>
                    <Link
                      href="/rooms"
                      className="block rounded-full border border-gold/30 py-2.5 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-ivory/70 transition hover:border-gold hover:text-gold"
                    >
                      View Rooms
                    </Link>
                  </div>
                </div>

                <div className="rounded-[20px] border border-gold/15 bg-dark-2 p-6">
                  <p className="text-sm font-medium uppercase tracking-[0.22em] text-ivory/70">
                    Popular Guides
                  </p>
                  <div className="mt-4 space-y-3">
                    {[
                      { label: "Complete North Goa Travel Guide", href: "/blog/complete-north-goa-travel-guide" },
                      { label: "Best Beaches in North Goa", href: "/blog/best-beaches-north-goa" },
                      { label: "Budget Trip to Goa", href: "/blog/budget-trip-to-goa" },
                      { label: "Where to Stay in North Goa", href: "/blog/where-to-stay-north-goa" },
                    ].map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block text-sm text-ivory/55 transition hover:text-gold"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="section-space bg-dark-2">
        <div className="container-shell">
          <BlogCTA />
        </div>
      </section>

    </>
  );
}
