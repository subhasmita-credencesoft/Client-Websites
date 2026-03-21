"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";

const experiences = [
  {
    title: "Family",
    image: "https://bookonelocal.in/cdn/Copy+of+IMG_4035.JPG",
    description:
      "From kids' activities to family-friendly adventures, discover moments made for togetherness.",
  },
  {
    title: "Culture",
    image: "https://bookonelocal.in/cdn/Copy of IMG_3968.avif",
    description:
      "Immerse yourself in local traditions, art, and stories that celebrate the spirit of the island.",
  },
  {
    title: "Entertainment",
    image: "https://bookonelocal.in/cdn/adventure.png",
    description:
      "Whatever you love doing, you will find an incredible array of choices at the resort.",
  },
  {
    title: "Pools",
    image: "https://bookonelocal.in/cdn/picnic1.jpg",
    description:
      "Sun-soaked days by the water, with serene pools and golden shoreline escapes.",
  },
  {
    title: "Adventure",
    image: "https://bookonelocal.in/cdn/pic10.jpeg",
    description:
      "Elevate your stay with outdoor thrills, curated excursions, and signature experiences.",
  },
];

// ✅ No `declare module "gsap/ScrollTrigger"` block needed — GSAP v3.11+ ships its own types.
gsap.registerPlugin(ScrollTrigger);

