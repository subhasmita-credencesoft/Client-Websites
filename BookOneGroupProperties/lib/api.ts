import { buildHotelMateCheckAvailabilityUrl } from "@/lib/hotelmate-availability";

export async function fetchPropertyData(propertyId: number) {
  const response = await fetch(`https://api.thehotelmate.co/api/thm/findById/${propertyId}`, {
    next: { revalidate: 60 }, // Revalidate every minute for property details
    headers: {
      "Accept": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch property data: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchAvailability(
  propertyId: number,
  fromDate: string,
  toDate: string,
  options?: { noOfRooms?: number; noOfPersons?: number },
) {
  const url = buildHotelMateCheckAvailabilityUrl(propertyId, {
    fromDate,
    toDate,
    noOfRooms: options?.noOfRooms ?? 1,
    noOfPersons: options?.noOfPersons ?? 1,
  });
  const response = await fetch(url, {
    cache: "no-store", // Availability must always be fresh
    headers: {
      "Accept": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch availability: ${response.statusText}`);
  }

  return response.json();
}

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
  orderDeliveryMethod?: string;
  orderSlot?: string;
  cartItems?: {
    code: string;
    name: string;
    quantity: number;
    sellUnitPrice: number;
  }[];
};

const PROPERTY_PAYMENT_CONFIG: Record<string, {
  posPropertyId: number;
  slotsWebsiteId: number;
  counterNumber: string;
  counterName: string;
  businessEmail: string;
  managerName: string;
}> = {
  "shalom-maple-leaf": {
    posPropertyId: 2248,
    slotsWebsiteId: 1302,
    counterNumber: "2248",
    counterName: "Shalom Maple Leaf-2248",
    businessEmail: "shalom.bytripdip@gmail.com",
    managerName: "Rashmi Kulkarni Goswami",
  },
  "cherry-blossom": {
    posPropertyId: 2249,
    slotsWebsiteId: 1306,
    counterNumber: "2249",
    counterName: "Cherry Blossom-2249",
    businessEmail: "cherryblossom.bytripdip@gmail.com",
    managerName: "Rashmi Kulkarni Goswami",
  },
  "pool-and-pause": {
    posPropertyId: 2250,
    slotsWebsiteId: 1372,
    counterNumber: "2250",
    counterName: "Pool And Pause-2250",
    businessEmail: "poolpause.bytripdip@gmail.com",
    managerName: "Rashmi Kulkarni Goswami",
  },
  "shirke-holiday-home": {
    posPropertyId: 1513,
    slotsWebsiteId: 1166,
    counterNumber: "1513",
    counterName: "Shirke Holiday Home-1513",
    businessEmail: "shirkeholidayhome888@gmail.com",
    managerName: "Rashmi Kulkarni",
  },
  "green-didi-s-cottage": {
    posPropertyId: 2115,
    slotsWebsiteId: 1371,
    counterNumber: "2115",
    counterName: "Green Didi's Cottage-2115",
    businessEmail: "devashishgoswami1989@gmail.com",
    managerName: "Trip Dip",
  },
};

export async function fetchCheckedInGuests(bookOnePropertyId: number): Promise<any[]> {
  try {
    const response = await fetch(
      `https://api.bookone.io/api-bookone/api/booking/getGuestCheckInForRoomOrder?PropertyId=${bookOnePropertyId}`,
      {
        cache: "no-store",
        headers: {
          "Accept": "application/json",
        },
      }
    );
    if (!response.ok) return [];
    const data = await response.json();
    if (!Array.isArray(data)) return [];

    // Normalize to consistent field names used by the UI
    return data.map((g: any) => ({
      guestName: `${g.firstName || ""} ${g.lastName || ""}`.trim(),
      roomNumber: g.roomNumbers || "",           // e.g. "105" or "102,104"
      bookingReference: g.propertyReservationNumber || "",  // e.g. "GDC-B-580"
      phone: g.mobile || "",
      email: g.email || "",
      bookingId: g.id,
      customerId: g.customerId,
      planName: g.roomRatePlanName || "",
    }));
  } catch (err) {
    console.error("Failed to fetch checked-in guests from API:", err);
    return [];
  }
}

export async function fetchDeliveryOptions(propertyId: number): Promise<any[]> {
  try {
    const response = await fetch(`https://api.bookone.io/api-bookone/api/website/${propertyId}/deliveryOptions`, {
      cache: "no-store",
      headers: {
        "Accept": "application/json",
      },
    });
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Failed to fetch delivery options from API:", err);
    return [];
  }
}

export async function processRestaurantPayment(input: RestaurantOrderInput) {
  const calculatedTotal = input.cartTotal * 1.05;
  const taxAmount = input.cartTotal * 0.05;

  const slug = input.propertySlug || "";
  const config = PROPERTY_PAYMENT_CONFIG[slug] || {
    posPropertyId: input.propertyId - 1020,
    slotsWebsiteId: 1306,
    counterNumber: String(input.propertyId - 1020),
    counterName: `${input.propertyName}-${input.propertyId - 1020}`,
    businessEmail: "devashishgoswami1989@gmail.com",
    managerName: "Rashmi Kulkarni Goswami",
  };

  const midnightDate = new Date();
  midnightDate.setHours(0, 0, 0, 0);
  const dateTimestamp = midnightDate.getTime();

  // For Charge to Room orders, use BillToRoom payment mode (matches BookOne POS)
  const isBillToRoom = input.paymentMode === "Charge to Room";

  const payload = {
    id: null,
    createdBy: config.managerName,
    createdDate: dateTimestamp,
    lastModifiedBy: config.managerName,
    lastModifiedDate: dateTimestamp,
    accountName: null,
    accountNumber: null,
    advancePayment: false,
    bankName: null,
    billNo: null,
    bookingCommissionAmount: null,
    branchName: null,
    businessEmail: config.businessEmail,
    businessServiceId: null,
    businessServiceName: "Restaurants",
    callbackUrl: null,
    cardNumber: null,
    channelCommissionAmount: 0,
    chargeAbleToBooking: isBillToRoom,
    clientSecret: null,
    companyId: null,
    companyName: null,
    convenienceFee: 0,
    counterName: config.counterName,
    counterNumber: config.counterNumber,
    creditSettled: false,
    currency: "INR",
    customerName: input.customerName || null,
    cvv: null,
    date: dateTimestamp,
    decryptedData: null,
    deliveryChargeAmount: 0,
    description: input.specialNotes || null,
    dueDate: null,
    email: input.email || null,
    encryptedData: null,
    expMonth: 0,
    expYear: 0,
    expenseId: null,
    externalPaymentId: null,
    externalReference: null,
    externalTransactionNumber: null,
    failureCode: null,
    failureMessage: null,
    groupBookingReference: null,
    lastFourDigitCardNumber: null,
    name: input.customerName || null,
    netReceivableAmount: parseFloat(calculatedTotal.toFixed(2)),
    operatorName: config.managerName,
    orderDeliveryMethod: input.orderDeliveryMethod || null,
    orderId: null,
    otherChargesAmount: 0,
    paymentGateway: null,
    paymentMode: isBillToRoom ? "BillToRoom" : "Cash",
    paymentType: null,
    propertyId: config.posPropertyId,
    propertyName: input.propertyName || null,
    propertyWebsite: null,
    razorpayOrderId: null,
    receiptNumber: null,
    receiptUrl: null,
    referenceNumber: input.referenceNumber || null,
    roomNumber: input.roomNumber || null,
    bookingId: input.bookingId || null,
    orderSlot: input.orderSlot || null,
    serviceChargeAmount: 0,
    serviceId: null,
    sourceOfBooking: "Website",
    status: "NotPaid",
    swiftCode: null,
    taxAmount: parseFloat(taxAmount.toFixed(2)),
    token: null,
    totalCount: null,
    transactionAmount: parseFloat(calculatedTotal.toFixed(2)),
    transactionChargeAmount: 0
  };

  const response = await fetch("https://api.bookone.io/api-bookone/api/website/processPayment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Payment processing failed (Server returned: ${response.status})`);
  }

  const paymentData = await response.json();
  const paymentId = paymentData?.id;

  // Now create the actual order in POS
  const deliveryMethod = input.orderDeliveryMethod || "Take Away";

  // Build current dates & times formatted for POS
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const orderedDateStr = `${year}-${month}-${day}`;

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const orderedTimeStr = `${hours}:${minutes} ${ampm}`;

  let roomNo = "";
  let resourceName = "";
  let locationName = "";

  if (deliveryMethod === "Room Order") {
    roomNo = input.roomNumber || "";
    resourceName = input.roomNumber || "";
  } else if (deliveryMethod === "Dine-In") {
    roomNo = input.roomNumber || "";
    resourceName = input.roomNumber || "";
  } else if (deliveryMethod === "Take Away") {
    locationName = input.roomNumber || "";
    resourceName = input.roomNumber || "";
  } else if (deliveryMethod === "Delivery") {
    locationName = input.roomNumber || "";
    resourceName = input.roomNumber || "";
  }

  const nameParts = (input.customerName || "").trim().split(/\s+/);
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  const productDtoList = (input.cartItems || []).map(item => ({
    id: null,
    name: item.name,
    quantity: item.quantity,
    sellUnitPrice: item.sellUnitPrice,
    code: item.code
  }));

  const orderPayload = {
    propertyId: config.posPropertyId,
    bookingId: input.bookingId || null,
    businessServiceId: input.propertyId,
    businessServiceTypeId: input.slotsWebsiteId || config.slotsWebsiteId || 1306,
    currency: "INR",
    customerId: input.customerId || null,
    customerName: input.customerName || null,
    deliveryChargeAmount: deliveryMethod === "Delivery" ? 30 : 0,
    deliveryMethod: deliveryMethod,
    discountAmount: 0,
    email: input.email || null,
    externalSite: "Website",
    firstName: firstName,
    lastName: lastName,
    locationName: locationName,
    mobile: input.phone || null,
    modeOfPayment: isBillToRoom ? "BillToRoom" : "Cash",
    netAmount: parseFloat(calculatedTotal.toFixed(2)),
    orderPaymentStatus: "NotPaid",
    orderStatus: "Submitted",
    orderedDate: orderedDateStr,
    orderedTime: orderedTimeStr,
    paymentId: paymentId || null,
    planName: input.planName || null,
    productDtoList: productDtoList,
    refundAmount: 0,
    requiredDate: orderedDateStr,
    requiredTime: input.orderSlot || orderedTimeStr,
    resourceName: resourceName,
    roomNo: roomNo,
    serviceChargeAmount: 0,
    shipToAddress: {
      city: "",
      suburb: "",
      streetName: deliveryMethod === "Delivery" ? locationName : "",
      streetNumber: "",
      state: "",
      country: "India"
    },
    taxAmount: 0,
    taxDetails: [],
    totalOrderAmount: parseFloat(calculatedTotal.toFixed(2))
  };

  const orderResponse = await fetch("https://api.bookone.io/api-bookone/api/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(orderPayload),
  });

  if (!orderResponse.ok) {
    throw new Error(`Order creation failed (Server returned: ${orderResponse.status})`);
  }

  const orderData = await orderResponse.json();

  return {
    ...payload,
    id: orderData?.bookOneOrderId || orderData?.id || paymentId || 1459256,
    referenceNumber: orderData?.bookOneOrderId || orderData?.referenceNumber || input.referenceNumber || `REF-${Date.now().toString().slice(-6)}`,
    roomNumber: roomNo || locationName || input.roomNumber
  };
}
