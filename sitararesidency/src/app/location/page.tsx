import type { Metadata } from 'next';
import { Car, Clock3, Mail, MapPin, Phone, Wifi } from 'lucide-react';

import { CatalogHero, CatalogIntro } from '@/features/common';
import { ContactDetailGrid, LocationMapPanel } from '@/features/contact';
import { business } from '@/core/config/business';
import { locationPage } from '@/features/common/data/pages';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? business.website;

export const metadata: Metadata = {
  title: 'Location & Directions | Hotel Sitara Residency Kalamboli Navi Mumbai',
  description: 'Find Hotel Sitara Residency at Riddhi Arcade, Kalamboli, Navi Mumbai. Near Kalamboli Railway Station, Mumbai-Pune Expressway, Panvel. Get directions, map & contact details.',
  alternates: {
    canonical: '/location',
  },
  openGraph: {
    title: 'Location & Directions | Hotel Sitara Residency Kalamboli Navi Mumbai',
    description: 'Directions to Hotel Sitara Residency, Kalamboli, Navi Mumbai. Easy access from Panvel, Kalamboli Railway Station & Mumbai-Pune Expressway.',
    url: `${siteUrl}/location`,
    type: 'website',
    siteName: business.name,
  },
};

export default function LocationPage() {
  return (
    <main>
      <CatalogHero
        className="location-hero"
        eyebrow={locationPage.eyebrow}
        title={locationPage.heading}
        intro={locationPage.intro}
        image={locationPage.image}
        imageAlt={`${business.name} location in Kalamboli`}
      />
      <CatalogIntro
        className="location-intro"
        eyebrow="Location & contact"
        title="Everything you need before you arrive"
        text="We are located near Bima Complex in Sector KWC, Kalamboli. Contact our team directly for stay enquiries, directions or assistance."
      />
      <ContactDetailGrid details={locationPage.details} icons={[MapPin, Phone, Mail]} />
      <LocationMapPanel
        eyebrow={business.name}
        heading={locationPage.map.heading}
        description={locationPage.map.description}
        actionLabel={locationPage.map.action}
        actionHref={business.mapUrl}
        features={locationPage.features}
        featureIcons={[Car, Wifi, Clock3]}
      />
    </main>
  );
}