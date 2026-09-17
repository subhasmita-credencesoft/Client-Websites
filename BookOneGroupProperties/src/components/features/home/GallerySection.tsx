import Image from "next/image";
import { homePageData } from "@/data/home";

type GallerySectionProps = {
  images?: string[];
};

export function GallerySection({ images }: GallerySectionProps) {
  const { gallery } = homePageData;
  const galleryImages = images?.length ? images : gallery.images;

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-2">{gallery.title}</h2>
          <div className="gold-rule-center mb-6 md:mb-10" />
          <p className="text-sm text-muted-foreground mb-2">{gallery.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg aspect-[4/3] cursor-pointer">
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
