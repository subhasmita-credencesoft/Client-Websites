"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { bookingEngineUrl, navLinks, MORE_LINKS } from "@/lib/data";
import { cn, prefersReducedMotion } from "@/lib/utils";

const VISIBLE_COUNT = 7;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!overlayRef.current) return;
    overlayRef.current.animate(
      [
        { clipPath: open ? "inset(0 0 100% 0)" : "inset(0)" },
        { clipPath: open ? "inset(0)" : "inset(0 0 100% 0)" }
      ],
      { duration: 450, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards" }
    );
  }, [open]);

  // Close More dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const visibleLinks = navLinks.slice(0, VISIBLE_COUNT);
  const hasMore = navLinks.length > VISIBLE_COUNT;
  const isMoreActive = MORE_LINKS.some((l) => pathname === l.href);

  const desktopLinks = useMemo(
    () =>
      visibleLinks.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className="group relative whitespace-nowrap py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-ivory/80 transition hover:text-ivory lg:text-[12px]"
          >
            {link.label}
            <span
              className={cn(
                "absolute bottom-0 left-0 h-px origin-left bg-gold transition-transform duration-300",
                active ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100"
              )}
            />
          </Link>
        );
      }),
    [pathname, visibleLinks]
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "border-b border-gold/20 bg-dark/80 backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <div className="container-shell relative z-50 flex h-16 items-center justify-between gap-3 sm:h-[72px] lg:h-20">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Redwings Studio home"
          className="relative block h-10 w-[140px] shrink-0 sm:h-11 sm:w-[170px] lg:h-12 lg:w-[200px]"
        >
          <Image
            src="/redwings-studio-logo.svg"
            alt="Redwings Studio"
            fill
            priority
            className="object-contain object-left"
            sizes="200px"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-4 xl:gap-6 2xl:gap-7 lg:flex">
          {desktopLinks}

          {/* More dropdown */}
          {hasMore && (
            <div ref={moreRef} className="relative">
              <button
                onClick={() => setMoreOpen((v) => !v)}
                className={cn(
                  "group flex items-center gap-1 whitespace-nowrap py-2 text-[11px] font-medium uppercase tracking-[0.22em] transition hover:text-ivory lg:text-[12px]",
                  isMoreActive ? "text-gold" : "text-ivory/80"
                )}
              >
                More
                <ChevronDown
                  size={12}
                  className={cn(
                    "transition-transform duration-200",
                    moreOpen && "rotate-180"
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px origin-left bg-gold transition-transform duration-300",
                    moreOpen ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </button>

              {moreOpen && (
                <div className="absolute right-0 top-full mt-2 min-w-[200px] rounded-[16px] border border-gold/15 bg-dark-2 p-2 shadow-xl">
                  {MORE_LINKS.map((link) => {
                    const active = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMoreOpen(false)}
                        className={cn(
                          "block rounded-xl px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] transition hover:bg-gold/10 lg:text-[12px]",
                          active ? "text-gold" : "text-ivory/65 hover:text-gold"
                        )}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden shrink-0 items-center lg:flex">
          <Link
            href={bookingEngineUrl}
            className="rounded-full border border-gold bg-gold/10 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-gold transition hover:bg-gold hover:text-dark sm:px-5 sm:py-2.5 sm:text-[11px]"
          >
            Check Availability
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative z-[60] inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-ivory sm:h-11 sm:w-11 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 flex min-h-screen flex-col overflow-y-auto overscroll-contain bg-dark px-6 pt-24 sm:px-8 sm:pt-28 lg:hidden"
        style={{ clipPath: "inset(0 0 100% 0)", pointerEvents: open ? "auto" : "none" }}
      >
        <div className="flex flex-col gap-5">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "font-display text-2xl tracking-wide text-ivory/85 transition sm:text-3xl",
                pathname === link.href && "text-gold"
              )}
              style={{ animation: open ? `fadeup 0.7s ${index * 0.08}s both` : undefined }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile secondary links */}
        <div className="mt-6 flex flex-col gap-3 border-t border-gold/10 pt-5">
          <p className="text-[10px] uppercase tracking-[0.25em] text-ivory/35">More</p>
          {MORE_LINKS.filter((l) => !navLinks.some((n) => n.href === l.href)).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm text-ivory/50 transition hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mt-auto border-t border-gold/15 py-8">
          <Link
            href={bookingEngineUrl}
            onClick={() => setOpen(false)}
            className="inline-block rounded-full border border-gold bg-gold/10 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-gold transition hover:bg-gold hover:text-dark"
          >
            Check Availability
          </Link>
        </div>
      </div>
    </header>
  );
}
