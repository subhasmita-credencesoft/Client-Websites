import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PropertyDetailsPage } from "@/components/pages/property-details-page";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPropertyBySlug, propertyConfigs } from "@/lib/properties";
import { getDynamicPropertyBySlug } from "@/lib/hotelmate-properties";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

interface PropertyPageProps {
  params: Promise<{ property: string }>;
}

export async function generateStaticParams() {
  return propertyConfigs.map((config) => ({
    property: config.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ property: string }> }): Promise<Metadata> {
  const { property: slug } = await params;
  const config = getPropertyBySlug(slug);

  if (!config) {
    return buildPageMetadata({
      title: "Property Not Found",
      description: "The requested property could not be found.",
      path: `/${slug}`,
    });
  }

  const property = await getDynamicPropertyBySlug(slug);

  return buildPageMetadata({
    title: property?.title || config.metadata.title,
    description: property?.description || config.metadata.description,
    path: `/${slug}`,
    image: property?.images[0] || config.fallbackImage,
  });
}

export default async function Page({ params }: PropertyPageProps) {
  const { property: slug } = await params;

  const config = getPropertyBySlug(slug);
  if (!config) {
    notFound();
  }

  const property = await getDynamicPropertyBySlug(slug);
  if (!property) {
    notFound();
  }

  const ratingValue = Number.parseFloat(property.ratingLabel);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: property.title,
    url: absoluteUrl(`/${property.slug}`),
    description: property.description,
    image: property.images.map((image) => absoluteUrl(image)),
    address: {
      "@type": "PostalAddress",
      addressLocality: property.location,
      addressCountry: "IN",
    },
    amenityFeature: property.amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity.label,
      value: true,
    })),
    aggregateRating:
      Number.isFinite(ratingValue) && ratingValue > 0
        ? {
          "@type": "AggregateRating",
          ratingValue,
          reviewCount: property.reviews.length.toString(),
        }
        : undefined,
    makesOffer: property.rooms.map((room) => ({
      "@type": "Offer",
      name: room.name,
      price: room.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    })),
  };

  return (
    <Suspense fallback={<div>Loading property details...</div>}>
      <JsonLd data={schema} />
      <PropertyDetailsPage
        property={property}
      />
    </Suspense>
  );
}
