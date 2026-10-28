"use client";

import { ImageGrid } from "@/components/gallery/ImageGrid";
import { galleryCategories, galleryImages } from "@/data/gallery";
import { useLiveRooms } from "@/lib/api/LiveRoomsProvider";

export function LiveHotelGallery({ categories }: { categories: typeof galleryCategories }) {
  const { rooms, loading } = useLiveRooms();
  const roomImages = rooms.flatMap((room) =>
    room.images.map((image) => ({ ...image, category: "Rooms" as const }))
  );
  const images = [...galleryImages, ...roomImages];

  return (
    <>
      {loading && roomImages.length === 0 && (
        <p role="status" style={{ marginBottom: "1rem", color: "var(--grey)" }}>Loading the hotel’s room photos…</p>
      )}
      <ImageGrid images={images} categories={categories} />
    </>
  );
}
