import type { Metadata } from "next";
import { LandingPageView } from "@/components/features/landing/landing-page-view";
import { getLandingPage } from "@/lib/data/pages/landing-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Family Resort in Karjat",
  path: "/family-resort-karjat",
  description:
    "Find the best family resort in Karjat — The Mountain Resort offers family rooms, group dining, poolside leisure, and a safe private-estate environment for family holidays near Mumbai and Pune.",
});

export default function Page() {
  const page = getLandingPage("family-resort-karjat");
  if (!page) return null;
  return <LandingPageView page={page} />;
}
