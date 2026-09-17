import { Hero } from "@/components/features/home/Hero";
import { Suspense } from "react";
import { LocationHighlights } from "@/components/features/home/LocationHighlights";
import { ServicesSection } from "@/components/features/home/ServicesSection";
import { FeaturedSection } from "@/components/features/home/FeaturedSection";
import { GallerySection } from "@/components/features/home/GallerySection";
import { WhyTripDipCarousel } from "@/components/features/home/WhyTripDipCarousel";
import { PropertyOwnerCTA } from "@/components/features/home/PropertyOwnerCTA";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homePageData } from "@/data/home";

type HomePageProps = {
  locationHighlightsData: Awaited<ReturnType<typeof import("@/lib/properties/service").getLocationHighlightsData>>;
  featuredPropertiesData: Awaited<ReturnType<typeof import("@/lib/properties/service").getFeaturedPropertiesData>>;
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
