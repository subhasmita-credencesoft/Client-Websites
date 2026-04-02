export type MountainVenuePageData = {
  slug: string;
  hero: {
    title: string;
    subtitle: string;
    image: string;
  };
  stats: Array<{
    value: string;
    label: string;
  }>;
  intro: {
    eyebrow: string;
    title: string;
    body: string;
  };
  cards: Array<{
    label: string;
    title: string;
    description: string;
    image: string;
  }>;
  highlights: {
    title: string;
    items: string[];
  };
  gallery: {
    title: string;
    images: Array<{
      src: string;
      alt: string;
    }>;
  };
  experienceJourney: Array<{
    title: string;
    body: string;
    image: string;
  }>;
  cinematicBand: {
    title: string;
    body: string;
    image: string;
    tags: string[];
  };
  extraSections: Array<{
    title: string;
    body: string;
  }>;
  summary: {
    title: string;
    body: string;
  };
};

export const mountainViewDestinationPageData: MountainVenuePageData = {
  slug: "mountain-view-destination",
  hero: {
    title: "Mountain View Destination",
    subtitle: "7 acres of green landscape, scenic mountain surroundings, and a destination wedding backdrop crafted for unforgettable celebrations.",
    image: "/images/DSC08831.avif",
  },
  stats: [
    { value: "7 Acres", label: "Private green estate" },
    { value: "Mountain Views", label: "Scenic ceremony backdrop" },
    { value: "Multi-Event", label: "From Haldi to Reception" },
    { value: "All In One", label: "Stay, venue, hospitality" },
  ],
  intro: {
    eyebrow: "Venue Highlights",
    title: "A scenic destination venue designed for ceremonies, celebrations, and memorable family gatherings",
    body:
      "The Mountain, Karjat offers lush natural surroundings, valley views, open lawns, and a peaceful destination setting ideal for weddings, photography, rituals, and private event celebrations hosted in one estate.",
  },
  cards: [
    {
      label: "HIGHLIGHT",
      title: "Scenic Mountain Surroundings",
      description: "Natural mountain views and open landscapes create a beautiful destination atmosphere for ceremonies, couple portraits, and wedding storytelling moments.",
      image: "/images/DSC08849.avif",
    },
    {
      label: "HIGHLIGHT",
      title: "Spacious Event Lawns",
      description: "Large lawns support Haldi, Mehendi, Sangeet, Cocktail Night, wedding ceremonies, and receptions with comfortable guest movement.",
      image: "/images/DSC08837.avif",
    },
    {
      label: "HIGHLIGHT",
      title: "Photography-Ready Backdrops",
      description: "The property layout gives scenic corners, natural greenery, and destination-style compositions for rituals, portraits, and celebration storytelling.",
      image: "/images/DSC08846.avif",
    },
    {
      label: "HIGHLIGHT",
      title: "Private Estate Feel",
      description: "The Mountain offers a private estate atmosphere that keeps the celebration focused on the family, the couple, and the shared experience of being together.",
      image: "/images/DSC08853.avif",
    },
  ],
  highlights: {
    title: "Venue advantages",
    items: [
      "7 acres of lush green natural landscape",
      "Beautiful mountain and valley-facing views",
      "Large lawns for wedding functions and rituals",
      "Scenic photography and videography settings",
      "Private destination estate atmosphere",
      "Comfortable flow for celebrations and guest movement",
    ],
  },
  gallery: {
    title: "Venue Gallery",
    images: [
      { src: "/images/DSC08831.avif", alt: "Mountain landscape view" },
      { src: "/images/DSC08837.avif", alt: "Wedding lawn setup area" },
      { src: "/images/DSC08849.avif", alt: "Poolside mountain-facing venue" },
      { src: "/images/DSC08853.avif", alt: "Scenic venue destination corner" },
    ],
  },
  experienceJourney: [
    {
      title: "Arrival that feels like a destination reveal",
      body: "The approach into the estate sets the mood immediately, with greenery, open skies, and a mountain-facing calm that makes the celebration feel removed from the city.",
      image: "/images/DSC08831.avif",
    },
    {
      title: "Ceremonies framed by natural depth and light",
      body: "Morning rituals, couple portraits, and family moments all benefit from a softer natural backdrop that feels more cinematic than a standard venue setting.",
      image: "/images/DSC08846.avif",
    },
    {
      title: "Evenings that transition beautifully into celebration",
      body: "As the light changes, the estate holds its atmosphere with open-air elegance, making cocktails, receptions, and family gatherings feel connected to the landscape.",
      image: "/images/DSC08853.avif",
    },
  ],
  cinematicBand: {
    title: "Where celebrations unfold against the calm of the mountains",
    body: "This venue is especially suited for families who want scenery, privacy, and shared celebration flow in one place instead of moving guests between disconnected locations.",
    image: "/images/DSC08849.avif",
    tags: ["Scenic ceremonies", "Portrait-ready corners", "Private-estate feel", "Natural wedding mood"],
  },
  extraSections: [
    {
      title: "Perfect for destination wedding photography",
      body:
        "The venue naturally supports couple shoots, family portraits, ceremony frames, and celebration coverage through greenery, open views, and scenic corners spread across the estate.",
    },
    {
      title: "A calm venue setting with flexible celebration flow",
      body:
        "The Mountain's layout allows functions to move comfortably from guest arrival to rituals, ceremonies, cocktails, and receptions while preserving a private destination atmosphere.",
    },
    {
      title: "Works beautifully across intimate and larger events",
      body:
        "Whether the celebration is intimate or larger in scale, the mountain-facing setting and open property planning help create a balanced and memorable event experience.",
    },
    {
      title: "Natural beauty that strengthens the wedding mood",
      body:
        "The landscape itself becomes part of the celebration, giving events a softer, more cinematic destination feel instead of a closed indoor venue experience.",
    },
  ],
  summary: {
    title: "A destination setting that elevates every celebration",
    body: "From scenic ceremonies to open-air receptions, The Mountain gives couples and families a venue backdrop that feels private, natural, and celebration-ready throughout the full event journey.",
  },
};

