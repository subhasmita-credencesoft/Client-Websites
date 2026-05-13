
export async function fetchPropertyData(propertyId: number) {
  const response = await fetch(`https://api.thehotelmate.co/api/thm/findById/${propertyId}`, {
    next: { revalidate: 60 }, // Revalidate every minute for property details
    headers: {
      "Accept": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch property data: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchAvailability(propertyId: number, checkIn: string, checkOut: string) {
  const response = await fetch(`https://api.thehotelmate.co/api/thm/checkAvailability/${propertyId}?checkIn=${checkIn}\u0026checkOut=${checkOut}`, {
    cache: "no-store", // Availability must always be fresh
    headers: {
      "Accept": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch availability: ${response.statusText}`);
  }

  return response.json();
}
