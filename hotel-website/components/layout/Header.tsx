"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { createPortal } from "react-dom";
import Container from "../ui/Container";
import navigation from "../../data/navigation";
import menuPreviews from "../../data/menuPreviews";
import useScrollPosition from "../../hooks/useScrollPosition";
import { usePropertyData } from "../providers/PropertyDataProvider";

/* ── contact constants ── */
const DEFAULT_EMAIL = "info@uksresort.com";
const DEFAULT_PHONE_1 = "+91 98220 12343";
const DEFAULT_PHONE_2 = "+91 87798 14559";
const DEFAULT_LOGO = "/images/logo1.png";
const PREFETCH_ROUTES = [
  "/",
  "/rooms",
  "/dining",
  "/weddings",
  "/wellness",
  "/experiences",
  "/tariffs",
  "/rooms/reservation",
  "/around-us",
  "/contact",
  "/about",
];

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

function resolvePreviewPath(pathname: string): string {
  if (menuPreviews[pathname]) return pathname;
  const matched = Object.keys(menuPreviews)
    .filter((key) => key !== "/" && pathname.startsWith(key))
    .sort((a, b) => b.length - a.length)[0];
  return matched ?? "/";
}

function toTelHref(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits ? `tel:+${digits}` : "#";
}

function formatPhone(value: string | null | undefined) {
  if (!value) return "";
  const digitsOnly = value.replace(/\D/g, "");
  if (digitsOnly.length === 10) return `+91 ${digitsOnly.slice(0, 5)} ${digitsOnly.slice(5)}`;
  return value;
}

function compactAddress(parts: Array<string | null | undefined>) {
  return parts.filter(Boolean).join(", ");
}

/* ── shared SVGs ── */
const PhoneIcon = () => (
  <svg className="h-[0.9rem] w-[0.9rem] shrink-0" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.9v2a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h2a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.2 9.91a16 16 0 0 0 6.29 6.29l1.27-.97a2 2 0 0 1 2.11-.45 12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 17.42Z" />
  </svg>
);

const MailIcon = () => (
  <svg className="h-[0.9rem] w-[0.9rem] shrink-0" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 7 10-7" />
  </svg>
);

const CloseIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 6 18 18M18 6 6 18" />
  </svg>
);

