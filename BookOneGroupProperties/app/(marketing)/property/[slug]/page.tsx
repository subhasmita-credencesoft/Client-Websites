import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PropertyDetailsPage } from "@/components/pages/property-details-page";
import { JsonLd } from "@/components/seo/JsonLd";
import { propertySlugs } from "@/data/property-details";
import { propertySources } from "@/data/property-sources";
import { getDynamicPropertyBySlug } from "@/lib/hotelmate-properties";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

type PropertyPageParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  const slugs = Array.from(new Set([...propertySlugs, ...propertySources.map((source) => source.slug)]));
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: PropertyPageParams }): Promise<Metadata> {
  const { slug } = await params;
  const property = await getDynamicPropertyBySlug(slug);

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
  const property = await getDynamicPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const ratingValue = Number.parseFloat(property.ratingLabel);
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
    <>
      <JsonLd data={schema} />
      <PropertyDetailsPage property={property} />
    </>
  );
}
