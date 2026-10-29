import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Phone,
  Wifi,
  Sparkles,
  Presentation,
  ShieldCheck,
  Coffee,
  Car,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';

import { business } from '@/core/config/business';
import { ROUTES } from '@/core/constants/routes';
import { pageMetadata, SITE_URL, webPageSchema, breadcrumbSchema } from '@/core/lib/seo';
import { JsonLdScript } from '@/shared/ui/json-ld';
import {
  eventsCopy,
  eventPackages,
  eventFaqs,
  EventSpacesGrid,
  EventCapacityTable,
  EventInquiryForm,
  HostedFunctionsGrid,
} from '@/features/events';

export const metadata: Metadata = pageMetadata({
  title: 'Banquets, Ring Ceremony, Birthdays & Meeting Hall in Kalamboli',
  description:
    'Host ring ceremonies, birthday parties, corporate conferences, family gatherings, and milestone celebrations at Hotel Sitara Residency, Kalamboli, Navi Mumbai. Pillarless AC halls, gourmet multi-cuisine catering, and modern AV setup near Panvel & NMIA.',
  path: ROUTES.events,
  keywords: [
    'Ring Ceremony Hall in Kalamboli',
    'Birthday Party Hall Kalamboli Navi Mumbai',
    'Engagement Venue near Panvel',
    'Meeting Room in Kalamboli Panvel',
    'Corporate Events Kalamboli',
    'Family Gathering Hall Kalamboli',
    'Baby Shower Venue Kalamboli',
    'Haldi Mehendi Venue Navi Mumbai',
    'Party Hall Kalamboli Navi Mumbai',
    'Conference Venue near Navi Mumbai Airport',
    'Event Venue near Kalamboli Steel Market',
    'Hotel with Meeting Hall near Panvel',
    'Hotel Sitara Residency Events',
  ],
});

