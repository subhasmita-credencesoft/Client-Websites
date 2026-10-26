import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Calendar, CheckCircle2, Clock, Phone, Sparkles } from 'lucide-react';

import { blogArticlesMap, journalCards } from '@/features/blog/data/blog';
import { business } from '@/core/config/business';

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return journalCards.map((card) => ({ slug: card.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = blogArticlesMap[slug];
  if (!article) return { title: 'Journal Article' };
  return {
    title: `${article.title} | The Sitara Journal`,
    description: article.intro,
  };
}

export default async function JournalEntryPage({ params }: PageProps) {
  const { slug } = await params;
  const article = blogArticlesMap[slug];

  if (!article) {
    notFound();
  }

  // Related articles (exclude current)
  const relatedArticles = journalCards.filter((c) => c.slug !== slug).slice(0, 3);

  return (
    <main className="bg-[#faf9f6]">
      {/* ═══ ARTICLE HERO HEADER ═══ */}
      <section className="relative min-h-[440px] md:min-h-[500px] flex items-end overflow-hidden pt-32 pb-16 px-5 sm:px-8 md:px-12 bg-[#121c16] text-white">
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center pointer-events-none opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121c16] via-[#121c16]/65 to-transparent" />

        <div className="relative z-10 max-w-[1000px] w-full mx-auto">
          {/* Breadcrumb & Back Link */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#d7b49a] hover:text-white transition-colors"
            >
              <ArrowLeft size={14} /> Back to Journal
            </Link>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-[#ad3074] px-3 py-1 rounded-xs text-white">
              {article.category}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-white/70 mb-4 font-mono-label">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={13} className="text-[#d7b49a]" /> {article.date}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={13} className="text-[#d7b49a]" /> {article.facts[1] || '5 min read'}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal leading-[1.08] mb-6 tracking-tight">
            {article.title}
          </h1>

          <div className="w-16 h-[2px] bg-[#d7b49a] mb-6" />

          <p className="text-base sm:text-lg text-white/85 leading-relaxed font-light max-w-3xl">
            {article.intro}
          </p>
        </div>
      </section>

      {/* ═══ ARTICLE EDITORIAL CONTENT ═══ */}
      <section className="max-w-[1000px] mx-auto px-5 sm:px-8 md:px-12 py-14 md:py-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14">
          {/* Main Article Body */}
          <article className="lg:col-span-8 space-y-6 text-[#444] text-base sm:text-lg leading-[1.85] font-light">
            {article.paragraphs.map((p, idx) => (
              <p key={idx} className={idx === 0 ? 'text-lg sm:text-xl text-[#26382e] font-normal leading-relaxed' : ''}>
                {p}
              </p>
            ))}

            {/* Key Takeaways Callout Box */}
            {article.takeaways && article.takeaways.length > 0 && (
              <div className="my-10 p-6 sm:p-8 bg-white border border-[#e8e6e0] border-l-4 border-l-[#ad3074] rounded-sm shadow-sm">
                <h3 className="font-display text-xl text-[#26382e] font-normal mb-4 flex items-center gap-2">
                  <Sparkles size={18} className="text-[#ad3074]" /> Key Highlights &amp; Local Tips
                </h3>
                <ul className="space-y-3">
                  {article.takeaways.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#555]">
                      <CheckCircle2 size={16} className="text-[#ad3074] shrink-0 mt-1" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Featured Image inside Article */}
            <div className="my-10 relative aspect-[16/10] overflow-hidden rounded-sm border border-[#e8e6e0] shadow-md">
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="(max-width: 900px) 100vw, 720px"
                className="object-cover"
              />
            </div>

            {/* Concierge Quote */}
            <blockquote className="my-10 p-6 bg-[#f2f0ec] border-l-4 border-l-[#26382e] rounded-xs text-[#26382e] italic font-display text-lg sm:text-xl leading-relaxed">
              &ldquo;At Hotel Sitara Residency, we don’t just offer a room — we ensure your entire travel experience
              across Kalamboli and Navi Mumbai is effortless, connected, and deeply restful.&rdquo;
              <footer className="mt-3 text-xs not-italic font-mono-label uppercase tracking-widest text-[#686868]">
                — Front Desk Team, Hotel Sitara Residency
              </footer>
            </blockquote>
          </article>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Quick Facts Card */}
            <div className="bg-white p-6 sm:p-7 border border-[#e8e6e0] rounded-sm shadow-sm">
              <p className="font-mono-label text-[10px] font-bold uppercase tracking-[0.2em] text-[#ad3074] mb-4">
                Article Information
              </p>
              <div className="space-y-3 pb-6 border-b border-[#f0eeeb]">
                {article.facts.map((fact, idx) => (
                  <p key={idx} className="text-xs text-[#555] leading-relaxed">
                    • {fact}
                  </p>
                ))}
              </div>

              {/* Direct Booking Promo */}
              <div className="pt-6">
                <p className="font-display text-lg text-[#26382e] mb-2 font-normal">
                  Planning to visit?
                </p>
                <p className="text-xs text-[#686868] mb-4 leading-relaxed">
                  Book direct for best rates, free parking and flexible check-in support.
                </p>
                <a
                  href={business.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button w-full text-center block text-xs"
                >
                  Check Room Availability
                </a>
              </div>
            </div>

            {/* Assistance Card */}
            <div className="bg-[#26382e] text-white p-6 sm:p-7 rounded-sm shadow-sm">
              <p className="font-mono-label text-[10px] font-bold uppercase tracking-[0.2em] text-[#d7b49a] mb-2">
                24/7 Front Desk
              </p>
              <h4 className="font-display text-xl text-white font-normal mb-3">
                Have questions or need directions?
              </h4>
              <p className="text-xs text-white/70 leading-relaxed mb-6">
                Our staff is available around the clock to guide you to the property or assist with travel itineraries.
              </p>
              <a
                href={`tel:${business.phones.primary}`}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d7b49a] hover:text-white transition-colors"
              >
                <Phone size={14} /> {business.phones.primaryDisplay}
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* ═══ RELATED ARTICLES ═══ */}
      {relatedArticles.length > 0 && (
        <section className="bg-[#f4f2ee] py-16 px-5 sm:px-8 md:px-12 border-t border-[#e8e6e0]">
          <div className="max-w-[1000px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="font-mono-label text-[10px] font-bold uppercase tracking-[0.2em] text-[#ad3074] mb-1">
                  Keep Reading
                </p>
                <h3 className="font-display text-2xl sm:text-3xl text-[#26382e] font-normal m-0">
                  More Stories &amp; Guides
                </h3>
              </div>
              <Link
                href="/blog"
                className="text-xs font-bold uppercase tracking-wider text-[#ad3074] hover:text-[#26382e] inline-flex items-center gap-1.5"
              >
                All Stories <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((rel) => (
                <article
                  key={rel.slug}
                  className="bg-white rounded-sm border border-[#e0ddd6] overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
                >
                  <Link href={`/blog/${rel.slug}`} className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={rel.image}
                      alt={rel.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#ad3074] block mb-2">
                        {rel.category}
                      </span>
                      <h4 className="font-display text-base sm:text-lg text-[#26382e] font-normal group-hover:text-[#ad3074] transition-colors leading-snug mb-2">
                        <Link href={`/blog/${rel.slug}`}>{rel.title}</Link>
                      </h4>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#ad3074] inline-flex items-center gap-1 mt-4">
                      Read Article <ArrowRight size={12} />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ DIRECT BOOKING STRIP ═══ */}
      <section className="bg-[#1a2820] text-white py-14 px-5 text-center">
        <div className="max-w-xl mx-auto">
          <h3 className="font-display text-2xl sm:text-3xl font-normal mb-3">
            Book Your Stay at Hotel Sitara Residency
          </h3>
          <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-6">
            Kalamboli’s premier destination for business and family travellers. Best rates guaranteed direct.
          </p>
          <a
            href={business.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="button inline-flex items-center gap-2"
          >
            Check Availability &amp; Book Direct
          </a>
        </div>
      </section>
    </main>
  );
}
