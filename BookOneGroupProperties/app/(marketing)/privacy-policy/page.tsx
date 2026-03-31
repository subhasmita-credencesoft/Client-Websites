import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/legal-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: "How The Pune Resort collects, uses, and protects guest and inquiry information.",
  path: "/privacy-policy",
});

export default function Page() {
  return <LegalPage pageKey="privacyPolicy" />;
}
