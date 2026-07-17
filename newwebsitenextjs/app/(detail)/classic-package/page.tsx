import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPageView } from "@/components/features/detail/detail-page";
import { getDetailPage } from "@/lib/data/pages/detail-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Classic Wedding Package",
  path: "/classic-package",
  description:
    "The Classic Wedding Package at The Mountain Resort in Karjat — an all-inclusive destination wedding package with stay, meals, venue access, and celebration hosting support.",
});

export default function Page() {
  const page = getDetailPage("classic-package");

  if (!page) {
    notFound();
  }

  return <DetailPageView page={page} />;
}
