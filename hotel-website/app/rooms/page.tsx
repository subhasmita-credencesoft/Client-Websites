import type { Metadata } from "next";
import RoomsHero from "../../components/sections/RoomsHero";
import RoomsGrid from "../../components/sections/RoomsGrid";
import CinematicParallaxBreak from "../../components/sections/CinematicParallaxBreak";
import ImmersiveGallery from "../../components/sections/ImmersiveGallery";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Rooms",
  description:
    "Explore rooms at UK's Resort, Khopoli with comfortable stays and thoughtful amenities.",
  path: "/rooms",
  image: "https://bookonelocal.in/cdn/3.avif",
});

export default function RoomsPage() {
  return (
    <div className="site-page">
      <RoomsHero />
      <RoomsGrid />
      
      <CinematicParallaxBreak 
        title="Sanctuaries of Comfort" 
        subtitle="Unwind in impeccably designed eco-friendly spaces combining rustic aesthetics with uncompromising luxury. Find your perfect resting place surrounded by panoramic vistas." 
        image="https://bookonelocal.in/cdn/3.png"
      />
      
      {/* <ImmersiveGallery title="A Closer Look at Luxury" /> */}
    </div>
  );
}
