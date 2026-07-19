import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPageView } from "@/components/features/detail/detail-page";
import { getDetailPage } from "@/lib/data/pages/detail-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Bungalow",
  path: "/bungalow",
  description:
    "Reserve the Bungalow at The Mountain Resort in Karjat — a private luxury residence for wedding hosts, close family, and premium multi-day destination stays.",
  keywords: ["bungalow karjat resort", "private villa resort", "host family stay", "premium bungalow maharashtra"],
});

export default function Page() {
  const page = getDetailPage("bungalow");

  if (!page) {
    notFound();
  }

  return <DetailPageView page={page} parentBreadcrumb={{ label: "Rooms", href: "/rooms" }} />;
}
