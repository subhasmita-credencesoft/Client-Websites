"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Waves, Tent, Dumbbell, Gamepad2, UtensilsCrossed, TreePine } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";

const highlights = [
  { title: "Water Park & Swimming Pool with Rain Dance", Icon: Waves },
  { title: "Adventure Activities - Archery, Zorbing, Wall Climbing & more", Icon: Tent },
  { title: "Fully Furnished Gym with Sophisticated Equipment", Icon: Dumbbell },
  { title: "Indoor Games - Table Tennis, Badminton & Carom", Icon: Gamepad2 },
  { title: "Multi-cuisine Restaurant & Dining Experience", Icon: UtensilsCrossed },
  { title: "Outdoor Sports & Exclusively Designed Kid's Park", Icon: TreePine },
];

const values = [
  {
    title: "Vision",
    text: "To serve all our guests with a personal touch, making them feel on top of the world.",
  },
  {
    title: "Mission",
    text: "To be the first choice of our guests.",
  },
];

const introSlides = [
  { src: "https://bookonelocal.in/cdn/Copy of IMG_1568.avif", alt: "Resort aerial view" },
  { src: "https://bookonelocal.in/cdn/Copy of IMG_2912.avif", alt: "Resort leisure area" },
  { src: "https://bookonelocal.in/cdn/Copy of IMG_2911.avif", alt: "Resort landscape" },
];
const INTRO_TITLE =
  "The Name That Redefines Hospitality Par-Excellence In The Lush Green Landscape At Khopoli.";

const AUTO_SLIDE_MS = 3500;

gsap.registerPlugin(ScrollTrigger);

