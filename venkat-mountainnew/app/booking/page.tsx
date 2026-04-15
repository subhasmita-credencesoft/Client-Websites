import { redirect } from "next/navigation";

import { siteMeta } from "@/lib/site-data";

export default function BookingPage() {
  redirect(siteMeta.bookingEngineHref);
}
