import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { fetchBlogsFromApi, ApiBlogPost } from '@/lib/blog-api';
import BlogPostView from '@/components/blog/BlogPostView';

interface BlogPostPageProps {
  post: ApiBlogPost;
}

const BlogPostPage: NextPage<BlogPostPageProps> = ({ post }) => {
  return <BlogPostView post={post} />;
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
