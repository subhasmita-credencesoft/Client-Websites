/**
 * Taxi Booking JSON -> Slot Reservation JSON mapper
 * - Computes duration + finishTime
 * - Applies defaults from config
 * - Keeps all totals consistent across root + slotPricingDto + slot line
 *
 * Assumptions:
 * - taxiBooking.location.schedule.time is "HH:mm" (24h)
 * - taxiBooking.location.distance.durationMinutes may be missing
 * - slot system uses:
 *   price = afterTaxAmount
 *   beforeTax = beforeTaxAmount
 *   tax = taxAmount
 */

export type TripServiceType = string;

/* ---------------- INPUT TYPES ---------------- */

export type TaxiBooking = {
  referenceId: string;
  trip?: {
    tripType?: string;
    tripTypeValue?: string;
    tripServiceType?: TripServiceType;
  };
  location: {
    pickup: { name: string; service_address?: Address };
    dropoff: { name: string; service_address?: Address };
    schedule: {
      date: string; // YYYY-MM-DD
      time: string; // HH:mm
      returnDate?: string | null;
      returnTime?: string | null;
    };
    distance?: {
      distanceKm?: number;
      durationMinutes?: number;
    };
  };
  passengers?: {
    adults?: number;
    children?: number;
    luggage?: number;
  };
  vehicle?: {
    name?: string;
    seats?: number;
    price?: number;
    carNumber?: string;
  };
  pricing?: {
    fareQuote?: {
      total?: number;
      lines?: any[];
      notes?: string[];
    };
    currency?: string;
  };
  traveller?: {
    firstName?: string;
    lastName?: string;
    mobile?: string;
    email?: string;
    notes?: string;
  };
  verification?: {
    customer?: { id?: number; username?: string };
  };
  payment?: {
    paymentMode?: string;
    paymentId?: number;
    currency?: string;
    amount?: number;
    taxAmount?: number;
    beforeTaxAmount?: number;
    afterTaxAmount?: number;
  };
  bookingStatus?: string;
};

export type Address = {
  city?: string;
  state?: string;
  postcode?: string;
  suburb?: string | null;
  locality?: string | null;
  addressLine1?: string;
  addressLine2?: string | null;
  country?: string;
};

export type SlotConfig = {
  businessType: { id: number; name?: string };
  propertyIdByOperator?: Record<string, number>;
  operatorKey?: string;

  serviceMap: Record<
    string,
    {
      serviceTypeId: number;
      businessServiceId: number;
      serviceTypeName?: string;
      defaultBufferMins?: number;
      minDurationMins?: number;
      defaultDurationMins?: number;
      capacityPerSlot?: number;
      description?: string;
    }
  >;

  pricingDefaults?: {
    currency?: string;
    taxRate?: number;
  };

  labels?: {
    businessProductName?: string;
    businessServiceName?: string;
    businessTermLocation?: string;
    businessTermResource?: string;
  };
};

export type SlotReservation = any;

/* ---------------- MAIN MAPPER ---------------- */

