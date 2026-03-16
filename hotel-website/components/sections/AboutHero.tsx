import Container from "../ui/Container";
import AnimatedContent from "./AnimatedContent";

export default function AboutHero() {
  return (
    <section className="relative min-h-[72vh] overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/7-9-25/Copy of IMG_1568.avif')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="absolute inset-0 bg-black/45" />

      <Container className="relative flex min-h-[72vh] flex-col items-center justify-center text-center">
        <AnimatedContent
          distance={80}
          direction="vertical"
          reverse={false}
          duration={0.8}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={1}
          threshold={0.1}
          delay={0}
        >
          <h1 className="font-serif text-4xl md:text-6xl">About</h1>
          <p className="mt-4 max-w-2xl text-sm text-white/85 md:text-base">
            Discover the story, spirit, and signature hospitality of UK&apos;s Resort.
          </p>
          {/* <span className="mt-6 block text-[0.7rem] uppercase tracking-[0.4em] text-white/80">
            Home / About
          </span> */}
        </AnimatedContent>
      </Container>
    </section>
  );
}

