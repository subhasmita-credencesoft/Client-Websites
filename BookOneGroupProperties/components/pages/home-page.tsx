import { Hero } from "@/components/home/Hero";
import { LocationHighlights } from "@/components/home/LocationHighlights";
import { ServicesSection } from "@/components/home/ServicesSection";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { GallerySection } from "@/components/home/GallerySection";
import { WhyTripDipCarousel } from "@/components/home/WhyTripDipCarousel";
import { PropertyOwnerCTA } from "@/components/home/PropertyOwnerCTA";

export function HomePage() {
  return (
    <>
      <Hero />
      <LocationHighlights />
      <WhyTripDipCarousel />
      <FeaturedSection />
      <PropertyOwnerCTA />
      <ServicesSection />
      <GallerySection />
    </>
  );
}

