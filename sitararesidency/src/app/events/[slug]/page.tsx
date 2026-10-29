import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Phone,
  Mail,
  MapPin,
  Check,
  Sparkles,
  ArrowRight,
  Users,
  Presentation,
  Utensils,
  Monitor,
  LayoutGrid,
  ChevronRight,
} from 'lucide-react';

import { business } from '@/core/config/business';
import { ROUTES } from '@/core/constants/routes';
import { pageMetadata, SITE_URL, webPageSchema, breadcrumbSchema } from '@/core/lib/seo';
import { JsonLdScript } from '@/shared/ui/json-ld';
import {
  eventSpaces,
  getEventSpace,
  EventInquiryForm,
  EventCinematicGallery,
  EventBannerAlert,
} from '@/features/events';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return eventSpaces.map((space) => ({
    slug: space.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const space = getEventSpace(slug);

  if (!space) {
    return pageMetadata({
      title: 'Event Venue Not Found',
      description: `Explore event and conference halls at ${business.name}, Kalamboli, Navi Mumbai.`,
      path: ROUTES.events,
    });
  }

  return pageMetadata({
    title: `${space.name} | Banquet & Conference Hall Kalamboli`,
    description: `${space.name} at ${business.name}, Kalamboli Navi Mumbai. Accommodates up to ${space.capacities.floating} guests for corporate conferences, board meetings and celebrations. Area: ${space.area}.`,
    path: ROUTES.eventDetail(space.id),
    keywords: [
      space.name,
      `${space.name} Kalamboli`,
      'Banquet Hall in Kalamboli',
      'Conference Hall in Navi Mumbai',
      'Meeting Room near Panvel',
      'Corporate Event Hall Kalamboli',
      'Navi Mumbai Airport Event Venue',
    ],
  });
}

export default async function EventSpaceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const space = getEventSpace(slug);

  if (!space) {
    notFound();
  }

  const otherSpaces = eventSpaces.filter((s) => s.id !== space.id);

  const venueSchema = {
    '@context': 'https://schema.org',
    '@type': 'EventVenue',
    '@id': `${SITE_URL}${ROUTES.eventDetail(space.id)}#venue`,
    name: `${space.name} - ${business.name}`,
    description: space.description,
    url: `${SITE_URL}${ROUTES.eventDetail(space.id)}`,
    telephone: business.phones.primary,
    maximumAttendeeCapacity: space.capacities.floating,
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
    amenityFeature: space.features.map((feature) => ({
      '@type': 'LocationFeatureSpecification',
      name: feature,
      value: true,
    })),
  };

  return (
    <main className="event-detail-page bg-bg text-forest">
      <JsonLdScript
        data={[
          webPageSchema({
            name: `${space.name} | ${business.name}`,
            description: space.description,
            path: ROUTES.eventDetail(space.id),
            type: 'ItemPage',
          }),
          breadcrumbSchema([
            { name: 'Events & Banquets', path: ROUTES.events },
            { name: space.name, path: ROUTES.eventDetail(space.id) },
          ]),
          venueSchema,
        ]}
      />

      <EventBannerAlert />

      {/* ═══ 1. BREADCRUMBS & TOP BAR ═══ */}
      <section className="bg-forest text-cream pt-28 pb-12 px-5 sm:px-8 border-b border-cream/10">
        <div className="mx-auto max-w-[1240px]">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 font-mono-label text-[11px] text-cream/70 uppercase tracking-widest">
              <li>
                <Link href={ROUTES.home} className="hover:text-apricot transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={ROUTES.events} className="hover:text-apricot transition-colors">
                  Events & Banquets
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-apricot font-medium truncate">{space.name}</li>
            </ol>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="font-mono-label text-xs uppercase tracking-widest text-apricot">
                {space.eyebrow}
              </p>
              <h1 className="mt-2 font-serif text-3xl sm:text-5xl font-semibold italic text-cream leading-tight">
                {space.name}
              </h1>
              <p className="mt-3 max-w-2xl text-sm sm:text-base text-cream/80 font-sans">
                {space.tagline}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#event-inquiry"
                className="bg-terracotta px-6 py-3.5 font-mono-label text-xs uppercase tracking-widest text-cream hover:bg-terracotta/90 transition-colors shadow-md flex items-center gap-2"
              >
                Inquire For This Space <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={`tel:${business.phones.primary}`}
                className="border border-cream/30 bg-black/20 backdrop-blur-sm px-5 py-3.5 font-mono-label text-xs uppercase tracking-widest text-cream hover:border-cream transition-colors flex items-center gap-2"
              >
                <Phone className="h-4 w-4 text-apricot" /> Call Desk
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 2. CINEMATIC GALLERY & SPEC BANNER ═══ */}
      <section className="py-10 sm:py-14 px-5 sm:px-8 bg-cream/40">
        <div className="mx-auto max-w-[1240px]">
          <EventCinematicGallery images={space.gallery} title={space.name} />

          {/* Quick Specifications Strip */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 border border-forest/15 bg-white p-5 shadow-sm text-center">
            <div className="p-2">
              <div className="font-mono-label text-[10px] uppercase tracking-wider text-sage-muted">Total Area</div>
              <div className="font-serif font-bold text-lg sm:text-xl text-forest mt-0.5">{space.area}</div>
            </div>
            <div className="p-2">
              <div className="font-mono-label text-[10px] uppercase tracking-wider text-sage-muted">Dimensions</div>
              <div className="font-serif font-bold text-lg sm:text-xl text-forest mt-0.5">{space.dimensions}</div>
            </div>
            <div className="p-2">
              <div className="font-mono-label text-[10px] uppercase tracking-wider text-sage-muted">Ceiling Height</div>
              <div className="font-serif font-bold text-lg sm:text-xl text-forest mt-0.5">{space.ceilingHeight}</div>
            </div>
            <div className="p-2">
              <div className="font-mono-label text-[10px] uppercase tracking-wider text-sage-muted">Max Capacity</div>
              <div className="font-serif font-bold text-lg sm:text-xl text-terracotta mt-0.5">{space.capacities.floating} Pax</div>
            </div>
            <div className="p-2">
              <div className="font-mono-label text-[10px] uppercase tracking-wider text-sage-muted">Climate</div>
              <div className="font-serif font-bold text-lg sm:text-xl text-forest mt-0.5">Dual Split AC</div>
            </div>
            <div className="p-2">
              <div className="font-mono-label text-[10px] uppercase tracking-wider text-sage-muted">Power Backup</div>
              <div className="font-serif font-bold text-lg sm:text-xl text-forest mt-0.5">100% Generator</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3. OVERVIEW & CAPACITY MATRIX ═══ */}
      <section className="py-14 sm:py-20 px-5 sm:px-8">
        <div className="mx-auto max-w-[1240px] grid gap-14 lg:grid-cols-[1.4fr_0.8fr]">
          {/* Left Column: Narrative & Details */}
          <div>
            <p className="font-mono-label text-xs uppercase tracking-widest text-terracotta">
              Venue Architecture & Layout
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl italic text-forest">
              Engineered For Elevated Gatherings
            </h2>

            <div className="mt-6 space-y-4 text-sm sm:text-base text-sage-muted leading-relaxed">
              {space.detailedOverview.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Ideal Use Cases */}
            <div className="mt-10 border-t border-forest/10 pt-8">
              <h3 className="font-mono-label text-xs uppercase tracking-widest text-forest/70 mb-4">
                Recommended For
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {space.idealFor.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 border border-forest/15 bg-cream/60 px-3.5 py-2 font-mono-label text-xs text-forest"
                  >
                    <Sparkles className="h-3 w-3 text-terracotta" /> {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="mt-12 border-t border-forest/10 pt-8">
              <h3 className="font-serif text-2xl italic text-forest mb-5">
                Technical & Audiovisual Infrastructure
              </h3>
              <div className="divide-y divide-forest/10 border border-forest/15 bg-white">
                {space.techSpecs.map((spec, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 text-sm gap-1">
                    <span className="font-mono-label text-xs uppercase tracking-wider text-sage-muted">
                      {spec.label}
                    </span>
                    <span className="font-medium text-forest sm:text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Catering Options */}
            <div className="mt-12 border-t border-forest/10 pt-8">
              <h3 className="font-serif text-2xl italic text-forest mb-5">
                Curated Banquet & Meeting Catering
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                {space.cateringOptions.map((menu, i) => (
                  <div key={i} className="border border-forest/15 bg-cream p-6">
                    <div className="flex items-center gap-2 text-terracotta font-mono-label text-xs uppercase tracking-wider mb-3 font-semibold">
                      <Utensils className="h-4 w-4" /> {menu.category}
                    </div>
                    <ul className="space-y-2 text-xs text-forest/85">
                      {menu.items.map((dish, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <Check className="h-3 w-3 text-terracotta shrink-0 mt-0.5" />
                          <span>{dish}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Capacity Breakdown & Inclusions */}
          <div className="space-y-8">
            {/* Seating Formats Card */}
            <div className="border border-forest/15 bg-cream p-6 sm:p-8">
              <h3 className="font-serif text-2xl italic text-forest">
                Seating Formats
              </h3>
              <p className="mt-1 text-xs text-sage-muted">
                Configured to order by our event operations crew.
              </p>

              <div className="mt-6 space-y-3.5">
                <div className="flex items-center justify-between border-b border-forest/10 pb-2.5">
                  <span className="flex items-center gap-2 text-sm text-forest">
                    <Presentation className="h-4 w-4 text-terracotta" /> Theatre Style
                  </span>
                  <span className="font-mono-label text-sm font-bold text-forest">
                    {space.capacities.theatre} Pax
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-forest/10 pb-2.5">
                  <span className="flex items-center gap-2 text-sm text-forest">
                    <LayoutGrid className="h-4 w-4 text-terracotta" /> Classroom Layout
                  </span>
                  <span className="font-mono-label text-sm font-bold text-forest">
                    {space.capacities.classroom} Pax
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-forest/10 pb-2.5">
                  <span className="flex items-center gap-2 text-sm text-forest">
                    <Monitor className="h-4 w-4 text-terracotta" /> U-Shape Seating
                  </span>
                  <span className="font-mono-label text-sm font-bold text-forest">
                    {space.capacities.uShape} Pax
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-forest/10 pb-2.5">
                  <span className="flex items-center gap-2 text-sm text-forest">
                    <Users className="h-4 w-4 text-terracotta" /> Cluster / Roundtable
                  </span>
                  <span className="font-mono-label text-sm font-bold text-forest">
                    {space.capacities.cluster} Pax
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-forest/10 pb-2.5">
                  <span className="flex items-center gap-2 text-sm text-forest">
                    <Users className="h-4 w-4 text-terracotta" /> Boardroom Setup
                  </span>
                  <span className="font-mono-label text-sm font-bold text-forest">
                    {space.capacities.boardroom ?? space.capacities.uShape} Pax
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="flex items-center gap-2 text-sm font-semibold text-terracotta">
                    <Sparkles className="h-4 w-4" /> Floating Reception
                  </span>
                  <span className="font-mono-label text-base font-bold text-terracotta">
                    {space.capacities.floating} Pax
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Coordinator Callout */}
            <div className="border border-forest/20 bg-forest text-cream p-6 sm:p-8">
              <span className="font-mono-label text-[10px] uppercase tracking-widest text-apricot">
                Direct Booking Support
              </span>
              <h4 className="mt-2 font-serif text-2xl italic text-cream">
                Schedule a Walkthrough
              </h4>
              <p className="mt-2 text-xs text-cream/80 leading-relaxed">
                Inspect the venue, test audiovisual setups, and sample banquet menus with our operations coordinator.
              </p>

              <div className="mt-6 space-y-3 text-xs text-cream/90">
                <a
                  href={`tel:${business.phones.primary}`}
                  className="flex items-center gap-2.5 font-mono-label text-sm text-apricot hover:underline"
                >
                  <Phone className="h-4 w-4 text-apricot" /> {business.phones.primaryDisplay}
                </a>
                <div className="flex items-center gap-2.5 font-mono-label text-xs text-cream/80">
                  <Mail className="h-3.5 w-3.5 text-apricot" /> {business.email}
                </div>
                <div className="flex items-center gap-2.5 font-mono-label text-xs text-cream/80">
                  <MapPin className="h-3.5 w-3.5 text-apricot" /> Kalamboli, Navi Mumbai
                </div>
              </div>

              <a
                href="#event-inquiry"
                className="mt-6 block text-center bg-terracotta px-4 py-3 font-mono-label text-xs uppercase tracking-widest text-cream hover:bg-terracotta/90 transition-colors shadow-sm"
              >
                Inquire For {space.name}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4. INQUIRY FORM SECTION ═══ */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 bg-cream/40 border-t border-forest/10">
        <div className="mx-auto max-w-[1000px]">
          <EventInquiryForm
            defaultEventType={
              space.id === 'executive-boardroom'
                ? 'Executive Boardroom Meeting'
                : space.id === 'celebrations-lounge'
                  ? 'Birthday Celebration (Kids / Milestone)'
                  : 'Ring Ceremony / Engagement (Sagai / Roka)'
            }
          />
        </div>
      </section>

      {/* ═══ 5. EXPLORE OTHER EVENT VENUES ═══ */}
      {otherSpaces.length > 0 && (
        <section className="py-16 sm:py-20 px-5 sm:px-8 border-t border-forest/10">
          <div className="mx-auto max-w-[1240px]">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="font-mono-label text-xs uppercase tracking-widest text-terracotta">
                  Alternative Venues
                </p>
                <h3 className="mt-2 font-serif text-3xl italic text-forest">
                  Explore Other Spaces at Hotel Sitara Residency
                </h3>
              </div>
              <Link
                href={ROUTES.events}
                className="hidden sm:inline-flex items-center gap-1.5 font-mono-label text-xs uppercase tracking-wider text-terracotta hover:underline font-semibold"
              >
                View All Venues <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              {otherSpaces.map((other) => (
                <Link
                  key={other.id}
                  href={ROUTES.eventDetail(other.id)}
                  className="group block border border-forest/15 bg-white p-6 sm:p-7 hover:border-terracotta transition-all shadow-sm hover:shadow-md"
                >
                  <p className="font-mono-label text-[10px] uppercase tracking-wider text-terracotta">
                    {other.eyebrow}
                  </p>
                  <h4 className="mt-2 font-serif text-2xl font-semibold text-forest group-hover:text-terracotta transition-colors">
                    {other.name}
                  </h4>
                  <p className="mt-2 text-xs text-sage-muted leading-relaxed line-clamp-2">
                    {other.tagline}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-forest/10 pt-3 text-xs font-mono-label text-forest">
                    <span>{other.area} · Up to {other.capacities.floating} guests</span>
                    <span className="text-terracotta flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Venue <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
