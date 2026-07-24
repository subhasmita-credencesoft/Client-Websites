import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { BlogCTA } from "@/components/blog/BlogCTA";
import { blogs } from "@/lib/blog";
import {
  breadcrumbSchema,
  jsonLd,
  SITE_URL,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Goa Travel Blog — Tips, Guides & Hidden Gems | Redwings Studio",
  description:
    "Read expert Goa travel guides, beach tips, budget itineraries, and couple-friendly ideas. Practical advice for planning your North Goa trip from Redwings Studio.",
  keywords: [
    "Goa travel blog",
    "North Goa guide",
    "Goa tips",
    "Goa travel guide 2026",
    "Baga Beach guide",
    "budget Goa trip",
    "Goa for couples",
    "Redwings Studio blog",
  ],
  alternates: { canonical: "https://redwingsstudio.com/blog" },
  openGraph: {
    title: "Goa Travel Blog — Tips, Guides & Hidden Gems",
    description:
      "Expert travel guides, beach tips, and budget itineraries for your North Goa trip.",
    images: [
      {
        url: "/mountain-studio/hero-main.jpeg",
        width: 1200,
        height: 630,
        alt: "Redwings Studio Goa Travel Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Goa Travel Blog — Redwings Studio",
    description:
      "Expert travel guides, beach tips, and budget itineraries for North Goa.",
    images: ["/mountain-studio/hero-main.jpeg"],
  },
};

export default function BlogPage() {
  const featured = blogs[0];
  const rest = blogs.slice(1);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Blog", url: `${SITE_URL}/blog` },
            ])
          ),
        }}
      />

      <PageHero
        image="/mountain-studio/hero-main.jpeg"
        eyebrow="Blog"
        title="Goa Travel Guides & Tips"
        description="Practical travel advice, beach guides, budget tips, and hidden gems for planning your North Goa trip."
        priority
      />

      <section className="section-space">
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            <div className="space-y-8">
              {featured && (
                <div>
                  <p className="eyebrow">Featured</p>
                  <BlogCard post={featured} featured />
                </div>
              )}

              <div>
                <p className="eyebrow">All Articles</p>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {rest.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-dark-2">
        <div className="container-shell">
          <BlogCTA />
        </div>
      </section>
    </>
  );
}
