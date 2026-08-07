import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '@/styles/Footer.module.scss';
import { SITE } from '@/data/site';

const QUICK_LINKS = [
  { label: 'Premium Room', href: '/stay/premium-room' },
  { label: 'Suite Room', href: '/stay/suite-room' },
  { label: 'Venues & Capacity', href: '/events/venues' },
  { label: 'Dining & Catering', href: '/dining' },
  { label: 'Offers & Packages', href: '/offers' },
];

const EVENT_LINKS = [
  { label: 'Weddings & Social', href: '/events/weddings' },
  { label: 'Corporate & MICE', href: '/events/corporate' },
  { label: 'Wedding Venue, Phulnakhara', href: '/events/weddings' },
  { label: 'Conference Hall, Cuttack\u2013Bhubaneswar', href: '/events/corporate' },
  { label: 'Event Inquiry', href: '/contact?inquiry=Banquets+%2F+Events' },
];

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <Link href="/" className={styles.logo} aria-label={`${SITE.name} home`}>
            <Image
              src="/images/baibhablogo.webp"
              alt=""
              width={1560}
              height={878}
              className={styles.logoImg}
            />
          </Link>
          <p className={styles.tagline}>{SITE.description}</p>
          <p className={styles.address}>{SITE.address}</p>
          <a href={`tel:+${SITE.phoneReservationsRaw}`} className={styles.contactLink}>
            {SITE.phoneReservations}
          </a>
          <a href={`mailto:${SITE.emailGeneral}`} className={styles.contactLink}>
            {SITE.emailGeneral}
          </a>
          <div className={styles.social}>
            <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.socialLink}>
              <iconify-icon icon="simple-icons:facebook" width="18" aria-hidden="true" />
            </a>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialLink}>
              <iconify-icon icon="simple-icons:instagram" width="18" aria-hidden="true" />
            </a>
            <a href="#" aria-label="YouTube" className={styles.socialLink}>
              <iconify-icon icon="simple-icons:youtube" width="18" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div>
          <p className={styles.columnTitle}>Quick Links</p>
          {QUICK_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className={styles.columnLink}>
              {link.label}
            </Link>
          ))}
        </div>

        <div>
          <p className={styles.columnTitle}>Event Focus</p>
          {EVENT_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className={styles.columnLink}>
              {link.label}
            </Link>
          ))}
        </div>

        <div>
          <p className={styles.columnTitle}>Stay in the Loop</p>
          <a
            className={styles.whatsapp}
            href={`https://wa.me/${SITE.whatsappRaw}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <iconify-icon icon="simple-icons:whatsapp" width="18" aria-hidden="true" />
            Chat with us on WhatsApp
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>
          &copy; {mounted ? year : '2024'} {SITE.legalName}. All rights reserved.
        </span>
        <div className={styles.legal}>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms & Conditions</Link>
          <Link href="/cancellation-policy">Cancellation & Refund</Link>
          <Link href="/sitemap">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
