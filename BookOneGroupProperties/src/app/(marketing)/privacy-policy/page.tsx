import type { Metadata } from "next";
import { LegalPage } from "@/components/features/legal/LegalPage";
import { buildPageMetadata } from "@/lib/site/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: "How TripDip collects, uses, and protects guest and inquiry information.",
  path: "/privacy-policy",
});

export default function Page() {
  return <LegalPage pageKey="privacyPolicy" />;
}
