import type { Metadata } from "next";
import { VenueShowcasePage } from "@/components/features/venues/venue-showcase-page";
import { weddingLawnsPageData } from "@/lib/data/pages/venue-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Wedding Lawns",
  path: "/wedding-lawns",
});

export default function WeddingLawnsPage() {
  return <VenueShowcasePage page={weddingLawnsPageData} />;
}
