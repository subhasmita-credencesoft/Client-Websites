"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  headerDropdownLinks,
  mainLinks,
  mainNavLinks,
  topLeftLinks,
  topRightLinks,
} from "@/lib/data/mountain-content";
import { homeSectionContent } from "@/lib/data/resort-content";

const leftMainLinks = mainLinks.slice(0, 3);
const rightMainLinks = mainLinks.slice(3);

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-[1.8]">
      <path d="M4 6h16v12H4z" />
      <path d="m5 7 7 6 7-6" />
    </svg>
  );
}

function DiamondIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
      <path d="M12 3 21 12 12 21 3 12 12 3Z" />
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
  const content = homeSectionContent.siteHeader;
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownItems = useMemo(
    () => (activeDropdown ? headerDropdownLinks[activeDropdown] ?? [] : []),
    [activeDropdown],
  );

  const mobileMainLinks = [...leftMainLinks, ...rightMainLinks];

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

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#1e3329]/98 backdrop-blur-sm">
      <div className="mx-auto max-w-[96rem] px-4 md:px-10">
        <div className="relative border-b border-white/25 py-3 md:py-2">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-6">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center border border-white/30 text-white md:hidden"
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

            <div className="hidden items-center gap-5 border-b border-white/35 pb-2 text-[0.66rem] font-semibold tracking-wide text-white md:flex">
              <span className="text-white/85">
                <MailIcon />
              </span>
              <span className="text-white/75">
                <DiamondIcon />
              </span>
              {topLeftLinks.map((item) => (
                <Link key={item} href="/" className="transition-colors hover:text-[#c9a46e]" data-cursor="hover">
                  {item}
                </Link>
              ))}
            </div>

            <Link
              href="/"
              className="mx-auto inline-flex h-[76px] w-[96px] items-center justify-center border border-[#9b7a4a] bg-[#08090c] px-3 text-center text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#d9b57f] md:h-[84px] md:w-[104px] md:text-[0.66rem]"
              data-cursor="hover"
            >
              {content.logoLines[0]}
              <br />
              {content.logoLines[1]}
            </Link>

            <div className="hidden items-center justify-end gap-5 border-b border-white/35 pb-2 text-[0.66rem] font-semibold tracking-wide text-white md:flex">
              {topRightLinks.map((item) => (
                <Link key={item} href="/" className="transition-colors hover:text-[#c9a46e]" data-cursor="hover">
                  {item}
                </Link>
              ))}
              <button
                type="button"
                className="border border-white bg-white px-6 py-2 text-[0.68rem] tracking-wide text-black"
                data-cursor="hover"
              >
                {content.primaryCta}
              </button>

            </div>

            <div className="h-10 w-10 md:hidden" />
          </div>
        </div>

        <nav className="relative hidden grid-cols-[1fr_auto_1fr] items-center py-3 md:grid" onMouseLeave={() => setActiveDropdown(null)}>
          <div className="hidden items-center gap-10 md:flex">
            {leftMainLinks.map((item) => (
              <div key={item} className="relative" onMouseEnter={() => setActiveDropdown(item)}>
                <Link
                  href={mainNavLinks[item] ?? "/"}
                  className={`text-[0.72rem] font-semibold uppercase tracking-wide transition-colors ${
                    activeDropdown === item ? "text-[#c9a46e]" : "text-white"
                  }`}
                  data-cursor="hover"
                >
                  {item}
                  <ChevronDownIcon />
                </Link>

                {activeDropdown === item && dropdownItems.length > 0 ? (
                  <div className="absolute left-0 top-[2rem] z-50 min-w-[16rem] border border-[#c9a46e]/30 bg-[#1e3329] p-1 shadow-[0_10px_30px_rgba(11,22,16,0.45)]">
                    {dropdownItems.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.label}
                        href={dropdownItem.href}
                        className="block border-b border-white/10 px-3 py-2 text-left text-sm text-white/90 last:border-b-0 hover:bg-white/4 hover:text-white"
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

          <div />

          <div className="hidden items-center justify-end gap-10 md:flex">
            {rightMainLinks.map((item) => (
              <Link
                key={item}
                href={mainNavLinks[item] ?? "/"}
                className="text-[0.72rem] font-semibold uppercase tracking-wide text-white transition-colors hover:text-[#c9a46e]"
                data-cursor="hover"
              >
                {item}
              </Link>
            ))}
          </div>
        </nav>

        <nav
          id="mobile-menu"
          className={`border-b border-white/20 transition-[max-height,opacity] duration-300 md:hidden ${
            mobileMenuOpen
              ? "max-h-[calc(100vh-7rem)] overflow-y-auto opacity-100"
              : "max-h-0 overflow-hidden opacity-0"
          }`}
        >
          <div className="space-y-1 py-3">
            {mobileMainLinks.map((item) => {
              const nested = headerDropdownLinks[item] ?? [];

              return (
                <div key={item} className="border-b border-white/10 pb-2 last:border-b-0">
                  <Link
                    href={mainNavLinks[item] ?? "/"}
                    className="block px-1 py-2 text-[0.78rem] font-semibold uppercase tracking-wide text-white"
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
                          className="block py-1 text-sm text-white/75 transition-colors hover:text-[#c9a46e]"
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

          <button
            type="button"
            className="mb-4 w-full border border-white bg-white px-7 py-2 text-[0.72rem] tracking-wide text-black"
          >
            {content.primaryCta}
          </button>
        </nav>
      </div>
    </header>
  );
}
