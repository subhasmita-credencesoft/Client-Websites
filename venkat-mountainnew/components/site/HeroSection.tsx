import Image from "next/image";

import Button from "@/components/ui/Button";

type HeroSectionProps = {
  image: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  cta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  specs?: string[];
};

export function HeroSection({
  image,
  title,
  subtitle,
  eyebrow,
  cta,
  secondaryCta,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[560px] overflow-hidden border-b border-white/10 md:min-h-[calc(100svh-120px)]">
      <div className="absolute inset-0">
        <Image src={image} alt={title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(92deg,rgba(11,29,48,0.94)_0%,rgba(11,29,48,0.76)_44%,rgba(11,29,48,0.34)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(198,138,75,0.28),transparent_24%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[560px] w-full max-w-[1880px] items-center px-5 py-16 sm:px-6 md:min-h-[calc(100svh-120px)] md:py-20 lg:px-10 lg:py-24 xl:px-14">
        <div className="w-full max-w-[980px] text-white">
          {eyebrow ? (
            <p className="mb-4 text-[0.74rem] font-semibold uppercase tracking-[0.35em] text-[var(--accent-gold)] md:mb-5">
              {eyebrow}
            </p>
          ) : null}

          <h1 className="max-w-[980px] text-4xl font-bold leading-[1] sm:text-5xl md:text-[3.8rem] lg:text-[4.5rem]">
            {title}
          </h1>

          {subtitle ? (
            <p className="mt-5 max-w-[760px] text-base leading-8 text-white/82 md:mt-6 md:text-lg lg:text-[1.35rem]">
              {subtitle}
            </p>
          ) : null}

          {(cta || secondaryCta) ? (
            <div className="mt-8 flex flex-wrap gap-4 md:mt-10">
              {cta ? <Button href={cta.href}>{cta.label}</Button> : null}
              {secondaryCta ? (
                <Button href={secondaryCta.href} variant="light-outline">
                  {secondaryCta.label}
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