export default function EventsPage() {
  const eventVenueSchema = {
    '@context': 'https://schema.org',
    '@type': 'EventVenue',
    '@id': `${SITE_URL}${ROUTES.events}#venue`,
    name: `${business.name} Banquets, Meetings & Celebrations`,
    description: eventsCopy.intro,
    url: `${SITE_URL}${ROUTES.events}`,
    telephone: business.phones.primary,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.streetAddress,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 18.9986,
      longitude: 73.0961,
    },
    maximumAttendeeCapacity: 75,
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Ring Ceremony Stage & Backdrops', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Birthday Themed Decor & Sound', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'High-Definition Projector & Screen', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'High-Speed Wi-Fi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Multi-Cuisine Festive Catering', value: true },
      { '@type': 'LocationFeatureSpecification', name: '100% Generator Power Backup', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Valet & On-site Parking', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Dedicated Event Coordinator', value: true },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: eventFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="events-page bg-bg text-forest">
      <JsonLdScript
        data={[
          webPageSchema({
            name: 'Events, Banquets, Ring Ceremony & Meetings | Hotel Sitara Residency',
            description: metadata.description as string,
            path: ROUTES.events,
            type: 'WebPage',
          }),
          breadcrumbSchema([
            { name: 'Events & Banquets', path: ROUTES.events },
          ]),
          eventVenueSchema,
          faqSchema,
        ]}
      />

      {/* ═══ 1. HERO BANNER ═══ */}
      <section className="relative min-h-[58vh] sm:min-h-[65vh] flex items-end bg-forest text-cream overflow-hidden">
        <Image
          src={eventsCopy.heroImage}
          alt="Hotel Sitara Residency Events, Ring Ceremony, Birthday and Banquet Hall Kalamboli"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="relative z-10 mx-auto max-w-[1240px] px-5 sm:px-8 pb-16 pt-32 w-full">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 font-mono-label text-[11px] text-cream/70 uppercase tracking-widest">
              <li>
                <Link href={ROUTES.home} className="hover:text-apricot transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-apricot font-medium">Events & Banquets</li>
            </ol>
          </nav>

          <p className="font-mono-label text-xs uppercase tracking-widest text-apricot">
            {eventsCopy.eyebrow}
          </p>
          <h1 className="mt-3 font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold italic max-w-3xl leading-[1.15] text-cream">
            {eventsCopy.heading}
          </h1>
          <p className="mt-5 max-w-2xl text-sm sm:text-base text-cream/85 leading-relaxed font-sans">
            From intimate ring ceremonies, engagement rituals, and birthday parties to high-level corporate board meetings and extended family reunions — Hotel Sitara Residency delivers versatile venue spaces, tailor-made decor, and gourmet catering in Kalamboli, Navi Mumbai.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#event-inquiry"
              className="inline-flex items-center gap-2 bg-terracotta px-6 py-3.5 font-mono-label text-xs uppercase tracking-widest text-cream hover:bg-terracotta/90 transition-colors shadow-md"
            >
              Request Event Proposal <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={`tel:${business.phones.primary}`}
              className="inline-flex items-center gap-2 border border-cream/30 bg-black/20 backdrop-blur-sm px-6 py-3.5 font-mono-label text-xs uppercase tracking-widest text-cream hover:border-cream transition-colors"
            >
              <Phone className="h-4 w-4 text-apricot" /> Call Banquet Desk: {business.phones.primaryDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* ═══ 2. KEY HIGHLIGHTS BAR ═══ */}
      <section className="border-b border-forest/10 bg-cream py-6 px-5 sm:px-8">
        <div className="mx-auto max-w-[1240px] grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-forest/10">
          <div className="pt-2 md:pt-0">
            <div className="font-serif text-2xl sm:text-3xl font-semibold text-terracotta">Up to 75 Guests</div>
            <div className="font-mono-label text-[10px] uppercase tracking-wider text-sage-muted mt-1">
              Celebrations & Conference Capacity
            </div>
          </div>
          <div className="pt-2 md:pt-0">
            <div className="font-serif text-2xl sm:text-3xl font-semibold text-terracotta">Custom Themes</div>
            <div className="font-mono-label text-[10px] uppercase tracking-wider text-sage-muted mt-1">
              Ring Ceremony & Birthday Backdrops
            </div>
          </div>
          <div className="pt-2 md:pt-0">
            <div className="font-serif text-2xl sm:text-3xl font-semibold text-terracotta">100% Power Backup</div>
            <div className="font-mono-label text-[10px] uppercase tracking-wider text-sage-muted mt-1">
              Uninterrupted Generator Coverage
            </div>
          </div>
          <div className="pt-2 md:pt-0">
            <div className="font-serif text-2xl sm:text-3xl font-semibold text-terracotta">Expressway & NMIA</div>
            <div className="font-mono-label text-[10px] uppercase tracking-wider text-sage-muted mt-1">
              Prime Kalamboli Highway Junction
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3. ALL HOSTED FUNCTIONS & CELEBRATIONS (NEW SECTION) ═══ */}
      <section id="functions-we-host" className="py-16 sm:py-24 px-5 sm:px-8 bg-cream/30">
        <div className="mx-auto max-w-[1240px]">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="font-mono-label text-xs uppercase tracking-widest text-terracotta">
              Celebrations & Gatherings We Host
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl italic text-forest">
              Crafted For Every Milestone & Occasion
            </h2>
            <p className="mt-3 text-sm sm:text-base text-sage-muted leading-relaxed">
              Explore the full spectrum of personal celebrations and corporate assemblies hosted at Hotel Sitara Residency. Filter by category to view venue setup options, capacities, and custom inclusions.
            </p>
          </div>

          <HostedFunctionsGrid />
        </div>
      </section>

      {/* ═══ 4. EVENT SPACES OVERVIEW ═══ */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 border-t border-forest/10">
        <div className="mx-auto max-w-[1240px]">
          <div className="max-w-2xl mb-12">
            <p className="font-mono-label text-xs uppercase tracking-widest text-terracotta">
              Versatile Venues
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl italic text-forest">
              Hall Spaces Designed For Impact and Intimacy
            </h2>
            <p className="mt-3 text-sm sm:text-base text-sage-muted leading-relaxed">
              Click into any space to view high-resolution photographic perspectives, architectural dimensions, and technical equipment specifications.
            </p>
          </div>

          <EventSpacesGrid />
        </div>
      </section>

      {/* ═══ 5. SEATING CAPACITY & LAYOUT TABLE ═══ */}
      <section className="py-16 sm:py-20 px-5 sm:px-8 bg-cream/60 border-y border-forest/10">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <p className="font-mono-label text-xs uppercase tracking-widest text-terracotta">
                Capacity Matrix
              </p>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl italic text-forest">
                Seating Configurations By Hall
              </h2>
            </div>
            <p className="text-xs font-mono-label text-sage-muted max-w-sm">
              All halls feature flexible seating arrangements adjusted prior to your arrival by our venue setup crew.
            </p>
          </div>

          <EventCapacityTable />
        </div>
      </section>

      {/* ═══ 6. PACKAGES & INCLUSIONS ═══ */}
      <section className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="mx-auto max-w-[1240px]">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="font-mono-label text-xs uppercase tracking-widest text-terracotta">
              Curated Event Solutions
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl italic text-forest">
              All-Inclusive Event Packages
            </h2>
            <p className="mt-3 text-sm text-sage-muted leading-relaxed">
              Transparent packages covering stage decor, sound systems, gourmet food and beverage service, and accommodation options.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {eventPackages.map((pkg, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between border border-forest/15 bg-white p-7 sm:p-8 hover:border-terracotta transition-all shadow-sm"
              >
                <div>
                  <span className="font-mono-label text-[10px] uppercase tracking-wider text-terracotta">
                    {pkg.eyebrow}
                  </span>
                  <h3 className="mt-2 font-serif text-2xl font-semibold text-forest">
                    {pkg.title}
                  </h3>
                  <div className="mt-2 inline-block rounded-none bg-forest/5 px-2.5 py-1 font-mono-label text-[11px] text-forest font-medium">
                    {pkg.priceNote}
                  </div>
                  <p className="mt-4 text-xs text-sage-muted leading-relaxed">
                    {pkg.description}
                  </p>

                  <div className="mt-6 border-t border-forest/10 pt-5">
                    <p className="font-mono-label text-[10px] uppercase tracking-wider text-forest/70 mb-3">
                      Package Inclusions:
                    </p>
                    <ul className="space-y-2.5 text-xs text-forest/90">
                      {pkg.inclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Sparkles className="h-3.5 w-3.5 text-terracotta shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 border-t border-forest/10 pt-5">
                  <p className="text-[11px] text-sage-muted italic mb-4">
                    Ideal for: {pkg.recommendedFor}
                  </p>
                  <a
                    href="#event-inquiry"
                    className="block text-center bg-forest px-4 py-3 font-mono-label text-[10px] uppercase tracking-widest text-cream hover:bg-forest/90 transition-colors"
                  >
                    Select This Package
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7. AMENITIES GRID ═══ */}
      <section className="bg-forest text-cream py-16 sm:py-20 px-5 sm:px-8">
        <div className="mx-auto max-w-[1240px]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="font-mono-label text-xs uppercase tracking-widest text-apricot">
              Hospitality Standards
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl italic text-cream">
              Everything Needed For Flawless Execution
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            <div className="border border-cream/15 p-5 bg-black/20 flex flex-col items-center justify-center">
              <Presentation className="h-7 w-7 text-apricot mb-3" />
              <div className="font-mono-label text-xs uppercase font-medium">HD Projector</div>
              <p className="text-[10px] text-cream/70 mt-1">Motorized Screen & AV</p>
            </div>
            <div className="border border-cream/15 p-5 bg-black/20 flex flex-col items-center justify-center">
              <Wifi className="h-7 w-7 text-apricot mb-3" />
              <div className="font-mono-label text-xs uppercase font-medium">Enterprise Wi-Fi</div>
              <p className="text-[10px] text-cream/70 mt-1">Dedicated Bandwidth</p>
            </div>
            <div className="border border-cream/15 p-5 bg-black/20 flex flex-col items-center justify-center">
              <Coffee className="h-7 w-7 text-apricot mb-3" />
              <div className="font-mono-label text-xs uppercase font-medium">Gourmet Catering</div>
              <p className="text-[10px] text-cream/70 mt-1">Live Buffet & High Tea</p>
            </div>
            <div className="border border-cream/15 p-5 bg-black/20 flex flex-col items-center justify-center">
              <ShieldCheck className="h-7 w-7 text-apricot mb-3" />
              <div className="font-mono-label text-xs uppercase font-medium">Power Backup</div>
              <p className="text-[10px] text-cream/70 mt-1">Automatic Generators</p>
            </div>
            <div className="border border-cream/15 p-5 bg-black/20 flex flex-col items-center justify-center">
              <Car className="h-7 w-7 text-apricot mb-3" />
              <div className="font-mono-label text-xs uppercase font-medium">Guest Parking</div>
              <p className="text-[10px] text-cream/70 mt-1">Secure On-site Lots</p>
            </div>
            <div className="border border-cream/15 p-5 bg-black/20 flex flex-col items-center justify-center">
              <Sparkles className="h-7 w-7 text-apricot mb-3" />
              <div className="font-mono-label text-xs uppercase font-medium">Decor & Stage</div>
              <p className="text-[10px] text-cream/70 mt-1">Rings & Birthday Themes</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 8. EVENT INQUIRY FORM & CALLOUT ═══ */}
      <section className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="mx-auto max-w-[1240px] grid gap-12 lg:grid-cols-[1.3fr_0.7fr] items-start">
          <EventInquiryForm />

          {/* Sidebar / Quick Concierge Card */}
          <div className="space-y-6">
            <div className="border border-forest/15 bg-cream p-6 sm:p-8">
              <span className="font-mono-label text-[10px] uppercase tracking-wider text-terracotta">
                Personalized Assistance
              </span>
              <h3 className="mt-2 font-serif text-2xl italic text-forest">
                Speak With Our Banquet Coordinator
              </h3>
              <p className="mt-3 text-xs text-sage-muted leading-relaxed">
                Planning a ring ceremony, birthday party, conference, or family gathering? Discuss your event specifics immediately or schedule an in-person venue walkthrough.
              </p>

              <div className="mt-6 space-y-4 border-t border-forest/10 pt-5 text-xs text-forest">
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-terracotta shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-forest">Mobile / WhatsApp:</div>
                    <a href={`tel:${business.phones.primary}`} className="text-terracotta hover:underline font-mono-label">
                      {business.phones.primaryDisplay}
                    </a>{' '}
                    /{' '}
                    <a href={`tel:${business.phones.secondary}`} className="text-terracotta hover:underline font-mono-label">
                      {business.phones.secondaryDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-terracotta shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-forest">Landline:</div>
                    <span className="font-mono-label">{business.phones.landlinesDisplay}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="font-semibold text-forest">Email Proposal Requests:</div>
                  <a href={`mailto:${business.email}`} className="text-terracotta hover:underline font-mono-label">
                    {business.email}
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <div className="font-semibold text-forest">Venue Address:</div>
                  <span>{business.address.lines.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Room Block Callout */}
            <div className="border border-forest/15 bg-parchment p-6 sm:p-8">
              <span className="font-mono-label text-[10px] uppercase tracking-wider text-terracotta">
                Residential & Outstation Guests
              </span>
              <h4 className="mt-2 font-serif text-xl font-semibold text-forest">
                Accommodation For Your Guests
              </h4>
              <p className="mt-2 text-xs text-sage-muted leading-relaxed">
                Combine your celebration or conference with our Executive Rooms, Executive Triple Rooms, and Family Suites. Receive special group booking rates.
              </p>
              <Link
                href={ROUTES.bedrooms}
                className="mt-4 inline-flex items-center gap-2 font-mono-label text-xs uppercase tracking-wider text-terracotta hover:text-forest transition-colors font-semibold"
              >
                View Rooms & Suites <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 9. FREQUENTLY ASKED QUESTIONS ═══ */}
      <section className="py-16 sm:py-20 px-5 sm:px-8 bg-cream/60 border-t border-forest/10">
        <div className="mx-auto max-w-[900px]">
          <div className="text-center mb-12">
            <p className="font-mono-label text-xs uppercase tracking-widest text-terracotta">
              Organizer FAQs
            </p>
            <h2 className="mt-2 font-serif text-3xl italic text-forest">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {eventFaqs.map((faq, index) => (
              <details
                key={index}
                className="group border border-forest/15 bg-white p-5 sm:p-6 transition-colors open:border-terracotta/40"
              >
                <summary className="flex cursor-pointer items-center justify-between font-serif text-lg font-medium text-forest list-none">
                  <span>{faq.question}</span>
                  <ChevronDown className="h-5 w-5 text-terracotta transition-transform duration-300 group-open:rotate-180 shrink-0 ml-4" />
                </summary>
                <p className="mt-4 text-xs sm:text-sm text-sage-muted leading-relaxed border-t border-forest/10 pt-3">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
