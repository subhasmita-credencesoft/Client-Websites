"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { DIRECT_BOOKING_ENGINE_URL } from "@/lib/constants/booking";
import { offersPageData } from "@/lib/data/pages/offers-pages";

export function OffersPageClient() {
  const searchParams = useSearchParams();
  const { heroImage, hero, intro, offers, contactLine } = offersPageData;
  const selectedPackage = (searchParams.get("package") ?? "").toLowerCase();
  const visibleOffers = offers.filter((offer) => {
    if (!selectedPackage) return true;
    return offer.id === selectedPackage;
  });
  const activeTitle = visibleOffers.length === 1 ? visibleOffers[0].title : intro.title;
  const activeDescription =
    visibleOffers.length === 1 ? visibleOffers[0].description : intro.description;
  const selectedOfferHref = DIRECT_BOOKING_ENGINE_URL;

  const getOfferBookingHref = (offer: (typeof offers)[number]) => {
    const packageMap: Record<string, string> = {
      classic: "Classic Package",
      signature: "Signature Package",
      "premium-luxo": "Premium Luxe Package",
    };
    void packageMap[offer.id];

    return DIRECT_BOOKING_ENGINE_URL;
  };

  return (
    <>
      <section className="relative min-h-[86svh] overflow-hidden pt-36 md:min-h-[108svh] md:pt-48" data-section-id="offers-hero" data-hero-stage>
        <div className="absolute inset-0" data-hero-bg data-bg-parallax data-bg-depth="9">
          <Image src={heroImage} alt="Special offers and packages" fill className="object-cover" priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.42)_45%,rgba(0,0,0,0.62)_100%)]" data-hero-overlay />
        <div className="site-container relative z-10 flex min-h-[86svh] max-w-[96rem] items-center justify-center pb-12 pt-8 text-center md:min-h-[108svh] md:pb-24">
          <div data-hero-copy>
            <h1 className="site-title-xl text-balance text-[#ceb17e]" data-hero-title>
              {hero.title}
            </h1>
            <p className="mt-3 text-[clamp(1.5rem,3vw,2.75rem)] font-semibold tracking-wide text-white" data-hero-subtitle>
              {hero.subtitle}
            </p>
            <div className="mx-auto mt-4 h-[2px] w-20 bg-[#c89a55]" data-hero-divider />
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href={selectedOfferHref}
                className="site-button site-button-primary px-8"
                data-cursor="hover"
              >
                Check Package Availability
              </Link>
              <Link
                href="/contact"
                className="site-button site-button-outline px-8"
                data-cursor="hover"
              >
                Contact The Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="content-auto-section">
      <section className="site-container max-w-[96rem] py-12 text-center md:py-14" data-stage-section>
        <nav aria-label="Breadcrumb" className="flex items-center justify-center">
          <ol className="inline-flex items-center gap-3 rounded-full border border-[#c89a55]/20 bg-[linear-gradient(180deg,#15110e_0%,#1b1511_100%)] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/78 backdrop-blur-sm md:text-xs">
            <li>
              <Link href="/" className="transition-colors hover:text-[#b88948]">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-[#b88948]">
              /
            </li>
            <li className="text-[#b88948]">{intro.breadcrumb}</li>
          </ol>
        </nav>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.28em] text-[#c89a55]" data-stage-line>
          Package Selection
        </p>
        <h2 className="site-title-md mx-auto mt-8 max-w-6xl text-balance" data-stage-line>
          {activeTitle}
        </h2>
        <p className="site-copy-lg mx-auto mt-6 max-w-6xl text-balance" data-stage-line>
          {activeDescription}
        </p>
      </section>

      <section className="py-8 text-center">
        <Link
          href={selectedOfferHref}
          className="site-button site-button-secondary px-14"
          data-cursor="hover"
        >
          {visibleOffers.length === 1 ? "CHECK PACKAGE AVAILABILITY" : intro.cta}
        </Link>
      </section>

      <section className="site-container grid max-w-[96rem] gap-10 pb-16 pt-8 md:gap-16 md:pb-20">
        {visibleOffers.map((offer, index) => {
          const textFirst = index % 2 === 1;
          return (
            <article
              key={offer.title}
              className="grid items-start overflow-hidden rounded-[2rem] border border-[#c89a55]/16 bg-[linear-gradient(180deg,#15110e_0%,#1b1511_100%)] shadow-[0_24px_50px_rgba(10,18,12,0.24)] md:grid-cols-2"
              data-card
            >
              <div className={textFirst ? "order-1 bg-[linear-gradient(180deg,#17120f_0%,#1d1612_100%)] p-8 md:order-1 md:p-12" : "order-2 bg-[linear-gradient(180deg,#17120f_0%,#1d1612_100%)] p-8 md:order-2 md:p-12"}>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b88948]">Package Overview</p>
                <h3 className="site-title-md mt-4 text-[#f4ead9]" data-section-title>
                  {offer.title}
                </h3>
                <div className="mt-4 h-[2px] w-20 bg-[#c89a55]" />
                <p className="mt-7 text-lg leading-[1.7] text-white/82 md:text-[1.35rem]">{offer.description}</p>
                <ul className="mt-8 grid gap-4 text-base leading-[1.7] text-white/84 md:text-lg">
                  {offer.bullets.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#c89a55]" />
                      <span className="flex-1">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 rounded-[1.5rem] border border-[#c89a55]/20 bg-[linear-gradient(180deg,#241d17_0%,#2e241d_100%)] px-5 py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b88948]">Pricing Note</p>
                  <p className="mt-3 text-base leading-[1.7] text-white/75 md:text-lg">{contactLine}</p>
                </div>
                <Link
                  href={getOfferBookingHref(offer)}
                  className="site-button site-button-secondary mt-8 px-12"
                  data-cursor="hover"
                >
                  CHECK PACKAGE AVAILABILITY
                </Link>
              </div>

              <div className={textFirst ? "order-2 relative h-[18rem] overflow-hidden md:order-2 md:h-full md:min-h-[30rem]" : "order-1 relative h-[18rem] overflow-hidden md:order-1 md:h-full md:min-h-[30rem]"}>
                <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth="7">
                  <Image src={offer.image} alt={offer.title} fill className="object-cover" sizes="(max-width: 767px) 100vw, 50vw" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
              </div>
            </article>
          );
        })}
      </section>

        <section className="site-container max-w-5xl pb-16 text-center md:pb-20" data-stage-section>
        <div className="rounded-[2.2rem] border border-[#c89a55]/18 bg-[linear-gradient(180deg,#15110e_0%,#1c1511_100%)] px-8 py-12 shadow-[0_24px_50px_rgba(10,18,12,0.24)] md:px-12 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c89a55]" data-stage-line>
            Booking Support
          </p>
          <h3 className="site-title-lg mx-auto mt-5 max-w-4xl text-balance text-[#f4ead9]" data-stage-line>
            Need the right package for your dates and guest count?
          </h3>
          <p className="site-copy-lg mx-auto mt-6 max-w-4xl" data-stage-line>
            Check weekday or weekend availability, compare package value, and let our team guide you toward the right stay and celebration format.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={selectedOfferHref}
              className="site-button site-button-primary px-8"
              data-cursor="hover"
            >
              Check Availability
            </Link>
            <Link
              href="/contact"
              className="site-button site-button-outline px-8"
              data-cursor="hover"
            >
              Contact The Team
            </Link>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
