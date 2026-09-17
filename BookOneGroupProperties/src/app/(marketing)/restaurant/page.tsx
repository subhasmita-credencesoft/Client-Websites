import { Suspense } from "react";
import type { Metadata } from "next";
import { RestaurantPage } from "@/components/features/restaurant/RestaurantPage";
import { buildPageMetadata } from "@/lib/site/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Restaurant & Dining",
  description:
    "Browse the full live menu for each TripDip property — from breakfast to dinner, Kokani specials to Chinese cuisine.",
  path: "/restaurant",
});

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <RestaurantPage />
    </Suspense>
  );
}
