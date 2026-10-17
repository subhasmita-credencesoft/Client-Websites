import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageBanner } from '@/components/layout/PageBanner';
import { FaqSection } from '@/components/layout/FaqSection';
import { CtaSection } from '@/components/layout/CtaSection';
import { ArticleBody } from '@/components/blog/ArticleBody';
import { ArticleTableOfContents } from '@/components/blog/ArticleTableOfContents';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { SITE } from '@/data/site';
import { getCategoryName, getPostBySlug, getPublishedPosts, getRelatedPosts, postPath, formatPostDate, readingTimeMinutes } from '@/lib/blog';
import styles from './page.module.scss';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: `Article not found | ${SITE.name}` };
  }

  const image = `${SITE.url}${post.featuredImage.replace(/^\//, '')}`;

  return {
    title: { absolute: post.seoTitle },
    description: post.seoDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    robots: post.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: 'article',
      title: post.seoTitle,
      description: post.seoDescription,
      url: `/blog/${post.slug}`,
      siteName: SITE.name,
      locale: 'en_IN',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author],
      images: [{ url: post.featuredImage, width: 1200, height: 630, alt: post.featuredImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle,
      description: post.seoDescription,
      images: [image],
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleUrl = `${SITE.url}blog/${post.slug}`;
  const related = getRelatedPosts(post, 3);
  const faq = post.faq;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seoDescription,
    image: [`${SITE.url}${post.featuredImage.replace(/^\//, '')}`],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { '@type': 'Organization', name: post.author, url: SITE.url },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      logo: { '@type': 'ImageObject', url: `${SITE.url}favicon.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
    url: articleUrl,
    articleSection: getCategoryName(post.category),
    keywords: [post.primaryKeyword, ...post.secondaryKeywords].join(', '),
  };

  const publishedLabel = formatPostDate(post.publishedAt);
  const updatedLabel = post.updatedAt ? formatPostDate(post.updatedAt) : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <PageBanner
        eyebrow={getCategoryName(post.category)}
        title={post.title}
        subtitle={post.excerpt}
        breadcrumbLabel={post.title}
        path={`/blog/${post.slug}`}
        parent={{ label: 'Blog', href: '/blog' }}
        image={post.featuredImage}
      />

      <article className={styles.article}>
        <div className={styles.heroWrap}>
          <div className={styles.container}>
            <div className={styles.meta}>
              <span className={styles.metaAuthor}>By {post.author}</span>
              <span className={styles.metaDot} aria-hidden="true">
                |
              </span>
              <time dateTime={post.publishedAt}>Published {publishedLabel}</time>
              {updatedLabel && (
                <>
                  <span className={styles.metaDot} aria-hidden="true">
                    |
                  </span>
                  <time dateTime={post.updatedAt}>Updated {updatedLabel}</time>
                </>
              )}
              <span className={styles.metaDot} aria-hidden="true">
                |
              </span>
              <span>{readingTimeMinutes(post)} min read</span>
            </div>
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.layout}>
            <div className={styles.main}>
              <ArticleBody blocks={post.content} />
              <Link href="/blog" className={styles.backLink}>
                Back to all articles
              </Link>
            </div>

            <aside className={styles.aside} aria-label="Article navigation">
              <ArticleTableOfContents blocks={post.content} />
            </aside>
          </div>
        </div>
      </article>

      {faq && faq.length > 0 && (
        <FaqSection items={faq} title="Frequently asked questions" id={`faq-${post.slug}`} />
      )}

      <RelatedPosts posts={related} />

      <CtaSection
        title="Stay at Hotel K2 in Chakradharpur"
        text="Air-conditioned rooms from ₹999 a night, near Chakradharpur Railway Station, with free Wi-Fi, room service and a 24-hour front desk. Check availability for your dates."
        secondaryHref="/rooms"
        secondaryLabel="View our rooms"
      />
    </>
  );
}
