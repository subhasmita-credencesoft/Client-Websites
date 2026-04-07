"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "./PageHero";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { corporateLandingPageContent } from "../../data/pages/bookingLandingPages";

gsap.registerPlugin(ScrollTrigger);

const immersiveSpaces = [
  {
    image: "https://bookonelocal.in/cdn/uks-exterior-1.jpg",
    title: "Arrival that feels elevated",
    copy: "A stronger exterior-first introduction helps the page feel more premium and more business-ready from the first fold.",
  },
  {
    image: "https://bookonelocal.in/cdn/Copy+of+IMG_3968.avif",
    title: "Retreat and strategy mood",
    copy: "Spaces are presented to support strategy sessions, offsites, and longer business stays with a calmer visual tone.",
  },
  {
    image: "https://bookonelocal.in/cdn/conference3-1.jpg",
    title: "Event and meeting clarity",
    copy: "Corporate planners can quickly recognize the site as suitable for launches, conferences, and team events.",
  },
];

const planningSteps = [
  {
    step: "01",
    title: "Choose the right format",
    copy: "Leadership retreat, team offsite, conference, or launch event. The page makes each use case easy to understand quickly.",
  },
  {
    step: "02",
    title: "Review stay and venue fit",
    copy: "Guests can compare the tone, audience, and support included before they decide whether the format suits the event.",
  },
  {
    step: "03",
    title: "Move directly to booking",
    copy: "Once the decision is made, the booking action is immediate so the user does not lose momentum.",
  },
  {
    step: "04",
    title: "Continue with coordination",
    copy: "After booking, event details can still be aligned with the team, but the site no longer makes that the first barrier.",
  },
];

const corporateAdvantages = [
  {
    title: "Executive-friendly visual language",
    copy: "The page now feels more premium and more composed, which better matches the expectations of leadership teams and coordinators.",
  },
  {
    title: "Stronger image hierarchy",
    copy: "Larger media moments and layered cards create a more confident first impression without overwhelming the reading flow.",
  },
  {
    title: "More sections, clearer pacing",
    copy: "The additional content gives the page enough depth to feel complete while still keeping each section easy to scan.",
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
                A corporate landing page that feels sharper, deeper, and more executive.
              </h2>
            </div>
            <p className="corp-copy mt-6 max-w-2xl text-[1rem] leading-8 text-[var(--text-muted)] sm:text-[1.05rem]">
              {corporateLandingPageContent.introCopy}
            </p>
            <p className="corp-copy mt-5 max-w-2xl text-[1rem] leading-8 text-[color:color-mix(in_srgb,var(--ink)_86%,white_14%)] sm:text-[1.03rem]">
              The goal is not just to show packages. It is to present the resort as a premium environment for retreats, executive stays, launches, and business gatherings with enough depth to earn confidence before the booking click.
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

          <div className="relative min-h-[34rem]">
            <div className="corp-card corp-float absolute left-0 top-3 w-[78%] rounded-[1.8rem] border border-white/70 bg-white/95 p-5 shadow-[0_24px_60px_rgba(26,39,46,0.12)] backdrop-blur">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                01
              </p>
              <h3 className="mt-3 font-serif text-[1.75rem] leading-[0.98] text-[var(--text-primary)]">
                Premium business tone
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                The visual rhythm is designed to feel more intentional and more executive from the first fold.
              </p>
            </div>

            <div className="corp-card corp-float absolute right-0 top-28 w-[74%] rounded-[1.8rem] border border-[#d9c9b8] bg-[linear-gradient(135deg,#153b46_0%,#1f4e5a_100%)] p-6 text-white shadow-[0_30px_70px_rgba(20,59,71,0.22)]">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/65">
                02
              </p>
              <h3 className="mt-3 font-serif text-[1.9rem] leading-[0.96] text-white">
                Faster decision path
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/78">
                The page now supports direct action without making planners fight through a weak last section.
              </p>
            </div>

            <div className="corp-card corp-float absolute left-10 bottom-0 w-[70%] rounded-[1.8rem] border border-white/70 bg-[#efe6da] p-5 shadow-[0_26px_60px_rgba(26,39,46,0.10)]">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                03
              </p>
              <h3 className="mt-3 font-serif text-[1.7rem] leading-[0.98] text-[var(--text-primary)]">
                More depth, no clutter
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                Extra sections now add authority and atmosphere while still keeping the booking action obvious.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="corp-section site-surface-soft site-section-lg overflow-hidden">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="corp-kicker site-kicker">Immersive Spaces</p>
            <div className="overflow-hidden">
              <h2 className="corp-title mt-4 font-serif text-[clamp(2.3rem,4vw,4rem)] leading-[0.95] text-[var(--text-primary)]">
                More attractive visuals with layered 3D-style presentation.
              </h2>
            </div>
            <p className="corp-copy mt-5 text-[1rem] leading-8 text-[var(--text-muted)]">
              The media presentation now does more than decorate. It frames the resort as a destination for focused business gatherings and premium retreats.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <article className="corp-card relative overflow-hidden rounded-[2rem] border border-[var(--border-subtle)] bg-white shadow-[0_24px_60px_rgba(26,39,46,0.10)]">
              <div className="relative min-h-[24rem] sm:min-h-[31rem]">
                <Image
                  src={immersiveSpaces[0].image}
                  alt={immersiveSpaces[0].title}
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
                    {immersiveSpaces[0].title}
                  </h3>
                  <p className="corp-copy mt-4 max-w-2xl text-sm leading-7 text-white/82 sm:text-[0.98rem]">
                    {immersiveSpaces[0].copy}
                  </p>
                </div>
              </div>
            </article>

            <div className="grid gap-6">
              {immersiveSpaces.slice(1).map((item, index) => (
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
                More refined business formats with clearer reading hierarchy.
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
                More sections, but each one pushes the user closer to a decision.
              </h2>
            </div>
            <p className="corp-copy mt-5 max-w-2xl text-[1rem] leading-8 text-[var(--text-muted)]">
              This section breaks the planning path into a clearer sequence so business users can understand what comes next without feeling buried in copy.
            </p>
          </div>

          <div className="grid gap-4">
            {planningSteps.map((item) => (
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
          <div className="corp-card overflow-hidden rounded-[2rem] border border-[var(--border-subtle)] bg-[linear-gradient(135deg,#143b47_0%,#1a4450_48%,#d89a55_170%)] px-6 py-8 text-white shadow-[0_28px_68px_rgba(20,59,71,0.20)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <p className="corp-kicker text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-white/68">
              {corporateLandingPageContent.bookingCtaEyebrow}
            </p>
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <div className="overflow-hidden">
                  <h2 className="corp-title mt-4 font-serif text-[clamp(2.4rem,4vw,4rem)] leading-[0.94] text-white">
                    {corporateLandingPageContent.bookingCtaTitle}
                  </h2>
                </div>
                <p className="corp-copy mt-5 max-w-3xl text-[1rem] leading-8 text-white/80">
                  {corporateLandingPageContent.bookingCtaCopy}
                </p>
              </div>
              <div className="corp-cta flex lg:justify-end">
                <Button
                  href={corporateLandingPageContent.bookingButtonHref}
                  size="lg"
                  className="gap-2 border border-white/30 bg-white text-[#143b47] px-8 uppercase tracking-[0.12em] hover:bg-white/90"
                >
                  {corporateLandingPageContent.bookingButtonLabel}
                  <span aria-hidden="true">&rsaquo;</span>
                </Button>
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
