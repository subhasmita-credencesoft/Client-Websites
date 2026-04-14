import dynamic from "next/dynamic";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AboutIntroSection } from "@/components/features/home/sections/about-intro-section";
import { AwardsSection } from "@/components/features/shared/sections/awards-section";
import { ExperienceCardsSection } from "@/components/features/home/sections/experience-cards-section";
import { FeatureSplitSection } from "@/components/features/home/sections/feature-split-section";
import { HeroSection } from "@/components/features/home/sections/hero-section";
import { MediaCoverageSection } from "@/components/features/home/sections/media-coverage-section";
import { ParallaxGallerySection } from "@/components/features/home/sections/parallax-gallery-section";
import { StaySection } from "@/components/features/home/sections/stay-section";
import { StorytellingSection } from "@/components/features/home/sections/storytelling-section";
import { ReservationSection } from "@/components/features/shared/sections/reservation-section";

const OffersSection = dynamic(
  () => import("@/components/features/home/sections/offers-section").then((mod) => mod.OffersSection),
);

export function MountainHomePage() {
  return (
    <main className="relative overflow-x-hidden bg-[#2d4a3e] text-white">
      <div className="noise-overlay" />
      <SiteHeader />
      <HeroSection />
      <div className="content-auto-section">
        <AboutIntroSection />
        <MediaCoverageSection />
        <StaySection />
        {/* <HorizontalJourneySection /> */}
        <ParallaxGallerySection />
        <StorytellingSection />
        <OffersSection />
        <ExperienceCardsSection />
        <FeatureSplitSection />
        {/* <PartnerLogosSection /> */}
        {/* <TownshipsSection /> */}
        <AwardsSection />
        <ReservationSection />
      </div>
      <SiteFooter />
    </main>
  );
}
