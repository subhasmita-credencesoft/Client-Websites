"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

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
      className="relative isolate flex min-h-[100dvh] flex-col justify-center overflow-hidden py-28 lg:py-32"
      aria-label="Redwings Studio Goa — studio apartment stays in Arpora"
    >
      {/* Background image */}
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

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/55 to-dark/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent" />

      {/* Content */}
      <div className="container-shell relative z-10 w-full">
        <div className="max-w-2xl">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-gold">
                <span className="h-px w-6 bg-gold/60" />
                Gorbhat, Arpora, North Goa
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gold-light">
                <MapPin size={11} />
                3 km from Baga Beach
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="mt-5 font-display text-5xl font-light leading-[1.05] text-ivory sm:text-6xl xl:text-7xl"
          >
            Stay Right In
            <br />
            The Heart Of{" "}
            <span className="text-gold-light">North Goa</span>
          </motion.h1>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="mt-5 h-px w-12 bg-gold/50"
          />

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="mt-5 max-w-lg text-sm leading-relaxed text-ivory/70 sm:text-base"
          >
            10 owner-managed studio apartments with a swimming pool, free
            Wi-Fi, and free parking. Budget to pool-view rooms from{" "}
            <span className="text-gold">₹1,950/night</span>, with free
            cancellation and direct booking support — Baga, Calangute, and
            Anjuna beaches are all within a 15-minute drive.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <LuxuryButton href={bookingEngineUrl} label="Book a Stay" play />
            <LuxuryButton
              href="/rooms"
              label="View Rooms & Tariff"
              variant="ghost"
              className="border-gold/50"
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={5}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-[11px] uppercase tracking-[0.18em] text-ivory/60"
          >
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-gold/60" />
              10 Studio Apartments
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-gold/60" />
              Swimming Pool
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-gold/60" />
              Check-in 1 PM &bull; Check-out 11 AM
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
