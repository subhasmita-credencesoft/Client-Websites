import { NextResponse } from "next/server";

const UPSTREAM_BASE_URL = "https://api.thehotelmate.co/api/thm/findById";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  const { id } = await context.params;
  const propertyId = Number.parseInt(id, 10);

  if (Number.isNaN(propertyId)) {
    return NextResponse.json({ message: "Invalid property id" }, { status: 400 });
  }

  try {
    const upstreamResponse = await fetch(`${UPSTREAM_BASE_URL}/${propertyId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        { message: "Upstream property API failed" },
        { status: upstreamResponse.status },
      );
    }

    const payload = await upstreamResponse.json();
    return NextResponse.json(payload, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Unable to load property data" }, { status: 502 });
  }
}
