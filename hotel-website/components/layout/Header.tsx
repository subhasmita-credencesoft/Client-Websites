"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { createPortal } from "react-dom";
import Container from "../ui/Container";
import navigation from "../../data/navigation";
import menuPreviews from "../../data/menuPreviews";
import useScrollPosition from "../../hooks/useScrollPosition";
import useClientReady from "../../hooks/useClientReady";
import { usePropertyData } from "../providers/PropertyDataProvider";
import { getWhatsappShareUrl } from "../../lib/booking/bookingEngine";

const DEFAULT_EMAIL = "info@uksresort.com";
const DEFAULT_PHONE_1 = "+91 98220 12343";
const DEFAULT_PHONE_2 = "+91 87798 14559";
const DEFAULT_LOGO = "/UK's-Resort-Logo.png";

const HERO_PREFIXES = [
  "/",
  "/overview",
  "/rooms",
  "/dining",
  "/picnic",
  "/corporate",
  "/events",
  "/experiences",
  "/around-us",
  "/contact",
  "/about",
  "/wellness",
  "/facilities",
  "/blog",
  "/awards",
];

function resolvePreviewPath(pathname: string): string {
  if (menuPreviews[pathname]) return pathname;
  const matched = Object.keys(menuPreviews)
    .filter((k) => k !== "/" && pathname.startsWith(k))
    .sort((a, b) => b.length - a.length)[0];
  return matched ?? "/";
}

function toTelHref(value: string) {
  const d = value.replace(/\D/g, "");
  return d ? `tel:+${d}` : "#";
}

function formatPhone(value: string | null | undefined) {
  if (!value) return "";
  const d = value.replace(/\D/g, "");
  if (d.length === 10) return `+91 ${d.slice(0, 5)} ${d.slice(5)}`;
  return value;
}

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
    style={{ width: "0.9rem", height: "0.9rem", flexShrink: 0 }} aria-hidden="true">
    <path d="M22 16.9v2a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h2a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.2 9.91a16 16 0 0 0 6.29 6.29l1.27-.97a2 2 0 0 1 2.11-.45 12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 17.42Z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
    style={{ width: "0.9rem", height: "0.9rem", flexShrink: 0 }} aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 7 10-7" />
  </svg>
);

const WhatsappIcon = () => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    style={{ width: "0.98rem", height: "0.98rem", flexShrink: 0 }}
    aria-hidden="true"
  >
    <path
      d="M16.02 4.2c-6.46 0-11.7 5.14-11.7 11.48 0 2.03.55 4.01 1.59 5.75L4.2 27.8l6.56-1.69a11.88 11.88 0 0 0 5.26 1.21c6.45 0 11.69-5.14 11.69-11.49S22.47 4.2 16.02 4.2Z"
      fill="currentColor"
    />
    <path
      d="M16.02 6.08c-5.39 0-9.75 4.29-9.75 9.6 0 1.88.56 3.72 1.61 5.29l.25.38-1 3.64 3.75-.97.37.22a9.92 9.92 0 0 0 4.77 1.22c5.38 0 9.74-4.29 9.74-9.6s-4.36-9.78-9.74-9.78Z"
      fill="#25D366"
    />
    <path
      d="M12.18 10.92c.18-.41.37-.42.54-.43.14-.01.31-.01.47-.01.16 0 .43.06.65.29.22.24.83.81.83 1.97 0 1.16-.76 2.28-.87 2.43-.11.15-.24.34-.1.54.14.2.64 1.03 1.37 1.67.94.84 1.73 1.1 1.98 1.22.24.12.39.1.53-.06.14-.16.6-.69.76-.92.16-.23.32-.19.54-.11.22.08 1.4.65 1.64.77.24.12.4.18.46.28.06.1.06.58-.17 1.14-.22.56-1.28 1.08-1.75 1.15-.47.07-1.04.1-1.67-.1-.39-.12-.88-.28-1.53-.56-2.69-1.16-4.45-3.99-4.59-4.18-.14-.19-1.1-1.44-1.1-2.75 0-1.3.69-1.95.93-2.22Z"
      fill="#fff"
    />
    <path
      d="M12.18 10.92c.18-.41.37-.42.54-.43.14-.01.31-.01.47-.01.16 0 .43.06.65.29.22.24.83.81.83 1.97 0 1.16-.76 2.28-.87 2.43-.11.15-.24.34-.1.54.14.2.64 1.03 1.37 1.67.94.84 1.73 1.1 1.98 1.22.24.12.39.1.53-.06.14-.16.6-.69.76-.92.16-.23.32-.19.54-.11.22.08 1.4.65 1.64.77.24.12.4.18.46.28.06.1.06.58-.17 1.14-.22.56-1.28 1.08-1.75 1.15-.47.07-1.04.1-1.67-.1-.39-.12-.88-.28-1.53-.56-2.69-1.16-4.45-3.99-4.59-4.18-.14-.19-1.1-1.44-1.1-2.75 0-1.3.69-1.95.93-2.22Z"
      stroke="#fff"
      strokeWidth="0.35"
      strokeLinejoin="round"
    />
  </svg>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    style={{ width: "0.72rem", height: "0.72rem", flexShrink: 0, marginTop: "1px" }} aria-hidden="true">
    <path d="M20 10c0 6-8 13-8 13S4 16 4 10a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

