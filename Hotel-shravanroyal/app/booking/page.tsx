import { redirect } from "next/navigation";
import { hotelInfo } from "@/data/hotel";

export default function BookingRoute() {
  redirect(hotelInfo.bookingUrl);
}
