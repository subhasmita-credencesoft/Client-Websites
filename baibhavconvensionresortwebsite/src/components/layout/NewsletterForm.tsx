'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/Footer.module.scss';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    timerRef.current = setTimeout(() => {
      setStatus('success');
    }, 300);
  };

  if (status === 'success') {
    return (
      <p className={styles.newsletterSuccess} role="status">
        Thank you &mdash; you&apos;re on the list!
      </p>
    );
  }

  return (
    <form className={styles.newsletter} onSubmit={handleSubmit}>
      {status === 'error' && error && (
        <p className={styles.newsletterError} role="alert">
          {error}
        </p>
      )}
      <input
        type="email"
        name="email"
        required
        maxLength={254}
        className={styles.newsletterInput}
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Email address"
      />
      <button type="submit" className={styles.newsletterButton} disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Subscribing\u2026' : 'Subscribe'}
      </button>
    </form>
  );
}