function Hamburger({ open, onClick, color }: { open: boolean; onClick: () => void; color: string }) {
  return (
    <button
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={onClick}
      style={{ color }}
      className="group flex h-10 w-10 flex-col items-start justify-center gap-[5px] shrink-0"
    >
      <span className={`block h-[1.5px] origin-left bg-current transition-all duration-300 ${open ? "w-[20px]" : "w-[22px] group-hover:w-[26px]"}`} />
      <span className={`block h-[1.5px] origin-left bg-current transition-all duration-300 ${open ? "w-[16px] opacity-60" : "w-[15px] group-hover:w-[19px]"}`} />
      <span className={`block h-[1.5px] origin-left bg-current transition-all duration-300 ${open ? "w-[11px] opacity-30" : "w-[9px] group-hover:w-[13px]"}`} />
    </button>
  );
}

export default function Header() {
  const { property } = usePropertyData();
  const router = useRouter();
  const scrolled = useScrollPosition();
  const pathname = usePathname();
  const headerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navListRef = useRef<HTMLUListElement | null>(null);

  const isHeroPage = HERO_PREFIXES.some((p) =>
    p === "/" ? pathname === "/" : pathname.startsWith(p),
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [menuPreview, setMenuPreview] = useState<string>(resolvePreviewPath(pathname));
  const clientReady = useClientReady();

  const liveProperty = clientReady ? property : null;

  const logoSrc = DEFAULT_LOGO;
  const propertyName = liveProperty?.name ?? "UK's Resort";
  const email = liveProperty?.email ?? DEFAULT_EMAIL;
  const primaryPhone = formatPhone(liveProperty?.mobile) || DEFAULT_PHONE_1;
  let whatsappPhone = formatPhone(liveProperty?.whatsApp) || DEFAULT_PHONE_2;
  
  if (primaryPhone === whatsappPhone) {
    whatsappPhone = DEFAULT_PHONE_2;
  }
  const primaryPhoneHref = toTelHref(primaryPhone);
  const whatsappShareHref = getWhatsappShareUrl(liveProperty, !(liveProperty?.whatsApp || "").trim());
  const addressLong = [
    liveProperty?.address?.streetName,
    liveProperty?.address?.suburb,
    liveProperty?.address?.city,
    liveProperty?.address?.state,
  ].filter(Boolean).join(", ") || "Mahad Phata, Old Mumbai-Pune Hwy, Khopoli, Raigad";

  useEffect(() => {
    document.body.style.overflow = menuOpen || menuClosing ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, menuClosing]);

  useEffect(() => { setMenuPreview(resolvePreviewPath(pathname)); }, [pathname]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".header-anim",
        { y: -10, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out", stagger: 0.06, overwrite: "auto" },
      );
      gsap.fromTo(".header-nav-item",
        { y: 8, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.4, ease: "power3.out", stagger: 0.03, delay: 0.1, overwrite: "auto" },
      );
    }, headerRef);
    return () => ctx.revert();
  }, [pathname, isHeroPage]);

  useEffect(() => {
    if (!menuOpen || !menuRef.current) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(menuRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.3, ease: "power2.out" },
      );
      gsap.fromTo(".menu-nav-item",
        { x: -24, autoAlpha: 0, filter: "blur(4px)" },
        { x: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.5, stagger: 0.05, ease: "power3.out", delay: 0.1 },
      );
      gsap.fromTo(".menu-col",
        { y: 14, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.07, ease: "power3.out", delay: 0.18 },
      );
      gsap.fromTo(".menu-divider",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.8, ease: "expo.out", delay: 0.12 },
      );
    }, menuRef);
    return () => ctx.revert();
  }, [menuOpen]);

  const closeMenu = useCallback(() => {
    if (!menuRef.current) { setMenuOpen(false); return; }
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) { setMenuOpen(false); return; }
    setMenuClosing(true);
    gsap.to(menuRef.current, {
      autoAlpha: 0, y: -8, duration: 0.28, ease: "power2.in",
      onComplete: () => { setMenuOpen(false); setMenuClosing(false); },
    });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape" && menuOpen) closeMenu(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [menuOpen, closeMenu]);

  const canPortal = clientReady && typeof document !== "undefined";

  /* ── colour tokens ── */
  const isGlass   = isHeroPage;
  const bg        = isGlass ? "rgba(246,242,236,0.13)" : "rgba(246,242,236,0.97)";
  const textMain  = isGlass ? "#ffffff"                : "#2a1e0f";
  const textMuted = isGlass ? "rgba(255,255,255,0.50)" : "rgba(110,82,45,0.65)";
  const border    = isGlass ? "rgba(255,255,255,0.15)" : "rgba(190,165,120,0.30)";
  const navBg     = isGlass ? "rgba(246,242,236,0.09)" : "rgba(236,228,213,0.80)";
  const navLink   = isGlass ? "rgba(255,255,255,0.72)" : "rgba(70,50,25,0.78)";
  const navLinkHov= isGlass ? "#ffffff"                : "#2a1e0f";
  const navDot    = isGlass ? "rgba(255,255,255,0.28)" : "rgba(190,150,80,0.55)";
  const iconColor = isGlass ? "rgba(255,255,255,0.85)" : "rgba(70,50,25,0.80)";
  const iconBorder= isGlass ? "rgba(255,255,255,0.22)" : "rgba(190,165,120,0.35)";

  return (
    <div
      ref={headerRef}
      className={`hdr-root w-full ${isHeroPage ? "absolute left-0 top-0 z-50" : "sticky top-0 z-50"}`}
    >
      <header
        data-no-global-gsap
        className={`w-full transition-all duration-500${scrolled && !isHeroPage ? " hdr-shadow" : ""}`}
        style={{
          background: bg,
          color: textMain,
          backdropFilter: "blur(18px) saturate(1.5)",
          WebkitBackdropFilter: "blur(18px) saturate(1.5)",
          borderBottom: `1px solid ${border}`,
        }}
      >

        {/* ══ SINGLE MAIN ROW — hamburger | logo centre | icons + book ══ */}
        <div
          className="header-anim hdr-bar flex items-center justify-between"
          style={{ minHeight: "var(--header-row-min-height)" }}
        >

          {/* LEFT — hamburger + menu label */}
          <div className="flex items-center gap-2 shrink-0 min-w-[7rem] sm:min-w-[10rem]">
            <Hamburger
              open={menuOpen}
              color={iconColor}
              onClick={() => {
                if (menuOpen) { closeMenu(); return; }
                setMenuPreview(resolvePreviewPath(pathname));
                setMenuOpen(true);
              }}
            />
            {/* <div className="hidden sm:flex items-center gap-1.5">
              <span className="h-2.5 w-px" style={{ background: border }} aria-hidden="true" />
              <Link
                href="/awards"
                onMouseEnter={() => router.prefetch("/awards")}
                className="font-bold uppercase tracking-[0.22em] transition-colors duration-200 hover:text-[#c8922a]"
                style={{ fontSize: "0.68rem", color: textMuted, textDecoration: "none" }}
              >
                Media & Awards
              </Link>
            </div> */}
          </div>

          {/* CENTRE — ornament + logo + wordmark */}
          <Link
            href="/"
            aria-label={`${propertyName} — home`}
            className="group absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          >
            {/* Logo */}
            <span className="relative block"
              style={{ height: "clamp(1.7rem, 3.6vw, 2.4rem)", width: "clamp(5.4rem, 10.5vw, 8.1rem)" }}>
              <Image
                src={logoSrc}
                alt={propertyName}
                fill
                sizes="(max-width: 639px) 104px, (max-width: 1023px) 128px, 136px"
                className="object-contain transition-opacity duration-300 group-hover:opacity-80"
                unoptimized={logoSrc.startsWith("http")}
                priority
              />
            </span>
            {/* Wordmark */}
            <span className="flex flex-col items-center leading-none">
              <span className="font-serif font-normal"
                style={{ fontSize: "clamp(0.9rem, 1.55vw, 1.2rem)", letterSpacing: "0.06em", color: textMain }}>
                UK&apos;s Resort
              </span>
              <span className="font-semibold uppercase"
                style={{ fontSize: "clamp(0.44rem, 0.78vw, 0.54rem)", letterSpacing: "0.3em", color: textMuted, marginTop: "2px" }}>
                Khopoli · Maharashtra
              </span>
            </span>
          </Link>

          {/* RIGHT — phone icon, whatsapp icon, book button */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 justify-end min-w-[7rem] sm:min-w-[10rem]">
            <div className="hidden items-center gap-1.5 md:flex md:gap-2">
              {/* Phone icon button */}
              <a
                href={primaryPhoneHref}
                aria-label={`Call ${primaryPhone}`}
                className="hdr-icon-btn"
                style={{ border: `1px solid ${iconBorder}`, color: iconColor }}
              >
                <PhoneIcon />
              </a>
              {/* WhatsApp icon button */}
              <a
                href={whatsappShareHref}
                aria-label={`WhatsApp ${whatsappPhone}`}
                target="_blank"
                rel="noreferrer"
                className="hdr-whatsapp-btn"
              >
                <WhatsappIcon />
                <span>Book via WhatsApp</span>
              </a>
            </div>

            {/* Book CTA */}
            <Link
              href="https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true"
              className="hdr-book-btn"
            >
              <span className="hidden sm:inline">Book Your Stay</span>
              <span className="sm:hidden">Book</span>
              <span className="hdr-book-arrow-wrap" aria-hidden="true">
                <span className="hdr-book-arrow">&rsaquo;</span>
              </span>
            </Link>
          </div>
        </div>

        {/* ══ NAV BAR ══ */}
        <div
          className="header-anim"
          style={{ borderTop: `1px solid ${border}`, background: navBg }}
        >
          {/* Desktop */}
          <nav aria-label="Main navigation"
            className="hdr-nav-shell hidden h-[2.4rem] w-full items-center justify-center lg:flex">
            <ul ref={navListRef} className="flex items-center">
              {navigation.map((item, index) => {
                const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <li key={item.href} className="flex items-center">
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      onMouseEnter={() => router.prefetch(item.href)}
                      className="header-nav-item hdr-nav-link"
                      style={{ color: isActive ? "#c8922a" : navLink }}
                      onMouseOver={e => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = navLinkHov; }}
                      onMouseOut={e => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = navLink; }}
                    >
                      {item.label}
                    </Link>
                    {index < navigation.length - 1 && (
                      <span aria-hidden="true" className="block shrink-0"
                        style={{ width: "4px", height: "4px", background: navDot, transform: "rotate(45deg)" }} />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile scroll strip */}
          <nav aria-label="Main navigation"
            className="hdr-nav-shell hidden h-[2.25rem] w-full items-center overflow-x-auto md:flex lg:hidden">
            <ul className="flex items-center px-3 shrink-0">
              {navigation.map((item, index) => {
                const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <li key={item.href} className="flex items-center shrink-0">
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className="whitespace-nowrap px-2 font-bold uppercase transition-colors"
                       style={{ fontSize: "0.68rem", letterSpacing: "0.18em", color: isActive ? "#c8922a" : navLink, textDecoration: "none" }}
                    >
                      {item.label}
                    </Link>
                    {index < navigation.length - 1 && (
                      <span aria-hidden="true" className="block shrink-0"
                        style={{ width: "3px", height: "3px", background: navDot, transform: "rotate(45deg)" }} />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>

      {/* ══ FULL-SCREEN MENU OVERLAY ══ */}
      {canPortal && menuOpen && createPortal(
        <div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="menu-overlay fixed inset-0 z-[999] overflow-y-auto"
        >
          <div className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url("${encodeURI(menuPreviews[menuPreview] ?? menuPreviews["/"])}")` }}
            aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 z-0 bg-[#111015]/55" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-[#1e1a18]/70 via-[#1a1818]/30 to-transparent" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-48 bg-gradient-to-b from-black/35 to-transparent" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "128px" }}
            aria-hidden="true" />

          {/* Menu top bar */}
          <div className="relative z-10 border-b border-white/10">
            <div className="hdr-bar hdr-bar--menu">
              <div className="relative flex items-center justify-between" style={{ minHeight: "4rem" }}>
                {/* Close button */}
                <button
                  aria-label="Close navigation menu"
                  onClick={closeMenu}
                  className="group flex h-9 w-9 items-center justify-center text-white/70 transition-colors hover:text-white shrink-0"
                >
                  <svg className="h-5 w-5 transition-transform duration-200 group-hover:rotate-90" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M6 6 18 18M18 6 6 18" />
                  </svg>
                </button>

                {/* Centred logo in menu */}
                <Link href="/" onClick={closeMenu}
                  className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5"
                  aria-label={`${propertyName} — home`}>
                  <span className="relative block" style={{ height: "2rem", width: "6.5rem" }}>
                    <Image src={logoSrc} alt={propertyName} fill
                      sizes="104px" className="object-contain"
                      unoptimized={logoSrc.startsWith("http")} priority />
                  </span>
                  <span className="font-bold uppercase text-white/40"
                    style={{ fontSize: "0.42rem", letterSpacing: "0.28em" }}>
                    Khopoli · Maharashtra
                  </span>
                </Link>

                {/* Right side in menu */}
                <div className="flex items-center gap-2.5 lg:gap-4 shrink-0">
                  <a href={primaryPhoneHref}
                    className="hidden items-center gap-1.5 text-white/72 transition-colors hover:text-white lg:flex"
                    style={{ fontSize: "0.7rem" }}>
                    <PhoneIcon />{primaryPhone}
                  </a>
                  <span className="hidden h-3 w-px bg-white/18 lg:block" aria-hidden="true" />
                  <a href={whatsappShareHref}
                    className="hidden text-white/72 transition-colors hover:text-white lg:block"
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: "0.7rem" }}>
                    {whatsappPhone}
                  </a>
                  <span className="hidden h-3 w-px bg-white/18 lg:block" aria-hidden="true" />
                  <Link href="https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true" onClick={closeMenu}
                    className="hdr-book-btn hdr-book-btn--outline">
                    <span className="hidden sm:inline">Book your stay</span>
                    <span className="sm:hidden">Book</span>
                    <span className="hdr-book-arrow" aria-hidden="true">&rsaquo;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Menu body */}
          <div className="relative z-10">
            <Container>
              <div className="menu-body-grid py-10 sm:py-12 lg:py-14">
                <div className="menu-col">
                  <div className="menu-divider mb-5 h-px w-full bg-white/10" />
                  <ul className="menu-nav-list space-y-[0.1rem]">
                    {navigation.map((item) => {
                      const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                      return (
                        <li key={item.href} className="menu-nav-item">
                          <Link href={item.href} aria-current={isActive ? "page" : undefined}
                            className="menu-nav-link group flex items-center gap-3 font-serif transition-all duration-200"
                            style={{ color: isActive ? "#d89a55" : "rgba(255,255,255,0.88)", textDecoration: "none" }}
                            onMouseEnter={() => { setMenuPreview(resolvePreviewPath(item.href)); router.prefetch(item.href); }}
                            onFocus={() => setMenuPreview(resolvePreviewPath(item.href))}
                            onClick={closeMenu}>
                            <span className="block shrink-0 transition-all duration-200"
                              style={{ width: "3px", height: "3px", background: isActive ? "#d89a55" : "transparent", transform: "rotate(45deg)" }}
                              aria-hidden="true" />
                            <span className="group-hover:text-[#d89a55] transition-colors">{item.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="menu-col">
                  <div className="menu-divider mb-5 h-px w-full bg-white/10" />
                  <p className="menu-col-heading font-serif text-white/40">Contact</p>
                  <div className="mt-4 space-y-2.5">
                    <a href={`mailto:${email}`}
                      className="flex items-start gap-2.5 text-white/68 transition-colors hover:text-white"
                      style={{ fontSize: "0.78rem" }}>
                      <MailIcon /><span>{email}</span>
                    </a>
                    <a href={primaryPhoneHref}
                      className="flex items-center gap-2.5 text-white/68 transition-colors hover:text-white"
                      style={{ fontSize: "0.78rem" }}>
                      <PhoneIcon /><span>{primaryPhone}</span>
                    </a>
                    <a href={whatsappShareHref}
                      className="flex items-center gap-2.5 text-white/68 transition-colors hover:text-white"
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: "0.78rem" }}>
                      <WhatsappIcon /><span>{whatsappPhone}</span>
                    </a>
                  </div>
                </div>

                <div className="menu-col">
                  <div className="menu-divider mb-5 h-px w-full bg-white/10" />
                  <p className="menu-col-heading font-serif text-white/40">Reservations</p>
                  <div className="mt-4 space-y-2.5">
                    <a href={primaryPhoneHref}
                      className="block text-white/68 transition-colors hover:text-white"
                      style={{ fontSize: "0.78rem" }}>{primaryPhone}</a>
                    <a href={whatsappShareHref}
                      className="block text-white/68 transition-colors hover:text-white"
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: "0.78rem" }}>{whatsappPhone}</a>
                    <a href={`mailto:${email}`}
                      className="block text-white/68 transition-colors hover:text-white"
                      style={{ fontSize: "0.78rem" }}>{email}</a>
                  </div>
                  <p className="mt-5 flex items-start gap-2 text-white/36 leading-relaxed"
                    style={{ fontSize: "0.72rem" }}>
                    <MapPinIcon /><span>{addressLong}</span>
                  </p>
                </div>
              </div>
            </Container>
          </div>
        </div>,
        document.body,
      )}

      <style>{`
        .hdr-shadow { box-shadow: 0 4px 24px rgba(80,55,20,0.09); }

        /* Horizontal padding */
        .hdr-bar {
          width: 100%;
          position: relative;
          padding-left: max(var(--container-pad), env(safe-area-inset-left));
          padding-right: max(var(--container-pad), env(safe-area-inset-right));
        }

        .hdr-bar--menu {
          padding-left: max(var(--container-pad), env(safe-area-inset-left));
          padding-right: max(var(--container-pad), env(safe-area-inset-right));
        }

        /* Ornament */
        .hdr-ornament {
          display: block; width: 30px; height: 1px;
          position: relative; margin-bottom: 3px;
        }
        .hdr-ornament::before, .hdr-ornament::after {
          content: ""; position: absolute; top: 50%;
          width: 4px; height: 4px; border-radius: 50%;
          background: inherit; transform: translateY(-50%); opacity: 0.6;
        }
        .hdr-ornament::before { left: -6px; }
        .hdr-ornament::after  { right: -6px; }

        /* Book button */
        .hdr-book-btn {
          display: inline-flex; align-items: center; gap: 0.35rem;
          padding: 0.45rem 0.7rem;
          min-height: 44px;
          border-radius: 9999px;
          border: 1.5px solid #c8922a;
          background: #c8922a;
          color: #fff !important;
          font-size: 0.66rem; font-weight: 800;
          letter-spacing: 0.18em; text-transform: uppercase;
          text-decoration: none; white-space: nowrap; line-height: 1;
          transition: background 0.18s, border-color 0.18s;
        }
        .hdr-book-btn:hover { background: #daa93e; border-color: #daa93e; }
        @media (min-width: 640px) {
          .hdr-book-btn { padding: 0.5rem 0.75rem 0.5rem 1.1rem; font-size: 0.7rem; }
        }
        .hdr-book-btn--outline {
          background: transparent !important;
          border-color: rgba(255,255,255,0.38) !important;
          color: #fff !important;
        }
        .hdr-book-btn--outline:hover {
          background: rgba(255,255,255,0.10) !important;
          border-color: rgba(255,255,255,0.70) !important;
        }
        .hdr-book-arrow-wrap {
          display: inline-flex; align-items: center; justify-content: center;
          width: 1.25rem; height: 1.25rem; border-radius: 9999px;
          background: rgba(255,255,255,0.22);
        }
        .hdr-book-arrow { font-size: 1rem; line-height: 1; }

        /* Icon-only round buttons */
        .hdr-icon-btn {
          display: inline-flex; align-items: center; justify-content: center;
          width: 44px; height: 44px; border-radius: 9999px;
          text-decoration: none; transition: background 0.18s, border-color 0.18s;
          flex-shrink: 0;
        }
        .hdr-icon-btn:hover { background: rgba(246,242,236,0.20); }

        .hdr-whatsapp-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 0.45rem;
          min-height: 44px;
          padding: 0.45rem 0.9rem 0.45rem 0.72rem;
          border-radius: 9999px;
          background: #25d366;
          color: #ffffff;
          text-decoration: none;
          white-space: nowrap;
          font-size: 0.64rem; font-weight: 800;
          letter-spacing: 0.18em; text-transform: uppercase; line-height: 1;
          transition: background 0.3s ease, transform 0.3s ease;
          flex-shrink: 0;
        }
        .hdr-whatsapp-btn:hover {
          background: #1fbe59;
          transform: translateY(-1px);
        }
        .hdr-whatsapp-btn svg {
          width: 0.96rem !important;
          height: 0.96rem !important;
          color: #ffffff;
        }
        @media (min-width: 1280px) {
          .hdr-whatsapp-btn {
            padding: 0.48rem 1rem 0.48rem 0.76rem;
            font-size: 0.67rem;
          }
        }

        /* Contact reveal chips */
        .hdr-contact-chip {
          display: inline-flex; align-items: center; gap: 0.5rem;
          max-width: 2.2rem; padding: 0.35rem 0.55rem;
          border-radius: 9999px; border: 1px solid transparent;
          overflow: hidden; text-decoration: none;
          transition: max-width 220ms ease, background 220ms ease, border-color 220ms ease, color 220ms ease;
        }
        .hdr-contact-chip:hover { max-width: 14rem; }
        .hdr-contact-chip--hero {
          border-color: rgba(255,255,255,0.28);
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.95);
        }
        .hdr-contact-chip--hero:hover {
          border-color: rgba(255,255,255,0.45);
          background: rgba(255,255,255,0.16);
        }
        .hdr-contact-text {
          white-space: nowrap; overflow: hidden;
          max-width: 0; opacity: 0;
          font-size: 0.62rem; font-weight: 700; letter-spacing: 0.08em;
          transition: max-width 220ms ease, opacity 180ms ease;
        }
        .hdr-contact-chip:hover .hdr-contact-text { max-width: 12rem; opacity: 1; }

        /* Nav bar */
        .hdr-nav-shell { scrollbar-width: none; }
        .hdr-nav-shell::-webkit-scrollbar { display: none; }

        .hdr-nav-link {
          padding: 0 0.75rem;
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          text-decoration: none; line-height: 1; transition: color 0.18s;
        }
        @media (min-width: 1280px) { .hdr-nav-link { padding: 0 0.85rem; font-size: 0.74rem; } }
        @media (min-width: 1536px) { .hdr-nav-link { padding: 0 0.95rem; font-size: 0.78rem; } }

        /* Menu overlay */
        .menu-overlay { color: #fff; background: linear-gradient(160deg, #10232b 0%, #19161a 100%); }
        .menu-body-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
        @media (min-width: 640px)  { .menu-body-grid { grid-template-columns: 1fr 1fr; gap: 2.5rem; } }
        @media (min-width: 1024px) { .menu-body-grid { grid-template-columns: 2fr 1fr 1fr; gap: 3rem; } }
        @media (min-width: 1280px) { .menu-body-grid { gap: 4rem; } }
        .menu-nav-link { font-size: clamp(1.2rem, 2.8vw, 1.7rem); line-height: 1.25; padding: 0.16rem 0; }
        .menu-col-heading { font-size: 0.58rem; letter-spacing: 0.3em; text-transform: uppercase; }
      `}</style>
    </div>
  );
}
