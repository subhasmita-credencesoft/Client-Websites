import type { GetStaticProps, NextPage } from 'next';
import Seo from '@/components/seo/Seo';
import InnerHero from '@/components/ui/InnerHero';
import RoomCard from '@/components/ui/RoomCard';
import PolicyAccordion from '@/components/sections/PolicyAccordion';
import styles from '@/styles/StayPage.module.scss';
import { ROOMS } from '@/data/rooms';
import { fetchRoomsFromApi } from '@/lib/hotelmate';
import { RoomCategory } from '@/types';

interface StayPageProps {
  rooms: RoomCategory[];
}

const STAY_POLICIES = [
  {
    question: 'What are the check-in and check-out times?',
    answer:
      'Check-in is from 2:00 PM and check-out is until 11:00 AM. Late checkout is available on request subject to availability.',
  },
  {
    question: 'Are breakfast and Wi-Fi included?',
    answer:
      'Yes — every room includes complimentary breakfast and high-speed Wi-Fi. Pool and lawn access is also included with your stay.',
  },
  {
    question: 'Can I book a block of rooms for a wedding or event?',
    answer:
      'Absolutely. We offer group booking rates with dedicated floors and coordinated check-in for wedding parties. Inquire via our group booking desk.',
  },
];

const StayPage: NextPage<StayPageProps> = ({ rooms }) => {
  return (
    <>
      <Seo
        title="Stay & Accommodations — Restful Stay Between Twin Cities"
        description="Modern rooms on the Bhubaneswar–Cuttack corridor — Premium and Suite Rooms with Wi-Fi and warm Odia hospitality."
        path="/stay"
      />
      <InnerHero
        image="https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Stay' },
        ]}
        eyebrow="Stay & Accommodations"
        title="Restful Stay Between Twin Cities"
        subtitle="Designed for business travelers, wedding guests, and families seeking comfort and convenience."
      />

      <div className="container" style={{ marginTop: 48 }}>
        <div className={styles.grid} data-reveal-stagger>
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>

      <section className={styles.policies}>
        <div className="container" data-reveal>
          <h2 className="h2">Guest policies & perks</h2>
          <div style={{ marginTop: 24 }}>
            <PolicyAccordion policies={STAY_POLICIES} />
          </div>
        </div>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps<StayPageProps> = async () => {
  const liveRooms = await fetchRoomsFromApi();
  return {
    props: {
      rooms: liveRooms ?? ROOMS,
    },
  };
};

export default StayPage;
