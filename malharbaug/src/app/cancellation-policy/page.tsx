import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cancellation Policy',
  description:
    'Cancellation policy for Malhar Baug Resort, Alibaug — free cancellation up to 7 days before check-in, refund timelines and group booking terms.',
  alternates: { canonical: '/cancellation-policy' },
};

export default function CancellationPolicyPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative flex min-h-[300px] items-center overflow-hidden bg-gradient-to-br from-brand-900 to-earth-900">
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <h1 className="font-serif text-5xl font-bold text-white sm:text-6xl">Cancellation Policy</h1>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-24">
          <div className="animate-on-scroll space-y-8 font-sans text-base leading-relaxed text-earth-700 dark:text-earth-200">
            <p>
              We keep our cancellation policy simple and guest-friendly. All cancellation requests must be sent in writing to
              info@malharbaugresort.com or confirmed over the phone with our front desk.
            </p>

            <div>
              <h2 className="font-serif text-2xl font-bold text-earth-900 dark:text-white">Cancellation Terms</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Cancellations made 7 days or more before the check-in date: full refund (minus payment-gateway charges, if any).</li>
                <li>Cancellations made 3–6 days before the check-in date: 50% of the booking value is retained.</li>
                <li>Cancellations made within 48 hours of check-in: no refund.</li>
                <li>No-show on the day of arrival: no refund.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-earth-900 dark:text-white">Date Changes</h2>
              <p className="mt-2">
                One free date change is allowed if requested at least 7 days before check-in, subject to availability. The revised
                dates are valid for the next 6 months. Changes within 7 days of check-in may attract a revision charge.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-earth-900 dark:text-white">Group & Event Bookings</h2>
              <p className="mt-2">
                For villas, group bookings and event functions (weddings, birthdays, corporate outings), a separate cancellation
                schedule is shared at the time of confirmation. Please refer to your booking confirmation for event-specific terms.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-earth-900 dark:text-white">Refund Timelines</h2>
              <p className="mt-2">
                Approved refunds are processed within 7–10 business days and credited to the original mode of payment. Bank or card
                settlement times may vary depending on your bank.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-earth-900 dark:text-white">Need Help?</h2>
              <p className="mt-2">
                Call us at{' '}
                <a href="tel:+919876543210" className="text-brand-600 underline hover:text-brand-700 dark:text-brand-400">
                  +91 98765 43210
                </a>{' '}
                or WhatsApp us — we are happy to help you reschedule instead of cancelling.
              </p>
            </div>

            <p className="pt-4 text-sm text-earth-500">Last updated: July 2026</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
