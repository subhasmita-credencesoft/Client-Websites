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
        title="Rooms & Stay in Phulnakhara"
        description="3-star-style Premium and Deluxe Rooms at Phulnakhara on NH-16, between Bhubaneswar and Cuttack — with Wi-Fi and free parking."
        path="/stay"
      />
      <InnerHero
        image="/newedit/Luxury room.avif"
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
