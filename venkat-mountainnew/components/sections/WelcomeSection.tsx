import Container from "../ui/Container";

export default function WelcomeSection() {
  return (
    <section className="bg-[#f6f2ec] py-12 text-[#1f3c44] sm:py-14 lg:py-16">
      <Container className="text-center">
        <h2 className="font-serif text-[2rem] leading-tight sm:text-[2.4rem] lg:text-[2.8rem]">
          Welcome to UK&apos;s Resort !
        </h2>
        <p className="mx-auto mt-5 max-w-4xl text-[0.98rem] leading-relaxed text-[#1f3c44]/80 sm:text-[1.05rem]">
          UK&apos;s Resort - Just a few kilometer&apos;s away from the hustle bustle of Mumbai and set amidst abundant scenic beauty and a rich history that blends harmoniously with today&apos;s active lifestyles.
        </p>
      </Container>
    </section>
  );
}
