import type { Metadata } from "next";
import { LandingPageView } from "@/components/features/landing/landing-page-view";
import { getLandingPage } from "@/lib/data/pages/landing-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Weekend Getaway in Karjat",
  path: "/weekend-getaway-karjat",
  description:
    "Plan a weekend getaway in Karjat at The Mountain Resort — mountain views, poolside leisure, curated dining, and luxury stays approx. 2 to 3 hours from Mumbai and Pune.",
  keywords: ["weekend getaway karjat", "short trip from mumbai", "2 day resort karjat", "weekend break maharashtra"],
});

export default function Page() {
  const page = getLandingPage("weekend-getaway-karjat");
  if (!page) return null;
  return <LandingPageView page={page} />;
}
