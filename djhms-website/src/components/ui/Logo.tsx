import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/data/site';
import styles from './Logo.module.scss';

export function Logo({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  return (
    <Link href="/" className={`${styles.logo} ${styles[variant]}`} aria-label={`${site.name} – home`}>
      <div className={styles.imageWrapper}>
        <Image
          src="/logo.png"
          alt={site.name}
          width={72}
          height={72}
          priority
          className={styles.image}
        />
      </div>
      <span className={styles.text}>
        <span className={styles.name}>Diamond Jubilee</span>
        <span className={styles.sub}>Hotel Management Services</span>
        <span className={styles.tag}>Hospitality | Management | Excellence</span>
      </span>
    </Link>
  );
}
