import Container from "../ui/Container";

export default function WeddingsCelebration() {
  return (
    <section className="bg-[#f6f3ed] py-20 text-[#1f3c44]">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs uppercase tracking-[0.45em] text-[#1f3c44]/70">
            Enhance your celebration
          </span>
          <h2 className="mt-6 font-serif text-4xl leading-tight md:text-5xl">
            We make every
            <br />
            occasion sparkle
          </h2>
          <p className="mt-6 text-sm leading-7 text-[#1f3c44]/75">
            Plan your next event at our resort, where exquisite beachfront
            settings, refined cuisine, warm boutique service, and experienced
            event management bring your vision to life.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="overflow-hidden rounded-3xl bg-[#e2dacd] shadow-[0_24px_60px_rgba(0,0,0,0.15)]">
            <img
              src="/images/web-img1.jpg"
              alt="Beachfront celebration setup"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="rounded-3xl bg-white p-8 shadow-[0_18px_45px_rgba(0,0,0,0.12)]">
            <div className="overflow-hidden rounded-2xl">
              <img
                src="/images/we6-img2.jpg"
                alt="Couple by the sea"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="mt-6 font-serif text-3xl">
              Weddings &amp; honeymoons
            </h3>
            <p className="mt-4 text-sm leading-7 text-[#1f3c44]/75">
              Whether you dream of an intimate ceremony barefoot on the
              sun-kissed beach or a lavish resort-wide banquet, we take care of
              every little detail for your big day.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="rounded-3xl bg-white p-8 shadow-[0_18px_45px_rgba(0,0,0,0.12)]">
            <div className="overflow-hidden rounded-2xl">
              <img
                src="/images/web-img3.jpg"
                alt="Social celebration setup"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="mt-6 font-serif text-3xl">Social celebrations</h3>
            <p className="mt-4 text-sm leading-7 text-[#1f3c44]/75">
              Host a candlelit engagement dinner, a milestone anniversary
              reception in the elegant banquet room, a poolside birthday party,
              or a private soirée for a special occasion.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl bg-[#e2dacd] shadow-[0_24px_60px_rgba(0,0,0,0.15)]">
            <img
              src="/images/web-img1.jpg"
              alt="Elegant event hall"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
