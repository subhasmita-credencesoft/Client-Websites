import type { Metadata } from "next";
import { VenueShowcasePage } from "@/components/features/venues/venue-showcase-page";
import { mountainViewDestinationPageData } from "@/lib/data/pages/venue-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Mountain View Destination",
  path: "/mountain-view-destination",
  description:
    "Explore the mountain view destination at The Mountain Resort in Karjat — scenic lawns, panoramic backdrops, and a private estate setting for weddings and celebrations.",
});

export default function MountainViewDestinationPage() {
  return <VenueShowcasePage page={mountainViewDestinationPageData} />;
}
