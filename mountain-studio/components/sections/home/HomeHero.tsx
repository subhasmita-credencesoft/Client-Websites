"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mouse } from "lucide-react";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { bookingEngineUrl } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: [0.25, 1, 0.5, 1] },
  }),
};

export function HomeHero() {
  return (
    <section
      className="relative isolate flex min-h-[100dvh] flex-col justify-end overflow-hidden pb-24 pt-28 lg:justify-center lg:pb-0 lg:pt-0"
      aria-label="Redwings Studio Goa — luxury studio apartment stays"
    >
      {/* Background image — raw, no blur filter */}
      <div className="absolute inset-0 bg-dark">
        <Image
          src="/mountain-studio/hero-main.jpeg"
          alt="Redwings Studio Goa — studio apartment property at Abalone Resort, Arpora, North Goa"
          fill
          priority
          fetchPriority="high"
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Overlays — lighter, only bottom gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

      {/* Content */}
      <div className="container-shell relative z-10 w-full">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <span className="mb-4 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-gold">
              <span className="h-px w-6 bg-gold/60" />
              Gorbhat, Arpora, North Goa
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-display text-5xl font-light leading-[1.05] text-ivory sm:text-6xl lg:text-7xl"
          >
            Studio Apartments
            <br />
            <span className="text-gold-light">In The Heart</span>{" "}
            Of Goa
          </motion.h1>

          {/* Gold line */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="mt-5 h-px w-12 bg-gold/50"
          />

          {/* Description */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="mt-5 max-w-md text-sm leading-relaxed text-ivory/60"
          >
            10 owner-managed studio apartments at Abalone Resort.
            Budget to pool-view rooms from ₹1,950/night.
            Check-in 1 PM, check-out 11 AM.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <LuxuryButton href={bookingEngineUrl} label="Check Availability" play />
            <LuxuryButton href="/rooms" label="View Rooms" variant="ghost" className="border-gold/50" />
          </motion.div>

          {/* Trust strip */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={5}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-ivory/40"
          >
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-gold/60" />
              From ₹1,950/night
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-gold/60" />
              Free Cancellation
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-gold/60" />
              Direct Booking
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-ivory/40 lg:flex"
      >
        <Mouse size={20} className="text-gold/70" />
        <div className="h-6 w-px bg-gold/30" />
      </motion.div>
    </section>
  );
}
