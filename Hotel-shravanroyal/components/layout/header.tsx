"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { MobileNav } from "@/components/layout/mobile-nav";
import { CtaButton } from "@/components/shared/cta-button";
import { Container } from "@/components/shared/container";
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
    <header className="sticky top-0 z-50 py-3 sm:py-4">
      <Container>
        <div
          className={cn(
            "relative flex items-center justify-between gap-3 rounded-full border px-3 py-2.5 transition-all duration-300 sm:px-6 sm:py-3",
            scrolled
              ? "border-border/80 bg-white/88 shadow-soft backdrop-blur-xl"
              : "border-white/50 bg-white/70 backdrop-blur-md",
          )}
        >
          <Link className="min-w-0 flex-1 lg:flex-none" href={`/#${SECTION_IDS.home}`}>
            <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-600 to-red-900 text-sm font-bold text-white sm:h-11 sm:w-11">
                SR
              </div>
              <div className="min-w-0">
                <p className="truncate font-display text-lg font-semibold leading-none text-stone-900 sm:text-2xl">
                  {hotelInfo.shortName}
                </p>
                <p className="mt-1 hidden text-xs uppercase tracking-[0.28em] text-primary/70 sm:block">
                  Jaipur Hospitality
                </p>
              </div>
            </div>
          </Link>

          <nav aria-label="Primary navigation" className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-full bg-stone-100/70 p-1">
              {navigationItems.map((item) => {
                const itemHash = getHash(item.href);
                const isActive = isHomePage ? activeSection === itemHash : item.matchPath === pathname;

                return (
                  <li key={item.href}>
                    <Link
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-medium text-stone-600 transition hover:text-primary",
                        isActive && "bg-white text-primary shadow-sm",
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

          <div className="hidden lg:block">
            <CtaButton href={hotelInfo.bookingUrl} label="Book Now" />
          </div>

          <MobileNav open={open} setOpen={setOpen} />
        </div>
      </Container>
    </header>
  );
}
