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
  paymentMode: "Cash" | "Card" | "Online" | "Charge to Room";
  specialNotes?: string;
  cartTotal: number;
  propertyId: number;
  propertyName: string;
};

export async function processRestaurantPayment(input: RestaurantOrderInput) {
  const calculatedTotal = input.cartTotal * 1.05;
  const taxAmount = input.cartTotal * 0.05;

  const payload = {
    id: null,
    createdBy: null,
    createdDate: null,
    lastModifiedBy: null,
    lastModifiedDate: null,
    accountName: null,
    accountNumber: null,
    advancePayment: false,
    bankName: null,
    billNo: null,
    bookingCommissionAmount: null,
    branchName: null,
    businessEmail: "devashishgoswami1989@gmail.com",
    businessServiceId: null,
    businessServiceName: null,
    callbackUrl: null,
    cardNumber: null,
    channelCommissionAmount: 0,
    chargeAbleToBooking: input.paymentMode === "Charge to Room",
    clientSecret: null,
    companyId: null,
    companyName: null,
    convenienceFee: 0,
    counterName: null,
    counterNumber: null,
    creditSettled: false,
    currency: "INR",
    customerName: input.customerName,
    cvv: null,
    date: Date.now(),
    decryptedData: null,
    deliveryChargeAmount: 0,
    description: input.specialNotes || null,
    dueDate: null,
    email: input.email,
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
    name: input.customerName,
    netReceivableAmount: parseFloat(calculatedTotal.toFixed(2)),
    operatorName: null,
    orderDeliveryMethod: null,
    orderId: null,
    otherChargesAmount: 0,
    paymentGateway: null,
    paymentMode: input.paymentMode === "Charge to Room" ? "Cash" : input.paymentMode,
    paymentType: null,
    propertyId: input.propertyId,
    propertyName: input.propertyName,
    propertyWebsite: null,
    razorpayOrderId: null,
    receiptNumber: null,
    receiptUrl: null,
    referenceNumber: input.referenceNumber || null,
    roomNumber: input.roomNumber || null,
    serviceChargeAmount: 0,
    serviceId: null,
    sourceOfBooking: null,
    status: input.paymentMode === "Online" ? "Paid" : "NotPaid",
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

  const data = await response.json();
  return {
    ...payload,
    id: data?.id || 1458946,
    referenceNumber: data?.referenceNumber || input.referenceNumber || "GDC-B-581"
  };
}
