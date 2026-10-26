import { site } from '@/data/site';
import { ContactForm } from '@/components/forms/ContactForm';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import styles from './Contact.module.scss';

export function Contact() {
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <Container className={styles.grid}>
        <Reveal className={styles.info}>
          <p className={styles.eyebrow}>Get in Touch</p>
          <h2 id="contact-title">Contact Us</h2>
          <p className={styles.lead}>We are here to help. Send us your enquiry and we will get back to you shortly.</p>
          <ul>
            <li>
              <Icon name="pin" size={20} />
              <address>
                {site.address.lines.map((l) => (
                  <span key={l}>
                    {l}
                    <br />
                  </span>
                ))}
              </address>
            </li>
            <li>
              <Icon name="phone" size={20} />
              <a href={`tel:${site.phone.href}`}>{site.phone.display}</a>
            </li>
            <li>
              <Icon name="mail" size={20} />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <Icon name="globe" size={20} />
              <a href={site.hotelWebsite} target="_blank" rel="noopener noreferrer">
                www.hotelmaharana.com
                <small>(Hotel Maharana Inn)</small>
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={120} className={styles.form}>
          <h3>Send Us an Enquiry</h3>
          <ContactForm />
        </Reveal>

        <Reveal variant="right" delay={240} className={styles.map}>
          <iframe
            title="Map showing our office location in Sakinaka, Mumbai"
            src={site.mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <Button href={site.mapsLink} external variant="navy">
            View on Google Maps
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
