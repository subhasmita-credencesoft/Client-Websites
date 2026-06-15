"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedContent from "./AnimatedContent";

const SECTIONS = [
  { id: "intro", title: "1. Introduction" },
  { id: "planning", title: "2. Planning the Trip" },
  { id: "journey", title: "3. The Journey to Khopoli" },
  { id: "arrival", title: "4. Arrival Experience" },
  { id: "first-impressions", title: "5. First Impressions" },
  { id: "location", title: "6. Location & Surroundings" },
  { id: "rooms", title: "7. Room Experience" },
  { id: "dining", title: "8. Food & Dining" },
  { id: "pool", title: "9. Swimming Pool" },
  { id: "rain-dance", title: "10. Rain Dance" },
  { id: "indoor-activities", title: "11. Indoor Games" },
  { id: "outdoor-activities", title: "12. Outdoor Sports" },
  { id: "families", title: "13. For Families" },
  { id: "couples", title: "14. For Couples" },
  { id: "corporate", title: "15. Corporate Outings" },
  { id: "monsoon", title: "16. Monsoon Magic" },
  { id: "hospitality", title: "17. Hospitality Review" },
  { id: "cleanliness", title: "18. Cleanliness Check" },
  { id: "things-loved", title: "19. 10 Things I Loved" },
  { id: "improvements", title: "20. Suggestions" },
  { id: "attractions", title: "21. Local Attractions" },
  { id: "photography", title: "22. Photo Hotspots" },
  { id: "value", title: "23. Value Analysis" },
  { id: "who-visit", title: "24. Who Should Visit" },
  { id: "pros-cons", title: "25. Pros & Cons Summary" },
  { id: "faq", title: "26. FAQs" },
  { id: "verdict", title: "27. Final Verdict" },
  { id: "conclusion", title: "28. Conclusion" },
];

