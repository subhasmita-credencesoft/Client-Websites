import { Hero } from "@/components/home/Hero";
import { LocationHighlights } from "@/components/home/LocationHighlights";
import { ServicesSection } from "@/components/home/ServicesSection";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { GallerySection } from "@/components/home/GallerySection";
import { WhyTripDipCarousel } from "@/components/home/WhyTripDipCarousel";
import { PropertyOwnerCTA } from "@/components/home/PropertyOwnerCTA";

type HomePageProps = {
  locationHighlightsData: Awaited<ReturnType<typeof import("@/lib/hotelmate-properties").getLocationHighlightsData>>;
  featuredPropertiesData: Awaited<ReturnType<typeof import("@/lib/hotelmate-properties").getFeaturedPropertiesData>>;
};

export function HomePage({ locationHighlightsData, featuredPropertiesData }: HomePageProps) {
  const galleryImages = Object.values(locationHighlightsData.propertiesByLocation)
    .flat()
    .map((property) => property.image)
    .filter((image, index, images) => Boolean(image) && images.indexOf(image) === index);

  return (
    <>
      <Hero />
      <LocationHighlights data={locationHighlightsData} />
      <WhyTripDipCarousel />
      <FeaturedSection data={featuredPropertiesData} />
      <PropertyOwnerCTA />
      <ServicesSection />
      <GallerySection images={galleryImages} />
    </>
  );
}

