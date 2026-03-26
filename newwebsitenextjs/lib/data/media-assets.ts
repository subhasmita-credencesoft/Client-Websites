export const heroVideoUrls = [
  "",
];

export const heroBackgroundUrls = [
  "/images/DSC08849.avif",
];

export function pickRandomMedia() {
  const video = heroVideoUrls[Math.floor(Math.random() * heroVideoUrls.length)];
  const background = heroBackgroundUrls[Math.floor(Math.random() * heroBackgroundUrls.length)];
  return { video, background };
}
