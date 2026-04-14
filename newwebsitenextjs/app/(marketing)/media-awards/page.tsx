import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { GlobalPageSections } from "@/components/features/shared/global-page-sections";
import { DIRECT_BOOKING_ENGINE_URL } from "@/lib/constants/booking";
import { mediaAwardsPageData } from "@/lib/data/pages/info-pages";

export default function MediaAwardsPage() {
  const page = mediaAwardsPageData;

  return (
    <main className="relative overflow-hidden bg-[#11100e] text-white">
      <div className="noise-overlay" />
      <SiteHeader />

      <section className="relative min-h-[110svh] overflow-hidden pt-44 md:pt-48" data-section-id={page.slug}>
        <div className="absolute inset-0" data-bg-parallax data-bg-depth="10" data-zoom-scroll>
          <Image src={page.hero.image} alt={page.hero.title} fill className="object-cover" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,164,110,0.12),transparent_38%),linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.56)_56%,rgba(0,0,0,0.92)_100%)]" />
        <div className="absolute inset-x-[8%] top-28 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="site-container relative z-10 flex min-h-[110svh] max-w-[96rem] items-start pb-8 pt-28 md:pb-12 md:pt-36">
          <div className="max-w-5xl" data-panel-content>
            <p className="site-eyebrow" data-panel-line>
              Brand Presentation
            </p>
            <h1 data-section-title data-panel-line className="max-w-5xl">
              {page.hero.title}
            </h1>
            <p className="site-copy-lg mt-5 max-w-4xl text-white/90" data-panel-line>{page.hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/gallery"
                className="site-button site-button-primary px-8"
              >
                View Gallery
              </Link>
              <Link
                href={DIRECT_BOOKING_ENGINE_URL}
                className="site-button site-button-outline px-8"
              >
                Check Availability
              </Link>
            </div>
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
          {page.cards.map((card) => (
            <article
              key={card.title}
              data-card
              className="rounded-[1.8rem] border border-white/10 bg-[#111614] p-8 shadow-[0_22px_70px_rgba(0,0,0,0.22)] transition-colors duration-500 hover:border-[#c9a46e]/35 md:p-10"
            >
              <div className="flex items-start gap-4" data-panel-content>
                <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-[#c9a46e]" />
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.15em] text-[#c9a46e]" data-panel-line>{card.label}</p>
                  <h3 className="mt-3 text-3xl md:text-4xl" data-panel-line>{card.title}</h3>
                  <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/90 md:text-xl" data-panel-line>{card.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[96rem] px-6 py-16 md:px-10">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[#182920] p-8" data-reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-[#c9a46e]" data-reveal-child>Highlights</p>
            <h3 className="mt-4 text-3xl md:text-4xl" data-section-title data-reveal-child>{page.highlights.title}</h3>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-[#182920] p-8" data-panel-content>
            <ul className="space-y-4 text-lg leading-relaxed text-white/85 md:text-xl">
              {page.highlights.items.map((item) => (
                <li key={item} data-panel-line>- {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {page.extraSections ? (
        <section className="mx-auto max-w-[96rem] px-6 py-4 md:px-10">
          <div className="grid gap-8 md:grid-cols-2">
            {page.extraSections.map((section) => (
              <article key={section.title} className="rounded-[2rem] border border-white/10 bg-[#182920] p-8" data-reveal>
                <p className="text-xs uppercase tracking-[0.2em] text-[#c9a46e]" data-reveal-child>Perspective</p>
                <h3 className="mt-4 text-3xl md:text-4xl" data-section-title data-reveal-child>{section.title}</h3>
                <p className="mt-5 text-lg leading-relaxed text-white/85 md:text-xl" data-reveal-child>{section.body}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-6 pb-20 pt-10 text-center md:px-10" data-reveal>
        <div className="rounded-[2.4rem] border border-white/10 bg-[#182920] px-8 py-12 md:px-16 md:py-14">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#c9a46e]" data-reveal-child>Final Note</p>
          <h3 className="mx-auto mt-5 max-w-4xl text-3xl md:text-4xl" data-section-title data-reveal-child>
            {page.summary.title}
          </h3>
          <p className="mx-auto mt-6 max-w-4xl text-lg leading-relaxed text-white/85 md:text-xl" data-reveal-child>{page.summary.body}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4" data-reveal-child>
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center border border-[#c8a871] bg-[#c8a871] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-black"
            >
              View Gallery
            </Link>
            <Link
              href={DIRECT_BOOKING_ENGINE_URL}
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white/88 transition-colors hover:border-[#c9a46e]/40 hover:text-white"
            >
              Check Availability
            </Link>
          </div>
        </div>
      </section>

      <GlobalPageSections hideContactAndStay hideReservation />
      <SiteFooter />
    </main>
  );
}
