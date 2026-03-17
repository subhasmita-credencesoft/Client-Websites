import Container from "../ui/Container";

const experiences = [
  {
    title: "Family",
    image: "https://bookonelocal.in/cdn/Copy+of+IMG_4035.JPG",
    description:
      "From kids' activities to family-friendly adventures, discover moments made for togetherness.",
  },
  {
    title: "Culture",
    image: "https://bookonelocal.in/cdn/Copy of IMG_3968.avif",
    description:
      "Immerse yourself in local traditions, art, and stories that celebrate the spirit of the island.",
  },
  {
    title: "Entertainment",
    image: "https://bookonelocal.in/cdn/adventure.png",
    description:
      "Whatever you love doing, you will find an incredible array of choices at the resort.",
  },
  {
    title: " Pools",
    image: "https://bookonelocal.in/cdn/picnic1.jpg",
    description:
      "Sun-soaked days by the water, with serene pools and golden shoreline escapes.",
  },
  {
    title: "Adventure",
    image: "https://bookonelocal.in/cdn/pic10.jpeg",
    description:
      "Elevate your stay with outdoor thrills, curated excursions, and signature experiences.",
  },
];

export default function ExperiencesExplore() {
  return (
    <section className="bg-[#f6f3ed] py-16 text-[#1f3c44] sm:py-20 lg:py-24">
      <Container>
        <div className="space-y-10">
          <div>
            <span className="text-[0.72rem] uppercase tracking-[0.45em] text-[#1f3c44]/70">Explore</span>
            <h2 className="mt-4 max-w-xl font-serif text-4xl leading-[0.98] md:text-5xl lg:text-[4.1rem]">
              Make your stay
              <br />
              memorable
            </h2>
          </div>

          <div className="experience-scroll-wrap -mx-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="experience-strip flex min-w-max gap-4 sm:gap-5 lg:gap-6">
              {experiences.map((item, index) => (
                <article
                  key={item.title}
                  className="group experience-card relative h-[24rem] w-[17rem] shrink-0 overflow-hidden rounded-[14px] bg-black sm:h-[26rem] sm:w-[18.2rem] lg:h-[31rem] lg:w-[18.5rem]"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url("${encodeURI(item.image)}")` }}
                    role="img"
                    aria-label={item.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-500 group-hover:from-black/88" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/35 bg-black/25 px-2 py-1 text-[0.62rem] font-semibold text-white/90 backdrop-blur-sm">
                    0{index + 1}
                  </div>
                  <div className="relative z-10 flex h-full flex-col justify-end p-5 text-white sm:p-6">
                    <h3 className="font-serif text-[2rem] leading-[0.95] sm:text-[2.2rem]">{item.title}</h3>
                    <p className="mt-3 max-h-0 translate-y-2 overflow-hidden text-[0.78rem] leading-relaxed text-white/85 opacity-0 transition-all duration-500 group-hover:max-h-28 group-hover:translate-y-0 group-hover:opacity-100 sm:text-[0.82rem]">
                      {item.description}
                    </p>
                    <span className="mt-4 inline-flex w-fit text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/90 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      Explore now
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        .experience-scroll-wrap {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .experience-scroll-wrap::-webkit-scrollbar {
          display: none;
        }
        @media (min-width: 1024px) {
          .experience-card {
            width: 18.5rem;
            transition: width 550ms cubic-bezier(0.22, 1, 0.36, 1), transform 550ms cubic-bezier(0.22, 1, 0.36, 1);
            transform: translateY(0);
          }
          .experience-card:hover {
            width: 23.5rem;
            transform: translateY(-4px);
          }
        }
        @keyframes experienceCardIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .experience-card {
          animation: experienceCardIn 720ms ease-out both;
        }
      `}</style>
    </section>
  );
}
