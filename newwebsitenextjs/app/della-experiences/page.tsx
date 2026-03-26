"use client";

import { useState } from "react";
import Image from "next/image";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { GlobalPageSections } from "@/components/sections/global-page-sections";
import { experiencesPageData } from "@/lib/data/showcase-pages";

export default function MountainExperiencesPage() {
  const [active, setActive] = useState(0);
  const { heroSlides, intro, founderSection, experiencesIntro, experienceCards } = experiencesPageData;
  const slide = heroSlides[active];

  const goNext = () => setActive((prev) => (prev + 1) % heroSlides.length);
  const goPrev = () => setActive((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <main className="relative overflow-hidden bg-[#ececec] text-[#111317]">
      <div className="noise-overlay" />
      <SiteHeader />

      <section className="relative min-h-[108svh] overflow-hidden pt-44 md:pt-48" data-section-id="della-experiences-hero">
        <div className="absolute inset-0" data-bg-parallax data-bg-depth="9">
          <Image src={slide.image} alt="The Mountain Experiences hero" fill className="object-cover" priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-black/30" />

        <button
          type="button"
          onClick={goPrev}
          className="absolute left-4 top-1/2 z-20 grid h-16 w-16 -translate-y-1/2 place-items-center rounded-full bg-[#c79a53] text-4xl text-white"
          data-cursor="hover"
        >
          {"<"}
        </button>
        <button
          type="button"
          onClick={goNext}
          className="absolute right-4 top-1/2 z-20 grid h-16 w-16 -translate-y-1/2 place-items-center rounded-full bg-[#c79a53] text-4xl text-white"
          data-cursor="hover"
        >
          {">"}
        </button>

        <div className="relative z-10 mx-auto flex min-h-[108svh] max-w-[96rem] items-end justify-center px-8 pb-16 md:pb-24 text-center">
          <h1 className="text-[clamp(56px,7vw,122px)] font-light tracking-wide text-white" data-section-title>
            THE MOUNTAIN EXPERIENCES
          </h1>
        </div>

        <div className="absolute bottom-6 right-8 z-20 flex gap-3">
          {heroSlides.map((item, index) => (
            <button
              key={item.thumb}
              type="button"
              onClick={() => setActive(index)}
              className={`relative h-32 w-32 overflow-hidden rounded-xl border ${
                active === index ? "border-white" : "border-white/40"
              }`}
              data-cursor="hover"
            >
              <Image src={item.thumb} alt="Experiences thumbnail" fill className="object-cover" sizes="128px" />
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[96rem] px-8 py-16">
        <p className="text-[38px] text-black/90">
          Home &gt; <span className="font-semibold">{intro.breadcrumb}</span>
        </p>
        <div className="mt-10 text-center" data-reveal>
          <h2 className="text-balance text-[clamp(44px,5.6vw,96px)] leading-[1.14]" data-section-title>
            {intro.title}
          </h2>
          <div className="mx-auto mt-4 h-[2px] w-20 bg-[#c89a55]" />
          <p className="mx-auto mt-8 max-w-5xl text-[36px] leading-[1.55] text-black/85">{intro.description}</p>
        </div>

        <div className="relative mt-10 h-[34rem] overflow-hidden" data-card>
          <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth="8">
            <Image src={intro.featureImage} alt="Luxury table setup" fill className="object-cover" sizes="100vw" />
          </div>
        </div>

        <div className="mt-10 grid gap-12 md:grid-cols-2">
          <h3 className="text-[clamp(44px,4.9vw,84px)] leading-[1.2]" data-section-title>
            {intro.splitTitle}
          </h3>
          <p className="text-[35px] leading-[1.62] text-black/85" data-reveal>
            {intro.splitBody}
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-black px-8 py-18 text-white">
        <div className="absolute inset-y-0 right-0 w-full md:w-1/2" data-bg-parallax data-bg-depth="6">
          <Image src={founderSection.image} alt="Founder portrait" fill className="object-cover" sizes="50vw" />
        </div>
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black via-black/90 to-transparent" />

        <div className="relative z-10 mx-auto max-w-[96rem]">
          <div className="max-w-4xl" data-reveal>
            <h3 className="text-[clamp(42px,4.7vw,88px)] text-[#c89a55]" data-section-title>
              {founderSection.title}
            </h3>
            <div className="mt-4 h-[2px] w-20 bg-[#c89a55]" />
            <p className="mt-8 text-[64px] text-[#c89a55]">&ldquo;</p>
            {founderSection.quote.map((paragraph) => (
              <p key={paragraph} className="mt-6 text-[36px] leading-[1.6] text-[#d9b57f] first:mt-0">
                {paragraph}
              </p>
            ))}
            <p className="mt-8 text-[58px] text-white">{founderSection.author}</p>
            <p className="text-[34px] text-white/90">{founderSection.role}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[96rem] px-8 py-18 text-center">
        <p className="mx-auto max-w-6xl text-balance text-[38px] leading-[1.55] text-[#c89a55]" data-reveal>
          {experiencesIntro.lead}
        </p>
        <p className="mx-auto mt-8 max-w-6xl text-balance text-[36px] leading-[1.55] text-black/90" data-reveal>
          {experiencesIntro.body}
        </p>

        <h3 className="mt-10 text-[clamp(56px,5.7vw,100px)] leading-[1.1]" data-section-title>
          {experiencesIntro.title}
        </h3>
        <div className="mx-auto mt-3 h-[2px] w-20 bg-[#c89a55]" />

        <div className="relative mt-10">
          <button
            type="button"
            className="absolute -left-6 top-1/2 z-20 grid h-16 w-16 -translate-y-1/2 place-items-center rounded-full bg-[#d5d5d5] text-4xl text-black"
            data-cursor="hover"
          >
            {"<"}
          </button>
          <button
            type="button"
            className="absolute -right-6 top-1/2 z-20 grid h-16 w-16 -translate-y-1/2 place-items-center rounded-full bg-[#c79a53] text-4xl text-white"
            data-cursor="hover"
          >
            {">"}
          </button>

          <div className="grid gap-6 md:grid-cols-3">
            {experienceCards.map((card) => (
              <article key={card.title} className="overflow-hidden bg-[#e7e7e7]" data-card>
                <div className="relative h-[20rem] overflow-hidden">
                  <div className="absolute inset-0" data-card-image>
                    <Image src={card.image} alt={card.title} fill className="object-cover" sizes="33vw" />
                  </div>
                </div>
                <div className="px-8 py-8">
                  <h4 className="text-[52px] leading-[1.2] text-[#c89a55]">{card.title}</h4>
                  <p className="mt-4 text-[34px] leading-[1.55] text-black/90">{card.description}</p>
                  <button
                    type="button"
                    className="mt-8 bg-black px-12 py-4 text-sm uppercase tracking-[0.18em] text-white"
                    data-cursor="hover"
                  >
                    DISCOVER
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <GlobalPageSections />
      <SiteFooter />
    </main>
  );
}
