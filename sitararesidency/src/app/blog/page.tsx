import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Sparkles, Phone, MessageSquare } from 'lucide-react';

import { journalCards } from '@/features/blog/data/blog';
import { business } from '@/core/config/business';

export const metadata: Metadata = {
  title: `The Sitara Journal | Travel Guides & Stories | ${business.name}`,
  description: `Discover local Navi Mumbai travel itineraries, Panvel sightseeing guides, business transit advice, and hospitality stories from ${business.name}, Kalamboli.`,
};

export default function BlogPage() {
  const featuredArticle = journalCards[0];
  const otherArticles = journalCards.slice(1);

  return (
    <main className="bg-[#faf9f6]">
      {/* ═══ CINEMATIC HERO ═══ */}
      <section className="relative min-h-[500px] md:min-h-[540px] flex items-end overflow-hidden pt-32 pb-16 px-5 sm:px-8 md:px-12 bg-[#121c16] text-white">
        <Image
          src="/sitaraabout.avif"
          alt="Hotel Sitara Residency and Navi Mumbai neighborhood"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center pointer-events-none opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121c16] via-[#121c16]/60 to-transparent" />

        <div className="relative z-10 max-w-[1280px] w-full mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#d7b49a] mb-6 font-semibold">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white/70">The Sitara Journal</span>
          </nav>

          <p className="font-mono-label text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#d7b49a] mb-4">
            Hotel Sitara Residency · Stories &amp; Local Guides
          </p>

          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-white mb-6 max-w-4xl">
            The Sitara Journal
          </h1>

          <div className="w-16 h-[2px] bg-[#d7b49a] mb-6" />

          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl leading-relaxed font-light">
            Curated travel itineraries, neighbourhood secrets, and corporate travel insights
            from our concierge team in Kalamboli, Navi Mumbai.
          </p>
        </div>
      </section>

      {/* ═══ FEATURED LEAD STORY ═══ */}
      {featuredArticle && (
        <section className="max-w-[1280px] mx-auto px-5 sm:px-8 md:px-12 -mt-10 sm:-mt-12 relative z-20 mb-16 md:mb-24">
          <div className="bg-white rounded-sm border border-[#e8e6e0] shadow-xl overflow-hidden grid lg:grid-cols-12 transition-all duration-300 hover:border-[#d7b49a]">
            {/* Image */}
            <div className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto min-h-[300px] lg:min-h-[460px] overflow-hidden bg-[#e8e6e0]">
              <Image
                src={featuredArticle.image}
                alt={featuredArticle.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-xs bg-[#ad3074] px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-white shadow-md">
                <Sparkles size={11} /> Featured Guide
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white">
              <div className="flex items-center gap-3 text-xs text-[#686868] mb-4">
                <span className="font-bold uppercase tracking-widest text-[#ad3074] text-[10px]">
                  {featuredArticle.category}
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={12} className="text-[#ad3074]" /> {featuredArticle.meta}
                </span>
                <span>•</span>
                <span>{featuredArticle.date}</span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#26382e] font-normal leading-tight mb-4">
                <Link href={`/blog/${featuredArticle.slug}`} className="hover:text-[#ad3074] transition-colors">
                  {featuredArticle.title}
                </Link>
              </h2>

              <p className="text-[#555] text-sm sm:text-base leading-relaxed mb-8">
                {featuredArticle.description}
              </p>

              <div className="mt-auto pt-6 border-t border-[#f0eeeb] flex items-center justify-between">
                <span className="text-[11px] font-mono-label font-bold text-[#26382e]">
                  By Sitara Concierge
                </span>
                <Link
                  href={`/blog/${featuredArticle.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ad3074] hover:text-[#26382e] transition-colors"
                >
                  Read Full Guide <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ ALL STORIES GRID ═══ */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 md:px-12 mb-20 md:mb-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#e8e6e0]">
          <div>
            <p className="font-mono-label text-[10px] font-bold uppercase tracking-[0.2em] text-[#ad3074] mb-2">
              Explore Articles
            </p>
            <h3 className="font-display text-2xl sm:text-4xl text-[#26382e] font-normal m-0">
              Latest Stories &amp; Insights
            </h3>
          </div>
          <p className="text-xs text-[#686868] max-w-sm">
            Everything you need for an informed, comfortable stay in Kalamboli, Navi Mumbai.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {otherArticles.map((article) => (
            <article
              key={article.slug}
              className="group bg-white rounded-sm border border-[#e8e6e0] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:border-[#d7b49a] hover:-translate-y-1"
            >
              {/* Card Image */}
              <Link href={`/blog/${article.slug}`} className="relative aspect-[16/10] overflow-hidden bg-[#e8e6e0]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-106"
                />
                <div className="absolute top-3 left-3 z-10 inline-flex items-center rounded-xs bg-[#26382e]/85 backdrop-blur-sm px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white">
                  {article.category}
                </div>
              </Link>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-[11px] text-[#686868] mb-3">
                  <span className="inline-flex items-center gap-1">
                    <Clock size={11} className="text-[#ad3074]" /> {article.meta}
                  </span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>

                <h4 className="font-display text-xl sm:text-2xl text-[#26382e] font-normal leading-snug mb-3 group-hover:text-[#ad3074] transition-colors">
                  <Link href={`/blog/${article.slug}`}>
                    {article.title}
                  </Link>
                </h4>

                <p className="text-[#555] text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
                  {article.description}
                </p>

                <div className="mt-auto pt-4 border-t border-[#f4f2ee] flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#686868]">
                    {article.eyebrow}
                  </span>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#ad3074] group-hover:gap-2.5 transition-all"
                  >
                    Read Story <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ═══ LOCAL CONCIERGE RECOMMENDATIONS CALLOUT ═══ */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 md:px-12 mb-20 md:mb-28">
        <div className="bg-[#1f2e25] text-white p-8 sm:p-12 md:p-14 rounded-sm relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <p className="font-mono-label text-[10px] uppercase tracking-[0.22em] text-[#d7b49a] mb-3">
              Personalized Assistance
            </p>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-normal leading-tight mb-4">
              Need local travel advice or corporate arrangements?
            </h3>
            <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-8">
              Whether you are planning a company offsite, need airport taxi coordination to NMIA,
              or want custom sightseeing recommendations in Panvel, our front desk is here 24 hours a day.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`tel:${business.phones.primary}`}
                className="inline-flex items-center gap-2 rounded-xs bg-[#ad3074] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-white hover:text-[#26382e] transition-all"
              >
                <Phone size={14} /> Call Concierge Desk
              </a>
              <a
                href={`https://wa.me/${business.phones.primary.replace('+', '')}?text=Hi%20Hotel%20Sitara%20Residency,%20I%20have%20an%20inquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xs border border-white/40 bg-transparent px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-white hover:text-[#26382e] transition-all"
              >
                <MessageSquare size={14} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BOOK DIRECT BANNER ═══ */}
      <section className="bg-gradient-to-r from-[#17221b] to-[#26382e] text-white py-16 px-5 sm:px-8 text-center border-t border-white/10">
        <div className="max-w-2xl mx-auto">
          <p className="font-mono-label text-[10px] font-bold uppercase tracking-[0.24em] text-[#d7b49a] mb-3">
            Best Rate Guaranteed
          </p>
          <h3 className="font-display text-2xl sm:text-4xl font-normal mb-4">
            Stay with us in Kalamboli
          </h3>
          <p className="text-white/70 text-sm leading-relaxed mb-8">
            Spacious air-conditioned rooms, free high-speed Wi-Fi, secure parking and 24-hour service.
            Book directly for guaranteed lowest prices.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href={business.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button inline-flex items-center gap-2"
            >
              Check Availability &amp; Book
            </a>
            <Link
              href="/bedrooms"
              className="text-xs uppercase font-bold tracking-widest text-white/80 hover:text-white border-b border-white/30 pb-1"
            >
              Explore Room Categories
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
