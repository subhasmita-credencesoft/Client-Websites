export default function Loading() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] text-[var(--color-text-primary)]">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-24 text-center">
        <div>
          <p className="site-eyebrow">Loading</p>
          <h1 className="site-title-md mt-4">Preparing The Mountain experience</h1>
          <div className="mx-auto mt-6 h-1 w-48 overflow-hidden rounded-full bg-[var(--color-border)]">
            <div className="h-full w-1/3 animate-pulse rounded-full bg-[var(--color-primary)]" />
          </div>
          <p className="site-copy-sm mt-4 text-[var(--color-text-muted)]">
            Optimized assets and page sections are loading.
          </p>
        </div>
      </div>
    </main>
  );
}
