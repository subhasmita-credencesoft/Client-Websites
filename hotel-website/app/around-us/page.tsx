import type { Metadata } from "next";
import ContactHero from "../../components/sections/ContactHero";
import ContactAttractions from "../../components/sections/ContactAttractions";
import CinematicParallaxBreak from "../../components/sections/CinematicParallaxBreak";
import ImmersiveGallery from "../../components/sections/ImmersiveGallery";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Attractions Near UK's Resort Khopoli — Imagicaa, Temples, Waterfalls & Hill Stations",
  description:
    "Explore Imagicaa, temples, waterfalls, hill stations, and local attractions around UK's Resort in Khopoli, near Mumbai & Pune.",
  path: "/around-us",
  image: "https://bookonelocal.in/cdn/Water-Park-1.jpg",
});

export default function AroundUsPage() {
  return (
    <div className="site-page">
      <ContactHero />
      <ContactAttractions />
      
      <CinematicParallaxBreak 
        title="Make UK's Resort your base" 
        subtitle="Everything above is within 30 min of UK's Resort. A temple walk in the morning, a waterfall in the afternoon, Imagica the next day - and a comfortable room and  Delicious Food  waiting for you each evening." 
        image="https://bookonelocal.in/cdn/Water-Park-1.jpg"
        reverse={true}
      />
      
      {/* <ImmersiveGallery title="Sights And Scenery" /> */}
    </div>
  );
}
