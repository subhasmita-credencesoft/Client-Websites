import { notFound } from "next/navigation";

import { HeroSection } from "@/components/site/HeroSection";
import { Section } from "@/components/site/Section";
import blogPosts from "@/data/blogs";
import Container from "@/components/ui/Container";
import { formatDate } from "@/lib/format";

type BlogDetailProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogDetail({ params }: BlogDetailProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <HeroSection
        image={post.image}
        eyebrow={post.tags.join(" | ")}
        title={post.title}
        subtitle={post.excerpt}
      />
      <Section background="light">
        <Container className="max-w-3xl px-0">
          <p className="text-sm uppercase tracking-[0.22em] text-[var(--text-light)]">
            {formatDate(post.date)} | {post.author}
          </p>
          <div className="mt-8 rounded-[28px] border border-[var(--neutral-200)] bg-white p-8 shadow-[0_2px_12px_rgba(15,24,25,0.08)]">
            <p className="text-lg leading-9 text-[var(--text-secondary)]">{post.content}</p>
          </div>
        </Container>
      </Section>
    </>
  );
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}
