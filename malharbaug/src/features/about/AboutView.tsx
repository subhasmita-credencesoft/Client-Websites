import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { bookingEngineUrl } from '@/config/booking';

const resortStats = [
  { value: '2018', label: 'Established' },
  { value: '2+ Acres', label: 'Coconut & Agro Orchards' },
  { value: '18', label: 'Rooms & Private Villas' },
  { value: '4.2 ★', label: 'Google Rating (46+ Reviews)' },
  { value: '2 km', label: 'From Nagaon Beach' },
];

const resortPillars = [
  {
    icon: 'solar:heart-angle-bold',
    title: 'Warm Konkan Hospitality',
    desc: 'Genuine, family-style care and attentive on-site service that makes every guest feel truly welcome.',
  },
  {
    icon: 'solar:leaf-bold',
    title: 'Lush 2-Acre Agro Retreat',
    desc: 'Surrounded by towering coconut palms, betel nut trees, and manicured green lawns away from city noise.',
  },
  {
    icon: 'solar:chef-hat-bold',
    title: 'Authentic Coastal Cuisine',
    desc: 'Savor Alibaug-style fresh fish thalis, chicken sukka, comforting vegetarian meals, and authentic solkadhi.',
  },
  {
    icon: 'solar:users-group-rounded-bold',
    title: 'Ideal for Families & Groups',
    desc: 'Spacious independent 2 BHK & 4 BHK villas, kids play area, indoor-outdoor games, and a gated safe environment.',
  },
];

const propertyHighlights = [
  {
    title: 'Comfortable Villas & Rooms',
    subtitle: 'Spacious AC rooms & private multi-bedroom villas',
    image: '/hero1.jpeg',
    alt: 'Malhar Baug Resort private villas and rooms with lush gardens in Nagaon, Alibaug',
  },
  {
    title: 'Swimming Pool & Rain Dance',
    subtitle: 'Sparkling clean pool with loungers for adults & kids',
    image: '/swimmingpool.jpeg',
    alt: 'Swimming pool at Malhar Baug Resort near Nagaon Beach, Alibaug',
  },
  {
    title: 'Lush Coconut Gardens',
    subtitle: 'Over 2 acres of serene greenery, swings & walking paths',
    image: '/aboutimg.jpeg',
    alt: 'Lush coconut grove garden pathway at Malhar Baug Resort, Alibaug',
  },
  {
    title: 'Authentic Konkan Kitchen',
    subtitle: 'Homestyle seafood, Maharashtrian thalis & fresh breakfast',
    image: '/dining/fishthali.jpeg',
    alt: 'Authentic fresh fish thali and Konkan cuisine at Malhar Baug Resort',
  },
];

const nearbyDistances = [
  { name: 'Nagaon Beach & Water Sports', distance: '2.0 km', time: '5 mins' },
  { name: 'Akshi Beach', distance: '4.2 km', time: '8 mins' },
  { name: 'Alibaug City & Beach', distance: '9.0 km', time: '18 mins' },
  { name: 'Kolaba Sea Fort', distance: '9.5 km', time: '20 mins' },
  { name: 'Revdanda Beach & Fort', distance: '11.0 km', time: '20 mins' },
  { name: 'Mandwa Jetty (Ro-Ro Ferry)', distance: '28.0 km', time: '45 mins' },
];

