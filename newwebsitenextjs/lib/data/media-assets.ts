export const heroVideoUrls = [
  "",
];

export const heroBackgroundUrls = [
  "/images/DSC08849.avif",
  "/images/DSC08831.avif",
  "/images/DSC08837.avif",
];

export function pickRandomMedia() {
  return {
    video: heroVideoUrls[0] ?? "",
    background: heroBackgroundUrls[0],
  };
}
