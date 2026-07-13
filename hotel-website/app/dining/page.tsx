import type { Metadata } from "next";
import DiningHero from "../../components/sections/DiningHero";
import DiningShowcase from "../../components/sections/DiningShowcase";
import DiningCulinaryExperience from "../../components/sections/DiningCulinaryExperience";
import DiningMoodSlider from "../../components/sections/DiningMoodSlider";
import CinematicParallaxBreak from "../../components/sections/CinematicParallaxBreak";
import ImmersiveGallery from "../../components/sections/ImmersiveGallery";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Dining at UK's Resort Khopoli — Multi-Cuisine Restaurant & Family Dining Near Mumbai",
  description:
    "Discover fresh multi-cuisine dining at UK's Resort, Khopoli with Indian, Mughlai, Chinese, and Maharashtrian favorites in relaxed indoor and outdoor settings near Mumbai.",
  path: "/dining",
  image: "https://bookonelocal.in/cdn/Copy of IMG_2912.avif",
});

export default function DiningPage() {
  return (
    <div className="site-page">
      <DiningHero />
      <DiningCulinaryExperience />
      <DiningMoodSlider />
      
      {/* <CinematicParallaxBreak 
        title="Culinary Excellence" 
        subtitle="Whether it’s a lazy lunch by the pool or a cozy dinner under the stars, every meal is prepared with fresh ingredients and local love." 
        image="https://bookonelocal.in/cdn/Copy of IMG_2912.avif"
        reverse={true}
      /> */}
      
      <DiningShowcase />
      
      {/* <ImmersiveGallery title="Savor The Ambiance" /> */}
    </div>
  );
}
