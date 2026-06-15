"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

/* ─── Section map for scroll-spy ─── */
const SECTIONS = [
  { id: "intro",            label: "Introduction" },
  { id: "planning",         label: "Planning" },
  { id: "journey",          label: "The Journey" },
  { id: "arrival",          label: "Arrival" },
  { id: "first-impressions",label: "First Impressions" },
  { id: "location",         label: "Location" },
  { id: "rooms",            label: "Rooms" },
  { id: "dining",           label: "Dining" },
  { id: "activities",       label: "Activities" },
  { id: "segments",         label: "For Every Guest" },
  { id: "monsoon",          label: "Monsoon" },
  { id: "hospitality",      label: "Hospitality" },
  { id: "cleanliness",      label: "Cleanliness" },
  { id: "loved",            label: "Top 10 Loved" },
  { id: "improvements",     label: "Suggestions" },
  { id: "attractions",      label: "Nearby" },
  { id: "photography",      label: "Photography" },
  { id: "value",            label: "Value" },
  { id: "who-visit",        label: "Who Should Visit" },
  { id: "pros-cons",        label: "Pros & Cons" },
  { id: "faq",              label: "FAQs" },
  { id: "verdict",          label: "Verdict" },
  { id: "conclusion",       label: "Conclusion" },
];

/* ─── Activity tabs ─── */
const ACTIVITY_TABS = [
  { id: "pool",    emoji: "🏊", label: "Swimming Pool" },
  { id: "rain",    emoji: "🌧️", label: "Rain Dance" },
  { id: "indoor",  emoji: "♟️", label: "Indoor Games" },
  { id: "outdoor", emoji: "🏏", label: "Outdoor Sports" },
];

/* ─── Rating metrics ─── */
const METRICS = [
  { label: "Location & Access", score: 4.9, pct: 98 },
  { label: "Rooms & Comfort",   score: 4.6, pct: 92 },
  { label: "Food & Dining",     score: 4.7, pct: 94 },
  { label: "Activities",        score: 4.8, pct: 96 },
  { label: "Value for Money",   score: 4.6, pct: 92 },
];

/* ─── FAQs ─── */
const FAQS = [
  { q: "Where is UK's Resort located and how do I reach it?",        a: "Located in Khopoli, Maharashtra — just 15 minutes from the Khopoli toll plaza on the Mumbai-Pune Expressway. GPS leads directly to the gate." },
  { q: "What are the check-in and check-out timings?",               a: "Check-in: 1:00 PM | Check-out: 11:00 AM. Early check-in or late check-out is subject to availability and may attract a nominal charge." },
  { q: "Are meals included in the tariff?",                          a: "The resort offers room-only and all-inclusive buffet packages. The buffet plan (breakfast, lunch, dinner) is highly recommended for great variety and value." },
  { q: "Is there a swimming pool? Are there kids' sections?",        a: "Yes — a large, crystal-clear pool with water slides. A dedicated shallow section is available for children, with a trained lifeguard on duty." },
  { q: "What activities are available?",                             a: "Rain dance, indoor games (table tennis, carrom, chess), outdoor sports (box cricket, volleyball, badminton), archery, and rifle shooting." },
  { q: "Is the resort suitable for senior citizens?",                a: "Absolutely. Wide flat pathways, minimal steps, and plenty of garden seating make navigation easy and comfortable for elderly guests." },
  { q: "Do they accommodate corporate groups?",                      a: "Yes — modern conference halls, AV systems, outdoor team-building lawns, and customized banquet options are all available." },
  { q: "What is the best season to visit?",                          a: "Year-round, but monsoon (June–September) is magical. The Sahyadri hills turn lush emerald and seasonal waterfalls cascade nearby." },
  { q: "Is Wi-Fi available?",                                        a: "Yes — complimentary high-speed Wi-Fi throughout rooms and common areas, reliable enough for remote work or streaming." },
  { q: "Is parking available?",                                      a: "Yes — a large, secure, well-organized parking lot is available free of charge for all guests." },
  { q: "Are vegetarian and Jain meals available?",                   a: "Yes — extensive vegetarian options in the buffet, and Jain meals can be arranged with prior notice to the kitchen." },
  { q: "Are there waterfalls nearby?",                               a: "Zenith Waterfall and Paladarsi Waterfall are within a 20-minute drive — perfect monsoon excursions." },
  { q: "Is Imagicaa Theme Park close?",                              a: "Yes — just 15 minutes away, making UK's Resort the ideal base for families planning a theme park day trip." },
  { q: "What safety measures are in place?",                         a: "24/7 security, CCTV in common areas, lifeguards at the pool, fire safety equipment, and trained first-aid staff on property." },
];

