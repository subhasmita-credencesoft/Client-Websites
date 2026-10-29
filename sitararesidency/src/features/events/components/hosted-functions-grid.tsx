'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Users,
  Check,
  ArrowRight,
  MessageSquare,
  Calendar,
  Heart,
  Briefcase,
  Cake,
  PartyPopper,
} from 'lucide-react';
import { hostedFunctions } from '@/features/events/data/events';
import { ROUTES } from '@/core/constants/routes';

type CategoryFilter = 'all' | 'ceremony' | 'social' | 'corporate';

export function HostedFunctionsGrid({
  onSelectFunction,
}: {
  onSelectFunction?: (functionTitle: string) => void;
}) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const filteredFunctions = hostedFunctions.filter((fn) => {
    if (activeCategory === 'all') return true;
    return fn.category === activeCategory;
  });

  const filterButtons: { label: string; value: CategoryFilter; icon: React.ComponentType<{ className?: string }> }[] = [
    { label: 'All Functions (8)', value: 'all', icon: PartyPopper },
    { label: 'Ring Ceremonies & Weddings', value: 'ceremony', icon: Heart },
    { label: 'Birthdays & Social Parties', value: 'social', icon: Cake },
    { label: 'Corporate & Meetings', value: 'corporate', icon: Briefcase },
  ];

  return (
    <div className="space-y-10">
      {/* ── Filter Pills Bar ── */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {filterButtons.map(({ label, value, icon: Icon }) => {
          const isActive = activeCategory === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setActiveCategory(value)}
              className={`flex items-center gap-2 px-4 py-2.5 font-mono-label text-xs uppercase tracking-wider transition-all duration-300 ${
                isActive
                  ? 'bg-forest text-cream shadow-md border border-forest scale-102'
                  : 'bg-white text-forest/80 border border-forest/15 hover:border-terracotta hover:text-terracotta'
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-apricot' : 'text-terracotta'}`} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Cards Grid ── */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {filteredFunctions.map((fn) => {
          const whatsappMsg = encodeURIComponent(
            `Hello Hotel Sitara Residency Team,\n\nI am planning a ${fn.title} at your hotel.\n- Function: ${fn.title}\n- Expected Capacity: ${fn.guestCapacity}\n\nPlease share hall availability and package details. Thank you!`,
          );

          return (
            <article
              key={fn.id}
              className="group flex flex-col justify-between border border-forest/15 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-terracotta/60 hover:shadow-xl overflow-hidden"
            >
              <div>
                {/* Visual Header */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-forest">
                  <Image
                    src={fn.image}
                    alt={fn.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <span className="font-mono-label text-[10px] uppercase tracking-wider bg-black/60 backdrop-blur-md px-2.5 py-1 text-cream border border-white/15">
                      {fn.categoryLabel}
                    </span>
                    <span className="font-mono-label text-[10px] uppercase tracking-wider bg-terracotta px-2.5 py-1 text-cream font-semibold shadow-sm">
                      {fn.badge}
                    </span>
                  </div>

                  {/* Bottom Stats */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-cream">
                    <span className="font-mono-label text-[11px] uppercase tracking-widest text-apricot flex items-center gap-1.5 font-medium">
                      <Users className="h-3.5 w-3.5 text-apricot" /> {fn.guestCapacity}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-7">
                  <p className="font-mono-label text-[10px] uppercase tracking-wider text-terracotta">
                    {fn.eyebrow}
                  </p>
                  <h3 className="mt-1 font-serif text-2xl font-semibold text-forest leading-snug group-hover:text-terracotta transition-colors">
                    {fn.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-sage-muted leading-relaxed">
                    {fn.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-6 border-t border-forest/10 pt-5">
                    <h4 className="font-mono-label text-[10px] uppercase tracking-wider text-forest/70 mb-3">
                      Event Setup & Inclusions
                    </h4>
                    <ul className="space-y-2 text-xs text-forest/85">
                      {fn.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 text-terracotta shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Catering Note */}
                  <div className="mt-5 rounded-none bg-cream/70 border border-forest/10 p-3.5 text-xs text-forest/90">
                    <span className="font-semibold text-terracotta font-mono-label uppercase text-[10px] block mb-1">
                      Customized Catering:
                    </span>
                    <p className="text-sage-muted leading-relaxed text-[11px]">{fn.cateringNotes}</p>
                  </div>

                  {/* Recommended Venues */}
                  <div className="mt-5 flex flex-wrap items-center gap-2 pt-2">
                    <span className="font-mono-label text-[10px] uppercase tracking-wider text-sage-muted">
                      Suitable Venues:
                    </span>
                    {fn.recommendedVenues.map((v, i) => (
                      <Link
                        key={i}
                        href={ROUTES.eventDetail(v.slug)}
                        className="inline-flex items-center gap-1 text-[11px] font-mono-label text-terracotta hover:text-forest bg-forest/[0.04] px-2 py-0.5 border border-forest/10 hover:border-terracotta transition-colors"
                      >
                        {v.name} <ArrowRight className="h-2.5 w-2.5" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 pt-0 border-t border-forest/10 mt-4 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href="#event-inquiry"
                  onClick={() => onSelectFunction?.(fn.title)}
                  className="w-full sm:flex-1 text-center bg-forest px-4 py-3 font-mono-label text-[10px] uppercase tracking-widest text-cream hover:bg-terracotta transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <Calendar className="h-3.5 w-3.5 text-apricot" />
                  <span>Plan This Event</span>
                </a>

                <a
                  href={`https://wa.me/917400432396?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-forest/20 px-4 py-3 font-mono-label text-[10px] uppercase tracking-widest text-forest hover:bg-forest hover:text-cream transition-colors"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-terracotta" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
