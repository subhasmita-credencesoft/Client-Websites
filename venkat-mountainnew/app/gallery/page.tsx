import { GalleryFilter } from "@/components/site/GalleryFilter";
import { HeroSection } from "@/components/site/HeroSection";
import { Section } from "@/components/site/Section";
import { galleryImages, imageCatalog } from "@/lib/site-data";

export default function GalleryPage() {
  return (
    <>
      <HeroSection
        image={imageCatalog.weddingLawn02}
        eyebrow="Gallery"
        title="The Mountain in pictures"
        subtitle="A visual look at weddings, event spaces, stay options, hospitality moments, and the overall estate atmosphere."
        specs={[
          "Wedding setups and reception styling",
          "Stay options and guest spaces",
          "Event-ready halls, lawns, and arrival moments",
        ]}
      />
      <Section
        background="light"
        sectionLabel="VISUAL STORIES"
        title="Explore the venue"
      >
        <GalleryFilter images={galleryImages} />
      </Section>
    </>
  );
}
