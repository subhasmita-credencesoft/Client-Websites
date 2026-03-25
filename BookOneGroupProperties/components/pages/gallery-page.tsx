import { GallerySection } from "@/components/home/GallerySection";
import { pageContent } from "@/data/pages";

export function GalleryPage() {
  const { gallery } = pageContent;

  return (
    <main className="pt-32">
      <section className="bg-secondary/10 py-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary/70">
            {gallery.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold text-primary md:text-5xl">
            {gallery.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            {gallery.description}
          </p>
        </div>
      </section>
      <GallerySection />
    </main>
  );
}
