import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AboutIntroSection } from "@/components/sections/about-intro-section";
import { AwardsSection } from "@/components/sections/awards-section";
import { ExperienceCardsSection } from "@/components/sections/experience-cards-section";
import { FeatureSplitSection } from "@/components/sections/feature-split-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HorizontalJourneySection } from "@/components/sections/horizontal-journey-section";
import { MediaCoverageSection } from "@/components/sections/media-coverage-section";
import { OffersSection } from "@/components/sections/offers-section";
import { ParallaxGallerySection } from "@/components/sections/parallax-gallery-section";
import { StaySection } from "@/components/sections/stay-section";
import { StorytellingSection } from "@/components/sections/storytelling-section";

export function LuxuryResortPage() {
  return (
    <main className="relative overflow-x-hidden bg-[#2d4a3e] text-white">
      <div className="noise-overlay" />
      <SiteHeader />
      <HeroSection />
      <AboutIntroSection />
      <MediaCoverageSection />
      <StaySection />
      {/* <GastronomySection /> */}
      <HorizontalJourneySection />
      <ParallaxGallerySection />
      <StorytellingSection />
      <OffersSection />
      <ExperienceCardsSection />
      <FeatureSplitSection />
      {/* <PartnerLogosSection /> */}
      {/* <TownshipsSection /> */}
      <AwardsSection />
      {/* <ReservationSection /> */}
      <SiteFooter />
    </main>
  );
}
