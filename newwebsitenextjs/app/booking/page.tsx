import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { offersCards, stayCardsPrimary, stayCardsSecondary } from "@/lib/data/mountain-content";

export default function BookingPage() {
  const roomOptions = [...stayCardsPrimary, ...stayCardsSecondary].map((card) => card.title);
  const packageOptions = Array.from(new Set(offersCards.map((card) => card.title)));
  const guestOptions = ["50", "100", "150", "200", "250", "300", "350", "400", "450", "500"];

  return (
    <main className="relative overflow-hidden bg-[#2d4a3e] text-white">
      <div className="noise-overlay" />
      <SiteHeader />

      <section className="mx-auto max-w-[96rem] px-6 pb-16 pt-44 md:px-12 md:pt-48">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a46e]">Booking</p>
          <h1 className="mt-5 text-4xl md:text-6xl">Request A Booking</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/85 md:text-xl">
            Share your dates, guest count, and package preference. The Mountain team will confirm availability and
            respond with the next steps.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[96rem] px-6 pb-24 md:px-12">
        <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr]">


          <form className="glass-panel rounded-[2rem] p-8 md:p-10">
            <div className="grid gap-5 md:grid-cols-2">
              <input
                type="date"
                placeholder="Start Date"
                className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-base text-white outline-none placeholder:text-white/45"
              />
              <input
                type="date"
                placeholder="End Date"
                className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-base text-white outline-none placeholder:text-white/45"
              />
              <select
                className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-base text-white outline-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Guest Count
                </option>
                {guestOptions.map((count) => (
                  <option key={count} value={count} className="text-black">
                    {count}
                  </option>
                ))}
              </select>
              <select
                className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-base text-white outline-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Room Type
                </option>
                {roomOptions.map((room) => (
                  <option key={room} value={room} className="text-black">
                    {room}
                  </option>
                ))}
              </select>
              <select
                className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-base text-white outline-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Package Preference
                </option>
                {packageOptions.map((pkg) => (
                  <option key={pkg} value={pkg} className="text-black">
                    {pkg}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="mt-8 border border-[#c8a871] bg-[#c8a871] px-9 py-3 text-sm font-semibold uppercase tracking-wide text-black"
            >
              BOOK NOW
            </button>
          </form>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
