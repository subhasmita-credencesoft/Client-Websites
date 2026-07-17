import dynamic from "next/dynamic";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AboutIntroSection } from "@/components/features/home/sections/about-intro-section";
import { AwardsSection } from "@/components/features/shared/sections/awards-section";
import { HeroSection } from "@/components/features/home/sections/hero-section";
import { StaySection } from "@/components/features/home/sections/stay-section";
import { ReservationSection } from "@/components/features/shared/sections/reservation-section";

const OffersSection = dynamic(
  () => import("@/components/features/home/sections/offers-section").then((mod) => mod.OffersSection),
);
const MediaCoverageSection = dynamic(
  () => import("@/components/features/home/sections/media-coverage-section").then((mod) => mod.MediaCoverageSection),
);
const ParallaxGallerySection = dynamic(
  () => import("@/components/features/home/sections/parallax-gallery-section").then((mod) => mod.ParallaxGallerySection),
);
const StorytellingSection = dynamic(
  () => import("@/components/features/home/sections/storytelling-section").then((mod) => mod.StorytellingSection),
);
const ExperienceCardsSection = dynamic(
  () => import("@/components/features/home/sections/experience-cards-section").then((mod) => mod.ExperienceCardsSection),
);
const FeatureSplitSection = dynamic(
  () => import("@/components/features/home/sections/feature-split-section").then((mod) => mod.FeatureSplitSection),
);

export function MountainHomePage() {
  return (
    <main className="relative overflow-x-hidden bg-[var(--color-surface-strong)] text-white">
      <div className="noise-overlay" />
      <SiteHeader />
      <HeroSection />
      <div className="content-auto-section">
        <AboutIntroSection />
        <MediaCoverageSection />
        <StaySection />
        <ParallaxGallerySection />
        <StorytellingSection />
        <OffersSection />
        <ExperienceCardsSection />
        <FeatureSplitSection />
        <AwardsSection />
        <ReservationSection />
      </div>
      <SiteFooter />
    </main>
  );
}
