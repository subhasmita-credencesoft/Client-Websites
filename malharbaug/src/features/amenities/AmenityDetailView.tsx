import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { resortFacilities } from '@/data/amenities';
import { bookingEngineUrl } from '@/data/booking';
import { breadcrumbSchema } from '@/lib/schema';

interface AmenityDetailViewProps {
  slug: string;
}

export default function AmenityDetailView({ slug }: AmenityDetailViewProps) {
  const facility = resortFacilities.find((f) => f.slug === slug);
  if (!facility) return null;

  const displayImage = facility.image || '/heroimg2.jpeg';
  const otherFacilities = resortFacilities.filter((f) => f.slug !== slug).slice(0, 3);

  return (
    <>
      <Header />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Amenities', url: '/amenities' },
          { name: facility.title, url: `/amenities/${facility.slug}` },
        ])}
      />
      <main>
        {/* Hero Section with Facility Image */}
        <section className="relative flex min-h-[460px] items-center overflow-hidden">
          <Image
            src={displayImage}
            alt={`${facility.title} at Malhar Baug Resort Alibaug`}
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 z-0 object-cover"
          />
          <div className="hero-overlay absolute inset-0 z-0" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-md">
              <iconify-icon icon={facility.icon} width="32" height="32"></iconify-icon>
            </div>
            <h1 className="font-serif text-5xl font-bold text-white sm:text-6xl">
              {facility.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-lg text-earth-100">
              {facility.description}
            </p>
          </div>
        </section>

        {/* Facility Showcase Detail Section */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="section-subtitle">Resort Amenities</p>
              <h2 className="section-title">{facility.title} at Malhar Baug</h2>
              <p className="mt-6 font-sans text-base leading-relaxed text-earth-600 dark:text-earth-300">
                {facility.description} Our resort facilities are meticulously maintained to provide a refreshing, hygienic, and memorable experience for families, couples, and groups visiting Alibaug.
              </p>
              <p className="mt-4 font-sans text-base leading-relaxed text-earth-600 dark:text-earth-300">
                Located amidst lush coconut grooves in Palhe, Nagaon, access to all primary resort amenities is included with your stay. Enjoy peaceful afternoons, fun poolside moments, and pure relaxation just 2 km from Nagaon Beach.
              </p>

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3">
                  <iconify-icon icon="solar:check-circle-bold" width="22" height="22" className="text-brand-500"></iconify-icon>
                  <span className="font-sans text-sm font-medium text-earth-800 dark:text-earth-200">
                    Complimentary access for all resident resort guests
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <iconify-icon icon="solar:check-circle-bold" width="22" height="22" className="text-brand-500"></iconify-icon>
                  <span className="font-sans text-sm font-medium text-earth-800 dark:text-earth-200">
                    Clean, treated, and regularly sanitized facility
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <iconify-icon icon="solar:check-circle-bold" width="22" height="22" className="text-brand-500"></iconify-icon>
                  <span className="font-sans text-sm font-medium text-earth-800 dark:text-earth-200">
                    Surrounded by landscaped gardens &amp; coconut trees
                  </span>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={bookingEngineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-brand-600 px-8 py-3.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                >
                  Book Your Stay
                </a>
                <Link
                  href="/amenities"
                  className="rounded-full border-2 border-brand-600 px-8 py-3.5 font-sans text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-600 hover:text-white dark:border-brand-400 dark:text-brand-400"
                >
                  View All Amenities
                </Link>
              </div>
            </div>

            {/* Featured Image Card */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src={displayImage}
                alt={`${facility.title} – Malhar Baug Resort Alibaug`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 rounded-xl bg-black/60 px-4 py-2 font-sans text-xs font-semibold text-white backdrop-blur-sm">
                Malhar Baug Resort &bull; {facility.title}
              </div>
            </div>
          </div>
        </section>

        {/* Multiple Photos Gallery (if available) */}
        {facility.images && facility.images.length > 1 && (
          <section className="bg-earth-100 py-16 dark:bg-earth-800/30">
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="text-center font-serif text-3xl font-bold text-earth-900 dark:text-white">
                {facility.title} Photos
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {facility.images.map((img, i) => (
                  <div key={i} className="relative h-72 overflow-hidden rounded-2xl shadow-md">
                    <Image
                      src={img}
                      alt={`${facility.title} photo ${i + 1} at Malhar Baug Resort`}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Explore Other Amenities */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-center font-serif text-3xl font-bold text-earth-900 dark:text-white">
            More Amenities at Malhar Baug
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {otherFacilities.map((other) => (
              <Link
                key={other.slug}
                href={`/amenities/${other.slug}`}
                className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-neutral-800 dark:bg-earth-900"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/40">
                  <iconify-icon icon={other.icon} width="24" height="24"></iconify-icon>
                </div>
                <h3 className="font-serif text-xl font-bold text-earth-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
                  {other.title}
                </h3>
                <p className="mt-2 font-sans text-sm text-earth-600 dark:text-earth-300">
                  {other.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-sans text-xs font-semibold text-brand-600 dark:text-brand-400">
                  Learn more &rarr;
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
