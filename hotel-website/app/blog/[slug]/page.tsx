import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import blogPosts from "../../../data/blogs";
import blogFilterPosts from "../../../data/blogFilterPosts";
import PageHero from "../../../components/sections/PageHero";
import AnimatedSection from "../../../components/sections/AnimatedSection";
import Container from "../../../components/ui/Container";
import { createPageMetadata } from "../../../lib/metadata";

const allPosts = [...blogPosts, ...blogFilterPosts];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((item) => item.slug === slug);

  if (!post) {
    return createPageMetadata({
      title: "Blog",
      description: "Stories and updates from UK's Resort, Khopoli.",
      path: "/blog",
    });
  }

  return createPageMetadata({
    title: `${post.title} | UK's Resort Khopoli Blog`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
  });
}

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = allPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const imageUrl = post.image.startsWith("http")
    ? post.image
    : `https://www.uksresort.com${post.image}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    articleBody: post.content,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    image: imageUrl,
    publisher: {
      "@type": "Organization",
      name: "UK's Resort, Khopoli",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.uksresort.com/blog/${post.slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.uksresort.com/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.uksresort.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://www.uksresort.com/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PageHero
        title={post.title}
        backgroundImage={imageUrl}
        subtitle={post.excerpt}
        breadcrumb="Home / Blog"
        minHeightClassName="min-h-[70vh]"
      />
      <section className="bg-[#f6f3ed] py-16 text-[#1f3c44] md:py-20">
        <Container className="max-w-3xl">
          <AnimatedSection>
            <article className="space-y-6 rounded-3xl bg-white p-8 shadow-sm sm:p-10">
              <AnimatedSection delay={100}>
                <div className="flex flex-wrap items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#1f3c44]/50">
                  <time dateTime={post.date}>{post.date}</time>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1f3c44]/20" />
                  <span>By {post.author}</span>
                  {"category" in post && post.category ? (
                    <>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#1f3c44]/20" />
                      <span className="text-[#c98141]">{post.category}</span>
                    </>
                  ) : null}
                </div>
              </AnimatedSection>

              <AnimatedSection delay={180}>
                <h1 className="font-serif text-3xl leading-tight md:text-4xl">{post.title}</h1>
              </AnimatedSection>

              <AnimatedSection delay={260}>
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src={imageUrl}
                    alt={post.title}
                    width={1200}
                    height={675}
                    className="h-auto w-full object-cover"
                    unoptimized={imageUrl.startsWith("http")}
                    priority
                  />
                </div>
              </AnimatedSection>

              <AnimatedSection delay={340}>
                <div className="space-y-5 text-[1.05rem] leading-8 text-[#1f3c44]/80">
                  {post.content.split("\n").map((paragraph, i) => (
                    paragraph.trim() ? (
                      <p key={i}>{paragraph.trim()}</p>
                    ) : null
                  ))}
                </div>
              </AnimatedSection>
            </article>
          </AnimatedSection>

          <AnimatedSection delay={420}>
            <div className="mt-10 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.18em] text-[#c98141] transition hover:gap-2.5"
              >
                <span aria-hidden="true">&larr;</span> Back to Blog
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      <section className="bg-white py-16 text-[#1f3c44] md:py-20">
        <Container>
          <AnimatedSection>
            <h2 className="text-center font-serif text-3xl md:text-4xl">More Articles</h2>
            <p className="mt-3 text-center text-sm text-[#1f3c44]/60">
              Explore more stories and guides from UK's Resort Khopoli.
            </p>
          </AnimatedSection>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allPosts
              .filter((p) => p.slug !== slug)
              .slice(0, 3)
              .map((related, i) => {
                const relatedImg = related.image.startsWith("http")
                  ? related.image
                  : `https://www.uksresort.com${related.image}`;
                return (
                  <AnimatedSection key={related.slug} delay={i * 100}>
                    <Link
                      href={`/blog/${related.slug}`}
                      className="group block overflow-hidden rounded-2xl bg-[#f6f3ed] transition hover:shadow-md"
                    >
                      <div className="relative h-48 bg-[#efeee9]">
                        <Image
                          src={relatedImg}
                          alt={related.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                          unoptimized={relatedImg.startsWith("http")}
                        />
                      </div>
                      <div className="space-y-2 p-5">
                        {"category" in related && related.category ? (
                          <span className="inline-block rounded-full border border-[#1f3c44]/15 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#c98141]">
                            {related.category}
                          </span>
                        ) : null}
                        <h3 className="font-serif text-lg leading-snug transition-colors group-hover:text-[#c98141]">
                          {related.title}
                        </h3>
                        <p className="line-clamp-2 text-sm leading-6 text-[#1f3c44]/65">
                          {related.excerpt}
                        </p>
                      </div>
                    </Link>
                  </AnimatedSection>
                );
              })}
          </div>
        </Container>
      </section>
    </>
  );
}

export function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}