export default function LongFormExperience() {
  const [activeSection, setActiveSection] = useState("intro");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [faqSearch, setFaqSearch] = useState("");
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeActivityTab, setActiveActivityTab] = useState("pool");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);

  // Track reading progress & active section
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) {
        setActiveSection(visible.target.id);
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0,
    });

    SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observerRef.current?.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 110;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Where is UK's Resort located and how do I reach it?",
      a: "UK's Resort is located in Khopoli, Maharashtra. It is highly accessible via the Mumbai-Pune Expressway, located just a short 15-minute drive from the Expressway exit near the Khopoli toll plaza. GPS navigation leads directly to the entrance."
    },
    {
      q: "What is the check-in and check-out timing?",
      a: "Standard check-in time is 1:00 PM, and check-out is at 11:00 AM. Early check-in or late check-out is subject to room availability and may incur additional charges."
    },
    {
      q: "Are meals included in the room tariff?",
      a: "The resort offers both room-only plans and all-inclusive meal packages. It is highly recommended to opt for the buffet meal plans (breakfast, lunch, and dinner) as they offer great variety and excellent value for money."
    },
    {
      q: "Is there a swimming pool at the resort, and are there separate kids' pools?",
      a: "Yes, the resort features a large, well-maintained swimming pool with water slides. There is also a dedicated shallow section for young children to play safely."
    },
    {
      q: "Is the pool safe for children? Are there lifeguards?",
      a: "Yes, child safety is a priority. There is a separate shallow pool zone, and a trained lifeguard is on duty during the pool opening hours to monitor all guests."
    },
    {
      q: "What activities are available at UK's Resort?",
      a: "Guests can enjoy a wide array of activities, including a daily rain dance, indoor games (table tennis, carrom, chess), outdoor sports (box cricket, volleyball, badminton), and adventure options like archery and rifle shooting."
    },
    {
      q: "Is the resort suitable for senior citizens?",
      a: "Yes, the resort layout features wide, flat paved pathways with minimal stairs, making it easy for elderly guests to walk around. There are also plenty of garden benches for resting."
    },
    {
      q: "Do they accommodate corporate groups and team outings?",
      a: "Absolutely. UK's Resort is a premier venue for corporate events, featuring modern conference rooms, large outdoor team-building lawns, and customized banquet options."
    },
    {
      q: "What is the best season to visit UK's Resort Khopoli?",
      a: "While it is a popular year-round destination, the monsoon season (June to September) is particularly magical, as the surrounding Sahyadri hills turn lush green and are covered in fog."
    },
    {
      q: "Is there proper Wi-Fi and mobile connectivity at the resort?",
      a: "Yes, the resort provides complimentary high-speed Wi-Fi in the rooms and common areas, which is highly reliable for remote work or streaming."
    },
    {
      q: "Is parking available on-site?",
      a: "Yes, there is a large, secure, and well-organized on-site parking lot free of charge for all resort guests."
    },
    {
      q: "Are vegetarian and Jain food options available?",
      a: "Yes, the multi-cuisine restaurant serves a wide selection of vegetarian options, and Jain meals can be prepared upon request with prior notice to the kitchen staff."
    },
    {
      q: "Are there any waterfalls nearby?",
      a: "Yes, the famous Zenith Waterfall and Paladarsi Waterfall are located within a 20-minute drive from the resort, making for excellent monsoon excursions."
    },
    {
      q: "Is Imagicaa Theme Park close to the resort?",
      a: "Yes, Imagicaa is located just a 15-minute drive from UK's Resort, making the resort an excellent base for families planning to visit the theme park."
    },
    {
      q: "What safety measures are in place at the resort?",
      a: "The resort features 24/7 security personnel, CCTV monitoring in common areas, fire safety equipment, lifeguards at the pool, and trained staff to handle first aid or emergencies."
    }
  ];

  const filteredFaqs = useMemo(() => {
    return faqs.filter(
      (f) =>
        f.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
        f.a.toLowerCase().includes(faqSearch.toLowerCase())
    );
  }, [faqSearch]);

  return (
    <section className="relative bg-[#fbfbf9] text-[#1f3c44] antialiased">
      
      {/* Premium Linear Reading Progress Bar */}
      <div className="fixed top-0 left-0 z-50 h-[4px] bg-[#c46a3a] transition-all duration-100 ease-out" style={{ width: `${readingProgress}%` }} />

      {/* Floating Header Actions for Mobile */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1f3c44] text-white shadow-xl hover:bg-[#b68b5b] transition-all duration-300 transform active:scale-95"
          aria-label="Toggle Table of Contents"
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer Navigation Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer Menu */}
      <div className={`lg:hidden fixed top-0 bottom-0 left-0 z-40 w-4/5 max-w-xs bg-white p-6 shadow-2xl transition-transform duration-300 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <h4 className="font-serif text-lg font-bold text-[#b68b5b] mb-4 tracking-wide uppercase">Chapters</h4>
        <nav className="space-y-1 overflow-y-auto max-h-[80vh]">
          {SECTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className={`w-full text-left text-sm py-2 px-3 rounded-lg transition-all ${
                activeSection === sec.id
                  ? "bg-[#1f3c44] text-white font-medium pl-4"
                  : "text-[#31464f] hover:bg-[#f3efe8]"
              }`}
            >
              {sec.title}
            </button>
          ))}
        </nav>
      </div>

      {/* Interactive Main Page Layout */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">

          {/* Glassmorphism Sidebar (Desktop Only) */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 max-h-[82vh] overflow-y-auto rounded-3xl bg-white/70 backdrop-blur-md p-6 border border-[#e8ddcf]/50 shadow-soft scrollbar-thin hover:shadow-card transition-shadow duration-300">
              <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-[#b68b5b] block mb-2">Travelogue Guide</span>
              <h4 className="font-serif text-2xl font-semibold text-[#1f3c44] mb-6 tracking-tight">Chapters</h4>
              <nav className="relative space-y-1">
                {/* Vertical Timeline Tracker line */}
                <div className="absolute left-[9px] top-3 bottom-3 w-[1.5px] bg-[#e8ddcf]" />
                
                {SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollTo(sec.id)}
                    className={`w-full text-left text-sm py-2 pl-6 pr-2 rounded-lg transition-all duration-300 relative ${
                      activeSection === sec.id
                        ? "text-[#c46a3a] font-semibold translate-x-1"
                        : "text-[#4f656d] hover:text-[#1f3c44] hover:translate-x-0.5"
                    }`}
                  >
                    <span className={`absolute left-1 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-white transition-all duration-300 ${
                      activeSection === sec.id ? "bg-[#c46a3a] scale-125 ring-2 ring-[#c46a3a]/25" : "bg-[#e8ddcf]"
                    }`} />
                    {sec.title}
                  </button>
                ))}
              </nav>
              
              <div className="mt-8 pt-6 border-t border-[#e8ddcf] text-center">
                <Link
                  href="https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true"
                  target="_blank"
                  className="group relative inline-flex items-center justify-center w-full py-3.5 px-4 rounded-2xl bg-[#1f3c44] text-white text-xs font-bold tracking-widest uppercase overflow-hidden shadow-soft transition-all duration-300 hover:shadow-card active:scale-[0.98]"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#b68b5b] to-[#c46a3a] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 flex items-center gap-2">
                    Book Stay
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Article Content Container */}
          <div className="lg:col-span-3 max-w-4xl space-y-24">

            {/* Immersive Header Block */}
            <AnimatedContent animateOnView={true} duration={1} ease="power3.out" className="text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#b68b5b]/10 px-4 py-2 rounded-full border border-[#b68b5b]/20">
                <span className="w-2 h-2 rounded-full bg-[#b68b5b] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#b68b5b]">Featured Traveler Review</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.15] text-[#1f3c44] tracking-tight">
                My Experience at UK&apos;s Resort, Khopoli: <span className="font-serif italic font-normal text-[#b68b5b]">A Perfect Weekend Escape</span> Near Mumbai and Pune
              </h1>
              <p className="text-lg md:text-xl text-[#31464f] font-light leading-relaxed max-w-2xl">
                An immersive, first-hand journal highlighting room comforts, local buffet dining, adventure sports, pool play, and the magic of Sahyadri rain.
              </p>
            </AnimatedContent>

            {/* Immersive Parallax Intro Image */}
            <AnimatedContent animateOnView={true} threshold={0.15} className="relative h-[300px] sm:h-[480px] w-full rounded-3xl overflow-hidden shadow-card group">
              <Image
                src="/picnic.avif"
                alt="UK's Resort Khopoli - An oasis of greenery and fun"
                fill
                priority
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#b68b5b] bg-[#e8ddcf]/20 backdrop-blur-md px-3 py-1 rounded">Resort Overview</span>
                <p className="font-serif text-xl sm:text-2xl font-light italic leading-relaxed">
                  {"Finding pockets of peace and ripples of laughter at UK's Resort, Khopoli, nestled at the base of Sahyadri ranges."}
                </p>
              </div>
            </AnimatedContent>

            {/* 1. INTRODUCTION */}
            <article id="intro" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-serif text-5xl font-bold text-[#b68b5b]/30">01</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f3c44] tracking-tight">
                  Escaping the Concrete Jungle
                </h2>
              </div>
              <div className="space-y-6 text-[#31464f] text-[17px] leading-[1.8] font-light">
                <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#c46a3a] first-letter:float-left first-letter:mr-3 first-letter:leading-none">
                  The incessant buzz of notifications, the mechanical hum of traffic, and the gray monotony of concrete walls&mdash;living in Mumbai or Pune can sometimes feel like running on a treadmill that never stops. As someone who thrives on travel, I realized I desperately needed a break from the routine. I didn&apos;t want to fly out to distant lands or spend days planning a complicated itinerary. What I craved was a quick, spontaneous road trip to a place where the air felt clean, the hills looked vibrant green, and my mind could simply rest. This is how I ended up discovering <strong>UK&apos;s Resort Khopoli</strong>.
                </p>
                <p>
                  Khopoli has long been a favorite transit point for travelers moving along the Mumbai-Pune Expressway, but in recent years, it has transformed into a major holiday destination. Blessed with cascading waterfalls, rich biodiversity, and deep valleys, it serves as the perfect green buffer zone between Maharashtra&apos;s two busiest cities. The promise of spending a weekend surrounded by this natural beauty, combined with premium comforts and family-oriented activities, instantly piqued my interest.
                </p>
                <p>
                  Before setting out, I found myself thinking: Can a single resort truly satisfy a nature lover, a foodie, a leisure traveler, and an adventure enthusiast? UK&apos;s Resort claims to do exactly that. Nestled close to the Sahyadri mountains, it positions itself as a premier <strong>family resort in Khopoli</strong> and a highly popular <strong>weekend getaway near Mumbai</strong> and Pune. My curiosity was officially activated, and I couldn&apos;t wait to see if the property lived up to its glowing reputation.
                </p>
              </div>
            </article>

            {/* 2. PLANNING THE TRIP */}
            <article id="planning" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-serif text-5xl font-bold text-[#b68b5b]/30">02</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f3c44] tracking-tight">
                  Planning the Trip & Research
                </h2>
              </div>
              <div className="space-y-6 text-[#31464f] text-[17px] leading-[1.8] font-light">
                <p>
                  Our planning process began on a quiet Tuesday evening. My spouse wanted a resort with a large swimming pool to escape the humidity, while my siblings wanted a place with outdoor games and adventure options. We also had to consider my elderly parents, who preferred a peaceful setting with good food and minimal walking required to get to the dining areas. 
                </p>
                <p>
                  I began researching properties online, typing terms like <strong>resort near Mumbai</strong> and <strong>resort near Pune</strong> into my search bar. UK&apos;s Resort Khopoli kept showing up near the top of the reviews. I read dozens of comments on travel blogs and booking platforms. Reviewers consistently praised its hospitality, delicious buffet spreads, and excellent kids&apos; play zones. But what really sealed the deal was a recommendation from a colleague who had hosted a corporate outing at the property. He spoke highly of the spacious layouts and the efficient coordination of activities by the staff.
                </p>
                <p>
                  We visited their website to check the available rooms and tariffs. The booking process was surprisingly straightforward. Since we were traveling as a family, we opted for two Deluxe Rooms, which looked spacious and comfortable. The pricing was highly competitive, especially considering the sheer range of amenities included. With my expectations set high, I clicked the confirm button and began counting down the days.
                </p>
              </div>
            </article>

            {/* 3. THE JOURNEY TO KHOPOLI (Visual Road-trip Card) */}
            <article id="journey" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-serif text-5xl font-bold text-[#b68b5b]/30">03</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f3c44] tracking-tight">
                  The Journey: Cruising Along the Expressway
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 bg-[#e8ddcf]/20 rounded-3xl p-6 sm:p-8 border border-[#e8ddcf]/40">
                <div className="md:col-span-3 space-y-4 text-[#31464f] text-[17px] leading-[1.8] font-light">
                  <p>
                    On Saturday morning, we loaded our bags into the car and set off from Mumbai at around 7:30 AM. Leaving early is the golden rule for any road trip in this region to beat the city traffic. As soon as we crossed the Vashi bridge and got onto the Mumbai-Pune Expressway, the journey took on a different character. The heavy sky began to clear, replaced by soft morning light filtering through the trees.
                  </p>
                  <p>
                    The road conditions on the Expressway were top-notch, making for a smooth and effortless drive. As we drove further from the city, the landscape shifted dramatically. The buildings shrunk, giving way to rolling hills covered in a light carpet of green. Since we were traveling just at the onset of the monsoons, the mountains were beginning to showcase their gorgeous emerald hues, with tiny seasonal waterfalls starting to trickle down the rock faces.
                  </p>
                  <p>
                    Reaching the resort was incredibly easy. Khopoli is highly accessible, and GPS navigation guided us directly to the resort&apos;s gates without a single wrong turn. We exited the expressway near the Khopoli toll plaza, and within 15 minutes of driving through the scenic local roads, we arrived at our destination. The journey took us just under two hours, which felt incredibly brief yet yielded a total transition in scenery.
                  </p>
                </div>
                <div className="md:col-span-2 flex flex-col justify-between bg-white rounded-2xl p-6 shadow-sm border border-[#e8ddcf]/30">
                  <div>
                    <h5 className="font-serif font-bold text-lg text-[#1f3c44] mb-3 flex items-center gap-2">
                      <span className="text-xl">🚗</span> Traveler Route Info
                    </h5>
                    <div className="space-y-4 text-sm text-[#4f656d]">
                      <div>
                        <p className="font-bold text-[#1f3c44]">From Mumbai</p>
                        <p>Expressway &rarr; Khopoli Toll Plaza Exit &rarr; Local Road (Approx. 85 km, 1.5 - 2 hrs)</p>
                      </div>
                      <div>
                        <p className="font-bold text-[#1f3c44]">From Pune</p>
                        <p>Expressway &rarr; Khalapur Toll Plaza &rarr; Exit &rarr; Khopoli (Approx. 80 km, 1.5 hrs)</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 border-t border-[#e8ddcf] pt-4">
                    <span className="text-xs font-bold text-[#c46a3a] block uppercase tracking-wider mb-1">Road Hack</span>
                    <p className="text-xs text-[#31464f]">
                      Try crossing the Kalamboli junction before 8 AM. Save time and beat Lonavala ghat blocks.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* 4. ARRIVAL EXPERIENCE */}
            <article id="arrival" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-serif text-5xl font-bold text-[#b68b5b]/30">04</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f3c44] tracking-tight">
                  Arrival Experience: A Warm Sahyadri Welcome
                </h2>
              </div>
              <div className="space-y-6 text-[#31464f] text-[17px] leading-[1.8] font-light">
                <p>
                  As our car rolled up to the entrance of UK&apos;s Resort, we were greeted by the sight of a grand gateway framed by lush plants. The watchman smiled, checked our booking details, and guided us to the spacious parking lot. I immediately noticed how organized the parking area was&mdash;no chaotic double-parking or tight spots, which is a common headache at many popular weekend resorts.
                </p>
                <p>
                  We walked towards the reception lobby and were immediately struck by its design. It was open, airy, and high-ceilinged, allowing the gentle breeze to flow freely. The decor combined modern cleanliness with warm, earthy wooden accents. As we sat down in the lounge, the staff offered us a refreshing welcome drink&mdash;a chilled, sweet kokum sherbet that instantly revived us after the drive.
                </p>
                <p>
                  The check-in process was incredibly fast and professional. The front desk staff greeted us warmly, scanned our government IDs, and explained the layout of the property, the timings for the meals, and how to access the various recreation zones. Within 10 minutes, a helpful bellboy was loading our luggage onto a trolley to guide us to our rooms. This smooth transition from the car to the room set a wonderful tone for the rest of our stay.
                </p>
              </div>
            </article>

            {/* 5. FIRST IMPRESSIONS */}
            <article id="first-impressions" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-serif text-5xl font-bold text-[#b68b5b]/30">05</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f3c44] tracking-tight">
                  First Impressions: Discovering the Layout
                </h2>
              </div>
              <div className="space-y-6 text-[#31464f] text-[17px] leading-[1.8] font-light">
                <p>
                  Walking through the manicured pathways of the resort towards the rooms, I was struck by the sense of cleanliness and space. The property is designed with wide lawns, clean asphalt pathways, and neat brick borders. It felt like a self-contained oasis. The air was noticeaby cleaner and had that rich, earthy scent of damp soil and fresh vegetation.
                </p>
                <p>
                  The layout of the resort is thoughtful. It separates the quiet residential wings from the high-energy areas like the swimming pool, the water park slides, and the indoor play zones. This ensures that guests who wish to relax or sleep in can do so without being disturbed by the music or the laughter coming from the pools. 
                </p>
                <p>
                  I also noticed the security presence across the property. There were staff members situated at key junctions, lifeguards keeping an eye on the water areas, and clear signboards directing guests to different facilities. My initial reaction was one of reassurance&mdash;this was clearly a professionally managed, high-end destination that took its guests&apos; safety and comfort seriously.
                </p>
              </div>
            </article>

            {/* 6. LOCATION AND NATURAL SURROUNDINGS (Monsoon visual cards) */}
            <article id="location" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-serif text-5xl font-bold text-[#b68b5b]/30">06</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f3c44] tracking-tight">
                  Location and Natural Surroundings
                </h2>
              </div>
              <div className="space-y-6 text-[#31464f] text-[17px] leading-[1.8] font-light">
                <p>
                  UK&apos;s Resort is situated in a geographic sweet spot. It is close enough to the highways to be easily accessible, yet tucked away enough to escape the noise. The backdrop of the resort is dominated by the majestic Western Ghats, which rise like green giants in the distance. 
                </p>
                <p>
                  During our morning walks, the scenery was spectacular. Wisps of white mist clung to the mountaintops, and the fresh, cool breeze rustled through the dense foliage of the trees. The resort has done an excellent job of maintaining its natural flora. Mature trees line the perimeter, providing natural shade, while beds of colorful seasonal flowers attract butterflies and small birds.
                </p>
              </div>
              
              <div className="relative h-[300px] sm:h-[400px] w-full rounded-3xl overflow-hidden shadow-soft my-8 group">
                <Image
                  src="/Zenhills.png"
                  alt="Scenic view of Khopoli hills near UK's Resort"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-6 left-6 text-white font-serif text-lg italic">
                  {"The majestic Western Sahyadris towering behind the resort grounds."}
                </span>
              </div>

              <div className="space-y-6 text-[#31464f] text-[17px] leading-[1.8] font-light">
                <p>
                  It is a wonderful place for anyone seeking a <strong>nature resort Maharashtra</strong> experience. Standing on the lawn, taking deep breaths of the crisp air, and listening to the calls of local birds, it was hard to believe we were just a short drive away from the chaotic streets of Mumbai. The peaceful atmosphere was incredibly grounding.
                </p>
              </div>
            </article>

            {/* 7. ROOM EXPERIENCE (Modern Specification Layout) */}
            <article id="rooms" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-serif text-5xl font-bold text-[#b68b5b]/30">07</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f3c44] tracking-tight">
                  Room Experience: A Haven of Comfort
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#faf7f2] rounded-3xl p-6 sm:p-8 border border-[#e8ddcf]/30 shadow-soft">
                <div className="relative h-[250px] sm:h-[350px] w-full rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src="/slider2.jpg"
                    alt="Premium Rooms at UK's Resort Khopoli"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="space-y-6">
                  <h4 className="font-serif text-2xl font-bold text-[#1f3c44]">Cozy Deluxe Living</h4>
                  <p className="text-sm text-[#4f656d] leading-relaxed font-light">
                    When we entered our Deluxe Room, I was immediately pleased with the size. It was exceptionally spacious, with clean tiled flooring and a neutral color palette that felt calming. A large king-sized bed stood in the center, flanked by bedside tables and elegant reading lamps. The linens were crisp, white, and smelled fresh, which is my ultimate test of a resort&apos;s maintenance.
                  </p>
                  
                  {/* Visual specs list */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#e8ddcf]">
                    {[
                      { icon: "🛏️", label: "King Bed" },
                      { icon: "📶", label: "Free Wi-Fi" },
                      { icon: "❄️", label: "Quiet AC" },
                      { icon: "🚿", label: "Instant Hot Water" },
                      { icon: "☕", label: "Tea/Coffee Maker" },
                      { icon: "🌅", label: "Private Balcony" },
                    ].map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-semibold text-[#1f3c44]">
                        <span className="text-sm bg-white w-7 h-7 rounded-full flex items-center justify-center shadow-sm">{spec.icon}</span>
                        {spec.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6 text-[#31464f] text-[17px] leading-[1.8] font-light">
                <p>
                  The room design was both functional and modern. It featured a comfortable seating area with a plush sofa, a study desk, a flat-screen TV, and a well-stocked tea/coffee station. The air conditioning was powerful and remarkably quiet, allowing us to cool down the room quickly. The Wi-Fi signal was strong and stable, which was a nice surprise given the mountain location.
                </p>
                <p>
                  The bathroom was equally impressive. It was clean, dry, and came equipped with modern sanitary fittings, fresh towels, and a selection of premium toiletries. Hot water was available instantly, which was highly appreciated after our outdoor excursions. Outside, a private balcony offered a quiet space to sit with a cup of tea in the evening, looking out over the landscaped gardens and watching the rain paint the sky.
                </p>
              </div>
            </article>

            {/* 8. FOOD AND DINING EXPERIENCE (Immersive Foodie Box) */}
            <article id="dining" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-serif text-5xl font-bold text-[#b68b5b]/30">08</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f3c44] tracking-tight">
                  Food and Dining: A Culinary Celebration
                </h2>
              </div>
              <div className="space-y-6 text-[#31464f] text-[17px] leading-[1.8] font-light">
                <p>
                  Any vacation is incomplete without good food, and this is where UK&apos;s Resort truly shines. The resort features a spacious multi-cuisine restaurant that serves both buffet and à la carte options. During our stay, we opted for the buffet package, which offered an incredible spread of Indian, Chinese, and local Maharashtrian dishes.
                </p>
              </div>

              <div className="my-8 rounded-3xl overflow-hidden bg-[#1f3c44] text-white shadow-lg grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-[250px] md:h-full min-h-[250px]">
                  <Image
                    src="/dining.png"
                    alt="Dining Experience at UK's Resort"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1f3c44]/40 to-transparent" />
                </div>
                
                <div className="p-8 space-y-6 flex flex-col justify-center">
                  <span className="text-[10px] tracking-[0.25em] font-bold text-[#b68b5b] uppercase block">The Buffet Highlights</span>
                  <h4 className="font-serif text-3xl font-bold text-white">Authentic Flavors</h4>
                  
                  <div className="space-y-4 text-sm text-[#e8ddcf] font-light">
                    <p>
                      <strong>Live Dosas & Omelets:</strong> Made fresh at breakfast stations, serving piping hot, custom orders.
                    </p>
                    <p>
                      <strong>Spicy Misal Pav:</strong> A local favorite with perfect spice level and fresh garnish.
                    </p>
                    <p>
                      <strong>Maharashtrian Chicken:</strong> Coconut-rich, flavorful gravy cooked to perfection.
                    </p>
                    <p>
                      <strong>Warm Desserts:</strong> Exquisite soft gulab jamuns served warm in the evenings.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 text-[#31464f] text-[17px] leading-[1.8] font-light">
                <p>
                  For breakfast, we were treated to a live station serving hot, crispy dosas and fluffy open-faced omelets, alongside classic options like poha, idli, puri bhaji, and fresh cut fruits. The highlight for me was the local Maharashtrian Misal Pav&mdash;it had just the right amount of spice and was served with fresh, hot pav.
                </p>
                <p>
                  Lunch and dinner were elaborate affairs. The salads were fresh, the curries were rich without being overly oily, and the desserts were spectacular. My parents loved the soft, warm gulab jamuns, while I couldn&apos;t get enough of the local chicken curry, which had a beautiful coconut-based gravy. The restaurant staff was attentive, quickly clearing empty plates and refilling buffet items so that guests never had to wait. The dining atmosphere was warm, lively, and incredibly satisfying.
                </p>
              </div>
            </article>

            {/* 9 - 12. ACTIVITIES IMMERSIVE DASHBOARD (Tab-based Interactive Section) */}
            <article className="scroll-mt-28 space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-5xl font-bold text-[#b68b5b]/30">09-12</span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f3c44] tracking-tight">
                    Resort Activities Dashboard
                  </h2>
                </div>
                
                {/* Dashboard Tabs Selector */}
                <div className="flex flex-wrap gap-2 border-b border-[#e8ddcf] pb-2 md:pb-0 md:border-none">
                  {[
                    { id: "pool", label: "Swimming Pool" },
                    { id: "rain", label: "Rain Dance" },
                    { id: "indoor", label: "Indoor Games" },
                    { id: "outdoor", label: "Outdoor Sports" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveActivityTab(tab.id)}
                      className={`text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full transition-all duration-300 ${
                        activeActivityTab === tab.id
                          ? "bg-[#c46a3a] text-white shadow-sm"
                          : "text-[#4f656d] hover:bg-[#e8ddcf]/40"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Activities Content with Slide Animation */}
              <div className="bg-white rounded-3xl border border-[#e8ddcf]/40 shadow-soft p-6 sm:p-8 min-h-[420px] flex flex-col justify-between transition-all duration-500">
                {activeActivityTab === "pool" && (
                  <div id="pool" className="space-y-6">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#b68b5b] tracking-widest">
                      <span>🏊‍♂️ WATER EXCURSIONS</span>
                    </div>
                    <h3 className="font-serif text-3xl font-bold text-[#1f3c44]">Swimming Pool: The Blue Heart of the Resort</h3>
                    
                    <div className="relative h-[220px] w-full rounded-2xl overflow-hidden shadow-inner my-4">
                      <Image src="/picnic.avif" alt="Swimming Pool at UK's Resort" fill className="object-cover" />
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-xs text-white">
                        Lifeguard on duty
                      </div>
                    </div>
                    
                    <div className="text-sm text-[#31464f] leading-relaxed space-y-4 font-light">
                      <p>
                        After unpacking and resting, we headed straight to the swimming pool area. The pool is the central hub of activity at the resort, and it did not disappoint. It is a large, beautifully designed pool with crystal-clear water. The pool deck is lined with comfortable sun loungers and tall palm trees, giving it a tropical feel.
                      </p>
                      <p>
                        What I appreciated most was the safety measures in place. There was a dedicated, shallow pool area for children, allowing them to splash around safely while parents relaxed nearby. A trained lifeguard was on duty throughout the opening hours, keeping a watchful eye on all swimmers.
                      </p>
                      <p>
                        For adults, it is a fantastic place to unwind. Whether you want to swim laps or simply float in the water while looking up at the cloudy sky, the experience is incredibly refreshing. It&apos;s easy to see why this is a highly recommended <strong>resort with swimming pool near Mumbai</strong>.
                      </p>
                    </div>
                  </div>
                )}

                {activeActivityTab === "rain" && (
                  <div id="rain-dance" className="space-y-6">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#b68b5b] tracking-widest">
                      <span>🌧️ MONSOON MUSIC</span>
                    </div>
                    <h3 className="font-serif text-3xl font-bold text-[#1f3c44]">Rain Dance: Rhythm and Rainfall</h3>
                    
                    <div className="border-l-4 border-[#c46a3a] pl-4 italic text-lg text-[#1f3c44] font-serif my-6">
                      {"Bollywood beats combined with the cool splash of overhead sprays make for a legendary afternoon celebration."}
                    </div>

                    <div className="text-sm text-[#31464f] leading-relaxed space-y-4 font-light">
                      <p>
                        If you want to experience the sheer joy of a monsoon getaway, the rain dance arena at UK&apos;s Resort is an absolute must-visit. Scheduled every afternoon, the rain dance is a high-energy event that brings all the guests together. The resort sets up a dedicated enclosure with overhead sprinklers that mimic a heavy monsoon downpour.
                      </p>
                      <p>
                        As the DJ started playing popular Bollywood and international tracks, the energy of the crowd soared. Kids, teenagers, parents, and even grandparents joined in, dancing under the cool water spray. The sound system was powerful, and the atmosphere was filled with pure joy and laughter.
                      </p>
                      <p>
                        It was one of the most memorable parts of our trip. It gave us a chance to let go of our inhibitions, laugh like children, and enjoy the water in a fun, safe, and social setting. For anyone looking for a <strong>rain dance resort</strong> near Pune or Mumbai, this is a major highlight.
                      </p>
                    </div>
                  </div>
                )}

                {activeActivityTab === "indoor" && (
                  <div id="indoor-activities" className="space-y-6">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#b68b5b] tracking-widest">
                      <span>♟️ INDOOR ENTERTAINMENT</span>
                    </div>
                    <h3 className="font-serif text-3xl font-bold text-[#1f3c44]">Indoor Activities: Leisure in the Recreation Zone</h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
                      {[
                        { title: "Table Tennis", desc: "Fast-paced action" },
                        { title: "Carrom", desc: "Traditional board play" },
                        { title: "Chess", desc: "Intellectual battles" },
                        { title: "Board Games", desc: "Fun for children" },
                      ].map((item, i) => (
                        <div key={i} className="bg-[#fcfbf9] rounded-xl p-4 border border-[#e8ddcf]/30 shadow-xs text-center">
                          <p className="font-serif font-bold text-sm text-[#1f3c44]">{item.title}</p>
                          <p className="text-[11px] text-[#4f656d] mt-1">{item.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="text-sm text-[#31464f] leading-relaxed space-y-4 font-light">
                      <p>
                        On Saturday afternoon, when it began to rain heavily outside, we retreated to the resort&apos;s indoor recreation center. Having a well-equipped indoor games zone is crucial for any resort in Maharashtra, where sudden downpours can temporarily put outdoor plans on hold.
                      </p>
                      <p>
                        The recreation hall was spacious, clean, and featured several gaming options. There were multiple carrom boards, chess tables, and a table tennis table. My siblings and I ended up playing a mini table tennis tournament, which brought back fond childhood memories. 
                      </p>
                      <p>
                        For families with younger children, they also offer a selection of board games. The equipment was in good condition&mdash;the carrom boards were well-powdered, the table tennis bats were in good shape, and all the game pieces were complete. It served as a wonderful indoor retreat that kept us entertained for hours while the rain poured outside.
                      </p>
                    </div>
                  </div>
                )}

                {activeActivityTab === "outdoor" && (
                  <div id="outdoor-activities" className="space-y-6">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#b68b5b] tracking-widest">
                      <span>🏏 ADVENTURE SPORTS</span>
                    </div>
                    <h3 className="font-serif text-3xl font-bold text-[#1f3c44]">Outdoor Activities: Adventure on the Grounds</h3>
                    
                    <div className="relative h-[220px] w-full rounded-2xl overflow-hidden shadow-inner my-4">
                      <Image src="/sports1.avif" alt="Sports and outdoor games at UK's Resort" fill className="object-cover" />
                    </div>

                    <div className="text-sm text-[#31464f] leading-relaxed space-y-4 font-light">
                      <p>
                        When the rain subsided on Sunday morning, we stepped out onto the open grounds to explore the outdoor activities. The resort features a large, flat grassy lawn that is perfect for classic group sports. We saw a group of friends playing a friendly match of box cricket, while another family was set up for volleyball.
                      </p>
                      <p>
                        The resort also provides badminton rackets and shuttlecocks for guests who want a quick match. For those seeking adventure, the property features specialized zones for activities like rifle shooting and archery under the guidance of trained coordinators.
                      </p>
                      <p>
                        What makes UK&apos;s Resort stand out is the sheer space. You never feel like you are encroaching on another group&apos;s game. Whether you are running around the lawns with a frisbee or testing your aim with a rifle, the outdoor setup is perfect for burning off some energy and enjoying the fresh mountain air.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </article>

            {/* 13 - 15. USER EXPERIENCE SEGMENTS (Premium Hover Cards) */}
            <article className="scroll-mt-28 space-y-8">
              <div className="flex items-center gap-3">
                <span className="font-serif text-5xl font-bold text-[#b68b5b]/30">13-15</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f3c44] tracking-tight">
                  Curated Experiences for Every Group
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Families Card */}
                <div id="families" className="group flex flex-col justify-between bg-white rounded-3xl p-6 border border-[#e8ddcf]/40 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300">
                  <div className="space-y-4">
                    <span className="text-3xl">👨‍👩‍👧‍👦</span>
                    <h4 className="font-serif text-xl font-bold text-[#1f3c44] group-hover:text-[#b68b5b] transition-colors">For Families</h4>
                    <p className="text-xs text-[#4f656d] leading-relaxed font-light">
                      Traveling with family can sometimes be stressful, as different age groups have vastly different needs. However, UK&apos;s Resort is explicitly designed as a <strong>resort for families</strong>. During our stay, I saw families of all sizes&mdash;young couples with toddlers, multi-generational families with grandparents, and large extended families celebrating reunions.
                    </p>
                    <p className="text-xs text-[#4f656d] leading-relaxed font-light">
                      The resort excels in keeping children engaged. There is a dedicated kids&apos; play zone with slides, swings, and climbing frames, all set on a soft, safe surface. The water slides at the pool are a huge hit, keeping kids entertained for hours under the supervision of attentive staff.
                    </p>
                  </div>
                  <div className="border-t border-[#e8ddcf] pt-4 mt-6">
                    <p className="text-[11px] text-[#31464f] font-semibold">Highlight: Dedicated play zones & pool safety</p>
                  </div>
                </div>

                {/* Couples Card */}
                <div id="couples" className="group flex flex-col justify-between bg-white rounded-3xl p-6 border border-[#e8ddcf]/40 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300">
                  <div className="space-y-4">
                    <span className="text-3xl">👩‍❤️‍👨</span>
                    <h4 className="font-serif text-xl font-bold text-[#1f3c44] group-hover:text-[#b68b5b] transition-colors">For Couples</h4>
                    <p className="text-xs text-[#4f656d] leading-relaxed font-light">
                      While the resort is packed with family fun, it also offers plenty of quiet spaces for couples looking for a romantic escape. The landscaped gardens feature hidden alcoves, and the perimeter pathways are perfect for a quiet evening stroll hand-in-hand.
                    </p>
                    <p className="text-xs text-[#4f656d] leading-relaxed font-light">
                      My spouse and I loved sitting on our private balcony late in the evening. With the room lights turned off, we listened to the gentle sound of the rain falling on the leaves and watched the distant lights of the Khopoli town twinkle through the mist. The cool mountain air and the natural surroundings created an incredibly peaceful, romantic atmosphere.
                    </p>
                  </div>
                  <div className="border-t border-[#e8ddcf] pt-4 mt-6">
                    <p className="text-[11px] text-[#31464f] font-semibold">Highlight: Scenic private balconies & quiet gardens</p>
                  </div>
                </div>

                {/* Corporate Card */}
                <div id="corporate" className="group flex flex-col justify-between bg-white rounded-3xl p-6 border border-[#e8ddcf]/40 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300">
                  <div className="space-y-4">
                    <span className="text-3xl">💼</span>
                    <h4 className="font-serif text-xl font-bold text-[#1f3c44] group-hover:text-[#b68b5b] transition-colors">Corporate Outings</h4>
                    <p className="text-xs text-[#4f656d] leading-relaxed font-light">
                      During our stay, we noticed a corporate team from a major software company based in Pune. They were hosting their annual team-building retreat, and it was interesting to observe how the resort handled their event.
                    </p>
                    <p className="text-xs text-[#4f656d] leading-relaxed font-light">
                      The resort features modern conference halls and meeting spaces equipped with high-end audio-visual systems, making it a premier <strong>corporate outing resort</strong>. The outdoor lawns were used in the morning for organized team-building games, led by an energetic external coordinator. The resort staff helped set up water stations, mic systems, and props on the grass, executing the setup flawlessly.
                    </p>
                  </div>
                  <div className="border-t border-[#e8ddcf] pt-4 mt-6">
                    <p className="text-[11px] text-[#31464f] font-semibold">Highlight: Conference facilities & banquet lawns</p>
                  </div>
                </div>

              </div>
            </article>

            {/* 16. MONSOON EXPERIENCE */}
            <article id="monsoon" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-serif text-5xl font-bold text-[#b68b5b]/30">16</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f3c44] tracking-tight">
                  Monsoon Experience: Sahyadri in Full Bloom
                </h2>
              </div>
              <div className="space-y-6 text-[#31464f] text-[17px] leading-[1.8] font-light">
                <p>
                  While UK&apos;s Resort is a year-round destination, there is something magical about visiting during the monsoons. The rainy season transforms the entire region into a lush, tropical paradise, making it a standout choice for a <strong>monsoon resort Maharashtra</strong> escape.
                </p>
                <p>
                  During our stay, we experienced several heavy showers. Instead of ruining our plans, the rain enhanced the beauty of the property. The leaves on the trees looked freshly washed, the lawns were a vibrant, deep green, and the air was filled with the fresh scent of earth. The surrounding Sahyadri hills were covered in thick white fog, with clouds floating low over the valleys.
                </p>
                <p>
                  Sitting on the veranda&apos;s edge with a plate of hot, crispy onion pakoras and a cup of steaming ginger tea while watching the rain fall is an experience that words can barely do justice. For photography enthusiasts, the monsoon light and the misty mountains provide endless opportunities to capture spectacular landscape shots.
                </p>
              </div>
            </article>

            {/* 17. STAFF AND HOSPITALITY */}
            <article id="hospitality" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-serif text-5xl font-bold text-[#b68b5b]/30">17</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f3c44] tracking-tight">
                  Staff and Hospitality: Warmth in Every Detail
                </h2>
              </div>
              <div className="space-y-6 text-[#31464f] text-[17px] leading-[1.8] font-light">
                <p>
                  A resort can have the best facilities in the world, but it is the staff that truly makes a stay memorable. The hospitality at UK&apos;s Resort was exceptional. From the moment we checked in to the day we left, every staff member we encountered was polite, professional, and genuinely eager to help.
                </p>
                <p>
                  A small incident stands out: my elderly father needed a specific type of low-sodium food for dinner. When I mentioned this to the restaurant manager, he immediately consulted with the chef. The chef prepared a custom, delicious, low-sodium dish for my father and personally delivered it to our table to check if it was to his liking.
                </p>
                <p>
                  The housekeeping staff was equally efficient, quickly responding to our requests for extra towels or coffee sachets. The activity coordinators at the recreation zones were patient and encouraging, helping my younger cousins with the archery setup. This warm, attentive service made us feel valued and cared for throughout our stay.
                </p>
              </div>
            </article>

            {/* 18. CLEANLINESS AND MAINTENANCE */}
            <article id="cleanliness" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-serif text-5xl font-bold text-[#b68b5b]/30">18</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f3c44] tracking-tight">
                  Cleanliness and Maintenance: Pristine and Polished
                </h2>
              </div>
              <div className="space-y-6 text-[#31464f] text-[17px] leading-[1.8] font-light">
                <p>
                  Maintenance is a major challenge for resorts in high-humidity, heavy-rainfall areas like Khopoli, but UK&apos;s Resort is kept in pristine condition. The common areas, lobbies, and corridors were swept and mopped multiple times a day.
                </p>
                <p>
                  The swimming pool was cleaned every morning, with the water quality monitored regularly to ensure it remained safe and clear. The gardens and lawns were neatly trimmed, with no signs of litter anywhere. 
                </p>
                <p>
                  Inside the rooms, the cleanliness was spotless. The bathroom tile joints were clean, the mirrors were streak-free, and the balcony was free of dust despite the surrounding trees. The resort&apos;s commitment to hygiene was evident in every corner, providing a safe and comfortable environment for guests.
                </p>
              </div>
            </article>

            {/* 19. TOP THINGS I LOVED */}
            <article id="things-loved" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-serif text-5xl font-bold text-[#b68b5b]/30">19</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f3c44] tracking-tight">
                  Top 10 Things I Loved About My Stay
                </h2>
              </div>
              
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8ddcf]/40 shadow-soft">
                <ol className="space-y-4">
                  {[
                    "The Scenic Drive: Reaching the resort in under 2 hours via the smooth, beautiful Mumbai-Pune Expressway.",
                    "Warm Welcome: The refreshing Kokum sherbet welcome drink and the highly efficient 10-minute check-in.",
                    "Spacious Deluxe Rooms: The large room size and the exceptionally comfortable king-size beds.",
                    "Private Balcony Views: Watching the low clouds roll over the Sahyadri mountains from our room.",
                    "Misal Pav at Breakfast: A perfectly spicy, authentic local Maharashtrian breakfast highlight.",
                    "High-Energy Rain Dance: Dancing to great music under the cool water sprinklers in the afternoon.",
                    "Attentive Pool Lifeguards: The reassurance of having dedicated safety staff watching over the swimming pools.",
                    "Personalized Dining Service: The chef custom-preparing low-sodium meals for my elderly father.",
                    "Lush, Clean Gardens: The pristine, litter-free lawns lined with mature shady trees.",
                    "Archery & Rifle Shooting: Having trained coordinators help us test our skills in the adventure zone.",
                  ].map((love, idx) => (
                    <li key={idx} className="flex gap-4 items-start text-[#31464f] text-[15px] font-light">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#b68b5b]/10 text-[#b68b5b] font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span>{love}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </article>

            {/* 20. SUGGESTIONS */}
            <article id="improvements" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-serif text-5xl font-bold text-[#b68b5b]/30">20</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f3c44] tracking-tight">
                  Areas for Improvement: Balanced Observations
                </h2>
              </div>
              <div className="space-y-6 text-[#31464f] text-[17px] leading-[1.8] font-light">
                <p>
                  No resort is perfect, and to keep this review honest and helpful, I want to share a few minor observations that could enhance the guest experience:
                </p>
                <p>
                  First, during peak checkout hours on Sunday (around 11:00 AM), the lobby can get quite crowded, and there was a short queue at the front desk. Having an additional staff member handle checkouts during these peak weekend hours would make the process even smoother.
                </p>
                <p>
                  Second, while the indoor games room was well-equipped, the table tennis bats had worn-out rubber grips. Replacing these minor sports items regularly would match the premium standards of the rest of the property.
                </p>
                <p>
                  Finally, a few more directional signboards near the residential wings pointing towards the adventure activities zone would help guests navigate the large property more easily. These are minor suggestions for improvement on what was otherwise an outstanding experience.
                </p>
              </div>
            </article>

            {/* 21. NEARBY ATTRACTIONS (Interactive Grid layout) */}
            <article id="attractions" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-serif text-5xl font-bold text-[#b68b5b]/30">21</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f3c44] tracking-tight">
                  Exploring the Neighborhood: Nearby Attractions
                </h2>
              </div>
              <div className="space-y-6 text-[#31464f] text-[17px] leading-[1.8] font-light">
                <p>
                  While there is plenty to do inside UK&apos;s Resort, its location makes it a perfect base for exploring the local sights of Khopoli. Here are the top attractions located just a short drive away:
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {[
                  {
                    title: "Imagicaa Theme Park",
                    desc: "Located just 15 minutes away, this world-class theme and water park is a major attraction for families and thrill-seekers looking for an adventure day trip.",
                    image: "/imagica.png"
                  },
                  {
                    title: "Zenith & Paladarsi Waterfalls",
                    desc: "Famous monsoon hotspots where visitors can enjoy cascading water, scenic hikes, and beautiful nature photography. Located within a 20-minute drive.",
                    image: "/paladarsiwaterfall.png"
                  },
                  {
                    title: "Varad Vinayak Temple (Mahad)",
                    desc: "One of the famous Ashtavinayak temples, offering a peaceful spiritual retreat. Located about 25 minutes from the resort.",
                    image: "/Astavinayakmandir.png"
                  },
                  {
                    title: "Gagangiri Maharaj Ashram",
                    desc: "A serene spiritual ashram situated at the foothills of Sahyadri, surrounded by thick forests and flowing streams. Perfect for quiet meditation.",
                    image: "/gagangiri.png"
                  }
                ].map((attraction, i) => (
                  <div key={i} className="group overflow-hidden rounded-3xl border border-[#e8ddcf]/40 bg-white shadow-soft hover:shadow-card transition-all duration-300">
                    <div className="relative h-[200px] w-full overflow-hidden">
                      <Image
                        src={attraction.image}
                        alt={attraction.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 space-y-2">
                      <h4 className="font-serif font-bold text-lg text-[#1f3c44] group-hover:text-[#b68b5b] transition-colors">{attraction.title}</h4>
                      <p className="text-xs text-[#4f656d] leading-relaxed font-light">{attraction.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            {/* 22. PHOTOGRAPHY EXPERIENCE */}
            <article id="photography" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-serif text-5xl font-bold text-[#b68b5b]/30">22</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f3c44] tracking-tight">
                  Photography Guide: Capturing the Memories
                </h2>
              </div>
              <div className="space-y-6 text-[#31464f] text-[17px] leading-[1.8] font-light">
                <p>
                  For those who love posting on social media or capturing landscape memories, UK&apos;s Resort is a goldmine. The combination of green hills, landscaped gardens, and pool water provides beautiful backdrops.
                </p>
                <p>
                  The best time for nature photography is early morning (between 6:30 AM and 7:30 AM). The light is soft, the dew is still on the grass, and the fog hangs low over the mountaintops behind the resort. The central lawn offers a clear, uninterrupted view of the Sahyadri ranges.
                </p>
                <p>
                  For portraits or family group shots, the tropical pool deck under the tall palm trees at sunset offers a wonderful beach-vibe look. Another great spot is the garden pathway near the wooden arches, which gets beautifully illuminated by soft warm lights in the evening, creating a magical atmosphere.
                </p>
              </div>
            </article>

            {/* 23. VALUE FOR MONEY */}
            <article id="value" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-serif text-5xl font-bold text-[#b68b5b]/30">23</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f3c44] tracking-tight">
                  Value for Money: Cost vs. Experience
                </h2>
              </div>
              <div className="space-y-6 text-[#31464f] text-[17px] leading-[1.8] font-light">
                <p>
                  When assessing the value of a resort stay, I look at what is included in the base tariff. At UK&apos;s Resort, the pricing feels justified because of the comprehensive package it offers.
                </p>
                <p>
                  A standard room booking includes access to the large swimming pool, the kids&apos; play zone, the indoor/outdoor game facilities, and the daily rain dance event. The buffet meals are extensive, featuring multi-cuisine dishes that would cost a significant amount if ordered à la carte at other high-end properties.
                </p>
                <p>
                  The proximity of the resort to Mumbai and Pune also saves you a lot of fuel and toll expenses compared to driving to distant hill stations. When you factor in the quality of the service, the comfort of the rooms, and the variety of activities, the resort offers excellent value for a weekend getaway.
                </p>
              </div>
            </article>

            {/* 24. WHO SHOULD VISIT */}
            <article id="who-visit" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-serif text-5xl font-bold text-[#b68b5b]/30">24</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f3c44] tracking-tight">
                  Who Should Visit: Finding Your Fit
                </h2>
              </div>
              <div className="space-y-6 text-[#31464f] text-[17px] leading-[1.8] font-light">
                <p>UK&apos;s Resort is highly versatile, but it is especially suited for certain types of travelers:</p>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="font-serif font-semibold text-[#1f3c44] text-lg">👨‍👩‍👧‍👦 Families</h5>
                    <p className="text-sm leading-relaxed mt-1 text-[#4f656d]">
                      Perfect for parents looking to keep kids occupied with pools, slides, and games, while grandparents enjoy the quiet lawns and comfortable room access.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-serif font-semibold text-[#1f3c44] text-lg">👩‍❤️‍👨 Couples</h5>
                    <p className="text-sm leading-relaxed mt-1 text-[#4f656d]">
                      Ideal for couples looking for a quick drive out of the city to enjoy scenic balconies, quiet evening walks, and quality dining.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-serif font-semibold text-[#1f3c44] text-lg">👥 Friends</h5>
                    <p className="text-sm leading-relaxed mt-1 text-[#4f656d]">
                      Great for groups of friends planning a weekend of cricket, swimming, dancing in the rain, and exploring nearby adventure parks like Imagicaa.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-serif font-semibold text-[#1f3c44] text-lg">🏢 Corporate Groups</h5>
                    <p className="text-sm leading-relaxed mt-1 text-[#4f656d]">
                      An excellent venue for companies seeking team-building facilities, spacious conference rooms, and organized evening entertainment.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-serif font-semibold text-[#1f3c44] text-lg">🎒 School Outings</h5>
                    <p className="text-sm leading-relaxed mt-1 text-[#4f656d]">
                      A safe, enclosed property with plenty of activities and child safety measures, making it highly popular for educational picnics.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* 25. PROS AND CONS (Sleek Product Layout) */}
            <article id="pros-cons" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-serif text-5xl font-bold text-[#b68b5b]/30">25</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f3c44] tracking-tight">
                  Pros & Cons Summary
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="rounded-3xl bg-[#eff5f2] p-6 sm:p-8 border border-[#2f6b4f]/10 shadow-soft">
                  <h4 className="font-serif font-bold text-xl text-[#2f6b4f] flex items-center gap-2 mb-6">
                    <span className="w-8 h-8 rounded-full bg-[#2f6b4f]/10 text-[#2f6b4f] flex items-center justify-center text-sm">✓</span>
                    What We Loved (Pros)
                  </h4>
                  <ul className="space-y-4 text-[14px] text-[#31464f] font-light leading-relaxed">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#2f6b4f] text-lg">•</span>
                      Highly accessible location, under 2 hours from Mumbai/Pune.
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#2f6b4f] text-lg">•</span>
                      Spacious, neat rooms with modern amenities and fast Wi-Fi.
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#2f6b4f] text-lg">•</span>
                      Excellent food variety, particularly the local Maharashtrian dishes.
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#2f6b4f] text-lg">•</span>
                      High emphasis on pool safety with lifeguards and kids&apos; zones.
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#2f6b4f] text-lg">•</span>
                      Superb rain dance and recreation options keeping guests active.
                    </li>
                  </ul>
                </div>
                
                <div className="rounded-3xl bg-[#faf5f4] p-6 sm:p-8 border border-[#a34335]/10 shadow-soft">
                  <h4 className="font-serif font-bold text-xl text-[#a34335] flex items-center gap-2 mb-6">
                    <span className="w-8 h-8 rounded-full bg-[#a34335]/10 text-[#a34335] flex items-center justify-center text-sm">✗</span>
                    Areas for Improvement (Cons)
                  </h4>
                  <ul className="space-y-4 text-[14px] text-[#31464f] font-light leading-relaxed">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#a34335] text-lg">•</span>
                      Weekend check-out lines can get long during peak hours.
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#a34335] text-lg">•</span>
                      Table tennis equipment in the playroom could be upgraded.
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#a34335] text-lg">•</span>
                      A few more directional signposts needed on paths.
                    </li>
                  </ul>
                </div>
              </div>
            </article>

            {/* 26. FAQ SECTION (Filterable Search Accordion) */}
            <article id="faq" className="scroll-mt-28 space-y-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-5xl font-bold text-[#b68b5b]/30">26</span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f3c44] tracking-tight">
                    Frequently Asked Questions
                  </h2>
                </div>
                
                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                    value={faqSearch}
                    onChange={(e) => setFaqSearch(e.target.value)}
                    className="w-full text-xs py-2.5 pl-8 pr-4 rounded-full border border-[#e8ddcf] bg-white focus:outline-none focus:ring-2 focus:ring-[#c46a3a] transition-all"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#4f656d]">🔍</span>
                </div>
              </div>

              {/* Dynamic Search Results */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8ddcf]/40 shadow-soft space-y-4">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((item, idx) => (
                    <div key={idx} className="border-b border-[#e8ddcf]/40 pb-4 last:border-b-0 last:pb-0">
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full flex justify-between items-center text-left font-serif font-semibold text-base sm:text-lg py-3 text-[#1f3c44] hover:text-[#b68b5b] transition-colors duration-200"
                      >
                        <span>{item.q}</span>
                        <span className={`text-xl font-bold ml-4 transform transition-transform duration-300 ${openFaq === idx ? "rotate-90 text-[#c46a3a]" : "text-[#4f656d]"}`}>
                          {openFaq === idx ? "−" : "+"}
                        </span>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-350 ${
                          openFaq === idx ? "max-h-40 mt-2 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-sm leading-relaxed text-[#4f656d] font-light">{item.a}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-xs text-[#4f656d] py-6 font-light">No FAQs match your search query.</p>
                )}
              </div>
            </article>

            {/* 27. FINAL VERDICT (Premium Circular Dashboard Card) */}
            <article id="verdict" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-serif text-5xl font-bold text-[#b68b5b]/30">27</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f3c44] tracking-tight">
                  Final Verdict
                </h2>
              </div>
              
              <div className="rounded-3xl border-2 border-[#b68b5b]/30 bg-gradient-to-br from-[#1f3c44] to-[#12252a] text-white p-6 sm:p-10 shadow-card relative overflow-hidden">
                {/* Background decorative blur shapes */}
                <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[#b68b5b]/10 blur-2xl" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-[#c46a3a]/10 blur-2xl" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-white/10 pb-8 mb-8">
                  <div>
                    <h3 className="font-serif text-3xl font-bold text-white">UK&apos;s Resort Khopoli</h3>
                    <p className="text-sm text-[#e8ddcf] mt-1 font-light tracking-wide">A Premier Weekend Retreat in Maharashtra</p>
                  </div>
                  
                  {/* Premium circular rating metrics */}
                  <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-4 border border-white/10">
                    <div className="relative w-16 h-16 rounded-full flex items-center justify-center bg-white/5 border-4 border-[#b68b5b]">
                      <span className="font-serif text-xl font-bold text-white">4.7</span>
                    </div>
                    <div className="text-left space-y-1">
                      <div className="flex text-[#b68b5b] text-sm font-bold">★★★★★</div>
                      <p className="text-[10px] text-[#e8ddcf] font-bold uppercase tracking-widest">Out of 5 Stars</p>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-8">
                  {[
                    { label: "Location & Access", score: "4.9", width: "98%" },
                    { label: "Rooms & Comfort", score: "4.6", width: "92%" },
                    { label: "Food & Dining", score: "4.7", width: "94%" },
                    { label: "Activities & Safety", score: "4.8", width: "96%" },
                    { label: "Value for Money", score: "4.6", width: "92%" }
                  ].map((metric, i) => (
                    <div key={i} className="space-y-2">
                      <p className="text-xs text-[#e8ddcf] font-bold tracking-wider uppercase">{metric.label}</p>
                      <div className="flex items-end justify-between">
                        <span className="text-lg font-bold font-serif">{metric.score}</span>
                        <span className="text-[10px] text-white/50">/ 5</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#b68b5b] h-full rounded-full" style={{ width: metric.width }} />
                      </div>
                    </div>
                  ))}
                </div>

                <p className="relative z-10 text-base leading-relaxed text-[#e8ddcf] font-light mb-8 italic">
                  {"UK's Resort is an outstanding, highly-accessible destination that successfully combines family entertainment with serene Sahyadri views. Its spacious grounds, clean rooms, safety focus at the pool, and delicious local food make it one of the absolute best weekend getaway choices for families, couples, and corporate groups traveling from Mumbai and Pune."}
                </p>

                <div className="relative z-10 flex justify-center sm:justify-start">
                  <Link
                    href="https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true"
                    target="_blank"
                    className="group relative inline-flex items-center gap-2 px-8 py-4 bg-[#c46a3a] text-white text-xs font-bold tracking-widest uppercase rounded-2xl transition-all duration-300 hover:bg-[#b68b5b] hover:shadow-card transform active:scale-98"
                  >
                    Book Your Escape
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 transform group-hover:translate-x-1 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>

            {/* 28. CONCLUSION */}
            <article id="conclusion" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-serif text-5xl font-bold text-[#b68b5b]/30">28</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f3c44] tracking-tight">
                  Conclusion: Leaving a Piece of My Heart
                </h2>
              </div>
              <div className="space-y-6 text-[#31464f] text-[17px] leading-[1.8] font-light">
                <p>
                  As we packed our bags on Sunday afternoon, I took one last walk around the property. The rain had paused, leaving the leaves glistening with water droplets and the air feeling wonderfully cool. I looked back at the large pool deck where children were still splashing around, and the lawns where a group of friends were enjoying a game of badminton.
                </p>
                <p>
                  We checked out of the resort with a sense of calm and rejuvenation that we hadn&apos;t felt in weeks. The drive back to Mumbai was just as quick and pleasant, but our minds felt lighter. The simple joy of spending two days surrounded by hills, swimming in clean water, and eating delicious food in a hosted, warm environment had completely reset our energy levels.
                </p>
                <p>
                  UK&apos;s Resort Khopoli is not just a place to stay&mdash;it is a space where families connect, friends laugh, and city-dwellers remember what fresh air tastes like. It is an authentic, warm, and highly-refreshing escape, and I can say with confidence that it won&apos;t be long before we find ourselves packing our bags for another weekend trip back to this Sahyadri paradise.
                </p>
              </div>
            </article>

          </div>
        </div>
      </div>
    </section>
  );
}
