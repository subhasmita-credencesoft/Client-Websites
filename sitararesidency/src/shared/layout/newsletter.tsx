'use client';

import { useState, type FormEvent } from 'react';

import { ArrowRight } from 'lucide-react';

export function Newsletter({ compact = false }: { compact?: boolean }) {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };
  if (sent)
    return (
      <p
        data-testid="status-newsletter-success"
        className="mt-5 text-sm text-clay"
      >
        You’re on the list. See you at the hotel.
      </p>
    );
  return (
    <form
      onSubmit={submit}
      className={`mt-5 flex ${
        compact ? 'flex-col gap-2' : 'max-w-xl gap-2 sm:flex-row'
      }`}
    >
      <label className="sr-only" htmlFor={`newsletter-${compact ? 'footer' : 'page'}`}>
        Email address
      </label>
      <input
        id={`newsletter-${compact ? 'footer' : 'page'}`}
        required
        type="email"
        placeholder="Your email address"
        data-testid={`input-newsletter-${compact ? 'footer' : 'page'}`}
        className="min-w-0 flex-1 border border-parchment/25 bg-transparent px-3 py-3 text-base text-cream placeholder:text-parchment/50 sm:text-sm"
      />
      <button
        type="submit"
        data-testid={`button-newsletter-${compact ? 'footer' : 'page'}`}
        className="flex items-center justify-center gap-2 bg-terracotta px-4 py-3 text-[10px] font-mono-label text-cream"
      >
        Join us
        <ArrowRight className="h-3 w-3" />
      </button>
    </form>
  );
}