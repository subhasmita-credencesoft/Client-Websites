"use client";

import Image from "next/image";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { GlobalPageSections } from "@/components/sections/global-page-sections";
import { adventureParkPageData } from "@/lib/data/showcase-pages";

export default function AdventureParkPage() {
  const { hero, intro, highlight, overview, activitiesTitle, activitiesDescription, activityCards, galleryTitle, galleryImages, testimonialImages } =
    adventureParkPageData;

  return (
    <main className="relative overflow-hidden bg-[#ececec] text-black">
      <div className="noise-overlay" />
      <SiteHeader />

      <section className="relative min-h-[108svh] overflow-hidden pt-44 md:pt-48">
        <div className="absolute inset-0" data-bg-parallax data-bg-depth="8">
          <Image
            src={hero.image}
            alt="The Mountain Adventure Park"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/18" />
        <div className="relative z-10 flex min-h-[108svh] items-end justify-center px-8 pb-16 md:pb-24 text-center text-white" data-reveal>
          <div>
            <h1 className="text-5xl tracking-wide md:text-6xl" data-section-title>
              {hero.title}
            </h1>
            <div className="mx-auto mt-4 h-[2px] w-16 bg-[#c89a55]" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[96rem] px-8 py-16">
        <p className="text-2xl text-black/85 md:text-3xl">Home &gt; <span className="font-semibold">{intro.breadcrumb}</span></p>
        <div className="mt-10 text-center">
          <h2 className="text-balance text-4xl leading-tight md:text-5xl" data-section-title>
            {intro.title}
          </h2>
          <div className="mx-auto mt-4 h-[2px] w-20 bg-[#c89a55]" />
          <p className="mx-auto mt-8 max-w-5xl text-xl leading-relaxed text-black/90 md:text-2xl">
            {intro.description}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[96rem] px-8 pb-10 text-center">
        <h3 className="text-4xl text-[#c89a55] md:text-5xl" data-section-title>
          {highlight.title}
        </h3>
        <p className="mx-auto mt-3 max-w-3xl text-xl leading-relaxed md:text-2xl">
          {highlight.lines[0]}
          <br />
          {highlight.lines[1]}
        </p>
        <div className="relative mt-8 h-[42rem] overflow-hidden" data-card>
          <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth="8">
            <Image
              src={highlight.image}
              alt="The Mountain Pickleball"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
        <button
          type="button"
          className="mt-10 bg-black px-12 py-4 text-sm uppercase tracking-[0.18em] text-white"
          data-cursor="hover"
        >
          {highlight.cta}
        </button>
      </section>

      <section className="mx-auto grid max-w-[96rem] items-center gap-12 px-8 py-16 md:grid-cols-2">
        <div className="text-xl leading-relaxed text-black/90 md:text-2xl" data-reveal>
          {overview.body}
          <div className="mt-8">
            <button
              type="button"
              className="bg-[#8f8f8f] px-12 py-4 text-sm uppercase tracking-[0.18em] text-white"
              data-cursor="hover"
            >
              {overview.cta}
            </button>
          </div>
        </div>
        <div className="relative h-[36rem] overflow-hidden" data-card>
          <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth="7">
            <Image
              src={overview.image}
              alt="Adventure park view"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[96rem] px-8 py-16 text-center">
        <h3 className="text-4xl text-[#c89a55] md:text-5xl" data-section-title>
          {activitiesTitle}
        </h3>
        <p className="mx-auto mt-6 max-w-5xl text-xl leading-relaxed text-black/90 md:text-2xl">
          {activitiesDescription}
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-6">
          {activityCards.map((activity) => (
            <article key={activity.title} className="overflow-hidden rounded-sm bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" data-card>
              <div className="relative h-[24rem] overflow-hidden">
                <div className="absolute inset-0" data-card-image>
                  <Image src={activity.image} alt={activity.title} fill className="object-cover" sizes="16vw" />
                </div>
              </div>
              <div className="px-2 py-4 text-center">
                <p className="text-2xl leading-tight md:text-3xl">{activity.title}</p>
                {activity.subtitle ? <p className="mt-1 text-3xl text-black/75">{activity.subtitle}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-8 py-12">
        <div className="mx-auto max-w-[96rem] text-center">
          <h3 className="text-4xl text-[#c89a55] md:text-5xl" data-section-title>
            {galleryTitle}
          </h3>
        </div>
        <div className="mx-auto mt-8 grid max-w-[96rem] gap-4 md:grid-cols-4">
          {galleryImages.map((image) => (
            <div key={image} className="relative h-[30rem] overflow-hidden" data-card>
              <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth="8">
                <Image src={image} alt="Adventure gallery" fill className="object-cover" sizes="25vw" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[96rem] px-8 pb-24 pt-10">
        <h3 className="text-center text-4xl text-[#c89a55] md:text-5xl" data-section-title>
          Testimonials
        </h3>
        <div className="mx-auto mt-8 grid max-w-[70rem] gap-6 md:grid-cols-2">
          {testimonialImages.map((image, index) => (
            <div key={image} className="relative h-[44rem] overflow-hidden" data-card>
              <div className="absolute inset-0" data-card-image>
                <Image src={image} alt={`Testimonial ${index + 1}`} fill className="object-cover" sizes="50vw" />
              </div>
            </div>
          ))}
        </div>
      </section>
      <GlobalPageSections />
      <SiteFooter />
    </main>
  );
}







