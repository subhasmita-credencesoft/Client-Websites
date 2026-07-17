import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { GlobalPageSections } from "@/components/features/shared/global-page-sections";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { DIRECT_BOOKING_ENGINE_URL } from "@/lib/constants/booking";
import type { MountainInfoPageData } from "@/lib/data/pages/info-pages";

type InfoPageViewProps = {
  page: MountainInfoPageData;
  heroEyebrow: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  cardIntroLabel?: string;
  extraSectionLabel?: string;
  finalNoteLabel?: string;
  hideGlobalSections?: boolean;
  hideReservation?: boolean;
  accentTags?: string[];
};

export function InfoPageView({
  page,
  heroEyebrow,
  primaryCtaLabel = "Check Availability",
  primaryCtaHref = DIRECT_BOOKING_ENGINE_URL,
  secondaryCtaLabel = "Contact The Team",
  secondaryCtaHref = "/contact",
  cardIntroLabel,
  extraSectionLabel = "Planning Note",
  finalNoteLabel = "Final Note",
  hideGlobalSections = false,
  hideReservation = true,
  accentTags,
}: InfoPageViewProps) {
  return (
    <main className="relative overflow-hidden bg-[#11100e] text-white">
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
              {heroEyebrow}
            </p>
            <h1 data-section-title data-panel-line className="max-w-5xl">
              {page.hero.title}
            </h1>
            <p className="site-copy-lg mt-5 max-w-4xl text-white/90" data-panel-line>
              {page.hero.subtitle}
            </p>

            {accentTags?.length ? (
              <div className="mt-10 flex flex-wrap gap-4 text-sm uppercase tracking-[0.24em] text-white/75" data-panel-line>
                {accentTags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/20 bg-black/20 px-5 py-3 backdrop-blur-md">
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <Link href={primaryCtaHref} className="site-button site-button-primary px-8">
                  {primaryCtaLabel}
                </Link>
                <Link href={secondaryCtaHref} className="site-button site-button-outline px-8">
                  {secondaryCtaLabel}
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <Breadcrumbs items={[{ label: page.hero.title }]} />
      </div>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center md:px-8 md:py-20" data-reveal>
        <p className="text-xs font-semibold tracking-[0.2em] text-[#c9a46e]" data-reveal-child>{page.intro.eyebrow}</p>
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

      <section className="mx-auto max-w-[80rem] px-4 py-16 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[#182920] p-8" data-reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-[#c9a46e]" data-reveal-child>
              {cardIntroLabel ?? "Highlights"}
            </p>
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
        <section className="mx-auto max-w-[80rem] px-4 py-4 md:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {page.extraSections.map((section) => (
              <article key={section.title} className="rounded-[2rem] border border-white/10 bg-[#182920] p-8" data-reveal>
                <p className="text-xs uppercase tracking-[0.2em] text-[#c9a46e]" data-reveal-child>{extraSectionLabel}</p>
                <h3 className="mt-4 text-3xl md:text-4xl" data-section-title data-reveal-child>{section.title}</h3>
                <p className="mt-5 text-lg leading-relaxed text-white/85 md:text-xl" data-reveal-child>{section.body}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {page.checklist ? (
        <section className="mx-auto max-w-[80rem] px-4 py-16 md:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-[#182920] p-8 md:p-10" data-reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-[#c9a46e]" data-reveal-child>Checklist</p>
            <h3 className="mt-4 text-3xl md:text-4xl" data-section-title data-reveal-child>{page.checklist.title}</h3>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {page.checklist.items.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-lg text-white/90 md:text-xl" data-card>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 pb-20 pt-4 text-center md:px-8" data-reveal>
        <div className="rounded-[2.4rem] border border-white/10 bg-[#182920] px-8 py-12 md:px-16 md:py-14">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#c9a46e]" data-reveal-child>{finalNoteLabel}</p>
          <h3 className="mx-auto mt-5 max-w-4xl text-3xl md:text-4xl" data-section-title data-reveal-child>
            {page.summary.title}
          </h3>
          <p className="mx-auto mt-6 max-w-4xl text-lg leading-relaxed text-white/85 md:text-xl" data-reveal-child>{page.summary.body}</p>
          {!accentTags?.length ? (
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4" data-reveal-child>
              <Link href={primaryCtaHref} className="inline-flex items-center justify-center border border-[#c8a871] bg-[#c8a871] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-black">
                {primaryCtaLabel}
              </Link>
              <Link href={secondaryCtaHref} className="inline-flex items-center justify-center rounded-full border border-white/15 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white/88 transition-colors hover:border-[#c9a46e]/40 hover:text-white">
                {secondaryCtaLabel}
              </Link>
            </div>
          ) : null}
        </div>
      </section>

      {page.contact ? (
        <section className="mx-auto max-w-6xl px-4 pb-20 pt-0 text-center md:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-[#182920] p-8 md:p-10" data-reveal>
            <p className="text-xs font-semibold tracking-[0.2em] text-[#c9a46e]" data-reveal-child>Contact</p>
            <h3 className="mx-auto mt-5 max-w-4xl text-3xl md:text-4xl" data-section-title data-reveal-child>{page.contact.title}</h3>
            <div className="mt-8 space-y-3 text-lg text-white/90 md:text-xl">
              {page.contact.lines.map((line) => (
                <p key={line} data-reveal-child>{line}</p>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {hideGlobalSections ? null : <GlobalPageSections hideContactAndStay hideReservation={hideReservation} />}
      <SiteFooter />
    </main>
  );
}
