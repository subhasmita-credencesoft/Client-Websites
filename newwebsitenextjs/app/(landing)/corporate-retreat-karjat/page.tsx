import type { Metadata } from "next";
import { LandingPageView } from "@/components/features/landing/landing-page-view";
import { getLandingPage } from "@/lib/data/pages/landing-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Corporate Retreat in Karjat",
  path: "/corporate-retreat-karjat",
  description:
    "Host a corporate retreat in Karjat at The Mountain Resort — private estate with event spaces, group stays, curated dining, and scenic mountain surroundings for team off-sites near Mumbai.",
  keywords: ["corporate retreat karjat", "team outing resort maharashtra", "corporate event venue karjat", "company offsite resort"],
});

export default function Page() {
  const page = getLandingPage("corporate-retreat-karjat");
  if (!page) return null;
  return <LandingPageView page={page} />;
}
