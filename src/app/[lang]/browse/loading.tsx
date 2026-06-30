import { CardSkeleton } from "@/components/Skeletons";

export default function BrowseLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 animate-pulse">
        <div className="h-8 w-1/4 bg-tactical-bg-secondary mb-4" />
        <div className="flex gap-4">
          <div className="h-10 w-48 bg-tactical-bg-secondary" />
          <div className="h-10 w-48 bg-tactical-bg-secondary" />
          <div className="h-10 w-48 bg-tactical-bg-secondary" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
