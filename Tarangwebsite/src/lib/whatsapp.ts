import { SITE_CONFIG } from '@/config/site.config';

interface WhatsAppReservationParams {
  bookingRef: string;
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  guestCity?: string;
  roomTitle: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  adults: number;
  children: number;
  addonsList: string[];
  grandTotal: number;
  specialRequests?: string;
}

export function generateWhatsAppBookingUrl(params: WhatsAppReservationParams): string {
  const addonsText =
    params.addonsList.length > 0
      ? `\n*Add-ons:*\n${params.addonsList.map((a) => `• ${a}`).join('\n')}`
      : '';

  const message = `*New Reservation Request - Tarangan Resort, Nagaon*
Reference ID: ${params.bookingRef}
Guest Name: ${params.guestName}
Phone: ${params.guestPhone}
Email: ${params.guestEmail || 'N/A'}
From City: ${params.guestCity || 'N/A'}

*Accommodation:* ${params.roomTitle}
*Stay Dates:* ${params.checkInDate} to ${params.checkOutDate} (${params.nights} Night${params.nights > 1 ? 's' : ''})
*Guests:* ${params.adults} Adults${params.children > 0 ? `, ${params.children} Children` : ''}${addonsText}

*Estimated Total:* ₹${params.grandTotal.toLocaleString('en-IN')} (incl. 12% GST)
*Special Request:* ${params.specialRequests || 'None'}

Please confirm availability and share bank/UPI payment details for confirmation.`;

  return `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function generateWhatsAppQuickChatUrl(customMessage?: string): string {
  const defaultText = `Hello Tarangan Resort Nagaon! I would like to inquire about room availability and tariffs.`;
  return `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    customMessage || defaultText
  )}`;
}
