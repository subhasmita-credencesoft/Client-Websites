import { img } from "./images";
import { site } from "./site";

export type IconName =
  | "bed" | "utensils" | "users" | "map-pin" | "wifi" | "snowflake" | "monitor" | "coffee"
  | "heart" | "briefcase" | "party" | "mic";

const city = site.address.city;

/** Page copy that is not tied to a data model: one place to edit all wording. */
export const content = {
  home: {
    eyebrow: "Hotel The Taksonz",
    title: ["A better way", "to stay."],
    subtitle: `Contemporary comfort in the heart of ${city}.`,
    primaryCta: "Explore the Stay",
    secondaryCta: "Discover The Taksonz",
    marquee: ["Rooms & Suites", "Fine Dining", "Banquets", "Meetings", city],
    offer: {
      eyebrow: "What we offer",
      title: "Designed for the way you travel.",
      intro:
        "Whether you're here for business, a celebration or a well-deserved break, The Taksonz offers a seamless blend of comfort, convenience and contemporary style.",
      tiles: [
        { href: "/rooms", image: img("altroom"), title: "Rooms & Suites", text: "Elegant rooms and suites designed for your comfort." },
        { href: "/dining", image: img("dining"), title: "Dining & Bar", text: "Savour a range of cuisines, from local favourites to global flavours." },
        { href: "/banquets", image: img("banquets"), title: "Banquets & Meetings", text: "Elegant spaces for weddings, social events and corporate gatherings." },
        { href: "/location", image: img("city-landmark"), title: `Discover ${city}`, text: "Explore the city and find your way to the hotel." },
      ],
    },
    about: {
      eyebrow: "About Hotel The Taksonz",
      title: `A warm welcome in the heart of ${city}.`,
      text: "Hotel The Taksonz blends contemporary comfort, refined spaces, and warm hospitality right on Grand Trunk Road, Ludhiana. From restful stays and rich dining to grand banquets and business conferences, we craft every detail for a seamless stay.",
      cta: "Learn more about us",
      image: img("taksonzhome"),
    },
    rooms: { eyebrow: "Accommodation", title: "Rooms made for rest.", intro: "Four categories, each planned around comfort, light and quiet.", cta: "View all rooms" },
    diningSplit: { eyebrow: "Dining & Bar", title: "A culinary journey awaits.", text: "Indulge in a delightful culinary experience with a diverse menu featuring local and international cuisines, crafted with the finest ingredients.", cta: "Explore dining", image: img("dining-restaurant") },
    eventsSplit: { eyebrow: "Banquets & Meetings", title: "Celebrate. Connect. Create.", text: "Elegant halls and meeting spaces for weddings, celebrations and corporate events, supported by our events team.", cta: "Plan Your Event", image: img("banquets") },
    why: {
      eyebrow: "Why stay here",
      title: "Comfort, without the complication.",
      items: [
        { icon: "bed", title: "Modern Rooms", text: "Calm, well-appointed rooms and suites." },
        { icon: "utensils", title: "Fine Dining", text: "Local and international cuisine on site." },
        { icon: "users", title: "Banquet Halls", text: "Spaces for celebrations and meetings." },
        { icon: "map-pin", title: "Prime Location", text: `On ${site.address.street}, ${city}.` },
      ],
    },
    gallery: { eyebrow: "Gallery", title: "Moments that stay with you.", cta: "View full gallery" },
    location: { eyebrow: "Location", title: `Find us in ${city}.`, image: img("city-landmark") },
    faq: { eyebrow: "FAQ", title: "Good to know.", cta: "See all questions" },
    cta: { title: "Make your stay even better.", text: "Choose your dates and let us take care of the rest.", image: img("offers-banner") },
  },

  rooms: {
    amenitiesBlock: {
      eyebrow: "In every room",
      title: "Everything you need, nothing you don’t.",
      items: [
        { icon: "wifi", title: "Free Wi-Fi" },
        { icon: "snowflake", title: "Air Conditioning" },
        { icon: "monitor", title: "Flat Screen TV" },
        { icon: "coffee", title: "Tea & Coffee Maker" },
      ],
    },
    faq: { eyebrow: "Questions", title: "About your stay." },
    cta: { title: "Ready when you are.", text: "Pick your dates and continue to booking.", image: img("offers-banner") },
  },

  dining: {
    detailsNote: "Opening hours, cuisine and seating shown here are indicative; please confirm with the hotel.",
    specialties: { eyebrow: "Menu highlights", title: "Our specialities" },
    reserve: { eyebrow: "Reserve a table", title: "Book your table for a delightful dining experience.", text: "Contact the hotel to reserve a table or ask about today’s menu.", cta: "Enquire to reserve", image: img("dining-bar") },
    faqTitle: "Dining questions",
    cta: { title: "Stay for the food. Or the other way round.", text: "Choose your dates and book a room.", image: img("dining-room") },
  },

  banquets: {
    venues: { title: "Banquets & Meeting Spaces", intro: "Elegant and versatile spaces for every occasion — from weddings and social celebrations to corporate conferences and executive meetings.", note: "Capacities and areas are indicative; the events team will confirm details." },
    occasions: {
      eyebrow: "Occasions",
      title: "Perfect for every occasion.",
      items: [
        { icon: "heart", title: "Weddings" },
        { icon: "briefcase", title: "Corporate Events" },
        { icon: "party", title: "Social Gatherings" },
        { icon: "mic", title: "Conferences" },
      ],
    },
    enquiry: { eyebrow: "Plan your event", title: "Let us make your event extraordinary.", intro: "Tell us a little about your plans and we’ll respond with availability and options.", submit: "Send event enquiry", messageLabel: "Tell us about your event" },
    faqTitle: "Event questions",
  },

  meetings: {
    venues: { title: "Meeting spaces", intro: "From private boardroom sessions to larger corporate functions. Equipment and services are confirmed with the events team for each booking.", note: "Venue specifications are indicative; the events team will confirm details." },
    enquiry: { title: "Corporate enquiry", intro: "Share your date, group size and requirements.", submit: "Send corporate enquiry", messageLabel: "Requirements" },
    faqTitle: "Questions",
  },

  about: {
    story: {
      eyebrow: "Our story",
      title: `A warm welcome in the heart of ${city}.`,
      intro: `The Taksonz is a premium hotel in ${city}, offering modern amenities and a warm, welcoming atmosphere. Our mission is to create memorable experiences for every guest, whether you are here for business, leisure or a special occasion.`,
      features: [
        { icon: "bed", title: "Modern Rooms" },
        { icon: "utensils", title: "Fine Dining" },
        { icon: "users", title: "Banquet Halls" },
        { icon: "map-pin", title: "Prime Location" },
      ],
    },
    values: { eyebrow: "Our values", title: "Comfort, care and hospitality.", text: "We believe in comfort, care and hospitality. Every detail is designed to make your stay exceptional.", cta: "Learn more", image: img("about-exterior") },
    stats: [
      { value: 100, suffix: "+", label: "Rooms & Suites" },
      { value: 5, label: "Banquet Halls" },
      { value: 1, label: "Prime Location" },
      { value: 1000, suffix: "+", label: "Happy Guests" },
    ],
    cta: { title: "Come and see for yourself.", text: "Explore our rooms and suites.", image: img("about-lobby") },
  },

  location: {
    heading: { eyebrow: "Get in touch", title: "Find us" },
    note: "Transport links and nearby attractions can be confirmed by the hotel on request.",
  },

  contact: {
    heading: { eyebrow: "Get in touch", title: "Talk to the hotel" },
    formTitle: "Send us a message",
  },

  notFound: { eyebrow: "Error 404", title: "This page has checked out.", text: "The page you’re looking for doesn’t exist or has moved. Let’s get you back on track." },
} as const;
