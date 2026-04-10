"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { CtaButton } from "@/components/shared/cta-button";
import { Button } from "@/components/ui/button";
import { hotelInfo } from "@/data/hotel";
import { navigationItems } from "@/data/navigation";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export function MobileNav({ open, setOpen }: MobileNavProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <Button
        aria-expanded={open}
        aria-label={open ? "Close mobile navigation" : "Open mobile navigation"}
        className="h-10 w-10 rounded-full sm:h-11 sm:w-11"
        size="sm"
        variant="outline"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-40 bg-stone-950/35 backdrop-blur-sm"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-x-0 top-[calc(100%+0.75rem)] z-50 rounded-[1.75rem] border border-border/70 bg-white p-4 shadow-2xl sm:p-5"
              exit={{ opacity: 0, y: -16 }}
              initial={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="mb-4 rounded-3xl bg-secondary/70 p-4">
                <p className="font-display text-xl font-semibold text-stone-900 sm:text-2xl">{hotelInfo.shortName}</p>
                <p className="mt-1 text-sm text-muted-foreground">A premium Jaipur stay experience.</p>
              </div>
              <nav aria-label="Mobile navigation">
                <ul className="space-y-2">
                  {navigationItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        className={cn(
                          "block rounded-2xl px-4 py-3 text-base font-medium text-stone-700 transition hover:bg-secondary hover:text-primary",
                        )}
                        href={item.href}
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-5">
                <CtaButton className="w-full justify-center" href={hotelInfo.bookingUrl} label="Book Now" size="lg" />
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
