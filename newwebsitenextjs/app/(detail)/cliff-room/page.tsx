import { notFound } from "next/navigation";
import { DetailPageView } from "@/components/features/detail/detail-page";
import { getDetailPage } from "@/lib/data/pages/detail-pages";

export default function Page() {
  const page = getDetailPage("cliff-room");

  if (!page) {
    notFound();
  }

  return <DetailPageView page={page} />;
}
