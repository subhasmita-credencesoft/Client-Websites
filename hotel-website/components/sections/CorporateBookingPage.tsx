"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "./PageHero";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { corporateLandingPageContent } from "../../data/pages/bookingLandingPages";

gsap.registerPlugin(ScrollTrigger);

const corporateAdvantages = [
  {
    title: "Professional first impression",
    copy: "A stronger visual presentation helps company planners feel confident about the setting before they enquire or book.",
  },
  {
    title: "Clearer venue understanding",
    copy: "Balanced media and copy help visitors understand the resort environment without making the page feel crowded.",
  },
  {
    title: "Easier planning flow",
    copy: "Each section supports decision-making in a simple order so teams can move from interest to booking with less confusion.",
  },
];

const corporateFlowSteps = [
  {
    step: "01",
    title: "Review the stay objective",
    copy: "Start with the format your team needs, whether the plan is for room stays, leadership time, meetings, or a larger business event.",
  },
  {
    step: "02",
    title: "Compare the package fit",
    copy: "Use the package overview to understand which option supports the right group size, pace, and coordination requirement.",
  },
  {
    step: "03",
    title: "Check the resort setting",
    copy: "Visuals and planning details help teams understand the atmosphere, comfort level, and hospitality experience before moving ahead.",
  },
  {
    step: "04",
    title: "Continue to booking",
    copy: "Once the format feels right, guests can continue directly to the booking path with less friction and more clarity.",
  },
];

