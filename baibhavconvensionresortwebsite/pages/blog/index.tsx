import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Seo from '@/components/seo/Seo';
import PageHeader from '@/components/ui/PageHeader';
import Breadcrumb from '@/components/ui/Breadcrumb';
import styles from '@/styles/BlogPage.module.scss';
import { BLOG_POSTS } from '@/data/blog';
import { BlogPost } from '@/types';

interface BlogPageProps {
  posts: BlogPost[];
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32 }}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.post} data-reveal data-reveal-stagger>
              <div className={styles.postImageWrap}>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 760px"
                  className={styles.postImage}
                />
                <span className={styles.postDate}>{formatDate(post.date)}</span>
              </div>
              <div className={styles.postBody}>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <p className={styles.postDesc}>{post.description}</p>
                <span className={styles.postLink}>
                  Read more
                  <iconify-icon icon="solar:arrow-right-linear" width="16" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  return {
    props: {
      posts: BLOG_POSTS,
    },
  };
};

export default BlogIndexPage;
