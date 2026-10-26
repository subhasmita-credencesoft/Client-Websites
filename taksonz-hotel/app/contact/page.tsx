import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { HeroFor } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { ButtonLink } from "@/components/ui/Button";
import { content } from "@/data/content";
import { pages } from "@/data/pages";
import { addressLine, mapEmbedUrl, site } from "@/data/site";
import { metaFor } from "@/lib/seo/metadata";
import styles from "./contact.module.scss";

const page = pages.contact;
export const metadata: Metadata = metaFor(page);

export default function ContactPage() {
  const c = content.contact;
  return (
    <>
      <HeroFor page={page} />
      <section className="section">
        <div className="container">
          <Breadcrumbs items={[{ label: page.title }]} />
          <div style={{ height: "2rem" }} />

          <div className={styles.grid}>
            {/* Left: Contact Details */}
            <div className={styles.info}>
              <SectionHeading eyebrow={c.heading.eyebrow} title={c.heading.title} />

              <address className={styles.address}>
                <a href={site.phoneHref} className={styles.contactRow}>
                  <span className={styles.icon}><Phone size={20} aria-hidden /></span>
                  <span>
                    <strong>Call Us</strong>
                    <span>{site.phone}</span>
                  </span>
                </a>
                <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className={styles.contactRow}>
                  <span className={styles.icon}><MessageCircle size={20} aria-hidden /></span>
                  <span>
                    <strong>WhatsApp</strong>
                    <span>{site.whatsapp}</span>
                  </span>
                </a>
                <a href={`mailto:${site.email}`} className={styles.contactRow}>
                  <span className={styles.icon}><Mail size={20} aria-hidden /></span>
                  <span>
                    <strong>Email</strong>
                    <span>{site.email}</span>
                  </span>
                </a>
                <div className={styles.contactRow}>
                  <span className={styles.icon}><MapPin size={20} aria-hidden /></span>
                  <span>
                    <strong>Address</strong>
                    <span>{addressLine}</span>
                  </span>
                </div>
              </address>

              <div className={styles.hours}>
                <strong>Reception Hours</strong>
                <p>Open 24 hours · 7 days a week</p>
              </div>

              <div className={styles.actions}>
                <ButtonLink href="/banquets#enquire" variant="secondary">Event enquiry</ButtonLink>
                <ButtonLink href={site.bookingUrl} target="_blank" rel="noopener noreferrer" variant="primary">Book Online</ButtonLink>
              </div>
            </div>

            {/* Right: API-powered Enquiry Form */}
            <div>
              <SectionHeading title={c.formTitle} />
              <EnquiryForm type="general" submitLabel="Send Message" />
            </div>
          </div>

          <div className={styles.map}>
            <iframe
              title={`Map showing ${site.name} on Grand Trunk Road, Ludhiana`}
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
