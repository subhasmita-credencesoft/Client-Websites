import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the privacy policy of Malhar Baug Resort, Alibaug — how we collect, use and protect your personal information.',
  alternates: { canonical: '/privacy-policy/' },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative flex min-h-[300px] items-center overflow-hidden bg-gradient-to-br from-brand-900 to-earth-900">
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <h1 className="font-serif text-5xl font-bold text-white sm:text-6xl">Privacy Policy</h1>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-24">
          <div className="animate-on-scroll space-y-8 font-sans text-base leading-relaxed text-earth-700 dark:text-earth-200">
            <p>
              At Malhar Baug Resort, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a booking.
            </p>

            <div>
              <h2 className="font-serif text-2xl font-bold text-earth-900 dark:text-white">Information We Collect</h2>
              <p className="mt-2">
                We may collect personal information such as your name, email address, phone number, and payment details when you make a reservation or contact us through our website.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-earth-900 dark:text-white">How We Use Your Information</h2>
              <p className="mt-2">
                Your information is used to process bookings, respond to inquiries, improve our services, and send occasional promotional communications with your consent.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-earth-900 dark:text-white">Data Protection</h2>
              <p className="mt-2">
                We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-earth-900 dark:text-white">Third-Party Disclosure</h2>
              <p className="mt-2">
                We do not sell, trade, or transfer your personal information to outside parties without your consent, except as required by law.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-earth-900 dark:text-white">Cookies</h2>
              <p className="mt-2">
                Our website may use cookies to enhance your browsing experience. You can choose to disable cookies in your browser settings.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-earth-900 dark:text-white">Contact Us</h2>
              <p className="mt-2">
                If you have any questions about this Privacy Policy, please contact us at info@malharbaugresort.com.
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
