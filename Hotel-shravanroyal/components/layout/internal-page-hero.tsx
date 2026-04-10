import Image from "next/image";

import { Container } from "@/components/shared/container";
import { CtaButton } from "@/components/shared/cta-button";

interface InternalPageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

export function InternalPageHero({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  imagePosition,
  primaryCtaLabel = "Book Now",
  primaryCtaHref = "/booking",
  secondaryCtaLabel = "Back To Home",
  secondaryCtaHref = "/#home",
}: InternalPageHeroProps) {
  return (
    <section className="relative overflow-hidden pb-6 pt-10 sm:pb-8 sm:pt-14">
      <div className="absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-secondary/90 via-background to-background" />
      <div className="absolute left-1/2 top-0 -z-10 h-56 w-56 -translate-x-1/2 rounded-full bg-amber-300/20 blur-3xl sm:h-72 sm:w-72" />
      <Container>
        <div className="ornament-border overflow-hidden rounded-[2rem] bg-white/78 shadow-soft backdrop-blur-xl">
          <div className="grid items-stretch lg:grid-cols-[1.15fr_0.85fr]">
            <div className="px-6 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/80 sm:text-sm">{eyebrow}</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
              <p className="mt-5 max-w-3xl text-base text-muted-foreground sm:text-lg">{description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CtaButton href={primaryCtaHref} label={primaryCtaLabel} />
                <CtaButton href={secondaryCtaHref} label={secondaryCtaLabel} variant="outline" />
              </div>
            </div>

            <div className="relative min-h-[280px] border-t border-border/50 lg:min-h-full lg:border-l lg:border-t-0">
              <Image
                alt={imageAlt}
                className="h-full w-full object-cover"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                src={imageSrc}
                style={imagePosition ? { objectPosition: imagePosition } : undefined}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/35 via-stone-950/10 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-stone-950/5 lg:to-stone-950/25" />
              <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] bg-white/82 p-4 shadow-soft backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-6 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/75">Signature View</p>
                <p className="mt-2 font-display text-2xl font-semibold text-stone-900 sm:text-3xl">{eyebrow}</p>
                <p className="mt-2 text-sm text-muted-foreground sm:text-base">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
