import type { Metadata } from "next";
import { InfoPageView } from "@/components/features/information/info-page-view";
import { checkInPageData } from "@/lib/data/pages/info-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Check-In Information",
  path: "/check-in",
  description:
    "Check-in details for The Mountain Resort in Karjat — arrival time, check-out schedule, ID requirements, and guest guidelines for a smooth destination stay experience.",
});

export default function CheckInPage() {
  return (
    <InfoPageView
      page={checkInPageData}
      heroEyebrow="Arrival Terms"
      primaryCtaLabel="Plan Your Wedding"
      secondaryCtaLabel="Contact The Team"
    />
  );
}
