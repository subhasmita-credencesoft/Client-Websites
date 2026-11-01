import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/utils/formatters';

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  tags: string[];
  date: string;
  readTime: string;
}

export default function BlogCard({
  slug,
  title,
  excerpt,
  image,
  imageAlt,
  tags,
  date,
  readTime,
}: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-neutral-700 dark:bg-earth-900"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-brand-50 px-3 py-1 font-sans text-xs font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className="mt-3 font-serif text-xl font-bold leading-snug text-earth-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
          {title}
        </h2>
        <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-earth-600 dark:text-earth-300">
          {excerpt}
        </p>
        <p className="mt-4 font-sans text-xs uppercase tracking-wide text-earth-500 dark:text-earth-400">
          {formatDate(date)} &middot; {readTime}
        </p>
      </div>
    </Link>
  );
}
