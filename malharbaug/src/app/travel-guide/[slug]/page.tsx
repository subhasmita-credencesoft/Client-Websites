import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { travelGuides } from '@/data/travelGuide';
import { breadcrumbSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return travelGuides.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const guide = travelGuides.find((g) => g.slug === params.slug);
  if (!guide) return { title: 'Guide Not Found' };
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/travel-guide/${guide.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: 'article',
      publishedTime: guide.date,
      images: [{ url: guide.image, alt: guide.imageAlt }],
    },
  };
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

export default function TravelGuideArticlePage({ params }: Props) {
  const guide = travelGuides.find((g) => g.slug === params.slug);
  if (!guide) notFound();

  const otherGuides = travelGuides.filter((g) => g.slug !== guide.slug).slice(0, 3);
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Alibaug Travel Guide', url: '/travel-guide' },
    { name: guide.title, url: `/travel-guide/${guide.slug}` },
  ];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    image: `${siteConfig.url}${guide.image}`,
    datePublished: guide.date,
    author: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: { '@type': 'ImageObject', url: `${siteConfig.url}/malharlogo.jpeg` },
    },
    mainEntityOfPage: `${siteConfig.url}/travel-guide/${guide.slug}`,
  };

  return (
    <>
      <Header />
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <main>
        <nav aria-label="Breadcrumb" className="bg-earth-100 px-6 py-3 dark:bg-earth-800/50">
          <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 font-sans text-xs text-earth-600 dark:text-earth-300">
            <li>
              <Link href="/" className="hover:text-brand-600 dark:hover:text-brand-400">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/travel-guide" className="hover:text-brand-600 dark:hover:text-brand-400">Travel Guide</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-semibold text-brand-700 dark:text-brand-300">{guide.title}</li>
          </ol>
        </nav>

        <article className="mx-auto max-w-3xl px-6 py-12">
          <p className="font-sans text-xs uppercase tracking-wide text-earth-500 dark:text-earth-400">
            Published {formatDate(guide.date)} · {guide.readTime} · By Malhar Baug Resort
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-earth-900 dark:text-white sm:text-5xl">
            {guide.title}
          </h1>
          <p className="mt-4 font-sans text-lg leading-relaxed text-earth-600 dark:text-earth-300">{guide.excerpt}</p>

          <div className="relative mt-8 h-72 overflow-hidden rounded-2xl sm:h-96">
            <Image src={guide.image} alt={guide.imageAlt} fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
          </div>

          <div className="mt-10 space-y-10">
            {guide.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-serif text-2xl font-bold text-earth-900 dark:text-white">{section.heading}</h2>
                {section.paragraphs?.map((para, i) => (
                  <p key={i} className="mt-4 font-sans text-base leading-relaxed text-earth-700 dark:text-earth-300">
                    {para}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-4 list-disc space-y-2 pl-5 font-sans text-base leading-relaxed text-earth-700 dark:text-earth-300">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="mt-14 rounded-2xl bg-brand-700 p-8 text-center dark:bg-brand-900">
            <h2 className="font-serif text-2xl font-bold text-white">Stay Near Nagaon Beach</h2>
            <p className="mx-auto mt-2 max-w-md font-sans text-sm leading-relaxed text-brand-100">
              Malhar Baug Resort is a family-friendly garden resort in Palhe, Nagaon — luxury rooms, private villas,
              swimming pool and home-style Konkan dining.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/rooms"
                className="rounded-full bg-white px-6 py-3 font-sans text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
              >
                View Rooms &amp; Villas
              </Link>
              <Link
                href="/contact"
                className="rounded-full border-2 border-white px-6 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-700"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="mt-14">
            <h2 className="font-serif text-2xl font-bold text-earth-900 dark:text-white">More Alibaug Guides</h2>
            <ul className="mt-4 space-y-3">
              {otherGuides.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/travel-guide/${other.slug}`}
                    className="font-sans text-base font-medium text-brand-600 underline-offset-4 hover:underline dark:text-brand-400"
                  >
                    {other.title}
                  </Link>
                  <span className="block font-sans text-sm text-earth-500 dark:text-earth-400">{other.excerpt}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
