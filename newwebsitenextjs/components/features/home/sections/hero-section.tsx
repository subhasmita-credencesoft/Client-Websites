import { heroBackgroundUrls } from "@/lib/data/content/media-assets";
import { homeSectionContent } from "@/lib/data/content/home/sections";
import { QuickBookingStrip } from "@/components/features/home/sections/quick-booking-strip";

const { title, subtitle } = homeSectionContent.hero;

export function HeroSection() {
  const words = title.split(" ");
  const half = Math.ceil(words.length / 2);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      {/* Background images */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {heroBackgroundUrls.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center 30%",
              opacity: i === 0 ? 1 : 0,
              animation: `fadeIn 2s ${i * 6}s both, kenburns 24s ${i * 6}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Gradient overlays — keep text readable */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-black/10 to-black/60" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/30 via-transparent to-transparent" />

      {/* Content — centered vertically, sitting above the booking strip */}
      <div className="relative z-[2] flex h-full items-center justify-center px-5 pb-16 text-center sm:px-8 sm:pb-28">
        <div className="flex max-w-3xl flex-col items-center gap-3 sm:gap-4">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)] sm:text-[0.72rem] lg:text-[0.8rem]">
            The Mountain Resort &middot; Karjat
          </span>

          <h1 className="max-w-[22ch] text-[clamp(1.75rem,5.5vw,3.4rem)] leading-[1.08] tracking-[-0.01em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] sm:text-[clamp(2rem,4.8vw,3.8rem)] lg:text-[clamp(2.2rem,4vw,4rem)]">
            <span className="block">{words.slice(0, half).join(" ")}</span>
            <span className="block text-[var(--color-primary-hover)]">{words.slice(half).join(" ")}</span>
          </h1>

          <div className="mx-auto h-px w-14 bg-gradient-to-r from-transparent via-[var(--color-primary)]/50 to-transparent sm:w-20" />

          <p className="max-w-[42ch] text-[0.88rem] font-light leading-relaxed text-white/75 sm:text-[1rem] lg:text-[1.1rem]">
            {subtitle}
          </p>

          <div className="mt-1 flex flex-col items-center gap-2.5 sm:flex-row sm:gap-3">
            <a
              href="#booking"
              className="site-button site-button-primary rounded-full px-7 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] sm:px-9 sm:text-[0.72rem]"
            >
              Check Availability
            </a>
            <a
              href="#about"
              className="site-button site-button-outline rounded-full px-7 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] sm:px-9 sm:text-[0.72rem]"
            >
              Explore the Estate
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator — above booking bar */}
      <div className="absolute bottom-20 left-1/2 z-[2] -translate-x-1/2 animate-bounce sm:bottom-32">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-white/40 stroke-[1.5]">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>

      {/* Booking bar — overlaid at bottom of hero with transparent glass */}
      <div className="absolute inset-x-0 bottom-0 z-[3] hidden sm:block">
        <QuickBookingStrip />
      </div>
    </section>
  );
}
