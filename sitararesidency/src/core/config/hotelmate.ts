export const hotelmate = {
  apiBaseUrl: 'https://api.thehotelmate.co/api/thm',
  propertyId: 3629,
  defaultRooms: 1,
  defaultPersons: 1,
  defaultStayNights: 1,
} as const;

// Canonical room slugs mapped to real Sitara Residency API Room IDs
export const roomSlugsById: Record<number, string> = {
  8857: 'executive-room',
  8858: 'executive-triple-room',
  8859: 'executive-family-suite',
};

// Legacy slug aliases to ensure no bookmarks or external links break
export const legacyRoomSlugAliases: Record<string, number> = {
  'the-house-room': 8857,
  'the-family-studio': 8858,
  'coast-view-king': 8859,
};

export const roomIdsBySlug: Record<string, number> = {
  ...legacyRoomSlugAliases,
  ...Object.fromEntries(
    Object.entries(roomSlugsById).map(([id, slug]) => [slug, Number(id)]),
  ),
};
