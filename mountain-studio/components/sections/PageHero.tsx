"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { useParallax } from "@/hooks/useParallax";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  image: string;
  eyebrow: string;
  title: string;
  description?: string;
  heightClassName?: string;
  ctaHref?: string;
  ctaLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  overlayClassName?: string;
  priority?: boolean;
}

export function PageHero({
  image,
  eyebrow,
  title,
  description,
  heightClassName = "min-h-[78vh]",
  ctaHref,
  ctaLabel,
  secondaryHref,
  secondaryLabel,
  overlayClassName,
  priority
}: PageHeroProps) {
  const y = useParallax(0.18);

  return (
    <section className={cn("relative isolate overflow-hidden", heightClassName)}>
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          priority={priority}
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>
      <div className={cn("absolute inset-0 bg-gradient-to-t from-dark via-dark/45 to-black/10", overlayClassName)} />
      <div className="container-shell relative flex min-h-[inherit] items-end py-28 sm:py-32 lg:py-40">
        <div className="max-w-4xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display-title max-w-4xl text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            {title}
          </h1>
          {description ? (
            <p className="mt-6 max-w-2xl text-base leading-8 text-ivory/72 sm:text-lg">{description}</p>
          ) : null}
          {(ctaHref && ctaLabel) || (secondaryHref && secondaryLabel) ? (
            <div className="mt-10 flex flex-wrap gap-4">
              {ctaHref && ctaLabel ? <LuxuryButton href={ctaHref} label={ctaLabel} /> : null}
              {secondaryHref && secondaryLabel ? (
                <LuxuryButton href={secondaryHref} label={secondaryLabel} variant="ghost" />
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
