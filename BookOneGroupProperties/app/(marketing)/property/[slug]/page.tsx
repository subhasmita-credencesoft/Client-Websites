import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PropertyDetailsPage } from "@/components/pages/property-details-page";
import { JsonLd } from "@/components/seo/JsonLd";
import { propertyDetailsBySlug, propertySlugs } from "@/data/property-details";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

type PropertyPageParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return propertySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: PropertyPageParams }): Promise<Metadata> {
  const { slug } = await params;
  const property = propertyDetailsBySlug[slug];

  if (!property) {
    return buildPageMetadata({
      title: "Property Not Found",
      description: "The requested property could not be found.",
      path: `/property/${slug}`,
    });
  }

  return buildPageMetadata({
    title: property.title,
    description: property.description,
    path: `/property/${property.slug}`,
    image: property.images[0],
  });
}

export default async function Page({ params }: { params: PropertyPageParams }) {
  const { slug } = await params;
  const property = propertyDetailsBySlug[slug];

  if (!property) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: property.title,
    url: absoluteUrl(`/property/${property.slug}`),
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: property.ratingLabel.split(" ")[0],
      reviewCount: property.reviews.length.toString(),
    },
    makesOffer: property.rooms.map((room) => ({
      "@type": "Offer",
      name: room.name,
      price: room.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <PropertyDetailsPage property={property} />
    </>
  );
}
