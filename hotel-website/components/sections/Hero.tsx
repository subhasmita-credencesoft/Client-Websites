import Container from "../ui/Container";
import HeroBookingBar from "../features/HeroBookingBar";
import AnimatedContent from "./AnimatedContent";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden text-white">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/1.avif')",
          backgroundPosition: "50% 50%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/55" />
   <Container className="relative flex min-h-[100svh] w-full flex-col items-center justify-center text-center">
    <div className="flex w-full max-w-[72rem] flex-col items-center px-4 pb-20 pt-32 sm:px-5 sm:pb-16 sm:pt-36 md:px-6 md:pb-18 md:pt-40 lg:pb-16 lg:pt-44">
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
            <p className="mx-auto max-w-5xl px-2 text-[0.48rem] font-medium tracking-[0.18em] text-white/85 sm:text-[0.58rem] sm:tracking-[0.24em] md:text-[0.72rem] md:tracking-[0.36em] lg:text-[0.82rem] lg:tracking-[0.42em]">
              RELAX UNDER SWAYING PALMS AND WALK ALONG THE PRISTINE WHITE-SAND BEACH.
            </p>
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
            delay={0.05}
          >
            <h1 className="mx-auto mt-4 max-w-[10ch] font-serif text-[1.95rem] leading-[0.92] sm:mt-5 sm:max-w-[11ch] sm:text-[2.7rem] md:mt-6 md:max-w-none md:text-[4.2rem] lg:mt-8 lg:text-[5.2rem] xl:text-[6rem]">
              A Sanctuary For
              <br />
              Your Senses
            </h1>
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
  delay={0.1}
>
<div className="mt-24 w-full sm:mt-28 md:mt-32 lg:mt-36 xl:mt-40">
    <HeroBookingBar />
  </div>
</AnimatedContent>
        </div>
      </Container>
    </section>
  );
}