export default function CorporateBookingPage() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const sections = gsap.utils.toArray<HTMLElement>(".corp-section");

        sections.forEach((section) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              once: true,
            },
          });

          tl.fromTo(
            section.querySelectorAll(".corp-kicker"),
            { y: 12, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.45, ease: "power3.out", stagger: 0.05 },
          )
            .fromTo(
              section.querySelectorAll(".corp-title"),
              { yPercent: 110, autoAlpha: 0 },
              { yPercent: 0, autoAlpha: 1, duration: 0.85, ease: "power4.out", stagger: 0.05 },
              "<+0.05",
            )
            .fromTo(
              section.querySelectorAll(".corp-copy"),
              { y: 18, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.58, ease: "power3.out", stagger: 0.05 },
              "<+0.07",
            )
            .fromTo(
              section.querySelectorAll(".corp-card"),
              { y: 28, rotateX: 10, transformPerspective: 1400, autoAlpha: 0 },
              { y: 0, rotateX: 0, autoAlpha: 1, duration: 0.72, ease: "power3.out", stagger: 0.08 },
              "<+0.06",
            )
            .fromTo(
              section.querySelectorAll(".corp-cta"),
              { y: 14, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out", stagger: 0.04 },
              "<+0.04",
            );
        });

        gsap.utils.toArray<HTMLElement>(".corp-media-shift").forEach((element) => {
          gsap.to(element, {
            yPercent: -7,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.85,
            },
          });
        });

        gsap.utils.toArray<HTMLElement>(".corp-float").forEach((element, index) => {
          gsap.to(element, {
            y: index % 2 === 0 ? -12 : -18,
            duration: 3 + index * 0.2,
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
        title={corporateLandingPageContent.heroTitle}
        subtitle={corporateLandingPageContent.heroSubtitle}
        backgroundImage={corporateLandingPageContent.heroImage}
        backgroundVideo={corporateLandingPageContent.heroVideo}
        breadcrumb={`Home / ${corporateLandingPageContent.heroTitle}`}
      />

      <section className="corp-section site-page-surface site-section-lg overflow-hidden">
        <Container className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <div>
            <p className="corp-kicker site-kicker">{corporateLandingPageContent.introEyebrow}</p>
            <div className="overflow-hidden">
              <h2 className="corp-title mt-4 font-serif text-[clamp(2.45rem,4vw,4.5rem)] leading-[0.94] text-[var(--text-primary)]">
                {corporateLandingPageContent.introTitle}
              </h2>
            </div>
            <p className="corp-copy mt-6 max-w-2xl text-[1rem] leading-8 text-[var(--text-muted)] sm:text-[1.05rem]">
              {corporateLandingPageContent.introCopy}
            </p>
            <p className="corp-copy mt-5 max-w-2xl text-[1rem] leading-8 text-[color:color-mix(in_srgb,var(--ink)_86%,white_14%)] sm:text-[1.03rem]">
              Explore a corporate booking journey built for teams that want a dependable resort setting, a clearer planning flow, and a more direct path to the next step.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {corporateLandingPageContent.stats.map((item) => (
                <div
                  key={item.label}
                  className="corp-card rounded-[1.45rem] border border-[var(--border-subtle)] bg-white px-5 py-6 shadow-[0_18px_38px_rgba(26,39,46,0.06)]"
                >
                  <p className="font-serif text-[1.75rem] leading-none text-[var(--text-primary)]">
                    {item.value}
                  </p>
                  <p className="mt-2 text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="corp-cta mt-8">
              <Button href={corporateLandingPageContent.bookingButtonHref} size="lg" className="gap-2 px-8 uppercase tracking-[0.12em]">
                {corporateLandingPageContent.bookingButtonLabel}
                <span aria-hidden="true">&rsaquo;</span>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {corporateLandingPageContent.highlights.map((item, index) => (
              <article
                key={item.title}
                className={`corp-card rounded-[1.8rem] border p-6 shadow-[0_24px_60px_rgba(26,39,46,0.10)] ${
                  index === 1
                    ? "border-[#d9c9b8] bg-[linear-gradient(135deg,#153b46_0%,#1f4e5a_100%)] text-white"
                    : "border-white/70 bg-white/95 backdrop-blur"
                } ${index === 2 ? "md:col-span-2" : ""}`}
              >
                <p className={`text-[0.72rem] font-semibold uppercase tracking-[0.24em] ${index === 1 ? "text-white/65" : "text-[var(--accent)]"}`}>
                  0{index + 1}
                </p>
                <h3 className={`mt-3 font-serif text-[1.7rem] leading-[0.98] ${index === 1 ? "text-white" : "text-[var(--text-primary)]"}`}>
                  {item.title}
                </h3>
                <p className={`mt-3 text-sm leading-7 ${index === 1 ? "text-white/78" : "text-[var(--text-muted)]"}`}>
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="corp-section site-surface-soft site-section-lg overflow-hidden">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="corp-kicker site-kicker">Immersive Spaces</p>
            <div className="overflow-hidden">
              <h2 className="corp-title mt-4 font-serif text-[clamp(2.3rem,4vw,4rem)] leading-[0.95] text-[var(--text-primary)]">
                Explore spaces suited for business stays, offsites, and company gatherings.
              </h2>
            </div>
            {/* <p className="corp-copy mt-5 text-[1rem] leading-8 text-[var(--text-muted)]">
              The media below helps planners understand the mood, setting, and overall suitability of the resort for different corporate formats.
            </p> */}
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <article className="corp-card relative overflow-hidden rounded-[2rem] border border-[var(--border-subtle)] bg-white shadow-[0_24px_60px_rgba(26,39,46,0.10)]">
              <div className="relative min-h-[24rem] sm:min-h-[31rem]">
                <Image
                  src={corporateLandingPageContent.gallery[0].image}
                  alt={corporateLandingPageContent.gallery[0].title}
                  fill
                  sizes="(max-width: 1023px) 100vw, 720px"
                  className="corp-media-shift object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f252d]/78 via-[#0f252d]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <p className="corp-kicker text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/70">
                    Signature Arrival
                  </p>
                  <h3 className="corp-title mt-3 font-serif text-[2.05rem] leading-[0.94] text-white sm:text-[2.8rem]">
                    {corporateLandingPageContent.gallery[0].title}
                  </h3>
                  <p className="corp-copy mt-4 max-w-2xl text-sm leading-7 text-white/82 sm:text-[0.98rem]">
                    {corporateLandingPageContent.gallery[0].copy}
                  </p>
                </div>
              </div>
            </article>

            <div className="grid gap-6">
              {corporateLandingPageContent.gallery.slice(1).map((item, index) => (
                <article
                  key={item.title}
                  className="corp-card relative overflow-hidden rounded-[1.8rem] border border-[var(--border-subtle)] bg-white shadow-[0_20px_48px_rgba(26,39,46,0.08)]"
                >
                  <div className="grid min-h-[18rem] md:grid-cols-[0.9fr_1.1fr]">
                    <div className="relative min-h-[14rem]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 767px) 100vw, 320px"
                        className="corp-media-shift object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex flex-col justify-center p-6 sm:p-7">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                        0{index + 2}
                      </p>
                      <h3 className="mt-3 font-serif text-[1.7rem] leading-[0.96] text-[var(--text-primary)]">
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

      <section className="corp-section site-page-surface site-section-lg">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="corp-kicker site-kicker">Packages</p>
            <div className="overflow-hidden">
              <h2 className="corp-title mt-4 font-serif text-[clamp(2.3rem,4vw,3.9rem)] leading-[0.95] text-[var(--text-primary)]">
                Corporate stay formats made easier to compare and choose.
              </h2>
            </div>
            <p className="corp-copy mt-5 text-[1rem] leading-8 text-[var(--text-muted)]">
              {corporateLandingPageContent.packagesSubtitle}
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {corporateLandingPageContent.packageOptions.map((item) => (
              <article
                key={item.name}
                className="corp-card group flex h-full flex-col overflow-hidden rounded-[1.9rem] border border-[var(--border-subtle)] bg-white p-6 shadow-[0_18px_44px_rgba(26,39,46,0.07)] transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(26,39,46,0.13)] sm:p-7"
              >
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                  {item.audience}
                </p>
                <h3 className="mt-4 font-serif text-[2rem] leading-[0.96] text-[var(--text-primary)]">
                  {item.name}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
                  {item.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.includes.map((point) => (
                    <span
                      key={point}
                      className="rounded-full bg-[var(--surface-3)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]"
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

      <section className="corp-section site-surface-plain site-section-lg">
        <Container className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div>
            <p className="corp-kicker site-kicker">Coordination Flow</p>
            <div className="overflow-hidden">
              <h2 className="corp-title mt-4 font-serif text-[clamp(2.25rem,4vw,3.8rem)] leading-[0.95] text-[var(--text-primary)]">
                A simple path from first review to the final booking step.
              </h2>
            </div>
            <p className="corp-copy mt-5 max-w-2xl text-[1rem] leading-8 text-[var(--text-muted)]">
              The flow below helps company planners understand what to check first, what to compare next, and when to continue to booking.
            </p>
          </div>

          <div className="grid gap-4">
            {corporateFlowSteps.map((item) => (
              <article
                key={item.step}
                className="corp-card rounded-[1.5rem] border border-[var(--border-subtle)] bg-white px-5 py-6 shadow-[0_14px_34px_rgba(26,39,46,0.05)] sm:px-6"
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--surface-3)] font-serif text-[1.15rem] text-[var(--accent)]">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-serif text-[1.5rem] leading-tight text-[var(--text-primary)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                      {item.copy}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="corp-section site-surface-soft site-section-lg">
        <Container className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="corp-card overflow-hidden rounded-[2rem] border border-[var(--border-subtle)] bg-white shadow-[0_24px_60px_rgba(26,39,46,0.10)]">
            <div className="relative min-h-[24rem] sm:min-h-[30rem]">
              <Image
                src={corporateLandingPageContent.planningImage}
                alt={corporateLandingPageContent.planningTitle}
                fill
                sizes="(max-width: 1023px) 100vw, 640px"
                className="corp-media-shift object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f252d]/68 via-[#0f252d]/10 to-transparent" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="corp-card rounded-[1.8rem] bg-white p-6 shadow-[0_18px_44px_rgba(26,39,46,0.08)] sm:p-8">
              <p className="corp-kicker site-kicker">Planning Support</p>
              <div className="overflow-hidden">
                <h2 className="corp-title mt-4 font-serif text-[clamp(2.2rem,4vw,3.4rem)] leading-[0.96] text-[var(--text-primary)]">
                  {corporateLandingPageContent.planningTitle}
                </h2>
              </div>
              <p className="corp-copy mt-5 text-[1rem] leading-8 text-[var(--text-muted)]">
                {corporateLandingPageContent.planningCopy}
              </p>

              <div className="mt-6 space-y-3">
                {corporateLandingPageContent.planningPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3 text-sm leading-7 text-[var(--text-muted)]">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden="true" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {corporateAdvantages.map((item) => (
              <article
                key={item.title}
                className="corp-card rounded-[1.5rem] border border-[var(--border-subtle)] bg-white px-5 py-6 shadow-[0_14px_34px_rgba(26,39,46,0.05)] sm:px-6"
              >
                <h3 className="font-serif text-[1.45rem] leading-tight text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                  {item.copy}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="corp-section site-page-surface site-section">
        <Container className="max-w-6xl">
          <div className="corp-card relative overflow-hidden rounded-[2rem] border border-[rgba(255,255,255,0.14)] bg-[#143b47] px-6 py-8 text-white shadow-[0_28px_68px_rgba(20,59,71,0.20)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-cover bg-center opacity-100"
              style={{ backgroundImage: `url('${corporateLandingPageContent.planningImage}')` }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,59,71,0.88)_0%,rgba(20,59,71,0.82)_38%,rgba(20,59,71,0.58)_68%,rgba(20,59,71,0.46)_100%)]" />
            <div className="relative z-10">
              <p className="corp-kicker text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-white/72">
                {corporateLandingPageContent.bookingCtaEyebrow}
              </p>
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                <div>
                  <div className="overflow-hidden">
                    <h2 className="corp-title mt-4 max-w-[10ch] font-serif text-[clamp(2.6rem,4vw,4.4rem)] leading-[0.92] text-white">
                      {corporateLandingPageContent.bookingCtaTitle}
                    </h2>
                  </div>
                  <p className="corp-copy mt-5 max-w-3xl text-[1rem] leading-8 text-white/82">
                    {corporateLandingPageContent.bookingCtaCopy}
                  </p>
                </div>

                <div className="corp-cta flex lg:justify-end lg:self-center">
                  <Link
                    href={corporateLandingPageContent.bookingButtonHref}
                    className="inline-flex min-h-[3.9rem] items-center justify-center gap-2 rounded-full border border-[#e0b14d] bg-[#d9a538] px-8 text-[0.95rem] font-semibold uppercase tracking-[0.16em] text-[#143b47] shadow-[0_18px_34px_rgba(25,39,46,0.18)] transition hover:bg-[#cf9828]"
                  >
                    <span>{corporateLandingPageContent.bookingButtonLabel}</span>
                    <span aria-hidden="true">&rsaquo;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <style>{`
        .corp-card {
          transform-style: preserve-3d;
        }

        @media (min-width: 1024px) {
          .corp-card:hover {
            transform: perspective(1400px) translateY(-4px) rotateX(1.5deg);
            transition: transform 320ms ease, box-shadow 320ms ease;
          }

          .corp-section .corp-card:nth-of-type(odd) {
            transform: perspective(1500px) rotateY(-1.2deg);
          }

          .corp-section .corp-card:nth-of-type(even) {
            transform: perspective(1500px) rotateY(1.2deg);
          }
        }
      `}</style>
    </div>
  );
}