export const privateEventSpacesPageData: MountainVenuePageData = {
  slug: "private-event-spaces",
  hero: {
    title: "Private Event Spaces",
    subtitle: "Dedicated zones for ceremonies, rituals, cocktails, reception functions, and family celebrations within one destination venue.",
    image: "/images/DSC08837.avif",
  },
  stats: [
    { value: "Multiple Zones", label: "Distinct event moods" },
    { value: "Private Flow", label: "Family-first movement" },
    { value: "Planner Friendly", label: "Better setup logistics" },
    { value: "Full Estate", label: "One connected celebration" },
  ],
  intro: {
    eyebrow: "Event Spaces",
    title: "Multiple private event areas planned for destination weddings, rituals, and celebration flow",
    body:
      "The Mountain, Karjat includes dedicated venue areas for Haldi, Mehendi, Sangeet, Cocktail Night, wedding ceremonies, receptions, and family gatherings so every event can be hosted with comfort, privacy, and smooth movement across the property.",
  },
  cards: [
    {
      label: "SPACE",
      title: "Ceremony & Ritual Zones",
      description: "Private spaces can be arranged for Haldi, Mehendi, wedding rituals, and traditional functions with scenic surroundings and comfortable guest access.",
      image: "/images/DSC08846.avif",
    },
    {
      label: "SPACE",
      title: "Cocktail & Reception Areas",
      description: "Open celebration spaces support cocktail evenings, music functions, reception layouts, and destination-style hospitality experiences.",
      image: "/images/DSC08849.avif",
    },
    {
      label: "SPACE",
      title: "Family Gathering Comfort",
      description: "The venue layout helps host private family functions and guest gatherings with a balanced mix of open space, stay access, and scenic ambience.",
      image: "/images/DSC08769.avif",
    },
    {
      label: "SPACE",
      title: "Flexible Event Planning",
      description: "Different areas across the estate help planners arrange each function with better flow for decor, hospitality, movement, and guest experience.",
      image: "/images/DSC08831.avif",
    },
  ],
  highlights: {
    title: "What these spaces support",
    items: [
      "Haldi and mehendi event setups",
      "Sangeet and music celebrations",
      "Wedding ceremony arrangements",
      "Cocktail and reception planning",
      "Private family event hosting",
      "Smooth multi-function venue flow",
    ],
  },
  gallery: {
    title: "Event Space Gallery",
    images: [
      { src: "/images/DSC08837.avif", alt: "Private event space overview" },
      { src: "/images/DSC08849.avif", alt: "Cocktail and poolside event zone" },
      { src: "/images/DSC08846.avif", alt: "Private gathering area" },
      { src: "/images/DSC08769.avif", alt: "Celebration venue space" },
    ],
  },
  experienceJourney: [
    {
      title: "Dedicated spaces for every ritual",
      body: "Instead of compressing every moment into one generic lawn, the estate gives different events their own energy, scale, and sense of occasion.",
      image: "/images/DSC08846.avif",
    },
    {
      title: "Smoother movement for guests and planners",
      body: "Separate celebration zones help decor teams, hospitality teams, photographers, and families move through the day with less crowding and more control.",
      image: "/images/DSC08831.avif",
    },
    {
      title: "A wedding itinerary that feels intentional",
      body: "From Haldi and Mehendi to Sangeet, Cocktail Night, and Reception, every function can feel distinct while still belonging to one estate-wide wedding story.",
      image: "/images/DSC08849.avif",
    },
  ],
  cinematicBand: {
    title: "One estate, many celebrations, one seamless family experience",
    body: "These event spaces are ideal for families who want the warmth of staying together while still giving each wedding function its own visual identity and flow.",
    image: "/images/DSC08769.avif",
    tags: ["Haldi zones", "Sangeet spaces", "Cocktail flow", "Reception-ready layouts"],
  },
  extraSections: [
    {
      title: "Spaces that support every wedding function",
      body:
        "From haldi and mehendi to cocktail evenings and receptions, The Mountain allows each celebration to happen in a dedicated space with the right atmosphere and flow.",
    },
    {
      title: "Better movement for guests, planners, and vendors",
      body:
        "Multiple event areas help planners organize decor, hospitality, music, rituals, and guest movement with less congestion and more comfort across the day.",
    },
    {
      title: "Private celebration energy without outside disturbance",
      body:
        "Because the property feels like a private estate, functions remain more focused, personal, and controlled than a standard venue with overlapping event traffic.",
    },
    {
      title: "Ideal for multi-function destination itineraries",
      body:
        "These event spaces work especially well for celebrations that unfold over several sessions, where each function needs its own setup, mood, and timing.",
    },
  ],
  summary: {
    title: "Every function can have its own space and mood",
    body: "The Mountain's event layout supports celebrations that move naturally from rituals to cocktails to receptions, helping each moment feel distinct while staying connected inside one destination property.",
  },
};

