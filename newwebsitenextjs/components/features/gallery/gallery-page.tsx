"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { DIRECT_BOOKING_ENGINE_URL } from "@/lib/constants/booking";
import { galleryPageData } from "@/lib/data/pages/gallery-page";

type GalleryTab = (typeof galleryPageData.tabs)[number];

export function GalleryPage() {
  const [activeTab, setActiveTab] = useState<GalleryTab>("All Images");

  const visibleItems = useMemo(() => {
    if (activeTab === "All Images") return galleryPageData.items;
    return galleryPageData.items.filter((item) => item.category === activeTab);
  }, [activeTab]);

  return (
    <main className="relative overflow-hidden bg-[#21382e] text-white">
      <div className="noise-overlay" />
      <SiteHeader />

      <section className="relative min-h-[42rem] overflow-hidden pt-28 sm:min-h-[46rem] sm:pt-32 md:min-h-[52rem] md:pt-40" data-section-id="gallery-hero">
        <div className="absolute inset-0" data-bg-parallax data-bg-depth="9">
          <Image src={galleryPageData.hero.image} alt="Gallery overview" fill className="object-cover" priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.36)_34%,rgba(0,0,0,0.7)_100%)]" />
        <div className="site-container relative z-10 flex min-h-[42rem] items-center justify-center pb-12 pt-8 text-center sm:min-h-[46rem] md:min-h-[52rem] md:pb-20">
          <div className="max-w-5xl" data-reveal>
            <p className="site-eyebrow" data-reveal-child>
              {galleryPageData.hero.eyebrow}
            </p>
            <h1 className="site-title-xl mt-5 text-balance" data-section-title>
              {galleryPageData.hero.title}
            </h1>
            <div className="mx-auto mt-5 h-[2px] w-20 bg-[#d6b07a] md:w-24" />
            <p className="site-copy-lg mx-auto mt-6 max-w-4xl text-balance" data-reveal-child>
              {galleryPageData.hero.description}
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4" data-reveal-child>
              <MagneticButton href={DIRECT_BOOKING_ENGINE_URL} variant="primary">Check Availability</MagneticButton>
              <MagneticButton href="/contact" variant="outline" className="bg-transparent">Contact The Team</MagneticButton>
            </div>
            <p className="mt-16 text-sm uppercase tracking-[0.2em] text-white/85" data-reveal-child>Discover The Story</p>
          </div>
        </div>
      </section>

      <div className="content-auto-section">
        <section className="site-container max-w-[80rem] py-12 md:py-14">
          <div className="rounded-[2.2rem] border border-[#d6b07a]/16 bg-[linear-gradient(180deg,rgba(37,60,49,0.96),rgba(26,43,35,0.96))] px-6 py-12 text-center shadow-[0_24px_60px_rgba(8,16,11,0.16)] md:px-12 md:py-16">
            <p className="text-lg text-white/80 md:text-2xl">
              <Link href="/" className="hover:text-[#d6b07a]">Home</Link> <span className="px-1">&gt;</span>{" "}
              <span className="text-[#d6b07a]">{galleryPageData.intro.breadcrumb}</span>
            </p>
            <h2 className="site-title-lg mx-auto mt-8 max-w-5xl text-balance" data-section-title>
              {galleryPageData.intro.title}
            </h2>
            <div data-reveal>
              <p className="mx-auto mt-6 max-w-5xl text-lg leading-relaxed text-white/78 md:text-xl" data-reveal-child>
                {galleryPageData.intro.description}
              </p>
            </div>
          </div>
        </section>

        <section className="site-container max-w-[80rem] pb-6">
          <div className="flex flex-wrap justify-center gap-4" data-reveal>
            {galleryPageData.tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full border px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] transition-colors ${
                  activeTab === tab
                    ? "border-[#d6b07a]/60 bg-[#31493c] text-[#f6ead8] shadow-[0_14px_30px_rgba(6,12,8,0.18)]"
                    : "border-white/12 bg-[#21382e] text-white/70 hover:border-[#d6b07a]/35 hover:bg-[#273f33] hover:text-white"
                }`}
                data-cursor="hover"
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        <section className="site-container max-w-[80rem] pb-16 pt-8 md:pb-20">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-6">
            {visibleItems.map((item, index) => (
              <article
                key={`${item.src}-${item.category}-${index}`}
                className={`group overflow-hidden rounded-[2rem] border border-white/10 bg-[#172820] shadow-[0_20px_46px_rgba(7,14,10,0.18)] transition-transform duration-500 hover:-translate-y-1 xl:col-span-2 ${
                  index % 5 === 0 ? "xl:col-span-4" : ""
                }`}
                data-card
              >
                  <div className={`relative overflow-hidden ${index % 5 === 0 ? "h-[18rem] md:h-[24rem]" : "h-[16rem] md:h-[18rem]"}`}>
                  <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth="7">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      sizes={index % 5 === 0 ? "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 66vw" : "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                </div>
                <div className="p-6 md:p-7">
                  <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[#d6b07a]">{item.category}</p>
                  <p className="mt-3 text-base leading-relaxed text-white/88 md:text-lg">{item.alt}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="site-container max-w-5xl pb-16 md:pb-20" data-reveal>
          <div className="rounded-[2.2rem] border border-[#d6b07a]/18 bg-[#182920] px-8 py-12 text-center shadow-[0_24px_60px_rgba(8,16,11,0.16)] md:px-12 md:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d6b07a]" data-reveal-child>
              Booking Intent
            </p>
            <h3 className="site-title-lg mx-auto mt-5 max-w-4xl text-balance" data-section-title>
              Seen the setting. Now choose your dates.
            </h3>
            <p className="site-copy mx-auto mt-6 max-w-3xl md:text-lg" data-reveal-child>
              Explore availability for destination weddings, wedding guest stays, and celebration weekends at The Mountain Resort in Karjat , By Redwings.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4" data-reveal-child>
              <MagneticButton href={DIRECT_BOOKING_ENGINE_URL} variant="primary">Check Availability</MagneticButton>
              <MagneticButton href="/contact" variant="outline" className="bg-transparent">Plan Your Visit</MagneticButton>
            </div>
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
