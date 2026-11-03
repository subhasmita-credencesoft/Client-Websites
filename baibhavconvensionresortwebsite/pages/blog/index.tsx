import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Seo from '@/components/seo/Seo';
import PageHeader from '@/components/ui/PageHeader';
import Breadcrumb from '@/components/ui/Breadcrumb';
import styles from '@/styles/BlogPage.module.scss';
import { SITE } from '@/data/site';
import { createBreadcrumbSchema } from '@/lib/schema';
import { fetchBlogsFromApi, ApiBlogPost } from '@/lib/blog-api';

interface BlogPageProps {
  posts: ApiBlogPost[];
}

function formatDate(dateStr?: string | null): string | null {
  if (!dateStr) return null;
  const parsed = Date.parse(dateStr);
  if (Number.isNaN(parsed)) return null;
  return new Date(parsed).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

const BlogIndexPage: NextPage<BlogPageProps> = ({ posts }) => {
  const jsonLd = [
    createBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog' },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: `${SITE.name} Blog`,
      url: `${SITE.domain}/blog`,
      description: 'Stories, guides, travel tips, and event planning advice on the Bhubaneswar–Cuttack corridor.',
      publisher: {
        '@type': 'Organization',
        name: SITE.name,
        url: SITE.domain,
      },
      blogPost: posts.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        url: `${SITE.domain}/blog/${post.slug}`,
        description: post.excerpt,
        image: post.coverImageUrl || `${SITE.domain}${SITE.ogImage}`,
        datePublished: post.publishedAt || undefined,
      })),
    },
  ];

  return (
    <>
      <Seo
        title="Resort Blog — Travel Guides, Event Tips & Local Updates"
        description="Read articles on travel, local sights around Phulnakhara and Nakhara, medical stays near SUM Hospital 2, wedding planning tips, and corporate retreats from Baibhab Resorts."
        path="/blog"
        keywords="resort blog bhubaneswar, travel guides odisha, wedding planning tips phulnakhara, hotels near sum hospital blog, event guides nh16"
        jsonLd={jsonLd}
      />
      <div className="container" style={{ paddingTop: 96 }}>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog' },
          ]}
        />
      </div>

      <div className="container">
        <PageHeader
          eyebrow="Resort Blog & Guides"
          title="Stories, Guides & Updates"
          subtitle="Insightful tips for travellers, event hosts, and anyone exploring the Bhubaneswar–Cuttack corridor."
        />
      </div>

      <div className="container" style={{ marginTop: 48, marginBottom: 96 }}>
        {posts.length === 0 ? (
          <p style={{ textAlign: 'center' }}>New stories are on their way. Check back soon.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32 }}>
            {posts.map((post) => {
              const date = formatDate(post.publishedAt);
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.post} data-reveal data-reveal-stagger>
                  <div className={styles.postImageWrap}>
                    {post.coverImageUrl && (
                      <Image
                        src={post.coverImageUrl}
                        alt={post.coverImageAlt || `${post.title} - Baibhab Resorts Blog`}
                        width={1600}
                        height={1040}
                        sizes="(max-width: 768px) 100vw, 760px"
                        className={styles.postImage}
                      />
                    )}
                    {date && <span className={styles.postDate}>{date}</span>}
                  </div>
                  <div className={styles.postBody}>
                    <h2 className={styles.postTitle}>{post.title}</h2>
                    <p className={styles.postDesc}>{post.excerpt}</p>
                    <span className={styles.postLink}>
                      Read more
                      <iconify-icon icon="solar:arrow-right-linear" width="16" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Cross-Link Banner */}
        <div style={{
          marginTop: 64,
          backgroundColor: '#161616',
          border: '1px solid #282828',
          borderRadius: 16,
          padding: '32px',
          textAlign: 'center',
        }}>
          <h3 style={{ fontSize: '1.25rem', color: '#f5f5f5', marginBottom: 8 }}>
            Planning a Visit to Baibhab Resorts?
          </h3>
          <p style={{ color: '#a3a3a3', maxWidth: 540, margin: '0 auto 20px', fontSize: '0.95rem' }}>
            Explore our rooms, banquet venues, and restaurant on the Bhubaneswar–Cuttack corridor.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/stay" className="btn btn-primary">
              Book a Room
            </Link>
            <Link href="/events/weddings" className="btn btn-outline">
              Wedding Venues
            </Link>
            <Link href="/location" className="btn btn-outline">
              Location & Directions
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  const posts = await fetchBlogsFromApi();
  return {
    props: {
      posts,
    },
  };
};

export default BlogIndexPage;
