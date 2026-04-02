"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import type { MountainVenuePageData } from "@/lib/data/pages/venue-pages";

type VenueShowcasePageProps = {
  page: MountainVenuePageData;
};

export function VenueShowcasePage({ page }: VenueShowcasePageProps) {
  const [activeHeroImage, setActiveHeroImage] = useState(0);
  const bookingHref = `/booking?page=${encodeURIComponent(page.hero.title)}&offer=${encodeURIComponent(page.hero.title)}&eventType=${encodeURIComponent("Destination Wedding")}`;

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
    <main className="relative overflow-hidden bg-[#11100e] text-[#f4ede2]">
      <div className="noise-overlay" />
      <SiteHeader />

      <section className="relative min-h-[86svh] overflow-hidden pt-32 md:min-h-[100svh] md:pt-0" data-section-id={`${page.slug}-hero`} data-hero-stage>
        {heroImages.map((image, index) => (
          <div
            key={`${page.slug}-${image}`}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ${
              index === activeHeroImage ? "opacity-100" : "opacity-0"
            }`}
            data-hero-bg
            data-bg-parallax
            data-bg-depth={String(10 + index)}
          >
            <Image src={image} alt={page.hero.title} fill className="object-cover" sizes="100vw" priority={index === 0} />
          </div>
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,12,0.22)_0%,rgba(8,10,12,0.34)_42%,rgba(8,10,12,0.82)_100%)]" data-hero-overlay />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,rgba(8,10,12,0)_0%,rgba(8,10,12,0.74)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[86svh] max-w-[96rem] items-end px-4 pb-12 pt-20 md:min-h-[100svh] md:px-10 md:pb-20 md:pt-36">
          <div className="max-w-5xl" data-hero-copy>
            <p data-reveal-child className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
              {page.intro.eyebrow}
            </p>
            <h1 className="mt-6 max-w-5xl text-balance text-4xl leading-tight text-white md:text-6xl" data-hero-title>
              {page.hero.title}
            </h1>
            <div className="mt-6 h-px w-24 bg-gradient-to-r from-[#d7b67f] via-[#f0d9ae] to-transparent md:w-36" data-hero-divider />
            <p className="mt-6 max-w-4xl text-balance text-xl leading-relaxed text-white/90 md:text-2xl" data-hero-subtitle>
              {page.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={bookingHref}
                className="inline-flex items-center justify-center border border-[#c8a871] bg-[#c8a871] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-black"
                data-cursor="hover"
              >
                Check Venue Availability
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white/88 transition-colors hover:border-[#c9a46e]/40 hover:text-white"
                data-cursor="hover"
              >
                Contact The Team
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" data-reveal-child>
              {page.stats.map((stat) => (
                <div key={`${page.slug}-hero-${stat.label}`} className="rounded-[1.35rem] border border-white/10 bg-black/25 px-5 py-4 backdrop-blur-sm">
                  <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#d7ae71]">{stat.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/88 md:text-base">{stat.value}</p>
                </div>
              ))}
            </div>
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

      <section className="mx-auto max-w-[96rem] px-4 pb-16 pt-16 md:px-8 md:pb-24 md:pt-40" data-section-id={`${page.slug}-intro`} data-stage-section>
        <nav aria-label="Breadcrumb" className="flex items-center">
          <ol className="inline-flex items-center gap-3 rounded-full border border-[#c89a55]/20 bg-[#182920]/85 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/78 backdrop-blur-sm md:text-xs">
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

        <div className="mt-12 max-w-[62rem]" data-stage-copy>
          <h2 className="text-balance text-4xl leading-tight text-[#d7ae71] md:text-6xl" data-stage-line>
            {page.intro.title}
          </h2>
          <div className="mt-10 border-l border-white/15 pl-8 text-xl leading-relaxed text-white/86 md:text-2xl">
            <p data-stage-line>{page.intro.body}</p>
            <p className="mt-6" data-stage-line>
              Explore scenic event spaces, celebration flow, and booking-ready venue details crafted for destination weddings at The Mountain, Karjat.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[96rem] px-4 pb-16 pt-0 md:px-8 md:pb-20" data-section-id={`${page.slug}-stats`}>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {page.stats.map((stat) => (
            <article
              key={`${page.slug}-${stat.label}`}
              className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#182920] px-6 py-7 shadow-[0_20px_40px_rgba(10,18,12,0.18)] backdrop-blur-sm"
              data-card
              data-clip-reveal
            >
              <p className="text-3xl text-[#d7ae71] md:text-4xl">{stat.value}</p>
              <p className="mt-3 text-sm uppercase tracking-[0.22em] text-white/72">{stat.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-black px-4 py-16 text-white md:px-8 md:py-20" data-feature-stage data-section-id={`${page.slug}-plan`}>
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
              Check Venue Availability
            </Link>
          </div>

          <div className="relative h-[20rem] overflow-hidden rounded-[2rem] md:h-[36rem]" data-card>
            <div className="absolute inset-0" data-feature-image data-card-image data-bg-parallax data-bg-depth="9">
              <Image src={page.gallery.images[0]?.src ?? page.hero.image} alt={page.gallery.images[0]?.alt ?? page.hero.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#11100e] px-4 py-14 md:px-8 md:py-18" data-section-id={`${page.slug}-booking-intent`}>
        <div className="mx-auto grid max-w-[96rem] gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[1.9rem] border border-white/10 bg-[#182920] p-8 shadow-[0_18px_36px_rgba(8,16,11,0.18)]" data-reveal>
            <p className="text-xs uppercase tracking-[0.24em] text-[#d7ae71]" data-reveal-child>Booking Direction</p>
            <h3 className="mt-4 text-3xl leading-tight text-[#f4ead9] md:text-4xl" data-section-title>
              A venue page should help families understand how the celebration can actually work
            </h3>
            <p className="mt-5 text-base leading-relaxed text-white/78 md:text-lg" data-reveal-child>
              From scenic ceremony settings to guest movement and event sequencing, this venue section is shaped to support enquiry decisions, not just browsing.
            </p>
          </article>
          <div className="grid gap-4 sm:grid-cols-2">
            {page.highlights.items.slice(0, 4).map((item) => (
              <article key={`${page.slug}-booking-${item}`} className="rounded-[1.5rem] border border-white/10 bg-[#121916] px-6 py-5 shadow-[0_18px_36px_rgba(8,16,11,0.12)]" data-card>
                <p className="text-sm leading-relaxed text-white/84">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="overflow-hidden bg-[#161412] px-4 py-16 md:px-8 md:py-22"
        data-section-id={`${page.slug}-journey`}
        data-horizontal-scroll
        data-horizontal-end="+=1800"
      >
        <div className="mx-auto max-w-[96rem]">
          <div className="max-w-4xl text-center md:mx-auto" data-reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-[#b88947]" data-reveal-child>
              Celebration Journey
            </p>
            <h3 className="mt-4 text-4xl leading-tight text-[#c89a55] md:text-5xl" data-section-title>
              How this venue experience unfolds across the wedding
            </h3>
            <p className="mx-auto mt-6 max-w-4xl text-xl leading-relaxed text-white/78 md:text-2xl" data-reveal-child>
              Discover how each venue space supports ceremonies, guest movement, and the overall celebration journey across the estate.
            </p>
          </div>

          <div className="mt-14 flex gap-6 md:gap-8" data-horizontal-track>
            {page.experienceJourney.map((item, index) => (
              <article
                key={`${page.slug}-${item.title}`}
                className="w-[85vw] shrink-0 overflow-hidden rounded-[2rem] border border-white/10 bg-[#182920] shadow-[0_22px_55px_rgba(10,18,12,0.22)] md:w-[38rem]"
                data-card
              >
                <div className="relative h-[20rem] overflow-hidden md:h-[24rem]">
                  <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth={String(8 + index)}>
                    <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 85vw, 38rem" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
                </div>
                <div className="p-7 md:p-8">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#b88947]">Chapter 0{index + 1}</p>
                  <h4 className="mt-3 text-3xl leading-tight text-[#f4ead9] md:text-4xl">{item.title}</h4>
                  <p className="mt-5 text-lg leading-relaxed text-white/78 md:text-xl">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-4 py-16 text-white md:px-8 md:py-22" data-section-id={`${page.slug}-highlights`}>
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
            <article key={card.title} className="overflow-hidden rounded-[1.6rem] border border-white/8 bg-[#0f0f0f]" data-card>
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

      <section className="relative overflow-hidden bg-[#111317] px-4 py-16 text-white md:px-8 md:py-24" data-section-id={`${page.slug}-cinematic-band`}>
        <div className="absolute inset-0">
          <Image src={page.cinematicBand.image} alt={page.cinematicBand.title} fill className="object-cover opacity-30" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,10,12,0.9)_0%,rgba(8,10,12,0.72)_45%,rgba(8,10,12,0.9)_100%)]" />

        <div className="relative z-10 mx-auto grid max-w-[96rem] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div data-reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-[#d7ae71]" data-reveal-child>
              Editorial Perspective
            </p>
            <h3 className="mt-5 max-w-4xl text-balance text-4xl leading-tight text-[#f2dfbf] md:text-6xl" data-section-title>
              {page.cinematicBand.title}
            </h3>
            <p className="mt-7 max-w-3xl text-xl leading-relaxed text-white/88 md:text-2xl" data-reveal-child>
              {page.cinematicBand.body}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2" data-reveal>
            {page.cinematicBand.tags.map((tag) => (
              <div
                key={`${page.slug}-${tag}`}
                className="rounded-[1.4rem] border border-white/10 bg-white/5 px-5 py-4 text-base uppercase tracking-[0.18em] text-white/88 backdrop-blur-sm md:text-lg"
                data-reveal-child
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#11100e] px-4 py-14 md:px-8 md:py-18" data-section-id={`${page.slug}-gallery`}>
        <div className="mx-auto max-w-[96rem] text-center" data-reveal>
          <h3 className="text-4xl text-[#c89a55] md:text-5xl" data-section-title>
            {page.gallery.title}
          </h3>
          <div className="mx-auto mt-4 h-[2px] w-20 bg-[#c89a55]" />
          <p data-reveal-child className="mx-auto mt-7 max-w-5xl text-xl leading-relaxed text-white/82 md:text-2xl">
            Venue imagery, scenic corners, and event-ready details help planners and families understand how the celebration can flow across the property.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {page.gallery.images.map((image, index) => (
            <div
              key={image.src}
              className={`relative overflow-hidden rounded-[1.5rem] ${index % 5 === 0 ? "h-[22rem] md:col-span-2" : "h-[22rem]"}`}
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

      <section className="bg-black px-4 py-8 md:px-8" data-section-id={`${page.slug}-banner`}>
        <div className="mx-auto flex max-w-[96rem] flex-col gap-6 rounded-[1.8rem] border border-[#c89a55] px-8 py-6 text-white md:flex-row md:items-center md:justify-between" data-reveal>
          <p data-reveal-child className="max-w-4xl text-xl md:text-2xl">
            {page.summary.body}
          </p>
          <Link
            href={bookingHref}
            className="inline-flex self-start items-center justify-center bg-[#c89a55] px-10 py-4 text-sm uppercase tracking-[0.18em] text-black md:self-auto"
            data-cursor="hover"
          >
            Check Venue Availability
          </Link>
        </div>
      </section>

      <section className="bg-[#161412] px-4 pb-16 pt-8 md:px-8 md:pb-24" data-section-id={`${page.slug}-details`}>
        <div className="mx-auto grid max-w-[96rem] gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[1.75rem] border border-[#d9c6a5]/20 bg-[#182920] px-8 py-10 backdrop-blur-sm" data-reveal>
            <p className="text-xs uppercase tracking-[0.22em] text-[#b88947]">Planning Notes</p>
            <h3 className="mt-4 text-4xl leading-tight text-[#c89a55] md:text-5xl" data-section-title>
              Venue details that support a smoother celebration
            </h3>
          </article>

          <div className="space-y-4">
            {page.extraSections.map((section, index) => (
              <article key={section.title} className="rounded-[1.5rem] border border-[#d9c6a5]/18 bg-[#182920] px-6 py-5 text-white/84" data-card>
                <p className="mb-2 text-xs uppercase tracking-[0.24em] text-[#b88947]">Planning Note 0{index + 1}</p>
                <h4 className="text-xl leading-tight md:text-2xl">{section.title}</h4>
                <p className="mt-3 text-lg leading-relaxed md:text-xl">{section.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#11100e] px-4 pb-16 pt-8 md:px-8 md:pb-24" data-section-id={`${page.slug}-summary`}>
        <div className="mx-auto max-w-[96rem] text-center" data-reveal>
          <h3 className="text-4xl text-[#c89a55] md:text-5xl" data-section-title>
            {page.summary.title}
          </h3>
          <p data-reveal-child className="mx-auto mt-6 max-w-4xl text-xl leading-relaxed text-white/82 md:text-2xl">
            {page.summary.body}
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-[80rem] gap-6 md:grid-cols-2 lg:grid-cols-3">
          {page.highlights.items.map((item) => (
            <div key={item} className="rounded-[1.4rem] border border-white/10 bg-[#182920] px-6 py-6 text-center text-lg leading-relaxed text-white/84 md:text-xl" data-card>
              {item}
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-4" data-reveal>
          <Link
            href={bookingHref}
            className="inline-flex items-center justify-center border border-[#c8a871] bg-[#c8a871] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-black"
            data-cursor="hover"
            data-reveal-child
          >
            Check Venue Availability
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white/88 transition-colors hover:border-[#c9a46e]/40 hover:text-white"
            data-cursor="hover"
            data-reveal-child
          >
            Contact The Team
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
