import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { GlobalPageSections } from "@/components/features/shared/global-page-sections";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import type { LandingPageData } from "@/lib/data/pages/landing-pages";
import { relatedLandingPages } from "@/lib/data/pages/landing-pages";

type LandingPageViewProps = {
  page: LandingPageData;
};

export function LandingPageView({ page }: LandingPageViewProps) {
  return (
    <main className="relative overflow-hidden bg-[var(--section-dark)] text-[var(--color-text-primary)]">
      <div className="noise-overlay" />
      <SiteHeader />

      <section className="relative min-h-[42rem] overflow-hidden pt-28 sm:min-h-[46rem] sm:pt-32 md:min-h-[54rem] md:pt-40" data-section-id={page.slug}>
        <div className="absolute inset-0" data-bg-parallax data-bg-depth="10" data-zoom-scroll>
          <Image src={page.hero.image} alt={page.hero.title} fill className="object-cover" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,164,110,0.12),transparent_38%),linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.56)_56%,rgba(0,0,0,0.92)_100%)]" />
        <div className="site-container relative z-10 flex min-h-[42rem] items-start pb-8 pt-16 sm:min-h-[46rem] md:min-h-[54rem] md:pb-12 md:pt-24">
          <div className="max-w-5xl" data-panel-content>
            <p className="site-eyebrow" data-panel-line>
              {page.intro.eyebrow}
            </p>
            <h1 data-section-title data-panel-line className="max-w-5xl">
              {page.hero.title}
            </h1>
            <p className="site-copy-lg mt-5 max-w-4xl text-white/90" data-panel-line>
              {page.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4" data-panel-line>
              {page.cta ? (
                <>
                  <Link href={page.cta.primary.href} className="site-button site-button-primary px-8">
                    {page.cta.primary.label}
                  </Link>
                  <Link href={page.cta.secondary.href} className="site-button site-button-outline px-8">
                    {page.cta.secondary.label}
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/booking" className="site-button site-button-primary px-8">
                    Check Availability
                  </Link>
                  <Link href="/contact" className="site-button site-button-outline px-8">
                    Contact The Team
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <Breadcrumbs items={[{ label: page.hero.title }]} />
      </div>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center md:px-8 md:py-20" data-reveal>
        <p className="text-xs font-semibold tracking-[0.2em] text-[var(--color-primary)]" data-reveal-child>{page.intro.eyebrow}</p>
        <h2 className="mx-auto mt-5 max-w-5xl text-3xl leading-tight md:text-4xl" data-section-title data-reveal-child>
          {page.intro.title}
        </h2>
        <p className="mx-auto mt-6 max-w-5xl text-lg leading-relaxed md:text-xl" data-reveal-child>{page.intro.body}</p>
      </section>

      <section className="mx-auto max-w-[80rem] px-4 py-6 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {page.cards.map((card) => (
            <article
              key={card.title}
              data-card
              className="rounded-[1.8rem] border border-white/10 bg-[#111614] p-8 shadow-[0_22px_70px_rgba(0,0,0,0.22)] transition-colors duration-500 hover:border-[var(--color-primary)]/35 md:p-10"
            >
              <div className="flex items-start gap-4" data-panel-content>
                <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-[var(--color-primary)]" />
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-primary)]" data-panel-line>{card.label}</p>
                  <h3 className="mt-3 text-3xl md:text-4xl" data-panel-line>{card.title}</h3>
                  <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/90 md:text-xl" data-panel-line>{card.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[80rem] px-4 py-16 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[var(--section-surface)] p-6 md:p-8" data-reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-primary)]" data-reveal-child>Highlights</p>
            <h3 className="mt-4 text-3xl md:text-4xl" data-section-title data-reveal-child>{page.highlights.title}</h3>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-[var(--section-surface)] p-6 md:p-8" data-panel-content>
            <ul className="space-y-4 text-lg leading-relaxed text-white/85 md:text-xl">
              {page.highlights.items.map((item) => (
                <li key={item} data-panel-line>- {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {page.extraSections?.length ? (
        <section className="mx-auto max-w-[80rem] px-4 py-4 md:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {page.extraSections.map((section) => (
              <article key={section.title} className="rounded-[2rem] border border-white/10 bg-[var(--section-surface)] p-6 md:p-8" data-reveal>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-primary)]" data-reveal-child>Planning Note</p>
                <h3 className="mt-4 text-3xl md:text-4xl" data-section-title data-reveal-child>{section.title}</h3>
                <p className="mt-5 text-lg leading-relaxed text-white/85 md:text-xl" data-reveal-child>{section.body}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 pb-20 pt-4 text-center md:px-8" data-reveal>
        <div className="rounded-[2.4rem] border border-white/10 bg-[var(--section-surface)] px-8 py-12 md:px-16 md:py-14">
          <p className="text-xs font-semibold tracking-[0.2em] text-[var(--color-primary)]" data-reveal-child>Final Note</p>
          <h3 className="mx-auto mt-5 max-w-4xl text-3xl md:text-4xl" data-section-title data-reveal-child>
            {page.summary.title}
          </h3>
          <p className="mx-auto mt-6 max-w-4xl text-lg leading-relaxed text-white/85 md:text-xl" data-reveal-child>{page.summary.body}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4" data-reveal-child>
            {page.cta ? (
              <>
                <Link href={page.cta.primary.href} className="inline-flex items-center justify-center border border-[var(--color-primary-hover)] bg-[var(--color-primary-hover)] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-black">
                  {page.cta.primary.label}
                </Link>
                <Link href={page.cta.secondary.href} className="inline-flex items-center justify-center rounded-full border border-white/15 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white/88 transition-colors hover:border-[var(--color-primary)]/40 hover:text-white">
                  {page.cta.secondary.label}
                </Link>
              </>
            ) : (
              <>
                <Link href="/booking" className="inline-flex items-center justify-center border border-[var(--color-primary-hover)] bg-[var(--color-primary-hover)] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-black">
                  Check Availability
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-white/15 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white/88 transition-colors hover:border-[var(--color-primary)]/40 hover:text-white">
                  Contact The Team
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {relatedLandingPages[page.slug] ? (
        <section className="mx-auto max-w-6xl px-4 pb-16 md:px-8" data-reveal>
          <p className="text-center text-xs font-semibold tracking-[0.2em] text-[var(--color-primary)]" data-reveal-child>Explore More</p>
          <h3 className="mt-4 text-center text-2xl md:text-3xl" data-section-title data-reveal-child>Related Experiences</h3>
          <div className="mt-8 flex flex-wrap justify-center gap-3" data-reveal-child>
            {relatedLandingPages[page.slug].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold tracking-wide text-white/85 transition-colors hover:border-[var(--color-primary)]/40 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <GlobalPageSections hideContactAndStay hideReservation />
      <SiteFooter />
    </main>
  );
}
