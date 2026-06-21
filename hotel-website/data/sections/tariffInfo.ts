export type TariffRow = {
  name: string;
  value: string;
};

export const TARIFF_INTRO_TEXT =
  "Review room rates, overnight group packages, and one-day picnic pricing in one place. Taxes apply as per government regulations.";

export const TARIFF_LOADING_TEXT = "Loading latest tariff details...";

export const TARIFF_CHECKIN_LABEL = "Check-in:";
export const TARIFF_CHECKIN_TIME = "1 PM";

export const TARIFF_CHECKOUT_LABEL = "Check-out:";
export const TARIFF_CHECKOUT_TIME = "10:00 AM";

// ✅ DOUBLE OCCUPANCY — Revised Tariff
export const TARIFF_MAIN_TABLE_TITLE = "Room Tariff for Double Occupancy";
export const TARIFF_MAIN_TABLE_ROOM_TYPE_HEADER = "Room Type";
export const TARIFF_MAIN_TABLE_PLAN_HEADER = "All Days (CP Plans — with Breakfast)*";

export const TARIFF_FALLBACK_ROWS: TariffRow[] = [
  {
    name: "Deluxe Room",
    value: "₹ 4,350 + GST on Double Occupancy with Breakfast",
  },
  {
    name: "Super Deluxe Room",
    value: "₹ 5,350 + GST on Double Occupancy with Breakfast",
  },
  {
    name: "Extra Person (Above 5 Years)",
    value: "₹ 1,400 + GST with Extra Mattress & Breakfast",
  },
];

// ✅ GROUP OVERNIGHT PACKAGE — Rates per person per night with all meals
export const TARIFF_GROUP_PACKAGE_TITLE_LINES = [
  "Overnight Stay Package — Rates Per Person Per Night",
  "Includes 01 Lunch, 01 Hi Tea, 01 Dinner & 01 Breakfast",
  "Entry to Water Park, Rain Dance, Indoor & Outdoor Games, Kids Play Park",
  "Taxes as per Government Regulations",
] as const;

export const TARIFF_GROUP_PACKAGE_OCCUPANCY_HEADER = "Occupancy";
export const TARIFF_GROUP_PACKAGE_ALL_DAYS_HEADER = "Per Person Per Night (All Meals Included)";

export const TARIFF_GROUP_PACKAGE_ROWS: TariffRow[] = [
  { name: "Double Occupancy", value: "₹ 3,550" },
  { name: "Triple Occupancy", value: "₹ 3,350" },
  { name: "Quadruple Occupancy", value: "₹ 3,150" },
  { name: "Five Sharing", value: "₹ 3,050" },
];

// ✅ ONE DAY PICNIC — ₹ 1,299 per person + GST | Minimum 20 Pax
export const TARIFF_DAY_PICNIC_TITLE = "One Day Picnic";

export const TARIFF_DAY_PICNIC_RATE = "₹ 1,399 Per Person + Taxes";
export const TARIFF_DAY_PICNIC_MIN_PAX = "Minimum 20 Pax";

export const TARIFF_DAY_PICNIC_HIGHLIGHT =
  "Includes Big Water Park, Rain Dance, Indoor Games, Outdoor Games & the following menu:";

// Full picnic menu
export const TARIFF_PICNIC_MENU = {
  breakfast: {
    label: "Breakfast",
    items: ["02 Veg", "01 Egg", "Tea + Coffee"],
  },
  lunch: {
    label: "Lunch",
    items: [
      "01 Chicken",
      "01 Veg Gravy",
      "01 Veg Dry",
      "Dal Fry",
      "Steam Rice",
      "Tandoori Roti",
      "Salad",
      "Papad",
      "Pickle",
      "01 Sweet",
    ],
  },
  hiTea: {
    label: "Hi Tea",
    items: ["Tea + Coffee with Veg Sandwich"],
  },
} as const;

export const TARIFF_DAY_PICNIC_WASH_ROOM =
  "Room for Wash & Change: ₹ 5,000 per room per day";

export const TARIFF_DAY_PICNIC_FOOTNOTE =
  "Any dish apart from the above menu will be charged extra. Taxes will be applicable as per Government Regulations.";
