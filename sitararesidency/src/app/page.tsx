import type { Metadata } from 'next';
import {
  HomeHero,
  WelcomeSection,
  HighlightGrid,
  CalloutSection,
  CardsBand,
  SplitFeature,
  ExperienceSection,
} from '@/features/home';
import { business } from '@/core/config/business';
import { homeCallouts, homeFeatures, homeHighlights, homePageCopy } from '@/features/home/data/home';
import { defaultStayParams, getHotelMateProperty, roomsToCards } from '@/features/booking';
import { JsonLdScript } from '@/shared/ui/json-ld';
import { breadcrumbSchema, pageMetadata, SITE_URL, webPageSchema } from '@/core/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Hotel Sitara Residency | Best Hotel in Kalamboli, Navi Mumbai',
  description:
    'Hotel Sitara Residency in Kalamboli, Navi Mumbai offers comfortable, well-appointed rooms, 24x7 reception, free Wi-Fi & parking, near Panvel, Mumbai-Pune Expressway & Kalamboli Railway Station. Book direct for best rates.',
  path: '/',
  keywords: [
    'Hotel Sitara Residency',
    'best hotel in Kalamboli',
    'hotel in Navi Mumbai',
    'hotel near Panvel',
    'hotel near Navi Mumbai Airport',
    'budget hotel Kalamboli',
  ],
});

const homeSchema = [
  webPageSchema({
    name: 'Hotel Sitara Residency | Best Hotel in Kalamboli, Navi Mumbai',
    description:
      'Comfortable rooms and thoughtful stays in Kalamboli, Navi Mumbai. 24x7 reception, free Wi-Fi, parking, easy access to Panvel & Mumbai-Pune Expressway.',
    path: '/',
  }),
  breadcrumbSchema([]),
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Where is Hotel Sitara Residency located?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${business.name} is located at ${business.address.lines.join(', ')}, India.`,
        },
      },
      {
        '@type': 'Question',
        name: 'What time is check-in and check-out at Hotel Sitara Residency?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Check-in is from 12:00 PM and check-out is by 11:00 AM. Early check-in and late check-out may be available on request.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Hotel Sitara Residency offer free parking and Wi-Fi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Guests enjoy complimentary high-speed Wi-Fi and secure on-site parking, along with 24-hour front desk assistance and power backup.',
        },
      },
      {
        '@type': 'Question',
        name: 'How far is the hotel from Navi Mumbai International Airport?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Navi Mumbai International Airport (NMIA) is approximately 15–20 minutes away by car, and the Mumbai-Pune Expressway is around 3 minutes away.',
        },
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Room types at Hotel Sitara Residency',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Executive Room', url: `${SITE_URL}/bedrooms/executive-room` },
      { '@type': 'ListItem', position: 2, name: 'Executive Triple Room', url: `${SITE_URL}/bedrooms/executive-triple-room` },
      { '@type': 'ListItem', position: 3, name: 'Executive Family Suite', url: `${SITE_URL}/bedrooms/executive-family-suite` },
    ],
  },
];

export default async function HomePage() {
  const property = await getHotelMateProperty(defaultStayParams());
  const roomCards = roomsToCards(property.roomList ?? []);

  return (
    <main>
      <JsonLdScript data={homeSchema} />
      <HomeHero copy={homePageCopy} />
      <WelcomeSection
        image={homePageCopy.welcome.image}
        eyebrow={homePageCopy.welcome.eyebrow}
        heading={homePageCopy.welcome.heading}
        description={homePageCopy.welcome.description}
        action={homePageCopy.welcome.action}
      />
      <HighlightGrid items={homeHighlights} />
      <CalloutSection
        eyebrow={homePageCopy.callouts.eyebrow}
        heading={homePageCopy.callouts.heading}
        items={homeCallouts}
      />
      <SplitFeature
        image={homeFeatures.rooms.image}
        eyebrow={business.name}
        title={homeFeatures.rooms.title}
        text={homeFeatures.rooms.description}
        href={homeFeatures.rooms.href}
        action={homeFeatures.rooms.label}
      />
      <CardsBand
        eyebrow={homePageCopy.rooms.eyebrow}
        heading={homePageCopy.rooms.heading}
        actionLabel={homePageCopy.rooms.action}
        actionHref="/bedrooms"
        items={roomCards}
        cardHref={(slug) => `/bedrooms/${slug}`}
      />
      <ExperienceSection
        eyebrow={homePageCopy.location.eyebrow}
        heading={homePageCopy.location.heading}
        description={homePageCopy.location.description}
        actionLabel={homePageCopy.location.action}
        actionHref="/location"
        image={homePageCopy.location.image}
      />
    </main>
  );
}
