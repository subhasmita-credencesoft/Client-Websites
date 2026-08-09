import type { Metadata } from "next";
import { GalleryPageClient } from "@/components/gallery/GalleryPageClient";
import { FaqSection } from "@/components/sections/FaqSection";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLd,
  SITE_URL,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title:
    "Gallery — Photos & Property Images | Redwings Studio Goa Arpora",
  description:
    "Browse 20+ photos of Redwings Studio, Arpora, Goa — studio apartments, poolside setting, exterior views, interior styling, and events. Explore our property gallery before booking.",
  keywords: [
    "Redwings Studio Gallery",
    "Hotel Photos Arpora Goa",
    "Studio Apartment Images Goa",
    "Property Gallery Arpora",
    "Hotel Interior Photos Goa",
    "Pool View Images Arpora",
  ],
  alternates: { canonical: "https://redwingsstudio.com/gallery" },
  openGraph: {
    title: "Gallery — Redwings Studio Goa | Property Photos",
    description:
      "20+ property photos: studio apartments, pool, exteriors, interiors, and events at Redwings Studio, Arpora, Goa.",
    images: [
      {
        url: "/mountain-studio/gallery-12.jpeg",
        width: 1200,
        height: 630,
        alt: "Redwings Studio Goa Property Gallery — Arpora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery — Redwings Studio Goa",
    description: "20+ property photos of Redwings Studio, Arpora, Goa.",
    images: ["/mountain-studio/gallery-12.jpeg"],
  },
};

export default function GalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Gallery", url: `${SITE_URL}/gallery` },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(galleryFaqs, "/gallery")) }}
      />
      <GalleryPageClient />
      <FaqSection
        eyebrow="Property Photos"
        title="Frequently asked questions about the Redwings Studio gallery"
        description="About the property photos, rooms, and what to expect before you book."
        faqs={galleryFaqs}
      />
    </>
  );
}

const galleryFaqs = [
  {
    question: "What photos are included in the Redwings Studio gallery?",
    answer:
      "The gallery shows the studio apartments, poolside setting, exterior and garden views, interior styling, dining spaces, and event-ready areas of Redwings Studio at Abalone Resort, Arpora, Goa.",
  },
  {
    question: "Are the room photos real photos of Redwings Studio?",
    answer:
      "Yes. The images reflect the actual studio apartments and property spaces in Arpora, Goa. For the most current views, you can also check the live room images on the individual room pages.",
  },
  {
    question: "Can I see photos of the pool and garden before booking?",
    answer:
      "Yes, the gallery includes the swimming pool, garden lawn, and resort surroundings shared by all guests, along with pool-access and pool-view room imagery.",
  },
  {
    question: "Do the photos show the wedding and event spaces?",
    answer:
      "Yes, the gallery includes event-ready areas, celebration setups, and the lawn spaces used for weddings and private gatherings at Redwings Studio.",
  },
  {
    question: "Where is Redwings Studio located?",
    answer:
      "Redwings Studio is at House No. 275/1, F30, Abalone Resort, Gorbhat, Goa 403516 — 3 km from Baga Beach and 2 km from the Arpora Saturday Night Market.",
  },
];
