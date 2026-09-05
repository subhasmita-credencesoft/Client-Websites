import { SITE } from '@/data/site';
import { Icon } from '@/components/ui/Icon';
import styles from './FloatingActions.module.scss';

/**
 * FloatingActions
 * Right-edge stacked contact hand-offs: circular call/email buttons with a
 * branded gradient and an official-green WhatsApp button at the bottom.
 * Each shows a hover label and lifts with a gold glow.
 */
export function FloatingActions() {
  return (
    <div className={styles.stack}>
      <a
        href={SITE.phones[0]?.href}
        rel="noopener noreferrer"
        className={`${styles.action} ${styles.call}`}
        data-label="Call Us"
        aria-label={`Call ${SITE.name}`}
      >
        <Icon name="phone" size={20} />
      </a>
      <a
        href={SITE.emails[0]?.href}
        rel="noopener noreferrer"
        className={`${styles.action} ${styles.email}`}
        data-label="Email Us"
        aria-label={`Email ${SITE.name}`}
      >
        <Icon name="email" size={20} />
      </a>
      <a
        href={SITE.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.action} ${styles.whatsapp}`}
        data-label="Chat on WhatsApp"
        aria-label={`Chat with ${SITE.name} on WhatsApp`}
      >
        <Icon name="whatsapp" size={22} />
      </a>
    </div>
  );
}