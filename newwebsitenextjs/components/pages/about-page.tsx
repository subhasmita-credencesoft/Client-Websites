import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { aboutPageContent } from "@/lib/data/resort-content";

export function AboutPage() {
  const content = aboutPageContent;

  return (
    <main className="relative overflow-x-hidden bg-[#21382e] text-white">
      <div className="noise-overlay" />
      <SiteHeader />

      <section className="mx-auto max-w-[96rem] px-6 pb-16 pt-44 md:px-12 md:pb-24 md:pt-48" data-section-id="about-hero">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div data-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d5b07a]" data-reveal-child>{content.hero.eyebrow}</p>
            <h1 className="mt-5 max-w-5xl text-balance text-4xl leading-tight text-[#f6ead8] md:text-6xl" data-section-title>
              {content.hero.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/82 md:text-xl" data-reveal-child>
              {content.hero.description}
            </p>
            <div className="mt-9 flex flex-wrap gap-4" data-reveal-child>
              <MagneticButton href="/booking">Book now</MagneticButton>
              <MagneticButton href="/contact" className="bg-transparent">
                Contact us
              </MagneticButton>
            </div>
          </div>

          <div className="glass-panel overflow-hidden rounded-[2.2rem] p-3" data-reveal>
            <div className="relative h-[22rem] overflow-hidden rounded-[1.7rem] md:h-[32rem]">
              <Image
                src={content.hero.image}
                alt="The Mountain Resorts overview"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 42rem"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {content.stats.map((stat) => (
            <article key={stat.label} className="rounded-[1.7rem] border border-white/10 bg-[#294236] px-6 py-6" data-card>
              <p className="text-3xl text-[#f6ead8] md:text-4xl" data-reveal-child>{stat.value}</p>
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-[#d5b07a]" data-reveal-child>{stat.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#182920] px-6 py-20 md:px-12 md:py-28" data-section-id="about-story">
        <div className="mx-auto grid max-w-[96rem] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="relative h-[22rem] overflow-hidden rounded-[2rem] md:h-[34rem]" data-reveal>
            <Image
              src={content.story.image}
              alt="The Mountain destination landscape"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40rem"
            />
          </div>

          <div data-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d5b07a]" data-reveal-child>{content.story.eyebrow}</p>
            <h2 className="mt-5 max-w-4xl text-balance text-3xl leading-tight text-[#f6ead8] md:text-5xl" data-section-title>
              {content.story.title}
            </h2>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-white/80 md:text-lg">
              {content.story.paragraphs.map((paragraph) => (
                <p key={paragraph} data-reveal-child>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 rounded-[1.8rem] border border-[#d5b07a]/25 bg-[#21382e] p-6" data-reveal-child>
              <p className="text-xl leading-relaxed text-[#f6ead8] md:text-2xl">{content.story.quote}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[96rem] px-6 py-20 md:px-12 md:py-28" data-section-id="about-pillars">
        <SectionHeading
          eyebrow={content.pillars.eyebrow}
          title={content.pillars.title}
          className="max-w-4xl text-left md:text-center"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {content.pillars.items.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#1b2f25]" data-card>
              <div className="relative h-[18rem]">
                <div className="h-full w-full will-transform" data-card-image>
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
                </div>
              </div>
              <div className="p-7">
                <h3 className="text-2xl leading-tight text-[#f6ead8]" data-section-title>{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-white/78" data-reveal-child>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#182920] px-6 py-20 md:px-12 md:py-28" data-section-id="about-hosting">
        <div className="mx-auto grid max-w-[96rem] gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div data-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d5b07a]" data-reveal-child>{content.hosting.eyebrow}</p>
            <h2 className="mt-5 max-w-4xl text-balance text-3xl leading-tight text-[#f6ead8] md:text-5xl" data-section-title>
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
            <div className="relative h-[24rem] overflow-hidden rounded-[1.6rem] md:h-[36rem]">
              <Image
                src={content.hosting.image}
                alt="Event hosting at The Mountain Resorts"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40rem"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[96rem] px-6 py-20 md:px-12 md:py-28" data-section-id="about-cta">
        <div className="rounded-[2.4rem] border border-[#d5b07a]/20 bg-[#243b31] px-6 py-12 text-center md:px-10 md:py-16" data-reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d5b07a]" data-reveal-child>{content.cta.eyebrow}</p>
          <h2 className="mx-auto mt-5 max-w-4xl text-balance text-3xl leading-tight text-[#f6ead8] md:text-5xl" data-section-title>
            {content.cta.title}
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/80 md:text-lg" data-reveal-child>
            {content.cta.description}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4" data-reveal-child>
            <MagneticButton href="/offers">View packages</MagneticButton>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center rounded-full border border-[#d5b07a]/35 px-7 py-3 text-xs uppercase tracking-[0.24em] text-[#fff6ea] transition-colors hover:bg-white/5"
            >
              Start booking
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
