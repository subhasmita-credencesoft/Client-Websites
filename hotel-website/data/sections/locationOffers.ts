export type LocationOfferSlide = {
  id: string;
  image: string;
  label: string;
  title: string;
  description: string;
};

export const LOCATION_OFFER_SLIDES: LocationOfferSlide[] = [
  {
    id: "offer-1",
    image: "/images/special_offers1.jpg",
    label: "Early Booking",
    title: "15% Off Advance Reservations",
    description: "Plan ahead and enjoy exclusive savings when you book your stay in advance.",
  },
  {
    id: "offer-2",
    image: "/images/special_offers2.jpg",
    label: "Summer Escape",
    title: "Complimentary Breakfast",
    description: "Start your mornings with a freshly prepared breakfast included in your stay.",
  },
];
