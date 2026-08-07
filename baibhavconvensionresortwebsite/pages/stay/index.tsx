import type { GetStaticProps, NextPage } from 'next';
import Seo from '@/components/seo/Seo';
import InnerHero from '@/components/ui/InnerHero';
import RoomCard from '@/components/ui/RoomCard';
import FaqSection from '@/components/sections/FaqSection';
import styles from '@/styles/StayPage.module.scss';
import { STAY_FAQS } from '@/data/faqs';
import { ROOMS } from '@/data/rooms';
import { fetchRoomsFromApi } from '@/lib/hotelmate';
import { RoomCategory } from '@/types';

interface StayPageProps {
  rooms: RoomCategory[];
}

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

      <FaqSection
        items={STAY_FAQS}
        eyebrow="Guest FAQs"
        title="Stay Questions, Answered"
        subtitle="Everything you need to know before checking in at Baibhab Resorts & Conventions."
      />
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
