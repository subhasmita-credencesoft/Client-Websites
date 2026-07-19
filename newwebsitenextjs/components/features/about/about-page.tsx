import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { aboutPageContent } from "@/lib/data/content/resort-content";

export function AboutPage() {
  const content = aboutPageContent;

  return (
    <main className="relative overflow-x-hidden bg-[#21382e] text-white">
      <div className="noise-overlay" />
      <SiteHeader />

      <section className="relative min-h-[42rem] overflow-hidden pt-28 sm:min-h-[46rem] sm:pt-32 md:min-h-[52rem] md:pt-40" data-section-id="about-hero">
        <div className="absolute inset-0" data-bg-parallax data-bg-depth="9">
          <Image
            src={content.hero.image}
            alt="The Mountain Resort in Karjat , By Redwings overview"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.16)_0%,rgba(0,0,0,0.4)_34%,rgba(0,0,0,0.74)_100%)]" />
        <div className="site-container relative z-10 flex min-h-[42rem] items-center justify-center pb-12 pt-8 text-center sm:min-h-[46rem] md:min-h-[52rem] md:pb-20">
          <div className="max-w-5xl" data-reveal>
            <p className="site-eyebrow" data-reveal-child>
              {content.hero.eyebrow}
            </p>
            <h1 className="site-title-xl mt-5 text-balance" data-section-title>
              {content.hero.title}
            </h1>
            <div className="mx-auto mt-5 h-[2px] w-20 bg-[var(--color-primary)] md:w-24" />
            <p className="site-copy-lg mx-auto mt-6 max-w-4xl text-balance" data-reveal-child>
              {content.hero.description}
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4" data-reveal-child>
              <MagneticButton href="/booking?eventType=Destination%20Wedding" variant="primary">Plan Your Wedding</MagneticButton>
              <MagneticButton href="/booking?eventType=Luxury%20Stay" variant="outline" className="bg-transparent">
                Reserve Your Stay
              </MagneticButton>
            </div>
            <p className="mt-14 text-sm uppercase tracking-[0.2em] text-white/85" data-reveal-child>Discover The Estate</p>
          </div>
        </div>
      </section>

      <div className="content-auto-section">
      <section className="mx-auto max-w-[80rem] px-4 py-12 md:px-8 md:py-14">
        <div className="mb-8 flex justify-center">
          <Breadcrumbs items={[{ label: "About" }]} />
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {content.stats.map((stat) => (
            <article key={stat.label} className="rounded-[1.7rem] border border-white/10 bg-[var(--section-surface-soft)] px-6 py-6" data-card>
              <p className="text-3xl text-[var(--color-text-primary)] md:text-4xl" data-reveal-child>{stat.value}</p>
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-[var(--color-primary)]" data-reveal-child>{stat.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[var(--section-surface)] px-4 py-16 md:px-8 md:py-24" data-section-id="about-story">
        <div className="mx-auto grid max-w-[80rem] gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="relative h-[18rem] overflow-hidden rounded-[2rem] md:h-[34rem]" data-reveal>
            <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth="8">
              <Image
                src={content.story.image}
                alt="The Mountain destination landscape"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40rem"
              />
            </div>
          </div>

          <div data-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]" data-reveal-child>{content.story.eyebrow}</p>
            <h2 className="site-title-lg mt-5 max-w-4xl text-balance" data-section-title>
              {content.story.title}
            </h2>
            <div className="site-copy mt-7 space-y-5 md:text-lg">
              {content.story.paragraphs.map((paragraph) => (
                <p key={paragraph} data-reveal-child>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 rounded-[1.8rem] border border-[var(--color-primary)]/25 bg-[#21382e] p-6" data-reveal-child>
              <p className="text-xl leading-relaxed text-[var(--color-text-primary)] md:text-2xl">{content.story.quote}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[80rem] px-4 py-16 md:px-8 md:py-24" data-section-id="about-ethos">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div data-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]" data-reveal-child>{content.ethos.eyebrow}</p>
            <h2 className="site-title-lg mt-5 max-w-3xl text-balance" data-section-title>
              {content.ethos.title}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg" data-reveal-child>
              {content.ethos.description}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {content.ethos.cards.map((card) => (
              <article key={card.title} className="rounded-[2rem] border border-white/10 bg-[var(--section-surface)] p-7 shadow-[0_20px_40px_rgba(7,14,10,0.14)]" data-card>
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-primary)]">Ethos</p>
                <h3 className="mt-4 text-2xl leading-tight text-[var(--color-text-primary)]" data-section-title>{card.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-white/76" data-reveal-child>{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[80rem] px-4 py-16 md:px-8 md:py-24" data-section-id="about-pillars">
        <SectionHeading
          eyebrow={content.pillars.eyebrow}
          title={content.pillars.title}
          className="max-w-4xl text-left md:text-center"
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.pillars.items.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#1b2f25]" data-card>
              <div className="relative h-[18rem]">
                <div className="h-full w-full will-transform" data-card-image data-bg-parallax data-bg-depth="7">
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
                </div>
              </div>
              <div className="p-7">
                <h3 className="text-2xl leading-tight text-[var(--color-text-primary)]" data-section-title>{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-white/78" data-reveal-child>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[var(--section-surface)] px-4 py-16 md:px-8 md:py-24" data-section-id="about-message">
        <div className="mx-auto grid max-w-[80rem] gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="glass-panel overflow-hidden rounded-[2.2rem] p-3" data-reveal>
            <div className="relative h-[20rem] overflow-hidden rounded-[1.7rem] md:h-[36rem]">
              <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth="8">
                <Image
                  src={content.founder.image}
                  alt="The Mountain hospitality vision"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40rem"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
            </div>
          </div>
          <div data-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]" data-reveal-child>{content.founder.eyebrow}</p>
            <h2 className="mt-5 max-w-4xl text-balance text-3xl leading-tight text-[var(--color-text-primary)] md:text-5xl" data-section-title>
              {content.founder.title}
            </h2>
            <p className="mt-7 max-w-3xl text-base leading-relaxed text-white/80 md:text-lg" data-reveal-child>
              {content.founder.body}
            </p>
            <div className="mt-8 rounded-[1.8rem] border border-[var(--color-primary)]/20 bg-[#21382e] p-6" data-reveal-child>
              <p className="text-sm uppercase tracking-[0.24em] text-[var(--color-primary)]">Signature</p>
              <p className="mt-3 text-2xl text-[var(--color-text-primary)] md:text-3xl">{content.founder.signature}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[80rem] px-4 py-16 md:px-8 md:py-24" data-section-id="about-journey">
        <SectionHeading
          eyebrow={content.journey.eyebrow}
          title={content.journey.title}
          className="max-w-4xl text-left md:text-center"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {content.journey.items.map((item) => (
            <article key={item.title} className="rounded-[2rem] border border-white/10 bg-[var(--section-surface)] p-7 shadow-[0_20px_40px_rgba(7,14,10,0.14)]" data-card>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-primary)]">{item.year}</p>
              <h3 className="mt-4 text-2xl leading-tight text-[var(--color-text-primary)] md:text-3xl" data-section-title>{item.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-white/76 md:text-lg" data-reveal-child>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[var(--section-surface)] px-4 py-16 md:px-8 md:py-24" data-section-id="about-hosting">
        <div className="mx-auto grid max-w-[80rem] gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div data-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]" data-reveal-child>{content.hosting.eyebrow}</p>
            <h2 className="mt-5 max-w-4xl text-balance text-3xl leading-tight text-[var(--color-text-primary)] md:text-5xl" data-section-title>
              {content.hosting.title}
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/80 md:text-lg" data-reveal-child>
              {content.hosting.description}
            </p>
            <div className="mt-8 grid gap-4">
              {content.hosting.bullets.map((bullet) => (
                <div key={bullet} className="rounded-[1.4rem] border border-white/10 bg-[#21382e] px-5 py-4 text-white/85" data-reveal-child>
                  {bullet}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] p-3" data-reveal>
            <div className="relative h-[20rem] overflow-hidden rounded-[1.6rem] md:h-[36rem]">
              <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth="8">
                <Image
                  src={content.hosting.image}
                  alt="Event hosting at The Mountain Resort in Karjat , By Redwings"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40rem"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[80rem] px-4 py-16 md:px-8 md:py-24" data-section-id="about-impact">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="glass-panel rounded-[2rem] p-3" data-reveal>
            <div className="relative h-[20rem] overflow-hidden rounded-[1.6rem] md:h-[35rem]">
              <div className="absolute inset-0" data-card-image data-bg-parallax data-bg-depth="8">
                <Image
                  src={content.impact.image}
                  alt="Responsible hospitality at The Mountain"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40rem"
                />
              </div>
            </div>
          </div>
          <div data-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]" data-reveal-child>{content.impact.eyebrow}</p>
            <h2 className="mt-5 max-w-4xl text-balance text-3xl leading-tight text-[var(--color-text-primary)] md:text-5xl" data-section-title>
              {content.impact.title}
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/80 md:text-lg" data-reveal-child>
              {content.impact.description}
            </p>
            <div className="mt-8 grid gap-4">
              {content.impact.bullets.map((bullet) => (
                <div key={bullet} className="rounded-[1.4rem] border border-white/10 bg-[#21382e] px-5 py-4 text-white/85" data-reveal-child>
                  {bullet}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[80rem] px-4 py-16 md:px-8 md:py-24" data-section-id="about-cta">
        <div className="rounded-[2.4rem] border border-[var(--color-primary)]/20 bg-[var(--section-surface-soft)] px-6 py-12 text-center md:px-10 md:py-16" data-reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]" data-reveal-child>{content.cta.eyebrow}</p>
          <h2 className="site-title-lg mx-auto mt-5 max-w-4xl text-balance" data-section-title>
            {content.cta.title}
          </h2>
          <p className="site-copy mx-auto mt-6 max-w-3xl md:text-lg" data-reveal-child>
            {content.cta.description}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4" data-reveal-child>
            <MagneticButton href="/offers" variant="primary">Explore Packages</MagneticButton>
            <Link
              href="/booking?eventType=Destination%20Wedding"
              className="site-button site-button-outline px-7"
            >
              Check Venue Availability
            </Link>
          </div>
        </div>
      </section>

      </div>
      <SiteFooter />
    </main>
  );
}
