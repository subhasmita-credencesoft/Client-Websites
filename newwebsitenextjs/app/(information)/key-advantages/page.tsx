import { InfoPageView } from "@/components/features/information/info-page-view";
import { keyAdvantagesPageData } from "@/lib/data/pages/info-pages";

export default function KeyAdvantagesPage() {
  return (
    <InfoPageView
      page={keyAdvantagesPageData}
      heroEyebrow="Signature Wedding Advantage"
      hideGlobalSections
      accentTags={["Private Estate", "Unlimited Music", "Poolside Celebrations"]}
    />
  );
}
