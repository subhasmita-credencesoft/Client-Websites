import Container from "../ui/Container";

export default function BlogFeature() {
  return (
    <section className="bg-[#f6f3ed] py-20 text-[#1f3c44]">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="overflow-hidden rounded-3xl bg-[#e2dacd] shadow-[0_24px_60px_rgba(0,0,0,0.15)]">
            <img
              src="/images/blog_15.jpg"
              alt="Overwater villa"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full border border-[#1f3c44]/20 px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-[#c97a42]">
              Catering
            </span>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              These are the top 7
              <br />
              luxury hotels in the
              <br />
              world
            </h2>
            <p className="max-w-xl text-sm leading-7 text-[#1f3c44]/70">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-[0.65rem] uppercase tracking-[0.3em] text-[#1f3c44]/60">
              <span>November 5, 2024</span>
              <span>By admin</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
