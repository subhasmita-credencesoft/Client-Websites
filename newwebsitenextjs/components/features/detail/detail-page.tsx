"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { DetailPage } from "@/lib/data/pages/detail-pages";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { GlobalPageSections } from "@/components/features/shared/global-page-sections";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { DIRECT_BOOKING_ENGINE_URL } from "@/lib/constants/booking";

type DetailPageProps = {
  page: DetailPage;
  parentBreadcrumb?: { label: string; href: string };
};

export function DetailPageView({ page, parentBreadcrumb }: DetailPageProps) {
  const imageGallery = useMemo(
    () =>
      Array.from(
        new Set(page.galleryImages && page.galleryImages.length > 0 ? page.galleryImages : [page.heroImage, ...page.cards.map((card) => card.image), page.galleryImage]),
      ),
    [page],
  );
  const videoGallery = page.galleryVideos ?? [];
  const [activeTab, setActiveTab] = useState<"image" | "video">(videoGallery.length > 0 ? "image" : "image");
  const isPackagePage = Boolean(page.packageComparison);
  const isRoomDetailPage = [
    "standard-room",
    "cliff-room",
    "family-room",
    "glass-cottage",
    "bungalow",
  ].includes(page.slug);
  const facts = page.facts ?? [];
  const amenities = page.amenities ?? [];
  const specifications = page.specifications ?? [];
  const perfectFor = page.perfectFor ?? [];
  const hideAllSharedSections = false;
  const hideContactAndStaySections = isPackagePage || isRoomDetailPage;
  const bookingContextHref = DIRECT_BOOKING_ENGINE_URL;
  const primaryCtaLabel = isPackagePage
    ? "CHECK PACKAGE AVAILABILITY"
    : "CHECK ROOM AVAILABILITY";
  const sectionTitle = isPackagePage ? "Package Highlights" : "Stay Highlights";
  const galleryHeading = isPackagePage ? "Package Gallery" : "Stay Gallery";
  const bookingPanelTitle = isPackagePage
    ? "Secure the right package for your dates"
    : `Reserve ${page.title} for your preferred dates`;
  const bookingPanelBody = isPackagePage
    ? "Share your dates, guest count, and package preference to receive the right bundled celebration direction."
    : "Check availability for your preferred room, align guest count, and let our team help you place the right stay inside your wedding or getaway plan.";

  return (
    <main className="relative overflow-hidden bg-[var(--color-surface)] text-white">
      <div className="noise-overlay" />
      <SiteHeader />

      <section className="relative min-h-[42rem] overflow-hidden pt-28 sm:min-h-[46rem] sm:pt-32 md:min-h-[54rem] md:pt-40" data-section-id={page.slug} data-hero-stage>
        <div className="absolute inset-0" data-hero-bg data-bg-parallax data-bg-depth="8">
          <Image src={page.heroImage} alt={page.title} fill className="object-cover" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.58)_60%,rgba(0,0,0,0.9)_100%)]" data-hero-overlay />
        <div className="site-container relative z-10 flex min-h-[42rem] items-start pb-8 pt-16 sm:min-h-[46rem] md:min-h-[54rem] md:pb-12 md:pt-24">
          <div className="max-w-5xl" data-hero-copy>
            <p className="site-eyebrow" data-hero-subtitle>
              {isPackagePage ? "Wedding Package" : "Luxury Stay"}
            </p>
            <h1 data-hero-title className="site-title-xl">
              {page.title}
            </h1>
            <div className="mt-5 h-px w-24 bg-gradient-to-r from-[#d7b67f] via-[#f0d9ae] to-transparent md:w-36" data-hero-divider />
            <p className="site-copy-lg mt-5 max-w-4xl" data-hero-subtitle>
              {page.subtitle}
            </p>
            {isPackagePage ? (
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/76 md:text-lg">
                Curated for destination wedding weekends with stay, meals, and venue access aligned into one clearer premium package structure.
              </p>
            ) : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href={bookingContextHref}
                className="site-button site-button-primary px-8"
              >
                {primaryCtaLabel}
              </Link>
              <Link
                href="/booking?eventType=Destination%20Wedding"
                className="site-button site-button-outline px-8"
              >
                Plan Your Wedding
              </Link>
            </div>
            {facts.length > 0 ? (
              <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {facts.map((fact) => (
                  <div key={`${page.slug}-${fact.label}`} className="rounded-[1.35rem] border border-white/10 bg-black/25 px-5 py-4 backdrop-blur-sm">
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-primary)]">{fact.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/88 md:text-base">{fact.value}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <div className="content-auto-section">
      <section className="site-container max-w-5xl py-14 text-center md:py-20" data-stage-section>
        <Breadcrumbs items={parentBreadcrumb ? [parentBreadcrumb, { label: page.title }] : [{ label: page.title }]} />
        <div data-stage-copy>
          <p className="text-xs font-semibold tracking-[0.2em] text-[var(--color-primary)]" data-stage-line>
            {page.introTitle}
          </p>
          <p className="site-copy-lg mx-auto mt-6 max-w-5xl" data-stage-line>
            {page.introBody}
          </p>
        </div>
        <Link
          href={bookingContextHref}
          className="site-button site-button-primary mt-10 px-9"
          data-stage-line
        >
          {primaryCtaLabel}
        </Link>
      </section>

      {!isPackagePage && facts.length > 0 ? (
        <section className="mx-auto max-w-[80rem] px-4 py-8 md:px-8" data-stage-section>
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <article className="rounded-[1.8rem] border border-white/10 bg-[var(--section-surface-deep)] p-8 shadow-[0_18px_36px_rgba(8,16,11,0.18)]" data-card>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-primary)]">Stay Positioning</p>
              <h2 className="mt-4 text-3xl leading-tight text-white md:text-4xl">A room choice shaped around who is staying and how the celebration moves</h2>
              <p className="mt-5 text-base leading-relaxed text-white/78 md:text-lg">
                Each stay category at The Mountain is planned to support a different hosting role, from couple-friendly rooms and scenic premium stays to family-led accommodation and host residences.
              </p>
            </article>
            <div className="grid gap-4 sm:grid-cols-2">
              {facts.map((fact) => (
                <article key={`detail-fact-${fact.label}`} className="rounded-[1.5rem] border border-white/10 bg-[#111815] px-6 py-5 shadow-[0_18px_36px_rgba(8,16,11,0.12)]" data-card>
                  <p className="text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-primary)]">{fact.label}</p>
                  <p className="mt-3 text-lg leading-relaxed text-white/88">{fact.value}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {!isPackagePage && (amenities.length > 0 || specifications.length > 0) ? (
        <section className="site-container max-w-[80rem] py-10" data-stage-section>
          <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
            {amenities.length > 0 ? (
              <article className="rounded-[1.8rem] border border-white/10 bg-[var(--section-surface-deep)] p-8 shadow-[0_18px_36px_rgba(8,16,11,0.18)]" data-card>
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-primary)]">Premium Amenities</p>
                <h2 className="mt-4 text-3xl leading-tight text-white md:text-4xl">Thoughtful comforts that support every stay</h2>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {amenities.map((amenity) => (
                    <div key={`${page.slug}-${amenity.title}`} className="rounded-[1.35rem] border border-white/10 bg-black/20 px-5 py-5">
                      <p className="text-lg font-semibold text-white">{amenity.title}</p>
                      <p className="mt-3 text-base leading-relaxed text-white/76">{amenity.description}</p>
                    </div>
                  ))}
                </div>
              </article>
            ) : null}

            {specifications.length > 0 ? (
              <article className="rounded-[1.8rem] border border-white/10 bg-[#111815] p-8 shadow-[0_18px_36px_rgba(8,16,11,0.18)]" data-card>
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-primary)]">Room Specifications</p>
                <h2 className="mt-4 text-3xl leading-tight text-white md:text-4xl">Quick room details before you enquire</h2>
                <div className="mt-8 space-y-4">
                  {specifications.map((item) => (
                    <div key={`${page.slug}-${item.label}`} className="rounded-[1.25rem] border border-white/10 bg-black/20 px-5 py-4">
                      <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-primary)]">{item.label}</p>
                      <p className="mt-2 text-base leading-relaxed text-white/85 md:text-lg">{item.value}</p>
                    </div>
                  ))}
                </div>
              </article>
            ) : null}
          </div>
        </section>
      ) : null}

      {!isPackagePage && perfectFor.length > 0 ? (
        <section className="site-container max-w-[80rem] py-10" data-stage-section>
          <article className="rounded-[1.8rem] border border-white/10 bg-[var(--section-surface-deep)] p-8 shadow-[0_18px_36px_rgba(8,16,11,0.18)]" data-card>
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-primary)]">Perfect For</p>
            <h2 className="mt-4 text-3xl leading-tight text-white md:text-4xl">Who this stay works best for</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {perfectFor.map((item) => (
                <div key={`${page.slug}-${item}`} className="rounded-[1.35rem] border border-white/10 bg-black/20 px-5 py-5 text-base leading-relaxed text-white/82 md:text-lg">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>
      ) : null}

      <section className="site-container max-w-[80rem] py-10" data-stage-section>
        <h2 className="site-title-lg text-center" data-stage-line>
          {sectionTitle}
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2" data-stage-visual>
          {page.cards.map((card) => (
            <article key={card.title} data-card className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[var(--section-surface-deep)] shadow-[0_18px_36px_rgba(8,16,11,0.18)]">
              <div className="relative h-[18rem] overflow-hidden md:h-[24rem]">
                <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth="9">
                  <Image src={card.image} alt={card.title} fill className="object-cover" sizes="(max-width: 767px) 100vw, 50vw" />
                </div>
              </div>
              <div className="px-6 pb-8 pt-8 md:px-8 md:pb-10">
                <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-primary)]">{card.label}</p>
                <h3 className="site-title-md mt-3">{card.title}</h3>
                {isPackagePage ? (
                  <div className="mt-4 max-w-3xl space-y-3 text-white/90">
                    {card.description.split("\n").map((line, index) => (
                      <p
                        key={`${card.title}-${line}`}
                        className={
                          index === 0
                            ? "text-2xl font-semibold text-white md:text-3xl"
                            : index === 1
                              ? "text-xl font-semibold text-[var(--color-primary)] md:text-2xl"
                              : "text-lg leading-relaxed md:text-xl"
                        }
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/90 md:text-xl">{card.description}</p>
                )}
                <p className="mt-4 text-sm uppercase tracking-[0.16em] text-[var(--color-primary)]">
                  {isPackagePage ? "Package details tailored to your dates and guest count" : "Room availability depends on selected dates and guest count"}
                </p>
                <div>
                  <Link
                    href={`${bookingContextHref}&offer=${encodeURIComponent(card.title)}&label=${encodeURIComponent(card.label)}&details=${encodeURIComponent(card.description.replace(/\n/g, " | "))}`}
                    className="site-button site-button-primary mt-6 px-9"
                  >
                    {primaryCtaLabel}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {page.packageComparison ? (
        <section className="site-container max-w-[80rem] py-10" data-stage-section>
          <h2 className="site-title-lg text-center" data-stage-line>
            Compare Package Value
          </h2>
          <div className="mt-12 grid gap-8 xl:grid-cols-2">
            {[page.packageComparison.weekday, page.packageComparison.weekend].map((pricing) => (
              <article
                key={pricing.title}
                className="rounded-[1.75rem] border border-white/10 bg-[var(--section-surface-deep)] p-6 shadow-[0_18px_36px_rgba(8,16,11,0.18)] md:p-8"
                data-card
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-primary)]">{pricing.title}</p>
                <div className="mt-6 space-y-4">
                  {pricing.rows.map((row) => (
                    <div key={`${pricing.title}-${row.package}`} className="rounded-[1.35rem] border border-white/10 bg-black/20 p-5">
                      <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                        <h3 className="text-2xl text-white md:text-3xl">{row.package}</h3>
                        <p className="text-lg text-[var(--color-primary)] md:text-xl">{row.price} per person per day</p>
                      </div>
                      <p className="mt-3 text-base leading-relaxed text-white/82 md:text-lg">{row.includes}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <article className="mt-8 rounded-[1.75rem] border border-white/10 bg-[var(--section-surface-deep)] p-6 shadow-[0_18px_36px_rgba(8,16,11,0.18)] md:p-8" data-card>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-primary)]">{page.packageComparison.meals.title}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {page.packageComparison.meals.items.map((item) => (
                <div key={item} className="rounded-[1.25rem] border border-white/10 bg-black/20 px-5 py-4 text-base leading-relaxed text-white/85 md:text-lg">
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-white/65 md:text-base">{page.packageComparison.meals.note}</p>
          </article>
        </section>
      ) : null}

      <section className="site-container max-w-[80rem] py-14 md:py-16" data-stage-section>
        <h2 className="site-title-lg text-center" data-stage-line>
          {galleryHeading}
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-base md:text-2xl" data-stage-copy>
          <button
            type="button"
            onClick={() => setActiveTab("image")}
            className={activeTab === "image" ? "border-b-2 border-[var(--color-primary)] pb-2 text-[var(--color-primary)]" : "text-white/55"}
          >
            Image Gallery
          </button>
          {videoGallery.length > 0 ? (
            <button
              type="button"
              onClick={() => setActiveTab("video")}
              className={activeTab === "video" ? "border-b-2 border-[var(--color-primary)] pb-2 text-[var(--color-primary)]" : "text-white/55"}
            >
              Video Gallery
            </button>
          ) : null}
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2" data-stage-visual>
          {(activeTab === "video" ? videoGallery : imageGallery).map((media, index) => (
            <div
              key={`${activeTab}-${media}-${index}`}
              className="relative h-[18rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[var(--section-surface-deep)] shadow-[0_18px_36px_rgba(8,16,11,0.18)] md:h-[24rem]"
              data-card
            >
              <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth="7">
                <Image
                  src={media}
                  alt={`${page.title} gallery ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 767px) 100vw, 50vw"
                />
              </div>
              {activeTab === "video" ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/70 bg-black/30 text-2xl text-white">
                    Play
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="site-container max-w-5xl pb-16 md:pb-20" data-stage-section>
        <div className="rounded-[2rem] border border-white/10 bg-[var(--section-surface-deep)] px-8 py-12 text-center shadow-[0_18px_36px_rgba(8,16,11,0.18)] md:px-12 md:py-14">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-primary)]" data-stage-line>
            Booking Intent
          </p>
          <h3 className="site-title-lg mx-auto mt-5 max-w-4xl text-balance text-white" data-stage-line>
            {bookingPanelTitle}
          </h3>
          <p className="site-copy mx-auto mt-6 max-w-3xl md:text-lg" data-stage-line>
            {bookingPanelBody}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href={bookingContextHref}
              className="site-button site-button-primary px-8"
            >
              {primaryCtaLabel}
            </Link>
            <Link
              href="/contact"
              className="site-button site-button-outline px-8"
            >
              Contact The Team
            </Link>
          </div>
        </div>
      </section>

      {hideAllSharedSections ? null : (
        <GlobalPageSections hideContactAndStay={hideContactAndStaySections} hideReservation={isRoomDetailPage} />
      )}
      </div>
      <SiteFooter />
    </main>
  );
}
