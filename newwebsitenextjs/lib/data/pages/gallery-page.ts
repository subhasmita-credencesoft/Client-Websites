export const galleryPageData = {
  hero: {
    eyebrow: "Gallery",
    title: "Discover The Mountain Through Stays, Spaces, Facilities, and Celebration Settings",
    description:
      "Browse a full visual gallery of resort stays, scenic event areas, and signature venue highlights across The Mountain, Karjat.",
    image: "/images/DSC08763.avif",
  },
  intro: {
    breadcrumb: "Gallery",
    title: "All Images And Facilities In One Place",
    description:
      "Explore room stays, resort facilities, destination views, private event spaces, wedding lawns, and poolside celebration settings through a dedicated image gallery.",
  },
  tabs: [
    "All Images",
    "All Facilities",
    "Mountain View Destination",
    "Private Event Spaces",
    "Wedding Lawns",
    "Poolside Celebrations",
  ] as const,
  items: [
    { src: "/images/DSC08717.avif", alt: "Standard room interior", category: "All Facilities" },
    { src: "/images/DSC08720.avif", alt: "Room and stay detail", category: "All Facilities" },
    { src: "/images/DSC08758.avif", alt: "Premium bungalow exterior", category: "All Facilities" },
    { src: "/images/DSC08759.avif", alt: "Resort stay accommodation", category: "All Facilities" },
    { src: "/images/DSC08763.avif", alt: "Mountain view destination", category: "Mountain View Destination" },
    { src: "/images/DSC08769.avif", alt: "Cliff room and premium stay", category: "All Facilities" },
    { src: "/images/DSC08801.avif", alt: "Private event and stay zone", category: "Private Event Spaces" },
    { src: "/images/DSC08802.avif", alt: "Glass cottage stay", category: "All Facilities" },
    { src: "/images/DSC08807.avif", alt: "Resort facility view", category: "All Facilities" },
    { src: "/images/DSC08812.avif", alt: "Family room interior", category: "All Facilities" },
    { src: "/images/DSC08820.avif", alt: "Private event space", category: "Private Event Spaces" },
    { src: "/images/DSC08831.avif", alt: "Wedding lawn and landscape", category: "Wedding Lawns" },
    { src: "/images/DSC08836.avif", alt: "Venue facilities and celebration zone", category: "Private Event Spaces" },
    { src: "/images/DSC08837.avif", alt: "Mountain destination lawn", category: "Mountain View Destination" },
    { src: "/images/DSC08846.avif", alt: "Poolside celebration area", category: "Poolside Celebrations" },
    { src: "/images/DSC08849.avif", alt: "Scenic poolside and event setting", category: "Poolside Celebrations" },
    { src: "/images/DSC08853.avif", alt: "Wedding lawns and event-ready estate", category: "Wedding Lawns" },
  ],
} as const;