export const weddingLawnsPageData: MountainVenuePageData = {
  slug: "wedding-lawns",
  hero: {
    title: "Wedding Lawns",
    subtitle: "Open green lawns designed for ceremonies, sangeet, mehendi, and grand wedding celebrations.",
    image: "/images/DSC08831.avif",
  },
  stats: [
    { value: "Open-Air", label: "Ceremony scale and comfort" },
    { value: "Day To Night", label: "Natural to illuminated mood" },
    { value: "Large Gatherings", label: "Comfortable guest flow" },
    { value: "Scenic Backdrop", label: "Mountain-facing moments" },
  ],
  intro: {
    eyebrow: "Wedding Lawns",
    title: "Spacious lawns for destination wedding functions",
    body:
      "The Mountain's wedding lawns provide open-air space for traditional rituals, wedding ceremonies, and festive celebrations with scenic mountain surroundings and full-estate character.",
  },
  cards: [
    {
      label: "LAWN",
      title: "Ceremony-Ready Lawns",
      description: "Ample open space for rituals, varmala, and wedding setups with comfortable guest seating and clear sightlines.",
      image: "/images/DSC08837.avif",
    },
    {
      label: "LAWN",
      title: "Sangeet & Mehendi Setup",
      description: "Flexible lawn layouts for music, dance, themed decor, and family celebration energy with beautiful outdoor ambience.",
      image: "/images/DSC08849.avif",
    },
    {
      label: "LAWN",
      title: "Reception-Style Flow",
      description: "Evening reception setups work naturally on the lawns with lighting, stage, dining flow, and scenic mountain calm after sundown.",
      image: "/images/DSC08853.avif",
    },
    {
      label: "LAWN",
      title: "Scenic Backdrop",
      description: "Mountain-facing views add cinematic beauty to ceremonies and guest photography.",
      image: "/images/DSC08846.avif",
    },
  ],
  highlights: {
    title: "Lawn features",
    items: [
      "Large open-air celebration space",
      "Ideal for wedding ceremonies and rituals",
      "Scenic mountain-facing backdrop",
      "Flexible decor and layout planning",
      "Comfortable guest movement flow",
      "Perfect for day and evening functions",
    ],
  },
  gallery: {
    title: "Wedding Lawn Gallery",
    images: [
      { src: "/images/DSC08831.avif", alt: "Wedding lawn view" },
      { src: "/images/DSC08837.avif", alt: "Ceremony lawn setup" },
      { src: "/images/DSC08849.avif", alt: "Evening lawn ambience" },
      { src: "/images/DSC08853.avif", alt: "Outdoor celebration area" },
    ],
  },
  experienceJourney: [
    {
      title: "A lawn that feels grand without feeling impersonal",
      body: "The open setting allows larger gatherings, ceremony setups, and family seating while still preserving the warmth of a private-estate celebration.",
      image: "/images/DSC08837.avif",
    },
    {
      title: "Beautifully suited for rituals, entries, and portraits",
      body: "The lawn works especially well for varmala, bridal entries, phera setups, and wide-angle family moments that deserve a scenic backdrop.",
      image: "/images/DSC08849.avif",
    },
    {
      title: "A smooth shift from daylight ritual to evening reception",
      body: "As the celebration moves into the evening, the lawns support lighting, stage design, dining, and entertainment flow without losing their natural character.",
      image: "/images/DSC08853.avif",
    },
  ],
  cinematicBand: {
    title: "A wedding lawn designed for ceremony emotion and reception scale",
    body: "For families planning multiple functions or one grand central celebration, the lawns bring together openness, beauty, and guest comfort in a way that feels cinematic throughout the day.",
    image: "/images/DSC08846.avif",
    tags: ["Ceremony-ready", "Sangeet energy", "Reception scale", "Scenic entry moments"],
  },
  extraSections: [
    {
      title: "Daytime ceremony comfort",
      body:
        "The lawns support daylight ceremonies with open space, natural light, and scenic framing for rituals and family moments.",
    },
    {
      title: "Evening celebration energy",
      body:
        "The same lawns transform easily for evening sangeet and reception setups with lighting, music, and dining flow.",
    },
    {
      title: "Designed for guest flow",
      body:
        "Wide open areas allow comfortable seating, entry, and movement so the event feels smooth even for large guest counts.",
    },
    {
      title: "Flexible decor possibilities",
      body:
        "The lawns can be themed for traditional, floral, or luxury setups based on your wedding vision.",
    },
  ],
  summary: {
    title: "Wedding lawns that shape the celebration",
    body: "The Mountain lawns are crafted for the full wedding journey, from rituals to receptions, with scenic beauty and comfortable flow.",
  },
};

