export type RestaurantOrderInput = {
  customerName: string;
  email: string;
  phone: string;
  referenceNumber?: string;
  roomNumber?: string;
  bookingId?: number;
  customerId?: number;
  planName?: string;
  slotsWebsiteId?: number;
  paymentMode: "Cash" | "Charge to Room";
  specialNotes?: string;
  cartTotal: number;
  propertyId: number;
  propertyName: string;
  propertySlug: string;
  bookOnePropertyId?: number;
  hotelmatePropertyId?: number;
  orderDeliveryMethod?: string;
  orderSlot?: string;
  cartItems?: {
    code: string;
    name: string;
    quantity: number;
    sellUnitPrice: number;
  }[];
};

export type RawCheckedInGuest = {
  id?: number | null;
  customerId?: number | null;
  firstName?: string | null;
  lastName?: string | null;
  mobile?: string | null;
  email?: string | null;
  roomNumbers?: string | null;
  propertyReservationNumber?: string | null;
  roomRatePlanName?: string | null;
};

export type CheckedInGuest = {
  guestName: string;
  roomNumber: string;
  bookingReference: string;
  phone: string;
  email: string;
  bookingId: number | null;
  customerId: number | null;
  planName: string;
};

export type DeliveryOption = {
  name?: string | null;
  counterName?: string | null;
  label?: string | null;
  value?: string | null;
  description?: string | null;
  locationName?: string | null;
};

export type RestaurantPaymentResult = {
  id: number | null;
  referenceNumber: string;
  roomNumber: string;
  paymentMode: string;
  status: string;
  netReceivableAmount: number;
  [key: string]: unknown;
};