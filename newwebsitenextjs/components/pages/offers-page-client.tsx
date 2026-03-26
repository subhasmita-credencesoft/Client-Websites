"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { offersPageData } from "@/lib/data/showcase-pages";

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

  return (
    <>
      <section className="relative min-h-[108svh] overflow-hidden pt-44 md:pt-48" data-section-id="offers-hero">
        <div className="absolute inset-0" data-bg-parallax data-bg-depth="9">
          <Image src={heroImage} alt="Special offers and packages" fill className="object-cover" priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative z-10 mx-auto flex min-h-[108svh] max-w-[96rem] items-end justify-center px-8 pb-16 md:pb-24 text-center">
          <div>
            <h1 className="text-balance text-[clamp(42px,5.2vw,76px)] leading-[1.08] text-[#ceb17e]" data-section-title>
              {hero.title}
            </h1>
            <p className="mt-3 text-[clamp(24px,3.1vw,44px)] font-semibold tracking-wide text-white">
              {hero.subtitle}
            </p>
            <div className="mx-auto mt-4 h-[2px] w-20 bg-[#c89a55]" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[96rem] px-8 py-14 text-center">
        <p className="text-2xl text-black/90 md:text-3xl">
          Home <span className="px-1">-&gt;</span> <span className="text-[#be9557]">{intro.breadcrumb}</span>
        </p>
        <h2 className="mx-auto mt-8 max-w-6xl text-balance text-3xl font-semibold leading-[1.35] md:text-4xl" data-section-title>
          {activeTitle}
        </h2>
        <p className="mx-auto mt-6 max-w-6xl text-balance text-xl leading-[1.6] text-black/85 md:text-2xl" data-reveal>
          {activeDescription}
        </p>
      </section>

      <section className="py-8 text-center">
        <button
          type="button"
          className="bg-black px-14 py-4 text-sm uppercase tracking-[0.22em] text-white transition hover:scale-[1.03]"
          data-cursor="hover"
        >
          {intro.cta}
        </button>
      </section>

      <section className="mx-auto grid max-w-[96rem] gap-16 px-8 pb-20 pt-8">
        {visibleOffers.map((offer, index) => {
          const textFirst = index % 2 === 1;
          return (
            <article key={offer.title} className="grid items-start gap-0 md:grid-cols-2" data-card>
              <div className={textFirst ? "order-1 bg-[#e3e3e3] p-10 md:order-1" : "order-2 bg-[#e3e3e3] p-10 md:order-2"}>
                <h3 className="text-3xl leading-[1.15] md:text-4xl" data-section-title>
                  {offer.title}
                </h3>
                <div className="mt-4 h-[2px] w-20 bg-[#c89a55]" />
                <p className="mt-7 text-lg leading-[1.6] text-black/90 md:text-xl">{offer.description}</p>
                <ul className="mt-6 space-y-3 text-lg leading-[1.6] text-black/90 md:text-xl">
                  {offer.bullets.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
                <p className="mt-6 text-lg leading-[1.55] md:text-xl">{contactLine}</p>
                <button
                  type="button"
                  className="mt-6 bg-black px-12 py-4 text-sm uppercase tracking-[0.18em] text-white transition hover:scale-[1.03]"
                  data-cursor="hover"
                >
                  {intro.cta}
                </button>
              </div>

              <div className={textFirst ? "order-2 relative h-[30rem] overflow-hidden md:order-2" : "order-1 relative h-[30rem] overflow-hidden md:order-1"}>
                <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth="7">
                  <Image src={offer.image} alt={offer.title} fill className="object-cover" sizes="50vw" />
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
