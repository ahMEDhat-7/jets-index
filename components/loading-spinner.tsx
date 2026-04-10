export function LoadingSpinner() {
  return (
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-[#f59e0b] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-slate-600 dark:text-slate-400 font-[family-name:var(--font-display-hangar)]">
        LOADING...
      </p>
    </div>
  );
}
