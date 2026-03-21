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

const DEFAULT_EMAIL = "info@uksresort.com";
const DEFAULT_PHONE_1 = "+91 98220 12343";
const DEFAULT_PHONE_2 = "+91 87798 14559";
const DEFAULT_LOGO = "/images/logo1.png";

const HERO_PREFIXES = [
  "/", "/rooms", "/dining", "/about", "/wellness",
  "/facilities", "/experiences", "/weddings",
  "/blog", "/around-us", "/contact", "/tariffs",
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

function compactAddress(parts: Array<string | null | undefined>) {
  return parts.filter(Boolean).join(", ");
}

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

const MapPinIcon = () => (
  <svg className="h-[0.78rem] w-[0.78rem] shrink-0 text-[#d89a55]" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 10c0 6-8 13-8 13S4 16 4 10a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

function Hamburger({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={onClick}
      className="group relative flex h-10 w-10 flex-col items-start justify-center gap-[5px] sm:gap-[6px]"
    >
      <span className={`block h-[2px] origin-left bg-current transition-all duration-300 ${open ? "w-[22px] sm:w-[26px] rotate-[1deg]" : "w-[24px] sm:w-[28px] group-hover:w-[28px] sm:group-hover:w-[32px]"}`} />
      <span className={`block h-[2px] origin-left bg-current transition-all duration-300 ${open ? "w-[18px] sm:w-[22px] opacity-60" : "w-[18px] sm:w-[22px] group-hover:w-[22px] sm:group-hover:w-[26px]"}`} />
      <span className={`block h-[2px] origin-left bg-current transition-all duration-300 ${open ? "w-[14px] sm:w-[18px] opacity-30" : "w-[12px] sm:w-[16px] group-hover:w-[16px] sm:group-hover:w-[20px]"}`} />
    </button>
  );
}

const GLASS_BG = "bg-[linear-gradient(90deg,rgba(72,79,45,0.56)_0%,rgba(104,113,124,0.42)_20%,rgba(104,113,124,0.42)_80%,rgba(72,79,45,0.56)_100%)] backdrop-blur-[18px]";
const GLASS_BG_SCROLLED = "bg-[linear-gradient(90deg,rgba(72,79,45,0.68)_0%,rgba(104,113,124,0.54)_20%,rgba(104,113,124,0.54)_80%,rgba(72,79,45,0.68)_100%)] backdrop-blur-[22px]";

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

  const logoSrc = liveProperty?.logoUrl ?? DEFAULT_LOGO;
  const propertyName = liveProperty?.name ?? "UK's Resort";
  const email = liveProperty?.email ?? DEFAULT_EMAIL;
  const primaryPhone = formatPhone(liveProperty?.mobile) || DEFAULT_PHONE_1;
  const whatsappPhone = formatPhone(liveProperty?.whatsApp) || DEFAULT_PHONE_2;
  const primaryPhoneHref = toTelHref(primaryPhone);
  const whatsappPhoneHref = toTelHref(whatsappPhone);

  const addressLong = compactAddress([
    liveProperty?.address?.streetName,
    liveProperty?.address?.suburb,
    liveProperty?.address?.city,
    liveProperty?.address?.state,
  ]) || "Mahad Phata, Old Mumbai-Pune Hwy, Khopoli, Raigad";

  const addressShort = compactAddress([
    liveProperty?.address?.city,
    liveProperty?.address?.state,
  ]) || "Khopoli, Raigad";

  useEffect(() => {
    document.body.style.overflow = menuOpen || menuClosing ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, menuClosing]);

  useEffect(() => { setMenuPreview(resolvePreviewPath(pathname)); }, [pathname]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".header-anim",
        { y: -12, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out", stagger: 0.07, overwrite: "auto" },
      );
      gsap.fromTo(
        ".header-nav-item",
        { y: 10, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.45, ease: "power3.out", stagger: 0.035, delay: 0.1, overwrite: "auto" },
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
        { autoAlpha: 1, duration: 0.35, ease: "power2.out" },
      );
      gsap.fromTo(".menu-nav-item",
        { x: -28, autoAlpha: 0, filter: "blur(4px)" },
        { x: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.55, stagger: 0.055, ease: "power3.out", delay: 0.12 },
      );
      gsap.fromTo(".menu-sub-item",
        { x: -18, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.4, stagger: 0.04, ease: "power3.out", delay: 0.38 },
      );
      gsap.fromTo(".menu-col",
        { y: 16, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.08, ease: "power3.out", delay: 0.2 },
      );
      gsap.fromTo(".menu-divider",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.9, ease: "expo.out", delay: 0.15 },
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
      autoAlpha: 0,
      y: -8,
      duration: 0.32,
      ease: "power2.in",
      onComplete: () => { setMenuOpen(false); setMenuClosing(false); },
    });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape" && menuOpen) closeMenu(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [menuOpen, closeMenu]);

  const canPortal = clientReady && typeof document !== "undefined";

  return (
    <div
      ref={headerRef}
      className={`hdr-root w-full ${isHeroPage ? "absolute left-0 top-0 z-50" : "sticky top-0 z-50"}`}
    >
      <div
        className={`header-anim relative hidden w-full overflow-hidden transition-all duration-500 ease-in-out sm:block ${
          isHeroPage && scrolled ? "pointer-events-none h-0 opacity-0" : "h-[2.1rem] opacity-100"
        }`}
      >
        <div className={`absolute inset-0 border-b border-white/[0.14] ${GLASS_BG}`}>
          <div className="hdr-bar flex h-[2.1rem] w-full items-center justify-between">
            <div className="flex items-center gap-1.5 text-[0.6rem] text-white/70 sm:text-[0.62rem] lg:text-[0.67rem]">
              <MapPinIcon />
              <span className="hidden lg:inline">{addressLong}</span>
              <span className="hidden sm:inline lg:hidden">{addressShort}</span>
            </div>

            <div className="flex items-center gap-2.5 text-[0.6rem] text-white/70 sm:gap-3 sm:text-[0.62rem] lg:text-[0.67rem]">
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
                <span className="hidden md:inline">{email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <header
        data-no-global-gsap
        className={`w-full transition-all duration-500 ${
          isHeroPage
            ? `border-b border-white/[0.14] text-white ${scrolled ? GLASS_BG_SCROLLED : GLASS_BG}`
            : `border-b border-black/10 bg-white text-[#1f3c44] ${scrolled ? "shadow-sm" : ""}`
        }`}
      >
        <div className="header-anim hdr-bar hdr-bar--main">
          <div className="relative flex h-[4rem] w-full items-center sm:h-[5rem]">
            <Hamburger
              open={menuOpen}
              onClick={() => {
                if (menuOpen) { closeMenu(); return; }
                setMenuPreview(resolvePreviewPath(pathname));
                setMenuOpen(true);
              }}
            />

            <Link
              href="/"
              aria-label={`${propertyName} — home`}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <span className="relative block h-8 w-[7.25rem] sm:h-10 sm:w-[9rem] lg:h-12 lg:w-[10.5rem]">
                <Image
                  src={logoSrc}
                  alt={propertyName}
                  fill
                  sizes="(max-width: 639px) 116px, (max-width: 1023px) 144px, 168px"
                  className={`object-contain ${isHeroPage ? "" : "invert"}`}
                  unoptimized={logoSrc.startsWith("http")}
                  priority
                />
              </span>
            </Link>

            <div className="ml-auto flex items-center gap-2 sm:gap-3 lg:gap-4">
              <a
                href={primaryPhoneHref}
                aria-label="Call us"
                className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors sm:hidden ${
                  isHeroPage
                    ? "border-white/45 text-white hover:border-white hover:bg-white/10"
                    : "border-[#1f3c44]/35 text-[#1f3c44] hover:bg-[#1f3c44]/5"
                }`}
              >
                <PhoneIcon />
              </a>

              <Link
                href="https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true"
                className={`hdr-book-btn flex items-center gap-1.5 rounded-full border transition-all duration-200 ${
                  isHeroPage
                    ? "border-white/50 text-white hover:border-white hover:bg-white/10"
                    : "border-[#1f3c44]/45 text-[#1f3c44] hover:border-[#1f3c44] hover:bg-[#1f3c44]/5"
                }`}
              >
                <span className="hidden sm:inline">Book your stay</span>
                <span className="sm:hidden">Book</span>
                <span className="hdr-book-arrow" aria-hidden="true">&rsaquo;</span>
              </Link>
            </div>
          </div>
        </div>

        <div
          className={`header-anim hidden border-t lg:block ${
            isHeroPage
              ? `border-white/[0.14] ${GLASS_BG}`
              : "border-black/[0.07] bg-white"
          }`}
        >
          <nav aria-label="Main navigation" className="flex h-[3.2rem] w-full items-center justify-center">
            <ul ref={navListRef} className="flex items-center">
              {navigation.map((item, index) => {
                const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <li key={item.href} className="flex items-center">
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      onMouseEnter={() => router.prefetch(item.href)}
                      className={`header-nav-item hdr-nav-link font-serif transition-colors duration-200 ${
                        isHeroPage
                          ? "text-white/82 hover:text-white"
                          : "text-[#1f3c44]/65 hover:text-[#1f3c44]"
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
      </header>

      {canPortal && menuOpen && createPortal(
        <div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="menu-overlay fixed inset-0 z-[999] overflow-y-auto"
        >
          <div
            className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center transition-all duration-700 ease-out"
            style={{ backgroundImage: `url("${encodeURI(menuPreviews[menuPreview] ?? menuPreviews["/"])}")` }}
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 z-0 bg-[#111015]/55" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-[#1e1a18]/70 via-[#1a1818]/30 to-transparent" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-48 bg-gradient-to-b from-black/35 to-transparent" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "128px" }}
            aria-hidden="true"
          />

          <div className="relative z-10 border-b border-white/[0.1]">
            <div className="hdr-bar hdr-bar--menu">
              <div className="relative flex h-[4.25rem] w-full items-center sm:h-[5rem]">
                <button
                  aria-label="Close navigation menu"
                  onClick={closeMenu}
                  className="group flex h-10 w-10 items-center justify-center text-white/70 transition-colors hover:text-white"
                >
                  <svg className="h-5 w-5 transition-transform duration-200 group-hover:rotate-90" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M6 6 18 18M18 6 6 18" />
                  </svg>
                </button>

                <Link href="/" onClick={closeMenu}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  aria-label={`${propertyName} — home`}
                >
                  <span className="relative block h-8 w-[7.25rem] sm:h-10 sm:w-[9rem]">
                    <Image
                      src={logoSrc}
                      alt={propertyName}
                      fill
                      sizes="(max-width: 639px) 116px, 144px"
                      className="object-contain"
                      unoptimized={logoSrc.startsWith("http")}
                      priority
                    />
                  </span>
                </Link>

                <div className="ml-auto flex items-center gap-3 lg:gap-5">
                  <a href={primaryPhoneHref}
                    className="hidden items-center gap-1.5 text-[0.75rem] text-white/80 transition-colors hover:text-white lg:flex">
                    <PhoneIcon />{primaryPhone}
                  </a>
                  <span className="hidden h-3 w-px bg-white/20 lg:block" aria-hidden="true" />
                  <a href={whatsappPhoneHref}
                    className="hidden text-[0.75rem] text-white/80 transition-colors hover:text-white lg:block">
                    {whatsappPhone}
                  </a>
                  <span className="hidden h-3 w-px bg-white/20 lg:block" aria-hidden="true" />
                  <Link
                    href="https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true"
                    onClick={closeMenu}
                    className="hdr-book-btn flex items-center gap-1.5 rounded-full border border-white/45 text-white transition hover:border-white hover:bg-white/10"
                  >
                    <span className="hidden sm:inline">Book your stay</span>
                    <span className="sm:hidden">Book</span>
                    <span className="hdr-book-arrow" aria-hidden="true">&rsaquo;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <Container>
              <div className="menu-body-grid py-10 sm:py-14 lg:py-16">
                <div className="menu-col">
                  <div className="menu-divider mb-6 h-px w-full bg-white/10" />

                  <ul className="menu-nav-list space-y-[0.15rem]">
                    {navigation.map((item) => {
                      const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                      return (
                        <li key={item.href} className="menu-nav-item">
                          <Link
                            href={item.href}
                            aria-current={isActive ? "page" : undefined}
                            className="menu-nav-link group flex items-center gap-3 font-serif transition-all duration-200"
                            style={{ color: isActive ? "#d89a55" : "rgba(255,255,255,0.9)" }}
                            onMouseEnter={() => {
                              setMenuPreview(resolvePreviewPath(item.href));
                              router.prefetch(item.href);
                            }}
                            onFocus={() => setMenuPreview(resolvePreviewPath(item.href))}
                            onClick={closeMenu}
                          >
                            <span
                              className="block h-1 w-1 shrink-0 rounded-full transition-all duration-200"
                              style={{ background: isActive ? "#d89a55" : "transparent" }}
                              aria-hidden="true"
                            />
                            <span className="group-hover:text-[#d89a55]">{item.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  <ul className="mt-5 space-y-1 border-t border-white/10 pt-5">
                    {["News", "Promotions & Offers", "Testimonials", "Contact"].map((label) => (
                      <li key={label} className="menu-sub-item">
                        <span className="cursor-pointer text-[0.88rem] text-white/55 transition-colors hover:text-[#d89a55]">
                          {label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="menu-col">
                  <div className="menu-divider mb-6 h-px w-full bg-white/10" />
                  <p className="menu-col-heading font-serif text-white/40">Contact</p>
                  <div className="mt-4 space-y-2.5">
                    <a href={`mailto:${email}`}
                      className="flex items-start gap-2.5 text-[0.82rem] text-white/72 transition-colors hover:text-white">
                      <MailIcon /><span>{email}</span>
                    </a>
                    <a href={primaryPhoneHref}
                      className="flex items-center gap-2.5 text-[0.82rem] text-white/72 transition-colors hover:text-white">
                      <PhoneIcon /><span>{primaryPhone}</span>
                    </a>
                    <a href={whatsappPhoneHref}
                      className="flex items-center gap-2.5 text-[0.82rem] text-white/72 transition-colors hover:text-white">
                      <PhoneIcon /><span>{whatsappPhone}</span>
                    </a>
                  </div>
                </div>

                <div className="menu-col">
                  <div className="menu-divider mb-6 h-px w-full bg-white/10" />
                  <p className="menu-col-heading font-serif text-white/40">Reservations</p>
                  <div className="mt-4 space-y-2.5">
                    <a href={primaryPhoneHref}
                      className="block text-[0.82rem] text-white/72 transition-colors hover:text-white">
                      {primaryPhone}
                    </a>
                    <a href={whatsappPhoneHref}
                      className="block text-[0.82rem] text-white/72 transition-colors hover:text-white">
                      {whatsappPhone}
                    </a>
                    <a href={`mailto:${email}`}
                      className="block text-[0.82rem] text-white/72 transition-colors hover:text-white">
                      {email}
                    </a>
                  </div>
                  <p className="mt-6 flex items-start gap-2 text-[0.78rem] leading-relaxed text-white/40">
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
        .hdr-bar {
          width: 100%;
          padding-left: 1rem;
          padding-right: 1rem;
        }
        @media (min-width: 640px)  { .hdr-bar { padding-left: 2rem;  padding-right: 2rem; } }
        @media (min-width: 1024px) { .hdr-bar { padding-left: 3rem;  padding-right: 3rem; } }
        @media (min-width: 1280px) { .hdr-bar { padding-left: 4rem;  padding-right: 4rem; } }
        @media (min-width: 1536px) { .hdr-bar { padding-left: 5rem;  padding-right: 5rem; } }

        .hdr-bar--menu {
          padding-left: 1rem;
          padding-right: 1rem;
        }
        @media (min-width: 640px)  { .hdr-bar--menu { padding-left: 2rem;  padding-right: 2rem; } }
        @media (min-width: 1024px) { .hdr-bar--menu { padding-left: 3rem;  padding-right: 3rem; } }
        @media (min-width: 1280px) { .hdr-bar--menu { padding-left: 4rem;  padding-right: 4rem; } }

        .hdr-book-btn {
          padding: 0.42rem 0.85rem;
          font-size: 0.56rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-decoration: none;
        }
        @media (min-width: 640px) {
          .hdr-book-btn {
            padding: 0.55rem 1.4rem;
            font-size: 0.68rem;
            letter-spacing: 0.2em;
          }
        }
        @media (min-width: 1024px) {
          .hdr-book-btn {
            padding: 0.6rem 1.6rem;
            font-size: 0.72rem;
          }
        }
        .hdr-book-arrow {
          font-size: 0.85rem;
          line-height: 1;
        }

        .hdr-nav-link {
          padding: 0 0.72rem;
          font-size: 1rem;
        }
        @media (min-width: 1280px) {
          .hdr-nav-link { padding: 0 0.9rem;  font-size: 1.08rem; }
        }
        @media (min-width: 1536px) {
          .hdr-nav-link { padding: 0 1rem;    font-size: 1.15rem; }
        }

        .menu-body-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 640px) {
          .menu-body-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
        }
        @media (min-width: 1024px) {
          .menu-body-grid {
            grid-template-columns: 2fr 1fr 1fr;
            gap: 3rem;
          }
        }
        @media (min-width: 1280px) {
          .menu-body-grid { gap: 4rem; }
        }

        .menu-nav-link {
          font-size: clamp(1.3rem, 3.5vw, 1.85rem);
          line-height: 1.25;
          padding: 0.2rem 0;
          text-decoration: none;
        }

        .menu-col-heading {
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
        }

        .menu-overlay {
          color: #fff;
          background: #141319;
        }
      `}</style>
    </div>
  );
}
