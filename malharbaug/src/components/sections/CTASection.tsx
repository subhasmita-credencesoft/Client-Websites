import { bookingEngineUrl } from '@/data/booking';
import { siteConfig } from '@/lib/site';

export default function CTASection() {
  return (
    <section className="bg-brand-600 px-6 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">
          Book Your Alibaug Getaway at Malhar Baug Resort
        </h2>
        <p className="mx-auto mt-6 max-w-2xl font-sans text-lg leading-relaxed text-brand-50">
          Rooms, villas and group stays just 2 km from Nagaon Beach — book direct with us for the best rates on your next family holiday or weekend trip.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <a
            href={bookingEngineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-sans text-sm font-semibold text-brand-600 transition-all duration-200 ease-out hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Book Now
          </a>
          <a
            href={`tel:${siteConfig.phone}`}
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-white hover:text-brand-100"
          >
            <iconify-icon icon="solar:phone-bold" width="18" height="18"></iconify-icon>
            {siteConfig.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
