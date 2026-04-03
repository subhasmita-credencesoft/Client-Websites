"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { heroBackgroundUrls, heroVideoUrls } from "@/lib/data/content/media-assets";
import { homeSectionContent } from "@/lib/data/content/resort-content";

export function HeroSection() {
  const [activeBackgroundIndex, setActiveBackgroundIndex] = useState(0);
  const [slideshowReady, setSlideshowReady] = useState(false);
  const [videoReadySrc, setVideoReadySrc] = useState("");

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.innerWidth >= 1024;
    if (reducedMotion || !isDesktop || heroBackgroundUrls.length <= 1) return;

    const bootTimer = window.setTimeout(() => {
      setSlideshowReady(true);
    }, 1600);

    const interval = window.setInterval(() => {
      setActiveBackgroundIndex((current) => (current + 1) % heroBackgroundUrls.length);
    }, 4200);

    return () => {
      window.clearTimeout(bootTimer);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <section
      id="home"
      data-section-id="home"
      data-cinematic-section
      className="relative flex min-h-[62svh] items-center overflow-hidden pb-6 pt-24 md:min-h-[82svh] md:pb-10 md:pt-32"
    >
      <div className="absolute inset-0 will-transform" data-cinematic-media data-zoom-scroll data-bg-parallax data-bg-depth="8">
        {heroBackgroundUrls.map((background, index) =>
          slideshowReady || index === 0 ? (
            <Image
              key={background}
              src={background}
              alt=""
              fill
              priority={index === 0}
              fetchPriority={index === 0 ? "high" : "auto"}
              loading={index === 0 ? "eager" : "lazy"}
              sizes="100vw"
              className={`absolute inset-0 object-cover transition-opacity duration-1000 ${index === activeBackgroundIndex ? "opacity-100" : "opacity-0"}`}
            />
          ) : null,
        )}
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
          className="max-w-[18ch] text-[1.02rem] leading-[1.04] text-[#c9a467] transition-all duration-700 ease-out md:max-w-4xl md:text-[2.5rem] xl:text-[2.8rem]"
        >
          {homeSectionContent.hero.title.split("").map((char, index) => (
            <span
              key={`${char}-${index}`}
              className="hero-letter inline-block animate-[fadeInUp_0.7s_ease-out_forwards] [animation-delay:calc(var(--hero-index)*35ms)] [opacity:0] [transform:translate3d(0,18px,0)] [transform-style:preserve-3d]"
              style={{ ["--hero-index" as string]: index }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <p className="max-w-[23ch] animate-[fadeInUp_0.8s_ease-out_0.65s_forwards] text-balance text-[0.86rem] leading-snug text-white opacity-0 md:max-w-4xl md:text-[1.35rem] xl:text-[1.5rem]">
          {homeSectionContent.hero.subtitle}
        </p>

        {homeSectionContent.hero.description ? (
          <p className="max-w-3xl animate-[fadeInUp_0.8s_ease-out_0.8s_forwards] text-balance text-[0.82rem] leading-relaxed text-white/78 opacity-0 md:text-base">
            {homeSectionContent.hero.description}
          </p>
        ) : null}

      </div>
    </section>
  );
}
