import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Seo from '@/components/seo/Seo';
import PageHeader from '@/components/ui/PageHeader';
import Breadcrumb from '@/components/ui/Breadcrumb';
import styles from '@/styles/BlogPage.module.scss';
import { SITE } from '@/data/site';
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
  return (
    <>
      <Seo
        title="Blog — Travel Guides, Tips & Resort News"
        description="Read about Phulnakhara, Nakhara, local attractions, event planning tips and the latest news from Baibhab Resorts & Conventions."
        path="/blog"
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
          eyebrow="Blog"
          title="Stories, Guides & Updates"
          subtitle="Tips for travellers, event hosts and anyone exploring the Bhubaneswar–Cuttack corridor."
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
                        alt={post.coverImageAlt || post.title}
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
