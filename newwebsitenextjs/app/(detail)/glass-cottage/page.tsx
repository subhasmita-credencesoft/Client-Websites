import { notFound } from "next/navigation";
import { DetailPageView } from "@/components/features/detail/detail-page";
import { getDetailPage } from "@/lib/data/pages/site-pages";

export default function Page() {
  const page = getDetailPage("adventure-resort");

  if (!page) {
    notFound();
  }

  return <DetailPageView page={page} />;
}
