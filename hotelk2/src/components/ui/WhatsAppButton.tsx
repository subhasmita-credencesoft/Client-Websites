import Image from 'next/image';
import { SITE } from '@/data/site';
import styles from './WhatsAppButton.module.scss';

/**
 * WhatsAppButton
 * Floating WhatsApp hand-off (matches the source site's `whatsapp_float`).
 * Rendered as an external link (opens in a new tab).
 */
export function WhatsAppButton() {
  return (
    <a
      href={SITE.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.button}
      aria-label="Chat with Hotel K2 on WhatsApp"
    >
      <Image
        src="https://www.hhickp.com/assets/whatsapp.png"
        alt=""
        width={50}
        height={67}
        className={styles.image}
      />
    </a>
  );
}