export function mapTaxiToSlot(
  taxiBooking: TaxiBooking,
  config: SlotConfig
): SlotReservation {

  /* ---------- helpers ---------- */

  const round2 = (n: number) =>
    Math.round((n + Number.EPSILON) * 100) / 100;

  const nvl = <T>(v: T | null | undefined, f: T) =>
    v === null || v === undefined ? f : v;

  const parseHHmm = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    if (isNaN(h) || isNaN(m)) throw new Error(`Invalid time ${t}`);
    return h * 60 + m;
  };

  const addMinutes = (t: string, mins: number) => {
    const total = parseHHmm(t) + mins;
    const h = Math.floor((total % 1440) / 60);
    const m = total % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  const dayNameFromISO = (d: string) =>
    new Date(`${d}T12:00:00`).toLocaleDateString("en-US", {
      weekday: "long"
    });

  /* ---------- service ---------- */

  const serviceKey =
    taxiBooking.trip?.tripServiceType || "pickup_drop";

  const service =
    config.serviceMap[serviceKey] ||
    config.serviceMap["pickup_drop"];

  if (!service) {
    throw new Error(`Service mapping missing for ${serviceKey}`);
  }

  /* ---------- duration ---------- */

  const baseDuration =
    taxiBooking.location.distance?.durationMinutes ??
    service.defaultDurationMins ??
    30;

  const duration = Math.max(
    service.minDurationMins ?? 0,
    baseDuration + (service.defaultBufferMins ?? 0)
  );

  const startTime = taxiBooking.location.schedule.time;
  const finishTime = addMinutes(startTime, duration);

  /* ---------- totals ---------- */

  const afterTax =
    taxiBooking.payment?.afterTaxAmount ??
    taxiBooking.pricing?.fareQuote?.total ??
    taxiBooking.vehicle?.price ??
    0;

  const taxRate = config.pricingDefaults?.taxRate ?? 0;

  const beforeTax =
    taxiBooking.payment?.beforeTaxAmount ??
    (taxRate ? afterTax / (1 + taxRate) : afterTax);

  const tax =
    taxiBooking.payment?.taxAmount ??
    round2(afterTax - beforeTax);

  const currency =
    taxiBooking.payment?.currency ??
    taxiBooking.pricing?.currency ??
    config.pricingDefaults?.currency ??
    "INR";

  /* ---------- passengers ---------- */

  const adults = taxiBooking.passengers?.adults ?? 0;
  const children = taxiBooking.passengers?.children ?? 0;
  const noOfPerson = Math.max(1, adults + children);

  /* ---------- build slot ---------- */

  const slotReservation: SlotReservation = {
    referenceId: taxiBooking.referenceId,

    date: taxiBooking.location.schedule.date,

    businessTypeId: config.businessType.id,
    businessTypeName: config.businessType.name ?? "",

    propertyId:
      config.propertyIdByOperator?.[
        config.operatorKey ?? "DEFAULT"
      ] ?? 0,

    businessServiceTypes: [
      {
        id: service.serviceTypeId,
        businessServiceId: service.businessServiceId,
        name: service.serviceTypeName ?? "Transport",

        durationInMinutes: duration,

        slotPricingDto: {
          currency,
          beforeTaxAmount: round2(beforeTax),
          taxAmount: round2(tax),
          afterTaxAmount: round2(afterTax)
        },

        slots: [
          {
            date: taxiBooking.location.schedule.date,
            day: dayNameFromISO(
              taxiBooking.location.schedule.date
            ),
            duration,

            beforeTax: round2(beforeTax),
            tax: round2(tax),
            price: round2(afterTax),

            resourceList: [
              {
                name: taxiBooking.vehicle?.name ?? "Vehicle",
                desc: taxiBooking.vehicle?.seats
                  ? `${taxiBooking.vehicle.seats} Seater`
                  : "",
                bookedTimings: [
                  {
                    startTime,
                    finishTime,
                    duration
                  }
                ],
                locationList: [
                  { name: taxiBooking.location.pickup.name }
                ]
              }
            ]
          }
        ]
      }
    ],

    totalAmount: round2(afterTax),
    beforeTaxAmount: round2(beforeTax),
    taxAmount: round2(tax),
    afterTaxAmount: round2(afterTax),
    currency,

    noOfPerson,

    firstName: taxiBooking.traveller?.firstName ?? "",
    lastName: taxiBooking.traveller?.lastName ?? "",
    email:
      taxiBooking.traveller?.email ??
      taxiBooking.verification?.customer?.username ??
      "",
    mobile: taxiBooking.traveller?.mobile ?? "",

    notes: taxiBooking.traveller?.notes ?? "",

    bookingStatus: taxiBooking.bookingStatus ?? "NEW",

    fareLines: taxiBooking.pricing?.fareQuote?.lines ?? [],
    fareNotes: taxiBooking.pricing?.fareQuote?.notes ?? []
  };

  return slotReservation;
}
