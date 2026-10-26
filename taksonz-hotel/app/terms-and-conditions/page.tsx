import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { legal } from "@/data/legal";
import { pages } from "@/data/pages";
import { metaFor } from "@/lib/seo/metadata";

export const metadata: Metadata = metaFor(pages.terms);

export default function Page() {
  return <LegalPage page={pages.terms} sections={legal.terms} />;
}
