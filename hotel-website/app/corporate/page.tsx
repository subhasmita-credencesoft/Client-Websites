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
      
      <CinematicParallaxBreak 
        title="Elevate Your Agenda" 
        subtitle="Step away from the boardroom and into inspiration. With cutting-edge facilities surrounded by lush natural reserves, your offsites become catalysts for exceptional teamwork." 
        image="https://bookonelocal.in/cdn/3.png"
        reverse={true}
      />
      
      {/* <ImmersiveGallery title="Corporate Experiences" /> */}
    </div>
  );
}
