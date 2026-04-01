export const heroVideoUrls = [""];

export const heroBackgroundUrls = [
  "https://bookonelocal.in/cdn/2025-06-24-092820440-5.jpg",
  "https://bookonelocal.in/cdn/2025-06-24-092828011-2.jpg",
  "https://bookonelocal.in/cdn/2025-06-24-092831095-3.jpg",
  "https://bookonelocal.in/cdn/2025-06-24-092839204-10.jpg",
];

export function pickRandomMedia() {
  return {
    video: heroVideoUrls[0] ?? "",
    background: heroBackgroundUrls[0],
  };
}
