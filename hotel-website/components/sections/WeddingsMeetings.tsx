"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";

const meetingCards = [
  {
    title: "Food for thought",
    description:
      "With accomplished chefs on hand, we curate the perfect menu to feed your mind and boost productivity.",
    image: "/images/wedding-img4.jpg",
  },
  {
    title: "A full-service menu",
    description:
      "From expert meeting consultants and events concierge to on-site business support.",
    image: "/images/wedding-img5.jpg",
  },
  {
    title: "Tempting technology",
    description:
      "Help yourself to high-end equipment, full tech support and free Wi-Fi access.",
    image: "/images/wedding-img6.jpg",
  },
  {
    title: "Meet responsibly",
    description:
      "Book a meeting that gives back, with all the ingredients to make it a success.",
    image: "/images/wedding-img7.jpg",
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function WeddingsMeetings() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const introTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        });

        introTl
          .fromTo(
            ".meeting-kicker",
            { y: 12, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out" },
          )
          .fromTo(
            ".meeting-title",
            { yPercent: 110, autoAlpha: 0, filter: "blur(8px)" },
            { yPercent: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.9, ease: "power4.out" },
            "<+0.04",
          )
          .fromTo(
            ".meeting-copy",
            { y: 12, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" },
            "<+0.06",
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
        const cards = gsap.utils.toArray<HTMLElement>(".meeting-card");
        const getDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
        const getEndValue = () => {
          const distance = getDistance();
          const settle = Math.max(1, viewport.clientWidth * 0.18);
          return `+=${Math.max(1, distance + settle)}`;
        };
        const distance = getDistance();
        if (distance < 24) return;

        const horizontalTween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: getEndValue,
            pin,
            scrub: 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: (value: number) => {
                const steps = Math.max(1, cards.length - 1);
                return Math.round(value * steps) / steps;
              },
              duration: { min: 0.1, max: 0.3 },
              ease: "power2.out",
            },
          },
        });

        cards.forEach((card) => {
          const lines = card.querySelectorAll<HTMLElement>(".meeting-card-line");
          if (!lines.length) return;
          gsap.set(lines, { y: 16, autoAlpha: 0, filter: "blur(4px)" });

          ScrollTrigger.create({
            trigger: card,
            containerAnimation: horizontalTween,
            start: "left 72%",
            end: "right 36%",
            onToggle: (self) => {
              gsap.to(lines, {
                y: self.isActive ? 0 : 16,
                autoAlpha: self.isActive ? 1 : 0,
                filter: self.isActive ? "blur(0px)" : "blur(4px)",
                duration: self.isActive ? 0.55 : 0.3,
                ease: self.isActive ? "power3.out" : "power2.out",
                stagger: self.isActive ? 0.08 : 0.04,
                overwrite: "auto",
              });
            },
          });
        });
      }, sectionRef);

      ScrollTrigger.refresh();
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} data-no-global-gsap className="bg-[#f6f3ed] py-20 text-[#1f3c44]">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="meeting-kicker text-xs uppercase tracking-[0.45em] text-[#1f3c44]/70">
            Why us
          </span>
          <h2 className="meeting-title mt-6 font-serif text-4xl leading-tight md:text-6xl">
            Meetings that satisfy
          </h2>
          <p className="meeting-copy mt-4 text-sm leading-7 text-[#1f3c44]/75">
            Our team of experienced consultants are here to help, ensuring your
            needs are met and your event runs smoothly.
          </p>
        </div>
      </Container>

      <div ref={pinRef} className="relative mt-12">
        <div ref={viewportRef} className="meeting-scroll-wrap w-screen overflow-x-auto pb-2 lg:overflow-hidden lg:pb-0">
          <div ref={trackRef} className="flex min-w-max snap-x snap-mandatory gap-4 px-4 sm:gap-6 sm:px-6 lg:gap-8 lg:px-6">
            {meetingCards.map((card, index) => (
              <article
                key={card.title}
                className="meeting-card group relative h-[28rem] w-[86vw] shrink-0 snap-start overflow-hidden rounded-2xl bg-black sm:h-[32rem] sm:w-[76vw] lg:h-[72vh] lg:min-h-[540px] lg:w-[74vw] lg:max-w-[980px]"
              >
                <div className="absolute left-4 top-4 z-20 rounded-full border border-white/35 bg-black/25 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.16em] text-white/90">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="absolute inset-0">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 74vw"
                    className="meeting-card-image object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="relative z-10 flex h-full items-end p-6 sm:p-8 lg:p-10">
                  <div className="max-w-2xl">
                    <h3 className="meeting-card-line font-serif text-[2rem] leading-[0.95] text-white sm:text-[2.4rem] lg:text-[3.1rem]">
                      {card.title}
                    </h3>
                    <p className="meeting-card-line mt-3 text-[0.9rem] leading-7 text-white/85 sm:text-[1rem]">
                      {card.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .meeting-scroll-wrap {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .meeting-scroll-wrap::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
