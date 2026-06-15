import type { Metadata } from "next";
import CorporateBookingPage from "../../components/sections/CorporateBookingPage";
import CinematicParallaxBreak from "../../components/sections/CinematicParallaxBreak";
import ImmersiveGallery from "../../components/sections/ImmersiveGallery";
import { corporateLandingPageContent } from "../../data/pages/bookingLandingPages";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: corporateLandingPageContent.metaTitle,
  description: corporateLandingPageContent.metaDescription,
  path: corporateLandingPageContent.path,
  image: corporateLandingPageContent.metaImage,
});

export default function CorporatePage() {
  return (
    <div className="site-page">
      <CorporateBookingPage />
      
      {/* <CinematicParallaxBreak 
        title="Elevate Your Agenda" 
        subtitle="Trusted by teams from Mumbai and Pune for offsites, conferences, strategy meets, and training programs in one well-connected venue." 
        image="https://bookonelocal.in/cdn/3.png"
        reverse={true}
      /> */}
      
      {/* <ImmersiveGallery title="Corporate Experiences" /> */}
    </div>
  );
}
