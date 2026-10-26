import type { Metadata } from "next";
import { HeroFor } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ImageGrid } from "@/components/gallery/ImageGrid";
import { galleryCategories, galleryImages } from "@/data/gallery";
import { pages } from "@/data/pages";
import { metaFor } from "@/lib/seo/metadata";

const page = pages.gallery;
export const metadata: Metadata = metaFor(page);

export default function GalleryPage() {
  // Only offer categories that actually contain images.
  const cats = galleryCategories.filter((c) => c === "All" || galleryImages.some((i) => i.category === c));
  return (
    <>
      <HeroFor page={page} />
      <section className="section">
        <div className="container">
          <Breadcrumbs items={[{ label: page.title }]} />
          <div style={{ height: "2rem" }} />
          <ImageGrid images={galleryImages} categories={cats} />
        </div>
      </section>
    </>
  );
}
