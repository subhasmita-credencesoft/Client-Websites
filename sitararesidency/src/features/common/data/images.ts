export const sittingRoomImage = '/room.avif';
export const receptionWelcomeImage = '/sitaraabout.avif';
export const receptionComfortImage = '/Hotel Sitara Residency Kalamboli Reception (5).avif';
export const receptionLocationImage = '/Hotel Sitara Residency Kalamboli Reception (3).avif';
export const receptionDiningImage = '/Hotel Sitara Residency Kalamboli Reception (6).avif';
export const receptionRestaurantImage = '/Hotel Sitara Residency Kalamboli Reception (7).avif';
export const receptionExecutiveTripleImage = '/Hotel Sitara Residency Kalamboli Reception (7).avif';
export const receptionExecutiveFamilyImage = '/Hotel Sitara Residency Kalamboli Reception (6).avif';
export const receptionOfferImages = [
  '/Hotel Sitara Residency Kalamboli Reception (1).avif',
  '/Hotel Sitara Residency Kalamboli Reception (5).avif',
  '/Hotel Sitara Residency Kalamboli Reception (3).avif',
] as const;

export const localAreaImage = receptionLocationImage;
export const diningImage = receptionDiningImage;
export const heroImage = receptionWelcomeImage;

/**
 * URL-encoded version of the primary reception hero image, safe for use in
 * Open Graph `url:`, JSON-LD `image:`, and sitemap `<image:loc>` values.
 * Browsers and Next.js <Image> handle un-encoded paths fine; HTTP crawlers
 * (Facebook, Google, Twitter) require percent-encoded spaces and parentheses.
 */
export const receptionComfortImageUrl =
  '/Hotel Sitara Residency Kalamboli Reception (5).avif';