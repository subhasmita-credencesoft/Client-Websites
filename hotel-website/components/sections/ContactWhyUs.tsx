import Container from "../ui/Container";

const benefits = [
  {
    title: "World-Class Amenities",
    description:
      "Immerse yourself in elegance with top-notch live music performances and exceptional service.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M4 10h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8Z" />
        <path d="M7 10V6a5 5 0 0 1 10 0v4" />
        <path d="M8 5h8" />
      </svg>
    ),
  },
  {
    title: "Luxurious Rooms",
    description:
      "Whether you are seeking total time-out or an improvement in general health, wellbeing or fitness.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M3 12h18" />
        <path d="M5 12V9a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v3" />
        <path d="M4 16h16" />
      </svg>
    ),
  },
  {
    title: "Gorgeous Location",
    description:
      "Immerse yourself in elegance with top-notch live music performances and exceptional service.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M4 16h16" />
        <path d="M6 12c1-2 3-3 6-3s5 1 6 3" />
        <path d="M8 8l2-2 2 2" />
      </svg>
    ),
  },
  {
    title: "Dedicated Concierge",
    description:
      "Whether you are seeking total time-out or an improvement in general health, wellbeing or fitness.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M6 16h12" />
        <path d="M8 12h8" />
        <path d="M9 6h6l2 4H7l2-4Z" />
        <path d="M4 18h16" />
      </svg>
    ),
  },
  {
    title: "Packages & Tours",
    description:
      "Immerse yourself in elegance with top-notch live music performances and exceptional service.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M6 7h12v12H6z" />
        <path d="M9 7V5h6v2" />
        <path d="M9 12h6" />
      </svg>
    ),
  },
  {
    title: "Exceptional Value",
    description:
      "Whether you are seeking total time-out or an improvement in general health, wellbeing or fitness.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 3l3 5 6 .5-4.5 3.8 1.5 6.2L12 15l-6 3.5 1.5-6.2L3 8.5 9 8l3-5Z" />
      </svg>
    ),
  },
];

export default function ContactWhyUs() {
  return (
    <section className="bg-white py-20 text-[#1f3c44]">
      <Container>
        <div className="overflow-hidden rounded-3xl bg-[#f6f3ed] p-8 md:p-12">
          <div
            className="relative overflow-hidden rounded-3xl bg-cover bg-center text-white"
            style={{ backgroundImage: "url('/images/room_2.jpg')" }}
          >
            <div className="absolute inset-0 bg-black/35" />
            <div className="relative p-10 md:p-16">
              <span className="text-xs uppercase tracking-[0.45em] text-white/80">
                Why choose us
              </span>
              <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight md:text-5xl">
                Your happiness
                <br />
                guaranteed
              </h2>
            </div>
          </div>

          <div className="mt-10 grid gap-0 text-center md:grid-cols-3">
            {benefits.map((item, index) => (
              <div
                key={item.title}
                className={`px-6 py-8 ${
                  index % 3 !== 0 ? "md:border-l md:border-[#1f3c44]/15" : ""
                } ${index > 2 ? "border-t border-[#1f3c44]/15 md:border-t" : ""}`}
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center text-[#1f3c44]/70">
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#1f3c44]/65">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center font-serif text-2xl text-[#1f3c44]">
            Reservations{" "}
            <span className="text-[#c97a42]">(084) 123 – 456 88</span> or get{" "}
            <span className="text-[#1f3c44] underline">Support</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
