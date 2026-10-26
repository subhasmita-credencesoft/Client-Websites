import { site } from '@/data/site';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
// import { SocialIcons } from '@/components/ui/SocialIcons';
import styles from './TopBar.module.scss';

export function TopBar() {
  return (
    <div className={styles.bar}>
      <Container className={styles.inner}>
        <ul className={styles.contacts}>
          <li>
            <a href={`tel:${site.phone.href}`}>
              <Icon name="phone" size={14} />
              {site.phone.display}
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`}>
              <Icon name="mail" size={14} />
              {site.email}
            </a>
          </li>
          <li className={styles.location}>
            <Icon name="pin" size={14} />
            {site.address.short}
          </li>
        </ul>
        {/* <SocialIcons /> */}
      </Container>
    </div>
  );
}
