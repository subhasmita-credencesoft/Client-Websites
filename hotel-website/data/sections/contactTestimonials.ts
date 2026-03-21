export type ContactTestimonial = {
  id: string;
  quote: string;
  name: string;
  source: string;
  avatar: string;
};

export const CONTACT_TESTIMONIALS: ContactTestimonial[] = [
  {
    id: "review-1",
    quote:
      "Thank you for a truly amazing stay! Your hospitality is quite outstanding. The sports centre is also very good with excellent quality tennis courts. Hope to be back soon.",
    name: "Annie Hebert",
    source: "Review from TripAdvisor",
    avatar: "/images/room_1.jpg",
  },
  {
    id: "review-2",
    quote:
      "We arrived early and we couldn't check but were exhausted. As soon as a room was cleaned and ready we were checked in at 10:30 not 3pm. This was extremely good.",
    name: "Conie Corleone",
    source: "Review from TripAdvisor",
    avatar: "/images/room_2.jpg",
  },
];
