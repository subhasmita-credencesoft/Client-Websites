'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navigation } from '@/data/site';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { MobileNavigation } from './MobileNavigation';
import styles from './Header.module.scss';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const active = navigation.find((n) => (n.href === '/' ? pathname === '/' : pathname.startsWith(n.href)))?.id ?? '';

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 40);
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.progress} style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <Container className={styles.inner}>
        <Logo />
        <nav aria-label="Primary" className={styles.nav}>
          <ul>
            {navigation.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className={`${styles.link} ${active === item.id ? styles.active : ''}`} aria-current={active === item.id ? 'page' : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          className={styles.toggle}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </Container>
      <MobileNavigation open={open} active={active} onClose={() => setOpen(false)} />
    </header>
  );
}
