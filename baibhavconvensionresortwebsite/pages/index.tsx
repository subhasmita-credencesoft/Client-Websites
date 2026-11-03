import type { GetStaticProps, NextPage } from 'next';
import Seo from '@/components/seo/Seo';
import Hero from '@/components/sections/Hero';
import DualPath from '@/components/sections/DualPath';
import Highlights from '@/components/sections/Highlights';
import VenueCapacity from '@/components/sections/VenueCapacity';
import RoomPreview from '@/components/sections/RoomPreview';
import LocationAdvantage from '@/components/sections/LocationAdvantage';
import Testimonials from '@/components/sections/Testimonials';
import LeadMagnet from '@/components/sections/LeadMagnet';
import FaqSection from '@/components/sections/FaqSection';
import { HOME_FAQS } from '@/data/faqs';
import { ROOMS } from '@/data/rooms';
import { VENUES } from '@/data/venues';
import { TESTIMONIALS } from '@/data/testimonials';
import { SITE } from '@/data/site';
import { RoomCategory, Venue, Testimonial } from '@/types';

interface HomePageProps {
  rooms: RoomCategory[];
  venues: Venue[];
  testimonials: Testimonial[];
}

const HomePage: NextPage<HomePageProps> = ({ rooms, venues, testimonials }) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: SITE.name,
        url: SITE.domain,
        description: SITE.description,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE.domain}/stay?checkIn={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Hotel',
        name: SITE.name,
        legalName: SITE.legalName,
        url: SITE.domain,
        description: SITE.description,
        image: `${SITE.domain}${SITE.ogImage}`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Near Phulnakhara Flyover, Bhubaneswar–Cuttack Highway (NH-16)',
          addressLocality: 'Phulnakhara, Khordha',
          addressRegion: 'Odisha',
          postalCode: '754001',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '20.3844',
          longitude: '85.8603',
        },
        telephone: SITE.phoneReservations,
        email: SITE.emailGeneral,
        priceRange: '₹₹',
        sameAs: [SITE.facebook, SITE.instagram],
        checkinTime: '14:00',
        checkoutTime: '12:00',
        numberOfRooms: '13',
        amenityFeature: [
          { '@type': 'LocationFeatureSpecification', name: 'Free Wi-Fi', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Free Parking for 200+ vehicles', value: true },
          { '@type': 'LocationFeatureSpecification', name: '24/7 Power Backup', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Banquet halls', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Open-air lawns', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Conference rooms', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'In-House Multi-Cuisine Restaurant', value: true },
        ],
      },
      {
        '@type': 'EventVenue',
        name: `${SITE.name} — Banquets & Lawns`,
        url: `${SITE.domain}/events`,
        description: 'Banquet halls, open-air lawns and conference rooms on the Bhubaneswar–Cuttack corridor.',
        maximumAttendeeCapacity: 1500,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Near Phulnakhara Flyover, Bhubaneswar–Cuttack Highway',
          addressLocality: 'Phulnakhara',
          addressRegion: 'Odisha',
          addressCountry: 'IN',
        },
        telephone: SITE.phoneEvents,
      },
      {
        '@type': 'FAQPage',
        mainEntity: HOME_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <Seo
        title="Baibhab Resorts & Conventions — Weddings, Events & Stay in Bhubaneswar"
        description={SITE.description}
        path="/"
        keywords="resort in phulnakhara, banquet hall bhubaneswar cuttack, wedding venue phulnakhara, resort near sum hospital phulnakhara, baibhab resorts, corporate event venue cuttack bhubaneswar, marriage lawn odisha"
        jsonLd={jsonLd}
      />
      <Hero />
      <DualPath />
      <Highlights />
      <VenueCapacity venues={venues} />
      <RoomPreview rooms={rooms} />
      <LocationAdvantage />
      <Testimonials testimonials={testimonials} />
      <FaqSection items={HOME_FAQS} eyebrow="FAQs" title="Frequently Asked Questions" subtitle="Quick answers about stays, weddings and events at Baibhab Resorts & Conventions." />
      <LeadMagnet />
    </>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  return {
    props: {
      rooms: ROOMS,
      venues: VENUES,
      testimonials: TESTIMONIALS,
    },
  };
};

export default HomePage;
