'use client';

import { useState, type FormEvent } from 'react';
import { careers } from '@/data/site';
import { Button } from '@/components/ui/Button';
import { Field } from './Field';
import styles from './Form.module.scss';

export function CareerForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const position = String(formData.get('position') ?? '').trim();

    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = 'Please enter your full name.';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Please enter a valid email address.';
    if (!phone) newErrors.phone = 'Please enter your mobile number.';
    if (!position) newErrors.position = 'Please select a position.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus('error');
      setMessage('Please fill in all required fields.');
      return;
    }

    setErrors({});
    setStatus('success');
    setMessage('Opening your email app to send your application to info@djhms.in. Please attach your CV / Resume to the email.');

    const subject = `[DJHMS Careers] Application for ${position} – ${name}`;
    const body = `Dear DJHMS HR & Recruitment Team,\n\nI would like to apply for the position of ${position} at DJHMS.\n\nApplicant Details:\n• Full Name: ${name}\n• Email: ${email}\n• Mobile Number: ${phone}\n• Position Applied For: ${position}\n\n(Please find my CV / Resume attached to this email)\n\nThank you,\n${name}\n\n-------------------------\nSent via DJHMS Website (https://djhms.in)`;

    const mailtoUrl = `mailto:info@djhms.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;

    form.reset();
  }

  const invalid = (k: string) => (errors[k] ? true : undefined);

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate aria-label="Job application form">
      <div className={styles.row}>
        <Field id="a-name" label="Full Name" required error={errors.name}>
          <input id="a-name" name="name" type="text" placeholder="Enter your name" autoComplete="name" required aria-invalid={invalid('name')} />
        </Field>
        <Field id="a-email" label="Email Address" required error={errors.email}>
          <input id="a-email" name="email" type="email" placeholder="Enter your email" autoComplete="email" required aria-invalid={invalid('email')} />
        </Field>
      </div>
      <div className={styles.row}>
        <Field id="a-phone" label="Mobile Number" required error={errors.phone}>
          <input id="a-phone" name="phone" type="tel" placeholder="Enter your phone number" autoComplete="tel" required aria-invalid={invalid('phone')} />
        </Field>
        <Field id="a-position" label="Position Interested In" required error={errors.position}>
          <select id="a-position" name="position" defaultValue="" required aria-invalid={invalid('position')}>
            <option value="" disabled>
              Select position
            </option>
            {careers.positions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field id="a-resume" label="Attach CV / Resume" error={errors.resume}>
        <div className={styles.hint} style={{ padding: '0.5rem 0' }}>
          When you click &ldquo;Send Application&rdquo;, your email app will open addressed to <strong>info@djhms.in</strong>. Please attach your CV / Resume (PDF, DOC or DOCX) to the email before sending.
        </div>
      </Field>
      <Button type="submit">
        Send Application
      </Button>
      <div aria-live="polite">
        {message && <p className={`${styles.status} ${status === 'success' ? styles.ok : styles.fail}`}>{message}</p>}
      </div>
    </form>
  );
}
