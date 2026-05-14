import { Hero } from "@/components/home/Hero";
import { Suspense } from "react";
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
  return (
    <>
      <Suspense fallback={null}>
        <Hero />
      </Suspense>
      <Suspense fallback={null}>
        <LocationHighlights data={locationHighlightsData} />
      </Suspense>
      <WhyTripDipCarousel />
      <FeaturedSection data={featuredPropertiesData} />
      <PropertyOwnerCTA />
      <ServicesSection />
      <GallerySection />
    </>
  );
}

