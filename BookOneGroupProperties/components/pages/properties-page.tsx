import { FeaturedSection } from "@/components/home/FeaturedSection";
import { LocationHighlights } from "@/components/home/LocationHighlights";
import { pageContent } from "@/data/pages";

export function PropertiesPage() {
  const { properties } = pageContent;

  return (
    <main className="pt-32">
      <section className="bg-secondary/10 py-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary/70">
            {properties.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold text-primary md:text-5xl">
            {properties.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            {properties.description}
          </p>
        </div>
      </section>
      <LocationHighlights />
      <FeaturedSection />
    </main>
  );
}