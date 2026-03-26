"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCursorExpanded } from "@/store/slices/ui-slice";

export function CustomCursor() {
  const dispatch = useAppDispatch();
  const expanded = useAppSelector((state) => state.ui.cursorExpanded);
  const [position, setPosition] = useState({ x: -200, y: -200 });

  useEffect(() => {
    let isActive = true;

    const move = (event: MouseEvent) => {
      if (isActive) {
        setPosition({ x: event.clientX, y: event.clientY });
      }
    };

    const handleOver = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-cursor='hover']")) {
        dispatch(setCursorExpanded(true));
      }
    };

    const handleOut = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-cursor='hover']")) {
        dispatch(setCursorExpanded(false));
      }
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      isActive = false;
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [dispatch]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden rounded-full border border-white/50 bg-white/8 backdrop-blur-sm mix-blend-screen md:block"
      animate={{
        x: position.x - (expanded ? 42 : 13),
        y: position.y - (expanded ? 42 : 13),
        width: expanded ? 84 : 26,
        height: expanded ? 84 : 26,
        opacity: expanded ? 0.95 : 0.8,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 24,
        mass: 0.35,
      }}
    />
  );
}
