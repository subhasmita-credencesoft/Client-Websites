"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { DetailPage } from "@/lib/data/pages/site-pages";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { GlobalPageSections } from "@/components/features/shared/global-page-sections";

type DetailPageProps = {
  page: DetailPage;
};

export function DetailPageView({ page }: DetailPageProps) {
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
  const isMealPage = page.slug === "cafe24";
  const isRoomDetailPage = [
    "garden-villa-resort",
    "luxury-resort",
    "camp-della-resort-room",
    "adventure-resort",
    "della-enclave-villa-rooms",
  ].includes(page.slug);
  const hideAllSharedSections = false;
  const hideContactAndStaySections = isPackagePage || isRoomDetailPage;
  const bookingHref = isPackagePage
    ? `/booking?package=${encodeURIComponent(page.title)}`
    : `/booking?room=${encodeURIComponent(page.title)}`;
  const bookingContextHref = `${bookingHref}&page=${encodeURIComponent(page.title)}&details=${encodeURIComponent(page.subtitle)}`;
  const primaryCtaLabel = isPackagePage
    ? "REQUEST PACKAGE QUOTE"
    : isMealPage
      ? "PLAN HOSPITALITY"
      : "PLAN GUEST STAY";
  const sectionTitle = isPackagePage ? "Package Highlights" : isMealPage ? "Hospitality Highlights" : "Stay Highlights";

  return (
    <main className="relative overflow-hidden bg-[#0c0a08] text-white">
      <div className="noise-overlay" />
      <SiteHeader />

      <section className="relative min-h-[110svh] overflow-hidden pt-44 md:pt-48" data-section-id={page.slug} data-hero-stage>
        <div className="absolute inset-0" data-hero-bg data-bg-parallax data-bg-depth="8">
          <Image src={page.heroImage} alt={page.title} fill className="object-cover" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.58)_60%,rgba(0,0,0,0.9)_100%)]" data-hero-overlay />
        <div className="relative z-10 mx-auto flex min-h-[110svh] max-w-[96rem] items-start px-6 pb-8 pt-28 md:px-12 md:pb-12 md:pt-36">
          <div className="max-w-5xl" data-hero-copy>
            <h1 data-hero-title className="text-4xl md:text-6xl">
              {page.title}
            </h1>
            <div className="mt-5 h-px w-24 bg-gradient-to-r from-[#d7b67f] via-[#f0d9ae] to-transparent md:w-36" data-hero-divider />
            <p className="mt-5 max-w-4xl text-xl text-white/90 md:text-2xl" data-hero-subtitle>{page.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center md:px-10" data-stage-section>
        <div data-stage-copy>
          <p className="text-xs font-semibold tracking-[0.2em] text-[#c9a46e]" data-stage-line>{page.introTitle}</p>
          <p className="mx-auto mt-6 max-w-5xl text-xl leading-relaxed md:text-2xl" data-stage-line>{page.introBody}</p>
        </div>
        <Link
          href={bookingContextHref}
          className="mt-10 inline-flex border border-[#c8a871] bg-[#c8a871] px-9 py-3 text-sm font-semibold uppercase tracking-wide text-black"
          data-cursor="hover"
          data-stage-line
        >
          {primaryCtaLabel}
        </Link>
      </section>

      <section className="mx-auto max-w-[96rem] px-6 py-10 md:px-10" data-stage-section>
        <h2 className="text-center text-4xl md:text-5xl" data-stage-line>
          {sectionTitle}
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2" data-stage-visual>
          {page.cards.map((card) => (
            <article key={card.title} data-card className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#16261f] shadow-[0_18px_36px_rgba(8,16,11,0.18)]">
              <div className="relative h-[28rem] overflow-hidden">
                <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth="9">
                  <Image src={card.image} alt={card.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
                </div>
              </div>
              <div className="px-6 pb-8 pt-8 md:px-8 md:pb-10">
                <p className="text-xs uppercase tracking-[0.15em] text-[#c9a46e]">{card.label}</p>
                <h3 className="mt-3 text-3xl md:text-4xl">{card.title}</h3>
                {isPackagePage ? (
                  <div className="mt-4 max-w-3xl space-y-3 text-white/90">
                    {card.description.split("\n").map((line, index) => (
                      <p
                        key={`${card.title}-${line}`}
                        className={
                          index === 0
                            ? "text-2xl font-semibold text-white md:text-3xl"
                            : index === 1
                              ? "text-xl font-semibold text-[#c9a46e] md:text-2xl"
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
                <button type="button" className="mt-4 text-xl text-[#c9a46e]" data-cursor="hover">
                  {isPackagePage ? "See Inclusions" : isMealPage ? "See Hospitality Notes" : "See Stay Details"} {"->"}
                </button>
                <div>
                  <Link
                    href={`${bookingContextHref}&offer=${encodeURIComponent(card.title)}&label=${encodeURIComponent(card.label)}&details=${encodeURIComponent(card.description.replace(/\n/g, " | "))}`}
                    className="mt-6 inline-flex border border-[#c8a871] bg-[#c8a871] px-9 py-3 text-sm font-semibold uppercase tracking-wide text-black"
                    data-cursor="hover"
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
        <section className="mx-auto max-w-[96rem] px-6 py-10 md:px-10" data-stage-section>
          <h2 className="text-center text-4xl md:text-5xl" data-stage-line>
            Compare Package Value
          </h2>
          <div className="mt-12 grid gap-8 xl:grid-cols-2">
            {[page.packageComparison.weekday, page.packageComparison.weekend].map((pricing) => (
              <article
                key={pricing.title}
                className="rounded-[1.75rem] border border-white/10 bg-[#16261f] p-6 shadow-[0_18px_36px_rgba(8,16,11,0.18)] md:p-8"
                data-card
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[#c9a46e]">{pricing.title}</p>
                <div className="mt-6 space-y-4">
                  {pricing.rows.map((row) => (
                    <div key={`${pricing.title}-${row.package}`} className="rounded-[1.35rem] border border-white/10 bg-black/20 p-5">
                      <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                        <h3 className="text-2xl text-white md:text-3xl">{row.package}</h3>
                        <p className="text-lg text-[#c9a46e] md:text-xl">{row.price} per person per day</p>
                      </div>
                      <p className="mt-3 text-base leading-relaxed text-white/82 md:text-lg">{row.includes}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <article className="mt-8 rounded-[1.75rem] border border-white/10 bg-[#16261f] p-6 shadow-[0_18px_36px_rgba(8,16,11,0.18)] md:p-8" data-card>
            <p className="text-xs uppercase tracking-[0.2em] text-[#c9a46e]">{page.packageComparison.meals.title}</p>
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

      <section className="mx-auto max-w-[96rem] px-6 py-16 md:px-10" data-stage-section>
        <h2 className="text-center text-4xl md:text-5xl" data-stage-line>
          Gallery
        </h2>
        <div className="mt-8 flex justify-center gap-8 text-2xl md:text-3xl" data-stage-copy>
          <button
            type="button"
            onClick={() => setActiveTab("image")}
            className={activeTab === "image" ? "border-b-2 border-[#c9a46e] pb-2 text-[#c9a46e]" : "text-white/55"}
            data-cursor="hover"
          >
            Image Gallery
          </button>
          {videoGallery.length > 0 ? (
            <button
              type="button"
              onClick={() => setActiveTab("video")}
              className={activeTab === "video" ? "border-b-2 border-[#c9a46e] pb-2 text-[#c9a46e]" : "text-white/55"}
              data-cursor="hover"
            >
              Video Gallery
            </button>
          ) : null}
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2" data-stage-visual>
          {(activeTab === "video" ? videoGallery : imageGallery).map((media, index) => (
            <div
              key={`${activeTab}-${media}-${index}`}
              className="relative h-[28rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#16261f] shadow-[0_18px_36px_rgba(8,16,11,0.18)]"
              data-card
            >
              <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth="7">
                <Image
                  src={media}
                  alt={`${page.title} gallery ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
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

      {hideAllSharedSections ? null : (
        <GlobalPageSections hideContactAndStay={hideContactAndStaySections} hideReservation={isRoomDetailPage} />
      )}
      <SiteFooter />
    </main>
  );
}
