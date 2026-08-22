import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Refund policy for bookings at Malhar Baug Resort, Alibaug — cancellation windows, refund timelines and modification charges.',
  alternates: { canonical: '/refund-policy/' },
};

export default function RefundPolicyPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative flex min-h-[300px] items-center overflow-hidden bg-gradient-to-br from-brand-900 to-earth-900">
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <h1 className="font-serif text-5xl font-bold text-white sm:text-6xl">Refund &amp; Cancellation Policy</h1>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-24">
          <div className="animate-on-scroll space-y-8 font-sans text-base leading-relaxed text-earth-700 dark:text-earth-200">
            <p>
              At Malhar Baug Resort, we understand that plans can change. Please review our cancellation and refund policy below.
            </p>

            <div>
              <h2 className="font-serif text-2xl font-bold text-earth-900 dark:text-white">Cancellation Policy</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Cancellations made 7 days or more before check-in: Full refund (minus processing fees).</li>
                <li>Cancellations made 3-6 days before check-in: 50% refund.</li>
                <li>Cancellations made less than 3 days before check-in: No refund.</li>
                <li>No-show: No refund will be provided.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-earth-900 dark:text-white">Early Check-out</h2>
              <p className="mt-2">
                Early check-out is treated as a cancellation of the remaining nights and is subject to the same cancellation policy.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-earth-900 dark:text-white">Modifications</h2>
              <p className="mt-2">
                Date modifications are free of charge if made 7 days before check-in, subject to availability. Modifications within 7 days may incur charges.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-earth-900 dark:text-white">How to Cancel</h2>
              <p className="mt-2">
                To cancel or modify your booking, please contact us at +91 98765 43210 or email info@malharbaugresort.com.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-earth-900 dark:text-white">Refund Processing</h2>
              <p className="mt-2">
                Refunds are processed within 7-10 business days after cancellation approval and will be credited to the original payment method.
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
