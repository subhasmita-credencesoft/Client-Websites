import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/shared/container";
interface InternalPageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: string;
}

export function InternalPageHero({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  imagePosition,
}: InternalPageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-stone-950" />
      <div className="absolute inset-0 -z-10">
        <Image
          alt={imageAlt}
          className="h-full w-full object-cover"
          fill
          priority
          sizes="100vw"
          src={imageSrc}
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,20,18,0.46),rgba(24,20,18,0.52),rgba(24,20,18,0.64))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_32%),linear-gradient(90deg,rgba(18,14,12,0.16),rgba(18,14,12,0.04),rgba(18,14,12,0.16))]" />
      </div>

      <div className="absolute inset-x-0 top-0 z-10 h-px bg-white/20" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-px bg-white/16" />

      <Container className="relative z-20">
        <div className="flex min-h-[32rem] flex-col items-center justify-center px-4 pb-12 pt-20 text-center sm:min-h-[36rem] sm:pb-14 sm:pt-24 lg:min-h-[40rem] lg:pb-16 lg:pt-28">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-amber-200/90 sm:text-sm">{eyebrow}</p>
          <h1 className="mt-5 max-w-5xl font-display text-5xl font-semibold leading-[0.95] text-white sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-white/85 sm:text-lg">
            {description}
          </p>

          <div className="mt-12 inline-flex items-center gap-3 rounded-full border border-white/16 bg-white/10 px-5 py-3 backdrop-blur-md">
            <Link className="text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:text-amber-200" href="/#home">
              Home
            </Link>
            <span className="text-white/45">/</span>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/82">{eyebrow}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
