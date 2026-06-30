"use client";

import { useEffect } from "react";

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
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 text-6xl font-bold text-tactical-alert">!</div>
      <h1 className="mb-2 font-tactical-display text-2xl font-bold text-tactical-text">
        System Malfunction
      </h1>
      <p className="mb-8 max-w-md text-tactical-text-secondary">
        An error was encountered while processing your request.
      </p>
      <button
        onClick={reset}
        className="rounded bg-tactical-accent px-6 py-2 font-tactical-body font-bold text-tactical-bg transition-colors hover:bg-tactical-accent/80"
      >
        Retry
      </button>
    </div>
  );
}
