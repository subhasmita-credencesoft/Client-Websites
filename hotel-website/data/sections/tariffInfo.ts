export type TariffRow = {
  name: string;
  value: string;
};

export const TARIFF_INTRO_TEXT =
  "Review room rates, group overnight packages, and one-day picnic pricing in one place. Taxes apply as per government regulations.";
export const TARIFF_LOADING_TEXT = "Loading latest tariff details...";
export const TARIFF_CHECKIN_LABEL = "Check in Time:";
export const TARIFF_CHECKIN_TIME = "12:00 Noon";
export const TARIFF_CHECKOUT_LABEL = "Check Out Time:";
export const TARIFF_CHECKOUT_TIME = "11:00 AM";

export const TARIFF_MAIN_TABLE_TITLE = "Room Tariff for Double Occupancy";
export const TARIFF_MAIN_TABLE_ROOM_TYPE_HEADER = "Room Type";
export const TARIFF_MAIN_TABLE_PLAN_HEADER = "CP Plan (Room Rate + Break Fast)";

export const TARIFF_FALLBACK_ROWS: TariffRow[] = [
  {
    name: "Deluxe",
    value: "Rs. 3950 + {gst}% GST on Double Occupancy with Breakfast",
  },
  {
    name: "Super Deluxe",
    value: "Rs. 4950 + {gst}% GST on Double Occupancy with Breakfast",
  },
  {
    name: "Extra Person (Above 5 years)",
    value: "Rs. 1400 + {gst}% GST with Extra Mattress & Breakfast",
  },
];

export const TARIFF_GROUP_PACKAGE_TITLE_LINES = [
  "Overnight Group Package",
  "Minimum 20 guests, priced per person per night.",
  "Includes lunch, hi-tea, dinner, and breakfast.",
] as const;

export const TARIFF_GROUP_PACKAGE_OCCUPANCY_HEADER = "Occupancy";
export const TARIFF_GROUP_PACKAGE_ALL_DAYS_HEADER = "All Days";

export const TARIFF_GROUP_PACKAGE_ROWS: TariffRow[] = [
  { name: "Double Occupancy", value: "Rs. 2750 + 18 % GST" },
  { name: "Triple Occupancy", value: "Rs. 2550 + 18 % GST" },
  { name: "Quadriple Occupancy", value: "Rs. 2350 + 18 % GST" },
  { name: "Five Sharing Occupancy", value: "Rs. 2250 + 18 % GST" },
];

export const TARIFF_DAY_PICNIC_TITLE = "Tariff for One Day Picnic";
export const TARIFF_DAY_PICNIC_HIGHLIGHT =
  "For groups of 20 guests or more, the one-day picnic package is Rs. 1099 per person plus 18% GST.";
export const TARIFF_DAY_PICNIC_DETAILS = [
  "(Package Per Person Per Night include 01 Lunch, 01 Hi Tea, 01 Dinner & 01 Break Fast, Entry to Big Water Park, Rain Dance, indoor games, Outdoor Games like cricket, Football & Kids Play Park)",
  "BREAKFAST, IDLI SAMBHAR CHUTNEY, POHA, BREAD OMLETT, TEA+COFFIE, LUNCH, CHICKEN ROGAN JOSH, VEG KADAI, MIX VEG DRY, DAL FRY, JEERA RICE, ROTI, NAAN, PARATHA, SALAD, PAPAD, PICKLE, GULAB JAMUN, HI TEA, TEA+COFFIE WITH VEG SANDWICH. Any Dish apart from this will be charged extra.",
] as const;
export const TARIFF_DAY_PICNIC_FOOTNOTE = "*Rates may vary during holidays and festivals.";
