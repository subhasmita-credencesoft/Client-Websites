import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/Navbar.module.scss';
import { NAV_LINKS } from '@/data/navigation';
import { SITE } from '@/data/site';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.nav} ${mounted && scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label={`${SITE.name} home`}>
          <Image
            src="/images/baibhablogo-sm.webp"
            alt=""
            width={264}
            height={176}
            priority
            className={styles.logoImg}
          />
        </Link>

        <nav className={styles.links} aria-label="Primary">
          {NAV_LINKS.map((item) => (
            <div key={item.label} className={styles.linkItem}>
              <Link href={item.href} className={styles.link}>
                {item.label}
                {item.children && (
                  <iconify-icon icon="solar:alt-arrow-down-linear" className={styles.chevron} aria-hidden="true" />
                )}
              </Link>
              {item.children && (
                <div className={styles.dropdown}>
                  {item.children.map((child) => (
                    <Link key={child.label} href={child.href} className={styles.dropdownItem}>
                      <span className={styles.dropdownLabel}>{child.label}</span>
                      {child.description && (
                        <span className={styles.dropdownDescription}>{child.description}</span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className={styles.actions}>
          <a href={`tel:+${SITE.phoneReservationsRaw}`} className={styles.iconButton} aria-label={`Call ${SITE.phoneReservations}`}>
            <iconify-icon icon="solar:phone-calling-rounded-bold" width="20" aria-hidden="true" />
          </a>
          <a
            href={SITE.bookingEngine}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.ctaPrimary} ${styles.desktopCta}`}
          >
            Book a Stay
          </a>
          <button
            type="button"
            className={`${styles.iconButton} ${styles.menuButton}`}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <iconify-icon icon="solar:hamburger-menu-linear" width="20" aria-hidden="true" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className={styles.mobileMenu} id="mobile-menu">
          <nav aria-label="Mobile">
            {NAV_LINKS.map((item) => (
              <div key={item.label} className={styles.mobileGroup}>
                <Link href={item.href} className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
                {item.children && (
                  <div className={styles.mobileChildren}>
                    {item.children.map((child) => (
                      <Link key={child.label} href={child.href} className={styles.mobileChild} onClick={() => setMobileOpen(false)}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className={styles.mobileCtas}>
            <a
              href={SITE.bookingEngine}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaPrimary}
              onClick={() => setMobileOpen(false)}
            >
              Book a Stay
            </a>
            <Link href="/contact?inquiry=Banquets+%2F+Events" className={styles.ctaOutline} onClick={() => setMobileOpen(false)}>
              Plan an Event
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
