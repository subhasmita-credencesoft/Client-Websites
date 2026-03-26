import { Suspense } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { GlobalPageSections } from "@/components/sections/global-page-sections";
import { OffersPageClient } from "@/components/pages/offers-page-client";

export default function OffersPage() {
  return (
    <main className="relative overflow-hidden bg-[#ececec] text-[#111317]">
      <div className="noise-overlay" />
      <SiteHeader />
      <Suspense
        fallback={
          <section className="mx-auto max-w-[96rem] px-8 py-20 text-center text-white/70">
            Loading offers...
          </section>
        }
      >
        <OffersPageClient />
      </Suspense>
      <GlobalPageSections />
      <SiteFooter />
    </main>
  );
}








