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
   <section className="bg-[#f3efe8] py-12 text-[#1f3c44] sm:py-16 lg:py-20">
      <Container>
       <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-10">
          <div>
           <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-10">
             <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1f3c44]/30 text-[0.8rem] font-semibold sm:h-12 sm:w-12 sm:text-sm">
                04
              </span>
              <span>Fine Dining</span>
            </div>
          <h2 className="mt-6 font-serif text-3xl leading-tight sm:mt-8 sm:text-4xl md:text-5xl">
              Taste the best of
              <br />
              traditional cuisine
            </h2>
          </div>
          <div className="max-w-md text-[0.95rem] leading-7 text-[#1f3c44]/75 sm:text-sm">
            <p>
              Let yourself be delighted with the range of gourmet choices
              available at the Aoma Resort throughout the day.
            </p>
            <Link
              href="/dining"
             className="mt-5 inline-flex text-[0.7rem] font-semibold uppercase tracking-[0.18em] sm:mt-6 sm:text-xs sm:tracking-[0.3em]"
            >
              Discover more
            </Link>
          </div>
        </div>
      </Container>

     <div className="mt-8 grid gap-5 px-4 sm:mt-10 sm:px-6 md:grid-cols-2 lg:mt-12 lg:grid-cols-5 lg:gap-6">
        {diningItems.map((item) => (
          <div
            key={item.title}
            className="group relative overflow-hidden rounded-3xl"
          >
            <div
             className="h-56 w-full bg-cover bg-center transition duration-700 group-hover:scale-105 sm:h-64"
              style={{ backgroundImage: `url(${item.image})` }}
              role="img"
              aria-label={item.title}
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 text-white transition duration-300 sm:p-6">
<span className="text-[0.68rem] uppercase tracking-[0.18em] text-white/70 sm:text-xs sm:tracking-[0.3em]">
                {item.label}
              </span>
              <h3 className="mt-2 font-serif text-[1.05rem] sm:text-lg">{item.title}</h3>
<div className="mt-3 max-h-20 overflow-hidden text-[0.72rem] text-white/80 transition-all duration-300 sm:mt-4 sm:max-h-0 sm:text-xs sm:group-hover:max-h-20">
                <p>{item.description}</p>
<span className="mt-3 inline-flex text-[0.62rem] font-semibold uppercase tracking-[0.18em] sm:text-[0.65rem] sm:tracking-[0.3em]">
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
