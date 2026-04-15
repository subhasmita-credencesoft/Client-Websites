import { InfoPageView } from "@/components/features/information/info-page-view";
import { rulesPageData } from "@/lib/data/pages/info-pages";

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
