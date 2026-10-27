import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { HeroFor } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ButtonLink } from "@/components/ui/Button";
import { blogs } from "@/data/blogs";
import { pages } from "@/data/pages";
import { site } from "@/data/site";
import { metaFor } from "@/lib/seo/metadata";
import styles from "./blog.module.scss";

const page = pages.blog;
export const metadata: Metadata = metaFor(page);

export default function BlogIndexPage() {
  const featured = blogs[0];
  const rest = blogs.slice(1);

  return (
    <>
      <HeroFor page={page} />

      <section className="section">
        <div className="container">
          <Breadcrumbs items={[{ label: page.title }]} />

          <div style={{ height: "2.5rem" }} />

          {/* Featured Post */}
          {featured && (
            <Reveal className={styles.featuredCard}>
              <div className={styles.featuredMedia}>
                <Photo src={featured.image} alt={featured.title} sizes="(min-width: 1024px) 50vw, 100vw" />
                <span className={styles.categoryBadge}>{featured.category}</span>
              </div>
              <div className={styles.featuredBody}>
                <div className={styles.metaRow}>
                  <span className={styles.metaItem}>
                    <Calendar size={14} aria-hidden />
                    <time dateTime={featured.publishedAt}>
                      {new Date(featured.publishedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                    </time>
                  </span>
                  <span className={styles.metaItem}>
                    <Clock size={14} aria-hidden />
                    <span>{featured.readingTime}</span>
                  </span>
                </div>
                <h2>
                  <Link href={`/blog/${featured.slug}`} className={styles.featuredTitle}>
                    {featured.title}
                  </Link>
                </h2>
                <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
                <Link href={`/blog/${featured.slug}`} className={styles.readMore}>
                  <span>Read full guide</span>
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </div>
            </Reveal>
          )}

          <div style={{ height: "3.5rem" }} />

          <div className={styles.gridHeader}>
            <h2 className={styles.gridTitle}>All Guides & Local Insights</h2>
            <p className={styles.gridSub}>Expert advice on travel, events, food, and culture in Ludhiana.</p>
          </div>

          {/* Grid of Remaining Posts */}
          <div className={styles.grid}>
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.08} className={styles.card}>
                <Link href={`/blog/${post.slug}`} className={styles.mediaLink} tabIndex={-1} aria-hidden>
                  <div className={styles.media}>
                    <Photo src={post.image} alt="" decorative sizes="(min-width: 768px) 33vw, 100vw" />
                    <span className={styles.categoryBadge}>{post.category}</span>
                  </div>
                </Link>
                <div className={styles.cardBody}>
                  <div className={styles.metaRow}>
                    <span className={styles.metaItem}>
                      <Calendar size={13} aria-hidden />
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                      </time>
                    </span>
                    <span className={styles.metaItem}>
                      <Clock size={13} aria-hidden />
                      <span>{post.readingTime}</span>
                    </span>
                  </div>
                  <h3>
                    <Link href={`/blog/${post.slug}`} className={styles.cardTitle}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className={styles.cardExcerpt}>{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className={styles.cardLink}>
                    <span>Read article</span>
                    <ArrowRight size={14} aria-hidden />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Planning a Visit to Ludhiana?"
        text="Enjoy luxury comfort, delicious dining, and direct walking-distance convenience to Ludhiana Railway Station on Grand Trunk Road."
        image="/taksonzhome.avif"
      >
        <ButtonLink href={site.bookingUrl} target="_blank" rel="noopener noreferrer" variant="light" size="lg" arrow>
          Book Your Stay Online
        </ButtonLink>
      </CtaBanner>
    </>
  );
}
