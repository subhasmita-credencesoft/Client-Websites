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
import { fetchRoomsFromApi } from '@/lib/hotelmate';
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
        '@type': 'Hotel',
        name: SITE.name,
        url: SITE.domain,
        description: SITE.description,
        image: `${SITE.domain}${SITE.ogImage}`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Near Phulnakhara Flyover, Bhubaneswar\u2013Cuttack Highway',
          addressLocality: 'Khordha',
          addressRegion: 'Odisha',
          addressCountry: 'IN',
        },
        telephone: SITE.phoneReservations,
        priceRange: '\u20b9\u20b9\u20b9',
        sameAs: [SITE.facebook, SITE.instagram],
        checkinTime: '14:00',
        checkoutTime: '12:00',
        numberOfRooms: '13',
        amenityFeature: [
          { '@type': 'LocationFeatureSpecification', name: 'Banquet halls', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Open-air lawns', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Conference rooms', value: true },
        ],
      },
      {
        '@type': 'EventVenue',
        name: SITE.name,
        url: SITE.domain,
        description: 'Banquet halls, open-air lawns and conference rooms on the Bhubaneswar\u2013Cuttack corridor.',
        maximumAttendeeCapacity: 1500,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Near Phulnakhara Flyover, Bhubaneswar\u2013Cuttack Highway',
          addressLocality: 'Khordha',
          addressRegion: 'Odisha',
          addressCountry: 'IN',
        },
        telephone: SITE.phoneEvents,
      },
    ],
  };

  return (
    <>
      <Seo
        title="Baibhab Resorts & Conventions — Weddings, Events & Stay"
        description={SITE.description}
        path="/"
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
  const liveRooms = await fetchRoomsFromApi();
  return {
    props: {
      rooms: liveRooms ?? ROOMS,
      venues: VENUES,
      testimonials: TESTIMONIALS,
    },
  };
};

export default HomePage;
