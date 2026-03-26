import { notFound } from "next/navigation";
import { DetailPageView } from "@/components/pages/detail-page";
import { getDetailPage } from "@/lib/data/site-pages";

export default function Page() {
  const page = getDetailPage("classic-package");

  if (!page) {
    notFound();
  }

  return <DetailPageView page={page} />;
}
