import type { Metadata } from "next";
import { VenueShowcasePage } from "@/components/features/venues/venue-showcase-page";
import { poolsideCelebrationsPageData } from "@/lib/data/pages/venue-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Poolside Celebrations",
  path: "/poolside-celebrations",
  description:
    "Host poolside celebrations at The Mountain Resort in Karjat — 24x7 pool access, cocktail events, leisure gatherings, and scenic outdoor party settings at a private estate.",
});

export default function PoolsideCelebrationsPage() {
  return <VenueShowcasePage page={poolsideCelebrationsPageData} />;
}
