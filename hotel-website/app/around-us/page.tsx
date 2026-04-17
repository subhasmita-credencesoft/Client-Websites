import type { Metadata } from "next";
import ContactHero from "../../components/sections/ContactHero";
import ContactAttractions from "../../components/sections/ContactAttractions";
import CinematicParallaxBreak from "../../components/sections/CinematicParallaxBreak";
import ImmersiveGallery from "../../components/sections/ImmersiveGallery";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Around Us",
  description:
    "Explore attractions, scenic escapes, and local destinations around UK's Resort in Khopoli.",
  path: "/around-us",
  image: "https://bookonelocal.in/cdn/Water-Park-1.jpg",
});

export default function AroundUsPage() {
  return (
    <div className="site-page">
      <ContactHero />
      <ContactAttractions />
      
      <CinematicParallaxBreak 
        title="Discover Khopoli" 
        subtitle="Venture out to discover cascading waterfalls, lush trailing hillsides, and the captivating heritage of Maharashtra right at our doorstep." 
        image="https://bookonelocal.in/cdn/Water-Park-1.jpg"
        reverse={true}
      />
      
      {/* <ImmersiveGallery title="Sights And Scenery" /> */}
    </div>
  );
}
