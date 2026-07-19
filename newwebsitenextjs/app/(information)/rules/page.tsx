import type { Metadata } from "next";
import { InfoPageView } from "@/components/features/information/info-page-view";
import { rulesPageData } from "@/lib/data/pages/info-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Booking Terms",
  path: "/rules",
  description:
    "Review booking terms and venue guidelines for The Mountain Resort in Karjat — advance payments, check-in policies, ID requirements, and cancellation terms.",
  keywords: ["resort rules karjat", "venue policies", "wedding venue guidelines", "stay policy mountain resort"],
});

export default function RulesPage() {
  return (
    <InfoPageView
      page={rulesPageData}
      heroEyebrow="Venue Guidelines"
      primaryCtaLabel="Plan Your Wedding"
      secondaryCtaLabel="Contact The Team"
    />
  );
}
