import { site } from '@/data/site';
import styles from './SocialIcons.module.scss';

const paths: Record<string, string> = {
  Facebook: 'M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H7.9v3h2.6V21h3z',
  LinkedIn:
    'M6.9 9.5H4v10h2.9v-10zM5.4 4.5a1.7 1.7 0 100 3.4 1.7 1.7 0 000-3.4zM20 14.1c0-2.7-1.4-4.8-3.9-4.8-1.2 0-2.1.6-2.6 1.4V9.5h-2.8v10h2.9v-5.2c0-1.4.5-2.4 1.8-2.4 1.2 0 1.7.9 1.7 2.4v5.2H20v-5.4z',
  Instagram:
    'M12 7.2A4.8 4.8 0 1016.8 12 4.8 4.8 0 0012 7.2zm0 7.9a3.1 3.1 0 113.1-3.1 3.1 3.1 0 01-3.1 3.1zM17.1 5.9a1.1 1.1 0 101.1 1.1 1.1 1.1 0 00-1.1-1.1zM12 3c-2.4 0-2.7 0-3.7.1-2.6.1-4 1.5-4.1 4.1C4.1 8.3 4 8.6 4 12s0 3.7.1 4.7c.1 2.6 1.5 4 4.1 4.1 1 .1 1.3.1 3.8.1s2.7 0 3.7-.1c2.6-.1 4-1.5 4.1-4.1.1-1 .1-1.3.1-3.7s0-2.7-.1-3.7c-.1-2.6-1.5-4-4.1-4.1C14.7 3 14.4 3 12 3zm0 1.6c2.4 0 2.7 0 3.6.1 1.7.1 2.6.9 2.7 2.7.1.9.1 1.2.1 3.6s0 2.7-.1 3.6c-.1 1.7-.9 2.6-2.7 2.7-.9.1-1.2.1-3.6.1s-2.7 0-3.6-.1c-1.8-.1-2.6-1-2.7-2.7-.1-.9-.1-1.2-.1-3.6s0-2.7.1-3.6C5.8 5.3 6.6 4.5 8.4 4.4c.9-.1 1.2-.1 3.6-.1z',
};

export function SocialIcons({ className }: { className?: string }) {
  return (
    <ul className={`${styles.list} ${className ?? ''}`}>
      {site.social.map((s) => (
        <li key={s.label}>
          <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className={styles.link}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d={paths[s.label]} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
