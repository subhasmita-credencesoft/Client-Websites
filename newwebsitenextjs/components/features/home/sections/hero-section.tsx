"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { heroBackgroundUrls, heroVideoUrls } from "@/lib/data/content/media-assets";
import { homeSectionContent } from "@/lib/data/content/resort-content";

export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeBackgroundIndex, setActiveBackgroundIndex] = useState(0);
  const [videoReadySrc, setVideoReadySrc] = useState("");

  useEffect(() => {
    if (heroBackgroundUrls.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveBackgroundIndex((current) => (current + 1) % heroBackgroundUrls.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray<HTMLElement>(".hero-letter");
      gsap.fromTo(
        letters,
        {
          yPercent: 130,
          opacity: 0,
          rotateX: -65,
        },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.03,
          delay: 0.3,
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      data-section-id="home"
      ref={rootRef}
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-20 pt-32"
    >
      <div className="absolute inset-0 will-transform" data-zoom-scroll data-bg-parallax data-bg-depth="8">
        {heroBackgroundUrls.map((background, index) => (
          <div
            key={background}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === activeBackgroundIndex ? "opacity-100" : "opacity-0"}`}
            style={{ backgroundImage: `url(${background})` }}
          />
        ))}
        {heroVideoUrls[0] ? (
          <video
            key={heroVideoUrls[0]}
            className={`h-full w-full object-cover transition-opacity duration-700 ${videoReadySrc === heroVideoUrls[0] ? "opacity-100" : "opacity-0"}`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={heroBackgroundUrls[activeBackgroundIndex]}
            onCanPlay={() => setVideoReadySrc(heroVideoUrls[0])}
            onError={() => setVideoReadySrc("")}
          >
            <source src={heroVideoUrls[0]} type="video/mp4" />
          </video>
        ) : null}
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,5,7,0.18)_0%,rgba(8,8,10,0.55)_42%,rgba(3,3,5,0.94)_100%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[95rem] flex-col gap-8 px-6 md:px-14">
        <h1
          data-section-title
          className="max-w-5xl text-[1.95rem] leading-[1.04] text-[#c9a467] md:text-[4.85rem]"
        >
          {homeSectionContent.hero.title.split("").map((char, index) => (
            <span
              key={`${char}-${index}`}
              className="hero-letter inline-block [transform-style:preserve-3d]"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="max-w-5xl text-balance text-2xl leading-snug text-white md:text-[3.1rem]"
        >
          {homeSectionContent.hero.subtitle}
        </motion.p>

        {/* <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.95 }}
          className="mt-2 flex items-center gap-4"
        >
          <MagneticButton href="#reserve">{homeSectionContent.hero.cta}</MagneticButton>
        </motion.div> */}
      </div>
    </section>
  );
}
