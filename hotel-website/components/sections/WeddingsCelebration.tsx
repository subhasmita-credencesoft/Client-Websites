"use client";
import { useEffect } from "react";
import Container from "../ui/Container";

function useScrollReveal() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .wc-reveal {
        opacity: 0;
        transform: translateY(36px);
        transition: opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1);
      }
      .wc-reveal-left {
        opacity: 0;
        transform: translateX(-48px);
        transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
      }
      .wc-reveal-right {
        opacity: 0;
        transform: translateX(48px);
        transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
      }
      .wc-reveal.wc-vis,
      .wc-reveal-left.wc-vis,
      .wc-reveal-right.wc-vis { opacity: 1; transform: none; }

      .wc-d1 { transition-delay: 0.1s; }
      .wc-d2 { transition-delay: 0.2s; }
      .wc-d3 { transition-delay: 0.3s; }

      .wc-zoom { overflow: hidden; }
      .wc-zoom img { transition: transform 0.75s cubic-bezier(0.16,1,0.3,1); }
      .wc-zoom:hover img { transform: scale(1.06); }

      .wc-card { transition: box-shadow 0.35s ease, transform 0.35s ease; }
      .wc-card:hover {
        box-shadow: 0 30px 75px rgba(0,0,0,0.16) !important;
        transform: translateY(-5px);
      }

      .wc-cta-line {
        display: inline-block;
        width: 28px;
        height: 1px;
        background: #1f3c44;
        vertical-align: middle;
        transition: width 0.3s ease;
      }
      .wc-cta:hover .wc-cta-line { width: 46px; }
    `;
    document.head.appendChild(style);

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("wc-vis"); }),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".wc-reveal, .wc-reveal-left, .wc-reveal-right")
      .forEach((el) => io.observe(el));

    return () => { io.disconnect(); document.head.removeChild(style); };
  }, []);
}

export default function WeddingsCelebration() {
  useScrollReveal();

  return (
    <section className="bg-[#f6f3ed] py-20 text-[#1f3c44]">
      <Container>

        {/* ── Header ── */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="wc-reveal text-xs uppercase tracking-[0.45em] text-[#1f3c44]/70">
            Enhance your celebration
          </span>
          <h2 className="wc-reveal wc-d1 mt-6 font-serif text-4xl leading-tight md:text-5xl">
            We make every
            <br />
            occasion sparkle
          </h2>
          <p className="wc-reveal wc-d2 mt-6 text-sm leading-7 text-[#1f3c44]/75">
            Celebrate your special occasions like Birthdays, Get-togethers, Anniversaries, Launch Parties etc with live Music, Delicious Cuisines &amp; varied Entertainment to make each event enjoyable &amp; memorable for the entire family
          </p>
        </div>

        {/* ── Row 1: Weddings — big image left, card right ── */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="wc-reveal-left wc-zoom overflow-hidden rounded-3xl bg-[#e2dacd] shadow-[0_24px_60px_rgba(0,0,0,0.15)]">
            <img
              src="https://bookonelocal.in/cdn/wedding4-1.jpg"
              alt="Beachfront celebration setup"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="wc-reveal-right wc-d1 wc-card rounded-3xl bg-white p-8 shadow-[0_18px_45px_rgba(0,0,0,0.12)]">
            <div className="wc-zoom overflow-hidden rounded-2xl">
              <img
                src="https://bookonelocal.in/cdn/wedding-image.jpg"
                alt="Couple by the sea"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="mt-6 font-serif text-3xl">
              Weddings &amp; honeymoons
            </h3>
            <p className="mt-4 text-sm leading-7 text-[#1f3c44]/75">
              Marriage are made in heaven but created on earth and certainly knows how to make them glitter with splendor. From the moment you decide to celebrate your big day with us, we leave no stone unturned to make the occasion an unforgettable one for years to come. Be it traditional or a modern themed wedding, our wedding team understands what you need in a wedding.
              <br /><br />
              With warm hospitality and years of experience, our wedding team ensures the wedding arrangement right from small ceremonies, mehndi, sangeet program and extravagant reception runs out smoothly as planned.
              <br /><br />
              Our modern accommodation and Exquisite lawns, Pool side and water park areas gives the perfect setting to make your destination wedding a memorable one.
            </p>
            <a href="#" className="wc-cta mt-6 inline-flex items-center gap-3 text-[10.5px] font-medium uppercase tracking-[0.2em] text-[#1f3c44]">
              Enquire now <span className="wc-cta-line" />
            </a>
          </div>
        </div>

        {/* ── Row 2: Family & School Picnic — card left, big image right ── */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="wc-reveal-left wc-d1 wc-card rounded-3xl bg-white p-8 shadow-[0_18px_45px_rgba(0,0,0,0.12)]">
            <div className="wc-zoom overflow-hidden rounded-2xl">
              <img
                src="https://bookonelocal.in/cdn/gymnium-image.JPG"
                alt="Family picnic setup"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="mt-6 font-serif text-3xl">Family &amp; School Picnic</h3>
            <p className="mt-4 text-sm leading-7 text-[#1f3c44]/75">
              Arrive at UK's Resort, Khopoli after a scenic drive along the green countryside. A sumptuous buffet breakfast awaits you. Let down your hair at the Mini water park. Splash around the cool waters and swing to the latest music by the pool side. What's more, we have music, rain &amp; masti all year round with Rain Dance. After a frolicking time in the water enjoy the renowned UK's Resort delicious unlimited buffet lunch. Make the most of the 6 acres of open space to play games with your family and friends. The little ones can make merry in the children's play park. Round up an exciting picnic with hot beverages and snacks. The unforgettable experience at UK's Resort Khopoli will have you and your family returning for more.
            </p>
            <a href="#" className="wc-cta mt-6 inline-flex items-center gap-3 text-[10.5px] font-medium uppercase tracking-[0.2em] text-[#1f3c44]">
              Enquire now <span className="wc-cta-line" />
            </a>
          </div>

          <div className="wc-reveal-right wc-zoom overflow-hidden rounded-3xl bg-[#e2dacd] shadow-[0_24px_60px_rgba(0,0,0,0.15)]">
            <img
              src="https://bookonelocal.in/cdn/Copy of IMG_3980.avif"
              alt="Family picnic grounds"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* ── Row 3: Sports — big image left, card right ── */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="wc-reveal-left wc-zoom overflow-hidden rounded-3xl bg-[#e2dacd] shadow-[0_24px_60px_rgba(0,0,0,0.15)]">
            <img
              src="https://bookonelocal.in/cdn/kids3.JPG"
              alt="Sports activities at resort"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="wc-reveal-right wc-d1 wc-card rounded-3xl bg-white p-8 shadow-[0_18px_45px_rgba(0,0,0,0.12)]">
            <div className="wc-zoom overflow-hidden rounded-2xl">
              <img
                src="https://bookonelocal.in/cdn/outdoor-image.jpg"
                alt="Sports facilities"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="mt-6 font-serif text-3xl">Sports &amp; Activities</h3>
            <p className="mt-4 text-sm leading-7 text-[#1f3c44]/75">
           Make the most of the sprawling lawns to play games like Cricket, Football, Badminton, Throw ball etc. or enjoy an indoor game of Table Tennis / Carrom with your family.
              <br /><br />
              The impeccable hospitality and a variety of entertainment gives a midas touch to the event like no other.
              <br /><br />
 We have a spacious 5 acre open space for corporate and education institutes for orgainizing sports events.
            </p>
            <a href="#" className="wc-cta mt-6 inline-flex items-center gap-3 text-[10.5px] font-medium uppercase tracking-[0.2em] text-[#1f3c44]">
              Enquire now <span className="wc-cta-line" />
            </a>
          </div>
        </div>

      </Container>
    </section>
  );
}