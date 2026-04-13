"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

export function PageTransition({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const [transitionKey, setTransitionKey] = useState(0);

  useEffect(() => {
    setTransitionKey((value) => value + 1);
  }, [pathname]);

  return (
    <>
      <motion.div
        key={`sweep-${transitionKey}`}
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-1 origin-top bg-gold"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 0.85, ease: "easeInOut" }}
      />
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative min-h-screen"
      >
        {children}
      </motion.div>
    </>
  );
}
