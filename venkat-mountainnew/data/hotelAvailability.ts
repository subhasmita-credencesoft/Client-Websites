import { imageCatalog } from "@/lib/site-data";

export type AvailabilityRoom = {
  id: number;
  slug: string;
  name: string;
  roomOnlyPrice: number;
  minimumOccupancy: number;
  maximumOccupancy: number;
  noOfRooms: number;
  image: string;
  images: string[];
  facilities: string[];
};

export const propertyAvailabilityConfig = {
  propertyId: 3521,
  defaultRooms: 1,
};

export const availabilityRooms: AvailabilityRoom[] = [
  {
    id: 8581,
    slug: "standard-room",
    name: "Standard Room",
    roomOnlyPrice: 5000,
    minimumOccupancy: 1,
    maximumOccupancy: 2,
    noOfRooms: 8,
    image: "https://bookonelocal.in/cdn/2026-04-02-061124360-image_0.jpg",
    images: [
      "https://bookonelocal.in/cdn/2026-04-02-061124360-image_0.jpg",
      "https://bookonelocal.in/cdn/2026-04-02-061124622-image_1.jpg",
      "https://bookonelocal.in/cdn/2026-04-02-080421675-DSC08723.jpg",
    ],
    facilities: ["Wifi", "Flat TV", "Room Service", "Geyser", "24 Hours Room Service", "Hand Sanitizer"],
  },
  {
    id: 8582,
    slug: "cliff-room",
    name: "Cliff View Room",
    roomOnlyPrice: 6500,
    minimumOccupancy: 1,
    maximumOccupancy: 3,
    noOfRooms: 10,
    image: "https://bookonelocal.in/cdn/2026-04-02-073101502-DSC08801.jpg",
    images: [
      "https://bookonelocal.in/cdn/2026-04-02-073101502-DSC08801.jpg",
      "https://bookonelocal.in/cdn/2026-04-02-073125239-DSC08769.jpg",
      "https://bookonelocal.in/cdn/2026-04-02-073140896-DSC08783.jpg",
    ],
    facilities: ["Wifi", "Flat TV", "Room Service", "Geyser", "24 Hours Room Service", "Hand Sanitizer"],
  },
  {
    id: 8583,
    slug: "glass-cottage",
    name: "Glass Jacuzi Room",
    roomOnlyPrice: 2000,
    minimumOccupancy: 1,
    maximumOccupancy: 4,
    noOfRooms: 1,
    image: imageCatalog.glassCottage,
    images: [imageCatalog.glassCottage],
    facilities: ["Wifi", "Flat TV", "Room Service", "Geyser", "24 Hours Room Service", "Hand Sanitizer"],
  },
  {
    id: 8584,
    slug: "family-room",
    name: "Family Room",
    roomOnlyPrice: 10000,
    minimumOccupancy: 1,
    maximumOccupancy: 3,
    noOfRooms: 2,
    image: "https://bookonelocal.in/cdn/2026-04-02-081007160-DSC08828.jpg",
    images: [
      "https://bookonelocal.in/cdn/2026-04-02-081007160-DSC08828.jpg",
      "https://bookonelocal.in/cdn/2026-04-02-081020140-DSC08812.jpg",
      "https://bookonelocal.in/cdn/2026-04-02-081041830-DSC08819.jpg",
    ],
    facilities: ["Wifi", "Flat TV", "Room Service", "Geyser", "24 Hours Room Service", "Hand Sanitizer"],
  },
  {
    id: 8585,
    slug: "bungalow",
    name: "Bunglow",
    roomOnlyPrice: 20000,
    minimumOccupancy: 2,
    maximumOccupancy: 4,
    noOfRooms: 1,
    image: "https://bookonelocal.in/cdn/2026-04-02-081456220-DSC08807.jpg",
    images: [
      "https://bookonelocal.in/cdn/2026-04-02-081456220-DSC08807.jpg",
      "https://bookonelocal.in/cdn/2026-04-02-081502983-DSC08806.jpg",
      "https://bookonelocal.in/cdn/2026-04-02-081516517-DSC08808.jpg",
    ],
    facilities: ["Wifi", "Flat TV", "Room Service", "Geyser", "24 Hours Room Service", "Hand Sanitizer"],
  },
];

export const availabilityRoomOptions = availabilityRooms.map((room) => ({
  value: room.slug,
  label: room.name.toUpperCase(),
}));
