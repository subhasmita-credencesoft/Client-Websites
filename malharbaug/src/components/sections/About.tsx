import Image from 'next/image';

const stats = [
  { value: '5', label: 'Acres of Greenery' },
  { value: '2018', label: 'Established' },
  { value: '18', label: 'Rooms & Villas' },
];

export default function About() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <p className="section-subtitle">About</p>
          <h2 className="section-title">Discover Malhar Baug Resort</h2>
          <p className="mt-6 font-sans text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
            Nestled in the heart of nature near the pristine Nagaon Beach in Alibaug, Malhar Baug Resort offers a
            tranquil escape from the chaos of city life. Surrounded by lush greenery and sprawling gardens, our resort
            combines modern comfort with the serenity of the outdoors. Whether you are planning a family vacation, a
            romantic getaway, or a corporate retreat, Malhar Baug provides the perfect setting with its warm
            hospitality, thoughtfully designed accommodations, and a wide array of amenities that cater to every
            guest.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-3xl font-bold text-brand-600 dark:text-brand-400">{stat.value}</p>
                <p className="mt-1 font-sans text-sm text-neutral-600 dark:text-neutral-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="/aboutimg.jpeg"
              alt="Malhar Baug Resort garden"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
