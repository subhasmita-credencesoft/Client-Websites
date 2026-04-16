"use client";

import dynamic from "next/dynamic";
import { type ReactNode } from "react";
import useInViewOnce from "@/hooks/useInViewOnce";
import { dynamicImportWithRetry } from "@/lib/dynamicImportWithRetry";
import WelcomeSection from "./WelcomeSection";
import VisionMission from "./VisionMission";
import TestimonialContent from "./TestimonialContent";
const WellnessHero = dynamic(dynamicImportWithRetry(() => import("./WellnessHero"), "wellness-hero"), {
  loading: () => <section className="min-h-[70vh] bg-[#f6f3ed]" aria-hidden="true" />,
});
const ResortIntro = dynamic(dynamicImportWithRetry(() => import("./ResortIntro"), "resort-intro"), {
  loading: () => <section className="min-h-[65vh] bg-white" aria-hidden="true" />,
});
const RoomsShowcase = dynamic(dynamicImportWithRetry(() => import("./RoomsShowcase"), "rooms-showcase"), {
  loading: () => <section className="min-h-[70vh] bg-white" aria-hidden="true" />,
});
const HomeEventExperiences = dynamic(
  dynamicImportWithRetry(() => import("./HomeEventExperiences"), "home-event-experiences"),
  {
  loading: () => <section className="min-h-[72vh] bg-[#6d4a33]" aria-hidden="true" />,
  },
);
const DiningShowcase = dynamic(dynamicImportWithRetry(() => import("./DiningShowcase"), "dining-showcase"), {
  loading: () => <section className="min-h-[60vh] bg-[#f3efe8]" aria-hidden="true" />,
});
const LocationOffers = dynamic(dynamicImportWithRetry(() => import("./LocationOffers"), "location-offers"), {
  loading: () => <section className="min-h-[65vh] bg-[#f6f3ed]" aria-hidden="true" />,
});
const StatsBanner = dynamic(dynamicImportWithRetry(() => import("./StatsBanner"), "stats-banner"), {
  loading: () => <section className="min-h-[35vh] bg-[#1d1d1d]" aria-hidden="true" />,
});
const Testimonials = dynamic(dynamicImportWithRetry(() => import("./Testimonials"), "testimonials"), {
  loading: () => <section className="min-h-[60vh] bg-[#f3efe8]" aria-hidden="true" />,
});

type DeferredSectionProps = {
  children: ReactNode;
  placeholderClassName: string;
  rootMargin?: string;
};

function DeferredSection({
  children,
  placeholderClassName,
  rootMargin = "260px 0px",
}: DeferredSectionProps) {
  const { ref: sentinelRef, inView } = useInViewOnce<HTMLDivElement>({ rootMargin, threshold: 0.01 });

  if (inView) return <>{children}</>;

  return <div ref={sentinelRef} className={placeholderClassName} aria-hidden="true" />;
}

export default function HomeLazyStack() {
  return (
    <>
      <WelcomeSection />
      <DeferredSection placeholderClassName="min-h-[70vh] bg-[#f6f3ed]" rootMargin="260px 0px">
        <WellnessHero />
      </DeferredSection>
      <DeferredSection placeholderClassName="min-h-[65vh] bg-white" rootMargin="280px 0px">
        <ResortIntro />
      </DeferredSection>
      <DeferredSection placeholderClassName="min-h-[70vh] bg-white" rootMargin="300px 0px">
         <VisionMission />
      </DeferredSection>
      <DeferredSection placeholderClassName="min-h-[70vh] bg-white" rootMargin="300px 0px">
        <RoomsShowcase />
      </DeferredSection>
      
      <DeferredSection placeholderClassName="min-h-[72vh] bg-[#6d4a33]" rootMargin="320px 0px">
        <HomeEventExperiences />
      </DeferredSection>
      <DeferredSection placeholderClassName="min-h-[60vh] bg-[#f3efe8]" rootMargin="280px 0px">
        <DiningShowcase />
      </DeferredSection>
      <DeferredSection placeholderClassName="min-h-[65vh] bg-[#f6f3ed]" rootMargin="280px 0px">
        <LocationOffers />
      </DeferredSection>
      <DeferredSection placeholderClassName="min-h-[35vh] bg-[#1d1d1d]" rootMargin="220px 0px">
        <StatsBanner />
      </DeferredSection>
      <DeferredSection placeholderClassName="min-h-[60vh] bg-[#f3efe8]" rootMargin="280px 0px">
        {/* <Testimonials /> */}
        <TestimonialContent/>
      </DeferredSection>
    </>
  );
}
