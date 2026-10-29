import Image from 'next/image';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { eventSpaces } from '@/features/events/data/events';
import { ROUTES } from '@/core/constants/routes';

export function EventSpacesGrid() {
  return (
    <div className="grid gap-10 lg:grid-cols-3">
      {eventSpaces.map((space) => (
        <article
          key={space.id}
          className="group relative flex flex-col justify-between border border-forest/15 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-terracotta/60 hover:shadow-2xl overflow-hidden"
        >
          {/* Top image container with cinematic overlay */}
          <div>
            <Link
              href={ROUTES.eventDetail(space.id)}
              className="relative block aspect-[16/10] overflow-hidden bg-forest"
            >
              <Image
                src={space.image}
                alt={space.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108 group-hover:brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:opacity-85" />

              {/* Floating badges */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="font-mono-label text-[10px] uppercase tracking-wider bg-black/60 backdrop-blur-md px-2.5 py-1 text-cream border border-white/10">
                  {space.area}
                </span>
              </div>

              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                <span className="font-mono-label text-[10px] uppercase tracking-wider bg-terracotta px-2.5 py-1 text-cream font-semibold shadow-sm">
                  Up to {space.capacities.floating} Guests
                </span>
                <span className="font-mono-label text-[10px] uppercase tracking-widest text-apricot flex items-center gap-1 group-hover:underline">
                  View Specs <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>

            <div className="p-6 sm:p-7">
              <p className="font-mono-label text-[10px] uppercase tracking-wider text-terracotta">
                {space.eyebrow}
              </p>
              <h3 className="mt-2 font-serif text-xl sm:text-2xl font-semibold text-forest leading-snug group-hover:text-terracotta transition-colors">
                <Link href={ROUTES.eventDetail(space.id)}>
                  {space.name}
                </Link>
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-sage-muted leading-relaxed line-clamp-3">
                {space.description}
              </p>

              {/* Capacity pills */}
              <div className="mt-5 grid grid-cols-3 gap-2 border-y border-forest/10 py-3 text-center">
                <div className="bg-forest/[0.03] p-1.5">
                  <div className="font-mono-label text-[9px] uppercase tracking-wider text-sage-muted">Theatre</div>
                  <div className="font-serif font-bold text-sm text-forest">{space.capacities.theatre}</div>
                </div>
                <div className="bg-forest/[0.03] p-1.5">
                  <div className="font-mono-label text-[9px] uppercase tracking-wider text-sage-muted">Classroom</div>
                  <div className="font-serif font-bold text-sm text-forest">{space.capacities.classroom}</div>
                </div>
                <div className="bg-forest/[0.03] p-1.5">
                  <div className="font-mono-label text-[9px] uppercase tracking-wider text-sage-muted">Cluster</div>
                  <div className="font-serif font-bold text-sm text-forest">{space.capacities.cluster}</div>
                </div>
              </div>

              {/* Key Features */}
              <div className="mt-5">
                <h4 className="font-mono-label text-[10px] uppercase tracking-wider text-forest/70 mb-2.5">
                  Featured Equipment
                </h4>
                <ul className="space-y-1.5 text-xs text-forest/85">
                  {space.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-terracotta shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-6 pt-0 flex items-center justify-between gap-3 border-t border-forest/10 mt-2">
            <Link
              href={ROUTES.eventDetail(space.id)}
              className="flex-1 text-center bg-forest px-4 py-3 font-mono-label text-[10px] uppercase tracking-widest text-cream hover:bg-terracotta transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>Explore Venue Details</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
