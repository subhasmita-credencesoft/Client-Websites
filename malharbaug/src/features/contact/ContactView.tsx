'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useContact } from '@/components/providers/PropertyProvider';
import { bookingEngineUrl } from '@/config/booking';

interface FormData {
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  guests: string;
  dates: string;
  message: string;
}

const inquiryTypes = [
  'Room Booking',
  'Private Villa Stay (2BHK / 4BHK)',
  'Family Gathering / Picnic',
  'Corporate Team Offsite',
  'Wedding / Celebration Event',
  'General Inquiry',
];

const travelRoutes = [
  {
    icon: 'solar:ferry-bold',
    title: 'From Mumbai via Mandwa Ro-Ro Ferry',
    time: 'Approx. 1 hr 45 mins total',
    desc: 'Drive your car onto the M2M Ro-Ro Ferry at Bhaucha Dhakka (Mumbai) and reach Mandwa Jetty in 60 minutes. From Mandwa, it is a smooth 45-minute (28 km) drive to Malhar Baug Resort in Nagaon.',
  },
  {
    icon: 'solar:wheel-bold',
    title: 'From Mumbai by Road (NH 66)',
    time: 'Approx. 2.5 to 3 hours (95 km)',
    desc: 'Travel via the Mumbai-Goa Highway (NH 66) through Panvel, Vadkhal Naka, Pen, and Alibaug bypass directly to Nagaon-Palhe road.',
  },
  {
    icon: 'solar:routing-2-bold',
    title: 'From Pune by Road',
    time: 'Approx. 3.5 hours (140 km)',
    desc: 'Take the Mumbai-Pune Expressway to Khopoli exit, proceed via Pen and Wadkhal to Alibaug, and follow the coastal road to Palhe, Nagaon.',
  },
];

