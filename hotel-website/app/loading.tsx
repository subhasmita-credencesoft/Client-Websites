export default function Loading() {
  return (
    <main className="site-section min-h-[60vh] bg-[#f6f3ed] text-[#1f3c44]">
      <div className="site-container max-w-6xl animate-pulse space-y-6">
        <div className="h-10 w-2/5 rounded bg-[#1f3c44]/10" />
        <div className="h-4 w-4/5 rounded bg-[#1f3c44]/10" />
        <div className="h-4 w-3/5 rounded bg-[#1f3c44]/10" />
        <div className="mt-8 h-72 w-full rounded-2xl bg-[#1f3c44]/10" />
      </div>
    </main>
  );
}
