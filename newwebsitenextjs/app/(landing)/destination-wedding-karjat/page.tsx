import type { Metadata } from "next";
import { LandingPageView } from "@/components/features/landing/landing-page-view";
import { getLandingPage } from "@/lib/data/pages/landing-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Destination Wedding in Karjat",
  path: "/destination-wedding-karjat",
  description:
    "Plan a destination wedding in Karjat at The Mountain Resort — a 7-acre private estate with wedding lawns, mountain views, curated packages, and all-in-one celebration hosting near Mumbai and Pune.",
  keywords: ["destination wedding karjat", "wedding venue near mumbai", "karjat wedding packages", "outstation wedding maharashtra"],
});

export default function Page() {
  const page = getLandingPage("destination-wedding-karjat");
  if (!page) return null;
  return <LandingPageView page={page} />;
}
