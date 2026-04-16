"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import Button from "../ui/Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const timelineSteps = [
  {
    step: "Reception",
    title: "A Warm Welcome Awaits",
    description:
      "From the moment you step in, our reception team ensures every guest feels at home — blending genuine warmth with seamless service.",
  },
  {
    step: "Stay",
    title: "Super Deluxe Rooms",
    description:
      "Thoughtfully appointed Super Deluxe Rooms offer comfort, style, and a restful retreat — ideal for leisure travellers and business guests alike.",
  },
  {
    step: "Conference",
    title: "World-Class Conference Hall",
    description:
      "A fully equipped Conference Hall designed to host corporate events, seminars, and business gatherings with impeccable hospitality and modern amenities.",
  },
  {
    step: "Play",
    title: "Thrilling Water Park",
    description:
      "Dive into fun at UK's Resort's Water Park — a perfect escape for families, groups, and anyone seeking refreshing leisure under open skies.",
  },
  {
    step: "Fun",
    title: "Children's Play Area",
    description:
      "A dedicated Children's Play Area ensures the little ones are engaged, entertained, and safe — giving families the freedom to truly unwind.",
  },
  {
    step: "Discover",
    title: "The Complete UK's Resort",
    description:
      "Since 1999, UK's Resort has brought together scenic landscapes, signature hospitality, and memorable experiences — all under one roof in Khopoli.",
  },
];

const highlights = [
  {
    title: "Est. 1999",
    desc: "UK's Resort has been serving travellers since 1999, growing many folds through sheer persistence and an unwavering commitment to exceptional hospitality.",
  },
  {
    title: "6 Lakh Sq. Ft.",
    desc: "Specially manicured landscaped gardens scaling over 6 lakhs sq. ft., overlooking mountains and greenery as far as your eyes can see.",
  },
  {
    title: "Mumbai's Gateway",
    desc: "Just a few miles from Mumbai's concrete jungle — a complete at-home experience awaits, offering the break you have always preferred.",
  },
];

