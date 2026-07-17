import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { bookingEngineUrl } from "@/lib/data";

export const metadata: Metadata = {
  title: "Page Not Found — Redwings Studio Goa",
  description: "The page you're looking for doesn't exist. Browse rooms, check availability, or explore Redwings Studio, Goa.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/mountain-studio/hero-main.jpeg"
          alt=""
          fill
          className="object-cover object-center scale-105"
          sizes="100vw"
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/65" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,168,76,0.06),transparent_60%)]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl px-6 text-center">
        {/* 404 */}
        <div className="relative inline-block">
          <span
            className="block font-display text-[clamp(7rem,20vw,18rem)] font-extralight leading-none tracking-[-0.03em]"
            style={{
              background: "linear-gradient(180deg, rgba(245,240,232,0.95) 0%, rgba(201,168,76,0.6) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 80px rgba(201,168,76,0.12))",
            }}
          >
            404
          </span>
        </div>

        {/* Gold divider */}
        <div className="mx-auto mt-8 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/50" />
          <div className="h-1.5 w-1.5 rotate-45 border border-gold/50" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/50" />
        </div>

        {/* Heading */}
        <h1 className="mt-8 font-display text-3xl font-light text-ivory/90 sm:text-4xl">
          Lost in Goa?
        </h1>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-ivory/45">
          The page you were looking for doesn&apos;t exist or has been moved.
          Let us help you find your way back.
        </p>

        {/* Glass card */}
        <div className="mx-auto mt-10 max-w-md overflow-hidden rounded-[28px] border border-white/[0.06]">
          <div
            className="p-8"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Primary CTA */}
            <Link
              href="/"
              className="group flex w-full items-center justify-center gap-3 rounded-full bg-gold px-8 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-dark transition duration-300 hover:bg-gold-light hover:shadow-[0_0_40px_rgba(201,168,76,0.25)]"
            >
              Back to Home
              <svg className="h-4 w-4 transition group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {/* Divider */}
            <div className="my-6 h-px bg-white/[0.06]" />

            {/* Secondary links */}
            <div className="grid grid-cols-3 gap-3">
              <Link
                href="/rooms"
                className="group rounded-2xl border border-white/[0.06] px-4 py-4 transition duration-300 hover:border-gold/30 hover:bg-white/[0.02]"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-ivory/50 group-hover:text-gold">Rooms</p>
                <p className="mt-1 text-[10px] text-ivory/25">5 types</p>
              </Link>
              <Link
                href="/gallery"
                className="group rounded-2xl border border-white/[0.06] px-4 py-4 transition duration-300 hover:border-gold/30 hover:bg-white/[0.02]"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-ivory/50 group-hover:text-gold">Gallery</p>
                <p className="mt-1 text-[10px] text-ivory/25">Photos</p>
              </Link>
              <Link
                href={bookingEngineUrl}
                className="group rounded-2xl border border-white/[0.06] px-4 py-4 transition duration-300 hover:border-gold/30 hover:bg-white/[0.02]"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-ivory/50 group-hover:text-gold">Book</p>
                <p className="mt-1 text-[10px] text-ivory/25">From ₹1,950</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Contact hint */}
        <p className="mt-8 text-xs text-ivory/25">
          Need help? <Link href="/contact" className="text-gold/60 underline transition hover:text-gold">Contact the team</Link>
        </p>
      </div>
    </div>
  );
}
