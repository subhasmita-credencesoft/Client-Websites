import type { Metadata } from "next";
import BookingLandingPage from "../../components/sections/BookingLandingPage";
import CinematicParallaxBreak from "../../components/sections/CinematicParallaxBreak";
import ImmersiveGallery from "../../components/sections/ImmersiveGallery";
import { picnicLandingPageContent } from "../../data/pages/bookingLandingPages";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: picnicLandingPageContent.metaTitle,
  description: picnicLandingPageContent.metaDescription,
  path: picnicLandingPageContent.path,
  image: picnicLandingPageContent.metaImage,
});

export default function PicnicPage() {
  return (
    <div className="site-page">
      <BookingLandingPage content={picnicLandingPageContent} />
      
      <CinematicParallaxBreak 
        title="Unwind Under The Sun" 
        subtitle="Trade the city noise for soothing rain dances, thrilling water park slides, and serene greenery. Designed specially for you to reconnect with friends and family." 
        image="https://bookonelocal.in/cdn/Copy of IMG_3980.avif"
      />
      
      {/* <ImmersiveGallery title="Picnic Vibes" /> */}
    </div>
  );
}
