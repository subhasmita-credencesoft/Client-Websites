import { notFound } from "next/navigation";
import { DetailPageView } from "@/components/features/detail/detail-page";
import { getDetailPage } from "@/lib/data/pages/site-pages";

export default function Page() {
  const page = getDetailPage("della-enclave-villa-rooms");

  if (!page) {
    notFound();
  }

  return <DetailPageView page={page} />;
}
