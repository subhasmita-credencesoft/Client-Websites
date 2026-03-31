import { Hero } from "@/components/home/Hero";
import { LocationHighlights } from "@/components/home/LocationHighlights";
import { ServicesSection } from "@/components/home/ServicesSection";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { GallerySection } from "@/components/home/GallerySection";
import { WhyTripDipCarousel } from "@/components/home/WhyTripDipCarousel";
import { PropertyOwnerCTA } from "@/components/home/PropertyOwnerCTA";

type HomePageProps = {
  locationHighlightsData: Awaited<ReturnType<typeof import("@/lib/hotelmate-properties").getLocationHighlightsData>>;
};

export function HomePage({ locationHighlightsData }: HomePageProps) {
  return (
    <>
      <Hero />
      <LocationHighlights data={locationHighlightsData} />
      <WhyTripDipCarousel />
      <FeaturedSection />
      <PropertyOwnerCTA />
      <ServicesSection />
      <GallerySection />
    </>
  );
}

