import type { Metadata } from "next";
import { NotFoundPage } from "@/components/features/not-found/NotFoundPage";
import { pageContent } from "@/data/pages";
import { buildPageMetadata } from "@/lib/site/seo";

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