export default function ContactView() {
  const contact = useContact();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Room Booking',
    guests: '2 Guests',
    dates: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Malhar Baug Resort! My name is ${formData.name || 'Guest'}.
Phone: ${formData.phone || 'N/A'}
Email: ${formData.email || 'N/A'}
Inquiry Type: ${formData.inquiryType}
Guests: ${formData.guests}
Dates: ${formData.dates || 'Flexible'}
Message: ${formData.message || 'Looking for stay details and best rates.'}`,
  );

  return (
    <>
      <Header />
      <main className="bg-white dark:bg-earth-900">
        {/* Hero Section */}
        <section
          className="relative flex min-h-[460px] sm:min-h-[520px] md:min-h-[580px] w-full items-center justify-center overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24"
          aria-label="Contact Malhar Baug Resort"
        >
          <Image
            src="/aboutimg.jpeg"
            alt="Malhar Baug Resort garden pathway in Nagaon, Alibaug"
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 z-0 object-cover object-center"
          />
          {/* Subtle Dark Gradient Overlay for Readability */}
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/85 via-black/50 to-black/60" />

          <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
              <iconify-icon icon="solar:phone-calling-bold" width="16" height="16" className="text-brand-400"></iconify-icon>
              <span>Reservations &amp; Inquiries • Nagaon, Alibaug</span>
            </div>

            <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white drop-shadow-md">
              Contact Malhar Baug Resort
            </h1>

            <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-earth-100 sm:text-lg">
              Have questions about room availability, private villas, family celebrations, or corporate retreats? Our team is available 24/7 to assist you.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`tel:${contact.phone || '+919035198520'}`}
                className="btn-primary shadow-lg"
              >
                <iconify-icon icon="solar:phone-calling-bold" width="18" height="18"></iconify-icon>
                <span>Call +91 9320062613</span>
              </a>
              <a
                href={`https://wa.me/${contact.whatsapp || '919320062613'}?text=Hi%20Malhar%20Baug%20Resort,%20I%20would%20like%20to%20enquire%20about%20booking%20a%20stay.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/80 bg-emerald-600/60 px-7 py-3.5 font-sans text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-emerald-600 shadow-md"
              >
                <iconify-icon icon="logos:whatsapp-icon" width="18" height="18"></iconify-icon>
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

        {/* 4 Quick Contact Cards */}
        <section className="border-b border-earth-100 bg-earth-50 py-10 dark:border-earth-800 dark:bg-earth-800/40">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Phone */}
              <div className="rounded-2xl bg-white p-6 card-shadow dark:bg-earth-800 border border-earth-100 dark:border-earth-700">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                  <iconify-icon icon="solar:phone-calling-bold" width="24" height="24"></iconify-icon>
                </div>
                <h3 className="font-serif text-lg font-bold text-earth-900 dark:text-white">Direct Phone</h3>
                <p className="mt-1 font-sans text-xs text-earth-500 dark:text-earth-400">24/7 Front Desk &amp; Inquiries</p>
                <a
                  href={`tel:${contact.phone || '+919035198520'}`}
                  className="mt-3 block font-sans text-sm font-bold text-brand-600 hover:underline dark:text-brand-400"
                >
                  {contact.phoneDisplay || '+91 9320062613'}
                </a>
              </div>

              {/* WhatsApp */}
              <div className="rounded-2xl bg-white p-6 card-shadow dark:bg-earth-800 border border-earth-100 dark:border-earth-700">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                  <iconify-icon icon="logos:whatsapp-icon" width="24" height="24"></iconify-icon>
                </div>
                <h3 className="font-serif text-lg font-bold text-earth-900 dark:text-white">WhatsApp Chat</h3>
                <p className="mt-1 font-sans text-xs text-earth-500 dark:text-earth-400">Instant Quotes &amp; Photos</p>
                <a
                  href={`https://wa.me/${contact.whatsapp || '919320062613'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block font-sans text-sm font-bold text-emerald-600 hover:underline dark:text-emerald-400"
                >
                  {contact.whatsappDisplay || '+91 93200 62613'}
                </a>
              </div>

              {/* Email */}
              <div className="rounded-2xl bg-white p-6 card-shadow dark:bg-earth-800 border border-earth-100 dark:border-earth-700">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                  <iconify-icon icon="solar:letter-bold" width="24" height="24"></iconify-icon>
                </div>
                <h3 className="font-serif text-lg font-bold text-earth-900 dark:text-white">Email Us</h3>
                <p className="mt-1 font-sans text-xs text-earth-500 dark:text-earth-400">Official bookings &amp; invoices</p>
                <a
                  href={`mailto:${contact.email || 'bookings@malharbaugresort.com'}`}
                  className="mt-3 block font-sans text-sm font-bold text-brand-600 hover:underline dark:text-brand-400 truncate"
                >
                  {contact.email || 'bookings@malharbaugresort.com'}
                </a>
              </div>

              {/* Location */}
              <div className="rounded-2xl bg-white p-6 card-shadow dark:bg-earth-800 border border-earth-100 dark:border-earth-700">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                  <iconify-icon icon="solar:map-point-wave-bold" width="24" height="24"></iconify-icon>
                </div>
                <h3 className="font-serif text-lg font-bold text-earth-900 dark:text-white">Resort Location</h3>
                <p className="mt-1 font-sans text-xs text-earth-500 dark:text-earth-400">2 km from Nagaon Beach</p>
                <p className="mt-3 font-sans text-xs leading-relaxed text-earth-700 dark:text-earth-300">
                  Palhe, Nagaon, Alibaug, Maharashtra 402204
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main 2-Column Section: Form + Map & Timings */}
        <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left: Interactive Form */}
            <div className="lg:col-span-7">
              <p className="section-subtitle">Send An Inquiry</p>
              <h2 className="section-title">How Can We Help You?</h2>
              <p className="mt-3 font-sans text-base text-earth-600 dark:text-earth-300">
                Fill in your details below for a prompt response, or forward your request directly to WhatsApp for instant confirmation.
              </p>

              {submitted ? (
                <div className="mt-8 rounded-2xl bg-brand-50 p-8 text-center border border-brand-200 dark:bg-brand-950/40 dark:border-brand-800">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-600 dark:bg-brand-900 dark:text-brand-300">
                    <iconify-icon icon="solar:check-circle-bold" width="36" height="36"></iconify-icon>
                  </div>
                  <h3 className="mt-4 font-serif text-2xl font-bold text-earth-900 dark:text-white">
                    Thank You, {formData.name || 'Valued Guest'}!
                  </h3>
                  <p className="mt-2 font-sans text-sm text-earth-700 dark:text-earth-300 max-w-md mx-auto">
                    Your inquiry has been noted. For instant response, click below to forward your details directly to our reservations desk on WhatsApp:
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <a
                      href={`https://wa.me/${contact.whatsapp || '919320062613'}?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary shadow-lg"
                    >
                      <iconify-icon icon="logos:whatsapp-icon" width="18" height="18"></iconify-icon>
                      <span>Forward via WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          inquiryType: 'Room Booking',
                          guests: '2 Guests',
                          dates: '',
                          message: '',
                        });
                      }}
                      className="btn-secondary"
                    >
                      <span>Send Another Inquiry</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block font-sans text-xs font-semibold uppercase tracking-wider text-earth-700 dark:text-earth-200 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-earth-200 bg-white px-4 py-3 font-sans text-sm text-earth-900 placeholder-earth-400 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-earth-700 dark:bg-earth-800 dark:text-white"
                        placeholder="e.g. Rahul Sharma"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block font-sans text-xs font-semibold uppercase tracking-wider text-earth-700 dark:text-earth-200 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-earth-200 bg-white px-4 py-3 font-sans text-sm text-earth-900 placeholder-earth-400 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-earth-700 dark:bg-earth-800 dark:text-white"
                        placeholder="e.g. +91 98765 43210"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="block font-sans text-xs font-semibold uppercase tracking-wider text-earth-700 dark:text-earth-200 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-earth-200 bg-white px-4 py-3 font-sans text-sm text-earth-900 placeholder-earth-400 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-earth-700 dark:bg-earth-800 dark:text-white"
                        placeholder="e.g. rahul@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="inquiryType" className="block font-sans text-xs font-semibold uppercase tracking-wider text-earth-700 dark:text-earth-200 mb-1.5">
                        Inquiry Type
                      </label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-earth-200 bg-white px-4 py-3 font-sans text-sm text-earth-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-earth-700 dark:bg-earth-800 dark:text-white"
                      >
                        {inquiryTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="guests" className="block font-sans text-xs font-semibold uppercase tracking-wider text-earth-700 dark:text-earth-200 mb-1.5">
                        Number of Guests
                      </label>
                      <input
                        type="text"
                        id="guests"
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-earth-200 bg-white px-4 py-3 font-sans text-sm text-earth-900 placeholder-earth-400 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-earth-700 dark:bg-earth-800 dark:text-white"
                        placeholder="e.g. 4 Adults, 2 Kids"
                      />
                    </div>
                    <div>
                      <label htmlFor="dates" className="block font-sans text-xs font-semibold uppercase tracking-wider text-earth-700 dark:text-earth-200 mb-1.5">
                        Preferred Check-in / Dates
                      </label>
                      <input
                        type="text"
                        id="dates"
                        name="dates"
                        value={formData.dates}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-earth-200 bg-white px-4 py-3 font-sans text-sm text-earth-900 placeholder-earth-400 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-earth-700 dark:bg-earth-800 dark:text-white"
                        placeholder="e.g. This Weekend / Nov 15-17"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-sans text-xs font-semibold uppercase tracking-wider text-earth-700 dark:text-earth-200 mb-1.5">
                      Your Message / Special Requests
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full resize-none rounded-xl border border-earth-200 bg-white px-4 py-3 font-sans text-sm text-earth-900 placeholder-earth-400 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-earth-700 dark:bg-earth-800 dark:text-white"
                      placeholder="Tell us what you are looking for..."
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      type="submit"
                      className="btn-primary"
                    >
                      <span>Submit Inquiry</span>
                      <iconify-icon icon="solar:letter-bold" width="18" height="18"></iconify-icon>
                    </button>
                    <a
                      href={`https://wa.me/${contact.whatsapp || '919320062613'}?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-emerald-500 bg-emerald-50 px-6 py-3.5 font-sans text-sm font-semibold text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-700"
                    >
                      <iconify-icon icon="logos:whatsapp-icon" width="18" height="18"></iconify-icon>
                      <span>Inquire via WhatsApp</span>
                    </a>
                  </div>
                </form>
              )}
            </div>

            {/* Right: Map, Resort Timings & Policies */}
            <div className="lg:col-span-5 space-y-6">
              {/* Google Map Card */}
              <div className="overflow-hidden rounded-2xl bg-white card-shadow border border-earth-100 dark:bg-earth-800 dark:border-earth-700">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <iframe
                    src={contact.mapEmbedUrl || 'https://maps.google.com/maps?q=Malhar%20Baug%20Resort%20Nagaon%20Alibaug&t=&z=14&ie=UTF8&iwloc=&output=embed'}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Malhar Baug Resort Map Location"
                  />
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-base font-bold text-earth-900 dark:text-white">
                      Malhar Baug Resort
                    </h3>
                    <p className="font-sans text-xs text-earth-500 dark:text-earth-400">
                      Palhe, Nagaon, Alibaug
                    </p>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Malhar+Baug+Resort+Nagaon+Alibaug"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-4 py-2 font-sans text-xs font-bold text-brand-700 hover:bg-brand-100 dark:bg-brand-950 dark:text-brand-300"
                  >
                    <iconify-icon icon="solar:routing-2-bold" width="14" height="14"></iconify-icon>
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>

              {/* Resort Operational Hours & Timings */}
              <div className="rounded-2xl bg-earth-50 p-6 border border-earth-100 dark:bg-earth-800/60 dark:border-earth-700">
                <h3 className="font-serif text-lg font-bold text-earth-900 dark:text-white mb-4">
                  Resort Timings &amp; Policies
                </h3>
                <div className="space-y-3 font-sans text-sm">
                  <div className="flex items-center justify-between border-b border-earth-200/50 pb-2 dark:border-earth-700">
                    <span className="text-earth-600 dark:text-earth-300">Check-in Time</span>
                    <span className="font-bold text-earth-900 dark:text-white">12:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-earth-200/50 pb-2 dark:border-earth-700">
                    <span className="text-earth-600 dark:text-earth-300">Check-out Time</span>
                    <span className="font-bold text-earth-900 dark:text-white">11:00 AM</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-earth-200/50 pb-2 dark:border-earth-700">
                    <span className="text-earth-600 dark:text-earth-300">Front Desk Assistance</span>
                    <span className="font-bold text-brand-600 dark:text-brand-400">24 Hours / 7 Days</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-earth-200/50 pb-2 dark:border-earth-700">
                    <span className="text-earth-600 dark:text-earth-300">Restaurant &amp; Dining</span>
                    <span className="font-bold text-earth-900 dark:text-white">7:30 AM – 10:30 PM</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-earth-600 dark:text-earth-300">Swimming Pool</span>
                    <span className="font-bold text-earth-900 dark:text-white">8:00 AM – 7:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Instant Direct Booking Link */}
              <div className="rounded-2xl bg-gradient-to-br from-brand-800 to-brand-950 p-6 text-white shadow-lg">
                <p className="font-sans text-xs uppercase tracking-wider text-brand-300 font-semibold">
                  Guaranteed Best Price
                </p>
                <h3 className="font-serif text-xl font-bold mt-1">Book Directly Online</h3>
                <p className="mt-2 font-sans text-xs text-brand-100 leading-relaxed">
                  Skip inquiry delays and lock in instant confirmation for your preferred rooms or villas with our online reservation portal.
                </p>
                <a
                  href={bookingEngineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 font-sans text-xs font-bold text-brand-900 shadow hover:bg-brand-50"
                >
                  <span>Check Live Rates &amp; Book</span>
                  <iconify-icon icon="solar:calendar-bold" width="14" height="14"></iconify-icon>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* How To Reach Malhar Baug Section */}
        <section className="bg-earth-50 py-20 dark:bg-earth-800/30 border-t border-earth-100 dark:border-earth-800">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <p className="section-subtitle">How To Reach Us</p>
              <h2 className="section-title">Directions to Malhar Baug Resort</h2>
              <p className="mx-auto mt-4 max-w-2xl font-sans text-base text-earth-600 dark:text-earth-300">
                Easily accessible from Mumbai, Thane, Navi Mumbai, and Pune with scenic coastal driving routes.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
              {travelRoutes.map((route) => (
                <div
                  key={route.title}
                  className="rounded-2xl bg-white p-7 card-shadow dark:bg-earth-800 border border-earth-100 dark:border-earth-700"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                    <iconify-icon icon={route.icon} width="24" height="24"></iconify-icon>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-earth-900 dark:text-white">
                    {route.title}
                  </h3>
                  <span className="mt-1 inline-block rounded-md bg-brand-50 px-2.5 py-1 font-sans text-xs font-semibold text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                    {route.time}
                  </span>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-earth-600 dark:text-earth-300">
                    {route.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
