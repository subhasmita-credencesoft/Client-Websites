"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";

const slides = [
  {
    id: "refresh",
    label: "Conference",
    headline: "Inspiring spaces for meetings & corporate events",
    image: "https://bookonelocal.in/cdn/Copy of IMG_2912.avif",
    href: "/weddings",
  },
  {
    id: "relax",
    label: "Picnic",
    headline: "Enjoy peaceful outdoor picnics in scenic surroundings",
    image: "https://bookonelocal.in/cdn/Copy of IMG_3980.avif",
    href: "/weddings",
  },
  {
    id: "renew",
    label: "Virtual Tour",
    headline: "Explore our resort from the comfort of your home",
    image: "https://bookonelocal.in/cdn/Copy of IMG_1441.avif",
    href: "/weddings",
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function WellnessHero() {
  const [activeId, setActiveId] = useState(slides[0].id);
  const router = useRouter();

  const sectionRef = useRef<HTMLElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const active = useMemo(
    () => slides.find((slide) => slide.id === activeId) ?? slides[0],
    [activeId],
  );

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".wellness-eyebrow",
          { y: 14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" },
        );

        gsap.fromTo(
          ".wellness-headline",
          { yPercent: 105, autoAlpha: 0, filter: "blur(10px)" },
          {
            yPercent: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power4.out",
            delay: 0.08,
          },
        );

        gsap.fromTo(
          ".wellness-tab",
          { y: 16, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.75, ease: "power3.out", stagger: 0.08, delay: 0.14 },
        );

        gsap.fromTo(mediaRef.current, { scale: 1.1 }, { scale: 1.03, duration: 1.4, ease: "power2.out" });

        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
          .to(mediaRef.current, { yPercent: 8, scale: 1.1, ease: "none" }, 0)
          .to(contentRef.current, { y: -70, autoAlpha: 0.62, ease: "none" }, 0)
          .to(".wellness-overlay", { opacity: 0.72, ease: "none" }, 0);
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ".wellness-headline",
        { y: 14, autoAlpha: 0, filter: "blur(6px)" },
        { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.55, ease: "power3.out", overwrite: "auto" },
      );

      gsap.fromTo(
        mediaRef.current,
        { scale: 1.08 },
        { scale: 1.03, duration: 0.85, ease: "power2.out", overwrite: "auto" },
      );
    });

    return () => mm.revert();
  }, [activeId]);

  return (
    <section ref={sectionRef} data-no-global-gsap className="relative min-h-[80svh] overflow-hidden text-white sm:min-h-[90svh] lg:min-h-screen">
      <div ref={mediaRef} className="absolute inset-0 will-change-transform">
        <Image
          src={active.image}
          alt={active.headline}
          fill
          sizes="100vw"
          quality={75}
          loading="lazy"
          className="object-cover transition-opacity duration-500"
        />
      </div>
      <div className="wellness-overlay absolute inset-0 bg-black/50" />
      <Container className="relative flex min-h-[80svh] flex-col justify-center pb-12 pt-28 sm:min-h-[90svh] sm:pb-16 sm:pt-36 md:pt-44 lg:min-h-screen lg:pb-20 lg:pt-52">
        <div ref={contentRef}>
          <div className="wellness-eyebrow flex items-center gap-4 text-[0.68rem] uppercase tracking-[0.2em] text-white/80 sm:gap-6 sm:text-xs sm:tracking-[0.35em]">
            <span>Experiences That Elevate Your Getaway</span>
          </div>
          <div className="relative mt-6 h-[9.2rem] overflow-hidden sm:mt-8 sm:h-[10.8rem] md:h-[12.8rem] lg:h-[13.6rem]">
            <h2 className="wellness-headline absolute inset-0 max-w-xl whitespace-pre-line font-serif text-3xl leading-tight sm:max-w-2xl sm:text-4xl md:text-6xl">
              {active.headline}
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 md:mt-16 md:grid-cols-3 md:gap-6 md:[grid-auto-rows:1fr]">
            {slides.map((slide, index) => {
              const isActive = slide.id === activeId;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onMouseEnter={() => setActiveId(slide.id)}
                  onClick={() => {
                    setActiveId(slide.id);
                    if (slide.href) router.push(slide.href);
                  }}
                  className={`wellness-tab group flex h-full min-h-[4.8rem] items-center gap-3 border-t border-white/30 pt-4 text-left transition sm:gap-4 sm:pt-5 md:pt-6 ${
                    isActive ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] sm:text-xs sm:tracking-[0.3em]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-xl sm:text-2xl">{slide.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
