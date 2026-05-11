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
  const isPicnicPage = content.path === "/picnic";
  const isCorporatePage = content.path === "/corporate";
  const showIntroButton = content.showIntroButton ?? true;
  const showAtmosphereSection = content.showAtmosphereSection ?? true;
  const showSummarySection = content.showSummarySection ?? true;
  const showPlanningSection = content.showPlanningSection ?? true;
  const showMemoryWall = content.showMemoryWall ?? true;

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
        <Container className={`grid gap-8 lg:items-start ${isCorporatePage ? "lg:grid-cols-[1.15fr_0.85fr]" : "lg:grid-cols-[1.05fr_0.95fr]"}`}>
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
            {showIntroButton ? (
              <div className="booking-cta mt-8">
                <Button href={content.bookingButtonHref} size="lg" className="gap-2 px-8 uppercase tracking-[0.12em]">
                  {content.bookingButtonLabel}
                  <span aria-hidden="true">&rsaquo;</span>
                </Button>
              </div>
            ) : null}

            <div className={`mt-10 grid gap-4 sm:grid-cols-3 ${isCorporatePage ? "rounded-[1.8rem] border border-[var(--border-subtle)] bg-[#f7f3ec] p-5 sm:p-6" : ""}`}>
              {content.stats.map((item) => (
                <div
                  key={item.label}
                  className={`booking-card px-1 py-4 sm:px-0 ${isCorporatePage ? "border-l border-[var(--border-subtle)] pl-4 first:border-l-0 first:pl-0" : "border-b border-[var(--border-subtle)]"}`}
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

          <div
            className={`grid gap-5 border-t border-[var(--border-subtle)] pt-2 lg:border-t-0 lg:border-l lg:pl-10 ${
              isCorporatePage ? "lg:gap-0 lg:rounded-[1.8rem] lg:border lg:bg-white/80 lg:p-6" : ""
            }`}
          >
            {content.highlights.map((item, index) => (
              <article
                key={item.title}
                className={`booking-card booking-floating-card border-b border-[var(--border-subtle)] pb-5 last:border-b-0 last:pb-0 ${
                  isCorporatePage ? "relative py-5 pl-5 first:pt-0 last:pb-0" : ""
                }`}
              >
                {isCorporatePage ? (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1 h-10 w-px bg-[linear-gradient(180deg,var(--accent)_0%,rgba(196,106,58,0)_100%)]"
                  />
                ) : null}
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

      {showAtmosphereSection ? (
      <section className="booking-landing-section site-surface-soft site-section-lg overflow-hidden">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="booking-kicker site-kicker">Atmosphere</p>
            <div className="overflow-hidden">
              <h2 className="booking-title mt-4 font-serif text-[clamp(2.2rem,4vw,3.8rem)] leading-[0.96] text-[var(--text-primary)]">
                {isPicnicPage
                  ? "A one-day picnic flow that feels open, active, and easy to picture."
                  : isCorporatePage
                    ? "A clearer business-first flow with stronger structure and visual confidence."
                    : "More visual depth, stronger mood, and a more immersive page flow."}
              </h2>
            </div>
            {/* <p className="booking-copy mt-5 text-[1rem] leading-8 text-[var(--text-muted)]">
              {isPicnicPage
                ? "These image-led sections help guests imagine the outing from arrival and play time to meal breaks, group moments, and the booking step."
                : isCorporatePage
                  ? "These sections help planners quickly understand the setting, event suitability, and stay experience without getting lost in a heavy card layout."
                  : "These image-led sections add a richer destination feel while keeping the browsing rhythm clear and premium."}
            </p> */}
          </div>

          <div className={`mt-12 grid gap-6 lg:items-start ${isCorporatePage ? "lg:grid-cols-[1.1fr_0.9fr]" : "lg:grid-cols-[1.15fr_0.85fr]"}`}>
            <article className="booking-media-card group relative h-fit self-start">
                <div className={`relative h-[23rem] overflow-hidden rounded-[2rem] sm:h-[28rem] ${isCorporatePage ? "border border-[var(--border-subtle)] shadow-[0_20px_48px_rgba(20,59,71,0.10)]" : ""}`}>
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
                    {isCorporatePage ? "Corporate Setting" : "Signature Mood"}
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

            <div className={`grid gap-6 ${isCorporatePage ? "lg:gap-0 lg:border-t lg:border-[var(--border-subtle)]" : ""}`}>
              {content.gallery.slice(1).map((item, index) => (
                <article
                  key={item.title}
                  className={`booking-media-card group relative overflow-hidden border-b border-[var(--border-subtle)] pb-6 last:border-b-0 last:pb-0 ${isCorporatePage ? "lg:grid lg:grid-cols-[auto_1fr] lg:items-start lg:gap-5 lg:py-6" : ""}`}
                >
                  <div className={`grid min-h-[18rem] gap-5 md:grid-cols-[0.95fr_1.05fr] md:gap-6 ${isCorporatePage ? "lg:min-h-0 lg:grid-cols-[0.9fr_1.1fr]" : ""}`}>
                    <div className={`relative min-h-[13rem] overflow-hidden rounded-[1.6rem] ${isCorporatePage ? "lg:min-h-[11rem]" : ""}`}>
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
                    <div className={`flex flex-col justify-center p-6 sm:p-7 ${isCorporatePage ? "lg:p-0 lg:pr-2" : ""}`}>
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                        {isCorporatePage ? `Focus 0${index + 2}` : `0${index + 2}`}
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
      ) : null}

      {content.venueCapacities && content.venueCapacities.length > 0 ? (
        <section className="booking-landing-section site-page-surface site-section-lg bg-[#f7f3ec]">
          <Container>
            <div className="mx-auto max-w-3xl text-center mb-12">
              <p className="booking-kicker site-kicker">Venue Capacities</p>
              <h2 className="booking-title mt-4 font-serif text-[clamp(2.2rem,4vw,3.8rem)] leading-[0.96] text-[var(--text-primary)]">
                Spaces for Every Gathering
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {content.venueCapacities.map((venue) => (
                <article
                  key={venue.name}
                  className="booking-card rounded-[1.8rem] border border-[var(--border-subtle)] bg-white p-6 text-center shadow-[0_12px_24px_rgba(20,59,71,0.04)]"
                >
                  <h3 className="font-serif text-[1.6rem] leading-tight text-[var(--text-primary)]">
                    {venue.name}
                  </h3>
                  <div className="mt-4 flex flex-col gap-2 text-sm text-[var(--text-muted)]">
                    <p className="font-semibold text-[1.05rem] text-[#1f3c44]">{venue.capacity}</p>
                    <p>{venue.area}</p>
                    {venue.features && (
                      <span className="mx-auto mt-2 inline-block rounded-full bg-[#1f3c44]/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-[#1f3c44]">
                        {venue.features}
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="booking-landing-section site-surface-plain site-section-lg">
        {/* <Container>
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

          <div className={`mt-12 grid gap-6 ${isCorporatePage ? "lg:grid-cols-1" : "lg:grid-cols-3"}`}>
            {content.packageOptions.map((item) => (
                <article
                  key={item.name}
                className={`booking-card group flex h-full flex-col bg-white/65 px-6 py-6 sm:px-7 sm:py-7 ${
                  isCorporatePage
                    ? "rounded-[1.8rem] border border-[var(--border-subtle)] bg-[linear-gradient(180deg,#ffffff_0%,#f7f3ec_100%)] lg:grid lg:grid-cols-[0.28fr_0.72fr] lg:gap-8"
                    : "border-t border-[var(--accent)]/40"
                }`}
              >
                <div className={isCorporatePage ? "border-b border-[var(--border-subtle)] pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8" : ""}>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                    {item.audience}
                  </p>
                  <h3 className="mt-4 font-serif text-[1.9rem] leading-[0.98] text-[var(--text-primary)]">
                    {item.name}
                  </h3>
                </div>
                <div className={isCorporatePage ? "pt-5 lg:pt-0" : ""}>
                  <p className="text-sm leading-7 text-[var(--text-muted)]">
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
                </div>
              </article>
            ))}
          </div>
        </Container> */}
      </section>

      {/* {content.experienceFlow ? (
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
                  className="booking-card group relative overflow-hidden border-l-2 border-[var(--accent)]/50 bg-white/70 px-5 py-6 sm:px-6 sm:py-7 lg:border-l-0 lg:border-t-2"
                >
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
      ) : null} */}

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
                    className={`booking-media-card group relative overflow-hidden border-b border-[var(--border-subtle)] pb-8 last:border-b-0 last:pb-0 ${
                      isCorporatePage ? "lg:px-0" : ""
                    }`}
                  >
                    <div className={`grid gap-6 lg:gap-8 ${isCorporatePage ? "lg:grid-cols-[0.82fr_1.18fr] lg:items-center" : "lg:grid-cols-[0.95fr_1.05fr]"}`}>
                      <div className={`relative min-h-[18rem] overflow-hidden rounded-[1.8rem] lg:min-h-[21rem] ${isCorporatePage && index % 2 === 1 ? "lg:order-2" : ""}`}>
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
                      <div className={`relative flex flex-col justify-center px-1 py-1 sm:px-2 lg:px-0 ${isCorporatePage && index % 2 === 1 ? "lg:order-1" : ""}`}>
                        <p className="booking-chip text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                          {isCorporatePage ? `Business Use 0${index + 1}` : `Activity 0${index + 1}`}
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

      {showSummarySection ? (
      <section className="booking-landing-section site-page-surface site-section">
        <Container className="max-w-6xl">
          <div className="booking-card overflow-hidden rounded-[2rem]">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
              <div className="rounded-[2rem] bg-[linear-gradient(135deg,#143b47_0%,#1b4652_52%,#204f5a_100%)] px-6 py-8 text-white sm:px-8 sm:py-10 lg:px-10 lg:py-12">
                <p className="booking-kicker text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-white/65">
                  {isPicnicPage ? "Picnic Highlights" : isCorporatePage ? "Corporate Highlights" : "Page Highlights"}
                </p>
                <div className="overflow-hidden">
                  <h2 className="booking-title mt-4 font-serif text-[clamp(2.15rem,4vw,3.4rem)] leading-[0.96] text-white">
                    {isPicnicPage
                      ? "A clearer picnic day story from arrival to enquiry."
                      : isCorporatePage
                        ? "A clearer corporate journey from venue review to enquiry."
                        : "More content without losing clarity."}
                  </h2>
                </div>
                <p className="booking-copy mt-5 max-w-2xl text-[1rem] leading-8 text-white/80">
                  {isPicnicPage
                    ? "The layout now shows the rhythm of a day picnic more clearly, with stronger visual anchors and easier enquiry for groups."
                    : isCorporatePage
                      ? "The layout now gives planners a more confident read on venue fit, stay comfort, and event support while preserving the direct enquiry path."
                      : "The layout now carries more storytelling, stronger visual anchors, and a more dimensional feel while still preserving the simple booking action at the end."}
                </p>
              </div>
              <div className={`grid gap-5 border-t border-[var(--border-subtle)] pt-6 sm:grid-cols-3 lg:border-t-0 lg:grid-cols-1 lg:pt-0 ${isCorporatePage ? "rounded-[1.8rem] border bg-white p-6 lg:border-[var(--border-subtle)]" : "lg:border-l lg:pl-10"}`}>
                {content.highlights.map((item) => (
                  <div
                    key={`${item.title}-summary`}
                    className={`booking-card flex h-full flex-col justify-center border-b border-[var(--border-subtle)] px-1 py-2 last:border-b-0 sm:px-2 ${isCorporatePage ? "lg:px-0" : "lg:px-0"}`}
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
      ) : null}

      {showPlanningSection ? (
      <section className="booking-landing-section site-surface-soft site-section-lg">
        <Container className={`grid gap-8 lg:items-center ${isCorporatePage ? "lg:grid-cols-[0.9fr_1.1fr]" : "lg:grid-cols-[0.98fr_1.02fr]"}`}>
          <div className="booking-card overflow-hidden rounded-[1.8rem]">
            <div
              className="booking-parallax-media min-h-[23rem] bg-cover bg-center sm:min-h-[27rem]"
              style={{ backgroundImage: `url("${content.planningImage}")` }}
            />
          </div>

          <div
            className={`booking-card bg-white/65 p-6 sm:p-8 lg:p-10 ${
              isCorporatePage ? "rounded-[1.8rem] border border-[var(--border-subtle)] bg-[linear-gradient(180deg,#ffffff_0%,#f6f1e8_100%)]" : "border-t border-[var(--accent)]/40"
            }`}
          >
            <p className="booking-kicker site-kicker">{isCorporatePage ? "Planning" : "Details"}</p>
            <div className="overflow-hidden">
              <h2 className="booking-title mt-4 font-serif text-[clamp(2.15rem,4vw,3.4rem)] leading-[0.98] text-[var(--text-primary)]">
                {content.planningTitle}
              </h2>
            </div>
            <p className="booking-copy mt-5 text-[1rem] leading-8 text-[var(--text-muted)]">
              {content.planningCopy}
            </p>
            {content.planningPoints.length > 0 ? (
              <ul className="mt-7 space-y-3">
                {content.planningPoints.map((point) => (
                  <li key={point} className="booking-copy flex items-start gap-3 text-sm leading-7 text-[var(--text-muted)]">
                    <span className={`mt-2 h-2.5 w-2.5 rounded-full bg-[var(--accent)] ${isCorporatePage ? "shadow-[0_0_0_5px_rgba(196,106,58,0.10)]" : ""}`} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </Container>
      </section>
      ) : null}

      {content.memoryWall && showMemoryWall ? (
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
                  className={`booking-media-card group relative overflow-hidden rounded-[1.9rem] ${
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
                className="absolute inset-0 bg-[linear-gradient(135deg,rgba(20,59,71,0.78)_0%,rgba(31,77,89,0.70)_48%,rgba(216,154,85,0.36)_155%)]"

            </div>
            <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <p className="booking-kicker text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-white/70">
              {content.bookingCtaEyebrow}
            </p>
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
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
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <Link
                    href={content.bookingButtonHref}
                    className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#d7b06e] bg-[#c49a3c] px-8 text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-[#143b47] shadow-[0_10px_26px_rgba(196,154,60,0.28)] transition hover:bg-[#d1ab58]"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="text-[#143b47]">{content.bookingButtonLabel}</span>
                    <span aria-hidden="true">&rsaquo;</span>
                  </Link>
                  {content.secondaryBookingButtonLabel && content.secondaryBookingButtonHref ? (
                    <Link
                      href={content.secondaryBookingButtonHref}
                      className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/35 bg-white/12 px-8 text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-white/18"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>{content.secondaryBookingButtonLabel}</span>
                    </Link>
                  ) : null}
                </div>
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
        }

        @media (min-width: 1024px) {
          .booking-media-card:nth-child(odd) {
            transform: perspective(1400px) rotateY(-0.8deg);
          }

          .booking-media-card:nth-child(even) {
            transform: perspective(1400px) rotateY(0.8deg);
          }
        }
      `}</style>
    </div>
  );
}
