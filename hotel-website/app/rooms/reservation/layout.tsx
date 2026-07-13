import type { Metadata } from "next";
import { createPageMetadata } from "../../../lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Book a Room — UK's Resort Khopoli | Check Availability & Reserve Online",
  description:
    "Check room availability and complete your reservation at UK's Resort, Khopoli. Book Deluxe or Super Deluxe rooms online near Mumbai.",
  path: "/rooms/reservation",
  image: "https://bookonelocal.in/cdn/room_3.jpg",
});

export default function ReservationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
