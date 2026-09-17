"use client";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-20 space-y-8 animate-pulse">
      <div className="h-[60vh] w-full rounded-2xl bg-gray-200" />
      <div className="space-y-4">
        <div className="h-8 w-1/3 rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-2/3 rounded bg-gray-200" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-64 rounded-xl bg-gray-200" />
        <div className="h-64 rounded-xl bg-gray-200" />
      </div>
    </div>
  );
}
