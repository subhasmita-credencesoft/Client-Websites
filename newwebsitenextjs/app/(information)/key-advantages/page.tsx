import type { Metadata } from "next";
import { InfoPageView } from "@/components/features/information/info-page-view";
import { keyAdvantagesPageData } from "@/lib/data/pages/info-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Why Choose The Mountain",
  path: "/key-advantages",
  description:
    "Key advantages of The Mountain Resort in Karjat — private 7-acre estate, unlimited music, poolside celebrations, 5 stay types, and all-in-one destination wedding hosting.",
  keywords: ["why choose mountain resort karjat", "venue advantages", "resort benefits karjat", "best wedding venue maharashtra"],
});

export default function KeyAdvantagesPage() {
  return (
    <InfoPageView
      page={keyAdvantagesPageData}
      heroEyebrow="Signature Wedding Advantage"
      hideGlobalSections
      accentTags={["Private Estate", "Unlimited Music", "Poolside Celebrations"]}
    />
  );
}
