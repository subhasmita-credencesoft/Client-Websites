import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import type { CardItem } from '@/shared/types/content';

function ArrowUpRightIcon() {
  return <ArrowRight className="h-4 w-4 -rotate-45" />;
}

export function Card({
  item,
  tall = false,
  href,
}: {
  item: CardItem;
  tall?: boolean;
  href: string;
}) {
  return (
    <Link
      href={href}
      data-testid={`card-${item.slug}`}
      className={`group block ${tall ? 'md:row-span-2' : ''}`}
    >
      <div
        className={`relative overflow-hidden bg-sage ${
          tall ? 'aspect-[4/5] md:aspect-auto md:h-full min-h-[320px]' : 'aspect-[4/3] min-h-[260px]'
        }`}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="image-fade object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/75 via-forest/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-cream">
          <p className="font-mono-label text-[9px] text-apricot">{item.eyebrow}</p>
          <h3 className="mt-1.5 sm:mt-2 font-display text-2xl sm:text-3xl italic leading-tight">{item.title}</h3>
          <p className="mt-1.5 sm:mt-2 max-w-sm text-xs leading-5 text-cream/80 line-clamp-3 sm:line-clamp-none">
            {item.description}
          </p>
          {item.meta && (
            <p className="mt-2.5 sm:mt-3 text-[9px] font-mono-label text-cream/60">
              {item.meta}
            </p>
          )}
        </div>
        <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center border border-cream/60 text-cream opacity-0 transition-opacity group-hover:opacity-100">
          <ArrowUpRightIcon />
        </span>
      </div>
    </Link>
  );
}