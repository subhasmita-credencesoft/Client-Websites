"use client";

import { motion, useMotionTemplate } from "framer-motion";
import { useEffect, useState } from "react";
import { useCursorFollower } from "@/hooks/useCursorFollower";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const { x, y, springX, springY } = useCursorFollower();
  const [interactive, setInteractive] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const onPointer = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const active = Boolean(target?.closest("a, button, input, textarea, select, [role='button']"));
      setInteractive(active);
    };

    const onMouseDown = () => {
      setClicked(true);
      window.setTimeout(() => setClicked(false), 180);
    };

    document.addEventListener("mouseover", onPointer);
    window.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("mouseover", onPointer);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  const dotTransform = useMotionTemplate`translate3d(calc(${x}px - 4px), calc(${y}px - 4px), 0)`;
  const ringTransform = useMotionTemplate`translate3d(calc(${springX}px - ${interactive ? 30 : 20}px), calc(${springY}px - ${interactive ? 30 : 20}px), 0)`;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[120] hidden h-2 w-2 rounded-full bg-gold lg:block"
        style={{ transform: dotTransform }}
      />
      <motion.div
        aria-hidden
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[119] hidden rounded-full border border-gold transition-[width,height,background-color,transform] duration-300 lg:block",
          interactive ? "mix-blend-difference bg-gold/90" : "bg-transparent",
          clicked && "scale-90"
        )}
        style={{
          transform: ringTransform as unknown as string,
          width: interactive ? 60 : 40,
          height: interactive ? 60 : 40
        }}
      />
    </>
  );
}
