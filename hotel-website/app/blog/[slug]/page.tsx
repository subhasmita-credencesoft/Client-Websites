import { notFound } from "next/navigation";
import blogPosts from "../../../data/blogs";
import Container from "../../../components/ui/Container";
import { formatDate } from "../../../lib/format";

type BlogDetailProps = {
  params: { slug: string };
};

export default function BlogDetail({ params }: BlogDetailProps) {
  const post = blogPosts.find((item) => item.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="py-16">
      <Container className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] text-ink/50">
          {formatDate(post.date)} � {post.author}
        </p>
        <h1 className="mt-4 font-serif text-4xl">{post.title}</h1>
        <div
          className="mt-8 h-64 rounded-3xl bg-sand"
          style={{
            backgroundImage: `url(${post.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <p className="mt-8 text-base leading-7 text-ink/70">{post.content}</p>
      </Container>
    </section>
  );
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}
