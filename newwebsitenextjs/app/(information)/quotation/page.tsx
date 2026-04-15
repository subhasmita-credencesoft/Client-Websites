import { InfoPageView } from "@/components/features/information/info-page-view";
import { quotationPageData } from "@/lib/data/pages/info-pages";

export default function QuotationPage() {
  return (
    <InfoPageView
      page={quotationPageData}
      heroEyebrow="Availability Proposal"
      primaryCtaLabel="Check Availability"
      secondaryCtaLabel="Contact The Team"
    />
  );
}
