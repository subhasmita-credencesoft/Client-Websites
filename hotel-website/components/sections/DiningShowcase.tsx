import Link from "next/link";
import Container from "../ui/Container";

const diningItems = [
  {
    title: "Ajoma Restaurant",
    label: "Dining",
    description:
      "Immerse yourself in elegance with top-notch live music, crafted cocktails, and exceptional service.",
    image:
      "https://demo2.wpopal.com/amoja/wp-content/uploads/2024/11/h1_imgbox1.jpg",
  },
  {
    title: "Mediterr Restaurant",
    label: "Traditional Cuisine",
    description: "Seasonal menus that celebrate coastal ingredients and warmth.",
    image:
      "https://demo2.wpopal.com/amoja/wp-content/uploads/2024/11/h1_imgbox2.jpg",
  },
  {
    title: "River Lounge Bar",
    label: "Lounge Bar",
    description: "Signature pours and sunset conversations by the river.",
    image:
      "https://demo2.wpopal.com/amoja/wp-content/uploads/2024/11/h1_imgbox3.jpg",
  },
  {
    title: "Light Blue Bar",
    label: "Snack Bar",
    description: "Poolside bites, chilled spritzers, and relaxed afternoons.",
    image:
      "https://demo2.wpopal.com/amoja/wp-content/uploads/2024/11/h1_imgbox4.jpg",
  },
  {
    title: "Spices Kitchen",
    label: "Dining",
    description: "Inspired flavors, open kitchen energy, and curated pairings.",
    image:
      "https://demo2.wpopal.com/amoja/wp-content/uploads/2024/11/h1_imgbox5.jpg",
  },
];

export default function DiningShowcase() {
  return (
    <section className="bg-[#f3efe8] py-20 text-[#1f3c44]">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <div className="flex items-center gap-6 text-xs uppercase tracking-[0.35em]">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#1f3c44]/30 text-sm font-semibold">
                04
              </span>
              <span>Fine Dining</span>
            </div>
            <h2 className="mt-8 font-serif text-4xl leading-tight md:text-5xl">
              Taste the best of
              <br />
              traditional cuisine
            </h2>
          </div>
          <div className="max-w-md text-sm leading-7 text-[#1f3c44]/75">
            <p>
              Let yourself be delighted with the range of gourmet choices
              available at the Aoma Resort throughout the day.
            </p>
            <Link
              href="/dining"
              className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.3em]"
            >
              Discover more
            </Link>
          </div>
        </div>
      </Container>

      <div className="mt-12 grid gap-6 px-6 md:grid-cols-2 lg:grid-cols-5">
        {diningItems.map((item) => (
          <div
            key={item.title}
            className="group relative overflow-hidden rounded-3xl"
          >
            <div
              className="h-64 w-full bg-cover bg-center transition duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${item.image})` }}
              role="img"
              aria-label={item.title}
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 text-white transition duration-300">
              <span className="text-xs uppercase tracking-[0.3em] text-white/70">
                {item.label}
              </span>
              <h3 className="mt-2 font-serif text-lg">{item.title}</h3>
              <div className="mt-4 max-h-0 overflow-hidden text-xs text-white/80 transition-all duration-300 group-hover:max-h-20">
                <p>{item.description}</p>
                <span className="mt-3 inline-flex text-[0.65rem] font-semibold uppercase tracking-[0.3em]">
                  Learn more
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
