"use client";

import { useState } from "react";
import Image from "next/image";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { GlobalPageSections } from "@/components/sections/global-page-sections";
import { entertainmentPageData } from "@/lib/data/showcase-pages";

export default function EntertainmentPage() {
  const [tab, setTab] = useState<"gallery" | "media">("gallery");
  const { heroImage, intro, latestShowsTitle, latestShowsDescription, showCards, reservationCta, skyGarden, fullBleed, gallery, contact } =
    entertainmentPageData;

  return (
    <main className="relative overflow-hidden bg-[#ececec] text-[#0f1115]">
      <div className="noise-overlay" />
      <SiteHeader />

      <section className="relative min-h-[108svh] overflow-hidden pt-44 md:pt-48">
        <div className="absolute inset-0" data-bg-parallax data-bg-depth="8">
          <Image src={heroImage} alt="The Mountain Entertainment Hero" fill className="object-cover" priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 mx-auto flex min-h-[108svh] max-w-[96rem] items-end justify-center px-8 pb-16 md:pb-24">
          <button
            type="button"
            className="bg-white px-10 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-black transition hover:scale-[1.03]"
            data-cursor="hover"
          >
            CALL NOW
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-[96rem] px-8 py-20">
        <p className="text-[38px] text-black/90">
          Home &gt; <span className="font-semibold">{intro.breadcrumb}</span>
        </p>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <h1 className="text-balance text-[clamp(38px,5vw,88px)] leading-[1.1] text-[#4a4c51]" data-section-title>
            {intro.title}
          </h1>
          <div className="space-y-6 text-[34px] leading-[1.6] text-[#5f636b]" data-reveal>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[96rem] px-8 py-10">
        <h2 className="text-[clamp(38px,4.5vw,82px)] leading-[1.15] text-[#4a4c51]" data-section-title>
          {latestShowsTitle}
        </h2>
        <p className="mt-6 max-w-4xl text-[34px] leading-[1.6] text-[#5f636b]" data-reveal>
          {latestShowsDescription}
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {showCards.map((card) => (
            <article key={card.title} className="overflow-hidden bg-[#e6e6e6] shadow-[0_0_0_1px_rgba(0,0,0,0.06)]" data-card>
              <div className="relative h-[28rem] overflow-hidden">
                <div className="absolute inset-0" data-card-image>
                  <Image src={card.image} alt={card.title} fill className="object-cover" sizes="50vw" />
                </div>
              </div>
              <div className="px-10 py-9 text-center">
                <h3 className="text-[56px] leading-[1.2] text-[#c19452]">{card.title}</h3>
                <p className="mt-2 text-[40px] font-medium text-black">{card.subtitle}</p>
                <p className="mt-6 text-[34px] leading-[1.65] text-black/85">{card.description}</p>
                <button
                  type="button"
                  className="mt-8 bg-black px-10 py-4 text-sm uppercase tracking-[0.18em] text-white transition hover:scale-[1.03]"
                  data-cursor="hover"
                >
                  {card.cta}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-16 text-center">
        <button
          type="button"
          className="bg-black px-14 py-4 text-sm uppercase tracking-[0.22em] text-white transition hover:scale-[1.03]"
          data-cursor="hover"
        >
          {reservationCta}
        </button>
      </section>

      <section className="bg-[linear-gradient(180deg,#efefef,#e5e5e5)] px-8 py-20">
        <div className="mx-auto grid max-w-[96rem] items-center gap-8 md:grid-cols-2">
          <article className="border border-[#c8a56c] bg-white/45 px-10 py-12 backdrop-blur-sm" data-reveal>
            <h3 className="text-[72px] leading-[1.1] text-[#4a4c51]" data-section-title>
              {skyGarden.title}
            </h3>
            <p className="mt-6 text-[34px] leading-[1.65] text-[#5f636b]">{skyGarden.description}</p>
            <button
              type="button"
              className="mt-8 bg-black px-10 py-4 text-sm uppercase tracking-[0.18em] text-white transition hover:scale-[1.03]"
              data-cursor="hover"
            >
              {skyGarden.cta}
            </button>
          </article>
          <div className="relative h-[38rem] overflow-hidden" data-card>
            <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth="9">
              <Image src={skyGarden.image} alt="Sky Garden" fill className="object-cover" sizes="50vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-[74svh] overflow-hidden">
        <div className="absolute inset-0" data-bg-parallax data-bg-depth="8">
          <Image src={fullBleed.image} alt="Entertainment destination" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative z-10 mx-auto flex min-h-[74svh] max-w-[96rem] items-center justify-center px-8 text-center">
          <h2 className="max-w-5xl text-balance text-[clamp(56px,7vw,120px)] font-semibold leading-[1.08] text-white" data-section-title>
            {fullBleed.title}
          </h2>
        </div>
      </section>

      <section className="px-8 py-20">
        <div className="mx-auto max-w-[96rem] text-center">
          <h3 className="text-[clamp(56px,6vw,112px)] leading-[1.1] text-[#4a4c51]" data-section-title>
            {gallery.title}
          </h3>
          <div className="mt-10 flex items-center justify-center gap-12 text-[42px]">
            <button
              type="button"
              className={tab === "gallery" ? "border-b-2 border-[#c89a55] pb-3 font-semibold text-[#0b1e48]" : "pb-3 text-[#8b92a0]"}
              onClick={() => setTab("gallery")}
              data-cursor="hover"
            >
              {gallery.tabs.gallery}
            </button>
            <button
              type="button"
              className={tab === "media" ? "border-b-2 border-[#c89a55] pb-3 font-semibold text-[#0b1e48]" : "pb-3 text-[#8b92a0]"}
              onClick={() => setTab("media")}
              data-cursor="hover"
            >
              {gallery.tabs.media}
            </button>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-[96rem] gap-6 md:grid-cols-2">
          {(tab === "gallery" ? gallery.galleryImages : gallery.mediaImages).map((image) => (
            <div key={image} className="relative h-[30rem] overflow-hidden" data-card>
              <div className="absolute inset-0" data-card-image>
                <Image src={image} alt="Entertainment gallery" fill className="object-cover" sizes="50vw" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#33353a] px-8 py-20 text-white">
        <div className="mx-auto max-w-[96rem]">
          <h3 className="text-center text-[clamp(48px,5.5vw,96px)] leading-[1.15]" data-section-title>
            Contact & Reservation
          </h3>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {contact.map((item) => (
              <div key={item.title} className="border-l border-white/30 pl-6">
                <p className="text-[52px]">{item.title}</p>
                <p className="mt-3 whitespace-pre-line break-all text-[34px] leading-[1.5] text-[#c89a55]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <GlobalPageSections />
      <SiteFooter />
    </main>
  );
}
