import { AboutSection } from "@/components/sections/about-section";
import { AmenitiesSection } from "@/components/sections/amenities-section";
import { ContactSection } from "@/components/sections/contact-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HighlightsSection } from "@/components/sections/highlights-section";
import { LocationSection } from "@/components/sections/location-section";
import { RoomsSection } from "@/components/sections/rooms-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { hotelInfo } from "@/data/hotel";

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Hotel',
  name: hotelInfo.name,
  description: hotelInfo.description,
  address: {
    '@type': 'PostalAddress',
    streetAddress: hotelInfo.address,
    addressLocality: hotelInfo.city,
    addressRegion: hotelInfo.region,
    postalCode: hotelInfo.postalCode,
    addressCountry: hotelInfo.country,
  },
  url: hotelInfo.websiteUrl,
  image: `${hotelInfo.websiteUrl}/images/hero.jpg`,
  amenityFeature: hotelInfo.trustBadges.map((badge) => ({
    '@type': 'LocationFeatureSpecification',
    name: badge,
    value: true,
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <HeroSection />
        <AboutSection />
        <RoomsSection />
        <AmenitiesSection />
        <GallerySection />
        <HighlightsSection />
        <TestimonialsSection />
        <LocationSection />
        <ContactSection />
      </main>
    </>
  );
}