'use client';

import { useContact } from '@/components/providers/PropertyProvider';

const MESSAGE = "Hello Malhar Baug Resort, I'd like to make a booking";

export default function WhatsAppFloat() {
  const contact = useContact();

  if (!contact.whatsapp) return null;

  return (
    <a
      href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-colors duration-200 hover:bg-green-600"
    >
      <iconify-icon icon="solar:chat-round-dots-bold" width="28" height="28"></iconify-icon>
    </a>
  );
}
