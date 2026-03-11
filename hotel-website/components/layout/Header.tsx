"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Container from "../ui/Container";
import Button from "../ui/Button";
import navigation from "../../data/navigation";
import menuPreviews from "../../data/menuPreviews";
import useScrollPosition from "../../hooks/useScrollPosition";

export default function Header() {
  const scrolled = useScrollPosition();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isHeroPage =
    isHome ||
    pathname.startsWith("/rooms") ||
    pathname.startsWith("/dining") ||
    pathname.startsWith("/wellness") ||
    pathname.startsWith("/experiences") ||
    pathname.startsWith("/weddings") ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/contact");
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [menuPreview, setMenuPreview] = useState<string>(navigation[0]?.href ?? "/");
  const canUsePortal = typeof document !== "undefined";

  useEffect(() => {
    document.body.style.overflow = menuOpen || menuClosing ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, menuClosing]);

  const closeMenu = () => {
    setMenuClosing(true);
    window.setTimeout(() => {
      setMenuOpen(false);
      setMenuClosing(false);
    }, 450);
  };

  return (
    <header
      className={`z-50 w-full border-b transition ${
        isHeroPage
          ? "absolute top-0 border-white/20 bg-white/[0.07] text-white backdrop-blur-[16px]"
          : "sticky top-0 border-ink/10 bg-paper text-ink"
      } ${
        scrolled && !isHeroPage ? "bg-paper/95 backdrop-blur" : ""
      } ${scrolled && isHeroPage ? "bg-[#5f6b70]/45 backdrop-blur-[18px]" : ""}`}
    >
      <Container className="relative flex h-16 items-center sm:h-20">
        <button
          className="order-2 ml-auto flex h-9 w-9 flex-col items-start justify-center gap-1.5 lg:order-1 lg:ml-0 sm:h-10 sm:w-10"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => {
            if (menuOpen) {
              closeMenu();
              return;
            }
            setMenuPreview(navigation[0]?.href ?? "/");
            setMenuOpen(true);
          }}
        >
          <span className="h-0.5 w-6 bg-current" />
          <span className="h-0.5 w-5 bg-current" />
          <span className="h-0.5 w-4 bg-current" />
        </button>
        <Link
          href="/"
          className="order-1 flex items-center lg:order-2 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:transform"
        >
          <Image
            src="https://demo2.wpopal.com/amoja/wp-content/uploads/2024/11/logo-white.svg"
            alt="Amoja"
            width={140}
            height={40}
            priority
            className={`${isHeroPage ? "" : "invert"} h-5 w-auto sm:h-7`}
          />
        </Link>
        <div className="order-3 ml-auto hidden items-center gap-2 text-xs font-semibold sm:gap-4 sm:text-sm lg:flex">
          <span className="hidden items-center gap-2 lg:flex">
            <svg
              className="h-4 w-4 text-current"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.9v2a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.1 1h2a2 2 0 0 1 2 1.72c.12.9.32 1.77.59 2.61a2 2 0 0 1-.45 2.11L7.2 8.8a16 16 0 0 0 6 6l1.36-1.04a2 2 0 0 1 2.11-.45c.84.27 1.71.47 2.61.59A2 2 0 0 1 22 16.9Z" />
            </svg>
            1-800-123-4567
          </span>
          <Button
            href="/booking"
            size="md"
            variant="primary"
            className={`h-8 rounded-full px-3 text-[0.58rem] uppercase tracking-[0.16em] sm:h-10 sm:px-6 sm:text-[0.65rem] sm:tracking-[0.22em] ${
              isHeroPage ? "border border-white/30 bg-white/5 hover:bg-white/15" : ""
            }`}
          >
            <span className="sm:hidden">Book</span>
            <span className="hidden sm:inline">Book your stay</span>
          </Button>
        </div>
      </Container>
      <div
        className={`hidden border-t lg:block ${
          isHeroPage ? "border-white/20 bg-white/[0.03]" : "border-ink/10"
        }`}
      >
        <Container className="flex h-14 items-center justify-center gap-4 text-[0.7rem] font-semibold font-serif xl:gap-6 xl:text-sm">
          {navigation.map((item, index) => (
            <div key={item.href} className="flex items-center gap-4 xl:gap-6">
              <Link
                href={item.href}
                className="uppercase tracking-[0.08em] text-current/90 hover:text-current"
              >
                {item.label}
              </Link>
              {index < navigation.length - 1 && <span className="text-current/30">|</span>}
            </div>
          ))}
        </Container>
      </div>
      {canUsePortal &&
        menuOpen &&
        createPortal(
          <div
            className={`menu-overlay fixed inset-0 z-[999] overflow-y-auto bg-[#141319] text-white ${
              menuClosing ? "is-closing" : ""
            }`}
          >
            <div
              className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ease-out"
              style={{
                backgroundImage: `url(${menuPreviews[menuPreview] ?? "/images/room_1.jpg"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="pointer-events-none absolute inset-0 z-0 bg-[#111015]/46" />
            <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-[#2d231f]/52 via-[#201c1c]/24 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-40 bg-[#1f1e22]/42 backdrop-blur-[2px]" />
            <div className="relative z-10 border-b border-white/18 bg-white/[0.02]">
              <Container className="grid h-20 grid-cols-[auto_1fr_auto] items-center sm:h-24">
                <button
                  className="flex h-10 w-10 items-center justify-center text-white/90 transition hover:text-white"
                  aria-label="Close menu"
                  onClick={closeMenu}
                >
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M6 6 18 18M18 6 6 18" />
                  </svg>
                </button>
                <Link href="/" className="mx-auto flex items-center">
                  <Image
                    src="https://demo2.wpopal.com/amoja/wp-content/uploads/2024/11/logo-white.svg"
                    alt="Amoja"
                    width={140}
                    height={40}
                    priority
                    className="h-7 w-auto"
                  />
                </Link>
                <div className="ml-auto flex items-center gap-3 text-xs font-semibold sm:gap-4 sm:text-sm">
                  <span className="hidden items-center gap-2 lg:flex">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-current" />
                    1-800-123-4567
                  </span>
                  <Button
                    href="/booking"
                    size="md"
                    variant="outline"
                    className="h-9 rounded-full border-white/35 px-4 text-[0.6rem] uppercase tracking-[0.18em] text-white hover:border-white sm:h-10 sm:px-7 sm:text-[0.65rem] sm:tracking-[0.2em]"
                  >
                    <span className="sm:hidden">Book</span>
                    <span className="hidden sm:inline">Book your stay</span>
                  </Button>
                </div>
              </Container>
            </div>
            <Container className="relative z-10 grid min-h-[calc(100vh-5rem)] gap-8 py-12 sm:min-h-[calc(100vh-6rem)] sm:py-16 lg:grid-cols-[2fr_1fr_1fr]">
              <div className="space-y-1.5 text-[1.75rem] font-serif leading-[1.14] md:text-[2rem] lg:text-[2.3rem]">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-white/95 transition hover:text-white"
                    onMouseEnter={() => setMenuPreview(item.href)}
                    onFocus={() => setMenuPreview(item.href)}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-3 text-base leading-[1.35] md:text-lg">
                  <p>News</p>
                  <p>Promotions & Offer</p>
                  <p>Testimonials</p>
                  <p>Contact</p>
                </div>
              </div>
              <div className="space-y-3 pt-2 text-white/95">
                <p className="font-serif text-[1.95rem] leading-tight md:text-[2.25rem]">Contact Info</p>
                <p className="text-lg leading-tight md:text-xl">54 Longbranch Ave.</p>
                <p className="text-lg leading-tight md:text-xl">Brandon, FL 33510</p>
              </div>
              <div className="space-y-3 pt-2 text-white/95">
                <p className="font-serif text-[1.95rem] leading-tight md:text-[2.25rem]">Reservations</p>
                <p className="text-lg leading-tight md:text-xl">1-800-123-4567</p>
                <p className="text-lg leading-tight md:text-xl">reservations@example.com</p>
              </div>
            </Container>
          </div>,
          document.body,
        )}
    </header>
  );
}
