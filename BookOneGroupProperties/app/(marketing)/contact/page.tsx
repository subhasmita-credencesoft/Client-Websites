import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/contact-page";
import { JsonLd } from "@/components/seo/JsonLd";
import { footerData } from "@/data/footer";
import { pageContent } from "@/data/pages";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: pageContent.contact.title,
  description: pageContent.contact.description,
  path: "/contact",
});

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: pageContent.contact.title,
    url: absoluteUrl("/contact"),
    description: pageContent.contact.description,
    mainEntity: {
      "@type": "Organization",
      name: "TripDip",
      email: footerData.contact.email,
      telephone: footerData.contact.phone,
      address: footerData.locations.map((location) => ({
        "@type": "PostalAddress",
        streetAddress: location,
        addressCountry: "IN",
      })),
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <ContactPage />
    </>
  );
}
