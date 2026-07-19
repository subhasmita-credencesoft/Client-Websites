import type { Metadata } from "next";
import { VenueShowcasePage } from "@/components/features/venues/venue-showcase-page";
import { weddingLawnsPageData } from "@/lib/data/pages/venue-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Wedding Lawns",
  path: "/wedding-lawns",
  description:
    "Explore spacious wedding lawns at The Mountain Resort in Karjat — private outdoor venues for destination weddings, receptions, mehendi, sangeet, and multi-day celebrations.",
  keywords: ["wedding lawns karjat", "outdoor wedding venue maharashtra", "lawn venue destination wedding", "garden wedding karjat"],
});

export default function WeddingLawnsPage() {
  return <VenueShowcasePage page={weddingLawnsPageData} />;
}
