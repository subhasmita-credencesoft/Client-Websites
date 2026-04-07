"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "./PageHero";
import Container from "../ui/Container";
import Button from "../ui/Button";
import type { BookingLandingPageContent } from "../../data/pages/bookingLandingPages";

gsap.registerPlugin(ScrollTrigger);

type BookingLandingPageProps = {
  content: BookingLandingPageContent;
};

export default function BookingLandingPage({ content }: BookingLandingPageProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const sections = gsap.utils.toArray<HTMLElement>(".booking-landing-section");

        sections.forEach((section) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              once: true,
            },
          });

          tl.fromTo(
            section.querySelectorAll(".booking-kicker"),
            { y: 12, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out", stagger: 0.06 },
          )
            .fromTo(
              section.querySelectorAll(".booking-title"),
              { yPercent: 110, autoAlpha: 0 },
              { yPercent: 0, autoAlpha: 1, duration: 0.82, ease: "power4.out", stagger: 0.05 },
              "<+0.06",
            )
            .fromTo(
              section.querySelectorAll(".booking-copy"),
              { y: 18, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.58, ease: "power3.out", stagger: 0.06 },
              "<+0.08",
            )
            .fromTo(
              section.querySelectorAll(".booking-card"),
              { y: 24, rotateX: 8, transformPerspective: 1200, autoAlpha: 0 },
              { y: 0, rotateX: 0, autoAlpha: 1, duration: 0.62, ease: "power3.out", stagger: 0.08 },
              "<+0.06",
            )
            .fromTo(
              section.querySelectorAll(".booking-chip"),
              { y: 10, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.4, ease: "power3.out", stagger: 0.03 },
              "<+0.02",
            )
            .fromTo(
              section.querySelectorAll(".booking-cta"),
              { y: 16, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out", stagger: 0.05 },
              "<+0.04",
            )
            .fromTo(
              section.querySelectorAll(".booking-media-card"),
              { y: 28, scale: 0.98, autoAlpha: 0 },
              { y: 0, scale: 1, autoAlpha: 1, duration: 0.8, ease: "power3.out", stagger: 0.08 },
              "<-0.2",
            );
        });

        gsap.utils.toArray<HTMLElement>(".booking-parallax-media").forEach((element) => {
          gsap.to(element, {
            yPercent: -6,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        });

        gsap.utils.toArray<HTMLElement>(".booking-floating-card").forEach((element, index) => {
          gsap.to(element, {
            y: index % 2 === 0 ? -10 : -16,
            duration: 2.8 + index * 0.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }, rootRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <PageHero
        title={content.heroTitle}
        subtitle={content.heroSubtitle}
        backgroundImage={content.heroImage}
        backgroundVideo={content.heroVideo}
        breadcrumb={`Home / ${content.heroTitle}`}
      />

      <section className="booking-landing-section site-page-surface site-section-lg">
        <Container className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="booking-kicker site-kicker">{content.introEyebrow}</p>
            <div className="overflow-hidden">
              <h2 className="booking-title mt-4 font-serif text-[clamp(2.25rem,4vw,4.15rem)] leading-[0.96] text-[var(--text-primary)]">
                {content.introTitle}
              </h2>
            </div>
            <p className="booking-copy mt-6 max-w-2xl text-[1rem] leading-8 text-[var(--text-muted)] sm:text-[1.04rem]">
              {content.introCopy}
            </p>
            <div className="booking-cta mt-8">
              <Button href={content.bookingButtonHref} size="lg" className="gap-2 px-8 uppercase tracking-[0.12em]">
                {content.bookingButtonLabel}
                <span aria-hidden="true">&rsaquo;</span>
              </Button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {content.stats.map((item) => (
                <div
                  key={item.label}
                  className="booking-card rounded-[1.35rem] border border-[var(--border-subtle)] bg-white/90 px-4 py-5 shadow-[0_14px_30px_rgba(21,31,38,0.05)]"
                >
                  <p className="font-serif text-[1.55rem] leading-none text-[var(--text-primary)] sm:text-[1.8rem]">
                    {item.value}
                  </p>
                  <p className="mt-2 text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {content.highlights.map((item, index) => (
              <article
                key={item.title}
                className="booking-card booking-floating-card site-panel bg-white/95 p-5 shadow-[0_18px_40px_rgba(21,31,38,0.06)] sm:p-6"
              >
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                  0{index + 1}
                </p>
                <h3 className="mt-3 font-serif text-[1.5rem] leading-tight text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="booking-landing-section site-surface-soft site-section-lg overflow-hidden">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="booking-kicker site-kicker">Atmosphere</p>
            <div className="overflow-hidden">
              <h2 className="booking-title mt-4 font-serif text-[clamp(2.2rem,4vw,3.8rem)] leading-[0.96] text-[var(--text-primary)]">
                More visual depth, stronger mood, and a more immersive page flow.
              </h2>
            </div>
            <p className="booking-copy mt-5 text-[1rem] leading-8 text-[var(--text-muted)]">
              These image-led cards add a richer destination feel while keeping the browsing rhythm clear and premium.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <article className="booking-media-card group relative h-fit self-start">
              <div className="relative h-[23rem] overflow-hidden rounded-[2rem] border border-[var(--border-subtle)] shadow-[0_22px_54px_rgba(26,39,46,0.08)] sm:h-[28rem]">
                <Image
                  src={content.gallery[0].image}
                  alt={content.gallery[0].title}
                  fill
                  sizes="(max-width: 1023px) 100vw, 700px"
                  className="booking-parallax-media object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11252d]/72 via-[#11252d]/18 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <p className="booking-kicker text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/70">
                    Signature Mood
                  </p>
                  <h3 className="booking-title mt-3 font-serif text-[2rem] leading-[0.96] text-white sm:text-[2.5rem]">
                    {content.gallery[0].title}
                  </h3>
                  <p className="booking-copy mt-4 max-w-2xl text-sm leading-7 text-white/82 sm:text-[0.98rem]">
                    {content.gallery[0].copy}
                  </p>
                </div>
              </div>
            </article>

            <div className="grid gap-6">
              {content.gallery.slice(1).map((item, index) => (
                <article
                  key={item.title}
                  className="booking-media-card group relative overflow-hidden rounded-[1.8rem] border border-[var(--border-subtle)] bg-white shadow-[0_18px_46px_rgba(26,39,46,0.07)]"
                >
                  <div className="grid min-h-[18rem] md:grid-cols-[0.95fr_1.05fr]">
                    <div className="relative min-h-[13rem]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 767px) 100vw, 320px"
                        className="booking-parallax-media object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent md:bg-gradient-to-r md:from-transparent md:to-transparent" />
                    </div>
                    <div className="flex flex-col justify-center p-6 sm:p-7">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                        0{index + 2}
                      </p>
                      <h3 className="mt-3 font-serif text-[1.7rem] leading-[0.98] text-[var(--text-primary)]">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
                        {item.copy}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="booking-landing-section site-surface-plain site-section-lg">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="booking-kicker site-kicker">Packages</p>
            <div className="overflow-hidden">
              <h2 className="booking-title mt-4 font-serif text-[clamp(2.2rem,4vw,3.7rem)] leading-[0.96] text-[var(--text-primary)]">
                {content.packagesTitle}
              </h2>
            </div>
            <p className="booking-copy mt-5 text-[1rem] leading-8 text-[var(--text-muted)]">
              {content.packagesSubtitle}
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {content.packageOptions.map((item) => (
              <article
                key={item.name}
                className="booking-card group flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-[var(--border-subtle)] bg-white p-6 shadow-[0_18px_44px_rgba(26,39,46,0.06)] transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_24px_54px_rgba(26,39,46,0.12)] sm:p-7"
              >
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                  {item.audience}
                </p>
                <h3 className="mt-4 font-serif text-[1.9rem] leading-[0.98] text-[var(--text-primary)]">
                  {item.name}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
                  {item.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.includes.map((point) => (
                    <span
                      key={point}
                      className="booking-chip rounded-full bg-[var(--surface-3)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {content.experienceFlow ? (
        <section className="booking-landing-section site-surface-soft site-section-lg overflow-hidden">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <p className="booking-kicker site-kicker">{content.experienceFlow.eyebrow}</p>
              <div className="overflow-hidden">
                <h2 className="booking-title mt-4 font-serif text-[clamp(2.2rem,4vw,3.7rem)] leading-[0.96] text-[var(--text-primary)]">
                  {content.experienceFlow.title}
                </h2>
              </div>
              <p className="booking-copy mt-5 text-[1rem] leading-8 text-[var(--text-muted)]">
                {content.experienceFlow.copy}
              </p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-4">
              {content.experienceFlow.steps.map((item, index) => (
                <article
                  key={`${item.time}-${item.title}`}
                  className="booking-card group relative overflow-hidden rounded-[1.7rem] border border-[var(--border-subtle)] bg-white px-5 py-6 shadow-[0_18px_44px_rgba(26,39,46,0.06)] transition-transform duration-500 hover:-translate-y-1 sm:px-6 sm:py-7"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--accent)_0%,rgba(196,106,58,0.18)_100%)]" />
                  <div className="absolute -right-10 top-6 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(196,106,58,0.16)_0%,rgba(196,106,58,0)_70%)]" />
                  <p className="booking-chip text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                    Stop 0{index + 1}
                  </p>
                  <h3 className="mt-4 font-serif text-[1.8rem] leading-none text-[var(--text-primary)]">
                    {item.time}
                  </h3>
                  <p className="mt-4 text-[1rem] font-semibold leading-6 text-[var(--text-primary)]">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {content.activityShowcase ? (
        <section className="booking-landing-section site-page-surface site-section-lg">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <p className="booking-kicker site-kicker">{content.activityShowcase.eyebrow}</p>
                <div className="overflow-hidden">
                  <h2 className="booking-title mt-4 font-serif text-[clamp(2.2rem,4vw,3.8rem)] leading-[0.96] text-[var(--text-primary)]">
                    {content.activityShowcase.title}
                  </h2>
                </div>
                <p className="booking-copy mt-5 max-w-xl text-[1rem] leading-8 text-[var(--text-muted)]">
                  {content.activityShowcase.copy}
                </p>
              </div>

              <div className="grid gap-6">
                {content.activityShowcase.features.map((item, index) => (
                  <article
                    key={item.title}
                    className="booking-media-card group relative overflow-hidden rounded-[2rem] border border-[var(--border-subtle)] bg-white shadow-[0_20px_48px_rgba(26,39,46,0.08)]"
                  >
                    <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                      <div className="relative min-h-[18rem] lg:min-h-[21rem]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 1023px) 100vw, 460px"
                          className="booking-parallax-media object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#163845]/28 via-transparent to-transparent" />
                      </div>
                      <div className="relative flex flex-col justify-center px-6 py-7 sm:px-8 sm:py-8">
                        <div className="pointer-events-none absolute inset-y-8 left-0 hidden w-px bg-[linear-gradient(180deg,rgba(196,106,58,0)_0%,rgba(196,106,58,0.45)_50%,rgba(196,106,58,0)_100%)] lg:block" />
                        <p className="booking-chip text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                          Activity 0{index + 1}
                        </p>
                        <h3 className="mt-4 font-serif text-[clamp(1.9rem,3vw,2.5rem)] leading-[0.98] text-[var(--text-primary)]">
                          {item.title}
                        </h3>
                        <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-muted)] sm:text-[0.98rem]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="booking-landing-section site-page-surface site-section">
        <Container className="max-w-6xl">
          <div className="booking-card overflow-hidden rounded-[2rem] border border-[var(--border-subtle)] bg-white shadow-[0_22px_54px_rgba(26,39,46,0.08)]">
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="bg-[linear-gradient(135deg,#143b47_0%,#1b4652_52%,#204f5a_100%)] px-6 py-8 text-white sm:px-8 sm:py-10 lg:px-10 lg:py-12">
                <p className="booking-kicker text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-white/65">
                  Why This Page Works Better
                </p>
                <div className="overflow-hidden">
                  <h2 className="booking-title mt-4 font-serif text-[clamp(2.15rem,4vw,3.4rem)] leading-[0.96] text-white">
                    More content without losing clarity.
                  </h2>
                </div>
                <p className="booking-copy mt-5 max-w-2xl text-[1rem] leading-8 text-white/80">
                  The layout now carries more storytelling, stronger visual anchors, and a more dimensional feel while still preserving the simple booking action at the end.
                </p>
              </div>
              <div className="grid gap-0 sm:grid-cols-3 lg:grid-cols-1">
                {content.highlights.map((item) => (
                  <div
                    key={`${item.title}-summary`}
                    className="booking-card flex h-full flex-col justify-center border-t border-[var(--border-subtle)] px-5 py-6 sm:px-6 lg:border-l lg:border-t-0"
                  >
                    <h3 className="font-serif text-[1.4rem] leading-tight text-[var(--text-primary)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="booking-landing-section site-surface-soft site-section-lg">
        <Container className="grid gap-8 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
          <div className="booking-card overflow-hidden rounded-[1.8rem] border border-[var(--border-subtle)] bg-white shadow-[0_20px_48px_rgba(26,39,46,0.08)]">
            <div
              className="booking-parallax-media min-h-[23rem] bg-cover bg-center sm:min-h-[27rem]"
              style={{ backgroundImage: `url("${content.planningImage}")` }}
            />
          </div>

          <div className="booking-card site-panel bg-white p-6 sm:p-8 lg:p-10">
            <p className="booking-kicker site-kicker">Planning Support</p>
            <div className="overflow-hidden">
              <h2 className="booking-title mt-4 font-serif text-[clamp(2.15rem,4vw,3.4rem)] leading-[0.98] text-[var(--text-primary)]">
                {content.planningTitle}
              </h2>
            </div>
            <p className="booking-copy mt-5 text-[1rem] leading-8 text-[var(--text-muted)]">
              {content.planningCopy}
            </p>
            <ul className="mt-7 space-y-3">
              {content.planningPoints.map((point) => (
                <li key={point} className="booking-copy flex items-start gap-3 text-sm leading-7 text-[var(--text-muted)]">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {content.memoryWall ? (
        <section className="booking-landing-section site-page-surface site-section-lg overflow-hidden">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <p className="booking-kicker site-kicker">{content.memoryWall.eyebrow}</p>
              <div className="overflow-hidden">
                <h2 className="booking-title mt-4 font-serif text-[clamp(2.2rem,4vw,3.8rem)] leading-[0.96] text-[var(--text-primary)]">
                  {content.memoryWall.title}
                </h2>
              </div>
              <p className="booking-copy mt-5 text-[1rem] leading-8 text-[var(--text-muted)]">
                {content.memoryWall.copy}
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {content.memoryWall.images.map((item, index) => (
                <article
                  key={item.alt}
                  className={`booking-media-card group relative overflow-hidden rounded-[1.9rem] border border-[var(--border-subtle)] bg-white shadow-[0_18px_44px_rgba(26,39,46,0.07)] ${
                    index % 3 === 0 ? "md:translate-y-6" : index % 3 === 1 ? "md:-translate-y-2" : "md:translate-y-10"
                  }`}
                >
                  <div className="relative min-h-[18rem] sm:min-h-[21rem]">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 767px) 100vw, 50vw"
                      className="booking-parallax-media object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12262e]/38 via-transparent to-transparent" />
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="booking-landing-section site-page-surface site-section">
        <Container className="max-w-5xl">
          <div className="booking-card relative overflow-hidden rounded-[2rem] border border-[var(--border-subtle)] text-white shadow-[0_24px_60px_rgba(20,59,71,0.18)]">
              <div className="absolute inset-0">
                <Image
                  src={content.planningImage || content.heroImage}
                  alt={content.bookingCtaTitle}
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                  unoptimized
                />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(20,59,71,0.78)_0%,rgba(31,77,89,0.70)_48%,rgba(216,154,85,0.36)_155%)]" />
            </div>
            <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <p className="booking-kicker text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-white/70">
              {content.bookingCtaEyebrow}
            </p>
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <div className="overflow-hidden">
                  <h2 className="booking-title mt-4 font-serif text-[clamp(2.2rem,4vw,3.8rem)] leading-[0.95] text-white">
                    {content.bookingCtaTitle}
                  </h2>
                </div>
                <p className="booking-copy mt-5 max-w-3xl text-[1rem] leading-8 text-white/78">
                  {content.bookingCtaCopy}
                </p>
              </div>
              <div className="booking-cta flex lg:justify-end">
                <Link
                  href={content.bookingButtonHref}
                  className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#d7b06e] bg-[#c49a3c] px-8 text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-[#143b47] shadow-[0_10px_26px_rgba(196,154,60,0.28)] transition hover:bg-[#d1ab58]"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="text-[#143b47]">{content.bookingButtonLabel}</span>
                  <span aria-hidden="true">&rsaquo;</span>
                </Link>
              </div>
            </div>
          </div>
          </div>
        </Container>
      </section>

      <style>{`
        .booking-media-card {
          transform-style: preserve-3d;
        }

        .booking-floating-card {
          transform-style: preserve-3d;
          box-shadow:
            0 18px 40px rgba(21, 31, 38, 0.06),
            0 2px 0 rgba(255, 255, 255, 0.48) inset;
        }

        @media (min-width: 1024px) {
          .booking-media-card:nth-child(odd) {
            transform: perspective(1400px) rotateY(-1.4deg);
          }

          .booking-media-card:nth-child(even) {
            transform: perspective(1400px) rotateY(1.4deg);
          }
        }
      `}</style>
    </div>
  );
}
