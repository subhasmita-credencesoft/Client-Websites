import { Hero } from "@/components/home/Hero";
import { Suspense } from "react";
import { LocationHighlights } from "@/components/home/LocationHighlights";
import { ServicesSection } from "@/components/home/ServicesSection";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { GallerySection } from "@/components/home/GallerySection";
import { WhyTripDipCarousel } from "@/components/home/WhyTripDipCarousel";
import { PropertyOwnerCTA } from "@/components/home/PropertyOwnerCTA";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homePageData } from "@/data/home";

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
      <div className="relative">
        <GallerySection images={homePageData.gallery.images.slice(0, 6)} />
        <div className="mt-8 text-center pb-24">
          <Link 
            href="/gallery" 
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-bold text-white transition-all hover:bg-primary/90 hover:scale-105"
          >
            View More Photos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
