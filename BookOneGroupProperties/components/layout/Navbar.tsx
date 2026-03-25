"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navigationData } from "@/data/navigation";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const primaryLinks = navigationData.links.filter((link) => link.href !== "#");
  const utilityLink = navigationData.links.find((link) => link.href === "#");

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent py-4 md:py-6">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="h-16 sm:h-20 flex items-center justify-between gap-4">
          <Link href="/" className="flex flex-col items-center shrink-0">
            <div className="bg-primary/90 text-white p-2 rounded-t-lg shadow-lg mb-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V7l8-4 8 4v14M8 21v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </div>
            <span className="text-xl sm:text-2xl font-serif italic font-bold text-primary tracking-wide">{navigationData.brand.name}</span>
            <span className="text-[0.6rem] font-sans font-bold uppercase tracking-[0.2em] text-primary/80">{navigationData.brand.tagline}</span>
          </Link>

          <div className="hidden md:flex items-center gap-10 text-sm font-bold uppercase tracking-wider text-primary/80">
            {primaryLinks.slice(0, 1).map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-primary transition-colors">{link.label}</Link>
            ))}
            {utilityLink ? (
              <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                {utilityLink.label}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            ) : null}
            {primaryLinks.slice(1).map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-primary transition-colors">{link.label}</Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button className="rounded-md bg-primary hover:bg-primary/90 hidden md:flex" size="icon">
              <MessageCircleIcon className="w-5 h-5" />
            </Button>
            <button
              className="md:hidden p-2 text-primary hover:bg-white/20 rounded-full"
              data-testid="btn-menu"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {isMenuOpen ? (
          <div className="md:hidden mt-3 rounded-2xl border border-white/20 bg-white/95 backdrop-blur-xl shadow-2xl p-4">
            <div className="flex flex-col gap-2 text-sm font-bold uppercase tracking-wider text-primary/80">
              {navigationData.links.map((link) =>
                link.href === "#" ? (
                  <button key={link.label} type="button" className="text-left rounded-xl px-4 py-3 hover:bg-primary/5 transition-colors">
                    {link.label}
                  </button>
                ) : (
                  <Link key={link.label} href={link.href} className="rounded-xl px-4 py-3 hover:bg-primary/5 transition-colors" onClick={closeMenu}>
                    {link.label}
                  </Link>
                )
              )}
              <Button className="mt-2 w-full rounded-xl bg-primary hover:bg-primary/90">
                <MessageCircleIcon className="w-5 h-5 mr-2" />
                {navigationData.mobileCtaLabel}
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}

function MessageCircleIcon(props: any) {
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
