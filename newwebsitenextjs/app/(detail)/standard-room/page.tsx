import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPageView } from "@/components/features/detail/detail-page";
import { getDetailPage } from "@/lib/data/pages/detail-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Standard Room",
  path: "/standard-room",
  description:
    "Book the Standard Room at The Mountain Resort in Karjat — a comfortable luxury stay with essential amenities for weekend getaways, family trips, and wedding guest accommodation.",
});

export default function Page() {
  const page = getDetailPage("standard-room");

  if (!page) {
    notFound();
  }

  return <DetailPageView page={page} />;
}
