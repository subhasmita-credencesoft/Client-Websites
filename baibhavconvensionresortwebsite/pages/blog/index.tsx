import { useState, useEffect } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Seo from '@/components/seo/Seo';
import PageHeader from '@/components/ui/PageHeader';
import Breadcrumb from '@/components/ui/Breadcrumb';
import styles from '@/styles/BlogPage.module.scss';
import { SITE } from '@/data/site';
import { createBreadcrumbSchema } from '@/lib/schema';
import {
  fetchBlogsFromApi,
  normalizeBlog,
  PUBLIC_BLOG_API_URL,
  ApiBlogPost,
  RawBlogItem,
} from '@/lib/blog-api';

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

const BlogIndexPage: NextPage<BlogPageProps> = ({ posts: initialPosts }) => {
  const [posts, setPosts] = useState<ApiBlogPost[]>(initialPosts);

  // Client-side live revalidation: guarantees newly posted blogs in BookOne
  // appear immediately to visitors without waiting for a rebuild or restart.
  useEffect(() => {
    let isMounted = true;

    async function loadFreshBlogs() {
      try {
        const res = await fetch(PUBLIC_BLOG_API_URL, {
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) return;

        const json = await res.json();
        const items = json?.data?.items;
        if (!Array.isArray(items)) return;

        const fresh = items
          .map((item: RawBlogItem) => normalizeBlog(item))
          .filter((post): post is ApiBlogPost => post !== null)
          .sort((a, b) => {
            const aTime = a.publishedAt ? Date.parse(a.publishedAt) : 0;
            const bTime = b.publishedAt ? Date.parse(b.publishedAt) : 0;
            if (bTime !== aTime) return bTime - aTime;
            return b.id - a.id;
          });

        if (isMounted && fresh.length > 0) {
          setPosts(fresh);
        }
      } catch {
        // Fall back gracefully to pre-rendered initialPosts
      }
    }

    loadFreshBlogs();

    return () => {
      isMounted = false;
    };
  }, []);

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
          backgroundColor: '#ffffff',
          border: '1px solid #e7e7e7',
          borderRadius: 16,
          padding: '40px 32px',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
        }}>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 500, color: '#111111', marginBottom: 8 }}>
            Planning a Visit to Baibhab Resorts?
          </h3>
          <p style={{ color: '#6b7280', maxWidth: 540, margin: '0 auto 24px', fontSize: '0.95rem', lineHeight: 1.6 }}>
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
