"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { bookingEngineUrl, navLinks } from "@/lib/data";
import { cn, prefersReducedMotion } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
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

  const desktopLinks = useMemo(
    () =>
      navLinks.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className="group relative py-2 text-[13px] font-medium uppercase tracking-[0.2em] text-ivory/80 transition hover:text-ivory"
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
    [pathname]
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "border-b border-gold/20 bg-dark/80 backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <div className="container-shell relative z-50 flex h-20 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Redwings Studio home"
          className="relative block h-12 w-[180px] shrink-0 sm:h-14 sm:w-[220px]"
        >
          <Image
            src="/redwings-studio-logo.svg"
            alt="Redwings Studio"
            fill
            priority
            className="object-contain object-left"
            sizes="220px"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 xl:gap-9 lg:flex">
          {desktopLinks}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden shrink-0 items-center lg:flex">
          <Link
            href={bookingEngineUrl}
            className="rounded-full border border-gold bg-gold/10 px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.22em] text-gold transition hover:bg-gold hover:text-dark"
          >
            Check Availability
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-ivory lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 flex min-h-screen flex-col overflow-y-auto overscroll-contain bg-dark px-8 pt-28 lg:hidden"
        style={{ clipPath: "inset(0 0 100% 0)", pointerEvents: open ? "auto" : "none" }}
      >
        <div className="flex flex-col gap-6">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "font-display text-3xl tracking-wide text-ivory/85 transition",
                pathname === link.href && "text-gold"
              )}
              style={{ animation: open ? `fadeup 0.7s ${index * 0.08}s both` : undefined }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mt-auto border-t border-gold/15 py-8">
          <Link
            href={bookingEngineUrl}
            onClick={() => setOpen(false)}
            className="inline-block rounded-full border border-gold bg-gold/10 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.22em] text-gold transition hover:bg-gold hover:text-dark"
          >
            Check Availability
          </Link>
        </div>
      </div>
    </header>
  );
}
