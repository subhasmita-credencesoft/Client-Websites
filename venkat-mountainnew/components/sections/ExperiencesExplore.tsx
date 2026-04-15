import Container from "../ui/Container";

const experiences = [
  {
    title: "Family",
    image: "/images/exp-img5.jpg",
    description:
      "From kids’ activities to family-friendly adventures, discover moments made for togetherness.",
  },
  {
    title: "Culture",
    image: "/images/exp-img6.jpg",
    description:
      "Immerse yourself in local traditions, art, and stories that celebrate the spirit of the island.",
  },
  {
    title: "Entertainment",
    image: "/images/exp-img7.jpg",
    description:
      "Whatever you love doing, you will find an incredible array of choices at the resort.",
  },
  {
    title: "Beach & Pools",
    image: "/images/exp-img8.jpg",
    description:
      "Sun-soaked days by the water, with serene pools and golden shoreline escapes.",
  },
  {
    title: "Adventure",
    image: "/images/exp-img4-220x300.jpg",
    description:
      "Elevate your stay with outdoor thrills, curated excursions, and signature experiences.",
  },
];

export default function ExperiencesExplore() {
  return (
    <section className="bg-[#f6f3ed] py-20 text-[#1f3c44]">
      <Container>
        <div className="space-y-8">
          <div>
            <span className="text-xs uppercase tracking-[0.45em] text-[#1f3c44]/70">
              Explore
            </span>
            <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight md:text-5xl">
              Make your stay
              <br />
              memorable
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {experiences.map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl"
              >
                <div
                  className="h-64 w-full bg-cover bg-center transition duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.image})` }}
                  role="img"
                  aria-label={item.title}
                />
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] opacity-0 transition duration-300 group-hover:opacity-100" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="font-serif text-2xl">{item.title}</h3>
                  <p className="mt-3 max-h-0 overflow-hidden text-sm text-white/80 transition-all duration-300 group-hover:max-h-20">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
