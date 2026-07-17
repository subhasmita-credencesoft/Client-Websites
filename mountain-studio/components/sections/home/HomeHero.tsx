"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { Mouse } from "lucide-react";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { bookingEngineUrl } from "@/lib/data";
import { useParallax } from "@/hooks/useParallax";
import { useSplitText } from "@/hooks/useSplitText";

/**
 * HomeHero — animated hero section (client component).
 * Extracted from app/page.tsx so the page can be a Server Component
 * and export metadata / JSON-LD structured data.
 */
export function HomeHero() {
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const lineOneRef = useRef<HTMLSpanElement>(null);
  const lineTwoRef = useRef<HTMLSpanElement>(null);
  const lineThreeRef = useRef<HTMLSpanElement>(null);
  const y = useParallax(0.35);

  useSplitText(eyebrowRef);
  useSplitText(lineOneRef, 0.12);
  useSplitText(lineTwoRef, 0.28);
  useSplitText(lineThreeRef, 0.44);

  return (
    <section
      className="relative isolate flex min-h-[100dvh] items-center overflow-hidden"
      aria-label="Redwings Studio hero — Studio apartment stays in Goa"
    >
      <div className="absolute inset-0">
        <Image
          src="/mountain-studio/hero-main.jpeg"
          alt="Redwings Studio Goa — studio apartment property exterior"
          fill
          priority
          fetchPriority="high"
          className="h-full w-full object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-black/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,168,76,0.14),transparent_40%)]" />

      <div className="container-shell relative z-10 pt-28">
        <motion.div style={{ y }} className="max-w-5xl">
          <p ref={eyebrowRef} className="eyebrow">
            Redwings Studio, Goa
          </p>
          <h1
            className="max-w-5xl font-display text-[clamp(3.5rem,10vw,8rem)] font-light leading-[0.88] text-ivory"
          >
            <span ref={lineOneRef} className="block">Stay At</span>
            <span ref={lineTwoRef} className="block">Redwings</span>
            <span ref={lineThreeRef} className="block">Studio</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-ivory/75">
            Owner-managed studio apartments in Goa with direct booking support and a relaxed resort setting.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <LuxuryButton href="/contact" label="Contact The Team" />
            <LuxuryButton
              href={bookingEngineUrl}
              label="Check Availability"
              variant="ghost"
              className="border-gold/55"
              play
            />
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-ivory/60">
        <Mouse size={24} className="text-gold" />
        <div className="h-8 w-px bg-gold/50" />
      </div>
    </section>
  );
}
