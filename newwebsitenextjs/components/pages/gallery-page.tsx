"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { galleryPageData } from "@/lib/data/gallery-page";

type GalleryTab = (typeof galleryPageData.tabs)[number];

export function GalleryPage() {
  const [activeTab, setActiveTab] = useState<GalleryTab>("All Images");

  const visibleItems = useMemo(() => {
    if (activeTab === "All Images") return galleryPageData.items;
    return galleryPageData.items.filter((item) => item.category === activeTab || activeTab === "All Facilities" && item.category === "All Facilities");
  }, [activeTab]);

  return (
    <main className="relative overflow-hidden bg-[#21382e] text-white">
      <div className="noise-overlay" />
      <SiteHeader />

      <section className="relative min-h-[108svh] overflow-hidden pt-44 md:pt-48" data-section-id="gallery-hero">
        <div className="absolute inset-0" data-bg-parallax data-bg-depth="9">
          <Image src={galleryPageData.hero.image} alt="Gallery overview" fill className="object-cover" priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.36)_34%,rgba(0,0,0,0.7)_100%)]" />
        <div className="absolute inset-x-[8%] top-28 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[108svh] max-w-[96rem] items-center justify-center px-8 pb-16 pt-8 text-center md:pb-24">
          <div className="max-w-5xl" data-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#d6b07a]" data-reveal-child>
              {galleryPageData.hero.eyebrow}
            </p>
            <h1 className="mt-5 text-balance text-[clamp(56px,7vw,112px)] leading-[0.98] text-[#f5ebda]" data-section-title>
              GALLERY
            </h1>
            <div className="mx-auto mt-5 h-[2px] w-24 bg-[#d6b07a]" />
            <p className="mx-auto mt-6 max-w-4xl text-balance text-lg leading-relaxed text-white/88 md:text-2xl" data-reveal-child>
              {galleryPageData.hero.description}
            </p>
            <p className="mt-16 text-sm uppercase tracking-[0.2em] text-white/85" data-reveal-child>Scroll To Discover</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[96rem] px-6 py-14 md:px-10">
        <div className="rounded-[2.2rem] border border-[#d6b07a]/16 bg-[linear-gradient(180deg,rgba(37,60,49,0.96),rgba(26,43,35,0.96))] px-6 py-12 text-center shadow-[0_24px_60px_rgba(8,16,11,0.16)] md:px-12 md:py-16">
          <p className="text-lg text-white/80 md:text-2xl">
            <Link href="/" className="hover:text-[#d6b07a]">Home</Link> <span className="px-1">&gt;</span>{" "}
            <span className="text-[#d6b07a]">{galleryPageData.intro.breadcrumb}</span>
          </p>
          <h2 className="mx-auto mt-8 max-w-5xl text-balance text-3xl leading-tight text-[#f6ead8] md:text-5xl" data-section-title>
          {galleryPageData.intro.title}
          </h2>
          <p className="mx-auto mt-6 max-w-5xl text-lg leading-relaxed text-white/78 md:text-xl" data-reveal>
            {galleryPageData.intro.description}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[96rem] px-6 pb-6 md:px-10">
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

      <section className="mx-auto max-w-[96rem] px-6 pb-20 pt-8 md:px-10">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-12">
          {visibleItems.map((item, index) => (
            <article
              key={`${item.src}-${item.category}-${index}`}
              className={`group overflow-hidden rounded-[2rem] border border-white/10 bg-[#172820] shadow-[0_20px_46px_rgba(7,14,10,0.18)] transition-transform duration-500 hover:-translate-y-1 xl:col-span-4 ${
                index % 5 === 0 ? "xl:col-span-8" : ""
              }`}
              data-card
            >
              <div className={`relative overflow-hidden ${index % 5 === 0 ? "h-[28rem]" : "h-[20rem]"}`}>
                <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth="7">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    sizes="(max-width: 1280px) 50vw, 33vw"
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

      <SiteFooter />
    </main>
  );
}
