import { img } from "./images";

export const dining = {
  name: "The Taksonz Restaurant",
  intro:
    "Indulge in a delightful culinary experience with a diverse menu featuring local and international cuisines, crafted with the finest ingredients.",
  hours: "Open daily · 7:00 AM – 11:00 PM",
  cuisine: "North Indian · Continental",
  seating: "60 guests",
  venues: [
    { id: "restaurant", label: "Restaurant", image: img("dining-restaurant"), text: "An all-day restaurant serving local and international cuisine in a warm, softly lit room." },
    { id: "bar", label: "Bar", image: img("dining-bar"), text: "A relaxed bar for evening drinks and signature cocktails." },
    { id: "room-service", label: "Room Service", image: img("dining-room"), text: "Dining brought to your room, so you can eat when it suits you." },
  ],
  specialties: [
    { name: "North Indian Thali", price: 350, image: img("dish-thali") },
    { name: "Continental Platter", price: 450, image: img("dish-platter") },
    { name: "Signature Cocktails", price: 350, image: img("dish-cocktail") },
  ],
};
