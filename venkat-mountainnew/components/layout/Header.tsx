"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { navigation, siteMeta } from "@/lib/site-data";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--primary-900)]/92 text-white backdrop-blur-xl">
      <div className="border-b border-white/10">
        <Container>
          <div className="flex min-h-10 flex-wrap items-center justify-between gap-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/68 sm:min-h-11">
            <span className="min-w-0">{siteMeta.tagline}</span>
            <div className="hidden min-w-0 items-center gap-4 md:flex">
              <a href={siteMeta.phoneHref} className="transition hover:text-white">
                {siteMeta.phone}
              </a>
              <span className="text-white/20">|</span>
              <a href={siteMeta.altPhoneHref} className="transition hover:text-white">
                {siteMeta.altPhone}
              </a>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="flex min-h-22 min-w-0 items-center justify-between gap-6 py-4">
          <Link href="/" className="shrink-0">
            <div className="text-3xl font-bold text-white sm:text-[3rem] sm:leading-none">The Mountain</div>
            <div className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-[var(--accent-gold)]">
              By Redwings
            </div>
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-4 xl:flex 2xl:gap-6">
            {navigation.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap text-[0.82rem] font-semibold uppercase tracking-[0.12em] transition 2xl:text-sm ${
                    isActive ? "text-white" : "text-white/68 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center gap-4 xl:flex">
            <Button href={siteMeta.bookingEngineHref} size="sm">
              Plan Wedding
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white xl:hidden"
            aria-label="Toggle navigation"
          >
            <span className="text-xl">{open ? "×" : "☰"}</span>
          </button>
        </div>
      </Container>

      {open ? (
        <div className="border-t border-white/10 bg-[var(--primary-900)] xl:hidden">
          <Container className="flex flex-col gap-4 py-5">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm font-semibold uppercase tracking-[0.14em] text-white/78"
              >
                {item.label}
              </Link>
            ))}
            <Button href={siteMeta.bookingEngineHref} size="sm" className="w-full">
              Plan Wedding
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
