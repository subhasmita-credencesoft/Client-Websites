import type { Metadata } from "next";
import BookingLandingPage from "../../components/sections/BookingLandingPage";
import { picnicLandingPageContent } from "../../data/pages/bookingLandingPages";
import { createPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: picnicLandingPageContent.metaTitle,
  description: picnicLandingPageContent.metaDescription,
  path: picnicLandingPageContent.path,
  image: picnicLandingPageContent.metaImage,
});

export default function PicnicPage() {
  return <BookingLandingPage content={picnicLandingPageContent} />;
}
