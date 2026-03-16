import { NextResponse } from "next/server";

const UPSTREAM_BASE_URL = "https://api.thehotelmate.co/api/thm/checkAvailability";
const UPSTREAM_PROPERTY_URL = "https://api.thehotelmate.co/api/thm/findById";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const propertyId = Number.parseInt(id, 10);

  if (Number.isNaN(propertyId)) {
    return NextResponse.json({ message: "Invalid property id" }, { status: 400 });
  }

  const requestUrl = new URL(request.url);
  const fromDate = requestUrl.searchParams.get("fromDate");
  const toDate = requestUrl.searchParams.get("toDate");
  const noOfRooms = requestUrl.searchParams.get("noOfRooms") ?? "1";
  const noOfPersons = requestUrl.searchParams.get("noOfPersons") ?? "1";

  if (!fromDate || !toDate) {
    return NextResponse.json(
      { message: "fromDate and toDate are required" },
      { status: 400 },
    );
  }

  const upstreamQuery = new URLSearchParams({
    fromDate,
    toDate,
    noOfRooms,
    noOfPersons,
  });

  try {
    const upstreamResponse = await fetch(
      `${UPSTREAM_BASE_URL}/${propertyId}?${upstreamQuery.toString()}`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
      },
    );

    if (upstreamResponse.ok) {
      const payload = await upstreamResponse.json();
      return NextResponse.json(payload, { status: 200 });
    }

    // Graceful fallback: return base property payload (includes roomList)
    const fallbackResponse = await fetch(`${UPSTREAM_PROPERTY_URL}/${propertyId}`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (fallbackResponse.ok) {
      const fallbackPayload = await fallbackResponse.json();
      return NextResponse.json(
        { ...fallbackPayload, availabilityFallback: true },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { message: "Upstream availability API failed" },
      { status: upstreamResponse.status },
    );
  } catch {
    try {
      const fallbackResponse = await fetch(`${UPSTREAM_PROPERTY_URL}/${propertyId}`, {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
      });
      if (fallbackResponse.ok) {
        const fallbackPayload = await fallbackResponse.json();
        return NextResponse.json(
          { ...fallbackPayload, availabilityFallback: true },
          { status: 200 },
        );
      }
    } catch {
      // ignore fallback error
    }
    return NextResponse.json({ message: "Unable to load room availability" }, { status: 502 });
  }
}
