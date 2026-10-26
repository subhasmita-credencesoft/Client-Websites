import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  AirVent,
  ArrowRight,
  BedDouble,
  Car,
  CheckCircle2,
  Clock,
  Coffee,
  ConciergeBell,
  KeyRound,
  Phone,
  Power,
  ShieldCheck,
  Sparkles,
  Tv,
  Wifi,
} from 'lucide-react';

import { business } from '@/core/config/business';

export const metadata: Metadata = {
  title: `Facilities & Guest Amenities | ${business.name}`,
  description: `Explore modern amenities and thoughtful comforts at ${business.name}, Kalamboli — including 24/7 room service, free Wi-Fi, secure parking, power backup, and round-the-clock front desk.`,
};

const keyAmenities = [
  {
    icon: Wifi,
    title: 'High-Speed Wi-Fi',
    desc: 'Complimentary high-speed fiber internet in all rooms and public areas.',
  },
  {
    icon: AirVent,
    title: 'Climate Control',
    desc: 'Individually adjustable air conditioning in every room for customized comfort.',
  },
  {
    icon: Car,
    title: 'Free Secure Parking',
    desc: 'Complimentary on-site parking for guest cars, SUVs and business vehicles.',
  },
  {
    icon: Coffee,
    title: '24/7 Room Service',
    desc: 'Freshly prepared meals, quick snacks, tea and coffee delivered right to your bed.',
  },
  {
    icon: Power,
    title: '100% Power Backup',
    desc: 'Heavy-duty automatic generator ensures uninterrupted AC, lights, and power.',
  },
  {
    icon: Clock,
    title: '24-Hour Front Desk',
    desc: 'Round-the-clock check-in, concierge assistance, and attentive hospitality.',
  },
  {
    icon: Sparkles,
    title: 'Daily Housekeeping',
    desc: 'Spotless rooms, fresh linens, sanitized towels, and pristine private bathrooms.',
  },
  {
    icon: Tv,
    title: 'Smart LED TVs',
    desc: '43-inch high-definition televisions with multiple entertainment channels.',
  },
  {
    icon: ShieldCheck,
    title: '24/7 Security & CCTV',
    desc: 'Continuous surveillance and trained security staff for complete peace of mind.',
  },
  {
    icon: BedDouble,
    title: 'Orthopaedic Bedding',
    desc: 'Premium mattresses, soft duvets, and hypoallergenic pillows for deep rest.',
  },
  {
    icon: KeyRound,
    title: 'Express Check-In',
    desc: 'Fast, frictionless registration so you can relax or head to meetings promptly.',
  },
  {
    icon: ConciergeBell,
    title: 'Travel & Taxi Desk',
    desc: 'On-demand airport taxi coordination, local cab booking, and wake-up calls.',
  },
] as const;

