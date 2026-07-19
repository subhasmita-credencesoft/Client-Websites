import type { Metadata } from "next";
import { InfoPageView } from "@/components/features/information/info-page-view";
import { quotationPageData } from "@/lib/data/pages/info-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Get a Quotation",
  path: "/quotation",
  description:
    "Request a wedding or stay quotation for The Mountain Resort in Karjat — share your dates, guest count, and event type for a customized booking proposal.",
  keywords: ["wedding quotation karjat", "event pricing resort", "wedding cost estimate", "venue quotation maharashtra"],
});

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
