import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPageView } from "@/components/features/detail/detail-page";
import { getDetailPage } from "@/lib/data/pages/detail-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Cliff View Room",
  path: "/cliff-room",
  description:
    "Book the Cliff View Room at The Mountain Resort in Karjat — a scenic premium stay with mountain ambience, private views, and destination luxury at ₹6,500 per night.",
});

export default function Page() {
  const page = getDetailPage("cliff-room");

  if (!page) {
    notFound();
  }

  return <DetailPageView page={page} />;
}
