import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blog';
import BlogPostView from '@/features/blog/BlogPostView';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image, alt: post.imageAlt }],
    },
  };
}

export default function BlogArticlePage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();
  return <BlogPostView slug={params.slug} />;
}
