import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/legal-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms And Conditions",
  description: "Booking and stay terms for reservations made with The Pune Resort.",
  path: "/terms-and-conditions",
});

export default function Page() {
  return <LegalPage pageKey="termsAndConditions" />;
}
