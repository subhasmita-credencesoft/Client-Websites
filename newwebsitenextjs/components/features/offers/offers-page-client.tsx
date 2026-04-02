"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { offersPageData } from "@/lib/data/pages/showcase-pages";

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
  const selectedOfferHref =
    visibleOffers.length === 1
      ? `/booking?offer=${encodeURIComponent(visibleOffers[0].title)}&page=${encodeURIComponent("Offers")}&details=${encodeURIComponent(visibleOffers[0].description)}`
      : "/booking?page=Offers";

  const getOfferBookingHref = (offer: (typeof offers)[number]) => {
    const packageMap: Record<string, string> = {
      classic: "Classic Package",
      signature: "Signature Package",
      "premium-luxo": "Premium Luxe Package",
    };
    const selectedPackageTitle = packageMap[offer.id];
    const packageQuery = selectedPackageTitle ? `package=${encodeURIComponent(selectedPackageTitle)}&` : "";

    return `/booking?${packageQuery}offer=${encodeURIComponent(offer.title)}&page=${encodeURIComponent("Offers")}&details=${encodeURIComponent(
      [offer.description, ...offer.bullets].join(" | "),
    )}`;
  };

  return (
    <>
      <section className="relative min-h-[108svh] overflow-hidden pt-44 md:pt-48" data-section-id="offers-hero" data-hero-stage>
        <div className="absolute inset-0" data-hero-bg data-bg-parallax data-bg-depth="9">
          <Image src={heroImage} alt="Special offers and packages" fill className="object-cover" priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.42)_45%,rgba(0,0,0,0.62)_100%)]" data-hero-overlay />
        <div className="relative z-10 mx-auto flex min-h-[108svh] max-w-[96rem] items-center justify-center px-8 pb-16 pt-8 text-center md:pb-24">
          <div data-hero-copy>
            <h1 className="text-balance text-[clamp(42px,5.2vw,76px)] leading-[1.08] text-[#ceb17e]" data-hero-title>
              {hero.title}
            </h1>
            <p className="mt-3 text-[clamp(24px,3.1vw,44px)] font-semibold tracking-wide text-white" data-hero-subtitle>
              {hero.subtitle}
            </p>
            <div className="mx-auto mt-4 h-[2px] w-20 bg-[#c89a55]" data-hero-divider />
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href={selectedOfferHref}
                className="inline-flex items-center justify-center border border-[#c89a55] bg-[#c89a55] px-8 py-3 text-sm uppercase tracking-[0.18em] text-black"
                data-cursor="hover"
              >
                Check Package Availability
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-white/20 px-8 py-3 text-sm uppercase tracking-[0.18em] text-white transition-colors hover:border-[#c89a55]/50 hover:text-[#f0ddbd]"
                data-cursor="hover"
              >
                Contact The Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[96rem] px-8 py-14 text-center" data-stage-section>
        <nav aria-label="Breadcrumb" className="flex items-center justify-center">
          <ol className="inline-flex items-center gap-3 rounded-full border border-[#c89a55]/20 bg-[#182920]/85 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/78 backdrop-blur-sm md:text-xs">
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
        <h2 className="mx-auto mt-8 max-w-6xl text-balance text-3xl font-semibold leading-[1.35] md:text-4xl" data-stage-line>
          {activeTitle}
        </h2>
        <p className="mx-auto mt-6 max-w-6xl text-balance text-xl leading-[1.6] text-white/80 md:text-2xl" data-stage-line>
          {activeDescription}
        </p>
      </section>

      <section className="py-8 text-center">
        <Link
          href={selectedOfferHref}
          className="inline-flex items-center justify-center border border-[#c89a55] bg-[#182920] px-14 py-4 text-sm uppercase tracking-[0.22em] text-white transition hover:scale-[1.03] hover:bg-[#203429]"
          data-cursor="hover"
        >
          {visibleOffers.length === 1 ? "CHECK PACKAGE AVAILABILITY" : intro.cta}
        </Link>
      </section>

      <section className="mx-auto grid max-w-[96rem] gap-16 px-8 pb-20 pt-8">
        {visibleOffers.map((offer, index) => {
          const textFirst = index % 2 === 1;
          return (
            <article
              key={offer.title}
              className="grid items-start overflow-hidden rounded-[2rem] border border-[#c89a55]/14 bg-[#16261f] shadow-[0_24px_50px_rgba(10,18,12,0.24)] md:grid-cols-2"
              data-card
            >
              <div className={textFirst ? "order-1 bg-[#16261f] p-8 md:order-1 md:p-12" : "order-2 bg-[#16261f] p-8 md:order-2 md:p-12"}>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b88948]">Package Overview</p>
                <h3 className="mt-4 text-3xl leading-[1.15] text-[#f4ead9] md:text-4xl" data-section-title>
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
                <div className="mt-8 rounded-[1.5rem] border border-[#c89a55]/20 bg-black/20 px-5 py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b88948]">Pricing Note</p>
                  <p className="mt-3 text-base leading-[1.7] text-white/75 md:text-lg">{contactLine}</p>
                </div>
                <Link
                  href={getOfferBookingHref(offer)}
                  className="mt-8 inline-flex items-center justify-center border border-[#182920] bg-[#182920] px-12 py-4 text-sm uppercase tracking-[0.18em] text-white transition hover:scale-[1.03] hover:bg-[#22372c]"
                  data-cursor="hover"
                >
                  CHECK PACKAGE AVAILABILITY
                </Link>
              </div>

              <div className={textFirst ? "order-2 relative h-[30rem] overflow-hidden md:order-2 md:h-full" : "order-1 relative h-[30rem] overflow-hidden md:order-1 md:h-full"}>
                <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth="7">
                  <Image src={offer.image} alt={offer.title} fill className="object-cover" sizes="50vw" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
              </div>
            </article>
          );
        })}
      </section>

      <section className="mx-auto max-w-6xl px-8 pb-20 text-center" data-stage-section>
        <div className="rounded-[2.2rem] border border-[#c89a55]/18 bg-[#16261f] px-8 py-12 shadow-[0_24px_50px_rgba(10,18,12,0.24)] md:px-12 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c89a55]" data-stage-line>
            Booking Support
          </p>
          <h3 className="mx-auto mt-5 max-w-4xl text-balance text-3xl leading-tight text-[#f4ead9] md:text-5xl" data-stage-line>
            Need the right package for your dates and guest count?
          </h3>
          <p className="mx-auto mt-6 max-w-4xl text-lg leading-relaxed text-white/78 md:text-xl" data-stage-line>
            Check weekday or weekend availability, compare package value, and let our team guide you toward the right stay and celebration format.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={selectedOfferHref}
              className="inline-flex items-center justify-center border border-[#c89a55] bg-[#c89a55] px-8 py-3 text-sm uppercase tracking-[0.18em] text-black"
              data-cursor="hover"
            >
              Check Availability
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-white/20 px-8 py-3 text-sm uppercase tracking-[0.18em] text-white transition-colors hover:border-[#c89a55]/50 hover:text-[#f0ddbd]"
              data-cursor="hover"
            >
              Contact The Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
