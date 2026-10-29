import type { Metadata } from 'next';
import CinematicHero from '@/components/hero/CinematicHero';
import HomeWelcome from '@/components/sections/home/HomeWelcome';
import HomeRooms from '@/components/sections/home/HomeRooms';
import HomeDining from '@/components/sections/home/HomeDining';
import HomeDestinations from '@/components/sections/home/HomeDestinations';
import HomeBanquet from '@/components/sections/home/HomeBanquet';
import FaqSection from '@/components/common/FaqSection';
import CalloutCTA from '@/components/sections/shared/CalloutCTA';
import JsonLd from '@/components/seo/JsonLd';
import { homeFaqs } from '@/data/faqs';
import { hotel } from '@/data/site';
import { getFaqSchema } from '@/lib/schema';
import { seo } from '@/lib/seo';

export const metadata: Metadata = seo({
  title: 'Hotel Krishna Palace, Hospet | Stay Near Hampi',
  description:
    'Hotel Krishna Palace in Hosapete, Karnataka, offers comfortable accommodation, dining and banquet facilities for business and leisure travellers visiting the Hampi region.',
  path: '/',
  image: '/facecadeimage.avif',
  imageAlt: 'Hotel Krishna Palace facade on Station Road in Hosapete near Hampi',
});

export default function HomePage() {
  return (
    <>
      <JsonLd schema={getFaqSchema(homeFaqs)} />

      <CinematicHero
        home
        eyebrow="Station Road · Hosapete, Karnataka"
        title="Hotel Krishna Palace, Hospet"
        tagline="Stay close to the story."
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

      <FaqSection
        eyebrow="Guest Information & FAQs"
        title="Frequently asked questions."
        body="Answers to help you plan your stay, dining experience, or Hampi exploration from Hotel Krishna Palace."
        items={homeFaqs}
      />

      <CalloutCTA
        eyebrow="Your Hosapete welcome"
        title="Let the journey begin here."
        body="For room enquiries, event details or a little help planning your visit, speak with our team directly."
        actions={[
          { href: '/contact/#contact-details', label: 'Contact the hotel' },
          { href: `tel:${hotel.phoneHref}`, label: `Call ${hotel.phoneDisplay}`, outline: true },
        ]}
      />
    </>
  );
}
