import { site } from "@/data/site";
import styles from "./WhatsAppFloat.module.scss";

export function WhatsAppFloat() {
  return (
    <a
      className={styles.button}
      href={site.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${site.name} on WhatsApp`}
      title="Chat on WhatsApp"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path d="M16 3.25a12.4 12.4 0 0 0-10.6 18.84L4 28l6.08-1.59A12.4 12.4 0 1 0 16 3.25Z" />
        <path d="M12.1 10.2c-.3-.7-.62-.72-.91-.73h-.78c-.27 0-.7.1-1.06.5-.37.4-1.4 1.36-1.4 3.32 0 1.95 1.43 3.84 1.63 4.1.2.27 2.76 4.42 6.82 6.02 3.38 1.33 4.07 1.07 4.8 1 .73-.08 2.36-.96 2.7-1.89.34-.93.34-1.72.24-1.89-.1-.16-.37-.26-.77-.46-.4-.2-2.36-1.17-2.73-1.3-.36-.13-.63-.2-.9.2-.27.4-1.03 1.3-1.26 1.57-.23.27-.47.3-.87.1-.4-.2-1.68-.62-3.2-1.97-1.18-1.05-1.98-2.35-2.21-2.75-.23-.4-.03-.62.17-.82.18-.18.4-.47.6-.7.2-.24.26-.4.4-.67.13-.27.06-.5-.04-.7-.1-.2-.88-2.17-1.23-2.93Z" />
      </svg>
    </a>
  );
}
