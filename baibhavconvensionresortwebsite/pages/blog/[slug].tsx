import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Seo from '@/components/seo/Seo';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FaqSection from '@/components/sections/FaqSection';
import styles from '@/styles/BlogPage.module.scss';
import { BLOG_POSTS, BLOG_FAQS } from '@/data/blog';
import { SITE } from '@/data/site';
import { BlogPost } from '@/types';

interface BlogPostPageProps {
  post: BlogPost;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

const BlogPostPage: NextPage<BlogPostPageProps> = ({ post }) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.domain,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.domain,
    },
    image: `${SITE.domain}${post.image}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE.domain}/blog/${post.slug}`,
    },
  };

  return (
    <>
      <Seo
        title={post.title}
        description={post.description}
        path={`/blog/${post.slug}`}
        type="article"
        jsonLd={jsonLd}
      />
      <div className="container" style={{ paddingTop: 96 }}>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: post.title },
          ]}
        />
      </div>

      <article className={`${styles.article} container`} style={{ marginTop: 32, marginBottom: 96 }}>
        <div data-reveal>
          <h1 className="h2" style={{ marginBottom: 16 }}>{post.title}</h1>
          <div className={styles.articleMeta}>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>|</span>
            <span>{SITE.name}</span>
          </div>

          <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: 16, overflow: 'hidden', marginBottom: 48 }}>
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 760px"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>

        <div className={styles.articleContent} data-reveal>
          {post.content.map((section, i) => (
            <div key={i} className={styles.articleSection}>
              {section.heading && <h2 className={styles.articleHeading}>{section.heading}</h2>}
              {section.body && <p className={styles.articleBody}>{section.body}</p>}
              {section.list && (
                <ul className={styles.articleList}>
                  {section.list.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className={styles.ctaRow} style={{ marginTop: 48 }} data-reveal>
          <a
            href={SITE.bookingEngine}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Book a Room
          </a>
          <Link href="/contact?inquiry=Banquets+%2F+Events" className="btn btn-outline">
            Send an Event Inquiry
          </Link>
        </div>
      </article>

      <FaqSection
        items={BLOG_FAQS}
        eyebrow="FAQs"
        title="Frequently Asked Questions"
        subtitle="Quick answers about Baibhab Resorts near Phulnakhara and Nakhara."
      />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: BLOG_POSTS.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({ params }) => {
  const post = BLOG_POSTS.find((p) => p.slug === params?.slug);
  if (!post) return { notFound: true };
  return { props: { post } };
};

export default BlogPostPage;
