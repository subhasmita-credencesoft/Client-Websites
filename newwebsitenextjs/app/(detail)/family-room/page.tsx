import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPageView } from "@/components/features/detail/detail-page";
import { getDetailPage } from "@/lib/data/pages/detail-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Family Room",
  path: "/family-room",
  description:
    "Stay in the Family Room at The Mountain Resort in Karjat — spacious accommodation designed for families, wedding guest groups, and multi-day destination celebrations.",
  keywords: ["family room karjat", "group stay resort", "family accommodation wedding", "spacious room karjat"],
});

export default function Page() {
  const page = getDetailPage("family-room");

  if (!page) {
    notFound();
  }

  return <DetailPageView page={page} parentBreadcrumb={{ label: "Rooms", href: "/rooms" }} />;
}
