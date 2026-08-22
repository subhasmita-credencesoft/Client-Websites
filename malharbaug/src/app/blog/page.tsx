import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { blogPosts } from '@/data/blog';
import { breadcrumbSchema } from '@/lib/schema';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'The Malhar Baug Resort blog — planning guides for family stays, group bookings, corporate offsites and celebrations at our Alibaug resort near Nagaon Beach.',
  alternates: { canonical: '/blog/' },
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

export default function BlogPage() {
  return (
    <>
      <Header />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
        ])}
      />
      <main>
        <section className="relative flex min-h-[300px] items-center overflow-hidden bg-gradient-to-br from-brand-900 to-earth-900">
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <h1 className="font-serif text-5xl font-bold text-white sm:text-6xl">Malhar Baug Blog</h1>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-earth-100">
              Practical planning guides for your Alibaug stay — family trips, group villas, corporate offsites and celebrations,
              straight from our team in Nagaon.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-neutral-700 dark:bg-earth-900"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-brand-50 px-3 py-1 font-sans text-xs font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-3 font-serif text-xl font-bold leading-snug text-earth-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-earth-600 dark:text-earth-300">
                    {post.excerpt}
                  </p>
                  <p className="mt-4 font-sans text-xs uppercase tracking-wide text-earth-500 dark:text-earth-400">
                    {formatDate(post.date)} · {post.readTime}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-14 rounded-2xl bg-brand-700 p-10 text-center dark:bg-brand-900">
            <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
              Planning Already? Come See the Place.
            </h2>
            <p className="mx-auto mt-3 max-w-xl font-sans text-sm text-brand-100">
              Malhar Baug Resort — luxury rooms, private villas, swimming pool and Konkan dining, just 2 km from Nagaon Beach, Alibaug.
            </p>
            <Link
              href="/rooms"
              className="mt-6 inline-block rounded-full bg-white px-8 py-3.5 font-sans text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              Explore Rooms &amp; Villas
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