export default function ExperiencesExplore() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".exp-explore-kicker",
          { y: 12, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 82%",
              once: true,
            },
          },
        );

        gsap.fromTo(
          ".exp-explore-title-line",
          { yPercent: 110, autoAlpha: 0, filter: "blur(8px)" },
          {
            yPercent: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.08,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 78%",
              once: true,
            },
          },
        );
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const pin = pinRef.current;
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!pin || !viewport || !track) return;

      const ctx = gsap.context(() => {
        const getDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

        gsap.set(track, { x: 0 });

        const horizontalTween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${getDistance() + window.innerHeight * 0.25}`,
            pin,
            scrub: 0.65,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: (value: number) => {
                const steps = Math.max(1, experiences.length - 1);
                return Math.round(value * steps) / steps;
              },
              duration: { min: 0.08, max: 0.24 },
              ease: "power2.out",
            },
          },
        });

        // ✅ FIX: yPercent changed from +8 → -6 so the image shifts UP during
        // scroll, preventing the top gap that appeared on the cards.
        gsap.to(".exp-explore-image", {
          scale: 1.08,
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${getDistance() + window.innerHeight * 0.25}`,
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        });

        gsap.fromTo(
          ".exp-explore-card",
          { y: 20, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: pin,
              start: "top 75%",
              once: true,
            },
          },
        );

        gsap.utils.toArray<HTMLElement>(".exp-explore-card").forEach((card) => {
          const textLines = card.querySelectorAll<HTMLElement>(".exp-card-line");
          if (!textLines.length) return;
          gsap.set(textLines, { y: 18, autoAlpha: 0 });

          const reveal = () =>
            gsap.to(textLines, {
              y: 0,
              autoAlpha: 1,
              duration: 0.48,
              ease: "power3.out",
              stagger: 0.08,
              overwrite: "auto",
            });

          const hide = () =>
            gsap.to(textLines, {
              y: 18,
              autoAlpha: 0,
              duration: 0.24,
              ease: "power2.out",
              stagger: 0.04,
              overwrite: "auto",
            });

          ScrollTrigger.create({
            trigger: card,
            containerAnimation: horizontalTween,
            start: "left 72%",
            end: "right 38%",
            onToggle: (self) => (self.isActive ? reveal() : hide()),
          });
        });
      }, sectionRef);

      ScrollTrigger.refresh();
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".exp-explore-card").forEach((card) => {
          const textLines = card.querySelectorAll<HTMLElement>(".exp-card-line");
          if (!textLines.length) return;

          gsap.set(textLines, { y: 16, autoAlpha: 0 });

          ScrollTrigger.create({
            trigger: card,
            start: "top 84%",
            end: "bottom 40%",
            onToggle: (self) => {
              gsap.to(textLines, {
                y: self.isActive ? 0 : 16,
                autoAlpha: self.isActive ? 1 : 0,
                duration: self.isActive ? 0.48 : 0.24,
                ease: self.isActive ? "power3.out" : "power2.out",
                stagger: self.isActive ? 0.08 : 0.04,
                overwrite: "auto",
              });
            },
          });
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-no-global-gsap
      className="overflow-x-hidden bg-[#f6f3ed] py-16 text-[#1f3c44] sm:py-20 lg:py-24"
    >
      <Container>
        <div>
          <span className="exp-explore-kicker text-[0.72rem] uppercase tracking-[0.45em] text-[#1f3c44]/70">
            Explore
          </span>
          <div className="mt-4 overflow-hidden">
            <h2 className="exp-explore-title-line max-w-xl font-serif text-4xl leading-[0.98] md:text-5xl lg:text-[4.1rem]">
              Make your stay
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="exp-explore-title-line max-w-xl font-serif text-4xl leading-[0.98] md:text-5xl lg:text-[4.1rem]">
              memorable
            </h2>
          </div>
        </div>
      </Container>

      <div ref={pinRef} className="relative mt-10 sm:mt-12">
        <div
          ref={viewportRef}
          className="experience-scroll-wrap experience-full-bleed overflow-x-auto pb-3 lg:overflow-hidden lg:pb-0"
        >
          <div
            ref={trackRef}
            className="experience-strip flex min-w-max snap-x snap-mandatory gap-4 sm:gap-5 lg:gap-6"
          >
            {experiences.map((item, index) => (
              <article
                key={item.title}
                className="exp-explore-card experience-card group relative h-[26rem] w-[20rem] shrink-0 snap-start overflow-hidden rounded-[16px] bg-black sm:h-[30rem] sm:w-[24rem] lg:h-[82vh] lg:min-h-[640px] lg:w-auto lg:rounded-none"
              >
                {/*
                  ✅ FIX (CSS side): Replace inset-0 with -top-[8%] / -bottom-[8%]
                  so the background image has extra vertical bleed. This ensures
                  no gap appears at the top when GSAP's yPercent shifts it upward.
                */}
                <div
                  className="exp-explore-image absolute -bottom-[8%] -top-[8%] left-0 right-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url("${encodeURI(item.image)}")` }}
                  role="img"
                  aria-label={item.title}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-500 group-hover:from-black/88" />

                <div className="absolute left-5 top-5 rounded-full border border-white/35 bg-black/25 px-2.5 py-1 text-[0.66rem] font-semibold text-white/90 backdrop-blur-sm">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white sm:p-7 lg:p-12">
                  <h3 className="exp-card-line font-serif text-[2.4rem] leading-[0.95] sm:text-[2.8rem] lg:text-[4.2rem]">
                    {item.title}
                  </h3>
                  <p className="exp-card-line mt-3 max-w-[60ch] text-[0.84rem] leading-relaxed text-white/85 sm:text-[0.92rem] lg:text-[1.05rem]">
                    {item.description}
                  </p>
                  <span className="exp-card-line mt-5 inline-flex w-fit text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-white/90 lg:text-[0.72rem]">
                    Explore now
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .experience-scroll-wrap {
          -ms-overflow-style: none;
          scrollbar-width: none;
          scroll-padding-left: 0;
          scroll-padding-right: 0;
        }
        .experience-full-bleed {
          width: 100%;
        }
        @media (max-width: 1023px) {
          .experience-full-bleed {
            width: 100vw;
            max-width: 100vw;
            margin-left: calc(50% - 50vw);
            margin-right: calc(50% - 50vw);
            padding-left: 2.5rem;
            padding-right: 2.5rem;
          }
        }
        .experience-scroll-wrap::-webkit-scrollbar {
          display: none;
        }
        @media (min-width: 1024px) {
          .experience-card {
            width: calc((100vw - 1.5rem) / 2);
            transition: transform 550ms cubic-bezier(0.22, 1, 0.36, 1),
              box-shadow 550ms cubic-bezier(0.22, 1, 0.36, 1);
            transform: translateY(0);
          }
          .experience-card:hover {
            box-shadow: 0 26px 70px rgba(0, 0, 0, 0.22);
            transform: translateY(-4px);
          }
        }
      `}</style>
    </section>
  );
}
