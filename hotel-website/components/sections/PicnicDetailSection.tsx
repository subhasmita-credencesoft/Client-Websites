"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../ui/Container";

/* ─── Reveal hook (lightweight IntersectionObserver) ─── */
function useReveal(threshold = 0.08) {
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

/* ─── Inclusions Config ─── */
const TIMELINE_STEPS = [
  {
    time: "09:30 AM",
    title: "Arrival & Warm Welcome",
    description: "Guests arrive at our lush property, step into the airy lobby, and enjoy a traditional kokum drink. Settle into your day base and get ready for a fun-filled day out.",
    highlight: "Welcome drink & entry processes"
  },
  {
    time: "10:00 AM",
    title: "Hearty Breakfast Spread",
    description: "Fuel your day with a fresh, hot breakfast buffet featuring live dosa counters, authentic local misal pav, idlis, tea, and coffee in our spacious restaurant.",
    highlight: "Live counters & local specialties"
  },
  {
    time: "11:00 AM",
    title: "Water Park & Swimming Pools",
    description: "Dive into our large swimming pools and thrill slides. Join the high-energy rain dance session with a live DJ, overhead sprays, and popular dance tracks.",
    highlight: "Slides, pools & rain dance DJ"
  },
  {
    time: "01:30 PM",
    title: "Elaborate Buffet Lunch",
    description: "Indulge in a premium multi-cuisine lunch buffet. Enjoy rich Indian curries, fresh salads, Chinese dishes, local specialties, and warm desserts.",
    highlight: "Multi-cuisine buffet feast"
  },
  {
    time: "03:30 PM",
    title: "Lawn Sports & Indoor Games",
    description: "Challenge your group to box cricket, volleyball, or badminton. Head inside to our AC recreation room for table tennis, carrom, and board games.",
    highlight: "Field games & indoor recreation"
  },
  {
    time: "05:00 PM",
    title: "Evening High Tea & Departure",
    description: "Wrap up your outing with freshly made evening tea, coffee, and hot local snacks like pakodas, before taking a scenic drive home.",
    highlight: "Tea, snacks & final memories"
  }
];

/* ─── FAQs Config ─── */
const FAQS = [
  {
    q: "What are the timings for the One Day Picnic package at UK's Resort?",
    a: "Our standard day outing package runs from 9:30 AM to 6:00 PM. This provides a full day to enjoy the breakfast buffet, pools, slides, lunch, games, and high tea before departure."
  },
  {
    q: "Is access to the water park and swimming pool included in the package?",
    a: "Yes! Full access to all slides, splash pools, the family swimming pool, and the daily rain dance session is completely included in your one-day picnic pass."
  },
  {
    q: "What type of food options are available? Do you serve Jain meals?",
    a: "We serve a diverse, freshly prepared buffet. Breakfast features hot live counters, lunch is an elaborate multi-cuisine spread (veg and non-veg options), and evening high tea features tea, coffee, and snacks. Jain meals can be prepared separately with prior coordination with our team."
  },
  {
    q: "Is prior booking required for a one-day picnic?",
    a: "Yes, we highly recommend making advance reservations, especially on weekends and public holidays, to ensure smooth entry and comfortable coordination for your family or group."
  },
  {
    q: "Are there changing rooms and locker facilities available?",
    a: "Absolutely. We provide clean, separate changing rooms and shower facilities for ladies and gentlemen. Secure lockers are also available to keep your personal belongings safe while you are in the pools."
  },
  {
    q: "Do you offer special discounts for corporate team outings or large groups?",
    a: "Yes! We offer customized group packages and corporate outing packages with special rates, dedicated seating zones, and tailored team-building games for groups of 20 or more."
  },
  {
    q: "Is the resort safe for school picnics and young students?",
    a: "Safety is our priority. We are a trusted school picnic destination, featuring certified lifeguards at all pools, perimeter security, first-aid support, and supervised play zones."
  },
  {
    q: "What should we wear for the water park and swimming pools?",
    a: "Nylon or synthetic swimwear is strictly mandatory for accessing the pools and slides. You can bring your own swimwear or purchase it at the resort store."
  },
  {
    q: "Are there comfortable day rooms available if we need to rest?",
    a: "Yes, day use rooms can be booked alongside your picnic package at a nominal additional charge, subject to availability. Please coordinate with our booking desk in advance."
  },
  {
    q: "Is there enough parking space at the resort?",
    a: "Yes, we have a very large, secure, and complimentary parking lot that can accommodate private cars, traveler vans, and school/corporate buses easily."
  },
  {
    q: "What activities are available besides the pools?",
    a: "We offer outdoor sports (box cricket, volleyball, badminton), indoor games (table tennis, carrom, chess, board games), and adventure activities like archery and climbing wall setups."
  },
  {
    q: "How far is the resort from Mumbai and Pune?",
    a: "UK's Resort is located in Khopoli, Maharashtra, roughly 85 km from Mumbai and 80 km from Pune, making it a convenient 1.5 to 2-hour drive via the Expressway."
  }
];

export default function PicnicDetailSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <section className="bg-paper text-pine antialiased overflow-x-hidden py-16 sm:py-24">
      <Container>
        
        {/* ── INTRO: H1 & Compelling Introduction ── */}
        <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-24">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bronze/10 border border-bronze/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-bronze animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-bronze">
                Day Outing Experience
              </span>
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] text-pine tracking-tight mb-8">
              One Day Picnic at UK&apos;s Resort, Khopoli
            </h1>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="text-lg md:text-xl text-pine/80 font-light leading-relaxed mb-8">
              Escape the concrete hustle and discover one of the most popular one-day picnic destinations near Mumbai and Pune. Tucked away in the serene greenery of Khopoli, UK&apos;s Resort offers a refreshing day outing that brings together dynamic adventure, swimming pool leisure, a full-scale water park, and warm hospitality.
            </p>
          </FadeUp>
          <FadeUp delay={300}>
            <p className="text-md md:text-lg text-pine/70 font-light leading-relaxed">
              Conveniently situated right off the Expressway, our resort makes it simple for families, friends, schools, and corporate groups to enjoy a complete day of relaxation, outdoor sports, and premium buffet dining. Read on to discover why we are considered the best picnic resort near Mumbai and a favorite spot for day outings from Pune.
            </p>
          </FadeUp>
        </div>

        {/* ── INTRO: ESCAPE THE CITY FOR A DAY OF FUN ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 sm:mb-32">
          <div className="lg:col-span-7 space-y-6">
            <FadeUp>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-bronze block">
                Section 1: Escape the City for a Day of Fun
              </span>
            </FadeUp>
            <FadeUp delay={50}>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pine leading-tight">
                Swap City Stress for Sunshine, Greenery &amp; Adventure
              </h2>
            </FadeUp>
            <FadeUp delay={100}>
              <p className="text-[#31464f] font-light text-[17px] leading-[1.8]">
                Living in Mumbai or Pune means navigating busy streets, screen time, and a fast pace. Every now and then, you need a break. UK&apos;s Resort, Khopoli, is the perfect weekend getaway near Mumbai and Pune. Located at the base of the Western Ghats, this beautiful property is surrounded by trees, lawns, and fresh mountain breezes.
              </p>
            </FadeUp>
            <FadeUp delay={150}>
              <p className="text-[#31464f] font-light text-[17px] leading-[1.8]">
                It is a popular one day picnic resort near Mumbai and a great choice for a one day picnic near Pune. Here, you can replace city noise with the sounds of splashing water, bird songs, and happy conversations. Bring your family, corporate team, or school group for a day outing resort in Khopoli experience that is fun, relaxing, and filled with outdoor activities.
              </p>
            </FadeUp>
          </div>
          <div className="lg:col-span-5">
            <FadeUp className="relative h-[300px] sm:h-[400px] rounded-[2rem] overflow-hidden shadow-[0_16px_40px_rgba(31,60,68,0.12)]">
              <Image
                src="/uk1.avif"
                alt="Lush lawns and nature views at UK's Resort"
                fill
                className="object-cover"
                sizes="(max-w-1024px) 100vw, 40vw"
              />
            </FadeUp>
          </div>
        </div>

        {/* ── SECTION 2: WHAT'S INCLUDED IN OUR PACKAGE ── */}
        <div id="inclusions" className="space-y-12 bg-sand/10 rounded-[3rem] p-8 sm:p-12 border border-sand/40 mb-24 sm:mb-32">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <FadeUp>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-bronze">
                Section 2: What&apos;s Included in Our One Day Picnic Package
              </span>
            </FadeUp>
            <FadeUp delay={50}>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pine">
                A Full Outing Journey, Handled from Start to Finish
              </h2>
            </FadeUp>
            <FadeUp delay={100}>
              <p className="text-pine/80 font-light text-base">
                Your day picnic package includes access to all recreation zones, water activities, and a multi-cuisine dining experience. Here is the typical flow of our day outing:
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TIMELINE_STEPS.map((step, idx) => (
              <FadeUp
                key={step.time}
                delay={idx * 50}
                className="bg-white rounded-3xl p-6 border border-sand/30 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-bronze bg-bronze/10 px-3 py-1 rounded-full uppercase tracking-wider">
                      {step.time}
                    </span>
                  </div>
                  <h4 className="font-serif text-xl font-bold text-pine">
                    {step.title}
                  </h4>
                  <p className="text-[#4f656d] font-light text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-sand/40">
                  <p className="text-xs font-bold text-pine flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-bronze inline-block" />
                    {step.highlight}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* ── SECTION 3: WATER PARK FUN FOR ALL AGES ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 sm:mb-32">
          <div className="lg:col-span-5 lg:order-2">
            <FadeUp className="relative h-[300px] sm:h-[400px] rounded-[2rem] overflow-hidden shadow-[0_16px_40px_rgba(31,60,68,0.12)] animate-ken-burns">
              <Image
                src="/picnic.avif"
                alt="Winding water slides and swimming pools"
                fill
                className="object-cover"
                sizes="(max-w-1024px) 100vw, 40vw"
              />
            </FadeUp>
          </div>
          <div className="lg:col-span-7 lg:order-1 space-y-6">
            <FadeUp>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-bronze block">
                Section 3: Water Park Fun for All Ages
              </span>
            </FadeUp>
            <FadeUp delay={50}>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pine leading-tight">
                Splash into the Blue: Thrill Slides, Splash Pools &amp; DJ Music
              </h2>
            </FadeUp>
            <FadeUp delay={100}>
              <p className="text-[#31464f] font-light text-[17px] leading-[1.8]">
                At the heart of the resort is our water park, designed to bring out the inner child in everyone. Guests can slide down our winding water slides, float in the clean family swimming pool, or watch their little ones enjoy the safe, shallow splash pools. It is a fantastic water park resort near Mumbai option for a refreshing day in the sun.
              </p>
            </FadeUp>
            <FadeUp delay={150}>
              <p className="text-[#31464f] font-light text-[17px] leading-[1.8]">
                A major highlight of the day is the rain dance session. With cool water sprays, professional sound systems, and a live DJ playing Bollywood and regional beats, the dance floor is always full of energy. Throughout your water activities, certified lifeguards are stationed at key points to ensure everyone stays safe.
              </p>
            </FadeUp>
          </div>
        </div>

        {/* ── SECTION 4: INDOOR & OUTDOOR ACTIVITIES ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 sm:mb-32">
          <div className="lg:col-span-7 space-y-6">
            <FadeUp>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-bronze block">
                Section 4: Indoor &amp; Outdoor Activities
              </span>
            </FadeUp>
            <FadeUp delay={50}>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pine leading-tight">
                Friendly Matches, Board Games &amp; Adventure Sports
              </h2>
            </FadeUp>
            <FadeUp delay={100}>
              <p className="text-[#31464f] font-light text-[17px] leading-[1.8]">
                If you prefer land-based recreation, our resort features plenty of outdoor sports and indoor table games. Challenge your group to box cricket, football, or volleyball on our flat, green lawns. It is a great way to enjoy some healthy competition and bond with friends.
              </p>
            </FadeUp>
            <FadeUp delay={150}>
              <p className="text-[#31464f] font-light text-[17px] leading-[1.8]">
                Inside our recreation center, you can play table tennis, carrom, badminton, and classic board games. For adventure seekers, we offer archery, paintball, and wall climbing setups under the guidance of our activity leaders. Whether you are playing a competitive badminton rally or a quiet game of chess, there is an activity for everyone.
              </p>
            </FadeUp>
          </div>
          <div className="lg:col-span-5">
            <FadeUp className="relative h-[300px] sm:h-[400px] rounded-[2rem] overflow-hidden shadow-[0_16px_40px_rgba(31,60,68,0.12)]">
              <Image
                src="/sports1.avif"
                alt="Outdoor badminton and team games"
                fill
                className="object-cover"
                sizes="(max-w-1024px) 100vw, 40vw"
              />
            </FadeUp>
          </div>
        </div>

        {/* ── SECTION 5: PERFECT FAMILY PICNIC DESTINATION ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 sm:mb-32">
          <div className="lg:col-span-5 lg:order-2">
            <FadeUp className="relative h-[300px] sm:h-[400px] rounded-[2rem] overflow-hidden shadow-[0_16px_40px_rgba(31,60,68,0.12)]">
              <Image
                src="/children5.avif"
                alt="Children playing safely in kids play area"
                fill
                className="object-cover"
                sizes="(max-w-1024px) 100vw, 40vw"
              />
            </FadeUp>
          </div>
          <div className="lg:col-span-7 lg:order-1 space-y-6">
            <FadeUp>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-bronze block">
                Section 5: Perfect Family Picnic Destination
              </span>
            </FadeUp>
            <FadeUp delay={50}>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pine leading-tight">
                A Family Picnic Resort Designed for Every Generation
              </h2>
            </FadeUp>
            <FadeUp delay={100}>
              <p className="text-[#31464f] font-light text-[17px] leading-[1.8]">
                Creating beautiful family memories is simple when you have the right setting. As a dedicated family picnic resort, UK&apos;s Resort is designed to be safe, comfortable, and fun for all age groups. Toddlers can play in our soft kids&apos; play zone, while parents relax on loungers and grandparents walk along flat, paved garden pathways.
              </p>
            </FadeUp>
            <FadeUp delay={150}>
              <p className="text-[#31464f] font-light text-[17px] leading-[1.8]">
                We provide practical amenities such as clean changing rooms, secure lockers, and day-use rooms for families with young children or seniors who need rest. Our relaxing atmosphere and focus on personalized service ensure that your family picnic is completely stress-free.
              </p>
            </FadeUp>
          </div>
        </div>

        {/* ── SECTION 6: IDEAL FOR CORPORATE OUTINGS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 sm:mb-32">
          <div className="lg:col-span-7 space-y-6">
            <FadeUp>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-bronze block">
                Section 6: Ideal for Corporate Outings
              </span>
            </FadeUp>
            <FadeUp delay={50}>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pine leading-tight">
                Corporate Outings: Team Building, Morale &amp; Outdoor Recreation
              </h2>
            </FadeUp>
            <FadeUp delay={100}>
              <p className="text-[#31464f] font-light text-[17px] leading-[1.8]">
                A successful team outing requires a good balance of work, fun, and relaxation. UK&apos;s Resort is a preferred corporate outing resort near Mumbai and Pune. Our large lawns are excellent for team-building exercises, coordination games, and customized corporate events designed to boost engagement and foster collaboration.
              </p>
            </FadeUp>
            <FadeUp delay={150}>
              <p className="text-[#31464f] font-light text-[17px] leading-[1.8] mb-6">
                We feature modern, air-conditioned conference halls with audio-visual setups for strategy sessions, followed by fun outdoor recreation and a multi-cuisine buffet lunch. Our dedicated events team coordinates everything from scheduling to group seating, making your day trip simple to plan and highly effective.
              </p>
            </FadeUp>

            {/* Corporate Outing Amenities List */}
            <FadeUp delay={200} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                ["🏢", "AC Conference Halls", "AV systems, projector screens, and private spaces for executive briefings and workshops."],
                ["🎯", "Team Outing & Building", "Manicured lawns for ice-breakers, coordination activities, and outbound training exercises."],
                ["🍽️", "Tailored Group Dining", "Dedicated buffet lines, custom menus, breakfast counters, and separate Jain food options."],
                ["🚌", "Convenient Group Logistics", "Free secure parking for large buses and traveler vans, with dedicated hosts on property."]
              ].map(([icon, title, desc]) => (
                <div key={title} className="bg-white rounded-2xl p-4 border border-sand/40 flex items-start gap-3 shadow-sm">
                  <span className="text-xl">{icon}</span>
                  <div>
                    <h5 className="font-serif font-bold text-sm text-pine">{title}</h5>
                    <p className="text-xs text-[#4f656d] font-light mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </FadeUp>
          </div>
          <div className="lg:col-span-5">
            <FadeUp className="relative h-[300px] sm:h-[400px] rounded-[2rem] overflow-hidden shadow-[0_16px_40px_rgba(31,60,68,0.12)]">
              <Image
                src="/corporate1.avif"
                alt="Corporate team building and lawn activities"
                fill
                className="object-cover"
                sizes="(max-w-1024px) 100vw, 40vw"
              />
            </FadeUp>
          </div>
        </div>

        {/* ── SECTION 7: SCHOOL & COLLEGE PICNICS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 sm:mb-32">
          <div className="lg:col-span-5 lg:order-2">
            <FadeUp className="relative h-[300px] sm:h-[400px] rounded-[2rem] overflow-hidden shadow-[0_16px_40px_rgba(31,60,68,0.12)]">
              <Image
                src="/uk2.avif"
                alt="School group enjoying pool and water slides"
                fill
                className="object-cover"
                sizes="(max-w-1024px) 100vw, 40vw"
              />
            </FadeUp>
          </div>
          <div className="lg:col-span-7 lg:order-1 space-y-6">
            <FadeUp>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-bronze block">
                Section 7: School &amp; College Picnic Experiences
              </span>
            </FadeUp>
            <FadeUp delay={50}>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pine leading-tight">
                Supervised Safe Recreation &amp; Outdoor Learning
              </h2>
            </FadeUp>
            <FadeUp delay={100}>
              <p className="text-[#31464f] font-light text-[17px] leading-[1.8]">
                We are proud to be a trusted school picnic destination for students of all ages. Our large property is secure and supervised, allowing students to play cricket, swim, and run around on our green lawns under the watchful eye of teachers and resort staff.
              </p>
            </FadeUp>
            <FadeUp delay={150}>
              <p className="text-[#31464f] font-light text-[17px] leading-[1.8]">
                Our water park features certified lifeguards at all slides and pools, and we provide separate changing zones for boys and girls. We serve freshly cooked, kid-friendly meals, ensuring students stay energized throughout their day out. It is a wonderful blend of learning, playing, and outdoor fun.
              </p>
            </FadeUp>
          </div>
        </div>

        {/* ── SECTION 8: DELICIOUS FOOD & REFRESHMENTS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 sm:mb-32">
          <div className="lg:col-span-7 space-y-6">
            <FadeUp>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-bronze block">
                Section 8: Delicious Food &amp; Refreshments
              </span>
            </FadeUp>
            <FadeUp delay={50}>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pine leading-tight">
                Fresh Multi-Cuisine Buffets, Live Counters &amp; High Tea
              </h2>
            </FadeUp>
            <FadeUp delay={100}>
              <p className="text-[#31464f] font-light text-[17px] leading-[1.8]">
                A day of physical activities means you will build up a healthy appetite. Our multi-cuisine restaurant serves a variety of freshly prepared dishes, from hot live counters at breakfast to an elaborate lunch buffet with vegetarian and non-vegetarian options.
              </p>
            </FadeUp>
            <FadeUp delay={150}>
              <p className="text-[#31464f] font-light text-[17px] leading-[1.8]">
                We serve authentic local Maharashtrian dishes, popular Indian curries, Chinese starters, fresh salads, and hot desserts. For guests with dietary preferences, we can arrange dedicated Jain meals. Before heading home, enjoy evening high tea and coffee paired with fresh local snacks.
              </p>
            </FadeUp>
          </div>
          <div className="lg:col-span-5">
            <FadeUp className="relative h-[300px] sm:h-[400px] rounded-[2rem] overflow-hidden shadow-[0_16px_40px_rgba(31,60,68,0.12)]">
              <Image
                src="/dining.png"
                alt="Multi-cuisine lunch buffet spread"
                fill
                className="object-cover"
                sizes="(max-w-1024px) 100vw, 40vw"
              />
            </FadeUp>
          </div>
        </div>

        {/* ── SECTION 9: WHY CHOOSE UK'S RESORT ── */}
        <div className="space-y-12 mb-24 sm:mb-32">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <FadeUp>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-bronze">
                Section 9: Why Choose UK&apos;s Resort
              </span>
            </FadeUp>
            <FadeUp delay={50}>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pine">
                The Best Picnic Resort near Mumbai &amp; Pune
              </h2>
            </FadeUp>
            <FadeUp delay={100}>
              <p className="text-pine/80 font-light">
                Discover the key reasons why families, friends, schools, and corporate groups make us their favorite day outing resort in Khopoli.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Ideal Location",
                description: "Conveniently situated in Khopoli, between Mumbai and Pune, right off the Expressway for easy travel.",
                icon: "🛣️",
              },
              {
                title: "Scenic Backdrop",
                description: "Surrounded by the gorgeous Sahyadri hills, fresh air, and lush landscaped gardens.",
                icon: "⛰️",
              },
              {
                title: "Water Park Fun",
                description: "Features winding thrill slides, a clean family pool, and daily rain dance sessions with a live DJ.",
                icon: "🌊",
              },
              {
                title: "Safe & Supervised",
                description: "Certified lifeguards, clean changing rooms, locker systems, and safe play zones for kids.",
                icon: "🛡️",
              },
              {
                title: "Group Friendly",
                description: "Spacious seating zones, customized dining plans, and team activities for large groups.",
                icon: "👥",
              },
              {
                title: "Spacious Grounds",
                description: "6,00,000 sq ft property with flat grassy lawns for cricket, volleyball, and outdoor games.",
                icon: "🌿",
              },
              {
                title: "Excellent Service",
                description: "A highly attentive hospitality team dedicated to making your picnic day seamless.",
                icon: "🛎️",
              },
              {
                title: "Outstanding Value",
                description: "Covers entry, pools, slides, breakfast, lunch, and high tea at competitive package rates.",
                icon: "💰",
              },
            ].map((item, idx) => (
              <FadeUp
                key={item.title}
                delay={idx * 40}
                className="bg-white rounded-3xl p-6 border border-sand/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="text-2xl block">{item.icon}</span>
                  <h4 className="font-serif text-lg font-bold text-pine">
                    {item.title}
                  </h4>
                  <p className="text-pine/70 font-light text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* ── SECTION 10: NEARBY ATTRACTIONS IN KHOPOLI ── */}
        <div className="space-y-12 mb-24 sm:mb-32">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <FadeUp>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-bronze">
                Section 10: Nearby Attractions in Khopoli
              </span>
            </FadeUp>
            <FadeUp delay={50}>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pine">
                Explore the Natural Beauty &amp; Thrills of Khopoli
              </h2>
            </FadeUp>
            <FadeUp delay={100}>
              <p className="text-pine/80 font-light">
                Extend your outing or add a local excursion. UK&apos;s Resort is positioned close to some of the area&apos;s best attractions.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Imagicaa Theme Park",
                distance: "15 mins away",
                description: "One of India's premier theme parks, offering thrill rides, indoor attractions, and dining.",
                image: "/imagica.png",
              },
              {
                title: "Zenith & Paladarsi Waterfalls",
                distance: "20 mins away",
                description: "Beautiful monsoon spots where natural mountain streams cascade down lush Sahyadri rocks.",
                image: "/paladarsiwaterfall.png",
              },
              {
                title: "Gagangiri Ashram",
                distance: "15 mins away",
                description: "A peaceful spiritual sanctuary nestled in the hills, perfect for quiet meditation.",
                image: "/gagangiri.png",
              },
              {
                title: "Varad Vinayak Temple",
                distance: "10 mins away",
                description: "The historic Ashtavinayak Ganesha temple at Mahad, visited by travelers for blessings.",
                image: "/Astavinayakmandir.png",
              },
            ].map((item, idx) => (
              <FadeUp
                key={item.title}
                delay={idx * 50}
                className="bg-white rounded-3xl overflow-hidden border border-sand/40 shadow-sm flex flex-col justify-between"
              >
                <div className="relative h-[160px] w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-w-768px) 100vw, 25vw"
                  />
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] text-white font-semibold uppercase tracking-wider">
                    {item.distance}
                  </div>
                </div>
                <div className="p-5 space-y-2 flex-grow flex flex-col justify-between">
                  <h4 className="font-serif text-base font-bold text-pine">
                    {item.title}
                  </h4>
                  <p className="text-pine/75 font-light text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* ── SECTION 11: FREQUENTLY ASKED QUESTIONS ── */}
        <div className="max-w-4xl mx-auto space-y-12 mb-24 sm:mb-32">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <FadeUp>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-bronze">
                Section 11: Frequently Asked Questions
              </span>
            </FadeUp>
            <FadeUp delay={50}>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pine">
                Day Outing FAQs &amp; Package Details
              </h2>
            </FadeUp>
            <FadeUp delay={100}>
              <p className="text-pine/80 font-light">
                Find clear answers to common questions about our one day picnic packages.
              </p>
            </FadeUp>
          </div>

          <div className="space-y-4 border-t border-sand/40 pt-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <FadeUp key={idx} className="border-b border-sand/40 pb-4">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left py-3 flex items-center justify-between gap-4 group"
                  >
                    <span className="font-serif text-base sm:text-lg font-bold text-pine group-hover:text-bronze transition-colors">
                      {faq.q}
                    </span>
                    <span className={`text-xl transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                      ＋
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen ? "max-h-[250px] opacity-100 mt-2" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-pine/80 font-light text-sm sm:text-base leading-relaxed pl-1">
                      {faq.a}
                    </p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>

        {/* ── SECTION 12: CALL TO ACTION ── */}
        <div className="max-w-4xl mx-auto bg-sand/10 border border-sand/40 rounded-[3rem] p-8 sm:p-16 text-center space-y-8 shadow-sm">
          <FadeUp>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-bronze">
              Section 12: Call to Action
            </span>
          </FadeUp>
          <FadeUp delay={50}>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pine">
              Reserve Your Day of Fun and Relaxation
            </h2>
          </FadeUp>
          <FadeUp delay={100}>
            <p className="text-[#31464f] font-light text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Our one day picnic packages offer fantastic value for families, friends, schools, and corporate outings. Spend a memorable day in the Sahyadri mountains with pools, slides, outdoor sports, and a multi-cuisine buffet spread. Book your tickets online today or contact our reservations desk for custom group packages.
            </p>
          </FadeUp>
          <FadeUp delay={150} className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              href="https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true"
              target="_blank"
              style={{ color: "#ffffff" }}
              className="bg-accent hover:bg-accent/90 !text-white font-bold uppercase tracking-wider text-xs px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Book Day Package Online
            </Link>
            <Link
              href="/contact"
              style={{ color: "#ffffff" }}
              className="bg-pine hover:bg-pine/90 !text-white font-bold uppercase tracking-wider text-xs px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Enquire for Group Booking
            </Link>
          </FadeUp>
        </div>

      </Container>
    </section>
  );
}
