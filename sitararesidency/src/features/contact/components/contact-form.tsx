'use client';

import { useState, type FormEvent } from 'react';

import { ArrowRight, Check, Mail, Phone } from 'lucide-react';
import { business } from '@/core/config/business';
import { contactFormCopy } from '@/features/contact/data/contact';

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };
  return (
    <section className="bg-cream px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto grid max-w-[1100px] gap-14 md:grid-cols-[.65fr_1.35fr]">
        <div className="space-y-7">
          <div>
            <p className="font-mono-label text-[10px] text-terracotta">{contactFormCopy.reservationsLabel}</p>
            <a href={`tel:${business.phones.primary}`} data-testid="link-contact-phone" className="mt-3 flex items-center gap-2 font-display text-2xl sm:text-3xl italic text-forest"><Phone className="h-4 w-4 text-terracotta shrink-0" />{business.phones.primaryDisplay}</a>
          </div>
          <div>
            <p className="font-mono-label text-[10px] text-terracotta">{contactFormCopy.contactLabel}</p>
            <a href={`tel:${business.phones.secondary}`} data-testid="link-contact-mobile" className="mt-3 flex items-center gap-2 font-display text-xl sm:text-2xl italic text-forest"><Phone className="h-4 w-4 text-terracotta shrink-0" />{business.phones.secondaryDisplay}</a>
            <div className="mt-2 flex flex-wrap items-center gap-x-2 text-sm text-sage-muted">
              <span className="font-mono-label text-[9px] uppercase tracking-wider text-terracotta">Landline:</span>
              <a href={`tel:${business.phones.landlinePrimary}`} className="hover:text-forest transition-colors font-medium">{business.phones.landlinePrimaryDisplay}</a>
              <span>/</span>
              <a href={`tel:${business.phones.landlineSecondary}`} className="hover:text-forest transition-colors font-medium">{business.phones.landlineSecondaryDisplay}</a>
            </div>
            <a href={`mailto:${business.email}`} data-testid="link-contact-email" className="mt-3 flex items-center gap-2 font-display text-base sm:text-xl italic text-forest break-all"><Mail className="h-4 w-4 text-terracotta shrink-0" />{business.email}</a>
          </div>
          <div>
            <p className="font-mono-label text-[10px] text-terracotta">Office hours</p>
            <p className="mt-3 text-sm leading-6 text-sage-muted">Our phones are answered 8am–9pm, every day.</p>
          </div>
        </div>
        <div>
          {sent ? (
            <div className="bg-sage p-8">
              <Check className="h-6 w-6 text-terracotta" />
              <h2 className="mt-5 font-display text-4xl italic text-forest">Message received.</h2>
              <p className="mt-3 text-sm leading-6 text-sage-muted">We’ll be back in touch soon, usually before the kettle boils.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-5 border border-forest/15 p-6 md:grid-cols-2 md:p-8">
              <p className="md:col-span-2 font-mono-label text-[10px] text-terracotta">{contactFormCopy.formLabel}</p>
              <label className="text-[10px] font-mono-label">{contactFormCopy.nameLabel}<input required type="text" data-testid="input-contact-name" className="mt-2 block w-full border border-forest/20 bg-transparent px-3 py-3 text-base sm:text-sm" /></label>
              <label className="text-[10px] font-mono-label">{contactFormCopy.emailLabel}<input required type="email" data-testid="input-contact-email" className="mt-2 block w-full border border-forest/20 bg-transparent px-3 py-3 text-base sm:text-sm" /></label>
              <label className="md:col-span-2 text-[10px] font-mono-label">{contactFormCopy.messageLabel}<textarea required rows={5} data-testid="input-contact-message" className="mt-2 block w-full resize-none border border-forest/20 bg-transparent px-3 py-3 text-base sm:text-sm" /></label>
              <button type="submit" data-testid="button-send-contact" className="md:col-span-2 flex items-center justify-center gap-2 bg-forest px-4 py-4 text-[10px] font-mono-label text-cream">{contactFormCopy.submit} <ArrowRight className="h-3 w-3" /></button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}