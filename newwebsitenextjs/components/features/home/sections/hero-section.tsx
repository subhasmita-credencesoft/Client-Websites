"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { heroBackgroundUrls, heroVideoUrls } from "@/lib/data/content/media-assets";
import { homeSectionContent } from "@/lib/data/content/resort-content";
import { QuickBookingStrip } from "@/components/features/home/sections/quick-booking-strip";

export function HeroSection() {
  const [activeBackgroundIndex, setActiveBackgroundIndex] = useState(0);
  const [slideshowReady, setSlideshowReady] = useState(false);
  const [videoReadySrc, setVideoReadySrc] = useState("");
  const heroTitleWords = homeSectionContent.hero.title.split(" ");

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
      className="relative flex min-h-[48rem] items-start overflow-hidden pt-20 sm:min-h-[52rem] md:min-h-[56rem] md:pt-24 lg:min-h-[calc(100svh-6rem)] lg:items-center"
    >
      <div
        className="absolute inset-0 will-transform"
        data-cinematic-media
        data-zoom-scroll
        data-bg-parallax
        data-bg-depth="12"
        data-hero-media
      >
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
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,5,7,0.34)_0%,rgba(8,8,10,0.6)_42%,rgba(3,3,5,0.8)_100%)]" />

      <div
        className="relative z-10 mx-auto flex min-h-[48rem] w-full max-w-[95rem] flex-col px-4 pb-14 sm:min-h-[52rem] sm:px-5 sm:pb-16 md:min-h-[56rem] md:px-8 md:pb-20 lg:min-h-[calc(100svh-6rem)] lg:px-14 lg:pb-32"
        data-cinematic-copy
      >
        <div className="mt-8 flex max-w-[min(100%,19rem)] flex-col gap-3 pb-8 pt-6 sm:mt-12 sm:max-w-[min(100%,24rem)] sm:pt-8 md:mt-16 md:max-w-[min(100%,36rem)] md:pt-10 lg:mt-auto lg:max-w-[min(100%,58rem)] lg:gap-4 lg:pb-10 lg:pt-16">
          <h1
            data-section-title
            className="max-w-[11ch] text-[clamp(2.2rem,9vw,3.2rem)] leading-[0.96] text-[#d7b57c] drop-shadow-[0_10px_24px_rgba(0,0,0,0.45)] transition-all duration-700 ease-out sm:max-w-[12ch] md:max-w-[14ch] md:text-[2.6rem] lg:max-w-[18ch] lg:text-[3.2rem] xl:max-w-[20ch] xl:text-[3.6rem]"
          >
            {(() => {
              let letterIndex = 0;
              return heroTitleWords.map((word, wordIndex) => (
                <span key={`${word}-${wordIndex}`} className="mr-[0.18em] inline-block whitespace-nowrap last:mr-0">
                  {word.split("").map((char) => {
                    const currentIndex = letterIndex;
                    letterIndex += 1;

                    return (
                      <span
                        key={`${word}-${char}-${currentIndex}`}
                        className="hero-letter inline-block animate-[fadeInUp_0.7s_ease-out_forwards] [animation-delay:calc(var(--hero-index)*35ms)] [opacity:0] [transform:translate3d(0,18px,0)] [transform-style:preserve-3d]"
                        style={{ ["--hero-index" as string]: currentIndex }}
                      >
                        {char}
                      </span>
                    );
                  })}
                </span>
              ));
            })()}
          </h1>

          <p className="max-w-[17rem] animate-[fadeInUp_0.8s_ease-out_0.65s_forwards] text-balance text-[0.92rem] leading-snug text-white [text-shadow:0_10px_24px_rgba(0,0,0,0.45)] opacity-0 sm:max-w-[22rem] sm:text-[1rem] md:max-w-[30rem] md:text-[1.08rem] lg:max-w-[42rem] lg:text-[1.32rem] xl:text-[1.5rem]">
            {homeSectionContent.hero.subtitle}
          </p>

          {homeSectionContent.hero.description ? (
            <p className="max-w-[17rem] animate-[fadeInUp_0.8s_ease-out_0.8s_forwards] text-balance text-[0.8rem] leading-relaxed text-white/82 opacity-0 sm:max-w-[22rem] sm:text-[0.86rem] md:max-w-[30rem] md:text-[0.92rem] lg:max-w-[38rem] lg:text-[1rem]">
              {homeSectionContent.hero.description}
            </p>
          ) : null}
        </div>
        <div className="mt-5 w-full sm:mt-6 md:mt-8 lg:hidden">
          <QuickBookingStrip insideHero />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-7 z-20 hidden lg:block">
        <QuickBookingStrip insideHero />
      </div>
    </section>
  );
}
