import type { Metadata } from "next";
import dynamic from "next/dynamic";
import PageHero from "../../components/sections/PageHero";
import CinematicParallaxBreak from "../../components/sections/CinematicParallaxBreak";
import ImmersiveGallery from "../../components/sections/ImmersiveGallery";
import { dynamicImportWithRetry } from "../../lib/dynamicImportWithRetry";
import { createPageMetadata } from "../../lib/metadata";
import { OVERVIEW_HERO_CONFIG } from "../../data/sections/pageHeroes";

export const metadata: Metadata = createPageMetadata({
  title: "Overview",
  description:
    "Discover UK's Resort — a destination estate in Karjat for scenic stays, hosted events, and memorable celebrations.",
  path: "/overview",
  image: "https://bookonelocal.in/cdn/3.png",
});

const OverviewContent = dynamic(
  dynamicImportWithRetry(
    () => import("../../components/sections/OverviewContent"),
    "overview-content",
  ),
  {
    loading: () => <div className="min-h-[60vh] bg-[#f6f2ec]" aria-hidden="true" />,
  },
);

export default function OverviewPage() {
  return (
    <div className="site-page">
      <PageHero {...OVERVIEW_HERO_CONFIG} />
      <OverviewContent />
      
      <CinematicParallaxBreak 
        title="A Legacy of Elegance" 
        subtitle="Embark on a journey through history wrapped in lush, earthy landscapes. The very essence of UK's Resort is grounded in providing a regal escape." 
        image="https://bookonelocal.in/cdn/Copy of IMG_1568.avif"
      />
      
      {/* <ImmersiveGallery title="Resort Essence" /> */}
    </div>
  );
}
