import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { GlobalPageSections } from "@/components/features/shared/global-page-sections";
import { OffersPageClient } from "@/components/features/offers/offers-page-client";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Offers",
  path: "/offers",
});

export default function OffersPage() {
  return (
    <main className="relative overflow-hidden bg-[#11100e] text-[#f4ede2]">
      <div className="noise-overlay" />
      <SiteHeader />
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








