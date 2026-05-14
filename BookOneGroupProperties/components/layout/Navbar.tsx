"use client";

import type { SVGProps } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navigationData } from "@/data/navigation";
import { siteContact } from "@/data/site";

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
          <Link href="/" className="flex shrink-0 items-center" aria-label={`${navigationData.brand.name} home`}>
            <Image
              src="/puneresortlogo.png"
              alt={navigationData.brand.name}
              width={150}
              height={153}
              priority
              className="h-auto w-[72px] sm:w-[112px]"
            />
          </Link>

          <div className="hidden items-center gap-10 text-sm font-bold uppercase tracking-wider text-primary md:flex [text-shadow:_0_1px_2px_rgb(0_0_0_/_20%)]">
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
            <Button asChild className="hidden rounded-md bg-primary hover:bg-primary/90 md:flex" size="icon">
              <a href={siteContact.whatsappHref} target="_blank" rel="noreferrer" aria-label="Contact on WhatsApp">
                <MessageCircleIcon className="h-5 w-5" />
              </a>
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
              <Button asChild className="mt-2 w-full rounded-xl bg-primary hover:bg-primary/90">
                <a href={siteContact.whatsappHref} target="_blank" rel="noreferrer" onClick={closeMenu}>
                  <MessageCircleIcon className="mr-2 h-5 w-5" />
                  {navigationData.mobileCtaLabel}
                </a>
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
