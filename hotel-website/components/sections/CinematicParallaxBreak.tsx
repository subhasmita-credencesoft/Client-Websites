"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../ui/Container";

export default function CinematicParallaxBreak({ title, subtitle, image, reverse = false }: { title: string, subtitle: string, image: string, reverse?: boolean }) {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Parallax image
      gsap.fromTo(
        imageRef.current,
        { yPercent: -15, scale: 1.1 },
        {
          yPercent: 15,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Text reveal
      gsap.fromTo(
        ".cinematic-text",
        { y: 50, autoAlpha: 0, filter: "blur(4px)" },
        {
          y: 0,
          autoAlpha: 1,
          filter: "blur(0px)",
          stagger: 0.2,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative flex min-h-[60vh] items-center overflow-hidden bg-[#1f3c44] text-[#e5d3b3]">
      <div className="absolute inset-0 z-0">
        <div 
          ref={imageRef}
          className="h-[130%] w-full bg-cover bg-center bg-no-repeat opacity-40 brightness-75 mix-blend-overlay"
          style={{ backgroundImage: `url("${image}")` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1f3c44]/90 via-[#1f3c44]/40 to-[#1f3c44]/90" />
      </div>

      <Container className="relative z-10 w-full py-24">
        <div className={`flex flex-col ${reverse ? 'items-end text-right' : 'items-start text-left'}`}>
          <div className="cinematic-text mb-4 inline-flex items-center gap-4">
            {!reverse && <div className="h-[1px] w-12 bg-[#f7c744]" />}
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#f7c744]">Experience The Extraordinary</span>
            {reverse && <div className="h-[1px] w-12 bg-[#f7c744]" />}
          </div>
          <h2 className="cinematic-text font-serif text-4xl leading-tight text-white md:text-5xl lg:text-7xl">
            {title}
          </h2>
          <p className="cinematic-text mt-6 max-w-2xl text-lg text-gray-300 md:text-xl">
            {subtitle}
          </p>
        </div>
      </Container>
    </section>
  );
}
