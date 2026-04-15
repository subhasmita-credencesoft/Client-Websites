import { InfoPageView } from "@/components/features/information/info-page-view";
import { checkInPageData } from "@/lib/data/pages/info-pages";

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
