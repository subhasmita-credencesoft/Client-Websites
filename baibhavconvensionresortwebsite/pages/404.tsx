import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import Seo from '@/components/seo/Seo';
import styles from '@/styles/ErrorPage.module.scss';
import BlogPostView from '@/components/blog/BlogPostView';
import {
  PUBLIC_BLOG_API_URL,
  normalizeBlog,
  ApiBlogPost,
  RawBlogItem,
} from '@/lib/blog-api';

const NotFoundPage: NextPage = () => {
  const [resolvedPost, setResolvedPost] = useState<ApiBlogPost | null>(null);
  const [isLoadingBlog, setIsLoadingBlog] = useState(false);

  // Dynamic resilience: if a visitor accesses a newly published blog post
  // whose static HTML file hasn't been re-exported yet, fetch it live
  // from the BookOne LMS API and render it seamlessly instead of showing 404.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const pathname = window.location.pathname;
    const match = pathname.match(/^\/blog\/([^/?#]+)/);
    if (!match || !match[1]) return;

    const slug = match[1].replace(/\.html$/, '').trim();
    if (!slug) return;

    setIsLoadingBlog(true);

    fetch(PUBLIC_BLOG_API_URL, {
      headers: { Accept: 'application/json' },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        const items = json?.data?.items;
        if (Array.isArray(items)) {
          const found = items.find((item: RawBlogItem) => item.slug === slug);
          if (found) {
            const normalized = normalizeBlog(found);
            if (normalized) {
              setResolvedPost(normalized);
              setIsLoadingBlog(false);
              return;
            }
          }
        }
        setIsLoadingBlog(false);
      })
      .catch(() => {
        setIsLoadingBlog(false);
      });
  }, []);

  if (resolvedPost) {
    return <BlogPostView post={resolvedPost} />;
  }

  if (isLoadingBlog) {
    return (
      <>
        <Seo
          title="Loading Story..."
          description="Loading article from Baibhab Resorts & Conventions."
          path="/404"
          noIndex
        />
        <div className="container" style={{ paddingTop: 140, paddingBottom: 140, textAlign: 'center' }}>
          <p style={{ color: '#a3a3a3', fontSize: '1.1rem' }}>Loading article from Baibhab Resorts...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Seo
        title="Page Not Found"
        description="The page you are looking for could not be found at Baibhab Resorts & Conventions. Browse rooms, weddings and events on the Bhubaneswar–Cuttack corridor."
        path="/404"
        noIndex
      />
      <div className="container">
        <div className={styles.wrap} data-reveal>
          <p className={styles.code} aria-hidden="true">
            404
          </p>
          <h1 className={styles.title}>Page not found</h1>
          <p className={styles.text}>
            The page you&apos;re looking for doesn&apos;t exist, may have been moved, or the link is broken. Let&apos;s
            get you back to something useful.
          </p>
          <div className={styles.actions}>
            <Link href="/" className="btn btn-primary">
              Back to Home
            </Link>
            <Link href="/stay" className="btn btn-outline">
              Explore Stay
            </Link>
            <Link href="/events" className="btn btn-outline">
              Weddings &amp; Events
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
