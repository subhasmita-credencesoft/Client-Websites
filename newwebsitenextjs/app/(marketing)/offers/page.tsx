import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { GlobalPageSections } from "@/components/features/shared/global-page-sections";
import { OffersPageClient } from "@/components/features/offers/offers-page-client";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Offers",
  path: "/offers",
  description:
    "Explore wedding packages, luxury stay deals, and curated destination celebration offers at The Mountain Resort in Karjat by Redwings with transparent pricing and booking terms.",
  keywords: [
    "wedding packages karjat",
    "resort offers karjat",
    "stay deals mountain resort",
    "destination wedding packages pricing",
    "luxury stay offers maharashtra",
  ],
});

export default function OffersPage() {
  return (
    <main className="relative overflow-hidden bg-[var(--section-dark)] text-[var(--color-text-primary)]">
      <div className="noise-overlay" />
      <SiteHeader />
      <div className="mx-auto max-w-[80rem] px-4 pt-28 md:px-8 md:pt-36">
        <Breadcrumbs items={[{ label: "Offers" }]} />
      </div>
      <Suspense
        fallback={
          <section className="site-container max-w-[96rem] py-20 text-center text-white/70">
            Loading offers...
          </section>
        }
      >
        <OffersPageClient />
      </Suspense>
      <GlobalPageSections hideContactAndStay hideReservation />
      <SiteFooter />
    </main>
  );
}








