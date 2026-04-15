import Container from "../ui/Container";

const highlights = [
  {
    title: "Dine & Drink",
    subtitle: "Culinary and Cocktails",
    image: "/images/room_2.jpg",
  },
  {
    title: "Amenities",
    subtitle: "Fitness center, swimming pool, lounge & shop",
    image: "/images/room_3.jpg",
  },
  {
    title: "Special Events",
    subtitle: "Celebrate in elegance",
    image: "/images/wedding-img4.jpg",
  },
];

export default function ContactHighlights() {
  return (
    <section className="bg-[#f6f3ed] py-20 text-[#1f3c44]">
      <Container>
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.45em] text-[#1f3c44]/70">
            The Highlights
          </span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl">
            Enjoy every moment
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-3xl"
            >
              <div
                className="h-80 w-full bg-cover bg-center transition duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${item.image})` }}
                role="img"
                aria-label={item.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="font-serif text-2xl">{item.title}</h3>
                <p className="mt-2 text-sm text-white/80">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
