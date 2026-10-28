import type { Metadata } from "next";
import { HeroFor } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { LiveHotelGallery } from "@/components/gallery/LiveHotelGallery";
import { galleryCategories } from "@/data/gallery";
import { pages } from "@/data/pages";
import { metaFor } from "@/lib/seo/metadata";

const page = pages.gallery;
export const metadata: Metadata = metaFor(page);

export default function GalleryPage() {
  return (
    <>
      <HeroFor page={page} />
      <section className="section">
        <div className="container">
          <Breadcrumbs items={[{ label: page.title }]} />
          <div style={{ height: "2rem" }} />
          <LiveHotelGallery categories={galleryCategories} />
        </div>
      </section>
    </>
  );
}
