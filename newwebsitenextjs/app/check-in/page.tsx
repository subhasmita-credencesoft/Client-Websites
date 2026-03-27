"use client";

import Image from "next/image";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { GlobalPageSections } from "@/components/sections/global-page-sections";
import { checkInPageData } from "@/lib/data/mountain-info-pages";

export default function CheckInPage() {
  const page = checkInPageData;

  return (
    <main className="relative overflow-hidden bg-[#2d4a3e] text-white">
      <div className="noise-overlay" />
      <SiteHeader />

      <section className="relative min-h-[110svh] overflow-hidden pt-44 md:pt-48" data-section-id={page.slug}>
        <div className="absolute inset-0" data-bg-parallax data-bg-depth="10" data-zoom-scroll>
          <Image src={page.hero.image} alt={page.hero.title} fill className="object-cover" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,164,110,0.12),transparent_38%),linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.56)_56%,rgba(0,0,0,0.92)_100%)]" />
        <div className="absolute inset-x-[8%] top-28 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[110svh] max-w-[96rem] items-start px-6 pb-8 pt-28 md:px-12 md:pb-12 md:pt-36">
          <div className="max-w-5xl" data-panel-content>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c9a46e]" data-panel-line>
              Arrival Terms
            </p>
            <h1 data-section-title data-panel-line className="max-w-5xl text-4xl md:text-6xl">
              {page.hero.title}
            </h1>
            <p className="mt-5 max-w-4xl text-xl text-white/90 md:text-2xl" data-panel-line>{page.hero.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center md:px-10" data-reveal>
        <p className="text-xs font-semibold tracking-[0.2em] text-[#c9a46e]" data-reveal-child>{page.intro.eyebrow}</p>
        <h2 className="mx-auto mt-5 max-w-5xl text-3xl leading-tight md:text-4xl" data-section-title data-reveal-child>
          {page.intro.title}
        </h2>
        <p className="mx-auto mt-6 max-w-5xl text-lg leading-relaxed md:text-xl" data-reveal-child>{page.intro.body}</p>
      </section>

      <section className="mx-auto max-w-[96rem] px-6 py-6 md:px-10">
        <div className="grid gap-8 md:grid-cols-2">
          {page.cards.map((card, index) => (
            <article
              key={card.title}
              data-card
              className="group overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0a0d0d] shadow-[0_22px_70px_rgba(0,0,0,0.28)] transition-colors duration-500 hover:border-[#c9a46e]/45"
            >
              <div className="relative h-[26rem] overflow-hidden">
                <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth={String(8 + (index % 3))}>
                  <Image src={card.image} alt={card.title} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" sizes="(max-width:768px) 100vw, 50vw" />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,10,0.08)_0%,rgba(8,10,10,0.1)_34%,rgba(8,10,10,0.88)_100%)]" />
              </div>
              <div className="px-6 pb-8 pt-8 md:px-8 md:pb-10" data-panel-content>
                <p className="text-xs uppercase tracking-[0.15em] text-[#c9a46e]" data-panel-line>{card.label}</p>
                <h3 className="mt-3 text-3xl md:text-4xl" data-panel-line>{card.title}</h3>
                <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/90 md:text-xl" data-panel-line>{card.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[96rem] px-6 py-16 md:px-10">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <div className="glass-panel rounded-[2rem] p-8" data-reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-[#c9a46e]" data-reveal-child>Highlights</p>
            <h3 className="mt-4 text-3xl md:text-4xl" data-section-title data-reveal-child>{page.highlights.title}</h3>
          </div>
          <div className="glass-panel rounded-[2rem] p-8" data-panel-content>
            <ul className="space-y-4 text-lg leading-relaxed text-white/85 md:text-xl">
              {page.highlights.items.map((item) => (
                <li key={item} data-panel-line>- {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 pt-4 text-center md:px-10" data-reveal>
        <div className="glass-panel rounded-[2.4rem] px-8 py-12 md:px-16 md:py-14">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#c9a46e]" data-reveal-child>Final Note</p>
          <h3 className="mx-auto mt-5 max-w-4xl text-3xl md:text-4xl" data-section-title data-reveal-child>
            {page.summary.title}
          </h3>
          <p className="mx-auto mt-6 max-w-4xl text-lg leading-relaxed text-white/85 md:text-xl" data-reveal-child>{page.summary.body}</p>
        </div>
      </section>

      <GlobalPageSections hideContactAndStay hideReservation />
      <SiteFooter />
    </main>
  );
}
