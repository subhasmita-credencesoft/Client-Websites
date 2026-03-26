"use client";

import type { SVGProps } from "react";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navigationData } from "@/data/navigation";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPackagesOpen, setIsPackagesOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsPackagesOpen(false);
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent py-4 md:py-6">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4 sm:h-20">
          <Link href="/" className="flex shrink-0 flex-col items-center">
            <div className="mb-1 rounded-t-lg bg-primary/90 p-2 text-white shadow-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V7l8-4 8 4v14M8 21v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
            </div>
            <span className="text-xl font-bold italic tracking-wide text-primary sm:text-2xl">{navigationData.brand.name}</span>
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-primary/80">{navigationData.brand.tagline}</span>
          </Link>

          <div className="hidden items-center gap-10 text-sm font-bold uppercase tracking-wider text-primary/80 md:flex">
            {navigationData.links.map((link) =>
              link.children?.length ? (
                <div key={link.label} className="group relative">
                  <button type="button" className="flex items-center gap-1 transition-colors hover:text-primary">
                    {link.label}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <div className="absolute left-1/2 top-full hidden min-w-[220px] -translate-x-1/2 pt-4 group-hover:block">
                    <div className="rounded-2xl border border-primary/10 bg-white/95 p-2 shadow-xl backdrop-blur">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block rounded-xl px-4 py-3 text-sm font-bold tracking-normal text-primary/80 transition-colors hover:bg-primary/5 hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={link.label} href={link.href} className="transition-colors hover:text-primary">
                  {link.label}
                </Link>
              ),
            )}
          </div>

          <div className="flex items-center gap-4">
            <Button className="hidden rounded-md bg-primary hover:bg-primary/90 md:flex" size="icon">
              <MessageCircleIcon className="h-5 w-5" />
            </Button>
            <button
              className="rounded-full p-2 text-primary hover:bg-white/20 md:hidden"
              data-testid="btn-menu"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {isMenuOpen ? (
          <div className="mt-3 rounded-2xl border border-white/20 bg-white/95 p-4 shadow-2xl backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-2 text-sm font-bold uppercase tracking-wider text-primary/80">
              {navigationData.links.map((link) =>
                link.children?.length ? (
                  <div key={link.label} className="rounded-xl border border-primary/10 bg-primary/5">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-4 py-3 text-left"
                      onClick={() => setIsPackagesOpen((open) => !open)}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${isPackagesOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isPackagesOpen ? (
                      <div className="flex flex-col gap-1 px-2 pb-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="rounded-xl px-4 py-3 text-[0.78rem] tracking-[0.12em] text-primary/80 transition-colors hover:bg-white"
                            onClick={closeMenu}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <Link key={link.label} href={link.href} className="rounded-xl px-4 py-3 transition-colors hover:bg-primary/5" onClick={closeMenu}>
                    {link.label}
                  </Link>
                ),
              )}
              <Button className="mt-2 w-full rounded-xl bg-primary hover:bg-primary/90">
                <MessageCircleIcon className="mr-2 h-5 w-5" />
                {navigationData.mobileCtaLabel}
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}

function MessageCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}
