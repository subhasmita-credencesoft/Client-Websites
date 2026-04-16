import type { Metadata } from "next";
import dynamic from "next/dynamic";
import PageHero from "../../components/sections/PageHero";
import { dynamicImportWithRetry } from "../../lib/dynamicImportWithRetry";
import { createPageMetadata } from "../../lib/metadata";
import { OVERVIEW_HERO_CONFIG } from "../../data/sections/pageHeroes";

export const metadata: Metadata = createPageMetadata({
  title: "Overview",
  description:
    "Discover UK's Resort — a destination estate in Karjat for scenic stays, hosted events, and memorable celebrations.",
  path: "/overview",
  image: "https://bookonelocal.in/cdn/3.png",
});

const OverviewContent = dynamic(
  dynamicImportWithRetry(
    () => import("../../components/sections/OverviewContent"),
    "overview-content",
  ),
  {
    loading: () => <div className="min-h-[60vh] bg-[#f6f2ec]" aria-hidden="true" />,
  },
);

export default function OverviewPage() {
  return (
    <div className="site-page">
      <PageHero {...OVERVIEW_HERO_CONFIG} />
      <OverviewContent />
    </div>
  );
}
