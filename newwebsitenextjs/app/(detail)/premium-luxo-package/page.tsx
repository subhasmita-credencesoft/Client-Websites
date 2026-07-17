import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPageView } from "@/components/features/detail/detail-page";
import { getDetailPage } from "@/lib/data/pages/detail-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Premium Luxo Wedding Package",
  path: "/premium-luxo-package",
  description:
    "The Premium Luxo Wedding Package at The Mountain Resort in Karjat — a luxury-tier destination wedding experience with premium stays, curated meals, and exclusive venue access.",
});

export default function Page() {
  const page = getDetailPage("premium-luxo-package");

  if (!page) {
    notFound();
  }

  return <DetailPageView page={page} />;
}
