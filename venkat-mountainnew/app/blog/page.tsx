import { HeroSection } from "@/components/site/HeroSection";
import { InfoCard } from "@/components/site/InfoCard";
import { Section } from "@/components/site/Section";
import blogPosts from "@/data/blogs";
import { imageCatalog } from "@/lib/site-data";

export default function BlogPage() {
  return (
    <>
      <HeroSection
        image={imageCatalog.weddingZone}
        eyebrow="Wedding Insights"
        title="Planning notes from The Mountain"
        subtitle="Ideas and practical guidance for destination weddings, rooming plans, venue flow, and guest experience."
      />
      <Section
        background="light"
        sectionLabel="LATEST ARTICLES"
        title="Read our latest planning insights"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <InfoCard
              key={post.slug}
              image={post.image}
              title={post.title}
              description={post.excerpt}
              href={`/blog/${post.slug}`}
              hrefLabel="Read Article"
            />
          ))}
        </div>
      </Section>
    </>
  );
}
