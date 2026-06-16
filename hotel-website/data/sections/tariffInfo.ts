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

// ✅ DOUBLE OCCUPANCY (MATCHED TO IMAGE)
export const TARIFF_MAIN_TABLE_TITLE = "Room Tariff for Double Occupancy";
export const TARIFF_MAIN_TABLE_ROOM_TYPE_HEADER = "Room Type";
export const TARIFF_MAIN_TABLE_PLAN_HEADER = "All Days (CP Plans)*";

export const TARIFF_FALLBACK_ROWS: TariffRow[] = [
  {
    name: "Deluxe",
    value: "₹ 3,950",
  },
  {
    name: "Super Deluxe",
    value: "₹ 4,950",
  },
  {
    name: "Extra Person",
    value: "₹ 1,450",
  },
];

// ✅ GROUP OVERNIGHT PACKAGE (UPDATED TEXT + RATES)
export const TARIFF_GROUP_PACKAGE_TITLE_LINES = [
  "Overnight Picnic for Groups",
  "Per person per night with all meals",
  "* Check-in 1 PM and Check-out 10am",
  "Taxes as per Government Regulations",
] as const;

export const TARIFF_GROUP_PACKAGE_OCCUPANCY_HEADER = "Occupancy";
export const TARIFF_GROUP_PACKAGE_ALL_DAYS_HEADER = "All Days (All Meals)*";

export const TARIFF_GROUP_PACKAGE_ROWS: TariffRow[] = [
  { name: "Double", value: "₹ 3,150" },
  { name: "Triple", value: "₹ 2,950" },
  { name: "Quadruple", value: "₹ 2,750" },
  { name: "Five Sharing", value: "₹ 2,650" },
];

// ✅ ONE DAY PICNIC (MATCHED EXACTLY)
export const TARIFF_DAY_PICNIC_TITLE = "One Day Picnic";

export const TARIFF_DAY_PICNIC_HIGHLIGHT =
  "For groups of 50 pax and above: ₹ 1,099 per person.";

export const TARIFF_DAY_PICNIC_DETAILS = [
  "Includes Breakfast, Lunch, Hi-Tea & entry to Water Fun & Play and Rain Dance.",
  "Indoor games: Chess, Carrom, Table Tennis.",
  "Outdoor games and access to Multipurpose Hall & Lawn.",
  "Adventure activities are chargeable.",
] as const;

// (Keeping this for UI safety even if not shown prominently)
export const TARIFF_DAY_PICNIC_FOOTNOTE =
  "Taxes as per Government Regulations.";
