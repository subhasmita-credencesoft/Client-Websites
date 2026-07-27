export type LocationOfferSlide = {
  id: string;
  image: string;
  label: string;
  title: string;
  description: string;
  href: string;
};

export const LOCATION_OFFER_SLIDES: LocationOfferSlide[] = [
  {
    id: "offer-1",
    image: "https://bookonelocal.in/cdn/room_3.jpg",
    label: "Early Booking",
    title: "  Reservations",
    description: "Plan ahead and enjoy exclusive savings when you book your stay in advance.",
    href: "https://bookone.io/UK-s-Resort-Khopoli",
  },
  {
    id: "offer-2",
    image: "https://bookonelocal.in/cdn/Copy of IMG_2912.avif",
    label: "Summer Escape",
    title: "Complimentary Breakfast",
    description: "Start your mornings with a freshly prepared breakfast included in your stay.",
    href: "https://bookone.io/UK-s-Resort-Khopoli",
  },
];
