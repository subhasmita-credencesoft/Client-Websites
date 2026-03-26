"use client";

import { useState } from "react";
import Image from "next/image";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { GlobalPageSections } from "@/components/sections/global-page-sections";
import { weddingsPageData } from "@/lib/data/showcase-pages";

export default function WeddingsPage() {
  const [tab, setTab] = useState<"image" | "video">("image");
  const { intro, heroSlides, venueImages, weddingGallery, dreamSection, destinationSection, venuesSection, packageBanner, gallerySection, awards } =
    weddingsPageData;

  return (
    <main className="relative overflow-hidden bg-[#ececec] text-[#111317]">
      <div className="noise-overlay" />
      <SiteHeader />

      <section className="mx-auto max-w-[96rem] px-8 pb-24 pt-40" data-section-id="weddings-intro">
        <p className="text-2xl text-black/85 md:text-3xl">
          Home &gt; <span className="font-semibold">{weddingsPageData.breadcrumb}</span>
        </p>

        <div className="mt-12 max-w-[62rem]" data-reveal>
          <h1 className="text-balance text-4xl leading-tight text-[#b2863d] md:text-6xl" data-section-title>
            {intro.title}
          </h1>
          <h2 className="mt-6 text-balance text-3xl leading-tight text-[#c0924e] md:text-5xl">{intro.subtitle}</h2>
          <div className="mt-10 border-l border-black/25 pl-8 text-xl leading-relaxed text-black/95 md:text-2xl">
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-6 first:mt-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-8 py-20 text-white">
        <div className="mx-auto grid max-w-[96rem] items-center gap-10 md:grid-cols-2">
          <div data-reveal>
            <h3 className="text-4xl leading-tight text-[#c89a55] md:text-5xl" data-section-title>
              {dreamSection.title[0]}
              <br />
              {dreamSection.title[1]}
            </h3>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed md:text-2xl">{dreamSection.description}</p>
            <button
              type="button"
              className="mt-10 border border-white px-10 py-4 text-sm uppercase tracking-[0.18em]"
              data-cursor="hover"
            >
              {dreamSection.cta}
            </button>
          </div>

          <div className="relative h-[36rem] overflow-hidden" data-card>
            <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth="10">
              <Image src={heroSlides[0]} alt="Wedding couple" fill className="object-cover" sizes="50vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black px-8 py-22 text-white">
        <div className="mx-auto max-w-[96rem] text-center" data-reveal>
          <h3 className="text-4xl text-[#c89a55] md:text-5xl" data-section-title>
            {destinationSection.title}
          </h3>
          <div className="mx-auto mt-4 h-[2px] w-20 bg-[#c89a55]" />
          <p className="mx-auto mt-7 max-w-4xl text-xl leading-relaxed md:text-2xl">{destinationSection.description}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {heroSlides.map((image, index) => (
            <article key={image} className="relative h-[28rem] overflow-hidden" data-card>
              <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth={String(8 + index)}>
                <Image src={image} alt={`Wedding destination ${index + 1}`} fill className="object-cover" sizes="33vw" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-8 py-18">
        <div className="mx-auto max-w-[96rem] text-center" data-reveal>
          <h3 className="text-4xl text-[#c89a55] md:text-5xl" data-section-title>
            {venuesSection.title}
          </h3>
          <div className="mx-auto mt-4 h-[2px] w-20 bg-[#c89a55]" />
          <p className="mx-auto mt-7 max-w-4xl text-xl leading-relaxed md:text-2xl">{venuesSection.description}</p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {venueImages.map((image) => (
            <div key={image} className="relative h-[28rem] overflow-hidden" data-card>
              <div className="absolute inset-0" data-card-image>
                <Image src={image} alt="Venue gallery" fill className="object-cover" sizes="25vw" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            className="bg-black px-12 py-4 text-sm uppercase tracking-[0.18em] text-white"
            data-cursor="hover"
          >
            {venuesSection.cta}
          </button>
        </div>
      </section>

      <section className="bg-black px-8 py-8">
        <div className="mx-auto flex max-w-[96rem] items-center justify-between border border-[#c89a55] px-8 py-6 text-white">
          <p className="text-xl md:text-2xl">{packageBanner.text}</p>
          <button
            type="button"
            className="bg-[#c89a55] px-10 py-4 text-sm uppercase tracking-[0.18em] text-black"
            data-cursor="hover"
          >
            {packageBanner.cta}
          </button>
        </div>
      </section>

      <section className="px-8 py-20">
        <div className="mx-auto max-w-[96rem] text-center" data-reveal>
          <h3 className="text-4xl text-[#c89a55] md:text-5xl" data-section-title>
            {gallerySection.title}
          </h3>
          <div className="mt-8 flex justify-center gap-8 text-2xl md:text-3xl">
            <button
              type="button"
              onClick={() => setTab("image")}
              className={tab === "image" ? "border-b-2 border-[#c89a55] pb-2 text-[#0b1e48]" : "text-[#8892a6]"}
              data-cursor="hover"
            >
              {gallerySection.tabs.image}
            </button>
            <button
              type="button"
              onClick={() => setTab("video")}
              className={tab === "video" ? "border-b-2 border-[#c89a55] pb-2 text-[#0b1e48]" : "text-[#8892a6]"}
              data-cursor="hover"
            >
              {gallerySection.tabs.video}
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {(tab === "image" ? weddingGallery : heroSlides).map((image) => (
            <div key={image} className="relative h-[28rem] overflow-hidden" data-card>
              <div className="absolute inset-0" data-card-image>
                <Image src={image} alt="Wedding gallery" fill className="object-cover" sizes="50vw" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-8 pb-24 pt-8">
        <div className="mx-auto max-w-[96rem] text-center" data-reveal>
          <h3 className="text-4xl text-[#c89a55] md:text-5xl" data-section-title>
            Awards
          </h3>
        </div>
        <div className="mx-auto mt-12 grid max-w-[80rem] gap-10 md:grid-cols-2">
          {awards.map((award, index) => (
            <div key={award.title} className={index === 0 ? "border-r border-black/25 p-6 text-center" : "p-6 text-center"}>
              <div className={`mx-auto flex h-40 w-40 items-center justify-center text-5xl md:h-56 md:w-56 md:text-8xl ${award.badgeClassName}`}>
                {award.badge}
              </div>
              <p className="mt-8 text-xl leading-relaxed text-black md:text-2xl">{award.title}</p>
            </div>
          ))}
        </div>
      </section>
      <GlobalPageSections />
      <SiteFooter />
    </main>
  );
}
