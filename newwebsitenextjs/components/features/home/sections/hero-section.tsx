"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
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
          delay: 0.25,
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      data-section-id="home"
      data-cinematic-section
      ref={rootRef}
      className="relative flex min-h-[62svh] items-center overflow-hidden pb-6 pt-24 md:min-h-[82svh] md:pb-10 md:pt-32"
    >
      <div className="absolute inset-0 will-transform" data-cinematic-media data-zoom-scroll data-bg-parallax data-bg-depth="8">
        {heroBackgroundUrls.map((background, index) => (
          <Image
            key={background}
            src={background}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className={`absolute inset-0 object-cover transition-opacity duration-1000 ${index === activeBackgroundIndex ? "opacity-100" : "opacity-0"}`}
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

      <div className="cinematic-glow absolute left-[-10%] top-[12%] h-[24rem] w-[24rem]" data-cinematic-glow />
      <div className="cinematic-glow absolute bottom-[-8%] right-[-6%] h-[20rem] w-[20rem]" data-cinematic-glow />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,5,7,0.18)_0%,rgba(8,8,10,0.55)_42%,rgba(3,3,5,0.94)_100%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[95rem] flex-col gap-3 px-5 md:gap-5 md:px-14" data-cinematic-copy>
        <h1
          data-section-title
          className="max-w-[18ch] text-[1.02rem] leading-[1.04] text-[#c9a467] md:max-w-4xl md:text-[2.5rem] xl:text-[2.8rem]"
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
          transition={{ delay: 1.05, duration: 0.9 }}
          className="max-w-[23ch] text-balance text-[0.86rem] leading-snug text-white md:max-w-4xl md:text-[1.35rem] xl:text-[1.5rem]"
        >
          {homeSectionContent.hero.subtitle}
        </motion.p>

        {homeSectionContent.hero.description ? (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.85 }}
            className="max-w-3xl text-balance text-[0.82rem] leading-relaxed text-white/78 md:text-base"
          >
            {homeSectionContent.hero.description}
          </motion.p>
        ) : null}

      </div>
    </section>
  );
}
