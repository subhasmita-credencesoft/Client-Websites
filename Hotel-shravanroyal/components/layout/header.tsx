"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { MobileNav } from "@/components/layout/mobile-nav";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { hotelInfo } from "@/data/hotel";
import { navigationItems } from "@/data/navigation";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const getHash = (href: string) => {
  const index = href.indexOf("#");
  return index >= 0 ? href.slice(index) : href;
};

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(`#${SECTION_IDS.home}`);
  const isHomePage = pathname === "/";
  const isExternalBookingUrl = hotelInfo.bookingUrl.startsWith("http://") || hotelInfo.bookingUrl.startsWith("https://");

  const sectionIds = useMemo(
    () => (isHomePage ? navigationItems.map((item) => item.href.split("#")[1]).filter(Boolean) : []),
    [isHomePage],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHomePage) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveSection(`#${visibleEntry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: 0.1 },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isHomePage, sectionIds]);

  return (
    <header
      className="sticky top-0 z-50 border-b border-[#dfd2be] bg-[#f7f1e8] shadow-[0_12px_32px_rgba(88,60,24,0.12)] transition-all duration-300"
      data-site-header="true"
    >
      <Container className="max-w-[96rem] px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex min-h-[5.4rem] items-center justify-between gap-4 transition-all duration-300",
            scrolled
              ? "py-2.5"
              : "py-3.5",
          )}
          >
          <Link className="min-w-0 shrink-0" href={`/#${SECTION_IDS.home}`}>
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[#d8c2a0] bg-white shadow-sm sm:h-14 sm:w-14">
                <Image
                  alt={`${hotelInfo.shortName} logo`}
                  className="object-cover"
                  fill
                  priority
                  sizes="56px"
                  src="/images/logo.avif"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate font-display text-[1.45rem] font-semibold leading-none tracking-[0.01em] text-[#221814] sm:text-[1.72rem] xl:text-[1.9rem]">
                  {hotelInfo.shortName}
                </p>
                <p className="mt-1 hidden text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#5b4a3d] xl:block">
                  Jaipur Hospitality
                </p>
              </div>
            </div>
          </Link>

          <nav aria-label="Primary navigation" className="hidden flex-1 justify-center lg:flex">
            <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
              {navigationItems.map((item) => {
                const itemHash = getHash(item.href);
                const isActive = isHomePage ? activeSection === itemHash : item.matchPath === pathname;

                return (
                  <li key={item.href}>
                    <Link
                      className={cn(
                        "inline-flex items-center rounded-lg px-3 py-2 text-[0.95rem] font-medium text-[#2f241d] transition hover:bg-[#efe4d4] hover:text-[#1f1712] xl:px-3.5",
                        isActive && "bg-[#f7efe3] text-[#9a672c]",
                      )}
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden shrink-0 items-center justify-end lg:flex">
            <Button
              asChild
              className="h-12 rounded-xl border-0 bg-[#c79a5b] px-8 text-base font-semibold text-white shadow-[0_14px_28px_rgba(103,70,30,0.22)] hover:bg-[#b88b4f]"
            >
              {isExternalBookingUrl ? <a href={hotelInfo.bookingUrl} rel="noreferrer">Book Now</a> : <Link href={hotelInfo.bookingUrl}>Book Now</Link>}
            </Button>
          </div>

          <MobileNav open={open} setOpen={setOpen} />
        </div>
      </Container>
    </header>
  );
}
