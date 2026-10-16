import type { Metadata } from 'next';
import CinematicHero from '@/components/hero/CinematicHero';
import HomeWelcome from '@/components/sections/home/HomeWelcome';
import HomeRooms from '@/components/sections/home/HomeRooms';
import HomeDining from '@/components/sections/home/HomeDining';
import HomeDestinations from '@/components/sections/home/HomeDestinations';
import HomeBanquet from '@/components/sections/home/HomeBanquet';
import CalloutCTA from '@/components/sections/shared/CalloutCTA';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'A welcoming stay in Hosapete | Hotel Krishna Palace',
  description: 'Discover Hotel Krishna Palace, a welcoming Hosapete stay and considered starting point for the Hampi heritage region.',
  path: '/',
  image: '/images/32-tourism-1.jpg',
  imageAlt: 'The stone chariot of Hampi in the warm light of sunset',
});

export default function HomePage() {
  return (
    <>
      <CinematicHero
        home
        eyebrow="Hosapete · Karnataka"
        title={<>Stay close<br />to the story.</>}
        description="A gracious welcome in Hosapete, with the extraordinary heritage of Hampi close at heart."
        image="/images/32-tourism-1.jpg"
        alt="The stone chariot of Hampi in the warm light of sunset"
        video="https://bookonelocal.in/cdn/HOTAL_1.mp4"
        secondImage="/DSC_2597.avif"
        secondAlt="A warmly lit Mini Suite at Hotel Krishna Palace"
        secondEyebrow="The welcome begins here"
        secondTitle="A familiar place to return to."
        secondDescription="Settle into Hosapete, then discover Hampi and Karnataka’s heritage region at your own pace."
      />

      <HomeWelcome />
      <HomeRooms />
      <HomeDining />
      <HomeDestinations />
      <HomeBanquet />

      <CalloutCTA
        eyebrow="Your Hosapete welcome"
        title="Let the journey begin here."
        body="For room enquiries, event details or a little help planning your visit, speak with our team directly."
        actions={[
          { href: '/contact/#contact-details', label: 'Contact the hotel' },
          { href: 'tel:+9108394294300', label: 'Call the hotel', outline: true },
        ]}
      />
    </>
  );
}
