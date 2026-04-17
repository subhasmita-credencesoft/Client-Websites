import type { Metadata } from "next";
import DiningHero from "../../components/sections/DiningHero";
import DiningShowcase from "../../components/sections/DiningShowcase";
import DiningCulinaryExperience from "../../components/sections/DiningCulinaryExperience";
import DiningMoodSlider from "../../components/sections/DiningMoodSlider";
import CinematicParallaxBreak from "../../components/sections/CinematicParallaxBreak";
import ImmersiveGallery from "../../components/sections/ImmersiveGallery";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Dining",
  description:
    "Enjoy destination dining, curated menus, and memorable culinary experiences at UK's Resort, Khopoli.",
  path: "/dining",
  image: "https://bookonelocal.in/cdn/Copy of IMG_2912.avif",
});

export default function DiningPage() {
  return (
    <div className="site-page">
      <DiningHero />
      <DiningCulinaryExperience />
      <DiningMoodSlider />
      
      <CinematicParallaxBreak 
        title="Culinary Excellence" 
        subtitle="Awaken your senses at our multicuisine dining spaces. Prepared by master chefs and served against lush, deeply green backdrops, every meal is treated like a canvas." 
        image="https://bookonelocal.in/cdn/Copy of IMG_2912.avif"
        reverse={true}
      />
      
      <DiningShowcase />
      
      {/* <ImmersiveGallery title="Savor The Ambiance" /> */}
    </div>
  );
}
