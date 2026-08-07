'use client';

import { useState } from 'react';
import styles from '@/styles/Forms.module.scss';

interface ContactFormProps {
  initialInquiry?: string;
}

const INQUIRY_TYPES = ['Rooms', 'Banquets / Events', 'Group', 'General'];

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm({ initialInquiry = '' }: ContactFormProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [inquiry, setInquiry] = useState(initialInquiry);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please provide your name.');
      setStatus('error');
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setError('Please provide a valid phone number (at least 8 digits).');
      setStatus('error');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address.');
      setStatus('error');
      return;
    }
    if (!inquiry) {
      setError('Please select an inquiry type.');
      setStatus('error');
      return;
    }
    if (!message.trim()) {
      setError('Please enter your message.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
    }, 400);
  };

  if (status === 'success') {
    return (
      <div className={styles.success} role="status">
        <iconify-icon icon="solar:check-circle-bold" width="40" aria-hidden="true" />
        <h3 className={styles.successTitle}>Message Sent!</h3>
        <p className={styles.successText}>
          Thank you, {name}. Our team will review your inquiry and contact you shortly.
        </p>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => {
            setStatus('idle');
            setName('');
            setPhone('');
            setEmail('');
            setMessage('');
          }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} data-reveal>
      {status === 'error' && error && (
        <div className={styles.inlineError} role="alert">
          <iconify-icon icon="solar:shield-warning-bold" width="20" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      <div className={styles.row}>
        <label className={styles.label}>
          <span>
            Name <span className={styles.requiredStar}>*</span>
          </span>
          <input
            className={styles.input}
            type="text"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            maxLength={120}
          />
        </label>
        <label className={styles.label}>
          <span>
            Phone <span className={styles.requiredStar}>*</span>
          </span>
          <input
            className={styles.input}
            type="tel"
            name="phone"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 XXXXX XXXXX"
            pattern="\+?[0-9][0-9\s-]{7,19}"
            title="Enter a valid phone number"
          />
        </label>
      </div>

      <label className={styles.label}>
        <span>
          Email <span className={styles.requiredStar}>*</span>
        </span>
        <input
          className={styles.input}
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          maxLength={254}
        />
      </label>

      <label className={styles.label}>
        <span>
          Inquiry Type <span className={styles.requiredStar}>*</span>
        </span>
        <select
          className={styles.input}
          name="inquiry"
          required
          value={inquiry}
          onChange={(e) => setInquiry(e.target.value)}
        >
          <option value="" disabled>
            Select inquiry type
          </option>
          {INQUIRY_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.label}>
        <span>
          Message <span className={styles.requiredStar}>*</span>
        </span>
        <textarea
          className={styles.textarea}
          name="message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can we help?"
          maxLength={2000}
        />
      </label>

      <button type="submit" className="btn btn-primary btn-block" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
