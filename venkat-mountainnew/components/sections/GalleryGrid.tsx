import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import gallery from "../../data/gallery";

type GalleryGridProps = {
  title?: string;
  subtitle?: string;
};

export default function GalleryGrid({
  title = "Gallery of quiet moments.",
  subtitle = "A glimpse into the textures, light, and scenes of the resort.",
}: GalleryGridProps) {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading eyebrow="Gallery" title={title} subtitle={subtitle} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="h-52 rounded-2xl bg-sand"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              aria-label={item.title}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
