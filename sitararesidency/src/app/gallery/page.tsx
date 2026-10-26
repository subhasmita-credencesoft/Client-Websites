import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Phone, Sparkles } from 'lucide-react';

import { GallerySection, type GalleryItem } from '@/features/gallery';
import { BookButton, defaultStayParams, getHotelMateProperty } from '@/features/booking';
import { business } from '@/core/config/business';

export const metadata: Metadata = {
  title: `Photo Gallery | ${business.name}`,
  description: `Browse verified high-resolution photographs of rooms, suites, and reception at ${business.name}, Kalamboli, Navi Mumbai.`,
};

export default async function GalleryPage() {
  const property = await getHotelMateProperty(defaultStayParams());

  // Collect room photos from API with room names
  const roomItems: GalleryItem[] = (property.roomList ?? []).flatMap((room) => {
    const roomName = room.name ?? 'Hotel Room';
    return (room.imageList ?? [])
      .map((img, index) => ({
        src: img?.url ?? '',
        title: `${roomName} — View ${index + 1}`,
        category: roomName,
      }))
      .filter((item) => item.src.length > 0);
  });

  // Reception and property lobby photos
  const receptionItems: GalleryItem[] = [
    {
      src: '/Hotel Sitara Residency Kalamboli Reception (1).avif',
      title: 'Hotel Reception & Front Desk',
      category: 'Lobby & Reception',
    },
    {
      src: '/Hotel Sitara Residency Kalamboli Reception (5).avif',
      title: 'Guest Waiting Lounge & Seating',
      category: 'Lobby & Reception',
    },
    {
      src: '/Hotel Sitara Residency Kalamboli Reception (3).avif',
      title: 'Reception Concierge Desk',
      category: 'Lobby & Reception',
    },
    {
      src: '/Hotel Sitara Residency Kalamboli Reception (5).avif',
      title: 'Hotel Entrance & Foyer',
      category: 'Lobby & Reception',
    },
    {
      src: '/Hotel Sitara Residency Kalamboli Reception (7).avif',
      title: 'Main Lobby & Welcome Lounge',
      category: 'Lobby & Reception',
    },
    {
      src: '/sitaraabout.avif',
      title: 'Hotel Sitara Residency Property View',
      category: 'Lobby & Reception',
    },
  ];

  // Combined authentic gallery
  const galleryItems: GalleryItem[] = [...roomItems, ...receptionItems];

  return (
    <main className="min-h-screen bg-cream pt-24 md:pt-28">
      {/* ── Breadcrumb Bar ── */}
      <nav aria-label="Breadcrumb" className="border-b border-forest/10 bg-white/70 px-5 py-3 backdrop-blur-md md:px-10">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between text-xs">
          <ol className="flex items-center gap-2 text-sage-muted">
            <li>
              <Link href="/" className="hover:text-forest transition-colors">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight size={12} className="text-forest/30" />
            </li>
            <li className="font-semibold text-forest" aria-current="page">
              Photo Gallery
            </li>
          </ol>

          <a
            href={`tel:${business.phones.primary}`}
            className="hidden items-center gap-1.5 font-mono-label text-[11px] text-forest hover:text-terracotta transition-colors md:flex"
          >
            <Phone size={12} className="text-terracotta" />
            Concierge: {business.phones.primaryDisplay}
          </a>
        </div>
      </nav>

      {/* ── Cinematic Gallery Hero ── */}
      <section className="relative h-[48vh] min-h-[380px] w-full overflow-hidden flex items-end">
        <Image
          src="/Hotel Sitara Residency Kalamboli Reception (5).avif"
          alt={`${business.name} Gallery`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Soft bottom vignette for text contrast while keeping photo vivid */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 pb-10 md:px-10 md:pb-12 text-white">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-mono-label uppercase tracking-widest text-apricot backdrop-blur-md mb-3">
            <Sparkles size={12} className="text-apricot" />
            Verified Property Photography
          </div>
          <h1 className="font-display text-4xl text-white font-normal tracking-tight md:text-5xl lg:text-6xl drop-shadow-sm">
            Visual Gallery
          </h1>
          <p className="mt-2 max-w-xl text-sm md:text-base text-white/85 leading-relaxed">
            Take a visual tour through our spacious suites, comfortable executive rooms, and welcoming spaces at {business.name} in Kalamboli, Navi Mumbai.
          </p>
        </div>
      </section>

      {/* ── Unified Gallery Grid & Interactive Lightbox ── */}
      <GallerySection items={galleryItems} alt={business.name} />

      {/* ── Bottom Booking CTA ── */}
      <section className="border-t border-forest/15 bg-gradient-to-br from-forest to-[#16221a] px-5 py-16 text-center text-white md:px-10 md:py-20">
        <div className="mx-auto max-w-2xl">
          <span className="font-mono-label text-xs uppercase tracking-widest text-apricot">
            Experience Quality Hospitality
          </span>
          <h2 className="mt-3 font-display text-3xl font-normal text-white md:text-4xl">
            Ready to Plan Your Stay?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/80 md:text-base">
            Book directly through our official booking engine for guaranteed best rates, flexible cancellation, and dedicated front desk assistance.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <BookButton className="button" testId="button-gallery-cta">
              Check Availability &amp; Book
            </BookButton>
            <a
              href={`tel:${business.phones.primary}`}
              className="inline-flex items-center gap-2 rounded-xs border border-white/40 px-6 py-3.5 font-mono-label text-[11px] uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <Phone size={13} className="text-apricot" />
              Call {business.phones.primaryDisplay}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
