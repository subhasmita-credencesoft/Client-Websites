import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { HeroFor } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { content } from "@/data/content";
import { pages } from "@/data/pages";
import { addressLine, mapEmbedUrl, mapLinkUrl, site } from "@/data/site";
import { metaFor } from "@/lib/seo/metadata";
import styles from "./location.module.scss";

const page = pages.location;
export const metadata: Metadata = metaFor(page);

export default function LocationPage() {
  const c = content.location;
  return (
    <>
      <HeroFor page={page} />
      <section className="section">
        <div className="container">
          <Breadcrumbs items={[{ label: "Location" }]} />
          <div style={{ height: "2rem" }} />
          <div className={styles.grid}>
            <div>
              <SectionHeading eyebrow={c.heading.eyebrow} title={c.heading.title} />
              <address className={styles.address}>
                <p><MapPin size={20} aria-hidden /> <span>{addressLine}</span></p>
                <p><Phone size={20} aria-hidden /> <a href={site.phoneHref}>{site.phone}</a></p>
                <p><MessageCircle size={20} aria-hidden /> <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp: {site.whatsapp}</a></p>
                <p><Mail size={20} aria-hidden /> <a href={`mailto:${site.email}`}>{site.email}</a></p>
              </address>
              <p className={styles.note}>{c.note}</p>
              <div className={styles.actions}>
                <ButtonLink href={site.bookingUrl} target="_blank" rel="noopener noreferrer" arrow>Book Online</ButtonLink>
                <a className={styles.maplink} href={mapLinkUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps<span className="visually-hidden"> (opens in new tab)</span></a>
              </div>
            </div>
            <div className={styles.map}>
              <iframe title={`Map showing ${site.name}`} src={mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </div>
      </section>

      {/* Link to Dedicated Nearby Locations Page */}
      <section className="section section--white">
        <div className="container" style={{ textAlign: "center", maxWidth: "48rem" }}>
          <SectionHeading
            eyebrow="Explore the Area"
            title="Looking for Distances to Key Areas in Ludhiana?"
            intro="View our complete neighborhood guide with exact distances, travel times, and landmark details for railway stations, historic monuments, wholesale bazaars, and corporate zones."
          />
          <div style={{ marginTop: "1.75rem", display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <ButtonLink href="/nearby-locations" arrow>View Nearby Locations Page</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
