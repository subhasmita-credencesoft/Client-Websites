import type { Metadata } from "next";
import { LandingPageView } from "@/components/features/landing/landing-page-view";
import { getLandingPage } from "@/lib/data/pages/landing-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Luxury Resort in Karjat",
  path: "/luxury-resort-karjat",
  description:
    "Book a luxury resort in Karjat near Mumbai — The Mountain Resort offers a 7-acre private estate with mountain views, 5 room types, wedding lawns, poolside celebrations, and curated packages from Rs. 4,500 per person.",
  keywords: ["luxury resort karjat", "5 star resort maharashtra", "premium resort near mumbai", "luxury stay karjat"],
});

export default function Page() {
  const page = getLandingPage("luxury-resort-karjat");
  if (!page) return null;
  return <LandingPageView page={page} />;
}
