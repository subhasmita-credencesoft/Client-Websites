import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPageView } from "@/components/features/detail/detail-page";
import { getDetailPage } from "@/lib/data/pages/detail-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Signature Wedding Package",
  path: "/signature-package",
  description:
    "The Signature Wedding Package at The Mountain Resort in Karjat — a premium destination wedding package with curated stays, multi-event venue access, and dedicated hosting.",
  keywords: ["signature wedding package karjat", "premium wedding package", "wedding package includes meals", "destination wedding karjat"],
});

export default function Page() {
  const page = getDetailPage("signature-package");

  if (!page) {
    notFound();
  }

  return <DetailPageView page={page} parentBreadcrumb={{ label: "Offers", href: "/offers" }} />;
}
