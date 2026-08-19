'use client';

import { FormEvent, useState } from 'react';
import { CONTACT_DETAILS, CONTACT_INTRO, SITE } from '@/data/site';
import { TextField } from '@/components/ui/TextField';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import styles from './ContactSection.module.scss';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const DETAIL_ICONS: Record<string, string> = {
  '24 X 7 FRONT DESK': 'bell',
  ADDRESS: 'location',
  'E-Mail': 'email',
};

/**
 * ContactSection — matches the source site's cream panel, icon-led contact
 * details, and accessible form. The submission is simulated (see `handleSubmit`);
 * wire it to a real endpoint before launch.
 */
export function ContactSection() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | undefined>();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();

    if (!name || !email) {
      setStatus('error');
      setError('Enter your name and email so we can reply.');
      return;
    }

    setStatus('submitting');
    setError(undefined);

    try {
      // Replace with the real submission endpoint.
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
      setError('Something went wrong sending your message. Please try again.');
    }
  }

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-heading">
      <div className={styles.media} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.panel}>
          <Reveal className={styles.panelHeader}>
            <h2 id="contact-heading" className={styles.heading}>
              Get In Touch
            </h2>
          </Reveal>

          <div className={styles.grid}>
            <div className={styles.info}>
              <div className={styles.infoHeader}>
                <p className={styles.subtitle}>{SITE.name}</p>
                <h3 className={styles.infoHeading}>
                  Know more about
                  <br /> our hotel
                </h3>
              </div>

              <dl className={styles.detailList}>
                {CONTACT_DETAILS.map((detail) => (
                  <div key={detail.label} className={styles.detailRow}>
                    <dt className={styles.detailLabel}>
                      <Icon name={DETAIL_ICONS[detail.label] ?? 'bell'} size={18} className={styles.detailIcon} />
                      {detail.label}
                    </dt>
                    <dd className={styles.detailValue}>
                      {detail.href ? <a href={detail.href}>{detail.value}</a> : detail.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className={styles.intro}>{CONTACT_INTRO}</p>
            </div>

            <div className={styles.formWrap}>
              <div className={styles.formHeader}>
                <p className={styles.subtitle}>{SITE.name}</p>
                <h3 className={styles.infoHeading}>How to Contact Us</h3>
              </div>

              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.formRow}>
                  <TextField className={styles.inline} label="Full name" name="name" required placeholder="Full Name :" />
                  <TextField className={styles.inline} label="Email" name="email" type="email" required placeholder="Email :" />
                </div>

                <TextField label="Phone" name="phone" type="tel" placeholder="Phone :" />
                <TextField label="Message" name="message" multiline required placeholder="Your Message :" />

                <div aria-live="polite" className={styles.statusRegion}>
                  {status === 'error' && error && (
                    <p className={styles.statusError} role="alert">
                      {error}
                    </p>
                  )}
                  {status === 'success' && (
                    <p className={styles.statusSuccess}>Thank you for your message. We will reply within 24 hours.</p>
                  )}
                </div>

                <Button type="submit" variant="primary" loading={status === 'submitting'} fullWidth className={styles.submit}>
                  {status === 'submitting' ? 'Sending…' : 'Submit'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
