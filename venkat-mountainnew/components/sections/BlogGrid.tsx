import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import BlogCard from "../features/BlogCard";
import blogPosts from "../../data/blogs";

type BlogGridProps = {
  title?: string;
  subtitle?: string;
};

export default function BlogGrid({
  title = "Stories from the resort journal.",
  subtitle = "Seasonal menus, travel notes, and itineraries for mindful escapes.",
}: BlogGridProps) {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading eyebrow="Journal" title={title} subtitle={subtitle} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}
