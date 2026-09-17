import type { Metadata } from "next";
import { LegalPage } from "@/components/features/legal/LegalPage";
import { buildPageMetadata } from "@/lib/site/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms And Conditions",
  description: "Booking and stay terms for reservations made with Tripdip.",
  path: "/terms-and-conditions",
});

export default function Page() {
  return <LegalPage pageKey="termsAndConditions" />;
}
