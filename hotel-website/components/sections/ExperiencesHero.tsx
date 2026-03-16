import Container from "../ui/Container";
import AnimatedContent from "./AnimatedContent";

export default function ExperiencesHero() {
  return (
    <section className="relative min-h-screen overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/7-9-25/Copy of IMG_3980.avif')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="absolute inset-0 bg-black/45" />
      <Container className="relative flex min-h-screen flex-col items-center justify-center pb-20 pt-44 text-center md:pt-52">
        <AnimatedContent
          distance={100}
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
          <h1 className="font-serif text-4xl md:text-6xl">Experiences</h1>
          <p className="mt-4 max-w-xl text-sm text-white/80">Here&apos;s where memories are truly made.</p>
        </AnimatedContent>
      </Container>
    </section>
  );
}
