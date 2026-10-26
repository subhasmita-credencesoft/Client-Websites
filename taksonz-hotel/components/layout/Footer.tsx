import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { footerGroups, legalNav } from "@/data/navigation";
import { addressLine, site } from "@/data/site";
import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Logo inverse large />
          <p>A contemporary hotel in the heart of {site.address.city}, offering comfortable rooms, dining and event spaces.</p>
        </div>

        {footerGroups.map((g) => (
          <nav key={g.title} aria-label={g.title} className={styles.col}>
            <h2 className={styles.h}>{g.title}</h2>
            <ul>
              {g.links.map((l) => (
                <li key={l.href}>
                  {l.href.startsWith("http") ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
                  ) : (
                    <Link href={l.href}>{l.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className={styles.col}>
          <h2 className={styles.h}>Contact</h2>
          <address>
            <a href={site.phoneHref}>{site.phone}</a>
            <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp: {site.whatsapp}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <span>{addressLine}</span>
          </address>
          {site.social.length > 0 && (
            <ul className={styles.social}>
              {site.social.map((s) => (
                <li key={s.href}><a href={s.href} rel="noopener noreferrer" target="_blank">{s.label}</a></li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={`container ${styles.legal}`}>
        <p className={styles.credit}>
          Designed and Developed By{" "}
          <a href="https://credencesoft.in/" target="_blank" rel="noopener noreferrer">CredenceSoft</a>
          {", "}Powered By{" "}
          <a href="https://bookonepms.com/" target="_blank" rel="noopener noreferrer">BookOne</a>.
        </p>
        <ul>
          {legalNav.map((l) => (
            <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
