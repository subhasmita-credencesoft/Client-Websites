import Image from 'next/image';
import type { ImageSource } from '@/shared/types/content';

export function PageIntro({
  eyebrow,
  title,
  intro,
  image,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  image: ImageSource;
}) {
  return (
    <section className="page-intro bg-parchment px-5 pb-12 pt-28 sm:pb-16 sm:pt-32 md:px-10 md:pb-20 md:pt-36">
      <div className="mx-auto grid max-w-[1440px] gap-10 md:gap-12 grid-cols-1 md:grid-cols-[1fr_.8fr] md:items-end">
        <div>
          <p className="font-mono-label text-[10px] text-terracotta">{eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.4rem,9vw,5rem)] sm:text-6xl md:text-8xl leading-tight sm:leading-[.9] text-forest">
            {title}
          </h1>
          <p className="mt-5 max-w-lg text-sm sm:text-base leading-7 text-sage-muted">{intro}</p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}