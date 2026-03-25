import type { Metadata } from "next";
import { NotFoundPage } from "@/components/pages/not-found-page";
import { pageContent } from "@/data/pages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: pageContent.notFound.title,
    description: pageContent.notFound.description,
    path: "/404",
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <NotFoundPage />;
}
