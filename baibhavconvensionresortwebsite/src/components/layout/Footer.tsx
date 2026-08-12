import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '@/styles/Footer.module.scss';
import { SITE } from '@/data/site';

const QUICK_LINKS = [
  { label: 'Premium Room', href: '/stay/premium-room' },
  { label: 'Deluxe Room', href: '/stay/deluxe-room' },
  { label: 'Venues & Capacity', href: '/events/venues' },
  { label: 'Dining & Catering', href: '/dining' },
  { label: 'Offers & Packages', href: '/offers' },
];

const EVENT_LINKS = [
  { label: 'Weddings & Social', href: '/events/weddings' },
  { label: 'Corporate & MICE', href: '/events/corporate' },
  { label: 'Wedding Venue, Phulnakhara', href: '/events/weddings' },
  { label: 'Conference Hall, Cuttack–Bhubaneswar', href: '/events/corporate' },
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
      <div className="container">
        <div className={styles.ctaBand} data-reveal>
          <div>
            <p className={styles.ctaEyebrow}>Plan your visit</p>
            <p className={styles.ctaTitle}>Ready to book your stay or plan a grand celebration?</p>
          </div>
          <div className={styles.ctaActions}>
            <a
              href={SITE.bookingEngine}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Book a Room
            </a>
            <Link href="/contact" className="btn btn-light">
              Plan an Event
            </Link>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo} aria-label={`${SITE.name} home`}>
              <Image
                src="/images/baibhablogo-sm.webp"
                alt=""
                width={264}
                height={176}
                className={styles.logoImg}
              />
            </Link>
            <p className={styles.tagline}>{SITE.description}</p>
            <div className={styles.contacts}>
              <a href={`tel:+${SITE.phoneReservationsRaw}`} className={styles.contactRow}>
                <iconify-icon icon="solar:phone-bold" width="18" aria-hidden="true" />
                <span>{SITE.phoneReservations}</span>
              </a>
              <a href={`mailto:${SITE.emailGeneral}`} className={styles.contactRow}>
                <iconify-icon icon="solar:letter-bold" width="18" aria-hidden="true" />
                <span>{SITE.emailGeneral}</span>
              </a>
              <span className={styles.contactRow}>
                <iconify-icon icon="solar:map-point-bold" width="18" aria-hidden="true" />
                <span>{SITE.address}</span>
              </span>
            </div>
            <div className={styles.social}>
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={styles.socialLink}
              >
                <iconify-icon icon="simple-icons:facebook" width="18" aria-hidden="true" />
              </a>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={styles.socialLink}
              >
                <iconify-icon icon="simple-icons:instagram" width="18" aria-hidden="true" />
              </a>
              <a
                href={`https://wa.me/${SITE.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className={styles.socialLink}
              >
                <iconify-icon icon="simple-icons:whatsapp" width="18" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className={styles.col}>
            <p className={styles.columnTitle}>Quick Links</p>
            <div className={styles.titleLine} aria-hidden="true" />
            {QUICK_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className={styles.columnLink}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className={styles.col}>
            <p className={styles.columnTitle}>Event Focus</p>
            <div className={styles.titleLine} aria-hidden="true" />
            {EVENT_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className={styles.columnLink}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className={styles.col}>
            <p className={styles.columnTitle}>Get in Touch</p>
            <div className={styles.titleLine} aria-hidden="true" />
            <p className={styles.introText}>
              Chat with our team directly for bookings, queries, and tailored event plans.
            </p>
            <a
              className={styles.whatsapp}
              href={`https://wa.me/${SITE.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <iconify-icon icon="simple-icons:whatsapp" width="18" aria-hidden="true" />
              WhatsApp Us
            </a>
            <Link
              href="/contact?inquiry=Banquets+%2F+Events"
              className={styles.enquiryLink}
            >
              Send an Event Inquiry
            </Link>
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
      </div>
    </footer>
  );
}
