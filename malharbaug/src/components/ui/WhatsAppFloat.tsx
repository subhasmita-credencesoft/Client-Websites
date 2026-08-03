'use client';

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/919876543210?text=Hello%20Malhar%20Baug%20Resort%2C%20I%27d%20like%20to%20make%20a%20booking"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-colors duration-200 hover:bg-green-600"
    >
      <iconify-icon icon="solar:chat-round-dots-bold" width="28" height="28"></iconify-icon>
    </a>
  );
}
