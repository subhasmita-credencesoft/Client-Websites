import type { PropertyImage } from "../types/property";

const ROOM_IMAGE_OVERRIDES: Record<string, string> = {
  "deluxe-room": "/images/deluxe.png",
  "super-deluxe-room": "https://bookonelocal.in/cdn/2025-12-03-123035794-1.jpg",
};

function toRoomImageKey(value: string | null | undefined) {
  return (value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getRoomDisplayImage(
  roomName: string | null | undefined,
  imageList: PropertyImage[] | null | undefined,
  fallbackImage: string,
) {
  const overrideImage = ROOM_IMAGE_OVERRIDES[toRoomImageKey(roomName)];
  return overrideImage || imageList?.[0]?.url || fallbackImage || "/images/room_3.jpg";
}
