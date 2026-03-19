"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CurvedLoop from "../ui/CurvedLoop";

const SLIDES = [
  {
    image: "https://bookonelocal.in/cdn/10ddf7cf67d12d14abcdc0f0d25343af58996604.jpg",
  },
  {
    image: "https://bookonelocal.in/cdn/pic9.jpeg",
  },
  {
    image: "https://bookonelocal.in/cdn/10ddf7cf67d12d14abcdc0f0d25343af58996604.jpg",
  },
];
const WORDS = ["Swimming pool", "Kids Area", "Entry area"];

gsap.registerPlugin(ScrollTrigger);

export default function WellnessMoodSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    SLIDES.slice(1).forEach((slide) => {
      const img = new window.Image();
      img.decoding = "async";
      img.src = slide.image;
    });
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        });

        tl.fromTo(
          ".wellness-mood-bg",
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" },
        ).fromTo(
          ".wellness-mood-loop",
          { y: 16, autoAlpha: 0, filter: "blur(6px)" },
          { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.7, ease: "power3.out" },
          "<+0.06",
        );

        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 88%",
            end: "bottom top",
            scrub: 1,
          },
        }).to(".wellness-mood-image", { yPercent: 7, scale: 1.06, ease: "none" }, 0);
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ".wellness-mood-loop",
        { y: 12, autoAlpha: 0, filter: "blur(4px)" },
        { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.55, ease: "power3.out", overwrite: "auto" },
      );
    });
    return () => mm.revert();
  }, [activeIndex]);

  return (
    <section ref={sectionRef} data-no-global-gsap className="relative h-screen min-h-[520px] w-full overflow-hidden bg-[#1c2427] text-white">
      <Image src={SLIDES[0].image} alt="" aria-hidden priority width={1} height={1} className="sr-only" />
      <div className="wellness-mood-bg absolute inset-0">
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`wellness-mood-image absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url('${slide.image}')` }}
            aria-hidden={index !== activeIndex}
          />
        ))}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 flex h-full w-full items-center">
        <div className="wellness-mood-loop w-full">
          <CurvedLoop
            speed={20}
            className="text-3xl font-serif text-white/75 md:text-6xl"
            marqueeText={
              <>
                {WORDS.map((word, index) => (
                  <span key={`${word}-${index}`} className="flex items-center gap-8">
                    <span>{word}</span>
                    {index < WORDS.length - 1 && (
                      <span className="text-white/40" aria-hidden="true">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                          <path d="M12 3.5c1.8 2.6 3 4.1 6 4.1-1.7 2.1-2.7 3.1-2.7 5.6S16.3 17 18 19c-3 0-4.2 1.5-6 4.1-1.8-2.6-3-4.1-6-4.1 1.7-2 2.7-3.1 2.7-5.6S6.7 9.6 6 7.6c3 0 4.2-1.5 6-4.1Z" />
                        </svg>
                      </span>
                    )}
                  </span>
                ))}
              </>
            }
          />
        </div>
      </div>
    </section>
  );
}
