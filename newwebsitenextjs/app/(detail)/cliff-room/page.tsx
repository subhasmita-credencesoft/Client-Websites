import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPageView } from "@/components/features/detail/detail-page";
import { getDetailPage } from "@/lib/data/pages/detail-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Cliff Room",
  path: "/cliff-room",
});

export default function Page() {
  const page = getDetailPage("cliff-room");

  if (!page) {
    notFound();
  }

  return <DetailPageView page={page} />;
}
