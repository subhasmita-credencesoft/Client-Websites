"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { buttonClass } from "@/components/ui/Button";
import { heroRoutes, primaryNav, secondaryNav } from "@/data/navigation";
import { site } from "@/data/site";
import styles from "./Header.module.scss";

export function Header() {
  const rawPath = usePathname();
  const pathname = rawPath.length > 1 ? rawPath.replace(/\/$/, "") : rawPath; // static export uses trailing slashes
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const overHero = heroRoutes.includes(pathname) && !scrolled;
  const isClear = overHero && !open;
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Drawer: lock scroll, trap focus, close on Escape, restore focus.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(drawerRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);

    const items = focusables();
    items[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab") {
        const f = focusables();
        const first = f[0];
        const last = f[f.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      toggleRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <header className={[styles.header, isClear ? styles.clear : styles.solid].join(" ")}>
        <div className={styles.bar}>
          <Logo inverse={isClear} />

          <nav aria-label="Primary" className={styles.desktop}>
            <ul>
              {primaryNav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className={styles.link} aria-current={isActive(n.href) ? "page" : undefined}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass({ variant: isClear ? "light" : "primary", className: styles.cta })}
            >
              <span>Book a Stay</span>
            </a>
            <button
              ref={toggleRef}
              type="button"
              className={styles.toggle}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <Menu size={26} strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      {/* Render Mobile Navigation Drawer into document.body to avoid backdrop-filter/fixed container clipping */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                id="mobile-menu"
                ref={drawerRef}
                role="dialog"
                aria-modal="true"
                aria-label="Site navigation"
                className={styles.drawer}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.drawerBar}>
                  <Logo onClick={() => setOpen(false)} />
                  <button
                    type="button"
                    className={styles.drawerClose}
                    aria-label="Close menu"
                    onClick={() => setOpen(false)}
                  >
                    <X size={26} strokeWidth={2} />
                  </button>
                </div>

                <div className={styles.drawerBody}>
                  <nav aria-label="Mobile navigation" className={styles.drawerNav}>
                    <ul className={styles.drawerList}>
                      {primaryNav.map((n, i) => (
                        <motion.li
                          key={n.href}
                          initial={reduce ? false : { opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.04 + i * 0.03, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <Link
                            href={n.href}
                            onClick={() => setOpen(false)}
                            className={[styles.drawerLink, isActive(n.href) ? styles.active : ""].join(" ")}
                            aria-current={isActive(n.href) ? "page" : undefined}
                          >
                            {n.label}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </nav>

                  <div className={styles.drawerSecondary}>
                    <p className={styles.drawerSectionLabel}>Explore & Info</p>
                    <ul className={styles.drawerSublist}>
                      {secondaryNav.map((n) => (
                        <li key={n.href}>
                          <Link
                            href={n.href}
                            onClick={() => setOpen(false)}
                            className={[styles.drawerSublink, isActive(n.href) ? styles.active : ""].join(" ")}
                            aria-current={isActive(n.href) ? "page" : undefined}
                          >
                            {n.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.drawerFooter}>
                    <a
                      href={site.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className={buttonClass({ variant: "primary", size: "lg", className: styles.drawerCta })}
                    >
                      <span>Book a Stay</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
