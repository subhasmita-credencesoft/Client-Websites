'use client';

import { useState, type FormEvent } from 'react';
import { enquiryTypes } from '@/data/site';
import { Button } from '@/components/ui/Button';
import { Field } from './Field';
import styles from './Form.module.scss';

export function ContactForm() {
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
    const enquiryType = String(formData.get('enquiryType') ?? '').trim();
    const messageText = String(formData.get('message') ?? '').trim();

    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = 'Please enter your full name.';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Please enter a valid email address.';
    if (!enquiryType) newErrors.enquiryType = 'Please select an enquiry type.';
    if (!messageText) newErrors.message = 'Please enter your message.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus('error');
      setMessage('Please fill in all required fields.');
      return;
    }

    setErrors({});
    setStatus('success');
    setMessage('Opening your email app to send your message directly to info@djhms.in...');

    const subject = `[DJHMS Enquiry] ${enquiryType} - ${name}`;
    const body = `Full Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nEnquiry Type: ${enquiryType}\n\nMessage:\n${messageText}\n\n-------------------------\nSent via DJHMS Website (https://djhms.in)`;

    const mailtoUrl = `mailto:info@djhms.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;

    form.reset();
  }

  const invalid = (k: string) => (errors[k] ? true : undefined);

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate aria-label="Contact enquiry form">
      <div className={styles.row}>
        <Field id="c-name" label="Full Name" required error={errors.name}>
          <input id="c-name" name="name" type="text" autoComplete="name" required aria-invalid={invalid('name')} aria-describedby={errors.name ? 'c-name-error' : undefined} />
        </Field>
        <Field id="c-phone" label="Phone Number" error={errors.phone}>
          <input id="c-phone" name="phone" type="tel" autoComplete="tel" aria-invalid={invalid('phone')} />
        </Field>
      </div>
      <Field id="c-email" label="Email Address" required error={errors.email}>
        <input id="c-email" name="email" type="email" autoComplete="email" required aria-invalid={invalid('email')} />
      </Field>
      <Field id="c-type" label="Enquiry Type" required error={errors.enquiryType}>
        <select id="c-type" name="enquiryType" defaultValue="" required aria-invalid={invalid('enquiryType')}>
          <option value="" disabled>
            Select enquiry type
          </option>
          {enquiryTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>
      <Field id="c-message" label="Message" required error={errors.message}>
        <textarea id="c-message" name="message" placeholder="How can we help you?" required aria-invalid={invalid('message')} />
      </Field>
      <Button type="submit" variant="block">
        Send Message
      </Button>
      <div aria-live="polite">
        {message && <p className={`${styles.status} ${status === 'success' ? styles.ok : styles.fail}`}>{message}</p>}
      </div>
    </form>
  );
}
