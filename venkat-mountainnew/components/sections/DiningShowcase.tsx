"use client";

import Link from "next/link";
import Container from "../ui/Container";

const tourUrl =
  "https://www.google.co.in/maps/@18.8171454,73.3046935,3a,75y,230.79h,90t/data=!3m8!1e1!3m6!1s9axrwQcgs_QAAAQvxYVCdQ!2e0!3e2!6s%2F%2Fgeo1.ggpht.com%2Fcbk%3Fpanoid%3D9axrwQcgs_QAAAQvxYVCdQ%26output%3Dthumbnail%26cb_client%3Dmaps_sv.tactile.gps%26thumb%3D2%26w%3D203%26h%3D100%26yaw%3D64.35467%26pitch%3D0%26thumbfov%3D100!7i13312!8i6656?shorturl=1";

const diningItems = [
  {
    title: "UK's Main Restaurant",
    label: "Dining",
    description:
      "Enjoy a hearty lunch and delectable dinner with a variety of Indian, Chinese and Mughlai cuisines.",
    image: "/images/1.avif",
  },
  {
    title: "Poolside Dining",
    label: "Outdoor Dining",
    description:
      "Relax by the pool with refreshing drinks and light bites in a serene atmosphere.",
    image: "/images/2.avif",
  },
  {
    title: "Banquet Hall",
    label: "Events & Dining",
    description:
      "Perfect for celebrations, corporate events and group dining with premium catering.",
    image: "/images/3.avif",
  },
  {
    title: "Garden Restaurant",
    label: "Outdoor Seating",
    description:
      "Dine amidst lush green lawns with fresh air and a relaxing natural ambiance.",
    image: "/images/4.avif",
  },
  {
    title: "Bar & Lounge",
    label: "Bar",
    description:
      "Unwind with curated cocktails, chilled beverages and a vibrant evening atmosphere.",
    image: "/images/5.avif",
  },
];

export default function DiningShowcase() {
  return (
    <section className="bg-[#f3efe8] py-12 text-[#1f3c44] sm:py-16 lg:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-10">
          <div>
            <div className="flex items-center gap-4 text-[0.68rem] uppercase tracking-[0.22em] sm:gap-6 sm:text-xs sm:tracking-[0.35em]">
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
              No holiday can be complete without building up a ravenous
              appetite. UK&apos;s Resort offers plenty of tongue-tingling
              cuisines. We pride ourselves on our variety of cuisine that is as
              innovative as it is appetizing. You can opt for Delicious Chinese,
              Mughlai and Indian Cuisine. The Restaurant caters to the tastes of
              each of its Guests. Our Friendly Professional Staff are always on
              hand to offer advice and assistance with each and every aspect of
              your meal. Enjoy a hearty lunch and a delectable dinner at
              UK&apos;s Resort. Non-vegetarian or vegetarian — it does not
              matter as you get sumptuous varieties of dishes in both categories.
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
              <h3 className="mt-2 font-serif text-[1.05rem] sm:text-lg">
                {item.title}
              </h3>
              <div className="mt-3 max-h-20 overflow-hidden text-[0.72rem] text-white/80 transition-all duration-300 sm:mt-4 sm:max-h-0 sm:text-xs sm:group-hover:max-h-20">
                <p>{item.description}</p>
                <button
                  type="button"
                  onClick={() => window.open(tourUrl, "_blank")}
                  className="mt-3 inline-flex text-[0.62rem] font-semibold uppercase tracking-[0.18em] underline sm:text-[0.65rem] sm:tracking-[0.3em]"
                >
                  Take a Virtual Tour
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}