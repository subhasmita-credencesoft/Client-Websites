export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-transparent py-20" aria-label="Loading content">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600 dark:border-brand-900 dark:border-t-brand-400" />
        <span className="font-sans text-xs font-medium uppercase tracking-wider text-earth-500 dark:text-earth-400">
          Loading...
        </span>
      </div>
    </div>
  );
}
