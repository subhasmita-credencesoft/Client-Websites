import Container from "../ui/Container";

const meetingCards = [
  {
    title: "Food for thought",
    description:
      "With accomplished chefs on hand, we curate the perfect menu to feed your mind and boost productivity.",
    image: "/images/wedding-img4.jpg",
  },
  {
    title: "A full-service menu",
    description:
      "From expert meeting consultants and events concierge to on-site business support.",
    image: "/images/wedding-img5.jpg",
  },
  {
    title: "Tempting technology",
    description:
      "Help yourself to high-end equipment, full tech support and free Wi-Fi access.",
    image: "/images/wedding-img6.jpg",
  },
  {
    title: "Meet responsibly",
    description:
      "Book a meeting that gives back, with all the ingredients to make it a success.",
    image: "/images/wedding-img7.jpg",
  },
];

export default function WeddingsMeetings() {
  return (
    <section className="bg-[#f6f3ed] py-20 text-[#1f3c44]">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs uppercase tracking-[0.45em] text-[#1f3c44]/70">
            Why us
          </span>
          <h2 className="mt-6 font-serif text-4xl leading-tight md:text-5xl">
            Meetings that satisfy
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#1f3c44]/75">
            Our team of experienced consultants are here to help, ensuring your
            needs are met and your event runs smoothly.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {meetingCards.map((card) => (
            <div key={card.title} className="space-y-4">
              <div className="overflow-hidden rounded-2xl bg-[#e2dacd] shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-48 w-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl">{card.title}</h3>
                <p className="text-sm leading-7 text-[#1f3c44]/75">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
