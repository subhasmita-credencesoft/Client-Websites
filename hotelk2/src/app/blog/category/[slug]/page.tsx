import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageBanner } from '@/components/layout/PageBanner';
import { CtaSection } from '@/components/layout/CtaSection';
import { BlogCard } from '@/components/blog/BlogCard';
import { SITE } from '@/data/site';
import { getCategoryBySlug } from '@/data/blog';
import { getPostsByCategory, toCardData, getCategoriesWithPosts } from '@/lib/blog';
import page from '@/components/layout/PageContent.module.scss';
import styles from '@/components/blog/ArticleBody.module.scss';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getCategoriesWithPosts().map((entry) => ({ slug: entry.category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: `Category not found | ${SITE.name}` };
  }

  return {
    title: { absolute: `${category.name} — Hotel K2 Blog | Chakradharpur` },
    description: category.description,
    alternates: { canonical: `/blog/category/${category.slug}` },
    openGraph: {
      type: 'website',
      title: `${category.name} — Hotel K2 Blog`,
      description: category.description,
      url: `/blog/category/${category.slug}`,
      siteName: SITE.name,
      images: [{ url: '/newimages/receptionmain.png', width: 1200, height: 630, alt: `${category.name} — Hotel K2 Blog` }],
    },
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  const posts = getPostsByCategory(slug);

  if (!category || posts.length === 0) {
    notFound();
  }

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} — Hotel K2 Blog`,
    description: category.description,
    url: `${SITE.url}blog/category/${category.slug}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE.url}blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      <PageBanner
        eyebrow="Blog Category"
        title={category.name}
        subtitle={category.description}
        breadcrumbLabel={category.name}
        path={`/blog/category/${category.slug}`}
        parent={{ label: 'Blog', href: '/blog' }}
      />

      <section className={`${page.band} ${page.bandAlt}`}>
        <div className={page.container}>
          <div className={styles.related}>
            {posts.map((post) => (
              <BlogCard key={post.slug} post={toCardData(post)} />
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Stay at Hotel K2 in Chakradharpur"
        text="Air-conditioned rooms from ₹999 a night, near Chakradharpur Railway Station. Check availability for your dates and book directly."
        secondaryHref="/blog"
        secondaryLabel="All articles"
      />
    </>
  );
}
