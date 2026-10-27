import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, ArrowRight, User, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogs, getBlog, getRelatedBlogs } from "@/data/blogs";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo/metadata";
import styles from "./article.module.scss";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlog(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    image: post.image,
  });
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getBlog(slug);
  if (!post) notFound();

  const related = getRelatedBlogs(post.slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: `${site.url}${post.image}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Hotel",
      name: site.name,
      url: site.url,
      logo: `${site.url}${site.logo}`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${site.url}/blog/${post.slug}/`,
    },
  };

  return (
    <>
      <JsonLd data={articleSchema} />

      <PageHero title={post.title} subtitle={post.excerpt} image={post.image}>
        <div className={styles.heroMeta}>
          <span className={styles.heroBadge}>{post.category}</span>
          <span className={styles.heroDot}>•</span>
          <span className={styles.heroTime}>
            <Clock size={14} aria-hidden /> {post.readingTime}
          </span>
          <span className={styles.heroDot}>•</span>
          <time dateTime={post.publishedAt} className={styles.heroDate}>
            {new Date(post.publishedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
          </time>
        </div>
      </PageHero>

      <article className="section">
        <div className="container">
          <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />

          <div style={{ height: "2rem" }} />

          <div className={styles.layout}>
            {/* Main Content Column */}
            <div className={styles.contentCol}>
              {/* Table of Contents */}
              {post.tableOfContents && post.tableOfContents.length > 0 && (
                <div className={styles.toc}>
                  <p className={styles.tocTitle}>Table of Contents</p>
                  <ul>
                    {post.tableOfContents.map((item) => (
                      <li key={item.id}>
                        <a href={`#${item.id}`}>{item.title}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Sections */}
              <div className={styles.body}>
                {post.sections.map((sec) => (
                  <section key={sec.id} id={sec.id} className={styles.sectionBlock}>
                    <h2>{sec.heading}</h2>

                    {sec.paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}

                    {sec.callout && (
                      <div className={styles.callout}>
                        <p>{sec.callout}</p>
                      </div>
                    )}

                    {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                      <ul className={styles.bulletList}>
                        {sec.bulletPoints.map((item, idx) => (
                          <li key={idx}>
                            <CheckCircle2 size={18} className={styles.bulletIcon} aria-hidden />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {sec.table && (
                      <div className={styles.tableWrap}>
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              {sec.table.headers.map((h, idx) => (
                                <th key={idx}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {sec.table.rows.map((row, rIdx) => (
                              <tr key={rIdx}>
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx}>{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </section>
                ))}

                {/* FAQs Section */}
                {post.faqs && post.faqs.length > 0 && (
                  <section id="frequently-asked-questions" className={styles.faqSection}>
                    <h2>Frequently Asked Questions</h2>
                    <FaqAccordion items={post.faqs.map((f) => ({ q: f.q, a: f.a }))} />
                  </section>
                )}

                {/* Tags */}
                {post.tags && (
                  <div className={styles.tagsRow}>
                    <span className={styles.tagsLabel}>Tags:</span>
                    {post.tags.map((tag) => (
                      <span key={tag} className={styles.tagPill}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Author Info */}
                <div className={styles.authorBox}>
                  <div className={styles.authorAvatar}>
                    <User size={28} />
                  </div>
                  <div>
                    <p className={styles.authorName}>{post.author.name}</p>
                    <p className={styles.authorRole}>{post.author.role}</p>
                    <p className={styles.authorBio}>
                      Published by the hospitality and local guide desk at Hotel The Taksonz, Ludhiana. Helping guests experience Punjab with comfort, warmth, and insider knowledge.
                    </p>
                  </div>
                </div>

                <div className={styles.backToBlog}>
                  <Link href="/blog" className={styles.backLink}>
                    <ArrowLeft size={16} aria-hidden />
                    <span>Back to all travel guides</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar Column */}
            <aside className={styles.sidebar}>
              <div className={styles.stickyWidget}>
                <div className={styles.hotelCard}>
                  <div className={styles.hotelThumb}>
                    <Photo src="/taksonzhome.avif" alt="Hotel The Taksonz exterior" sizes="300px" />
                  </div>
                  <div className={styles.hotelInfo}>
                    <p className={styles.hotelEyebrow}>Stay With Us</p>
                    <h3>{site.name}</h3>
                    <p className={styles.hotelText}>
                      Located on Grand Trunk Road opposite Ludhiana Railway Station. Premium rooms, multi-cuisine dining & banquet facilities.
                    </p>
                    <a
                      href={site.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.bookBtn}
                    >
                      Check Availability
                    </a>
                  </div>
                </div>

                {related.length > 0 && (
                  <div className={styles.relatedWidget}>
                    <p className={styles.relatedTitle}>Related Guides</p>
                    <ul className={styles.relatedList}>
                      {related.map((rel) => (
                        <li key={rel.slug}>
                          <Link href={`/blog/${rel.slug}`} className={styles.relatedLink}>
                            <span>{rel.title}</span>
                            <ArrowRight size={14} aria-hidden />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </article>

      <CtaBanner
        title="Experience Ludhiana with Hotel The Taksonz"
        text="Book your stay right across from Ludhiana Junction Railway Station. Enjoy generous hospitality, spacious rooms, and delicious cuisine."
        image="/altroom.avif"
      >
        <ButtonLink href={site.bookingUrl} target="_blank" rel="noopener noreferrer" variant="light" size="lg" arrow>
          Book Online
        </ButtonLink>
      </CtaBanner>
    </>
  );
}
