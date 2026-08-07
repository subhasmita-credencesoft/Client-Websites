import styles from '@/styles/FloatingContact.module.scss';
import { SITE } from '@/data/site';

export default function FloatingContact() {
  return (
    <div className={styles.stack} aria-label="Quick contact">
      <a
        className={`${styles.button} ${styles.call}`}
        href={`tel:+${SITE.phoneReservationsRaw}`}
        aria-label={`Call ${SITE.phoneReservations}`}
      >
        <iconify-icon icon="solar:phone-calling-rounded-bold" width="22" aria-hidden="true" />
      </a>
      <a
        className={`${styles.button} ${styles.whatsapp}`}
        href={`https://wa.me/${SITE.whatsappRaw}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        <iconify-icon icon="simple-icons:whatsapp" width="24" aria-hidden="true" />
      </a>
    </div>
  );
}