export default function AboutView() {
  return (
    <>
      <Header />
      <main className="bg-white dark:bg-earth-900">
        {/* Hero Section */}
        <section
          className="relative flex min-h-[460px] sm:min-h-[520px] md:min-h-[580px] w-full items-center justify-center overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24"
          aria-label="About Malhar Baug Resort"
        >
          <Image
            src="/aboutimg.jpeg"
            alt="Malhar Baug Resort lush coconut garden in Nagaon, Alibaug"
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 z-0 object-cover object-center"
          />
          {/* Subtle Dark Gradient Overlay for Readability */}
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/85 via-black/55 to-black/60" />

          <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
              <iconify-icon icon="solar:map-point-wave-bold" width="16" height="16" className="text-brand-400"></iconify-icon>
              <span>Palhe, Nagaon, Alibaug</span>
            </div>

            <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white drop-shadow-md">
              About Malhar Baug Resort
            </h1>

            <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-earth-100 sm:text-lg">
              A peaceful 2-acre coconut grove retreat near Nagaon Beach, Alibaug. Combining authentic Konkan hospitality, private family villas, a sparkling swimming pool, and serene nature since 2018.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={bookingEngineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary shadow-lg"
              >
                <span>Book Your Stay</span>
                <iconify-icon icon="solar:calendar-bold" width="18" height="18"></iconify-icon>
              </a>
              <Link
                href="/rooms/"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/80 bg-white/10 px-7 py-3.5 font-sans text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-earth-900"
              >
                <span>Explore Rooms</span>
                <iconify-icon icon="solar:arrow-right-linear" width="18" height="18"></iconify-icon>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="border-b border-earth-100 bg-earth-50 py-10 dark:border-earth-800 dark:bg-earth-800/40">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 text-center">
              {resortStats.map((stat) => (
                <div key={stat.label} className="p-2">
                  <p className="font-serif text-3xl sm:text-4xl font-bold text-brand-600 dark:text-brand-400">
                    {stat.value}
                  </p>
                  <p className="mt-1 font-sans text-xs sm:text-sm font-medium text-earth-700 dark:text-earth-300">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="section-subtitle">Our Story &amp; Heritage</p>
              <h2 className="section-title">Where Nature Meets Warm Konkan Comfort</h2>
              <div className="mt-6 space-y-4 font-sans text-base leading-relaxed text-earth-700 dark:text-earth-300">
                <p>
                  Malhar Baug Resort was founded in 2018 with a singular mission: to create a genuine countryside haven where guests can escape the fast-paced stress of city life and reconnect with nature.
                </p>
                <p>
                  Nestled in the peaceful village of Palhe, near Nagaon in Alibaug, our resort is shaded by towering coconut palms, betel nut plantations, and tropical fruit trees. Spread over two expansive green acres, Malhar Baug offers a tranquil setting just 2 km (a short 5-minute drive) from the soft sands and water sports of Nagaon Beach.
                </p>
                <p>
                  Unlike crowded commercial hotels, we prioritize homestyle hospitality. From clean, air-conditioned rooms and private family villas to a refreshing swimming pool, lawn games, and authentic coastal fish thalis prepared with fresh local masalas, every aspect of your stay is looked after with personal care by our dedicated local team.
                </p>
              </div>

              {/* Highlights Checklist */}
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  'Just 5 mins to Nagaon Beach',
                  'Sparkling Swimming Pool & Rain Dance',
                  'Fresh Home-Style Konkan Cuisine',
                  'Spacious 2 BHK & 4 BHK Private Villas',
                  '2+ Acres of Coconut Groves & Lawns',
                  'Gated Property with Power Backup',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <iconify-icon icon="solar:check-circle-bold" width="20" height="20" className="text-brand-600 dark:text-brand-400 shrink-0"></iconify-icon>
                    <span className="font-sans text-sm font-medium text-earth-800 dark:text-earth-200">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Story Card */}
            <div className="relative">
              <div className="relative aspect-[4/3] sm:aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-2xl border border-earth-100 dark:border-earth-800">
                <Image
                  src="/hero3.jpeg"
                  alt="Private villas surrounded by coconut palms at Malhar Baug Resort, Alibaug"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              {/* Floating Quality Badge */}
              <div className="absolute -bottom-6 -left-4 sm:bottom-6 sm:left-6 rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur-md border border-earth-100 dark:bg-earth-800/95 dark:border-earth-700">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                    <iconify-icon icon="solar:star-bold" width="24" height="24"></iconify-icon>
                  </div>
                  <div>
                    <p className="font-sans text-xs font-semibold text-earth-500 dark:text-earth-400 uppercase tracking-wide">
                      Verified Guest Rating
                    </p>
                    <p className="font-serif text-lg font-bold text-earth-900 dark:text-white">
                      4.2 / 5.0 (Google Reviews)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resort Pillars / Values */}
        <section className="bg-earth-50 py-20 dark:bg-earth-800/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <p className="section-subtitle">The Malhar Baug Experience</p>
              <h2 className="section-title">What Makes Your Stay Memorable</h2>
              <p className="mx-auto mt-4 max-w-2xl font-sans text-base text-earth-600 dark:text-earth-300">
                From morning birdsongs in the coconut grove to sunset swims and authentic coastal meals, every moment here is designed for relaxation.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {resortPillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-2xl bg-white p-7 card-shadow transition-transform duration-200 hover:-translate-y-1 dark:bg-earth-800/60 border border-earth-100 dark:border-earth-700"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                    <iconify-icon icon={pillar.icon} width="28" height="28"></iconify-icon>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-earth-900 dark:text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-earth-600 dark:text-earth-300">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Property Highlights Showcase */}
        <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
          <div className="text-center">
            <p className="section-subtitle">Real Property Highlights</p>
            <h2 className="section-title">Explore Malhar Baug Resort</h2>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-base text-earth-600 dark:text-earth-300">
              Discover authentic views of our resort grounds, swimming pool, villas, and homestyle dining in Nagaon, Alibaug.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {propertyHighlights.map((item) => (
              <div
                key={item.title}
                className="group overflow-hidden rounded-2xl bg-white border border-earth-100 card-shadow dark:bg-earth-800 dark:border-earth-700"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-earth-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 font-sans text-xs text-earth-600 dark:text-earth-300">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Location & Nearby Beach Proximity */}
        <section className="bg-earth-100/60 py-20 dark:bg-earth-800/40">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="section-subtitle">Ideal Coastal Location</p>
                <h2 className="section-title">Close to Alibaug&apos;s Best Beaches</h2>
                <p className="mt-4 font-sans text-base leading-relaxed text-earth-700 dark:text-earth-300">
                  Situated in the serene village of Palhe, Malhar Baug Resort gives you the best of both worlds: quick access to beaches, water sports, and historical forts, along with peaceful, quiet nights free from crowded traffic.
                </p>

                <div className="mt-8 space-y-3">
                  {nearbyDistances.map((place) => (
                    <div
                      key={place.name}
                      className="flex items-center justify-between rounded-xl bg-white px-5 py-3.5 shadow-sm dark:bg-earth-800 border border-earth-200/50 dark:border-earth-700"
                    >
                      <div className="flex items-center gap-3">
                        <iconify-icon icon="solar:map-point-bold" width="18" height="18" className="text-brand-600 dark:text-brand-400"></iconify-icon>
                        <span className="font-sans text-sm font-semibold text-earth-900 dark:text-white">
                          {place.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-right">
                        <span className="font-sans text-xs font-bold text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950 px-2.5 py-1 rounded-md">
                          {place.distance}
                        </span>
                        <span className="font-sans text-xs text-earth-500 dark:text-earth-400">
                          ({place.time})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Card with Contact Info */}
              <div className="rounded-3xl bg-earth-900 p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 rounded-full bg-brand-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-300 mb-6">
                    <iconify-icon icon="solar:compass-bold" width="16" height="16"></iconify-icon>
                    <span>Getting Here</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
                    Visit Malhar Baug Resort
                  </h3>

                  <p className="font-sans text-sm leading-relaxed text-earth-200 mb-6">
                    Easily accessible from Mumbai and Pune via the Mandwa Ro-Ro Ferry (M2M Ferries) or via the Mumbai-Goa Highway (NH 66).
                  </p>

                  <div className="space-y-4 border-t border-earth-800 pt-6 font-sans text-sm">
                    <div className="flex items-start gap-3">
                      <iconify-icon icon="solar:map-point-linear" width="20" height="20" className="text-brand-400 shrink-0 mt-0.5"></iconify-icon>
                      <span className="text-earth-200">
                        H.No. 3116, Palhe, Nagaon, Alibaug, Maharashtra 402204
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <iconify-icon icon="solar:phone-calling-linear" width="20" height="20" className="text-brand-400 shrink-0"></iconify-icon>
                      <a href="tel:+919320062613" className="text-earth-200 hover:text-white transition-colors">
                        +91 93200 62613
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <iconify-icon icon="solar:chat-round-dots-linear" width="20" height="20" className="text-brand-400 shrink-0"></iconify-icon>
                      <a href="https://wa.me/919320062613" target="_blank" rel="noopener noreferrer" className="text-earth-200 hover:text-white transition-colors">
                        +91 93200 62613 (WhatsApp)
                      </a>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href="https://maps.google.com/?q=Malhar+Baug+Resort+Nagaon+Alibaug"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-sans text-xs font-semibold text-earth-900 transition-colors hover:bg-earth-100"
                    >
                      <iconify-icon icon="solar:routing-2-bold" width="16" height="16"></iconify-icon>
                      <span>Open in Google Maps</span>
                    </a>
                    <Link
                      href="/contact/"
                      className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 font-sans text-xs font-semibold text-white transition-colors hover:bg-white/20"
                    >
                      <span>Contact Us</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-brand-900 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <h2 className="font-serif text-3xl font-bold sm:text-4xl md:text-5xl">
              Experience the Peaceful Charm of Malhar Baug
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-base text-brand-100 sm:text-lg">
              Book direct with us for guaranteed best rates, or reach out for family gatherings, weddings, and group packages.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={bookingEngineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-sans text-sm font-semibold text-brand-900 shadow-xl transition-all duration-200 hover:bg-brand-50"
              >
                <span>Book Direct Online</span>
                <iconify-icon icon="solar:arrow-right-linear" width="18" height="18"></iconify-icon>
              </a>
              <a
                href="tel:+919320062613"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white px-7 py-3.5 font-sans text-sm font-semibold text-white transition-all duration-200 hover:bg-white hover:text-brand-900"
              >
                <iconify-icon icon="solar:phone-calling-bold" width="18" height="18"></iconify-icon>
                <span>Call +91 93200 62613</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
