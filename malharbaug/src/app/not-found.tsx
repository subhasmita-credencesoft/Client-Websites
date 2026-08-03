import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-earth-50 px-6 dark:bg-earth-900">
      <h1 className="font-serif text-6xl font-bold text-brand-700 dark:text-brand-400">404</h1>
      <h2 className="mt-4 font-serif text-3xl font-semibold text-earth-900 dark:text-white">Page Not Found</h2>
      <p className="mt-2 text-center font-sans text-base text-earth-600 dark:text-earth-300">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <a
        href="/"
        className="mt-8 rounded-full bg-brand-600 px-8 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        Return Home
      </a>
    </div>
  );
}
