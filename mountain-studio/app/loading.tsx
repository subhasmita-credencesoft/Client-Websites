export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-6 h-1 w-16 animate-pulse bg-gold" />
        <p className="text-xs uppercase tracking-[0.45em] text-gold-light">
          Loading
        </p>
      </div>
    </div>
  );
}
