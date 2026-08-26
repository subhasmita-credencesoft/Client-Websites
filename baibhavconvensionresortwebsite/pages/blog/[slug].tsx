import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Seo from '@/components/seo/Seo';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FaqSection from '@/components/sections/FaqSection';
import styles from '@/styles/BlogPage.module.scss';
import { BLOG_FAQS } from '@/data/faqs';
import { SITE } from '@/data/site';
import { fetchBlogsFromApi, ApiBlogPost } from '@/lib/blog-api';

interface BlogPostPageProps {
  post: ApiBlogPost;
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

const BlogPostPage: NextPage<BlogPostPageProps> = ({ post }) => {
  const canonicalUrl =
    post.seo?.canonicalUrl || `${SITE.domain}/blog/${post.slug}`;
  const coverImage = post.seo?.ogImage || post.coverImageUrl || SITE.ogImage;
  const date = formatDate(post.publishedAt);

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
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
    image: coverImage.startsWith('http') ? coverImage : `${SITE.domain}${coverImage}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  };
  if (date) jsonLd.datePublished = new Date(post.publishedAt as string).toISOString();

  return (
    <>
      <Seo
        title={post.seo?.metaTitle || post.title}
        description={post.seo?.metaDescription || post.excerpt}
        image={coverImage}
        imageAlt={post.coverImageAlt || post.title}
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
            {date && (
              <>
                <time dateTime={date}>{date}</time>
                <span>|</span>
              </>
            )}
            <span>{post.authorName || SITE.name}</span>
            {typeof post.readTime === 'number' && post.readTime > 0 && (
              <>
                <span>|</span>
                <span>{post.readTime} min read</span>
              </>
            )}
          </div>

          {post.coverImageUrl && (
            <Image
              src={post.coverImageUrl}
              alt={post.coverImageAlt || post.title}
              width={1600}
              height={1040}
              sizes="(max-width: 768px) 100vw, 760px"
              style={{ width: '100%', height: 'auto', borderRadius: 16, marginBottom: 48 }}
              priority
            />
          )}
        </div>

        <div
          className={styles.articleContent}
          data-reveal
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

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
  const posts = await fetchBlogsFromApi();
  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({ params }) => {
  const posts = await fetchBlogsFromApi();
  const post = posts.find((p) => p.slug === params?.slug);
  if (!post) return { notFound: true };
  return { props: { post } };
};

export default BlogPostPage;
