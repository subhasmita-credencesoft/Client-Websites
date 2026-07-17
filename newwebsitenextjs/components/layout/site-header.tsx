"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { buttonClassName } from "@/components/ui/button";
import { PageWrapper } from "@/components/ui/page-wrapper";
import {
  headerDropdownLinks,
  mainLinks,
  mainNavLinks,
  topLeftLinks,
  topRightLinks,
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

function DiamondIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
      <path d="M12 3 21 12 12 21 3 12 12 3Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[1.9]">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72l.34 2.71a2 2 0 0 1-.57 1.73L7.1 9.91a16 16 0 0 0 7 7l1.75-1.78a2 2 0 0 1 1.73-.57l2.71.34A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[1.9]">
      <path d="M20.5 11.5a8.5 8.5 0 1 0-15.7 4.46L4 21l5.2-.77A8.5 8.5 0 0 0 20.5 11.5Z" />
      <path d="M8.9 7.9c.2-.5.4-.5.7-.5h.6c.2 0 .4 0 .6.4.2.5.8 1.8.9 1.9.1.2.1.4 0 .6l-.4.6c-.1.1-.2.3 0 .5.2.4.8 1.3 1.7 2 .3.3.6.5 1 .6.2.1.4.1.5-.1l.6-.7c.2-.2.4-.2.6-.1.3.1 1.8.8 2.1.9.3.1.5.2.5.4 0 .2 0 1-.3 1.4-.3.4-1.6.9-2.1.9-.6 0-1.3-.1-2.1-.5-.5-.2-1.2-.6-2-1.3-1.5-1.2-2.4-2.7-2.7-3.2-.3-.6-.3-1.1-.1-1.5.2-.5.5-.8.7-1.1Z" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="ml-1 inline-block h-3 w-3 align-middle fill-none stroke-current stroke-[2]">
      <path d="m5 7 5 5 5-5" />
    </svg>
  );
}

