export function CardSkeleton() {
  return (
    <div className="border border-tactical-border bg-tactical-card p-4 animate-pulse">
      <div className="mb-3 h-40 bg-tactical-bg-secondary" />
      <div className="mb-2 h-4 w-3/4 bg-tactical-bg-secondary" />
      <div className="mb-2 h-3 w-1/2 bg-tactical-bg-secondary" />
      <div className="h-3 w-2/3 bg-tactical-bg-secondary" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 border border-tactical-border bg-tactical-card p-3"
        >
          <div className="h-4 w-1/4 bg-tactical-bg-secondary" />
          <div className="h-4 w-1/6 bg-tactical-bg-secondary" />
          <div className="h-4 w-1/6 bg-tactical-bg-secondary" />
        </div>
      ))}
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 w-1/3 bg-tactical-bg-secondary" />
      <div className="h-64 bg-tactical-bg-secondary" />
      <div className="space-y-2">
        <div className="h-4 w-full bg-tactical-bg-secondary" />
        <div className="h-4 w-5/6 bg-tactical-bg-secondary" />
        <div className="h-4 w-2/3 bg-tactical-bg-secondary" />
      </div>
    </div>
  );
}
