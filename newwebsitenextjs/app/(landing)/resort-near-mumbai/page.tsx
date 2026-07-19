import type { Metadata } from "next";
import { LandingPageView } from "@/components/features/landing/landing-page-view";
import { getLandingPage } from "@/lib/data/pages/landing-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Resort Near Mumbai",
  path: "/resort-near-mumbai",
  description:
    "Find the best resort near Mumbai for destination weddings and weekend stays — The Mountain Resort in Karjat is approx. 2 to 3 hours from Mumbai with luxury rooms, wedding venues, and curated packages.",
  keywords: ["resort near mumbai", "weekend resort near mumbai", "destination wedding near mumbai", "getaway resort maharashtra"],
});

export default function Page() {
  const page = getLandingPage("resort-near-mumbai");
  if (!page) return null;
  return <LandingPageView page={page} />;
}
