import type { PropertyApiResponse } from "../../types/property";

export const DEFAULT_PROPERTY_ID = 3451;
const DIRECT_FIND_BY_ID_BASE = "https://api.thehotelmate.co/api/thm/findById";
const DIRECT_AVAILABILITY_BASE = "https://api.thehotelmate.co/api/thm/checkAvailability";

export async function fetchPropertyById(
  id = DEFAULT_PROPERTY_ID,
  options?: { signal?: AbortSignal },
): Promise<PropertyApiResponse | null> {
  const directResponse = await fetch(`${DIRECT_FIND_BY_ID_BASE}/${id}`, {
    method: "GET",
    signal: options?.signal,
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!directResponse.ok) {
    throw new Error(`Failed to fetch property data (${directResponse.status})`);
  }

  const directPayload = (await directResponse.json()) as PropertyApiResponse | null;
  return directPayload ?? null;
}

export type AvailabilityQuery = {
  fromDate: string;
  toDate: string;
  noOfRooms?: number;
  noOfPersons?: number;
};

export async function fetchPropertyAvailability(
  query: AvailabilityQuery,
  id = DEFAULT_PROPERTY_ID,
  options?: { signal?: AbortSignal },
): Promise<PropertyApiResponse | null> {
  const searchParams = new URLSearchParams({
    fromDate: query.fromDate,
    toDate: query.toDate,
    noOfRooms: String(query.noOfRooms ?? 1),
    noOfPersons: String(query.noOfPersons ?? 1),
  });

  try {
    const directAvailabilityResponse = await fetch(
      `${DIRECT_AVAILABILITY_BASE}/${id}?${searchParams.toString()}`,
      {
        method: "GET",
        signal: options?.signal,
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      },
    );
    if (directAvailabilityResponse.ok) {
      const payload = (await directAvailabilityResponse.json()) as PropertyApiResponse | null;
      return payload ?? null;
    }
  } catch {
    // fallback to base property payload
  }

  return fetchPropertyById(id, options);
}