export default function OverviewContent() {
  const introRef             = useRef<HTMLElement>(null);
  const timelineContainerRef = useRef<HTMLElement>(null);
  const timelineLineRef      = useRef<HTMLDivElement>(null);
  const highlightsRef        = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    let mm: gsap.MatchMedia | null = null;

    const raf = requestAnimationFrame(() => {
      mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const ctx = gsap.context(() => {
          /* ── Intro ── */
          gsap.fromTo(
            ".overview-quote",
            { y: 28, autoAlpha: 0 },
            {
              y: 0, autoAlpha: 1, duration: 0.85, ease: "power3.out",
              scrollTrigger: { trigger: introRef.current, start: "top 82%", once: true },
            },
          );
          gsap.fromTo(
            ".overview-intro-para",
            { y: 18, autoAlpha: 0 },
            {
              y: 0, autoAlpha: 1, duration: 0.65, stagger: 0.08, ease: "power3.out",
              scrollTrigger: { trigger: introRef.current, start: "top 76%", once: true },
            },
          );

          /* ── Timeline line ── */
          if (timelineLineRef.current && timelineContainerRef.current) {
            gsap.fromTo(
              timelineLineRef.current,
              { scaleY: 0 },
              {
                scaleY: 1, ease: "none",
                scrollTrigger: {
                  trigger: timelineContainerRef.current,
                  start: "top center",
                  end: "bottom center",
                  scrub: true,
                },
              },
            );
          }

          /* ── Timeline items ── */
          const items = gsap.utils.toArray<HTMLElement>(".overview-timeline-item");
          items.forEach((item, i) => {
            gsap.fromTo(
              item,
              { x: i % 2 === 0 ? -50 : 50, autoAlpha: 0 },
              {
                x: 0, autoAlpha: 1, duration: 0.75, ease: "power2.out",
                scrollTrigger: {
                  trigger: item, start: "top 82%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          });

          /* ── Highlights ── */
          gsap.fromTo(
            ".overview-highlight-card",
            { y: 28, autoAlpha: 0 },
            {
              y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
              scrollTrigger: { trigger: highlightsRef.current, start: "top 82%", once: true },
            },
          );
        });

        return () => ctx.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [".overview-quote", ".overview-intro-para", ".overview-timeline-item", ".overview-highlight-card"],
          { clearProps: "all" },
        );
        ScrollTrigger.refresh();
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      mm?.revert();
    };
  }, []);

  return (
    <>
      {/* ── Intro ── */}
      <section ref={introRef} data-no-global-gsap className="bg-[#f6f2ec] py-16 sm:py-20 lg:py-28">
        <Container size="content">
          <h2 className="overview-quote mb-10 font-serif text-2xl italic leading-relaxed text-[#d89a55] md:text-4xl md:indent-16 lg:text-[2.6rem]">
            &ldquo;A complete &lsquo;at-home&rsquo; experience that would provide you your heart&rsquo;s
            desires — a &lsquo;Break&rsquo; you have always preferred.&rdquo;
          </h2>

          <div className="grid gap-5 text-[0.97rem] leading-[1.75] text-[#31464f] md:grid-cols-2 md:gap-10">
            <p className="overview-intro-para">
              UK&apos;s Resort has been serving travellers since 1999 and has grown many folds through
              sheer persistence. Situated in a lush green landscape at Khopoli, UK&apos;s Resort is one
              of the finest resorts providing a haven of relaxation and hospitality.
            </p>
            <p className="overview-intro-para">
              Just a few miles from the outskirts of the hustle-n-bustle of Mumbai&apos;s concrete
              jungle, a complete at-home experience awaits — one that fulfils your heart&apos;s desires
              and offers the break you have always longed for.
            </p>
            <p className="overview-intro-para">
              A Signature business hotel, showcasing impeccable hospitality amidst scenic beauty and
              rich history that blends harmoniously with today&apos;s lifestyle.
            </p>
            <p className="overview-intro-para">
              Specially manicured landscaped gardens scaling over 6 lakhs sq. ft. — overlooking
              mountains &amp; greenery as far as your eyes can see.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Timeline ── */}
      <section
        ref={timelineContainerRef}
        data-no-global-gsap
        className="relative overflow-hidden border-y border-[#1f3c44]/10 bg-[#f3efe8] py-20 sm:py-24 lg:py-32"
      >
        <Container>
          <div className="mb-16 text-center sm:mb-20">
            <span className="mb-3 block text-[0.66rem] uppercase tracking-[0.3em] text-[#55676f]">
              The Experience
            </span>
            <h2 className="font-serif text-3xl text-[#1f3c44] lg:text-5xl">Our Facilities</h2>
          </div>

          <div className="relative mx-auto max-w-4xl">
            {/* Vertical track */}
            <div className="absolute bottom-0 top-0 left-5 w-px -translate-x-1/2 bg-[#1f3c44]/12 md:left-1/2">
              <div
                ref={timelineLineRef}
                className="h-full w-full origin-top scale-y-0 bg-[#d89a55]"
              />
            </div>

            <div className="space-y-14 md:space-y-20">
              {timelineSteps.map((step, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={idx}
                    className={`overview-timeline-item relative flex flex-col items-start md:items-center ${
                      isEven ? "md:flex-row-reverse" : "md:flex-row"
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-5 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-[#d89a55] bg-[#f3efe8] md:left-1/2" />

                    <div
                      className={`w-full pl-12 md:w-1/2 md:pl-0 ${
                        isEven ? "md:pl-14 text-left" : "md:pr-14 text-left md:text-right"
                      }`}
                    >
                      <div className="mb-2 text-[0.66rem] uppercase tracking-[0.22em] text-[#d89a55]">
                        {step.step}
                      </div>
                      <h3 className="mb-3 font-serif text-xl text-[#1f3c44] sm:text-2xl">
                        {step.title}
                      </h3>
                      <p className="text-[0.93rem] leading-[1.7] text-[#55676f]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Highlights ── */}
      <section ref={highlightsRef} data-no-global-gsap className="bg-[#f6f2ec] py-20 sm:py-24 lg:py-32">
        <Container>
          <div className="mb-14 text-center sm:mb-20">
            <span className="mb-3 block text-[0.66rem] uppercase tracking-[0.3em] text-[#55676f]">
              Highlights
            </span>
            <h2 className="font-serif text-3xl text-[#1f3c44] lg:text-5xl">
              What Makes Us Special
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {highlights.map((item, i) => (
              <div
                key={i}
                className="overview-highlight-card group relative h-72 [perspective:1000px] sm:h-80"
              >
                <div className="absolute inset-0 transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-[#1f3c44]/10 bg-white p-8 text-center shadow-[0_4px_30px_rgba(31,60,68,0.07)] [backface-visibility:hidden]">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#d89a55]/35">
                      <span className="font-serif text-2xl text-[#d89a55]">0{i + 1}</span>
                    </div>
                    <h3 className="font-serif text-2xl text-[#1f3c44]">{item.title}</h3>
                    <p className="mt-2 text-[0.72rem] uppercase tracking-[0.15em] text-[#55676f]">
                      Hover to learn more
                    </p>
                  </div>

                  {/* Back */}
                  <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-[#d89a55] p-8 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <p className="text-[0.97rem] leading-relaxed text-white">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <Button
              href="/rooms"
              variant="outline"
              size="md"
              className="rounded-full border-[#1f3c44]/35 px-8 text-[0.68rem] uppercase tracking-[0.22em] text-[#1f3c44] hover:border-[#1f3c44]/50 hover:bg-[#f1ece3]"
            >
              Explore Rooms &amp; Suites
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
