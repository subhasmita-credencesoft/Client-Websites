"use client";

import Link from "next/link";
import Container from "../ui/Container";

const tourUrl =
  "https://www.google.co.in/maps/@18.8171454,73.3046935,3a,75y,230.79h,90t/data=!3m8!1e1!3m6!1s9axrwQcgs_QAAAQvxYVCdQ!2e0!3e2!6s%2F%2Fgeo1.ggpht.com%2Fcbk%3Fpanoid%3D9axrwQcgs_QAAAQvxYVCdQ%26output%3Dthumbnail%26cb_client%3Dmaps_sv.tactile.gps%26thumb%3D2%26w%3D203%26h%3D100%26yaw%3D64.35467%26pitch%3D0%26thumbfov%3D100!7i13312!8i6656?shorturl=1";

const diningItems = [
  {
    title: "UK's Resort Restaurant",
    label: "Restaurant Dining",
    description:
      "Enjoy a hearty lunch and a delectable dinner with delicious local cuisine and popular Indian favorites.",
    image: "https://bookonelocal.in/cdn/Copy of IMG_2912.avif",
    position: "center",
  },
  {
    title: "Traditional Cuisine Hall",
    label: "Indian | Mughlai | Chinese",
    description:
      "Choose from Indian, Mughlai, and Chinese delicacies served with warm hospitality for families and groups.",
    image: "https://bookonelocal.in/cdn/Copy-of-IMG_2927.avif",
    position: "center 42%",
  },
  {
    title: "Wedding Dining Hall",
    label: "Wedding Dining",
    description:
      "Celebrate wedding functions with curated dining menus, spacious seating, and festive service.",
    image: "https://bookonelocal.in/cdn/Copy of IMG_2910.avif",
    position: "center 40%",
  },
  {
    title: "Outer Garden Dining",
    label: "Outdoor Dining",
    description:
      "Take your meals in a lush green open-air setting between Mumbai and Pune with a peaceful resort ambience.",
    image: "https://bookonelocal.in/cdn/Copy of IMG_3968.avif",
    position: "center 32%",
  },
  {
    title: "Corporate & Group Dining",
    label: "Conference | Team Events",
    description:
      "Plan official getaways, conferences, and one-day trips with coordinated buffet spreads and full dining support.",
    image: "https://bookonelocal.in/cdn/Copy of IMG_4025.JPG",
    position: "center 36%",
  },
];

export default function DiningShowcase() {
  return (
    <section className="bg-[#f3f2ee] py-12 text-[#1f3c44] sm:py-16 lg:py-20">
      <Container>
        <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#cda374]/60 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[#c78946]">
              UK&apos;s Resort Dining
            </div>
            <h2 className="mt-4 max-w-[12ch] font-serif text-[2.2rem] leading-[0.95] text-[#1f3c44] sm:text-[2.8rem] md:text-[3.2rem]">
              Delicious local cuisines served with warm hospitality
            </h2>
          </div>

          <div className="max-w-md text-[0.95rem] leading-7 text-[#1f3c44]/75 sm:text-sm">
            <p>
           No holiday can be complete without building up a ravenous appetite. UK's Resort offers plenty of tongue-tingling cuisines. We pride ourselves on our variety of cuisine that is as innovative as it is appetizing. You can opt for Delicious Chinese, Mughlai and Indian Cuisine. The Restaurant caters to the tastes of each of its Guests. Our Friendly Professional Staff are always on hand to offer advice and assistance with each and every aspect of your meal. Enjoy a hearty lunch and a delectable dinner at UK's Resort. Non-vegetarian or vegetarian — it does not matter as you get sumptuous varieties of dishes in both categories.
            </p>
            <Link
              href="/dining"
              className="mt-5 inline-flex text-[0.68rem] font-semibold uppercase tracking-[0.18em] sm:text-xs sm:tracking-[0.3em]"
            >
              Discover more
            </Link>
          </div>
        </div>
      </Container>

      <div className="dining-scroll-wrap mt-8 overflow-x-auto px-4 pb-2 sm:mt-10 sm:px-6 lg:px-8">
        <div className="dining-card-track flex min-w-max gap-4">
          {diningItems.map((item) => (
            <article
              key={item.title}
              className="group relative h-[30rem] w-[18.7rem] overflow-hidden rounded-[12px] bg-black sm:w-[20rem] lg:w-[21rem]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                style={{ backgroundImage: `url('${item.image}')`, backgroundPosition: item.position }}
                role="img"
                aria-label={item.title}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black/90" />

              <div className="relative z-10 flex h-full flex-col justify-end p-5 text-white sm:p-6">
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/80">
                  {item.label}
                </span>
                <h3 className="mt-2 font-serif text-[2rem] leading-[0.92] text-white">{item.title}</h3>

                <div className="dining-extra mt-4 max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-out group-hover:max-h-40 group-hover:opacity-100">
                  <p className="text-[0.72rem] leading-relaxed text-white/90 sm:text-[0.78rem]">{item.description}</p>
                  <button
                    type="button"
                    onClick={() => window.open(tourUrl, "_blank")}
                    className="mt-4 inline-flex text-[0.62rem] font-semibold uppercase tracking-[0.2em] underline underline-offset-4"
                  >
                    Learn more
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .dining-scroll-wrap {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .dining-scroll-wrap::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
