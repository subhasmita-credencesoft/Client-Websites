"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../ui/Container";

/* ─── Reveal hook (lightweight IntersectionObserver) ─── */
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLElement | HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Fade-up wrapper ─── */
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── Activity Tab Config ─── */
const ACTIVITIES = [
  {
    id: "waterpark",
    title: "Water Park play & fun",
    emoji: "🏊",
    subtitle: "Splash into Endless Water Fun",
    description:
      "Our water park resort near Mumbai features high-thrill water slides, and dedicated shallow   Water fun & play zones for children. Under the supervision of trained lifeguards, it's the perfect environment to beat the heat and spend quality time with family and friends.",
    image: "/children5.avif",
  },
  {
    id: "raindance",
    title: "Rain Dance Sessions",
    emoji: "🌧️",
    subtitle: "Dance Under the Cool Sprays",
    description:
      "Experience our energetic rain dance sessions. Outfitted with a professional sound system, overhead water sprinklers, and a live DJ, this interactive experience brings families and friends together for shared laughter and dance.",
    image: "/raindance11.png",
  },
  {
    id: "indoor",
    title: "Indoor Recreation",
    emoji: "🎲",
    subtitle: "Leisure & Table Games",
    description:
      "Unwind inside our fully equipped, air-conditioned indoor recreation center. Challenge friends to table tennis, carrom, chess, and popular family board games. Ideal for relaxing afternoons and keeping the entertainment alive.",
    image: "/sports2.avif",
  },
  {
    id: "outdoor",
    title: "Outdoor & Adventure",
    emoji: "🏹",
    subtitle: "High-Energy Sports & Team Building",
    description:
      "Our sprawling landscaped grounds accommodate cricket, football, and volleyball. For thrill-seekers, we offer archery, paintball, wall climbing, and specialized team-building activities designed to challenge and inspire.",
    image: "/rifleshoot.avif",
  },
];

