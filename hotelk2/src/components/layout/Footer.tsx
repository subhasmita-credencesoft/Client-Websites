import { SITE, SOCIAL_LINKS } from '@/data/site';
import { Icon } from '@/components/ui/Icon';
import styles from './Footer.module.scss';

const USEFUL_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/#about' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Contact Us', href: '/#contact' },
  { label: 'Services', href: '/#services' },
];

const [BRAND_WORD, BRAND_ACCENT] = SITE.name.split(' ');

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.about}>
            <a href="/" className={styles.brand} aria-label={`${SITE.name} home`}>
              <span className={styles.brandText}>{BRAND_WORD}</span>
              <span className={styles.brandTextAccent}>{BRAND_ACCENT}</span>
            </a>
            <p className={styles.aboutText}>{SITE.footerAbout}</p>
            <div className={styles.socialBlock}>
              <h6 className={styles.socialTitle}>Follow Us:</h6>
              <ul className={styles.social}>
                {SOCIAL_LINKS.map((item) => (
                  <li key={item.icon}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={item.label}
                    >
                      <Icon name={item.icon} size={16} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.block}>
            <h5 className={styles.blockTitle}>Useful Links</h5>
            <ul className={styles.links}>
              {USEFUL_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.link}>
                    <Icon name="chevron-right" size={12} className={styles.linkIcon} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.block}>
            <h5 className={styles.blockTitle}>Contact Info</h5>
            <ul className={styles.info}>
              <li className={styles.infoItem}>
                <Icon name="phone" size={16} className={styles.infoIcon} />
                <p>
                  {SITE.phones.map((phone) => (
                    <a key={phone.href} href={phone.href}>
                      {phone.display}
                    </a>
                  ))}
                </p>
              </li>
              <li className={styles.infoItem}>
                <Icon name="email" size={16} className={styles.infoIcon} />
                <p>
                  {SITE.emails.map((email) => (
                    <a key={email.href} href={email.href}>
                      {email.display}
                    </a>
                  ))}
                </p>
              </li>
              <li className={styles.infoItem}>
                <Icon name="location" size={16} className={styles.infoIcon} />
                <p>{SITE.address}</p>
              </li>
            </ul>
          </div>

          <div className={styles.block}>
            <h5 className={styles.blockTitle}>Visit Us</h5>
            <iframe
              src={SITE.mapEmbedSrc}
              title={`Map showing the location of ${SITE.name}, ${SITE.location}`}
              width="100%"
              height="200"
              style={{ border: 0, borderRadius: 6 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className={styles.map}
            />
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        <p className={styles.copyrightText}>
          Designed and Developed By{' '}
          <a
            href="https://www.credencesoft.in/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.copyrightLink}
          >
            CredenceSoft
          </a>
          , Powered By{' '}
          <a
            href="https://bookonepms.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.copyrightLink}
          >
            BookOne
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
