'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main>
        <section className="relative flex min-h-[400px] items-center overflow-hidden">
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand-900 to-earth-900" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <h1 className="font-serif text-5xl font-bold text-white sm:text-6xl">Contact Us</h1>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-lg text-earth-100">
              We&apos;d love to hear from you. Get in touch with us.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div className="animate-on-scroll">
              <p className="section-subtitle">Get in Touch</p>
              <h2 className="section-title">Send Us a Message</h2>
              {submitted ? (
                <div className="mt-8 rounded-2xl bg-brand-50 p-8 text-center dark:bg-brand-900/30">
                  <iconify-icon icon="solar:check-circle-bold" width="48" height="48" className="mx-auto text-brand-500"></iconify-icon>
                  <p className="mt-4 font-serif text-xl font-semibold text-earth-900 dark:text-white">Thank You!</p>
                  <p className="mt-2 font-sans text-sm text-earth-600 dark:text-earth-300">
                    Your message has been received. We&apos;ll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div>
                    <label htmlFor="name" className="block font-sans text-sm font-medium text-earth-700 dark:text-earth-200">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-xl border border-earth-200 bg-white px-4 py-3 font-sans text-sm text-earth-900 placeholder-earth-400 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-earth-700 dark:bg-earth-800 dark:text-white"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-sans text-sm font-medium text-earth-700 dark:text-earth-200">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-xl border border-earth-200 bg-white px-4 py-3 font-sans text-sm text-earth-900 placeholder-earth-400 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-earth-700 dark:bg-earth-800 dark:text-white"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block font-sans text-sm font-medium text-earth-700 dark:text-earth-200">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-xl border border-earth-200 bg-white px-4 py-3 font-sans text-sm text-earth-900 placeholder-earth-400 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-earth-700 dark:bg-earth-800 dark:text-white"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block font-sans text-sm font-medium text-earth-700 dark:text-earth-200">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-1 w-full resize-none rounded-xl border border-earth-200 bg-white px-4 py-3 font-sans text-sm text-earth-900 placeholder-earth-400 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-earth-700 dark:bg-earth-800 dark:text-white"
                      placeholder="Tell us about your inquiry..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-full bg-brand-600 px-8 py-3.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            <div className="animate-on-scroll stagger-1 space-y-10">
              <div>
                <p className="section-subtitle">Visit Us</p>
                <h2 className="section-title">Our Location</h2>
              </div>

              <div className="aspect-video w-full overflow-hidden rounded-2xl shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30229.534399614856!2d72.8736!3d18.6495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be87a2f3b0b0b0b%3A0x0!2sAlibaug!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Malhar Baug Resort Location"
                />
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/40">
                    <iconify-icon icon="solar:map-point-bold" width="22" height="22"></iconify-icon>
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-semibold text-earth-900 dark:text-white">Address</h3>
                    <p className="mt-1 font-sans text-sm text-earth-600 dark:text-earth-300">
                      Malhar Baug Resort, Nagaon Beach Road,<br />
                      Alibaug, Maharashtra 402204
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/40">
                    <iconify-icon icon="solar:phone-bold" width="22" height="22"></iconify-icon>
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-semibold text-earth-900 dark:text-white">Phone</h3>
                    <a href="tel:+919876543210" className="mt-1 block font-sans text-sm text-brand-600 hover:underline dark:text-brand-400">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/40">
                    <iconify-icon icon="logos:whatsapp-icon" width="22" height="22"></iconify-icon>
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-semibold text-earth-900 dark:text-white">WhatsApp</h3>
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block font-sans text-sm text-brand-600 hover:underline dark:text-brand-400"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/40">
                    <iconify-icon icon="solar:letter-bold" width="22" height="22"></iconify-icon>
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-semibold text-earth-900 dark:text-white">Email</h3>
                    <a
                      href="mailto:info@malharbaugresort.com"
                      className="mt-1 block font-sans text-sm text-brand-600 hover:underline dark:text-brand-400"
                    >
                      info@malharbaugresort.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/40">
                    <iconify-icon icon="solar:clock-circle-bold" width="22" height="22"></iconify-icon>
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-semibold text-earth-900 dark:text-white">Working Hours</h3>
                    <p className="mt-1 font-sans text-sm text-earth-600 dark:text-earth-300">
                      Front Desk: 24/7<br />
                      Restaurant: 7:00 AM – 11:00 PM<br />
                      Check-in: 12:00 PM | Check-out: 11:00 AM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
