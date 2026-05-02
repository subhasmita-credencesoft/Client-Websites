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
        subtitle="Morning arrivals, water fun through the day, a proper buffet lunch, and a slow wind-down before the drive home - the kind of outing families and groups talk about after." 
        image="https://bookonelocal.in/cdn/Copy of IMG_3980.avif"
      />
      
      {/* <ImmersiveGallery title="Picnic Vibes" /> */}
    </div>
  );
}
