import Link from 'next/link';
import { navigation, site } from '@/data/site';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
// import { SocialIcons } from '@/components/ui/SocialIcons';
import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <Logo variant="light" />
          <nav aria-label="Footer">
            <ul className={styles.links}>
              {navigation.map((n) => (
                <li key={n.id}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          {/* <SocialIcons className={styles.social} /> */}
        </div>
        <div className={styles.bottom}>
          <ul className={styles.legal}>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms of Use</Link>
            </li>
            <li>
              <Link href="/cookies">Cookie Policy</Link>
            </li>
          </ul>
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
