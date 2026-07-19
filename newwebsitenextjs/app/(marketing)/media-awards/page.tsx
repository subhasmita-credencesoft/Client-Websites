import type { Metadata } from "next";
import { InfoPageView } from "@/components/features/information/info-page-view";
import { mediaAwardsPageData } from "@/lib/data/pages/info-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Media & Awards",
  path: "/media-awards",
  description:
    "See media features, brand presentations, and recognition for The Mountain Resort in Karjat by Redwings — a premium destination wedding and luxury stay property.",
  keywords: [
    "media features mountain resort karjat",
    "awards redwings resort",
    "wedding venue press karjat",
    "destination wedding recognition",
  ],
});

export default function MediaAwardsPage() {
  return (
    <InfoPageView
      page={mediaAwardsPageData}
      heroEyebrow="Brand Presentation"
      primaryCtaLabel="View Gallery"
      primaryCtaHref="/gallery"
      secondaryCtaLabel="Check Availability"
      extraSectionLabel="Perspective"
    />
  );
}
