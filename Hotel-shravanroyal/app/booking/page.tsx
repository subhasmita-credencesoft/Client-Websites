import type { Metadata } from "next";
import { Suspense } from "react";

import { BookingPage } from "@/components/booking/booking-page";
import { hotelInfo } from "@/data/hotel";

export const metadata: Metadata = {
  title: `Book Your Stay | ${hotelInfo.name}`,
  description:
    "Send a booking inquiry for Hotel Shravan Royal Inn with your dates, guests, and contact details.",
  alternates: {
    canonical: "/booking",
  },
};

function getLocalDateString(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function BookingRoute() {
  return (
    <Suspense>
      <BookingPage
        initialValues={{
          checkIn: getLocalDateString(),
          checkOut: getLocalDateString(1),
          guests: "1",
        }}
      />
    </Suspense>
  );
}