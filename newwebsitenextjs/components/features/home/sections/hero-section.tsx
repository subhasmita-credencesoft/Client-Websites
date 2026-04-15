import Image from "next/image";
import { DIRECT_BOOKING_ENGINE_URL } from "@/lib/constants/booking";
import { heroBackgroundUrls } from "@/lib/data/content/media-assets";
import { homeSectionContent } from "@/lib/data/content/resort-content";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { HeroBackgroundRotator } from "./hero-background-rotator";

export function HeroSection() {
  const heroTitleWords = homeSectionContent.hero.title.split(" ");

  return (
    <section
      id="home"
      data-section-id="home"
      data-cinematic-section
      className="relative flex min-h-[34rem] items-start pt-20 sm:min-h-[40rem] sm:pt-24 md:min-h-[46rem] md:pt-28 lg:min-h-[calc(100svh-5.2rem)] lg:items-center lg:pt-32"
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
          className="cinematic-glow absolute left-[-10%] top-[12%] h-[24rem] w-[24rem] content-auto-section"
          data-cinematic-glow
        />
        <div
          aria-hidden="true"
          className="cinematic-glow absolute bottom-[-8%] right-[-6%] h-[20rem] w-[20rem] content-auto-section"
          data-cinematic-glow
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,5,7,0.28)_0%,rgba(8,8,10,0.52)_36%,rgba(3,3,5,0.84)_100%)]"
        />
      </div>
      <div
        className="site-container relative z-10 flex min-h-[34rem] w-full max-w-[96rem] flex-col pb-8 sm:min-h-[40rem] sm:pb-10 md:min-h-[46rem] md:pb-12 lg:min-h-[calc(100svh-5.2rem)] lg:pb-18"
        data-cinematic-copy
      >
        <div className="mt-4 flex max-w-[min(100%,17rem)] flex-col gap-4 sm:mt-6 sm:max-w-[min(100%,21rem)] md:mt-10 md:max-w-[min(100%,28rem)] lg:mt-auto lg:max-w-[min(100%,34rem)] lg:gap-4">
          <p className="text-[0.56rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-primary-hover)] sm:text-[0.62rem]">
            The Mountain Resort in Karjat
          </p>
          <h1
            data-section-title
            className="max-w-[9ch] text-[clamp(2rem,10vw,4.2rem)] leading-[0.9] text-[var(--color-primary-hover)] drop-shadow-[0_12px_28px_rgba(0,0,0,0.45)] transition-all duration-700 ease-out sm:max-w-[10ch] md:max-w-[11ch] lg:max-w-[11ch]"
          >
            {heroTitleWords.map((word, wordIndex) => (
              <span
                key={`${word}-${wordIndex}`}
                className="hero-letter mr-[0.14em] inline-block whitespace-nowrap animate-[fadeInUp_0.5s_cubic-bezier(0.22,1,0.36,1)_forwards] [animation-delay:calc(var(--hero-index)*30ms)] [opacity:0] [transform:translate3d(0,18px,0)] [transform-style:preserve-3d]"
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
            className="max-w-[16rem] animate-[fadeInUp_0.56s_cubic-bezier(0.22,1,0.36,1)_0.12s_forwards] text-balance text-[0.94rem] leading-relaxed text-white [text-shadow:0_10px_24px_rgba(0,0,0,0.45)] opacity-0 sm:max-w-[20rem] md:max-w-[24rem] lg:max-w-[28rem] lg:text-[1.02rem]"
            role="none"
          >
            {homeSectionContent.hero.subtitle}
          </p>

          {homeSectionContent.hero.description ? (
            <p
              className="max-w-[18rem] animate-[fadeInUp_0.5s_ease-out_0.2s_forwards] text-balance text-[var(--text-sm)] leading-relaxed text-white/82 opacity-0 sm:max-w-[23rem] md:max-w-[30rem] lg:max-w-[36rem] lg:text-[var(--text-base)]"
              role="none"
            >
              {homeSectionContent.hero.description}
            </p>
          ) : null}

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <MagneticButton href={DIRECT_BOOKING_ENGINE_URL} variant="primary" size="md" className="w-full justify-center rounded-full px-6 sm:w-auto">
              {homeSectionContent.hero.primaryCta}
            </MagneticButton>
            <MagneticButton href="/standard-room" variant="secondary" size="md" className="w-full justify-center rounded-full px-6 sm:w-auto">
              {homeSectionContent.hero.secondaryCta}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
