import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ExperiencesHero from "../../components/sections/ExperiencesHero";
import BlogFeature from "@/components/sections/BlogFeature";
import CinematicParallaxBreak from "../../components/sections/CinematicParallaxBreak";
import ImmersiveGallery from "../../components/sections/ImmersiveGallery";
import { dynamicImportWithRetry } from "../../lib/dynamicImportWithRetry";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Experiences",
  description:
    "Discover family activities, leisure experiences, and memorable moments curated at UK's Resort.",
  path: "/experiences",
  image: "https://bookonelocal.in/cdn/Copy of IMG_3980.avif",
});

const ExperiencesShowcase = dynamic(
  dynamicImportWithRetry(() => import("../../components/sections/ExperiencesShowcase"), "experiences-showcase"),
  {
  loading: () => <section className="min-h-[70vh] bg-[#f6f3ed]" aria-hidden="true" />,
  },
);
const ExperiencesExplore = dynamic(
  dynamicImportWithRetry(() => import("../../components/sections/ExperiencesExplore"), "experiences-explore"),
  {
  loading: () => <section className="min-h-[65vh] bg-[#f6f3ed]" aria-hidden="true" />,
  },
);
const WellnessSpaIntro = dynamic(
  dynamicImportWithRetry(() => import("../../components/sections/WellnessSpaIntro"), "wellness-spa-intro"),
  {
  loading: () => <section className="min-h-[70vh] bg-[#f4f1ea]" aria-hidden="true" />,
  },
);
const WellnessMoodSlider = dynamic(
  dynamicImportWithRetry(() => import("../../components/sections/WellnessMoodSlider"), "wellness-mood-slider"),
  {
  loading: () => <section className="min-h-[70vh] bg-[#1c2427]" aria-hidden="true" />,
  },
);

export default function ExperiencesPage() {
  return (
    <div className="site-page">
      <ExperiencesHero />
      <BlogFeature />
      
      <CinematicParallaxBreak 
        title="Breathtaking Vistas" 
        subtitle="Embark on activities designed to ground you in nature while elevating your pulse. Explore the boundless expanse of Khopoli's deep greens." 
        image="/picnic.avif"
        reverse={true}
      />
      
      <ExperiencesExplore />
      <WellnessSpaIntro />
      
      {/* <ImmersiveGallery title="Activities In Motion" /> */}
    </div>
  );
}