export default function Header() {
  const { property } = usePropertyData();
  const router = useRouter();
  const scrolled  = useScrollPosition();
  const pathname  = usePathname();
  const isHeroPage =
    pathname === "/" ||
    pathname.startsWith("/rooms")       ||
    pathname.startsWith("/dining")       ||
     pathname.startsWith("/about")    ||
    pathname.startsWith("/wellness")    ||
    pathname.startsWith("/facilities")  ||
    pathname.startsWith("/experiences") ||
    pathname.startsWith("/weddings")    ||
    pathname.startsWith("/blog")        ||
    pathname.startsWith("/around-us")   ||
    pathname.startsWith("/contact")     ||
    pathname.startsWith("/tariffs");     

  const [menuOpen,    setMenuOpen]    = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [menuPreview, setMenuPreview] = useState<string>(resolvePreviewPath(pathname));
  const headerRef = useRef<HTMLDivElement | null>(null);
  const canUsePortal = typeof document !== "undefined";
  const logoSrc = property?.logoUrl ?? DEFAULT_LOGO;
  const propertyName = property?.name ?? "UK's Resort";
  const email = property?.email ?? DEFAULT_EMAIL;
  const primaryPhone = formatPhone(property?.mobile) || DEFAULT_PHONE_1;
  const whatsappPhone = formatPhone(property?.whatsApp) || DEFAULT_PHONE_2;
  const primaryPhoneHref = toTelHref(primaryPhone);
  const whatsappPhoneHref = toTelHref(whatsappPhone);
  const addressLong = compactAddress([
    property?.address?.streetName,
    property?.address?.suburb,
    property?.address?.city,
    property?.address?.state,
  ]) || "Mahad Phata, Old Mumbai-Pune Hwy, Khopoli, Raigad";
  const addressShort = compactAddress([property?.address?.city, property?.address?.state]) || "Khopoli, Raigad";

  useEffect(() => {
    document.body.style.overflow = menuOpen || menuClosing ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, menuClosing]);

  useEffect(() => {
    let cancelled = false;
    const ids: number[] = [];
    const idleWindow = window as IdleWindow;

    const prefetchInBatches = () => {
      if (cancelled) return;
      PREFETCH_ROUTES.forEach((route, index) => {
        const id = window.setTimeout(() => {
          if (!cancelled) router.prefetch(route);
        }, index * 180);
        ids.push(id);
      });
    };

    if (idleWindow.requestIdleCallback) {
      const idleId = idleWindow.requestIdleCallback(prefetchInBatches, { timeout: 1200 });
      ids.push(idleId);
    } else {
      const fallbackId = window.setTimeout(prefetchInBatches, 300);
      ids.push(fallbackId);
    }

    return () => {
      cancelled = true;
      ids.forEach((id) => {
        window.clearTimeout(id);
        if (idleWindow.cancelIdleCallback) idleWindow.cancelIdleCallback(id);
      });
    };
  }, [router]);

  useEffect(() => {
    setMenuPreview(resolvePreviewPath(pathname));
  }, [pathname]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".header-anim",
        { y: -10, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out", stagger: 0.06, overwrite: "auto" },
      );
      gsap.fromTo(
        ".header-nav-item",
        { y: 8, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.4, ease: "power3.out", stagger: 0.03, delay: 0.08, overwrite: "auto" },
      );
    }, headerRef);

    return () => ctx.revert();
  }, [pathname, isHeroPage]);

  const closeMenu = () => {
    setMenuClosing(true);
    window.setTimeout(() => { setMenuOpen(false); setMenuClosing(false); }, 450);
  };


  return (
    <div ref={headerRef} className={`w-full ${isHeroPage ? "absolute top-0 left-0 z-50" : "sticky top-0 z-50"}`}>

      {/* ══════════════════════════════════════
          ANNOUNCEMENT BAR — slides up and hides on scroll
      ══════════════════════════════════════ */}
      <div
        className={`header-anim relative w-full overflow-hidden transition-[height] duration-500 ease-in-out ${
          isHeroPage && scrolled ? "h-0" : "h-[2.1rem]"
        }`}
      >
        <div
          className={`absolute inset-0 border-b border-white/[0.14] bg-[linear-gradient(90deg,rgba(72,79,45,0.56)_0%,rgba(104,113,124,0.42)_20%,rgba(104,113,124,0.42)_80%,rgba(72,79,45,0.56)_100%)] backdrop-blur-[18px] transition-all duration-500 ease-in-out ${
            scrolled
              ? "-translate-y-full opacity-0 pointer-events-none"
              : "translate-y-0 opacity-100"
          }`}
        >
          <div className="flex h-[2.1rem] w-full items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16">

          {/* Left — address */}
          <div className="flex items-center gap-1.5 text-[0.67rem] text-white/70">
            <svg className="h-[0.78rem] w-[0.78rem] shrink-0 text-[#d89a55]" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 10c0 6-8 13-8 13S4 16 4 10a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="hidden sm:inline">{addressLong}</span>
            <span className="sm:hidden">{addressShort}</span>
          </div>

          {/* Right — phones + email */}
          <div className="flex items-center gap-2.5 text-[0.67rem] text-white/70 sm:gap-3">
            <a href={primaryPhoneHref} className="flex items-center gap-1 transition-colors hover:text-white">
              <PhoneIcon />
              <span className="hidden md:inline">{primaryPhone}</span>
              <span className="md:hidden">{primaryPhone.replace("+91 ", "")}</span>
            </a>
            <span className="text-white/20" aria-hidden="true">|</span>
            <a href={whatsappPhoneHref} className="hidden items-center gap-1 transition-colors hover:text-white lg:flex">
              {whatsappPhone}
            </a>
            <span className="hidden text-white/20 lg:block" aria-hidden="true">|</span>
            <a href={`mailto:${email}`} className="hidden items-center gap-1 transition-colors hover:text-white sm:flex">
              <MailIcon />
              {email}
            </a>
          </div>

          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          MAIN HEADER
      ══════════════════════════════════════ */}
      <header
        data-no-global-gsap
        className={`w-full transition-all duration-500 ${
          isHeroPage
            ? /* Glass always on for hero pages — stronger blur when scrolled */
              `text-white border-b border-white/[0.14]
               bg-[linear-gradient(90deg,rgba(72,79,45,0.56)_0%,rgba(104,113,124,0.42)_20%,rgba(104,113,124,0.42)_80%,rgba(72,79,45,0.56)_100%)] backdrop-blur-[18px]
               ${scrolled ? "!bg-[linear-gradient(90deg,rgba(72,79,45,0.62)_0%,rgba(104,113,124,0.5)_20%,rgba(104,113,124,0.5)_80%,rgba(72,79,45,0.62)_100%)] !backdrop-blur-[18px] !border-white/[0.14]" : ""}`
            : /* Solid white for non-hero pages */
              `border-b border-black/10 bg-white text-[#1f3c44]
               ${scrolled ? "shadow-sm" : ""}`
        }`}
      >

      {/* ══════════════════════════════════════
          TOP BAR
      ══════════════════════════════════════ */}
      <div className="header-anim w-full px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="relative flex h-[4.25rem] w-full items-center sm:h-[5rem]">

          {/* Hamburger — 3 descending-width lines */}
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => {
              if (menuOpen) { closeMenu(); return; }
              setMenuPreview(resolvePreviewPath(pathname));
              setMenuOpen(true);
            }}
            className="group flex flex-col items-start justify-center gap-[6px] py-2.5 pr-2.5"
          >
            <span className="block h-[2px] w-[28px] bg-current transition-all duration-200 group-hover:w-[32px]" />
            <span className="block h-[2px] w-[22px] bg-current transition-all duration-200 group-hover:w-[26px]" />
            <span className="block h-[2px] w-[16px] bg-current transition-all duration-200 group-hover:w-[20px]" />
          </button>

          {/* Logo — always perfectly centered */}
          <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Image
              src={logoSrc}
              alt={propertyName}
              width={220}
              height={80}
              className={`h-9 w-auto sm:h-11 lg:h-[3rem] ${isHeroPage ? "" : "invert"}`}
              unoptimized={logoSrc.startsWith("http")}
              priority
            />
          </Link>

          {/* ── RIGHT GROUP ── */}
          <div className="ml-auto flex items-center gap-3 lg:gap-4 xl:gap-5">

            {/* Email — xl screens only */}
            {/* <a
              href={`mailto:${email}`}
              className="hidden items-center gap-1.5 text-[0.72rem] font-normal opacity-80 transition-opacity hover:opacity-100 xl:flex"
            >
              <MailIcon />
              {email}
            </a> */}

            {/* Divider */}


            {/* Phone 1 + Phone 2 — desktop */}
            {/* <a
              href={primaryPhoneHref}
              className="hidden items-center gap-1.5 text-[0.72rem] font-normal opacity-80 transition-opacity hover:opacity-100 lg:flex"
            >
              <PhoneIcon />
              {primaryPhone}
            </a> */}

            {/* slash + second number — lg+ */}
           
            {/* <a
              href={whatsappPhoneHref}
              className="hidden text-[0.72rem] font-normal opacity-80 transition-opacity hover:opacity-100 lg:block"
            >
              {whatsappPhone}
            </a> */}

            {/* Divider before book button */}
            {/* <span className="hidden h-3 w-px bg-current opacity-20 lg:block" aria-hidden="true" /> */}            {/* Book button */}
            <Link
              href="https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true"
              className={`flex items-center gap-2 rounded-full border px-5 py-[0.55rem] text-[0.72rem] font-semibold uppercase tracking-[0.22em] transition-all duration-200 sm:px-6 sm:py-2.5 sm:text-[0.78rem] ${
                isHeroPage
                  ? "border-white/50 text-white hover:border-white hover:bg-white/10"
                  : "border-[#1f3c44]/45 text-[#1f3c44] hover:border-[#1f3c44] hover:bg-[#1f3c44]/5"
              }`}
            >
              <span className="hidden sm:inline">Book your stay</span>
              <span className="sm:hidden">Book</span>
              <span className="text-[0.85rem] leading-none" aria-hidden="true">&rsaquo;</span>
            </Link>

          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          NAV BAR — dot · separated, Title Case, serif
      ══════════════════════════════════════ */}
      <div
        className={`header-anim hidden border-t lg:block ${
          isHeroPage
            ? "border-white/[0.14] bg-[linear-gradient(90deg,rgba(72,79,45,0.56)_0%,rgba(104,113,124,0.42)_20%,rgba(104,113,124,0.42)_80%,rgba(72,79,45,0.56)_100%)] backdrop-blur-[18px]"
            : "border-black/[0.07] bg-white"
        }`}
      >
        <nav aria-label="Main navigation" className="flex h-[3.2rem] w-full items-center justify-center">
          <ul className="flex items-center">
            {navigation.map((item, index) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href} className="flex items-center">
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onMouseEnter={() => router.prefetch(item.href)}
                    className={`header-nav-item px-[0.85rem] font-serif text-[1.25rem] font-normal transition-colors duration-200 xl:px-[1rem] xl:text-[1.25rem] ${
                      isHeroPage ? "text-white/82 hover:text-white" : "text-[#1f3c44]/65 hover:text-[#1f3c44]"
                    }`}
                    style={isActive ? { color: "#d89a55" } : undefined}
                  >
                    {item.label}
                  </Link>
                  {index < navigation.length - 1 && (
                    <span
                      aria-hidden="true"
                      className={`block h-[3px] w-[3px] shrink-0 rounded-full ${
                        isHeroPage ? "bg-white/30" : "bg-[#1f3c44]/20"
                      }`}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* ══════════════════════════════════════
          FULLSCREEN MENU PORTAL
      ══════════════════════════════════════ */}
      {canUsePortal && menuOpen && createPortal(
        <div className={`menu-overlay fixed inset-0 z-[999] overflow-y-auto bg-[#141319] text-white ${menuClosing ? "is-closing" : ""}`}>

          {/* BG layers */}
          <div
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ease-out"
            style={{
              backgroundImage: `url("${encodeURI(menuPreviews[menuPreview] ?? menuPreviews["/"])}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="pointer-events-none absolute inset-0 z-0 bg-[#111015]/50" />
          <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-[#2d231f]/55 via-[#201c1c]/25 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-40 bg-[#1f1e22]/40 backdrop-blur-[2px]" />

          {/* Menu header */}
          <div className="relative z-10 border-b border-white/[0.1]">
            <div className="w-full px-5 sm:px-8 lg:px-12 xl:px-16">
              <div className="relative flex h-[4.25rem] w-full items-center sm:h-[5rem]">

                {/* Close */}
                <button aria-label="Close menu" onClick={closeMenu}
                  className="flex h-9 w-9 items-center justify-center text-white/70 transition hover:text-white">
                  <CloseIcon />
                </button>

                {/* Logo */}
                <Link href="/" onClick={closeMenu}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Image
                    src={logoSrc}
                    alt={propertyName}
                    width={160}
                    height={50}
                    className="h-8 w-auto sm:h-10"
                    unoptimized={logoSrc.startsWith("http")}
                    priority
                  />
                </Link>

                {/* Phone + Book */}
                <div className="ml-auto flex items-center gap-3 lg:gap-5">
                  <a href={primaryPhoneHref} className="hidden items-center gap-1.5 text-[0.75rem] text-white/80 hover:text-white lg:flex">
                    <PhoneIcon />
                    {primaryPhone}
                  </a>
                  <span className="hidden text-[0.75rem] text-white/30 lg:block" aria-hidden="true">/</span>
                  <a href={whatsappPhoneHref} className="hidden text-[0.75rem] text-white/80 hover:text-white lg:block">
                    {whatsappPhone}
                  </a>
                  <span className="hidden h-3 w-px bg-white/20 lg:block" aria-hidden="true" />
                  <Link href="https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true" onClick={closeMenu}
                    className="flex items-center gap-2 rounded-full border border-white/45 px-4 py-[0.45rem] text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-white transition hover:border-white hover:bg-white/10 sm:px-5 sm:py-2 sm:text-[0.6rem]">
                    <span className="hidden sm:inline">Book your stay</span>
                    <span className="sm:hidden">Book</span>
                    <span className="text-[0.72rem] leading-none" aria-hidden="true">&rsaquo;</span>
                  </Link>
                </div>

              </div>
            </div>
          </div>

          {/* Menu body */}
          <Container className="relative z-10 grid min-h-[calc(100vh-4.25rem)] gap-8 py-12 sm:min-h-[calc(100vh-5rem)] sm:py-16 lg:grid-cols-[2fr_1fr_1fr]">

            {/* Nav links */}
            <div>
              <ul className="space-y-0.5 font-serif text-[1.75rem] leading-[1.15] md:text-[2rem] lg:text-[2.25rem]">
                {navigation.map((item) => {
                  const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className="block transition-colors duration-200 hover:text-[#d89a55]"
                        style={{ color: isActive ? "#d89a55" : "rgba(255,255,255,0.92)" }}
                        onMouseEnter={() => {
                          setMenuPreview(resolvePreviewPath(item.href));
                          router.prefetch(item.href);
                        }}
                        onFocus={() => setMenuPreview(resolvePreviewPath(item.href))}
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <ul className="mt-4 space-y-0.5 border-t border-white/12 pt-4 text-[1rem] leading-[1.65] md:text-[1.08rem]">
                {["News", "Promotions & Offers", "Testimonials", "Contact"].map((label) => (
                  <li key={label}>
                    <span className="cursor-pointer text-white/65 transition-colors duration-200 hover:text-[#d89a55]">{label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info — now with real details */}
            <div className="space-y-3 pt-2">
              <p className="font-serif text-[1.75rem] leading-tight text-white md:text-[1.95rem]">Contact Info</p>
              <a href={`mailto:${email}`} className="flex items-center gap-2 text-[0.93rem] text-white/75 transition-colors hover:text-white">
                <MailIcon />
                {email}
              </a>
              <a href={primaryPhoneHref} className="flex items-center gap-2 text-[0.93rem] text-white/75 transition-colors hover:text-white">
                <PhoneIcon />
                {primaryPhone}
              </a>
              <a href={whatsappPhoneHref} className="flex items-center gap-2 text-[0.93rem] text-white/75 transition-colors hover:text-white">
                <PhoneIcon />
                {whatsappPhone}
              </a>
            </div>

            {/* Reservations */}
            <div className="space-y-3 pt-2">
              <p className="font-serif text-[1.75rem] leading-tight text-white md:text-[1.95rem]">Reservations</p>
              <a href={primaryPhoneHref} className="block text-[0.93rem] text-white/75 transition-colors hover:text-white">{primaryPhone}</a>
              <a href={whatsappPhoneHref} className="block text-[0.93rem] text-white/75 transition-colors hover:text-white">{whatsappPhone}</a>
              <a href={`mailto:${email}`} className="block text-[0.93rem] text-white/75 transition-colors hover:text-white">{email}</a>
            </div>

          </Container>
        </div>,
        document.body,
      )}
      </header>
    </div>
  );
}







