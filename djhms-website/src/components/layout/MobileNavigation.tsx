import Link from 'next/link';
import { navigation, site } from '@/data/site';
import { Icon } from '@/components/ui/Icon';
import styles from './MobileNavigation.module.scss';

interface Props {
  open: boolean;
  active: string;
  onClose: () => void;
}

export function MobileNavigation({ open, active, onClose }: Props) {
  return (
    <div id="mobile-nav" className={`${styles.drawer} ${open ? styles.open : ''}`} hidden={!open}>
      <nav aria-label="Mobile">
        <ul>
          {navigation.map((item) => (
            <li key={item.id}>
              <Link href={item.href} onClick={onClose} className={`${styles.link} ${active === item.id ? styles.active : ''}`}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <a href={`tel:${site.phone.href}`} className={styles.call}>
        <Icon name="phone" size={16} /> {site.phone.display}
      </a>
    </div>
  );
}
