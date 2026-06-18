export type PageHeroConfig = {
  title: string;
  backgroundImage?: string;
  backgroundImages?: string[];
  backgroundVideo?: string;
  preferVideoOnly?: boolean;
  subtitle?: string;
  breadcrumb?: string;
  minHeightClassName?: string;
  videoAriaLabel?: string;
};

export const ABOUT_HERO_CONFIG: PageHeroConfig = {
  title: "About",
  backgroundImage: "https://bookonelocal.in/cdn/3.png",
  backgroundVideo: "https://bookonelocal.in/cdn/Resort_entrance_gate_202604071226.mp4",
  subtitle: "Discover the story, spirit, and signature hospitality of UK's Resort.",
  breadcrumb: "Home / About",
};

export const AWARDS_HERO_CONFIG: PageHeroConfig = {
  title: "Awards & Recognition",
  backgroundImage: "/awards/golden-star-award-2012.jpg",
  backgroundVideo: "https://bookonelocal.in/cdn/Resort_entrance_gate_202604071226.mp4",
  subtitle: "Explore the recognitions, achievements, and guest appreciation that reflect UK's Resort over the years.",
  breadcrumb: "Home / Awards",
  minHeightClassName: "min-h-screen",
  videoAriaLabel: "Watch: UK's Resort moments and hospitality highlights",
};

export const BLOG_HERO_CONFIG: PageHeroConfig = {
  title: "Our Blog",
  backgroundImage: "/images/room_2.jpg",
  subtitle: "Stories, updates, and inspiration from UK's Resort.",
  breadcrumb: "Home / Blog",
  minHeightClassName: "min-h-[70vh]",
};

export const CONTACT_HERO_CONFIG: PageHeroConfig = {
  title: "Around Us",
  backgroundImage: "https://bookonelocal.in/cdn/Water-Park-1.jpg",
  backgroundVideo: "https://bookonelocal.in/cdn/Resort_entrance_gate_202603191317.mp4",
  subtitle: "Make UK's Resort your base for waterfalls, temples, hill stations, and theme park day trips around Khopoli.",
  breadcrumb: "Home / Around Us",
};

export const DINING_HERO_CONFIG: PageHeroConfig = {
  title: "Dining",
  backgroundImage: "https://bookonelocal.in/cdn/Copy of IMG_2912.avif",
  backgroundVideo: "https://bookonelocal.in/cdn/Create_a_cinematic_202603191718.mp4",
  subtitle: "From local favorites to classic Indian flavors, every meal at UK's Resort is made to feel warm, familiar, and satisfying.",
  breadcrumb: "Home / Dining",
  minHeightClassName: "min-h-screen",
  videoAriaLabel: "Watch: Dining and resort atmosphere at UK's Resort, Khopoli",
};

export const EXPERIENCES_HERO_CONFIG: PageHeroConfig = {
  title: "Experiences",
  backgroundImage: "https://bookonelocal.in/cdn/Copy of IMG_3980.avif",
  backgroundVideo: "https://bookonelocal.in/cdn/Experience-Page-Video.mp4",
  subtitle: "Water Fun & Play fun, sports, indoor games,Outdoor games, adventure activities, and family experiences all in one property.",
  breadcrumb: "Home / Experiences",
  minHeightClassName: "min-h-screen",
};

export const ROOMS_HERO_CONFIG: PageHeroConfig = {
  title: "Rooms ",
  backgroundImage: "https://bookonelocal.in/cdn/3.avif",
  backgroundVideo: "https://bookonelocal.in/cdn/Changed-Room-Page-Video.mp4",
  preferVideoOnly: true,
  subtitle: "Explore comfortable rooms  designed for restful stays, family comfort, and easy resort living.",
  breadcrumb: "Home / Rooms",
  videoAriaLabel: "Watch: A look inside our Deluxe and Super Deluxe rooms at UK's Resort",
};

export const TARIFF_HERO_CONFIG: PageHeroConfig = {
  title: "Tariff",
  backgroundImage: "https://bookonelocal.in/cdn/conference3-1.jpg",
  subtitle: "Transparent pricing for every stay. Taxes as per Government Regulations.",
  breadcrumb: "Home / Tariff",
  minHeightClassName: "min-h-screen",
};

export const WEDDINGS_HERO_CONFIG: PageHeroConfig = {
  title: "Events & Activities",
  backgroundImage: "https://bookonelocal.in/cdn/Copy of IMG_3980.avif",
  backgroundImages: [
    "https://bookonelocal.in/cdn/outdoor-image.jpg",
    "/children5.avif",
    "https://bookonelocal.in/cdn/conference3-1.jpg",
  ],
  subtitle: "Birthdays, family outings, school visits, sports, and corporate team days built around real resort spaces and full-day fun.",
  breadcrumb: "Home / Events & Activities",
  minHeightClassName: "min-h-screen",
};

export const WELLNESS_HERO_PAGE_CONFIG: PageHeroConfig = {
  title: "Facilities",
  backgroundImage: "https://bookonelocal.in/cdn/2.avif",
  backgroundVideo: "https://bookonelocal.in/cdn/Drone_video_of_202603191519.mp4",
  breadcrumb: "Home / Facilities",
  minHeightClassName: "min-h-screen",
};

export const OVERVIEW_HERO_CONFIG: PageHeroConfig = {
  title: "Overview",
  backgroundImage: "https://bookonelocal.in/cdn/3.png",
  backgroundVideo: "https://bookonelocal.in/cdn/Resort_entrance_gate_202604071226.mp4",
  subtitle: "A destination estate where scenic stays, hosted events, and celebration-led weekends come together.",
  breadcrumb: "Home / Overview",
};
