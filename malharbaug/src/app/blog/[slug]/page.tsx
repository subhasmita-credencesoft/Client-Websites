import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { blogPosts } from '@/data/blog';
import { breadcrumbSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image, alt: post.imageAlt }],
    },
  };
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

export default function BlogArticlePage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: `${siteConfig.url}${post.image}`,
    datePublished: post.date,
    author: { '@type': 'Organization', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: { '@type': 'ImageObject', url: `${siteConfig.url}/malharlogo.jpeg` },
    },
    keywords: post.tags.join(', '),
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}/`,
  };

  return (
    <>
      <Header />
      <JsonLd data={articleSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.title, url: `/blog/${post.slug}` },
        ])}
      />
      <main>
        <nav aria-label="Breadcrumb" className="bg-earth-100 px-6 py-3 dark:bg-earth-800/50">
          <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 font-sans text-xs text-earth-600 dark:text-earth-300">
            <li>
              <Link href="/" className="hover:text-brand-600 dark:hover:text-brand-400">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/blog" className="hover:text-brand-600 dark:hover:text-brand-400">Blog</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-semibold text-brand-700 dark:text-brand-300">{post.title}</li>
          </ol>
        </nav>

        <article className="mx-auto max-w-3xl px-6 py-12">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-brand-50 px-3 py-1 font-sans text-xs font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-earth-900 dark:text-white sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 font-sans text-sm uppercase tracking-wide text-earth-500 dark:text-earth-400">
            By {post.author} · Published {formatDate(post.date)} · {post.readTime}
          </p>
          <p className="mt-6 font-sans text-lg leading-relaxed text-earth-600 dark:text-earth-300">{post.excerpt}</p>

          <div className="relative mt-8 h-72 overflow-hidden rounded-2xl sm:h-96">
            <Image src={post.image} alt={post.imageAlt} fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
          </div>

          <div className="mt-10 space-y-10">
            {post.sections.map((section) => (
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
            <h2 className="font-serif text-2xl font-bold text-white">Stay at Malhar Baug Resort, Alibaug</h2>
            <p className="mx-auto mt-2 max-w-md font-sans text-sm leading-relaxed text-brand-100">
              A family-friendly garden resort in Palhe, Nagaon — luxury rooms, private villas, swimming pool and home-style Konkan dining, 2 km from Nagaon Beach.
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

          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {related.map((other) => (
              <Link key={other.slug} href={`/blog/${other.slug}`} className="group">
                <div className="relative h-40 overflow-hidden rounded-2xl">
                  <Image
                    src={other.image}
                    alt={other.imageAlt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-3 font-serif text-lg font-bold text-earth-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
                  {other.title}
                </h3>
                <p className="mt-1 font-sans text-sm text-earth-500 dark:text-earth-400">{other.readTime}</p>
              </Link>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
