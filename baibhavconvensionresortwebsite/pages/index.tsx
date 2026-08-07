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
        image: SITE.ogImage,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Near Phulnakhara Flyover, Bhubaneswar\u2013Cuttack Highway',
          addressLocality: 'Khordha',
          addressRegion: 'Odisha',
          addressCountry: 'IN',
        },
        telephone: SITE.phoneReservations,
        priceRange: '\u20b9\u20b9\u20b9',
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
        title="Where Grand Celebrations Meet Effortless Comfort"
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
