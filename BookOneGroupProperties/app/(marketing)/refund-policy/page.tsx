import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/legal-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Refund Policy",
  description: "Cancellation and refund guidance for bookings handled by My  Resort Pune .",
  path: "/refund-policy",
});

export default function Page() {
  return <LegalPage pageKey="refundPolicy" />;
}
