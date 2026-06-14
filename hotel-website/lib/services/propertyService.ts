import type { PropertyApiResponse } from "../../types/property";

export const DEFAULT_PROPERTY_ID = 3451;
const DIRECT_FIND_BY_ID_BASE = "https://api.thehotelmate.co/api/thm/findById";
const DIRECT_AVAILABILITY_BASE = "https://api.thehotelmate.co/api/thm/checkAvailability";
const MAX_RETRY_ATTEMPTS = 3;
const INITIAL_RETRY_DELAY_MS = 400;

function delay(ms: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const timeoutId = setTimeout(resolve, ms);
    if (!signal) return;

    const abortHandler = () => {
      clearTimeout(timeoutId);
      reject(new DOMException("Request aborted", "AbortError"));
    };

    if (signal.aborted) {
      abortHandler();
      return;
    }

    signal.addEventListener("abort", abortHandler, { once: true });
  });
}

async function fetchWithRetry<T>(
  execute: () => Promise<T>,
  signal?: AbortSignal,
  attempts = MAX_RETRY_ATTEMPTS,
) {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await execute();
    } catch (error) {
      lastError = error;
      if ((error as Error).name === "AbortError" || attempt === attempts) {
        throw error;
      }
      const retryDelay = INITIAL_RETRY_DELAY_MS * 2 ** (attempt - 1);
      await delay(retryDelay, signal);
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Request failed");
}

export async function fetchPropertyById(
  id = DEFAULT_PROPERTY_ID,
  options?: { signal?: AbortSignal; cache?: RequestCache; next?: NextFetchRequestConfig },
): Promise<PropertyApiResponse | null> {
  return fetchWithRetry(async () => {
    const directResponse = await fetch(`${DIRECT_FIND_BY_ID_BASE}/${id}`, {
      method: "GET",
      signal: options?.signal,
      headers: {
        Accept: "application/json",
      },
      cache: options?.cache ?? "no-store",
      next: options?.next,
    });

    if (!directResponse.ok) {
      throw new Error(`Failed to fetch property data (${directResponse.status})`);
    }

    const directPayload = (await directResponse.json()) as PropertyApiResponse | null;
    return directPayload ?? null;
  }, options?.signal);
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
  options?: { signal?: AbortSignal; cache?: RequestCache; next?: NextFetchRequestConfig },
): Promise<PropertyApiResponse | null> {
  const searchParams = new URLSearchParams({
    fromDate: query.fromDate,
    toDate: query.toDate,
    noOfRooms: String(query.noOfRooms ?? 1),
    noOfPersons: String(query.noOfPersons ?? 1),
  });

  try {
    return await fetchWithRetry(async () => {
      const directAvailabilityResponse = await fetch(
        `${DIRECT_AVAILABILITY_BASE}/${id}?${searchParams.toString()}`,
        {
          method: "GET",
          signal: options?.signal,
          headers: {
            Accept: "application/json",
          },
          cache: options?.cache ?? "no-store",
          next: options?.next,
        },
      );
      if (!directAvailabilityResponse.ok) {
        throw new Error(`Failed to fetch availability (${directAvailabilityResponse.status})`);
      }
      const payload = (await directAvailabilityResponse.json()) as PropertyApiResponse | null;
      return payload ?? null;
    }, options?.signal);
  } catch (error) {
    if ((error as Error).name === "AbortError") {
      throw error;
    }
    // fallback to base property payload
  }

  return fetchPropertyById(id, { signal: options?.signal, cache: options?.cache ?? "no-store", next: options?.next });
}
