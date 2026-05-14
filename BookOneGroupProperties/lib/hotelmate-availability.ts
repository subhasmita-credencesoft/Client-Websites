const HOTELMATE_HOST = "api.thehotelmate.co";
const CHECK_AVAILABILITY_PATH = "/api/thm/checkAvailability";

/** Matches `https://api.thehotelmate.co/api/thm/checkAvailability/1965` → 1965 */
export function parseHotelMatePropertyIdFromUrl(url: string | undefined | null): number | null {
  if (!url?.trim()) return null;
  const trimmed = url.trim();
  if (!trimmed.includes(HOTELMATE_HOST)) return null;
  const match = trimmed.match(new RegExp(`${CHECK_AVAILABILITY_PATH.replace(/\//g, "\\/")}\\/(\\d+)`));
  if (!match) return null;
  const id = Number.parseInt(match[1], 10);
  return Number.isFinite(id) ? id : null;
}

/**
 * HotelMate check-availability contract (see live API), e.g.
 * `https://api.thehotelmate.co/api/thm/checkAvailability/1965?fromDate=2026-03-16&toDate=2026-03-17&noOfRooms=1&noOfPersons=1`
 */
export function buildHotelMateCheckAvailabilityUrl(
  propertyId: number,
  input: { fromDate: string; toDate: string; noOfRooms?: number; noOfPersons: number },
): string {
  const params = new URLSearchParams({
    fromDate: input.fromDate,
    toDate: input.toDate,
    noOfRooms: String(input.noOfRooms ?? 1),
    noOfPersons: String(Math.max(1, input.noOfPersons)),
  });
  return `https://${HOTELMATE_HOST}${CHECK_AVAILABILITY_PATH}/${propertyId}?${params.toString()}`;
}
