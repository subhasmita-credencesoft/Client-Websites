"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import type { MountainVenuePageData } from "@/lib/data/pages/mountain-venue-pages";

type MountainVenueShowcasePageProps = {
  page: MountainVenuePageData;
};

export function MountainVenueShowcasePage({ page }: MountainVenueShowcasePageProps) {
  const [activeHeroImage, setActiveHeroImage] = useState(0);
  const bookingHref = `/booking?page=${encodeURIComponent(page.hero.title)}&offer=${encodeURIComponent(page.hero.title)}`;

  const heroImages = useMemo(
    () =>
      Array.from(
        new Set([
          page.hero.image,
          ...page.gallery.images.slice(0, 2).map((image) => image.src),
          ...page.cards.slice(0, 2).map((card) => card.image),
        ]),
      ).slice(0, 4),
    [page],
  );

  useEffect(() => {
    if (heroImages.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveHeroImage((current) => (current + 1) % heroImages.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [heroImages.length]);

  return (
    <main className="relative overflow-hidden bg-[#f3efe7] text-[#111317]">
      <div className="noise-overlay" />
      <SiteHeader />

      <section className="relative min-h-[100svh] overflow-hidden" data-section-id={`${page.slug}-hero`}>
        {heroImages.map((image, index) => (
          <div
            key={`${page.slug}-${image}`}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ${
              index === activeHeroImage ? "opacity-100" : "opacity-0"
            }`}
            data-bg-parallax
            data-bg-depth={String(10 + index)}
          >
            <Image src={image} alt={page.hero.title} fill className="object-cover" sizes="100vw" priority={index === 0} />
          </div>
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,12,0.22)_0%,rgba(8,10,12,0.34)_42%,rgba(8,10,12,0.82)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,rgba(8,10,12,0)_0%,rgba(8,10,12,0.74)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[96rem] items-end px-8 pb-16 pt-36 md:px-10 md:pb-20">
          <div className="max-w-5xl" data-reveal>
            <p data-reveal-child className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
              {page.intro.eyebrow}
            </p>
            <h1 className="mt-6 max-w-5xl text-balance text-4xl leading-tight text-white md:text-6xl" data-section-title>
              {page.hero.title}
            </h1>
            <p data-reveal-child className="mt-6 max-w-4xl text-balance text-xl leading-relaxed text-white/90 md:text-2xl">
              {page.hero.subtitle}
            </p>
            <div data-reveal-child className="mt-8 flex gap-3">
              {heroImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  aria-label={`Show venue hero image ${index + 1}`}
                  onClick={() => setActiveHeroImage(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === activeHeroImage ? "w-14 bg-[#d7ae71]" : "w-7 bg-white/35"
                  }`}
                  data-cursor="hover"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[96rem] px-8 pb-24 pt-40" data-section-id={`${page.slug}-intro`}>
        <nav aria-label="Breadcrumb" className="flex items-center">
          <ol className="inline-flex items-center gap-3 rounded-full border border-[#c89a55]/20 bg-white/55 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#263129] backdrop-blur-sm md:text-xs">
            <li>
              <Link href="/" className="transition-colors hover:text-[#b88948]">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-[#b88948]">
              /
            </li>
            <li className="text-[#b88948]">{page.hero.title}</li>
          </ol>
        </nav>

        <div className="mt-12 max-w-[62rem]" data-reveal>
          <h2 className="text-balance text-4xl leading-tight text-[#b2863d] md:text-6xl" data-section-title>
            {page.intro.title}
          </h2>
          <div className="mt-10 border-l border-black/25 pl-8 text-xl leading-relaxed text-black/95 md:text-2xl">
            <p data-reveal-child>{page.intro.body}</p>
            <p data-reveal-child className="mt-6">
              Explore the venue through cinematic highlights, scenic imagery, and destination-led storytelling designed to match the premium
              wedding journey across the site.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-black px-8 py-20 text-white" data-feature-stage data-section-id={`${page.slug}-plan`}>
        <div className="mx-auto grid max-w-[96rem] items-center gap-10 md:grid-cols-2">
          <div data-feature-content data-reveal>
            <p data-reveal-child className="text-xs uppercase tracking-[0.28em] text-[#d7ae71]">
              Signature Venue Story
            </p>
            <h3 className="mt-4 text-4xl leading-tight text-[#c89a55] md:text-5xl" data-section-title>
              Designed for premium destination celebrations
            </h3>
            <p data-reveal-child className="mt-8 max-w-2xl text-xl leading-relaxed text-white/90 md:text-2xl">
              {page.summary.body}
            </p>
            <Link
              href={bookingHref}
              className="mt-10 inline-flex items-center justify-center border border-white px-10 py-4 text-sm uppercase tracking-[0.18em]"
              data-cursor="hover"
            >
              Enquire Now
            </Link>
          </div>

          <div className="relative h-[36rem] overflow-hidden" data-card>
            <div className="absolute inset-0" data-feature-image data-card-image data-bg-parallax data-bg-depth="9">
              <Image src={page.gallery.images[0]?.src ?? page.hero.image} alt={page.gallery.images[0]?.alt ?? page.hero.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black px-8 py-22 text-white" data-section-id={`${page.slug}-highlights`}>
        <div className="mx-auto max-w-[96rem] text-center" data-reveal>
          <h3 className="text-4xl text-[#c89a55] md:text-5xl" data-section-title>
            {page.highlights.title}
          </h3>
          <div className="mx-auto mt-4 h-[2px] w-20 bg-[#c89a55]" />
          <p data-reveal-child className="mx-auto mt-7 max-w-4xl text-xl leading-relaxed text-white/90 md:text-2xl">
            {page.hero.subtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {page.cards.map((card, index) => (
            <article key={card.title} className="overflow-hidden bg-[#0f0f0f]" data-card>
              <div className="relative h-[24rem] overflow-hidden">
                <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth={String(8 + index)}>
                  <Image src={card.image} alt={card.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                </div>
              </div>
              <div className="px-6 py-7 md:px-8 md:py-8">
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">0{index + 1}</p>
                <h4 className="mt-3 text-2xl text-[#d7ae71] md:text-3xl">{card.title}</h4>
                <p className="mt-4 text-base leading-relaxed text-white/88 md:text-lg">{card.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-8 py-18" data-section-id={`${page.slug}-gallery`}>
        <div className="mx-auto max-w-[96rem] text-center" data-reveal>
          <h3 className="text-4xl text-[#c89a55] md:text-5xl" data-section-title>
            {page.gallery.title}
          </h3>
          <div className="mx-auto mt-4 h-[2px] w-20 bg-[#c89a55]" />
          <p data-reveal-child className="mx-auto mt-7 max-w-5xl text-xl leading-relaxed text-black/90 md:text-2xl">
            Venue imagery, scenic corners, and event-ready details help planners and families understand how the celebration can flow across the property.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {page.gallery.images.map((image, index) => (
            <div
              key={image.src}
              className={`relative overflow-hidden ${index % 5 === 0 ? "h-[22rem] md:col-span-2" : "h-[22rem]"}`}
              data-card
              data-clip-reveal
            >
              <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth={String(6 + (index % 4))}>
                <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-black px-8 py-8" data-section-id={`${page.slug}-banner`}>
        <div className="mx-auto flex max-w-[96rem] flex-col gap-6 border border-[#c89a55] px-8 py-6 text-white md:flex-row md:items-center md:justify-between" data-reveal>
          <p data-reveal-child className="max-w-4xl text-xl md:text-2xl">
            {page.summary.body}
          </p>
          <Link
            href={bookingHref}
            className="inline-flex self-start items-center justify-center bg-[#c89a55] px-10 py-4 text-sm uppercase tracking-[0.18em] text-black md:self-auto"
            data-cursor="hover"
          >
            Explore Venue
          </Link>
        </div>
      </section>

      <section className="bg-[#f7f2ea] px-8 pb-24 pt-8" data-section-id={`${page.slug}-details`}>
        <div className="mx-auto grid max-w-[96rem] gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <article className="border border-[#d9c6a5] bg-white/80 px-8 py-10 backdrop-blur-sm" data-reveal>
            <p className="text-xs uppercase tracking-[0.22em] text-[#b88947]">Planning Notes</p>
            <h3 className="mt-4 text-4xl leading-tight text-[#c89a55] md:text-5xl" data-section-title>
              Venue details that support a smoother celebration
            </h3>
          </article>

          <div className="space-y-4">
            {page.extraSections.map((section, index) => (
              <article key={section.title} className="border border-[#d9c6a5] bg-white/70 px-6 py-5 text-black/88" data-card>
                <p className="mb-2 text-xs uppercase tracking-[0.24em] text-[#b88947]">Note 0{index + 1}</p>
                <h4 className="text-xl leading-tight md:text-2xl">{section.title}</h4>
                <p className="mt-3 text-lg leading-relaxed md:text-xl">{section.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 pb-24 pt-8" data-section-id={`${page.slug}-summary`}>
        <div className="mx-auto max-w-[96rem] text-center" data-reveal>
          <h3 className="text-4xl text-[#c89a55] md:text-5xl" data-section-title>
            {page.summary.title}
          </h3>
          <p data-reveal-child className="mx-auto mt-6 max-w-4xl text-xl leading-relaxed text-black/88 md:text-2xl">
            {page.summary.body}
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-[80rem] gap-6 md:grid-cols-2 lg:grid-cols-3">
          {page.highlights.items.map((item) => (
            <div key={item} className="border border-black/10 bg-white/70 px-6 py-6 text-center text-lg leading-relaxed md:text-xl" data-card>
              {item}
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
