import type { Metadata } from "next";
import Link from "next/link";
import { bookingEngineUrl } from "@/lib/data";

export const metadata: Metadata = {
  title: "Page Not Found — Redwings Studio Goa",
  description: "The page you're looking for doesn't exist. Browse rooms, check availability, or explore Redwings Studio, Goa.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-dark">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(201,168,76,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/50 to-dark" />
      </div>

      {/* Decorative gold lines */}
      <div className="absolute left-1/2 top-0 h-px w-[400px] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 h-px w-[400px] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* 404 number */}
        <div className="relative">
          <span className="block font-display text-[clamp(8rem,25vw,20rem)] font-light leading-none text-gold/10">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-[clamp(4rem,12vw,9rem)] font-light leading-none text-ivory/90">
              404
            </span>
          </div>
        </div>

        {/* Gold line */}
        <div className="mx-auto mt-6 h-px w-20 bg-gold/50" />

        {/* Heading */}
        <h1 className="mt-8 font-display text-3xl text-ivory sm:text-4xl lg:text-5xl">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-ivory/50">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back to planning your Goa stay.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.22em] text-dark transition hover:bg-gold-light"
          >
            Back to Home
          </Link>
          <Link
            href="/rooms"
            className="inline-flex items-center gap-3 rounded-full border border-gold/40 px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.22em] text-ivory/70 transition hover:border-gold hover:text-gold"
          >
            Browse Rooms
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-ivory/30">
          <Link href="/rooms" className="transition hover:text-gold">Rooms</Link>
          <span className="h-1 w-1 rounded-full bg-gold/30" />
          <Link href="/gallery" className="transition hover:text-gold">Gallery</Link>
          <span className="h-1 w-1 rounded-full bg-gold/30" />
          <Link href="/contact" className="transition hover:text-gold">Contact</Link>
          <span className="h-1 w-1 rounded-full bg-gold/30" />
          <Link href="/faq" className="transition hover:text-gold">FAQ</Link>
          <span className="h-1 w-1 rounded-full bg-gold/30" />
          <Link href={bookingEngineUrl} className="transition hover:text-gold">Book Now</Link>
        </div>
      </div>
    </div>
  );
}
