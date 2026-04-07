import type { Metadata } from "next";
import CorporateBookingPage from "../../components/sections/CorporateBookingPage";
import { corporateLandingPageContent } from "../../data/pages/bookingLandingPages";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: corporateLandingPageContent.metaTitle,
  description: corporateLandingPageContent.metaDescription,
  path: corporateLandingPageContent.path,
  image: corporateLandingPageContent.metaImage,
});

export default function CorporatePage() {
  return <CorporateBookingPage />;
}