export default function LongFormExperience() {
  const [activeTab, setActiveTab] = useState("waterpark");

  return (
    <section className="relative bg-paper text-pine antialiased overflow-x-hidden py-16 sm:py-24">
      <Container>
        {/* ── SECTION 1: HERO INTRODUCTION ── */}
        <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-24">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bronze/10 border border-bronze/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-bronze animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-bronze">
                The Guest Experience
              </span>
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] text-pine tracking-tight mb-8">
              Experience at UK&apos;s Resort, Khopoli
            </h1>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="text-lg md:text-xl text-pine/80 font-light leading-relaxed mb-8">
              Escape the city&apos;s fast pace and discover a refreshing retreat at UK&apos;s Resort, Khopoli. Surrounded by lush greenery and scenic mountain views, our resort offers the perfect blend of relaxation, recreation, and warm hospitality. Conveniently located between Mumbai and Pune, UK&apos;s Resort is an ideal destination for family vacations, one-day picnics, corporate outings, school trips, and weekend getaways.
            </p>
          </FadeUp>
          <FadeUp delay={300}>
            <p className="text-md md:text-lg text-pine/70 font-light leading-relaxed">
              Serving as a perfect weekend getaway near Mumbai for travelers from both cities, this premium property is designed to swap concrete skylines for the sweeping beauty of the Western Sahyadri ranges. Whether you are looking for outdoor thrills or wishing to recharge in a peaceful environment, your perfect escape awaits.
            </p>
          </FadeUp>
        </div>

        {/* ── SECTION 2: WELCOME TO THE UK'S RESORT EXPERIENCE ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 sm:mb-32">
          <FadeUp className="relative h-[350px] sm:h-[450px] rounded-[2rem] overflow-hidden shadow-[0_16px_50px_rgba(31,60,68,0.15)]">
            <Image
              src="https://bookonelocal.in/cdn/2025-12-04-095643482-19.jpg"
              alt="Lush green surroundings and Sahyadri views at UK's Resort, Khopoli"
              fill
              className="object-cover"
              sizes="(max-w-1024px) 100vw, 50vw"
            />
          </FadeUp>
          <div className="space-y-6">
            <FadeUp>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pine">
                Welcome to the UK&apos;s Resort Experience
              </h2>
            </FadeUp>
            <FadeUp delay={100}>
              <p className="text-[#31464f] font-light text-[17px] leading-[1.8]">
                Stepping into UK&apos;s Resort is like entering a sanctuary where the air is fresh, clean, and carrying the rich earthy scent of the Sahyadri mountains. Located in Khopoli, Maharashtra, between Mumbai and Pune, the resort provides a tranquil haven away from the humidity, concrete structures, and loud traffic of the city.
              </p>
            </FadeUp>
            <FadeUp delay={200}>
              <p className="text-[#31464f] font-light text-[17px] leading-[1.8]">
                As a highly sought-after resort near Pune and resort near Mumbai, the property is surrounded by dense tropical plants, wide manicured lawns, and scenic vistas. Here, the soothing sounds of nature replace phone notifications, and the calm ambiance of this resort in Khopoli makes it an exceptional space for visitors to restore their physical and mental energy.
              </p>
            </FadeUp>
          </div>
        </div>

        {/* ── SECTION 3: MEMORABLE FAMILY GETAWAYS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 sm:mb-32 lg:flex-row-reverse">
          <div className="space-y-6 lg:order-2">
            <FadeUp className="relative h-[350px] sm:h-[450px] rounded-[2rem] overflow-hidden shadow-[0_16px_50px_rgba(31,60,68,0.15)] animate-ken-burns">
              <Image
                src="/slider2.jpg"
                alt="Family room accommodations and comfort at UK's Resort"
                fill
                className="object-cover"
                sizes="(max-w-1024px) 100vw, 50vw"
              />
            </FadeUp>
          </div>
          <div className="space-y-6 lg:order-1">
            <FadeUp>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pine">
                Memorable Family Getaways
              </h2>
            </FadeUp>
            <FadeUp delay={100}>
              <p className="text-[#31464f] font-light text-[17px] leading-[1.8]">
                For families looking to spend quality time together, UK&apos;s Resort is the ultimate sanctuary. Recognized as a top family resort in Khopoli, we offer an environment that keeps all generations happy. Grandparents can enjoy quiet strolls along paved garden pathways, parents can unwind by the Water park, and kids can safely explore our open green lawns.
              </p>
            </FadeUp>
            <FadeUp delay={200}>
              <p className="text-[#31464f] font-light text-[17px] leading-[1.8]">
                With a dedicated children&apos;s play area, safe water park fun & play, and engaging outdoor spaces, family members can participate in board games, cricket, or simply relax under the shade of trees. Our thoughtfully designed rooms provide modern comfort, spacious layouts, and cozy features to ensure your family enjoys a deeply restful stay.
              </p>
            </FadeUp>
          </div>
        </div>

        {/* ── SECTION 4: FUN & ADVENTURE FOR EVERYONE (INTERACTIVE TABS) ── */}
        <div className="mb-24 sm:mb-32 bg-sand/20 rounded-[3rem] p-8 sm:p-12 border border-sand/40">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <FadeUp>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pine mb-4">
                Fun &amp; Adventure for Everyone
              </h2>
            </FadeUp>
            <FadeUp delay={100}>
              <p className="text-pine/80 font-light">
                Whether you are seeking high-thrill recreation or leisure table games, UK&apos;s Resort packages a diverse array of experiences to satisfy every traveler.
              </p>
            </FadeUp>
          </div>

          {/* Tab buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {ACTIVITIES.map((act) => (
              <button
                key={act.id}
                onClick={() => setActiveTab(act.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === act.id
                    ? "bg-pine text-paper shadow-lg"
                    : "bg-white border border-sand text-pine/80 hover:border-pine hover:text-pine"
                }`}
              >
                <span>{act.emoji}</span> {act.title}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-sand/30 shadow-sm">
            <div className="relative h-[250px] sm:h-[350px] rounded-2xl overflow-hidden shadow-sm">
              {ACTIVITIES.map((act) => (
                <div
                  key={act.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    activeTab === act.id ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <Image
                    src={act.image}
                    alt={act.title}
                    fill
                    className="object-cover"
                    sizes="(max-w-1024px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {ACTIVITIES.map(
                (act) =>
                  activeTab === act.id && (
                    <div key={act.id} className="space-y-4 animate-fade-up">
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-bronze">
                        {act.subtitle}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-pine">
                        {act.title}
                      </h3>
                      <p className="text-[#31464f] font-light text-[16px] leading-[1.7]">
                        {act.description}
                      </p>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>

        {/* ── SECTION 5: RELAXATION & REJUVENATION ── */}
        <div className="max-w-4xl mx-auto text-center mb-24 sm:mb-32">
          <FadeUp>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pine mb-6">
              Relaxation &amp; Rejuvenation
            </h2>
          </FadeUp>
          <FadeUp delay={100}>
            <p className="text-[#31464f] font-light text-[18px] leading-[1.8] mb-8">
              True hospitality is about creating moments of quietude where you can fully unwind. At UK&apos;s Resort, guests can enjoy peaceful mornings watching the mist rise over the distant Sahyadri peaks, or take meditative walks through our landscaped gardens.
            </p>
          </FadeUp>
          <FadeUp delay={200}>
            <blockquote className="border-l-4 border-bronze pl-6 py-2 italic font-serif text-xl sm:text-2xl text-pine/80 text-left max-w-2xl mx-auto my-8">
              &ldquo;In the quiet corners of our gardens, the sound of the city fades into rustling leaves and cool breezes, allowing a deep, restorative calm to take over.&rdquo;
            </blockquote>
          </FadeUp>
          <FadeUp delay={300}>
            <p className="text-[#31464f] font-light text-[17px] leading-[1.8]">
              Spend your afternoon relaxing on comfortable Water park side loungers, reading a book, or breathing in the fresh mountain air. Free from the city rush and daily stressors, this environment provides the mental reset you need to return home fully recharged.
            </p>
          </FadeUp>
        </div>

        {/* ── SECTION 6: DELICIOUS DINING EXPERIENCES ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 sm:mb-32">
          <div className="space-y-6">
            <FadeUp>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-bronze">
                Flavors That Inspire
              </span>
            </FadeUp>
            <FadeUp delay={50}>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pine">
                Delicious Dining Experiences
              </h2>
            </FadeUp>
            <FadeUp delay={100}>
              <p className="text-[#31464f] font-light text-[17px] leading-[1.8]">
                A wonderful holiday requires excellent food, and our culinary team delivers flavors that delight every palate. The multi-cuisine restaurant at UK&apos;s Resort serves a variety of freshly prepared vegetarian, non-vegetarian, and authentic local Maharashtrian dishes.
              </p>
            </FadeUp>
            <FadeUp delay={200}>
              <p className="text-[#31464f] font-light text-[17px] leading-[1.8]">
                From energizing breakfast buffets featuring live egg and dosa stations to long family lunches and group dining experiences, we elevate dining into a memorable event. Our commitment to warm hospitality ensures special dietary choices, including Jain food, are prepared with care and served with a smile.
              </p>
            </FadeUp>
          </div>
          <FadeUp className="relative h-[350px] sm:h-[450px] rounded-[2rem] overflow-hidden shadow-[0_16px_50px_rgba(31,60,68,0.15)]">
            <Image
              src="/dining.png"
              alt="Multi-cuisine restaurant dining experience at UK's Resort"
              fill
              className="object-cover"
              sizes="(max-w-1024px) 100vw, 50vw"
            />
          </FadeUp>
        </div>

        {/* ── SECTION 7: CORPORATE OUTINGS & SCHOOL PICNICS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 sm:mb-32 lg:flex-row-reverse">
          <div className="space-y-6 lg:order-2">
            <FadeUp className="relative h-[350px] sm:h-[450px] rounded-[2rem] overflow-hidden shadow-[0_16px_50px_rgba(31,60,68,0.15)]">
              <Image
                src="/uk-conf.avif"
                alt="Conference room facilities and corporate outings"
                fill
                className="object-cover"
                sizes="(max-w-1024px) 100vw, 50vw"
              />
            </FadeUp>
          </div>
          <div className="space-y-6 lg:order-1">
            <FadeUp>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pine">
                Perfect for Corporate Outings &amp; School Picnics
              </h2>
            </FadeUp>
            <FadeUp delay={100}>
              <p className="text-[#31464f] font-light text-[17px] leading-[1.8]">
                Beyond individual stays, UK&apos;s Resort is widely recognized as a premier corporate outing resort and a safe, engaging school picnic destination. For corporate events, our modern air-conditioned conference halls, full audio-visual facilities, and large open lawns are ideal for team-building exercises, executive meetings, and group bonding events.
              </p>
            </FadeUp>
            <FadeUp delay={200}>
              <p className="text-[#31464f] font-light text-[17px] leading-[1.8]">
                For school and college excursions, safety remains our number one priority. Our wide grounds, supervised activity zones, and certified lifeguards provide a safe and controlled setting where students can participate in sports, enjoy the water slides, and learn team dynamics under attentive supervision.
              </p>
            </FadeUp>
          </div>
        </div>

        {/* ── SECTION 8: CELEBRATE SPECIAL MOMENTS ── */}
        <div className="bg-[#12252a] text-paper rounded-[3rem] p-8 sm:p-16 mb-24 sm:mb-32 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
          <div className="absolute inset-0 opacity-10 mix-blend-overlay">
            <Image
              src="/wedding-img7.jpg"
              alt="Weddings and social celebrations background"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="relative z-10 max-w-3xl space-y-6">
            <FadeUp>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-bronze">
                Milestones &amp; Gatherings
              </span>
            </FadeUp>
            <FadeUp delay={100}>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
                Celebrate Special Moments
              </h2>
            </FadeUp>
            <FadeUp delay={200}>
              <p className="text-sand/80 font-light text-base sm:text-lg leading-relaxed">
                Whether you are hosting a milestone birthday party, a memorable family reunion, an anniversary celebration, or a beautiful destination wedding, UK&apos;s Resort offers the perfect canvas. Our sprawling outdoor lawns and elegant indoor banquet spaces can be customized to suit your requirements.
              </p>
            </FadeUp>
            <FadeUp delay={300}>
              <p className="text-sand/70 font-light text-sm sm:text-base leading-relaxed">
                With a dedicated hospitality team, professional event coordinators, and personalized dining menus, we manage the logistics so you can focus entirely on celebrating with those you love.
              </p>
            </FadeUp>
          </div>
        </div>

        {/* ── SECTION 9: WHY GUESTS LOVE UK'S RESORT ── */}
        <div className="mb-24 sm:mb-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <FadeUp>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pine mb-4">
                Why Guests Love UK&apos;s Resort
              </h2>
            </FadeUp>
            <FadeUp delay={100}>
              <p className="text-pine/80 font-light">
                Discover the key reasons why families, couples, and corporate groups choose us as their favorite retreat near Mumbai and Pune.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Convenient Location",
                description:
                  "Perfectly located in Khopoli, between Mumbai and Pune, and easily accessible from the Expressway.",
                icon: "📍",
              },
              {
                title: "Impeccable Cleanliness",
                description:
                  "Well-maintained facilities, water park, and spotless, cozy room accommodations.",
                icon: "✨",
              },
              {
                title: "Warm Hospitality",
                description:
                  "A highly dedicated staff committed to personalized service and a seamless guest journey.",
                icon: "🛎️",
              },
              {
                title: "Endless Activities",
                description:
                  "From water slides and rain dances to archery, table tennis, and outdoor sports.",
                icon: "⚽",
              },
              {
                title: "Delectable Dining",
                description:
                  "A wide array of fresh, flavorful dishes served in our multi-cuisine restaurant.",
                icon: "🍽️",
              },
              {
                title: "Outstanding Value",
                description:
                  "Premium facilities, clean spaces, and professional coordination at competitive prices.",
                icon: "💎",
              },
            ].map((item, idx) => (
              <FadeUp
                key={item.title}
                delay={idx * 50}
                className="bg-white rounded-3xl p-8 border border-sand/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <span className="text-3xl block">{item.icon}</span>
                  <h4 className="font-serif text-xl font-bold text-pine">
                    {item.title}
                  </h4>
                  <p className="text-pine/70 font-light text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* ── SECTION 10: CONCLUSION WITH CALL TO ACTION ── */}
        <div className="max-w-4xl mx-auto bg-sand/10 border border-sand/40 rounded-[3rem] p-8 sm:p-16 text-center space-y-8 shadow-sm">
          <FadeUp>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pine">
              Create Memories That Last Forever
            </h2>
          </FadeUp>
          <FadeUp delay={100}>
            <p className="text-[#31464f] font-light text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Whether you are planning a weekend escape, booking a one day picnic resort package, or coordinating a corporate outing, UK&apos;s Resort is ready to welcome you with warm smiles and premium services. Unwind in comfort, splash in our water park, and experience why we are considered the best resort in Khopoli.
            </p>
          </FadeUp>
          <FadeUp delay={200} className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              href="https://bookone.io/UK-s-Resort-Khopoli"
              target="_blank"
              style={{ color: "#ffffff" }}
              className="bg-accent hover:bg-accent/90 !text-white font-bold uppercase tracking-wider text-xs px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Book Your Experience
            </Link>
            <Link
              href="/contact"
              style={{ color: "#ffffff" }}
              className="bg-pine hover:bg-pine/90 !text-white font-bold uppercase tracking-wider text-xs px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Contact Reservations
            </Link>
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}
