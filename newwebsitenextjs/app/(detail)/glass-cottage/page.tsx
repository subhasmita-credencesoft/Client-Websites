import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPageView } from "@/components/features/detail/detail-page";
import { getDetailPage } from "@/lib/data/pages/detail-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Glass Jacuzzi Room",
  path: "/glass-cottage",
  description:
    "Experience the Glass Jacuzzi Room at The Mountain Resort in Karjat — a premium cottage with private jacuzzi, scenic views, and luxury destination stay ambiance.",
});

export default function Page() {
  const page = getDetailPage("glass-cottage");

  if (!page) {
    notFound();
  }

  return <DetailPageView page={page} />;
}
