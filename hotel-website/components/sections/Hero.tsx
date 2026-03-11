import Container from "../ui/Container";
import HeroBookingBar from "../features/HeroBookingBar";
import AnimatedContent from "./AnimatedContent";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden text-white">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url('https://demo2.wpopal.com/amoja/wp-content/uploads/2024/11/h1_bg.jpg')",
          backgroundPosition: "50% 50%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/55" />
      <Container className="relative flex min-h-[100svh] flex-col items-center text-center">
        <div className="mt-auto flex w-full max-w-[72rem] flex-col items-center pb-10 pt-28 sm:pb-14 sm:pt-32 md:pb-16 md:pt-36 lg:pb-20 lg:pt-44">
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
            <p className="max-w-5xl px-2 text-[0.5rem] font-medium tracking-[0.27em] text-white/85 sm:text-[0.6rem] sm:tracking-[0.31em] md:text-[0.72rem] md:tracking-[0.36em] lg:text-[0.82rem] lg:tracking-[0.42em]">
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
            <h1 className="mt-5 max-w-[10ch] font-serif text-[2.2rem] leading-[0.9] sm:mt-6 sm:max-w-[11ch] sm:text-[3rem] md:mt-7 md:max-w-none md:text-[4.4rem] lg:mt-8 lg:text-[5.4rem] xl:text-[6rem]">
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
            <HeroBookingBar />
          </AnimatedContent>
        </div>
      </Container>
    </section>
  );
}
