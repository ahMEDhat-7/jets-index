import { CardSkeleton } from "@/components/Skeletons";

export default function HomeLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 animate-pulse space-y-4">
        <div className="h-10 w-1/3 bg-tactical-bg-secondary" />
        <div className="h-4 w-2/3 bg-tactical-bg-secondary" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
