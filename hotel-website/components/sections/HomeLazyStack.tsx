"use client";

import dynamic from "next/dynamic";
import { type ReactNode } from "react";
import useInViewOnce from "@/hooks/useInViewOnce";
import { dynamicImportWithRetry } from "@/lib/dynamicImportWithRetry";
import WelcomeSection from "./WelcomeSection";
import VisionMission from "./VisionMission";
import TestimonialContent from "./TestimonialContent";

// Already exist
const RoomsShowcase = dynamic(dynamicImportWithRetry(() => import("./RoomsShowcase"), "rooms-showcase"), {
  loading: () => <section className="min-h-[70vh] bg-[#f6f3ed]" aria-hidden="true" />,
});
const HomeEventExperiences = dynamic(
  dynamicImportWithRetry(() => import("./HomeEventExperiences"), "home-event-experiences"),
  {
  loading: () => <section className="min-h-[72vh] bg-[#1f3c44]" aria-hidden="true" />,
  },
);
const DiningShowcase = dynamic(dynamicImportWithRetry(() => import("./DiningShowcase"), "dining-showcase"), {
  loading: () => <section className="min-h-[60vh] bg-[#f3efe8]" aria-hidden="true" />,
});
const LocationOffers = dynamic(dynamicImportWithRetry(() => import("./LocationOffers"), "location-offers"), {
  loading: () => <section className="min-h-[65vh] bg-[#f6f3ed]" aria-hidden="true" />,
});

// New ones
const Facilities = dynamic(dynamicImportWithRetry(() => import("./Facilities"), "facilities"), {
  loading: () => <section className="min-h-[65vh] bg-[#f6f3ed]" aria-hidden="true" />,
});
const DestinationWedding = dynamic(dynamicImportWithRetry(() => import("./DestinationWedding"), "destination-wedding"), {
  loading: () => <section className="min-h-[65vh] bg-[#f6f3ed]" aria-hidden="true" />,
});
const WhyUksResort = dynamic(dynamicImportWithRetry(() => import("./WhyUksResort"), "why-uks"), {
  loading: () => <section className="min-h-[65vh] bg-[#f6f3ed]" aria-hidden="true" />,
});
const ValueProposition = dynamic(dynamicImportWithRetry(() => import("./ValueProposition"), "value-prop"), {
  loading: () => <section className="min-h-[65vh] bg-[#f6f3ed]" aria-hidden="true" />,
});
const TariffHome = dynamic(dynamicImportWithRetry(() => import("./TariffHome"), "tariff"), {
  loading: () => <section className="min-h-[65vh] bg-[#f6f3ed]" aria-hidden="true" />,
});
const ClientsMarquee = dynamic(dynamicImportWithRetry(() => import("./ClientsMarquee"), "clients"), {
  loading: () => <section className="min-h-[35vh] bg-[#f6f3ed]" aria-hidden="true" />,
});
const InteractiveGrid = dynamic(dynamicImportWithRetry(() => import("./InteractiveGrid"), "grid"), {
  loading: () => <section className="min-h-[35vh] bg-[#f6f3ed]" aria-hidden="true" />,
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
    <div className="bg-[#f7f3ee]">
      {/* 2. OVERVIEW / ABOUT */}
      <WelcomeSection />

      {/* 3. VISION / MISSION / VALUES */}
      <DeferredSection placeholderClassName="min-h-[70vh] bg-white" rootMargin="300px 0px">
         <VisionMission />
      </DeferredSection>

      {/* 4. FACILITIES / AMENITIES */}
      <DeferredSection placeholderClassName="min-h-[65vh] bg-[#f6f3ed]" rootMargin="280px 0px">
         <Facilities />
      </DeferredSection>

      {/* 5. EVENTS & CONFERENCE */}
      <DeferredSection placeholderClassName="min-h-[72vh] bg-[#1f3c44]" rootMargin="320px 0px">
        <HomeEventExperiences />
      </DeferredSection>

      {/* 6. ROOMS & ACCOMMODATION */}
      <DeferredSection placeholderClassName="min-h-[70vh] bg-white" rootMargin="300px 0px">
        <RoomsShowcase />
      </DeferredSection>
      
      {/* 7. DINING EXPERIENCE */}
      <DeferredSection placeholderClassName="min-h-[60vh] bg-[#f3efe8]" rootMargin="280px 0px">
        <DiningShowcase />
      </DeferredSection>

      {/* 8. DESTINATION WEDDING */}
      <DeferredSection placeholderClassName="min-h-[60vh] bg-[#f3efe8]" rootMargin="280px 0px">
        <DestinationWedding />
      </DeferredSection>

      {/* 9. ONE DAY PICNIC / ACTIVITIES */}
      <DeferredSection placeholderClassName="min-h-[60vh] bg-[#f3efe8]" rootMargin="280px 0px">
        <InteractiveGrid />
      </DeferredSection>

      {/* 10. WHY UK'S RESORT */}
      {/* <DeferredSection placeholderClassName="min-h-[65vh] bg-[#f6f3ed]" rootMargin="280px 0px">
        <WhyUksResort />
      </DeferredSection> */}

      {/* 11. VALUE PROPOSITION */}
      <DeferredSection placeholderClassName="min-h-[65vh] bg-[#f6f3ed]" rootMargin="280px 0px">
        <ValueProposition />
      </DeferredSection>

      {/* 12. TARIFF / PRICING */}
      {/* <DeferredSection placeholderClassName="min-h-[65vh] bg-[#f6f3ed]" rootMargin="280px 0px">
        <TariffHome />
      </DeferredSection> */}

      {/* 13. TOURIST ATTRACTIONS */}
      <DeferredSection placeholderClassName="min-h-[65vh] bg-[#f6f3ed]" rootMargin="280px 0px">
        <LocationOffers />
      </DeferredSection>

      {/* 14. TESTIMONIALS */}
      <DeferredSection placeholderClassName="min-h-[60vh] bg-[#f3efe8]" rootMargin="280px 0px">
        <TestimonialContent/>
      </DeferredSection>

      {/* 15. CLIENTS / BRANDS */}
      <DeferredSection placeholderClassName="min-h-[60vh] bg-[#f3efe8]" rootMargin="280px 0px">
        <ClientsMarquee />
      </DeferredSection>
      
      {/* 16. CONTACT / FOOTER (Handled implicitly by layout.tsx Footer) */}
    </div>
  );
}
