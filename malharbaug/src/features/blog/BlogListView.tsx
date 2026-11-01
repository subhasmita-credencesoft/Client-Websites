import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { blogPosts } from '@/data/blog';
import { breadcrumbSchema } from '@/lib/schema';
import BlogCard from './BlogCard';

export default function BlogListView() {
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
              Practical planning guides for your Alibaug stay – family trips, group villas, corporate
              offsites and celebrations, straight from our team in Nagaon.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>

          <div className="mt-14 rounded-2xl bg-brand-700 p-10 text-center dark:bg-brand-900">
            <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
              Planning Already? Come See the Place.
            </h2>
            <p className="mx-auto mt-3 max-w-xl font-sans text-sm text-brand-100">
              Malhar Baug Resort – luxury rooms, private villas, swimming pool and Konkan dining, just
              2 km from Nagaon Beach, Alibaug.
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
