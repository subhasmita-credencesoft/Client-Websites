import type { Metadata } from "next";
import { notFound } from "next/navigation";
import rooms from "../../../data/rooms";
import Container from "../../../components/ui/Container";
import SectionHeading from "../../../components/ui/SectionHeading";
import Button from "../../../components/ui/Button";
import { formatPrice } from "../../../lib/format";
import { createPageMetadata } from "../../../lib/metadata";

type RoomDetailProps = {
  params: { slug: string };
};

export function generateMetadata({ params }: RoomDetailProps): Metadata {
  const room = rooms.find((item) => item.slug === params.slug);

  if (!room) {
    return createPageMetadata({
      title: "Rooms & Suites",
      description:
        "Explore rooms and suites at UK's Resort, Khopoli with comfortable stays and thoughtful amenities.",
      path: "/rooms",
      image: "https://bookonelocal.in/cdn/3.avif",
    });
  }

  return createPageMetadata({
    title: room.name,
    description: room.summary || room.description,
    path: `/rooms/${room.slug}`,
    image: room.image,
  });
}

export default function RoomDetail({ params }: RoomDetailProps) {
  const room = rooms.find((item) => item.slug === params.slug);

  if (!room) {
    notFound();
  }

  return (
    <section className="py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div
              className="h-72 rounded-3xl bg-sand"
              style={{
                backgroundImage: `url(${room.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <SectionHeading
              eyebrow={room.category}
              title={room.name}
              subtitle={room.description}
            />
            <div className="grid gap-4 md:grid-cols-2">
              {room.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm"
                >
                  {amenity}
                </div>
              ))}
            </div>
          </div>
          <aside className="rounded-3xl border border-ink/10 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-ink/50">
              Stay details
            </p>
            <p className="mt-4 text-3xl font-serif">{formatPrice(room.pricePerNight)}</p>
            <p className="text-sm text-ink/60">per night</p>
            <div className="mt-6 space-y-2 text-sm text-ink/70">
              <p>Size: {room.size}</p>
              <p>Capacity: {room.capacity} guests</p>
              <p>Bed: {room.bedType}</p>
            </div>
            <Button href={`/rooms/reservation?room=${room.slug}`} className="mt-8 w-full">
              Reserve this suite
            </Button>
          </aside>
        </div>
      </Container>
    </section>
  );
}

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}
