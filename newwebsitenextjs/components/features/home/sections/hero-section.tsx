import { heroBackgroundUrls } from "@/lib/data/content/media-assets";
import { homeSectionContent } from "@/lib/data/content/home/sections";

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
              backgroundPosition: "center 40%",
              opacity: i === 0 ? 1 : 0,
              animation: `fadeIn 2s ${i * 6}s both, kenburns 24s ${i * 6}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/30 via-transparent to-transparent" />

      {/* Content — vertically centered */}
      <div className="relative z-[2] flex h-full items-center px-6 lg:px-12">
        <div className="flex max-w-3xl flex-col gap-5">
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)] sm:text-[0.88rem]">
            The Mountain Resorts · Karjat
          </span>

          <h1 className="max-w-[14ch] text-[clamp(2.2rem,8vw,4.5rem)] leading-[0.92] tracking-[-0.02em] text-[var(--color-primary-hover)] drop-shadow-[0_14px_32px_rgba(0,0,0,0.5)] sm:max-w-[16ch] sm:text-[clamp(2.5rem,7vw,4.5rem)] md:max-w-[18ch] lg:max-w-[22ch]">
            <span className="block">{words.slice(0, half).join(" ")}</span>
            <span className="block">{words.slice(half).join(" ")}</span>
          </h1>

          <p className="max-w-[52ch] text-[1.05rem] font-light leading-relaxed text-white/90 drop-shadow-lg sm:text-[1.2rem] lg:text-[1.35rem]">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
