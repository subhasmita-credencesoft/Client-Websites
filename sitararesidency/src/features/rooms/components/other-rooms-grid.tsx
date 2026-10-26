import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import type { CardItem } from '@/shared/types/content';

export function OtherRoomsGrid({ rooms }: { rooms: CardItem[] }) {
  if (rooms.length === 0) return null;

  return (
    <section className="border-t border-forest/10 bg-white px-4 py-12 sm:px-5 sm:py-16 md:px-8 md:py-20 lg:px-10 overflow-hidden">
      <div className="mx-auto max-w-[1400px] min-w-0">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <span className="font-mono-label text-[10px] uppercase tracking-widest text-terracotta font-bold">
              Alternative Accommodations
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl text-forest font-normal md:text-4xl break-words">
              Explore Other Suites &amp; Rooms
            </h2>
          </div>
          <Link
            href="/bedrooms"
            className="font-mono-label text-xs uppercase tracking-wider text-terracotta hover:underline underline-offset-4 flex items-center gap-1 shrink-0"
          >
            View all rooms <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
          {rooms.map((room) => (
            <Link
              key={room.slug}
              href={`/bedrooms/${room.slug}`}
              className="group flex flex-col sm:flex-row overflow-hidden rounded-sm border border-forest/10 bg-cream/40 transition-all hover:shadow-xl hover:border-forest/25 min-w-0"
            >
              <div className="relative aspect-[16/10] sm:aspect-[4/3] sm:w-2/5 shrink-0 overflow-hidden bg-forest/20">
                <Image
                  src={room.image}
                  alt={room.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-between p-5 sm:p-6 sm:w-3/5 min-w-0">
                <div className="min-w-0">
                  <span className="font-mono-label text-[9px] uppercase tracking-widest text-terracotta">
                    {room.eyebrow}
                  </span>
                  <h3 className="mt-1 font-display text-xl sm:text-2xl text-forest font-medium group-hover:text-terracotta transition-colors break-words">
                    {room.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-sage-muted line-clamp-2">
                    {room.description}
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-forest/10 pt-3">
                  <span className="text-xs font-semibold text-forest truncate max-w-[65%]">{room.meta}</span>
                  <span className="font-mono-label text-[10px] uppercase tracking-wider text-terracotta flex items-center gap-1 group-hover:translate-x-1 transition-transform ml-auto sm:ml-0 shrink-0">
                    Explore <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
