"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePreloader } from "@/components/providers/PreloaderProvider";
import { useSplitText } from "@/hooks/useSplitText";
import { prefersReducedMotion } from "@/lib/utils";

export function Preloader() {
  const { isLoading } = usePreloader();
  const textRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);

  useSplitText(textRef, 0.2);

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    document.body.style.overflow = "hidden";
    const reduced = prefersReducedMotion();
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / 2500, 1);
      setPercent(Math.round(progress * 100));
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    const frame = requestAnimationFrame(tick);

    if (!reduced && lineRef.current) {
      lineRef.current.animate(
        [
          { transform: "scaleX(0)" },
          { transform: "scaleX(1)" }
        ],
        { duration: 1100, delay: 800, fill: "forwards", easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
      );
    }

    return () => {
      document.body.style.overflow = "";
      cancelAnimationFrame(frame);
    };
  }, [isLoading]);

  return (
    <motion.div
      aria-hidden={!isLoading}
      className="fixed inset-0 z-[130] flex items-center justify-center bg-dark pointer-events-none"
      initial={false}
      animate={isLoading ? { y: "0%", opacity: 1 } : { y: "-100%", opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.7, 0, 0.3, 1] }}
      style={{ visibility: isLoading ? "visible" : "hidden" }}
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative h-20 w-28 sm:h-24 sm:w-36">
          <Image
            src="/redwings-studio-logo.svg"
            alt="Redwings Studio logo"
            fill
            priority
            className="object-contain"
            sizes="144px"
          />
        </div>
        <div className="space-y-3">
          <h1 ref={textRef} className="font-display text-3xl uppercase tracking-[0.35em] text-ivory">
            REDWINGS STUDIO
          </h1>
          <p className="text-xs uppercase tracking-[0.35em] text-ivory/60">
            ARPORA | GOA
          </p>
        </div>
        <div ref={lineRef} className="gold-line h-px w-44 origin-center" />
        <div className="font-mono text-sm tracking-[0.35em] text-gold-light">{percent}%</div>
      </div>
    </motion.div>
  );
}

