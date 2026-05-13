"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto flex min-h-[400px] flex-col items-center justify-center px-4 py-20 text-center">
      <h2 className="mb-4 text-2xl font-bold text-foreground">Something went wrong!</h2>
      <p className="mb-8 text-muted-foreground">
        We encountered an error while loading this property. Please try again or contact support.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} variant="default">
          Try again
        </Button>
        <Button onClick={() => (window.location.href = "/")} variant="outline">
          Go back home
        </Button>
      </div>
    </div>
  );
}