export function SiteHeader() {
  const router = useRouter();
  const content = homeSectionContent.siteHeader;
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownItems = useMemo(
    () => (activeDropdown ? headerDropdownLinks[activeDropdown] ?? [] : []),
    [activeDropdown],
  );

  const mobileMainLinks = [...leftMainLinks, ...rightMainLinks];
  const desktopMainLinks = [...leftMainLinks, ...rightMainLinks];

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
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
    <header className="fixed inset-x-0 top-0 z-50 bg-[linear-gradient(180deg,rgba(8,7,6,0.97)_0%,rgba(8,7,6,0.93)_100%)] backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
      <PageWrapper size="wide">
        <div className="relative py-2 lg:py-0">
          <div className="grid min-h-[3.4rem] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 sm:min-h-[3.8rem] sm:gap-3 md:grid-cols-[1fr_auto_1fr] md:gap-6">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-[rgba(var(--color-primary-rgb),0.28)] bg-white/[0.03] text-white sm:h-11 sm:w-11 lg:hidden"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="relative block h-[18px] w-5">
                <span
                  className={`absolute left-0 top-[1px] block h-[2px] w-5 bg-white transition-transform duration-300 ${
                    mobileMenuOpen ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] block h-[2px] w-5 bg-white transition-opacity duration-300 ${
                    mobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 top-[13px] block h-[2px] w-5 bg-white transition-transform duration-300 ${
                    mobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>

            <div className="hidden min-h-[4.2rem] items-center gap-5 text-[0.68rem] font-semibold tracking-[0.12em] text-[#f1e7d7] lg:flex">
              <span className="text-white/75">
                <DiamondIcon />
              </span>
              {topLeftLinks.map((item) => (
                <Link
                  key={item}
                  href={topLinkHrefs[item] ?? "/"}
                  className="transition-colors hover:text-[var(--color-primary-hover)]"
                  data-cursor="hover"
                >
                  {item}
                </Link>
              ))}
            </div>

            <Link
              href="/"
              className="relative z-10 mx-auto inline-flex h-[38px] w-[48px] items-center justify-center rounded-[var(--radius-sm)] border border-[rgba(var(--color-primary-rgb),0.56)] bg-[linear-gradient(180deg,rgba(19,15,12,0.98)_0%,rgba(10,8,6,0.98)_100%)] px-1 text-center text-[0.28rem] font-semibold uppercase tracking-[0.08em] leading-[1.1] text-[var(--color-primary-hover)] shadow-[0_0_0_2px_rgba(8,7,6,0.94),0_8px_20px_rgba(0,0,0,0.22)] max-[380px]:h-[34px] max-[380px]:w-[42px] max-[380px]:text-[0.24rem] sm:h-[52px] sm:w-[78px] sm:px-2.5 sm:text-[0.46rem] sm:tracking-[0.2em] sm:leading-normal md:h-[60px] md:w-[92px] md:px-3.5 md:text-[0.54rem] lg:h-[76px] lg:w-[110px] lg:text-[0.6rem] lg:leading-[1.6]"
              data-cursor="hover"
            >
              {content.logoLines[0]}
              <br />
              {content.logoLines[1]}
            </Link>

            <div className="hidden min-h-[4.2rem] items-center justify-end gap-3 text-[0.68rem] font-semibold tracking-[0.12em] text-[#f1e7d7] lg:flex">
              {topRightLinks.map((item) => (
                <Link key={item} href="/" className="transition-colors hover:text-[var(--color-primary-hover)]" data-cursor="hover">
                  {item}
                </Link>
              ))}
              <div className="group relative flex items-center">
                <a
                  href={contactPhoneHref}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/85 transition-colors hover:border-[rgba(var(--color-primary-rgb),0.35)] hover:text-[var(--color-primary-hover)]"
                  aria-label={`Call ${contactPhone}`}
                  data-cursor="hover"
                >
                  <PhoneIcon />
                </a>
                <span className="pointer-events-none absolute right-1/2 top-[calc(100%+0.7rem)] z-50 min-w-max translate-x-1/2 rounded-full border border-[rgba(var(--color-primary-rgb),0.3)] bg-[var(--color-surface-soft)] px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.16em] text-[var(--color-text-primary)] opacity-0 shadow-[0_10px_24px_rgba(0,0,0,0.24)] transition-opacity duration-200 group-hover:opacity-100">
                  {contactPhone}
                </span>
              </div>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/85 transition-colors hover:border-[rgba(var(--color-primary-rgb),0.35)] hover:text-[var(--color-primary-hover)]"
                aria-label="Open WhatsApp chat"
                data-cursor="hover"
              >
                <WhatsAppIcon />
              </a>
              <Link
                href={DIRECT_BOOKING_ENGINE_URL}
                className={buttonClassName({
                  variant: "primary",
                  size: "sm",
                  className: "min-h-[2.7rem] rounded-full px-6 text-[0.64rem] shadow-[0_12px_24px_rgba(200,154,85,0.14)] hover:shadow-[0_14px_28px_rgba(214,176,122,0.18)]",
                })}
                data-cursor="hover"
              >
                {content.primaryCta}
              </Link>
            </div>

            <Link
              href={DIRECT_BOOKING_ENGINE_URL}
              className={buttonClassName({
                variant: "primary",
                size: "sm",
                className:
                  "h-9 min-w-0 max-w-[7.8rem] shrink-0 overflow-hidden text-ellipsis whitespace-nowrap rounded-full px-2 text-[0.36rem] tracking-[0.04em] shadow-none max-[380px]:max-w-[7.2rem] max-[380px]:px-1.5 max-[380px]:text-[0.32rem] sm:h-10 sm:max-w-none sm:px-3.5 sm:text-[0.52rem] lg:hidden",
              })}
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Now
            </Link>
          </div>
        </div>

        <nav
          className="relative hidden items-center justify-center bg-[rgba(8,7,6,0.9)] py-2.5 lg:flex"
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center">
            {desktopMainLinks.map((item, index) => (
              <div
                key={item}
                className="relative"
                onMouseEnter={() => setActiveDropdown((headerDropdownLinks[item] ?? []).length > 0 ? item : null)}
              >
                <Link
                  href={mainNavLinks[item] ?? "/"}
                  className={`inline-flex min-h-9 items-center text-[0.76rem] font-semibold uppercase tracking-[0.16em] transition-all duration-200 ${
                    activeDropdown === item ? "text-[#e0b675]" : "text-[#f3eadb]/92 hover:text-[#e0b675]"
                  }`}
                  data-cursor="hover"
                >
                  {item}
                  {(headerDropdownLinks[item] ?? []).length > 0 ? <ChevronDownIcon /> : null}
                </Link>

                {index < desktopMainLinks.length - 1 ? (
                  <span
                    className="pointer-events-none absolute left-[calc(100%+1rem)] top-1/2 -translate-y-1/2 text-[0.72rem] text-[#c89a55]/58"
                    aria-hidden="true"
                  >
                    {"\u2022"}
                  </span>
                ) : null}

                {activeDropdown === item && dropdownItems.length > 0 ? (
                  <div className="absolute left-1/2 top-[2.7rem] z-50 min-w-[16rem] -translate-x-1/2 rounded-[1.1rem] border border-[#c9a46e]/24 bg-[linear-gradient(180deg,#15110e_0%,#1d1612_100%)] p-1.5 shadow-[0_14px_34px_rgba(0,0,0,0.42)] md:min-w-[19rem]">
                    {dropdownItems.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.label}
                        href={dropdownItem.href}
                        className="block border-b border-white/10 px-4 py-3.5 text-left text-[0.92rem] leading-snug text-white/90 last:border-b-0 hover:bg-white/4 hover:text-[var(--color-text-primary)]"
                        data-cursor="hover"
                      >
                        {dropdownItem.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </nav>

        <nav
          id="mobile-menu"
          data-lenis-prevent
          className={`no-scrollbar border-t border-[#c89a55]/14 transition-[max-height,opacity] duration-300 md:hidden ${
            mobileMenuOpen
              ? "max-h-[calc(100vh-6rem)] overflow-y-auto overscroll-contain touch-pan-y opacity-100"
              : "max-h-0 overflow-hidden opacity-0"
          } lg:hidden`}
        >
          <div className="space-y-1 py-4" data-lenis-prevent>
            {mobileMainLinks.map((item) => {
              const nested = headerDropdownLinks[item] ?? [];

              return (
                <div key={item} className="border-b border-white/10 pb-2 last:border-b-0">
                  <Link
                    href={mainNavLinks[item] ?? "/"}
                    className="block min-h-12 px-1 py-2.5 text-[0.82rem] font-semibold uppercase tracking-wide text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>

                  {nested.length > 0 ? (
                    <div className="space-y-1 pl-4">
                      {nested.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          href={dropdownItem.href}
                          className="block py-1.5 text-[0.85rem] text-white/75 transition-colors hover:text-[#c9a46e]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <Link
            href={DIRECT_BOOKING_ENGINE_URL}
            className={buttonClassName({ variant: "primary", size: "md", className: "mb-4 flex w-full justify-center text-center text-[0.72rem]" })}
            onClick={() => setMobileMenuOpen(false)}
          >
            {content.primaryCta}
          </Link>
        </nav>
      </PageWrapper>
    </header>
  );
}