export default function ResortIntro() {
  const [activeSlide, setActiveSlide] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const mediaCardRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % introSlides.length);
    }, AUTO_SLIDE_MS);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const revealTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        });

        revealTl.fromTo(
          ".resort-intro-kicker",
          { y: 12, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.65, ease: "power3.out" },
        );
        revealTl.fromTo(
          ".resort-intro-title-word",
          { yPercent: 110, autoAlpha: 0, filter: "blur(8px)" },
          {
            yPercent: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.02,
            ease: "power4.out",
          },
          "<+0.08",
        );
        revealTl.fromTo(
          ".resort-intro-copy",
          { y: 22, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.82, ease: "power3.out", stagger: 0.08 },
          "<+0.12",
        );
        revealTl.fromTo(
          ".resort-intro-value",
          { y: 14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out", stagger: 0.1 },
          "<+0.06",
        );
        revealTl.fromTo(
          ".resort-intro-cta",
          { y: 16, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" },
          "<+0.05",
        );
        revealTl.fromTo(
          ".resort-intro-media",
          { y: 26, autoAlpha: 0, scale: 1.05 },
          { y: 0, autoAlpha: 1, scale: 1, duration: 1.05, ease: "power3.out" },
          "<-0.55",
        );
        revealTl.fromTo(
          ".resort-intro-highlight",
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out", stagger: 0.06 },
          "<+0.12",
        );

        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom top",
            scrub: 1,
          },
        })
          .to(contentRef.current, { y: -20, autoAlpha: 0.96, ease: "none" }, 0)
          .to(mediaCardRef.current, { y: -26, ease: "none" }, 0)
          .to(".resort-intro-media-image", { yPercent: 8, scale: 1.08, ease: "none" }, 0)
          .to(".resort-intro-media-shine", { xPercent: 18, opacity: 0.35, ease: "none" }, 0);
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const active = slideRefs.current[activeSlide];
      if (!active) return;
      gsap.fromTo(
        active,
        { scale: 1.07, filter: "brightness(0.88)" },
        {
          scale: 1,
          filter: "brightness(1)",
          duration: (AUTO_SLIDE_MS + 500) / 1000,
          ease: "power2.out",
          overwrite: "auto",
        },
      );
    });
    return () => mm.revert();
  }, [activeSlide]);

  return (
    <section ref={sectionRef} data-no-global-gsap className="bg-[#f3efe8] py-14 text-[#1f3c44] sm:py-20 lg:py-24">
      <Container>
        <div className="resort-intro-kicker flex items-center gap-4 text-[0.68rem] uppercase tracking-[0.28em] sm:gap-6 sm:text-xs sm:tracking-[0.38em]">
          <span>About UK&apos;s Resort</span>
          <div className="h-px flex-1 bg-[#1f3c44]/15" />
        </div>

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
          <div ref={contentRef}>
            <div className="overflow-hidden">
              <h2 className="resort-intro-title font-serif text-[1.7rem] leading-[1.12] tracking-[-0.01em] sm:text-[2.1rem] md:text-[2.6rem] lg:text-[3rem]">
                {INTRO_TITLE.split(" ").map((word, idx) => (
                  <span key={`${word}-${idx}`} className="resort-intro-title-word inline-block will-change-transform">
                    {word}&nbsp;
                  </span>
                ))}
              </h2>
            </div>

            <div className="mt-6 max-w-xl space-y-4 text-[0.95rem] leading-[1.75] text-[#1f3c44]/70 sm:mt-7 sm:text-[0.98rem]">
              <p className="resort-intro-copy">
                Just a few miles from the outskirts of the hustle-n-bustle of Mumbai&apos;s concrete jungle,
                a complete at-home experience awaits - one that fulfills your heart&apos;s desires and offers
                the break you have always longed for.
              </p>
              <p className="resort-intro-copy">
                A signature business hotel showcasing impeccable hospitality amidst scenic beauty and
                rich history that blends harmoniously with today&apos;s lifestyles.
              </p>
              <p className="resort-intro-copy">
                Specially manicured landscaped gardens spread across over 85,000 sq. ft., overlooking
                mountains and greenery as far as the eye can see, creating the perfect setting for your
                business and leisure events.
              </p>
            </div>

            <div className="mt-9 flex flex-col gap-0 divide-y divide-[#1f3c44]/12 border-y border-[#1f3c44]/12 sm:mt-10">
              {values.map((item) => (
                <div key={item.title} className="resort-intro-value flex items-start gap-5 py-5 sm:gap-6 sm:py-6">
                  <span className="mt-0.5 min-w-[5.5rem] text-[0.64rem] uppercase tracking-[0.22em] text-[#d89a55] sm:text-[0.68rem] sm:tracking-[0.26em]">
                    {item.title}
                  </span>
                  <p className="text-[0.9rem] leading-[1.65] text-[#1f3c44]/75 sm:text-[0.93rem]">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="resort-intro-cta mt-8 sm:mt-10">
              <Button
                href="/rooms"
                className="h-11 rounded-full border-[#1f3c44]/35 px-7 text-[0.68rem] uppercase tracking-[0.22em] text-[#1f3c44] transition-colors hover:border-[#1f3c44] hover:bg-[#1f3c44] hover:text-white"
              >
                Explore more
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div ref={mediaCardRef} className="resort-intro-media overflow-hidden rounded-2xl bg-white shadow-[0_4px_40px_rgba(31,60,68,0.10)]">
              <div className="relative h-60 w-full sm:h-72 lg:h-[22rem]">
                <div className="resort-intro-media-shine pointer-events-none absolute inset-y-0 -left-1/3 z-[5] w-1/2 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0" />
                {introSlides.map((slide, idx) => (
                  <div
                    key={slide.src}
                    ref={(el) => {
                      slideRefs.current[idx] = el;
                    }}
                    className="absolute inset-0 transition-opacity duration-700 will-change-transform"
                    style={{ opacity: idx === activeSlide ? 1 : 0 }}
                    aria-hidden={idx !== activeSlide}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 480px"
                      className="resort-intro-media-image object-cover"
                      priority={idx === 0}
                    />
                  </div>
                ))}

                <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                  {introSlides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      aria-label={`Go to slide ${idx + 1}`}
                      onClick={() => setActiveSlide(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === activeSlide ? "w-5 bg-white" : "w-2 bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-[#1f3c44]/8 bg-white px-5 py-4 sm:px-6 sm:py-5">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d89a55]/50 sm:h-10 sm:w-10 overflow-hidden">
              <Image
              src="/UK's-Resort-Logo_SVG.webp"
               alt="UK Resort Logo"
             width={40}
             height={40}
            className="object-cover"
                  />
             </span>
                <p className="text-[0.8rem] leading-snug text-[#1f3c44]/65 sm:text-[0.83rem]">
                  Award-winning resort in the lush green landscape at Khopoli
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {highlights.map(({ title, Icon }) => (
                <div
                  key={title}
                  className="resort-intro-highlight flex flex-col gap-2.5 rounded-xl border border-[#1f3c44]/10 bg-white/70 p-4 transition-shadow hover:shadow-md sm:p-5"
                >
                  <Icon className="h-5 w-5 text-[#d89a55] sm:h-6 sm:w-6" strokeWidth={1.4} />
                  <p className="text-[0.73rem] leading-[1.45] text-[#1f3c44]/80 sm:text-[0.78rem]">{title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
