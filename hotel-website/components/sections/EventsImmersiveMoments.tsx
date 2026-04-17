"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";
import {
  WEDDINGS_IMMERSIVE_INTRO,
  WEDDINGS_IMMERSIVE_MOMENTS,
  WEDDINGS_IMMERSIVE_STATS,
} from "@/data/sections/eventsImmersiveMoments";

export default function EventsImmersiveMoments() {
  const containerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 3D Header Reveal
      gsap.fromTo(
        ".events-moment-text",
        { y: 60, autoAlpha: 0, rotationX: 15, filter: "blur(12px)" },
        {
          y: 0,
          autoAlpha: 1,
          rotationX: 0,
          filter: "blur(0px)",
          stagger: 0.1,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        ".events-moment-stat",
        { scale: 0.8, autoAlpha: 0, y: 30 },
        {
          scale: 1,
          autoAlpha: 1,
          y: 0,
          stagger: 0.15,
          duration: 1.2,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".events-moment-stats-grid",
            start: "top 80%",
          },
        }
      );

      // Horizontal Scroll
      const track = document.querySelector(".moments-race");
      if (track) {
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth + 100),
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: () => `+=${track.scrollWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // 3D Rotation during horizontal scroll
        gsap.utils.toArray<HTMLElement>(".moment-hz-card").forEach((card) => {
          gsap.to(card.querySelector("img"), {
            xPercent: 30,
            scale: 1.2,
            ease: "none",
            scrollTrigger: {
              trigger: triggerRef.current, // Pin trigger
              start: "top top",
              end: () => `+=${track.scrollWidth}`,
              scrub: true,
            },
          });
        });
      }

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-[#1f3c44] pt-32 pb-0 text-[#f1ece3] overflow-hidden">
      {/* Decorative ambient lighting */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-[radial-gradient(ellipse_at_top,#143b47_0%,transparent_50%)]" />
      
      <Container className="relative z-10 mb-20">
        {/* Intro */}
        <div className="flex flex-col items-center text-center">
          <span className="events-moment-text mb-4 inline-block text-[0.65rem] font-bold uppercase tracking-[0.45em] text-[#d89a55]">
            {WEDDINGS_IMMERSIVE_INTRO.kicker}
          </span>
          <h2 className="events-moment-text mb-2 font-serif text-5xl leading-tight text-white md:text-7xl">
            {WEDDINGS_IMMERSIVE_INTRO.titleLineOne}
          </h2>
          <h2 className="events-moment-text font-serif text-5xl leading-tight text-[#d89a55] italic md:text-7xl">
            {WEDDINGS_IMMERSIVE_INTRO.titleLineTwo}
          </h2>
          <p className="events-moment-text mx-auto mt-8 max-w-2xl text-lg text-[#f1ece3]/90">
            {WEDDINGS_IMMERSIVE_INTRO.description}
          </p>
        </div>

        {/* Stats 3D Dashboard */}
        <div className="events-moment-stats-grid mt-24 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {WEDDINGS_IMMERSIVE_STATS.map((stat, i) => (
            <div 
              key={i} 
              className="events-moment-stat relative flex flex-col items-center justify-center rounded-[2rem] border border-[#d89a55]/20 bg-[#143b47]/80 p-12 text-center backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            >
              <div className="font-serif text-5xl text-white md:text-6xl">{stat.value}</div>
              <p className="mt-4 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#d89a55]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>

      {/* HORIZONTAL GALLERY RUNNER */}
      <div ref={triggerRef} className="relative h-screen flex items-center overflow-hidden bg-[#0f1216]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1f3c44] to-transparent h-40 z-10 pointer-events-none" />
        <div className="moments-race flex items-center gap-12 px-10 md:px-32 will-change-transform">
          {WEDDINGS_IMMERSIVE_MOMENTS.map((moment, idx) => (
            <article 
              key={idx} 
              className="moment-hz-card group relative h-[60vh] w-[85vw] max-w-3xl shrink-0 overflow-hidden rounded-[2rem] shadow-2xl perspective-1000 transform-style-3d border border-white/10 bg-[#143b47]"
            >
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image 
                  src={moment.image}
                  alt={moment.alt}
                  fill
                  className="object-cover object-center will-change-transform scale-110 opacity-70 transition-opacity duration-700 group-hover:opacity-100 mix-blend-overlay"
                />
              </div>
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-[#0f1216]/40 to-transparent" />
              
              <div className="absolute inset-x-0 bottom-0 z-20 p-8 md:p-14 transform-style-3d translate-z-20">
                <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md border border-white/20">
                  {moment.eyebrow}
                </span>
                <h3 className="font-serif text-4xl text-white md:text-6xl">{moment.title}</h3>
                <div className="my-6 h-[1px] w-16 bg-[#d89a55]" />
                <p className="mt-2 max-w-2xl text-lg leading-relaxed text-[#f1ece3]/90 md:text-xl transform-gpu transition-all duration-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                  {moment.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
