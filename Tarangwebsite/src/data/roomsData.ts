import { Room } from '@/types';

export type { Room };

// Dynamic rooms collection - all room data is loaded live via Hotel API
export const ROOMS_DATA: Room[] = [];

// Utility to find a room by either its slug or numeric ID from any dynamic room list
export function getRoomBySlugOrId(slugOrId: string, roomsList: Room[] = []): Room | undefined {
  if (!slugOrId) return undefined;
  const normalized = slugOrId.toLowerCase().trim();
  return roomsList.find(
    (r) => r.slug.toLowerCase() === normalized || r.id.toLowerCase() === normalized
  );
}
