"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type CurvedLoopProps = {
  marqueeText: ReactNode;
  speed?: number;
  curveAmount?: number;
  direction?: "left" | "right";
  interactive?: boolean;
  className?: string;
};

export default function CurvedLoop({
  marqueeText,
  speed = 20,
  curveAmount = 0,
  direction = "left",
  interactive = false,
  className = "",
}: CurvedLoopProps) {
  const fromX = direction === "left" ? "0%" : "-100%";
  const toX = direction === "left" ? "-100%" : "0%";

  return (
    <div
      className={`w-full overflow-hidden whitespace-nowrap ${
        interactive ? "curved-loop-interactive" : ""
      }`}
      data-curve-amount={curveAmount}
    >
      <motion.div
        className={`flex w-max gap-10 ${className}`}
        animate={{ x: [fromX, toX] }}
        transition={{
          repeat: Infinity,
          duration: speed,
          ease: "linear",
        }}
      >
        {marqueeText}
        {marqueeText}
      </motion.div>
      <style jsx>{`
        .curved-loop-interactive:hover > div {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
