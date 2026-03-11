import Container from "../ui/Container";

export default function ExperiencesIntro() {
  return (
    <section className="bg-[#f6f3ed] py-20 text-[#1f3c44]">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-8">
            <span className="text-xs uppercase tracking-[0.45em] text-[#1f3c44]/70">
              Unforgettable experiences
            </span>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              Journey into the
              <br />
              heart and soul of
              <br />
              our magical island
            </h2>
            <p className="max-w-xl text-sm leading-7 text-[#1f3c44]/75">
              Our experiences are mindfully curated to offer an authentic,
              intimate exploration into the essence of Sri Lanka with healthy
              doses of fun, adventure and pampering, along with a holistic
              wellness to soothe mind, body, and soul.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl bg-[#e2dacd] shadow-[0_24px_60px_rgba(0,0,0,0.15)]">
            <img
              src="/images/room_2.jpg"
              alt="Couple cycling by the sea"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-12 max-w-lg overflow-hidden rounded-3xl bg-[#e2dacd] shadow-[0_18px_45px_rgba(0,0,0,0.12)]">
          <img
            src="/images/room_4.jpg"
            alt="Beachside experience"
            className="h-full w-full object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
