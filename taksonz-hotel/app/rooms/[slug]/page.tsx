import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BedDouble, Check, Maximize2, Mountain, Users } from "lucide-react";
import { LiveRoomGallery, LiveRoomHero } from "@/components/rooms/LiveRoomMedia";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Tabs } from "@/components/ui/Tabs";
import { RoomCard } from "@/components/rooms/RoomCard";
import { RoomRatePlans } from "@/components/rooms/RoomRatePlans";
import { BookingPanel } from "@/components/booking/BookingPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { ButtonLink } from "@/components/ui/Button";
import { faqsByTopic } from "@/data/faqs";
import { formatINR, getRelatedRooms, getRoom, rooms } from "@/data/rooms";
import { RATE_NOTE, site, buildBookingUrl } from "@/data/site";
import { buildMetadata } from "@/lib/seo/metadata";
import styles from "./room.module.scss";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false; // unknown slugs are a 404 (static export)

export function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) return {};
  return buildMetadata({ title: room.name, description: room.description, path: `/rooms/${room.slug}` });
}

export default async function RoomPage({ params }: { params: Params }) {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) notFound();
  const related = getRelatedRooms(room.slug);

  return (
    <>
      <LiveRoomHero slug={room.slug} title={room.name} subtitle={room.tagline}>
        <p className={styles.price}>{formatINR(room.fromRate)} <span>/ night</span></p>
      </LiveRoomHero>

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <Breadcrumbs items={[{ label: "Rooms & Suites", href: "/rooms" }, { label: room.name }]} />
          <ul className={styles.facts}>
            <li><BedDouble size={20} aria-hidden /> {room.bed}</li>
            <li><Users size={20} aria-hidden /> {room.maxGuests} Guests</li>
            <li><Maximize2 size={20} aria-hidden /> {room.sizeSqm} m²</li>
            <li><Mountain size={20} aria-hidden /> {room.view}</li>
          </ul>
          <BookingPanel variant="inline" roomSlug={room.slug} submitLabel="Check availability" />
          <div style={{ marginTop: "1rem" }}>
            <ButtonLink href={buildBookingUrl()} target="_blank" rel="noopener noreferrer" arrow>Book Online at Best Rate</ButtonLink>
          </div>
          <p className={styles.note}>{RATE_NOTE}</p>
        </div>
      </section>

      {/* Live API Rate Plans and Options */}
      <section className={styles.ratePlansSection}>
        <div className="container">
          <RoomRatePlans room={room} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Tabs
            label={`${room.name} details`}
            items={[
              { id: "overview", label: "Overview", content: (
                <div className={styles.overview}>
                  <p>{room.description}</p>
                  <ul className={styles.amen}>
                    {room.facilities && room.facilities.length > 0 ? (
                      room.facilities.map((f) => (
                        <li key={f.id}>
                          {f.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={f.imageUrl} alt="" className={styles.facilityIcon} aria-hidden />
                          ) : (
                            <Check size={18} aria-hidden />
                          )}
                          <span>{f.name}</span>
                        </li>
                      ))
                    ) : (
                      room.amenities.map((a) => <li key={a}><Check size={18} aria-hidden />{a}</li>)
                    )}
                  </ul>
                </div>
              ) },
              { id: "amenities", label: "Amenities", content: (
                <div className={styles.overview}>
                  <h2 className={styles.h}>Hotel Facilities & Inclusions</h2>
                  <ul className={styles.amen}>
                    {room.facilities && room.facilities.length > 0 ? (
                      room.facilities.map((f) => (
                        <li key={f.id}>
                          {f.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={f.imageUrl} alt="" className={styles.facilityIcon} aria-hidden />
                          ) : (
                            <Check size={18} aria-hidden />
                          )}
                          <span>{f.name}</span>
                        </li>
                      ))
                    ) : (
                      room.amenities.map((a) => <li key={a}><Check size={18} aria-hidden />{a}</li>)
                    )}
                  </ul>
                  <h2 className={styles.h}>Complimentary Inclusions</h2>
                  <ul className={styles.amen}>{room.inclusions.map((a) => <li key={a}><Check size={18} aria-hidden />{a}</li>)}</ul>
                </div>
              ) },
              { id: "gallery", label: "Gallery", content: <LiveRoomGallery slug={room.slug} /> },
              { id: "rules", label: "Room Rules", content: (
                <div className={styles.overview}>
                  <ul className={styles.rules}>{room.rules.map((r) => <li key={r}>{r}</li>)}</ul>
                  <p><a href="/cancellation-policy" className={styles.link}>Read the cancellation policy</a></p>
                </div>
              ) },
            ]}
          />
        </div>
      </section>

      <section className="section section--white" aria-labelledby="similar">
        <div className="container">
          <SectionHeading title={<span id="similar">Similar rooms</span>} />
          <ul className={styles.related}>
            {related.map((r, i) => <Reveal as="li" key={r.slug} delay={i * 0.1}><RoomCard room={r} /></Reveal>)}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="rfaq">
        <div className="container">
          <SectionHeading title={<span id="rfaq">Good to know</span>} />
          <FaqAccordion items={faqsByTopic("booking", "rooms")} />
          <div style={{ marginTop: "2.5rem" }}>
            <ButtonLink href={buildBookingUrl()} target="_blank" rel="noopener noreferrer" arrow>Book {room.name} Online</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
