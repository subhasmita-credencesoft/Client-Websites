export type GalleryImage = {
  src: string;
  alt: string;
};

export default function RoomsGalleryStrip({ images }: { images: GalleryImage[] }) {
  return (
    <section className="rooms-gallery-strip">
      {images.map((image, index) => (
        <img key={index} src={image.src} alt={image.alt} />
      ))}
    </section>
  );
}
