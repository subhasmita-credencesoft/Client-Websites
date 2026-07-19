"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { buttonClassName } from "@/components/ui/button";
import {
  headerDropdownLinks,
  mainLinks,
  mainNavLinks,
  topLeftLinks,
} from "@/lib/data/content/mountain-content";
import { DIRECT_BOOKING_ENGINE_URL } from "@/lib/constants/booking";
import { homeSectionContent } from "@/lib/data/content/resort-content";

const leftMainLinks = mainLinks.slice(0, 3);
const rightMainLinks = mainLinks.slice(3);
const contactPhone = "+91 9833866655";
const contactPhoneHref = "tel:+919833866655";
const whatsappHref = "https://wa.me/919833866655";
const topLinkHrefs: Record<string, string> = {
  ABOUT: "/about",
  GALLERY: "/gallery",
  "MEDIA & AWARDS": "/media-awards",
};

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-none stroke-current stroke-[1.9]">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72l.34 2.71a2 2 0 0 1-.57 1.73L7.1 9.91a16 16 0 0 0 7 7l1.75-1.78a2 2 0 0 1 1.73-.57l2.71.34A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-none stroke-current stroke-[1.9]">
      <path d="M20.5 11.5a8.5 8.5 0 1 0-15.7 4.46L4 21l5.2-.77A8.5 8.5 0 0 0 20.5 11.5Z" />
      <path d="M8.9 7.9c.2-.5.4-.5.7-.5h.6c.2 0 .4 0 .6.4.2.5.8 1.8.9 1.9.1.2.1.4 0 .6l-.4.6c-.1.1-.2.3 0 .5.2.4.8 1.3 1.7 2 .3.3.6.5 1 .6.2.1.4.1.5-.1l.6-.7c.2-.2.4-.2.6-.1.3.1 1.8.8 2.1.9.3.1.5.2.5.4 0 .2 0 1-.3 1.4-.3.4-1.6.9-2.1.9-.6 0-1.3-.1-2.1-.5-.5-.2-1.2-.6-2-1.3-1.5-1.2-2.4-2.7-2.7-3.2-.3-.6-.3-1.1-.1-1.5.2-.5.5-.8.7-1.1Z" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="ml-0.5 inline-block h-2.5 w-2.5 fill-none stroke-current stroke-[2]">
      <path d="m5 7 5 5 5-5" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5">
      <span
        className={`absolute left-0 block h-[1.5px] w-5 bg-white transition-all duration-300 ${
          open ? "top-[7px] rotate-45" : "top-0"
        }`}
      />
      <span
        className={`absolute left-0 top-[7px] block h-[1.5px] w-5 bg-white transition-opacity duration-300 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 block h-[1.5px] w-5 bg-white transition-all duration-300 ${
          open ? "top-[7px] -rotate-45" : "top-[14px]"
        }`}
      />
    </span>
  );
}