export default function LeisurePage() {
  return (
    <main className="bg-[#faf9f6]">
      {/* ═══ CINEMATIC HERO ═══ */}
      <section className="relative min-h-[500px] md:min-h-[560px] flex items-end overflow-hidden pt-32 pb-16 px-5 sm:px-8 md:px-12 bg-[#121c16] text-white">
        <Image
          src="/Hotel Sitara Residency Kalamboli Reception (5).avif"
          alt="Hotel Sitara Residency guest lounge and reception"
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
            <span className="text-white/70">Facilities</span>
          </nav>

          <p className="font-mono-label text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#d7b49a] mb-4">
            Hotel Sitara Residency · Kalamboli, Navi Mumbai
          </p>

          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-white mb-6 max-w-4xl">
            Thoughtful Comforts &amp;&nbsp;Modern Amenities
          </h1>

          <div className="w-16 h-[2px] bg-[#d7b49a] mb-6" />

          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl leading-relaxed font-light mb-8">
            Everything you need for an effortless, restful stay — from 24-hour room service and high-speed Wi-Fi
            to secure on-site parking and full power backup in the heart of Kalamboli.
          </p>

          <div className="flex flex-wrap items-center gap-4">
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
              className="inline-flex items-center gap-2 rounded-xs border border-white/40 bg-transparent px-5 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-white hover:text-[#26382e] transition-all"
            >
              Explore Our Bedrooms
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ HIGHLIGHT STATS / PILLARS ═══ */}
      <section className="bg-[#26382e] text-white border-y border-white/10">
        <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="p-6 text-center">
            <Clock className="w-6 h-6 mx-auto mb-2 text-[#d7b49a]" />
            <p className="font-mono-label text-[11px] font-bold uppercase tracking-wider text-white">24/7 Front Desk</p>
            <p className="text-[11px] text-white/60 mt-1">Always open for you</p>
          </div>
          <div className="p-6 text-center">
            <Wifi className="w-6 h-6 mx-auto mb-2 text-[#d7b49a]" />
            <p className="font-mono-label text-[11px] font-bold uppercase tracking-wider text-white">Free Wi-Fi</p>
            <p className="text-[11px] text-white/60 mt-1">High-speed fiber</p>
          </div>
          <div className="p-6 text-center">
            <Car className="w-6 h-6 mx-auto mb-2 text-[#d7b49a]" />
            <p className="font-mono-label text-[11px] font-bold uppercase tracking-wider text-white">Free Parking</p>
            <p className="text-[11px] text-white/60 mt-1">Secure on-site</p>
          </div>
          <div className="p-6 text-center">
            <Coffee className="w-6 h-6 mx-auto mb-2 text-[#d7b49a]" />
            <p className="font-mono-label text-[11px] font-bold uppercase tracking-wider text-white">Room Service</p>
            <p className="text-[11px] text-white/60 mt-1">24-hour delivery</p>
          </div>
          <div className="p-6 text-center">
            <Power className="w-6 h-6 mx-auto mb-2 text-[#d7b49a]" />
            <p className="font-mono-label text-[11px] font-bold uppercase tracking-wider text-white">Power Backup</p>
            <p className="text-[11px] text-white/60 mt-1">100% generator</p>
          </div>
          <div className="p-6 text-center">
            <Sparkles className="w-6 h-6 mx-auto mb-2 text-[#d7b49a]" />
            <p className="font-mono-label text-[11px] font-bold uppercase tracking-wider text-white">Housekeeping</p>
            <p className="text-[11px] text-white/60 mt-1">Daily sanitized</p>
          </div>
        </div>
      </section>

      {/* ═══ CURATED FEATURE SPOTLIGHTS ═══ */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 md:px-12 py-20 md:py-28 space-y-24 md:space-y-32">

        {/* Feature 1: In-Room Comfort */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-sm overflow-hidden shadow-xl border border-[#e8e6e0]">
            <Image
              src="/room.avif"
              alt="Comfortable air-conditioned bedroom at Hotel Sitara Residency"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="font-mono-label text-[10px] font-bold uppercase tracking-[0.2em] text-[#ad3074] mb-3">
              Room Amenities
            </p>
            <h2 className="font-display text-2xl sm:text-4xl text-[#26382e] font-normal leading-tight mb-4">
              Restful Spaces Crafted for Deep Sleep
            </h2>
            <div className="w-12 h-[2px] bg-[#d7b49a] mb-6" />
            <p className="text-[#555] text-sm sm:text-base leading-relaxed mb-6 font-light">
              Every room at Hotel Sitara Residency is carefully curated to shield you from the rush of the city.
              Enjoy orthopaedic bedding, individually controlled air conditioning, ambient warm lighting, and
              43-inch Smart LED televisions with full satellite entertainment.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#444]">
                <CheckCircle2 size={16} className="text-[#ad3074] shrink-0" /> Individual AC Control
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#444]">
                <CheckCircle2 size={16} className="text-[#ad3074] shrink-0" /> Orthopaedic Mattresses
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#444]">
                <CheckCircle2 size={16} className="text-[#ad3074] shrink-0" /> 43&quot; Smart LED TV
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#444]">
                <CheckCircle2 size={16} className="text-[#ad3074] shrink-0" /> Hot &amp; Cold Showers 24/7
              </div>
            </div>
            <Link
              href="/bedrooms"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ad3074] hover:text-[#26382e] transition-colors"
            >
              View Room Categories <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Feature 2: 24/7 Front Desk & Concierge */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 lg:order-2 relative aspect-[4/3] rounded-sm overflow-hidden shadow-xl border border-[#e8e6e0]">
            <Image
              src="/Hotel Sitara Residency Kalamboli Reception (1).avif"
              alt="24-hour reception and front desk at Hotel Sitara Residency"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-6 lg:order-1 flex flex-col justify-center">
            <p className="font-mono-label text-[10px] font-bold uppercase tracking-[0.2em] text-[#ad3074] mb-3">
              Round-the-Clock Hospitality
            </p>
            <h2 className="font-display text-2xl sm:text-4xl text-[#26382e] font-normal leading-tight mb-4">
              24-Hour Front Desk &amp; Concierge Care
            </h2>
            <div className="w-12 h-[2px] bg-[#d7b49a] mb-6" />
            <p className="text-[#555] text-sm sm:text-base leading-relaxed mb-6 font-light">
              Whether you arrive on a midnight expressway drive, have an early morning flight, or need
              assistance navigating Panvel, our reception is staffed around the clock. We handle express check-ins,
              safe luggage storage, and local taxi coordination with genuine care.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#444]">
                <CheckCircle2 size={16} className="text-[#ad3074] shrink-0" /> Express 24-hr Check-in
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#444]">
                <CheckCircle2 size={16} className="text-[#ad3074] shrink-0" /> Luggage Holding Service
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#444]">
                <CheckCircle2 size={16} className="text-[#ad3074] shrink-0" /> Taxi &amp; Airport Cab Booking
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#444]">
                <CheckCircle2 size={16} className="text-[#ad3074] shrink-0" /> Dedicated Concierge Help
              </div>
            </div>
            <a
              href={`tel:${business.phones.primary}`}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ad3074] hover:text-[#26382e] transition-colors"
            >
              Contact Front Desk <Phone size={14} />
            </a>
          </div>
        </div>

        {/* Feature 3: Business & Corporate Travel */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-sm overflow-hidden shadow-xl border border-[#e8e6e0]">
            <Image
              src="/Hotel Sitara Residency Kalamboli Reception (3).avif"
              alt="Corporate and business guest services at Hotel Sitara Residency"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="font-mono-label text-[10px] font-bold uppercase tracking-[0.2em] text-[#ad3074] mb-3">
              Corporate Stays
            </p>
            <h2 className="font-display text-2xl sm:text-4xl text-[#26382e] font-normal leading-tight mb-4">
              Engineered for Business Productivity
            </h2>
            <div className="w-12 h-[2px] bg-[#d7b49a] mb-6" />
            <p className="text-[#555] text-sm sm:text-base leading-relaxed mb-6 font-light">
              Positioned directly beside the Kalamboli Warehousing Complex (KWC), the Steel Market, and minutes from
              Taloja MIDC, Hotel Sitara Residency is built for working professionals. Enjoy stable high-speed Wi-Fi,
              heavy power backup, GST billing support, and ergonomic workspaces.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#444]">
                <CheckCircle2 size={16} className="text-[#ad3074] shrink-0" /> High-Speed Fiber Internet
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#444]">
                <CheckCircle2 size={16} className="text-[#ad3074] shrink-0" /> Full Generator Backup
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#444]">
                <CheckCircle2 size={16} className="text-[#ad3074] shrink-0" /> Official GST Billing
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#444]">
                <CheckCircle2 size={16} className="text-[#ad3074] shrink-0" /> Corporate Discount Tariffs
              </div>
            </div>
            <a
              href={business.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ad3074] hover:text-[#26382e] transition-colors"
            >
              Book Corporate Rates <ArrowRight size={14} />
            </a>
          </div>
        </div>

      </section>

      {/* ═══ ALL AMENITIES COMPREHENSIVE GRID ═══ */}
      <section className="bg-white py-20 md:py-28 px-5 sm:px-8 md:px-12 border-y border-[#e8e6e0]">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="font-mono-label text-[10px] font-bold uppercase tracking-[0.24em] text-[#ad3074] mb-3">
              Full Spectrum Facilities
            </p>
            <h3 className="font-display text-3xl sm:text-4xl text-[#26382e] font-normal leading-tight mb-4">
              Everything Included in Your Stay
            </h3>
            <p className="text-[#686868] text-sm sm:text-base leading-relaxed font-light">
              We focus on the practical details that make travel simple, restful, and worry-free.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {keyAmenities.map((amenity, idx) => {
              const Icon = amenity.icon;
              return (
                <div
                  key={idx}
                  className="p-6 bg-[#faf9f6] border border-[#e8e6e0] rounded-sm transition-all duration-300 hover:border-[#d7b49a] hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-full bg-white border border-[#ad3074]/20 flex items-center justify-center text-[#ad3074] mb-4 shadow-xs">
                    <Icon size={20} />
                  </div>
                  <h4 className="font-display text-lg text-[#26382e] font-normal mb-2">
                    {amenity.title}
                  </h4>
                  <p className="text-xs text-[#555] leading-relaxed">
                    {amenity.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ ESSENTIAL STAY DETAILS & POLICIES ═══ */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 md:px-12 py-16 md:py-24">
        <div className="bg-[#f2f0ec] rounded-sm border border-[#e0ddd6] p-8 sm:p-12 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <p className="font-mono-label text-[10px] font-bold uppercase tracking-[0.2em] text-[#ad3074] mb-2">
              Stay Essentials
            </p>
            <h3 className="font-display text-2xl sm:text-3xl text-[#26382e] font-normal mb-4">
              Hotel Check-in &amp; Arrival Policies
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-[#444] leading-relaxed">
              <div>
                <p className="font-bold text-[#26382e] mb-1">Standard Check-In</p>
                <p>12:00 PM onwards. Early check-in is accommodated subject to room availability.</p>
              </div>
              <div>
                <p className="font-bold text-[#26382e] mb-1">Standard Check-Out</p>
                <p>11:00 AM. Late check-out can be requested at the front desk.</p>
              </div>
              <div>
                <p className="font-bold text-[#26382e] mb-1">Free Parking Included</p>
                <p>Complimentary on-site vehicle parking for all registered room guests.</p>
              </div>
              <div>
                <p className="font-bold text-[#26382e] mb-1">Payment &amp; Identification</p>
                <p>Valid Government ID required at check-in. All major cards, UPI and cash accepted.</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-sm border border-[#e8e6e0] shadow-sm text-center flex flex-col justify-center items-center">
            <p className="font-mono-label text-[10px] font-bold uppercase tracking-widest text-[#ad3074] mb-2">
              Best Direct Rate
            </p>
            <h4 className="font-display text-xl text-[#26382e] mb-3 font-normal">
              Need assistance booking your room?
            </h4>
            <p className="text-xs text-[#686868] mb-6 leading-relaxed max-w-xs">
              Call our concierge desk for instant reservations, corporate discounts, or special requirements.
            </p>
            <a
              href={`tel:${business.phones.primary}`}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-[#ad3074] px-6 py-3 rounded-xs hover:bg-[#26382e] transition-colors"
            >
              <Phone size={14} /> {business.phones.primaryDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* ═══ DIRECT BOOKING BANNER ═══ */}
      <section className="bg-gradient-to-r from-[#17221b] to-[#26382e] text-white py-16 px-5 sm:px-8 text-center border-t border-white/10">
        <div className="max-w-2xl mx-auto">
          <p className="font-mono-label text-[10px] font-bold uppercase tracking-[0.24em] text-[#d7b49a] mb-3">
            Hotel Sitara Residency · Kalamboli
          </p>
          <h3 className="font-display text-2xl sm:text-4xl font-normal mb-4">
            Experience Genuine Comfort &amp; Hospitality
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
              Check Availability &amp; Book Direct
            </a>
            <Link
              href="/bedrooms"
              className="text-xs uppercase font-bold tracking-widest text-white/80 hover:text-white border-b border-white/30 pb-1"
            >
              View All Room Types
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
