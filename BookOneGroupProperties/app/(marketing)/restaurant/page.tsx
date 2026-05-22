import { Suspense } from "react";
import type { Metadata } from "next";
import { RestaurantPage } from "@/components/pages/restaurant-page";
import { buildPageMetadata } from "@/lib/seo";

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