/* ─── Reveal hook (lightweight IntersectionObserver) ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement | HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Fade-up wrapper ─── */
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── Chapter heading ─── */
function ChapterHead({ num, title, light = false }: { num: string; title: string; light?: boolean }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`flex items-baseline gap-4 transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}
    >
      <span className={`font-serif text-5xl sm:text-6xl font-bold select-none ${light ? "text-white/15" : "text-[#b68b5b]/25"}`}>{num}</span>
      <h2 className={`font-serif text-2xl sm:text-3xl font-bold tracking-tight ${light ? "text-white" : "text-[#1f3c44]"}`}>{title}</h2>
    </div>
  );
}

/* ─── Pull-quote ─── */
function PullQuote({ text, light = false }: { text: string; light?: boolean }) {
  const { ref, visible } = useReveal(0.2);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <blockquote className={`border-l-4 pl-6 py-2 italic font-serif text-lg sm:text-xl leading-relaxed ${light ? "border-[#b68b5b] text-white/80" : "border-[#c46a3a] text-[#1f3c44]"}`}>
        &ldquo;{text}&rdquo;
      </blockquote>
    </div>
  );
}

/* ─── Body copy wrapper ─── */
function Body({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`space-y-5 text-[17px] leading-[1.85] font-light ${light ? "text-[#e8ddcf]" : "text-[#31464f]"}`}>
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════ */
export default function LongFormExperience() {
  const [activeSection, setActiveSection] = useState("intro");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [faqSearch, setFaqSearch] = useState("");
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("pool");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [animatedScores, setAnimatedScores] = useState<number[]>(METRICS.map(() => 0));
  const verdictRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  /* Reading progress + scroll-spy */
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) setReadingProgress((window.scrollY / total) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: 0 }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });
    return () => { window.removeEventListener("scroll", onScroll); observerRef.current?.disconnect(); };
  }, []);

  /* Animate verdict scores */
  useEffect(() => {
    const el = verdictRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          obs.disconnect();
          METRICS.forEach((m, i) => {
            const duration = 1200;
            const step = 20;
            let current = 0;
            const interval = setInterval(() => {
              current += step;
              setAnimatedScores((prev) => {
                const next = [...prev];
                next[i] = Math.min(m.pct, Math.round((current / duration) * m.pct));
                return next;
              });
              if (current >= duration) clearInterval(interval);
            }, step);
          });
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top: y, behavior: "smooth" });
    setActiveSection(id);
    setIsMobileMenuOpen(false);
  }, []);

  const filteredFaqs = useMemo(
    () => FAQS.filter((f) => f.q.toLowerCase().includes(faqSearch.toLowerCase()) || f.a.toLowerCase().includes(faqSearch.toLowerCase())),
    [faqSearch]
  );

  /* ─── RENDER ─── */
  return (
    <section className="relative bg-[#faf9f6] text-[#1f3c44] antialiased overflow-x-hidden">

      {/* ── Reading Progress Bar ── */}
      <div className="fixed top-0 left-0 z-[60] h-[3px] bg-gradient-to-r from-[#b68b5b] via-[#c46a3a] to-[#b68b5b] transition-all duration-75 ease-out shadow-[0_0_8px_rgba(196,106,58,0.6)]" style={{ width: `${readingProgress}%` }} />

      {/* ── Mobile TOC button ── */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#1f3c44] text-white shadow-2xl flex items-center justify-center hover:bg-[#b68b5b] transition-all duration-300"
        aria-label="Toggle Table of Contents"
      >
        {isMobileMenuOpen ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
        )}
      </button>

      {/* ── Mobile backdrop ── */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* ── Mobile drawer ── */}
      <div className={`lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-[#1f3c44] text-white p-6 shadow-2xl transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#b68b5b]">Chapters</span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-white/60 hover:text-white">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <nav className="space-y-1 overflow-y-auto max-h-[80vh] pr-2">
          {SECTIONS.map((s) => (
            <button key={s.id} onClick={() => scrollTo(s.id)}
              className={`w-full text-left text-sm py-2.5 px-4 rounded-xl transition-all ${activeSection === s.id ? "bg-[#b68b5b] text-white font-semibold" : "text-white/60 hover:text-white hover:bg-white/10"}`}>
              {s.label}
            </button>
          ))}
        </nav>
      </div>

      {/* ════ PAGE LAYOUT ════ */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12 xl:gap-16">

          {/* ── Sticky Sidebar ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 max-h-[82vh] overflow-y-auto rounded-3xl bg-white border border-[#e8ddcf]/60 shadow-[0_8px_40px_rgba(31,60,68,0.08)] p-6 scrollbar-thin scrollbar-thumb-[#e8ddcf]">
              <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-[#b68b5b] mb-1">Travelogue</span>
              <h4 className="font-serif text-xl font-bold text-[#1f3c44] mb-6">Chapters</h4>
              <nav className="relative space-y-0.5">
                <div className="absolute left-[9px] top-2 bottom-2 w-px bg-[#e8ddcf]" />
                {SECTIONS.map((s) => (
                  <button key={s.id} onClick={() => scrollTo(s.id)}
                    className={`w-full text-left text-[13px] py-2 pl-6 pr-2 rounded-lg relative transition-all duration-200 ${activeSection === s.id ? "text-[#c46a3a] font-semibold" : "text-[#4f656d] hover:text-[#1f3c44]"}`}>
                    <span className={`absolute left-1.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border-2 border-white transition-all ${activeSection === s.id ? "bg-[#c46a3a] shadow-[0_0_0_3px_rgba(196,106,58,0.2)]" : "bg-[#e8ddcf]"}`} />
                    {s.label}
                  </button>
                ))}
              </nav>
              <div className="mt-6 pt-6 border-t border-[#e8ddcf]">
                <Link href="https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true" target="_blank"
                  className="group flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-[#1f3c44] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#c46a3a] transition-all duration-300">
                  Book Your Stay
                  <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                </Link>
              </div>
            </div>
          </aside>

          {/* ════ MAIN ARTICLE ════ */}
          <div className="min-w-0 space-y-28">

            {/* ══ HERO BLOCK ══ */}
            <FadeUp>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#b68b5b]/10 border border-[#b68b5b]/20">
                  <span className="w-2 h-2 rounded-full bg-[#b68b5b] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#b68b5b]">Immersive Experience Journal</span>
                </div>
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] text-[#1f3c44] tracking-tight">
                  My Weekend at UK&apos;s Resort, Khopoli:{" "}
                  <em className="font-normal text-[#b68b5b]">Where the Sahyadri Exhales</em>
                </h1>
                <p className="text-lg md:text-xl text-[#4f656d] font-light leading-relaxed max-w-2xl">
                  A complete first-hand journal — rooms, rainfall, rain dance, food, family fun, and every feeling in between — from Mumbai&apos;s doorstep resort.
                </p>
                {/* Quick stats strip */}
                <div className="flex flex-wrap gap-4 pt-2">
                  {[["85,000 sq ft","Resort Area"],["90 km","From Mumbai"],["4.7★","Guest Rating"],["28+","Activities"]].map(([v, l]) => (
                    <div key={l} className="flex flex-col bg-white border border-[#e8ddcf]/70 rounded-2xl px-5 py-3 shadow-sm">
                      <span className="font-serif text-xl font-bold text-[#1f3c44]">{v}</span>
                      <span className="text-[11px] font-medium uppercase tracking-widest text-[#b68b5b] mt-0.5">{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* ══ CINEMATIC HERO IMAGE ══ */}
            <FadeUp delay={100}>
              <div className="relative h-[340px] sm:h-[520px] w-full rounded-[2rem] overflow-hidden shadow-[0_24px_80px_rgba(31,60,68,0.2)] group">
                <Image src="/picnic.avif" alt="UK's Resort Khopoli — lush green oasis near Mumbai and Pune" fill priority className="object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <p className="font-serif text-xl sm:text-2xl italic leading-snug max-w-xl">&ldquo;Finding pockets of peace and ripples of laughter at the base of the Sahyadri ranges.&rdquo;</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-8 h-px bg-[#b68b5b]" />
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#b68b5b]">UK&apos;s Resort, Khopoli, Maharashtra</span>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* ══ 01. INTRODUCTION ══ */}
            <article id="intro" className="scroll-mt-28 space-y-8">
              <ChapterHead num="01" title="Escaping the Concrete Jungle" />
              <Body>
                <p className="first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:text-[#c46a3a] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                  The incessant buzz of notifications, the mechanical hum of traffic, and the grey monotony of city walls&mdash;living in Mumbai or Pune can sometimes feel like running on a treadmill that never stops. As someone who thrives on travel, I realized I desperately needed a reset. I didn&apos;t want distant lands or complex itineraries. What I craved was a quick, spontaneous road trip to a place where the air felt clean, the hills glowed green, and my mind could simply breathe. That&apos;s how I discovered <strong>UK&apos;s Resort Khopoli</strong>.
                </p>
                <p>
                  Khopoli has quietly transformed from a transit point on the Mumbai-Pune Expressway into a genuine holiday destination. Blessed with cascading waterfalls, the Western Ghats as a backdrop, and some of Maharashtra&apos;s richest biodiversity, it sits in a perfect green buffer zone between the state&apos;s two great cities.
                </p>
                <p>
                  Before setting out, one question lingered: can a single resort truly satisfy a nature lover, a foodie, a leisure traveler, and an adventure enthusiast all at once? UK&apos;s Resort positions itself as doing exactly that. My curiosity was officially activated.
                </p>
              </Body>
            </article>

            {/* ══ 02. PLANNING ══ */}
            <article id="planning" className="scroll-mt-28 space-y-8">
              <ChapterHead num="02" title="Planning the Trip & Research" />
              <Body>
                <p>
                  Our planning started on a quiet Tuesday evening. My spouse wanted a large swimming pool to escape the humidity. My siblings wanted outdoor games and adventure options. My elderly parents needed a peaceful setting, good food, and minimal walking to reach the dining area. A tall order for one resort — or so I thought.
                </p>
                <p>
                  Searching for <strong>resorts near Mumbai</strong> and <strong>weekend getaway near Pune</strong>, UK&apos;s Resort consistently appeared at the top of reviews. Dozens of blogs and booking platforms praised its hospitality, its delicious buffet spreads, and excellent kids&apos; play zones. A colleague who had hosted a corporate retreat there described the coordination as &ldquo;flawless.&rdquo; That sealed it.
                </p>
                <p>
                  The booking process was surprisingly smooth. We opted for two Deluxe Rooms, pricing felt competitive given the amenity scope, and confirmation arrived instantly. With high expectations set, I clicked confirm.
                </p>
              </Body>
            </article>

            {/* ══ 03. JOURNEY — Road Trip Card ══ */}
            <article id="journey" className="scroll-mt-28 space-y-8">
              <ChapterHead num="03" title="The Journey: Cruising Along the Expressway" />
              <FadeUp>
                <div className="rounded-3xl overflow-hidden border border-[#e8ddcf]/50 bg-white shadow-[0_8px_40px_rgba(31,60,68,0.08)] grid grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-3 p-8 space-y-4">
                    <Body>
                      <p>
                        We left Mumbai at 7:30 AM, crossing the Vashi bridge and onto the Expressway. The drive transformed immediately — buildings gave way to rolling hills beginning to shimmer in the early monsoon green. Tiny seasonal waterfalls trickled down rock faces as we gained elevation.
                      </p>
                      <p>
                        Reaching the resort was effortless. GPS took us directly to the gate: 15 minutes off the Khopoli toll exit, through scenic local roads. Under two hours total — yet it felt like we&apos;d crossed into a completely different world.
                      </p>
                    </Body>
                  </div>
                  <div className="md:col-span-2 bg-[#1f3c44] text-white p-8 flex flex-col justify-between">
                    <div className="space-y-6">
                      <h5 className="font-serif text-lg font-bold flex items-center gap-2">🚗 Route Card</h5>
                      <div className="space-y-4 text-sm text-[#e8ddcf]">
                        <div>
                          <p className="font-bold text-white text-xs uppercase tracking-wider mb-1">From Mumbai</p>
                          <p>Expressway → Khopoli Toll Exit → 15 min local road <span className="text-[#b68b5b] font-semibold">(≈ 85 km, 1.5–2 hrs)</span></p>
                        </div>
                        <div>
                          <p className="font-bold text-white text-xs uppercase tracking-wider mb-1">From Pune</p>
                          <p>Expressway → Khalapur Toll → Khopoli <span className="text-[#b68b5b] font-semibold">(≈ 80 km, 1.5 hrs)</span></p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#b68b5b]">Pro Tip</span>
                      <p className="text-xs text-white/70 mt-1">Cross Kalamboli junction before 8 AM to avoid ghat blocks and weekend expressway queues.</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            </article>

            {/* ══ 04. ARRIVAL ══ */}
            <article id="arrival" className="scroll-mt-28 space-y-8">
              <ChapterHead num="04" title="Arrival: A Warm Sahyadri Welcome" />
              <Body>
                <p>
                  As our car rolled up to UK&apos;s Resort, a grand gateway framed by lush tropical plants greeted us. The watchman smiled, verified our booking, and guided us to a spacious, well-organized parking lot — no chaotic double-parking, a small but reassuring detail.
                </p>
                <p>
                  The reception lobby was open, airy, and high-ceilinged, letting the gentle breeze flow freely. Warm wooden accents met contemporary cleanliness. As we settled into the lounge, staff offered a chilled <strong>kokum sherbet</strong> welcome drink. That cool, sweet sip after two hours on the road was perfection.
                </p>
                <p>
                  Check-in took under 10 minutes. The front desk briefed us on the property layout, meal timings, and activity zones. A bellboy then guided us to our rooms. That smooth, professional welcome set a wonderful tone for the entire stay.
                </p>
              </Body>
            </article>

            {/* ══ 05. FIRST IMPRESSIONS ══ */}
            <article id="first-impressions" className="scroll-mt-28 space-y-8">
              <ChapterHead num="05" title="First Impressions: Discovering the Layout" />
              <PullQuote text="The property is designed with wide lawns, clean asphalt pathways, and neat brick borders — it felt like a self-contained oasis." />
              <Body>
                <p>
                  Walking through the manicured pathways, I was struck by the scale and cleanliness. The air had that rich earthy scent of damp soil and fresh vegetation. The layout separates quiet residential wings from high-energy zones — the swimming pool, water slides, and indoor recreation — ensuring guests who wish to sleep in are never disturbed.
                </p>
                <p>
                  Security presence was visible at key junctions. Lifeguards monitored water areas. Clear signboards directed guests to facilities. My initial reaction: this is a professionally managed, high-end destination that takes safety and comfort seriously.
                </p>
              </Body>
            </article>

            {/* ══ 06. LOCATION — with cinematic image ══ */}
            <article id="location" className="scroll-mt-28 space-y-8">
              <ChapterHead num="06" title="Location & Natural Surroundings" />
              <Body>
                <p>
                  UK&apos;s Resort sits in a geographic sweet spot — close enough to the highway to be easily accessible, yet tucked away from the noise. The backdrop is dominated by the majestic Western Ghats, which rise like green giants in the distance.
                </p>
                <p>
                  During morning walks, wisps of white mist clung to the mountaintops, and the fresh breeze rustled through dense foliage. Mature trees line the perimeter, providing shade, while beds of seasonal flowers attract butterflies and small birds. Standing on the lawn, breathing the crisp mountain air, it was hard to believe we were just 90 km from Mumbai.
                </p>
              </Body>
              <FadeUp>
                <div className="relative h-[300px] sm:h-[440px] w-full rounded-[2rem] overflow-hidden shadow-[0_16px_60px_rgba(31,60,68,0.18)] group">
                  <Image src="/Zenhills.png" alt="Sahyadri hills near UK's Resort Khopoli" fill className="object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <p className="absolute bottom-6 left-8 right-8 text-white font-serif text-lg italic leading-snug">
                    &ldquo;The majestic Western Sahyadris towering behind the resort grounds — a view I won&apos;t forget.&rdquo;
                  </p>
                </div>
              </FadeUp>
            </article>

            {/* ══ 07. ROOMS — spec card ══ */}
            <article id="rooms" className="scroll-mt-28 space-y-8">
              <ChapterHead num="07" title="Room Experience: A Haven of Comfort" />
              <FadeUp>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-[#e8ddcf]/50 shadow-[0_8px_40px_rgba(31,60,68,0.1)] bg-white">
                  <div className="relative h-[280px] md:h-auto min-h-[280px]">
                    <Image src="/slider2.jpg" alt="Premium Deluxe Room at UK's Resort Khopoli" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
                  </div>
                  <div className="p-8 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#b68b5b]">Deluxe Room</span>
                      <h4 className="font-serif text-2xl font-bold text-[#1f3c44] mt-2 mb-4">Cozy Modern Living</h4>
                      <p className="text-sm text-[#4f656d] leading-relaxed font-light">
                        Spacious tiled floors, neutral calming palette, and a large king-sized bed flanked by elegant reading lamps. The linens were crisp and smelled fresh — my ultimate test of any resort&apos;s maintenance standards.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-6 border-t border-[#e8ddcf] mt-6">
                      {[["🛏️","King Bed"],["📶","High-Speed Wi-Fi"],["❄️","Quiet AC"],["🚿","Instant Hot Water"],["☕","Tea / Coffee"],["🌅","Private Balcony"]].map(([icon, l]) => (
                        <div key={l} className="flex items-center gap-2 text-xs font-semibold text-[#1f3c44]">
                          <span className="w-7 h-7 bg-[#f7f3ee] rounded-full flex items-center justify-center text-sm shadow-sm">{icon}</span>
                          {l}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeUp>
              <Body>
                <p>
                  The room design was both functional and modern — a plush sofa, study desk, flat-screen TV, and well-stocked tea/coffee station. The AC was powerful and remarkably silent. Wi-Fi was strong and stable throughout our stay, a pleasant surprise given the mountain location.
                </p>
                <p>
                  The bathroom was spotless: modern fittings, fresh towels, premium toiletries, and instant hot water after outdoor excursions. Outside, the private balcony offered a quiet perch with a cup of evening tea, watching rain paint the landscape and mist curl over the Sahyadri peaks.
                </p>
              </Body>
            </article>

            {/* ══ 08. DINING — dark cinematic card ══ */}
            <article id="dining" className="scroll-mt-28 space-y-8">
              <ChapterHead num="08" title="Food & Dining: A Culinary Celebration" />
              <Body>
                <p>Any vacation is incomplete without great food — and this is where UK&apos;s Resort <em>truly shines</em>. The spacious multi-cuisine restaurant serves elaborate buffets that effortlessly cater to every taste: Indian, Chinese, Continental, and deeply authentic Maharashtrian dishes.</p>
              </Body>
              <FadeUp>
                <div className="rounded-3xl overflow-hidden bg-[#1f3c44] text-white grid grid-cols-1 md:grid-cols-2 shadow-[0_16px_60px_rgba(31,60,68,0.25)]">
                  <div className="relative h-[260px] md:h-full min-h-[260px]">
                    <Image src="/dining.png" alt="Buffet dining at UK's Resort Khopoli" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1f3c44]/50 to-transparent md:bg-gradient-to-t md:from-transparent" />
                  </div>
                  <div className="p-8 space-y-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#b68b5b]">Buffet Highlights</span>
                    <h4 className="font-serif text-2xl font-bold">Authentic Flavors, Generous Spreads</h4>
                    <div className="space-y-3 text-sm text-[#e8ddcf] font-light">
                      {[
                        ["🫓","Live Dosas & Omelets","Fresh at breakfast stations, made to order."],
                        ["🌶️","Spicy Misal Pav","Local favourite with perfect spice and fresh garnish."],
                        ["🍗","Maharashtrian Chicken","Coconut-rich gravy, cooked to perfection."],
                        ["🍮","Warm Gulab Jamuns","Soft, warm, divine — served fresh every evening."],
                      ].map(([emoji, title, desc]) => (
                        <div key={title} className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
                          <span className="text-xl">{emoji}</span>
                          <div>
                            <p className="font-semibold text-white text-xs">{title}</p>
                            <p className="text-[#e8ddcf]/70 text-xs mt-0.5">{desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeUp>
              <Body>
                <p>
                  For breakfast, the live station turned out piping hot, crispy dosas and fluffy omelets, alongside poha, idli, puri bhaji, and fresh fruit. The Maharashtrian Misal Pav was a revelation — perfectly spiced, served with hot pav.
                </p>
                <p>
                  Lunch and dinner were elaborate affairs. Salads were fresh, curries rich without being heavy, and the gulab jamun dessert had my parents going back twice. Restaurant staff were attentive, clearing plates swiftly and replenishing buffet items without any wait. The dining atmosphere was warm, lively, and deeply satisfying.
                </p>
              </Body>
            </article>

            {/* ══ 09–12. ACTIVITIES DASHBOARD ══ */}
            <article id="activities" className="scroll-mt-28 space-y-8">
              <ChapterHead num="09–12" title="Activities Dashboard" />
              {/* Tab Switcher */}
              <div className="flex flex-wrap gap-2">
                {ACTIVITY_TABS.map((t) => (
                  <button key={t.id} onClick={() => setActiveTab(t.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === t.id ? "bg-[#1f3c44] text-white shadow-lg" : "bg-white border border-[#e8ddcf] text-[#4f656d] hover:border-[#1f3c44] hover:text-[#1f3c44]"}`}>
                    <span>{t.emoji}</span> {t.label}
                  </button>
                ))}
              </div>

              {/* Tab Panels */}
              <div className="rounded-3xl border border-[#e8ddcf]/50 bg-white shadow-[0_8px_40px_rgba(31,60,68,0.08)] overflow-hidden">

                {activeTab === "pool" && (
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative h-[300px] md:h-auto min-h-[300px]">
                      <Image src="/picnic.avif" alt="Swimming Pool at UK's Resort" fill className="object-cover" />
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-white font-semibold">🛟 Lifeguard on duty</div>
                    </div>
                    <div className="p-8 space-y-4">
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#b68b5b]">Water Excursions</span>
                      <h3 className="font-serif text-2xl font-bold text-[#1f3c44]">The Blue Heart of the Resort</h3>
                      <Body>
                        <p>A large, crystal-clear pool with slides and a dedicated shallow kids&apos; section. The pool deck is lined with sun loungers and tall palms, giving it a tropical feel. Adults can swim laps or float while gazing at the cloudy Sahyadri sky above.</p>
                        <p>Pool safety is a priority — trained lifeguards are on duty throughout opening hours. One of the finest <strong>resorts with a swimming pool near Mumbai</strong>.</p>
                      </Body>
                    </div>
                  </div>
                )}

                {activeTab === "rain" && (
                  <div className="p-8 space-y-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#b68b5b]">Monsoon Music</span>
                    <h3 className="font-serif text-2xl font-bold text-[#1f3c44]">Rain Dance: Rhythm & Rainfall</h3>
                    <PullQuote text="Bollywood beats combined with cool overhead sprays — the most joyful afternoon of the entire trip." />
                    <Body>
                      <p>The rain dance arena is scheduled every afternoon and is an absolute must. Overhead sprinklers mimic a monsoon downpour while the DJ plays popular Bollywood and international tracks. Kids, parents, grandparents — everyone joins in.</p>
                      <p>It gave us a chance to let go of every inhibition, laugh like children, and enjoy water in a fun, safe, social setting. The best <strong>rain dance resort near Pune or Mumbai</strong> — by far.</p>
                    </Body>
                  </div>
                )}

                {activeTab === "indoor" && (
                  <div className="p-8 space-y-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#b68b5b]">Indoor Entertainment</span>
                    <h3 className="font-serif text-2xl font-bold text-[#1f3c44]">Indoor Zone: Leisure in the Recreation Hall</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[["🏓","Table Tennis","Fast-paced action"],["🎯","Carrom","Traditional play"],["♟️","Chess","Intellectual duel"],["🎲","Board Games","Fun for all ages"]].map(([e,t,d]) => (
                        <div key={t} className="bg-[#faf9f6] rounded-2xl p-4 border border-[#e8ddcf]/40 text-center space-y-1">
                          <span className="text-2xl block">{e}</span>
                          <p className="font-serif font-bold text-sm text-[#1f3c44]">{t}</p>
                          <p className="text-[11px] text-[#4f656d]">{d}</p>
                        </div>
                      ))}
                    </div>
                    <Body>
                      <p>When heavy rains temporarily paused outdoor plans, the indoor recreation centre kept us thoroughly entertained. Multiple carrom boards, chess tables, and a table tennis table in excellent condition. Equipment was well-maintained — boards powdered, bats in shape, pieces complete.</p>
                    </Body>
                  </div>
                )}

                {activeTab === "outdoor" && (
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative h-[280px] md:h-auto min-h-[280px]">
                      <Image src="/sports1.avif" alt="Outdoor sports at UK's Resort" fill className="object-cover" />
                    </div>
                    <div className="p-8 space-y-4">
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#b68b5b]">Adventure Sports</span>
                      <h3 className="font-serif text-2xl font-bold text-[#1f3c44]">Outdoor Activities: Adventure on the Grounds</h3>
                      <Body>
                        <p>Box cricket, volleyball, badminton — all played on a large, flat grassy lawn where you never feel like you&apos;re encroaching on another group. Specialized zones for archery and rifle shooting under trained coordinators round out the adventure offering.</p>
                        <p>The fresh mountain air and generous space make outdoor activities especially memorable here.</p>
                      </Body>
                    </div>
                  </div>
                )}
              </div>
            </article>

            {/* ══ 13–15. GUEST SEGMENTS ══ */}
            <article id="segments" className="scroll-mt-28 space-y-8">
              <ChapterHead num="13–15" title="Curated Experiences for Every Guest" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { emoji:"👨‍👩‍👧‍👦", id:"families", title:"For Families", body:"UK's Resort excels at keeping every generation happy simultaneously. Kids&apos; play zones with slides and climbing frames on soft surfaces. Water slides under lifeguard supervision. Grandparents can enjoy quiet garden walks while younger family members splash in the pool.", hl:"Dedicated play zones & pool safety" },
                  { emoji:"👩‍❤️‍👨", id:"couples", title:"For Couples", body:"Landscaped gardens with hidden alcoves, perimeter pathways perfect for evening strolls, and private balconies looking out over misty Sahyadri hills. Rain falling on monsoon leaves, the faint lights of Khopoli town twinkling through the fog — quietly magical.", hl:"Scenic balconies & garden walks" },
                  { emoji:"💼", id:"corporate", title:"Corporate Outings", body:"Modern conference halls with high-end AV systems. Outdoor team-building lawns set up with mic systems, water stations, and organized games led by event coordinators. Resort staff executed a corporate retreat for a Pune software company flawlessly during our stay.", hl:"Conference rooms & banquet lawns" },
                ].map((c) => (
                  <FadeUp key={c.id}>
                    <div id={c.id} className="group h-full flex flex-col justify-between bg-white rounded-3xl p-7 border border-[#e8ddcf]/50 shadow-[0_4px_24px_rgba(31,60,68,0.06)] hover:shadow-[0_12px_48px_rgba(31,60,68,0.14)] hover:-translate-y-1 transition-all duration-300">
                      <div className="space-y-4">
                        <span className="text-3xl">{c.emoji}</span>
                        <h4 className="font-serif text-xl font-bold text-[#1f3c44] group-hover:text-[#b68b5b] transition-colors">{c.title}</h4>
                        <p className="text-[13px] text-[#4f656d] leading-relaxed font-light">{c.body}</p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-[#e8ddcf]">
                        <p className="text-[11px] font-bold text-[#1f3c44] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#b68b5b] inline-block" />
                          {c.hl}
                        </p>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </article>

            {/* ══ 16. MONSOON — dark atmospheric section ══ */}
            <article id="monsoon" className="scroll-mt-28 space-y-0">
              <FadeUp>
                <div className="rounded-3xl overflow-hidden bg-[#12252a] text-white relative">
                  <div className="relative h-[280px] sm:h-[360px] w-full">
                    <Image src="/Zenhills.png" alt="Monsoon at UK's Resort Khopoli" fill className="object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#12252a]/20 via-transparent to-[#12252a]" />
                  </div>
                  <div className="px-8 pb-10 pt-0 -mt-16 relative z-10 space-y-6">
                    <ChapterHead num="16" title="Monsoon Magic: Sahyadri in Full Bloom" light />
                    <Body light>
                      <p>While UK&apos;s Resort is a year-round destination, there is something genuinely magical about visiting during the monsoons. The rainy season transforms the entire region into a lush tropical paradise.</p>
                      <p>During our stay, heavy showers came and went. Instead of ruining plans, the rain enhanced the property&apos;s beauty — leaves freshly washed, lawns a vibrant deep green, air filled with petrichor, surrounding Sahyadri hills cloaked in thick white fog.</p>
                    </Body>
                    <PullQuote light text="Sitting on the veranda with hot crispy onion pakoras and ginger tea while watching the rain fall — words can barely do it justice." />
                  </div>
                </div>
              </FadeUp>
            </article>

            {/* ══ 17. HOSPITALITY ══ */}
            <article id="hospitality" className="scroll-mt-28 space-y-8">
              <ChapterHead num="17" title="Staff & Hospitality: Warmth in Every Detail" />
              <PullQuote text="A resort can have the best facilities in the world, but it is the staff that truly makes a stay memorable." />
              <Body>
                <p>
                  Hospitality at UK&apos;s Resort was exceptional. From check-in to check-out, every staff member was polite, professional, and genuinely eager to help. A standout moment: my elderly father needed low-sodium food. When I mentioned this to the restaurant manager, he consulted the chef immediately. The chef prepared a custom low-sodium dish and personally brought it to our table to confirm it was to his liking.
                </p>
                <p>
                  Housekeeping responded quickly to requests for extra towels or coffee sachets. Activity coordinators patiently helped my younger cousins set up the archery station. This warm, attentive service made us feel genuinely valued throughout.
                </p>
              </Body>
            </article>

            {/* ══ 18. CLEANLINESS ══ */}
            <article id="cleanliness" className="scroll-mt-28 space-y-8">
              <ChapterHead num="18" title="Cleanliness & Maintenance: Pristine & Polished" />
              <Body>
                <p>
                  Maintaining a resort in high-humidity Khopoli is a real challenge, but UK&apos;s Resort is kept in pristine condition. Common areas, lobbies, and corridors are swept and mopped multiple times daily. The swimming pool is cleaned every morning with water quality monitored regularly.
                </p>
                <p>
                  Gardens and lawns are neatly trimmed with no sign of litter anywhere. Inside the rooms, the cleanliness was spotless — tile joints clean, mirrors streak-free, balcony dust-free despite surrounding trees. The resort&apos;s commitment to hygiene was evident in every corner.
                </p>
              </Body>
            </article>

            {/* ══ 19. TOP 10 LOVED ══ */}
            <article id="loved" className="scroll-mt-28 space-y-8">
              <ChapterHead num="19" title="Top 10 Things I Loved About My Stay" />
              <FadeUp>
                <div className="rounded-3xl bg-white border border-[#e8ddcf]/50 shadow-[0_8px_40px_rgba(31,60,68,0.08)] divide-y divide-[#e8ddcf]/40">
                  {[
                    "Scenic Drive — Under 2 hours on a smooth, beautiful Expressway from Mumbai",
                    "Kokum Sherbet Welcome — A perfect chilled greeting after the road trip",
                    "Spacious Deluxe Rooms — Large rooms, crisp linens, comfortable king-sized beds",
                    "Private Balcony Views — Low clouds rolling over the Sahyadri from our room window",
                    "Misal Pav at Breakfast — Perfectly spiced, authentic Maharashtrian morning glory",
                    "High-Energy Rain Dance — Bollywood beats, cool sprays, pure unbridled joy",
                    "Attentive Pool Lifeguards — Reassurance throughout every swim session",
                    "Personalized Chef Service — Custom low-sodium meal prepared for my father",
                    "Lush, Litter-Free Gardens — Pristine green lawns lined with mature shade trees",
                    "Archery & Rifle Shooting — Trained coordinators making first-timers feel confident",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-5 p-5 group hover:bg-[#faf9f6] transition-colors">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#b68b5b]/10 text-[#b68b5b] font-bold text-xs flex items-center justify-center group-hover:bg-[#b68b5b] group-hover:text-white transition-all duration-300">{i + 1}</span>
                      <span className="text-[15px] text-[#31464f] font-light leading-relaxed pt-1">{item}</span>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </article>

            {/* ══ 20. SUGGESTIONS ══ */}
            <article id="improvements" className="scroll-mt-28 space-y-8">
              <ChapterHead num="20" title="Honest Suggestions: Balanced Observations" />
              <FadeUp>
                <div className="rounded-3xl bg-[#fff8f5] border border-[#c46a3a]/15 p-8 space-y-4">
                  {[
                    ["Extra check-out staff on weekends","The lobby saw a short queue at 11 AM Sunday — an additional front desk agent during peak hours would smooth the process."],
                    ["Upgrade indoor sports equipment","The table tennis bat grips showed wear. Replacing minor sports items periodically would match the rest of the resort's premium standards."],
                    ["More directional signboards","A few additional signs near residential wings pointing to the adventure zone would help guests navigate the large property more easily."],
                  ].map(([t, d]) => (
                    <div key={t} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#e8ddcf]/40">
                      <span className="text-[#c46a3a] text-xl mt-0.5">→</span>
                      <div>
                        <p className="font-serif font-bold text-sm text-[#1f3c44]">{t}</p>
                        <p className="text-[13px] text-[#4f656d] font-light mt-1">{d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </article>

            {/* ══ 21. NEARBY ATTRACTIONS ══ */}
            <article id="attractions" className="scroll-mt-28 space-y-8">
              <ChapterHead num="21" title="Exploring the Neighbourhood: Nearby Attractions" />
              <Body><p>UK&apos;s Resort&apos;s location makes it a perfect base for day trips. Here are the must-visit spots just a short drive away:</p></Body>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { title:"Imagicaa Theme Park",    desc:"World-class theme & water park just 15 minutes away — ideal for families wanting an adventure day trip.",           img:"/imagica.png" },
                  { title:"Zenith & Paladarsi Waterfalls", desc:"Famous monsoon hotspots with cascading water, scenic hikes, and stunning photography. 20 minutes away.", img:"/paladarsiwaterfall.png" },
                  { title:"Varad Vinayak Temple",   desc:"One of the Ashtavinayak temples — a serene spiritual retreat 25 minutes from the resort.",                        img:"/Astavinayakmandir.png" },
                  { title:"Gagangiri Ashram",        desc:"A peaceful spiritual ashram amid forests and streams at the Sahyadri foothills — perfect for quiet meditation.",   img:"/gagangiri.png" },
                ].map((a) => (
                  <FadeUp key={a.title}>
                    <div className="group overflow-hidden rounded-3xl border border-[#e8ddcf]/50 bg-white shadow-[0_4px_24px_rgba(31,60,68,0.07)] hover:shadow-[0_12px_48px_rgba(31,60,68,0.14)] transition-all duration-300">
                      <div className="relative h-[200px] overflow-hidden">
                        <Image src={a.img} alt={a.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      </div>
                      <div className="p-6">
                        <h4 className="font-serif font-bold text-lg text-[#1f3c44] group-hover:text-[#b68b5b] transition-colors">{a.title}</h4>
                        <p className="text-[13px] text-[#4f656d] leading-relaxed font-light mt-2">{a.desc}</p>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </article>

            {/* ══ 22. PHOTOGRAPHY ══ */}
            <article id="photography" className="scroll-mt-28 space-y-8">
              <ChapterHead num="22" title="Photography Guide: Capturing the Memories" />
              <Body>
                <p>For those who love posting on social media or capturing landscape memories, UK&apos;s Resort is a goldmine. Green hills, landscaped gardens, and clear pool water create beautiful natural backdrops every hour of the day.</p>
              </Body>
              <FadeUp>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { time:"6:30 – 7:30 AM", title:"Golden Hour Nature", desc:"Soft light, dew on grass, fog over the mountaintops. The central lawn offers a clear view of the Sahyadri ranges." },
                    { time:"Afternoon Pool Deck", title:"Tropical Portraits", desc:"Tall palms and pool water create a beach-resort vibe perfect for group or couple shots." },
                    { time:"Evening Garden Path", title:"Warm Bokeh Light", desc:"Wooden arches illuminated by warm evening lights — magical, almost cinematic atmosphere." },
                  ].map((p) => (
                    <div key={p.title} className="bg-white rounded-2xl p-6 border border-[#e8ddcf]/50 shadow-sm space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b68b5b]">{p.time}</span>
                      <h5 className="font-serif font-bold text-lg text-[#1f3c44]">{p.title}</h5>
                      <p className="text-[13px] text-[#4f656d] font-light leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </article>

            {/* ══ 23. VALUE ══ */}
            <article id="value" className="scroll-mt-28 space-y-8">
              <ChapterHead num="23" title="Value for Money: Cost vs. Experience" />
              <Body>
                <p>A standard room booking includes access to the large swimming pool, kids&apos; play zone, indoor and outdoor game facilities, and the daily rain dance event. Buffet meals — featuring multi-cuisine dishes — are extensive in both variety and quality.</p>
                <p>The proximity to Mumbai and Pune saves significant fuel and toll expenses compared to distant hill stations. When you factor in room comfort, activity variety, and the quality of service, UK&apos;s Resort offers genuinely outstanding value for a weekend getaway.</p>
              </Body>
              <FadeUp>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[["🏊","Pool Access","Included"],["🎮","All Activities","Included"],["🌧️","Rain Dance","Daily"],["🅿️","Parking","Free"]].map(([e, t, v]) => (
                    <div key={t} className="bg-[#1f3c44] rounded-2xl p-5 text-center text-white space-y-2">
                      <span className="text-2xl block">{e}</span>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#b68b5b]">{t}</p>
                      <p className="text-sm font-semibold">{v}</p>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </article>

            {/* ══ 24. WHO SHOULD VISIT ══ */}
            <article id="who-visit" className="scroll-mt-28 space-y-8">
              <ChapterHead num="24" title="Who Should Visit: Finding Your Fit" />
              <div className="space-y-3">
                {[
                  { e:"👨‍👩‍👧‍👦", g:"Families", d:"Perfect for parents keeping kids active with pools and slides, while grandparents enjoy quiet garden walks and comfortable rooms." },
                  { e:"👩‍❤️‍👨", g:"Couples", d:"Scenic balconies, candlelit evening garden walks, and monsoon ambiance create naturally romantic settings." },
                  { e:"👥", g:"Friends", d:"Weekend of cricket, swimming, rain dancing, and nearby Imagicaa — the complete friend-trip formula." },
                  { e:"🏢", g:"Corporate Groups", d:"Team-building facilities, spacious conference rooms, and organized evening entertainment all under one roof." },
                  { e:"🎒", g:"School Outings", d:"Safe, enclosed property with extensive activities and rigorous child-safety measures — highly popular for educational picnics." },
                ].map((row) => (
                  <FadeUp key={row.g}>
                    <div className="flex items-start gap-5 p-5 bg-white rounded-2xl border border-[#e8ddcf]/50 shadow-sm hover:shadow-md transition-shadow">
                      <span className="text-3xl">{row.e}</span>
                      <div>
                        <h5 className="font-serif font-bold text-[#1f3c44]">{row.g}</h5>
                        <p className="text-sm text-[#4f656d] font-light mt-1">{row.d}</p>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </article>

            {/* ══ 25. PROS & CONS ══ */}
            <article id="pros-cons" className="scroll-mt-28 space-y-8">
              <ChapterHead num="25" title="Pros & Cons Summary" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FadeUp>
                  <div className="h-full rounded-3xl bg-[#eff7f3] border border-[#2f6b4f]/15 p-7 shadow-sm">
                    <h4 className="font-serif font-bold text-xl text-[#2f6b4f] flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-[#2f6b4f]/10 text-[#2f6b4f] flex items-center justify-center font-bold">✓</span>
                      What We Loved
                    </h4>
                    <ul className="space-y-3">
                      {["Highly accessible — under 2 hours from Mumbai / Pune","Spacious, clean rooms with fast Wi-Fi and modern amenities","Excellent food variety, especially authentic Maharashtrian dishes","High pool safety standards — lifeguards and dedicated kids&apos; zones","Daily rain dance and comprehensive recreation keeping guests active","Warm, responsive, genuinely caring staff"].map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[14px] text-[#31464f] font-light">
                          <span className="w-5 h-5 mt-0.5 flex-shrink-0 rounded-full bg-[#2f6b4f]/10 text-[#2f6b4f] flex items-center justify-center text-xs font-bold">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeUp>
                <FadeUp delay={100}>
                  <div className="h-full rounded-3xl bg-[#fef5f4] border border-[#a34335]/15 p-7 shadow-sm">
                    <h4 className="font-serif font-bold text-xl text-[#a34335] flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-full bg-[#a34335]/10 text-[#a34335] flex items-center justify-center font-bold">→</span>
                      Areas to Improve
                    </h4>
                    <ul className="space-y-3">
                      {["Weekend check-out lines can get long during peak hours","Table tennis equipment in the playroom could use an upgrade","A few more directional signposts would help navigation"].map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[14px] text-[#31464f] font-light">
                          <span className="w-5 h-5 mt-0.5 flex-shrink-0 rounded-full bg-[#a34335]/10 text-[#a34335] flex items-center justify-center text-xs font-bold">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeUp>
              </div>
            </article>

            {/* ══ 26. FAQ ══ */}
            <article id="faq" className="scroll-mt-28 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <ChapterHead num="26" title="Frequently Asked Questions" />
                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    placeholder="Search FAQs…"
                    value={faqSearch}
                    onChange={(e) => setFaqSearch(e.target.value)}
                    className="w-full text-sm py-2.5 pl-10 pr-4 rounded-full border border-[#e8ddcf] bg-white focus:outline-none focus:ring-2 focus:ring-[#c46a3a]/40 transition-all shadow-sm"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4f656d] text-sm">🔍</span>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-[#e8ddcf]/50 shadow-[0_8px_40px_rgba(31,60,68,0.08)] divide-y divide-[#e8ddcf]/40">
                {filteredFaqs.length > 0 ? filteredFaqs.map((item, idx) => (
                  <div key={idx}>
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full flex justify-between items-center text-left px-7 py-5 hover:bg-[#faf9f6] transition-colors"
                    >
                      <span className="font-serif font-semibold text-base text-[#1f3c44] pr-4">{item.q}</span>
                      <span className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-300 ${openFaq === idx ? "bg-[#c46a3a] border-[#c46a3a] text-white rotate-45" : "border-[#e8ddcf] text-[#4f656d]"}`}>+</span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}>
                      <p className="px-7 pb-5 text-sm text-[#4f656d] font-light leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-center text-sm text-[#4f656d] py-8 font-light">No FAQs match your search.</p>
                )}
              </div>
            </article>

            {/* ══ 27. VERDICT — animated scores ══ */}
            <article id="verdict" ref={verdictRef as React.RefObject<HTMLElement>} className="scroll-mt-28">
              <div className="rounded-[2rem] border border-[#b68b5b]/20 bg-gradient-to-br from-[#1a3038] via-[#1f3c44] to-[#0e1e22] text-white p-8 sm:p-12 shadow-[0_24px_80px_rgba(31,60,68,0.4)] relative overflow-hidden">
                {/* Decorative blobs */}
                <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full bg-[#b68b5b]/10 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-32 -left-32 w-72 h-72 rounded-full bg-[#c46a3a]/10 blur-3xl pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b68b5b]/40 to-transparent" />

                <div className="relative z-10 space-y-10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#b68b5b]">Final Verdict</span>
                      <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2">UK&apos;s Resort Khopoli</h3>
                      <p className="text-[#e8ddcf]/70 text-sm font-light mt-1">A Premier Weekend Retreat in Maharashtra</p>
                    </div>
                    <div className="flex items-center gap-5 bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
                      <div className="relative w-20 h-20 flex items-center justify-center">
                        <svg className="absolute inset-0 w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                          <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                          <circle cx="40" cy="40" r="34" fill="none" stroke="#b68b5b" strokeWidth="6" strokeDasharray="213.6" strokeDashoffset={213.6 * (1 - 0.94)} strokeLinecap="round" />
                        </svg>
                        <span className="font-serif text-2xl font-bold text-white relative z-10">4.7</span>
                      </div>
                      <div>
                        <div className="text-[#b68b5b] text-lg font-bold tracking-widest">★★★★★</div>
                        <p className="text-[10px] text-[#e8ddcf]/60 font-bold uppercase tracking-widest mt-1">Out of 5.0</p>
                      </div>
                    </div>
                  </div>

                  {/* Animated score bars */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                    {METRICS.map((m, i) => (
                      <div key={m.label} className="space-y-2">
                        <p className="text-[11px] text-[#e8ddcf]/70 font-bold uppercase tracking-wider">{m.label}</p>
                        <div className="flex items-baseline justify-between">
                          <span className="font-serif text-xl font-bold text-white">{m.score}</span>
                          <span className="text-[10px] text-white/30">/ 5</span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-[#b68b5b] to-[#c46a3a] h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${animatedScores[i]}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <blockquote className="border-l-4 border-[#b68b5b] pl-6 text-lg text-[#e8ddcf] font-light italic leading-relaxed">
                    &ldquo;UK&apos;s Resort is an outstanding, highly accessible destination that successfully combines family entertainment with serene Sahyadri views. Spacious grounds, clean rooms, safety focus at the pool, and delicious local food make it one of the absolute best weekend getaway choices for families, couples, and corporate groups from Mumbai and Pune.&rdquo;
                  </blockquote>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true" target="_blank"
                      className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#b68b5b] hover:bg-[#c46a3a] text-white text-xs font-bold tracking-widest uppercase rounded-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(196,106,58,0.4)]">
                      Book Your Escape
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                    </Link>
                    <Link href="tel:+919967000000"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white text-xs font-bold tracking-widest uppercase rounded-2xl hover:border-white/40 hover:bg-white/5 transition-all duration-300">
                      📞 Call the Resort
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            {/* ══ 28. CONCLUSION ══ */}
            <article id="conclusion" className="scroll-mt-28 space-y-8">
              <ChapterHead num="28" title="Conclusion: Leaving a Piece of My Heart" />
              <Body>
                <p>
                  As we packed our bags on Sunday afternoon, I took one last walk around the property. The rain had paused, leaving the leaves glistening with water droplets and the air wonderfully cool. Children were still splashing in the pool. Friends were playing a final game of badminton on the lawn.
                </p>
                <p>
                  We checked out with a sense of calm and rejuvenation we hadn&apos;t felt in weeks. The drive back to Mumbai was quick and pleasant, but our minds felt lighter. Two days surrounded by hills, swimming in clean water, and eating delicious food in a warm, hosted environment had completely reset our energy.
                </p>
                <p>
                  UK&apos;s Resort Khopoli is not just a place to stay&mdash;it is a space where families connect, friends laugh, and city-dwellers remember what fresh air tastes like. An authentic, warm, and genuinely refreshing Sahyadri escape. I can say with confidence: it won&apos;t be long before we pack our bags and head back.
                </p>
              </Body>
              <FadeUp>
                <div className="rounded-3xl bg-gradient-to-r from-[#f7f3ee] to-[#ede8df] border border-[#e8ddcf] p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <p className="font-serif text-2xl font-bold text-[#1f3c44]">Ready to Experience It Yourself?</p>
                    <p className="text-sm text-[#4f656d] font-light mt-1">Join thousands of happy guests who&apos;ve discovered their Sahyadri escape.</p>
                  </div>
                  <Link href="https://bookone.io/UK-s-Resort-Khopoli?bookingEngine=true" target="_blank"
                    className="flex-shrink-0 group inline-flex items-center gap-2 px-8 py-4 bg-[#1f3c44] text-white text-xs font-bold tracking-widest uppercase rounded-2xl hover:bg-[#b68b5b] transition-all duration-300">
                    Check Availability
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                  </Link>
                </div>
              </FadeUp>
            </article>

          </div>{/* end main article */}
        </div>{/* end grid */}
      </div>{/* end max-w wrapper */}
    </section>
  );
}
