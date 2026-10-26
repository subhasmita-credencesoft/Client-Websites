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

export default async function HomePage() {
  const property = await getHotelMateProperty(defaultStayParams());
  const roomCards = roomsToCards(property.roomList ?? []);

  return (
    <main>
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