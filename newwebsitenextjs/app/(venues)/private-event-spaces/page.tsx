import type { Metadata } from "next";
import { VenueShowcasePage } from "@/components/features/venues/venue-showcase-page";
import { privateEventSpacesPageData } from "@/lib/data/pages/venue-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Private Event Spaces",
  path: "/private-event-spaces",
  description:
    "Discover private event spaces at The Mountain Resort in Karjat — elegant indoor and outdoor venues for destination weddings, receptions, mehendi, sangeet, and corporate events.",
  keywords: ["private event spaces karjat", "intimate wedding venue", "corporate event space maharashtra", "private celebration hall"],
});

export default function PrivateEventSpacesPage() {
  return <VenueShowcasePage page={privateEventSpacesPageData} />;
}
