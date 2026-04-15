import { InfoPageView } from "@/components/features/information/info-page-view";
import { mediaAwardsPageData } from "@/lib/data/pages/info-pages";

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
