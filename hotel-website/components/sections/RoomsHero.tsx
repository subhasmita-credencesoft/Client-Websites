import Container from "../ui/Container";
import AnimatedContent from "./AnimatedContent";
export default function RoomsHero() {
  return (
    <section className="relative min-h-[72vh] overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/room_3.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="absolute inset-0 bg-black/45" />
      <Container className="relative flex min-h-[65vh] flex-col items-center justify-center text-center">
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
        <h1 className="font-serif text-4xl md:text-6xl">Rooms Gallery</h1>
        </AnimatedContent>

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
        <p className="mt-4 text-xs uppercase tracking-[0.4em] text-white/80">
          Home / Rooms Gallery
        </p>
        
        </AnimatedContent>
      </Container>
    </section>
  );
}
