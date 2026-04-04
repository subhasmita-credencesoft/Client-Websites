import Image from "next/image";
import { heroBackgroundUrls } from "@/lib/data/content/media-assets";
import { homeSectionContent } from "@/lib/data/content/resort-content";
import { QuickBookingStrip } from "@/components/features/home/sections/quick-booking-strip";
import { HeroBackgroundRotator } from "./hero-background-rotator";

export function HeroSection() {
  const heroTitleWords = homeSectionContent.hero.title.split(" ");

  return (
    <section
      id="home"
      data-section-id="home"
      data-cinematic-section
      className="relative flex min-h-[42rem] items-start pt-20 sm:min-h-[46rem] md:min-h-[50rem] md:pt-24 lg:min-h-[calc(100svh-6rem)] lg:items-center"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 will-change-transform"
          data-cinematic-media
          data-zoom-scroll
          data-bg-parallax
          data-bg-depth="12"
          data-hero-media
        >
          <Image
            src={heroBackgroundUrls[0]}
            alt="Resort hero background"
            fill
            priority
            fetchPriority="high"
            loading="eager"
            sizes="100vw"
            quality={80}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/..."
            className="absolute inset-0 object-cover"
          />
          {heroBackgroundUrls.length > 1 ? (
            <HeroBackgroundRotator images={heroBackgroundUrls.slice(1)} />
          ) : null}
        </div>
        <div
          aria-hidden="true"
          className="cinematic-glow absolute left-[-10%] top-[12%] h-[24rem] w-[24rem]"
          data-cinematic-glow
          style={{ contentVisibility: "auto" }}
        />
        <div
          aria-hidden="true"
          className="cinematic-glow absolute bottom-[-8%] right-[-6%] h-[20rem] w-[20rem]"
          data-cinematic-glow
          style={{ contentVisibility: "auto" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,5,7,0.34)_0%,rgba(8,8,10,0.6)_42%,rgba(3,3,5,0.8)_100%)]"
        />
      </div>
      <div
        className="relative z-10 mx-auto flex min-h-[42rem] w-full max-w-[95rem] flex-col px-4 pb-10 sm:min-h-[46rem] sm:px-5 sm:pb-12 md:min-h-[50rem] md:px-8 md:pb-16 lg:min-h-[calc(100svh-6rem)] lg:px-14 lg:pb-32"
        data-cinematic-copy
      >
        <div className="mt-6 flex max-w-[min(100%,19rem)] flex-col gap-3 pb-4 pt-4 sm:mt-8 sm:max-w-[min(100%,24rem)] sm:pt-6 md:mt-10 md:max-w-[min(100%,36rem)] md:pt-8 lg:mt-auto lg:max-w-[min(100%,58rem)] lg:gap-4 lg:pb-10 lg:pt-16">
          <h1
            data-section-title
            className="max-w-[11ch] text-[clamp(2.2rem,9vw,3.2rem)] leading-[0.96] text-[#d7b57c] drop-shadow-[0_10px_24px_rgba(0,0,0,0.45)] transition-all duration-700 ease-out sm:max-w-[12ch] md:max-w-[14ch] md:text-[2.6rem] lg:max-w-[18ch] lg:text-[3.2rem] xl:max-w-[20ch] xl:text-[3.6rem]"
          >
            {heroTitleWords.map((word, wordIndex) => (
              <span
                key={`${word}-${wordIndex}`}
                className="hero-letter mr-[0.18em] inline-block whitespace-nowrap animate-[fadeInUp_0.42s_ease-out_forwards] [animation-delay:calc(var(--hero-index)*16ms)] [opacity:0] [transform:translate3d(0,10px,0)] [transform-style:preserve-3d]"
                style={{
                  ["--hero-index" as string]: wordIndex,
                  willChange: wordIndex < 3 ? "opacity, transform" : "auto",
                }}
              >
                {word}
              </span>
            ))}
          </h1>

          <p
            className="max-w-[17rem] animate-[fadeInUp_0.5s_ease-out_0.12s_forwards] text-balance text-[0.92rem] leading-snug text-white [text-shadow:0_10px_24px_rgba(0,0,0,0.45)] opacity-0 sm:max-w-[22rem] sm:text-[1rem] md:max-w-[30rem] md:text-[1.08rem] lg:max-w-[42rem] lg:text-[1.32rem] xl:text-[1.5rem]"
            role="none"
          >
            {homeSectionContent.hero.subtitle}
          </p>

          {homeSectionContent.hero.description ? (
            <p
              className="max-w-[17rem] animate-[fadeInUp_0.5s_ease-out_0.2s_forwards] text-balance text-[0.8rem] leading-relaxed text-white/82 opacity-0 sm:max-w-[22rem] sm:text-[0.86rem] md:max-w-[30rem] md:text-[0.92rem] lg:max-w-[38rem] lg:text-[1rem]"
              role="none"
            >
              {homeSectionContent.hero.description}
            </p>
          ) : null}
        </div>
        <div className="relative z-20 mt-3 w-full sm:mt-4 md:mt-5 lg:hidden">
          <QuickBookingStrip insideHero />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-7 z-20 hidden lg:block">
        <QuickBookingStrip insideHero />
      </div>
    </section>
  );
}
