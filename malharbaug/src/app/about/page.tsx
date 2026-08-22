import Image from 'next/image';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'About Our Resort',
  description:
    'Learn about Malhar Baug Resort — a family-run garden resort in Nagaon, Palhe, Alibaug offering comfortable rooms, private villas, swimming pool and warm Konkan hospitality since day one.',
  alternates: { canonical: '/about/' },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative flex min-h-[400px] items-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=2068"
            alt="Malhar Baug Resort"
            fill
            priority
            className="absolute inset-0 z-0 object-cover"
          />
          <div className="hero-overlay absolute inset-0 z-0" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <h1 className="font-serif text-5xl font-bold text-white sm:text-6xl">About Malhar Baug Resort</h1>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-lg text-earth-100">
              A peaceful escape nestled in the heart of nature near Nagaon Beach, Alibaug.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="animate-on-scroll">
              <p className="section-subtitle">Our Story</p>
              <h2 className="section-title">Where Nature Meets Comfort</h2>
              <p className="mt-6 font-sans text-base leading-relaxed text-earth-600 dark:text-earth-300">
                Malhar Baug Resort was born from a vision to create a sanctuary where guests can escape the
                chaos of city life and reconnect with nature. Nestled amidst lush greenery just minutes away
                from the pristine Nagaon Beach in Alibaug, our resort offers a perfect blend of rustic charm
                and modern luxury.
              </p>
              <p className="mt-4 font-sans text-base leading-relaxed text-earth-600 dark:text-earth-300">
                Founded by a team of hospitality enthusiasts who believe in warm, personalized service, every
                aspect of the resort has been thoughtfully designed to ensure a memorable stay for families,
                couples, and corporate groups alike.
              </p>
            </div>
            <div className="scale-in relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1615460549969-36fa19521c4f?auto=format&fit=crop&q=80&w=800"
                  alt="Lush gardens at Malhar Baug Resort, Alibaug – family resort near Nagaon Beach"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-earth-100 py-24 dark:bg-earth-800/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <p className="section-subtitle">Our Mission</p>
              <h2 className="section-title">Creating Unforgettable Experiences</h2>
              <p className="mx-auto mt-6 max-w-3xl font-sans text-base leading-relaxed text-earth-600 dark:text-earth-300">
                We are committed to providing exceptional hospitality that celebrates the natural beauty of
                Alibaug. Every meal, every activity, and every interaction is crafted with care to leave our
                guests with cherished memories that last a lifetime.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {[
                { icon: 'solar:heart-angle-bold', title: 'Warm Hospitality', desc: 'Personalized service that makes every guest feel at home.' },
                { icon: 'solar:leaf-bold', title: 'Sustainable Practices', desc: 'Eco-friendly operations that respect and preserve nature.' },
                { icon: 'solar:star-bold', title: 'Quality Excellence', desc: 'Premium amenities and experiences at honest prices.' },
              ].map((item, i) => (
                <div key={item.title} className={`animate-on-scroll stagger-${i + 1} rounded-2xl bg-white p-8 text-center card-shadow dark:bg-earth-800/50`}>
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 dark:bg-brand-900/40">
                    <iconify-icon icon={item.icon} width="28" height="28"></iconify-icon>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-earth-900 dark:text-white">{item.title}</h3>
                  <p className="mt-2 font-sans text-sm text-earth-600 dark:text-earth-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-center">
            <p className="section-subtitle">Our Vision</p>
            <h2 className="section-title">A Destination Like No Other</h2>
            <p className="mx-auto mt-6 max-w-3xl font-sans text-base leading-relaxed text-earth-600 dark:text-earth-300">
              We envision Malhar Baug Resort as a benchmark for nature-centric luxury in Maharashtra — a place
              where guests from around the world come to experience the unspoiled beauty of the Konkan coast,
              savor authentic local flavors, and create timeless bonds with loved ones.
            </p>
          </div>
        </section>

        <section className="bg-earth-900 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <p className="section-subtitle text-brand-300">Our Team</p>
              <h2 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">Meet the People Behind the Experience</h2>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { name: 'Rajesh Patil', role: 'General Manager', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400' },
                { name: 'Sneha Deshmukh', role: 'Hospitality Head', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' },
                { name: 'Vikram Joshi', role: 'Executive Chef', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=400' },
                { name: 'Anita Kulkarni', role: 'Operations Manager', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400' },
              ].map((member, i) => (
                <div key={member.name} className={`animate-on-scroll stagger-${i + 1} text-center`}>
                  <div className="relative mx-auto mb-4 h-40 w-40 overflow-hidden rounded-full">
                    <Image src={member.image} alt={member.name} fill className="object-cover" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-white">{member.name}</h3>
                  <p className="font-sans text-sm text-brand-300">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
