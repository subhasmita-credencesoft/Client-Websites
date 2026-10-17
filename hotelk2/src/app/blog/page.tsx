import type { Metadata } from 'next';
import Link from 'next/link';
import { PageBanner } from '@/components/layout/PageBanner';
import { CtaSection } from '@/components/layout/CtaSection';
import { BlogExplorer } from '@/components/blog/BlogExplorer';
import { SITE } from '@/data/site';
import { getAllCardData, categoryPath, getCategoriesWithPosts, getPublishedPosts } from '@/lib/blog';
import page from '@/components/layout/PageContent.module.scss';
import styles from './blog-index.module.scss';

export const metadata: Metadata = {
  title: { absolute: 'Hotel K2 Blog | Travel & Stay Guides for Chakradharpur' },
  description:
    'Guides and tips from Hotel K2 in Chakradharpur, Jharkhand — where to stay, hotels near the railway station, places to visit, room comparisons and event planning advice.',
  keywords: [
    'Hotel K2 blog',
    'Chakradharpur travel guide',
    'places to visit in Chakradharpur',
    'hotels in Chakradharpur',
    'where to stay in Chakradharpur',
    'Chakradharpur hotel tips',
  ].join(', '),
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Hotel K2 Blog | Travel & Stay Guides for Chakradharpur',
    description:
      'Practical travel and stay guides for Chakradharpur, Jharkhand from Hotel K2 — accommodation, local attractions and event planning.',
    url: '/blog',
    type: 'website',
    images: [{ url: '/newimages/receptionmain.png', width: 1200, height: 630, alt: 'Hotel K2 blog — Chakradharpur travel guides' }],
  },
};

export default function BlogIndexPage() {
  const posts = getAllCardData();
  const categories = getCategoriesWithPosts();
  const published = getPublishedPosts();

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE.name} Blog`,
    description:
      'Travel and stay guides for Chakradharpur, Jharkhand — accommodation, local attractions and event planning from Hotel K2.',
    url: `${SITE.url}blog`,
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      logo: { '@type': 'ImageObject', url: `${SITE.url}favicon.png` },
    },
    blogPost: published.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      url: `${SITE.url}blog/${post.slug}`,
      datePublished: post.publishedAt,
      ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
      image: `${SITE.url}${post.featuredImage.replace(/^\//, '')}`,
      author: { '@type': 'Organization', name: post.author },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />

      <PageBanner
        eyebrow="Blog"
        title="Hotel K2 Blog — Travel & Stay Guides for Chakradharpur"
        subtitle="Practical advice for visitors to Chakradharpur, Jharkhand — where to stay, what to see, how to get here and how to plan events, from the team at Hotel K2."
        breadcrumbLabel="Blog"
        path="/blog"
        image="/newimages/receptionmain.png"
      />

      <section className={`${page.band} ${page.bandAlt}`}>
        <div className={page.container}>
          <div className={styles.intro}>
            <div className={page.sectionHead}>
              <span className={page.kicker}>Latest Articles</span>
              <h2 className={page.heading}>Guides to help you plan your trip</h2>
              <p className={page.lead}>
                Browse our latest articles on staying in Chakradharpur, exploring West Singhbhum and
                making the most of your visit. Use the search box or category filters to find what
                you need.
              </p>
            </div>
          </div>

          <BlogExplorer posts={posts} categories={categories.map((entry) => ({ slug: entry.category.slug, name: entry.category.name }))} />
        </div>
      </section>

      <section className={page.band}>
        <div className={page.container}>
          <div className={page.sectionHead}>
            <span className={page.kicker}>Browse by Topic</span>
            <h2 className={page.heading}>Explore by category</h2>
          </div>

          <div className={styles.categoryGrid}>
            {categories.map((entry) => (
              <Link key={entry.category.slug} href={categoryPath(entry.category.slug)} className={styles.categoryTile}>
                <h3>{entry.category.name}</h3>
                <p>{entry.category.description}</p>
                <span className={styles.categoryCta}>
                  {entry.posts.length} article{entry.posts.length === 1 ? '' : 's'}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Planning a stay in Chakradharpur?"
        text="Hotel K2 offers air-conditioned rooms from ₹999 a night, near Chakradharpur Railway Station. Check availability for your dates and book directly."
        secondaryHref="/rooms"
        secondaryLabel="View our rooms"
      />
    </>
  );
}