export const poolsideCelebrationsPageData: MountainVenuePageData = {
  slug: "poolside-celebrations",
  hero: {
    title: "Poolside Celebrations",
    subtitle: "Poolside zones for cocktails, music nights, and relaxed celebration moments.",
    image: "/images/DSC08849.avif",
  },
  stats: [
    { value: "24x7 Pool Access", label: "Leisure meets celebration" },
    { value: "Cocktail Ready", label: "Evening social energy" },
    { value: "Rain Dance Zone", label: "Fun wedding moments" },
    { value: "Photo Friendly", label: "Modern premium backdrop" },
  ],
  intro: {
    eyebrow: "Poolside",
    title: "A relaxed poolside setting for wedding festivities",
    body:
      "The poolside area creates a festive yet relaxed zone for cocktail evenings, music gatherings, rain-dance energy, and celebration moments with a destination feel.",
  },
  cards: [
    {
      label: "POOL",
      title: "Cocktail Evenings",
      description: "A natural setting for cocktail and music celebrations with open-air ambience and scenic lighting.",
      image: "/images/DSC08849.avif",
    },
    {
      label: "POOL",
      title: "Leisure + Celebration",
      description: "Poolside moments offer a strong mix of leisure and celebration during multi-day weddings, arrivals, and in-between hosting hours.",
      image: "/images/DSC08769.avif",
    },
    {
      label: "POOL",
      title: "Photo-Ready Views",
      description: "The poolside setup delivers modern, premium visuals for celebration photography and guest memories.",
      image: "/images/DSC08853.avif",
    },
    {
      label: "POOL",
      title: "Evening Festivities",
      description: "Perfect for evenings with music, lighting, and styled decor for a destination wedding mood that feels relaxed but still premium.",
      image: "/images/DSC08837.avif",
    },
  ],
  highlights: {
    title: "Poolside highlights",
    items: [
      "Ideal for cocktails and music nights",
      "Relaxed celebration atmosphere",
      "Destination-style visuals",
      "Great for evening lighting themes",
      "Blends leisure with celebration flow",
      "Perfect for guest photo moments",
    ],
  },
  gallery: {
    title: "Poolside Gallery",
    images: [
      { src: "/images/DSC08849.avif", alt: "Poolside venue view" },
      { src: "/images/DSC08769.avif", alt: "Poolside guest area" },
      { src: "/images/DSC08853.avif", alt: "Evening poolside mood" },
      { src: "/images/DSC08837.avif", alt: "Poolside celebration setup" },
    ],
  },
  experienceJourney: [
    {
      title: "A relaxed chapter inside the wedding weekend",
      body: "Poolside celebrations create a lighter, more social rhythm for guests arriving early, gathering between events, or extending the celebration beyond formal rituals.",
      image: "/images/DSC08849.avif",
    },
    {
      title: "Ideal for cocktails, music, and casual family moments",
      body: "This zone works especially well for Cocktail Night, pre-event hosting, and a more modern gathering style that complements the rest of the wedding itinerary.",
      image: "/images/DSC08769.avif",
    },
    {
      title: "Visually strong after sunset",
      body: "The poolside atmosphere becomes even more striking in the evening, when lighting, reflections, music, and decor combine into a memorable celebration setting.",
      image: "/images/DSC08853.avif",
    },
  ],
  cinematicBand: {
    title: "Poolside celebrations that feel festive, relaxed, and unmistakably destination-led",
    body: "For couples and families who want part of the wedding to feel social, modern, and leisure-rich, the poolside zone adds a distinctive chapter to the full estate experience.",
    image: "/images/DSC08837.avif",
    tags: ["Cocktail nights", "Music-led evenings", "Rain-dance moments", "Guest leisure time"],
  },
  extraSections: [
    {
      title: "Cocktail-ready energy",
      body:
        "Poolside celebrations bring a relaxed, premium energy that fits perfectly for cocktail evenings and social gatherings.",
    },
    {
      title: "Destination wedding feel",
      body:
        "The open water setting adds a luxury destination atmosphere for guests and event photography.",
    },
    {
      title: "Flexible evening setups",
      body:
        "Lighting, music, and decor can transform the poolside area into a signature evening celebration zone.",
    },
    {
      title: "Great for multi-day weddings",
      body:
        "Poolside celebrations work beautifully as a standalone function or part of a multi-day wedding itinerary.",
    },
  ],
  summary: {
    title: "Poolside moments that guests remember",
    body: "From cocktails to music nights, the poolside zone adds a relaxed celebration chapter to your destination wedding story.",
  },
};
