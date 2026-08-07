'use client';

import { useState } from 'react';
import styles from '@/styles/LeadMagnet.module.scss';

export default function LeadMagnet() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setDone(true);
  };

  return (
    <section className={styles.banner} aria-labelledby="lead-magnet-heading">
      <div className="container">
        <div className={styles.inner} data-reveal>
          <div>
            <h2 className={styles.title}>Planning a Wedding or Corporate Event in 2026?</h2>
            <p className={styles.text}>
              Get our complete venue setup guide, menu options, and pricing brochure sent directly to your WhatsApp
              or Email.
            </p>
          </div>
          <button type="button" className="btn btn-light" onClick={() => setOpen(true)}>
            <iconify-icon icon="solar:document-text-bold" aria-hidden="true" />
            Download Event Package Guide (PDF)
          </button>
        </div>
      </div>

      {open && (
        <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Download event guide">
          <div className={styles.modalCard}>
            <button
              type="button"
              className={styles.close}
              aria-label="Close"
              onClick={() => {
                setOpen(false);
                setDone(false);
              }}
            >
              <iconify-icon icon="solar:close-circle-bold" width="24" aria-hidden="true" />
            </button>
            {done ? (
              <div className={styles.success}>
                <iconify-icon icon="solar:check-circle-bold" width="40" aria-hidden="true" />
                <h3 className={styles.successTitle}>Guide on its way!</h3>
                <p className={styles.successText}>
                  Thank you, {name.split(' ')[0]}. We&apos;ve queued the 2026 Wedding & Event Planning Brochure to
                  your WhatsApp.
                </p>
                <button type="button" className="btn btn-primary" onClick={() => setOpen(false)}>
                  Done
                </button>
              </div>
            ) : (
              <>
                <h3 className={styles.modalTitle}>Get the 2026 Brochure</h3>
                <p className={styles.modalText}>Name, phone, and event date is all we need.</p>
                <form className={styles.form} onSubmit={handleSubmit}>
                  <label className={styles.label}>
                    Name
                    <input
                      className={styles.input}
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                  <label className={styles.label}>
                    Phone Number
                    <input
                      className={styles.input}
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </label>
                  <label className={styles.label}>
                    Event Date
                    <input
                      className={styles.input}
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                    />
                  </label>
                  <button type="submit" className="btn btn-primary btn-block">
                    Send Me the Guide
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
