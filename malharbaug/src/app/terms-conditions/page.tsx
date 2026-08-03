import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function TermsConditionsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative flex min-h-[300px] items-center overflow-hidden bg-gradient-to-br from-brand-900 to-earth-900">
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <h1 className="font-serif text-5xl font-bold text-white sm:text-6xl">Terms &amp; Conditions</h1>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-24">
          <div className="animate-on-scroll space-y-8 font-sans text-base leading-relaxed text-earth-700 dark:text-earth-200">
            <p>
              Please read these Terms and Conditions carefully before using our website or making a booking at Malhar Baug Resort.
            </p>

            <div>
              <h2 className="font-serif text-2xl font-bold text-earth-900 dark:text-white">Booking and Reservation</h2>
              <p className="mt-2">
                All bookings are subject to availability. A valid ID and payment method are required at check-in. Rates are subject to change without prior notice.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-earth-900 dark:text-white">Check-in and Check-out</h2>
              <p className="mt-2">
                Check-in time is 12:00 PM and check-out time is 11:00 AM. Early check-in and late check-out are subject to availability and additional charges.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-earth-900 dark:text-white">Guest Conduct</h2>
              <p className="mt-2">
                Guests are expected to behave in a respectful manner. The resort reserves the right to refuse service or ask guests to leave for inappropriate behavior.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-earth-900 dark:text-white">Liability</h2>
              <p className="mt-2">
                Malhar Baug Resort is not liable for any loss, damage, or injury to persons or property during your stay, except where required by law.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-earth-900 dark:text-white">Modifications</h2>
              <p className="mt-2">
                We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of the updated terms.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-earth-900 dark:text-white">Contact</h2>
              <p className="mt-2">
                For any questions regarding these terms, please contact us at info@malharbaugresort.com.
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