export function SiteHeader() {
  const router = useRouter();
  const content = homeSectionContent.siteHeader;
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dropdownItems = useMemo(
    () => (activeDropdown ? headerDropdownLinks[activeDropdown] ?? [] : []),
    [activeDropdown],
  );

  const mobileMainLinks = [...leftMainLinks, ...rightMainLinks];
  const desktopMainLinks = [...leftMainLinks, ...rightMainLinks];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const internalRoutes = new Set<string>([
      "/",
      DIRECT_BOOKING_ENGINE_URL.startsWith("/") ? DIRECT_BOOKING_ENGINE_URL : "",
      ...Object.values(topLinkHrefs),
      ...Object.values(mainNavLinks),
      ...Object.values(headerDropdownLinks).flatMap((items) => items.map((item) => item.href)),
    ]);
    internalRoutes.delete("");
    const prefetchRoutes = () => {
      internalRoutes.forEach((route) => {
        if (!route.startsWith("/")) return;
        router.prefetch(route);
      });
    };
    const idleId = "requestIdleCallback" in window
      ? window.requestIdleCallback(prefetchRoutes, { timeout: 2200 })
      : 0;
    const timer = window.setTimeout(prefetchRoutes, 1200);
    return () => {
      window.clearTimeout(timer);
      if ("cancelIdleCallback" in window && idleId) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [router]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(8,7,6,0.97)] backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06),0_2px_12px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      }`}
    >
      {/* Mobile: single row — hamburger | logo | book */}
      <div className="flex items-center justify-between px-4 py-2.5 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="flex h-9 w-9 shrink-0 items-center justify-center text-white/80 transition-colors hover:text-white"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <MenuIcon open={mobileMenuOpen} />
        </button>

        <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center justify-center rounded border border-[rgba(var(--color-primary-rgb),0.35)] bg-[rgba(10,8,6,0.8)] px-2 py-1 text-center text-[0.44rem] font-semibold uppercase leading-[1.1] tracking-[0.04em] text-[var(--color-primary-hover)] backdrop-blur-sm sm:text-[0.48rem]">
            <span>{content.logoLines[0]}</span>
            <span>{content.logoLines[1]}</span>
          </div>
        </Link>

        <Link
          href={DIRECT_BOOKING_ENGINE_URL}
          className={buttonClassName({
            variant: "primary",
            size: "sm",
            className: "h-8 shrink-0 rounded-full px-3 text-[0.52rem] tracking-[0.06em]",
          })}
          onClick={() => setMobileMenuOpen(false)}
        >
          Book Now
        </Link>
      </div>

      {/* Desktop: single compact row */}
      <div className="hidden lg:block">
        <div className="mx-auto flex max-w-[96rem] items-center justify-between px-6 xl:px-10">
          {/* Left: top links */}
          <div className="flex items-center gap-4 text-[0.66rem] font-medium tracking-[0.1em] text-white/50">
            {topLeftLinks.map((item) => (
              <Link key={item} href={topLinkHrefs[item] ?? "/"} className="transition-colors hover:text-[var(--color-primary)]">
                {item}
              </Link>
            ))}
          </div>

          {/* Center: logo */}
          <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col items-center justify-center rounded-[var(--radius-sm)] border border-[rgba(var(--color-primary-rgb),0.45)] bg-[rgba(10,8,6,0.85)] px-3 py-1.5 text-center text-[0.5rem] font-semibold uppercase leading-[1.2] tracking-[0.04em] text-[var(--color-primary-hover)] backdrop-blur-sm transition-all duration-300 hover:border-[rgba(var(--color-primary-rgb),0.7)] hover:shadow-[0_0_20px_rgba(200,154,85,0.12)]">
              <span>{content.logoLines[0]}</span>
              <span>{content.logoLines[1]}</span>
            </div>
          </Link>

          {/* Right: phone + whatsapp + book */}
          <div className="flex items-center gap-3 text-[0.66rem] font-medium tracking-[0.1em] text-white/50">
            <a href={contactPhoneHref} className="flex items-center gap-1 transition-colors hover:text-[var(--color-primary)]" aria-label={`Call ${contactPhone}`}>
              <PhoneIcon />
              <span className="hidden xl:inline">{contactPhone}</span>
            </a>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="flex items-center gap-1 transition-colors hover:text-[var(--color-primary)]" aria-label="Open WhatsApp chat">
              <WhatsAppIcon />
              <span className="hidden xl:inline">WhatsApp</span>
            </a>
            <Link
              href={DIRECT_BOOKING_ENGINE_URL}
              className={buttonClassName({
                variant: "primary",
                size: "sm",
                className: "ml-1 rounded-full px-4 py-1.5 text-[0.58rem] tracking-[0.1em]",
              })}
            >
              {content.primaryCta}
            </Link>
          </div>
        </div>

        {/* Desktop: nav links row */}
        <nav
          className="border-t border-white/[0.04]"
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className="mx-auto flex max-w-[96rem] items-center justify-center gap-x-6 px-6 xl:gap-x-8 xl:px-10">
            {desktopMainLinks.map((item, index) => {
              const hasDropdown = (headerDropdownLinks[item] ?? []).length > 0;
              return (
                <div key={item} className="relative" onMouseEnter={() => setActiveDropdown(hasDropdown ? item : null)}>
                  <Link
                    href={mainNavLinks[item] ?? "/"}
                    className={`inline-flex items-center gap-0.5 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.13em] transition-colors duration-200 ${
                      activeDropdown === item ? "text-[var(--color-primary)]" : "text-white/65 hover:text-[var(--color-primary)]"
                    }`}
                  >
                    {item}
                    {hasDropdown ? <ChevronDownIcon /> : null}
                  </Link>

                  {index < desktopMainLinks.length - 1 ? (
                    <span className="pointer-events-none absolute left-[calc(100%+0.7rem)] top-1/2 -translate-y-1/2 text-[0.45rem] text-white/12" aria-hidden="true">
                      {"\u2022"}
                    </span>
                  ) : null}

                  {activeDropdown === item && hasDropdown ? (
                    <div className="absolute left-1/2 top-full z-50 min-w-[14rem] -translate-x-1/2 pt-1.5">
                      <div className="overflow-hidden rounded-lg border border-white/10 bg-[rgba(16,13,10,0.97)] p-1 shadow-[0_16px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                        {dropdownItems.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.label}
                            href={dropdownItem.href}
                            className="block border-b border-white/[0.05] px-3.5 py-2.5 text-[0.78rem] leading-snug text-white/75 transition-colors last:border-b-0 hover:bg-white/[0.04] hover:text-[var(--color-text-primary)]"
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Mobile: slide-down menu */}
      <nav
        id="mobile-menu"
        data-lenis-prevent
        className={`no-scrollbar overflow-y-auto overscroll-contain border-t border-white/[0.06] bg-[rgba(10,8,6,0.98)] backdrop-blur-xl transition-[max-height,opacity] duration-300 ${
          mobileMenuOpen
            ? "max-h-[calc(100vh-4rem)] opacity-100 touch-pan-y"
            : "max-h-0 overflow-hidden opacity-0"
        } lg:hidden`}
      >
        <div className="py-1" data-lenis-prevent>
          {mobileMainLinks.map((item) => {
            const nested = headerDropdownLinks[item] ?? [];
            return (
              <div key={item}>
                <Link
                  href={mainNavLinks[item] ?? "/"}
                  className="flex min-h-[2.75rem] items-center px-5 text-[0.78rem] font-semibold uppercase tracking-wide text-white/80 transition-colors hover:text-[var(--color-primary)]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
                {nested.length > 0 ? (
                  <div className="border-b border-white/[0.04] pb-1 pl-7">
                    {nested.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.label}
                        href={dropdownItem.href}
                        className="block py-1.5 text-[0.72rem] text-white/45 transition-colors hover:text-[var(--color-primary)]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {dropdownItem.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="border-b border-white/[0.04]" />
                )}
              </div>
            );
          })}
        </div>

        <div className="px-5 py-3">
          <Link
            href={DIRECT_BOOKING_ENGINE_URL}
            className={buttonClassName({
              variant: "primary",
              size: "md",
              className: "flex w-full justify-center rounded-full py-2.5 text-[0.68rem] tracking-[0.1em]",
            })}
            onClick={() => setMobileMenuOpen(false)}
          >
            {content.primaryCta}
          </Link>
          <div className="mt-2 flex items-center justify-center gap-3 text-[0.66rem] text-white/45">
            <a href={contactPhoneHref} className="flex items-center gap-1 hover:text-[var(--color-primary)]">
              <PhoneIcon /> {contactPhone}
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
