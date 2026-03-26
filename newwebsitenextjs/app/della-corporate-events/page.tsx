"use client";

import Image from "next/image";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { GlobalPageSections } from "@/components/sections/global-page-sections";
import { corporateEventsPageData } from "@/lib/data/showcase-pages";

export default function CorporateEventsPage() {
  const { hero, intro, featureSection, whyCards, venueImages, venuesSection, testimonial, clientLogos } =
    corporateEventsPageData;

  return (
    <main className="relative overflow-hidden bg-[#ececec] text-black">
      <div className="noise-overlay" />
      <SiteHeader />

      <section className="relative min-h-[108svh] overflow-hidden pt-44 md:pt-48">
        <div className="absolute inset-0" data-bg-parallax data-bg-depth="8">
          <Image src={hero.image} alt="Corporate MICE hero" fill className="object-cover" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 mx-auto flex min-h-[108svh] max-w-[96rem] items-end px-8 pb-16 text-white md:pb-24" data-reveal>
          <h1 className="max-w-5xl text-balance text-4xl leading-tight md:text-6xl">{hero.title}</h1>
          <p className="mt-5 text-xl text-white/90 md:text-2xl">{hero.subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[96rem] px-8 py-20">
        <h2 className="max-w-5xl whitespace-pre-line text-balance text-4xl leading-tight text-[#c89a55] md:text-5xl" data-section-title>
          {intro.title}
        </h2>
        <div className="mt-10 border-l border-black/25 pl-8 text-xl leading-relaxed text-black/90 md:text-2xl" data-reveal>
          {intro.body}
        </div>
      </section>

      <section className="px-8 py-12">
        <div className="mx-auto grid max-w-[96rem] items-center gap-10 md:grid-cols-2">
          <article className="bg-black px-10 py-12 text-white" data-card>
            <h3 className="text-4xl leading-tight text-[#c89a55] md:text-5xl" data-section-title>
              {featureSection.title[0]}
              <br />
              {featureSection.title[1]}
            </h3>
            <div className="mt-5 h-[2px] w-20 bg-[#c89a55]" />
            {featureSection.body.map((paragraph) => (
              <p key={paragraph} className="mt-6 text-xl leading-relaxed text-white/90 first:mt-7 md:text-2xl">
                {paragraph}
              </p>
            ))}
            <button
              type="button"
              className="mt-9 border border-white px-9 py-3 text-sm uppercase tracking-[0.16em]"
              data-cursor="hover"
            >
              {featureSection.cta}
            </button>
          </article>

          <div className="relative h-[40rem] overflow-hidden" data-card>
            <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth="9">
              <Image src={featureSection.image} alt="Corporate venue" fill className="object-cover" sizes="50vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 py-20">
        <div className="mx-auto max-w-[96rem] text-center">
          <h3 className="text-4xl text-[#c89a55] md:text-5xl" data-section-title>
            Why The Mountain Resorts ?
          </h3>
          <div className="mx-auto mt-4 h-[2px] w-20 bg-[#c89a55]" />
        </div>
        <div className="mx-auto mt-10 grid max-w-[96rem] gap-5 md:grid-cols-4">
          {whyCards.map((card) => (
            <article key={card.title} data-card>
              <div className="relative h-[26rem] overflow-hidden">
                <div className="absolute inset-0" data-card-image>
                  <Image src={card.image} alt={card.title} fill className="object-cover" sizes="25vw" />
                </div>
              </div>
              <p className="mt-4 text-2xl leading-tight text-black/85 md:text-3xl">{card.title}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-black px-8 py-20 text-white">
        <div className="mx-auto max-w-[96rem] text-center">
          <h3 className="text-4xl text-[#c89a55] md:text-5xl" data-section-title>
            {venuesSection.title}
          </h3>
          <div className="mx-auto mt-4 h-[2px] w-20 bg-[#c89a55]" />
        </div>
        <div className="mx-auto mt-10 grid max-w-[96rem] gap-4 md:grid-cols-4">
          {venueImages.map((img) => (
            <div key={img} className="relative h-[20rem] overflow-hidden" data-card>
              <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth="8">
                <Image src={img} alt="Venue" fill className="object-cover" sizes="25vw" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <button
            type="button"
            className="border border-white px-12 py-4 text-sm uppercase tracking-[0.18em]"
            data-cursor="hover"
          >
            {venuesSection.cta}
          </button>
        </div>
      </section>

      <section className="bg-black px-8 pb-16 pt-2 text-white">
        <div className="mx-auto max-w-[96rem]" data-card>
          <p className="mb-4 text-4xl text-[#c89a55] md:text-5xl">&ldquo;</p>
          <div className="relative h-[42rem] overflow-hidden">
            <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth="7">
              <Image src={testimonial.image} alt="Testimonial video" fill className="object-cover" sizes="100vw" />
            </div>
            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute left-8 top-8">
              <p className="text-2xl md:text-3xl">{testimonial.label}</p>
              <h4 className="mt-2 text-3xl font-semibold md:text-4xl">{testimonial.title}</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 py-18">
        <div className="mx-auto max-w-[96rem] text-center" data-reveal>
          <h3 className="text-4xl text-[#c89a55] md:text-5xl" data-section-title>
            Our Clients
          </h3>
          <div className="mx-auto mt-4 h-[2px] w-20 bg-[#c89a55]" />
        </div>
        <div className="mx-auto mt-10 grid max-w-[96rem] gap-6 md:grid-cols-5">
          {clientLogos.map((logo) => (
            <div key={logo} className="flex h-40 items-center justify-center bg-[#ececec] px-4 text-center text-2xl font-semibold text-black/75 md:text-3xl">
              {logo}
            </div>
          ))}
        </div>
      </section>
      <GlobalPageSections />
      <SiteFooter />
    </main>
  );
}
